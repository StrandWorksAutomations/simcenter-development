// Risk Register and Compliance Data
// Source: Prompt 15 - Risk management + compliance

export type RiskImpact = 'low' | 'medium' | 'high' | 'critical'
export type RiskProbability = 'low' | 'medium' | 'high'
export type RiskStatus = 'identified' | 'mitigating' | 'resolved' | 'accepted' | 'monitoring'
export type RiskCategory = 'privacy' | 'security' | 'compliance' | 'operational' | 'financial' | 'technical' | 'safety'

export interface Risk {
  id: string
  category: RiskCategory
  title: string
  description: string
  impact: RiskImpact
  probability: RiskProbability
  riskScore: number // 1-16 based on impact x probability matrix
  controls: string[]
  mitigation: string
  status: RiskStatus
  owner: string
  reviewDate: string | null
}

// Calculate risk score (1-16)
export function calculateRiskScore(impact: RiskImpact, probability: RiskProbability): number {
  const impactScore: Record<RiskImpact, number> = { low: 1, medium: 2, high: 3, critical: 4 }
  const probScore: Record<RiskProbability, number> = { low: 1, medium: 2, high: 3 }
  return impactScore[impact] * probScore[probability]
}

export const riskRegister: Risk[] = [
  // Privacy Risks
  {
    id: 'risk-consent',
    category: 'privacy',
    title: 'Recording Without Proper Consent',
    description: 'Participants might be recorded or observed without their knowledge or agreement, violating privacy rights',
    impact: 'high',
    probability: 'low',
    riskScore: 3,
    controls: [
      'Written consent forms before recording',
      'Posted signage at all sim room entrances',
      'Verbal notification at session start',
      'No covert recording policy'
    ],
    mitigation: 'Obtain written consent from all participants via Simulation Recording Consent and Confidentiality Agreement. Post clear signage and give verbal notice.',
    status: 'mitigating',
    owner: 'Simulation Center Director',
    reviewDate: null
  },
  {
    id: 'risk-unauthorized-access',
    category: 'security',
    title: 'Unauthorized Access or Disclosure',
    description: 'Simulation video is accessed by unauthorized persons or shared inappropriately (e.g., posted publicly)',
    impact: 'critical',
    probability: 'medium',
    riskScore: 8,
    controls: [
      'Strict access controls with unique logins',
      'Role-based permissions',
      'Confidentiality agreements signed by all users',
      'Audit logs and periodic reviews',
      'Disciplinary action policy'
    ],
    mitigation: 'Implement comprehensive access control system with audit logging. All users sign confidentiality agreements. Regular access reviews and violation consequences.',
    status: 'mitigating',
    owner: 'IT Security / Privacy Officer',
    reviewDate: null
  },
  {
    id: 'risk-punitive-use',
    category: 'compliance',
    title: 'Misuse for Performance Management',
    description: 'Simulation recordings used to evaluate or discipline staff outside of educational intent',
    impact: 'high',
    probability: 'low',
    riskScore: 3,
    controls: [
      'Clear policy: recordings for education/QI only',
      'Leadership and educator orientation',
      'Ethics/Compliance review for any evaluative use',
      'Psychological safety culture'
    ],
    mitigation: 'Establish clear policy that recordings are for education and quality improvement only, never for HR action or performance files. Leadership commitment to psychological safety.',
    status: 'mitigating',
    owner: 'Simulation Center Director / HR',
    reviewDate: null
  },
  {
    id: 'risk-data-breach',
    category: 'security',
    title: 'Data Breach or Hack',
    description: 'Server storing videos is hacked, or device containing recordings is lost/stolen',
    impact: 'critical',
    probability: 'low',
    riskScore: 4,
    controls: [
      'Secure IT architecture (firewalls, encryption)',
      'Strong passwords and access management',
      'No unencrypted portable drives',
      'Vetted vendor systems',
      'Incident response plan',
      'Minimal data retention'
    ],
    mitigation: 'Implement defense-in-depth security architecture. Encrypt all data at rest and in transit. Maintain incident response plan. Limit data retention period.',
    status: 'mitigating',
    owner: 'IT Security',
    reviewDate: null
  },
  {
    id: 'risk-phi-inclusion',
    category: 'compliance',
    title: 'Inclusion of Real Patient Information (PHI)',
    description: 'Simulation scenario or debrief unintentionally includes identifiable patient information',
    impact: 'critical',
    probability: 'low',
    riskScore: 4,
    controls: [
      'Scenario design requires fictitious names/de-identified data',
      'Facilitator training on avoiding real patient identifiers',
      'Pre-recording environment scan',
      'Immediate restricted access if PHI detected',
      'Vendor BAA in place'
    ],
    mitigation: 'Strict scenario design protocols using only fictitious patient data. Train facilitators to avoid real patient details. Scan environment before in-situ simulations.',
    status: 'mitigating',
    owner: 'Privacy Officer / Education Lead',
    reviewDate: null
  },
  {
    id: 'risk-vendor-failure',
    category: 'technical',
    title: 'Vendor Reliability and Compliance Failure',
    description: 'Third-party simulation recording platform fails to protect data due to poor security or business failure',
    impact: 'high',
    probability: 'low',
    riskScore: 3,
    controls: [
      'Careful vendor selection with security requirements',
      'Contractual confidentiality and security clauses',
      'Breach notification requirements',
      'Regular vendor compliance reviews',
      'Data backup and export options'
    ],
    mitigation: 'Select vendors with demonstrated security certifications. Include BAA and breach notification in contracts. Maintain data export capabilities.',
    status: 'mitigating',
    owner: 'IT Procurement / Compliance',
    reviewDate: null
  },
  {
    id: 'risk-retention',
    category: 'compliance',
    title: 'Data Retention Non-compliance',
    description: 'Recordings kept longer than necessary, increasing risk of misuse or legal discovery exposure',
    impact: 'medium',
    probability: 'medium',
    riskScore: 4,
    controls: [
      'Defined retention schedule',
      'Automated deletion where possible',
      'Assigned deletion responsibilities',
      'Documentation of deletions'
    ],
    mitigation: 'Implement strict retention schedule: formative sessions 30 days, summative per academic records policy. Automate deletion and maintain deletion logs.',
    status: 'mitigating',
    owner: 'Simulation Center Manager',
    reviewDate: null
  },
  {
    id: 'risk-distrust',
    category: 'operational',
    title: 'Participant Distrust or Psychological Harm',
    description: 'If privacy not assured, participants may feel anxiety or refuse to participate honestly',
    impact: 'medium',
    probability: 'medium',
    riskScore: 4,
    controls: [
      'Strong culture of confidentiality',
      'Leadership support for "no punitive use"',
      'Clear policy communication',
      'Regular feedback collection',
      'Facilitator training on psychological safety'
    ],
    mitigation: 'Establish and reinforce confidentiality culture. Leadership publicly commits to psychological safety. Regularly collect and act on participant feedback.',
    status: 'mitigating',
    owner: 'Simulation Center Director',
    reviewDate: null
  },

  // Operational Risks
  {
    id: 'risk-equipment-failure',
    category: 'technical',
    title: 'Equipment Failure During Session',
    description: 'Manikin or A/V system fails during a scheduled simulation session',
    impact: 'medium',
    probability: 'medium',
    riskScore: 4,
    controls: [
      'Preventive maintenance program',
      'Pre-session equipment checks',
      'Backup equipment available',
      'Service contracts with rapid response',
      'Staff trained on troubleshooting'
    ],
    mitigation: 'Implement comprehensive PM program. Maintain spare parts inventory. Have backup scenarios that can proceed with reduced technology.',
    status: 'mitigating',
    owner: 'Simulation Coordinator',
    reviewDate: null
  },
  {
    id: 'risk-staffing-shortage',
    category: 'operational',
    title: 'Staffing Shortage or Turnover',
    description: 'Key staff unavailable due to illness, turnover, or competing priorities',
    impact: 'high',
    probability: 'medium',
    riskScore: 6,
    controls: [
      'Cross-training of staff',
      'Documented procedures',
      'Faculty pool for backup facilitation',
      'Competitive compensation',
      'Professional development opportunities'
    ],
    mitigation: 'Cross-train multiple staff on key functions. Maintain procedure documentation. Ensure faculty pool can cover facilitation needs.',
    status: 'identified',
    owner: 'Simulation Center Director',
    reviewDate: null
  },
  {
    id: 'risk-budget-overrun',
    category: 'financial',
    title: 'Budget Overrun',
    description: 'Project or operating costs exceed planned budget',
    impact: 'high',
    probability: 'medium',
    riskScore: 6,
    controls: [
      '10% contingency in budget',
      'Regular cost tracking',
      'Change control process',
      'Monthly financial reviews',
      'Value engineering options'
    ],
    mitigation: 'Maintain adequate contingency. Track costs weekly against budget. Require approval for scope changes. Have value engineering alternatives ready.',
    status: 'mitigating',
    owner: 'Project Manager / Finance',
    reviewDate: null
  },
  {
    id: 'risk-schedule-delay',
    category: 'operational',
    title: 'Project Schedule Delay',
    description: 'Construction or equipment delivery delays impact planned opening',
    impact: 'medium',
    probability: 'high',
    riskScore: 6,
    controls: [
      'Early equipment ordering',
      'Schedule float built in',
      'Regular progress monitoring',
      'Contingency plans for delays',
      'Experienced contractor selection'
    ],
    mitigation: 'Order long-lead equipment early. Build float into schedule. Monitor progress weekly and address issues immediately. Have contingency activities ready.',
    status: 'identified',
    owner: 'Project Manager',
    reviewDate: null
  },

  // Safety Risks
  {
    id: 'risk-icra',
    category: 'safety',
    title: 'Infection Control Breach (Construction)',
    description: 'ICRA protocols breached during construction, potentially impacting patient safety',
    impact: 'critical',
    probability: 'low',
    riskScore: 4,
    controls: [
      'Strict ICRA protocols',
      'Hard barriers',
      'Negative air machines with HEPA',
      'Daily cleaning',
      'Pressure differential monitoring',
      'Infection control oversight'
    ],
    mitigation: 'Implement rigorous ICRA Class IV protocols. Daily monitoring by infection control. Immediate work stop if breach detected.',
    status: 'identified',
    owner: 'Infection Control / Project Manager',
    reviewDate: null
  },
  {
    id: 'risk-learner-safety',
    category: 'safety',
    title: 'Learner Safety During Simulation',
    description: 'Learner injury during physical simulation activities (e.g., CPR, team scenarios)',
    impact: 'medium',
    probability: 'low',
    riskScore: 2,
    controls: [
      'Safety briefings before sessions',
      'Proper equipment use training',
      'Emergency protocols in place',
      'First aid kit available',
      'Staff trained in emergency response'
    ],
    mitigation: 'Conduct safety briefing at start of each session. Ensure proper ergonomic setup. Have emergency response plan and first aid readily available.',
    status: 'mitigating',
    owner: 'Simulation Center Director',
    reviewDate: null
  }
]

// Compliance checklist
export interface ComplianceItem {
  id: string
  category: string
  requirement: string
  status: 'compliant' | 'in_progress' | 'non_compliant' | 'not_applicable'
  evidence: string
  reviewDate: string | null
}

export const complianceChecklist: ComplianceItem[] = [
  // Consent and Notification
  { id: 'cc-1', category: 'Consent & Notification', requirement: 'Consent forms signed by all participants before recording', status: 'in_progress', evidence: 'Consent form template created', reviewDate: null },
  { id: 'cc-2', category: 'Consent & Notification', requirement: '"Recording in Progress" signage posted at simulation room entrances', status: 'in_progress', evidence: 'Signs ordered', reviewDate: null },
  { id: 'cc-3', category: 'Consent & Notification', requirement: 'Pre-brief notification consistently delivered by facilitators', status: 'in_progress', evidence: 'Included in facilitator checklist', reviewDate: null },

  // Data Security
  { id: 'cc-4', category: 'Data Security', requirement: 'Recordings captured only via approved AV system', status: 'in_progress', evidence: 'Policy documented', reviewDate: null },
  { id: 'cc-5', category: 'Data Security', requirement: 'Password protection with strong passwords on all systems', status: 'in_progress', evidence: 'IT security review scheduled', reviewDate: null },
  { id: 'cc-6', category: 'Data Security', requirement: 'Access rights reviewed and least privilege enforced', status: 'in_progress', evidence: 'Access matrix created', reviewDate: null },
  { id: 'cc-7', category: 'Data Security', requirement: 'Encryption at rest for all stored recordings', status: 'in_progress', evidence: 'Vendor confirms encryption', reviewDate: null },
  { id: 'cc-8', category: 'Data Security', requirement: 'No unauthorized copies on personal devices or unsecured media', status: 'in_progress', evidence: 'Policy documented', reviewDate: null },

  // Retention and Deletion
  { id: 'cc-9', category: 'Retention & Deletion', requirement: 'Defined retention schedule documented and communicated', status: 'in_progress', evidence: 'Schedule drafted', reviewDate: null },
  { id: 'cc-10', category: 'Retention & Deletion', requirement: 'Automated or scheduled deletion process in place', status: 'in_progress', evidence: 'System configuration pending', reviewDate: null },
  { id: 'cc-11', category: 'Retention & Deletion', requirement: 'Deletion logs maintained', status: 'in_progress', evidence: 'Log template created', reviewDate: null },

  // Access Control
  { id: 'cc-12', category: 'Access Control', requirement: 'Unique user accounts (no shared logins)', status: 'in_progress', evidence: 'Account structure defined', reviewDate: null },
  { id: 'cc-13', category: 'Access Control', requirement: 'Role-based access permissions configured', status: 'in_progress', evidence: 'Role matrix documented', reviewDate: null },
  { id: 'cc-14', category: 'Access Control', requirement: 'Audit logging enabled and reviewed quarterly', status: 'in_progress', evidence: 'Review schedule created', reviewDate: null },

  // Vendor Management
  { id: 'cc-15', category: 'Vendor Management', requirement: 'Vendor security assessment completed', status: 'in_progress', evidence: 'Questionnaire sent', reviewDate: null },
  { id: 'cc-16', category: 'Vendor Management', requirement: 'Business Associate Agreement (BAA) executed', status: 'in_progress', evidence: 'Legal review in progress', reviewDate: null },
  { id: 'cc-17', category: 'Vendor Management', requirement: 'Breach notification clause in contract', status: 'in_progress', evidence: 'Contract terms reviewed', reviewDate: null }
]

// Risk summary helpers
export function getRisksByCategory(category: RiskCategory): Risk[] {
  return riskRegister.filter(r => r.category === category)
}

export function getRisksByStatus(status: RiskStatus): Risk[] {
  return riskRegister.filter(r => r.status === status)
}

export function getHighRisks(): Risk[] {
  return riskRegister.filter(r => r.riskScore >= 6)
}

export function getRiskMatrix(): { impact: RiskImpact; probability: RiskProbability; count: number }[] {
  const impacts: RiskImpact[] = ['low', 'medium', 'high', 'critical']
  const probabilities: RiskProbability[] = ['low', 'medium', 'high']
  const matrix: { impact: RiskImpact; probability: RiskProbability; count: number }[] = []

  for (const impact of impacts) {
    for (const probability of probabilities) {
      const count = riskRegister.filter(r => r.impact === impact && r.probability === probability).length
      matrix.push({ impact, probability, count })
    }
  }

  return matrix
}

export const riskSummary = {
  totalRisks: riskRegister.length,
  byCategory: {
    privacy: riskRegister.filter(r => r.category === 'privacy').length,
    security: riskRegister.filter(r => r.category === 'security').length,
    compliance: riskRegister.filter(r => r.category === 'compliance').length,
    operational: riskRegister.filter(r => r.category === 'operational').length,
    financial: riskRegister.filter(r => r.category === 'financial').length,
    technical: riskRegister.filter(r => r.category === 'technical').length,
    safety: riskRegister.filter(r => r.category === 'safety').length
  },
  highRiskCount: riskRegister.filter(r => r.riskScore >= 6).length,
  criticalImpactCount: riskRegister.filter(r => r.impact === 'critical').length
}
