// Accreditation Readiness Data
// Prompt 23: Gap analysis and multi-year closure plan

export interface AccreditationDomain {
  id: string
  name: string
  description: string
  icon: string
  standards: AccreditationStandard[]
}

export interface AccreditationStandard {
  id: string
  name: string
  description: string
  currentStatus: 'met' | 'partial' | 'gap'
  evidence: string[]
  actionItems: string[]
  targetYear: number
}

export interface ClosureActivity {
  id: string
  year: number
  quarter: string
  activity: string
  responsible: string
  deliverable: string
  domain: string
}

export interface EvidenceBinderSection {
  id: string
  section: string
  description: string
  documents: string[]
}

export interface MockSurveyMilestone {
  id: string
  monthsBefore: number
  activity: string
  description: string
}

// Accreditation Domains (SSH-aligned)
export const ACCREDITATION_DOMAINS: AccreditationDomain[] = [
  {
    id: 'mission-governance',
    name: 'Mission, Governance & Resources',
    description: 'Program mission, strategic alignment, governance structure, and resource adequacy.',
    icon: 'Building2',
    standards: [
      {
        id: 'mg-1',
        name: 'Mission Statement',
        description: 'Clear mission aligned with institutional goals and simulation best practices.',
        currentStatus: 'partial',
        evidence: ['Mission statement document', 'Strategic plan', 'Alignment with hospital mission'],
        actionItems: ['Finalize and approve mission statement', 'Document alignment with BHLEX goals'],
        targetYear: 0
      },
      {
        id: 'mg-2',
        name: 'Governance Structure',
        description: 'Defined oversight committee with executive sponsorship.',
        currentStatus: 'partial',
        evidence: ['Steering committee charter', 'Meeting minutes', 'Executive sponsor assignment'],
        actionItems: ['Formalize steering committee', 'Schedule regular meetings', 'Document roles'],
        targetYear: 0
      },
      {
        id: 'mg-3',
        name: 'Resource Allocation',
        description: 'Adequate budget, staffing, space, and equipment.',
        currentStatus: 'met',
        evidence: ['Budget documentation', 'Staffing plan', 'Space allocation', 'Equipment inventory'],
        actionItems: [],
        targetYear: 0
      }
    ]
  },
  {
    id: 'faculty-personnel',
    name: 'Faculty & Personnel',
    description: 'Qualified staff with ongoing professional development.',
    icon: 'Users',
    standards: [
      {
        id: 'fp-1',
        name: 'Faculty Qualifications',
        description: 'Minimum qualifications defined for all simulation roles.',
        currentStatus: 'partial',
        evidence: ['Job descriptions', 'Credential verification', 'Training records'],
        actionItems: ['Document qualification requirements', 'Verify current faculty credentials'],
        targetYear: 1
      },
      {
        id: 'fp-2',
        name: 'Professional Development',
        description: 'Ongoing training and development for simulation faculty.',
        currentStatus: 'gap',
        evidence: ['Training curriculum', 'Workshop attendance', 'Certification tracking'],
        actionItems: ['Create faculty development program', 'Schedule CHSE prep courses', 'Track certifications'],
        targetYear: 1
      },
      {
        id: 'fp-3',
        name: 'Performance Evaluation',
        description: 'Regular assessment of faculty teaching effectiveness.',
        currentStatus: 'gap',
        evidence: ['Evaluation forms', 'Peer review process', 'Participant feedback'],
        actionItems: ['Develop evaluation framework', 'Implement peer review', 'Collect feedback systematically'],
        targetYear: 2
      }
    ]
  },
  {
    id: 'curriculum-instruction',
    name: 'Curriculum & Instruction',
    description: 'Evidence-based curriculum design and instructional methods.',
    icon: 'BookOpen',
    standards: [
      {
        id: 'ci-1',
        name: 'Curriculum Framework',
        description: 'Structured curriculum with defined learning objectives.',
        currentStatus: 'partial',
        evidence: ['Curriculum map', 'Learning objectives', 'Competency alignment'],
        actionItems: ['Complete curriculum matrix', 'Map to competency frameworks'],
        targetYear: 1
      },
      {
        id: 'ci-2',
        name: 'Scenario Development',
        description: 'Standardized scenario design process with validation.',
        currentStatus: 'partial',
        evidence: ['Scenario templates', 'Review process', 'Pilot testing documentation'],
        actionItems: ['Finalize scenario template', 'Establish review committee', 'Document pilot process'],
        targetYear: 1
      },
      {
        id: 'ci-3',
        name: 'Debriefing Standards',
        description: 'Structured debriefing with trained facilitators.',
        currentStatus: 'partial',
        evidence: ['Debriefing model documentation', 'Facilitator training records', 'DASH alignment'],
        actionItems: ['Document debriefing model', 'Train all facilitators', 'Implement DASH self-assessment'],
        targetYear: 1
      }
    ]
  },
  {
    id: 'assessment-evaluation',
    name: 'Assessment & Evaluation',
    description: 'Valid and reliable assessment methods with outcome tracking.',
    icon: 'ClipboardCheck',
    standards: [
      {
        id: 'ae-1',
        name: 'Assessment Tools',
        description: 'Use of validated assessment instruments.',
        currentStatus: 'gap',
        evidence: ['Tool inventory', 'Validation documentation', 'IRR measurements'],
        actionItems: ['Select validated tools (CCEI, etc.)', 'Train assessors', 'Measure inter-rater reliability'],
        targetYear: 2
      },
      {
        id: 'ae-2',
        name: 'Outcome Tracking',
        description: 'Systematic collection and analysis of outcomes data.',
        currentStatus: 'partial',
        evidence: ['Data collection forms', 'Outcomes reports', 'Trend analysis'],
        actionItems: ['Implement tracking system', 'Generate regular reports', 'Link to quality metrics'],
        targetYear: 2
      },
      {
        id: 'ae-3',
        name: 'Program Evaluation',
        description: 'Regular evaluation of overall program effectiveness.',
        currentStatus: 'gap',
        evidence: ['Evaluation framework', 'Annual reports', 'Improvement plans'],
        actionItems: ['Create evaluation plan', 'Establish annual review process', 'Document improvements'],
        targetYear: 2
      }
    ]
  },
  {
    id: 'operations-management',
    name: 'Operations & Management',
    description: 'Efficient operations, scheduling, and resource management.',
    icon: 'Settings',
    standards: [
      {
        id: 'om-1',
        name: 'Policies & Procedures',
        description: 'Comprehensive policy manual covering all operations.',
        currentStatus: 'partial',
        evidence: ['Policy manual', 'SOPs', 'Annual review documentation'],
        actionItems: ['Complete policy manual', 'Establish review cycle', 'Distribute to staff'],
        targetYear: 1
      },
      {
        id: 'om-2',
        name: 'Scheduling System',
        description: 'Efficient scheduling and resource allocation.',
        currentStatus: 'met',
        evidence: ['Scheduling system', 'Utilization reports', 'Conflict resolution process'],
        actionItems: [],
        targetYear: 0
      },
      {
        id: 'om-3',
        name: 'Equipment Management',
        description: 'Maintenance, calibration, and inventory processes.',
        currentStatus: 'partial',
        evidence: ['Inventory lists', 'Maintenance logs', 'Calibration schedules'],
        actionItems: ['Implement maintenance tracking', 'Create calibration schedule', 'Document procedures'],
        targetYear: 1
      }
    ]
  },
  {
    id: 'quality-improvement',
    name: 'Quality Assurance & Improvement',
    description: 'Continuous quality monitoring and improvement processes.',
    icon: 'TrendingUp',
    standards: [
      {
        id: 'qi-1',
        name: 'QA Program',
        description: 'Structured quality assurance with regular audits.',
        currentStatus: 'partial',
        evidence: ['QA plan', 'Audit schedules', 'Observation forms'],
        actionItems: ['Implement QA observation program', 'Train auditors', 'Establish audit calendar'],
        targetYear: 2
      },
      {
        id: 'qi-2',
        name: 'Feedback Collection',
        description: 'Systematic participant and stakeholder feedback.',
        currentStatus: 'partial',
        evidence: ['Survey instruments', 'Feedback reports', 'Action taken documentation'],
        actionItems: ['Standardize feedback collection', 'Analyze trends', 'Document response to feedback'],
        targetYear: 1
      },
      {
        id: 'qi-3',
        name: 'Continuous Improvement',
        description: 'Evidence of ongoing improvement based on data.',
        currentStatus: 'gap',
        evidence: ['Improvement initiatives', 'Before/after data', 'PDSA cycles'],
        actionItems: ['Link QA to PI processes', 'Document improvement projects', 'Track outcomes'],
        targetYear: 2
      }
    ]
  }
]

// Year-by-Year Closure Plan
export const CLOSURE_ACTIVITIES: ClosureActivity[] = [
  // Year 0
  { id: 'y0-q1-1', year: 0, quarter: 'Q1', activity: 'Finalize mission and governance structure', responsible: 'Director', deliverable: 'Approved mission statement and committee charter', domain: 'Mission & Governance' },
  { id: 'y0-q2-1', year: 0, quarter: 'Q2', activity: 'Complete policy manual first draft', responsible: 'Manager', deliverable: 'Draft policy manual for review', domain: 'Operations' },
  { id: 'y0-q3-1', year: 0, quarter: 'Q3', activity: 'Implement basic tracking systems', responsible: 'Tech Lead', deliverable: 'Digital logging operational', domain: 'Assessment' },
  { id: 'y0-q4-1', year: 0, quarter: 'Q4', activity: 'Conduct initial self-assessment', responsible: 'Director', deliverable: 'Gap analysis document', domain: 'All' },

  // Year 1
  { id: 'y1-q1-1', year: 1, quarter: 'Q1', activity: 'Faculty qualifications audit', responsible: 'Manager', deliverable: 'Credentials verification report', domain: 'Faculty' },
  { id: 'y1-q1-2', year: 1, quarter: 'Q1', activity: 'Launch faculty development program', responsible: 'Educators', deliverable: 'Training curriculum and schedule', domain: 'Faculty' },
  { id: 'y1-q2-1', year: 1, quarter: 'Q2', activity: 'Complete curriculum framework', responsible: 'Educators', deliverable: 'Curriculum matrix approved', domain: 'Curriculum' },
  { id: 'y1-q2-2', year: 1, quarter: 'Q2', activity: 'Finalize scenario templates', responsible: 'Educators', deliverable: 'Standardized scenario library', domain: 'Curriculum' },
  { id: 'y1-q3-1', year: 1, quarter: 'Q3', activity: 'Train all facilitators on debriefing', responsible: 'Educators', deliverable: 'Training completion records', domain: 'Curriculum' },
  { id: 'y1-q3-2', year: 1, quarter: 'Q3', activity: 'Implement feedback collection system', responsible: 'Manager', deliverable: 'Survey process operational', domain: 'Quality' },
  { id: 'y1-q4-1', year: 1, quarter: 'Q4', activity: 'Policy manual approval and distribution', responsible: 'Director', deliverable: 'Approved policy manual', domain: 'Operations' },
  { id: 'y1-q4-2', year: 1, quarter: 'Q4', activity: 'Equipment management system implementation', responsible: 'Tech Lead', deliverable: 'Maintenance tracking active', domain: 'Operations' },

  // Year 2
  { id: 'y2-q1-1', year: 2, quarter: 'Q1', activity: 'Faculty peer review program launch', responsible: 'Educators', deliverable: 'Peer review process documented', domain: 'Faculty' },
  { id: 'y2-q1-2', year: 2, quarter: 'Q1', activity: 'Assessment tool validation', responsible: 'Assessment Lead', deliverable: 'IRR measurements completed', domain: 'Assessment' },
  { id: 'y2-q2-1', year: 2, quarter: 'Q2', activity: 'QA observation program full implementation', responsible: 'QA Committee', deliverable: 'Audit schedule and reports', domain: 'Quality' },
  { id: 'y2-q2-2', year: 2, quarter: 'Q2', activity: 'Outcomes tracking system operational', responsible: 'Manager', deliverable: 'Dashboard and reports', domain: 'Assessment' },
  { id: 'y2-q3-1', year: 2, quarter: 'Q3', activity: 'Program evaluation framework implementation', responsible: 'Director', deliverable: 'Evaluation plan and first report', domain: 'Assessment' },
  { id: 'y2-q3-2', year: 2, quarter: 'Q3', activity: 'Assemble evidence binder', responsible: 'Manager', deliverable: 'Draft evidence binder', domain: 'All' },
  { id: 'y2-q4-1', year: 2, quarter: 'Q4', activity: 'Submit accreditation application', responsible: 'Director', deliverable: 'Application submitted', domain: 'All' },
  { id: 'y2-q4-2', year: 2, quarter: 'Q4', activity: 'Conduct mock survey', responsible: 'Director', deliverable: 'Mock survey report', domain: 'All' }
]

// Evidence Binder Structure
export const EVIDENCE_BINDER: EvidenceBinderSection[] = [
  {
    id: 'section-1',
    section: 'Section 1: Mission & Governance',
    description: 'Program mission, strategic alignment, and governance structure',
    documents: [
      'Mission statement',
      'Strategic plan',
      'Steering committee charter',
      'Meeting minutes (last 12 months)',
      'Executive sponsor documentation',
      'Organizational chart'
    ]
  },
  {
    id: 'section-2',
    section: 'Section 2: Faculty & Personnel',
    description: 'Staff qualifications and professional development',
    documents: [
      'Job descriptions for all roles',
      'Credential verification records',
      'Training and certification records',
      'CHSE/CHSOS certifications',
      'Performance evaluation forms',
      'Professional development plans'
    ]
  },
  {
    id: 'section-3',
    section: 'Section 3: Curriculum & Instruction',
    description: 'Curriculum design and instructional methods',
    documents: [
      'Curriculum matrix/map',
      'Scenario inventory',
      'Sample scenario documents (3-5)',
      'Scenario review process documentation',
      'Debriefing model documentation',
      'Prebriefing checklists'
    ]
  },
  {
    id: 'section-4',
    section: 'Section 4: Assessment & Evaluation',
    description: 'Assessment tools and program evaluation',
    documents: [
      'Assessment tool inventory',
      'Validation documentation',
      'IRR measurement reports',
      'Outcomes data reports',
      'Program evaluation framework',
      'Annual evaluation reports'
    ]
  },
  {
    id: 'section-5',
    section: 'Section 5: Operations & Management',
    description: 'Policies, procedures, and resource management',
    documents: [
      'Policy and procedure manual',
      'Equipment inventory',
      'Maintenance logs',
      'Scheduling system documentation',
      'Budget documentation',
      'Safety protocols'
    ]
  },
  {
    id: 'section-6',
    section: 'Section 6: Quality Improvement',
    description: 'QA program and continuous improvement',
    documents: [
      'QA observation program documentation',
      'Audit reports and schedules',
      'Participant feedback summaries',
      'Improvement initiative documentation',
      'PDSA cycle examples',
      'Before/after data'
    ]
  }
]

// Mock Survey Timeline
export const MOCK_SURVEY_TIMELINE: MockSurveyMilestone[] = [
  { id: 'ms-12', monthsBefore: 12, activity: 'Application Preparation', description: 'Gather all documentation, complete self-assessment, review standards alignment' },
  { id: 'ms-9', monthsBefore: 9, activity: 'Internal Audit', description: 'Conduct internal audit using accreditation criteria, identify remaining gaps' },
  { id: 'ms-6', monthsBefore: 6, activity: 'Submit Application', description: 'Submit official accreditation application with required documentation' },
  { id: 'ms-4', monthsBefore: 4, activity: 'Mock Survey Preparation', description: 'Prepare staff for mock survey, review interview questions, organize evidence' },
  { id: 'ms-3', monthsBefore: 3, activity: 'Mock Survey', description: 'Conduct mock survey with external reviewer or experienced internal team' },
  { id: 'ms-2', monthsBefore: 2, activity: 'Address Findings', description: 'Address any issues identified in mock survey, finalize documentation' },
  { id: 'ms-1', monthsBefore: 1, activity: 'Final Preparation', description: 'Final review of evidence binder, staff preparation, logistics planning' },
  { id: 'ms-0', monthsBefore: 0, activity: 'Actual Survey', description: 'Host accreditation survey team' }
]

// Helper functions
export function getDomainById(id: string): AccreditationDomain | undefined {
  return ACCREDITATION_DOMAINS.find(d => d.id === id)
}

export function getGapSummary() {
  let met = 0, partial = 0, gap = 0
  ACCREDITATION_DOMAINS.forEach(domain => {
    domain.standards.forEach(std => {
      if (std.currentStatus === 'met') met++
      else if (std.currentStatus === 'partial') partial++
      else gap++
    })
  })
  return { met, partial, gap, total: met + partial + gap }
}

export function getActivitiesByYear(year: number): ClosureActivity[] {
  return CLOSURE_ACTIVITIES.filter(a => a.year === year)
}

export function getStats() {
  const gapSummary = getGapSummary()
  return {
    domains: ACCREDITATION_DOMAINS.length,
    standards: gapSummary.total,
    met: gapSummary.met,
    gaps: gapSummary.gap,
    closureActivities: CLOSURE_ACTIVITIES.length,
    binderSections: EVIDENCE_BINDER.length
  }
}
