// Central Project Data Hub
// Aggregates data from all prompt-specific files into unified project view
// This file is the single source of truth for project-wide metrics

import {
  csiDivisions,
  equipmentCategories,
  projectMilestones,
  constructionRisks,
  alternateItems,
  projectCostSummary,
  type ProjectMilestone,
  type ProjectRisk as ConstructionRisk
} from './construction'

import {
  coreStaffingModel,
  facultyPoolModel,
  trainingCosts,
  opexCategories,
  centerProfiles,
  staffingCostSummary,
  calculate5YearProjection
} from './staffing'

import {
  riskRegister,
  riskSummary,
  complianceChecklist,
  type Risk as OperationalRisk
} from './risks'

import {
  equipmentCatalog,
  equipmentPackages,
  vendors
} from './equipment'

import {
  avEquipmentBudget,
  avBudgetSummary,
  securityControls as avSecurityControls,
  avSummary
} from './av-architecture'

// =============================================================================
// PROJECT STATUS & PHASES
// =============================================================================

export type ProjectPhase = 'planning' | 'design' | 'procurement' | 'construction' | 'installation' | 'training' | 'operational'

export interface ProjectStatus {
  currentPhase: ProjectPhase
  overallProgress: number // 0-100
  startDate: string | null
  targetGoLive: string | null
  daysRemaining: number | null
}

export const projectStatus: ProjectStatus = {
  currentPhase: 'planning',
  overallProgress: 15,
  startDate: null,
  targetGoLive: null,
  daysRemaining: null
}

// =============================================================================
// UNIFIED BUDGET MODEL
// =============================================================================

export interface BudgetCategory {
  id: string
  name: string
  category: 'capital' | 'equipment' | 'staffing' | 'opex' | 'contingency'
  amount: number
  source: string // Which prompt/data file
  description: string
}

export interface BudgetSummary {
  categories: BudgetCategory[]
  totalCapital: number
  totalEquipment: number
  totalStaffingYear1: number
  totalOpexYear1: number
  totalPhase1: number
  total5Year: number
}

// Aggregate all budget data
export function calculateBudgetSummary(): BudgetSummary {
  // Capital costs (from construction.ts)
  const constructionSubtotal = csiDivisions.reduce((sum, d) => sum + d.estimatedCost, 0)
  const contingency = Math.round(constructionSubtotal * 0.10)
  const constructionTotal = constructionSubtotal + contingency

  // Equipment costs (from construction.ts and equipment.ts)
  const simulatorsCost = equipmentCategories.find(e => e.id === 'simulators')?.estimatedCost || 150000

  // A/V system cost (from av-architecture.ts - more detailed)
  const avSystemCost = avBudgetSummary.totalInitial || 114000
  const equipmentTotal = simulatorsCost + avSystemCost

  // Staffing costs (from staffing.ts)
  const staffingYear1 = staffingCostSummary.totalYear1Cost

  // OPEX Year 1 (from staffing.ts - using medium center profile)
  const mediumCenterOpex = centerProfiles.find(p => p.id === 'medium')?.annualOpex || 420000

  // 5-year projection
  const projection5Year = calculate5YearProjection('medium')
  const total5YearOpex = projection5Year.reduce((sum, y) => sum + y.total, 0)

  const categories: BudgetCategory[] = [
    // Capital
    {
      id: 'construction',
      name: 'Construction & Renovation',
      category: 'capital',
      amount: constructionSubtotal,
      source: 'Prompt 4 - Construction',
      description: 'CSI Divisions 01-28: Demolition, finishes, MEP, IT infrastructure'
    },
    {
      id: 'contingency',
      name: 'Construction Contingency',
      category: 'contingency',
      amount: contingency,
      source: 'Prompt 4 - Construction',
      description: '10% reserve for unforeseen conditions'
    },
    // Equipment
    {
      id: 'simulators',
      name: 'Patient Simulators',
      category: 'equipment',
      amount: simulatorsCost,
      source: 'Prompt 4/7 - Equipment',
      description: 'High-fidelity manikins (adult, OB, pediatric)'
    },
    {
      id: 'av-system',
      name: 'A/V Recording System',
      category: 'equipment',
      amount: avSystemCost,
      source: 'Prompt 5 - A/V Architecture',
      description: 'IVS VALT/SimCapture, cameras, mics, network, installation'
    },
    // Staffing Year 1
    {
      id: 'staffing-year1',
      name: 'Staffing Year 1',
      category: 'staffing',
      amount: staffingYear1,
      source: 'Prompt 10/11 - Staffing',
      description: 'Director, Coordinator, Admin (2.5 FTE incremental)'
    },
    // OPEX Year 1
    {
      id: 'opex-year1',
      name: 'Operating Expenses Year 1',
      category: 'opex',
      amount: mediumCenterOpex,
      source: 'Prompt 10/11 - OPEX',
      description: 'Maintenance, supplies, software, utilities, training'
    }
  ]

  return {
    categories,
    totalCapital: constructionTotal,
    totalEquipment: equipmentTotal,
    totalStaffingYear1: staffingYear1,
    totalOpexYear1: mediumCenterOpex,
    totalPhase1: constructionTotal + equipmentTotal,
    total5Year: constructionTotal + equipmentTotal + total5YearOpex
  }
}

// =============================================================================
// UNIFIED TIMELINE
// =============================================================================

export interface TimelinePhase {
  id: string
  name: string
  startMonth: number
  endMonth: number
  status: 'not_started' | 'in_progress' | 'completed'
  milestones: string[]
  source: string
}

export function getUnifiedTimeline(): TimelinePhase[] {
  return [
    {
      id: 'planning',
      name: 'Planning & Design',
      startMonth: 0,
      endMonth: 2,
      status: 'in_progress',
      milestones: ['Project kickoff', 'Schematic design', 'Permit submission'],
      source: 'Prompt 3/4'
    },
    {
      id: 'procurement',
      name: 'Procurement & Bidding',
      startMonth: 3,
      endMonth: 3,
      status: 'not_started',
      milestones: ['Contractor selection', 'Equipment orders placed'],
      source: 'Prompt 4'
    },
    {
      id: 'construction',
      name: 'Construction',
      startMonth: 4,
      endMonth: 7,
      status: 'not_started',
      milestones: ['ICRA setup', 'Demo complete', 'Rough-in inspections', 'Substantial completion'],
      source: 'Prompt 4'
    },
    {
      id: 'installation',
      name: 'Systems Installation',
      startMonth: 8,
      endMonth: 8,
      status: 'not_started',
      milestones: ['A/V system live', 'Equipment installed', 'Commissioning complete'],
      source: 'Prompt 4/5'
    },
    {
      id: 'training',
      name: 'Staff Training',
      startMonth: 9,
      endMonth: 9,
      status: 'not_started',
      milestones: ['Soft opening', 'Staff certification', 'Dry-run simulations'],
      source: 'Prompt 10'
    },
    {
      id: 'golive',
      name: 'Go-Live',
      startMonth: 10,
      endMonth: 10,
      status: 'not_started',
      milestones: ['Grand opening', 'First training sessions', 'Documentation handover'],
      source: 'Prompt 4'
    }
  ]
}

// =============================================================================
// UNIFIED RISK REGISTER
// =============================================================================

export interface UnifiedRisk {
  id: string
  category: string
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  probability: 'low' | 'medium' | 'high'
  riskScore: number
  mitigation: string
  status: string
  source: string
}

export function getUnifiedRisks(): UnifiedRisk[] {
  const risks: UnifiedRisk[] = []

  // Construction risks (from construction.ts)
  constructionRisks.forEach(risk => {
    risks.push({
      id: risk.id,
      category: risk.category,
      title: risk.risk,
      description: risk.risk,
      impact: risk.impact,
      probability: risk.probability,
      riskScore: calculateRiskScore(risk.impact, risk.probability),
      mitigation: risk.mitigation,
      status: risk.status,
      source: 'Prompt 4 - Construction'
    })
  })

  // Operational/compliance risks (from risks.ts)
  riskRegister.forEach(risk => {
    risks.push({
      id: risk.id,
      category: risk.category,
      title: risk.title,
      description: risk.description,
      impact: risk.impact,
      probability: risk.probability,
      riskScore: risk.riskScore,
      mitigation: risk.mitigation,
      status: risk.status,
      source: 'Prompt 15 - Risk Management'
    })
  })

  return risks.sort((a, b) => b.riskScore - a.riskScore)
}

function calculateRiskScore(impact: string, probability: string): number {
  const impactScore: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 }
  const probScore: Record<string, number> = { low: 1, medium: 2, high: 3 }
  return (impactScore[impact] || 1) * (probScore[probability] || 1)
}

// =============================================================================
// PROJECT METRICS DASHBOARD
// =============================================================================

export interface ProjectMetrics {
  // Budget metrics
  totalBudget: number
  budgetBreakdown: {
    construction: number
    equipment: number
    staffing: number
    opex: number
  }

  // Timeline metrics
  totalDuration: number // months
  currentMonth: number
  phasesComplete: number
  phasesTotal: number

  // Risk metrics
  totalRisks: number
  highRisks: number
  criticalRisks: number
  mitigatedRisks: number

  // Staffing metrics
  incrementalFte: number
  reallocatedFte: number
  totalFte: number

  // Facility metrics
  simRooms: number
  controlRooms: number
  supportSpaces: number
}

export function getProjectMetrics(): ProjectMetrics {
  const budget = calculateBudgetSummary()
  const timeline = getUnifiedTimeline()
  const risks = getUnifiedRisks()

  const incrementalFte = coreStaffingModel.reduce((sum, s) => sum + s.fte, 0)
  const reallocatedFte = facultyPoolModel.totalFte

  return {
    // Budget
    totalBudget: budget.totalPhase1,
    budgetBreakdown: {
      construction: budget.totalCapital,
      equipment: budget.totalEquipment,
      staffing: budget.totalStaffingYear1,
      opex: budget.totalOpexYear1
    },

    // Timeline
    totalDuration: 12,
    currentMonth: 1,
    phasesComplete: 0,
    phasesTotal: timeline.length,

    // Risks
    totalRisks: risks.length,
    highRisks: risks.filter(r => r.impact === 'high').length,
    criticalRisks: risks.filter(r => r.impact === 'critical').length,
    mitigatedRisks: risks.filter(r => r.status === 'mitigating' || r.status === 'resolved').length,

    // Staffing
    incrementalFte,
    reallocatedFte,
    totalFte: incrementalFte + reallocatedFte,

    // Facility
    simRooms: 3,
    controlRooms: 1,
    supportSpaces: 3 // debrief, storage, tech workshop
  }
}

// =============================================================================
// PROMPT COMPLETION TRACKING
// =============================================================================

export interface PromptStatus {
  id: string
  number: number
  title: string
  status: 'complete' | 'in_progress' | 'pending'
  dataFile: string | null
  pageRoute: string | null
  description: string
}

export const promptStatuses: PromptStatus[] = [
  // Phase 1: Planning & Design
  { id: 'prompt-1', number: 1, title: 'Benchmarking Study', status: 'complete', dataFile: 'benchmarks.ts', pageRoute: '/benchmarks', description: 'Best-in-class sim centers analysis' },
  { id: 'prompt-2', number: 2, title: 'Space Programming', status: 'pending', dataFile: null, pageRoute: null, description: 'Build typologies and space requirements' },
  { id: 'prompt-3', number: 3, title: 'Build Process', status: 'pending', dataFile: null, pageRoute: null, description: 'Concept → design → construction → go-live' },

  // Phase 2: Construction & Budget
  { id: 'prompt-4', number: 4, title: 'Construction Estimate', status: 'complete', dataFile: 'construction.ts', pageRoute: '/construction', description: 'ROM budget by CSI division' },
  { id: 'prompt-5', number: 5, title: 'A/V & IT Architecture', status: 'complete', dataFile: 'av-architecture.ts', pageRoute: '/av-architecture', description: 'HIPAA, retention, security, reliability' },
  { id: 'prompt-6', number: 6, title: 'CAPEX Cost Model', status: 'complete', dataFile: 'capex-model.ts', pageRoute: '/capex', description: 'Facility + tech + furniture + soft costs' },
  { id: 'prompt-7', number: 7, title: 'Vendor Pricing', status: 'complete', dataFile: 'equipment.ts', pageRoute: '/vendors', description: 'Manikins, task trainers, warranties, refresh' },
  { id: 'prompt-8', number: 8, title: 'Procurement Playbook', status: 'complete', dataFile: 'procurement.ts', pageRoute: '/procurement', description: 'RFQ language, evaluation, acceptance testing' },

  // Phase 3: Operations
  { id: 'prompt-9', number: 9, title: 'Operations Model', status: 'complete', dataFile: 'operations.ts', pageRoute: '/operations', description: 'Scheduling, throughput, documentation, reporting' },
  { id: 'prompt-10', number: 10, title: 'Staffing Model', status: 'complete', dataFile: 'staffing.ts', pageRoute: '/staffing', description: 'True incremental cost vs reallocation' },
  { id: 'prompt-11', number: 11, title: 'OPEX Model', status: 'complete', dataFile: 'staffing.ts', pageRoute: '/budget', description: 'Ongoing total cost of ownership' },
  { id: 'prompt-12', number: 12, title: 'Maintenance & Reliability', status: 'pending', dataFile: null, pageRoute: null, description: 'Manikins, AV, rooms, IT maintenance' },

  // Phase 4: Quality & Standards
  { id: 'prompt-13', number: 13, title: 'Quality Control', status: 'pending', dataFile: null, pageRoute: null, description: 'Session fidelity and faculty consistency' },
  { id: 'prompt-14', number: 14, title: 'Process Improvement', status: 'pending', dataFile: null, pageRoute: null, description: 'Lean/PS cycle tied to safety outcomes' },
  { id: 'prompt-15', number: 15, title: 'Risk & Compliance', status: 'complete', dataFile: 'risks.ts', pageRoute: '/risks', description: 'Privacy, recording, consent, retention' },

  // Phase 5: Financial Planning
  { id: 'prompt-16', number: 16, title: '5-Year Budget & Scenarios', status: 'pending', dataFile: null, pageRoute: null, description: 'Main campus vs Hamburg vs hybrid' },
  { id: 'prompt-17', number: 17, title: 'ROI Model', status: 'pending', dataFile: null, pageRoute: null, description: 'Cost avoidance tied to measurable KPIs' },

  // Phase 6: Go-Live & Strategy
  { id: 'prompt-18', number: 18, title: 'Go-Live Checklist', status: 'pending', dataFile: null, pageRoute: null, description: 'Operational readiness - first 90 days' },
  { id: 'prompt-19', number: 19, title: 'Strategic Plan', status: 'pending', dataFile: null, pageRoute: null, description: '3-5 year plan aligned to BHLEX metrics' },
  { id: 'prompt-20', number: 20, title: 'Standards & Policy', status: 'pending', dataFile: null, pageRoute: null, description: 'SSH/INACSL best practice + internal policy' },

  // Phase 7: Curriculum & Technology
  { id: 'prompt-21', number: 21, title: 'Curriculum Architecture', status: 'pending', dataFile: null, pageRoute: null, description: 'Scenario library + mandatory education conversion' },
  { id: 'prompt-22', number: 22, title: 'Technology Roadmap', status: 'pending', dataFile: null, pageRoute: null, description: 'Boundary-pushing plan with controlled pilots' },

  // Phase 8: Accreditation & Leadership
  { id: 'prompt-23', number: 23, title: 'Accreditation Plan', status: 'pending', dataFile: null, pageRoute: null, description: 'Gap analysis → year-by-year closure' },
  { id: 'prompt-24', number: 24, title: 'Leadership Proposal', status: 'pending', dataFile: null, pageRoute: null, description: 'Strategic narrative + measurable impact' }
]

export function getPromptProgress(): { complete: number; total: number; percent: number } {
  const complete = promptStatuses.filter(p => p.status === 'complete').length
  const total = promptStatuses.length
  return {
    complete,
    total,
    percent: Math.round((complete / total) * 100)
  }
}

// =============================================================================
// QUICK STATS FOR DASHBOARD
// =============================================================================

export function getDashboardStats() {
  const budget = calculateBudgetSummary()
  const metrics = getProjectMetrics()
  const promptProgress = getPromptProgress()
  const risks = getUnifiedRisks()

  return {
    totalBudget: budget.totalPhase1,
    total5Year: budget.total5Year,
    constructionCost: budget.totalCapital,
    equipmentCost: budget.totalEquipment,
    annualOpex: budget.totalOpexYear1,

    projectPhase: 'Planning',
    timelineMonths: 12,
    progressPercent: 15,

    totalRisks: risks.length,
    highRisks: risks.filter(r => r.riskScore >= 6).length,

    totalFte: metrics.totalFte,
    incrementalFte: metrics.incrementalFte,

    simRooms: 3,

    promptsComplete: promptProgress.complete,
    promptsTotal: promptProgress.total,
    dataCompleteness: promptProgress.percent
  }
}

// =============================================================================
// EXPORTS FOR DASHBOARD
// =============================================================================

export {
  // Re-export from construction
  csiDivisions,
  projectMilestones,
  constructionRisks,
  alternateItems,

  // Re-export from staffing
  coreStaffingModel,
  facultyPoolModel,
  opexCategories,
  centerProfiles,
  calculate5YearProjection,

  // Re-export from risks
  riskRegister,
  complianceChecklist,

  // Re-export from equipment
  equipmentCatalog,
  equipmentPackages,
  vendors
}
