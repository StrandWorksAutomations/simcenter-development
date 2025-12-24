// =============================================================================
// MAINTENANCE & RELIABILITY ENGINEERING
// =============================================================================
// Source: Prompt 12 - "Maintenance + reliability engineering (manikins, AV, rooms, and IT)"
// Preventive maintenance program for simulators, task trainers, AV systems, and facility components
// =============================================================================

export interface MaintenanceTask {
  id: string
  name: string
  description: string
  frequency: 'after-use' | 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'as-needed'
  category: 'manikins' | 'task-trainers' | 'av-systems' | 'it-systems' | 'facility' | 'consumables'
  priority: 'critical' | 'high' | 'medium' | 'low'
  estimatedTime: string
  responsible: 'sim-tech' | 'biomed' | 'vendor' | 'it' | 'facilities'
  checklist: string[]
}

export interface SparePart {
  id: string
  name: string
  category: 'consumable' | 'component' | 'battery' | 'cable' | 'accessory'
  applicableTo: string[]
  stockLevel: 'always' | 'backup' | 'order-on-demand'
  reorderPoint: number
  typicalLeadTime: string
  estimatedCost: string
  notes?: string
}

export interface ServiceContractCriteria {
  factor: string
  forContract: string
  againstContract: string
  decisionRule: string
}

export interface EquipmentLifecycle {
  equipmentType: string
  expectedLifespan: string
  warrantyTypical: string
  eolIndicators: string[]
  replacementTriggers: string[]
  annualMaintenanceCost: string
}

export interface TicketingWorkflowStep {
  step: number
  name: string
  description: string
  responsible: string
  timeframe: string
  escalationTrigger?: string
}

// =============================================================================
// PM SCHEDULE BY FREQUENCY
// =============================================================================

export const MAINTENANCE_TASKS: MaintenanceTask[] = [
  // After Each Use (Daily if used)
  {
    id: 'clean-manikin',
    name: 'Clean Manikin Surfaces',
    description: 'Wipe down manikin skins and task trainers to remove adhesives, moulage makeup, or marker ink',
    frequency: 'after-use',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '15 min',
    responsible: 'sim-tech',
    checklist: [
      'Wipe skin with approved cleaning solution',
      'Remove any tape residue',
      'Clean moulage makeup',
      'Check for marker stains and remove'
    ]
  },
  {
    id: 'drain-fluids',
    name: 'Drain & Flush Fluid Systems',
    description: 'Drain fluids used in simulations and flush internal tubing with distilled water',
    frequency: 'after-use',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '20 min',
    responsible: 'sim-tech',
    checklist: [
      'Drain blood simulant from reservoirs',
      'Flush tubing with distilled water',
      'Refill fluid reservoirs for next use',
      'Check for leaks during flush'
    ]
  },
  {
    id: 'check-damage',
    name: 'Inspect for Damage',
    description: 'Check manikins and trainers for obvious damage or leaks after each session',
    frequency: 'after-use',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '10 min',
    responsible: 'sim-tech',
    checklist: [
      'Inspect skin for tears or punctures',
      'Check joints for looseness',
      'Look for fluid leaks',
      'Replace damaged small parts immediately'
    ]
  },
  {
    id: 'proper-storage',
    name: 'Proper Storage Positioning',
    description: 'Store equipment properly to prevent damage (neutral positions, powered off)',
    frequency: 'after-use',
    category: 'manikins',
    priority: 'medium',
    estimatedTime: '10 min',
    responsible: 'sim-tech',
    checklist: [
      'Position manikin in neutral pose',
      'Slightly flex joints to prevent skin stretch',
      'Power off all electronic equipment',
      'Cover with dust protection if extended storage'
    ]
  },
  {
    id: 'clean-linens',
    name: 'Launder Linens',
    description: 'Remove and launder soiled linens and manikin clothing',
    frequency: 'after-use',
    category: 'consumables',
    priority: 'medium',
    estimatedTime: '5 min',
    responsible: 'sim-tech',
    checklist: [
      'Remove soiled linens from bed',
      'Collect manikin clothing if used',
      'Place in laundry bin',
      'Replace with clean linens'
    ]
  },

  // Weekly Tasks
  {
    id: 'weekly-inspection',
    name: 'Weekly Equipment Inspection',
    description: 'Thorough inspection and functionality test of all equipment',
    frequency: 'weekly',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '60 min',
    responsible: 'sim-tech',
    checklist: [
      'Wipe down all manikin skins/covers',
      'Run calibration checks on sensors',
      'Power on and run self-test on each manikin',
      'Boot up all control PCs and tablets',
      'Check AV system functionality',
      'Test all cameras and microphones'
    ]
  },
  {
    id: 'battery-check',
    name: 'Battery Status Check',
    description: 'Check and recharge batteries in wireless manikins and portable devices',
    frequency: 'weekly',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '30 min',
    responsible: 'sim-tech',
    checklist: [
      'Check battery levels on all wireless devices',
      'Recharge low batteries',
      'Verify no battery warning indicators',
      'Rotate spare batteries into use'
    ]
  },
  {
    id: 'fluid-circulation',
    name: 'Fluid System Maintenance',
    description: 'Circulate and flush fluid systems, add antifungal if needed',
    frequency: 'weekly',
    category: 'manikins',
    priority: 'medium',
    estimatedTime: '30 min',
    responsible: 'sim-tech',
    checklist: [
      'Circulate fluids to prevent stagnation',
      'Add antifungal/biocide solution if recommended',
      'Top off fluid reservoirs',
      'Check for mold or discoloration'
    ]
  },
  {
    id: 'av-morning-test',
    name: 'AV System Quick Test',
    description: 'Test cameras, microphones, and speakers in high-use rooms',
    frequency: 'weekly',
    category: 'av-systems',
    priority: 'high',
    estimatedTime: '20 min',
    responsible: 'sim-tech',
    checklist: [
      'Test each room microphone (speak and playback)',
      'Verify all camera feeds are visible',
      'Check speaker audio clarity',
      'Confirm control room connections'
    ]
  },

  // Monthly Tasks
  {
    id: 'consumable-replacement',
    name: 'Consumable Parts Inspection',
    description: 'Inspect and replace worn consumable parts on manikins and trainers',
    frequency: 'monthly',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '90 min',
    responsible: 'sim-tech',
    checklist: [
      'Check IV arm skin pads',
      'Inspect intubation airway inserts',
      'Check CPR lung bags',
      'Inspect chest tube insert pads',
      'Replace lubricant gels',
      'Check O-ring seals'
    ]
  },
  {
    id: 'full-function-test',
    name: 'Full Function Test',
    description: 'Comprehensive test of all simulator features',
    frequency: 'monthly',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '60 min',
    responsible: 'sim-tech',
    checklist: [
      'Test intubation airway (not obstructed)',
      'Compress CPR manikin chest (test feedback)',
      'Verify vital sign displays',
      'Test all physiological responses',
      'Check heart/lung sounds'
    ]
  },
  {
    id: 'av-monthly',
    name: 'AV Equipment Cleaning',
    description: 'Clean AV gear, apply software updates, tighten connections',
    frequency: 'monthly',
    category: 'av-systems',
    priority: 'medium',
    estimatedTime: '60 min',
    responsible: 'sim-tech',
    checklist: [
      'Dust projector filters',
      'Clean camera lenses',
      'Tighten cable connections',
      'Apply pending software updates',
      'Check storage capacity on servers'
    ]
  },
  {
    id: 'pc-maintenance',
    name: 'PC/Server Maintenance',
    description: 'Run OS updates, antivirus scans, and hardware diagnostics',
    frequency: 'monthly',
    category: 'it-systems',
    priority: 'high',
    estimatedTime: '60 min',
    responsible: 'it',
    checklist: [
      'Run Windows/OS updates',
      'Run antivirus scan',
      'Check disk space',
      'Run hardware diagnostics',
      'Clear temp files'
    ]
  },

  // Quarterly Tasks
  {
    id: 'log-review',
    name: 'System Logs Review',
    description: 'Review simulator usage logs and error logs for patterns',
    frequency: 'quarterly',
    category: 'manikins',
    priority: 'medium',
    estimatedTime: '120 min',
    responsible: 'sim-tech',
    checklist: [
      'Export simulator error logs',
      'Review for repeated warnings',
      'Check AV system alerts',
      'Document any trends',
      'Plan corrective actions'
    ]
  },
  {
    id: 'redundancy-test',
    name: 'Backup/Redundancy Test',
    description: 'Test backup systems and failover capabilities',
    frequency: 'quarterly',
    category: 'it-systems',
    priority: 'high',
    estimatedTime: '60 min',
    responsible: 'it',
    checklist: [
      'Test UPS backup power',
      'Verify backup PC can run scenarios',
      'Test network redundancy',
      'Verify recording backups are working'
    ]
  },
  {
    id: 'environment-check',
    name: 'Environmental Conditions Check',
    description: 'Verify temperature and humidity are within manufacturer specs',
    frequency: 'quarterly',
    category: 'facility',
    priority: 'medium',
    estimatedTime: '30 min',
    responsible: 'facilities',
    checklist: [
      'Check room temperatures (65-75°F ideal)',
      'Measure humidity levels',
      'Adjust HVAC if needed',
      'Check storage area conditions'
    ]
  },
  {
    id: 'inventory-audit',
    name: 'Equipment Inventory Audit',
    description: 'Update asset list, verify equipment location, note items in repair',
    frequency: 'quarterly',
    category: 'manikins',
    priority: 'medium',
    estimatedTime: '90 min',
    responsible: 'sim-tech',
    checklist: [
      'Count all simulators and trainers',
      'Update asset register',
      'Note items sent for repair',
      'Flag equipment approaching EOL',
      'Update spare parts inventory'
    ]
  },

  // Semiannual Tasks
  {
    id: 'deep-pm',
    name: 'Deep Preventive Maintenance',
    description: 'Comprehensive internal inspection of high-fidelity simulators',
    frequency: 'semiannual',
    category: 'manikins',
    priority: 'critical',
    estimatedTime: '4 hours',
    responsible: 'sim-tech',
    checklist: [
      'Open manikin housing',
      'Inspect internal mechanisms',
      'Lubricate moving parts',
      'Tighten internal connections',
      'Replace parts with defined lifespans',
      'Clean/condition simulator skins',
      'Update firmware if available',
      'Document all work performed'
    ]
  },

  // Annual Tasks
  {
    id: 'vendor-service',
    name: 'Annual Vendor Service',
    description: 'Manufacturer preventive maintenance service on critical simulators',
    frequency: 'annual',
    category: 'manikins',
    priority: 'critical',
    estimatedTime: '1 day',
    responsible: 'vendor',
    checklist: [
      'Schedule during low-utilization period',
      'Extensive testing by certified tech',
      'Internal inspection and cleaning',
      'Part replacements to factory standards',
      'Calibration to original specifications',
      'Software/firmware updates',
      'Detailed service report'
    ]
  },
  {
    id: 'calibration-devices',
    name: 'Medical Device Calibration',
    description: 'Annual calibration of defibrillators, monitors, and other devices',
    frequency: 'annual',
    category: 'manikins',
    priority: 'high',
    estimatedTime: '4 hours',
    responsible: 'biomed',
    checklist: [
      'Defibrillator energy output verification',
      'Patient monitor calibration',
      'Electrical safety leakage tests',
      'Coordinate with hospital Biomed'
    ]
  }
]

// =============================================================================
// SPARE PARTS INVENTORY
// =============================================================================

export const SPARE_PARTS: SparePart[] = [
  // Consumables
  { id: 'iv-arm-skin', name: 'IV Arm Skin Pads', category: 'consumable', applicableTo: ['IV Arms', 'Injection Trainers'], stockLevel: 'always', reorderPoint: 5, typicalLeadTime: '1-2 weeks', estimatedCost: '$20-50 each' },
  { id: 'airway-insert', name: 'Airway Rubber Inserts', category: 'consumable', applicableTo: ['High-Fidelity Manikins', 'Airway Trainers'], stockLevel: 'always', reorderPoint: 3, typicalLeadTime: '1-2 weeks', estimatedCost: '$30-100 each' },
  { id: 'cpr-lung-bags', name: 'CPR Lung Bags', category: 'consumable', applicableTo: ['CPR Manikins'], stockLevel: 'always', reorderPoint: 10, typicalLeadTime: '1 week', estimatedCost: '$5-15 each' },
  { id: 'chest-tube-pads', name: 'Chest Tube Insert Pads', category: 'consumable', applicableTo: ['Trauma Manikins'], stockLevel: 'backup', reorderPoint: 2, typicalLeadTime: '2-3 weeks', estimatedCost: '$50-100 each' },
  { id: 'injection-pads', name: 'Injection Site Pads', category: 'consumable', applicableTo: ['Injection Trainers'], stockLevel: 'always', reorderPoint: 5, typicalLeadTime: '1-2 weeks', estimatedCost: '$15-30 each' },
  { id: 'lubricants', name: 'Lubricant Gels & Solutions', category: 'consumable', applicableTo: ['All Manikins'], stockLevel: 'always', reorderPoint: 2, typicalLeadTime: '1 week', estimatedCost: '$10-30 per bottle' },

  // Components
  { id: 'tubing-seals', name: 'Tubing & O-Ring Seals', category: 'component', applicableTo: ['High-Fidelity Manikins'], stockLevel: 'always', reorderPoint: 5, typicalLeadTime: '2-3 weeks', estimatedCost: '$5-20 each' },
  { id: 'gaskets', name: 'Gaskets & Seals', category: 'component', applicableTo: ['Manikins with Fluid Systems'], stockLevel: 'backup', reorderPoint: 3, typicalLeadTime: '2-4 weeks', estimatedCost: '$10-50 each' },
  { id: 'compressor-filters', name: 'Compressor Filters', category: 'component', applicableTo: ['Air Compressor', 'Pneumatic Manikins'], stockLevel: 'backup', reorderPoint: 2, typicalLeadTime: '2-3 weeks', estimatedCost: '$20-40 each' },

  // Batteries
  { id: 'manikin-battery', name: 'Manikin Battery Packs', category: 'battery', applicableTo: ['Wireless Manikins', 'SimMan', 'HAL'], stockLevel: 'backup', reorderPoint: 1, typicalLeadTime: '2-4 weeks', estimatedCost: '$200-500 each', notes: 'Keep charged at 50% for storage' },
  { id: 'tablet-battery', name: 'Tablet/SimPad Batteries', category: 'battery', applicableTo: ['SimPad', 'Control Tablets'], stockLevel: 'backup', reorderPoint: 1, typicalLeadTime: '1-2 weeks', estimatedCost: '$50-150 each' },
  { id: 'wireless-mic-battery', name: 'Wireless Microphone Batteries', category: 'battery', applicableTo: ['Wireless Mics', 'Audio Equipment'], stockLevel: 'always', reorderPoint: 10, typicalLeadTime: '1 week', estimatedCost: '$5-20 each' },

  // Cables
  { id: 'power-cords', name: 'Power Cords', category: 'cable', applicableTo: ['All Electronic Equipment'], stockLevel: 'backup', reorderPoint: 2, typicalLeadTime: '1 week', estimatedCost: '$10-30 each' },
  { id: 'network-cables', name: 'Network Cables (Cat6)', category: 'cable', applicableTo: ['IT Equipment', 'Cameras'], stockLevel: 'always', reorderPoint: 5, typicalLeadTime: '1 week', estimatedCost: '$5-20 each' },
  { id: 'av-cables', name: 'AV Cables (HDMI, USB)', category: 'cable', applicableTo: ['Monitors', 'Cameras', 'Computers'], stockLevel: 'backup', reorderPoint: 2, typicalLeadTime: '1 week', estimatedCost: '$10-50 each' },
  { id: 'sensor-leads', name: 'Sensor Leads', category: 'cable', applicableTo: ['Patient Monitors', 'ECG Simulators'], stockLevel: 'backup', reorderPoint: 2, typicalLeadTime: '2-3 weeks', estimatedCost: '$20-80 each' },

  // AV Accessories
  { id: 'camera-mounts', name: 'Camera Mounting Hardware', category: 'accessory', applicableTo: ['PTZ Cameras', 'Fixed Cameras'], stockLevel: 'order-on-demand', reorderPoint: 0, typicalLeadTime: '1-2 weeks', estimatedCost: '$30-100 each' },
  { id: 'mic-packs', name: 'Replacement Microphone Packs', category: 'accessory', applicableTo: ['Boundary Mics', 'Ceiling Mics'], stockLevel: 'backup', reorderPoint: 1, typicalLeadTime: '2-3 weeks', estimatedCost: '$100-300 each' },
  { id: 'hard-drives', name: 'Replacement Hard Drives', category: 'accessory', applicableTo: ['Recording Servers', 'NVR'], stockLevel: 'backup', reorderPoint: 1, typicalLeadTime: '1 week', estimatedCost: '$100-300 each' }
]

// =============================================================================
// SERVICE CONTRACT DECISION CRITERIA
// =============================================================================

export const SERVICE_CONTRACT_CRITERIA: ServiceContractCriteria[] = [
  {
    factor: 'Equipment Complexity & Cost',
    forContract: 'High-complexity, expensive simulators ($50K+) with proprietary parts',
    againstContract: 'Simple, low-cost equipment (<$5K) that can be replaced if failed',
    decisionRule: 'Contract for high-fidelity manikins, skip for basic task trainers'
  },
  {
    factor: 'Utilization & Criticality',
    forContract: 'Heavily utilized equipment critical to daily operations',
    againstContract: 'Backup or rarely-used equipment',
    decisionRule: 'Contract for single-point-of-failure equipment used daily'
  },
  {
    factor: 'In-House Technical Capability',
    forContract: 'Staff lacks expertise for repairs; new or unfamiliar systems',
    againstContract: 'Skilled sim techs can handle most issues; established processes',
    decisionRule: 'Contract early when building expertise; self-insure as team matures'
  },
  {
    factor: 'Budget & Risk Tolerance',
    forContract: 'Prefer predictable costs; low tolerance for surprise repair bills',
    againstContract: 'Have contingency funds; willing to self-insure for savings',
    decisionRule: 'Contract converts unpredictable repairs into fixed annual cost'
  },
  {
    factor: 'Vendor Service Quality',
    forContract: 'Contract includes annual PM, priority support, fast parts shipping',
    againstContract: 'Contract has many exclusions, slow response, limited coverage',
    decisionRule: 'Only buy contracts that provide real value (PM visits, unlimited support)'
  },
  {
    factor: 'Equipment Age',
    forContract: 'New equipment in active warranty period or just after',
    againstContract: 'Aging equipment near end-of-life or planned replacement',
    decisionRule: 'Avoid long-term contracts on equipment being replaced soon'
  }
]

// =============================================================================
// EQUIPMENT LIFECYCLE
// =============================================================================

export const EQUIPMENT_LIFECYCLE: EquipmentLifecycle[] = [
  {
    equipmentType: 'High-Fidelity Patient Simulator',
    expectedLifespan: '5-7 years active use',
    warrantyTypical: '1-2 years standard, 3-5 years extended',
    eolIndicators: [
      'Vendor discontinues parts/support',
      'MTBF drops below acceptable threshold',
      'Annual repair costs exceed 20% of replacement',
      'Cannot run current software/scenarios'
    ],
    replacementTriggers: [
      'Multiple failures per semester',
      'Parts no longer available',
      'Significant feature gaps vs newer models',
      'Safety concerns that cannot be resolved'
    ],
    annualMaintenanceCost: '10-15% of equipment cost'
  },
  {
    equipmentType: 'Task Trainers',
    expectedLifespan: '5-10 years',
    warrantyTypical: '1 year standard',
    eolIndicators: [
      'Replacement skins/parts unavailable',
      'Training feedback no longer accurate',
      'Physical wear affects realism'
    ],
    replacementTriggers: [
      'Cannot achieve educational objectives',
      'Repair cost exceeds 50% of new unit',
      'Better training alternatives available'
    ],
    annualMaintenanceCost: '5-10% of equipment cost'
  },
  {
    equipmentType: 'AV Recording System',
    expectedLifespan: '5-7 years',
    warrantyTypical: '1 year hardware, ongoing software support',
    eolIndicators: [
      'Software no longer updated',
      'Hardware cannot support current resolution standards',
      'Integration issues with new devices'
    ],
    replacementTriggers: [
      'Frequent system crashes',
      'Recording quality degradation',
      'Security vulnerabilities unpatched'
    ],
    annualMaintenanceCost: '10-15% of system cost'
  },
  {
    equipmentType: 'Cameras & Microphones',
    expectedLifespan: '5-10 years',
    warrantyTypical: '1-3 years',
    eolIndicators: [
      'Image/audio quality degradation',
      'Compatibility issues with updated systems',
      'Physical damage affecting performance'
    ],
    replacementTriggers: [
      'Artifacts in recordings',
      'Mechanical failure (pan/tilt motors)',
      'Network connectivity issues'
    ],
    annualMaintenanceCost: '5% of equipment cost'
  },
  {
    equipmentType: 'Control Room Computers',
    expectedLifespan: '4-5 years',
    warrantyTypical: '1-3 years',
    eolIndicators: [
      'OS no longer supported',
      'Cannot run current simulation software',
      'Performance degradation'
    ],
    replacementTriggers: [
      'Frequent crashes',
      'Security compliance issues',
      'Incompatibility with new peripherals'
    ],
    annualMaintenanceCost: '10% of equipment cost'
  }
]

// =============================================================================
// FAILURE TICKETING WORKFLOW
// =============================================================================

export const TICKETING_WORKFLOW: TicketingWorkflowStep[] = [
  {
    step: 1,
    name: 'Initial Assessment',
    description: 'First person notices problem - assess if critical (simulation cannot continue) or minor (workaround possible)',
    responsible: 'Faculty/Sim Tech',
    timeframe: 'Immediate',
    escalationTrigger: 'Critical issue during active session'
  },
  {
    step: 2,
    name: 'Immediate Fix Attempt',
    description: 'Basic troubleshooting on the spot: check power, replace batteries, restart device, swap cables',
    responsible: 'Sim Tech',
    timeframe: '5-15 minutes',
    escalationTrigger: 'Issue not resolved with basic troubleshooting'
  },
  {
    step: 3,
    name: 'Log Ticket',
    description: 'Create ticket in tracking system with device ID, description, error codes, impact on simulation',
    responsible: 'Sim Tech',
    timeframe: 'Within 1 hour',
    escalationTrigger: 'N/A - always log'
  },
  {
    step: 4,
    name: 'Troubleshoot & Diagnose',
    description: 'Systematic troubleshooting per device manual, check maintenance records for prior issues',
    responsible: 'Sim Tech',
    timeframe: '1-4 hours',
    escalationTrigger: 'Cannot identify root cause'
  },
  {
    step: 5,
    name: 'Resolution or Escalation',
    description: 'Fix if able (replace part, adjust setting); if not, escalate to vendor support or biomed',
    responsible: 'Sim Tech',
    timeframe: '1-24 hours',
    escalationTrigger: 'Need specialized tools, parts, or expertise'
  },
  {
    step: 6,
    name: 'Vendor Repair Process',
    description: 'Contact vendor support for guidance, arrange technician visit or ship equipment for repair',
    responsible: 'Sim Tech + Vendor',
    timeframe: '1-14 days',
    escalationTrigger: 'Repair exceeds budget or timeline'
  },
  {
    step: 7,
    name: 'Recovery & Testing',
    description: 'After repair, run full scenario test to verify issue resolved and no new issues introduced',
    responsible: 'Sim Tech',
    timeframe: '1-2 hours',
    escalationTrigger: 'Issue persists after repair'
  },
  {
    step: 8,
    name: 'Close Ticket & Document',
    description: 'Update ticket with resolution details, downtime duration, parts used. Communicate outcome to stakeholders.',
    responsible: 'Sim Tech',
    timeframe: 'Same day as resolution'
  }
]

// =============================================================================
// RELIABILITY METRICS
// =============================================================================

export interface ReliabilityMetric {
  metric: string
  description: string
  formula: string
  target: string
  trackingMethod: string
}

export const RELIABILITY_METRICS: ReliabilityMetric[] = [
  {
    metric: 'MTBF (Mean Time Between Failures)',
    description: 'Average operational time between unplanned failures',
    formula: 'Total Operational Hours / Number of Failures',
    target: '>500 hours for high-fidelity manikins',
    trackingMethod: 'Log operational hours per session; count unplanned failures'
  },
  {
    metric: 'MTTR (Mean Time to Repair)',
    description: 'Average time to restore equipment after failure',
    formula: 'Total Downtime / Number of Repairs',
    target: '<24-48 hours for minor issues; <2 weeks for major repairs',
    trackingMethod: 'Track time from ticket open to close'
  },
  {
    metric: 'Availability',
    description: 'Percentage of time equipment is available for use',
    formula: 'MTBF / (MTBF + MTTR) × 100%',
    target: '>95% for critical equipment',
    trackingMethod: 'Calculate from MTBF and MTTR data'
  },
  {
    metric: 'Unplanned Downtime',
    description: 'Total hours equipment unavailable due to failures',
    formula: 'Sum of all downtime periods',
    target: 'Minimize; track trend over time',
    trackingMethod: 'Log start and end of each outage'
  },
  {
    metric: 'First-Time Fix Rate',
    description: 'Percentage of issues resolved without escalation or repeat visit',
    formula: 'Issues Resolved in Step 5 or Earlier / Total Issues × 100%',
    target: '>80%',
    trackingMethod: 'Review ticket resolution step'
  }
]

// =============================================================================
// BATTERY MAINTENANCE GUIDELINES
// =============================================================================

export interface BatteryGuideline {
  guideline: string
  frequency: string
  rationale: string
}

export const BATTERY_GUIDELINES: BatteryGuideline[] = [
  { guideline: 'Cycle batteries (full discharge and recharge)', frequency: 'Every 3 months', rationale: 'Recalibrates battery gauge, prevents capacity loss' },
  { guideline: 'Unplug devices when fully charged', frequency: 'After each charge', rationale: 'Prevents heat buildup and trickle stress on battery' },
  { guideline: 'Store at 40-60% charge if not in use', frequency: 'Before extended storage', rationale: 'Optimal storage charge for Li-ion battery health' },
  { guideline: 'Store in cool, dry place (15-20°C)', frequency: 'Always', rationale: 'Heat is the major enemy of battery life' },
  { guideline: 'Maintenance charge for idle devices', frequency: 'Every 2-3 months', rationale: 'Prevents deep discharge which damages batteries' },
  { guideline: 'Replace batteries showing reduced capacity', frequency: 'As needed (typically 2-4 years)', rationale: 'Rechargeable batteries have finite life' },
  { guideline: 'Use OEM batteries only', frequency: 'Always', rationale: 'Non-OEM batteries may cause compatibility and safety issues' }
]

// =============================================================================
// FIRMWARE/SOFTWARE VERSION CONTROL
// =============================================================================

export interface FirmwareGuideline {
  practice: string
  description: string
}

export const FIRMWARE_GUIDELINES: FirmwareGuideline[] = [
  { practice: 'Monitor vendor releases', description: 'Check quarterly for firmware/software updates via vendor websites or email' },
  { practice: 'Schedule update windows', description: 'Apply updates during low-usage periods (semester breaks, weekends)' },
  { practice: 'Stagger updates', description: 'Update one unit first, test thoroughly, then update others' },
  { practice: 'Check compatibility', description: 'Verify new firmware is compatible with other components before updating' },
  { practice: 'Test after updates', description: 'Run standard scenarios to ensure all features work post-update' },
  { practice: 'Maintain version records', description: 'Document current versions of all firmware and software' },
  { practice: 'Keep fallback option', description: 'Know how to rollback if update causes problems' },
  { practice: 'Coordinate with IT', description: 'Align OS and security updates with hospital IT policies' }
]

// =============================================================================
// PM CALENDAR TEMPLATE
// =============================================================================

export interface PMCalendarMonth {
  month: number
  monthName: string
  tasks: {
    taskId: string
    name: string
    frequency: string
    responsible: string
  }[]
}

export function generatePMCalendar(): PMCalendarMonth[] {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December']

  return months.map((monthName, index) => {
    const month = index + 1
    const tasks: PMCalendarMonth['tasks'] = []

    // Weekly tasks (all months)
    tasks.push({ taskId: 'weekly-inspection', name: 'Weekly Equipment Inspection', frequency: 'weekly', responsible: 'sim-tech' })
    tasks.push({ taskId: 'battery-check', name: 'Battery Status Check', frequency: 'weekly', responsible: 'sim-tech' })

    // Monthly tasks (all months)
    tasks.push({ taskId: 'consumable-replacement', name: 'Consumable Parts Inspection', frequency: 'monthly', responsible: 'sim-tech' })
    tasks.push({ taskId: 'av-monthly', name: 'AV Equipment Cleaning', frequency: 'monthly', responsible: 'sim-tech' })
    tasks.push({ taskId: 'pc-maintenance', name: 'PC/Server Maintenance', frequency: 'monthly', responsible: 'it' })

    // Quarterly tasks (Jan, Apr, Jul, Oct)
    if ([1, 4, 7, 10].includes(month)) {
      tasks.push({ taskId: 'log-review', name: 'System Logs Review', frequency: 'quarterly', responsible: 'sim-tech' })
      tasks.push({ taskId: 'redundancy-test', name: 'Backup/Redundancy Test', frequency: 'quarterly', responsible: 'it' })
      tasks.push({ taskId: 'inventory-audit', name: 'Equipment Inventory Audit', frequency: 'quarterly', responsible: 'sim-tech' })
    }

    // Semiannual tasks (Jun, Dec - typically semester breaks)
    if ([6, 12].includes(month)) {
      tasks.push({ taskId: 'deep-pm', name: 'Deep Preventive Maintenance', frequency: 'semiannual', responsible: 'sim-tech' })
    }

    // Annual tasks (typically summer - July)
    if (month === 7) {
      tasks.push({ taskId: 'vendor-service', name: 'Annual Vendor Service', frequency: 'annual', responsible: 'vendor' })
      tasks.push({ taskId: 'calibration-devices', name: 'Medical Device Calibration', frequency: 'annual', responsible: 'biomed' })
    }

    return { month, monthName, tasks }
  })
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getTasksByFrequency(frequency: MaintenanceTask['frequency']): MaintenanceTask[] {
  return MAINTENANCE_TASKS.filter(t => t.frequency === frequency)
}

export function getTasksByCategory(category: MaintenanceTask['category']): MaintenanceTask[] {
  return MAINTENANCE_TASKS.filter(t => t.category === category)
}

export function getSparePartsByCategory(category: SparePart['category']): SparePart[] {
  return SPARE_PARTS.filter(p => p.category === category)
}

export function getCriticalTasks(): MaintenanceTask[] {
  return MAINTENANCE_TASKS.filter(t => t.priority === 'critical' || t.priority === 'high')
}
