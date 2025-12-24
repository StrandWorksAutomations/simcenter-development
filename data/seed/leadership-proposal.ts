// Leadership Proposal Data
// Prompt 24: Executive summary and investment proposal

export interface ExecutiveSummary {
  title: string
  subtitle: string
  missionStatement: string
  visionStatement: string
  keyBenefits: string[]
  strategicAlignment: string[]
}

export interface InvestmentOption {
  id: string
  name: string
  investment: string
  description: string
  capabilities: string[]
  outcomes: string[]
  timeline: string
  recommended: boolean
}

export interface ROIProjection {
  category: string
  year1: string
  year3: string
  year5: string
  notes: string
}

export interface RiskMitigation {
  risk: string
  likelihood: 'high' | 'medium' | 'low'
  impact: 'high' | 'medium' | 'low'
  mitigation: string
}

export interface Milestone {
  id: string
  phase: string
  timeline: string
  deliverables: string[]
  successCriteria: string
}

export interface SuccessMetric {
  category: string
  metric: string
  baseline: string
  target: string
  measurementMethod: string
}

// Executive Summary
export const EXECUTIVE_SUMMARY: ExecutiveSummary = {
  title: 'Baptist Health Lexington Simulation Center',
  subtitle: 'Investment Proposal for Healthcare Excellence',
  missionStatement: 'To improve patient care, safety, and clinical excellence at Baptist Health Lexington by providing high-quality, simulation-based education that enhances the skills, teamwork, and confidence of healthcare professionals.',
  visionStatement: 'Within five years, the Simulation Center will be an integral, indispensable component of Baptist Health Lexington\'s education and quality infrastructure, recognized for innovation and excellence in healthcare simulation.',
  keyBenefits: [
    'Reduced patient safety incidents through proactive training',
    'Faster onboarding and reduced orientation time for new staff',
    'Improved nurse retention and reduced turnover costs',
    'Enhanced quality metrics and regulatory compliance',
    'Competitive advantage in healthcare education',
    'Foundation for system-wide training standardization'
  ],
  strategicAlignment: [
    'Supports Baptist Health\'s commitment to patient safety and quality',
    'Aligns with nursing excellence and Magnet recognition goals',
    'Enables compliance with Joint Commission and CMS requirements',
    'Positions BHLEX as a regional leader in clinical education',
    'Supports workforce development and retention initiatives'
  ]
}

// Investment Options
export const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: 'essential',
    name: 'Essential Program',
    investment: '$1.5M - $2M',
    description: 'Core simulation capability with high-fidelity manikin, essential A/V, and foundational curriculum.',
    capabilities: [
      'One high-fidelity manikin (SimMan 3G+)',
      'Basic A/V recording for debriefing',
      'Core scenario library (6-8 scenarios)',
      'Mandatory education integration',
      'Basic competency tracking'
    ],
    outcomes: [
      '100% new hire simulation orientation',
      'Reduced orientation time by 2 weeks',
      'Foundation for quality improvement'
    ],
    timeline: 'Year 0-1 implementation',
    recommended: false
  },
  {
    id: 'recommended',
    name: 'Recommended Program',
    investment: '$3M - $5M',
    description: 'Comprehensive simulation center with advanced technology, full curriculum, and accreditation pathway.',
    capabilities: [
      'Multiple manikins (adult, pediatric, OB)',
      'Enterprise A/V with analytics',
      'Comprehensive scenario library (15+ scenarios)',
      'VR/AR pilot programs',
      'Competency tracking system',
      'Faculty development program',
      'SSH accreditation pathway'
    ],
    outcomes: [
      'All capabilities of Essential plus:',
      '50% reduction in preventable adverse events',
      '20% improvement in nurse retention',
      'SSH accreditation by Year 3',
      'Regional training hub potential'
    ],
    timeline: 'Year 0-3 phased implementation',
    recommended: true
  },
  {
    id: 'transformative',
    name: 'Transformative Program',
    investment: '$8M - $12M',
    description: 'State-of-the-art simulation center with cutting-edge technology, research capability, and system-wide impact.',
    capabilities: [
      'Full manikin suite across specialties',
      'AI-assisted debriefing',
      'Comprehensive VR/AR program',
      'Remote simulation capability',
      'Research and publication capacity',
      'In-situ simulation program',
      'System-wide training standardization'
    ],
    outcomes: [
      'All capabilities of Recommended plus:',
      'National recognition for simulation excellence',
      'Revenue generation from external training',
      'Research publications and grants',
      'System-wide quality standardization'
    ],
    timeline: 'Year 0-5 full vision',
    recommended: false
  }
]

// ROI Projections
export const ROI_PROJECTIONS: ROIProjection[] = [
  {
    category: 'Reduced Orientation Time',
    year1: '$150,000',
    year3: '$450,000',
    year5: '$750,000',
    notes: '2 weeks saved × 50 new hires/year × $1,500/week'
  },
  {
    category: 'Nurse Retention Improvement',
    year1: '$200,000',
    year3: '$600,000',
    year5: '$1,000,000',
    notes: '5 fewer turnovers/year × $40,000 replacement cost'
  },
  {
    category: 'Reduced Adverse Events',
    year1: '$100,000',
    year3: '$500,000',
    year5: '$1,000,000',
    notes: 'Avoided costs from preventable incidents'
  },
  {
    category: 'Quality Metric Improvements',
    year1: '$50,000',
    year3: '$200,000',
    year5: '$400,000',
    notes: 'Better performance on value-based purchasing'
  },
  {
    category: 'Training Efficiency',
    year1: '$75,000',
    year3: '$225,000',
    year5: '$375,000',
    notes: 'Reduced instructor time, standardized training'
  }
]

// Risk Mitigation
export const RISK_MITIGATIONS: RiskMitigation[] = [
  {
    risk: 'Staff adoption and engagement',
    likelihood: 'medium',
    impact: 'high',
    mitigation: 'Phased rollout, faculty champions, leadership support, early wins communication'
  },
  {
    risk: 'Technology implementation challenges',
    likelihood: 'medium',
    impact: 'medium',
    mitigation: 'Vendor partnerships, IT involvement from start, pilot testing, contingency budget'
  },
  {
    risk: 'Budget constraints',
    likelihood: 'medium',
    impact: 'high',
    mitigation: 'Phased investment approach, grant opportunities, ROI demonstration at each phase'
  },
  {
    risk: 'Faculty development capacity',
    likelihood: 'low',
    impact: 'medium',
    mitigation: 'Certification pathways, external training, simulation champion program'
  },
  {
    risk: 'Accreditation timeline delays',
    likelihood: 'low',
    impact: 'medium',
    mitigation: 'Early gap analysis, dedicated resources, mock surveys, expert consultation'
  }
]

// Implementation Milestones
export const MILESTONES: Milestone[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1: Foundation',
    timeline: 'Months 1-6',
    deliverables: [
      'Space preparation and equipment installation',
      'Staff hiring and initial training',
      'Policy and procedure manual approval',
      'Core scenario development',
      'Pilot simulations with select groups'
    ],
    successCriteria: 'Simulation center operational with 5 core scenarios'
  },
  {
    id: 'phase-2',
    phase: 'Phase 2: Integration',
    timeline: 'Months 7-12',
    deliverables: [
      '100% new hire simulation orientation',
      'Mandatory education conversion',
      'A/V system fully operational',
      'Faculty development program launched',
      'Initial outcomes data collection'
    ],
    successCriteria: 'All new hires completing simulation orientation, positive feedback >90%'
  },
  {
    id: 'phase-3',
    phase: 'Phase 3: Expansion',
    timeline: 'Year 2',
    deliverables: [
      'Expanded scenario library (15+ scenarios)',
      'Interprofessional team training regular',
      'Competency tracking system operational',
      'Quality improvement integration',
      'VR/AR pilot programs'
    ],
    successCriteria: '50% staff participation, measurable quality improvements'
  },
  {
    id: 'phase-4',
    phase: 'Phase 4: Accreditation',
    timeline: 'Year 3',
    deliverables: [
      'SSH accreditation application submitted',
      'Evidence binder complete',
      'Mock survey completed',
      'All gaps closed',
      'Accreditation achieved'
    ],
    successCriteria: 'SSH accreditation awarded'
  },
  {
    id: 'phase-5',
    phase: 'Phase 5: Excellence',
    timeline: 'Years 4-5',
    deliverables: [
      'Regional training hub operational',
      'Research and publication activity',
      'Advanced technology integration',
      'System-wide standardization',
      '5-year impact report'
    ],
    successCriteria: 'Sustained outcomes, external recognition, positive ROI demonstrated'
  }
]

// Success Metrics
export const SUCCESS_METRICS: SuccessMetric[] = [
  {
    category: 'Participation',
    metric: 'Staff simulation participation rate',
    baseline: '10%',
    target: '80%+ by Year 3',
    measurementMethod: 'Simulation tracking system'
  },
  {
    category: 'Orientation',
    metric: 'RN orientation time',
    baseline: '12 weeks',
    target: '8-9 weeks by Year 2',
    measurementMethod: 'HR records'
  },
  {
    category: 'Retention',
    metric: 'First-year nurse turnover',
    baseline: '25%',
    target: '<15% by Year 3',
    measurementMethod: 'HR analytics'
  },
  {
    category: 'Safety',
    metric: 'Preventable adverse events',
    baseline: 'Current rate',
    target: '50% reduction by Year 5',
    measurementMethod: 'Quality/safety reporting'
  },
  {
    category: 'Competency',
    metric: 'ACLS/code team pass rates',
    baseline: '85%',
    target: '>95% by Year 2',
    measurementMethod: 'Competency assessments'
  },
  {
    category: 'Satisfaction',
    metric: 'Training satisfaction scores',
    baseline: '85%',
    target: '>95% positive',
    measurementMethod: 'Post-simulation surveys'
  }
]

// Call to Action
export const CALL_TO_ACTION = {
  headline: 'Invest in Excellence, Improve Patient Care',
  summary: 'The Simulation Center represents a strategic investment in Baptist Health Lexington\'s most valuable assets: our people and our patients. By providing realistic, immersive training, we can improve clinical skills, enhance teamwork, reduce errors, and ultimately save lives.',
  askStatement: 'We recommend approval of the Recommended Program ($3-5M) as a phased investment over 3 years, with clear milestones and demonstrated ROI at each phase.',
  nextSteps: [
    'Executive leadership approval of investment level',
    'Formation of Simulation Steering Committee',
    'Initiation of space planning and design',
    'Begin faculty hiring and training',
    'Vendor selection and equipment procurement'
  ]
}

// Helper functions
export function getTotalROI(year: 1 | 3 | 5): number {
  const yearKey = year === 1 ? 'year1' : year === 3 ? 'year3' : 'year5'
  return ROI_PROJECTIONS.reduce((sum, p) => {
    const value = parseInt(p[yearKey].replace(/[$,]/g, ''))
    return sum + value
  }, 0)
}

export function getStats() {
  return {
    investmentOptions: INVESTMENT_OPTIONS.length,
    roiCategories: ROI_PROJECTIONS.length,
    risks: RISK_MITIGATIONS.length,
    milestones: MILESTONES.length,
    successMetrics: SUCCESS_METRICS.length,
    totalYear5ROI: getTotalROI(5)
  }
}
