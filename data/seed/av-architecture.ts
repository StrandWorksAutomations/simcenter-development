// A/V and IT Architecture Data
// Source: Prompt 5 - A/V + IT architecture budget (HIPAA, retention, security, reliability)

// =============================================================================
// EQUIPMENT & BUDGET
// =============================================================================

export interface AVEquipmentItem {
  id: string
  category: 'software' | 'cameras' | 'audio' | 'network' | 'displays' | 'storage' | 'services' | 'contingency'
  name: string
  description: string
  quantity: number | string
  unitCost: number
  totalCost: number
  vendor: string | null
  notes: string
}

export const avEquipmentBudget: AVEquipmentItem[] = [
  {
    id: 'av-software',
    category: 'software',
    name: 'Simulation A/V Software & Server',
    description: 'VALT or SimCapture system - licenses + appliance for 3 rooms with ~8-10 camera inputs',
    quantity: '1 system',
    unitCost: 70000,
    totalCost: 70000,
    vendor: 'IVS (VALT) or Laerdal (SimCapture)',
    notes: 'Core platform for recording, live viewing, and debrief. Includes first year support.'
  },
  {
    id: 'ip-cameras',
    category: 'cameras',
    name: 'IP Cameras (PTZ HD)',
    description: 'Ceiling-mount PoE cameras (1080p) with pan-tilt-zoom capability',
    quantity: 8,
    unitCost: 1000,
    totalCost: 8000,
    vendor: 'Axis Communications / Panasonic',
    notes: '2-3 cameras per sim room plus debrief area. Low-light capable with remote PTZ control.'
  },
  {
    id: 'audio-system',
    category: 'audio',
    name: 'Microphones & DSP',
    description: 'Ceiling mics, audio DSP (Symetrix/Biamp), speakers for 3 rooms',
    quantity: '1 lot',
    unitCost: 6000,
    totalCost: 6000,
    vendor: 'Symetrix / Biamp',
    notes: 'Includes 3-4 mics ($300 each), DSP unit ($2,000), amplifiers/speakers ($1,000).'
  },
  {
    id: 'network-switches',
    category: 'network',
    name: 'PoE+ Network Switches',
    description: 'Gigabit switches for cameras & devices with sufficient PoE power budget',
    quantity: '1-2',
    unitCost: 1500,
    totalCost: 3000,
    vendor: 'Cisco Catalyst',
    notes: '24-port enterprise-grade with PoE+ on most ports. Dual for redundancy.'
  },
  {
    id: 'workstations',
    category: 'displays',
    name: 'Control/Debrief PCs & Displays',
    description: 'Workstations (3) + large 75" 4K debrief display',
    quantity: '1 lot',
    unitCost: 7000,
    totalCost: 7000,
    vendor: 'Dell / LG',
    notes: 'High-performance PCs for multi-stream decoding. Includes wall mount for display.'
  },
  {
    id: 'storage-nas',
    category: 'storage',
    name: 'Storage Expansion (NAS)',
    description: 'Additional RAID storage if needed - ~20TB usable capacity',
    quantity: 1,
    unitCost: 5000,
    totalCost: 5000,
    vendor: 'Synology / QNAP',
    notes: 'RAID-6 or RAID-10 for redundancy. May be included in vendor package.'
  },
  {
    id: 'installation',
    category: 'services',
    name: 'Installation & Training',
    description: 'Vendor/hospital IT services for setup and staff training',
    quantity: '1 lot',
    unitCost: 10000,
    totalCost: 10000,
    vendor: 'Vendor Professional Services',
    notes: 'On-site installation support, initial configuration, training sessions.'
  },
  {
    id: 'contingency',
    category: 'contingency',
    name: 'Miscellaneous & Contingency',
    description: 'Mounts, cables, spare parts, future-proof upgrades',
    quantity: '1 lot',
    unitCost: 5000,
    totalCost: 5000,
    vendor: null,
    notes: 'Buffer for unforeseen needs. Could cover extra camera or mobile A/V cart.'
  }
]

export const avBudgetSummary = {
  totalInitial: avEquipmentBudget.reduce((sum, item) => sum + item.totalCost, 0),
  rangelow: 100000,
  rangeHigh: 120000,
  annualMaintenancePct: 0.15,
  get annualMaintenance() {
    return Math.round(this.totalInitial * this.annualMaintenancePct)
  }
}

// =============================================================================
// ARCHITECTURE COMPONENTS
// =============================================================================

export interface ArchitectureComponent {
  id: string
  layer: 'capture' | 'network' | 'storage' | 'access' | 'security'
  name: string
  description: string
  features: string[]
  recommendation: string
}

export const architectureComponents: ArchitectureComponent[] = [
  {
    id: 'capture-layer',
    layer: 'capture',
    name: 'Video/Audio Capture',
    description: 'IP cameras and microphones in each simulation room feeding into central system',
    features: [
      '2-3 HD PTZ cameras per sim room',
      'Ceiling-mounted microphones',
      'PoE-powered devices',
      'Real-time streaming with low latency',
      'Voice of God speaker system'
    ],
    recommendation: 'Use Axis or Panasonic IP cameras with remote PTZ control'
  },
  {
    id: 'network-layer',
    layer: 'network',
    name: 'Dedicated Simulation VLAN',
    description: 'Isolated network segment for all A/V devices, separate from hospital clinical systems',
    features: [
      'Dedicated VLAN for A/V traffic',
      'PoE+ switches with QoS enabled',
      'Firewall rules for controlled access',
      'No direct hospital network access for cameras',
      'Enterprise-grade switches with dual power'
    ],
    recommendation: 'Cisco Catalyst series switches with hospital IT oversight'
  },
  {
    id: 'storage-layer',
    layer: 'storage',
    name: 'Recording Storage',
    description: 'On-premises or hybrid cloud storage for simulation recordings',
    features: [
      'RAID-protected local storage',
      'Encrypted data at rest (AES-256)',
      'Automatic retention enforcement',
      'Backup to hospital systems or cloud',
      'Scalable for future expansion'
    ],
    recommendation: 'On-premises initially with cloud archival integration later'
  },
  {
    id: 'access-layer',
    layer: 'access',
    name: 'User Access & Debrief',
    description: 'Control room and debrief room interfaces for live viewing and playback',
    features: [
      'Live multi-camera view in control room',
      'Timeline annotations and bookmarks',
      'Large display playback in debrief room',
      'Web-based interface for remote access',
      'Role-based video access permissions'
    ],
    recommendation: 'Browser-based interface with SSO integration'
  },
  {
    id: 'security-layer',
    layer: 'security',
    name: 'Security & Compliance',
    description: 'HIPAA-compliant security controls for data protection',
    features: [
      'TLS encryption in transit',
      'AES-256 encryption at rest',
      'Active Directory integration',
      'Audit logging of all access',
      'Business Associate Agreement with vendors'
    ],
    recommendation: 'Full encryption, RBAC, and centralized audit logging'
  }
]

// =============================================================================
// STORAGE OPTIONS
// =============================================================================

export interface StorageOption {
  id: string
  name: string
  type: 'on-premises' | 'cloud' | 'hybrid'
  pros: string[]
  cons: string[]
  costModel: string
  recommendation: boolean
}

export const storageOptions: StorageOption[] = [
  {
    id: 'on-prem',
    name: 'On-Premises Storage',
    type: 'on-premises',
    pros: [
      'Complete data control - videos never leave hospital network',
      'Lower long-term cost after initial investment',
      'Works even if internet is down',
      'Can leverage existing hospital backup infrastructure'
    ],
    cons: [
      'IT staff must manage updates and maintenance',
      'Capacity planning required as usage grows',
      'Single point of failure without off-site backup'
    ],
    costModel: 'Higher upfront hardware cost, lower recurring fees',
    recommendation: true
  },
  {
    id: 'cloud',
    name: 'Cloud Storage',
    type: 'cloud',
    pros: [
      'Virtually unlimited storage expansion',
      'Vendor-managed backups and redundancy',
      'Remote access from anywhere',
      'Multi-site collaboration possible'
    ],
    cons: [
      'Requires internet connectivity',
      'Ongoing subscription costs',
      'Data leaves hospital premises (compliance concern)',
      'Dependent on vendor reliability'
    ],
    costModel: 'Lower upfront cost, recurring subscription fees',
    recommendation: false
  },
  {
    id: 'hybrid',
    name: 'Hybrid (Recommended)',
    type: 'hybrid',
    pros: [
      'Best of both: quick local access + off-site backup',
      'Scalable with cloud for archival',
      'Maintains operation during internet outages',
      'Aligns with hospital cloud strategy'
    ],
    cons: [
      'More complex to configure',
      'Both infrastructure and subscription costs',
      'Requires clear data governance policies'
    ],
    costModel: 'Balanced upfront + moderate recurring fees',
    recommendation: true
  }
]

// =============================================================================
// IMPLEMENTATION TIMELINE
// =============================================================================

export interface ImplementationPhase {
  id: string
  phase: string
  name: string
  month: string
  description: string
  deliverables: string[]
  dependencies: string[]
}

export const implementationTimeline: ImplementationPhase[] = [
  {
    id: 'phase-1',
    phase: 'Planning',
    name: 'Requirements Gathering',
    month: 'Month 0-1',
    description: 'Engage stakeholders to define detailed requirements, finalize retention policy',
    deliverables: [
      'Detailed A/V system specification',
      'RFP for vendors',
      'Retention policy documented',
      'Security requirements defined'
    ],
    dependencies: []
  },
  {
    id: 'phase-2',
    phase: 'Procurement',
    name: 'Vendor Selection & Orders',
    month: 'Month 2-3',
    description: 'Evaluate vendor proposals, select system, place equipment orders',
    deliverables: [
      'Vendor contract signed',
      'Equipment orders placed',
      'Camera/hardware models confirmed',
      'Network equipment procured'
    ],
    dependencies: ['phase-1']
  },
  {
    id: 'phase-3',
    phase: 'Infrastructure',
    name: 'Cabling & Network Setup',
    month: 'Month 4-6',
    description: 'Low-voltage cabling during construction, VLAN configuration, firewall rules',
    deliverables: [
      'Cat6 cables run to all locations',
      'Simulation VLAN configured',
      'Firewall rules set up',
      'Network drops tested'
    ],
    dependencies: ['phase-2']
  },
  {
    id: 'phase-4',
    phase: 'Installation',
    name: 'Equipment Installation',
    month: 'Month 7-8',
    description: 'Mount cameras, install server, connect all devices, initial configuration',
    deliverables: [
      'Cameras mounted and connected',
      'Server installed and configured',
      'Audio system operational',
      'Basic recording functional'
    ],
    dependencies: ['phase-3']
  },
  {
    id: 'phase-5',
    phase: 'Integration',
    name: 'Security & Integration',
    month: 'Month 8',
    description: 'Configure user access, AD integration, encryption, retention rules',
    deliverables: [
      'AD/SSO integration complete',
      'Encryption verified',
      'Retention rules configured',
      'Security audit passed'
    ],
    dependencies: ['phase-4']
  },
  {
    id: 'phase-6',
    phase: 'Testing',
    name: 'Commissioning & Testing',
    month: 'Month 8-9',
    description: 'End-to-end testing, dry-run simulations, failure scenario testing',
    deliverables: [
      'All cameras and mics tested',
      'Recording quality verified',
      'Debrief playback validated',
      'Security penetration test passed'
    ],
    dependencies: ['phase-5']
  },
  {
    id: 'phase-7',
    phase: 'Go-Live',
    name: 'Training & Go-Live',
    month: 'Month 9-10',
    description: 'Staff training, pilot simulations, system handover',
    deliverables: [
      'Staff trained on system',
      'Pilot sessions completed',
      'Documentation delivered',
      'Go-live approved'
    ],
    dependencies: ['phase-6']
  }
]

// =============================================================================
// SECURITY CONTROLS
// =============================================================================

export interface SecurityControl {
  id: string
  category: 'access' | 'encryption' | 'network' | 'audit' | 'vendor' | 'physical'
  control: string
  description: string
  status: 'planned' | 'in_progress' | 'implemented'
  priority: 'critical' | 'high' | 'medium'
}

export const securityControls: SecurityControl[] = [
  // Access Controls
  {
    id: 'sec-rbac',
    category: 'access',
    control: 'Role-Based Access Control (RBAC)',
    description: 'Users assigned permissions based on role: Admin, Instructor, Student/Observer with least privilege',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-ad',
    category: 'access',
    control: 'Active Directory Integration',
    description: 'Single sign-on with hospital credentials, centralized account management',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-mfa',
    category: 'access',
    control: 'Multi-Factor Authentication',
    description: 'MFA enforced for external access and admin-level users',
    status: 'planned',
    priority: 'high'
  },
  {
    id: 'sec-unique-accounts',
    category: 'access',
    control: 'Unique User Accounts',
    description: 'No shared generic logins - each user has individual credentials',
    status: 'planned',
    priority: 'critical'
  },
  // Encryption
  {
    id: 'sec-tls',
    category: 'encryption',
    control: 'TLS Encryption in Transit',
    description: 'All video streams and web interface over HTTPS with TLS 1.2+',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-aes',
    category: 'encryption',
    control: 'AES-256 Encryption at Rest',
    description: 'Full-disk encryption on server, encrypted backups',
    status: 'planned',
    priority: 'critical'
  },
  // Network
  {
    id: 'sec-vlan',
    category: 'network',
    control: 'Network Segmentation',
    description: 'Dedicated simulation VLAN isolated from hospital network',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-firewall',
    category: 'network',
    control: 'Firewall Rules',
    description: 'Strict firewall rules - only A/V server can communicate with hospital network on specific ports',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-qos',
    category: 'network',
    control: 'Quality of Service (QoS)',
    description: 'Video streams get high priority to prevent packet loss or jitter',
    status: 'planned',
    priority: 'medium'
  },
  // Audit
  {
    id: 'sec-logging',
    category: 'audit',
    control: 'Comprehensive Audit Logging',
    description: 'Log all logins, video playback, file deletion, permission changes',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-siem',
    category: 'audit',
    control: 'SIEM Integration',
    description: 'Forward logs to hospital Security Information and Event Management system',
    status: 'planned',
    priority: 'high'
  },
  // Vendor
  {
    id: 'sec-baa',
    category: 'vendor',
    control: 'Business Associate Agreement',
    description: 'BAA signed with all vendors handling protected data',
    status: 'planned',
    priority: 'critical'
  },
  {
    id: 'sec-vendor-assess',
    category: 'vendor',
    control: 'Vendor Security Assessment',
    description: 'SOC 2 reports reviewed, security questionnaire completed',
    status: 'planned',
    priority: 'high'
  },
  // Physical
  {
    id: 'sec-physical',
    category: 'physical',
    control: 'Physical Security',
    description: 'Server in locked room, badge access to sim center, asset tags on equipment',
    status: 'planned',
    priority: 'high'
  }
]

// =============================================================================
// RETENTION POLICY
// =============================================================================

export interface RetentionRule {
  id: string
  recordingType: string
  description: string
  retentionDays: number
  autoDelete: boolean
  rationale: string
}

export const retentionPolicy: RetentionRule[] = [
  {
    id: 'ret-formative',
    recordingType: 'Formative Simulations',
    description: 'Non-graded practice sessions for self-review',
    retentionDays: 30,
    autoDelete: true,
    rationale: 'Brief retention for learner review, then purge to limit storage and privacy risk'
  },
  {
    id: 'ret-summative',
    recordingType: 'Summative Assessments',
    description: 'Graded evaluations and OSCEs',
    retentionDays: 365,
    autoDelete: false,
    rationale: 'Aligned with academic records policy for grade appeals'
  },
  {
    id: 'ret-research',
    recordingType: 'Research Studies',
    description: 'IRB-approved research recordings',
    retentionDays: 2555, // ~7 years
    autoDelete: false,
    rationale: 'Per IRB protocol requirements for audit purposes'
  },
  {
    id: 'ret-highlights',
    recordingType: 'Archived Highlights',
    description: 'Exceptional cases for faculty development',
    retentionDays: -1, // Indefinite with review
    autoDelete: false,
    rationale: 'De-identified if possible, encrypted with extra access controls'
  }
]

// =============================================================================
// VENDOR COMPARISON
// =============================================================================

export interface AVVendor {
  id: string
  name: string
  product: string
  priceRange: { low: number; high: number }
  strengths: string[]
  considerations: string[]
  recommended: boolean
}

export const avVendors: AVVendor[] = [
  {
    id: 'ivs-valt',
    name: 'Intelligent Video Solutions',
    product: 'VALT',
    priceRange: { low: 50000, high: 100000 },
    strengths: [
      'Simple, stable, scalable, secure',
      'Browser-based access',
      'Strong encryption',
      'Lower cost than enterprise alternatives',
      'Good for training environments'
    ],
    considerations: [
      'Less feature-rich than enterprise solutions',
      'May require separate scheduling software'
    ],
    recommended: true
  },
  {
    id: 'laerdal-simcapture',
    name: 'Laerdal Medical',
    product: 'SimCapture Enterprise',
    priceRange: { low: 150000, high: 250000 },
    strengths: [
      'End-to-end simulation management',
      'OSCE assessment tools',
      'LTI/LMS integration',
      'Robust analytics',
      'Integrates with Laerdal manikins'
    ],
    considerations: [
      'Higher price point',
      'Best value with Laerdal equipment'
    ],
    recommended: false
  },
  {
    id: 'cae-learningspace',
    name: 'CAE Healthcare',
    product: 'LearningSpace',
    priceRange: { low: 100000, high: 200000 },
    strengths: [
      'Recording and debrief',
      'Center management features',
      'OSCE module',
      'SSO/LDAP support',
      'Best with CAE equipment'
    ],
    considerations: [
      'Tightly coupled to CAE ecosystem',
      'Mid-to-high pricing'
    ],
    recommended: false
  },
  {
    id: 'ems-simulationiq',
    name: 'Education Management Solutions',
    product: 'SIMULATIONiQ Enterprise',
    priceRange: { low: 100000, high: 200000 },
    strengths: [
      'Strong SP/OSCE management',
      'Candidate tracking',
      'Flexible configurations',
      'AD integration'
    ],
    considerations: [
      'More suited for standardized patient programs',
      'Complex setup'
    ],
    recommended: false
  }
]

// =============================================================================
// SUMMARY FUNCTIONS
// =============================================================================

export function getAVBudgetByCategory() {
  const categories = ['software', 'cameras', 'audio', 'network', 'displays', 'storage', 'services', 'contingency'] as const
  return categories.map(cat => ({
    category: cat,
    total: avEquipmentBudget.filter(item => item.category === cat).reduce((sum, item) => sum + item.totalCost, 0)
  }))
}

export function getSecurityControlsByCategory() {
  const categories = ['access', 'encryption', 'network', 'audit', 'vendor', 'physical'] as const
  return categories.map(cat => ({
    category: cat,
    controls: securityControls.filter(c => c.category === cat),
    count: securityControls.filter(c => c.category === cat).length
  }))
}

export const avSummary = {
  totalBudget: avBudgetSummary.totalInitial,
  annualMaintenance: avBudgetSummary.annualMaintenance,
  cameraCount: 8,
  roomsCovered: 3,
  implementationMonths: 10,
  securityControlsCount: securityControls.length,
  retentionRulesCount: retentionPolicy.length,
  recommendedVendor: 'IVS VALT',
  storageRecommendation: 'Hybrid (on-premises with cloud archival)'
}
