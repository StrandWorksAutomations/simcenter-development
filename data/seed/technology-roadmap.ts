// Technology Roadmap Data
// Prompt 22: 3-5 year technology roadmap with controlled pilots

export interface TechInitiative {
  id: string
  name: string
  shortName: string
  description: string
  icon: string
  benefits: string[]
  risks: string[]
  years: {
    year: number
    phase: string
    activities: string[]
  }[]
}

export interface BudgetTier {
  tier: string
  range: string
  description: string
}

export interface InitiativeBudget {
  id: string
  initiative: string
  basic: string
  intermediate: string
  moonshot: string
}

export interface EvaluationCriterion {
  id: string
  name: string
  description: string
  metrics: string[]
  threshold: string
}

export interface GovernanceRole {
  role: string
  description: string
  responsibilities: string[]
}

// Technology Initiatives
export const TECH_INITIATIVES: TechInitiative[] = [
  {
    id: 'av-analytics',
    name: 'Audio-Visual System & Analytics',
    shortName: 'A/V Analytics',
    description: 'Secure video capture, live streaming, data tagging, and performance analytics for debriefing.',
    icon: 'Video',
    benefits: [
      'Enhanced debriefing with video review',
      'Performance trend tracking',
      'Data-driven curriculum improvement',
      'Remote observation capability'
    ],
    risks: [
      'Privacy and confidentiality concerns',
      'Storage and security requirements',
      'Faculty training needed'
    ],
    years: [
      {
        year: 1,
        phase: 'Foundation',
        activities: [
          'Survey A/V solutions (SimCapture, LearningSpace)',
          'Install basic A/V recording (cameras, mics, monitor feed)',
          'Establish secure storage on hospital network',
          'Define key metrics to track'
        ]
      },
      {
        year: 2,
        phase: 'Pilot',
        activities: [
          'Enable video annotation and performance flags',
          'Train faculty on A/V debriefing',
          'Collect quantitative and qualitative data',
          'Conduct privacy compliance audit'
        ]
      },
      {
        year: 3,
        phase: 'Validation',
        activities: [
          'Evaluate faculty and learner feedback',
          'Analyze usage analytics and improvements',
          'Verify security compliance',
          'Decision point: scale-up or adjust'
        ]
      },
      {
        year: 4,
        phase: 'Scale-Up',
        activities: [
          'Expand to all simulation activities',
          'Integrate simulator data into recordings',
          'Produce regular analytics reports',
          'Pilot AI-driven video analysis'
        ]
      },
      {
        year: 5,
        phase: 'Optimization',
        activities: [
          'Full operational integration',
          'Continuous monitoring and improvement',
          'Explore next-gen A/V (360°, biometrics)',
          'AI analytics expansion if validated'
        ]
      }
    ]
  },
  {
    id: 'vr-ar',
    name: 'VR/AR Simulation',
    shortName: 'VR/AR',
    description: 'Virtual and augmented reality for immersive training complementing mannequin simulation.',
    icon: 'Glasses',
    benefits: [
      'Immersive, risk-free practice',
      'Rare scenario exposure',
      'Individual skills practice before team sims',
      'Scalable training delivery'
    ],
    risks: [
      'High initial investment',
      'Technology learning curve',
      'Hardware maintenance',
      'Motion sickness concerns'
    ],
    years: [
      {
        year: 1,
        phase: 'Horizon Scan',
        activities: [
          'Research medical VR platforms (SimX, Oxford)',
          'Host demos with single VR headset',
          'Assess IT security requirements',
          'Identify use cases complementing SimMan'
        ]
      },
      {
        year: 2,
        phase: 'Pilot',
        activities: [
          'Launch 1-2 VR scenarios (e.g., code blue)',
          'Purchase 2-3 VR headsets',
          'Train VR champion faculty',
          'Test AR application on SimMan'
        ]
      },
      {
        year: 3,
        phase: 'Evaluate',
        activities: [
          'Collect performance and feedback data',
          'Compare outcomes vs traditional sim',
          'Technical and security assessment',
          'Decision: scale up or replace'
        ]
      },
      {
        year: 4,
        phase: 'Scale-Up',
        activities: [
          'Deploy VR scenarios across departments',
          'Establish VR as prep before team sims',
          'Develop SOPs for equipment',
          'Expand AR if validated'
        ]
      },
      {
        year: 5,
        phase: 'Full Program',
        activities: [
          'Blended sim program (VR + physical)',
          'Remote VR training option',
          'Explore next-gen XR (haptics)',
          'Continuous outcome tracking'
        ]
      }
    ]
  },
  {
    id: 'ai-debrief',
    name: 'AI-Assisted Debriefing',
    shortName: 'AI Debrief',
    description: 'Artificial intelligence tools to support facilitators with objective feedback and insights.',
    icon: 'Brain',
    benefits: [
      'Objective performance analysis',
      'Reduced facilitator bias',
      'Automated event flagging',
      'Enhanced learning insights'
    ],
    risks: [
      'Technology maturity',
      'Privacy and data concerns',
      'Over-reliance on AI',
      'Algorithm bias'
    ],
    years: [
      {
        year: 1,
        phase: 'Explore',
        activities: [
          'Horizon scan AI debrief tools',
          'Engage faculty on pain points',
          'Align with INACSL standards',
          'Plan data governance approach'
        ]
      },
      {
        year: 2,
        phase: 'Pilot',
        activities: [
          'Small pilot with AI video/audio analysis',
          'Use AI to flag key moments',
          'Controlled use with experienced faculty',
          'Secure consent and privacy measures'
        ]
      },
      {
        year: 3,
        phase: 'Evaluate',
        activities: [
          'Assess impact on debrief quality',
          'Gather facilitator and learner feedback',
          'Ethical and bias review',
          'Decision: scale or retire'
        ]
      },
      {
        year: 4,
        phase: 'Scale/Pivot',
        activities: [
          'Integrate with A/V system if validated',
          'Train all facilitators on AI outputs',
          'Establish human oversight policies',
          'Continue monitoring'
        ]
      },
      {
        year: 5,
        phase: 'Advanced',
        activities: [
          'AI embedded in standard practice',
          'AI-generated session summaries',
          'Continuous evaluation',
          'Explore next-gen AI (adaptive scenarios)'
        ]
      }
    ]
  },
  {
    id: 'digital-docs',
    name: 'Digital Documentation & Competency Tracking',
    shortName: 'Competency Tracking',
    description: 'Digital systems to track simulation activities, performance, and competency attainment.',
    icon: 'Database',
    benefits: [
      'Longitudinal performance tracking',
      'Competency mapping',
      'Accreditation documentation',
      'Data-driven curriculum decisions'
    ],
    risks: [
      'Data privacy requirements',
      'Integration complexity',
      'User adoption challenges'
    ],
    years: [
      {
        year: 1,
        phase: 'Assessment',
        activities: [
          'Assess current documentation state',
          'Implement basic digital logging',
          'Research competency tracking platforms',
          'Define data governance requirements'
        ]
      },
      {
        year: 2,
        phase: 'Pilot',
        activities: [
          'Pilot competency tracking system',
          'Train faculty on data entry',
          'Set user permissions',
          'Treat data as confidential records'
        ]
      },
      {
        year: 3,
        phase: 'Evaluate',
        activities: [
          'Assess efficiency and insight gains',
          'Verify competency framework mapping',
          'Check data completeness',
          'Decision: roll out or refine'
        ]
      },
      {
        year: 4,
        phase: 'Scale-Up',
        activities: [
          'Roll out across all programs',
          'Integrate with hospital LMS',
          'Develop leadership dashboards',
          'Update policies for documentation'
        ]
      },
      {
        year: 5,
        phase: 'Ecosystem',
        activities: [
          'Competency hub operational',
          'Longitudinal performance views',
          'Accreditation-ready documentation',
          'Explore AI-driven gap prediction'
        ]
      }
    ]
  },
  {
    id: 'remote-participation',
    name: 'Remote Participation Platforms',
    shortName: 'Remote Sim',
    description: 'Enabling remote learners and instructors to participate in simulation activities.',
    icon: 'Globe',
    benefits: [
      'Extended training reach',
      'Multi-site collaboration',
      'Cost-effective delivery',
      'Flexibility for participants'
    ],
    risks: [
      'Engagement challenges',
      'Technical requirements',
      'Security of remote access'
    ],
    years: [
      {
        year: 1,
        phase: 'Groundwork',
        activities: [
          'Assess remote participation needs',
          'Ensure IT infrastructure support',
          'Set up secure video conferencing',
          'Establish privacy protocols'
        ]
      },
      {
        year: 2,
        phase: 'Pilot',
        activities: [
          'Pilot remote OSCE capability',
          'Run hybrid simulations',
          'Collect attendance and engagement data',
          'Enforce consent and confidentiality'
        ]
      },
      {
        year: 3,
        phase: 'Evaluate',
        activities: [
          'Compare remote vs in-person outcomes',
          'Assess security compliance',
          'Gather participant feedback',
          'Decision: scale or limit use'
        ]
      },
      {
        year: 4,
        phase: 'Scale-Up',
        activities: [
          'Formalize remote participation program',
          'Invest in enhanced equipment',
          'Combine with VR for remote immersion',
          'Develop facilitator guidelines'
        ]
      },
      {
        year: 5,
        phase: 'Enterprise',
        activities: [
          'Seamless remote connection',
          'Regional simulation network',
          'Continuous quality monitoring',
          'Explore mobile simulation units'
        ]
      }
    ]
  }
]

// Budget Tiers
export const INITIATIVE_BUDGETS: InitiativeBudget[] = [
  {
    id: 'av-analytics',
    initiative: 'A/V & Analytics',
    basic: '$150-300K - Basic recording, entry-level software',
    intermediate: '$500K-1M - Enterprise system, analytics dashboards',
    moonshot: '$2-3M - Command center with custom AI analytics'
  },
  {
    id: 'vr-ar',
    initiative: 'VR/AR Simulation',
    basic: '$50-100K - 2-4 headsets, off-the-shelf scenarios',
    intermediate: '$500K-1M - 10-15 headsets, custom scenarios, haptics',
    moonshot: '$3-5M - Virtual Simulation Center, full VR suite'
  },
  {
    id: 'ai-debrief',
    initiative: 'AI-Assisted Debriefing',
    basic: '$20-50K - Pilot subscription or consulting',
    intermediate: '$200-500K - Commercial platform, validation study',
    moonshot: '$1-3M - Custom AI engine, research partnership'
  },
  {
    id: 'digital-docs',
    initiative: 'Documentation & Competency',
    basic: '$50K - Basic LMS extension or database',
    intermediate: '$200-300K - Dedicated competency platform',
    moonshot: '$1-2M - Enterprise learning analytics'
  },
  {
    id: 'remote-participation',
    initiative: 'Remote Participation',
    basic: '$50K - Basic webcam, existing conferencing',
    intermediate: '$200-500K - Professional streaming, remote OSCE',
    moonshot: '$1-3M - Global simulation hub, mobile units'
  }
]

// Evaluation Criteria
export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: 'educational-impact',
    name: 'Educational Impact',
    description: 'Did the tool demonstrably enhance learning?',
    metrics: ['Pre/post assessment scores', 'Competency checklist completion', 'Confidence ratings'],
    threshold: 'Equal or improved outcomes vs traditional methods'
  },
  {
    id: 'user-experience',
    name: 'User Experience & Acceptance',
    description: 'Qualitative feedback from learners and instructors.',
    metrics: ['User satisfaction scores', 'Ease of use ratings', 'Engagement observations'],
    threshold: 'Majority positive feedback'
  },
  {
    id: 'workflow-fit',
    name: 'Integration & Workflow Fit',
    description: 'How well does the technology fit existing processes?',
    metrics: ['Setup/teardown time', 'Training hours required', 'Session disruptions'],
    threshold: 'Minimal disruption, improved efficiency'
  },
  {
    id: 'security-privacy',
    name: 'Data Security & Privacy',
    description: 'Strict adherence to hospital data policies.',
    metrics: ['Vulnerability assessment', 'Access control audit', 'Consent compliance'],
    threshold: 'Pass security audit - non-negotiable'
  },
  {
    id: 'financial-feasibility',
    name: 'Financial Feasibility (ROI)',
    description: 'Cost vs benefits analysis.',
    metrics: ['Initial and ongoing costs', 'Time savings', 'Capacity increase'],
    threshold: 'Payback within 5 years or clear value proposition'
  },
  {
    id: 'scalability',
    name: 'Scalability & Support',
    description: 'Can the tool scale reliably?',
    metrics: ['Vendor support quality', 'Multi-room performance', 'Training availability'],
    threshold: 'Clear scale-up plan and vendor commitment'
  }
]

// Governance Model
export const GOVERNANCE_ROLES: GovernanceRole[] = [
  {
    role: 'Simulation Program Director (Chair)',
    description: 'Strategic vision and alignment with hospital priorities',
    responsibilities: ['Chairs oversight committee', 'Ensures mission alignment', 'Champions pilots to leadership']
  },
  {
    role: 'Simulation Operations/Technical Lead',
    description: 'Practical implementation and equipment integration',
    responsibilities: ['Manages implementation', 'Ensures SimMan compatibility', 'Technical troubleshooting']
  },
  {
    role: 'Clinical Educators/Faculty Representatives',
    description: 'End-users providing educational perspective',
    responsibilities: ['Voice educational needs', 'Champion pilot use cases', 'Provide feedback on effectiveness']
  },
  {
    role: 'IT/Security Officer',
    description: 'Ensures IT policy and security compliance',
    responsibilities: ['Reviews data handling', 'Verifies HIPAA/security compliance', 'Conducts vulnerability assessments']
  },
  {
    role: 'Data Analyst/Research Consultant',
    description: 'Develops evaluation plans and ensures rigor',
    responsibilities: ['Identifies metrics', 'Ensures methodological rigor', 'Analyzes pilot results']
  }
]

// Pipeline Stages
export const PIPELINE_STAGES = [
  { id: 'horizon', name: 'Horizon Scanning', description: 'Research and identify potential technologies' },
  { id: 'selection', name: 'Pilot Selection', description: 'Score and approve limited pilots' },
  { id: 'pilot', name: 'Pilot Implementation', description: 'Controlled trial with defined metrics' },
  { id: 'validation', name: 'Validation/Evaluation', description: 'Assess against adoption criteria' },
  { id: 'decision', name: 'Scale/Retire Decision', description: 'Expand successful pilots or discontinue' }
]

// Helper functions
export function getInitiativeById(id: string): TechInitiative | undefined {
  return TECH_INITIATIVES.find(t => t.id === id)
}

export function getStats() {
  return {
    initiatives: TECH_INITIATIVES.length,
    evaluationCriteria: EVALUATION_CRITERIA.length,
    governanceRoles: GOVERNANCE_ROLES.length,
    pipelineStages: PIPELINE_STAGES.length
  }
}
