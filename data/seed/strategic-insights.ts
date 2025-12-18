// Strategic Benchmarking Insights
// Source: "Strategic Benchmarking of Hospital-Based Simulation Centers" (2024-2025 Analysis)
// Comprehensive analysis of 11 best-in-class simulation programs

// =============================================================================
// STRATEGIC ARCHITECTURE MODELS
// =============================================================================

export interface ArchitectureModel {
  id: string
  name: string
  description: string
  examples: string[]
  strengths: string[]
  weaknesses: string[]
  bestFor: string
  fundingImplication: string
}

export const architectureModels: ArchitectureModel[] = [
  {
    id: 'destination',
    name: 'Destination Model',
    description: 'Massive, architecturally impressive freestanding facilities that serve as innovation hubs and regional anchors',
    examples: ['OSF Jump (168,000 SF)', 'Sharp Prebys (68,000 SF)', 'NCH Herb (12,000 SF)'],
    strengths: [
      'Physical grandeur drives innovation and philanthropy',
      'Donors want naming opportunities on impressive buildings',
      'Attracts talent and industry partnerships',
      'Creates "innovation district" effect',
      'Economic impact to region'
    ],
    weaknesses: [
      'High capital cost',
      'Travel time for staff from clinical areas',
      'May create perception of "separate" from clinical operations'
    ],
    bestFor: 'Systems relying on major philanthropic gifts ($5M+)',
    fundingImplication: 'Use destination model to attract initial capital'
  },
  {
    id: 'embedded',
    name: 'Embedded / Distributed Model',
    description: 'Hub-and-spoke architecture with smaller labs embedded within hospitals across the system',
    examples: ['UPMC WISER (12 sites)', 'BayCare (15 hospitals)', 'RWJBarnabas (12 hospitals)'],
    strengths: [
      'Proximity reduces barriers to training',
      'Higher adoption rates among frontline staff',
      'No travel time for clinicians',
      'Standardization reaches every corner of enterprise',
      'Lower per-site capital cost'
    ],
    weaknesses: [
      'Requires sophisticated IT/software for coordination',
      'Can fragment into chaos without central management',
      'Less visually impressive for donors'
    ],
    bestFor: 'Large multi-hospital systems prioritizing clinical standardization',
    fundingImplication: 'Requires centralized software (like WISER SIMS) to function'
  },
  {
    id: 'mobile',
    name: 'Mobile / Outreach Model',
    description: 'Mobile simulation units (trucks, vans) that bring training to rural or remote locations',
    examples: ['Parkview Health (42-ft mobile lab)', 'UAB (2-room vehicle)'],
    strengths: [
      'Addresses "simulation deserts" in rural healthcare',
      'Builds community partnerships',
      'Unlocks public safety funding sources',
      'Can reach EMS, fire, police departments'
    ],
    weaknesses: [
      'Limited capacity per session',
      'Maintenance and logistics complexity',
      'Weather dependent'
    ],
    bestFor: 'Systems serving large, low-density geographic areas',
    fundingImplication: 'Public safety grants can fund mobile units'
  }
]

// =============================================================================
// FUNDING SUSTAINABILITY MODELS ("THIRD LEG OF THE STOOL")
// =============================================================================

export interface FundingStrategy {
  id: string
  name: string
  description: string
  examples: string[]
  revenueType: 'direct' | 'indirect' | 'grant'
  scalability: 'low' | 'medium' | 'high'
}

export const fundingStrategies: FundingStrategy[] = [
  {
    id: 'external-training',
    name: 'External Training Revenue',
    description: 'Train EMS, fire, police, and community partners for fees or grant coverage',
    examples: ['NCH trains Collier County first responders', 'Parkview trains rural EMS'],
    revenueType: 'direct',
    scalability: 'medium'
  },
  {
    id: 'industry-rd',
    name: 'Industry R&D Partnerships',
    description: 'Partner with device manufacturers to test products in simulated ORs',
    examples: ['OSF Jump partners with medical device companies'],
    revenueType: 'direct',
    scalability: 'high'
  },
  {
    id: 'course-licensing',
    name: 'Course & Software Licensing',
    description: 'License curriculum and management software to other centers',
    examples: ['WISER licenses curriculum', 'Cleveland Clinic sells simulation courses'],
    revenueType: 'direct',
    scalability: 'high'
  },
  {
    id: 'fellowships',
    name: 'Fellowship Programs',
    description: 'Attract funded trainees who contribute labor while paying tuition',
    examples: ['Cleveland Clinic Simulation Fellowship (3 tracks: Research, Education, Facilitator)'],
    revenueType: 'direct',
    scalability: 'medium'
  },
  {
    id: 'quality-integration',
    name: 'Quality/Safety Budget Integration',
    description: 'Position simulation as operational expense under Quality rather than Education',
    examples: ['BayCare', 'Carilion', 'Atrium Health'],
    revenueType: 'indirect',
    scalability: 'high'
  }
]

// =============================================================================
// CLINICAL OUTCOMES DATA (ROI EVIDENCE)
// =============================================================================

export interface ClinicalOutcome {
  id: string
  organization: string
  intervention: string
  outcome: string
  metric: string
  source: string
}

export const clinicalOutcomes: ClinicalOutcome[] = [
  {
    id: 'clabsi-cleveland',
    organization: 'Cleveland Clinic',
    intervention: 'Simulation-based mastery learning for central line insertion + standardized assessment tools',
    outcome: '31.4% reduction in CLABSI rates',
    metric: '~75 fewer infections per year',
    source: 'Cleveland Clinic Nursing Research 2022-2023'
  },
  {
    id: 'sepsis-carilion',
    organization: 'Carilion Clinic',
    intervention: 'Human factors engineering for sepsis identification and treatment workflows',
    outcome: '~30% reduction in sepsis mortality',
    metric: 'Population-level mortality reduction over 2 years',
    source: 'Carilion Center for Simulation Research'
  },
  {
    id: 'economic-osf',
    organization: 'OSF Jump',
    intervention: 'Comprehensive simulation center + innovation lab + STEAM education',
    outcome: '$180 million economic impact to Peoria region',
    metric: '1,000+ jobs created',
    source: 'OSF HealthCare Economic Impact Report'
  },
  {
    id: 'clabsi-upmc',
    organization: 'UPMC WISER',
    intervention: 'Simulation-based mastery learning requiring competency demonstration before patient contact',
    outcome: 'Dramatic and sustained CLABSI reduction',
    metric: 'Millions in avoided treatment costs and penalties',
    source: 'WISER Patient Safety Initiative'
  },
  {
    id: 'turnover-rwj',
    organization: 'RWJBarnabas Health',
    intervention: 'Simulation-heavy nurse residency and NOURISH orientation program',
    outcome: 'Reduced first-year nurse turnover',
    metric: 'Cost savings of ~$50K per retained RN',
    source: 'RWJBarnabas Institute for Nursing Excellence'
  }
]

// =============================================================================
// MATURITY PHASES
// =============================================================================

export interface MaturityPhase {
  id: string
  name: string
  characteristics: string[]
  examples: string[]
  avgSquareFeet: string
  avgStaff: string
  avgInvestment: string
}

export const maturityPhases: MaturityPhase[] = [
  {
    id: 'mature',
    name: 'Mature / System-Integrated',
    characteristics: [
      'Deep integration into quality and safety apparatus',
      'Dual reporting to Education and Operations',
      'Proven ROI through clinical outcomes',
      'Multi-site standardization',
      'Industry partnerships and research output'
    ],
    examples: ['OSF Jump', 'UPMC WISER', 'Mayo Clinic', 'Cleveland Clinic'],
    avgSquareFeet: '20,000-168,000',
    avgStaff: '30-100+',
    avgInvestment: '$15-50M'
  },
  {
    id: 'scaling',
    name: 'Scaling / High-Growth',
    characteristics: [
      'Rapid volume increases (doubling annually)',
      'Expanding program offerings',
      'Working toward full accreditation',
      'Building faculty pipeline',
      'Community partnerships developing'
    ],
    examples: ['NCH Herb', 'Sharp Prebys', 'RWJBarnabas', 'Riverside'],
    avgSquareFeet: '8,000-70,000',
    avgStaff: '6-20',
    avgInvestment: '$4-30M'
  },
  {
    id: 'specialized',
    name: 'Specialized / Niche',
    characteristics: [
      'Focus on specific modality or population',
      'Mobile or distributed model',
      'Research-intensive innovation',
      'Human factors engineering focus'
    ],
    examples: ['Parkview (mobile)', 'Carilion (human factors)', 'Arkansas Children (pediatric)'],
    avgSquareFeet: '4,000-10,000',
    avgStaff: '5-10',
    avgInvestment: '$2-8M'
  }
]

// =============================================================================
// TECHNOLOGY DIFFERENTIATORS
// =============================================================================

export interface TechDifferentiator {
  id: string
  technology: string
  description: string
  strategicFocus: string
  leaders: string[]
}

export const techDifferentiators: TechDifferentiator[] = [
  {
    id: 'virtual-hospital',
    technology: 'Virtual Hospital',
    description: 'Full hospital replica for longitudinal simulation from home to trauma bay',
    strategicFocus: 'Process engineering, workflow testing',
    leaders: ['OSF Jump']
  },
  {
    id: '3d-printing',
    technology: '3D Printing & Digital Twins',
    description: 'Patient-specific anatomical models for pre-surgical planning',
    strategicFocus: 'Surgical rehearsal, reduced operative time',
    leaders: ['OSF Jump', 'Mayo Clinic', 'Parkview']
  },
  {
    id: 'immersive-room',
    technology: '360° Immersive Rooms (Tesseract)',
    description: 'Reconfigurable projection environments for space prototyping',
    strategicFocus: 'Human factors research, facility design testing',
    leaders: ['Carilion Clinic']
  },
  {
    id: 'sims-software',
    technology: 'Centralized Management Software (SIMS)',
    description: 'Web platform for logistics, curriculum, and analytics across distributed sites',
    strategicFocus: 'Network management, standardization',
    leaders: ['UPMC WISER']
  },
  {
    id: 'ar-ai',
    technology: 'AR/AI Integration',
    description: 'Digital anatomy suites, AI-driven debriefing tools',
    strategicFocus: 'Clinical reasoning, future-ready training',
    leaders: ['Cleveland Clinic', 'Sharp Prebys']
  },
  {
    id: 'mobile-sim',
    technology: 'Mobile Simulation Labs',
    description: 'Custom ambulance trucks (42-ft) for rural outreach',
    strategicFocus: 'Rural healthcare, EMS partnerships',
    leaders: ['Parkview Health', 'UAB']
  }
]

// =============================================================================
// ACS AEI BENCHMARK DATA (2024)
// =============================================================================

export const acsAeiBenchmarks = {
  source: 'American College of Surgeons Accredited Education Institutes 2024 Annual Report',
  comprehensiveCenters: {
    avgSquareFeet: 26603,
    largestFacility: 250000,
    avgAnnualOpex: 2250000,
    avgIncome: 2250000, // Moving toward self-sufficiency
    avgFTE: 15
  },
  keyInsight: 'Comprehensive AEIs manage an average of 26,603 square feet with ~15 FTEs and $2.25M annual operating expenses'
}

// =============================================================================
// KEY STRATEGIC INSIGHTS
// =============================================================================

export const strategicInsights = [
  {
    id: 'si-1',
    title: 'From Education to Enterprise Risk Management',
    insight: '"Best-in-class" is no longer defined by square footage or manikin fidelity, but by depth of integration into the parent health system\'s quality and safety apparatus.',
    implication: 'Position simulation as ERM/HRO strategy, not just education'
  },
  {
    id: 'si-2',
    title: 'The Great Divergence',
    insight: 'Two distinct architectural philosophies serve different strategic goals: "Destination" attracts donors, "Embedded" drives adoption.',
    implication: 'Choose model based on funding strategy and operational goals'
  },
  {
    id: 'si-3',
    title: 'From Education to Operations',
    insight: 'Simulation reporting is shifting from Academic Affairs to Quality/Safety/Risk Management.',
    implication: 'Establish dual reporting lines to both Education (for accreditation) and Quality/Operations (for sustainable funding)'
  },
  {
    id: 'si-4',
    title: 'Rise of the Sim-Engineer',
    insight: 'Most mature centers employ biomedical engineers who design patient-specific 3D models or prototype new workflows.',
    implication: '"Best-in-class" now implies ability to create solutions, not just train on existing ones'
  },
  {
    id: 'si-5',
    title: 'The Third Leg of the Stool',
    insight: 'Most robust centers have developed external revenue streams to buffer against hospital budget cuts.',
    implication: 'Diversify funding through external training, industry R&D, course licensing, fellowships'
  },
  {
    id: 'si-6',
    title: 'Software is Mandatory',
    insight: 'A distributed model is impossible to manage without centralized management software.',
    implication: 'Invest in simulation management system (LMS integration, scheduling, analytics)'
  }
]

// =============================================================================
// SUMMARY FUNCTION
// =============================================================================

export function getStrategicSummary() {
  return {
    architectureModels: architectureModels.length,
    fundingStrategies: fundingStrategies.length,
    clinicalOutcomes: clinicalOutcomes.length,
    maturityPhases: maturityPhases.length,
    techDifferentiators: techDifferentiators.length,
    keyInsights: strategicInsights.length,
    acsAvgSqFt: acsAeiBenchmarks.comprehensiveCenters.avgSquareFeet,
    acsAvgFTE: acsAeiBenchmarks.comprehensiveCenters.avgFTE
  }
}
