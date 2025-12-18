// Staffing Model and OPEX Data
// Source: Prompts 10 & 11 - Staffing + backfill model and OPEX model

export interface StaffPosition {
  id: string
  role: string
  category: 'incremental' | 'reallocated'
  fte: number
  baseSalary: number
  loadedCost: number
  description: string
  responsibilities: string[]
  certifications: string[]
  notes: string
}

// Core staffing model for 2-3 rooms daily use
export const coreStaffingModel: StaffPosition[] = [
  {
    id: 'director',
    role: 'Simulation Center Director',
    category: 'incremental',
    fte: 1.0,
    baseSalary: 92000,
    loadedCost: 120000,
    description: 'Full-time director overseeing program development, quality, and daily operations',
    responsibilities: [
      'Strategic direction and program development',
      'Quality oversight and curriculum standards',
      'Coordination with clinical leadership',
      'Budget management',
      'Staff supervision and development',
      'Can facilitate or teach as needed'
    ],
    certifications: ['CHSE', 'CHSE-A'],
    notes: 'Critical hire - sets the culture and standards for the program'
  },
  {
    id: 'coordinator',
    role: 'Simulation Coordinator/Technician',
    category: 'incremental',
    fte: 1.0,
    baseSalary: 61000,
    loadedCost: 80000,
    description: 'Full-time operations specialist responsible for day-to-day simulation setup and technical operations',
    responsibilities: [
      'Day-to-day simulation setup and teardown',
      'Technical operation of manikins and A/V systems',
      'Scheduling and logistics coordination',
      'Equipment maintenance and troubleshooting',
      'Scenario preparation and programming',
      'Inventory management'
    ],
    certifications: ['CHSOS', 'Vendor-specific certifications'],
    notes: 'One FTE can support 2 simultaneous simulations; consider adding 0.5 FTE for consistent 3-room operation'
  },
  {
    id: 'admin',
    role: 'Administrative Support',
    category: 'incremental',
    fte: 0.5,
    baseSalary: 50000,
    loadedCost: 65000,
    description: 'Part-time administrative coordinator for scheduling, communications, and logistics',
    responsibilities: [
      'Room bookings and scheduling',
      'Session confirmations and reminders',
      'Learner roster management',
      'Data entry and record-keeping',
      'Consent forms and evaluation management',
      'Supply ordering'
    ],
    certifications: [],
    notes: 'Critical for freeing coordinator and director for educational/technical tasks'
  }
]

// Faculty pool (reallocated time)
export const facultyPoolModel = {
  id: 'faculty-pool',
  role: 'Faculty Educator Pool',
  category: 'reallocated' as const,
  totalFte: 3.0,
  educatorsNeeded: 15,
  ftePerEducator: 0.2,
  hoursPerWeekPerEducator: 8,
  loadedCostPerFte: 110000,
  totalReallocatedValue: 330000,
  description: 'Clinical educators dedicating 20% of their time (1 day/week) to simulation facilitation',
  responsibilities: [
    'Serve as simulation facilitators',
    'Lead scenarios and debriefing',
    'Contribute clinical expertise to scenarios',
    'Evaluate learner performance'
  ],
  notes: 'Reallocated time from existing salaries - zero direct cost IF departments can absorb the 20% reduction. Backfill cost if needed: ~$330k/year total (~$22k per educator)'
}

// Training and certification costs
export const trainingCosts = {
  certification: {
    chseExamFee: 395,
    chseExamFeeNonMember: 495,
    chsePrepMaterials: 400,
    chseRenewalFee: 250,
    renewalCycleYears: 3
  },
  onboarding: {
    durationWeeks: 2,
    directorOnboardingCost: 4600,
    coordinatorOnboardingCost: 3100,
    adminOnboardingCost: 1250,
    totalOnboardingCost: 8950
  },
  annualProfessionalDevelopment: {
    perStaffAllowance: 1500,
    conferenceTravel: 2000,
    workshopFees: 500
  },
  totalInitialTrainingCost: 10000 // ~$1k certification + ~$9k onboarding
}

// OPEX Model by Center Size
export interface OpexCategory {
  id: string
  category: string
  description: string
  smallCenter: number
  mediumCenter: number
  largeCenter: number
  scalingFactor: 'fixed' | 'linear' | 'step'
  notes: string
}

export const opexCategories: OpexCategory[] = [
  {
    id: 'staffing',
    category: 'Staffing & Personnel',
    description: 'Salaries, benefits, and any stipends for simulation staff',
    smallCenter: 90000,
    mediumCenter: 230000,
    largeCenter: 700000,
    scalingFactor: 'step',
    notes: 'Typically 50%+ of total OPEX. Small: 0.5-1 FTE; Medium: 2.5 FTE; Large: 6-8+ FTE'
  },
  {
    id: 'maintenance',
    category: 'Equipment Maintenance & Service Contracts',
    description: 'Manufacturer service contracts, repairs, software updates, calibration',
    smallCenter: 10000,
    mediumCenter: 25000,
    largeCenter: 70000,
    scalingFactor: 'linear',
    notes: 'Typically 10-15% of equipment value per year. Includes software license renewals.'
  },
  {
    id: 'supplies',
    category: 'Consumable Supplies & Parts',
    description: 'Disposable items, replacement parts, moulage, medical supplies',
    smallCenter: 10000,
    mediumCenter: 55000,
    largeCenter: 120000,
    scalingFactor: 'linear',
    notes: 'Scales with session volume. Estimate $20-100 per session depending on complexity.'
  },
  {
    id: 'software',
    category: 'Software & Subscriptions',
    description: 'LMS licenses, scenario management software, A/V debriefing systems',
    smallCenter: 5000,
    mediumCenter: 10000,
    largeCenter: 30000,
    scalingFactor: 'step',
    notes: 'Cloud/SaaS fees for simulation management and recording platforms'
  },
  {
    id: 'utilities',
    category: 'Facility & Utilities',
    description: 'Power, HVAC, cleaning, housekeeping',
    smallCenter: 5000,
    mediumCenter: 15000,
    largeCenter: 30000,
    scalingFactor: 'linear',
    notes: 'May be absorbed by hospital overhead in some cases'
  },
  {
    id: 'training',
    category: 'Faculty Development',
    description: 'Conferences, certifications, workshops, continuing education',
    smallCenter: 2000,
    mediumCenter: 5000,
    largeCenter: 15000,
    scalingFactor: 'step',
    notes: 'Investment in staff development improves program quality'
  },
  {
    id: 'refresh',
    category: 'Capital Refresh Reserve',
    description: 'Depreciation fund for equipment replacement (15% of equipment value)',
    smallCenter: 15000,
    mediumCenter: 60000,
    largeCenter: 125000,
    scalingFactor: 'linear',
    notes: 'Recommended: 15-20% of equipment value annually for 5-7 year replacement cycle'
  },
  {
    id: 'misc',
    category: 'Miscellaneous',
    description: 'Office supplies, printing, admin costs',
    smallCenter: 2000,
    mediumCenter: 5000,
    largeCenter: 10000,
    scalingFactor: 'fixed',
    notes: 'General administrative overhead'
  }
]

// Center size profiles
export interface CenterProfile {
  id: string
  name: string
  rooms: string
  sessionsPerMonth: number
  staffFte: number
  initialEquipment: number
  annualOpex: number
  costPerSession: number
  costPerLearnerHour: number
}

export const centerProfiles: CenterProfile[] = [
  {
    id: 'small',
    name: 'Small Simulation Center',
    rooms: '1-2 rooms',
    sessionsPerMonth: 40,
    staffFte: 1.0,
    initialEquipment: 100000,
    annualOpex: 140000,
    costPerSession: 290,
    costPerLearnerHour: 75
  },
  {
    id: 'medium',
    name: 'Medium Simulation Center',
    rooms: '2-3 rooms',
    sessionsPerMonth: 120,
    staffFte: 2.5,
    initialEquipment: 400000,
    annualOpex: 420000,
    costPerSession: 290,
    costPerLearnerHour: 58
  },
  {
    id: 'large',
    name: 'Large Simulation Center',
    rooms: '4+ rooms',
    sessionsPerMonth: 200,
    staffFte: 7.0,
    initialEquipment: 1500000,
    annualOpex: 1100000,
    costPerSession: 460,
    costPerLearnerHour: 45
  }
]

// 5-Year OPEX Projection Calculator
export interface YearlyProjection {
  year: number
  staffing: number
  maintenance: number
  supplies: number
  software: number
  utilities: number
  training: number
  refresh: number
  misc: number
  total: number
  sessionsProjected: number
  costPerSession: number
}

export function calculate5YearProjection(
  centerSize: 'small' | 'medium' | 'large',
  inflationRate: number = 0.03,
  sessionGrowthRate: number = 0.05
): YearlyProjection[] {
  const profile = centerProfiles.find(p => p.id === centerSize)!
  const baseOpex = opexCategories.reduce((acc, cat) => {
    acc[cat.id] = cat[`${centerSize}Center`]
    return acc
  }, {} as Record<string, number>)

  const projections: YearlyProjection[] = []

  for (let year = 1; year <= 5; year++) {
    const inflationMultiplier = Math.pow(1 + inflationRate, year - 1)
    const sessions = Math.round(profile.sessionsPerMonth * 12 * Math.pow(1 + sessionGrowthRate, year - 1))

    const yearData: YearlyProjection = {
      year,
      staffing: Math.round(baseOpex.staffing * inflationMultiplier),
      maintenance: Math.round(baseOpex.maintenance * inflationMultiplier),
      supplies: Math.round(baseOpex.supplies * inflationMultiplier * Math.pow(1 + sessionGrowthRate, year - 1)),
      software: Math.round(baseOpex.software * inflationMultiplier),
      utilities: Math.round(baseOpex.utilities * inflationMultiplier),
      training: Math.round(baseOpex.training * inflationMultiplier),
      refresh: Math.round(baseOpex.refresh), // Refresh doesn't inflate
      misc: Math.round(baseOpex.misc * inflationMultiplier),
      total: 0,
      sessionsProjected: sessions,
      costPerSession: 0
    }

    yearData.total = yearData.staffing + yearData.maintenance + yearData.supplies +
                     yearData.software + yearData.utilities + yearData.training +
                     yearData.refresh + yearData.misc
    yearData.costPerSession = Math.round(yearData.total / sessions)

    projections.push(yearData)
  }

  return projections
}

// Staffing cost summary
export const staffingCostSummary = {
  incrementalAnnualCost: coreStaffingModel
    .filter(s => s.category === 'incremental')
    .reduce((sum, s) => sum + (s.loadedCost * s.fte), 0),
  reallocatedAnnualValue: facultyPoolModel.totalReallocatedValue,
  initialTrainingCost: trainingCosts.totalInitialTrainingCost,
  get totalYear1Cost() {
    return this.incrementalAnnualCost + this.initialTrainingCost
  },
  monthlyPayrollCost: Math.round(
    coreStaffingModel
      .filter(s => s.category === 'incremental')
      .reduce((sum, s) => sum + (s.loadedCost * s.fte), 0) / 12
  )
}
