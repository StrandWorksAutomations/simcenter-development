// =============================================================================
// BUILD PROCESS - End-to-End Construction Playbook
// =============================================================================
// Source: Prompt 3 - "End-to-end build process (concept → design → construction → commissioning → go-live)"
// A step-by-step playbook for building a simulation center inside an operating hospital
// =============================================================================

export interface BuildPhase {
  id: string
  number: number
  name: string
  shortName: string
  duration: string
  monthRange: string
  description: string
  icon: string

  // Key activities
  activities: PhaseActivity[]

  // Milestones
  milestones: PhaseMilestone[]

  // Deliverables
  deliverables: string[]

  // Critical path items
  criticalPath: string[]

  // Common failure modes
  failureModes: FailureMode[]
}

export interface PhaseActivity {
  id: string
  name: string
  description: string
  owner: 'owner' | 'architect' | 'contractor' | 'vendor' | 'hospital' | 'simulation'
  duration?: string
  dependencies?: string[]
}

export interface PhaseMilestone {
  id: string
  name: string
  targetMonth: number
  description: string
  deliverable?: string
  criticalPath: boolean
}

export interface FailureMode {
  risk: string
  impact: 'high' | 'medium' | 'low'
  mitigation: string
}

export interface GanttItem {
  id: string
  phase: string
  task: string
  startMonth: number
  endMonth: number
  isMilestone: boolean
  isCriticalPath: boolean
}

// =============================================================================
// BUILD PHASES DATA
// =============================================================================

export const BUILD_PHASES: BuildPhase[] = [
  {
    id: 'needs-assessment',
    number: 1,
    name: 'Needs Assessment & Strategic Alignment',
    shortName: 'Needs Assessment',
    duration: '6 months',
    monthRange: 'Months 0-6',
    description: 'Define the vision, conduct stakeholder analysis, benchmark comparable centers, and develop the business case.',
    icon: 'Target',
    activities: [
      { id: 'define-vision', name: 'Define Vision & Objectives', description: 'Establish strategic purpose (patient safety, staff training, academic programs)', owner: 'owner' },
      { id: 'stakeholder-analysis', name: 'Stakeholder Needs Analysis', description: 'Interview clinical educators, nursing leadership, physicians, IT, facilities, academic partners', owner: 'simulation' },
      { id: 'market-research', name: 'Market Research & Benchmarking', description: 'Review comparable sim centers, gather success stories and best practices', owner: 'simulation' },
      { id: 'define-scope', name: 'Define Scope (Typology)', description: 'Decide on multi-suite, stationary sim center with specific room types', owner: 'owner' },
      { id: 'business-case', name: 'Business Case Development', description: 'Quantify benefits (ROI), estimate costs, identify funding sources', owner: 'owner' }
    ],
    milestones: [
      { id: 'approval', name: 'Project Approval & Initial Funding', targetMonth: 6, description: 'Senior leadership approves project with initial funding secured', criticalPath: true }
    ],
    deliverables: [
      'Feasibility report with strategic alignment',
      'Stakeholder needs summary',
      'Preliminary budget estimate',
      'Funding strategy (capital, grants, philanthropy)'
    ],
    criticalPath: ['Securing leadership approval', 'Identifying funding sources'],
    failureModes: [
      { risk: 'Unclear strategic purpose', impact: 'high', mitigation: 'Align with hospital strategic plan and workforce priorities' },
      { risk: 'Insufficient stakeholder buy-in', impact: 'medium', mitigation: 'Include all user groups in early discussions' }
    ]
  },
  {
    id: 'governance',
    number: 2,
    name: 'Stakeholder Governance & Project Initiation',
    shortName: 'Governance',
    duration: '3-6 months',
    monthRange: 'Months 3-9',
    description: 'Form governance structure, hire key personnel, establish communication plan.',
    icon: 'Users',
    activities: [
      { id: 'form-committee', name: 'Form Steering Committee', description: 'Include executives, clinical leaders, simulation experts, IT, facilities, infection control', owner: 'owner' },
      { id: 'hire-director', name: 'Hire Simulation Director', description: 'Early hire of someone with clinical education experience to guide design', owner: 'owner' },
      { id: 'assign-pm', name: 'Assign Project Manager', description: 'Dedicated PM to drive day-to-day planning', owner: 'owner' },
      { id: 'governance-kickoff', name: 'Governance Kickoff', description: 'Refine mandate, program model, financial governance', owner: 'owner' },
      { id: 'comm-plan', name: 'Communication Plan', description: 'Engage broader stakeholders, develop donor narrative', owner: 'owner' }
    ],
    milestones: [
      { id: 'charter-signed', name: 'Governance Charter Signed', targetMonth: 9, description: 'Formal governance structure in place with key staff hired', criticalPath: true }
    ],
    deliverables: [
      'Governance charter',
      'Key personnel hired (Director, PM)',
      'Communication strategy',
      'Risk assessment document'
    ],
    criticalPath: ['Hiring Simulation Director early', 'Getting governance buy-in'],
    failureModes: [
      { risk: 'Not involving simulation specialists early', impact: 'high', mitigation: 'Hire Sim Director before design phase to inform decisions' },
      { risk: 'Unclear financial governance', impact: 'medium', mitigation: 'Define who covers what if multiple entities fund it' }
    ]
  },
  {
    id: 'concept-design',
    number: 3,
    name: 'Concept Design & Programming Charrettes',
    shortName: 'Concept Design',
    duration: '6 months',
    monthRange: 'Months 6-12',
    description: 'Conduct user workshops (charrettes), develop space program, plan adjacencies and phasing.',
    icon: 'PenTool',
    activities: [
      { id: 'charrettes', name: 'User Design Workshops', description: 'Gather input from clinicians, educators, IT, infection control on space needs', owner: 'architect' },
      { id: 'space-program', name: 'Develop Space Program', description: 'List all required spaces with functions and approximate sizes', owner: 'architect' },
      { id: 'adjacency-planning', name: 'Adjacency & Flow Planning', description: 'Plan circulation paths for learners vs staff, sightlines, separation', owner: 'architect' },
      { id: 'phasing-plan', name: 'Preliminary Phasing Plan', description: 'Outline Phase 1 vs Phase 2 scope split', owner: 'owner' }
    ],
    milestones: [
      { id: 'concept-approved', name: 'Conceptual Layout Finalized', targetMonth: 12, description: 'Space program and Phase 1 scope confirmed', criticalPath: true },
      { id: 'funding-checkpoint', name: 'Phase 1 Funding Confirmed', targetMonth: 12, description: 'Hospital and foundation confirm funding for Phase 1', criticalPath: true }
    ],
    deliverables: [
      'Space program document',
      'Blocking diagrams',
      'Phasing strategy',
      'Updated budget estimate'
    ],
    criticalPath: ['Charrette decisions', 'Phasing confirmation'],
    failureModes: [
      { risk: 'Underestimating storage needs', impact: 'medium', mitigation: 'Common pitfall - explicitly plan generous storage rooms' },
      { risk: 'Inadequate room sizes', impact: 'high', mitigation: 'Use real clinical room dimensions as guide - sim rooms must match real environments' }
    ]
  },
  {
    id: 'schematic-design',
    number: 4,
    name: 'Schematic Design',
    shortName: 'Schematic Design',
    duration: '6 months',
    monthRange: 'Months 12-18',
    description: 'Architects develop floor plan options, determine layout, initial MEP and infrastructure considerations.',
    icon: 'Layout',
    activities: [
      { id: 'floor-plans', name: 'Develop Floor Plan Options', description: 'Fit required spaces into actual architectural layout', owner: 'architect' },
      { id: 'layout-decisions', name: 'Layout & Adjacency Decisions', description: 'Confirm sim room locations, control rooms, sightlines', owner: 'architect' },
      { id: 'right-sizing', name: 'Right-Size Rooms', description: 'Verify room sizes meet functional needs (OR ~400+ sq ft, etc.)', owner: 'architect' },
      { id: 'infrastructure', name: 'Infrastructure Considerations', description: 'Address HVAC loads, medical gases, electrical, networking needs', owner: 'architect' },
      { id: 'icra-planning', name: 'Initial ICRA Planning', description: 'Engage infection prevention team to review plans', owner: 'hospital' },
      { id: 'stakeholder-review', name: 'Stakeholder Design Review', description: 'Walk through plans with user groups, catch issues early', owner: 'owner' }
    ],
    milestones: [
      { id: 'sd-approved', name: 'Schematic Design Approved', targetMonth: 18, description: 'Floor plan approved with stakeholder sign-off', criticalPath: true }
    ],
    deliverables: [
      'Schematic design drawings',
      'Updated cost estimate',
      'Initial ICRA plan',
      'Stakeholder sign-off'
    ],
    criticalPath: ['Timely stakeholder decisions', 'ICRA engagement'],
    failureModes: [
      { risk: 'Door widths too narrow', impact: 'medium', mitigation: 'Specify 42"+ doors for sim rooms and storage to accommodate beds/stretchers' },
      { risk: 'Missing observation windows', impact: 'medium', mitigation: 'Ensure one-way glass between control and sim rooms in plans' }
    ]
  },
  {
    id: 'design-development',
    number: 5,
    name: 'Design Development & Construction Documents',
    shortName: 'DD/CD',
    duration: '12 months',
    monthRange: 'Months 18-30',
    description: 'Detailed design of architecture, MEP, IT/AV systems. Develop construction documents and obtain permits.',
    icon: 'FileText',
    activities: [
      { id: 'room-layouts', name: 'Refine Room Layouts', description: 'Detailed headwall config, camera positions, window specs', owner: 'architect' },
      { id: 'mep-coord', name: 'MEP Systems Coordination', description: 'HVAC sizing, noise control, electrical circuits, plumbing', owner: 'architect' },
      { id: 'av-design', name: 'AV/IT Integration Design', description: 'Camera types, microphones, server location, cabling, future-proofing', owner: 'vendor' },
      { id: 'finishes', name: 'Interior Design & Finishes', description: 'Healthcare-grade materials, acoustic tiles, observation windows', owner: 'architect' },
      { id: 'icra-review', name: 'ICRA & Safety Review', description: 'Formal infection control risk assessment on construction plan', owner: 'hospital' },
      { id: 'permitting', name: 'Permitting & Approvals', description: 'Submit to authorities, address comments', owner: 'architect' }
    ],
    milestones: [
      { id: 'cds-complete', name: '100% Construction Documents', targetMonth: 30, description: 'Detailed plans ready for bidding and approved by authorities', criticalPath: true }
    ],
    deliverables: [
      'Design Development drawings',
      'Construction Documents (100%)',
      'AV/IT system design',
      'ICRA plan approved',
      'Building permits'
    ],
    criticalPath: ['Technology decisions', 'Permit approval timeline'],
    failureModes: [
      { risk: 'Delayed AV/manikin selection', impact: 'high', mitigation: 'Lock in technology decisions during DD to avoid rework' },
      { risk: 'HVAC noise issues', impact: 'medium', mitigation: 'Conduct early HVAC noise survey, specify silencers' }
    ]
  },
  {
    id: 'procurement',
    number: 6,
    name: 'Procurement & Contractor Selection',
    shortName: 'Procurement',
    duration: '4 months',
    monthRange: 'Months 28-32',
    description: 'Bid construction, select contractor, procure long-lead equipment and simulation technology.',
    icon: 'ShoppingCart',
    activities: [
      { id: 'rfp', name: 'RFP/Bid Process', description: 'Solicit proposals from qualified contractors with healthcare experience', owner: 'owner' },
      { id: 'contractor-eval', name: 'Contractor Evaluation', description: 'Evaluate on price, experience, ICRA plan, healthcare credentials', owner: 'owner' },
      { id: 'contract-award', name: 'Award Contract', description: 'Select contractor, hold kickoff meeting', owner: 'owner' },
      { id: 'equipment-rfp', name: 'Equipment Procurement', description: 'Issue RFPs for simulators, AV systems, medical equipment', owner: 'owner' },
      { id: 'long-lead', name: 'Long-Lead Item Orders', description: 'Place orders for manikins, AV system, specialty equipment', owner: 'owner' }
    ],
    milestones: [
      { id: 'ntp', name: 'Contractor NTP Issued', targetMonth: 32, description: 'Notice to Proceed issued, contractor mobilizing', criticalPath: true },
      { id: 'equipment-ordered', name: 'Long-Lead Equipment Ordered', targetMonth: 28, description: 'Manikins and AV system ordered to meet construction schedule', criticalPath: true }
    ],
    deliverables: [
      'Construction contract',
      'Equipment purchase orders',
      'Detailed project schedule',
      'Approved submittals for critical items'
    ],
    criticalPath: ['Long-lead equipment ordering', 'Contractor selection'],
    failureModes: [
      { risk: 'Equipment delivery delays', impact: 'high', mitigation: 'Pre-purchase key equipment; track vendor deliveries closely' },
      { risk: 'Contractor lacks healthcare experience', impact: 'medium', mitigation: 'Require ICRA experience in bid evaluation' }
    ]
  },
  {
    id: 'construction',
    number: 7,
    name: 'Construction & Renovation Execution',
    shortName: 'Construction',
    duration: '16 months',
    monthRange: 'Months 32-48',
    description: 'Implement ICRA barriers, demolition, build-out, MEP installation, quality inspections.',
    icon: 'HardHat',
    activities: [
      { id: 'site-prep', name: 'Site Preparation & ICRA', description: 'Install barriers, negative air, worker orientation', owner: 'contractor' },
      { id: 'demolition', name: 'Selective Demolition', description: 'Remove walls, finishes, unused utilities', owner: 'contractor' },
      { id: 'rough-construction', name: 'Rough Construction', description: 'Frame new walls, run MEP rough-ins, install sound insulation', owner: 'contractor' },
      { id: 'finishes', name: 'Interior Finishes', description: 'Drywall, flooring, ceilings, painting', owner: 'contractor' },
      { id: 'mep-install', name: 'MEP Systems Installation', description: 'HVAC, electrical, plumbing, medical gas connections', owner: 'contractor' },
      { id: 'icra-monitoring', name: 'ICRA Monitoring', description: 'Daily checks of barriers, pressure, dust levels', owner: 'hospital' },
      { id: 'inspections', name: 'Testing & Inspections', description: 'HVAC balancing, fire alarm, code inspections', owner: 'contractor' }
    ],
    milestones: [
      { id: 'demo-complete', name: 'Demo Complete', targetMonth: 36, description: 'All demolition finished, no unforeseen conditions', criticalPath: false },
      { id: 'walls-closed', name: 'Walls Closed Inspection', targetMonth: 40, description: 'All infrastructure in place, ready for finishes', criticalPath: true },
      { id: 'substantial-completion', name: 'Substantial Completion', targetMonth: 44, description: 'Construction substantially complete', criticalPath: true }
    ],
    deliverables: [
      'Completed construction',
      'Inspection approvals',
      'ICRA closeout documentation',
      'Punch list'
    ],
    criticalPath: ['ICRA compliance', 'MEP coordination', 'Inspection approvals'],
    failureModes: [
      { risk: 'ICRA breach (dust migration)', impact: 'high', mitigation: 'Rigorous adherence to ICRA protocols, daily monitoring' },
      { risk: 'Unplanned utility shutdowns', impact: 'medium', mitigation: 'Thorough pre-demo surveys, coordinate with facilities' },
      { risk: 'Construction delays', impact: 'medium', mitigation: 'Build float into schedule, track long-lead deliveries' }
    ]
  },
  {
    id: 'tech-install',
    number: 8,
    name: 'Technology Installation & Equipment Outfitting',
    shortName: 'Tech Install',
    duration: '6 months',
    monthRange: 'Months 44-50',
    description: 'Install AV systems, cameras, network, deliver and set up simulators, furnish rooms.',
    icon: 'Monitor',
    activities: [
      { id: 'av-install', name: 'AV/IT Systems Installation', description: 'Mount cameras, microphones, rack servers, configure network', owner: 'vendor' },
      { id: 'network-config', name: 'Network Configuration', description: 'Configure VLAN, Wi-Fi, security settings', owner: 'hospital' },
      { id: 'equipment-delivery', name: 'Equipment Delivery', description: 'Receive manikins, beds, medical equipment, furniture', owner: 'vendor' },
      { id: 'manikin-setup', name: 'Manikin Setup', description: 'Assemble simulators, install software, run initial tests', owner: 'simulation' },
      { id: 'integration-test', name: 'Integration Testing', description: 'Test all systems working together: cameras, manikins, recording', owner: 'simulation' },
      { id: 'environment-check', name: 'Environmental Checks', description: 'Deep clean, lighting, acoustics, signage', owner: 'contractor' }
    ],
    milestones: [
      { id: 'av-online', name: 'AV/IT Systems Online', targetMonth: 48, description: 'All cameras, recording, network operational', criticalPath: true },
      { id: 'equipment-ready', name: 'All Equipment On-Site', targetMonth: 48, description: 'Manikins delivered and configured', criticalPath: true }
    ],
    deliverables: [
      'Installed AV system',
      'Configured network',
      'Assembled simulators',
      'Furnished rooms',
      'Integration test results'
    ],
    criticalPath: ['AV system delivery', 'Manikin delivery', 'Network setup'],
    failureModes: [
      { risk: 'Equipment delivery delays', impact: 'high', mitigation: 'Order early, have backup/loaner plan' },
      { risk: 'Integration issues', impact: 'medium', mitigation: 'Test each component, then test together' }
    ]
  },
  {
    id: 'commissioning',
    number: 9,
    name: 'Commissioning & Systems Testing',
    shortName: 'Commissioning',
    duration: '1 month',
    monthRange: 'Month 50',
    description: 'Formal commissioning of facility and simulation systems, staff training, dry-run scenarios.',
    icon: 'CheckCircle',
    activities: [
      { id: 'facilities-commission', name: 'Facilities Commissioning', description: 'Test HVAC, electrical, fire safety, emergency power', owner: 'contractor' },
      { id: 'sim-systems-commission', name: 'Simulation Systems Commissioning', description: 'Vendor sign-off on AV and manikin systems', owner: 'vendor' },
      { id: 'dry-runs', name: 'Integrated Scenario Dry-Runs', description: 'Run mock simulations with project team and select users', owner: 'simulation' },
      { id: 'staff-training', name: 'Staff Training', description: 'Train simulation staff on all equipment and software', owner: 'vendor' },
      { id: 'regulatory-inspections', name: 'Final Regulatory Inspections', description: 'Fire marshal, health department, hospital safety sign-off', owner: 'hospital' }
    ],
    milestones: [
      { id: 'commissioning-passed', name: 'Commissioning Passed', targetMonth: 50, description: 'All systems tested and approved', criticalPath: true },
      { id: 'staff-certified', name: 'Staff Certified Ready', targetMonth: 50, description: 'Simulation staff trained and ready', criticalPath: true }
    ],
    deliverables: [
      'Commissioning reports',
      'Vendor training certificates',
      'Dry-run test results',
      'Certificate of occupancy',
      'Safety sign-offs'
    ],
    criticalPath: ['Commissioning tests', 'Regulatory inspections', 'Staff training'],
    failureModes: [
      { risk: 'Failed inspection', impact: 'high', mitigation: 'Conduct internal mock inspections first' },
      { risk: 'Staff not trained', impact: 'medium', mitigation: 'Schedule vendor training during commissioning' }
    ]
  },
  {
    id: 'go-live',
    number: 10,
    name: 'Go-Live Readiness & Opening',
    shortName: 'Go-Live',
    duration: '9 months',
    monthRange: 'Months 51-60',
    description: 'Soft opening, grand opening, program rollout, monitoring and evaluation.',
    icon: 'Rocket',
    activities: [
      { id: 'soft-opening', name: 'Soft Opening', description: 'Limited pilot sessions to refine operations', owner: 'simulation' },
      { id: 'go-live-checklist', name: 'Go-Live Checklist Review', description: 'Verify staffing, SOPs, inventory, documentation', owner: 'simulation' },
      { id: 'grand-opening', name: 'Grand Opening Event', description: 'Ribbon cutting, tours for stakeholders and donors', owner: 'owner' },
      { id: 'program-rollout', name: 'Program Rollout', description: 'Begin regular training schedule, gradual ramp-up', owner: 'simulation' },
      { id: 'monitoring', name: 'Monitoring & Evaluation', description: 'Track usage, gather feedback, measure outcomes', owner: 'simulation' }
    ],
    milestones: [
      { id: 'first-sim', name: 'First Simulation Executed', targetMonth: 51, description: 'First successful simulation with real learners', criticalPath: false },
      { id: 'grand-opening', name: 'Grand Opening', targetMonth: 54, description: 'Official launch and celebration', criticalPath: false },
      { id: 'six-month-review', name: '6-Month Post-Open Review', targetMonth: 60, description: 'Comprehensive review of operations and outcomes', criticalPath: false }
    ],
    deliverables: [
      'Operational simulation center',
      'Training calendar',
      'Usage metrics and reports',
      'Lessons learned for Phase 2'
    ],
    criticalPath: ['SOPs finalized', 'Staff scheduling'],
    failureModes: [
      { risk: 'Over-promising capacity', impact: 'medium', mitigation: 'Under-schedule first months, ramp up gradually' },
      { risk: 'Equipment failures at launch', impact: 'medium', mitigation: 'Extensive commissioning and dry-runs before opening' }
    ]
  }
]

// =============================================================================
// GANTT CHART DATA
// =============================================================================

export const GANTT_DATA: GanttItem[] = [
  // Phase 1: Needs Assessment
  { id: 'needs-1', phase: 'Needs Assessment', task: 'Stakeholder Analysis', startMonth: 0, endMonth: 4, isMilestone: false, isCriticalPath: false },
  { id: 'needs-2', phase: 'Needs Assessment', task: 'Business Case Development', startMonth: 2, endMonth: 6, isMilestone: false, isCriticalPath: true },
  { id: 'needs-m1', phase: 'Needs Assessment', task: 'Project Approval', startMonth: 6, endMonth: 6, isMilestone: true, isCriticalPath: true },

  // Phase 2: Governance
  { id: 'gov-1', phase: 'Governance', task: 'Form Steering Committee', startMonth: 3, endMonth: 6, isMilestone: false, isCriticalPath: true },
  { id: 'gov-2', phase: 'Governance', task: 'Hire Key Personnel', startMonth: 4, endMonth: 9, isMilestone: false, isCriticalPath: true },
  { id: 'gov-m1', phase: 'Governance', task: 'Governance Charter Signed', startMonth: 9, endMonth: 9, isMilestone: true, isCriticalPath: true },

  // Phase 3: Concept Design
  { id: 'concept-1', phase: 'Concept Design', task: 'User Design Charrettes', startMonth: 6, endMonth: 10, isMilestone: false, isCriticalPath: false },
  { id: 'concept-2', phase: 'Concept Design', task: 'Space Programming', startMonth: 8, endMonth: 12, isMilestone: false, isCriticalPath: true },
  { id: 'concept-m1', phase: 'Concept Design', task: 'Concept Approved', startMonth: 12, endMonth: 12, isMilestone: true, isCriticalPath: true },

  // Phase 4: Schematic Design
  { id: 'sd-1', phase: 'Schematic Design', task: 'Floor Plan Development', startMonth: 12, endMonth: 16, isMilestone: false, isCriticalPath: true },
  { id: 'sd-2', phase: 'Schematic Design', task: 'Stakeholder Reviews', startMonth: 14, endMonth: 18, isMilestone: false, isCriticalPath: false },
  { id: 'sd-m1', phase: 'Schematic Design', task: 'SD Approved', startMonth: 18, endMonth: 18, isMilestone: true, isCriticalPath: true },

  // Phase 5: DD/CD
  { id: 'dd-1', phase: 'DD/CD', task: 'Design Development', startMonth: 18, endMonth: 24, isMilestone: false, isCriticalPath: true },
  { id: 'dd-2', phase: 'DD/CD', task: 'AV/IT Design', startMonth: 20, endMonth: 28, isMilestone: false, isCriticalPath: true },
  { id: 'dd-3', phase: 'DD/CD', task: 'Construction Documents', startMonth: 24, endMonth: 30, isMilestone: false, isCriticalPath: true },
  { id: 'dd-4', phase: 'DD/CD', task: 'Permitting', startMonth: 26, endMonth: 30, isMilestone: false, isCriticalPath: true },
  { id: 'dd-m1', phase: 'DD/CD', task: '100% CDs Complete', startMonth: 30, endMonth: 30, isMilestone: true, isCriticalPath: true },

  // Phase 6: Procurement
  { id: 'proc-1', phase: 'Procurement', task: 'Long-Lead Equipment Orders', startMonth: 28, endMonth: 30, isMilestone: false, isCriticalPath: true },
  { id: 'proc-2', phase: 'Procurement', task: 'Contractor Bidding', startMonth: 28, endMonth: 32, isMilestone: false, isCriticalPath: true },
  { id: 'proc-m1', phase: 'Procurement', task: 'Contractor NTP', startMonth: 32, endMonth: 32, isMilestone: true, isCriticalPath: true },

  // Phase 7: Construction
  { id: 'const-1', phase: 'Construction', task: 'ICRA Setup & Demolition', startMonth: 32, endMonth: 36, isMilestone: false, isCriticalPath: true },
  { id: 'const-2', phase: 'Construction', task: 'Rough Construction', startMonth: 36, endMonth: 40, isMilestone: false, isCriticalPath: true },
  { id: 'const-3', phase: 'Construction', task: 'Finishes & MEP', startMonth: 40, endMonth: 44, isMilestone: false, isCriticalPath: true },
  { id: 'const-m1', phase: 'Construction', task: 'Substantial Completion', startMonth: 44, endMonth: 44, isMilestone: true, isCriticalPath: true },

  // Phase 8: Tech Install
  { id: 'tech-1', phase: 'Tech Install', task: 'AV/IT Installation', startMonth: 44, endMonth: 48, isMilestone: false, isCriticalPath: true },
  { id: 'tech-2', phase: 'Tech Install', task: 'Equipment Setup', startMonth: 46, endMonth: 50, isMilestone: false, isCriticalPath: true },
  { id: 'tech-m1', phase: 'Tech Install', task: 'All Systems Online', startMonth: 48, endMonth: 48, isMilestone: true, isCriticalPath: true },

  // Phase 9: Commissioning
  { id: 'comm-1', phase: 'Commissioning', task: 'Systems Testing', startMonth: 49, endMonth: 50, isMilestone: false, isCriticalPath: true },
  { id: 'comm-2', phase: 'Commissioning', task: 'Staff Training', startMonth: 49, endMonth: 50, isMilestone: false, isCriticalPath: true },
  { id: 'comm-m1', phase: 'Commissioning', task: 'Commissioning Passed', startMonth: 50, endMonth: 50, isMilestone: true, isCriticalPath: true },

  // Phase 10: Go-Live
  { id: 'go-1', phase: 'Go-Live', task: 'Soft Opening', startMonth: 51, endMonth: 53, isMilestone: false, isCriticalPath: false },
  { id: 'go-m1', phase: 'Go-Live', task: 'Grand Opening', startMonth: 54, endMonth: 54, isMilestone: true, isCriticalPath: false },
  { id: 'go-2', phase: 'Go-Live', task: 'Program Rollout', startMonth: 54, endMonth: 60, isMilestone: false, isCriticalPath: false }
]

// =============================================================================
// CRITICAL PATH SUMMARY
// =============================================================================

export const CRITICAL_PATH_ITEMS = [
  { phase: 'Needs Assessment', item: 'Gaining timely approval and financing', mitigation: 'Develop strong business case with phased approach' },
  { phase: 'Governance', item: 'Hiring Simulation Director early', mitigation: 'Start recruitment during needs assessment' },
  { phase: 'Concept Design', item: 'Stakeholder decisions on space program', mitigation: 'Structured charrettes with clear decision points' },
  { phase: 'DD/CD', item: 'Technology and equipment decisions', mitigation: 'Lock in selections during DD to avoid rework' },
  { phase: 'Procurement', item: 'Long-lead equipment procurement', mitigation: 'Identify items early, order during design phase' },
  { phase: 'Construction', item: 'ICRA compliance', mitigation: 'Engage infection control early, rigorous monitoring' },
  { phase: 'Construction', item: 'Construction sequence (Demo → Rough → Finish)', mitigation: 'Experienced contractor, quality inspections' },
  { phase: 'Tech Install', item: 'Technology integration', mitigation: 'Coordinate with AV vendor, test before construction complete' },
  { phase: 'Commissioning', item: 'Staff hiring and training', mitigation: 'Recruit early, vendor training during commissioning' },
  { phase: 'Commissioning', item: 'Regulatory inspections', mitigation: 'Internal mock inspections, have documentation ready' }
]

// =============================================================================
// FAILURE MODES SUMMARY
// =============================================================================

export const COMMON_FAILURE_MODES = [
  {
    category: 'Design & Planning',
    failures: [
      { risk: 'Inadequate stakeholder input leading to design flaws', mitigation: 'Broad charrettes, simulation director involved early, multiple reviews' },
      { risk: 'Scope creep or unrealistic scope vs budget', mitigation: 'Phased approach, governance oversight, cost checks at each milestone' },
      { risk: 'Underestimating storage needs', mitigation: 'Explicitly plan generous storage - most common pitfall' },
      { risk: 'Underestimating AV/IT complexity', mitigation: 'Involve IT and AV specialists from design start, future-proof cabling' }
    ]
  },
  {
    category: 'Construction',
    failures: [
      { risk: 'ICRA breach (dust, noise, vibration impacts)', mitigation: 'Rigorous ICRA plan, dedicated monitor, contractor with healthcare experience' },
      { risk: 'Delays in equipment delivery', mitigation: 'Pre-order long-lead items, have contingency plans for delays' },
      { risk: 'Unforeseen site conditions', mitigation: 'Pre-demolition surveys, contingency budget (10-15%)' }
    ]
  },
  {
    category: 'Operations',
    failures: [
      { risk: 'Insufficient staff training / underutilization', mitigation: 'Involve end-users in planning, intensive training during commissioning' },
      { risk: 'Acoustic problems discovered late', mitigation: 'Specify STC-50 walls in design, test during commissioning' },
      { risk: 'Not accounting for future growth', mitigation: 'Design with expansion in mind, future-proof infrastructure' },
      { risk: 'Budget overrun', mitigation: 'Contingencies in budget, phased approach, transparent cost tracking' }
    ]
  }
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getPhaseById(id: string): BuildPhase | undefined {
  return BUILD_PHASES.find(p => p.id === id)
}

export function getGanttItemsByPhase(phase: string): GanttItem[] {
  return GANTT_DATA.filter(item => item.phase === phase)
}

export function getCriticalPathItems(): GanttItem[] {
  return GANTT_DATA.filter(item => item.isCriticalPath)
}

export function getMilestones(): GanttItem[] {
  return GANTT_DATA.filter(item => item.isMilestone)
}

export function getTotalProjectDuration(): { months: number; years: number } {
  const maxMonth = Math.max(...GANTT_DATA.map(item => item.endMonth))
  return { months: maxMonth, years: Math.ceil(maxMonth / 12) }
}
