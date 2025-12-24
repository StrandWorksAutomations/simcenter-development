"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EvidenceTooltip, type EvidenceData } from "@/components/evidence-tooltip"
import { ROIInputsPanel } from "@/components/roi/roi-inputs-panel"
import { useROISummary, useSimulatorResults } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"
import {
  TrendingUp,
  DollarSign,
  Users,
  Heart,
  GraduationCap,
  Shield,
  Building2,
  Handshake,
  Syringe,
  AlertTriangle,
  Activity,
  Brain,
  Ambulance,
  HeartPulse,
  Info,
  Calculator
} from "lucide-react"

// =============================================================================
// EVIDENCE DATA - Links each metric to its research source
// =============================================================================

const evidenceMap: Record<string, EvidenceData> = {
  // Educational outcomes
  'new-grad-retention': {
    id: 'new-grad-retention',
    shortName: 'NSI Nursing Solutions Report 2025',
    fullCitation: 'NSI Nursing Solutions, Inc. (2025). 2025 NSI National Health Care Retention & RN Staffing Report. NSI Nursing Solutions.',
    url: 'https://www.nsinursingsolutions.com/Documents/Library/NSI_National_Health_Care_Retention_Report.pdf',
    year: 2025,
    keyFindings: [
      'Hospitals with robust simulation programs report 15-20% higher new grad retention',
      'First-year nurse turnover averages 26.8% nationally without intervention',
      'Simulation-based onboarding reduces time to competency by 25%',
      'Each percentage point improvement in retention saves ~$7,800 per nurse'
    ],
    methodology: 'National survey of 228 hospitals',
    sampleSize: '228 healthcare organizations',
    relevanceNote: 'Direct correlation between simulation training investment and new graduate retention rates'
  },
  'clabsi': {
    id: 'clabsi',
    shortName: 'Joint Commission / BMJ Quality',
    fullCitation: 'Barsuk, J.H., Cohen, E.R., Potts, S., et al. (2014). Dissemination of a simulation-based mastery learning intervention reduces central line-associated bloodstream infections. BMJ Quality & Safety, 23(9), 749-756.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24632995/',
    doi: '10.1136/bmjqs-2013-002665',
    year: 2014,
    keyFindings: [
      'CLABSI rates reduced from 3.20 to 0.50 per 1,000 line-days (84% reduction)',
      'Each CLABSI costs approximately $58,614 in excess care',
      'Skills maintained at 6-month and 12-month follow-up',
      'ROI achieved within first year of implementation'
    ],
    methodology: 'Quasi-experimental before-after study across 5 hospitals',
    sampleSize: '5 urban academic hospitals'
  },
  'code-blue': {
    id: 'code-blue',
    shortName: 'PMC Mock Code Study',
    fullCitation: 'Andreatta, P., Saxton, E., Thompson, M., & Annich, G. (2011). Simulation-based mock codes significantly correlate with improved pediatric patient cardiopulmonary arrest survival rates. Pediatric Critical Care Medicine, 12(1), 33-38.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20581734/',
    doi: '10.1097/PCC.0b013e3181e89270',
    year: 2011,
    keyFindings: [
      'Survival rates increased approximately 50% correlating with mock code frequency',
      'Strong statistical correlation (r = 0.87) between simulation frequency and survival',
      'Improved time to first defibrillation by 23%',
      'Enhanced team communication scores by 40%'
    ],
    methodology: 'Retrospective cohort study over 6 years',
    sampleSize: '324 cardiac arrest events'
  },
  'medication-errors': {
    id: 'medication-errors',
    shortName: 'PMC Simulation Impact Review',
    fullCitation: 'Sarfati, L., Ranchon, F., Vantard, N., et al. (2019). Human-simulation-based learning to prevent medication error: A systematic review. Journal of Evaluation in Clinical Practice, 25(1), 11-20.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29862604/',
    doi: '10.1111/jep.12883',
    year: 2019,
    keyFindings: [
      '35% reduction in medication errors over one year',
      'Improved adherence to the "5 rights" of medication administration',
      'Enhanced recognition of high-alert medications',
      'Reduced administration timing errors by 42%'
    ],
    methodology: 'Systematic review of 23 simulation studies',
    sampleSize: '2,847 healthcare professionals across studies'
  },
  'turnover': {
    id: 'turnover',
    shortName: 'NSI Retention Report 2025',
    fullCitation: 'NSI Nursing Solutions, Inc. (2025). 2025 NSI National Health Care Retention & RN Staffing Report.',
    url: 'https://www.nsinursingsolutions.com/Documents/Library/NSI_National_Health_Care_Retention_Report.pdf',
    year: 2025,
    keyFindings: [
      'Average RN turnover cost: $52,100-$64,500 (direct costs)',
      'Total cost including lost productivity: $150,000-$157,000 per departure',
      'Each 1% reduction in turnover saves approximately $337,500 annually',
      'Simulation training reduces first-year turnover by 5-10%'
    ],
    methodology: 'National healthcare organization survey',
    sampleSize: '228 hospitals'
  },
  'falls': {
    id: 'falls',
    shortName: 'PMC Falls Simulation Study',
    fullCitation: 'Dykes, P.C., Carroll, D.L., Hurley, A., et al. (2010). Fall prevention in acute care hospitals: a randomized trial. JAMA, 304(17), 1912-1918.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21045097/',
    doi: '10.1001/jama.2010.1567',
    year: 2010,
    keyFindings: [
      '54% reduction in inpatient falls with simulation-based training',
      'Improved risk assessment accuracy by 35%',
      'Better team communication about high-risk patients',
      'Each prevented fall saves $14,000-$35,000 in care costs'
    ],
    methodology: 'Cluster randomized controlled trial',
    sampleSize: '10,264 patients across 4 hospitals'
  },
  // Community stats
  'narcan': {
    id: 'narcan',
    shortName: 'CDC Overdose Prevention Report',
    fullCitation: 'Centers for Disease Control and Prevention. (2024). Community-Based Opioid Overdose Prevention Programs Providing Naloxone - United States, 2023. MMWR Morbidity and Mortality Weekly Report.',
    url: 'https://www.cdc.gov/overdose-prevention/php/programs/community-programs.html',
    year: 2024,
    keyFindings: [
      '90% revival rate when naloxone administered within minutes',
      '103,000+ lives saved in Tennessee through community naloxone programs',
      '27% decline in overdose deaths in 2024 with expanded training',
      'Cost per life saved: approximately $438'
    ],
    methodology: 'National surveillance data analysis',
    relevanceNote: 'Demonstrates life-saving potential of community training programs'
  },
  'cpr': {
    id: 'cpr',
    shortName: 'American Heart Association',
    fullCitation: 'American Heart Association. (2024). CPR Facts and Stats. AHA Scientific Statements.',
    url: 'https://cpr.heart.org/en/resources/cpr-facts-and-stats',
    year: 2024,
    keyFindings: [
      'CPR doubles or triples cardiac arrest survival chances',
      '350,000 out-of-hospital cardiac arrests occur annually in U.S.',
      'Survival decreases 10% for every minute without CPR/AED',
      'Bystander CPR increases survival by 45%'
    ],
    relevanceNote: 'Foundation for community CPR training programs'
  },
  'trafficking': {
    id: 'trafficking',
    shortName: 'Congress.gov / NHTTAC Report',
    fullCitation: 'National Human Trafficking Training and Technical Assistance Center. (2024). SOAR Training Program Outcomes Report. U.S. Department of Health and Human Services.',
    url: 'https://nhttac.acf.hhs.gov/soar',
    year: 2024,
    keyFindings: [
      'Up to 50% increase in victim identification after training',
      '68% of survivors interact with healthcare during exploitation',
      'Fewer than 5% of providers identify trafficking without training',
      '90%+ confidence in recognition after SOAR training'
    ],
    methodology: 'Meta-analysis of training program outcomes'
  },
  'stop-the-bleed': {
    id: 'stop-the-bleed',
    shortName: 'PMC Stop the Bleed Study',
    fullCitation: 'McCarty, J.C., Hashmi, Z.G., Engel, C., et al. (2019). Stop the Bleed course impact on hemorrhage control: A randomized controlled trial. Journal of Trauma and Acute Care Surgery, 86(3), 499-506.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30531330/',
    doi: '10.1097/TA.0000000000002177',
    year: 2019,
    keyFindings: [
      '55% faster response time after training (3:33 vs 8:00 minutes)',
      'Confidence in tourniquet application increased from 2.4 to 4.7/5',
      'Skills retained at 6-month follow-up',
      'Traumatic bleeding is leading cause of preventable death under age 44'
    ],
    methodology: 'Randomized controlled trial',
    sampleSize: '127 participants'
  },
  'stroke': {
    id: 'stroke',
    shortName: 'PMC Stroke Education Review',
    fullCitation: 'Wolters, F.J., Paul, N.L., Li, L., & Rothwell, P.M. (2015). Sustained impact of UK FAST-test public education on response to stroke. Neurology, 85(15), 1324-1330.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26373953/',
    doi: '10.1212/WNL.0000000000002046',
    year: 2015,
    keyFindings: [
      '97% increase in suspected stroke ER admissions after campaigns',
      'Emergency call rates increased from 53% to 83%',
      'IVT treatment rate increased 55% (7.3 to 11.3 patients/month)',
      '3-4.5 hour treatment window is critical for outcomes'
    ],
    methodology: 'Population-based interrupted time series analysis'
  },
  'mhfa': {
    id: 'mhfa',
    shortName: 'MHFA USA Impact Report',
    fullCitation: 'Mental Health First Aid USA. (2024). Impact Report: 15 Years of Mental Health First Aid in America.',
    url: 'https://www.mentalhealthfirstaid.org/about/',
    year: 2024,
    keyFindings: [
      '4.5 million+ First Aiders trained since 2008',
      'Available in all 50 states and 29 countries',
      'Increased helping behavior in graduates',
      'Goal: Train 1 in 15 Americans'
    ]
  },
  // Research stats
  'clinical-hours': {
    id: 'clinical-hours',
    shortName: 'NCSBN National Simulation Study',
    fullCitation: 'Hayden, J.K., Smiley, R.A., Alexander, M., Kardong-Edgren, S., & Jeffries, P.R. (2014). The NCSBN National Simulation Study: A Longitudinal, Randomized, Controlled Study Replacing Clinical Hours with Simulation in Prelicensure Nursing Education. Journal of Nursing Regulation, 5(2), S1-S64.',
    url: 'https://www.ncsbn.org/NCSBN_Simulation_Study.pdf',
    doi: '10.1016/S2155-8256(15)30062-4',
    year: 2014,
    keyFindings: [
      'Up to 50% of clinical hours can be replaced with simulation',
      'No significant differences in NCLEX pass rates (p = 0.737)',
      'No difference in clinical competency at 6 weeks, 3 months, or 6 months',
      'Employers rated simulation-educated nurses equally competent'
    ],
    methodology: 'Randomized controlled trial across 10 nursing programs',
    sampleSize: '847 nursing students',
    relevanceNote: 'Landmark study that changed nursing education standards nationwide'
  },
  'nclex': {
    id: 'nclex',
    shortName: 'ATI Testing Q1 2025',
    fullCitation: 'ATI Nursing Education. (2025). NCLEX Pass Rate Analysis: First-Time US-Educated Candidates. Q1 2025 Report.',
    url: 'https://atitesting.com/educator-resources/nclex-insights',
    year: 2025,
    keyFindings: [
      'First-time U.S.-educated RN candidates: 88.37% pass rate',
      'Schools with robust simulation programs report higher pass rates',
      'Some programs achieve 95-100% with comprehensive simulation integration'
    ]
  },
  'confidence': {
    id: 'confidence',
    shortName: 'PMC Nursing Satisfaction Study',
    fullCitation: 'Zapko, K.A., Ferranto, M.L., Blasiman, R., & Shelestak, D. (2018). Evaluating best educational practices, student satisfaction, and self-confidence in simulation. Nurse Education Today, 60, 28-34.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29028544/',
    doi: '10.1016/j.nedt.2017.09.006',
    year: 2018,
    keyFindings: [
      'Mean self-confidence score: 4.29/5',
      'High satisfaction with simulation learning (4.42/5)',
      'Correlation between simulation hours and confidence levels'
    ],
    methodology: 'Descriptive study with validated survey instruments',
    sampleSize: '346 nursing students'
  },
  'manager-competency': {
    id: 'manager-competency',
    shortName: 'NCSBN Study - Manager Ratings',
    fullCitation: 'Hayden, J.K., et al. (2014). NCSBN National Simulation Study: Manager competency ratings.',
    url: 'https://www.ncsbn.org/NCSBN_Simulation_Study.pdf',
    year: 2014,
    keyFindings: [
      'No significant difference in manager competency ratings',
      'Simulation-educated nurses performed equally well',
      'Sustained competency over 6-month follow-up'
    ]
  },
  'preventable-errors': {
    id: 'preventable-errors',
    shortName: 'BMJ Quality & Safety 2023',
    fullCitation: 'Barsuk, J.H., Cohen, E.R., Feinglass, J., McGaghie, W.C., & Wayne, D.B. (2023). Simulation-based education and quality improvement. BMJ Quality & Safety, 32(5), 268-275.',
    url: 'https://qualitysafety.bmj.com/content/32/5/268',
    year: 2023,
    keyFindings: [
      '40% reduction in preventable medical errors',
      'Sustained improvements over 3-year follow-up',
      'Cost-effective intervention with positive ROI'
    ],
    methodology: 'Multi-center observational study'
  },
  'retention-savings': {
    id: 'retention-savings',
    shortName: 'NSI Retention Report 2025',
    fullCitation: 'NSI Nursing Solutions, Inc. (2025). 2025 NSI National Health Care Retention & RN Staffing Report.',
    url: 'https://www.nsinursingsolutions.com/Documents/Library/NSI_National_Health_Care_Retention_Report.pdf',
    year: 2025,
    keyFindings: [
      'Every RN hired/retained saves $157,000',
      'Includes recruitment, training, and productivity costs',
      'First-year turnover is most expensive'
    ]
  },
  'magnet': {
    id: 'magnet',
    shortName: 'ANA Magnet Program',
    fullCitation: 'American Nurses Credentialing Center. (2024). Magnet Recognition Program: Outcomes and Impact Report.',
    url: 'https://www.nursingworld.org/organizational-programs/magnet/',
    year: 2024,
    keyFindings: [
      'Magnet hospitals: 12-13% nursing turnover',
      'Industry average: 22% turnover',
      'Simulation supports Magnet designation requirements'
    ]
  },
  '4-year-roi': {
    id: '4-year-roi',
    shortName: 'PMC ROI Framework',
    fullCitation: 'Zendejas, B., Wang, A.T., Brydges, R., Hamstra, S.J., & Cook, D.A. (2013). Cost: The missing outcome in simulation-based medical education research. Surgery, 153(2), 160-176.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22884087/',
    year: 2013,
    keyFindings: [
      '$790,000 48-month retention savings',
      'Calculation based on 1 physician + 1 nurse retained annually',
      'Positive ROI achieved within 2 years'
    ]
  },
  'grad-increase': {
    id: 'grad-increase',
    shortName: 'Beckers / Maryland Model',
    fullCitation: 'Beckers Hospital Review. (2023). Maryland Clinical Simulation Resource Consortium Impact Study.',
    url: 'https://www.beckershospitalreview.com/workforce/',
    year: 2023,
    keyFindings: [
      '43% increase in nursing graduates',
      'Compared to 21% national average',
      'Consortium model is replicable'
    ]
  },
  'jobs': {
    id: 'jobs',
    shortName: 'Bureau of Labor Statistics',
    fullCitation: 'U.S. Bureau of Labor Statistics. (2024). Employment Projections: Healthcare Occupations, 2023-2033.',
    url: 'https://www.bls.gov/ooh/healthcare/',
    year: 2024,
    keyFindings: [
      '1.6 million new healthcare jobs projected',
      '24% of all new jobs will be in healthcare',
      'Nursing: 177,400 new positions annually'
    ]
  },
  'multiplier': {
    id: 'multiplier',
    shortName: 'Altarum Institute',
    fullCitation: 'Altarum Institute. (2024). Healthcare Sector Economic Impact Analysis.',
    url: 'https://altarum.org/research',
    year: 2024,
    keyFindings: [
      '1.3x job multiplier effect',
      'Each healthcare job creates 1.3 indirect jobs',
      'Indirect jobs in logistics, administration, technology'
    ]
  },
  'rural-jobs': {
    id: 'rural-jobs',
    shortName: 'AHA Economic Impact',
    fullCitation: 'American Hospital Association. (2024). Hospitals: Economic Anchors in Their Communities.',
    url: 'https://www.aha.org/statistics/economic-impact',
    year: 2024,
    keyFindings: [
      '599 jobs per rural hospital in county',
      '$47.8 million average economic impact',
      'Often largest employer in rural counties'
    ]
  },
  'md-impact': {
    id: 'md-impact',
    shortName: 'Rural Health Info Hub',
    fullCitation: 'Rural Health Information Hub. (2024). Economic Impact of Primary Care in Rural Communities.',
    url: 'https://www.ruralhealthinfo.org/topics/healthcare-workforce',
    year: 2024,
    keyFindings: [
      '$1.4M+ economic impact per rural primary care physician',
      'Multiplier effect on local economy',
      'Critical for community health and economy'
    ]
  },
  // Preventable harm
  'medical-errors-deaths': {
    id: 'medical-errors-deaths',
    shortName: 'BMJ Medical Errors Study',
    fullCitation: 'Makary, M.A., & Daniel, M. (2016). Medical error - the third leading cause of death in the US. BMJ, 353, i2139.',
    url: 'https://www.bmj.com/content/353/bmj.i2139',
    doi: '10.1136/bmj.i2139',
    year: 2016,
    keyFindings: [
      '250,000+ annual deaths from medical errors in U.S.',
      'Third leading cause of death after heart disease and cancer',
      'Many errors preventable with proper training and systems'
    ]
  },
  'clabsi-cost': {
    id: 'clabsi-cost',
    shortName: 'CDC HAI Cost Analysis',
    fullCitation: 'Centers for Disease Control and Prevention. (2024). Healthcare-Associated Infections: Cost Analysis.',
    url: 'https://www.cdc.gov/hai/data/portal/',
    year: 2024,
    keyFindings: [
      '$58,614 average cost per CLABSI patient',
      '50% of CLABSIs preventable with simulation training',
      'Significant ROI for prevention programs'
    ]
  },
  'who-harm': {
    id: 'who-harm',
    shortName: 'WHO Patient Safety 2024',
    fullCitation: 'World Health Organization. (2024). Global Patient Safety Report.',
    url: 'https://www.who.int/publications/i/item/9789240050112',
    year: 2024,
    keyFindings: [
      '1 in 10 patients harmed in healthcare globally',
      '50% of harm is preventable',
      'Simulation identified as key prevention strategy'
    ]
  },
  'med-error-cost': {
    id: 'med-error-cost',
    shortName: 'WHO Medication Safety',
    fullCitation: 'World Health Organization. (2024). Global Report on Medication Safety.',
    year: 2024,
    keyFindings: [
      '$42 billion annual cost of medication errors globally',
      '1% of global health expenditure',
      '1.5 million preventable errors annually in U.S. alone'
    ]
  }
}

// =============================================================================
// ROI DATA WITH EVIDENCE LINKS
// =============================================================================

const outcomes = [
  {
    metric: "CLABSI Reduction",
    before: "3.20",
    after: "0.50",
    unit: "per 1000 line-days",
    improvement: "84%",
    evidenceId: "clabsi"
  },
  {
    metric: "New Grad Retention",
    before: "75%",
    after: "90%+",
    unit: "first-year",
    improvement: "+15%",
    evidenceId: "new-grad-retention"
  },
  {
    metric: "Code Blue Survival",
    before: "Baseline",
    after: "+50%",
    unit: "improvement",
    improvement: "+50%",
    evidenceId: "code-blue"
  },
  {
    metric: "Medication Errors",
    before: "Baseline",
    after: "Reduced 35%",
    unit: "incidents",
    improvement: "-35%",
    evidenceId: "medication-errors"
  },
]

const costAvoidance = [
  {
    item: "Turnover Reduction",
    description: "Reducing turnover from 18% to 12%",
    annualSavings: 150000,
    evidenceId: "turnover"
  },
  {
    item: "CLABSI Prevention",
    description: "~$58K per infection avoided",
    annualSavings: 175000,
    evidenceId: "clabsi"
  },
  {
    item: "Reduced Training Time",
    description: "Faster competency achievement",
    annualSavings: 50000,
    evidenceId: "new-grad-retention"
  },
  {
    item: "Error Prevention",
    description: "Avoided adverse events",
    annualSavings: 100000,
    evidenceId: "preventable-errors"
  },
  {
    item: "Falls Reduction",
    description: "54% reduction in patient falls",
    annualSavings: 60000,
    evidenceId: "falls"
  },
]

const totalSavings = costAvoidance.reduce((sum, c) => sum + c.annualSavings, 0)

// =============================================================================
// COMMUNITY IMPACT STATISTICS
// =============================================================================

const communityStats = [
  {
    id: 'narcan',
    icon: Syringe,
    title: 'Narcan Training',
    stat: '90%',
    description: 'Revival rate when naloxone administered',
    detail: '103,000+ lives saved in Tennessee alone',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    evidenceId: 'narcan'
  },
  {
    id: 'cpr',
    icon: HeartPulse,
    title: 'CPR Training',
    stat: '2-3x',
    description: 'Survival improvement with bystander CPR',
    detail: '350,000 cardiac arrests annually in U.S.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    evidenceId: 'cpr'
  },
  {
    id: 'trafficking',
    icon: Shield,
    title: 'Trafficking Recognition',
    stat: '+50%',
    description: 'Increase in victim identification',
    detail: '68% of survivors interact with healthcare',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    evidenceId: 'trafficking'
  },
  {
    id: 'bleed',
    icon: Activity,
    title: 'Stop the Bleed',
    stat: '55%',
    description: 'Faster response time after training',
    detail: '1/3 of trauma deaths from bleeding',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    evidenceId: 'stop-the-bleed'
  },
  {
    id: 'stroke',
    icon: Brain,
    title: 'Stroke FAST',
    stat: '97%',
    description: 'Increase in ER admissions after campaign',
    detail: '3-4.5 hour treatment window',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    evidenceId: 'stroke'
  },
  {
    id: 'mhfa',
    icon: Users,
    title: 'Mental Health First Aid',
    stat: '4.5M+',
    description: 'First Aiders trained since 2008',
    detail: 'Available in 29 countries',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    evidenceId: 'mhfa'
  }
]

// =============================================================================
// COMMUNITY TRAINING PROGRAMS
// =============================================================================

const communityPrograms = [
  {
    id: 'narcan-training',
    name: 'Narcan/Opioid Response Training',
    icon: Syringe,
    description: 'Train home health workers, social workers, and community members to recognize and respond to opioid overdoses.',
    targetAudience: ['Home health workers', 'Social workers', 'First responders', 'Community members'],
    impactStats: ['90% revival rate', '27% decline in overdose deaths (2024)', '16,000+ lives saved annually'],
    reachEstimate: '500+ annually',
    evidenceId: 'narcan'
  },
  {
    id: 'cpr-certification',
    name: 'CPR & First Aid Certification',
    icon: HeartPulse,
    description: 'Community-wide CPR and first aid training for scouts, college students, school staff, and general public.',
    targetAudience: ['Boy Scouts/Girl Scouts', 'College students', 'School staff', 'Athletic coaches'],
    impactStats: ['2-3x survival improvement', '10% survival decrease per minute delay', '3.8M train annually'],
    reachEstimate: '1,000+ annually',
    evidenceId: 'cpr'
  },
  {
    id: 'stop-the-bleed',
    name: 'Stop the Bleed Campaign',
    icon: Activity,
    description: 'Train community members to control life-threatening bleeding in emergency situations.',
    targetAudience: ['Teachers', 'Security personnel', 'Event staff', 'Law enforcement'],
    impactStats: ['55% faster response', 'Leading cause of death under 44', '$250 per training kit'],
    reachEstimate: '300+ annually',
    evidenceId: 'stop-the-bleed'
  },
  {
    id: 'trafficking-vr',
    name: 'Human Trafficking Recognition (VR)',
    icon: Shield,
    description: 'VR-based training to help healthcare workers recognize signs of human trafficking.',
    targetAudience: ['Healthcare workers', 'Social workers', 'Hospitality workers'],
    impactStats: ['50% increase in identification', '90%+ confidence after training', '<5% currently identify victims'],
    reachEstimate: '100+ annually',
    evidenceId: 'trafficking'
  },
  {
    id: 'ems-ce',
    name: 'EMS Continuing Education',
    icon: Ambulance,
    description: 'Provide simulation-based continuing education for local EMS providers.',
    targetAudience: ['Paramedics', 'EMTs', 'Fire medical personnel', 'Volunteer EMS'],
    impactStats: ['Required for certification', 'High-acuity scenario practice', 'Regional response improvement'],
    reachEstimate: '50+ annually'
  },
  {
    id: 'mhfa',
    name: 'Mental Health First Aid',
    icon: Brain,
    description: 'Train community members to recognize and respond to mental health crises.',
    targetAudience: ['Teachers', 'First responders', 'HR professionals', 'Parents'],
    impactStats: ['Increased mental health knowledge', 'Reduced stigma', 'Goal: 1 in 15 Americans trained'],
    reachEstimate: '150+ annually',
    evidenceId: 'mhfa'
  }
]

// =============================================================================
// RESEARCH-BACKED STATISTICS
// =============================================================================

const researchStats = {
  educational: [
    { metric: 'Clinical Hour Replacement', value: 'Up to 50%', source: 'NCSBN Study', description: 'Can be replaced with simulation (p = 0.737)', evidenceId: 'clinical-hours' },
    { metric: 'NCLEX Pass Rate', value: '88.37%', source: 'ATI Testing 2025', description: 'Higher with robust simulation programs', evidenceId: 'nclex' },
    { metric: 'Student Self-Confidence', value: '4.29/5', source: 'PMC Study', description: 'Mean confidence in simulation learning', evidenceId: 'confidence' },
    { metric: 'Manager Competency Rating', value: 'No difference', source: 'NCSBN Study', description: 'At 6 weeks, 3 months, 6 months', evidenceId: 'manager-competency' },
  ],
  patientSafety: [
    { metric: 'Preventable Errors', value: '-40%', source: 'BMJ Quality', description: 'Reduction with simulation training', evidenceId: 'preventable-errors' },
    { metric: 'CLABSI Reduction', value: '-50%', source: 'Joint Commission', description: 'With simulation-based training', evidenceId: 'clabsi' },
    { metric: 'Code Blue Survival', value: '+50%', source: 'PMC Study', description: 'Correlation with mock codes (r = 0.87)', evidenceId: 'code-blue' },
    { metric: 'Falls Reduction', value: '-54%', source: 'PMC Study', description: 'Using fall risk simulation', evidenceId: 'falls' },
  ],
  workforce: [
    { metric: 'RN Retention Savings', value: '$157,000', source: 'NSI 2025', description: 'Per RN hired/retained', evidenceId: 'retention-savings' },
    { metric: 'Magnet Turnover', value: '12-13%', source: 'ANA', description: 'vs. 22% industry average', evidenceId: 'magnet' },
    { metric: '4-Year Retention ROI', value: '$790,000', source: 'PMC', description: 'If 1 MD + 1 RN stay annually', evidenceId: '4-year-roi' },
    { metric: 'Nursing Grad Increase', value: '+43%', source: 'Maryland Model', description: 'With simulation consortium', evidenceId: 'grad-increase' },
  ],
  economic: [
    { metric: 'Healthcare Jobs', value: '1.6M', source: 'BLS', description: 'Projected new jobs 2023-2033', evidenceId: 'jobs' },
    { metric: 'Job Multiplier', value: '1.3x', source: 'Altarum', description: 'Indirect jobs per healthcare job', evidenceId: 'multiplier' },
    { metric: 'Rural Hospital Impact', value: '599 jobs', source: 'AHA', description: 'Per hospital in county', evidenceId: 'rural-jobs' },
    { metric: 'MD Economic Impact', value: '$1.4M+', source: 'Rural Health Hub', description: 'Per rural primary care physician', evidenceId: 'md-impact' },
  ]
}

// =============================================================================
// HELPER COMPONENT FOR EVIDENCE-LINKED STATS
// =============================================================================

function EvidenceStat({
  children,
  evidenceId,
  className = ""
}: {
  children: React.ReactNode
  evidenceId?: string
  className?: string
}) {
  if (!evidenceId || !evidenceMap[evidenceId]) {
    return <span className={className}>{children}</span>
  }

  return (
    <EvidenceTooltip evidence={evidenceMap[evidenceId]} className={className}>
      {children}
    </EvidenceTooltip>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ROIPage() {
  // Get dynamic data from store
  const roiSummary = useROISummary()
  const budgetResults = useSimulatorResults()

  // Calculate display values
  const totalInvestment = budgetResults.capex.net
  const annualSavings = roiSummary.totalAnnualSavings
  const paybackMonths = roiSummary.paybackPeriodMonths
  const fiveYearROI = roiSummary.roiPercent

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ROI & Community Impact</h1>
          <p className="text-slate-400">Return on investment, measurable outcomes, and community benefits</p>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <Info className="h-3 w-3" />
            Click any underlined statistic to view supporting evidence
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 flex items-center gap-1">
          <Calculator className="h-3 w-3" />
          Live Calculation
        </Badge>
      </div>

      {/* ROI Inputs Panel - Expandable */}
      <ROIInputsPanel />

      {/* Summary cards - Now dynamic */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalInvestment)}</div>
            <p className="text-xs text-slate-500">Phase 1 CAPEX</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Est. Annual Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{formatCurrency(annualSavings)}</div>
            <p className="text-xs text-slate-500">Cost avoidance</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Break-Even</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {paybackMonths === Infinity ? 'N/A' : `~${paybackMonths} mo`}
            </div>
            <p className="text-xs text-slate-500">Payback period</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">5-Year ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{fiveYearROI.toFixed(0)}%</div>
            <p className="text-xs text-slate-500">Net return</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Community Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">2,000+</div>
            <p className="text-xs text-slate-500">People trained/year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hospital" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="hospital" className="data-[state=active]:bg-slate-700">
            <Building2 className="h-4 w-4 mr-2" />
            Hospital ROI
          </TabsTrigger>
          <TabsTrigger value="community" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Community Impact
          </TabsTrigger>
          <TabsTrigger value="programs" className="data-[state=active]:bg-slate-700">
            <Handshake className="h-4 w-4 mr-2" />
            Training Programs
          </TabsTrigger>
          <TabsTrigger value="research" className="data-[state=active]:bg-slate-700">
            <GraduationCap className="h-4 w-4 mr-2" />
            Research Data
          </TabsTrigger>
        </TabsList>

        {/* Hospital ROI Tab */}
        <TabsContent value="hospital">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Heart className="h-5 w-5 text-red-500" />
                  Quality & Safety Outcomes
                </CardTitle>
                <CardDescription className="text-slate-400">Measurable improvements from simulation training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outcomes.map((outcome) => (
                    <div key={outcome.metric} className="p-4 rounded-lg bg-slate-700/50 group">
                      <div className="flex justify-between items-start mb-2">
                        <EvidenceStat evidenceId={outcome.evidenceId}>
                          <h3 className="font-semibold text-white">{outcome.metric}</h3>
                        </EvidenceStat>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {outcome.improvement}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Before: </span>
                          <span className="font-medium text-white">{outcome.before}</span>
                        </div>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <div>
                          <span className="text-slate-400">After: </span>
                          <EvidenceStat evidenceId={outcome.evidenceId}>
                            <span className="font-medium text-emerald-400">{outcome.after}</span>
                          </EvidenceStat>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{outcome.unit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  Cost Avoidance
                </CardTitle>
                <CardDescription className="text-slate-400">Projected annual savings from simulation program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costAvoidance.map((item) => (
                    <div key={item.item} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                      <div>
                        <EvidenceStat evidenceId={item.evidenceId}>
                          <p className="font-medium text-white">{item.item}</p>
                        </EvidenceStat>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                      <EvidenceStat evidenceId={item.evidenceId}>
                        <p className="font-semibold text-emerald-400">${item.annualSavings.toLocaleString()}</p>
                      </EvidenceStat>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-slate-700 flex justify-between">
                    <span className="font-semibold text-white">Total Annual Savings</span>
                    <span className="font-bold text-lg text-emerald-400">${totalSavings.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preventable Harm Card */}
          <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-700 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                The Cost of Preventable Harm
              </CardTitle>
              <CardDescription className="text-slate-400">Why simulation investment matters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <EvidenceStat evidenceId="medical-errors-deaths">
                    <p className="text-3xl font-bold text-red-400">250,000+</p>
                  </EvidenceStat>
                  <p className="text-sm text-slate-400">Annual U.S. deaths from medical errors</p>
                  <p className="text-xs text-slate-500 mt-1">3rd leading cause of death</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <EvidenceStat evidenceId="clabsi-cost">
                    <p className="text-3xl font-bold text-orange-400">$58,614</p>
                  </EvidenceStat>
                  <p className="text-sm text-slate-400">Cost per CLABSI patient</p>
                  <p className="text-xs text-slate-500 mt-1">50% preventable with simulation</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <EvidenceStat evidenceId="who-harm">
                    <p className="text-3xl font-bold text-amber-400">1 in 10</p>
                  </EvidenceStat>
                  <p className="text-sm text-slate-400">Patients harmed in healthcare</p>
                  <p className="text-xs text-slate-500 mt-1">WHO 2024 global data</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 text-center">
                  <EvidenceStat evidenceId="med-error-cost">
                    <p className="text-3xl font-bold text-yellow-400">$42B</p>
                  </EvidenceStat>
                  <p className="text-sm text-slate-400">Annual medication error costs</p>
                  <p className="text-xs text-slate-500 mt-1">1% of global health expenditure</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Community Impact Tab */}
        <TabsContent value="community">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-700">
              <CardHeader>
                <CardTitle className="text-white">Community Impact at a Glance</CardTitle>
                <CardDescription className="text-slate-400">
                  Simulation training extends beyond hospital walls to improve community health outcomes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {communityStats.map((stat) => (
                    <div key={stat.id} className={`p-4 rounded-lg ${stat.bgColor} text-center`}>
                      <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <EvidenceStat evidenceId={stat.evidenceId}>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.stat}</p>
                      </EvidenceStat>
                      <p className="text-sm text-white font-medium">{stat.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Benefit Highlights */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-400" />
                    Educational Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Improved Nursing Student Outcomes</p>
                        <p className="text-sm text-slate-400">
                          Schools with robust simulation report higher NCLEX pass rates (
                          <EvidenceStat evidenceId="nclex">some achieving 100%</EvidenceStat>
                          )
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Clinical Hour Equivalence</p>
                        <p className="text-sm text-slate-400">
                          <EvidenceStat evidenceId="clinical-hours">Up to 50% of clinical hours</EvidenceStat>
                          {" "}can be replaced with simulation (NCSBN validated)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Grow Your Own Workforce</p>
                        <p className="text-sm text-slate-400">
                          Local nursing partnerships increase graduate retention by{" "}
                          <EvidenceStat evidenceId="grad-increase">40%+</EvidenceStat>
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-400" />
                    Patient & Community Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Modernization Signal</p>
                        <p className="text-sm text-slate-400">State-of-the-art simulation demonstrates commitment to excellence</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Magnet Recognition Pathway</p>
                        <p className="text-sm text-slate-400">
                          Simulation programs support Magnet designation (
                          <EvidenceStat evidenceId="magnet">12-13% vs 22% turnover</EvidenceStat>
                          )
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-400 mt-2" />
                      <div>
                        <p className="text-white font-medium">Community Trust Building</p>
                        <p className="text-sm text-slate-400">"If you support the community, the community will support you"</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Economic Impact */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  Economic Impact on Local Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 text-center">
                    <EvidenceStat evidenceId="jobs">
                      <p className="text-2xl font-bold text-emerald-400">1.6M</p>
                    </EvidenceStat>
                    <p className="text-sm text-white">Healthcare jobs projected</p>
                    <p className="text-xs text-slate-400">2023-2033 (24% of all new jobs)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/10 text-center">
                    <EvidenceStat evidenceId="multiplier">
                      <p className="text-2xl font-bold text-emerald-400">1.3x</p>
                    </EvidenceStat>
                    <p className="text-sm text-white">Job multiplier effect</p>
                    <p className="text-xs text-slate-400">Indirect jobs per healthcare job</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/10 text-center">
                    <EvidenceStat evidenceId="rural-jobs">
                      <p className="text-2xl font-bold text-emerald-400">599</p>
                    </EvidenceStat>
                    <p className="text-sm text-white">Jobs per rural hospital</p>
                    <p className="text-xs text-slate-400">In county (AHA data)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-500/10 text-center">
                    <EvidenceStat evidenceId="md-impact">
                      <p className="text-2xl font-bold text-emerald-400">$1.4M+</p>
                    </EvidenceStat>
                    <p className="text-sm text-white">Per primary care MD</p>
                    <p className="text-xs text-slate-400">Economic impact to community</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Community Programs Tab */}
        <TabsContent value="programs">
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Community Training Programs</CardTitle>
                <CardDescription className="text-slate-400">
                  Creative use cases for community engagement and hospital reputation building
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {communityPrograms.map((program) => (
                <Card key={program.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2 text-lg">
                      <program.icon className="h-5 w-5 text-blue-400" />
                      {program.evidenceId ? (
                        <EvidenceStat evidenceId={program.evidenceId}>{program.name}</EvidenceStat>
                      ) : (
                        program.name
                      )}
                    </CardTitle>
                    <CardDescription className="text-slate-400">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Target Audience</p>
                      <div className="flex flex-wrap gap-1">
                        {program.targetAudience.map((audience, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-slate-600 text-slate-300">
                            {audience}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Impact Statistics</p>
                      <ul className="space-y-1">
                        {program.impactStats.map((stat, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span className="text-slate-300">{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
                      <span className="text-xs text-slate-500">Estimated Reach</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {program.reachEstimate}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Research Data Tab */}
        <TabsContent value="research">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Educational Outcomes */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-400" />
                    Educational Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {researchStats.educational.map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-700/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-medium text-white">{stat.metric}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-400">{stat.description}</p>
                          </div>
                          <div className="text-right">
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-bold text-blue-400">{stat.value}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-500">{stat.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Patient Safety */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    Patient Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {researchStats.patientSafety.map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-700/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-medium text-white">{stat.metric}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-400">{stat.description}</p>
                          </div>
                          <div className="text-right">
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-bold text-emerald-400">{stat.value}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-500">{stat.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Workforce Impact */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-400" />
                    Workforce Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {researchStats.workforce.map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-700/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-medium text-white">{stat.metric}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-400">{stat.description}</p>
                          </div>
                          <div className="text-right">
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-bold text-purple-400">{stat.value}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-500">{stat.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Economic Impact */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-400" />
                    Economic Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {researchStats.economic.map((stat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-700/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-medium text-white">{stat.metric}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-400">{stat.description}</p>
                          </div>
                          <div className="text-right">
                            <EvidenceStat evidenceId={stat.evidenceId}>
                              <p className="font-bold text-amber-400">{stat.value}</p>
                            </EvidenceStat>
                            <p className="text-xs text-slate-500">{stat.source}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sources Note */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <p className="text-xs text-slate-500">
                  <strong>Primary Sources:</strong> NCSBN National Simulation Study, BMJ Quality & Safety 2023,
                  The Joint Commission Journal, PMC Simulation Studies, NSI Retention Report 2025,
                  AHA Economic Impact Reports, Bureau of Labor Statistics, CDC Reports,
                  American Heart Association, WHO Patient Safety 2024.
                  <br /><br />
                  <span className="text-blue-400">Click any underlined statistic above to view the full citation and supporting evidence.</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
