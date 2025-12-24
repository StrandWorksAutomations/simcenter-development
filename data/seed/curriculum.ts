// Curriculum Architecture Data
// Prompt 21: Scenario library + mandatory education conversion plan

export interface LearnerPathway {
  id: string
  name: string
  description: string
  icon: string
  monthlyHours: number
  year1Focus: string[]
  year2Focus: string[]
  year3Focus: string[]
}

export interface Scenario {
  id: string
  name: string
  description: string
  yearIntroduced: number
  targetLearners: string[]
  modalities: string[]
  criticalActions: string[]
  priority: 'critical' | 'high' | 'medium'
  duration: string
}

export interface EvaluationTool {
  id: string
  name: string
  type: string
  description: string
  useCase: string
  metrics: string[]
}

export interface CurriculumYear {
  year: number
  theme: string
  description: string
  scenariosAdded: number
  keyMilestones: string[]
}

// Learner Pathways
export const LEARNER_PATHWAYS: LearnerPathway[] = [
  {
    id: 'nursing',
    name: 'Nursing Pathway',
    description: 'Progressive simulation training from basic ward emergencies to leadership in complex team scenarios.',
    icon: 'Heart',
    monthlyHours: 8,
    year1Focus: [
      'Patient deterioration recognition (early warning signs)',
      'Rapid response activation and SBAR communication',
      'Basic code team roles in cardiac arrest',
      'Medication safety (high-alert med administration)',
      'Septic shock on ward with initial stabilization'
    ],
    year2Focus: [
      'Team leader roles in ACLS codes',
      'STEMI activation coordination with cath lab',
      'Stroke code with tPA administration workflow',
      'Delegation and supervising junior staff',
      'Virtual/VR modules for sepsis protocol reinforcement'
    ],
    year3Focus: [
      'Interdisciplinary coordination in complex scenarios',
      'Multi-patient disaster drills',
      'ICU patient handoff scenarios',
      'Ethical dilemmas and end-of-life discussions',
      'In-situ simulations on actual clinical units'
    ]
  },
  {
    id: 'allied-health',
    name: 'Allied Health Pathway',
    description: 'Role-specific emergency skills for respiratory therapists, pharmacists, radiology techs, and others.',
    icon: 'Users',
    monthlyHours: 8,
    year1Focus: [
      'Airway management simulation (bag-valve, intubation assist)',
      'Medication safety - drug interaction/error identification',
      'Stroke activation drill (CT imaging coordination)',
      'SBAR communication with nurses/physicians',
      'Equipment troubleshooting under pressure'
    ],
    year2Focus: [
      'Difficult airway management with advanced techniques',
      'Pharmacist embedded in sepsis management',
      'STEMI and trauma team participation',
      'Handoff simulations (fall risk, mobility precautions)',
      'Speaking up and assertiveness training'
    ],
    year3Focus: [
      'Perioperative emergency (OR code) team participation',
      'ICU deterioration with multi-team response',
      'Cross-functional leadership roles',
      'In-situ drills in actual departments',
      'Quality improvement integration'
    ]
  },
  {
    id: 'ems',
    name: 'EMS Pathway',
    description: 'Prehospital scenarios aligned with NAEMT standards, progressing to leadership and inter-agency coordination.',
    icon: 'Ambulance',
    monthlyHours: 8,
    year1Focus: [
      'Field sepsis recognition and protocol activation',
      'Chest pain/STEMI - 12-lead ECG interpretation, prearrival alert',
      'Stroke recognition (Cincinnati scale, last known well)',
      'EMS-to-ER handoff with SBAR',
      'On-scene communication with other agencies'
    ],
    year2Focus: [
      'Mass casualty incident (MCI) triage drill',
      'Pediatric sepsis/asthma scenarios',
      'Advanced airway (video laryngoscopy, needle decompression)',
      'Combined prehospital-to-hospital trauma simulation',
      'Participating in in-hospital codes for continuity of care'
    ],
    year3Focus: [
      'Community disaster with incident command',
      'Inter-agency coordination exercises',
      'Joint EMS-ED cardiac arrest management',
      'Leadership and delegation under pressure',
      'Protocol development and quality review'
    ]
  },
  {
    id: 'interprofessional',
    name: 'Interprofessional Team Training',
    description: 'Quarterly team simulations bringing together nursing, physicians, EMS, and allied health for crisis teamwork.',
    icon: 'Network',
    monthlyHours: 4,
    year1Focus: [
      'Rapid Response Team simulation (anaphylactic shock)',
      'ACLS cardiac arrest in ED (multi-role)',
      'TeamSTEPPS principles and closed-loop communication',
      'Role clarity and shared mental model',
      'Observer participation and peer feedback'
    ],
    year2Focus: [
      'Sepsis care continuum (EMS → ED → ICU)',
      'STEMI activation drill (ED → Cath lab)',
      'Stroke code (EMS → ED → Radiology → Pharmacy)',
      'Authority gradient scenarios (speaking up)',
      'Error disclosure and communication challenges'
    ],
    year3Focus: [
      'In-situ simulations on actual units',
      'Hospital-wide deterioration scenarios',
      'Perioperative emergencies',
      'Multi-patient prioritization drills',
      'Handoff and continuity of care scenarios'
    ]
  }
]

// Scenario Library
export const SCENARIO_LIBRARY: Scenario[] = [
  // Year 1 Foundation
  {
    id: 'patient-deterioration',
    name: 'Patient Deterioration / Rapid Response',
    description: 'Inpatient exhibiting early signs of deterioration (dropping BP, altered mental status) evolving into sepsis or shock.',
    yearIntroduced: 1,
    targetLearners: ['Nursing', 'RRT Members'],
    modalities: ['High-fidelity manikin', 'Virtual patient monitor'],
    criticalActions: ['Recognize warning signs (MEWS/EWS)', 'Activate Rapid Response Team', 'SBAR communication', 'Initial stabilization (O2, IV, fluids)'],
    priority: 'critical',
    duration: '20-30 min'
  },
  {
    id: 'septic-shock',
    name: 'Septic Shock (ED/ICU)',
    description: 'Patient with pneumonia develops severe sepsis requiring 1-hour bundle completion.',
    yearIntroduced: 1,
    targetLearners: ['Nursing', 'Physicians', 'Pharmacists'],
    modalities: ['High-fidelity manikin', 'Interprofessional team'],
    criticalActions: ['Identify organ dysfunction', 'Activate sepsis protocol', 'Blood cultures', 'Lactate', 'IV fluids ≥30ml/kg', 'Antibiotics within 1 hour'],
    priority: 'critical',
    duration: '30-45 min'
  },
  {
    id: 'stemi',
    name: 'Chest Pain to STEMI',
    description: 'Patient with chest pain diagnosed as acute MI requiring cath lab activation.',
    yearIntroduced: 1,
    targetLearners: ['EMS', 'ED Nursing', 'Cardiology'],
    modalities: ['High-fidelity manikin', 'EMS handoff'],
    criticalActions: ['ECG acquisition', 'STEMI identification', 'Code STEMI activation', 'Aspirin, IV, O2', 'Communication with cath lab'],
    priority: 'critical',
    duration: '25-35 min'
  },
  {
    id: 'stroke',
    name: 'Acute Ischemic Stroke',
    description: 'Elderly patient with unilateral weakness and aphasia requiring stroke alert activation.',
    yearIntroduced: 1,
    targetLearners: ['EMS', 'ED Nursing', 'Neurology', 'Radiology', 'Pharmacy'],
    modalities: ['High-fidelity manikin', 'Interprofessional team'],
    criticalActions: ['FAST exam', 'Note last known well time', 'Stroke Alert activation', 'CT within 20 min', 'tPA preparation if indicated'],
    priority: 'critical',
    duration: '30-40 min'
  },
  {
    id: 'code-blue',
    name: 'Airway Management / Code Blue',
    description: 'Patient in cardiac arrest requiring high-quality CPR, defibrillation, and ACLS.',
    yearIntroduced: 1,
    targetLearners: ['All Clinical Staff'],
    modalities: ['High-fidelity manikin', 'Code team'],
    criticalActions: ['High-quality CPR', 'Early defibrillation', 'Airway management', 'ACLS drug administration', 'Post-ROSC care'],
    priority: 'critical',
    duration: '20-30 min'
  },
  {
    id: 'med-safety',
    name: 'Medication Safety Scenario',
    description: 'Medication administration OSCE with embedded errors (dosing, allergy, wrong patient).',
    yearIntroduced: 1,
    targetLearners: ['Nursing', 'Pharmacy'],
    modalities: ['Standardized patient', 'Skills station'],
    criticalActions: ['Five rights verification', 'Allergy check', 'Barcode scanning', 'Patient communication', 'Error identification and reporting'],
    priority: 'high',
    duration: '15-20 min'
  },
  // Year 2 Expansion
  {
    id: 'pediatric-emergency',
    name: 'Pediatric Respiratory Failure',
    description: 'Toddler with severe asthma exacerbation progressing to respiratory arrest.',
    yearIntroduced: 2,
    targetLearners: ['Nursing', 'Allied Health', 'Physicians'],
    modalities: ['Pediatric manikin', 'Broselow tape'],
    criticalActions: ['Pediatric assessment', 'Weight-based dosing', 'Airway management', 'Team communication with family'],
    priority: 'high',
    duration: '25-35 min'
  },
  {
    id: 'ob-hemorrhage',
    name: 'Postpartum Hemorrhage',
    description: 'OB emergency with massive hemorrhage requiring team response and blood bank coordination.',
    yearIntroduced: 2,
    targetLearners: ['OB Nursing', 'Obstetrician', 'Anesthesia'],
    modalities: ['OB manikin', 'Blood bank simulation'],
    criticalActions: ['Recognize hemorrhage', 'Activate MTP', 'Uterine massage', 'Blood product administration', 'Team coordination'],
    priority: 'high',
    duration: '30-40 min'
  },
  {
    id: 'handoff',
    name: 'Complex Patient Handoff',
    description: 'ICU shift-change handoff with multiple patients, interruptions, and critical information transfer.',
    yearIntroduced: 2,
    targetLearners: ['Nursing', 'Physicians', 'Allied Health'],
    modalities: ['OSCE station', 'Standardized patient'],
    criticalActions: ['I-PASS/SBAR framework', 'Complete information transfer', 'Manage interruptions', 'Verify understanding'],
    priority: 'high',
    duration: '15-25 min'
  },
  {
    id: 'advanced-sepsis',
    name: 'Advanced Sepsis → Cardiac Arrest',
    description: 'Sepsis case deteriorating to code blue, testing seamless transition from sepsis to ACLS.',
    yearIntroduced: 2,
    targetLearners: ['Experienced Providers', 'Mixed Teams'],
    modalities: ['High-fidelity manikin', 'Extended scenario'],
    criticalActions: ['Sepsis bundle completion', 'Recognition of deterioration', 'Transition to ACLS', 'Family communication', 'Post-event discussion'],
    priority: 'high',
    duration: '45-60 min'
  },
  {
    id: 'teamwork-crm',
    name: 'Teamwork/CRM Focused Scenario',
    description: 'ED patient with multiple issues designed to challenge team communication and leadership.',
    yearIntroduced: 2,
    targetLearners: ['Interprofessional Teams'],
    modalities: ['High-fidelity manikin', 'TeamSTEPPS assessment'],
    criticalActions: ['Leadership establishment', 'Closed-loop communication', 'Mutual support', 'Speaking up', 'Conflict resolution'],
    priority: 'medium',
    duration: '30-40 min'
  },
  // Year 3 Maturation
  {
    id: 'multi-patient',
    name: 'Multi-Patient Ward Simulation',
    description: 'One team managing 2-3 patients with different issues simultaneously.',
    yearIntroduced: 3,
    targetLearners: ['Experienced Nursing', 'Team Leaders'],
    modalities: ['Multiple manikins/SPs', 'In-situ'],
    criticalActions: ['Prioritization', 'Delegation', 'Time management', 'Help activation', 'System navigation'],
    priority: 'medium',
    duration: '45-60 min'
  },
  {
    id: 'in-situ-code',
    name: 'In-Situ Code Blue Drill',
    description: 'Surprise code blue on actual unit with on-duty staff using portable manikin.',
    yearIntroduced: 3,
    targetLearners: ['Unit Staff', 'Code Team'],
    modalities: ['In-situ', 'Real equipment'],
    criticalActions: ['Response time', 'Equipment location', 'Team assembly', 'Protocol adherence', 'Latent safety threat identification'],
    priority: 'high',
    duration: '20-30 min'
  },
  {
    id: 'behavioral-crisis',
    name: 'Behavioral Health Crisis',
    description: 'Managing an agitated patient safely with de-escalation techniques.',
    yearIntroduced: 3,
    targetLearners: ['ED Staff', 'Behavioral Health', 'Security'],
    modalities: ['Standardized patient', 'De-escalation'],
    criticalActions: ['Safety assessment', 'De-escalation techniques', 'Team coordination', 'Medication if needed', 'Documentation'],
    priority: 'medium',
    duration: '20-30 min'
  }
]

// Curriculum Development Timeline
export const CURRICULUM_YEARS: CurriculumYear[] = [
  {
    year: 1,
    theme: 'Foundation',
    description: 'Establish core high-priority scenarios addressing most urgent mandatory education topics.',
    scenariosAdded: 6,
    keyMilestones: [
      'Develop 5-6 foundational scenarios (deterioration, sepsis, STEMI, stroke, code blue, med safety)',
      'Create checklists and instructor guides for each scenario',
      'Integrate simulation into new hire orientation',
      'Collect baseline metrics for participation and competency',
      'Train initial cohort of simulation faculty'
    ]
  },
  {
    year: 2,
    theme: 'Expansion & Enhancement',
    description: 'Expand scenario library with additional scenarios and variations for advanced learners.',
    scenariosAdded: 6,
    keyMilestones: [
      'Add pediatric, OB/newborn, and advanced scenarios',
      'Implement handoff and medication reconciliation scenarios',
      'Create teamwork/CRM focused scenarios',
      'Develop scenario variations to prevent memorization',
      'Begin storing scenarios in repository system'
    ]
  },
  {
    year: 3,
    theme: 'Maturation & Sustainment',
    description: 'Refine library, implement in-situ simulations, and establish assessment/certification scenarios.',
    scenariosAdded: 4,
    keyMilestones: [
      'Launch multi-patient and in-situ simulation program',
      'Implement OSCE-style competency assessments',
      'Establish annual scenario review cycle',
      'Create scenario inventory matrix',
      'Achieve comprehensive coverage of all priority topics'
    ]
  }
]

// Evaluation Tools
export const EVALUATION_TOOLS: EvaluationTool[] = [
  {
    id: 'performance-checklist',
    name: 'Performance Checklists',
    type: 'Checklist',
    description: 'Scenario-specific checklist documenting critical actions and skills performed.',
    useCase: 'During/after each simulation scenario',
    metrics: ['Critical actions completed', 'Time to key interventions', 'Correct sequence', 'Safety behaviors']
  },
  {
    id: 'global-rating',
    name: 'Global Rating Scales (GRS)',
    type: 'Rating Scale',
    description: 'Likert-scale rating of overall performance quality (clinical judgment, leadership, communication).',
    useCase: 'After simulation by trained raters',
    metrics: ['Overall competence (1-5)', 'Clinical judgment', 'Leadership', 'Situation awareness']
  },
  {
    id: 'teamwork-rubric',
    name: 'Teamwork Assessment Scale (TAS)',
    type: 'Rubric',
    description: '14-item observational tool measuring team coordination, cooperation, information exchange.',
    useCase: 'Team simulations',
    metrics: ['Coordination', 'Cooperation', 'Information exchange', 'Adaptability', 'Leadership']
  },
  {
    id: 'teamstepps-tpot',
    name: 'TeamSTEPPS TPOT',
    type: 'Rubric',
    description: 'Team Performance Observation Tool scoring leadership, mutual support, communication, monitoring.',
    useCase: 'Interprofessional team simulations',
    metrics: ['Team leadership', 'Mutual support', 'Situation monitoring', 'Communication']
  },
  {
    id: 'nln-satisfaction',
    name: 'NLN Satisfaction & Confidence Scale',
    type: 'Survey',
    description: 'Validated questionnaire measuring learner satisfaction with simulation and self-confidence.',
    useCase: 'Post-simulation survey',
    metrics: ['Satisfaction with design', 'Perceived realism', 'Self-confidence', 'Intent to change practice']
  },
  {
    id: 'osce',
    name: 'Simulation OSCE',
    type: 'Assessment',
    description: 'Structured practical exam with simulation stations testing specific skills and decision-making.',
    useCase: 'Annual competency assessment',
    metrics: ['Station scores', 'Pass/fail on critical actions', 'Global performance rating', 'Time to completion']
  }
]

// Helper functions
export function getScenariosByYear(year: number): Scenario[] {
  return SCENARIO_LIBRARY.filter(s => s.yearIntroduced === year)
}

export function getPathwayById(id: string): LearnerPathway | undefined {
  return LEARNER_PATHWAYS.find(p => p.id === id)
}

export function getStats() {
  return {
    pathways: LEARNER_PATHWAYS.length,
    scenarios: SCENARIO_LIBRARY.length,
    evaluationTools: EVALUATION_TOOLS.length,
    totalMonthlyHours: 8
  }
}
