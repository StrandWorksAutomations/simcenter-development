// Benchmarking data from 11 leading hospital simulation centers
// Source: Prompt 1 - Benchmarking Best-in-Class Hospital Simulation Centers

export interface BenchmarkCenter {
  id: string
  name: string
  location: string
  facilitySize: string
  squareFootage: number | null
  annualVolume: string
  staffingModel: string
  staffCount: string
  techStack: string[]
  fundingModel: string
  outcomes: string[]
  accreditations: string[]
  maturityLevel: 'startup' | 'scaling' | 'mature'
  yearEstablished: number | null
}

export const benchmarkCenters: BenchmarkCenter[] = [
  {
    id: 'atrium',
    name: 'Atrium Health - Carolinas Simulation Center',
    location: 'Charlotte, NC',
    facilitySize: 'Multi-site sim labs',
    squareFootage: null,
    annualVolume: 'Hundreds of courses annually',
    staffingModel: 'Dedicated interdisciplinary sim team (~20+ staff)',
    staffCount: '20+',
    techStack: [
      'High-fidelity patient manikins (adult, pediatric, OB)',
      'Task trainers',
      'Virtual simulators',
      'Full AV capture & debrief rooms',
      'Surgical Skills Center',
      'Standardized patients',
      'Immersive scenario rooms'
    ],
    fundingModel: 'Hospital-funded, integrated into education budget',
    outcomes: [
      'Demonstrated improvements in procedural skills',
      'Improved team decision-making',
      'Regional training via Carolina Simulation Alliance'
    ],
    accreditations: ['SSH (Society for Simulation in Healthcare)', 'ACS Distinguished Level'],
    maturityLevel: 'mature',
    yearEstablished: 2007
  },
  {
    id: 'baycare',
    name: 'BayCare Health System - Simulation Program',
    location: 'West Central FL',
    facilitySize: 'Distributed across 15 hospitals',
    squareFootage: 10000,
    annualVolume: 'Thousands of clinicians annually',
    staffingModel: 'System-level coordination with local hospital-based educators',
    staffCount: '10-15',
    techStack: [
      'State-of-art manikins (adult, pediatric, obstetric)',
      'Task trainers',
      'VR simulation capability',
      'AV recording for debriefing',
      'Mobile sim carts'
    ],
    fundingModel: 'Operational budget for staff education',
    outcomes: [
      'Improved teamwork and communication in emergencies',
      'Reduced errors via VR-based training',
      'Unified care standards for new grads'
    ],
    accreditations: ['SSH'],
    maturityLevel: 'scaling',
    yearEstablished: null
  },
  {
    id: 'osf-jump',
    name: 'OSF HealthCare - Jump Trading Simulation Center',
    location: 'Peoria, IL',
    facilitySize: '168,000 sq ft freestanding center (6 floors)',
    squareFootage: 168000,
    annualVolume: '1.1+ million learner engagements; ~6,600 simulations/skills labs',
    staffingModel: 'Extensive dedicated staff (~50-100+)',
    staffCount: '50-100+',
    techStack: [
      'Dozens of high-fidelity manikins (all ages)',
      'Fully replicated hospital environments (ORs, ICU, patient home suite)',
      'AR/VR labs',
      'SimCapture AV system',
      '3D printing lab',
      'In-situ simulation teams',
      'Innovation Lab (AI, analytics)',
      'Virtual hospital setup'
    ],
    fundingModel: '$50M (philanthropy + system investment); ongoing ops + grants',
    outcomes: [
      'Reduced hospital-acquired conditions',
      'Testbed for new tech and processes',
      'Trained 12,800+ K-12 students via STEM programs',
      '$180M economic impact, 1,000+ jobs created'
    ],
    accreditations: ['SSH', 'Global leader recognition'],
    maturityLevel: 'mature',
    yearEstablished: 2013
  },
  {
    id: 'nch',
    name: 'NCH Healthcare System - Herb Family Sim Center',
    location: 'Naples, FL',
    facilitySize: '12,000 sq ft center',
    squareFootage: 12000,
    annualVolume: '4,032 learners; 18,689 hours; 655 simulation classes (2023)',
    staffingModel: 'Small core sim team (5-8 staff)',
    staffCount: '5-8',
    techStack: [
      'High-fidelity adult, pediatric, and infant manikins',
      'Immersive mixed-reality simulation',
      'Mock clinical rooms (ICU, ED, L&D)',
      'VR training for de-escalation',
      'Mobile AV debrief systems'
    ],
    fundingModel: 'Philanthropic donation + hospital budget',
    outcomes: [
      'Improved patient satisfaction',
      'Better quality metrics',
      'Improved teamwork and critical thinking',
      'Community outreach strengthening workforce pipeline'
    ],
    accreditations: ['SSH'],
    maturityLevel: 'scaling',
    yearEstablished: 2020
  },
  {
    id: 'rwjbarnabas',
    name: 'RWJBarnabas Health - Institute for Nursing Excellence',
    location: 'New Jersey',
    facilitySize: 'Two simulation training centers (~8,000+ sq ft total)',
    squareFootage: 8000,
    annualVolume: '~600+ new nurses/year',
    staffingModel: 'Nursing-centric: System Nursing Education Director + nurse educators',
    staffCount: '8-12',
    techStack: [
      'High-fidelity mannequins',
      'Advanced birthing simulator (Laerdal MamaAnne)',
      'Neonatal and adult simulators',
      'Fully equipped OR and ICU simulation rooms',
      'Standardized patient actors',
      'HealthStream LMS integration'
    ],
    fundingModel: 'System investment in workforce development + grants/donations',
    outcomes: [
      'Curbed first-year RN turnover',
      'Reduced variation in practice across 12 hospitals',
      'Improved patient safety metrics'
    ],
    accreditations: ['SSH Provisional'],
    maturityLevel: 'scaling',
    yearEstablished: 2023
  },
  {
    id: 'carilion',
    name: 'Carilion Clinic - Center for Simulation, Research & Patient Safety',
    location: 'Roanoke, VA',
    facilitySize: '~10,000 sq ft (includes Tesseract room)',
    squareFootage: 10000,
    annualVolume: 'Hundreds of simulations/year',
    staffingModel: 'Multidisciplinary team with human factors expertise',
    staffCount: '8-12',
    techStack: [
      'Dynamic immersive sim room (Tesseract) with 360° tech',
      'Passive sensors for motion tracking',
      'Makerspace with 3D printers',
      'AI and extended reality (XR) tools',
      'Standard high-fidelity mannequins',
      'Task trainers'
    ],
    fundingModel: 'Carilion Clinic capital + research grants',
    outcomes: [
      'Redesigned trauma bay layout',
      'Refined surgical protocols',
      'Safer device deployments via simulation testing'
    ],
    accreditations: ['SSH (Education and Systems Integration)'],
    maturityLevel: 'mature',
    yearEstablished: 2013
  },
  {
    id: 'parkview',
    name: 'Parkview Health - Mirro Center Simulation Lab',
    location: 'Fort Wayne, IN',
    facilitySize: '4,000 sq ft core lab + 42-foot mobile lab',
    squareFootage: 4000,
    annualVolume: '~300+ sessions/year in lab; ~250 hours mobile training',
    staffingModel: 'Small dedicated team (4-6 staff)',
    staffCount: '4-6',
    techStack: [
      'High-fidelity manikins (adult, pediatric, birthing)',
      'VR simulation systems',
      'Surgical simulation suite with laparoscopic/robotics trainers',
      '3D printing service',
      '42-foot Mobile Simulation Lab'
    ],
    fundingModel: 'Philanthropy + grants + Parkview Health ops',
    outcomes: [
      'Improved regional emergency preparedness',
      'Better trauma and OB emergency performance',
      'Regional EMS training via mobile unit'
    ],
    accreditations: ['SSH', 'ACS'],
    maturityLevel: 'scaling',
    yearEstablished: 2015
  },
  {
    id: 'riverside',
    name: 'Riverside Health System - Simulation Training Lab',
    location: 'Newport News, VA',
    facilitySize: '8,400 sq ft mock hospital environment',
    squareFootage: 8400,
    annualVolume: '11,800+ learners; ~2,900 simulation hours (first 3 years)',
    staffingModel: 'Lean core staff (~4 FTEs)',
    staffCount: '4',
    techStack: [
      'High-fidelity mannequins in each area',
      'Advanced clinical equipment (ventilators, defibrillators, infant warmers)',
      'In-situ simulation kits',
      'Video recording and advanced debrief software'
    ],
    fundingModel: 'Riverside Health System capital + local grants',
    outcomes: [
      '≥20% improvement in new grad nurse skills checkoffs',
      'Regional resource for EMS and high school students',
      'Award-winning simulation model (IMSH presentation)'
    ],
    accreditations: ['SSH (Teaching/Education)'],
    maturityLevel: 'scaling',
    yearEstablished: 2020
  },
  {
    id: 'sharp',
    name: 'Sharp HealthCare - System Simulation and Education Center',
    location: 'San Diego, CA',
    facilitySize: '~70,000 sq ft (multi-purpose); sim portion ~10,000 sq ft',
    squareFootage: 10000,
    annualVolume: '~3,000 learners initially; designed for >10,000/year',
    staffingModel: 'Integrated innovation & training staff with nurse leads',
    staffCount: '10-15',
    techStack: [
      'High-fidelity hospital simulation rooms',
      'Latest-gen manikins',
      'AR/VR spatial computing tech',
      'Technology Immersion Lab (AI, ML)',
      'Technology Demo room',
      'Interactive AV with data analytics'
    ],
    fundingModel: 'Conrad Prebys Foundation + Sharp HealthCare + industry partnerships',
    outcomes: [
      'Supports nursing residency for 7,000 nurses',
      'Evaluating VR for nurse training',
      'Robotics for reducing staff strain',
      'International knowledge exchange host'
    ],
    accreditations: ['SSH (in progress)'],
    maturityLevel: 'startup',
    yearEstablished: 2023
  },
  {
    id: 'uab',
    name: 'UAB Medicine - Clinical Simulation Program',
    location: 'Birmingham, AL',
    facilitySize: '~15,000 sq ft + Mobile Simulation Lab',
    squareFootage: 15000,
    annualVolume: 'Hundreds of sims annually + statewide mobile reach',
    staffingModel: 'Fully institutionalized with dedicated department',
    staffCount: '15-20',
    techStack: [
      'High-fidelity mannequins for adult, pediatric, trauma',
      'Immersive VR and AR simulation',
      'Task trainers for procedural skills',
      'E-learning modules',
      'Mobile sim lab with tele-sim technology'
    ],
    fundingModel: 'UAB Health System + state grants for rural health',
    outcomes: [
      '"SimFirst" culture - simulation before live practice',
      'Improved procedure success rates',
      'Increased access to rural hospital training',
      'Cross-disciplinary safety training'
    ],
    accreditations: ['SSH'],
    maturityLevel: 'mature',
    yearEstablished: 2010
  },
  {
    id: 'cleveland-clinic',
    name: 'Cleveland Clinic Simulation Center',
    location: 'Cleveland, OH',
    facilitySize: 'Large multi-room facility',
    squareFootage: 20000,
    annualVolume: '2,760 courses for 43,831 learners (2023)',
    staffingModel: 'Large dedicated team with specialization',
    staffCount: '25-30',
    techStack: [
      'Comprehensive high-fidelity manikins',
      'Full hospital environment replicas',
      'Advanced AV systems',
      'Integrated LMS',
      'Research capabilities'
    ],
    fundingModel: 'Cleveland Clinic institutional funding',
    outcomes: [
      'Tens of thousands trained annually',
      'Deeply integrated into all departments',
      'Research publications'
    ],
    accreditations: ['SSH (Full)'],
    maturityLevel: 'mature',
    yearEstablished: null
  }
]

// Aggregated statistics for display
export const benchmarkStatistics = {
  totalCenters: benchmarkCenters.length,
  avgSquareFootage: Math.round(
    benchmarkCenters.filter(c => c.squareFootage).reduce((sum, c) => sum + (c.squareFootage || 0), 0) /
    benchmarkCenters.filter(c => c.squareFootage).length
  ),
  maturityDistribution: {
    startup: benchmarkCenters.filter(c => c.maturityLevel === 'startup').length,
    scaling: benchmarkCenters.filter(c => c.maturityLevel === 'scaling').length,
    mature: benchmarkCenters.filter(c => c.maturityLevel === 'mature').length
  },
  commonTechStack: [
    'High-fidelity manikins',
    'Task trainers',
    'AV recording/debrief systems',
    'VR/AR capabilities',
    'Standardized patients',
    'LMS integration'
  ],
  keySuccessFactors: [
    'Align simulation with patient safety goals',
    'Invest in realistic, high-fidelity environments',
    'Ensure interprofessional team training',
    'Build structured onboarding curricula',
    'Develop competent, multidisciplinary sim teams',
    'Leverage technology wisely (AV, data, emerging tech)',
    'Establish strong debriefing processes',
    'Use simulation for system testing and process improvement',
    'Engage in community outreach and partnerships',
    'Continually measure impact and advocate for value'
  ]
}
