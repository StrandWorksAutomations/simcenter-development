// Quality Control Program Data
// Prompt 13: QC program for simulation fidelity and faculty consistency

export interface ChecklistItem {
  id: string
  text: string
  category?: string
  required: boolean
}

export interface QCChecklist {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  usedBy: string
  timing: string
  items: ChecklistItem[]
}

export interface RubricElement {
  id: string
  name: string
  description: string
  criteria: {
    level: string
    description: string
  }[]
}

export interface ObservationRubric {
  id: string
  section: string
  icon: string
  elements: RubricElement[]
}

export interface ReportSection {
  id: string
  title: string
  description: string
  icon: string
  items: string[]
}

export interface QCComponent {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  keyPractices: string[]
  standards: string[]
}

// Main QC Program Components
export const QC_COMPONENTS: QCComponent[] = [
  {
    id: 'scenario-version-control',
    name: 'Scenario Version Control',
    shortName: 'Version Control',
    description: 'Strict version management for all simulation scenarios with central library, unique IDs, and approval workflows.',
    icon: 'GitBranch',
    keyPractices: [
      'Central scenario library with unique IDs and version numbers (v1.0, v1.1, etc.)',
      'Standardized scenario template with learning objectives, patient details, equipment, critical actions',
      'Scenario review committee for change approval',
      'Pilot testing new scenarios before release',
      'Preprogrammed scenario files for consistent timing',
      'Calibration meetings for multi-instructor scenarios'
    ],
    standards: ['INACSL Simulation Design Standard', 'SSH Accreditation Standards']
  },
  {
    id: 'checklist-validation',
    name: 'Checklist Validation',
    shortName: 'Checklists',
    description: 'Validated checklists for scenario execution and learner performance evaluation with inter-rater reliability testing.',
    icon: 'ClipboardCheck',
    keyPractices: [
      'Content expert review for validity',
      'Alignment with learning objectives',
      'Pilot testing for clarity and feasibility',
      'Inter-rater reliability testing (target: Cohen\'s kappa >= 0.8)',
      'Behavioral anchors for rating scales',
      'Regular updates based on feedback'
    ],
    standards: ['INACSL Standards', 'StatPearls Simulation Assessment Guidelines']
  },
  {
    id: 'pre-session-checks',
    name: 'Pre-Session Equipment Checks',
    shortName: 'Equipment Checks',
    description: 'Thorough pre-run equipment and environment verification before every simulation session.',
    icon: 'Settings',
    keyPractices: [
      'Simulator functionality test and calibration',
      'Supplies and props verification',
      'Audio/Video system checks',
      'Environment safety inspection',
      'Scenario-specific settings loaded',
      'Backup equipment positioned'
    ],
    standards: ['INACSL Operations Standard', 'Radford University Sim Center Policy']
  },
  {
    id: 'standardized-prebrief',
    name: 'Standardized Prebriefing',
    shortName: 'Prebriefing',
    description: 'Consistent prebrief process with scripted content ensuring psychological safety and learner preparation.',
    icon: 'MessageSquare',
    keyPractices: [
      'Introduction and psychological safety establishment',
      'Fiction contract acknowledgment',
      'Confidentiality and ground rules',
      'Environment and equipment orientation',
      'Objectives and scenario context',
      'Evaluation method transparency'
    ],
    standards: ['INACSL Prebriefing Standard', 'Dartmouth-Hitchcock Simulation Center']
  },
  {
    id: 'debrief-quality',
    name: 'Debriefing Quality Assurance',
    shortName: 'Debriefing QA',
    description: 'Structured debriefing using validated models with quality rubrics based on DASH framework.',
    icon: 'MessageCircle',
    keyPractices: [
      'Standard debrief model (PEARLS, Advocacy-Inquiry, Plus-Delta)',
      'Debriefing Quality Rubric aligned with DASH',
      'Faculty development workshops',
      'Peer review using DASH Rater tool',
      'All objectives addressed in debrief',
      'Minimum debrief length requirements'
    ],
    standards: ['DASH (Debriefing Assessment for Simulation in Healthcare)', 'INACSL Debriefing Standard']
  },
  {
    id: 'inter-rater-reliability',
    name: 'Inter-Rater Reliability',
    shortName: 'IRR',
    description: 'Faculty calibration ensuring consistent scoring across all evaluators.',
    icon: 'Users',
    keyPractices: [
      'Regular rater calibration workshops',
      'Sample performance video scoring',
      'Behavioral anchors on all rubrics',
      'IRR measurement (Cohen\'s Kappa)',
      'Bias awareness training',
      'Dual-rater scoring for high-stakes assessments'
    ],
    standards: ['SimulatingHealthcare.net RST Approach', 'INACSL Standards']
  },
  {
    id: 'audit-sampling',
    name: 'Audit and Sampling',
    shortName: 'Audits',
    description: 'Routine observation of simulation sessions with structured feedback and quality tracking.',
    icon: 'Search',
    keyPractices: [
      'Quarterly observational audits (minimum 10% of sessions)',
      'Standardized QA Observation Form',
      'Live and video-based review options',
      'Immediate feedback to instructors',
      'Participant feedback survey review',
      'Documentation and scenario file audits'
    ],
    standards: ['UMass iCELS QA Process', 'SSH Accreditation Standards']
  }
]

// QC Checklists
export const QC_CHECKLISTS: QCChecklist[] = [
  {
    id: 'pre-session-setup',
    name: 'Pre-Session Equipment/Setup Checklist',
    shortName: 'Setup Checklist',
    description: 'Verify all equipment, supplies, and environment before simulation',
    icon: 'Settings',
    usedBy: 'Simulation Technician / Facilitator',
    timing: 'Before each simulation session',
    items: [
      { id: 'setup-1', text: 'Correct scenario file/version loaded on simulator', required: true },
      { id: 'setup-2', text: 'All equipment powered on and functional (monitor, O2, suction, defib)', required: true },
      { id: 'setup-3', text: 'Supplies and props prepared per scenario (medications, IV, syringes)', required: true },
      { id: 'setup-4', text: 'Manikin positioned and moulage applied as required', required: true },
      { id: 'setup-5', text: 'Calibration/performance check completed (vitals, sounds, pulses)', required: true },
      { id: 'setup-6', text: 'Audio/Video recording system on and functional', required: true },
      { id: 'setup-7', text: 'Environmental setup complete (bed position, lighting, charts)', required: true },
      { id: 'setup-8', text: 'Safety check passed (no real sharps, emergency equipment ready)', required: true },
      { id: 'setup-9', text: 'Backup supplies available (extra IV bag, spare battery)', required: false },
      { id: 'setup-10', text: 'Sign-off: Tech/facilitator initials and time recorded', required: true }
    ]
  },
  {
    id: 'prebriefing',
    name: 'Prebriefing Checklist',
    shortName: 'Prebrief Checklist',
    description: 'Ensure all required prebrief elements are covered with learners',
    icon: 'MessageSquare',
    usedBy: 'Facilitator',
    timing: 'During prebrief with learners',
    items: [
      { id: 'prebrief-1', text: 'Introduction & roles: Introduced self, verified participant roles', required: true },
      { id: 'prebrief-2', text: 'Ground rules: Safe learning environment, respectful participation', required: true },
      { id: 'prebrief-3', text: 'Confidentiality: Agreement not to share peer performance', required: true },
      { id: 'prebrief-4', text: 'Fiction contract: Suspend disbelief, treat scenario as real', required: true },
      { id: 'prebrief-5', text: 'Facility orientation: Bathroom, exits, simulated clinical area', required: true },
      { id: 'prebrief-6', text: 'Equipment orientation: Manikin capabilities, monitors, devices', required: true },
      { id: 'prebrief-7', text: 'Learning objectives stated in learner-friendly terms', required: true },
      { id: 'prebrief-8', text: 'Scenario context: SBAR or patient story (without revealing problem)', required: true },
      { id: 'prebrief-9', text: 'Expectations: Clinical performance, hand hygiene, patient ID', required: true },
      { id: 'prebrief-10', text: 'Time frame: Scenario duration and debrief duration explained', required: true },
      { id: 'prebrief-11', text: 'Evaluation method: Practice vs assessment, criteria explained', required: true },
      { id: 'prebrief-12', text: 'Questions addressed before starting', required: true }
    ]
  },
  {
    id: 'scenario-facilitation',
    name: 'Scenario Facilitation Guide',
    shortName: 'Facilitation Guide',
    description: 'Ensure scenario fidelity during execution',
    icon: 'PlayCircle',
    usedBy: 'Facilitator',
    timing: 'During scenario execution',
    items: [
      { id: 'facil-1', text: 'Expected interventions/actions checklist reviewed', required: true },
      { id: 'facil-2', text: 'Embedded cues/triggers delivered at correct times', required: true },
      { id: 'facil-3', text: 'Instructor prompts documented if given', required: false },
      { id: 'facil-4', text: 'Completion criteria met (patient stabilized or time elapsed)', required: true },
      { id: 'facil-5', text: 'Deviations from script noted with outcomes', required: false }
    ]
  },
  {
    id: 'learner-performance',
    name: 'Learner Performance Assessment',
    shortName: 'Performance Checklist',
    description: 'Standardized evaluation of student performance',
    icon: 'UserCheck',
    usedBy: 'Facilitator / Evaluator',
    timing: 'During/after scenario',
    items: [
      { id: 'perf-1', text: 'Hand hygiene performed before patient contact', category: 'Safety', required: true },
      { id: 'perf-2', text: 'Patient identification verified', category: 'Safety', required: true },
      { id: 'perf-3', text: 'ABCs prioritized in assessment', category: 'Assessment', required: true },
      { id: 'perf-4', text: 'Critical interventions performed correctly', category: 'Technical Skills', required: true },
      { id: 'perf-5', text: 'SBAR communication used effectively', category: 'Communication', required: true },
      { id: 'perf-6', text: 'Closed-loop communication demonstrated', category: 'Teamwork', required: true },
      { id: 'perf-7', text: 'Clinical reasoning verbalized appropriately', category: 'Critical Thinking', required: true },
      { id: 'perf-8', text: 'Global rating: Overall competence assessment', category: 'Overall', required: true }
    ]
  },
  {
    id: 'debrief-facilitator',
    name: 'Debrief Facilitator Checklist',
    shortName: 'Debrief Checklist',
    description: 'Key elements for effective debriefing',
    icon: 'MessageCircle',
    usedBy: 'Facilitator',
    timing: 'During debriefing',
    items: [
      { id: 'debrief-1', text: 'Structure followed: Reaction → Analysis → Summary phases', required: true },
      { id: 'debrief-2', text: 'Each learning objective discussed', required: true },
      { id: 'debrief-3', text: 'Open-ended questions used (how/why vs yes/no)', required: true },
      { id: 'debrief-4', text: 'All participants given opportunity to speak', required: true },
      { id: 'debrief-5', text: 'Corrective input provided for errors', required: true },
      { id: 'debrief-6', text: 'Summary and takeaways concluded the session', required: true }
    ]
  }
]

// Observation Rubric for QA
export const OBSERVATION_RUBRIC: ObservationRubric[] = [
  {
    id: 'prebrief-section',
    section: 'Prebrief Quality',
    icon: 'MessageSquare',
    elements: [
      {
        id: 'prebrief-intro',
        name: 'Introduction and Ground Rules',
        description: 'Facilitator established supportive environment',
        criteria: [
          { level: 'Met', description: 'Introduced self, set ground rules, established psychological safety' },
          { level: 'Partial', description: 'Some elements covered but incomplete' },
          { level: 'Not Met', description: 'Key elements missing or rushed' }
        ]
      },
      {
        id: 'prebrief-orientation',
        name: 'Equipment Orientation',
        description: 'Learners oriented to manikin and equipment',
        criteria: [
          { level: 'Met', description: 'Thorough demonstration of all relevant equipment' },
          { level: 'Partial', description: 'Some equipment explained, others skipped' },
          { level: 'Not Met', description: 'No equipment orientation provided' }
        ]
      },
      {
        id: 'prebrief-objectives',
        name: 'Objectives and Context',
        description: 'Learning objectives and scenario context provided',
        criteria: [
          { level: 'Met', description: 'Clear objectives stated, appropriate scenario context given' },
          { level: 'Partial', description: 'Objectives vague or context insufficient' },
          { level: 'Not Met', description: 'Objectives not stated or inappropriate disclosure' }
        ]
      }
    ]
  },
  {
    id: 'scenario-section',
    section: 'Scenario Execution',
    icon: 'PlayCircle',
    elements: [
      {
        id: 'scenario-adherence',
        name: 'Script Adherence',
        description: 'Facilitator followed scenario flow and delivered cues',
        criteria: [
          { level: 'Met', description: 'All cues delivered as planned, scenario ran as designed' },
          { level: 'Partial', description: 'Minor deviations but overall fidelity maintained' },
          { level: 'Not Met', description: 'Significant deviations from script' }
        ]
      },
      {
        id: 'scenario-intervention',
        name: 'Appropriate Interventions',
        description: 'Facilitator intervened appropriately when needed',
        criteria: [
          { level: 'Met', description: 'Balanced intervention - not too much or too little' },
          { level: 'Partial', description: 'Over or under-involvement noted' },
          { level: 'Not Met', description: 'Inappropriate interventions disrupted learning' }
        ]
      },
      {
        id: 'scenario-tech',
        name: 'Technical Handling',
        description: 'Equipment issues handled without disrupting learning',
        criteria: [
          { level: 'Met', description: 'No issues or seamlessly resolved' },
          { level: 'Partial', description: 'Issues occurred but managed acceptably' },
          { level: 'Not Met', description: 'Technical issues disrupted the learning experience' }
        ]
      }
    ]
  },
  {
    id: 'debrief-section',
    section: 'Debrief Quality',
    icon: 'MessageCircle',
    elements: [
      {
        id: 'debrief-structure',
        name: 'Structure and Timing',
        description: 'Debrief followed structured model with adequate time',
        criteria: [
          { level: 'Met', description: 'Clear structure (PEARLS/AI), sufficient length' },
          { level: 'Partial', description: 'Some structure but rushed or incomplete' },
          { level: 'Not Met', description: 'No structure or severely shortened' }
        ]
      },
      {
        id: 'debrief-facilitation',
        name: 'Facilitation Skills',
        description: 'Open-ended questions, learner-centered discussion',
        criteria: [
          { level: 'Met', description: 'Excellent use of reflective questions, balanced participation' },
          { level: 'Partial', description: 'Some good techniques but also lecture-style moments' },
          { level: 'Not Met', description: 'Dominated by instructor, closed questions only' }
        ]
      },
      {
        id: 'debrief-content',
        name: 'Content Coverage',
        description: 'Learning objectives and critical events addressed',
        criteria: [
          { level: 'Met', description: 'All objectives discussed, errors addressed constructively' },
          { level: 'Partial', description: 'Some objectives missed or errors not addressed' },
          { level: 'Not Met', description: 'Key learning opportunities missed' }
        ]
      }
    ]
  }
]

// Quarterly Report Structure
export const QUARTERLY_REPORT_SECTIONS: ReportSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'One-page overview of simulation quality this quarter',
    icon: 'FileText',
    items: [
      'Overall quality statement with key metrics',
      'Critical issues identified and resolved',
      'Notable improvements and positive developments',
      'Key recommendations for next quarter'
    ]
  },
  {
    id: 'quality-metrics',
    title: 'Quality Metrics and Compliance Data',
    description: 'Quantitative data from QC activities',
    icon: 'BarChart',
    items: [
      'Volume & Coverage: Sessions conducted vs audited (target: 10%+)',
      'Pre-session setup checklist completion rate (target: 100%)',
      'Prebrief completeness rate (target: 95%+)',
      'Debrief quality scores (DASH-aligned rating)',
      'Inter-rater reliability measurements (target: kappa >= 0.8)',
      'Participant feedback summary (satisfaction, realism ratings)',
      'Technical issue/downtime incidents'
    ]
  },
  {
    id: 'strengths',
    title: 'Notable Strengths and Best Practices',
    description: 'Qualitative highlights of what is going well',
    icon: 'Award',
    items: [
      'Faculty practices deserving recognition',
      'Scenarios running with high fidelity',
      'Positive learner feedback themes',
      'Successful improvement initiatives'
    ]
  },
  {
    id: 'issues',
    title: 'Identified Issues or Variations',
    description: 'Problems or deviations found during audits',
    icon: 'AlertTriangle',
    items: [
      'Issue description with scope and frequency',
      'Impact on learning or consistency',
      'Root cause analysis',
      'Affected scenarios or faculty'
    ]
  },
  {
    id: 'action-plans',
    title: 'Action Plans and Recommendations',
    description: 'QA to QI conversion - what will be done',
    icon: 'Target',
    items: [
      'Specific actions for each identified issue',
      'Responsible persons and timelines',
      'Status of previous quarter action items',
      'New improvement initiatives planned'
    ]
  },
  {
    id: 'trend-analysis',
    title: 'Quarterly Trend Analysis',
    description: 'Comparison to previous periods',
    icon: 'TrendingUp',
    items: [
      'Compliance rate trends (improving/stable/declining)',
      'Debrief quality trends',
      'IRR improvement tracking',
      'Year-over-year comparison if available'
    ]
  },
  {
    id: 'faculty-development',
    title: 'Faculty Development and Training',
    description: 'Training activities supporting quality',
    icon: 'GraduationCap',
    items: [
      'Calibration workshops conducted',
      'New faculty orientations completed',
      'Debriefing skills training',
      'External certifications obtained'
    ]
  },
  {
    id: 'policy-updates',
    title: 'Updates to Standards or Policies',
    description: 'Changes to simulation guidelines',
    icon: 'FileEdit',
    items: [
      'Handbook or policy revisions',
      'New requirements implemented',
      'Checklist or rubric updates',
      'Documentation of program evolution'
    ]
  }
]

// Quality Metrics with targets
export const QUALITY_METRICS = [
  { id: 'audit-coverage', name: 'Audit Coverage', target: '10%+', description: 'Percentage of sessions audited' },
  { id: 'setup-completion', name: 'Setup Checklist Completion', target: '100%', description: 'Pre-session checklists completed' },
  { id: 'prebrief-compliance', name: 'Prebrief Completeness', target: '95%+', description: 'All prebrief elements covered' },
  { id: 'debrief-quality', name: 'Debrief Quality Score', target: '6+/7', description: 'DASH-aligned rating' },
  { id: 'irr-kappa', name: 'Inter-Rater Reliability', target: '>= 0.80', description: 'Cohen\'s Kappa score' },
  { id: 'learner-satisfaction', name: 'Learner Satisfaction', target: '90%+', description: 'Positive feedback rate' }
]

// Helper functions
export function getChecklistById(id: string): QCChecklist | undefined {
  return QC_CHECKLISTS.find(c => c.id === id)
}

export function getComponentById(id: string): QCComponent | undefined {
  return QC_COMPONENTS.find(c => c.id === id)
}

export function getChecklistStats() {
  return {
    totalChecklists: QC_CHECKLISTS.length,
    totalItems: QC_CHECKLISTS.reduce((sum, c) => sum + c.items.length, 0),
    requiredItems: QC_CHECKLISTS.reduce((sum, c) => sum + c.items.filter(i => i.required).length, 0)
  }
}

export function getRubricStats() {
  return {
    totalSections: OBSERVATION_RUBRIC.length,
    totalElements: OBSERVATION_RUBRIC.reduce((sum, r) => sum + r.elements.length, 0)
  }
}
