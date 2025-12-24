// =============================================================================
// STRATEGIC SCENARIOS - 5-Year Budget Comparison
// =============================================================================
// Source: Prompt 16 - "Full-stack 5-year budget + scenarios (main campus vs Hamburg vs hybrid)"
// Data derived from healthcare FP&A analysis with industry benchmarks
//
// Three development scenarios for Baptist Health Lexington Simulation Center:
// A) Main Campus Buildout - Renovate existing hospital space
// B) Hamburg Satellite-First - New dedicated facility at Hamburg campus
// C) Phased Hybrid - Start small on main campus, expand to Hamburg later
// =============================================================================

export interface StrategicScenario {
  id: 'main-campus' | 'hamburg' | 'hybrid'
  name: string
  shortName: string
  description: string
  recommendation: 'recommended' | 'alternative' | 'premium'

  // Summary metrics
  summary: {
    initialCapex: number
    totalCapexNote?: string  // For hybrid scenario with phased spending
    totalFiveYearOpex: number
    fiveYearCumulativeCost: number
    squareFootage: number
    manikinCount: number
    staffFTE: number
    timeToOperational: string
  }

  // Detailed CAPEX breakdown
  capex: CapexLineItem[]
  capexTotal: number
  capexNotes: string[]

  // 5-year OPEX projection
  opex: OpexYearlyProjection[]
  opexNotes: string[]

  // Pros and cons
  pros: string[]
  cons: string[]

  // Strategic considerations
  strategicFactors: string[]
}

export interface CapexLineItem {
  id: string
  category: 'construction' | 'equipment' | 'technology' | 'soft-costs' | 'contingency' | 'credit'
  name: string
  amount: number
  notes?: string
  source?: string
}

export interface OpexYearlyProjection {
  year: number
  personnel: number
  maintenance: number
  supplies: number
  standardizedPatients: number
  facilities: number
  itSoftware: number
  other: number
  contingency: number
  total: number
  notes?: string
}

// =============================================================================
// DATA SOURCES - Industry Benchmarks
// =============================================================================

export const DATA_SOURCES = {
  construction: {
    source: "RSMeans Hospital Construction Data 2024",
    benchmark: "$400-600/sq ft for healthcare construction",
    note: "Simulation-specific build-outs with advanced AV, medical gas tend toward higher end"
  },
  manikins: {
    source: "Laerdal/CAE/Gaumard Vendor Pricing 2024-2025",
    benchmark: "$70,000-$100,000 per high-fidelity unit",
    note: "Includes SimMan, HAL, Victoria, and equivalent models"
  },
  avSystems: {
    source: "University of Tennessee Chattanooga Report 2021",
    benchmark: "$112,000-$250,000 for multi-room AV systems",
    note: "SimCapture or equivalent turnkey recording/debriefing systems"
  },
  maintenance: {
    source: "MedVision Sim 2023",
    benchmark: "$3,000-$5,000 per device annually",
    note: "Service contracts after warranty expiration"
  },
  comparables: [
    { name: "Phoebe Putney Health System", sqft: 22000, cost: 5300000, type: "Renovation" },
    { name: "Baptist Health College Little Rock", sqft: 15000, cost: 5000000, type: "New Build" },
    { name: "Lansing Community College", sqft: 19500, cost: 14000000, type: "Renovation" }
  ]
}

// =============================================================================
// SCENARIO A: MAIN CAMPUS BUILDOUT
// =============================================================================

export const SCENARIO_A: StrategicScenario = {
  id: 'main-campus',
  name: 'Main Campus Buildout',
  shortName: 'Main Campus',
  description: 'Renovate ~8,000 sq ft of existing hospital space into a simulation center. Leverages on-site convenience and existing infrastructure.',
  recommendation: 'recommended',

  summary: {
    initialCapex: 6300000,
    totalFiveYearOpex: 2380000,
    fiveYearCumulativeCost: 8680000,
    squareFootage: 8000,
    manikinCount: 5,
    staffFTE: 2.5,
    timeToOperational: '12-18 months'
  },

  capex: [
    { id: 'renovation', category: 'construction', name: 'Facility Renovation (8,000 sq.ft @ ~$500/sf)', amount: 4000000, notes: 'Interior build-out of sim labs, control rooms, etc.', source: 'RSMeans hospital benchmark' },
    { id: 'manikins', category: 'equipment', name: 'High-Fidelity Manikins (5 units)', amount: 450000, notes: 'Adult, Obstetric, Pediatric, Neonatal simulators @ ~$90k each' },
    { id: 'task-trainers', category: 'equipment', name: 'Task Trainers & Medical Equipment', amount: 100000, notes: 'IV arms, airway trainers, code blue carts, defibrillators, etc.' },
    { id: 'av-system', category: 'technology', name: 'AV Recording & Debrief System', amount: 150000, notes: 'Multi-room camera system, microphones, software (turnkey)' },
    { id: 'it-infrastructure', category: 'technology', name: 'IT Infrastructure & Software', amount: 100000, notes: 'Computers, monitors, servers, scenario software licenses' },
    { id: 'furniture', category: 'equipment', name: 'Furniture & Fixtures', amount: 50000, notes: 'Hospital beds, exam tables, office furniture, storage' },
    { id: 'soft-costs', category: 'soft-costs', name: 'Design, Permits & Fees', amount: 200000, notes: 'Architectural design, engineering, permits, inspections' },
    { id: 'contingency', category: 'contingency', name: 'Contingency (~15%)', amount: 950000, notes: 'Reserve for cost overruns (construction materials, etc.)' }
  ],
  capexTotal: 6000000,
  capexNotes: [
    'Repurposes existing hospital space, avoiding new building shell costs',
    '$4M facility cost aligns with comparable renovation projects',
    'Similar project: Phoebe Putney installed 22,000 sq.ft for ~$5.3M'
  ],

  opex: [
    { year: 1, personnel: 300000, maintenance: 30000, supplies: 20000, standardizedPatients: 5000, facilities: 40000, itSoftware: 15000, other: 5000, contingency: 20000, total: 435000, notes: 'Ramp-up year' },
    { year: 2, personnel: 309000, maintenance: 30000, supplies: 25000, standardizedPatients: 7500, facilities: 41000, itSoftware: 15000, other: 5000, contingency: 21000, total: 453500 },
    { year: 3, personnel: 318000, maintenance: 32000, supplies: 30000, standardizedPatients: 10000, facilities: 42000, itSoftware: 16000, other: 5000, contingency: 22000, total: 475000 },
    { year: 4, personnel: 328000, maintenance: 32000, supplies: 35000, standardizedPatients: 12000, facilities: 43000, itSoftware: 17000, other: 5000, contingency: 22000, total: 494000 },
    { year: 5, personnel: 338000, maintenance: 35000, supplies: 40000, standardizedPatients: 15000, facilities: 44000, itSoftware: 18000, other: 5000, contingency: 23000, total: 518000, notes: 'Steady state' }
  ],
  opexNotes: [
    'Personnel is ~70% of OPEX by Year 5',
    'Core team: 1 Simulation Director, 1 Sim Tech, 0.5 FTE Educator',
    'Equipment maintenance kicks in after warranty periods expire',
    'Consumables scale with simulation volume (2→5 sessions/week)'
  ],

  pros: [
    'Lowest upfront cost (~15% less than Hamburg)',
    'On-site convenience for staff (no travel)',
    'Can leverage existing hospital resources (IT, biomed, security)',
    'Faster time to operational',
    'Lower ongoing facility costs'
  ],
  cons: [
    'Limited expansion capacity',
    'Space constraints within existing hospital footprint',
    'May need to compete for renovation resources',
    'Less impressive for external partnerships'
  ],

  strategicFactors: [
    'Best option if current space is available and demand is moderate',
    'Good "pilot" approach to prove value before larger investment',
    'May require expansion later if program succeeds'
  ]
}

// =============================================================================
// SCENARIO B: HAMBURG SATELLITE-FIRST
// =============================================================================

export const SCENARIO_B: StrategicScenario = {
  id: 'hamburg',
  name: 'Hamburg Satellite-First',
  shortName: 'Hamburg',
  description: 'Build a new ~10,000 sq ft dedicated simulation facility at the Hamburg outpatient campus. Modern, purpose-built space with room for growth.',
  recommendation: 'alternative',

  summary: {
    initialCapex: 7500000,
    totalFiveYearOpex: 2230000,
    fiveYearCumulativeCost: 9730000,
    squareFootage: 10000,
    manikinCount: 6,
    staffFTE: 3.5,
    timeToOperational: '18-24 months'
  },

  capex: [
    { id: 'new-construction', category: 'construction', name: 'New Building Construction (10,000 sq.ft)', amount: 5000000, notes: 'Core and shell plus interior fit-out (@ ~$500/sf)', source: 'RSMeans healthcare construction' },
    { id: 'manikins', category: 'equipment', name: 'High-Fidelity Simulators (6 units)', amount: 540000, notes: 'Larger capacity with 6 manikins @ ~$90k avg' },
    { id: 'task-trainers', category: 'equipment', name: 'Task Trainers & Medical Equipment', amount: 150000, notes: 'More training aids including surgical task trainers, ultrasound' },
    { id: 'av-it', category: 'technology', name: 'AV/IT Systems', amount: 180000, notes: 'Expanded AV system for more rooms + independent networking' },
    { id: 'furniture', category: 'equipment', name: 'Furniture, Fixtures & Audio-Visual', amount: 100000, notes: 'Beds, desks, classroom AV (projectors for debrief rooms)' },
    { id: 'soft-costs', category: 'soft-costs', name: 'Site Prep, Design & Soft Costs', amount: 300000, notes: 'Architectural design, site work, permits, IT network linkage' },
    { id: 'contingency', category: 'contingency', name: 'Contingency (~15%)', amount: 960000, notes: 'Higher contingency for ground-up build uncertainties' }
  ],
  capexTotal: 7230000,
  capexNotes: [
    'New construction at Hamburg provides purpose-built, expandable facility',
    'Hamburg campus offers 129-acre footprint for future expansion',
    'Could approach $10M if scope expands (VR labs, simulation ambulance bay)'
  ],

  opex: [
    { year: 1, personnel: 150000, maintenance: 0, supplies: 5000, standardizedPatients: 0, facilities: 10000, itSoftware: 5000, other: 0, contingency: 0, total: 170000, notes: 'Planning/construction year - hire staff mid-year' },
    { year: 2, personnel: 320000, maintenance: 36000, supplies: 25000, standardizedPatients: 5000, facilities: 50000, itSoftware: 15000, other: 5000, contingency: 23000, total: 479000, notes: 'Opening year' },
    { year: 3, personnel: 330000, maintenance: 36000, supplies: 30000, standardizedPatients: 8000, facilities: 51500, itSoftware: 15000, other: 5000, contingency: 23500, total: 499000 },
    { year: 4, personnel: 340000, maintenance: 38000, supplies: 35000, standardizedPatients: 12000, facilities: 53000, itSoftware: 16000, other: 7500, contingency: 24000, total: 525500 },
    { year: 5, personnel: 350000, maintenance: 40000, supplies: 45000, standardizedPatients: 15000, facilities: 55000, itSoftware: 17000, other: 10000, contingency: 25000, total: 557000, notes: 'Full capacity + external programs' }
  ],
  opexNotes: [
    'Year 1 is planning/construction - minimal operations',
    'Larger dedicated staff: Manager, Sim Tech, Education Coordinator',
    'Higher facility costs as standalone building (utilities, maintenance)',
    'Includes marketing/outreach budget for external partnerships'
  ],

  pros: [
    'Purpose-built, state-of-the-art facility',
    'Maximum expansion capacity',
    'Potential for external partnerships and revenue',
    'Could become regional simulation hub',
    'Easier public access for community training'
  ],
  cons: [
    'Highest upfront capital requirement',
    'Staff must travel 15-20 minutes from main hospital',
    '18-24 months to operational',
    'Duplicate infrastructure (IT, security, etc.)'
  ],

  strategicFactors: [
    'Best for long-term growth and regional leadership',
    'Could attract nursing school partnerships',
    'Consider if expecting 10+ sessions/week by Year 5',
    'May generate external training revenue'
  ]
}

// =============================================================================
// SCENARIO C: PHASED HYBRID
// =============================================================================

export const SCENARIO_C: StrategicScenario = {
  id: 'hybrid',
  name: 'Phased Hybrid (Main + Hamburg)',
  shortName: 'Hybrid',
  description: 'Start with a smaller simulation lab on main campus (Year 1), then expand to a full Hamburg facility (Year 3-4). Balances early capability with future growth.',
  recommendation: 'premium',

  summary: {
    initialCapex: 3500000,
    totalCapexNote: 'Phase 1: $3.5M (Year 1) + Phase 2: $6.5M (Year 3) = $10M total',
    totalFiveYearOpex: 2274000,
    fiveYearCumulativeCost: 12274000,
    squareFootage: 10000, // Combined: 4k main + 6k Hamburg
    manikinCount: 6, // Combined across both sites
    staffFTE: 4.5,
    timeToOperational: '6-12 months (main campus)'
  },

  capex: [
    // Phase 1 - Main Campus
    { id: 'phase1-renovation', category: 'construction', name: 'Phase 1: Main Campus Renovation (~4k sf)', amount: 2000000, notes: 'Smaller initial footprint on main campus' },
    { id: 'phase1-equipment', category: 'equipment', name: 'Phase 1: Core Equipment Set (~3 manikins, AV)', amount: 1000000, notes: 'Minimal viable equipment to launch' },
    { id: 'phase1-furniture', category: 'equipment', name: 'Phase 1: Furniture & Misc.', amount: 200000 },
    { id: 'phase1-contingency', category: 'contingency', name: 'Phase 1: Contingency', amount: 300000 },
    // Phase 2 - Hamburg
    { id: 'phase2-construction', category: 'construction', name: 'Phase 2: Hamburg Construction (~6k sf)', amount: 4000000, notes: 'Year 3-4 expansion at Hamburg campus' },
    { id: 'phase2-equipment', category: 'equipment', name: 'Phase 2: Additional Equipment', amount: 1500000, notes: 'Additional manikins and AV expansion' },
    { id: 'phase2-furniture', category: 'equipment', name: 'Phase 2: Furniture & Fixtures', amount: 300000 },
    { id: 'phase2-contingency', category: 'contingency', name: 'Phase 2: Contingency', amount: 700000 }
  ],
  capexTotal: 10000000,
  capexNotes: [
    'Phase 1 ($3.5M) deploys in Year 0-1 for quick wins',
    'Phase 2 ($6.5M) deploys in Year 3 for Hamburg expansion',
    'Some equipment may be reallocated between sites (~$0.5M potential savings)',
    'Total is essentially "Scenario A + Scenario B" with scaling'
  ],

  opex: [
    { year: 1, personnel: 250000, maintenance: 20000, supplies: 15000, standardizedPatients: 3000, facilities: 20000, itSoftware: 10000, other: 0, contingency: 10000, total: 328000, notes: 'Main campus only - 2 FTE' },
    { year: 2, personnel: 258000, maintenance: 25000, supplies: 20000, standardizedPatients: 5000, facilities: 21000, itSoftware: 10000, other: 0, contingency: 10000, total: 349000, notes: 'Main campus operational' },
    { year: 3, personnel: 265000, maintenance: 30000, supplies: 25000, standardizedPatients: 5000, facilities: 32000, itSoftware: 12000, other: 0, contingency: 15000, total: 384000, notes: 'Planning Hamburg expansion' },
    { year: 4, personnel: 400000, maintenance: 50000, supplies: 35000, standardizedPatients: 10000, facilities: 30000, itSoftware: 18000, other: 0, contingency: 20000, total: 563000, notes: 'Hamburg opens mid-year - 4 FTE' },
    { year: 5, personnel: 420000, maintenance: 60000, supplies: 50000, standardizedPatients: 15000, facilities: 60000, itSoftware: 20000, other: 0, contingency: 25000, total: 650000, notes: 'Both sites fully operational - 4.5 FTE' }
  ],
  opexNotes: [
    'Years 1-2: Only main campus lab running (2 FTE)',
    'Year 3: Hamburg planning adds some coordination costs',
    'Year 4-5: Both sites operational, highest OPEX',
    'Could reduce costs by consolidating at Hamburg after transition'
  ],

  pros: [
    'Lower initial capital risk ($3.5M vs $7.5M)',
    'Quick start - can show value within 12 months',
    'Lessons learned inform Hamburg design',
    'Spreads capital over multiple budget cycles'
  ],
  cons: [
    'Highest total 5-year cost',
    'Duplicate infrastructure and operations',
    'More complex to manage two sites',
    'Risk of keeping both sites indefinitely'
  ],

  strategicFactors: [
    'Best if: need immediate on-site capability AND expect high long-term demand',
    'Requires clear transition plan to avoid permanent dual-site overhead',
    'Consider consolidating at Hamburg once it opens to reduce costs',
    'Political consideration: may be hard to close main campus lab once established'
  ]
}

// =============================================================================
// COMBINED DATA EXPORTS
// =============================================================================

export const STRATEGIC_SCENARIOS: StrategicScenario[] = [
  SCENARIO_A,
  SCENARIO_B,
  SCENARIO_C
]

export function getScenarioById(id: string): StrategicScenario | undefined {
  return STRATEGIC_SCENARIOS.find(s => s.id === id)
}

// Comparison summary for quick charts
export const SCENARIO_COMPARISON = {
  labels: ['Main Campus', 'Hamburg', 'Hybrid'],
  capex: [6300000, 7500000, 10000000],
  opex5Year: [2380000, 2230000, 2274000],
  total5Year: [8680000, 9730000, 12274000],
  squareFootage: [8000, 10000, 10000],
  manikins: [5, 6, 6],
  fte: [2.5, 3.5, 4.5]
}

// Year-by-year cost comparison for stacked charts
export function getYearlyComparisonData(): Array<{
  year: number
  mainCapex: number
  mainOpex: number
  hamburgCapex: number
  hamburgOpex: number
  hybridCapex: number
  hybridOpex: number
}> {
  return [
    { year: 1, mainCapex: 6300000, mainOpex: 435000, hamburgCapex: 7500000, hamburgOpex: 170000, hybridCapex: 3500000, hybridOpex: 328000 },
    { year: 2, mainCapex: 0, mainOpex: 453500, hamburgCapex: 0, hamburgOpex: 479000, hybridCapex: 0, hybridOpex: 349000 },
    { year: 3, mainCapex: 0, mainOpex: 475000, hamburgCapex: 0, hamburgOpex: 499000, hybridCapex: 6500000, hybridOpex: 384000 },
    { year: 4, mainCapex: 0, mainOpex: 494000, hamburgCapex: 0, hamburgOpex: 525500, hybridCapex: 0, hybridOpex: 563000 },
    { year: 5, mainCapex: 0, mainOpex: 518000, hamburgCapex: 0, hamburgOpex: 557000, hybridCapex: 0, hybridOpex: 650000 }
  ]
}

// Cumulative cost over time for line charts
export function getCumulativeCostData(): Array<{
  year: number
  main: number
  hamburg: number
  hybrid: number
}> {
  let mainCum = 0, hamburgCum = 0, hybridCum = 0
  const yearly = getYearlyComparisonData()

  return yearly.map(y => {
    mainCum += y.mainCapex + y.mainOpex
    hamburgCum += y.hamburgCapex + y.hamburgOpex
    hybridCum += y.hybridCapex + y.hybridOpex
    return { year: y.year, main: mainCum, hamburg: hamburgCum, hybrid: hybridCum }
  })
}

// =============================================================================
// SENSITIVITY ANALYSIS DATA
// =============================================================================

export interface SensitivityScenario {
  name: string
  capexMultiplier: number
  opexMultiplier: number
  description: string
}

export const SENSITIVITY_SCENARIOS: SensitivityScenario[] = [
  { name: 'Best Case (-20% CAPEX)', capexMultiplier: 0.8, opexMultiplier: 1.0, description: 'Competitive bidding and value engineering' },
  { name: 'Base Case', capexMultiplier: 1.0, opexMultiplier: 1.0, description: 'Current estimates' },
  { name: 'Moderate Overrun (+15%)', capexMultiplier: 1.15, opexMultiplier: 1.05, description: 'Material cost increases' },
  { name: 'Significant Overrun (+30%)', capexMultiplier: 1.3, opexMultiplier: 1.1, description: 'Major construction delays or scope changes' }
]

export function calculateSensitivity(
  scenario: StrategicScenario,
  sensitivity: SensitivityScenario
): { adjustedCapex: number; adjustedOpex: number; adjustedTotal: number } {
  const adjustedCapex = scenario.summary.initialCapex * sensitivity.capexMultiplier
  const adjustedOpex = scenario.summary.totalFiveYearOpex * sensitivity.opexMultiplier
  return {
    adjustedCapex,
    adjustedOpex,
    adjustedTotal: adjustedCapex + adjustedOpex
  }
}

// =============================================================================
// RECOMMENDATION LOGIC
// =============================================================================

export interface ScenarioRecommendation {
  primary: StrategicScenario
  rationale: string[]
  considerations: string[]
}

export function getRecommendation(criteria: {
  budgetConstrained: boolean
  needImmediateCapability: boolean
  expectHighGrowth: boolean
  externalPartnershipsImportant: boolean
}): ScenarioRecommendation {
  const { budgetConstrained, needImmediateCapability, expectHighGrowth, externalPartnershipsImportant } = criteria

  // Decision logic based on strategic priorities
  if (budgetConstrained && !expectHighGrowth) {
    return {
      primary: SCENARIO_A,
      rationale: [
        'Lowest 5-year cost at ~$8.7M',
        'Fastest time to operational (12-18 months)',
        'Leverages existing hospital infrastructure'
      ],
      considerations: [
        'Limited expansion capacity - may need future investment if program succeeds',
        'Space constraints may limit training volume'
      ]
    }
  }

  if (expectHighGrowth && externalPartnershipsImportant) {
    return {
      primary: SCENARIO_B,
      rationale: [
        'Purpose-built facility with expansion capacity',
        'Best positioned for regional leadership and partnerships',
        'Dedicated space attracts nursing schools, EMS partnerships'
      ],
      considerations: [
        'Higher upfront capital (~$7.5M CAPEX)',
        'Staff travel to Hamburg may reduce participation initially'
      ]
    }
  }

  if (needImmediateCapability && expectHighGrowth) {
    return {
      primary: SCENARIO_C,
      rationale: [
        'Quick start with main campus lab (6-12 months)',
        'Deferred capital for Hamburg allows proving program value first',
        'Lessons learned improve Hamburg design'
      ],
      considerations: [
        'Highest total cost (~$12.3M over 5 years)',
        'Risk of maintaining two sites indefinitely',
        'Requires clear transition plan'
      ]
    }
  }

  // Default recommendation
  return {
    primary: SCENARIO_A,
    rationale: [
      'Most cost-efficient option',
      'Sufficient for moderate training needs',
      'Can expand later if demand warrants'
    ],
    considerations: [
      'Monitor utilization closely',
      'Plan for potential Hamburg expansion if program exceeds capacity'
    ]
  }
}
