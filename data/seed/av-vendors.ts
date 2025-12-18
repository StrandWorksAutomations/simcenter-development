// =============================================================================
// AV SOFTWARE VENDORS - Healthcare Simulation
// =============================================================================
// Comprehensive vendor database for simulation AV/recording systems
// Source: Industry research December 2024

export interface AVVendorContact {
  name?: string
  title?: string
  email?: string
  phone?: string
  notes?: string
}

export interface AVVendorBid {
  id: string
  vendorId: string
  proposalName: string
  dateReceived: string
  validUntil?: string
  totalYear1: number
  totalYear5?: number
  annualRecurring?: number
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'expired'
  documentPath?: string
  notes?: string
  lineItems?: {
    description: string
    amount: number
    type: 'one-time' | 'recurring'
  }[]
}

export interface AVVendor {
  id: string
  name: string
  shortName?: string
  website: string
  category: 'full-suite' | 'recording-only' | 'integration' | 'manikin-av'
  headquarters: {
    city: string
    state?: string
    country: string
  }
  globalOffices?: string[]
  founded?: number
  description: string

  // Contact Information
  salesEmail?: string
  salesPhone?: string
  supportEmail?: string
  supportPhone?: string
  contacts?: AVVendorContact[]

  // Products
  products: {
    name: string
    tier?: 'entry' | 'mid' | 'enterprise'
    description: string
    priceRange?: { low: number; high: number }
  }[]

  // Features Comparison
  features: {
    showsSimDetails: boolean
    showsManikinVitals: boolean
    showsStudentScores: boolean
    recordingPlayback: boolean
    annotateRecordings: boolean
    audioIntercom: boolean
    createScenarios: boolean
    selfEvaluations: boolean
    sessionMetrics: boolean
    mobileApp: boolean
    scheduling: boolean | 'limited'
    supportHelpline: boolean
    cloudStorage: boolean
    localStorage: boolean
    manikinAgnostic: boolean
    subscriptionBased: boolean | 'equipment-only'
    lmsIntegration: boolean | 'limited'
    ssoSupport: boolean
    osceWorkflows: boolean
  }

  // Notable Clients / Benchmark Organizations
  notableClients?: string[]
  clientCount?: string

  // Pricing Tier
  priceTier: '$' | '$$' | '$$$' | 'custom'

  // Notes
  notes?: string

  // Associated Bids
  bids?: AVVendorBid[]
}

// =============================================================================
// VENDOR DATABASE
// =============================================================================

export const avVendors: AVVendor[] = [
  {
    id: 'laerdal-simcapture',
    name: 'Laerdal Medical',
    shortName: 'SimCapture',
    website: 'laerdal.com/simcapture',
    category: 'full-suite',
    headquarters: { city: 'Stavanger', country: 'Norway' },
    globalOffices: ['USA (multiple)', 'UK', 'Germany', 'France', 'Australia'],
    founded: 1940,
    description: 'Industry leader in simulation. SimCapture is a comprehensive cloud-based platform acquired from B-Line Medical in 2019.',

    salesPhone: 'Contact via website',
    supportEmail: 'support@laerdal.com',
    contacts: [
      { name: 'Regional Sales', notes: 'Contact form at laerdal.com/simcapture/contact' }
    ],

    products: [
      { name: 'SimCapture Cloud', tier: 'enterprise', description: 'Full cloud-based simulation management', priceRange: { low: 150000, high: 250000 } },
      { name: 'SimCapture On-Premise', tier: 'enterprise', description: 'Self-hosted enterprise solution', priceRange: { low: 150000, high: 250000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: true,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: true,
      selfEvaluations: true,
      sessionMetrics: true,
      mobileApp: true,
      scheduling: true,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: true,
      lmsIntegration: true,
      ssoSupport: true,
      osceWorkflows: true
    },

    notableClients: [
      'Mayo Clinic',
      'Children\'s Hospital of Philadelphia',
      'Johns Hopkins',
      '9 of 10 top US News hospitals'
    ],
    clientCount: '500+ institutions in 35+ countries',

    priceTier: '$$$',
    notes: 'Premium solution with LTI integration for Canvas/Moodle/Blackboard. Seamless integration with all Laerdal simulators.'
  },

  {
    id: 'elevate-learningspace',
    name: 'Elevate Healthcare (formerly CAE Healthcare)',
    shortName: 'LearningSpace',
    website: 'elevatehealth.net',
    category: 'full-suite',
    headquarters: { city: 'Sarasota', state: 'FL', country: 'USA' },
    globalOffices: ['Canada', 'Germany', 'Hungary', 'UK', 'Brazil'],
    founded: 2023, // Rebrand from CAE Healthcare
    description: 'Global leader in healthcare simulation, spun off from CAE in 2023. LearningSpace is their flagship simulation center management platform.',

    supportEmail: 'Via help.learningspace.elevatehealth.net',
    contacts: [
      { title: 'Sales Inquiries', notes: 'Contact via elevatehealth.net' }
    ],

    products: [
      { name: 'LearningSpace Experience', tier: 'entry', description: 'Intelligent video capture and debrief', priceRange: { low: 50000, high: 80000 } },
      { name: 'LearningSpace Essentials', tier: 'mid', description: 'Automated reports, checklists, multi-room', priceRange: { low: 80000, high: 120000 } },
      { name: 'LearningSpace Enterprise', tier: 'enterprise', description: 'Full center management solution', priceRange: { low: 120000, high: 200000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: true,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: true,
      selfEvaluations: true,
      sessionMetrics: true,
      mobileApp: true,
      scheduling: 'limited', // Mid/high tier only
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: true,
      lmsIntegration: true,
      ssoSupport: true,
      osceWorkflows: true
    },

    notableClients: [],
    clientCount: 'Global presence',

    priceTier: '$$$',
    notes: 'Madison Industries is parent company (Chicago). Manufacturing in Sarasota, FL. Strong integration with CAE/Elevate simulators.'
  },

  {
    id: 'ems-simulationiq',
    name: 'Education Management Solutions (EMS)',
    shortName: 'SIMULATIONiQ / Enterprise',
    website: 'ems-works.com',
    category: 'full-suite',
    headquarters: { city: 'Wayne', state: 'PA', country: 'USA' },
    founded: 1994,
    description: 'Industry pioneer in simulation-based solutions. Built first automated medical skills assessment solution in 1997. Strong focus on SP/OSCE programs.',

    salesEmail: 'Via ems-works.com',
    salesPhone: '1-877-EMS-5050',
    contacts: [
      { name: 'Kyle Moyer', title: 'Regional Vice President', email: 'Kyle.Moyer@ems-works.com', phone: '610.701.7002 x365' }
    ],

    products: [
      { name: 'SIMULATIONiQ One Room', tier: 'entry', description: 'Single room recording and debriefing', priceRange: { low: 30000, high: 50000 } },
      { name: 'SIMULATIONiQ Cloud', tier: 'mid', description: 'Cloud-based simulation management', priceRange: { low: 60000, high: 100000 } },
      { name: 'SIMULATIONiQ Enterprise', tier: 'enterprise', description: 'Full on-premise enterprise solution', priceRange: { low: 100000, high: 200000 } },
      { name: 'Training in Motion', tier: 'mid', description: 'Mobile simulation platform', priceRange: { low: 30000, high: 40000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: true,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: true,
      selfEvaluations: true,
      sessionMetrics: true,
      mobileApp: true,
      scheduling: true,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: true,
      lmsIntegration: true,
      ssoSupport: true,
      osceWorkflows: true
    },

    notableClients: [
      'Harvard Medical School',
      'Samuel Merritt University',
      'Baptist Healthcare'
    ],

    priceTier: '$$$',
    notes: 'TotalCAREiQ support includes 98% first-call answer rate. Published API with established integrations. Strong SP/OSCE management features.'
  },

  {
    id: 'ivs-valt',
    name: 'Intelligent Video Solutions (IVS)',
    shortName: 'VALT',
    website: 'ipivs.com',
    category: 'recording-only',
    headquarters: { city: 'Sussex', state: 'WI', country: 'USA' },
    description: 'Video Audio Learning Tool (VALT) - cost-effective general AV recording solution with healthcare simulation applications.',

    salesEmail: 'sales@ipivs.com',
    salesPhone: '262.746.9290',
    contacts: [
      { title: 'Sales', email: 'sales@ipivs.com', phone: '262.746.9290' }
    ],

    products: [
      { name: 'VALT', tier: 'mid', description: 'Video recording and management platform', priceRange: { low: 50000, high: 100000 } }
    ],

    features: {
      showsSimDetails: false,
      showsManikinVitals: false,
      showsStudentScores: false,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: false,
      selfEvaluations: false,
      sessionMetrics: false,
      mobileApp: true,
      scheduling: false,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: false,
      lmsIntegration: 'limited',
      ssoSupport: false,
      osceWorkflows: false
    },

    notableClients: [
      'Mount Royal University',
      'Wisconsin Lutheran College'
    ],

    priceTier: '$$',
    notes: 'Up to 50% less than competitors. 90% lower maintenance costs. No per-client licensing. HIPAA/FERPA compliant. General AV focus - fewer sim-specific features.'
  },

  {
    id: 'simstation',
    name: 'SIMStation GmbH',
    shortName: 'SIMStation',
    website: 'simstation.com',
    category: 'full-suite',
    headquarters: { city: 'Vienna', country: 'Austria' },
    globalOffices: ['Miami, FL (USA HQ)'],
    founded: 2011,
    description: 'Global leader in AV and assessment systems for simulation training. Intuitive, scalable systems with US distribution through Level 3 AV.',

    salesEmail: 'sales@simstation.com',
    supportEmail: 'support@simstation.com',
    contacts: [
      { name: 'Joachim Hilbrand', title: 'Managing Director' },
      { name: 'Steven Matthews', title: 'Managing Director' }
    ],

    products: [
      { name: 'SIMStation Go', tier: 'entry', description: 'Portable recording solution', priceRange: { low: 20000, high: 40000 } },
      { name: 'SIMStation Essential', tier: 'mid', description: 'Core AV recording and debrief', priceRange: { low: 50000, high: 80000 } },
      { name: 'SIMStation Pro', tier: 'mid', description: 'Professional multi-room solution', priceRange: { low: 80000, high: 120000 } },
      { name: 'SIMStation Enterprise', tier: 'enterprise', description: 'Full enterprise deployment', priceRange: { low: 120000, high: 200000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: true,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: true,
      selfEvaluations: true,
      sessionMetrics: true,
      mobileApp: true,
      scheduling: true,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: true,
      lmsIntegration: true,
      ssoSupport: true,
      osceWorkflows: true
    },

    notableClients: [
      'UT Health (via Level 3 AV)'
    ],

    priceTier: '$$$',
    notes: 'Exclusive US distribution through Level 3 Audiovisual. European HQ in Vienna with dedicated US support teams.'
  },

  {
    id: 'level3av',
    name: 'Level 3 Audiovisual',
    shortName: 'Level 3 AV',
    website: 'level3av.com',
    category: 'integration',
    headquarters: { city: 'Akron', state: 'OH', country: 'USA' },
    founded: 1999,
    description: 'Award-winning AV/IT/Simulation technology integrator. "One call does it all" - combines AV, IT, simulation consulting, and project management.',

    salesPhone: '888-777-5328',
    salesEmail: 'satkinson@l3hc.com',
    contacts: [
      { title: 'Director', email: 'satkinson@l3hc.com' }
    ],

    products: [
      { name: 'SIMStation Integration', tier: 'enterprise', description: 'Full-service SIMStation deployment', priceRange: { low: 100000, high: 300000 } },
      { name: 'Custom AV Integration', tier: 'enterprise', description: 'Bespoke simulation center AV', priceRange: { low: 50000, high: 500000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: false,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: true,
      selfEvaluations: false,
      sessionMetrics: true,
      mobileApp: true,
      scheduling: true,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: 'equipment-only',
      lmsIntegration: true,
      ssoSupport: true,
      osceWorkflows: true
    },

    notableClients: [
      'UT Health'
    ],

    priceTier: 'custom',
    notes: 'Exclusive US distributor of SIMStation. 25+ years experience. Only healthcare simulation provider offering AV, IT, simulation consulting, and project management as one company.'
  },

  {
    id: 'kbport',
    name: 'KBPort',
    shortName: 'KBPort',
    website: 'kbport.com',
    category: 'recording-only',
    headquarters: { city: 'Pittsburgh', state: 'PA', country: 'USA' },
    description: 'Multimedia software solutions provider with 20+ years experience in AV consulting. Specializes in EMR simulation and recording systems.',

    contacts: [
      { title: 'Sales', notes: 'Demo available at SimGHOSTS, SSIH, INACSL conferences' }
    ],

    products: [
      { name: 'ETC V7', tier: 'mid', description: 'Web-based HD recorder with live streaming', priceRange: { low: 30000, high: 60000 } },
      { name: 'ETC FusionHD', tier: 'mid', description: 'AV + manikin data fusion system', priceRange: { low: 40000, high: 80000 } },
      { name: 'SimLink', tier: 'entry', description: 'Multi-device data capture', priceRange: { low: 10000, high: 25000 } },
      { name: 'SimEMR', tier: 'entry', description: 'Simulated electronic medical records', priceRange: { low: 5000, high: 15000 } }
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: false,
      recordingPlayback: true,
      annotateRecordings: true,
      audioIntercom: true,
      createScenarios: false,
      selfEvaluations: false,
      sessionMetrics: 'limited' as any,
      mobileApp: false,
      scheduling: false,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: true,
      manikinAgnostic: true,
      subscriptionBased: false,
      lmsIntegration: true,
      ssoSupport: false,
      osceWorkflows: false
    },

    notableClients: [],

    priceTier: '$$',
    notes: 'Strong Gaumard and Laerdal manikin integration via SimLink. SimEMR offers 1-year free trial with hardware purchase.'
  },

  {
    id: 'gaumard-uni',
    name: 'Gaumard Scientific',
    shortName: 'UNI',
    website: 'gaumard.com',
    category: 'manikin-av',
    headquarters: { city: 'Miami', state: 'FL', country: 'USA' },
    founded: 1946,
    description: 'Premier manikin manufacturer with integrated UNI control software. UNI 3 powers all Gaumard simulators with built-in recording capabilities.',

    salesEmail: 'sales@gaumard.com',
    salesPhone: '+1.305.971.3790',
    contacts: [
      { name: 'James Archetto', title: 'VP of Domestic Sales' },
      { title: 'Sales', email: 'sales@gaumard.com', phone: '800-882-6655' }
    ],

    products: [
      { name: 'UNI 3', tier: 'mid', description: 'Simulator control and basic recording', priceRange: { low: 0, high: 0 } } // Included with manikins
    ],

    features: {
      showsSimDetails: true,
      showsManikinVitals: true,
      showsStudentScores: false,
      recordingPlayback: true,
      annotateRecordings: 'limited' as any,
      audioIntercom: false,
      createScenarios: true,
      selfEvaluations: false,
      sessionMetrics: 'limited' as any,
      mobileApp: false,
      scheduling: false,
      supportHelpline: true,
      cloudStorage: false,
      localStorage: true,
      manikinAgnostic: false,
      subscriptionBased: false,
      lmsIntegration: 'limited',
      ssoSupport: false,
      osceWorkflows: false
    },

    notableClients: [],
    clientCount: '70+ countries',

    priceTier: '$$',
    notes: 'UNI software included with Gaumard manikins (HAL, SUSIE, Victoria, etc.). Limited standalone AV - best paired with dedicated AV system.'
  },

  {
    id: 'pocket-nurse',
    name: 'Pocket Nurse',
    shortName: 'Pocket Nurse',
    website: 'pocketnurse.com',
    category: 'integration',
    headquarters: { city: 'Pittsburgh', state: 'PA', country: 'USA' },
    founded: 1992,
    description: 'Nurse-owned simulation supplies company. Distributes SimEMR and Body Interact VR simulators. Focus on nursing education.',

    salesEmail: 'cs@pocketnurse.com',
    salesPhone: '800-225-1600',
    contacts: [
      { title: 'Sales', phone: '800-225-1600 Option 1', email: 'cs@pocketnurse.com' },
      { title: 'International', phone: '724-480-3777', email: 'csgovint@pocketnurse.com' },
      { title: 'Simulation Kits', phone: '800-225-1600 Option 2', email: 'kits@pocketnurse.com' }
    ],

    products: [
      { name: 'SimEMR Distribution', tier: 'entry', description: 'KBPort SimEMR distribution', priceRange: { low: 5000, high: 15000 } },
      { name: 'Body Interact VR', tier: 'mid', description: 'Virtual patient simulators', priceRange: { low: 15000, high: 40000 } }
    ],

    features: {
      showsSimDetails: false,
      showsManikinVitals: false,
      showsStudentScores: false,
      recordingPlayback: false,
      annotateRecordings: false,
      audioIntercom: false,
      createScenarios: false,
      selfEvaluations: false,
      sessionMetrics: false,
      mobileApp: false,
      scheduling: false,
      supportHelpline: true,
      cloudStorage: true,
      localStorage: false,
      manikinAgnostic: true,
      subscriptionBased: false,
      lmsIntegration: false,
      ssoSupport: false,
      osceWorkflows: false
    },

    notableClients: [],

    priceTier: '$',
    notes: '20+ product specialists and clinical simulation nurses on staff. Focus on simulation supplies and equipment distribution.'
  },

  {
    id: 'simulab',
    name: 'Simulab Corporation',
    shortName: 'Simulab',
    website: 'simulab.com',
    category: 'manikin-av',
    headquarters: { city: 'Seattle', state: 'WA', country: 'USA' },
    description: 'Specializes in surgical simulation and procedural training. Known for TraumaMan and surgical task trainers.',

    contacts: [
      { title: 'Sales', notes: 'Contact via simulab.com' }
    ],

    products: [
      { name: 'TraumaMan System', tier: 'mid', description: 'Surgical trauma simulation with recording', priceRange: { low: 30000, high: 60000 } }
    ],

    features: {
      showsSimDetails: false,
      showsManikinVitals: false,
      showsStudentScores: false,
      recordingPlayback: true,
      annotateRecordings: false,
      audioIntercom: false,
      createScenarios: false,
      selfEvaluations: false,
      sessionMetrics: false,
      mobileApp: false,
      scheduling: false,
      supportHelpline: true,
      cloudStorage: false,
      localStorage: true,
      manikinAgnostic: false,
      subscriptionBased: false,
      lmsIntegration: false,
      ssoSupport: false,
      osceWorkflows: false
    },

    notableClients: [],

    priceTier: '$$',
    notes: 'Surgical simulation focus. Limited AV capabilities - primarily for procedural/surgical training.'
  }
]

// =============================================================================
// BID DATA (Example - Baptist Healthcare EMS Proposal)
// =============================================================================

export const avVendorBids: AVVendorBid[] = [
  {
    id: 'bid-ems-enterprise-2025',
    vendorId: 'ems-simulationiq',
    proposalName: 'Enterprise On Premise & Training in Motion',
    dateReceived: '2025-04-01',
    validUntil: '2025-05-01',
    totalYear1: 164490,
    totalYear5: 237504,
    annualRecurring: 17715,
    status: 'under_review',
    documentPath: '/AV-suppliers-bids/Baptist Health EMS Enterprise - Training in Motion Proposal 20250227 (1).pdf',
    notes: 'Includes Year 1 TotalCAREiQ Gold support waiver ($17,365 discount). 3-5% annual increase on subscriptions.',
    lineItems: [
      { description: 'Enterprise On Premise Solution', amount: 90630, type: 'one-time' },
      { description: 'EMS Professional Services', amount: 73860, type: 'one-time' },
      { description: 'TotalCAREiQ Gold Package (Year 1 Waived)', amount: 0, type: 'recurring' },
      { description: 'TotalCAREiQ Gold Package (Year 2)', amount: 17715, type: 'recurring' },
      { description: 'TotalCAREiQ Gold Package (Year 3)', amount: 18069, type: 'recurring' },
      { description: 'TotalCAREiQ Gold Package (Year 4)', amount: 18431, type: 'recurring' },
      { description: 'TotalCAREiQ Gold Package (Year 5)', amount: 18799, type: 'recurring' }
    ]
  },
  {
    id: 'bid-ems-tim-2025',
    vendorId: 'ems-simulationiq',
    proposalName: 'Training in Motion Add-on',
    dateReceived: '2025-04-01',
    validUntil: '2025-05-01',
    totalYear1: 33750,
    totalYear5: 85260,
    annualRecurring: 12500,
    status: 'under_review',
    documentPath: '/AV-suppliers-bids/Baptist Health EMS Enterprise - Training in Motion Proposal 20250227 (1).pdf',
    notes: 'Mobile simulation unit. 3% prepay discount available. Requires active Enterprise subscription.',
    lineItems: [
      { description: 'Training in Motion Unit', amount: 15000, type: 'one-time' },
      { description: 'Integration Labor', amount: 4000, type: 'one-time' },
      { description: 'Shipping', amount: 500, type: 'one-time' },
      { description: 'Single Sign On', amount: 2000, type: 'one-time' },
      { description: 'Software & Support (Year 1)', amount: 12250, type: 'recurring' },
      { description: 'Software & Support (Year 2)', amount: 12500, type: 'recurring' },
      { description: 'Software & Support (Year 3)', amount: 12750, type: 'recurring' },
      { description: 'Software & Support (Year 4)', amount: 13000, type: 'recurring' },
      { description: 'Software & Support (Year 5)', amount: 13260, type: 'recurring' }
    ]
  }
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getAVVendorById(id: string): AVVendor | undefined {
  return avVendors.find(v => v.id === id)
}

export function getAVVendorsByCategory(category: AVVendor['category']): AVVendor[] {
  return avVendors.filter(v => v.category === category)
}

export function getBidsByVendor(vendorId: string): AVVendorBid[] {
  return avVendorBids.filter(b => b.vendorId === vendorId)
}

export function getBidsByStatus(status: AVVendorBid['status']): AVVendorBid[] {
  return avVendorBids.filter(b => b.status === status)
}

export function getAVVendorStats() {
  return {
    totalVendors: avVendors.length,
    fullSuite: avVendors.filter(v => v.category === 'full-suite').length,
    recordingOnly: avVendors.filter(v => v.category === 'recording-only').length,
    integration: avVendors.filter(v => v.category === 'integration').length,
    manikinAV: avVendors.filter(v => v.category === 'manikin-av').length,
    totalBids: avVendorBids.length,
    pendingBids: avVendorBids.filter(b => b.status === 'pending' || b.status === 'under_review').length,
    totalBidValue: avVendorBids.reduce((sum, b) => sum + b.totalYear1, 0)
  }
}

// Feature comparison matrix for quick display
export function getFeatureComparisonMatrix() {
  const features = [
    { key: 'showsSimDetails', label: 'Shows Simulation Details' },
    { key: 'showsManikinVitals', label: 'Shows Manikin Vitals' },
    { key: 'showsStudentScores', label: 'Shows Student Scores' },
    { key: 'recordingPlayback', label: 'Recording for Playback' },
    { key: 'annotateRecordings', label: 'Annotate Recordings' },
    { key: 'audioIntercom', label: 'Audio Intercom' },
    { key: 'createScenarios', label: 'Create Patient Scenarios' },
    { key: 'selfEvaluations', label: 'Integrated Self Evaluations' },
    { key: 'sessionMetrics', label: 'Session Metrics Tracking' },
    { key: 'mobileApp', label: 'Phone/Tablet App' },
    { key: 'scheduling', label: 'Self-contained Scheduling' },
    { key: 'supportHelpline', label: 'Support Helpline' },
    { key: 'cloudStorage', label: 'Cloud Storage' },
    { key: 'localStorage', label: 'Local Storage' },
    { key: 'manikinAgnostic', label: 'Works with Any Manikin' },
    { key: 'subscriptionBased', label: 'Subscription Based' },
    { key: 'lmsIntegration', label: 'LMS Integration' },
    { key: 'ssoSupport', label: 'SSO Support' },
    { key: 'osceWorkflows', label: 'OSCE Workflows' }
  ]

  return {
    features,
    vendors: avVendors.filter(v => v.category === 'full-suite' || v.category === 'recording-only')
  }
}
