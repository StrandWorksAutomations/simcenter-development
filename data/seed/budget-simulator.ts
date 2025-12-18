// =============================================================================
// BUDGET SIMULATOR - Unified Calculation Engine
// =============================================================================
// Interactive budget calculator that updates CAPEX and OPEX in real-time
// based on user-adjustable parameters

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export interface SimulatorParameters {
  // Facility
  floorArea: number              // 2,000 - 10,000 SF
  simRooms: number               // 1 - 8 rooms
  controlRooms: number           // 1 - 4 rooms
  debriefRooms: number           // 1 - 4 rooms

  // Equipment
  highFidelityManikins: number   // 0 - 6 units
  taskTrainers: number           // 0 - 20 units
  avTier: 'basic' | 'standard' | 'premium'

  // Staffing
  coreFTE: number                // 1.0 - 5.0 FTE
  facultyAllocationPercent: number  // 0 - 50%
  trainingHoursPerYear: number   // 0 - 200 hours

  // Operations
  sessionsPerMonth: number       // 20 - 300 sessions
  opexModel: 'room-based' | 'sessions-based'
  growthRatePercent: number      // 0 - 15%
  inflationPercent: number       // 0 - 10%

  // Advanced
  qualityLevel: 'budget' | 'standard' | 'premium'
  costRegion: 'low-cost' | 'moderate-cost' | 'high-cost'
  contingencyPercent: number     // 5 - 20%
  refreshReservePercent: number  // 10 - 25%
}

export interface LineItem {
  id: string
  category: string
  name: string
  amount: number
  calculation: string
  notes?: string
}

export interface YearProjection {
  year: number
  label: string
  capex: number
  opex: number
  total: number
  cumulativeTotal: number
  sessionsPerYear: number
  costPerSession: number
}

export interface BudgetResults {
  capex: {
    total: number
    construction: number
    equipment: number
    avSystem: number
    softCosts: number
    contingency: number
    existingCredits: number
    net: number
    lineItems: LineItem[]
  }
  opex: {
    annual: number
    monthly: number
    staffing: number
    maintenance: number
    consumables: number
    software: number
    utilities: number
    refresh: number
    facultyDevelopment: number
    lineItems: LineItem[]
  }
  fiveYear: {
    totalCost: number
    totalCapex: number
    totalOpex: number
    yearByYear: YearProjection[]
  }
  metrics: {
    costPerSession: number
    costPerLearnerHour: number
    costPerRoom: number
    costPerSF: number
    totalRooms: number
    annualSessions: number
  }
}

// =============================================================================
// COST CONSTANTS
// =============================================================================

const COST_RATES = {
  // Per-SF Construction Costs
  baseConstruction: {
    budget: 200,
    standard: 300,
    premium: 400
  },
  mepUpgrades: {
    budget: 50,
    standard: 75,
    premium: 100
  },
  itSecurity: 10, // per SF, fixed

  // Per-Room Costs
  avPerRoom: {
    basic: 15000,
    standard: 30000,
    premium: 50000
  },
  furniturePerRoom: {
    budget: 8000,
    standard: 15000,
    premium: 25000
  },
  commonAreaFurniture: 40000, // fixed for common areas

  // Equipment Costs
  highFidelityManikin: 75000,  // avg cost per unit
  taskTrainer: 3500,           // avg cost per unit
  manikinMaintenance: 0.12,    // 12% of value annually

  // Staffing Costs (loaded)
  avgSalaryLoaded: 95000,      // average loaded salary
  facultyHourlyRate: 150,      // per hour for faculty time

  // OPEX Per-Room
  suppliesPerRoom: 8000,       // annual consumables per room
  utilitiesPerRoom: 3000,      // annual utilities per room

  // OPEX Per-Session
  consumablesPerSession: 45,   // supplies per session
  utilitiesPerSession: 15,     // utilities per session

  // Software & Licenses
  softwareLicenses: {
    basic: 5000,
    standard: 12000,
    premium: 25000
  },

  // Soft Costs
  softCostPercent: {
    budget: 0.20,
    standard: 0.25,
    premium: 0.30
  },

  // Region Multipliers
  regionMultiplier: {
    'low-cost': 0.85,
    'moderate-cost': 1.0,
    'high-cost': 1.3
  }
}

// Existing assets that offset costs
const EXISTING_ASSETS = {
  simman3gPlus: 75000,        // Brand new SimMan 3G Plus
  basicTrainers: 15000,        // Basic manikin trainers
  proceduralSupplies: 10000    // Value of expired hospital supplies
}

// =============================================================================
// DEFAULT PARAMETERS
// =============================================================================

export const defaultParameters: SimulatorParameters = {
  // Facility
  floorArea: 4000,
  simRooms: 3,
  controlRooms: 1,
  debriefRooms: 2,

  // Equipment
  highFidelityManikins: 2,
  taskTrainers: 5,
  avTier: 'standard',

  // Staffing
  coreFTE: 2.5,
  facultyAllocationPercent: 20,
  trainingHoursPerYear: 40,

  // Operations
  sessionsPerMonth: 120,
  opexModel: 'room-based',
  growthRatePercent: 5,
  inflationPercent: 3,

  // Advanced
  qualityLevel: 'standard',
  costRegion: 'moderate-cost',
  contingencyPercent: 10,
  refreshReservePercent: 15
}

// =============================================================================
// PREDEFINED SCENARIOS
// =============================================================================

export interface Scenario {
  id: string
  name: string
  description: string
  params: Partial<SimulatorParameters>
}

export const predefinedScenarios: Scenario[] = [
  {
    id: 'base',
    name: 'BHL Base',
    description: '3-room center with standard equipment',
    params: {
      floorArea: 4000,
      simRooms: 3,
      controlRooms: 1,
      debriefRooms: 2,
      highFidelityManikins: 2,
      taskTrainers: 5,
      avTier: 'standard',
      qualityLevel: 'standard',
      coreFTE: 2.5
    }
  },
  {
    id: 'enhanced',
    name: 'Enhanced',
    description: '5-room center with premium A/V',
    params: {
      floorArea: 6000,
      simRooms: 5,
      controlRooms: 2,
      debriefRooms: 3,
      highFidelityManikins: 4,
      taskTrainers: 10,
      avTier: 'premium',
      qualityLevel: 'standard',
      coreFTE: 3.5
    }
  },
  {
    id: 'budget',
    name: 'Budget',
    description: '2-room center with basic setup',
    params: {
      floorArea: 2500,
      simRooms: 2,
      controlRooms: 1,
      debriefRooms: 1,
      highFidelityManikins: 1,
      taskTrainers: 3,
      avTier: 'basic',
      qualityLevel: 'budget',
      coreFTE: 2.0
    }
  },
  {
    id: 'expansion',
    name: 'Full Expansion',
    description: '8-room flagship center',
    params: {
      floorArea: 10000,
      simRooms: 8,
      controlRooms: 4,
      debriefRooms: 4,
      highFidelityManikins: 6,
      taskTrainers: 20,
      avTier: 'premium',
      qualityLevel: 'premium',
      coreFTE: 5.0
    }
  }
]

// =============================================================================
// CALCULATION ENGINE
// =============================================================================

export function calculateBudget(params: SimulatorParameters): BudgetResults {
  const regionMult = COST_RATES.regionMultiplier[params.costRegion]
  const totalRooms = params.simRooms + params.controlRooms + params.debriefRooms

  // =========================================================================
  // CAPEX CALCULATIONS
  // =========================================================================

  const capexLineItems: LineItem[] = []

  // 1. Base Construction (per SF)
  const baseConstructionRate = COST_RATES.baseConstruction[params.qualityLevel]
  const baseConstruction = params.floorArea * baseConstructionRate * regionMult
  capexLineItems.push({
    id: 'base-construction',
    category: 'Construction',
    name: 'Base Building/Renovation',
    amount: baseConstruction,
    calculation: `${params.floorArea.toLocaleString()} SF × $${baseConstructionRate} × ${regionMult}`,
    notes: `${params.qualityLevel} quality, ${params.costRegion} region`
  })

  // 2. MEP Upgrades (per SF)
  const mepRate = COST_RATES.mepUpgrades[params.qualityLevel]
  const mepUpgrades = params.floorArea * mepRate * regionMult
  capexLineItems.push({
    id: 'mep-upgrades',
    category: 'Construction',
    name: 'MEP Upgrades',
    amount: mepUpgrades,
    calculation: `${params.floorArea.toLocaleString()} SF × $${mepRate} × ${regionMult}`,
    notes: 'Mechanical, Electrical, Plumbing'
  })

  // 3. IT & Security (per SF)
  const itSecurity = params.floorArea * COST_RATES.itSecurity * regionMult
  capexLineItems.push({
    id: 'it-security',
    category: 'Construction',
    name: 'IT & Security Infrastructure',
    amount: itSecurity,
    calculation: `${params.floorArea.toLocaleString()} SF × $${COST_RATES.itSecurity} × ${regionMult}`
  })

  const constructionTotal = baseConstruction + mepUpgrades + itSecurity

  // 4. A/V System (per sim room)
  const avRatePerRoom = COST_RATES.avPerRoom[params.avTier]
  const avSystem = params.simRooms * avRatePerRoom
  capexLineItems.push({
    id: 'av-system',
    category: 'Equipment',
    name: 'A/V Capture & Recording',
    amount: avSystem,
    calculation: `${params.simRooms} rooms × $${avRatePerRoom.toLocaleString()}`,
    notes: `${params.avTier} tier system`
  })

  // 5. High-Fidelity Manikins
  const manikinCost = params.highFidelityManikins * COST_RATES.highFidelityManikin
  capexLineItems.push({
    id: 'high-fidelity',
    category: 'Equipment',
    name: 'High-Fidelity Manikins',
    amount: manikinCost,
    calculation: `${params.highFidelityManikins} units × $${COST_RATES.highFidelityManikin.toLocaleString()}`,
    notes: 'SimMan, HAL, or equivalent'
  })

  // 6. Task Trainers
  const taskTrainerCost = params.taskTrainers * COST_RATES.taskTrainer
  capexLineItems.push({
    id: 'task-trainers',
    category: 'Equipment',
    name: 'Task Trainers',
    amount: taskTrainerCost,
    calculation: `${params.taskTrainers} units × $${COST_RATES.taskTrainer.toLocaleString()}`,
    notes: 'IV arms, intubation heads, etc.'
  })

  const equipmentTotal = avSystem + manikinCost + taskTrainerCost

  // 7. Furniture & Fixtures (per room + common areas)
  const furnitureRate = COST_RATES.furniturePerRoom[params.qualityLevel]
  const furnitureCost = (totalRooms * furnitureRate) + COST_RATES.commonAreaFurniture
  capexLineItems.push({
    id: 'furniture',
    category: 'Equipment',
    name: 'Furniture & Fixtures',
    amount: furnitureCost,
    calculation: `(${totalRooms} rooms × $${furnitureRate.toLocaleString()}) + $${COST_RATES.commonAreaFurniture.toLocaleString()} common`,
    notes: 'Hospital beds, desks, chairs, storage'
  })

  // 8. Soft Costs
  const hardCosts = constructionTotal + equipmentTotal + furnitureCost
  const softCostRate = COST_RATES.softCostPercent[params.qualityLevel]
  const softCosts = hardCosts * softCostRate
  capexLineItems.push({
    id: 'soft-costs',
    category: 'Soft Costs',
    name: 'Design, Permits, Fees',
    amount: softCosts,
    calculation: `$${hardCosts.toLocaleString()} × ${(softCostRate * 100).toFixed(0)}%`,
    notes: 'Architecture, engineering, permits, inspections'
  })

  // 9. Contingency
  const subtotal = hardCosts + softCosts
  const contingency = subtotal * (params.contingencyPercent / 100)
  capexLineItems.push({
    id: 'contingency',
    category: 'Contingency',
    name: 'Contingency Reserve',
    amount: contingency,
    calculation: `$${subtotal.toLocaleString()} × ${params.contingencyPercent}%`,
    notes: 'Buffer for unforeseen costs'
  })

  // 10. Existing Asset Credits
  const existingCredits = EXISTING_ASSETS.simman3gPlus + EXISTING_ASSETS.basicTrainers + EXISTING_ASSETS.proceduralSupplies
  capexLineItems.push({
    id: 'existing-credits',
    category: 'Credits',
    name: 'Existing Equipment Credit',
    amount: -existingCredits,
    calculation: `SimMan 3G Plus ($${EXISTING_ASSETS.simman3gPlus.toLocaleString()}) + trainers + supplies`,
    notes: 'Equipment BHL already owns'
  })

  const capexTotal = subtotal + contingency
  const capexNet = capexTotal - existingCredits

  // =========================================================================
  // OPEX CALCULATIONS
  // =========================================================================

  const opexLineItems: LineItem[] = []

  // 1. Staffing (largest OPEX driver)
  const staffingCost = params.coreFTE * COST_RATES.avgSalaryLoaded
  opexLineItems.push({
    id: 'staffing',
    category: 'Staffing',
    name: 'Core Staff',
    amount: staffingCost,
    calculation: `${params.coreFTE} FTE × $${COST_RATES.avgSalaryLoaded.toLocaleString()}`,
    notes: 'Director, coordinator, admin (loaded costs)'
  })

  // 2. Faculty Development
  const facultyHours = params.trainingHoursPerYear * (params.facultyAllocationPercent / 100) * 15 // 15 faculty members
  const facultyDevelopment = facultyHours * COST_RATES.facultyHourlyRate
  opexLineItems.push({
    id: 'faculty-development',
    category: 'Staffing',
    name: 'Faculty Development',
    amount: facultyDevelopment,
    calculation: `${facultyHours.toFixed(0)} hours × $${COST_RATES.facultyHourlyRate}`,
    notes: 'Training, certification, faculty time'
  })

  const staffingTotal = staffingCost + facultyDevelopment

  // 3. Maintenance
  const equipmentValue = manikinCost + taskTrainerCost
  const maintenanceCost = equipmentValue * COST_RATES.manikinMaintenance
  opexLineItems.push({
    id: 'maintenance',
    category: 'Operations',
    name: 'Equipment Maintenance',
    amount: maintenanceCost,
    calculation: `$${equipmentValue.toLocaleString()} × ${(COST_RATES.manikinMaintenance * 100).toFixed(0)}%`,
    notes: 'Service contracts, repairs, calibration'
  })

  // 4. Consumables (depends on OPEX model)
  let consumablesCost: number
  let consumablesCalc: string
  if (params.opexModel === 'sessions-based') {
    const annualSessions = params.sessionsPerMonth * 12
    consumablesCost = annualSessions * COST_RATES.consumablesPerSession
    consumablesCalc = `${annualSessions.toLocaleString()} sessions × $${COST_RATES.consumablesPerSession}`
  } else {
    consumablesCost = params.simRooms * COST_RATES.suppliesPerRoom
    consumablesCalc = `${params.simRooms} rooms × $${COST_RATES.suppliesPerRoom.toLocaleString()}`
  }
  opexLineItems.push({
    id: 'consumables',
    category: 'Operations',
    name: 'Consumable Supplies',
    amount: consumablesCost,
    calculation: consumablesCalc,
    notes: `${params.opexModel} model`
  })

  // 5. Utilities
  let utilitiesCost: number
  let utilitiesCalc: string
  if (params.opexModel === 'sessions-based') {
    const annualSessions = params.sessionsPerMonth * 12
    utilitiesCost = annualSessions * COST_RATES.utilitiesPerSession
    utilitiesCalc = `${annualSessions.toLocaleString()} sessions × $${COST_RATES.utilitiesPerSession}`
  } else {
    utilitiesCost = params.simRooms * COST_RATES.utilitiesPerRoom
    utilitiesCalc = `${params.simRooms} rooms × $${COST_RATES.utilitiesPerRoom.toLocaleString()}`
  }
  opexLineItems.push({
    id: 'utilities',
    category: 'Operations',
    name: 'Utilities & Facility',
    amount: utilitiesCost,
    calculation: utilitiesCalc,
    notes: 'Electricity, HVAC, cleaning'
  })

  // 6. Software Licenses
  const softwareCost = COST_RATES.softwareLicenses[params.avTier]
  opexLineItems.push({
    id: 'software',
    category: 'Technology',
    name: 'Software & Licenses',
    amount: softwareCost,
    calculation: `${params.avTier} tier: $${softwareCost.toLocaleString()}`,
    notes: 'LMS, video management, scheduling'
  })

  // 7. Capital Refresh Reserve
  const refreshReserve = equipmentTotal * (params.refreshReservePercent / 100)
  opexLineItems.push({
    id: 'refresh-reserve',
    category: 'Reserve',
    name: 'Capital Refresh Reserve',
    amount: refreshReserve,
    calculation: `$${equipmentTotal.toLocaleString()} × ${params.refreshReservePercent}%`,
    notes: 'Annual set-aside for equipment replacement'
  })

  const opexAnnual = staffingTotal + maintenanceCost + consumablesCost + utilitiesCost + softwareCost + refreshReserve
  const opexMonthly = opexAnnual / 12

  // =========================================================================
  // 5-YEAR PROJECTION
  // =========================================================================

  const yearByYear: YearProjection[] = []
  let cumulativeTotal = 0
  const annualSessions = params.sessionsPerMonth * 12

  for (let year = 1; year <= 5; year++) {
    const inflationMult = Math.pow(1 + params.inflationPercent / 100, year - 1)
    const growthMult = Math.pow(1 + params.growthRatePercent / 100, year - 1)

    const yearCapex = year === 1 ? capexNet : 0 // CAPEX only in year 1
    const yearOpex = opexAnnual * inflationMult
    const yearSessions = Math.round(annualSessions * growthMult)
    const yearTotal = yearCapex + yearOpex
    cumulativeTotal += yearTotal

    yearByYear.push({
      year,
      label: `Year ${year}`,
      capex: yearCapex,
      opex: yearOpex,
      total: yearTotal,
      cumulativeTotal,
      sessionsPerYear: yearSessions,
      costPerSession: yearOpex / yearSessions
    })
  }

  const fiveYearTotalOpex = yearByYear.reduce((sum, y) => sum + y.opex, 0)
  const fiveYearTotal = capexNet + fiveYearTotalOpex

  // =========================================================================
  // METRICS
  // =========================================================================

  const costPerSession = opexAnnual / annualSessions
  const avgLearnersPerSession = 4 // Assume 4 learners per session
  const avgSessionHours = 2       // Assume 2 hours per session
  const learnerHours = annualSessions * avgLearnersPerSession * avgSessionHours
  const costPerLearnerHour = opexAnnual / learnerHours

  // =========================================================================
  // RETURN RESULTS
  // =========================================================================

  return {
    capex: {
      total: capexTotal,
      construction: constructionTotal,
      equipment: equipmentTotal + furnitureCost,
      avSystem,
      softCosts,
      contingency,
      existingCredits,
      net: capexNet,
      lineItems: capexLineItems
    },
    opex: {
      annual: opexAnnual,
      monthly: opexMonthly,
      staffing: staffingTotal,
      maintenance: maintenanceCost,
      consumables: consumablesCost,
      software: softwareCost,
      utilities: utilitiesCost,
      refresh: refreshReserve,
      facultyDevelopment,
      lineItems: opexLineItems
    },
    fiveYear: {
      totalCost: fiveYearTotal,
      totalCapex: capexNet,
      totalOpex: fiveYearTotalOpex,
      yearByYear
    },
    metrics: {
      costPerSession,
      costPerLearnerHour,
      costPerRoom: capexNet / totalRooms,
      costPerSF: capexNet / params.floorArea,
      totalRooms,
      annualSessions
    }
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`
  }
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

export function formatCurrencyFull(value: number): string {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}

export function getScenarioByParams(params: SimulatorParameters): BudgetResults {
  return calculateBudget(params)
}

export function compareScenarios(
  current: SimulatorParameters,
  scenarios: Scenario[]
): Array<{ scenario: Scenario; results: BudgetResults; deltaFromCurrent: number }> {
  const currentResults = calculateBudget(current)

  return scenarios.map(scenario => {
    const mergedParams = { ...current, ...scenario.params }
    const results = calculateBudget(mergedParams)
    return {
      scenario,
      results,
      deltaFromCurrent: results.fiveYear.totalCost - currentResults.fiveYear.totalCost
    }
  })
}

// =============================================================================
// ROI CALCULATION ENGINE
// =============================================================================

import {
  ROICalculationParams,
  ROIResults,
  ROI_METRICS,
  ROI_CITATIONS,
  ASSET_ROI_ATTRIBUTION,
  ROI_CATEGORY_INFO,
  ASSET_DISPLAY_INFO,
  DEFAULT_ROI_PARAMS,
  type ROICategory,
  type AssetType,
  type EvidenceCitation
} from './roi-evidence'

// Re-export ROI types for convenience
export type { ROICalculationParams, ROIResults, ROICategory, AssetType }
export { DEFAULT_ROI_PARAMS }

/**
 * Calculate ROI projections based on simulation parameters and organization data
 */
export function calculateROI(
  params: SimulatorParameters,
  results: BudgetResults,
  roiParams: ROICalculationParams = DEFAULT_ROI_PARAMS
): ROIResults {
  // =========================================================================
  // 1. CALCULATE SAVINGS BY CATEGORY
  // =========================================================================

  const categoryResults: ROIResults['byCategory'] = []

  // --- NURSE RETENTION ---
  // Target: reduce turnover from current rate to 8% (92% retention)
  const turnoverReduction = Math.max(0, roiParams.currentTurnoverRate - 0.08)
  const nursesNotTurning = roiParams.totalRNs * turnoverReduction
  const nurseRetentionSavings = nursesNotTurning * roiParams.avgRNTurnoverCost

  categoryResults.push({
    category: 'nurse-retention',
    name: ROI_CATEGORY_INFO['nurse-retention'].name,
    annualSavings: nurseRetentionSavings,
    fiveYearSavings: nurseRetentionSavings * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'nurse-retention')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'high'
  })

  // --- CODE BLUE ---
  // Survival improvement: 21% to 45%
  const survivalImprovement = 0.45 - roiParams.currentCodeBlueSurvival
  const additionalSurvivors = roiParams.annualCodeBlueEvents * survivalImprovement
  // Value of life saved (conservative: avoided malpractice + reputation)
  const codeBlueValue = additionalSurvivors * 150000

  categoryResults.push({
    category: 'code-blue',
    name: ROI_CATEGORY_INFO['code-blue'].name,
    annualSavings: codeBlueValue,
    fiveYearSavings: codeBlueValue * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'code-blue')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'high'
  })

  // --- MEDICATION ERRORS ---
  // 87% reduction in medication errors
  const errorReduction = 0.87
  const errorsAvoided = roiParams.annualMedicationErrors * errorReduction
  const medErrorSavings = errorsAvoided * roiParams.avgMedicationErrorCost

  categoryResults.push({
    category: 'medication-errors',
    name: ROI_CATEGORY_INFO['medication-errors'].name,
    annualSavings: medErrorSavings,
    fiveYearSavings: medErrorSavings * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'medication-errors')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'high'
  })

  // --- CLABSI PREVENTION ---
  // 55% reduction in CLABSI
  const clabsiBaseline = (roiParams.centralLineDays / 1000) * roiParams.annualCLABSIRate
  const clabsiReduction = 0.55
  const clabsiAvoided = clabsiBaseline * clabsiReduction
  const clabsiSavings = clabsiAvoided * roiParams.avgCLABSICost

  categoryResults.push({
    category: 'infection-prevention',
    name: ROI_CATEGORY_INFO['infection-prevention'].name,
    annualSavings: clabsiSavings,
    fiveYearSavings: clabsiSavings * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'infection-prevention')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'high'
  })

  // --- MALPRACTICE ---
  // 12.5% premium discount (midpoint of 6-19%)
  const premiumDiscount = 0.125
  const malpracticeSavings = roiParams.malpracticePremium * premiumDiscount

  categoryResults.push({
    category: 'malpractice',
    name: ROI_CATEGORY_INFO['malpractice'].name,
    annualSavings: malpracticeSavings,
    fiveYearSavings: malpracticeSavings * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'malpractice')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'high'
  })

  // --- MAGNET STATUS ---
  // $115 more per discharge if pursuing Magnet
  const magnetRevenue = roiParams.pursuingMagnet
    ? roiParams.annualDischarges * 115
    : 0

  categoryResults.push({
    category: 'magnet-status',
    name: ROI_CATEGORY_INFO['magnet-status'].name,
    annualSavings: magnetRevenue,
    fiveYearSavings: magnetRevenue * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'magnet-status')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: roiParams.pursuingMagnet ? 'moderate' : 'low'
  })

  // --- ONBOARDING EFFICIENCY ---
  // 20% reduction in orientation time, ~$14K savings per new hire
  // Estimate 10% of RNs are new hires annually
  const newHires = roiParams.totalRNs * 0.10
  const onboardingSavingsPerHire = 70000 * 0.20 // 20% of $70K orientation
  const onboardingSavings = newHires * onboardingSavingsPerHire

  categoryResults.push({
    category: 'onboarding-efficiency',
    name: ROI_CATEGORY_INFO['onboarding-efficiency'].name,
    annualSavings: onboardingSavings,
    fiveYearSavings: onboardingSavings * 5,
    citations: ROI_METRICS
      .filter(m => m.category === 'onboarding-efficiency')
      .flatMap(m => m.citations)
      .map(id => ROI_CITATIONS.find(c => c.id === id))
      .filter((c): c is EvidenceCitation => c !== undefined),
    confidence: 'moderate'
  })

  // =========================================================================
  // 2. CALCULATE ASSET CONTRIBUTIONS
  // =========================================================================

  const totalAnnualSavings = categoryResults.reduce((sum, c) => sum + c.annualSavings, 0)

  // Map assets from parameters to their types
  const assetCounts: Partial<Record<AssetType, { count: number; cost: number }>> = {
    'high-fidelity-manikin': {
      count: params.highFidelityManikins,
      cost: params.highFidelityManikins * 75000
    },
    'task-trainer': {
      count: params.taskTrainers,
      cost: params.taskTrainers * 3500
    },
    'sim-room': {
      count: params.simRooms,
      cost: params.simRooms * 100000 // Approximate per-room cost
    },
    'control-room': {
      count: params.controlRooms,
      cost: params.controlRooms * 30000
    },
    'debrief-room': {
      count: params.debriefRooms,
      cost: params.debriefRooms * 25000
    },
    'core-staff-fte': {
      count: params.coreFTE,
      cost: params.coreFTE * 95000
    },
    'av-system': {
      count: params.simRooms,
      cost: results.capex.avSystem
    },
    'software-license': {
      count: 1,
      cost: results.opex.software
    }
  }

  const assetResults: ROIResults['byAsset'] = []

  for (const [assetType, assetData] of Object.entries(assetCounts)) {
    if (!assetData || assetData.count === 0) continue

    const attributions = ASSET_ROI_ATTRIBUTION[assetType as AssetType] || []
    let assetAnnualContribution = 0

    // Sum up this asset's contribution to each ROI category
    for (const attr of attributions) {
      const categoryResult = categoryResults.find(c => {
        const metric = ROI_METRICS.find(m => m.id === attr.metricId)
        return metric && c.category === metric.category
      })
      if (categoryResult) {
        assetAnnualContribution += categoryResult.annualSavings * attr.attribution
      }
    }

    // Calculate payback for this asset
    const assetPayback = assetData.cost > 0 && assetAnnualContribution > 0
      ? Math.ceil((assetData.cost / assetAnnualContribution) * 12)
      : null

    assetResults.push({
      assetType: assetType as AssetType,
      name: ASSET_DISPLAY_INFO[assetType as AssetType]?.name || assetType,
      annualContribution: assetAnnualContribution,
      fiveYearContribution: assetAnnualContribution * 5,
      paybackMonths: assetPayback
    })
  }

  // Sort by contribution (highest first)
  assetResults.sort((a, b) => b.annualContribution - a.annualContribution)

  // =========================================================================
  // 3. CALCULATE FINANCIAL METRICS
  // =========================================================================

  const totalFiveYearSavings = calculateNPV(totalAnnualSavings, roiParams.discountRate, 5)
  const fiveYearCosts = results.fiveYear.totalCost
  const netROI = totalFiveYearSavings - fiveYearCosts
  const roiPercent = fiveYearCosts > 0 ? ((totalFiveYearSavings - fiveYearCosts) / fiveYearCosts) * 100 : 0
  const paybackPeriodMonths = calculatePaybackPeriod(results.capex.net, totalAnnualSavings / 12)

  // Calculate IRR
  const cashFlows = [
    -results.capex.net,
    totalAnnualSavings - results.opex.annual,
    totalAnnualSavings - results.opex.annual * 1.03,
    totalAnnualSavings - results.opex.annual * 1.0609,
    totalAnnualSavings - results.opex.annual * 1.0927,
    totalAnnualSavings - results.opex.annual * 1.1255
  ]
  const irr = calculateIRR(cashFlows)

  // =========================================================================
  // 4. GENERATE VALUE TIMELINE
  // =========================================================================

  const valueTimeline: ROIResults['valueTimeline'] = []
  let cumulativeCost = 0
  let cumulativeSavings = 0

  for (let year = 1; year <= 5; year++) {
    const inflationMult = Math.pow(1.03, year - 1)
    const yearCost = year === 1
      ? results.capex.net + results.opex.annual
      : results.opex.annual * inflationMult
    const yearSavings = totalAnnualSavings * inflationMult

    cumulativeCost += yearCost
    cumulativeSavings += yearSavings

    valueTimeline.push({
      year,
      cumulativeCost,
      cumulativeSavings,
      netPosition: cumulativeSavings - cumulativeCost
    })
  }

  // =========================================================================
  // 5. RETURN RESULTS
  // =========================================================================

  return {
    summary: {
      totalAnnualSavings,
      totalFiveYearSavings,
      netROI,
      roiPercent,
      paybackPeriodMonths,
      npv: netROI,
      irr
    },
    byCategory: categoryResults,
    byAsset: assetResults,
    valueTimeline,
    confidenceRange: {
      conservative: totalAnnualSavings * 0.7,
      baseline: totalAnnualSavings,
      optimistic: totalAnnualSavings * 1.3
    }
  }
}

// =============================================================================
// FINANCIAL HELPER FUNCTIONS
// =============================================================================

/**
 * Calculate Net Present Value of annual savings
 */
function calculateNPV(annualValue: number, rate: number, years: number): number {
  let npv = 0
  for (let t = 1; t <= years; t++) {
    npv += annualValue / Math.pow(1 + rate, t)
  }
  return npv
}

/**
 * Calculate payback period in months
 */
function calculatePaybackPeriod(initialInvestment: number, monthlyBenefit: number): number {
  if (monthlyBenefit <= 0) return Infinity
  return Math.ceil(initialInvestment / monthlyBenefit)
}

/**
 * Calculate Internal Rate of Return using Newton-Raphson method
 */
function calculateIRR(cashFlows: number[], guess: number = 0.1): number {
  const maxIterations = 100
  const tolerance = 0.0001
  let rate = guess

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0
    let dnpv = 0

    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + rate, t)
      if (t > 0) {
        dnpv -= t * cashFlows[t] / Math.pow(1 + rate, t + 1)
      }
    }

    if (Math.abs(dnpv) < tolerance) break

    const newRate = rate - npv / dnpv

    if (Math.abs(newRate - rate) < tolerance) {
      return Math.round(newRate * 10000) / 100 // Return as percentage with 2 decimals
    }

    rate = newRate

    // Clamp to reasonable range
    if (rate < -0.99) rate = -0.99
    if (rate > 10) rate = 10
  }

  return Math.round(rate * 10000) / 100
}
