// CAPEX Cost Model for Simulation Labs
// Source: Prompt 6 - Initial CAPEX (facility + tech + furniture + soft costs)
// Parameterized template for capital expenditure planning

// =============================================================================
// COST CATEGORY DEFINITIONS
// =============================================================================

export interface CostCategory {
  id: string
  name: string
  description: string
  costBasis: 'per_sf' | 'per_room' | 'percentage' | 'fixed'
  lowEstimate: number
  midEstimate: number
  highEstimate: number
  unit: string
  drivers: string[]
  notes: string
}

export const costCategories: CostCategory[] = [
  {
    id: 'base-building',
    name: 'Base Building / Renovation',
    description: 'Core building work: demolition, partitions, doors, glazing, finishes, structural modifications',
    costBasis: 'per_sf',
    lowEstimate: 200,
    midEstimate: 300,
    highEstimate: 400,
    unit: '$/SF',
    drivers: [
      'Scope of demolition',
      'Quality of finishes (medical-grade flooring, acoustic ceilings)',
      'Structural changes (reinforcing floors, observation windows)',
      'Starting condition (shell vs former clinical space)',
      'Geographic location (Lexington KY = moderate costs)'
    ],
    notes: 'Hospital interior renovation typically $250-$400/SF. Clean shell space $200-$300/SF.'
  },
  {
    id: 'mep-upgrades',
    name: 'MEP Upgrades (Power/Data/HVAC)',
    description: 'HVAC modifications, electrical distribution, low-voltage data wiring beyond standard needs',
    costBasis: 'per_sf',
    lowEstimate: 50,
    midEstimate: 75,
    highEstimate: 100,
    unit: '$/SF',
    drivers: [
      'New HVAC unit or distribution needed',
      'Electrical sub-panel or emergency power',
      'Number of data drops per room (3-4 typical)',
      'Power outlets density (20+ per sim room)',
      'Plumbing for sinks or simulated patient bathrooms'
    ],
    notes: 'MEP typically adds 20-35% on top of base building costs. High-tech spaces have above-average MEP needs.'
  },
  {
    id: 'av-system',
    name: 'A/V Capture & Storage',
    description: 'Camera systems, microphones, recording platform, storage, debriefing displays',
    costBasis: 'per_room',
    lowEstimate: 20000,
    midEstimate: 30000,
    highEstimate: 40000,
    unit: '$/room',
    drivers: [
      'Number of cameras per room (2-3 typical, more for coverage)',
      'Camera resolution (HD vs 4K)',
      'Choice of platform (SimCapture, VALT, LearningSpace)',
      'Storage capacity and retention policy',
      'Installation and training fees ($5K-$15K)'
    ],
    notes: 'Mid-sized center (5 rooms) typically $100K-$200K total. Includes first year support.'
  },
  {
    id: 'simulators',
    name: 'Simulators & Task Trainers',
    description: 'High-fidelity manikins, task trainers, medical training equipment',
    costBasis: 'per_room',
    lowEstimate: 50000,
    midEstimate: 80000,
    highEstimate: 100000,
    unit: '$/room',
    drivers: [
      'Number and fidelity of manikins',
      'Specialty simulators (OB, pediatric, geriatric)',
      'Task trainers and procedural equipment',
      'Vendor choice (Laerdal, CAE, Gaumard)',
      'New vs refurbished equipment'
    ],
    notes: 'Often 40-50% of total budget. High-fidelity adult simulators $30K-$100K each.'
  },
  {
    id: 'it-security',
    name: 'IT & Security Infrastructure',
    description: 'Network hardware, workstations, access control, surveillance',
    costBasis: 'per_sf',
    lowEstimate: 5,
    midEstimate: 10,
    highEstimate: 15,
    unit: '$/SF',
    drivers: [
      'Network switches and wireless access points',
      'Control room computers and displays',
      'Badge readers and door access control',
      'Security cameras in corridors',
      'Integration with hospital IT systems'
    ],
    notes: 'Allocate ~$10K+ per room for PCs, monitors, networking. Security adds $10K-$20K.'
  },
  {
    id: 'furniture',
    name: 'Furniture & Fixtures',
    description: 'Hospital beds, clinical furniture, debrief room tables, office furniture, signage',
    costBasis: 'per_room',
    lowEstimate: 10000,
    midEstimate: 15000,
    highEstimate: 20000,
    unit: '$/room',
    drivers: [
      'Hospital beds vs exam tables ($1.5K-$5K each)',
      'Clinical realism level (headwalls, mock gas panels)',
      'Debrief room furniture and displays',
      'Control room consoles',
      'Lobby and office furnishings'
    ],
    notes: 'Common areas (debrief, offices, lobby) add ~$30K-$50K beyond sim room furniture.'
  },
  {
    id: 'soft-costs',
    name: 'Soft Costs',
    description: 'Design fees, permits, commissioning, training, vendor implementation',
    costBasis: 'percentage',
    lowEstimate: 20,
    midEstimate: 25,
    highEstimate: 30,
    unit: '% of hard costs',
    drivers: [
      'Architectural/engineering design fees (8-15% of construction)',
      'Permits and inspections (1-2%)',
      'Project management',
      'Staff training on equipment',
      'Vendor implementation and calibration'
    ],
    notes: 'Include 5% contingency within soft costs. Training packages typically $2K-$5K per vendor.'
  }
]

// =============================================================================
// COST MULTIPLIERS
// =============================================================================

export interface CostMultiplier {
  id: string
  name: string
  description: string
  multiplier: number
  applies_to: string[]
}

export const costMultipliers: CostMultiplier[] = [
  {
    id: 'hospital-renovation',
    name: 'Hospital Renovation Premium',
    description: 'Working in active hospital with ICRA, after-hours work, phasing requirements',
    multiplier: 1.25,
    applies_to: ['base-building', 'mep-upgrades']
  },
  {
    id: 'clean-shell',
    name: 'Clean Shell Build-out',
    description: 'New or empty space with no active hospital constraints',
    multiplier: 1.0,
    applies_to: ['base-building', 'mep-upgrades']
  },
  {
    id: 'high-cost-region',
    name: 'High-Cost Region',
    description: 'Coastal metro areas with higher labor and material costs',
    multiplier: 1.3,
    applies_to: ['base-building', 'mep-upgrades', 'furniture']
  },
  {
    id: 'moderate-cost-region',
    name: 'Moderate-Cost Region (Lexington KY)',
    description: 'Mid-market construction costs typical of Kentucky',
    multiplier: 1.0,
    applies_to: ['base-building', 'mep-upgrades', 'furniture']
  },
  {
    id: 'low-cost-region',
    name: 'Low-Cost Region',
    description: 'Lower labor cost areas',
    multiplier: 0.85,
    applies_to: ['base-building', 'mep-upgrades', 'furniture']
  }
]

// =============================================================================
// BENCHMARK METRICS
// =============================================================================

export interface BenchmarkMetric {
  id: string
  name: string
  lowValue: number
  midValue: number
  highValue: number
  unit: string
  description: string
}

export const benchmarkMetrics: BenchmarkMetric[] = [
  {
    id: 'total-cost-per-sf',
    name: 'Total Cost per Square Foot',
    lowValue: 300,
    midValue: 450,
    highValue: 600,
    unit: '$/SF',
    description: 'All-in project cost including all 7 categories'
  },
  {
    id: 'cost-per-room',
    name: 'Cost per Simulation Suite',
    lowValue: 360000,
    midValue: 500000,
    highValue: 720000,
    unit: '$/room',
    description: 'Average cost per sim room including proportional share of support space'
  },
  {
    id: 'equipment-percentage',
    name: 'Equipment as % of Total',
    lowValue: 35,
    midValue: 45,
    highValue: 55,
    unit: '%',
    description: 'Simulators and task trainers typically 40-50% of total budget'
  }
]

// =============================================================================
// PROJECT PARAMETERS (Default for BHL)
// =============================================================================

export interface ProjectParameters {
  floorArea: number // SF
  simRooms: number
  controlRooms: number
  debriefRooms: number
  supportSpaces: number
  constructionType: 'hospital-renovation' | 'clean-shell'
  costRegion: 'high-cost' | 'moderate-cost' | 'low-cost'
  qualityLevel: 'budget' | 'standard' | 'premium'
}

export const defaultParameters: ProjectParameters = {
  floorArea: 4000,
  simRooms: 3,
  controlRooms: 1,
  debriefRooms: 2,
  supportSpaces: 3, // storage, tech workshop, office
  constructionType: 'hospital-renovation',
  costRegion: 'moderate-cost',
  qualityLevel: 'standard'
}

// =============================================================================
// COST CALCULATION ENGINE
// =============================================================================

export interface CostLineItem {
  categoryId: string
  categoryName: string
  calculatedCost: number
  basis: string
  notes: string
}

export interface CostSummary {
  lineItems: CostLineItem[]
  subtotalHardCosts: number
  softCosts: number
  totalProjectCost: number
  costPerSF: number
  costPerRoom: number
  contingency: number
}

export function calculateCAPEX(params: ProjectParameters): CostSummary {
  const lineItems: CostLineItem[] = []

  // Get appropriate multipliers
  const constructionMultiplier = params.constructionType === 'hospital-renovation' ? 1.25 : 1.0
  const regionMultiplier = params.costRegion === 'high-cost' ? 1.3 :
                           params.costRegion === 'low-cost' ? 0.85 : 1.0

  // Quality level affects estimates
  const qualityIndex = params.qualityLevel === 'budget' ? 0 :
                       params.qualityLevel === 'premium' ? 2 : 1

  const getEstimate = (cat: CostCategory) => {
    if (qualityIndex === 0) return cat.lowEstimate
    if (qualityIndex === 2) return cat.highEstimate
    return cat.midEstimate
  }

  // Calculate each category
  costCategories.forEach(cat => {
    if (cat.id === 'soft-costs') return // Handle separately

    let cost = 0
    let basis = ''

    if (cat.costBasis === 'per_sf') {
      const unitCost = getEstimate(cat)
      const multiplier = ['base-building', 'mep-upgrades'].includes(cat.id)
        ? constructionMultiplier * regionMultiplier
        : 1
      cost = params.floorArea * unitCost * multiplier
      basis = `${params.floorArea} SF × $${unitCost}/SF × ${multiplier.toFixed(2)}`
    } else if (cat.costBasis === 'per_room') {
      const unitCost = getEstimate(cat)
      cost = params.simRooms * unitCost
      basis = `${params.simRooms} rooms × $${unitCost.toLocaleString()}/room`

      // Add common area costs for furniture
      if (cat.id === 'furniture') {
        const commonAreaCost = 40000 // debrief, lobby, offices
        cost += commonAreaCost
        basis += ` + $${commonAreaCost.toLocaleString()} common areas`
      }
    }

    lineItems.push({
      categoryId: cat.id,
      categoryName: cat.name,
      calculatedCost: Math.round(cost),
      basis,
      notes: cat.notes
    })
  })

  // Calculate subtotal (hard costs)
  const subtotalHardCosts = lineItems.reduce((sum, item) => sum + item.calculatedCost, 0)

  // Calculate soft costs (percentage of hard costs)
  const softCostCat = costCategories.find(c => c.id === 'soft-costs')!
  const softCostPct = getEstimate(softCostCat) / 100
  const softCosts = Math.round(subtotalHardCosts * softCostPct)

  lineItems.push({
    categoryId: 'soft-costs',
    categoryName: softCostCat.name,
    calculatedCost: softCosts,
    basis: `${(softCostPct * 100).toFixed(0)}% of $${subtotalHardCosts.toLocaleString()} hard costs`,
    notes: softCostCat.notes
  })

  // Calculate contingency (5% of total)
  const contingency = Math.round((subtotalHardCosts + softCosts) * 0.05)

  const totalProjectCost = subtotalHardCosts + softCosts + contingency

  return {
    lineItems,
    subtotalHardCosts,
    softCosts,
    totalProjectCost,
    costPerSF: Math.round(totalProjectCost / params.floorArea),
    costPerRoom: Math.round(totalProjectCost / params.simRooms),
    contingency
  }
}

// =============================================================================
// SCENARIO COMPARISON
// =============================================================================

export interface Scenario {
  id: string
  name: string
  description: string
  parameters: ProjectParameters
}

export const predefinedScenarios: Scenario[] = [
  {
    id: 'bhl-base',
    name: 'BHL Base Build',
    description: 'Current plan: 3 sim rooms in hospital renovation',
    parameters: {
      floorArea: 4000,
      simRooms: 3,
      controlRooms: 1,
      debriefRooms: 2,
      supportSpaces: 3,
      constructionType: 'hospital-renovation',
      costRegion: 'moderate-cost',
      qualityLevel: 'standard'
    }
  },
  {
    id: 'bhl-enhanced',
    name: 'BHL Enhanced Build',
    description: 'Expanded plan: 5 sim rooms with premium equipment',
    parameters: {
      floorArea: 6000,
      simRooms: 5,
      controlRooms: 2,
      debriefRooms: 3,
      supportSpaces: 4,
      constructionType: 'hospital-renovation',
      costRegion: 'moderate-cost',
      qualityLevel: 'premium'
    }
  },
  {
    id: 'budget-option',
    name: 'Budget Build',
    description: 'Minimal viable center: 2 sim rooms, budget equipment',
    parameters: {
      floorArea: 2500,
      simRooms: 2,
      controlRooms: 1,
      debriefRooms: 1,
      supportSpaces: 2,
      constructionType: 'hospital-renovation',
      costRegion: 'moderate-cost',
      qualityLevel: 'budget'
    }
  },
  {
    id: 'new-building',
    name: 'New Building Option',
    description: 'Clean shell build-out without hospital constraints',
    parameters: {
      floorArea: 5000,
      simRooms: 4,
      controlRooms: 1,
      debriefRooms: 2,
      supportSpaces: 3,
      constructionType: 'clean-shell',
      costRegion: 'moderate-cost',
      qualityLevel: 'standard'
    }
  }
]

// =============================================================================
// EXISTING ASSETS CREDIT
// =============================================================================

export interface ExistingAssetCredit {
  categoryId: string
  description: string
  estimatedValue: number
}

export const existingAssets: ExistingAssetCredit[] = [
  {
    categoryId: 'simulators',
    description: 'SimMan 3G PLUS (purchased Dec 2024)',
    estimatedValue: 75000
  },
  {
    categoryId: 'simulators',
    description: 'Basic manikin trainers from nursing education',
    estimatedValue: 5000
  },
  {
    categoryId: 'furniture',
    description: 'Potential hospital surplus equipment (beds, monitors)',
    estimatedValue: 15000
  }
]

export function getTotalExistingAssets(): number {
  return existingAssets.reduce((sum, asset) => sum + asset.estimatedValue, 0)
}

// Calculate net new investment needed
export function calculateNetInvestment(params: ProjectParameters): {
  grossCost: number
  existingAssets: number
  netInvestment: number
} {
  const capex = calculateCAPEX(params)
  const assets = getTotalExistingAssets()

  return {
    grossCost: capex.totalProjectCost,
    existingAssets: assets,
    netInvestment: capex.totalProjectCost - assets
  }
}

// =============================================================================
// QUICK SUMMARY FOR DASHBOARD
// =============================================================================

export function getCAPEXSummary() {
  const base = calculateCAPEX(predefinedScenarios[0].parameters)
  const enhanced = calculateCAPEX(predefinedScenarios[1].parameters)
  const assets = getTotalExistingAssets()

  return {
    baseScenario: {
      name: 'Base Build (3 rooms)',
      totalCost: base.totalProjectCost,
      costPerRoom: base.costPerRoom,
      costPerSF: base.costPerSF
    },
    enhancedScenario: {
      name: 'Enhanced Build (5 rooms)',
      totalCost: enhanced.totalProjectCost,
      costPerRoom: enhanced.costPerRoom,
      costPerSF: enhanced.costPerSF
    },
    existingAssets: assets,
    netBaseInvestment: base.totalProjectCost - assets,
    benchmarks: {
      industryLowPerSF: 300,
      industryHighPerSF: 600,
      industryAvgPerRoom: 500000
    }
  }
}
