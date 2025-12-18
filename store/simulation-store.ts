import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  SimulatorParameters,
  BudgetResults,
  defaultParameters,
  predefinedScenarios,
  calculateBudget,
  calculateROI,
  DEFAULT_ROI_PARAMS,
  type ROICalculationParams,
  type ROIResults
} from '@/data/seed/budget-simulator'

// Scenario type for saved configurations (local)
export interface SavedScenario {
  id: string
  name: string
  description: string
  params: SimulatorParameters
  createdAt: string
  updatedAt: string
}

// Database scenario type
export interface DbScenario {
  id: string
  user_id: string
  name: string
  description: string | null
  params: SimulatorParameters
  results_snapshot: BudgetResults | null
  is_default: boolean
  created_at: string
  updated_at: string
}

interface SimulationStore {
  // Current state
  params: SimulatorParameters
  results: BudgetResults

  // ROI state
  roiParams: ROICalculationParams
  roiResults: ROIResults

  // Persistence tracking
  isDirty: boolean
  isSaving: boolean
  isLoading: boolean
  lastSaved: Date | null
  currentScenarioId: string | null
  currentScenarioName: string
  saveError: string | null

  // Saved scenarios (local + database)
  savedScenarios: SavedScenario[]
  dbScenarios: DbScenario[]

  // Actions - Parameters
  setParams: (params: Partial<SimulatorParameters>) => void
  setAllParams: (params: SimulatorParameters) => void
  resetToDefaults: () => void

  // Actions - ROI Parameters
  setROIParams: (params: Partial<ROICalculationParams>) => void
  resetROIParams: () => void

  // Actions - Local Scenarios
  applyPredefinedScenario: (scenarioId: string) => void
  saveCurrentAsScenario: (name: string, description?: string) => string
  loadScenario: (scenarioId: string) => void
  deleteScenario: (scenarioId: string) => void
  updateScenarioName: (name: string) => void

  // Actions - Database Scenarios
  fetchDbScenarios: () => Promise<void>
  saveToDatabase: (name: string, description?: string) => Promise<string | null>
  updateInDatabase: (id: string) => Promise<boolean>
  loadFromDatabase: (id: string) => Promise<boolean>
  deleteFromDatabase: (id: string) => Promise<boolean>

  // Actions - Persistence state
  markAsSaved: () => void
  markAsDirty: () => void
  clearError: () => void
}

// Helper to compute initial ROI results
const initialResults = calculateBudget(defaultParameters)
const initialROIResults = calculateROI(defaultParameters, initialResults, DEFAULT_ROI_PARAMS)

export const useSimulationStore = create<SimulationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      params: defaultParameters,
      results: initialResults,
      roiParams: DEFAULT_ROI_PARAMS,
      roiResults: initialROIResults,
      isDirty: false,
      isSaving: false,
      isLoading: false,
      lastSaved: null,
      currentScenarioId: null,
      currentScenarioName: 'Default Scenario',
      saveError: null,
      savedScenarios: [],
      dbScenarios: [],

      // Update individual parameters
      setParams: (newParams) => {
        const updatedParams = { ...get().params, ...newParams }
        const newResults = calculateBudget(updatedParams)
        set({
          params: updatedParams,
          results: newResults,
          roiResults: calculateROI(updatedParams, newResults, get().roiParams),
          isDirty: true
        })
      },

      // Replace all parameters
      setAllParams: (params) => {
        const newResults = calculateBudget(params)
        set({
          params,
          results: newResults,
          roiResults: calculateROI(params, newResults, get().roiParams),
          isDirty: true
        })
      },

      // Reset to defaults
      resetToDefaults: () => {
        const newResults = calculateBudget(defaultParameters)
        set({
          params: defaultParameters,
          results: newResults,
          roiResults: calculateROI(defaultParameters, newResults, get().roiParams),
          isDirty: true,
          currentScenarioId: null,
          currentScenarioName: 'Default Scenario'
        })
      },

      // Update ROI parameters
      setROIParams: (newROIParams) => {
        const updatedROIParams = { ...get().roiParams, ...newROIParams }
        const { params, results } = get()
        set({
          roiParams: updatedROIParams,
          roiResults: calculateROI(params, results, updatedROIParams)
        })
      },

      // Reset ROI parameters to defaults
      resetROIParams: () => {
        const { params, results } = get()
        set({
          roiParams: DEFAULT_ROI_PARAMS,
          roiResults: calculateROI(params, results, DEFAULT_ROI_PARAMS)
        })
      },

      // Apply a predefined scenario (Base, Enhanced, Budget, etc.)
      applyPredefinedScenario: (scenarioId) => {
        const scenario = predefinedScenarios.find(s => s.id === scenarioId)
        if (scenario) {
          const newParams = { ...get().params, ...scenario.params }
          const newResults = calculateBudget(newParams)
          set({
            params: newParams,
            results: newResults,
            roiResults: calculateROI(newParams, newResults, get().roiParams),
            isDirty: true,
            currentScenarioId: null,
            currentScenarioName: scenario.name
          })
        }
      },

      // Save current configuration as a new scenario
      saveCurrentAsScenario: (name, description = '') => {
        const id = `scenario-${Date.now()}`
        const now = new Date().toISOString()
        const newScenario: SavedScenario = {
          id,
          name,
          description,
          params: { ...get().params },
          createdAt: now,
          updatedAt: now
        }

        set(state => ({
          savedScenarios: [...state.savedScenarios, newScenario],
          currentScenarioId: id,
          currentScenarioName: name,
          isDirty: false,
          lastSaved: new Date()
        }))

        return id
      },

      // Load a saved scenario
      loadScenario: (scenarioId) => {
        const scenario = get().savedScenarios.find(s => s.id === scenarioId)
        if (scenario) {
          const newResults = calculateBudget(scenario.params)
          set({
            params: { ...scenario.params },
            results: newResults,
            roiResults: calculateROI(scenario.params, newResults, get().roiParams),
            currentScenarioId: scenario.id,
            currentScenarioName: scenario.name,
            isDirty: false
          })
        }
      },

      // Delete a saved scenario
      deleteScenario: (scenarioId) => {
        set(state => ({
          savedScenarios: state.savedScenarios.filter(s => s.id !== scenarioId),
          currentScenarioId: state.currentScenarioId === scenarioId ? null : state.currentScenarioId
        }))
      },

      // Update current scenario name
      updateScenarioName: (name) => {
        const { currentScenarioId, savedScenarios } = get()
        if (currentScenarioId) {
          set({
            savedScenarios: savedScenarios.map(s =>
              s.id === currentScenarioId
                ? { ...s, name, updatedAt: new Date().toISOString() }
                : s
            ),
            currentScenarioName: name
          })
        } else {
          set({ currentScenarioName: name })
        }
      },

      // Database Scenarios - Fetch all
      fetchDbScenarios: async () => {
        set({ isLoading: true, saveError: null })
        try {
          const response = await fetch('/api/scenarios')
          if (!response.ok) {
            throw new Error('Failed to fetch scenarios')
          }
          const data = await response.json()
          set({
            dbScenarios: data.scenarios || [],
            isLoading: false
          })
        } catch (error) {
          set({
            saveError: error instanceof Error ? error.message : 'Failed to fetch',
            isLoading: false
          })
        }
      },

      // Database Scenarios - Save new
      saveToDatabase: async (name, description = '') => {
        set({ isSaving: true, saveError: null })
        try {
          const { params, results } = get()
          const response = await fetch('/api/scenarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              description,
              params,
              results
            })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to save')
          }

          const data = await response.json()
          const scenario = data.scenario as DbScenario

          set(state => ({
            dbScenarios: [scenario, ...state.dbScenarios],
            currentScenarioId: scenario.id,
            currentScenarioName: scenario.name,
            isDirty: false,
            isSaving: false,
            lastSaved: new Date()
          }))

          return scenario.id
        } catch (error) {
          set({
            saveError: error instanceof Error ? error.message : 'Failed to save',
            isSaving: false
          })
          return null
        }
      },

      // Database Scenarios - Update existing
      updateInDatabase: async (id) => {
        set({ isSaving: true, saveError: null })
        try {
          const { params, results, currentScenarioName } = get()
          const response = await fetch(`/api/scenarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: currentScenarioName,
              params,
              results
            })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to update')
          }

          const data = await response.json()
          const scenario = data.scenario as DbScenario

          set(state => ({
            dbScenarios: state.dbScenarios.map(s =>
              s.id === id ? scenario : s
            ),
            isDirty: false,
            isSaving: false,
            lastSaved: new Date()
          }))

          return true
        } catch (error) {
          set({
            saveError: error instanceof Error ? error.message : 'Failed to update',
            isSaving: false
          })
          return false
        }
      },

      // Database Scenarios - Load
      loadFromDatabase: async (id) => {
        set({ isLoading: true, saveError: null })
        try {
          const response = await fetch(`/api/scenarios/${id}`)

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to load')
          }

          const data = await response.json()
          const scenario = data.scenario as DbScenario
          const newResults = calculateBudget(scenario.params)

          set({
            params: scenario.params,
            results: newResults,
            roiResults: calculateROI(scenario.params, newResults, get().roiParams),
            currentScenarioId: scenario.id,
            currentScenarioName: scenario.name,
            isDirty: false,
            isLoading: false
          })

          return true
        } catch (error) {
          set({
            saveError: error instanceof Error ? error.message : 'Failed to load',
            isLoading: false
          })
          return false
        }
      },

      // Database Scenarios - Delete
      deleteFromDatabase: async (id) => {
        try {
          const response = await fetch(`/api/scenarios/${id}`, {
            method: 'DELETE'
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to delete')
          }

          set(state => ({
            dbScenarios: state.dbScenarios.filter(s => s.id !== id),
            currentScenarioId: state.currentScenarioId === id ? null : state.currentScenarioId
          }))

          return true
        } catch (error) {
          set({
            saveError: error instanceof Error ? error.message : 'Failed to delete'
          })
          return false
        }
      },

      // Mark as saved (after successful save to database)
      markAsSaved: () => {
        set({
          isDirty: false,
          lastSaved: new Date()
        })
      },

      // Mark as dirty (when changes are made)
      markAsDirty: () => {
        set({ isDirty: true })
      },

      // Clear error
      clearError: () => {
        set({ saveError: null })
      }
    }),
    {
      name: 'simulation-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        params: state.params,
        roiParams: state.roiParams,
        savedScenarios: state.savedScenarios,
        currentScenarioId: state.currentScenarioId,
        currentScenarioName: state.currentScenarioName
      })
    }
  )
)

// Selector hooks for optimized re-renders
export const useSimulatorParams = () => useSimulationStore(state => state.params)
export const useSimulatorResults = () => useSimulationStore(state => state.results)
export const useCapexResults = () => useSimulationStore(state => state.results.capex)
export const useOpexResults = () => useSimulationStore(state => state.results.opex)
export const useFiveYearResults = () => useSimulationStore(state => state.results.fiveYear)
export const useMetrics = () => useSimulationStore(state => state.results.metrics)
export const useSavedScenarios = () => useSimulationStore(state => state.savedScenarios)
export const useDbScenarios = () => useSimulationStore(state => state.dbScenarios)
export const useIsDirty = () => useSimulationStore(state => state.isDirty)
export const useIsSaving = () => useSimulationStore(state => state.isSaving)
export const useIsLoading = () => useSimulationStore(state => state.isLoading)
export const useSaveError = () => useSimulationStore(state => state.saveError)

// ROI Selector hooks
export const useROIParams = () => useSimulationStore(state => state.roiParams)
export const useROIResults = () => useSimulationStore(state => state.roiResults)
export const useROISummary = () => useSimulationStore(state => state.roiResults.summary)
export const useROIByCategory = () => useSimulationStore(state => state.roiResults.byCategory)
export const useROIByAsset = () => useSimulationStore(state => state.roiResults.byAsset)
export const useROITimeline = () => useSimulationStore(state => state.roiResults.valueTimeline)
export const useROIConfidenceRange = () => useSimulationStore(state => state.roiResults.confidenceRange)
