// Community ROI Statistics and Benefits
// Generated from comprehensive research - December 2025

export interface ROIStat {
  id: string
  metric: string
  value: string
  description: string
  source?: string
  category: 'educational' | 'patient_safety' | 'community' | 'workforce' | 'economic'
}

export interface CommunityProgram {
  id: string
  name: string
  description: string
  targetAudience: string[]
  outcomes: string[]
  equipmentNeeded: string[]
  estimatedReach: string
  impactStats: string[]
}

// =============================================================================
// KEY ROI STATISTICS
// =============================================================================

export const educationalOutcomes: ROIStat[] = [
  {
    id: 'nclex-equivalence',
    metric: 'Clinical Hour Replacement',
    value: 'Up to 50%',
    description: 'Traditional clinical hours can be replaced with simulation with no difference in NCLEX pass rates (p = 0.737)',
    source: 'NCSBN National Simulation Study',
    category: 'educational'
  },
  {
    id: 'nclex-pass-rate',
    metric: 'NCLEX Pass Rate (2025)',
    value: '88.37%',
    description: 'First-time U.S.-educated RN candidates pass rate. Schools with robust simulation report higher rates.',
    source: 'ATI Testing Q1 2025',
    category: 'educational'
  },
  {
    id: 'student-confidence',
    metric: 'Student Self-Confidence',
    value: '4.29/5',
    description: 'Mean self-confidence score reported by students in simulation-based learning',
    source: 'PMC Nursing Satisfaction Study',
    category: 'educational'
  },
  {
    id: 'clinical-competency',
    metric: 'Manager Competency Rating',
    value: 'No significant difference',
    description: 'Manager ratings showed no difference in clinical competency at 6 weeks, 3 months, or 6 months post-graduation',
    source: 'NCSBN Study',
    category: 'educational'
  }
]

export const patientSafetyOutcomes: ROIStat[] = [
  {
    id: 'error-reduction',
    metric: 'Preventable Error Reduction',
    value: '40%',
    description: 'Reduction in preventable errors at institutions integrating simulation training',
    source: 'BMJ Quality & Safety 2023',
    category: 'patient_safety'
  },
  {
    id: 'clabsi-reduction',
    metric: 'CLABSI Reduction',
    value: '50%',
    description: 'Reduction in central line-associated bloodstream infections with simulation training',
    source: 'The Joint Commission Journal',
    category: 'patient_safety'
  },
  {
    id: 'medication-errors',
    metric: 'Medication Error Reduction',
    value: '35%',
    description: 'Reduction in medication errors over one year with simulation training for pharmacists and nurses',
    source: 'PMC Simulation Impact Review',
    category: 'patient_safety'
  },
  {
    id: 'surgical-complications',
    metric: 'Surgical Complications',
    value: '30% reduction',
    description: 'Reduction in surgical complications with simulation-based surgical training',
    source: 'PMC Simulation Impact Review',
    category: 'patient_safety'
  },
  {
    id: 'code-blue-survival',
    metric: 'Code Blue Survival',
    value: '50% improvement',
    description: 'Survival rates increased approximately 50% correlating with increased mock code simulations (r = 0.87)',
    source: 'PMC Mock Code Study',
    category: 'patient_safety'
  },
  {
    id: 'falls-reduction',
    metric: 'Inpatient Falls Reduction',
    value: '54%',
    description: 'One facility reduced inpatient falls by 54% using hospital fall risk simulation',
    source: 'PMC Falls Simulation Study',
    category: 'patient_safety'
  },
  {
    id: 'med-admin-compliance',
    metric: 'Medication Administration Compliance',
    value: '51% → 84%',
    description: 'Adherence to medication administration best practices improved after simulation training',
    source: 'MedVisionSim',
    category: 'patient_safety'
  }
]

export const communityImpactStats: ROIStat[] = [
  {
    id: 'narcan-lives-saved',
    metric: 'Naloxone Lives Saved',
    value: '16,000+',
    description: 'Lives saved over a 12-month period through community naloxone programs',
    source: 'CDC Report',
    category: 'community'
  },
  {
    id: 'narcan-revival-rate',
    metric: 'Naloxone Revival Rate',
    value: '90%',
    description: 'Revival rate among overdose victims who received naloxone',
    source: 'NPR Overdose Report',
    category: 'community'
  },
  {
    id: 'cpr-survival-improvement',
    metric: 'CPR Survival Improvement',
    value: '2-3x',
    description: 'CPR doubles or triples cardiac arrest survival chances if performed immediately',
    source: 'American Heart Association',
    category: 'community'
  },
  {
    id: 'trafficking-identification',
    metric: 'Trafficking Identification',
    value: 'Up to 50%',
    description: 'The right training increases healthcare provider identification of trafficking victims by up to 50%',
    source: 'Congress.gov Report',
    category: 'community'
  },
  {
    id: 'soar-confidence',
    metric: 'SOAR Training Confidence',
    value: '90%+',
    description: 'Over 90% of SOAR-trained professionals reported high/very high confidence in identifying trafficking',
    source: 'NHTTAC SOAR Program',
    category: 'community'
  },
  {
    id: 'stop-bleed-response',
    metric: 'Stop the Bleed Response Time',
    value: '55% faster',
    description: 'Trained group response time to solution: 3:33 vs untrained: 8:00 minutes',
    source: 'PMC Stop the Bleed Study',
    category: 'community'
  },
  {
    id: 'stroke-treatment-increase',
    metric: 'Stroke Treatment Rate Increase',
    value: '55%',
    description: 'Mass media campaigns increased IVT treatment rate from 7.3 to 11.3 patients/month',
    source: 'PMC Stroke Education Review',
    category: 'community'
  },
  {
    id: 'mhfa-trained',
    metric: 'Mental Health First Aid',
    value: '4.5M+',
    description: 'First Aiders trained across all 50 states since 2008',
    source: 'MHFA USA',
    category: 'community'
  }
]

export const workforceStats: ROIStat[] = [
  {
    id: 'rn-retention-savings',
    metric: 'RN Retention Savings',
    value: '$157,000',
    description: 'Every RN hired/retained saves the organization',
    source: 'NSI Retention Report 2025',
    category: 'workforce'
  },
  {
    id: 'simulation-retention',
    metric: 'Simulation Retention ROI',
    value: '$790,000',
    description: '48-month retention savings if 1 physician and 1 nurse stay annually due to training',
    source: 'PMC ROI Framework',
    category: 'workforce'
  },
  {
    id: 'magnet-turnover',
    metric: 'Magnet Hospital Turnover',
    value: '12-13%',
    description: 'Magnet hospitals have 12-13% nursing turnover vs. industry average of 22%',
    source: 'ANA Magnet Program',
    category: 'workforce'
  },
  {
    id: 'nursing-grad-increase',
    metric: 'Nursing Graduate Increase',
    value: '43%',
    description: 'Maryland Clinical Simulation Resource Consortium increased nursing graduates by 43% vs national 21%',
    source: 'Beckers Simulation Programs',
    category: 'workforce'
  }
]

export const economicStats: ROIStat[] = [
  {
    id: 'healthcare-job-creation',
    metric: 'Healthcare Job Creation',
    value: '1.6M jobs',
    description: 'Healthcare projected to add 1.6 million jobs (2023-2033) - 24% of all new jobs',
    source: 'Bureau of Labor Statistics',
    category: 'economic'
  },
  {
    id: 'job-multiplier',
    metric: 'Job Multiplier Effect',
    value: '1.3x',
    description: 'Every healthcare job creates 1.3 indirect jobs in logistics, administration, and technology',
    source: 'Altarum Healthcare Employment',
    category: 'economic'
  },
  {
    id: 'rural-hospital-impact',
    metric: 'Rural Hospital Economic Impact',
    value: '599 jobs',
    description: 'Rural short-term general hospital associated with 599 jobs in county',
    source: 'AHA Economic Anchors Report',
    category: 'economic'
  },
  {
    id: 'physician-economic-impact',
    metric: 'Physician Economic Impact',
    value: '$1.4M+',
    description: 'Rural primary care physician generates in wages, salaries, and benefits to local community',
    source: 'Rural Health Info Hub',
    category: 'economic'
  }
]

// =============================================================================
// COMMUNITY TRAINING PROGRAMS
// =============================================================================

export const communityPrograms: CommunityProgram[] = [
  {
    id: 'narcan-training',
    name: 'Narcan/Opioid Response Training',
    description: 'Train home health workers, social workers, and community members to recognize and respond to opioid overdoses.',
    targetAudience: ['Home health workers', 'Social workers', 'First responders', 'Community members', 'Family members of at-risk individuals'],
    outcomes: [
      '90% revival rate when naloxone administered',
      '27% decline in overdose deaths (2024)',
      'Confidence in emergency response'
    ],
    equipmentNeeded: ['Training manikins', 'Practice naloxone devices', 'AV recording for scenarios'],
    estimatedReach: '500+ community members annually',
    impactStats: [
      'Tennessee: 103,000+ documented lives saved',
      'Indiana: 1 million+ individuals trained',
      'Baltimore: 18,000+ overdose reversals'
    ]
  },
  {
    id: 'cpr-first-aid',
    name: 'CPR & First Aid Certification',
    description: 'Community-wide CPR and first aid training for scouts, college students, school staff, and general public.',
    targetAudience: ['Boy Scouts/Girl Scouts', 'College students', 'School staff', 'Athletic coaches', 'General public'],
    outcomes: [
      'Double or triple cardiac arrest survival',
      'Increased bystander CPR rates',
      'Confidence in emergency response'
    ],
    equipmentNeeded: ['CPR manikins (adult/child/infant)', 'AED trainers', 'First aid supplies', 'Training space'],
    estimatedReach: '1,000+ community members annually',
    impactStats: [
      '350,000 out-of-hospital cardiac arrests occur annually',
      'Survival decreases 10% for every minute without CPR/AED',
      '3.8 million people train in Red Cross CPR annually'
    ]
  },
  {
    id: 'stop-the-bleed',
    name: 'Stop the Bleed Campaign',
    description: 'Train community members to control life-threatening bleeding in emergency situations.',
    targetAudience: ['Teachers', 'Security personnel', 'Community members', 'Event staff', 'Law enforcement'],
    outcomes: [
      '55% faster response time after training',
      'Increased confidence in tourniquet application (2.4 → 4.7/5)',
      'Save lives from traumatic bleeding'
    ],
    equipmentNeeded: ['Bleeding control trainers', 'Tourniquet trainers', 'Wound packing simulators', 'Stop the Bleed kits'],
    estimatedReach: '300+ community members annually',
    impactStats: [
      'Traumatic injuries are leading cause of death under 44',
      'Nearly 1/3 of trauma deaths from bleeding',
      'Training kits cost approximately $250 each'
    ]
  },
  {
    id: 'stroke-fast',
    name: 'Stroke FAST Recognition',
    description: 'Train community to recognize stroke symptoms using FAST protocol and respond appropriately.',
    targetAudience: ['Senior centers', 'Church groups', 'Community organizations', 'Caregivers', 'General public'],
    outcomes: [
      'Faster recognition of stroke symptoms',
      'Increased emergency call rates (53% → 83%)',
      'Earlier treatment within critical window'
    ],
    equipmentNeeded: ['Educational materials', 'Simulation scenarios', 'AV equipment'],
    estimatedReach: '200+ community members annually',
    impactStats: [
      'Stroke is 2nd leading cause of death globally',
      'Treatment window: 3-4.5 hours from symptom onset',
      '97% increase in suspected stroke ER admissions after campaigns'
    ]
  },
  {
    id: 'human-trafficking',
    name: 'Human Trafficking Recognition (VR)',
    description: 'VR-based training to help healthcare workers and community members recognize signs of human trafficking.',
    targetAudience: ['Healthcare workers', 'Social workers', 'Law enforcement', 'Hospitality workers', 'Transportation workers'],
    outcomes: [
      'Up to 50% increase in victim identification',
      '90%+ confidence in recognition after training',
      'Proper response protocols'
    ],
    equipmentNeeded: ['VR headsets', 'SOAR training curriculum', 'Scenario software'],
    estimatedReach: '100+ professionals annually',
    impactStats: [
      '68% of survivors interact with healthcare during exploitation',
      'Fewer than 5% of providers have identified trafficking',
      '21 million adults and children trafficked globally'
    ]
  },
  {
    id: 'mental-health-first-aid',
    name: 'Mental Health First Aid',
    description: 'Train community members to recognize and respond to mental health crises and substance use issues.',
    targetAudience: ['Teachers', 'First responders', 'HR professionals', 'Community leaders', 'Parents'],
    outcomes: [
      'Increased mental health knowledge',
      'Increased confidence to help',
      'Reduced stigma toward mental illness'
    ],
    equipmentNeeded: ['MHFA curriculum materials', 'Training space', 'Simulation scenarios'],
    estimatedReach: '150+ community members annually',
    impactStats: [
      '4.5 million+ First Aiders trained since 2008',
      'Available in 29 countries worldwide',
      'Goal: Train 1 in 15 Americans'
    ]
  },
  {
    id: 'ems-ce',
    name: 'EMS Continuing Education',
    description: 'Provide simulation-based continuing education for local EMS providers.',
    targetAudience: ['Paramedics', 'EMTs', 'Fire department medical personnel', 'Volunteer EMS'],
    outcomes: [
      'Maintain certifications',
      'Practice high-acuity, low-frequency scenarios',
      'Improved team coordination'
    ],
    equipmentNeeded: ['High-fidelity patient simulators', 'AV debriefing system', 'Medical equipment'],
    estimatedReach: '50+ EMS providers annually',
    impactStats: [
      'EMS continuing education required for certification',
      'Simulation provides safe environment for critical scenarios',
      'Improves regional emergency response capabilities'
    ]
  },
  {
    id: 'disaster-prep',
    name: 'Disaster Preparedness Training',
    description: 'Train hospital staff and community responders for mass casualty incidents and disasters.',
    targetAudience: ['Hospital staff', 'Emergency responders', 'Community volunteers', 'Local government'],
    outcomes: [
      'Improved emergency response coordination',
      'Practice with PPE and decontamination',
      'Better communication protocols'
    ],
    equipmentNeeded: ['Mass casualty simulation manikins', 'Triage tags', 'Communication equipment', 'PPE'],
    estimatedReach: '200+ responders annually',
    impactStats: [
      'CDP offers 50+ training courses at no cost',
      'Rural hospitals face unique disaster challenges',
      'Exercises reveal strengths/weaknesses in response'
    ]
  }
]

// =============================================================================
// COST OF PREVENTABLE HARM
// =============================================================================

export const preventableHarmCosts = {
  medicalErrors: {
    annualDeaths: '250,000+',
    deathsDescription: 'Annual U.S. deaths due to medical errors - 3rd leading cause of death',
    globalHarm: '1 in 10 patients',
    harmDescription: 'Patients harmed in healthcare settings globally (WHO 2024)'
  },
  specificCosts: [
    { event: 'CLABSI (per patient)', cost: 58614 },
    { event: 'CAUTI (per patient)', cost: 896 },
    { event: 'Average preventable adverse event', cost: 58776 },
    { event: 'Annual marginal cost of preventable events', cost: 17100000000 },
    { event: 'Never events excess costs', cost: 3700000000 }
  ],
  medicationErrors: {
    annual: '1.5 million',
    description: 'Preventable medication errors occur annually (IOM)',
    globalCost: '$42 billion annually',
    globalDescription: '1% of global health expenditure'
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getAllROIStats = (): ROIStat[] => [
  ...educationalOutcomes,
  ...patientSafetyOutcomes,
  ...communityImpactStats,
  ...workforceStats,
  ...economicStats
]

export const getStatsByCategory = (category: ROIStat['category']): ROIStat[] => {
  return getAllROIStats().filter(stat => stat.category === category)
}

export const getHighImpactStats = (): ROIStat[] => {
  // Return stats with the most impressive numbers
  const highImpactIds = [
    'error-reduction', 'clabsi-reduction', 'code-blue-survival',
    'narcan-lives-saved', 'cpr-survival-improvement', 'rn-retention-savings',
    'nclex-equivalence', 'job-multiplier'
  ]
  return getAllROIStats().filter(stat => highImpactIds.includes(stat.id))
}
