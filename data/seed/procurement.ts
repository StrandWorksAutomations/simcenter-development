// Procurement Playbook Data
// Source: Prompt 8 - RFQ language, evaluation criteria, acceptance testing

// =============================================================================
// RFQ CATEGORIES & EVALUATION CRITERIA
// =============================================================================

export interface RFQCategory {
  id: string
  name: string
  weight: number // percentage of total score
  description: string
  requirements: string[]
  evaluationCriteria: EvaluationCriterion[]
}

export interface EvaluationCriterion {
  id: string
  name: string
  description: string
  maxScore: number
}

export const rfqCategories: RFQCategory[] = [
  {
    id: 'simulators',
    name: 'Patient Simulators',
    weight: 20,
    description: 'High-fidelity manikins for adult, OB, pediatric, and specialty training',
    requirements: [
      'Full specifications for each simulator (model, fidelity, wireless/tethered, battery life)',
      'Physiological features (breathing, heart/lung sounds, drug recognition, OB delivery)',
      'Use cases and scenario libraries included',
      'Integration capabilities with A/V and debrief systems',
      'Reliability, maintenance routines, and consumable parts list',
      'References from similar institutions'
    ],
    evaluationCriteria: [
      { id: 'sim-realism', name: 'Realism & Capability', description: 'Fidelity of physiological responses, lifelike anatomy, range of scenarios', maxScore: 25 },
      { id: 'sim-usability', name: 'Ease of Use & Flexibility', description: 'User-friendly control software, scenario programming, adaptability', maxScore: 20 },
      { id: 'sim-integration', name: 'Integration', description: 'A/V and debrief system integration, event log output', maxScore: 20 },
      { id: 'sim-reliability', name: 'Reliability & Supportability', description: 'Hardware robustness, battery life, local service availability', maxScore: 20 },
      { id: 'sim-tco', name: 'Total Cost of Ownership', description: '5-year cost including consumables and maintenance', maxScore: 15 }
    ]
  },
  {
    id: 'av-system',
    name: 'A/V Capture & Debrief System',
    weight: 20,
    description: 'Recording, streaming, and debriefing platform for simulation sessions',
    requirements: [
      'System architecture (cameras, mics, recording hardware, software platform)',
      'Recording & playback features (multi-angle, event markers, annotations)',
      'Storage & data management (on-prem vs cloud, capacity, retention)',
      'Live viewing and remote access capabilities',
      'Integration with simulators (event log ingestion) and LMS (LTI)',
      'Admin & IT requirements (VLAN, bandwidth, SSO, role-based access)'
    ],
    evaluationCriteria: [
      { id: 'av-functionality', name: 'Functionality & UX', description: 'Comprehensive recording features, intuitive interface', maxScore: 25 },
      { id: 'av-integration', name: 'Integration & Compatibility', description: 'Simulator event sync, LMS/LTI support, SSO', maxScore: 25 },
      { id: 'av-scalability', name: 'Scalability & Reliability', description: 'Capacity for growth, uptime track record', maxScore: 20 },
      { id: 'av-training', name: 'Support & Training', description: 'Implementation plan, on-site training quality', maxScore: 15 },
      { id: 'av-cost', name: 'Cost Effectiveness', description: '5-year cost relative to features and reliability', maxScore: 15 }
    ]
  },
  {
    id: 'lms-integration',
    name: 'LMS Integration',
    weight: 10,
    description: 'Learning Management System connectivity and data sharing',
    requirements: [
      'LTI compliance for Canvas, Moodle, or HealthStream',
      'Single Sign-On (SAML 2.0, OAuth) with Active Directory',
      'Data transfer (grades, completion, roster sync)',
      'Reporting and archival for accreditation/compliance',
      'Privacy & security (FERPA, HIPAA compliance)'
    ],
    evaluationCriteria: [
      { id: 'lms-compat', name: 'Compatibility', description: 'Proven integration with our LMS platform', maxScore: 30 },
      { id: 'lms-setup', name: 'Ease of Setup', description: 'Configuration complexity, custom development needed', maxScore: 25 },
      { id: 'lms-sso', name: 'SSO & User Management', description: 'Automatic role mapping, seamless authentication', maxScore: 25 },
      { id: 'lms-data', name: 'Data Completeness', description: 'Richness of data exchange (grades, completion, rosters)', maxScore: 20 }
    ]
  },
  {
    id: 'service-support',
    name: 'Service, Support & Warranty',
    weight: 20,
    description: 'Post-purchase support, warranties, and ongoing service',
    requirements: [
      'Standard warranty length and coverage (parts, labor, shipping)',
      'Extended maintenance plan options and pricing (Years 2-5)',
      'Support levels (hours, response times, on-site repair turnaround)',
      'Training and implementation support included',
      'Upgrade and update policies for software/firmware',
      'References from at least 3 similar clients'
    ],
    evaluationCriteria: [
      { id: 'svc-warranty', name: 'Warranty Coverage', description: 'Length and comprehensiveness, extended plan affordability', maxScore: 25 },
      { id: 'svc-response', name: 'Responsiveness', description: 'Support hours, turnaround time, local presence', maxScore: 25 },
      { id: 'svc-training', name: 'Training & Documentation', description: 'On-site training quality, manuals, continued learning', maxScore: 20 },
      { id: 'svc-pm', name: 'Preventative Maintenance', description: 'PM visits, remote monitoring, proactive support', maxScore: 15 },
      { id: 'svc-satisfaction', name: 'Customer Satisfaction', description: 'Reference feedback, reputation', maxScore: 15 }
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing & Total Cost of Ownership',
    weight: 30,
    description: '5-year total cost including initial purchase and recurring costs',
    requirements: [
      'Itemized costs for each major component',
      'Initial purchase price (equipment, software, installation, training)',
      'Recurring costs (annual licensing, subscriptions, support contracts)',
      'Consumables & accessories estimates based on expected usage',
      '5-year total summary with all assumptions stated'
    ],
    evaluationCriteria: [
      { id: 'price-tco', name: 'Total Cost of Ownership', description: '5-year TCO comparison (lowest gets highest score)', maxScore: 40 },
      { id: 'price-clarity', name: 'Clarity & Completeness', description: 'Transparent pricing, no hidden costs', maxScore: 30 },
      { id: 'price-value', name: 'Value-Adds', description: 'Extras included (spare parts, training, extended support)', maxScore: 20 },
      { id: 'price-budget', name: 'Budget Compliance', description: 'Alignment with budget expectations', maxScore: 10 }
    ]
  }
]

// =============================================================================
// ACCEPTANCE TESTING
// =============================================================================

export interface AcceptanceTest {
  id: string
  phase: 'FAT' | 'SAT'
  name: string
  description: string
  steps: AcceptanceTestStep[]
}

export interface AcceptanceTestStep {
  id: string
  name: string
  description: string
  category: string
  passFailCriteria: string
  status: 'pending' | 'in_progress' | 'passed' | 'failed' | 'na'
  notes?: string
}

export const acceptanceTests: AcceptanceTest[] = [
  {
    id: 'fat',
    phase: 'FAT',
    name: 'Factory Acceptance Test',
    description: 'Verify critical components at vendor facility prior to delivery',
    steps: [
      { id: 'fat-1', name: 'Specification Review', description: 'Vendor provides documentation and demo showing items meet specs', category: 'Documentation', passFailCriteria: 'All specifications documented and demonstrated', status: 'pending' },
      { id: 'fat-2', name: 'Simulator Demo', description: 'Video or in-person demonstration of key simulator features', category: 'Simulators', passFailCriteria: 'Vital signs, airway, OB delivery mechanisms functional', status: 'pending' },
      { id: 'fat-3', name: 'A/V System Demo', description: 'System recording multiple video feeds and generating sample debrief', category: 'A/V System', passFailCriteria: 'Multi-angle recording and debrief playback verified', status: 'pending' },
      { id: 'fat-4', name: 'Checklist Verification', description: 'Detailed checklist of each RFQ requirement verified', category: 'All', passFailCriteria: 'All critical requirements checked and confirmed', status: 'pending' },
      { id: 'fat-5', name: 'Issue Log Review', description: 'Document any deviations or concerns', category: 'QA', passFailCriteria: 'No critical issues; minor issues documented for SAT', status: 'pending' },
      { id: 'fat-6', name: 'Approval to Ship', description: 'Formal sign-off to approve shipment', category: 'Sign-off', passFailCriteria: 'Written approval from project team', status: 'pending' }
    ]
  },
  {
    id: 'sat',
    phase: 'SAT',
    name: 'Site Acceptance Test',
    description: 'Test integrated system on-site in real environment',
    steps: [
      { id: 'sat-1', name: 'Physical Inspection', description: 'Verify all equipment matches packing list, inspect for damage', category: 'Delivery', passFailCriteria: 'All items received, no damage', status: 'pending' },
      { id: 'sat-2', name: 'Installation Verification', description: 'Confirm proper installation per vendor implementation plan', category: 'Installation', passFailCriteria: 'All components installed and connected correctly', status: 'pending' },
      { id: 'sat-3', name: 'Adult Simulator Test', description: 'Run cardiac arrest scenario, verify vitals, defibrillation, event logging', category: 'Simulators', passFailCriteria: 'All features functional, events logged correctly', status: 'pending' },
      { id: 'sat-4', name: 'OB Simulator Test', description: 'Perform test delivery, verify mechanics and vital signs', category: 'Simulators', passFailCriteria: 'Delivery mechanism, contractions, neonate all functional', status: 'pending' },
      { id: 'sat-5', name: 'Pediatric/Neonate Test', description: 'Test intubation and resuscitation scenario', category: 'Simulators', passFailCriteria: 'Airway, vitals, and size-appropriate features verified', status: 'pending' },
      { id: 'sat-6', name: 'Integrated Scenario Test', description: 'Full emergency scenario with A/V recording and debrief', category: 'Integration', passFailCriteria: 'Video captured, events synced, debrief playback works', status: 'pending' },
      { id: 'sat-7', name: 'LMS Integration Test', description: 'Test SSO login, grade sync with sandbox LMS', category: 'LMS', passFailCriteria: 'SSO works, data syncs to LMS correctly', status: 'pending' },
      { id: 'sat-8', name: 'Network & Performance Test', description: 'Simultaneous recording in multiple rooms, verify bandwidth', category: 'IT', passFailCriteria: 'No stuttering, full resolution maintained', status: 'pending' },
      { id: 'sat-9', name: 'User Acceptance', description: 'Staff performs operations without vendor help', category: 'Training', passFailCriteria: 'Staff can setup, run, and review sessions independently', status: 'pending' },
      { id: 'sat-10', name: 'Final Sign-off', description: 'Complete SAT checklist and sign acceptance certificate', category: 'Sign-off', passFailCriteria: 'All major issues resolved, certificate signed', status: 'pending' }
    ]
  }
]

// =============================================================================
// IMPLEMENTATION MILESTONES & PAYMENT SCHEDULE
// =============================================================================

export interface Milestone {
  id: string
  name: string
  description: string
  paymentPercent: number
  deliverables: string[]
  status: 'pending' | 'in_progress' | 'completed'
  targetDate?: string
  actualDate?: string
}

export const milestones: Milestone[] = [
  {
    id: 'ms-1',
    name: 'Contract Signing / Project Kickoff',
    description: 'Initial project preparation and formal contract execution',
    paymentPercent: 10,
    deliverables: [
      'Signed contract',
      'Project kickoff meeting completed',
      'Project plan and timeline agreed',
      'Key contacts and escalation paths defined'
    ],
    status: 'pending'
  },
  {
    id: 'ms-2',
    name: 'Delivery of Equipment',
    description: 'All simulators, A/V hardware, and equipment delivered on-site',
    paymentPercent: 30,
    deliverables: [
      'All equipment delivered to site',
      'Inventory check completed (matches order)',
      'No shipping damage',
      'Storage/staging area prepared'
    ],
    status: 'pending'
  },
  {
    id: 'ms-3',
    name: 'Installation & Basic Functionality',
    description: 'All systems installed, powered on, and initial training completed',
    paymentPercent: 30,
    deliverables: [
      'All simulators set up and connected',
      'A/V system installed (cameras, mics, servers)',
      'Basic power-on testing completed',
      'Initial staff training sessions delivered',
      'Network connectivity verified'
    ],
    status: 'pending'
  },
  {
    id: 'ms-4',
    name: 'Site Acceptance Test Completion',
    description: 'Formal SAT passed - system fully operational per specifications',
    paymentPercent: 20,
    deliverables: [
      'All SAT checklist items passed',
      'Integrated scenario test successful',
      'LMS integration verified',
      'SAT results documented',
      'Acceptance sign-off obtained'
    ],
    status: 'pending'
  },
  {
    id: 'ms-5',
    name: 'Final Validation (Holdback Release)',
    description: '60-90 day operational warranty period - final payment holdback',
    paymentPercent: 10,
    deliverables: [
      'No critical issues during warranty period',
      'All documentation delivered (manuals, guides)',
      'Staff certification completed',
      'Any punch list items resolved',
      'Final sign-off and holdback release'
    ],
    status: 'pending'
  }
]

// =============================================================================
// CONTRACT CLAUSE CHECKLIST
// =============================================================================

export interface ContractClause {
  id: string
  category: string
  name: string
  description: string
  importance: 'critical' | 'important' | 'standard'
  included: boolean
  notes?: string
}

export const contractClauses: ContractClause[] = [
  // Scope & Deliverables
  { id: 'cc-1', category: 'Scope', name: 'Scope of Work', description: 'Enumerate all items and services to be delivered', importance: 'critical', included: false },
  { id: 'cc-2', category: 'Scope', name: 'Deliverables List', description: 'Specific simulator models, quantities, software versions', importance: 'critical', included: false },
  { id: 'cc-3', category: 'Scope', name: 'RFQ Response Reference', description: 'Append vendor proposal as statement of work', importance: 'important', included: false },

  // Acceptance & Testing
  { id: 'cc-4', category: 'Acceptance', name: 'FAT/SAT Process', description: 'Define acceptance testing procedures and criteria', importance: 'critical', included: false },
  { id: 'cc-5', category: 'Acceptance', name: 'Rejection Rights', description: 'Right to reject or require remedy if criteria not met', importance: 'critical', included: false },
  { id: 'cc-6', category: 'Acceptance', name: 'Re-testing Process', description: 'Process for re-testing after fixes', importance: 'important', included: false },

  // Payment
  { id: 'cc-7', category: 'Payment', name: 'Milestone Payment Schedule', description: 'Payment percentages tied to milestones', importance: 'critical', included: false },
  { id: 'cc-8', category: 'Payment', name: 'Holdback Terms', description: '10% holdback for 60-90 days post-acceptance', importance: 'critical', included: false },
  { id: 'cc-9', category: 'Payment', name: 'Holdback Release Conditions', description: 'Clear criteria for final payment release', importance: 'important', included: false },

  // Warranty & Support
  { id: 'cc-10', category: 'Warranty', name: 'Standard Warranty', description: 'Minimum 1 year on all hardware and software', importance: 'critical', included: false },
  { id: 'cc-11', category: 'Warranty', name: 'Warranty Start Date', description: 'Warranty begins at acceptance, not delivery', importance: 'important', included: false },
  { id: 'cc-12', category: 'Warranty', name: 'Extended Support Pricing', description: 'Locked pricing for years 2-5 maintenance', importance: 'important', included: false },
  { id: 'cc-13', category: 'Warranty', name: 'SLA Terms', description: 'Response times, on-site repair turnaround', importance: 'critical', included: false },
  { id: 'cc-14', category: 'Warranty', name: 'SLA Penalties', description: 'Remedies for failed SLA (credits, extended warranty)', importance: 'important', included: false },

  // Training
  { id: 'cc-15', category: 'Training', name: 'Training Obligations', description: 'On-site training for staff included', importance: 'critical', included: false },
  { id: 'cc-16', category: 'Training', name: 'Documentation Delivery', description: 'User manuals, technical manuals provided', importance: 'important', included: false },

  // Integration
  { id: 'cc-17', category: 'Integration', name: 'LMS Integration Commitment', description: 'Vendor assists with LMS/LTI integration', importance: 'critical', included: false },
  { id: 'cc-18', category: 'Integration', name: 'Integration Remedy', description: 'Failures remedied at no additional cost', importance: 'important', included: false },

  // Data & Security
  { id: 'cc-19', category: 'Data', name: 'Data Security Compliance', description: 'FERPA/HIPAA compliance, encryption standards', importance: 'critical', included: false },
  { id: 'cc-20', category: 'Data', name: 'Data Ownership', description: 'Institution owns all simulation data and videos', importance: 'critical', included: false },
  { id: 'cc-21', category: 'Data', name: 'Data Export Rights', description: 'Ability to export/retrieve data if contract ends', importance: 'important', included: false },
  { id: 'cc-22', category: 'Data', name: 'BAA (if applicable)', description: 'Business Associate Agreement for any PHI', importance: 'standard', included: false },

  // IP & Content
  { id: 'cc-23', category: 'IP', name: 'IP Ownership', description: 'Custom scenarios are ours, vendor packages are theirs', importance: 'important', included: false },
  { id: 'cc-24', category: 'IP', name: 'License Grants', description: 'Proper licenses for any third-party software', importance: 'important', included: false },

  // Timeline & Changes
  { id: 'cc-25', category: 'Timeline', name: 'Delivery Timeline', description: 'Agreed timeline for delivery and installation', importance: 'critical', included: false },
  { id: 'cc-26', category: 'Timeline', name: 'Delay Penalties', description: 'Liquidated damages for vendor-caused delays', importance: 'important', included: false },
  { id: 'cc-27', category: 'Changes', name: 'Change Management', description: 'Process for scope changes, written approval required', importance: 'important', included: false },

  // Upgrades
  { id: 'cc-28', category: 'Upgrades', name: 'Future Upgrade Rights', description: 'Discounted upgrades if new models released within 1 year', importance: 'standard', included: false },
  { id: 'cc-29', category: 'Upgrades', name: 'Software Update Policy', description: 'Updates included during warranty/support period', importance: 'important', included: false },

  // Termination
  { id: 'cc-30', category: 'Termination', name: 'Termination for Cause', description: 'Right to terminate and refund for vendor breach', importance: 'critical', included: false },
  { id: 'cc-31', category: 'Termination', name: 'Termination for Convenience', description: 'Notice period and obligations if we terminate early', importance: 'standard', included: false },
  { id: 'cc-32', category: 'Termination', name: 'Transition Assistance', description: 'Vendor assists with transition if needed', importance: 'standard', included: false },

  // Legal
  { id: 'cc-33', category: 'Legal', name: 'Dispute Resolution', description: 'Escalation, mediation, governing law', importance: 'standard', included: false },
  { id: 'cc-34', category: 'Legal', name: 'Performance Bond', description: 'Consider requiring for large procurements', importance: 'standard', included: false }
]

// =============================================================================
// VENDOR SCORECARD
// =============================================================================

export interface VendorScore {
  vendorId: string
  vendorName: string
  categoryScores: {
    categoryId: string
    rawScore: number // 0-100
    weightedScore: number
  }[]
  totalScore: number
  rank: number
  notes: string
}

// Helper function to calculate weighted score
export function calculateVendorScore(
  vendorName: string,
  scores: { categoryId: string; rawScore: number }[]
): VendorScore {
  const categoryScores = scores.map(s => {
    const category = rfqCategories.find(c => c.id === s.categoryId)
    const weight = category?.weight || 0
    return {
      categoryId: s.categoryId,
      rawScore: s.rawScore,
      weightedScore: (s.rawScore * weight) / 100
    }
  })

  const totalScore = categoryScores.reduce((sum, s) => sum + s.weightedScore, 0)

  return {
    vendorId: vendorName.toLowerCase().replace(/\s+/g, '-'),
    vendorName,
    categoryScores,
    totalScore,
    rank: 0, // Will be set when comparing multiple vendors
    notes: ''
  }
}

// =============================================================================
// PROCUREMENT TIMELINE
// =============================================================================

export interface ProcurementPhase {
  id: string
  name: string
  duration: string
  activities: string[]
  status: 'pending' | 'in_progress' | 'completed'
}

export const procurementTimeline: ProcurementPhase[] = [
  {
    id: 'phase-1',
    name: 'RFQ Development',
    duration: '2-3 weeks',
    activities: [
      'Finalize requirements and specifications',
      'Develop evaluation criteria and scorecard',
      'Draft RFQ document',
      'Internal review and approval',
      'Identify potential vendors'
    ],
    status: 'pending'
  },
  {
    id: 'phase-2',
    name: 'RFQ Distribution & Response',
    duration: '4-6 weeks',
    activities: [
      'Distribute RFQ to qualified vendors',
      'Conduct pre-bid conference (if applicable)',
      'Answer vendor questions',
      'Receive and log vendor proposals',
      'Initial completeness check'
    ],
    status: 'pending'
  },
  {
    id: 'phase-3',
    name: 'Proposal Evaluation',
    duration: '2-3 weeks',
    activities: [
      'Individual evaluator scoring',
      'Consensus meeting',
      'Reference checks',
      'Shortlist top 2-3 vendors',
      'Prepare for demonstrations'
    ],
    status: 'pending'
  },
  {
    id: 'phase-4',
    name: 'Vendor Demonstrations',
    duration: '2-3 weeks',
    activities: [
      'Schedule on-site demonstrations',
      'Conduct demos with evaluation team',
      'Hands-on testing by end users',
      'Update scores based on demos',
      'Final vendor ranking'
    ],
    status: 'pending'
  },
  {
    id: 'phase-5',
    name: 'Negotiation & Award',
    duration: '3-4 weeks',
    activities: [
      'Negotiate terms with top vendor',
      'Finalize contract clauses',
      'Legal review',
      'Obtain approvals',
      'Contract execution'
    ],
    status: 'pending'
  }
]

// =============================================================================
// SUMMARY FUNCTIONS
// =============================================================================

export function getProcurementSummary() {
  const totalWeight = rfqCategories.reduce((sum, c) => sum + c.weight, 0)
  const totalClauses = contractClauses.length
  const criticalClauses = contractClauses.filter(c => c.importance === 'critical').length
  const totalMilestones = milestones.length
  const totalPayment = milestones.reduce((sum, m) => sum + m.paymentPercent, 0)

  return {
    rfqCategories: rfqCategories.length,
    totalWeight,
    acceptanceTests: {
      fat: acceptanceTests.find(t => t.phase === 'FAT')?.steps.length || 0,
      sat: acceptanceTests.find(t => t.phase === 'SAT')?.steps.length || 0
    },
    milestones: totalMilestones,
    paymentSchedule: milestones.map(m => ({
      name: m.name,
      percent: m.paymentPercent
    })),
    contractClauses: {
      total: totalClauses,
      critical: criticalClauses,
      important: contractClauses.filter(c => c.importance === 'important').length,
      standard: contractClauses.filter(c => c.importance === 'standard').length
    },
    procurementPhases: procurementTimeline.length,
    estimatedDuration: '13-19 weeks'
  }
}
