// Comprehensive Investor Data for Baptist Health Lexington Simulation Center
// This file contains all research data for the investor pitch deck

// =============================================================================
// MARKET SIZE & INDUSTRY DATA
// =============================================================================

export const marketData = {
  globalMarketSize2024: 2.4, // $ billion
  globalMarketSize2030: 5.8, // $ billion projected
  cagr: 13.5, // % compound annual growth rate
  northAmericaShare: 42, // % of global market
  keyDrivers: [
    'Patient safety mandates from Joint Commission and CMS',
    'Nursing shortage requiring accelerated training',
    'Malpractice insurance incentives for simulation training',
    'COVID-19 accelerated adoption of simulation education',
    'Technological advances in VR/AR and AI-powered simulation'
  ],
  industryTrends: [
    { trend: 'Mobile Simulation Units', growth: '+45% adoption since 2020' },
    { trend: 'VR/AR Simulation', growth: '+67% market growth 2023-2024' },
    { trend: 'In-Situ Simulation', growth: 'Standard practice at 85% of top centers' },
    { trend: 'AI-Powered Debriefing', growth: 'Emerging - 15% early adoption' }
  ]
}

// =============================================================================
// BENCHMARK SIMULATION CENTERS - COMPREHENSIVE PROFILES
// =============================================================================

export interface BenchmarkCenterProfile {
  id: string
  name: string
  location: string
  squareFootage: number | string
  yearEstablished: number | string
  annualLearners: number | string
  annualSimHours: number | string
  staffCount: string
  staffingModel: string
  techStack: string[]
  accreditations: string[]
  fundingModel: string
  capitalInvestment: string
  maturityLevel: 'startup' | 'scaling' | 'mature'
  notableOutcomes: string[]
  keyDifferentiators: string[]
}

export const benchmarkCenters: BenchmarkCenterProfile[] = [
  {
    id: 'osf-jump',
    name: 'OSF HealthCare - Jump Trading Simulation Center',
    location: 'Peoria, IL',
    squareFootage: 168000,
    yearEstablished: 2013,
    annualLearners: '220,000+',
    annualSimHours: '6,600+ sessions',
    staffCount: '50-100+',
    staffingModel: 'Full interdisciplinary team with CMO, Executive Director, physicians, nurses, engineers, data analysts',
    techStack: [
      'Dozens of high-fidelity manikins (all ages)',
      'Full hospital replicas (OR, ICU, home suite)',
      'AR/VR labs',
      'SimCapture AV system',
      '3D printing lab',
      'Innovation Lab with AI analytics',
      'Virtual hospital setup'
    ],
    accreditations: ['SSH Accredited', 'ACS Level 1'],
    fundingModel: '$25M donor gift + $25M OSF match = $50M build cost',
    capitalInvestment: '$50,000,000',
    maturityLevel: 'mature',
    notableOutcomes: [
      '$180M economic impact to region',
      '1,000+ jobs created',
      'Reduced hospital-acquired conditions across OSF system',
      '12,800+ K-12 students trained via STEM programs',
      '1.1M+ learner engagements since opening'
    ],
    keyDifferentiators: [
      'One of largest simulation centers in the world',
      'Innovation testbed for new processes and tech',
      'Regional economic driver',
      'Youth STEAM education programs'
    ]
  },
  {
    id: 'atrium-carolinas',
    name: 'Atrium Health - Carolinas Simulation Center',
    location: 'Charlotte, NC',
    squareFootage: 'Multi-site',
    yearEstablished: 2007,
    annualLearners: 'Thousands',
    annualSimHours: 'Hundreds of courses',
    staffCount: '20+',
    staffingModel: 'Medical Director (MD), Assistant VP, nurse educators, sim operations specialists, sim tech staff',
    techStack: [
      'High-fidelity patient manikins (adult, pediatric, OB)',
      'Task trainers',
      'Virtual simulators',
      'Full AV capture & debrief rooms',
      'Separate Surgical Skills Center',
      'Standardized patients',
      'Immersive scenario rooms'
    ],
    accreditations: ['SSH Distinguished', 'ACS Distinguished'],
    fundingModel: 'Hospital-funded, integrated into education budget',
    capitalInvestment: '$10-15M estimated',
    maturityLevel: 'mature',
    notableOutcomes: [
      'Demonstrated improvements in procedural skills',
      'Enhanced team decision-making',
      'Regional training via Carolina Simulation Alliance',
      'Dual SSH/ACS accreditation recognition'
    ],
    keyDifferentiators: [
      'Dual SSH/ACS distinguished accreditation',
      'Regional simulation alliance leader',
      '17+ years operational experience'
    ]
  },
  {
    id: 'cleveland-clinic',
    name: 'Cleveland Clinic Simulation Center',
    location: 'Cleveland, OH',
    squareFootage: 'Large multi-site',
    yearEstablished: 2004,
    annualLearners: 43831,
    annualSimHours: '2,760 courses in 2023',
    staffCount: '30+',
    staffingModel: 'Integrated with medical education, dedicated sim faculty across specialties',
    techStack: [
      'Comprehensive manikin inventory',
      'Surgical simulation labs',
      'Robotic surgery trainers',
      'Full AV infrastructure',
      'In-situ simulation teams'
    ],
    accreditations: ['SSH Accredited', 'ACS Level 1'],
    fundingModel: 'Institution-funded with research grants',
    capitalInvestment: '$15-20M estimated',
    maturityLevel: 'mature',
    notableOutcomes: [
      '43,831 learners in 2023 alone',
      'Pioneering robotic surgery simulation',
      'Research publications in simulation science'
    ],
    keyDifferentiators: [
      'Massive scale and throughput',
      'Integration with world-class medical center',
      'Research focus'
    ]
  },
  {
    id: 'texas-childrens',
    name: 'Texas Children\'s Hospital Simulation Center',
    location: 'Houston, TX',
    squareFootage: 'Large',
    yearEstablished: 2010,
    annualLearners: 'Thousands',
    annualSimHours: '15,000+ hours in one year',
    staffCount: '25+',
    staffingModel: 'Pediatric-focused interdisciplinary team',
    techStack: [
      'Pediatric manikins (infant, child, adolescent)',
      'Neonatal simulators',
      'Specialty trainers',
      'Full AV system'
    ],
    accreditations: ['SSH Accredited'],
    fundingModel: 'Hospital-funded with philanthropic support',
    capitalInvestment: '$12-18M estimated',
    maturityLevel: 'mature',
    notableOutcomes: [
      '15,000+ simulation hours annually',
      'Leader in pediatric simulation',
      'Improved PICU outcomes'
    ],
    keyDifferentiators: [
      'Pediatric specialization',
      'High volume',
      'Research programs'
    ]
  },
  {
    id: 'sharp-prebys',
    name: 'Sharp HealthCare - Prebys Innovation & Education Center',
    location: 'San Diego, CA',
    squareFootage: 70000,
    yearEstablished: 2023,
    annualLearners: '3,000 Year 1, scaling to 10,000+',
    annualSimHours: 'Ramping up',
    staffCount: '15-20',
    staffingModel: 'Nursing-led with technology immersion lab engineers',
    techStack: [
      'High-fidelity hospital simulation rooms',
      'Latest-gen manikins',
      'AR/VR spatial computing tech',
      'AI/ML exploration in Technology Immersion Lab',
      'Technology Demo room'
    ],
    accreditations: ['SSH Provisional'],
    fundingModel: 'Conrad Prebys Foundation gift + Sharp HealthCare investment',
    capitalInvestment: '$25-30M estimated',
    maturityLevel: 'startup',
    notableOutcomes: [
      'Supports 7,000 nurses system-wide',
      'AI/VR technology exploration',
      'International knowledge exchange'
    ],
    keyDifferentiators: [
      'Newest generation facility (2023)',
      'Technology innovation focus',
      'Industry partnership model'
    ]
  },
  {
    id: 'nch-herb',
    name: 'NCH Healthcare - Herb Family Simulation Center',
    location: 'Naples, FL',
    squareFootage: 12000,
    yearEstablished: 2020,
    annualLearners: '4,032 in 2023',
    annualSimHours: '18,689 hours in 2023',
    staffCount: '5-8',
    staffingModel: 'Small core team with hospital educators and community partners',
    techStack: [
      'High-fidelity adult, pediatric, infant manikins',
      'Mixed-reality simulation',
      'VR training for de-escalation',
      'Mobile AV debrief systems'
    ],
    accreditations: ['SSH Provisional'],
    fundingModel: 'Philanthropic donation (Herb family) + hospital budget',
    capitalInvestment: '$5-8M estimated',
    maturityLevel: 'scaling',
    notableOutcomes: [
      'Doubled learner volume each year since 2021',
      'Improved patient satisfaction and quality metrics',
      'Community EMS training programs'
    ],
    keyDifferentiators: [
      'Rapid growth model',
      'Community hospital success story',
      'Philanthropic funding model'
    ]
  },
  {
    id: 'baycare',
    name: 'BayCare Health System Simulation Program',
    location: 'West Central Florida',
    squareFootage: '10,000+ across 15 sites',
    yearEstablished: 2015,
    annualLearners: 'Thousands system-wide',
    annualSimHours: 'Distributed across system',
    staffCount: '20+',
    staffingModel: 'System-level coordination with local hospital-based educators',
    techStack: [
      'State-of-art manikins at each site',
      'VR simulation capability system-wide',
      'Standardized curriculum',
      'Mobile sim carts for in-situ training'
    ],
    accreditations: ['SSH Accredited'],
    fundingModel: 'Operational budget for staff education',
    capitalInvestment: '$8-12M estimated (distributed)',
    maturityLevel: 'mature',
    notableOutcomes: [
      'Largest sim program in region',
      'VR fostering competency and reducing errors',
      'System-wide standardized care'
    ],
    keyDifferentiators: [
      'Distributed multi-site model',
      'Hub-and-spoke approach',
      'VR early adopter'
    ]
  },
  {
    id: 'rwjbarnabas',
    name: 'RWJBarnabas Health - Institute for Nursing Excellence',
    location: 'New Jersey',
    squareFootage: '8,000+',
    yearEstablished: 2023,
    annualLearners: '600+ new nurses annually',
    annualSimHours: 'Multiple cohorts weekly',
    staffCount: '10-15',
    staffingModel: 'Nursing-centric with train-the-trainer approach',
    techStack: [
      'High-fidelity mannequins including MamaAnne',
      'OR and ICU simulation rooms',
      'Standardized patient actors',
      'HealthStream LMS integration'
    ],
    accreditations: ['SSH Provisional'],
    fundingModel: 'System workforce development investment + grants',
    capitalInvestment: '$8-12M estimated',
    maturityLevel: 'scaling',
    notableOutcomes: [
      'Curbed first-year RN turnover',
      'Standardized practice across 12 hospitals',
      'Improved patient safety metrics'
    ],
    keyDifferentiators: [
      'Multi-hospital system focus',
      'Nursing residency integration',
      'Workforce retention focus'
    ]
  },
  {
    id: 'carilion',
    name: 'Carilion Clinic - Center for Simulation, Research & Patient Safety',
    location: 'Roanoke, VA',
    squareFootage: 10000,
    yearEstablished: 2013,
    annualLearners: 'Hundreds',
    annualSimHours: 'Hundreds of sessions',
    staffCount: '8-12',
    staffingModel: 'Medical Director with human factors expertise, integrated with Virginia Tech',
    techStack: [
      'Tesseract 360 degree immersive room',
      'Passive motion sensors',
      '3D printing makerspace',
      'AI and XR tools',
      'Standard high-fi mannequins'
    ],
    accreditations: ['SSH Accredited'],
    fundingModel: 'Carilion capital + Virginia Tech research grants',
    capitalInvestment: '$6-10M estimated',
    maturityLevel: 'mature',
    notableOutcomes: [
      'Redesigned trauma bay layout',
      'Human factors device testing',
      'System-level workflow improvements'
    ],
    keyDifferentiators: [
      'Human factors engineering focus',
      'Academic partnership model',
      'Innovation and research emphasis'
    ]
  },
  {
    id: 'parkview',
    name: 'Parkview Health - Mirro Center Simulation Lab',
    location: 'Fort Wayne, IN',
    squareFootage: 4000,
    yearEstablished: 2015,
    annualLearners: '1,000+',
    annualSimHours: '300+ sessions + 250 mobile hours',
    staffCount: '4-6',
    staffingModel: 'Small team with adjunct clinical faculty',
    techStack: [
      'High-fi manikins (adult, pediatric, birthing)',
      'VR simulation systems',
      'Surgical simulation suite',
      '3D printing service',
      '42-foot Mobile Simulation Lab (2023)'
    ],
    accreditations: ['SSH Accredited', 'ACS Accredited'],
    fundingModel: 'Philanthropy + state/federal grants for mobile unit',
    capitalInvestment: '$4-6M estimated',
    maturityLevel: 'scaling',
    notableOutcomes: [
      'Mobile unit reaching rural providers',
      'Improved regional emergency preparedness',
      '3D printing for patient-specific models'
    ],
    keyDifferentiators: [
      'Mobile simulation outreach',
      'Rural community focus',
      '3D printing innovation'
    ]
  },
  {
    id: 'riverside',
    name: 'Riverside Health System Simulation Training Lab',
    location: 'Newport News, VA',
    squareFootage: 8400,
    yearEstablished: 2020,
    annualLearners: '11,800+ in 3 years',
    annualSimHours: '2,900+ in 3 years',
    staffCount: '4',
    staffingModel: 'Lean core staff with volunteer physician and nurse instructors',
    techStack: [
      'High-fi mannequins in each simulated room',
      'Real clinical equipment (vents, defibs, warmers)',
      'In-situ simulation kits',
      'Video recording and debrief software'
    ],
    accreditations: ['SSH Accredited (Teaching/Education)'],
    fundingModel: 'Hospital capital project + local grants',
    capitalInvestment: '$3-5M estimated',
    maturityLevel: 'scaling',
    notableOutcomes: [
      '20%+ improvement in new grad nurse skills',
      '4 projects presented at IMSH 2024',
      'Regional workforce pipeline development'
    ],
    keyDifferentiators: [
      'Rapid accreditation achievement',
      'Community and EMS training',
      'Lean efficient model'
    ]
  }
]

// =============================================================================
// EQUIPMENT PRICING DATABASE
// =============================================================================

export interface EquipmentPricing {
  category: string
  vendor: string
  model: string
  priceRange: { low: number; high: number }
  warrantyYears: number
  annualMaintenancePct: number
  lifecycleYears: number
  notes: string
}

export const equipmentPricing: EquipmentPricing[] = [
  // Adult High-Fidelity Simulators
  { category: 'Adult Hi-Fidelity Sim', vendor: 'Laerdal', model: 'SimMan Essential', priceRange: { low: 30000, high: 40000 }, warrantyYears: 1, annualMaintenancePct: 12, lifecycleYears: 7, notes: 'Entry-level high-fi, good for basics' },
  { category: 'Adult Hi-Fidelity Sim', vendor: 'Laerdal', model: 'SimMan 3G', priceRange: { low: 60000, high: 80000 }, warrantyYears: 1, annualMaintenancePct: 12, lifecycleYears: 8, notes: 'Industry standard, excellent integration' },
  { category: 'Adult Hi-Fidelity Sim', vendor: 'Gaumard', model: 'HAL S3201', priceRange: { low: 48000, high: 65000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 8, notes: 'Tetherless, durable, trauma modules' },
  { category: 'Adult Hi-Fidelity Sim', vendor: 'CAE', model: 'Apollo', priceRange: { low: 50000, high: 85000 }, warrantyYears: 1, annualMaintenancePct: 15, lifecycleYears: 8, notes: 'Advanced physiology, CAE ecosystem' },

  // OB/GYN Simulators
  { category: 'OB Birthing Sim', vendor: 'Gaumard', model: 'Victoria S2200', priceRange: { low: 56500, high: 85000 }, warrantyYears: 1, annualMaintenancePct: 12, lifecycleYears: 7, notes: 'Most comprehensive OB sim, wireless' },
  { category: 'OB Birthing Sim', vendor: 'CAE', model: 'Lucina', priceRange: { low: 110000, high: 120000 }, warrantyYears: 1, annualMaintenancePct: 15, lifecycleYears: 7, notes: 'Highest fidelity maternal-fetal physiology' },
  { category: 'OB Birthing Sim', vendor: 'Laerdal', model: 'MamaAnne/SimMom', priceRange: { low: 35000, high: 60000 }, warrantyYears: 1, annualMaintenancePct: 12, lifecycleYears: 7, notes: 'Affordable high-fi birthing option' },

  // Pediatric/Neonatal
  { category: 'Neonatal Sim', vendor: 'Laerdal', model: 'SimNewB', priceRange: { low: 45000, high: 55000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 7, notes: 'Newborn NICU/PALS focused' },
  { category: 'Pediatric Sim', vendor: 'Laerdal', model: 'SimBaby/SimJunior', priceRange: { low: 20000, high: 30000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 7, notes: 'Infant and child models' },
  { category: 'Neonatal Sim', vendor: 'Gaumard', model: 'Super Tory', priceRange: { low: 55000, high: 65000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 7, notes: 'Realistic ventilator response, 8hr battery' },
  { category: 'Pediatric Sim', vendor: 'Gaumard', model: 'Pediatric HAL', priceRange: { low: 45000, high: 55000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 7, notes: 'Tetherless child with emotional expressions' },

  // Respiratory/Airway
  { category: 'Respiratory Trainer', vendor: 'IngMar', model: 'ASL 5000 + RespiSim', priceRange: { low: 40000, high: 75000 }, warrantyYears: 1, annualMaintenancePct: 8, lifecycleYears: 10, notes: 'Essential for advanced vent training' },
  { category: 'Airway Trainer', vendor: 'Various', model: 'Intubation Head', priceRange: { low: 500, high: 1500 }, warrantyYears: 1, annualMaintenancePct: 5, lifecycleYears: 5, notes: 'Basic airway practice' },
  { category: 'Chest Trainer', vendor: 'CAE Blue Phantom', model: 'Chest Tube Trainer', priceRange: { low: 1000, high: 3000 }, warrantyYears: 1, annualMaintenancePct: 5, lifecycleYears: 5, notes: 'Ultrasoundable for needle decompression' },

  // AV Systems
  { category: 'AV System', vendor: 'Laerdal', model: 'SimCapture Enterprise', priceRange: { low: 100000, high: 200000 }, warrantyYears: 1, annualMaintenancePct: 15, lifecycleYears: 7, notes: 'Top-tier, LTI-LMS integration, analytics' },
  { category: 'AV System', vendor: 'CAE', model: 'LearningSpace Enterprise', priceRange: { low: 100000, high: 200000 }, warrantyYears: 1, annualMaintenancePct: 15, lifecycleYears: 7, notes: 'Comprehensive center management' },
  { category: 'AV System', vendor: 'EMS', model: 'SimulationiQ Enterprise', priceRange: { low: 100000, high: 200000 }, warrantyYears: 1, annualMaintenancePct: 15, lifecycleYears: 7, notes: 'Excellent SP/OSCE support' },
  { category: 'AV System', vendor: 'IVS', model: 'VALT', priceRange: { low: 50000, high: 100000 }, warrantyYears: 1, annualMaintenancePct: 10, lifecycleYears: 7, notes: 'Budget option, fewer sim-specific features' }
]

// =============================================================================
// ROI MODEL - FINANCIAL PROJECTIONS
// =============================================================================

export const roiModel = {
  totalInvestment5Year: 12500000, // $12.5M
  capitalExpenditure: 8000000, // $8M
  operatingExpense5Year: 4500000, // $4.5M

  costAvoidanceProjections: {
    conservative: {
      orientationSavings: 1200000,
      turnoverReduction: 2500000,
      adverseEventPrevention: 500000,
      icuTransfersAvoided: 250000,
      externalRevenue: 200000,
      total: 4650000,
      roi: -63 // %
    },
    base: {
      orientationSavings: 1500000,
      turnoverReduction: 3000000,
      adverseEventPrevention: 750000,
      icuTransfersAvoided: 300000,
      externalRevenue: 250000,
      total: 5800000,
      roi: -54 // %
    },
    optimistic: {
      orientationSavings: 2000000,
      turnoverReduction: 5000000,
      adverseEventPrevention: 1500000,
      icuTransfersAvoided: 500000,
      externalRevenue: 500000,
      total: 9500000,
      roi: -24 // %
    }
  },

  kpiTargets: [
    {
      kpi: 'Orientation Time Reduction',
      baseline: '10-12 weeks',
      target: '7-8 weeks',
      impact: '~35% reduction',
      annualSavings: '$250,000-$300,000'
    },
    {
      kpi: 'RN Turnover Rate',
      baseline: '16-18%',
      target: '12-14%',
      impact: '3-5% absolute reduction',
      annualSavings: '$500,000-$867,000'
    },
    {
      kpi: 'First-Year Nurse Turnover',
      baseline: '25-30%',
      target: '15-20%',
      impact: '10% absolute reduction',
      annualSavings: 'Included in overall turnover'
    },
    {
      kpi: 'Adverse Events',
      baseline: 'Current rate',
      target: '10-15% reduction',
      impact: '8-10 events prevented over 5 years',
      annualSavings: '$50,000-$100,000'
    },
    {
      kpi: 'Code Blue Survival',
      baseline: 'Current survival rate',
      target: '+5-10% improvement',
      impact: 'Lives saved',
      annualSavings: 'Priceless + avoided long-term care costs'
    }
  ],

  industryBenchmarks: {
    costPerRnTurnover: 61000, // NSI 2024 report
    savingsPer1PctTurnoverReduction: 289000, // Industry average
    costPerAdverseEvent: 12000, // Conservative average
    clabsiReductionWithSimTraining: 84, // % reduction demonstrated
    malpracticeClaimReductionOb: 50 // % reduction with OB sim training
  }
}

// =============================================================================
// EQUIPMENT PACKAGES - BASE VS ENHANCED
// =============================================================================

export const equipmentPackages = {
  base: {
    name: 'Base Build - Essential Simulation Suite',
    description: 'Budget-conscious configuration meeting core training needs',
    initialCost: 330000,
    fiveYearMaintenance: 50000,
    fiveYearTCO: 380000,
    equipment: [
      { item: 'Adult Patient Simulators (x2)', cost: 80000, details: 'SimMan Essential + CAE Ares' },
      { item: 'Obstetric Simulator (x1)', cost: 35000, details: 'SimMom or NOELLE mid-range' },
      { item: 'Neonatal/Pediatric (x1)', cost: 25000, details: 'SimBaby or Gaumard baby' },
      { item: 'Geriatric Tools', cost: 4000, details: 'Aging suit + kit' },
      { item: 'Respiratory Trainers', cost: 2000, details: 'Basic airway and chest trainers' },
      { item: 'AV System', cost: 120000, details: 'VALT or SimCapture Cloud basic' },
      { item: 'Contingency', cost: 15000, details: 'Spare parts, misc' }
    ],
    limitations: [
      'Cannot run multiple simultaneous high-fi scenarios',
      'Limited advanced respiratory simulation',
      'Basic geriatric capabilities',
      'Fewer AV cameras and angles'
    ]
  },
  enhanced: {
    name: 'Enhanced Build - Advanced Simulation Suite',
    description: 'State-of-the-art capability for high-volume center',
    initialCost: 1000000,
    fiveYearMaintenance: 400000,
    fiveYearTCO: 1400000,
    equipment: [
      { item: 'Adult Patient Simulators (x2 high-fi)', cost: 155000, details: 'SimMan 3G + Gaumard HAL S5301' },
      { item: 'Obstetric Simulator (x1 high-fi)', cost: 85000, details: 'Gaumard Victoria with all options' },
      { item: 'Neonatal Simulator (x1)', cost: 60000, details: 'Gaumard Super Tory' },
      { item: 'Pediatric Simulator (x1)', cost: 50000, details: 'Gaumard Pediatric HAL' },
      { item: 'Geriatric Simulation', cost: 7000, details: 'GERi manikin + Realityworks suit' },
      { item: 'Respiratory (ASL 5000 + trainers)', cost: 92000, details: 'IngMar ASL 5000 + RespiSim Pro + trainers' },
      { item: 'Ventilator (new)', cost: 20000, details: 'Clinical-grade training ventilator' },
      { item: 'AV System (Enterprise)', cost: 200000, details: 'SimCapture or LearningSpace full deployment' },
      { item: 'VR Modules + Misc', cost: 30000, details: 'VR headsets, additional trainers' }
    ],
    capabilities: [
      'Four simultaneous high-fidelity scenarios',
      'Full age spectrum (neonate to geriatric)',
      'Advanced respiratory physiology simulation',
      'Complete AV coverage with analytics',
      'VR/AR capabilities',
      'Redundancy for equipment downtime'
    ]
  }
}

// =============================================================================
// FACILITY CONSTRUCTION COSTS
// =============================================================================

export const facilityCosts = {
  costPerSqFt: {
    low: 400,
    average: 500,
    high: 625,
    smartFacility: 650
  },

  recommendedSizes: {
    small: { sqFt: 4000, description: 'Single-suite lab, 1-2 sim rooms + debrief' },
    medium: { sqFt: 8000, description: 'Multi-suite center, 3-4 sim rooms' },
    large: { sqFt: 15000, description: 'Academic-style, 5+ sim rooms + classrooms' },
    regional: { sqFt: 25000, description: 'Regional training center' },
    world_class: { sqFt: 50000, description: 'Comprehensive simulation campus' }
  },

  infrastructureRequirements: [
    'Medical gas outlets (O2, air, suction)',
    'HVAC for server rooms and equipment',
    'Sound isolation between rooms',
    'Ceiling support for cameras/lifts',
    'Wide door frames for hospital beds',
    'Network infrastructure for AV',
    'Emergency power backup',
    'Storage for equipment and supplies'
  ],

  totalProjectCostEstimates: {
    small: { constructionLow: 1600000, constructionHigh: 2500000, equipmentBase: 380000, equipmentEnhanced: 850000 },
    medium: { constructionLow: 3200000, constructionHigh: 5000000, equipmentBase: 500000, equipmentEnhanced: 1400000 },
    large: { constructionLow: 6000000, constructionHigh: 9375000, equipmentBase: 750000, equipmentEnhanced: 2000000 }
  }
}

// =============================================================================
// SUCCESS METRICS & CASE STUDIES
// =============================================================================

export const successMetrics = {
  clinicalOutcomes: [
    { metric: 'Central Line Infection Rate', improvement: '84% reduction', source: 'Multi-hospital study with simulation training' },
    { metric: 'OB Adverse Outcome Index', improvement: '37% reduction', source: 'In-situ OB emergency simulations' },
    { metric: 'Malpractice Claims (OB/GYN)', improvement: '50% reduction', source: 'Simulation-trained physicians' },
    { metric: 'Pediatric Cardiac Arrest Survival', improvement: '33% to 56%', source: 'Regular mock code training program' },
    { metric: 'First-Year Nurse Turnover', improvement: '39% to 25%', source: 'Simulation-enhanced nurse residency' }
  ],

  operationalBenefits: [
    { benefit: 'Orientation Time Reduction', impact: '35% shorter (3-4 weeks saved)', source: 'Zigmont et al. study' },
    { benefit: 'Staff Confidence Scores', impact: '20%+ improvement', source: 'Post-simulation surveys' },
    { benefit: 'Protocol Compliance', impact: 'Higher checklist adherence', source: 'Observed in simulation-trained teams' },
    { benefit: 'Code Response Times', impact: 'Measurable improvements', source: 'Time to first compression, defibrillation' }
  ],

  financialReturns: [
    { organization: 'OSF Jump Trading Center', investment: '$50M', impact: '$180M economic impact to region', timeframe: 'Since 2013' },
    { organization: 'AdventHealth Nurse Residency', investment: 'Program cost', impact: '$87.5M savings from reduced turnover', timeframe: '2008-2019' },
    { organization: 'Industry Average', investment: '$1 per turnover prevention', impact: '$4-6 in savings', timeframe: 'Per 1% RN turnover reduction' }
  ]
}

// =============================================================================
// COMPETITIVE POSITIONING - KENTUCKY MARKET
// =============================================================================

export const kentuckyMarket = {
  competitors: [
    {
      name: 'UK HealthCare - University of Kentucky',
      location: 'Lexington, KY',
      type: 'Academic Medical Center',
      notes: 'Primary competitor - established academic simulation program',
      threat: 'high'
    },
    {
      name: 'Norton Healthcare',
      location: 'Louisville, KY',
      type: 'Health System',
      notes: 'Large system with training programs',
      threat: 'medium'
    },
    {
      name: 'University of Louisville',
      location: 'Louisville, KY',
      type: 'Academic',
      notes: 'Medical school simulation resources',
      threat: 'medium'
    }
  ],

  opportunity: {
    marketGap: 'No dedicated regional simulation training center serving community hospitals in Central/Eastern Kentucky',
    targetAudience: [
      'Baptist Health system staff (multiple hospitals)',
      'Regional EMS and first responders',
      'Rural hospital partners',
      'Nursing schools seeking clinical simulation',
      'Community health providers'
    ],
    differentiators: [
      'Focus on community hospital staff development',
      'Regional outreach with mobile simulation',
      'OB/maternal health specialization (regional need)',
      'Affordable access for smaller facilities'
    ]
  }
}

// =============================================================================
// INVESTOR PITCH KEY POINTS
// =============================================================================

export const investorPitchPoints = {
  problemStatement: {
    headline: 'Healthcare Training Crisis',
    points: [
      'National nursing shortage: 1.2M new nurses needed by 2030',
      'First-year nurse turnover: 25-30% (costs $60K+ per nurse)',
      'Medical errors: 3rd leading cause of death (250,000+ annually)',
      'Traditional training inadequate for high-acuity situations',
      'Rural hospitals lack access to advanced training resources'
    ]
  },

  solutionValue: {
    headline: 'Simulation Center as Strategic Investment',
    points: [
      'Practice high-risk scenarios without patient risk',
      'Reduce errors through repetitive skills training',
      'Improve staff retention through better preparation',
      'Create regional training resource generating goodwill',
      'Position Baptist Health as healthcare education leader'
    ]
  },

  financialCase: {
    headline: 'Return on Investment',
    points: [
      '$12.5M investment over 5 years (capital + operations)',
      '$5-6M in direct cost avoidance (base case)',
      'Potential breakeven in optimistic scenario',
      'Intangible returns: lives saved, reputation, recruitment',
      'External revenue opportunity: $50K-$100K annually'
    ]
  },

  callToAction: {
    headline: 'Investment Opportunity',
    askAmount: '$5-10M',
    namingOpportunities: [
      { name: 'Simulation Center Naming', amount: '$5,000,000+' },
      { name: 'Individual Simulation Suite', amount: '$500,000-$1,000,000' },
      { name: 'Equipment Sponsorship', amount: '$100,000-$500,000' },
      { name: 'Annual Program Support', amount: '$50,000-$100,000' }
    ],
    impact: [
      'Transform healthcare education in Central Kentucky',
      'Save lives through better-prepared clinicians',
      'Support nursing workforce pipeline',
      'Create lasting legacy in medical education'
    ]
  }
}

// Export all data
export const investorData = {
  marketData,
  benchmarkCenters,
  equipmentPricing,
  roiModel,
  equipmentPackages,
  facilityCosts,
  successMetrics,
  kentuckyMarket,
  investorPitchPoints
}
