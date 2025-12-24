// Standards & Policy Framework Data
// Prompt 20: SSH/INACSL best practice + internal policy alignment

export interface PolicySection {
  id: string
  number: string
  title: string
  purpose: string
  scope: string
  keyElements: string[]
  standards: string[]
  icon: string
}

export interface PolicyTemplate {
  id: string
  title: string
  description: string
  sections: string[]
  owner: string
  reviewCycle: string
}

export interface ReviewCycleItem {
  id: string
  month: string
  activity: string
  responsible: string
  deliverable: string
}

export interface StandardAlignment {
  id: string
  standard: string
  source: string
  policySection: string
  requirements: string[]
}

// Table of Contents / Policy Sections
export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'introduction',
    number: '1',
    title: 'Introduction and Governance',
    purpose: 'Establish comprehensive framework for simulation-based education aligning with national standards and internal governance.',
    scope: 'All simulation activities, personnel, and participants across Baptist Health System.',
    keyElements: [
      'Governance and accountability structure',
      'Simulation Steering Committee oversight',
      'Alignment with SSH and INACSL standards',
      'Hospital policy integration',
      'Healthcare Simulationist Code of Ethics adherence'
    ],
    standards: ['SSH Accreditation', 'INACSL Healthcare Simulation Standards', 'Baptist Health Code of Conduct'],
    icon: 'Building2'
  },
  {
    id: 'scenario-development',
    number: '2',
    title: 'Scenario Development Workflow',
    purpose: 'Establish standardized workflow for developing simulation scenarios that are educationally sound and evidence-based.',
    scope: 'All simulation-based learning experiences developed within Baptist Health System.',
    keyElements: [
      'Needs assessment and objectives identification',
      'Scenario design with content and simulation experts',
      'Prebriefing and debriefing planning',
      'Pilot testing before implementation',
      'Review and approval process',
      'Scenario documentation and version control'
    ],
    standards: ['INACSL Simulation Design Standard', 'SSH Teaching/Education Standards'],
    icon: 'FileText'
  },
  {
    id: 'prebrief-debrief',
    number: '3',
    title: 'Prebriefing and Debriefing Standards',
    purpose: 'Establish standard procedures for prebriefing and debriefing to maximize learning outcomes.',
    scope: 'All simulation-based educational sessions in Baptist Health System.',
    keyElements: [
      'Orientation to environment and equipment',
      'Fiction contract establishment',
      'Learning objectives communication',
      'Structured debriefing (Reaction → Analysis → Summary)',
      'Advocacy-inquiry techniques',
      'Confidentiality reinforcement'
    ],
    standards: ['INACSL Prebriefing Standard', 'INACSL Debriefing Standard', 'DASH Framework'],
    icon: 'MessageCircle'
  },
  {
    id: 'psychological-safety',
    number: '4',
    title: 'Psychological Safety Protocols',
    purpose: 'Maintain psychologically safe learning environment where participants can engage and learn without fear.',
    scope: 'All participants in simulation activities including learners, facilitators, and observers.',
    keyElements: [
      'Confidentiality agreements signed by all',
      'Respectful environment enforcement',
      'Basic Assumption adoption',
      'Distress management protocols',
      'Safe word/pause mechanism',
      'Scenario content sensitivity review'
    ],
    standards: ['INACSL Professional Integrity Standard', 'Healthcare Simulationist Code of Ethics'],
    icon: 'Shield'
  },
  {
    id: 'assessment-validity',
    number: '5',
    title: 'Validity and Reliability of Assessments',
    purpose: 'Ensure simulation-based assessments are valid, reliable, and fair.',
    scope: 'All simulation activities used for formal assessment or evaluation purposes.',
    keyElements: [
      'Use of validated assessment tools (e.g., CCEI)',
      'Assessor training and calibration',
      'Standardization of scenarios',
      'Consistent testing conditions',
      'Reliability monitoring (inter-rater)',
      'Remediation and second attempt policies'
    ],
    standards: ['SSH Assessment Standards', 'INACSL Evaluation Standard', 'Messick Validity Framework'],
    icon: 'CheckCircle'
  },
  {
    id: 'video-recording',
    number: '6',
    title: 'Video Recording Governance',
    purpose: 'Govern video/audio recording use, protecting privacy and ensuring ethical use for education only.',
    scope: 'Any audiovisual recording of simulation scenarios, debriefings, or related activities.',
    keyElements: [
      'Consent requirements and documentation',
      'Recording purpose limitations (education only)',
      'Access control and authorization',
      'Storage security requirements',
      'Retention and destruction timelines',
      'Prohibited uses (social media, unauthorized sharing)'
    ],
    standards: ['HIPAA', 'Institutional Privacy Policies', 'SSH Confidentiality Standards'],
    icon: 'Video'
  },
  {
    id: 'data-retention',
    number: '7',
    title: 'Data Retention and Confidentiality',
    purpose: 'Define standards for simulation data storage, access, retention, and destruction.',
    scope: 'All simulation-related data including attendance, evaluations, video recordings, and assessments.',
    keyElements: [
      'Data classification (educational vs. research)',
      'Access authorization levels',
      'Retention periods by data type',
      'Secure storage requirements',
      'De-identification for research use',
      'Destruction protocols and documentation'
    ],
    standards: ['HIPAA', 'FERPA (if applicable)', 'Institutional Records Retention Policy'],
    icon: 'Database'
  },
  {
    id: 'faculty-qualifications',
    number: '8',
    title: 'Faculty Qualifications and Development',
    purpose: 'Define qualifications for simulation faculty and establish ongoing professional development.',
    scope: 'All simulation faculty including educators, facilitators, technicians, and support staff.',
    keyElements: [
      'Minimum qualifications for each role',
      'Onboarding and initial training requirements',
      'Ongoing professional development expectations',
      'Certification pathways (CHSE, CHSOS)',
      'Performance evaluation criteria',
      'Faculty development program'
    ],
    standards: ['SSH Faculty Development Standards', 'INACSL Facilitation Standard', 'CHSE/CHSOS Certification'],
    icon: 'GraduationCap'
  },
  {
    id: 'quality-assurance',
    number: '9',
    title: 'Simulation Quality Assurance Program',
    purpose: 'Establish QA program to monitor, evaluate, and continuously improve simulation quality.',
    scope: 'All simulation activities, scenarios, faculty performance, and program outcomes.',
    keyElements: [
      'Regular session observations and audits',
      'Participant feedback collection and analysis',
      'Scenario quality reviews',
      'Faculty performance reviews',
      'Outcome tracking and reporting',
      'Continuous improvement processes'
    ],
    standards: ['SSH Outcomes and Improvement Standards', 'INACSL Evaluation Standard'],
    icon: 'BarChart'
  },
  {
    id: 'annual-review',
    number: '10',
    title: 'Annual Review Cycle',
    purpose: 'Establish systematic annual review of all policies, procedures, and program components.',
    scope: 'All simulation program policies, scenarios, equipment, and operations.',
    keyElements: [
      'Annual policy review schedule',
      'Version control and change documentation',
      'Stakeholder input collection',
      'Standards compliance verification',
      'Approval and sign-off process',
      'Communication of updates'
    ],
    standards: ['SSH Documentation Standards', 'Institutional Policy Management'],
    icon: 'Calendar'
  }
]

// Policy Templates
export const POLICY_TEMPLATES: PolicyTemplate[] = [
  {
    id: 'confidentiality-agreement',
    title: 'Simulation Confidentiality Agreement',
    description: 'Template for participant confidentiality acknowledgment',
    sections: [
      'Purpose and scope of confidentiality',
      'Definition of confidential information',
      'Participant obligations',
      'Consequences of breach',
      'Signature and date'
    ],
    owner: 'Simulation Program Manager',
    reviewCycle: 'Annual'
  },
  {
    id: 'video-consent',
    title: 'Video Recording Consent Form',
    description: 'Consent form for video/audio recording during simulation',
    sections: [
      'Purpose of recording',
      'How recording will be used',
      'Who has access',
      'Retention period',
      'Right to withdraw consent',
      'Signature and date'
    ],
    owner: 'Simulation Program Manager',
    reviewCycle: 'Annual'
  },
  {
    id: 'scenario-template',
    title: 'Scenario Design Template',
    description: 'Standardized template for developing simulation scenarios',
    sections: [
      'Scenario title and version',
      'Learning objectives',
      'Target audience and level',
      'Patient case information',
      'Equipment and setup requirements',
      'Expected actions and progression',
      'Debriefing guide',
      'Author and approval signatures'
    ],
    owner: 'Simulation Educators',
    reviewCycle: 'Per scenario (minimum annual)'
  },
  {
    id: 'assessment-tool',
    title: 'Performance Assessment Rubric Template',
    description: 'Template for creating valid performance assessment tools',
    sections: [
      'Competencies being assessed',
      'Observable behaviors/actions',
      'Scoring criteria (scale definition)',
      'Critical actions identification',
      'Pass/fail criteria',
      'Assessor instructions',
      'Inter-rater calibration notes'
    ],
    owner: 'Assessment Lead',
    reviewCycle: 'Annual'
  },
  {
    id: 'qa-observation',
    title: 'QA Observation Form',
    description: 'Form for quality assurance observations of simulation sessions',
    sections: [
      'Session information',
      'Prebriefing quality elements',
      'Scenario execution elements',
      'Debriefing quality elements',
      'Overall rating',
      'Observer comments and recommendations',
      'Follow-up actions'
    ],
    owner: 'QA Committee',
    reviewCycle: 'Annual'
  }
]

// Annual Review Cycle
export const REVIEW_CYCLE: ReviewCycleItem[] = [
  {
    id: 'jan',
    month: 'January',
    activity: 'Strategic planning review',
    responsible: 'Simulation Director',
    deliverable: 'Annual goals and priorities document'
  },
  {
    id: 'feb',
    month: 'February',
    activity: 'Faculty qualifications audit',
    responsible: 'Simulation Manager',
    deliverable: 'Faculty credentials verification report'
  },
  {
    id: 'mar',
    month: 'March',
    activity: 'Scenario library review (1st quarter)',
    responsible: 'Simulation Educators',
    deliverable: 'Updated scenario inventory'
  },
  {
    id: 'apr',
    month: 'April',
    activity: 'Policy manual comprehensive review',
    responsible: 'Steering Committee',
    deliverable: 'Policy revision proposals'
  },
  {
    id: 'may',
    month: 'May',
    activity: 'Equipment and technology audit',
    responsible: 'Simulation Technician',
    deliverable: 'Equipment status and needs report'
  },
  {
    id: 'jun',
    month: 'June',
    activity: 'Mid-year outcomes review',
    responsible: 'Simulation Director',
    deliverable: 'Mid-year progress report'
  },
  {
    id: 'jul',
    month: 'July',
    activity: 'Professional development planning',
    responsible: 'Simulation Manager',
    deliverable: 'Training calendar for next year'
  },
  {
    id: 'aug',
    month: 'August',
    activity: 'Video governance and data retention audit',
    responsible: 'Simulation Manager',
    deliverable: 'Data inventory and destruction log'
  },
  {
    id: 'sep',
    month: 'September',
    activity: 'Assessment tools validity review',
    responsible: 'Assessment Lead',
    deliverable: 'Tool effectiveness report'
  },
  {
    id: 'oct',
    month: 'October',
    activity: 'QA program annual review',
    responsible: 'QA Committee',
    deliverable: 'QA annual report'
  },
  {
    id: 'nov',
    month: 'November',
    activity: 'Budget and resource planning',
    responsible: 'Simulation Director',
    deliverable: 'Budget proposal for next fiscal year'
  },
  {
    id: 'dec',
    month: 'December',
    activity: 'Annual program report and goal setting',
    responsible: 'Steering Committee',
    deliverable: 'Annual report and next year objectives'
  }
]

// Standards Alignment Matrix
export const STANDARDS_ALIGNMENT: StandardAlignment[] = [
  {
    id: 'ssh-teaching',
    standard: 'SSH Teaching/Education Standards',
    source: 'Society for Simulation in Healthcare',
    policySection: 'Scenario Development, Prebrief/Debrief',
    requirements: [
      'Evidence-based scenario design',
      'Clear learning objectives',
      'Structured debriefing',
      'Trained facilitators'
    ]
  },
  {
    id: 'ssh-assessment',
    standard: 'SSH Assessment Standards',
    source: 'Society for Simulation in Healthcare',
    policySection: 'Assessment Validity & Reliability',
    requirements: [
      'Valid and reliable tools',
      'Trained assessors',
      'Consistent conditions',
      'Calibration processes'
    ]
  },
  {
    id: 'inacsl-design',
    standard: 'INACSL Simulation Design',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'Scenario Development',
    requirements: [
      'Needs assessment conducted',
      'Objectives align with outcomes',
      'Fidelity matches objectives',
      'Pilot testing before use'
    ]
  },
  {
    id: 'inacsl-prebrief',
    standard: 'INACSL Prebriefing',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'Prebriefing Standards',
    requirements: [
      'Establish psychological safety',
      'Orient to environment',
      'State objectives',
      'Establish fiction contract'
    ]
  },
  {
    id: 'inacsl-debrief',
    standard: 'INACSL Debriefing',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'Debriefing Standards',
    requirements: [
      'Structured debriefing process',
      'Facilitator training in debriefing',
      'All objectives addressed',
      'Learner-centered approach'
    ]
  },
  {
    id: 'inacsl-facilitation',
    standard: 'INACSL Facilitation',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'Faculty Qualifications',
    requirements: [
      'Qualified facilitators',
      'Ongoing training',
      'Content and simulation expertise',
      'Professional development'
    ]
  },
  {
    id: 'inacsl-evaluation',
    standard: 'INACSL Evaluation',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'QA Program, Assessments',
    requirements: [
      'Valid evaluation methods',
      'Formative and summative approaches',
      'Feedback to learners',
      'Program evaluation'
    ]
  },
  {
    id: 'inacsl-integrity',
    standard: 'INACSL Professional Integrity',
    source: 'INACSL Healthcare Simulation Standards',
    policySection: 'Psychological Safety, Confidentiality',
    requirements: [
      'Ethical conduct',
      'Confidentiality maintained',
      'Respect for learners',
      'Safe learning environment'
    ]
  }
]

// Helper functions
export function getSectionById(id: string): PolicySection | undefined {
  return POLICY_SECTIONS.find(s => s.id === id)
}

export function getStats() {
  return {
    policySections: POLICY_SECTIONS.length,
    policyTemplates: POLICY_TEMPLATES.length,
    reviewActivities: REVIEW_CYCLE.length,
    standardsAligned: STANDARDS_ALIGNMENT.length
  }
}
