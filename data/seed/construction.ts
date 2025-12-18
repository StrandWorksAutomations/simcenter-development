// Construction and CSI Division Cost Data
// Source: Prompt 4 - Construction/renovation estimate framework

export interface CSIDivision {
  id: string
  division: string
  name: string
  description: string
  estimatedCost: number
  actualCost: number | null
  status: 'pending' | 'in_progress' | 'completed'
  notes: string
}

export const csiDivisions: CSIDivision[] = [
  {
    id: 'div-01',
    division: '01',
    name: 'General Conditions & Overheads',
    description: 'Project management, supervision, permits, insurance, temporary protections (ICRA barriers, negative air machines), and general requirements for working in the hospital.',
    estimatedCost: 50000,
    actualCost: null,
    status: 'pending',
    notes: 'Assuming ~5-6 months construction duration'
  },
  {
    id: 'div-02',
    division: '02',
    name: 'Existing Conditions/Demolition',
    description: 'Selective demolition of interior finishes and non-structural walls, old casework removal, minor slab coring for plumbing. Includes hazardous material abatement allowance.',
    estimatedCost: 20000,
    actualCost: null,
    status: 'pending',
    notes: 'Includes asbestos/lead abatement allowance if needed'
  },
  {
    id: 'div-03',
    division: '03',
    name: 'Concrete',
    description: 'Minor patching or coring only (floor penetrations for new drains or duct). No new structural concrete.',
    estimatedCost: 5000,
    actualCost: null,
    status: 'pending',
    notes: 'Minimal scope expected'
  },
  {
    id: 'div-05',
    division: '05',
    name: 'Metals',
    description: 'Miscellaneous metal support for new openings or equipment. Steel lintel for widened doors, Unistrut or angle iron framing in ceiling for heavy fixtures.',
    estimatedCost: 5000,
    actualCost: null,
    status: 'pending',
    notes: 'Support for AV equipment and lighting'
  },
  {
    id: 'div-06-09',
    division: '06/09',
    name: 'Carpentry and Finishes',
    description: 'New metal stud framing and drywall partitions, wall sound insulation, drywall finishing. Suspended acoustic tile ceiling. Hospital-grade sheet vinyl flooring with coved edges. Painting of all walls and ceilings. Corner guards and bumper rails.',
    estimatedCost: 60000,
    actualCost: null,
    status: 'pending',
    notes: 'Healthcare-grade materials for infection control'
  },
  {
    id: 'div-08',
    division: '08',
    name: 'Doors, Glazing, and Hardware',
    description: 'New doors and frames for sim rooms and control/storage rooms. Widening existing openings to 42" for bed movement. Solid-core doors with hospital hardware. Vision panels and one-way observation windows.',
    estimatedCost: 15000,
    actualCost: null,
    status: 'pending',
    notes: 'Includes special glazing with mirror film for control rooms'
  },
  {
    id: 'div-10',
    division: '10',
    name: 'Specialties',
    description: 'Signage (room signs, emergency egress signs), marker boards or pin boards in debrief/classroom, privacy curtains or tracks, storage specialties.',
    estimatedCost: 5000,
    actualCost: null,
    status: 'pending',
    notes: 'Wayfinding and room identification'
  },
  {
    id: 'div-21',
    division: '21',
    name: 'Fire Suppression',
    description: 'Modify existing sprinkler layout to suit new walls and open areas. Likely relocating/adding 4-6 sprinkler heads and updating zone if needed.',
    estimatedCost: 5000,
    actualCost: null,
    status: 'pending',
    notes: 'Code compliance modifications'
  },
  {
    id: 'div-22',
    division: '22',
    name: 'Plumbing',
    description: 'Install sinks with hands-free faucet in sim rooms. Verify and reconnect medical gas piping for O₂ and vacuum to 2 sim rooms. Provide small compressed air system for sim lab outlets and manikin air.',
    estimatedCost: 15000,
    actualCost: null,
    status: 'pending',
    notes: 'Medical gas certification for simulation use'
  },
  {
    id: 'div-23',
    division: '23',
    name: 'Heating, Ventilation & AC',
    description: 'HVAC modifications for cooling load and noise requirements. Add/adjust ductwork for three sim rooms and support rooms. New diffusers, returns, possibly dedicated mini-split AC for server/AV closet. Install duct silencers.',
    estimatedCost: 30000,
    actualCost: null,
    status: 'pending',
    notes: 'Target NC-30 to NC-35 noise levels for audio clarity'
  },
  {
    id: 'div-26',
    division: '26',
    name: 'Electrical',
    description: 'Electrical power distribution upgrades. New circuits from existing panel for additional outlets (8-10 twin receptacles per sim room). Tie circuits to emergency power. LED lighting with dimming, specialty exam lights, lighting controls.',
    estimatedCost: 40000,
    actualCost: null,
    status: 'pending',
    notes: 'Emergency power backup for critical equipment'
  },
  {
    id: 'div-27',
    division: '27',
    name: 'Communications (IT)',
    description: 'Structured cabling and pathway for data and AV. Cat6 data cables to each camera location, wireless access points, control room stations, and debrief room display. Patch panels and network racks.',
    estimatedCost: 20000,
    actualCost: null,
    status: 'pending',
    notes: 'Future-proofing with extra conduit capacity'
  },
  {
    id: 'div-28',
    division: '28',
    name: 'Electronic Safety and Security',
    description: 'Expand hospital access control and fire alarm into the sim suite. Badge reader on main door, smoke detectors and alarm strobes integration with existing fire alarm panel.',
    estimatedCost: 10000,
    actualCost: null,
    status: 'pending',
    notes: 'Security for expensive equipment'
  }
]

// Cost summary calculations
export const constructionCostSummary = {
  subtotalConstruction: csiDivisions.reduce((sum, d) => sum + d.estimatedCost, 0),
  contingency: 0.10, // 10%
  get contingencyAmount() {
    return Math.round(this.subtotalConstruction * this.contingency)
  },
  get totalConstruction() {
    return this.subtotalConstruction + this.contingencyAmount
  }
}

// Equipment costs (owner-furnished)
export interface EquipmentCategory {
  id: string
  category: string
  description: string
  estimatedCost: number
  tier: 'budget' | 'mid_range' | 'premium'
  items: string[]
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'simulators',
    category: 'Patient Simulators',
    description: 'High-fidelity manikins for adult, birthing, and pediatric scenarios',
    estimatedCost: 150000,
    tier: 'mid_range',
    items: [
      '2 mid-range adult manikins (~$30k each)',
      '1 premium adult manikin (~$60k)',
      'Basic mannequins and part-task trainers'
    ]
  },
  {
    id: 'av-system',
    category: 'A/V Capture & Debrief System',
    description: 'Cameras, microphones, server, software licenses, viewing stations',
    estimatedCost: 100000,
    tier: 'mid_range',
    items: [
      '8-10 HD cameras',
      'Ceiling-mounted microphones',
      'Central server/appliance',
      'Software licenses (SimCapture/VALT)',
      'Debrief room displays'
    ]
  }
]

// Total project cost
export const projectCostSummary = {
  constructionCost: 300000, // Including contingency
  equipmentCost: 250000,
  get totalPhase1() {
    return this.constructionCost + this.equipmentCost
  },
  costMetrics: {
    perSquareFoot: {
      renovationLow: 80,
      renovationMid: 150,
      renovationHigh: 250,
      newConstructionLow: 150,
      newConstructionMid: 250,
      newConstructionHigh: 400
    },
    perSimSuite: {
      basicSuite: 75000,
      midRangeSuite: 125000,
      premiumSuite: 200000
    }
  }
}

// Timeline milestones from construction schedule
export interface ProjectMilestone {
  id: string
  phase: string
  name: string
  description: string
  startMonth: number
  endMonth: number
  status: 'not_started' | 'in_progress' | 'completed'
  dependencies: string[]
}

export const projectMilestones: ProjectMilestone[] = [
  {
    id: 'design',
    phase: 'Design & Approvals',
    name: 'Schematic Design & Permitting',
    description: 'Complete schematic design, floor plan development, engineering layouts. Obtain owner sign-off and submit for permit.',
    startMonth: 0,
    endMonth: 2,
    status: 'not_started',
    dependencies: []
  },
  {
    id: 'procurement',
    phase: 'Procurement & Bidding',
    name: 'Contractor Selection & Equipment Orders',
    description: 'Solicit proposals from pre-qualified general contractor. Place orders for major simulators and A/V systems.',
    startMonth: 3,
    endMonth: 3,
    status: 'not_started',
    dependencies: ['design']
  },
  {
    id: 'construction-start',
    phase: 'Construction Start',
    name: 'ICRA Setup & Demolition',
    description: 'Erect ICRA protections, establish environmental controls. Complete selective demolition.',
    startMonth: 4,
    endMonth: 4,
    status: 'not_started',
    dependencies: ['procurement']
  },
  {
    id: 'build-out',
    phase: 'Build-Out',
    name: 'Rough Construction & MEP Installation',
    description: 'Frame new walls, run electrical/plumbing lines, HVAC modifications. Complete rough-in inspections.',
    startMonth: 5,
    endMonth: 7,
    status: 'not_started',
    dependencies: ['construction-start']
  },
  {
    id: 'finishes',
    phase: 'Interior Finishes',
    name: 'Drywall, Paint, Flooring, Ceiling',
    description: 'Complete interior finishes including drywall, painting, flooring, ceiling tiles. Install low-voltage cabling before ceiling closure.',
    startMonth: 6,
    endMonth: 7,
    status: 'not_started',
    dependencies: ['build-out']
  },
  {
    id: 'systems-install',
    phase: 'Systems Installation',
    name: 'A/V & Technology Integration',
    description: 'Mount cameras and microphones, configure server, test software. Install simulation mannequins and equipment. Commission HVAC and fire alarm.',
    startMonth: 8,
    endMonth: 8,
    status: 'not_started',
    dependencies: ['finishes']
  },
  {
    id: 'training',
    phase: 'Staff Training',
    name: 'Soft Opening & Training',
    description: 'Conduct dry-run simulations to test workflows. Address punchlist items. Train staff on equipment.',
    startMonth: 9,
    endMonth: 9,
    status: 'not_started',
    dependencies: ['systems-install']
  },
  {
    id: 'go-live',
    phase: 'Go-Live',
    name: 'Grand Opening',
    description: 'Official simulation center opening. First training sessions. Handover final documentation.',
    startMonth: 10,
    endMonth: 10,
    status: 'not_started',
    dependencies: ['training']
  }
]

// Risk register for construction
export interface ProjectRisk {
  id: string
  category: string
  risk: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  probability: 'low' | 'medium' | 'high'
  mitigation: string
  status: 'identified' | 'mitigating' | 'resolved' | 'accepted'
}

export const constructionRisks: ProjectRisk[] = [
  {
    id: 'risk-permits',
    category: 'Regulatory',
    risk: 'Permitting Delays',
    impact: 'medium',
    probability: 'medium',
    mitigation: 'Engage authorities early; submit well-prepared permit set. Use hospital expeditor if available.',
    status: 'identified'
  },
  {
    id: 'risk-icra',
    category: 'Safety',
    risk: 'Infection Control Breach',
    impact: 'critical',
    probability: 'low',
    mitigation: 'Implement strict ICRA protocols - hard barriers, negative air machines with HEPA, daily cleaning. Monitor pressure differentials.',
    status: 'identified'
  },
  {
    id: 'risk-hazmat',
    category: 'Environmental',
    risk: 'Unforeseen Hazardous Materials',
    impact: 'high',
    probability: 'medium',
    mitigation: 'Perform pre-renovation hazmat survey. Budget time and money for abatement in Division 02.',
    status: 'identified'
  },
  {
    id: 'risk-it',
    category: 'Technical',
    risk: 'IT Network & System Integration Issues',
    impact: 'high',
    probability: 'medium',
    mitigation: 'Include hospital IT and clinical engineering teams from day one. Choose proven, supported A/V solution.',
    status: 'identified'
  },
  {
    id: 'risk-procurement',
    category: 'Procurement',
    risk: 'Equipment Procurement Delays',
    impact: 'high',
    probability: 'medium',
    mitigation: 'Identify and order long-lead equipment early (Month 3). Track production status. Have alternate suppliers identified.',
    status: 'identified'
  },
  {
    id: 'risk-budget',
    category: 'Financial',
    risk: 'Budget Overrun / Scope Creep',
    impact: 'high',
    probability: 'medium',
    mitigation: 'Maintain change control process. Include 10% contingency. Regular cost tracking with contractor.',
    status: 'identified'
  },
  {
    id: 'risk-coordination',
    category: 'Operational',
    risk: 'Hospital Environment Coordination',
    impact: 'medium',
    probability: 'medium',
    mitigation: 'Develop detailed logistics plan with hospital facilities. Designate specific times for noisy work. Identify and protect utilities.',
    status: 'identified'
  },
  {
    id: 'risk-av',
    category: 'Technical',
    risk: 'A/V Performance Issues',
    impact: 'medium',
    probability: 'low',
    mitigation: 'Incorporate acoustical design from start. On-site testing during commissioning. Budget for sound absorption if needed.',
    status: 'identified'
  }
]

// Alternates - Required vs Nice-to-Have
export interface AlternateItem {
  id: string
  name: string
  description: string
  category: 'required' | 'alternate'
  costImpact: number
  priority: 'essential' | 'recommended' | 'optional'
  included: boolean
}

export const alternateItems: AlternateItem[] = [
  // Required Base Scope
  {
    id: 'base-sim-rooms',
    name: '3 Simulation Suites',
    description: 'Three fully functional simulation rooms with basic clinical infrastructure (headwalls, sinks, O2/vacuum outlets functional in 2 rooms)',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  {
    id: 'base-control-debrief',
    name: 'Control Room & Debrief Room',
    description: 'One shared control room with windows/camera views and one debriefing room for post-simulation review',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  {
    id: 'base-mep',
    name: 'Essential MEP Upgrades',
    description: 'Sufficient HVAC capacity, noise attenuation, electrical/data provisions, and basic emergency power backup',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  {
    id: 'base-av',
    name: 'A/V Recording System (Standard)',
    description: 'Mid-level audio-visual capture system (e.g. VALT or similar) with fixed cameras and microphones in each sim room',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  {
    id: 'base-simulator',
    name: '1 High-Fidelity + Mid-Fidelity Simulators',
    description: 'One high-fidelity adult mannequin and additional mid-fidelity mannequins for other rooms',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  {
    id: 'base-infrastructure',
    name: 'Future Expansion Infrastructure',
    description: 'Conduit pathways and spare data drops to Phase 2 area, plumbing rough-ins for future expansion',
    category: 'required',
    costImpact: 0,
    priority: 'essential',
    included: true
  },
  // Alternate (Nice-to-Have) Items
  {
    id: 'alt-av-premium',
    name: 'Enhanced A/V System Upgrade',
    description: 'Upgrade to Laerdal SimCapture Enterprise or CAE LearningSpace with analytics, assessment tools, and expanded cloud storage',
    category: 'alternate',
    costImpact: 75000,
    priority: 'recommended',
    included: false
  },
  {
    id: 'alt-ob-simulator',
    name: 'OB Birth Simulator',
    description: 'Dedicated birthing simulator (e.g. CAE Lucina or Gaumard Victoria) for labor and delivery scenarios',
    category: 'alternate',
    costImpact: 50000,
    priority: 'optional',
    included: false
  },
  {
    id: 'alt-peds-simulator',
    name: 'Pediatric High-Fidelity Mannequin',
    description: 'High-fidelity pediatric mannequin for pediatric emergency scenarios',
    category: 'alternate',
    costImpact: 30000,
    priority: 'optional',
    included: false
  },
  {
    id: 'alt-second-adult',
    name: 'Second Adult HAL Mannequin',
    description: 'Additional high-fidelity adult mannequin to run two advanced scenarios simultaneously',
    category: 'alternate',
    costImpact: 60000,
    priority: 'optional',
    included: false
  },
  {
    id: 'alt-med-gas-third',
    name: 'Med Gas in Third Sim Room',
    description: 'Extend functional O2/vacuum to third simulation room for full gas capability in all rooms',
    category: 'alternate',
    costImpact: 7000,
    priority: 'recommended',
    included: false
  },
  {
    id: 'alt-negative-pressure',
    name: 'Negative Pressure Simulation',
    description: 'Equipment to allow one room to operate in negative isolation mode for infectious disease scenarios',
    category: 'alternate',
    costImpact: 10000,
    priority: 'optional',
    included: false
  },
  {
    id: 'alt-second-debrief',
    name: 'Second Debrief/Multipurpose Room',
    description: 'Additional debriefing room for parallel post-simulation sessions or skills lab space',
    category: 'alternate',
    costImpact: 25000,
    priority: 'optional',
    included: false
  },
  {
    id: 'alt-finishes',
    name: 'Enhanced Finishes & Branding',
    description: 'Decorative wall panels, themed graphics, donor recognition, digital signage, acoustic wall panels',
    category: 'alternate',
    costImpact: 15000,
    priority: 'optional',
    included: false
  }
]

// Contractor Bid Entry Structure
export interface BidEntry {
  id: string
  contractorName: string
  divisionId: string
  bidAmount: number
  dateReceived: string
  expirationDate: string | null
  notes: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
}

// Helper to calculate total alternates cost
export const getAlternatesTotal = (items: AlternateItem[]) => {
  return items
    .filter(item => item.category === 'alternate' && item.included)
    .reduce((sum, item) => sum + item.costImpact, 0)
}
