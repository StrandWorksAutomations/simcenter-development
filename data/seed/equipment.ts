// Equipment and Vendor Pricing Data
// Source: Prompt 7 - Vendor pricing deep dive

// =============================================================================
// EXISTING INVENTORY - Equipment BHL Already Owns
// =============================================================================

export interface OwnedEquipment {
  id: string
  equipmentId: string // references equipmentCatalog
  name: string
  model: string
  serialNumber?: string
  purchaseDate: string
  purchasePrice?: number
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'needs_repair'
  warrantyExpires?: string
  location?: string
  notes: string
}

export const existingInventory: OwnedEquipment[] = [
  // High-Fidelity Simulators
  {
    id: 'owned-simman-3g-plus-1',
    equipmentId: 'simman-3g',
    name: 'SimMan 3G PLUS',
    model: 'SimMan 3G PLUS',
    purchaseDate: '2024-12',
    condition: 'new',
    location: 'Storage - Pending simulation center',
    notes: 'Brand new, just purchased. Ready for deployment when sim center opens.'
  },
  // Simple Manikin Trainers
  {
    id: 'owned-basic-manikins',
    equipmentId: 'task-trainer-general',
    name: 'Basic Manikin Trainers',
    model: 'Various',
    purchaseDate: 'existing',
    condition: 'good',
    location: 'Nursing Education',
    notes: 'Several simple manikin trainers available from nursing education program.'
  }
]

// Procedural supplies available (expired but usable for training)
export interface ProceduralSupply {
  id: string
  name: string
  category: 'airway' | 'vascular' | 'urinary' | 'chest' | 'wound' | 'monitoring' | 'general'
  quantity: 'abundant' | 'moderate' | 'limited'
  source: string
  notes: string
}

export const proceduralSupplies: ProceduralSupply[] = [
  { id: 'chest-tube-trays', name: 'Chest Tube Trays', category: 'chest', quantity: 'abundant', source: 'Hospital expired stock', notes: 'Full chest tube insertion kits' },
  { id: 'foley-catheters', name: 'Foley Catheter Kits', category: 'urinary', quantity: 'abundant', source: 'Hospital expired stock', notes: 'Complete catheterization kits' },
  { id: 'iv-pumps', name: 'IV Infusion Pumps', category: 'vascular', quantity: 'moderate', source: 'Hospital surplus', notes: 'Functional IV pumps for realistic training' },
  { id: 'iv-start-kits', name: 'IV Start Kits', category: 'vascular', quantity: 'abundant', source: 'Hospital expired stock', notes: 'Catheters, tubing, dressings' },
  { id: 'central-line-kits', name: 'Central Line Kits', category: 'vascular', quantity: 'moderate', source: 'Hospital expired stock', notes: 'Triple lumen catheter kits' },
  { id: 'intubation-supplies', name: 'Intubation Supplies', category: 'airway', quantity: 'abundant', source: 'Hospital expired stock', notes: 'ET tubes, laryngoscope blades, stylettes' },
  { id: 'suture-kits', name: 'Suture Kits', category: 'wound', quantity: 'abundant', source: 'Hospital expired stock', notes: 'Various suture materials and instruments' },
  { id: 'ng-tubes', name: 'NG Tubes', category: 'general', quantity: 'abundant', source: 'Hospital expired stock', notes: 'Nasogastric tubes various sizes' },
  { id: 'monitoring-supplies', name: 'Monitoring Supplies', category: 'monitoring', quantity: 'abundant', source: 'Hospital expired stock', notes: 'ECG leads, SpO2 sensors, BP cuffs' }
]

// Get supplies by category
export function getSuppliesByCategory(category: ProceduralSupply['category']): ProceduralSupply[] {
  return proceduralSupplies.filter(s => s.category === category)
}

// Get supply summary
export function getSupplySummary() {
  const categories = ['airway', 'vascular', 'urinary', 'chest', 'wound', 'monitoring', 'general'] as const
  return categories.map(cat => ({
    category: cat,
    count: proceduralSupplies.filter(s => s.category === cat).length,
    items: proceduralSupplies.filter(s => s.category === cat)
  }))
}

// =============================================================================
// VENDOR DATA
// =============================================================================

export interface Vendor {
  id: string
  name: string
  category: string
  website: string
  description: string
}

export const vendors: Vendor[] = [
  { id: 'laerdal', name: 'Laerdal Medical', category: 'Simulators & AV', website: 'laerdal.com', description: 'Industry standard for patient simulators and SimCapture AV system' },
  { id: 'gaumard', name: 'Gaumard Scientific', category: 'Simulators', website: 'gaumard.com', description: 'Known for tetherless HAL and Victoria birthing simulators' },
  { id: 'cae', name: 'CAE Healthcare', category: 'Simulators & AV', website: 'caehealthcare.com', description: 'Apollo, Ares, and LearningSpace AV system' },
  { id: 'ems', name: 'Education Management Solutions', category: 'AV Systems', website: 'simulationiQ.com', description: 'SIMULATIONiQ center management solution' },
  { id: 'ivs', name: 'Intelligent Video Solutions', category: 'AV Systems', website: 'intelvs.com', description: 'VALT video recording system' },
  { id: 'ingmar', name: 'IngMar Medical', category: 'Respiratory', website: 'ingmarmed.com', description: 'ASL 5000 breathing simulator for ventilator training' },
  { id: 'nasco', name: 'Nasco Healthcare', category: 'Task Trainers', website: 'nascohealthcare.com', description: 'GERi geriatric and Simulaids training products' },
  { id: 'realityworks', name: 'Realityworks', category: 'Geriatric', website: 'realityworks.com', description: 'Geriatric simulation suits and training tools' }
]

export interface EquipmentItem {
  id: string
  vendorId: string
  name: string
  category: 'adult_simulator' | 'ob_simulator' | 'pediatric_simulator' | 'geriatric' | 'respiratory' | 'av_system' | 'lms' | 'task_trainer'
  model: string
  priceRange: {
    low: number
    high: number
  }
  warrantyYears: number
  annualMaintenancePct: number
  lifecycleYears: number
  features: string[]
  notes: string
}

export const equipmentCatalog: EquipmentItem[] = [
  // Adult High-Fidelity Simulators
  {
    id: 'simman-3g',
    vendorId: 'laerdal',
    name: 'SimMan 3G',
    category: 'adult_simulator',
    model: 'SimMan 3G',
    priceRange: { low: 70000, high: 80000 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 5,
    features: ['Fully wireless', 'Drug recognition', 'Extensive physiological features', 'LLEAP software', 'SimCapture integration'],
    notes: 'High-end, fully wireless with extensive features'
  },
  {
    id: 'simman-essential',
    vendorId: 'laerdal',
    name: 'SimMan Essential/ALS',
    category: 'adult_simulator',
    model: 'SimMan Essential',
    priceRange: { low: 25000, high: 40000 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 5,
    features: ['Mid-fidelity', 'Core vital signs', 'Airway management', 'IV access', 'Basic drug response'],
    notes: 'More affordable entry point for high-fidelity training'
  },
  {
    id: 'hal-s5301',
    vendorId: 'gaumard',
    name: 'HAL S5301',
    category: 'adult_simulator',
    model: 'HAL S5301',
    priceRange: { low: 80000, high: 100000 },
    warrantyYears: 1,
    annualMaintenancePct: 12,
    lifecycleYears: 5,
    features: ['Tetherless operation', 'Durable construction', 'Trauma modules', 'Real-time physiology', 'Long battery life'],
    notes: 'Known for durability and tetherless operation'
  },
  {
    id: 'hal-s3201',
    vendorId: 'gaumard',
    name: 'HAL S3201',
    category: 'adult_simulator',
    model: 'HAL S3201',
    priceRange: { low: 50000, high: 60000 },
    warrantyYears: 1,
    annualMaintenancePct: 12,
    lifecycleYears: 5,
    features: ['Mid-range tetherless', 'Core features', 'Durable', 'Good value'],
    notes: 'Good value mid-range option'
  },
  {
    id: 'cae-apollo',
    vendorId: 'cae',
    name: 'CAE Apollo',
    category: 'adult_simulator',
    model: 'Apollo',
    priceRange: { low: 55000, high: 65000 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 5,
    features: ['Advanced physiology', 'LearningSpace integration', 'Drug recognition', 'Wireless'],
    notes: 'Strong integration with CAE ecosystem'
  },
  {
    id: 'cae-ares',
    vendorId: 'cae',
    name: 'CAE Ares',
    category: 'adult_simulator',
    model: 'Ares',
    priceRange: { low: 35000, high: 50000 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 5,
    features: ['ACLS-focused', 'Emergency care', 'Newer model', 'Mid-range pricing'],
    notes: 'Newer mid-range option for emergency care training'
  },

  // OB/Birthing Simulators
  {
    id: 'victoria-s2200',
    vendorId: 'gaumard',
    name: 'Victoria S2200',
    category: 'ob_simulator',
    model: 'Victoria S2200',
    priceRange: { low: 80000, high: 90000 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 5,
    features: ['Full-body mother with neonate', 'Automatic contractions', 'Cervical dilation models', 'Postpartum hemorrhage module', 'C-section option'],
    notes: 'Most advanced birthing simulator available'
  },
  {
    id: 'cae-lucina',
    vendorId: 'cae',
    name: 'CAE Lucina',
    category: 'ob_simulator',
    model: 'Lucina',
    priceRange: { low: 110000, high: 120000 },
    warrantyYears: 1,
    annualMaintenancePct: 12,
    lifecycleYears: 5,
    features: ['Wireless', 'Maternal-fetal physiology', 'Fetal heart tracing', 'Breech/C-section capable', 'Premium features'],
    notes: 'Highest price point but most advanced maternal-fetal simulation'
  },
  {
    id: 'mamaanne',
    vendorId: 'laerdal',
    name: 'MamaAnne',
    category: 'ob_simulator',
    model: 'MamaAnne',
    priceRange: { low: 60000, high: 70000 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 5,
    features: ['Full-body OB simulator', 'Core birthing features', 'SimCapture integration', 'Nursing program focused'],
    notes: 'Most affordable high-fidelity OB option'
  },
  {
    id: 'mamanatalie',
    vendorId: 'laerdal',
    name: 'MamaNatalie',
    category: 'ob_simulator',
    model: 'MamaNatalie',
    priceRange: { low: 700, high: 1000 },
    warrantyYears: 1,
    annualMaintenancePct: 5,
    lifecycleYears: 7,
    features: ['Wearable simulator', 'Instructor-operated', 'Low cost', 'Portable'],
    notes: 'Budget wearable option for basic delivery training'
  },

  // Neonatal/Pediatric Simulators
  {
    id: 'simnewb',
    vendorId: 'laerdal',
    name: 'SimNewB',
    category: 'pediatric_simulator',
    model: 'SimNewB',
    priceRange: { low: 40000, high: 50000 },
    warrantyYears: 1,
    annualMaintenancePct: 8,
    lifecycleYears: 5,
    features: ['Newborn focused', 'AAP co-developed', 'NICU/PALS training', 'Realistic resuscitation'],
    notes: 'Gold standard for neonatal resuscitation training'
  },
  {
    id: 'simbaby',
    vendorId: 'laerdal',
    name: 'SimBaby',
    category: 'pediatric_simulator',
    model: 'SimBaby',
    priceRange: { low: 20000, high: 30000 },
    warrantyYears: 1,
    annualMaintenancePct: 8,
    lifecycleYears: 5,
    features: ['Infant (up to 9 months)', 'Mid-to-high fidelity', 'Vital signs', 'Airway management'],
    notes: 'Infant simulator for broader pediatric training'
  },
  {
    id: 'simjunior',
    vendorId: 'laerdal',
    name: 'SimJunior',
    category: 'pediatric_simulator',
    model: 'SimJunior',
    priceRange: { low: 20000, high: 30000 },
    warrantyYears: 1,
    annualMaintenancePct: 8,
    lifecycleYears: 5,
    features: ['6-year-old child', 'Pediatric emergencies', 'Mid-high fidelity'],
    notes: 'Child manikin for pediatric emergency scenarios'
  },
  {
    id: 'super-tory',
    vendorId: 'gaumard',
    name: 'Super TORY S2220',
    category: 'pediatric_simulator',
    model: 'Super TORY S2220',
    priceRange: { low: 55000, high: 65000 },
    warrantyYears: 1,
    annualMaintenancePct: 12,
    lifecycleYears: 5,
    features: ['Neonate with realistic movement', 'Crying/convulsing/cyanosis', 'Ventilator compatible', '8-hour battery'],
    notes: 'Advanced neonate with unique movement capabilities'
  },
  {
    id: 'pediatric-hal',
    vendorId: 'gaumard',
    name: 'Pediatric HAL',
    category: 'pediatric_simulator',
    model: 'Pediatric HAL',
    priceRange: { low: 40000, high: 60000 },
    warrantyYears: 1,
    annualMaintenancePct: 12,
    lifecycleYears: 5,
    features: ['5-year-old tetherless', 'Emotional expressions', 'Pediatric emergencies'],
    notes: 'Child-size HAL with emotional capabilities'
  },

  // Geriatric Training
  {
    id: 'geri-manikin',
    vendorId: 'nasco',
    name: 'GERi Nursing Simulator',
    category: 'geriatric',
    model: 'GERi',
    priceRange: { low: 2500, high: 5000 },
    warrantyYears: 1,
    annualMaintenancePct: 5,
    lifecycleYears: 10,
    features: ['Elderly appearance', 'Removable dentures', 'Reduced range of motion', 'Nursing skills focused'],
    notes: 'Low-cost geriatric nursing care manikin'
  },
  {
    id: 'aging-suit',
    vendorId: 'realityworks',
    name: 'RealCare Geriatric Simulator Suit',
    category: 'geriatric',
    model: 'Geriatric Simulator Suit',
    priceRange: { low: 3000, high: 4000 },
    warrantyYears: 1,
    annualMaintenancePct: 2,
    lifecycleYears: 5,
    features: ['Wearable suit', 'Weighted braces', 'Vision-impairing glasses', 'Hearing loss simulation', 'Tremor simulators'],
    notes: 'Empathy training for understanding aging challenges'
  },

  // Respiratory Training
  {
    id: 'asl-5000',
    vendorId: 'ingmar',
    name: 'ASL 5000 + RespiSim',
    category: 'respiratory',
    model: 'ASL 5000',
    priceRange: { low: 40000, high: 75000 },
    warrantyYears: 1,
    annualMaintenancePct: 5,
    lifecycleYears: 7,
    features: ['Computer-controlled mechanical lung', 'Wide range of lung characteristics', 'Ventilator compatible', 'Quantitative control'],
    notes: 'Gold standard for advanced ventilator training'
  },
  {
    id: 'airway-trainer',
    vendorId: 'laerdal',
    name: 'Airway Management Trainer',
    category: 'task_trainer',
    model: 'Airway Management Trainer',
    priceRange: { low: 500, high: 1500 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 5,
    features: ['Intubation practice', 'Replaceable parts', 'Protects expensive manikins'],
    notes: 'Essential for repeated intubation practice'
  },
  {
    id: 'chest-tube-trainer',
    vendorId: 'cae',
    name: 'Blue Phantom Chest Trainer',
    category: 'task_trainer',
    model: 'Blue Phantom',
    priceRange: { low: 2000, high: 3500 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 3,
    features: ['Ultrasound compatible', 'Needle decompression', 'Chest tube insertion', 'Replaceable skins'],
    notes: 'Ultrasoundable chest for procedural training'
  },

  // A/V Systems
  {
    id: 'simcapture',
    vendorId: 'laerdal',
    name: 'SimCapture Enterprise',
    category: 'av_system',
    model: 'SimCapture Enterprise',
    priceRange: { low: 150000, high: 250000 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 7,
    features: ['End-to-end sim management', 'HD cameras', 'Ceiling mics', 'Live viewing', 'OSCE assessment', 'LTI/LMS integration', 'SSO support'],
    notes: 'Premium comprehensive simulation management solution'
  },
  {
    id: 'learningspace',
    vendorId: 'cae',
    name: 'CAE LearningSpace',
    category: 'av_system',
    model: 'LearningSpace',
    priceRange: { low: 100000, high: 200000 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 7,
    features: ['Recording and debrief', 'Scheduling', 'Center management', 'OSCE module', 'SSO/LDAP support', 'CAE manikin integration'],
    notes: 'Comprehensive solution best with CAE equipment'
  },
  {
    id: 'simulationiQ',
    vendorId: 'ems',
    name: 'SIMULATIONiQ Enterprise',
    category: 'av_system',
    model: 'SIMULATIONiQ Enterprise',
    priceRange: { low: 100000, high: 200000 },
    warrantyYears: 1,
    annualMaintenancePct: 15,
    lifecycleYears: 7,
    features: ['SP/OSCE management', 'Candidate tracking', 'Flexible configurations', 'AD integration', 'LMS export'],
    notes: 'Strong for standardized patient programs'
  },
  {
    id: 'valt',
    vendorId: 'ivs',
    name: 'VALT',
    category: 'av_system',
    model: 'VALT',
    priceRange: { low: 50000, high: 100000 },
    warrantyYears: 1,
    annualMaintenancePct: 10,
    lifecycleYears: 7,
    features: ['General video recording', 'Lower cost', 'Basic debrief', 'User-friendly'],
    notes: 'More affordable option with fewer sim-specific features'
  }
]

// Package configurations
export interface EquipmentPackage {
  id: string
  name: string
  tier: 'base' | 'enhanced'
  description: string
  totalCost5Year: number
  items: {
    equipmentId: string
    quantity: number
    cost: number
    maintenanceCost5Year: number
  }[]
}

export const equipmentPackages: EquipmentPackage[] = [
  {
    id: 'base-build',
    name: 'Base Build Package',
    tier: 'base',
    description: 'Essential Simulation Suite - Budget-conscious configuration meeting core training needs',
    totalCost5Year: 380000,
    items: [
      { equipmentId: 'simman-essential', quantity: 2, cost: 80000, maintenanceCost5Year: 32000 },
      { equipmentId: 'mamaanne', quantity: 1, cost: 35000, maintenanceCost5Year: 14000 },
      { equipmentId: 'simbaby', quantity: 1, cost: 25000, maintenanceCost5Year: 10000 },
      { equipmentId: 'aging-suit', quantity: 1, cost: 3500, maintenanceCost5Year: 500 },
      { equipmentId: 'airway-trainer', quantity: 2, cost: 2000, maintenanceCost5Year: 1000 },
      { equipmentId: 'valt', quantity: 1, cost: 100000, maintenanceCost5Year: 40000 }
    ]
  },
  {
    id: 'enhanced-build',
    name: 'Enhanced Build Package',
    tier: 'enhanced',
    description: 'Advanced Simulation Suite - High-capacity configuration with state-of-the-art equipment',
    totalCost5Year: 850000,
    items: [
      { equipmentId: 'simman-3g', quantity: 1, cost: 75000, maintenanceCost5Year: 37500 },
      { equipmentId: 'hal-s5301', quantity: 1, cost: 85000, maintenanceCost5Year: 51000 },
      { equipmentId: 'victoria-s2200', quantity: 1, cost: 85000, maintenanceCost5Year: 42500 },
      { equipmentId: 'simnewb', quantity: 1, cost: 45000, maintenanceCost5Year: 18000 },
      { equipmentId: 'pediatric-hal', quantity: 1, cost: 50000, maintenanceCost5Year: 30000 },
      { equipmentId: 'geri-manikin', quantity: 1, cost: 3500, maintenanceCost5Year: 875 },
      { equipmentId: 'aging-suit', quantity: 1, cost: 3500, maintenanceCost5Year: 350 },
      { equipmentId: 'asl-5000', quantity: 1, cost: 50000, maintenanceCost5Year: 12500 },
      { equipmentId: 'simcapture', quantity: 1, cost: 180000, maintenanceCost5Year: 135000 }
    ]
  }
]

// Vendor comparison helper
export function getVendorById(id: string): Vendor | undefined {
  return vendors.find(v => v.id === id)
}

export function getEquipmentByCategory(category: EquipmentItem['category']): EquipmentItem[] {
  return equipmentCatalog.filter(e => e.category === category)
}

export function calculateTotalCost(items: { equipmentId: string; quantity: number }[]): number {
  return items.reduce((total, item) => {
    const equipment = equipmentCatalog.find(e => e.id === item.equipmentId)
    if (equipment) {
      return total + ((equipment.priceRange.low + equipment.priceRange.high) / 2) * item.quantity
    }
    return total
  }, 0)
}

// =============================================================================
// EXISTING INVENTORY HELPERS
// =============================================================================

// Calculate value of existing inventory
export function getExistingInventoryValue(): number {
  return existingInventory.reduce((total, item) => {
    if (item.purchasePrice) return total + item.purchasePrice
    // Estimate from catalog if no purchase price recorded
    const catalogItem = equipmentCatalog.find(e => e.id === item.equipmentId)
    if (catalogItem) {
      return total + (catalogItem.priceRange.low + catalogItem.priceRange.high) / 2
    }
    return total
  }, 0)
}

// Get items still needed (not in existing inventory)
export function getNeededEquipment(packageId: string): { equipmentId: string; quantity: number; alreadyOwned: number }[] {
  const pkg = equipmentPackages.find(p => p.id === packageId)
  if (!pkg) return []

  return pkg.items.map(item => {
    const ownedCount = existingInventory.filter(inv => inv.equipmentId === item.equipmentId).length
    return {
      equipmentId: item.equipmentId,
      quantity: item.quantity,
      alreadyOwned: ownedCount
    }
  })
}

// Get inventory summary
export function getInventorySummary() {
  const ownedValue = getExistingInventoryValue()
  const ownedCount = existingInventory.length

  return {
    totalOwned: ownedCount,
    estimatedValue: ownedValue,
    items: existingInventory.map(item => {
      const catalogItem = equipmentCatalog.find(e => e.id === item.equipmentId)
      return {
        ...item,
        catalogName: catalogItem?.name || item.name,
        estimatedValue: item.purchasePrice || (catalogItem ? (catalogItem.priceRange.low + catalogItem.priceRange.high) / 2 : 0)
      }
    })
  }
}
