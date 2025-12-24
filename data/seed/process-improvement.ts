// Process Improvement Data
// Prompt 14: Continuous process improvement (Lean/PDSA cycle tied to safety outcomes)

export interface PIPhase {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  activities: string[]
  deliverables: string[]
  tools: string[]
}

export interface SafetySignal {
  id: string
  name: string
  category: string
  description: string
  metrics: string[]
  targetImprovement: string
  icon: string
}

export interface PrioritizationCriterion {
  id: string
  name: string
  description: string
  weight: number
  scoringGuide: { score: number; description: string }[]
}

export interface GovernanceMeeting {
  id: string
  name: string
  frequency: string
  attendees: string[]
  agenda: string[]
  outputs: string[]
}

export interface ReportSection {
  id: string
  title: string
  description: string
  items: string[]
}

export interface StandardWork {
  id: string
  name: string
  description: string
  steps: string[]
  owner: string
  frequency: string
}

// DMAIC/PDSA Phases
export const PI_PHASES: PIPhase[] = [
  {
    id: 'define',
    name: 'Define: Intake and Prioritization',
    shortName: 'Define',
    description: 'Capture and define improvement opportunities from safety signals and frontline input.',
    icon: 'Target',
    activities: [
      'Review patient safety incident reports (near misses, adverse events)',
      'Monitor quality metrics underperformance (sepsis compliance, response times)',
      'Analyze operational data and near-miss trends',
      'Collect frontline staff and educator input',
      'Align with strategic safety initiatives',
      'Apply prioritization scoring to rank opportunities'
    ],
    deliverables: [
      'Improvement Opportunities Log',
      'Prioritized project backlog',
      'Project charter with problem statement',
      'Leadership approval and buy-in'
    ],
    tools: ['Intake Form', 'Prioritization Matrix', 'Project Charter Template', 'A3 Problem Solving']
  },
  {
    id: 'measure',
    name: 'Measure: Baseline and Targets',
    shortName: 'Measure',
    description: 'Establish metrics, collect baseline data, and set SMART targets for improvement.',
    icon: 'BarChart',
    activities: [
      'Define 1-3 main outcome metrics per project',
      'Identify simulation performance metrics (leading indicators)',
      'Establish process and balancing metrics',
      'Create data collection plan (who, how, when)',
      'Gather baseline measurements',
      'Analyze current state with run/control charts'
    ],
    deliverables: [
      'KPI definitions with SMART targets',
      'Baseline data report',
      'Data collection tools and forms',
      'Run chart or control chart of current state'
    ],
    tools: ['SMART Goal Template', 'Run Charts', 'Control Charts', 'Data Collection Forms']
  },
  {
    id: 'analyze',
    name: 'Analyze: Root Cause Investigation',
    shortName: 'Analyze',
    description: 'Investigate underlying causes using RCA, process mapping, and simulation-based probing.',
    icon: 'Search',
    activities: [
      'Perform Root Cause Analysis (RCA)',
      'Create process flowcharts and value stream maps',
      'Use fishbone (Ishikawa) diagrams',
      'Run simulation-based analysis to observe failures',
      'Identify latent safety threats (LSTs)',
      'Engage frontline stakeholders for insights',
      'Formulate hypothesis for improvement'
    ],
    deliverables: [
      'Fishbone diagram',
      'Process map with identified gaps',
      'List of latent safety threats from simulations',
      'Validated problem understanding',
      'Change hypothesis statement'
    ],
    tools: ['Fishbone Diagram', '5 Whys', 'Process Mapping', 'In-Situ Simulation', 'Pareto Analysis']
  },
  {
    id: 'improve',
    name: 'Improve: Design and Test Solutions',
    shortName: 'Improve',
    description: 'Develop interventions, pilot test via simulation, and implement with PDSA cycles.',
    icon: 'Zap',
    activities: [
      'Design process changes (protocols, checklists, workflows)',
      'Develop education/training interventions (simulation-based)',
      'Pilot test in simulation before real-world rollout',
      'Run rapid PDSA cycles to refine solutions',
      'Measure immediate impact in pilot',
      'Scale to full implementation',
      'Use Rapid Cycle Deliberate Practice (RCDP) in training'
    ],
    deliverables: [
      'Intervention design document',
      'Pilot test results and learnings',
      'PDSA cycle documentation',
      'Training curriculum and materials',
      'Implementation rollout plan'
    ],
    tools: ['PDSA Worksheet', 'Simulation Scenarios', 'Checklists', 'Training Materials', 'RCDP']
  },
  {
    id: 'control',
    name: 'Control: Sustain and Monitor',
    shortName: 'Control',
    description: 'Embed improvements into standard work, monitor metrics, and prevent regression.',
    icon: 'Shield',
    activities: [
      'Document new standard operating procedures',
      'Update simulation curriculum to reflect improvements',
      'Assign process owners/champions',
      'Establish ongoing metric monitoring plan',
      'Conduct sustainment audits via simulation',
      'Define thresholds for corrective action',
      'Celebrate wins and share lessons learned'
    ],
    deliverables: [
      'Updated SOPs and policies',
      'Process owner assignments',
      'Monitoring dashboard metrics',
      'Sustainment audit schedule',
      'Control plan with escalation thresholds'
    ],
    tools: ['Standard Work Templates', 'Control Charts', 'Audit Checklists', 'Dashboard', 'Visual Management']
  }
]

// Safety Signals to Monitor
export const SAFETY_SIGNALS: SafetySignal[] = [
  {
    id: 'near-misses',
    name: 'Near Misses',
    category: 'Patient Safety',
    description: 'Events that could have resulted in harm but were caught before reaching the patient.',
    metrics: ['Monthly near-miss reports', 'Near-miss category trends', 'Time to report'],
    targetImprovement: 'Increase reporting culture, reduce high-risk near-miss types',
    icon: 'AlertTriangle'
  },
  {
    id: 'adverse-events',
    name: 'Adverse Events',
    category: 'Patient Safety',
    description: 'Events resulting in unintended harm to patients during care delivery.',
    metrics: ['Adverse event rate per 1000 patient days', 'Severity classification', 'Contributing factors'],
    targetImprovement: 'Reduce preventable adverse events by 50%',
    icon: 'AlertCircle'
  },
  {
    id: 'sepsis-bundle',
    name: 'Sepsis Bundle Compliance',
    category: 'Quality Metrics',
    description: 'Adherence to SEP-1 sepsis bundle elements within required timeframes.',
    metrics: ['SEP-1 bundle compliance %', 'Time to antibiotics', 'Lactate timing'],
    targetImprovement: 'Achieve 85%+ bundle compliance',
    icon: 'Activity'
  },
  {
    id: 'rapid-response',
    name: 'Rapid Response Metrics',
    category: 'Emergency Response',
    description: 'Timeliness and effectiveness of rapid response team activations.',
    metrics: ['RRT activation rate', 'Time from warning signs to RRT call', 'Code blue rate outside ICU'],
    targetImprovement: 'Earlier RRT activation, reduced cardiac arrests outside ICU',
    icon: 'Bell'
  },
  {
    id: 'handoff-errors',
    name: 'Handoff Communication Errors',
    category: 'Communication',
    description: 'Information omissions or errors during patient handoffs between providers.',
    metrics: ['Handoff audit scores', 'Information omission rate', 'Handoff-related incidents'],
    targetImprovement: 'Reduce information omissions by 50%',
    icon: 'MessageSquare'
  },
  {
    id: 'stroke-times',
    name: 'Stroke Treatment Times',
    category: 'Time-Critical Care',
    description: 'Door-to-CT and door-to-needle times for stroke patients.',
    metrics: ['Door-to-CT time', 'Door-to-needle time', 'tPA administration rate'],
    targetImprovement: 'Reduce door-to-needle by 10+ minutes',
    icon: 'Clock'
  },
  {
    id: 'medication-errors',
    name: 'Medication Errors',
    category: 'Medication Safety',
    description: 'Errors in prescribing, dispensing, or administering medications.',
    metrics: ['Medication error rate', 'High-alert medication incidents', 'Near-miss medication events'],
    targetImprovement: 'Zero high-alert medication errors',
    icon: 'Pill'
  },
  {
    id: 'falls',
    name: 'Patient Falls',
    category: 'Patient Safety',
    description: 'Falls occurring in the healthcare setting, especially with injury.',
    metrics: ['Falls per 1000 patient days', 'Falls with injury rate', 'Fall prevention compliance'],
    targetImprovement: 'Reduce falls with injury by 30%',
    icon: 'User'
  }
]

// Prioritization Criteria
export const PRIORITIZATION_CRITERIA: PrioritizationCriterion[] = [
  {
    id: 'impact',
    name: 'Impact on Patient Safety/Quality',
    description: 'Potential improvement in outcomes or risk reduction if project succeeds.',
    weight: 30,
    scoringGuide: [
      { score: 5, description: 'Prevents never-event or significantly reduces mortality/morbidity' },
      { score: 4, description: 'Major improvement in key quality metric or harm prevention' },
      { score: 3, description: 'Moderate improvement in safety or quality outcomes' },
      { score: 2, description: 'Minor improvement with limited direct patient impact' },
      { score: 1, description: 'Minimal or indirect impact on patient safety' }
    ]
  },
  {
    id: 'frequency',
    name: 'Frequency/Scope of Issue',
    description: 'How often the problem occurs and how widespread the effect is.',
    weight: 25,
    scoringGuide: [
      { score: 5, description: 'Hospital-wide issue occurring daily/weekly' },
      { score: 4, description: 'Multi-department issue occurring frequently' },
      { score: 3, description: 'Single department with regular occurrences' },
      { score: 2, description: 'Occasional occurrences in limited scope' },
      { score: 1, description: 'Rare or isolated incidents' }
    ]
  },
  {
    id: 'alignment',
    name: 'Strategic Goal Alignment',
    description: 'Alignment with institutional priorities or regulatory requirements.',
    weight: 20,
    scoringGuide: [
      { score: 5, description: 'Direct support of top strategic priority or regulatory mandate' },
      { score: 4, description: 'Strong alignment with organizational goals' },
      { score: 3, description: 'Moderate alignment with strategic direction' },
      { score: 2, description: 'Tangential alignment with priorities' },
      { score: 1, description: 'Limited strategic relevance' }
    ]
  },
  {
    id: 'feasibility',
    name: 'Feasibility and Resources',
    description: 'Realistic capability to tackle the project with available resources.',
    weight: 15,
    scoringGuide: [
      { score: 5, description: 'Readily achievable with current resources and expertise' },
      { score: 4, description: 'Achievable with minor additional resources' },
      { score: 3, description: 'Moderate resource investment needed' },
      { score: 2, description: 'Significant resources or time required' },
      { score: 1, description: 'Major barriers to implementation' }
    ]
  },
  {
    id: 'urgency',
    name: 'Regulatory/Never-Event Status',
    description: 'Related to never-events, recent citations, or regulatory requirements.',
    weight: 10,
    scoringGuide: [
      { score: 5, description: 'Related to never-event or active regulatory citation' },
      { score: 4, description: 'Tied to upcoming regulatory survey or requirement' },
      { score: 3, description: 'Related to accreditation standards' },
      { score: 2, description: 'Best practice but not mandated' },
      { score: 1, description: 'No regulatory implications' }
    ]
  }
]

// Governance Structure
export const GOVERNANCE_MEETINGS: GovernanceMeeting[] = [
  {
    id: 'monthly-pi',
    name: 'Monthly PI Meeting',
    frequency: 'First Wednesday of each month',
    attendees: [
      'Simulation Center Director',
      'Simulation Educators',
      'Quality/Patient Safety Representative',
      'Nursing Education Leader',
      'Physician Champion',
      'Lean/Six Sigma Specialist'
    ],
    agenda: [
      'Review safety signal data and new opportunities',
      'Apply prioritization scoring to new ideas',
      'Status updates on active projects (using Kanban board)',
      'Review recent PDSA findings',
      'Address barriers and resource requests',
      'Assign action items'
    ],
    outputs: [
      'Updated project tracker/Kanban board',
      'Meeting minutes with action items',
      'Resource requests for leadership'
    ]
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Strategic Review',
    frequency: 'End of each quarter',
    attendees: [
      'All Monthly PI Meeting attendees',
      'Senior Leadership (CNO, CMO)',
      'Hospital Quality Council liaison',
      'Finance representative (if ROI discussion)'
    ],
    agenda: [
      'Review Quarterly PI Report',
      'Celebrate successes and lessons learned',
      'Analyze benefits realization data',
      'Select new projects from backlog',
      'Adjust strategic direction as needed',
      'Resource and budget planning'
    ],
    outputs: [
      'Quarterly PI Report',
      'Updated project backlog priorities',
      'Strategic decisions documented',
      'Presentation for hospital leadership'
    ]
  }
]

// Standard Work Documents
export const STANDARD_WORK: StandardWork[] = [
  {
    id: 'project-charter',
    name: 'Project Charter Template',
    description: 'Standardized template for initiating improvement projects with problem statement, scope, and team.',
    steps: [
      'Define problem statement with data',
      'State business case and strategic alignment',
      'Set SMART goals and target metrics',
      'Identify project team and sponsor',
      'Define scope boundaries (in/out)',
      'Obtain leadership sign-off'
    ],
    owner: 'Project Lead',
    frequency: 'At project initiation'
  },
  {
    id: 'pdsa-worksheet',
    name: 'PDSA Cycle Worksheet',
    description: 'Standard worksheet for documenting each Plan-Do-Study-Act cycle.',
    steps: [
      'PLAN: State the aim, predictions, and data collection plan',
      'DO: Execute the test and document observations',
      'STUDY: Analyze results vs predictions',
      'ACT: Decide next steps (adopt, adapt, abandon)'
    ],
    owner: 'Project Team',
    frequency: 'Each PDSA cycle'
  },
  {
    id: 'simulation-analysis',
    name: 'Simulation-Based Process Analysis',
    description: 'Protocol for using simulation to identify latent safety threats and process gaps.',
    steps: [
      'Design simulation scenario matching real process',
      'Run in-situ or lab-based simulation with actual staff',
      'Observe and document failures, workarounds, gaps',
      'Debrief to identify root causes',
      'Document latent safety threats found',
      'Prioritize threats for intervention'
    ],
    owner: 'Simulation Educator',
    frequency: 'During Analyze phase'
  },
  {
    id: 'benefits-tracking',
    name: 'Benefits Realization Template',
    description: 'Template for tracking and reporting project outcomes and ROI.',
    steps: [
      'Document expected benefits at project start',
      'Track actual metrics pre and post intervention',
      'Calculate improvements (absolute and %)',
      'Quantify financial impact if applicable',
      'Document qualitative benefits',
      'Summarize lessons learned'
    ],
    owner: 'PI Committee',
    frequency: 'At project closeout and quarterly'
  }
]

// Quarterly Report Sections
export const QUARTERLY_REPORT: ReportSection[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    description: 'One-page overview of PI program performance this quarter.',
    items: [
      'Overall simulation CI program impact statement',
      'Key metrics achieved (e.g., "30% reduction in code response time")',
      'Projects completed and in progress',
      'Critical issues and resolutions'
    ]
  },
  {
    id: 'project-outcomes',
    title: 'Project Outcomes and Benefits',
    description: 'Results from completed or major milestone projects.',
    items: [
      'Before vs After metrics for each project',
      'Patient safety outcomes (adverse events prevented)',
      'Quality metric improvements (compliance rates)',
      'Operational/financial impact estimates',
      'Staff/cultural benefits (confidence, engagement)'
    ]
  },
  {
    id: 'active-projects',
    title: 'Active Projects Status',
    description: 'Current state of ongoing improvement initiatives.',
    items: [
      'Project name and DMAIC phase',
      'Key milestones achieved this quarter',
      'Barriers and support needed',
      'Expected completion timeline'
    ]
  },
  {
    id: 'pipeline',
    title: 'Improvement Pipeline',
    description: 'Upcoming opportunities and prioritization.',
    items: [
      'New opportunities identified this quarter',
      'Prioritization scores and rankings',
      'Projects selected for next quarter',
      'Resource requirements'
    ]
  },
  {
    id: 'lessons-learned',
    title: 'Lessons Learned',
    description: 'Insights and best practices from project work.',
    items: [
      'What worked well',
      'Challenges encountered',
      'Process improvements for PI system itself',
      'Knowledge to share with broader organization'
    ]
  }
]

// Example Improvement Projects
export const EXAMPLE_PROJECTS = [
  {
    id: 'sepsis',
    name: 'Sepsis Bundle Compliance Improvement',
    signal: 'Sepsis bundle compliance at 60% (target 85%)',
    intervention: 'Simulation-based sepsis recognition training + EHR screening tool',
    result: 'Compliance improved to 90%, mortality reduced'
  },
  {
    id: 'rrt',
    name: 'Rapid Response Team Activation',
    signal: 'Delayed RRT calls, high code blue rate outside ICU',
    intervention: 'Calling criteria checklist + simulation training on deterioration recognition',
    result: 'Earlier RRT activation, 50% reduction in codes outside ICU'
  },
  {
    id: 'handoff',
    name: 'Handoff Communication Enhancement',
    signal: 'High information omission rate in handoffs',
    intervention: 'I-PASS implementation + simulation-based handoff workshops',
    result: 'Higher handoff completeness, fewer communication-related errors'
  },
  {
    id: 'stroke',
    name: 'Stroke Code Time Improvement',
    signal: 'Door-to-needle time above benchmark',
    intervention: 'Regular stroke code simulations to streamline process',
    result: 'Door-to-needle time reduced by 11 minutes on average'
  }
]

// Helper functions
export function getPhaseById(id: string): PIPhase | undefined {
  return PI_PHASES.find(p => p.id === id)
}

export function calculatePriorityScore(scores: Record<string, number>): number {
  let total = 0
  let maxPossible = 0
  PRIORITIZATION_CRITERIA.forEach(criterion => {
    const score = scores[criterion.id] || 0
    total += score * criterion.weight
    maxPossible += 5 * criterion.weight
  })
  return Math.round((total / maxPossible) * 100)
}

export function getStats() {
  return {
    phases: PI_PHASES.length,
    safetySignals: SAFETY_SIGNALS.length,
    prioritizationCriteria: PRIORITIZATION_CRITERIA.length,
    standardWorkDocs: STANDARD_WORK.length
  }
}
