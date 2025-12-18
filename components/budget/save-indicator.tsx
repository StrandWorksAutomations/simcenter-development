"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudOff, Check, Loader2, AlertCircle, FolderOpen, Trash2 } from "lucide-react"
import { useSimulationStore, type DbScenario } from "@/store/simulation-store"

// Check if Clerk is configured
const isClerkConfigured = typeof window !== 'undefined' && Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

// Conditionally import and use auth
function useAuthSafe() {
  const [authState, setAuthState] = useState<{ isSignedIn: boolean | undefined }>({ isSignedIn: undefined })

  useEffect(() => {
    if (isClerkConfigured) {
      // Dynamically import and use auth only when Clerk is configured
      import('@clerk/nextjs').then(({ useAuth }) => {
        // We can't actually call useAuth here since it's a hook
        // Instead, we'll handle this at render time
      }).catch(() => {
        setAuthState({ isSignedIn: false })
      })
    } else {
      setAuthState({ isSignedIn: false })
    }
  }, [])

  return authState
}

export function SaveIndicator() {
  // When Clerk isn't configured, treat as not signed in
  const isSignedIn = false // Clerk not configured, auth features disabled
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const {
    isDirty,
    isSaving,
    isLoading,
    lastSaved,
    currentScenarioId,
    currentScenarioName,
    saveError,
    dbScenarios,
    fetchDbScenarios,
    saveToDatabase,
    updateInDatabase,
    loadFromDatabase,
    deleteFromDatabase,
    clearError
  } = useSimulationStore()

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [newScenarioName, setNewScenarioName] = useState("")
  const [newScenarioDescription, setNewScenarioDescription] = useState("")

  // Fetch scenarios when signed in
  useEffect(() => {
    if (mounted && isSignedIn) {
      fetchDbScenarios()
    }
  }, [mounted, isSignedIn, fetchDbScenarios])

  // Clear error after 5 seconds
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(clearError, 5000)
      return () => clearTimeout(timer)
    }
  }, [saveError, clearError])

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-slate-600 rounded-lg text-sm font-medium text-white"
        >
          <Cloud className="h-4 w-4" />
          Save Scenario
        </button>
      </div>
    )
  }

  const handleSave = async () => {
    if (!isSignedIn) {
      setShowSaveModal(true)
      return
    }

    if (currentScenarioId) {
      // Update existing
      await updateInDatabase(currentScenarioId)
    } else {
      // Show modal for new scenario
      setShowSaveModal(true)
    }
  }

  const handleCreateScenario = async () => {
    if (!newScenarioName.trim()) return

    const id = await saveToDatabase(newScenarioName, newScenarioDescription)
    if (id) {
      setShowSaveModal(false)
      setNewScenarioName("")
      setNewScenarioDescription("")
    }
  }

  const handleLoadScenario = async (scenario: DbScenario) => {
    await loadFromDatabase(scenario.id)
    setShowLoadModal(false)
  }

  const handleDeleteScenario = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm("Delete this scenario?")) {
      await deleteFromDatabase(id)
    }
  }

  // Status indicator
  const getStatusIndicator = () => {
    if (isSaving) {
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-xs">Saving...</span>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className="flex items-center gap-2 text-blue-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-xs">Loading...</span>
        </div>
      )
    }

    if (saveError) {
      return (
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs">{saveError}</span>
        </div>
      )
    }

    if (!isDirty && lastSaved) {
      return (
        <div className="flex items-center gap-2 text-emerald-400">
          <Check className="h-4 w-4" />
          <span className="text-xs">Saved</span>
        </div>
      )
    }

    if (isDirty) {
      return (
        <div className="flex items-center gap-2 text-amber-400">
          <Cloud className="h-4 w-4" />
          <span className="text-xs">Unsaved changes</span>
        </div>
      )
    }

    return null
  }

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Status */}
        {getStatusIndicator()}

        {/* Load button */}
        {isSignedIn && (
          <button
            onClick={() => setShowLoadModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white transition-colors"
            disabled={isLoading}
          >
            <FolderOpen className="h-3.5 w-3.5" />
            Load
          </button>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={isSaving || (!isDirty && currentScenarioId !== null)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg text-sm font-medium text-white transition-colors"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isSignedIn ? (
            <Cloud className="h-4 w-4" />
          ) : (
            <CloudOff className="h-4 w-4" />
          )}
          {currentScenarioId ? "Update" : "Save"} Scenario
        </button>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              {isSignedIn ? "Save New Scenario" : "Sign in to Save"}
            </h3>

            {isSignedIn ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Scenario Name</label>
                    <input
                      type="text"
                      value={newScenarioName}
                      onChange={(e) => setNewScenarioName(e.target.value)}
                      placeholder="e.g., Phase 1 - Conservative"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Description (optional)</label>
                    <textarea
                      value={newScenarioDescription}
                      onChange={(e) => setNewScenarioDescription(e.target.value)}
                      placeholder="Notes about this scenario..."
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateScenario}
                    disabled={!newScenarioName.trim() || isSaving}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors"
                  >
                    {isSaving ? "Saving..." : "Save Scenario"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-400 text-sm mb-4">
                  Sign in to save your scenarios to the cloud. Your current settings are saved locally.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="/sign-in"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium text-white transition-colors"
                  >
                    Sign In
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Load Scenario</h3>

            {dbScenarios.length === 0 ? (
              <p className="text-slate-400 text-sm py-8 text-center">
                No saved scenarios yet. Save your current configuration to see it here.
              </p>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {dbScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => handleLoadScenario(scenario)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      currentScenarioId === scenario.id
                        ? "bg-blue-600/20 border border-blue-500/50"
                        : "bg-slate-700/50 hover:bg-slate-700 border border-transparent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {scenario.name}
                      </div>
                      {scenario.description && (
                        <div className="text-xs text-slate-400 truncate mt-0.5">
                          {scenario.description}
                        </div>
                      )}
                      <div className="text-xs text-slate-500 mt-1">
                        Updated {new Date(scenario.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteScenario(e, scenario.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLoadModal(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
