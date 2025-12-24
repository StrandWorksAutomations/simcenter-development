// Strategic Plan Data
// Prompt 19: 3-5 year simulation program strategic plan aligned to BHLEX metrics

export interface GuidingPrinciple {
  id: string
  name: string
  description: string
  icon: string
}

export interface AnnualPriority {
  id: string
  year: string
  theme: string
  description: string
  priorities: string[]
}

export interface Milestone {
  id: string
  quarter: string
  title: string
  description: string
  deliverables: string[]
  targetArea: string
}

export interface ScorecardMetric {
  id: string
  target: string
  kpis: string[]
  baseline: string
  year1Goal: string
  year3Goal: string
  year5Goal: string
}

export interface GovernanceRole {
  id: string
  name: string
  description: string
  responsibilities: string[]
}

// Mission and Vision
export const MISSION = "To improve patient care, safety, and clinical excellence at Baptist Health Lexington by providing high-quality, simulation-based education. The simulation program's purpose is to enhance the skills, teamwork, and confidence of healthcare professionals through realistic training experiences, ultimately improving health outcomes in our community."

export const VISION = "Within five years, the Simulation Center will be an integral, indispensable component of Baptist Health Lexington's education and quality infrastructure, recognized for innovation and excellence in healthcare simulation. We envision a program that fully integrates simulation into mandatory training and clinical practice improvement, fosters a culture of safety, and serves as a regional leader in simulation-based learning. By Year 5, our simulation program will be accredited and widely acknowledged for driving measurable improvements in clinical competency, team communication, and patient safety outcomes."

// Guiding Principles
export const GUIDING_PRINCIPLES: GuidingPrinciple[] = [
  {
    id: 'quality-safety',
    name: 'Alignment with Quality & Safety Goals',
    description: 'Simulation activities target high-impact clinical scenarios and organizational priorities to directly improve patient safety and quality metrics.',
    icon: 'Shield'
  },
  {
    id: 'learner-centered',
    name: 'Learner-Centered & Efficacy Focused',
    description: 'Evidence-based simulation design (INACSL Standards) ensuring training is effective with purposeful, realistic scenarios and structured debriefings.',
    icon: 'Target'
  },
  {
    id: 'collaboration',
    name: 'Interprofessional Collaboration & Psychological Safety',
    description: 'Training teams together in environments that foster psychological safety, breaking down silos and promoting open communication.',
    icon: 'Users'
  },
  {
    id: 'standardization',
    name: 'Standardization with Flexibility',
    description: 'Clear policies, procedures, and standards (SSH accreditation) while remaining agile to address emerging training needs.',
    icon: 'FileText'
  },
  {
    id: 'sustainability',
    name: 'Sustainability and Growth',
    description: 'Plan for sustainable growth through training faculty champions, building internal talent, and demonstrating ROI.',
    icon: 'TrendingUp'
  }
]

// Annual Priorities
export const ANNUAL_PRIORITIES: AnnualPriority[] = [
  {
    id: 'year-0',
    year: 'Year 0',
    theme: 'Foundation Laid',
    description: 'Launch & Integration of Basics. Establish the Simulation Center as a functional entity.',
    priorities: [
      'Finalize policies and simulation manual',
      'Ensure all staff are trained in their roles',
      'Integrate simulation into new hire orientation (mandatory education)',
      'Collect baseline metrics for participation, competency, and safety',
      'Achieve early wins: successful center launch, initial simulations delivered',
      'Secure leadership buy-in through quick improvements'
    ]
  },
  {
    id: 'year-1',
    year: 'Year 1',
    theme: 'Program Integration & Growth',
    description: 'Simulation as a Standard Practice. Embed simulation in all mandatory clinical education.',
    priorities: [
      'Embed simulation in all mandatory clinical education for new staff',
      'Dramatically increase participation - every new nurse experiences simulation',
      'Develop first cohort of simulation faculty (educator training program)',
      'Begin tracking efficacy: skill assessment scores, training time reductions',
      'Focus on refining operations and demonstrating initial outcome improvements'
    ]
  },
  {
    id: 'year-2',
    year: 'Year 2',
    theme: 'Expansion & Quality Improvement',
    description: 'Scaling Up and Proving Impact. Reach more departments and advanced use cases.',
    priorities: [
      'Scale to more departments with interdisciplinary team training',
      'Focus on high-risk scenarios (sepsis, obstetric emergencies)',
      'Train/hire additional educators to handle increased volume',
      'Demonstrate clear evidence of simulation efficacy',
      'Prepare for accreditation readiness (closing gaps in standards)'
    ]
  },
  {
    id: 'year-3',
    year: 'Year 3',
    theme: 'Innovation, Accreditation & External Validation',
    description: 'Enhance, Innovate, Validate. Pursue SSH accreditation and innovative modalities.',
    priorities: [
      'Pursue SSH accreditation demonstrating national standards compliance',
      'Pilot innovative modalities (VR scenarios, tele-simulation)',
      'Launch formal research or QI project to publish efficacy results',
      'Become fully institutionalized - indispensable for new initiatives',
      'Show tangible improvements in patient safety metrics'
    ]
  },
  {
    id: 'year-4',
    year: 'Year 4',
    theme: 'Consolidation & System Integration',
    description: 'Enterprise Integration and Outreach. Integrate simulation system-wide.',
    priorities: [
      'Integrate simulation into all relevant clinical education system-wide',
      'Mandatory simulation-based refreshers become routine for existing staff',
      'Extend programs to additional disciplines (EMS, community partners)',
      'Position as hub for the region or Baptist Health system',
      'Demonstrate sustained outcome improvements and positive ROI'
    ]
  },
  {
    id: 'year-5',
    year: 'Year 5',
    theme: 'Maturity and Excellence',
    description: 'Sustain, Evaluate, Lead. Full maturity with regional/national leadership.',
    priorities: [
      'Sustain high performance with continuous refresh of content and technology',
      'Contribute to regional/national leadership in simulation',
      'Conduct 5-year impact review showing cumulative improvements',
      'Plan next strategic cycle with new targets',
      'Simulation-based learning embedded in organizational culture'
    ]
  }
]

// Detailed Milestones (Year 0-2 by Quarter)
export const MILESTONES: Milestone[] = [
  // Year 0
  {
    id: 'y0-q1',
    quarter: 'Year 0 - Q1',
    title: 'Preparation & Go-Live',
    description: 'Complete go-live readiness and open the Simulation Center.',
    deliverables: [
      'Finalize and approve Simulation Policy and Procedures Manual',
      'Onboard initial simulation team (hire/train remaining staff)',
      'Launch pilot simulation sessions for key mandatory trainings',
      'Collect baseline metrics for later comparison'
    ],
    targetArea: 'Foundation'
  },
  {
    id: 'y0-q2',
    quarter: 'Year 0 - Q2',
    title: 'Initial Integration & Staff Training',
    description: 'Integrate simulation into mandatory new hire orientation.',
    deliverables: [
      'Every new nurse goes through simulation scenario during orientation',
      'Expand mandatory simulation to 1-2 other priority areas',
      'Conduct Train-the-Trainer workshop for additional facilitators',
      'Establish core group of ~5-10 trained simulation faculty'
    ],
    targetArea: 'Integration'
  },
  {
    id: 'y0-q3',
    quarter: 'Year 0 - Q3',
    title: 'Ramp-up & Quality Monitoring',
    description: 'Increase simulation volume toward ~50% capacity.',
    deliverables: [
      'Roll out interprofessional team simulations for high-risk scenarios',
      'Simulation becomes regular part of weekly education calendars',
      'Implement feedback and evaluation system',
      'Begin monitoring early efficacy indicators'
    ],
    targetArea: 'Expansion'
  },
  {
    id: 'y0-q4',
    quarter: 'Year 0 - Q4',
    title: 'Stabilization & Initial Outcomes',
    description: 'Run near full planned capacity with 100% of new clinical hires trained.',
    deliverables: [
      '100% of new clinical hires complete simulation-based orientation',
      'At least one mandatory annual training converted to simulation',
      'Achieve preliminary participation target',
      'Compile 90-day report to leadership with ROI indicators'
    ],
    targetArea: 'Outcomes'
  },
  // Year 1
  {
    id: 'y1-q1',
    quarter: 'Year 1 - Q1',
    title: 'Scale Up Integration',
    description: 'Embed simulation into nurse residency and expand educator development.',
    deliverables: [
      'Embed simulation into all nurse residency sessions',
      'Launch simulation for other mandatory education topics',
      'Enroll staff in CHSE certification programs',
      'Start one targeted simulation-driven quality initiative'
    ],
    targetArea: 'Integration'
  },
  {
    id: 'y1-q2',
    quarter: 'Year 1 - Q2',
    title: 'Broaden Participation & Curriculum',
    description: 'Expand scenario library and achieve >50% staff participation.',
    deliverables: [
      'Scenario library covers most high-priority clinical cases',
      '>50% of all clinical staff attended at least one simulation',
      'Evaluate staffing needs for continued growth',
      'Begin formal data analysis of training efficacy'
    ],
    targetArea: 'Participation'
  },
  {
    id: 'y1-q3',
    quarter: 'Year 1 - Q3',
    title: 'Institutionalize in Departments',
    description: 'Every high-risk department conducts quarterly simulation drills.',
    deliverables: [
      'Every high-risk department (ED, ICU, L&D) conducts quarterly sims',
      '100% of critical care staff complete team-based simulation',
      'Launch Simulation Faculty Champion program',
      'Begin drafting SSH accreditation application'
    ],
    targetArea: 'Integration'
  },
  {
    id: 'y1-q4',
    quarter: 'Year 1 - Q4',
    title: 'Consolidate Gains & Measure Impact',
    description: 'Demonstrate reduction in orientation time and improved retention.',
    deliverables: [
      'Demonstrable reduction in orientation time (12 weeks → ~10 weeks)',
      'Improved first-year nurse retention',
      'Document latent safety threats resolved through simulation',
      'Publish Year 1 annual report of simulation program outcomes'
    ],
    targetArea: 'Outcomes'
  },
  // Year 2
  {
    id: 'y2-q1',
    quarter: 'Year 2 - Q1',
    title: 'Fill Remaining Gaps',
    description: 'Extend simulation to non-nursing groups and community partners.',
    deliverables: [
      'Introduce mandatory simulation in annual re-certifications',
      'Start simulation-based CE series for physicians',
      'Begin community or outreach simulations (e.g., local EMS)',
      'Begin rigorous outcome study for focus areas'
    ],
    targetArea: 'Expansion'
  },
  {
    id: 'y2-q2',
    quarter: 'Year 2 - Q2',
    title: 'Address Staffing & Capacity',
    description: 'Secure and onboard additional simulation staff.',
    deliverables: [
      'Onboard additional simulation staff (educator or technologist)',
      'Formalize agreements for simulation faculty protected time',
      'Send instructors to advanced debriefing workshops',
      'Expand simulation role in hospital QI projects'
    ],
    targetArea: 'Capacity'
  },
  {
    id: 'y2-q3',
    quarter: 'Year 2 - Q3',
    title: 'Full Integration & Accreditation Prep',
    description: 'Assemble accreditation application and achieve >80% staff participation.',
    deliverables: [
      'Assemble SSH accreditation application documents',
      '>80% of clinical staff participated in simulation annually',
      'Conduct internal audit/review of simulation quality',
      'Update policies and manuals as needed'
    ],
    targetArea: 'Accreditation'
  },
  {
    id: 'y2-q4',
    quarter: 'Year 2 - Q4',
    title: 'Major Checkpoint for Impact',
    description: 'Two years of data demonstrating training efficacy and safety improvements.',
    deliverables: [
      'Measurable reduction in hospital-acquired conditions',
      'First-year nurse turnover significantly dropped',
      'Orientation down to ~8-9 weeks average',
      'Comprehensive 2-year report/scorecard'
    ],
    targetArea: 'Outcomes'
  }
]

// Implementation Scorecard
export const SCORECARD_METRICS: ScorecardMetric[] = [
  {
    id: 'mandatory-education',
    target: 'Mandatory Education Integration',
    kpis: [
      '% of new employee orientation with simulation',
      '% of annual mandatory training with sim component',
      'Average RN orientation length (weeks)'
    ],
    baseline: 'Orientation sims piloted (~25%); Annual training with sim: 0%; RN orientation: 12 weeks',
    year1Goal: '100% nurse orientations include sim; 50% mandatory training uses sim; Orientation: ~10 weeks',
    year3Goal: '100% clinical orientations; ≥75% mandatory training; Orientation: ~9 weeks',
    year5Goal: 'Fully institutionalized (100%); Orientation: ~8 weeks sustained'
  },
  {
    id: 'educator-training',
    target: 'Educator Training & Capacity',
    kpis: [
      'Number of staff trained as simulation facilitators',
      'Simulation staff FTE count',
      'CHSE/CHSOS certifications on team'
    ],
    baseline: '2 dedicated sim staff; ~5 faculty trained; 0 certified educators',
    year1Goal: '≥15 facilitators trained; +1 FTE added; At least 1 CHSE/CHSOS',
    year3Goal: '≥30 facilitators; 4 total FTE; 3-5 staff with certifications',
    year5Goal: '>50 trained facilitators; Stable 4+ FTE; Maintain certifications'
  },
  {
    id: 'participation',
    target: 'Staff Participation & Reach',
    kpis: [
      'Total simulation learner encounters (per year)',
      '% of clinical staff participated at least once/year',
      'Staff satisfaction with training'
    ],
    baseline: '~200 learner encounters; ~10% staff reached; ~90% satisfaction',
    year1Goal: '≥800 encounters; ~50% staff engaged; ≥95% positive feedback',
    year3Goal: '>2000 encounters/year; >80% staff participated; >95% satisfaction',
    year5Goal: '~3000+ encounters/year; ~100% staff involved; Excellent feedback sustained'
  },
  {
    id: 'efficacy',
    target: 'Training Efficacy (Learning Outcomes)',
    kpis: [
      'Pre vs post simulation assessment scores',
      'Competency exam first-attempt pass rates',
      'Teamwork/communication scores'
    ],
    baseline: 'Baseline data collection; ~85% ACLS pass rate',
    year1Goal: '+20% knowledge improvement; >90% competency pass rate; Teamwork uptick',
    year3Goal: 'Maintained improvement; >95% pass rates; Hospital teamwork up 15%',
    year5Goal: '~99% competency pass; Top quartile teamwork scores nationally'
  },
  {
    id: 'safety',
    target: 'Patient Safety & Quality Outcomes',
    kpis: [
      'Target adverse event rates',
      'Code response times',
      'Sepsis bundle compliance'
    ],
    baseline: 'Code blue: 70% within 2 min; Sepsis compliance: 60%',
    year1Goal: 'Code response: 85%; Sepsis: 75%; Some latent threats addressed',
    year3Goal: '50% reduction in med errors; Sepsis >90%; Safety events trending down',
    year5Goal: 'Zero Harm goals closer; Metrics meet/exceed national benchmarks'
  },
  {
    id: 'policy-accreditation',
    target: 'Policy, Procedure & Accreditation',
    kpis: [
      'Simulation Policy Manual status',
      'Adherence to best-practice standards',
      'Accreditation status'
    ],
    baseline: 'Draft manual; Not accredited; ~70% standards alignment',
    year1Goal: 'Manual approved; Begin self-study >85% standards; 1 policy updated from sim',
    year3Goal: 'SSH Accreditation achieved; Up-to-date manual; Multiple procedures improved',
    year5Goal: 'Accreditation maintained; Simulation integrated into hospital policy framework'
  }
]

// Governance Model
export const GOVERNANCE_ROLES: GovernanceRole[] = [
  {
    id: 'steering-committee',
    name: 'Simulation Steering Committee',
    description: 'Multi-disciplinary committee overseeing simulation program strategy and execution.',
    responsibilities: [
      'Review progress against strategic plan',
      'Advise on program priorities',
      'Champion simulation initiatives in respective areas',
      'Approve policies and resource advocacy',
      'Integrate with SSH/INACSL standards requirements'
    ]
  },
  {
    id: 'executive-sponsor',
    name: 'Executive Sponsorship',
    description: 'Executive sponsor (CNO or CMO) ensuring linkage to senior leadership.',
    responsibilities: [
      'Sit on steering committee',
      'Provide quarterly reports to hospital executives/board',
      'Ensure integration with broader organizational strategies',
      'Secure ongoing support and resources'
    ]
  },
  {
    id: 'operational-management',
    name: 'Operational Management',
    description: 'Simulation Center Director responsible for day-to-day management.',
    responsibilities: [
      'Coordinate staff and oversee curriculum development',
      'Ensure quality of delivery',
      'Handle budgeting and resource requests',
      'Maintain Simulation Policy & Procedure Manual',
      'Ensure compliance with standards'
    ]
  },
  {
    id: 'faculty-champions',
    name: 'Faculty & Champion Engagement',
    description: 'Simulation Champions Network of interested clinicians and educators.',
    responsibilities: [
      'Help facilitate sims in their areas',
      'Provide grass-roots feedback',
      'Disseminate simulation opportunities and lessons learned',
      'Peer coaching and sustaining culture of simulation'
    ]
  }
]

// Helper functions
export function getMilestonesByYear(year: string): Milestone[] {
  return MILESTONES.filter(m => m.quarter.startsWith(year))
}

export function getStats() {
  return {
    guidingPrinciples: GUIDING_PRINCIPLES.length,
    annualPriorities: ANNUAL_PRIORITIES.length,
    milestones: MILESTONES.length,
    scorecardMetrics: SCORECARD_METRICS.length,
    governanceRoles: GOVERNANCE_ROLES.length
  }
}
