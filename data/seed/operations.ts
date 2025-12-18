// Operations Model Data
// Source: Prompt 9 - Scheduling, throughput, documentation, and reporting

// =============================================================================
// WORKFLOW STAGES
// =============================================================================

export interface WorkflowStage {
  id: string
  name: string
  description: string
  steps: string[]
  raciMatrix: RACIEntry[]
  kpis: string[]
}

export interface RACIEntry {
  role: string
  responsibility: 'R' | 'A' | 'C' | 'I' // Responsible, Accountable, Consulted, Informed
  description: string
}

export const workflows: WorkflowStage[] = [
  {
    id: 'intake',
    name: 'Request Intake & Scenario Selection',
    description: 'Formal request submission, triage, approval, and scenario identification',
    steps: [
      'Department submits Simulation Session Request Form',
      'Coordinator reviews request for feasibility and completeness',
      'Education Director approves/prioritizes request',
      'Scenario selected from library or developed with SME',
      'Scenario validated via pilot walkthrough'
    ],
    raciMatrix: [
      { role: 'Requesting Educator', responsibility: 'R', description: 'Initiates request, defines learning needs' },
      { role: 'Sim Coordinator', responsibility: 'R', description: 'Processes intake, checks resources' },
      { role: 'Education Director', responsibility: 'A', description: 'Approves sessions, sets priorities' },
      { role: 'Subject Matter Expert', responsibility: 'C', description: 'Reviews/develops scenario content' }
    ],
    kpis: ['Requests per month', 'Approval rate', 'Lead time (days)', 'Scenarios by department']
  },
  {
    id: 'scheduling',
    name: 'Scheduling & Resource Allocation',
    description: 'Master schedule management, room/equipment booking, throughput optimization',
    steps: [
      'Session placed on master schedule (date, time, room)',
      'Manikin and equipment reserved for session',
      'Personnel assigned (tech, SP actors if needed)',
      'Confirmation sent to requestor with details',
      '30-minute buffer scheduled between sessions for reset'
    ],
    raciMatrix: [
      { role: 'Sim Coordinator', responsibility: 'R', description: 'Creates/maintains schedule' },
      { role: 'Education Director', responsibility: 'A', description: 'Sets utilization targets' },
      { role: 'Requesting Educator', responsibility: 'I', description: 'Receives confirmation' },
      { role: 'Sim Tech', responsibility: 'C', description: 'Confirms availability for assignment' }
    ],
    kpis: ['Utilization rate (%)', 'Sessions conducted vs canceled', 'On-time start %', 'Cancellation rate with reasons']
  },
  {
    id: 'prebrief',
    name: 'Prebrief & Session Execution',
    description: 'Pre-simulation briefing, scenario execution, time and safety management',
    steps: [
      'Facilitator conducts prebrief (orientation, fiction contract, safety)',
      'Sim tech readies manikin and props per run sheet',
      'Scenario executed per timeline with event triggers',
      'Facilitator provides nudges/cues if learners stuck',
      'Safety and infection control maintained throughout'
    ],
    raciMatrix: [
      { role: 'Facilitator', responsibility: 'R', description: 'Conducts prebrief, guides scenario' },
      { role: 'Sim Tech', responsibility: 'R', description: 'Operates manikins/AV, triggers events' },
      { role: 'Learners', responsibility: 'R', description: 'Engage actively in scenario' },
      { role: 'Standardized Patient', responsibility: 'R', description: 'Performs assigned role' }
    ],
    kpis: ['Simulation hours delivered', 'Equipment utilization (hrs/manikin)', 'Incidents/deviations noted']
  },
  {
    id: 'debrief',
    name: 'Debriefing Process',
    description: 'Structured reflection using evidence-based debrief models',
    steps: [
      'Reactions Phase: Allow immediate emotional response',
      'Analysis Phase: Guided reflection on key events',
      'Summary Phase: Tie back to objectives, action items',
      'Video playback used if applicable (supportive, non-punitive)',
      'Confidentiality reminder at close'
    ],
    raciMatrix: [
      { role: 'Facilitator', responsibility: 'R', description: 'Leads debrief discussion' },
      { role: 'Co-Facilitator', responsibility: 'R', description: 'Supports with observations/notes' },
      { role: 'Learners', responsibility: 'R', description: 'Actively reflect and discuss' },
      { role: 'Sim Tech', responsibility: 'C', description: 'Assists with video playback' }
    ],
    kpis: ['Learner satisfaction scores', 'Debrief attendance rate', 'Video playback usage %']
  },
  {
    id: 'documentation',
    name: 'Documentation & Data Capture',
    description: 'Standardized forms for every session, evaluation capture, record keeping',
    steps: [
      'Session Plan/Run Sheet prepared before session',
      'Attendance and participation logged',
      'Debrief Record completed post-session',
      'Evaluation/assessment forms completed (if formal)',
      'Feedback surveys deployed to learners'
    ],
    raciMatrix: [
      { role: 'Sim Tech', responsibility: 'R', description: 'Prepares templates, maintains records' },
      { role: 'Facilitator', responsibility: 'R', description: 'Completes assessments, debrief notes' },
      { role: 'Education Director', responsibility: 'A', description: 'Ensures system meets accreditation' },
      { role: 'Learners', responsibility: 'R', description: 'Complete feedback surveys' }
    ],
    kpis: ['Documentation completeness %', 'Form return rate', 'Assessment scores captured']
  },
  {
    id: 'reporting',
    name: 'Post-Session Reporting',
    description: 'Consolidate metrics, share with stakeholders, close feedback loop',
    steps: [
      'Post-Session Report generated (summary, outcomes, feedback)',
      'Report shared with department manager and Education Director',
      'Individual feedback provided to learners (if formal assessment)',
      'Issues/suggestions logged for continuous improvement',
      'Report delivered within X days of session'
    ],
    raciMatrix: [
      { role: 'Sim Coordinator', responsibility: 'R', description: 'Drafts and disseminates report' },
      { role: 'Facilitator', responsibility: 'C', description: 'Verifies accuracy of summary' },
      { role: 'Department Manager', responsibility: 'I', description: 'Receives report on staff training' },
      { role: 'Education Director', responsibility: 'A', description: 'Acts on systemic issues' }
    ],
    kpis: ['Learner satisfaction avg', 'Action items closure rate', 'Reporting timeliness']
  },
  {
    id: 'video-governance',
    name: 'Video Recording & Governance',
    description: 'Consent, storage, access control, retention policies for AV data',
    steps: [
      'Consent obtained prior to recording (confidentiality form)',
      'Cameras/mics positioned, recording started at session start',
      'Videos stored on secure server with role-based access',
      'Retention period enforced (30-90 days default)',
      'Audit trails maintained for all access'
    ],
    raciMatrix: [
      { role: 'Sim Tech', responsibility: 'R', description: 'Recording setup, labeling, storage' },
      { role: 'Facilitator', responsibility: 'R', description: 'Uses video ethically for teaching' },
      { role: 'Education Director', responsibility: 'A', description: 'Enforces video governance policy' },
      { role: 'IT/Security', responsibility: 'C', description: 'Ensures data security compliance' }
    ],
    kpis: ['Video access frequency', 'Storage utilization', 'Deletion policy compliance', 'Consent form completion rate']
  }
]

// =============================================================================
// KEY PERFORMANCE INDICATORS
// =============================================================================

export interface KPIDefinition {
  id: string
  category: string
  name: string
  description: string
  formula?: string
  target?: string
  unit: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly'
}

export const kpiDefinitions: KPIDefinition[] = [
  // Volume & Utilization
  { id: 'kpi-1', category: 'Volume', name: 'Total Sessions', description: 'Number of simulation sessions conducted', unit: 'sessions', frequency: 'monthly', target: '12-16/month' },
  { id: 'kpi-2', category: 'Volume', name: 'Learner-Hours', description: 'Sum of (session duration × participants)', unit: 'hours', frequency: 'monthly' },
  { id: 'kpi-3', category: 'Utilization', name: 'Room Utilization Rate', description: 'Percentage of available hours booked', formula: '(Hours used / Available hours) × 100', unit: '%', frequency: 'monthly', target: '70-85%' },
  { id: 'kpi-4', category: 'Utilization', name: 'Equipment Utilization', description: 'Hours of use per manikin', unit: 'hours/manikin', frequency: 'monthly' },

  // Efficiency
  { id: 'kpi-5', category: 'Efficiency', name: 'On-Time Start Rate', description: 'Sessions starting within 5 min of scheduled time', unit: '%', frequency: 'monthly', target: '≥90%' },
  { id: 'kpi-6', category: 'Efficiency', name: 'Cancellation Rate', description: 'Sessions canceled as % of scheduled', unit: '%', frequency: 'monthly', target: '<10%' },
  { id: 'kpi-7', category: 'Efficiency', name: 'Turnaround Time', description: 'Average time between sessions for reset', unit: 'minutes', frequency: 'monthly', target: '≤30 min' },

  // Quality
  { id: 'kpi-8', category: 'Quality', name: 'Learner Satisfaction', description: 'Average post-sim survey score', unit: '1-5 scale', frequency: 'monthly', target: '≥4.5' },
  { id: 'kpi-9', category: 'Quality', name: 'Objectives Met Rate', description: '% of sessions where objectives fully achieved', unit: '%', frequency: 'monthly', target: '≥90%' },
  { id: 'kpi-10', category: 'Quality', name: 'Facilitator Rating', description: 'Faculty satisfaction with sim center support', unit: '1-5 scale', frequency: 'quarterly' },

  // Outcomes
  { id: 'kpi-11', category: 'Outcomes', name: 'Competency Pass Rate', description: 'Pass rate on assessed scenarios', unit: '%', frequency: 'quarterly', target: '≥85%' },
  { id: 'kpi-12', category: 'Outcomes', name: 'Skills Improvement', description: 'Average improvement in repeat assessments', unit: '% improvement', frequency: 'quarterly' },

  // Operational
  { id: 'kpi-13', category: 'Operational', name: 'Documentation Completeness', description: '% of sessions with all forms complete', unit: '%', frequency: 'monthly', target: '100%' },
  { id: 'kpi-14', category: 'Operational', name: 'Equipment Downtime', description: 'Hours of equipment out of service', unit: 'hours', frequency: 'monthly', target: '<4 hrs' },
  { id: 'kpi-15', category: 'Operational', name: 'Report Timeliness', description: '% of reports sent within 3 days', unit: '%', frequency: 'monthly', target: '100%' }
]

// =============================================================================
// TEMPLATES
// =============================================================================

export interface DocumentTemplate {
  id: string
  name: string
  purpose: string
  fields: TemplateField[]
}

export interface TemplateField {
  name: string
  type: 'text' | 'date' | 'select' | 'number' | 'textarea' | 'checkbox'
  required: boolean
  options?: string[]
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'template-1',
    name: 'Simulation Session Request Form',
    purpose: 'Used by educators/departments to request a simulation',
    fields: [
      { name: 'Requestor Name', type: 'text', required: true },
      { name: 'Department/Unit', type: 'text', required: true },
      { name: 'Contact Email', type: 'text', required: true },
      { name: 'Learner Group', type: 'textarea', required: true },
      { name: 'Number of Participants', type: 'number', required: true },
      { name: 'Learning Objectives (3-5)', type: 'textarea', required: true },
      { name: 'Scenario Preference', type: 'select', required: false, options: ['From Library', 'New Development Needed', 'No Preference'] },
      { name: 'Preferred Date/Time', type: 'date', required: true },
      { name: 'Location', type: 'select', required: true, options: ['Simulation Center', 'In-Situ (On Unit)'] },
      { name: 'Manikin Needed', type: 'select', required: true, options: ['Adult', 'OB/Birthing', 'Pediatric', 'Neonate', 'Task Trainer'] },
      { name: 'Special Equipment', type: 'textarea', required: false },
      { name: 'Lead Facilitator', type: 'text', required: true },
      { name: 'Manager Approval', type: 'checkbox', required: true }
    ]
  },
  {
    id: 'template-2',
    name: 'Scenario Run Sheet / Facilitator Guide',
    purpose: 'Prepared by sim staff, used during scenario execution',
    fields: [
      { name: 'Scenario Title & ID', type: 'text', required: true },
      { name: 'Target Learner Level', type: 'text', required: true },
      { name: 'Learning Objectives', type: 'textarea', required: true },
      { name: 'Case Summary (given to learners)', type: 'textarea', required: true },
      { name: 'Initial Setup (vitals, IV, props)', type: 'textarea', required: true },
      { name: 'Personnel Roles', type: 'textarea', required: true },
      { name: 'Timeline of Events', type: 'textarea', required: true },
      { name: 'Critical Actions Checklist', type: 'textarea', required: true },
      { name: 'Debrief Focus Points', type: 'textarea', required: true },
      { name: 'Equipment Checklist', type: 'textarea', required: true },
      { name: 'Safety Considerations', type: 'textarea', required: true }
    ]
  },
  {
    id: 'template-3',
    name: 'Debriefing Record Form',
    purpose: 'Documents post-simulation debrief and outcomes',
    fields: [
      { name: 'Session Date', type: 'date', required: true },
      { name: 'Scenario Name', type: 'text', required: true },
      { name: 'Facilitator(s)', type: 'text', required: true },
      { name: 'Sim Tech', type: 'text', required: true },
      { name: 'Participants (or attach list)', type: 'textarea', required: true },
      { name: 'Debrief Start Time', type: 'text', required: true },
      { name: 'Duration (minutes)', type: 'number', required: true },
      { name: 'Debrief Method', type: 'select', required: true, options: ['Plus/Delta', 'PEARLS', 'Advocacy-Inquiry', 'GAS', 'Other'] },
      { name: 'What Went Well', type: 'textarea', required: true },
      { name: 'Areas for Improvement', type: 'textarea', required: true },
      { name: 'Notable Learner Reflections', type: 'textarea', required: false },
      { name: 'Facilitator Notes', type: 'textarea', required: false },
      { name: 'Follow-up Actions', type: 'textarea', required: false },
      { name: 'Facilitator Signature', type: 'checkbox', required: true }
    ]
  },
  {
    id: 'template-4',
    name: 'Post-Session Summary Report',
    purpose: 'Concise report for stakeholders (department heads, education director)',
    fields: [
      { name: 'Session Overview', type: 'text', required: true },
      { name: 'Date', type: 'date', required: true },
      { name: 'Scenario', type: 'text', required: true },
      { name: 'Department', type: 'text', required: true },
      { name: 'Participant Count', type: 'number', required: true },
      { name: 'Objectives Achieved', type: 'select', required: true, options: ['All Met', 'Partially Met', 'Not Met'] },
      { name: 'Narrative Summary', type: 'textarea', required: true },
      { name: 'Skills Performance', type: 'textarea', required: true },
      { name: 'Teamwork Assessment', type: 'textarea', required: false },
      { name: 'Scoring Results (if applicable)', type: 'text', required: false },
      { name: 'Learner Feedback Summary', type: 'textarea', required: true },
      { name: 'Recommendations/Actions', type: 'textarea', required: true },
      { name: 'Prepared By', type: 'text', required: true }
    ]
  }
]

// =============================================================================
// MONTHLY OPS REVIEW AGENDA
// =============================================================================

export interface ReviewAgendaItem {
  id: string
  topic: string
  description: string
  owner: string
  duration: string
}

export const monthlyReviewAgenda: ReviewAgendaItem[] = [
  { id: 'agenda-1', topic: 'Metrics Review', description: 'Review dashboard: utilization, volume, cancellations, on-time starts', owner: 'Sim Coordinator', duration: '15 min' },
  { id: 'agenda-2', topic: 'Feedback Analysis', description: 'Summarize learner and faculty feedback trends', owner: 'Sim Coordinator', duration: '10 min' },
  { id: 'agenda-3', topic: 'Problem Discussion', description: 'Address cancellations, equipment issues, scheduling bottlenecks', owner: 'All', duration: '15 min' },
  { id: 'agenda-4', topic: 'Action Item Review', description: 'Check progress on previous meeting action items', owner: 'Education Director', duration: '10 min' },
  { id: 'agenda-5', topic: 'Upcoming Planning', description: 'Preview next month schedule, high-profile events, resource needs', owner: 'Sim Coordinator', duration: '10 min' },
  { id: 'agenda-6', topic: 'New Initiatives', description: 'Discuss new programs, research projects, community outreach', owner: 'Education Director', duration: '10 min' },
  { id: 'agenda-7', topic: 'Assignments', description: 'Assign RACI for any new initiatives or changes', owner: 'All', duration: '5 min' }
]

// =============================================================================
// DASHBOARD METRICS
// =============================================================================

export interface DashboardMetric {
  id: string
  name: string
  currentValue: number | string
  previousValue: number | string
  target: number | string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
}

// Sample dashboard data (would be dynamic in real implementation)
export const sampleDashboardMetrics: DashboardMetric[] = [
  { id: 'dm-1', name: 'Sessions This Month', currentValue: 14, previousValue: 12, target: 16, trend: 'up', status: 'good' },
  { id: 'dm-2', name: 'Room Utilization', currentValue: '72%', previousValue: '68%', target: '75%', trend: 'up', status: 'good' },
  { id: 'dm-3', name: 'On-Time Starts', currentValue: '88%', previousValue: '85%', target: '90%', trend: 'up', status: 'warning' },
  { id: 'dm-4', name: 'Learner Satisfaction', currentValue: 4.7, previousValue: 4.5, target: 4.5, trend: 'up', status: 'good' },
  { id: 'dm-5', name: 'Cancellation Rate', currentValue: '8%', previousValue: '12%', target: '10%', trend: 'down', status: 'good' },
  { id: 'dm-6', name: 'Documentation Complete', currentValue: '100%', previousValue: '95%', target: '100%', trend: 'up', status: 'good' }
]

// =============================================================================
// STAFFING ROLES
// =============================================================================

export interface OperationalRole {
  id: string
  title: string
  responsibilities: string[]
  qualifications: string[]
  fte: number
}

export const operationalRoles: OperationalRole[] = [
  {
    id: 'role-1',
    title: 'Simulation Center Director / Education Director',
    responsibilities: [
      'Strategic oversight and program development',
      'Approve session requests and priorities',
      'Ensure accreditation standards met',
      'Chair monthly operations review',
      'Report to senior leadership on outcomes'
    ],
    qualifications: ['Clinical background (MD, RN, or equivalent)', 'Simulation certification preferred', 'Leadership experience'],
    fte: 0.5
  },
  {
    id: 'role-2',
    title: 'Simulation Coordinator / Operations Specialist',
    responsibilities: [
      'Process intake requests and manage master schedule',
      'Prepare documentation templates and reports',
      'Track KPIs and maintain dashboards',
      'Coordinate with departments and facilitators',
      'Manage standardized patient program'
    ],
    qualifications: ['Bachelor degree preferred', 'Strong organizational skills', 'Experience with scheduling systems'],
    fte: 1.0
  },
  {
    id: 'role-3',
    title: 'Simulation Technician / Specialist',
    responsibilities: [
      'Setup and operate manikins and AV equipment',
      'Maintain and troubleshoot equipment',
      'Voice patients during scenarios',
      'Manage video recording and storage',
      'Room reset between sessions'
    ],
    qualifications: ['Technical aptitude', 'CHSOS certification preferred', 'Experience with simulation equipment'],
    fte: 1.0
  },
  {
    id: 'role-4',
    title: 'Facilitator / Clinical Educator',
    responsibilities: [
      'Conduct prebrief and debrief sessions',
      'Guide scenario execution',
      'Complete assessment checklists',
      'Provide learner feedback',
      'Contribute to scenario development'
    ],
    qualifications: ['Clinical expertise in specialty area', 'Simulation facilitation training', 'Debriefing skills'],
    fte: 0.0 // Faculty pool, not dedicated
  }
]

// =============================================================================
// SUMMARY FUNCTIONS
// =============================================================================

export function getOperationsSummary() {
  return {
    workflows: workflows.length,
    kpis: kpiDefinitions.length,
    templates: documentTemplates.length,
    roles: operationalRoles.length,
    reviewAgendaItems: monthlyReviewAgenda.length,
    kpiCategories: [...new Set(kpiDefinitions.map(k => k.category))].length,
    totalFTE: operationalRoles.reduce((sum, r) => sum + r.fte, 0)
  }
}

export function getKPIsByCategory(category: string): KPIDefinition[] {
  return kpiDefinitions.filter(k => k.category === category)
}

export function getWorkflowRACI(workflowId: string): RACIEntry[] {
  const workflow = workflows.find(w => w.id === workflowId)
  return workflow?.raciMatrix || []
}
