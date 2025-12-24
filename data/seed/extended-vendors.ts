// Extended Vendor Contact List
// Generated from comprehensive market research - December 2025

export interface ExtendedVendor {
  id: string
  name: string
  category: 'simulation_equipment' | 'av_system' | '3d_printing' | 'specialty'
  website: string
  phone?: string
  email?: string
  headquarters?: string
  description: string
  notableProducts: string[]
  priceTier: '$' | '$$' | '$$$'
  specialties?: string[]
}

// =============================================================================
// SIMULATION EQUIPMENT VENDORS
// =============================================================================

export const simulationEquipmentVendors: ExtendedVendor[] = [
  {
    id: 'simulab',
    name: 'Simulab Corporation',
    category: 'simulation_equipment',
    website: 'simulab.com',
    headquarters: '13001 48th Ave. S, Seattle, WA 98168',
    description: 'Seattle-based company specializing in soft-tissue task trainers and procedural simulators. Pioneered synthetic anatomy simulation technology.',
    notableProducts: [
      'TraumaMan System - anatomically correct surgical simulator for ATLS training',
      'CentraLineMan - central line insertion trainer',
      'PacerMan - pacemaker insertion simulator',
      'SonoMan - ultrasound-guided procedure trainers',
      'AirwayMan - complete airway management trainer'
    ],
    priceTier: '$$',
    specialties: ['Task trainers', 'Surgical simulation', 'Procedural training']
  },
  {
    id: 'kyoto-kagaku',
    name: 'Kyoto Kagaku Co., Ltd.',
    category: 'simulation_equipment',
    website: 'kyotokagaku.com/en/',
    phone: '+81-75-605-2510',
    email: 'rw-kyoto@kyotokagaku.co.jp',
    headquarters: '15 Kitanekoya-cho, Fushimi-ku, Kyoto 612-8388, Japan',
    description: 'Japanese manufacturer with 75+ years experience specializing in high-fidelity medical simulators, anatomical models, and imaging phantoms.',
    notableProducts: [
      'Lumbar Puncture Simulator',
      'Ultrasound examination training phantoms',
      'Physical examination simulators',
      'Injection and IV training arms',
      'Auscultation training simulators'
    ],
    priceTier: '$$',
    specialties: ['Anatomical models', 'Physical examination', 'Ultrasound phantoms']
  },
  {
    id: 'echo-healthcare',
    name: 'Echo Healthcare',
    category: 'simulation_equipment',
    website: 'echo.healthcare',
    phone: '+1 (877) 393-0499',
    email: 'salessupport@echosimulation.com',
    description: 'Leading provider of realistic medical simulation training tools focused on improving outcomes through innovation, education, and technology.',
    notableProducts: [
      'High-fidelity patient manikins',
      'Task trainers and skill trainers',
      'Patient monitoring simulators',
      'MeLiSA service and support application'
    ],
    priceTier: '$$',
    specialties: ['Patient manikins', 'Task trainers', 'Monitoring simulation']
  },
  {
    id: 'elevate-healthcare',
    name: 'Elevate Healthcare (formerly CAE Healthcare)',
    category: 'simulation_equipment',
    website: 'elevatehealth.net',
    phone: '+1.866.462.7920',
    headquarters: '6300 Edgelake Drive, Sarasota, FL 34240',
    description: 'Global leader in healthcare simulation providing patient simulators, digital platforms, and AV/debriefing solutions. A Madison Industries company.',
    notableProducts: [
      'Evo - high-fidelity patient simulator',
      'Apollo - advanced patient simulator',
      'LearningSpace - AV recording and debriefing platform',
      'Vimedix - ultrasound training simulator',
      'Juno - clinical skills manikin'
    ],
    priceTier: '$$$',
    specialties: ['High-fidelity simulation', 'AV systems', 'Ultrasound training']
  },
  {
    id: 'limbs-things',
    name: 'Limbs & Things',
    category: 'simulation_equipment',
    website: 'limbsandthings.com/us/',
    phone: '(912) 629-0357',
    email: 'sales@limbsandthings.com',
    headquarters: 'Bristol, United Kingdom',
    description: 'UK-based manufacturer creating realistic simulation products since 1990. Founded by medical illustrator Margot Cooper.',
    notableProducts: [
      'ATLS surgical simulation products',
      'Fundamentals of Laparoscopic Surgery trainers',
      'OSCE examination simulators',
      'Clinical skills trainers',
      'Womens health simulators'
    ],
    priceTier: '$$',
    specialties: ['Surgical skills', 'OSCE training', 'Clinical skills']
  },
  {
    id: 'virtamed',
    name: 'VirtaMed',
    category: 'simulation_equipment',
    website: 'virtamed.com/en',
    phone: '+41 44 500 96 90',
    headquarters: 'Rütistrasse 12, Schlieren, Zurich 8952, Switzerland',
    description: 'Swiss company specializing in highly realistic mixed-reality surgical simulators for basic to complex procedures.',
    notableProducts: [
      'ArthroS - arthroscopy simulator',
      'GynoS - gynecology simulator',
      'UroS - urology simulator',
      'LaparoS - laparoscopy simulator'
    ],
    priceTier: '$$$',
    specialties: ['Surgical simulation', 'Mixed reality', 'Minimally invasive surgery']
  },
  {
    id: 'surgical-science',
    name: 'Surgical Science Sweden AB',
    category: 'simulation_equipment',
    website: 'surgicalscience.com',
    phone: '+46 31 741 65 60',
    email: 'sales@surgicalscience.com',
    headquarters: 'Drakegatan 7A, 412 50 Göteborg, Sweden',
    description: 'Leading provider of medical simulation training and software solutions enhancing patient safety through evidence-based simulation.',
    notableProducts: [
      'LapSim - laparoscopic surgery simulator',
      'EndoSim - endoscopy simulator',
      'RobotiX Mentor - robotic surgery simulator',
      'LAP Mentor - advanced laparoscopic trainer',
      'ANGIO Mentor - endovascular simulator'
    ],
    priceTier: '$$$',
    specialties: ['Laparoscopic surgery', 'Robotic surgery', 'Endoscopy']
  },
  {
    id: '3b-scientific',
    name: '3B Scientific',
    category: 'simulation_equipment',
    website: '3bscientific.com',
    phone: '1-888-326-6335',
    email: 'sales@a3bs.com',
    headquarters: 'Hamburg, Germany (US: Tucker, GA)',
    description: 'Worlds leading manufacturer of anatomical and biological education models since 1948, with presence in 100+ countries.',
    notableProducts: [
      'SIMone birthing simulator',
      'P90 PRO birthing simulator',
      'Anatomical models and phantoms',
      'CPR training manikins',
      'Nursing skills trainers'
    ],
    priceTier: '$',
    specialties: ['Anatomical models', 'Birthing simulation', 'CPR training']
  }
]

// =============================================================================
// AV RECORDING & MANAGEMENT SYSTEM VENDORS
// =============================================================================

export const avSystemVendors: ExtendedVendor[] = [
  {
    id: 'simstation',
    name: 'SIMStation',
    category: 'av_system',
    website: 'simstation.com',
    phone: '+1 321 895 2280',
    email: 'sales@simstation.com',
    headquarters: '263 NE 61st Street, Miami, FL 33137',
    description: 'Global leader in AV and assessment systems for simulation centers since 2011. User-friendly software for live control, recording, and transmitting healthcare simulations.',
    notableProducts: [
      'SIMStation Core - multi-room AV recording system',
      'Exam Suite - OSCE and structured assessment management',
      'SIMStation Go - mobile recording solution',
      'SIMStation Connect - debriefing software',
      'Real-time bookmarking and grading tools'
    ],
    priceTier: '$$',
    specialties: ['Multi-room recording', 'OSCE management', 'Mobile recording']
  },
  {
    id: 'ems-works',
    name: 'Education Management Solutions (EMS)',
    category: 'av_system',
    website: 'ems-works.com',
    phone: '1-877-367-5050',
    email: 'info@ems-works.com',
    headquarters: '1300 Morris Drive, Wayne, PA 19087',
    description: 'World leader in integrated simulation management and skills evaluation software since 1994. Hardware and software-agnostic with seamless LMS integration.',
    notableProducts: [
      'SIMULATIONiQ Core - simulation management software',
      'SIMULATIONiQ Enterprise - comprehensive center management',
      'High-quality AV recording systems',
      'Inventory tracking and scheduling',
      'Cloud-based debriefing solutions'
    ],
    priceTier: '$$',
    specialties: ['Center management', 'LMS integration', 'Scheduling']
  },
  {
    id: 'ivs',
    name: 'Intelligent Video Solutions (IVS)',
    category: 'av_system',
    website: 'ipivs.com',
    phone: '(855) 229-9699',
    email: 'sales@ipivs.com',
    headquarters: 'N53W24747 S Corporate Circle, Sussex, WI 53089',
    description: 'Provider of video capture solutions for simulation and learning environments since 2001. Simple, secure video solutions for better outcomes.',
    notableProducts: [
      'VALT - Video Audio Learning Tool platform',
      'IVS BEAM - mobile iOS capture',
      'ROAM - portable VALT capabilities',
      'HDMI encoders for vitals capture',
      'State-of-the-art encryption and user management'
    ],
    priceTier: '$$',
    specialties: ['Video capture', 'Mobile recording', 'Secure video']
  },
  {
    id: 'laerdal-simcapture',
    name: 'Laerdal Medical (SimCapture)',
    category: 'av_system',
    website: 'laerdal.com',
    headquarters: 'Stavanger, Norway',
    description: 'Comprehensive simulation provider offering SimCapture AV recording platform (acquired from B-Line Medical in 2019). Captures audio, video, annotations, and simulator data.',
    notableProducts: [
      'SimCapture - comprehensive AV recording',
      'SimCapture Pro - enterprise solution',
      'Multi-source recording with minimal latency',
      'Web-based interface for management',
      'Integration with LLEAP simulation software'
    ],
    priceTier: '$$$',
    specialties: ['Integrated recording', 'Simulator data capture', 'Enterprise solutions']
  },
  {
    id: 'mangold',
    name: 'Mangold International',
    category: 'av_system',
    website: 'mangold-international.com',
    phone: '+49 8723 978330',
    headquarters: 'Graf-von-deym St 5a, Arnstorf, Bavaria 94424, Germany',
    description: 'German company with 30+ years of expertise in observational research and video feedback systems for healthcare simulation.',
    notableProducts: [
      'Stationary audio/video recording systems',
      'Multi-camera synchronized recording (2-4 HD cameras)',
      'Studio mode for multi-room operations',
      'Software-supported video feedback',
      'Mobile and portable recording options'
    ],
    priceTier: '$$',
    specialties: ['Video feedback', 'Multi-camera systems', 'Research recording']
  },
  {
    id: 'level3av',
    name: 'Level 3 Audiovisual',
    category: 'av_system',
    website: 'level3av.com',
    phone: '+1.602.363.7127',
    headquarters: 'Mesa, Arizona',
    description: 'Healthcare simulation technology provider delivering AV, software, consulting, and IT expertise. Over 22 years of AV installation experience.',
    notableProducts: [
      'Turnkey simulation center AV solutions',
      'Multi-room recording and broadcast systems',
      'Live audio-video streaming',
      'Integrated simulation software',
      'Complete center design and installation'
    ],
    priceTier: '$$$',
    specialties: ['Turnkey solutions', 'Center design', 'Installation services']
  }
]

// =============================================================================
// 3D PRINTING FOR ANATOMICAL MODELS VENDORS
// =============================================================================

export const printing3DVendors: ExtendedVendor[] = [
  {
    id: 'stratasys',
    name: 'Stratasys',
    category: '3d_printing',
    website: 'stratasys.com',
    phone: '+1-800-801-6491',
    email: 'FDM.support.us@stratasys.com',
    headquarters: '7665 Commerce Way, Eden Prairie, MN 55344',
    description: 'Industry leader in medical 3D printing with Digital Anatomy technology. Creates realistic models that look and feel like real bone and tissue.',
    notableProducts: [
      'J850 Digital Anatomy 3D Printer',
      'J5 Digital Anatomy Printer',
      'TissueMatrix - soft tissue simulation material',
      'BoneMatrix - realistic bone material',
      'RadioMatrix - radiopaque material for CT/X-ray visibility',
      'GelMatrix - gel-like tissue material'
    ],
    priceTier: '$$$',
    specialties: ['Digital anatomy', 'Multi-material printing', 'Soft tissue simulation']
  },
  {
    id: 'stratasys-direct',
    name: 'Stratasys Direct Manufacturing',
    category: '3d_printing',
    website: 'stratasys.com/en/stratasysdirect/',
    phone: '+1 888-311-1017',
    headquarters: 'Eden Prairie, MN',
    description: 'On-demand 3D printing service delivering lifelike anatomical models from DICOM imaging. Multi-material printing mimics bone density, soft-tissue feel, and vascular elasticity.',
    notableProducts: [
      'Patient-specific anatomical models from CT scans',
      'Surgical planning models',
      'Medical device validation models',
      'Training and education models',
      'Custom multi-material anatomical replicas'
    ],
    priceTier: '$$$',
    specialties: ['On-demand printing', 'Patient-specific models', 'DICOM to 3D']
  },
  {
    id: 'formlabs',
    name: 'Formlabs',
    category: '3d_printing',
    website: 'formlabs.com',
    phone: '+1-617-702-8476',
    email: 'hello@formlabs.com',
    headquarters: '35 Medford St. Suite 201, Somerville, MA 02143',
    description: 'Industry-leading 3D printer manufacturer with specialized biocompatible materials for medical applications. Offers 20x cost savings compared to other solutions.',
    notableProducts: [
      'Form 4BL - next-gen medical 3D printer',
      'Form 3BL - validated for FDA-cleared workflows',
      'BioMed Flex 80A Resin - flexible biocompatible material',
      'BioMed Elastic 50A Resin - soft tissue simulation',
      'Sterilizable anatomical models for OR use'
    ],
    priceTier: '$$',
    specialties: ['Biocompatible materials', 'Cost-effective', 'FDA-cleared workflows']
  },
  {
    id: 'materialise',
    name: 'Materialise NV',
    category: '3d_printing',
    website: 'materialise.com',
    phone: '+32 16 39 66 11',
    email: 'medical@materialise.be',
    headquarters: 'Technologielaan 15, 3001 Leuven, Belgium',
    description: 'Belgian company pioneering 3D printing since 1990. Comprehensive medical solutions from software to 3D printed models and patient-specific implants.',
    notableProducts: [
      'Mimics Innovation Suite - medical image processing',
      'HeartPrint - 3D printed cardiovascular models',
      'AnatomyPrint - on-demand anatomical model service',
      '3-matic Medical - anatomical model design software',
      'Patient-specific surgical guides'
    ],
    priceTier: '$$$',
    specialties: ['Medical imaging software', 'Cardiovascular models', 'Surgical guides']
  },
  {
    id: '3deus-dynamics',
    name: '3Deus Dynamics',
    category: '3d_printing',
    website: '3deusdynamics.com/en/',
    headquarters: 'Rillieux-la-Pape, Rhône-Alpes, France',
    description: 'French company manufacturing ISO 13485-certified medical-grade silicone anatomical models. Specializes in ultra-realistic soft tissue replication.',
    notableProducts: [
      'Pure medical-grade silicone organ models',
      'Cardiovascular system models',
      'Urinary and respiratory system models',
      'White, red, or transparent silicone options',
      'Patient-specific custom anatomical models'
    ],
    priceTier: '$$$',
    specialties: ['Silicone models', 'Soft tissue replication', 'ISO 13485 certified']
  },
  {
    id: 'axial3d',
    name: 'Axial3D',
    category: '3d_printing',
    website: 'axial3d.com',
    headquarters: 'Alexander House, 17a Ormeau Ave, Belfast BT2 8HD, UK',
    description: 'AI-driven 3D medical imaging company delivering patient-specific models within 48 hours. ISO 13485 and ISO 27001 certified with over a decade of experience.',
    notableProducts: [
      'AI-powered DICOM to 3D conversion',
      'Patient-specific anatomical models',
      '3D print-ready files',
      'Surgical planning models',
      'Custom cutting guides and surgical tools'
    ],
    priceTier: '$$',
    specialties: ['AI-powered conversion', 'Fast turnaround', 'Surgical planning']
  },
  {
    id: '3d-systems',
    name: '3D Systems Corporation',
    category: '3d_printing',
    website: '3dsystems.com/healthcare',
    phone: '(803) 326-3900',
    headquarters: '333 Three D Systems Circle, Rock Hill, SC 29730',
    description: 'Pioneer that launched 3D printing industry in 1986. Decades of healthcare experience with FDA-registered, ISO 13485-certified facilities.',
    notableProducts: [
      'VSP Surgical Planning solutions',
      'Patient-matched implants and instrumentation',
      'Point-of-care 3D printing solutions',
      'Figure 4 Modular printing platform',
      'Medical-grade materials portfolio'
    ],
    priceTier: '$$$',
    specialties: ['Surgical planning', 'Point-of-care', 'FDA-registered']
  },
  {
    id: 'ricoh-3d',
    name: 'Ricoh 3D for Healthcare',
    category: '3d_printing',
    website: 'ricoh-usa.com/en/industries/healthcare/3d-printing-for-healthcare',
    headquarters: 'United States',
    description: 'Newly established (2025) subsidiary focused on FDA-cleared patient-specific medical devices. Offers on-site point-of-care manufacturing studios.',
    notableProducts: [
      'FDA-cleared anatomic modeling (7 specialties)',
      'Point-of-care manufacturing studios',
      'On-demand 3D printing services',
      'ISO 13485-certified facilities',
      'Managed services for healthcare facilities'
    ],
    priceTier: '$$',
    specialties: ['FDA-cleared', 'Point-of-care', 'Managed services']
  }
]

// =============================================================================
// SPECIALTY SIMULATION EQUIPMENT
// =============================================================================

export const specialtyVendors: ExtendedVendor[] = [
  {
    id: 'ingmar-medical',
    name: 'IngMar Medical',
    category: 'specialty',
    website: 'ingmarmed.com',
    description: 'Leading manufacturer of breathing simulators and lung simulators for respiratory therapy training.',
    notableProducts: [
      'ASL 5000 Breathing Simulator - most sophisticated on market',
      'QuickLung - portable lung simulator',
      'RespiTrainer Advance - ventilator training',
      'Neonatal to adult tidal volumes (2mL-2.5L)'
    ],
    priceTier: '$$$',
    specialties: ['Respiratory therapy', 'Ventilator training', 'Lung simulation']
  },
  {
    id: 'mimic-tech',
    name: 'Mimic Technologies/Intuitive',
    category: 'specialty',
    website: 'mimicsimulation.com',
    description: 'Provider of da Vinci surgical robot training simulators, enabling skills transfer to actual robotic surgery.',
    notableProducts: [
      'da Vinci Skills Simulator (dVSS) - $89,000',
      'dV Trainer standalone - $158,000',
      'Stereoscopic vision training',
      'Grip/pedal inputs identical to surgery'
    ],
    priceTier: '$$$',
    specialties: ['Robotic surgery', 'da Vinci training', 'Surgical simulation']
  },
  {
    id: 'laparo-medical',
    name: 'Laparo Medical Simulators',
    category: 'specialty',
    website: 'laparosimulators.com',
    description: 'Provider of hybrid physical and VR laparoscopic training systems with intelligent motion tracking.',
    notableProducts: [
      'Laparo Hybrid - physical + VR training',
      'Intelligent motion tracking system',
      'Performance analysis software',
      'Multiple procedure modules'
    ],
    priceTier: '$$',
    specialties: ['Laparoscopic surgery', 'Hybrid simulation', 'Motion tracking']
  },
  {
    id: 'fresenius-training',
    name: 'Fresenius Medical Care Training',
    category: 'specialty',
    website: 'freseniusmedicalcare.com',
    description: 'Leading dialysis company offering comprehensive training solutions including VR-based peritoneal dialysis training.',
    notableProducts: [
      'AREP online training platform',
      'stay-safe MyTraining VR for PD',
      'Hemodialysis machine training',
      'Device animations and interactive learning'
    ],
    priceTier: '$$',
    specialties: ['Dialysis training', 'VR training', 'Hemodialysis']
  },
  {
    id: 'outset-medical',
    name: 'Outset Medical',
    category: 'specialty',
    website: 'outsetmedical.com',
    description: 'Provider of the Tablo all-in-one hemodialysis system designed for simplified training and operation.',
    notableProducts: [
      'Tablo Hemodialysis System - $35,000-$50,000',
      'Nurses trained in hours',
      'Patient training in ~38 hours',
      'Home hemodialysis capability'
    ],
    priceTier: '$$',
    specialties: ['Home dialysis', 'Simplified training', 'Point-of-care dialysis']
  },
  {
    id: 'techline-trauma',
    name: 'Techline Trauma',
    category: 'specialty',
    website: 'techlinetrauma.com',
    description: 'Manufacturer of wearable wound simulations for trauma training, including bleeding wounds and blast injuries.',
    notableProducts: [
      'Wearable wound simulations',
      'Bleeding wounds with controllable flow',
      'Blast injury modules',
      'Tactical medicine trainers'
    ],
    priceTier: '$$',
    specialties: ['Trauma training', 'Wearable wounds', 'Military medicine']
  }
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getAllVendors = (): ExtendedVendor[] => [
  ...simulationEquipmentVendors,
  ...avSystemVendors,
  ...printing3DVendors,
  ...specialtyVendors
]

export const getVendorsByCategory = (category: ExtendedVendor['category']): ExtendedVendor[] => {
  return getAllVendors().filter(v => v.category === category)
}

export const getVendorsByPriceTier = (tier: '$' | '$$' | '$$$'): ExtendedVendor[] => {
  return getAllVendors().filter(v => v.priceTier === tier)
}

export const searchVendors = (query: string): ExtendedVendor[] => {
  const searchTerm = query.toLowerCase()
  return getAllVendors().filter(v =>
    v.name.toLowerCase().includes(searchTerm) ||
    v.description.toLowerCase().includes(searchTerm) ||
    v.notableProducts.some(p => p.toLowerCase().includes(searchTerm)) ||
    v.specialties?.some(s => s.toLowerCase().includes(searchTerm))
  )
}

// Category statistics
export const getVendorStats = () => ({
  total: getAllVendors().length,
  simulationEquipment: simulationEquipmentVendors.length,
  avSystems: avSystemVendors.length,
  printing3D: printing3DVendors.length,
  specialty: specialtyVendors.length,
  byPriceTier: {
    budget: getVendorsByPriceTier('$').length,
    midRange: getVendorsByPriceTier('$$').length,
    premium: getVendorsByPriceTier('$$$').length
  }
})
