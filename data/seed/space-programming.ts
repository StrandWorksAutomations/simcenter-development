// =============================================================================
// SPACE PROGRAMMING - Simulation Lab Typologies & Room Requirements
// =============================================================================
// Source: Prompt 2 - "Build typologies + space programming (what gets built, why, and how big)"
// Data derived from healthcare simulation facility planning guidelines
// Sources: SSH, INACSL, RSMeans, simulation architecture experts
// =============================================================================

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

export interface SimulationTypology {
  id: string
  name: string
  shortName: string
  description: string
  icon: string // Lucide icon name
  suitableFor: string[]

  // Size ranges
  sqftRange: {
    min: number
    max: number
    typical: string
  }

  // Room counts
  roomCounts: {
    simRooms: string
    controlRooms: string
    debriefRooms: string
    skillsLabs: string
    examRooms?: string
  }

  // Key characteristics
  characteristics: {
    adjacency: string[]
    acoustics: string[]
    infectionControl: string[]
    circulation: string[]
  }

  // Pros and cons
  pros: string[]
  cons: string[]

  // Capacity
  capacity: {
    learnersPerSession: string
    sessionsPerDay: string
    annualCapacity: string
  }
}

export interface SpaceType {
  id: string
  name: string
  category: 'clinical' | 'support' | 'administrative' | 'technology'
  icon: string
  description: string

  // Size specifications
  sizing: {
    minSqft: number
    maxSqft: number
    minViable: string
    bestInClass: string
  }

  // Requirements
  requirements: string[]

  // Equipment/features
  features: {
    minViable: string[]
    bestInClass: string[]
  }

  // Adjacency needs
  adjacentTo: string[]

  // Special considerations
  specialConsiderations?: string[]
}

export interface ProposedRoom {
  id: string
  name: string
  spaceType: string
  sqft: number
  phase: 1 | 2 | 3
  priority: 'critical' | 'important' | 'optional'
  notes?: string
  features: string[]
}

export interface FloorPlanConcept {
  id: string
  name: string
  description: string
  totalSqft: number
  rooms: ProposedRoom[]
  zones: {
    name: string
    description: string
    roomIds: string[]
  }[]
}

// =============================================================================
// DATA SOURCES
// =============================================================================

export const DATA_SOURCES = {
  sqftGuidelines: {
    source: "SSH Simulation Center Design Guidelines",
    note: "Square footage ranges based on learner volume and concurrent sessions"
  },
  acoustics: {
    source: "ASTM E90 / STC Rating Standards",
    note: "STC 50+ recommended for simulation walls to contain noise"
  },
  infectionControl: {
    source: "CDC Healthcare Environmental Control Guidelines",
    note: "Healthcare-grade surfaces, hand hygiene stations, proper ventilation"
  },
  comparable: [
    { name: "Phoebe Putney Health System", sqft: 22000, rooms: 6, type: "Renovation" },
    { name: "Baptist Health Little Rock", sqft: 15000, rooms: 4, type: "New Build" },
    { name: "University of Tennessee Chattanooga", sqft: 12000, rooms: 5, type: "Academic" }
  ]
}

// =============================================================================
// SIMULATION TYPOLOGIES
// =============================================================================

export const SIMULATION_TYPOLOGIES: SimulationTypology[] = [
  {
    id: 'single-suite',
    name: 'Single-Suite Simulation Lab',
    shortName: 'Single-Suite',
    description: 'A small, self-contained simulation space ideal for community hospitals or programs with limited space and budget. Supports one scenario at a time.',
    icon: 'Box',
    suitableFor: [
      'Community hospitals',
      'Small training programs',
      'Pilot/starter programs',
      'Limited budget projects'
    ],
    sqftRange: {
      min: 500,
      max: 1000,
      typical: '600-800 sq ft'
    },
    roomCounts: {
      simRooms: '1',
      controlRooms: '1 (may be corner/closet)',
      debriefRooms: '1 (may share with sim room)',
      skillsLabs: '0-1'
    },
    characteristics: {
      adjacency: [
        'Control station directly adjoins or inside sim room',
        'Debrief area close by or same room',
        'Located in quiet area away from interruptions'
      ],
      acoustics: [
        'Full-height walls with STC 50 performance',
        'Acoustic panels to reduce echo',
        'Ceiling-mounted cameras for observation'
      ],
      infectionControl: [
        'Healthcare-grade non-porous surfaces',
        'Hand-washing sink in or near sim room',
        'Wipeable bed mattresses and equipment'
      ],
      circulation: [
        'Single door may serve all functions',
        'Simple flow: learners enter, simulate, debrief'
      ]
    },
    pros: [
      'Lowest cost to establish',
      'Quick to implement',
      'Good for proving program value',
      'Minimal staffing requirements'
    ],
    cons: [
      'Only one scenario at a time',
      'Limited capacity',
      'Must reconfigure between uses',
      'No parallel training possible'
    ],
    capacity: {
      learnersPerSession: '4-6',
      sessionsPerDay: '2-4',
      annualCapacity: 'Few hundred learners'
    }
  },
  {
    id: 'multi-suite',
    name: 'Multi-Suite Simulation Center',
    shortName: 'Multi-Suite',
    description: 'Multiple simulation rooms and support spaces allowing different scenarios to run simultaneously. Fits larger hospitals, nursing schools, or regional centers.',
    icon: 'Grid3X3',
    suitableFor: [
      'Large hospitals',
      'Regional training centers',
      'Nursing schools',
      'Multi-department programs'
    ],
    sqftRange: {
      min: 2000,
      max: 10000,
      typical: '5,000-8,000 sq ft'
    },
    roomCounts: {
      simRooms: '2-6',
      controlRooms: '1-3 (one per 1-2 sim rooms)',
      debriefRooms: '2-4',
      skillsLabs: '1-2'
    },
    characteristics: {
      adjacency: [
        'Sim rooms clustered in "clinical zone"',
        'Control rooms sandwiched between sim labs',
        'Debrief rooms adjacent with sound buffer',
        'Back-of-house corridor for staff/equipment'
      ],
      acoustics: [
        'STC 50+ walls, floor-to-ceiling',
        'Separate HVAC zones per room',
        'Background noise <40 dBA'
      ],
      infectionControl: [
        'Hand sanitizer at each room entrance',
        'Sinks with foot pedals or sensors',
        'Designated soiled equipment areas',
        'Deep sink for cleaning/refilling props'
      ],
      circulation: [
        'Public path for learners',
        'Secure staff path (control → storage → back doors)',
        'Separate entry for SPs if used'
      ]
    },
    pros: [
      'Multiple concurrent scenarios',
      'Specialized rooms for different training',
      'Higher throughput',
      'Dedicated support spaces'
    ],
    cons: [
      'Higher capital cost',
      'More staff required',
      'Complex scheduling',
      'Larger footprint needed'
    ],
    capacity: {
      learnersPerSession: '12-30 (across rooms)',
      sessionsPerDay: '4-8',
      annualCapacity: 'Thousands of learners'
    }
  },
  {
    id: 'distributed-mobile',
    name: 'Distributed & Mobile Simulation',
    shortName: 'Mobile/In-Situ',
    description: 'Multiple smaller labs or mobile units spread across locations. Brings simulation to learners rather than requiring travel to a central facility.',
    icon: 'Truck',
    suitableFor: [
      'Large health systems',
      'Rural training networks',
      'EMS/prehospital training',
      'In-situ clinical drills'
    ],
    sqftRange: {
      min: 300,
      max: 1000,
      typical: '300-400 sq ft per mobile unit'
    },
    roomCounts: {
      simRooms: '1-2 per unit',
      controlRooms: '1 per unit (compact)',
      debriefRooms: 'Integrated or nearby room',
      skillsLabs: 'Portable equipment'
    },
    characteristics: {
      adjacency: [
        'Internal trailer: sim room + control + debrief',
        'Park near target learners (ER, fire station)',
        'Central hub for equipment storage/maintenance'
      ],
      acoustics: [
        'Insulated trailer walls',
        'Headset/intercom systems',
        'Portable acoustic panels'
      ],
      infectionControl: [
        'Thorough cleaning between sites',
        '"Sim Use Only" labeled equipment',
        'Climate control and ventilation in mobile unit'
      ],
      circulation: [
        'Single entry/exit in mobile unit',
        'Portable camera systems for observation',
        'Coordination with host site for space use'
      ]
    },
    pros: [
      'Reaches dispersed learners',
      'No travel required for participants',
      'In-situ training in real environments',
      'Flexible deployment'
    ],
    cons: [
      'Limited capacity per session',
      'Travel/setup time between sites',
      'Equipment wear from transport',
      'Weather dependencies'
    ],
    capacity: {
      learnersPerSession: '4-8 per unit',
      sessionsPerDay: '1-2 per site',
      annualCapacity: 'Hundreds across sites'
    }
  },
  {
    id: 'academic',
    name: 'Academic-Style Simulation Center',
    shortName: 'Academic',
    description: 'Large, comprehensive facilities in universities or academic medical centers. Functions like a "simulated hospital" with diverse training environments.',
    icon: 'GraduationCap',
    suitableFor: [
      'Medical schools',
      'Nursing programs',
      'Allied health training',
      'Research institutions'
    ],
    sqftRange: {
      min: 10000,
      max: 50000,
      typical: '15,000-30,000 sq ft'
    },
    roomCounts: {
      simRooms: '4-8+',
      controlRooms: '4-8+ (one per room)',
      debriefRooms: '4-8+',
      skillsLabs: '2-4',
      examRooms: '10-20 (for OSCEs)'
    },
    characteristics: {
      adjacency: [
        'Separate clinical sim zone from teaching zone',
        'SP exam rooms in ring around central control',
        'Faculty offices near sim areas',
        'Public/exhibition areas for tours'
      ],
      acoustics: [
        'STC 50+ throughout',
        'White noise in observation corridors',
        'Acoustic treatment in debrief rooms'
      ],
      infectionControl: [
        'Hand hygiene at every room entry',
        'Hospital-level cleaning schedules',
        'Possible isolation room simulation'
      ],
      circulation: [
        'Dual-corridor design (public + hidden)',
        'Separate SP entrance and lounge',
        'Wide corridors for OSCE throughput'
      ]
    },
    pros: [
      'Comprehensive training environments',
      'High capacity for student cohorts',
      'OSCE and standardized patient capability',
      'Research and innovation space'
    ],
    cons: [
      'Highest capital cost',
      'Large staffing requirements',
      'Complex operations',
      'May require dedicated building'
    ],
    capacity: {
      learnersPerSession: '50-100+',
      sessionsPerDay: 'Continuous',
      annualCapacity: '10,000+ encounters'
    }
  },
  {
    id: 'hospital-based',
    name: 'Hospital-Based Simulation Center',
    shortName: 'Hospital-Based',
    description: 'Located within or affiliated with a hospital. Focuses on staff training, patient safety, and quality improvement with a blend of education and on-the-job training.',
    icon: 'Building2',
    suitableFor: [
      'Community hospitals',
      'Teaching hospitals',
      'Health system staff development',
      'Quality/safety programs'
    ],
    sqftRange: {
      min: 1000,
      max: 8000,
      typical: '3,000-6,000 sq ft'
    },
    roomCounts: {
      simRooms: '2-4',
      controlRooms: '1-2',
      debriefRooms: '1-2',
      skillsLabs: '1'
    },
    characteristics: {
      adjacency: [
        'Near education department or clinical units',
        'Access to existing hospital utilities (gases)',
        'Buffer from patient care areas'
      ],
      acoustics: [
        'Extra isolation if near patient areas',
        'May not tie into hospital PA system',
        'Sound containment to avoid alarming patients'
      ],
      infectionControl: [
        'Hospital infection control standards',
        'Equipment cleaned before/after unit visits',
        'Color-coded simulation equipment'
      ],
      circulation: [
        'Close to staff (easy participation)',
        'Separate from patient traffic',
        'Service elevator access for equipment'
      ]
    },
    pros: [
      'Convenient for hospital staff',
      'Leverages existing infrastructure',
      'Focused on patient safety outcomes',
      'Integrated with quality programs'
    ],
    cons: [
      'Space constraints in hospital',
      'May compete for renovation priority',
      'Limited external partnership appeal',
      'Noise concerns near patient areas'
    ],
    capacity: {
      learnersPerSession: '8-20',
      sessionsPerDay: '2-4',
      annualCapacity: 'Few thousand staff'
    }
  },
  {
    id: 'hybrid',
    name: 'Hybrid Simulation Model',
    shortName: 'Hybrid',
    description: 'Combines elements of academic and hospital-based centers, serving both clinical training and academic programs. May include mobile capabilities.',
    icon: 'Layers',
    suitableFor: [
      'Academic medical centers',
      'Hospital-university partnerships',
      'Regional simulation hubs',
      'Multi-institution collaboratives'
    ],
    sqftRange: {
      min: 8000,
      max: 20000,
      typical: '10,000-15,000 sq ft'
    },
    roomCounts: {
      simRooms: '4-8',
      controlRooms: '4-6',
      debriefRooms: '4-6',
      skillsLabs: '2-3',
      examRooms: '6-12'
    },
    characteristics: {
      adjacency: [
        'Interface with both hospital and academic buildings',
        'Moveable walls for flexible room sizing',
        'Central equipment depot',
        'Possible mobile unit garage/bay'
      ],
      acoustics: [
        'Highest acoustic standards (varied activities)',
        'Modular observation capabilities',
        'White noise systems'
      ],
      infectionControl: [
        'All-encompassing policies (students + staff)',
        'Equipment moves between sites - strict protocols',
        'Possible laundry facilities on-site'
      ],
      circulation: [
        'Zoned by function and user type',
        'Expandable/contractible spaces',
        'Multiple entry points for different users'
      ]
    },
    pros: [
      'Maximum flexibility and reach',
      'Serves multiple stakeholder groups',
      'Shared costs across institutions',
      'Regional leadership potential'
    ],
    cons: [
      'Complex governance',
      'Highest operational complexity',
      'Scheduling across institutions',
      'Potential mission drift'
    ],
    capacity: {
      learnersPerSession: '30-80+',
      sessionsPerDay: 'Continuous, multi-program',
      annualCapacity: '10,000+'
    }
  }
]

// =============================================================================
// SPACE TYPES
// =============================================================================

export const SPACE_TYPES: SpaceType[] = [
  {
    id: 'sim-room',
    name: 'Simulation Room',
    category: 'clinical',
    icon: 'BedDouble',
    description: 'Primary training space designed to mimic clinical environments (ICU, OR, L&D, ED, etc.)',
    sizing: {
      minSqft: 250,
      maxSqft: 600,
      minViable: '300-400 sq ft multi-purpose room',
      bestInClass: '400-500 sq ft specialized room with full headwall'
    },
    requirements: [
      'Headwall with medical gases (O2, air, suction)',
      'Hospital bed or procedure table',
      'Patient monitor display',
      'Code cart accessible',
      'Adequate ceiling height (9-10 ft)',
      'Healthcare-grade flooring (vinyl/epoxy)'
    ],
    features: {
      minViable: [
        'One flexible room for multiple scenarios',
        'Basic headwall unit',
        'Portable equipment'
      ],
      bestInClass: [
        'Specialized rooms (OR, ICU, L&D, ED)',
        'Authentic fixtures and equipment',
        'Real headwall gases',
        'Electronic medical record access',
        'Ambient sound systems'
      ]
    },
    adjacentTo: ['control-room', 'debrief-room', 'storage'],
    specialConsiderations: [
      'Should match real clinical room dimensions',
      'Two doors preferred (public + staff)',
      'One-way observation window to control room'
    ]
  },
  {
    id: 'control-room',
    name: 'Control Room',
    category: 'technology',
    icon: 'Monitor',
    description: 'Hub for running simulations - operators manage manikin vitals, audio, and video recording',
    sizing: {
      minSqft: 50,
      maxSqft: 150,
      minViable: '50-80 sq ft station or closet',
      bestInClass: '100-120 sq ft dedicated room per 1-2 sim rooms'
    },
    requirements: [
      'Manikin control computer/software',
      'Two-way audio system (voice the manikin)',
      'Video monitors for camera feeds',
      'One-way glass or window to sim room',
      'Soundproofing from learners'
    ],
    features: {
      minViable: [
        'Workstation hidden by partition/curtain',
        'Basic manikin control software',
        'Single camera feed'
      ],
      bestInClass: [
        'Multiple monitors (cameras, vital signs, recording)',
        'Sound mixing board',
        'One-way glass between two sim rooms',
        'Central AV monitoring capability'
      ]
    },
    adjacentTo: ['sim-room', 'av-room'],
    specialConsiderations: [
      'Direct line of sight to sim room critical',
      'Can serve 2 sim rooms with central placement',
      'Should be invisible to learners'
    ]
  },
  {
    id: 'debrief-room',
    name: 'Debriefing Room',
    category: 'clinical',
    icon: 'Users',
    description: 'Space where learners and facilitators convene after simulation to reflect, discuss, and review video',
    sizing: {
      minSqft: 150,
      maxSqft: 400,
      minViable: '150-200 sq ft (8-10 people)',
      bestInClass: '300-400 sq ft with A/V and flexible seating'
    },
    requirements: [
      'Seating for full learner group + instructors',
      'Large display for video playback',
      'Sound privacy from sim areas',
      'Comfortable, non-clinical atmosphere'
    ],
    features: {
      minViable: [
        'Conference table with chairs',
        'TV or portable projector',
        'May share space with sim room'
      ],
      bestInClass: [
        'Dedicated room per 1-2 sim rooms',
        'Wall-mounted displays connected to AV system',
        'Videoconferencing capability',
        'Flexible/lounge-style seating',
        'Whiteboards for discussion'
      ]
    },
    adjacentTo: ['sim-room'],
    specialConsiderations: [
      'Critical for educational value',
      'Psychological safety important - comfortable setting',
      'Soundproof to allow candid discussion'
    ]
  },
  {
    id: 'skills-lab',
    name: 'Skills Training Lab',
    category: 'clinical',
    icon: 'Syringe',
    description: 'Open lab space for practicing specific clinical skills on task trainers or low-fidelity models',
    sizing: {
      minSqft: 200,
      maxSqft: 1500,
      minViable: '200 sq ft with a few task trainer stations',
      bestInClass: '800-1500 sq ft with 6-10 bed bays'
    },
    requirements: [
      'Multiple workstations/bed bays',
      'Task trainers (IV arms, airway heads, etc.)',
      'Good lighting',
      'Ample power outlets',
      'Durable, cleanable surfaces'
    ],
    features: {
      minViable: [
        'Corner of classroom with task trainers',
        '2-3 practice stations'
      ],
      bestInClass: [
        '6-10 bed bays with partial headwalls',
        'Curtain dividers for privacy',
        'VR stations or surgical simulators',
        'All equipment on wheels for flexibility',
        'Can convert for mass casualty drills'
      ]
    },
    adjacentTo: ['storage', 'sim-room'],
    specialConsiderations: [
      'Flexible layout for various skill types',
      'Can double as overflow simulation space',
      'Mobile furniture preferred'
    ]
  },
  {
    id: 'storage',
    name: 'Storage & Moulage Room',
    category: 'support',
    icon: 'Package',
    description: 'Back-of-house areas for storing equipment and preparing scenarios (moulage = makeup for wounds)',
    sizing: {
      minSqft: 50,
      maxSqft: 400,
      minViable: '50-100 sq ft closet with shelving',
      bestInClass: '200+ sq ft storage + 150 sq ft moulage workshop'
    },
    requirements: [
      'Shelving for mannequins and task trainers',
      'Bins for consumable supplies',
      'Lockable cabinets for expensive items',
      'Climate control (protect manikins)',
      'Moulage sink and counter'
    ],
    features: {
      minViable: [
        'Single lockable storage closet',
        'Rolling cart for moulage supplies'
      ],
      bestInClass: [
        'Central storage with inventory system',
        'Separate moulage/repair workshop',
        'Deep sink for cleaning props',
        'Washer/dryer for linens',
        'Organized by scenario type'
      ]
    },
    adjacentTo: ['sim-room', 'control-room'],
    specialConsiderations: [
      'Most common design mistake: underestimating storage',
      'Plan for growth - equipment accumulates',
      'Accessible from backstage corridor preferred'
    ]
  },
  {
    id: 'av-room',
    name: 'AV/IT Infrastructure Room',
    category: 'technology',
    icon: 'Server',
    description: 'Dedicated space for servers, network racks, and AV control equipment',
    sizing: {
      minSqft: 25,
      maxSqft: 200,
      minViable: 'Small rack in control room or closet',
      bestInClass: '100-150 sq ft dedicated server room'
    },
    requirements: [
      'Recording servers',
      'Network switches and routers',
      'UPS backup power',
      'Adequate cooling/ventilation',
      'Cable management'
    ],
    features: {
      minViable: [
        'Single AV rack in closet',
        'Basic DVR/recording system',
        'Network switch'
      ],
      bestInClass: [
        'Multiple server racks',
        'Dedicated cooling (mini-split AC)',
        'UPS and emergency power',
        'Central monitoring station',
        'Future expansion conduit'
      ]
    },
    adjacentTo: ['control-room'],
    specialConsiderations: [
      'Keep heat and noise away from teaching areas',
      'Plan for technology evolution',
      'Emergency power connection recommended'
    ]
  },
  {
    id: 'sp-suite',
    name: 'Standardized Patient Suite',
    category: 'clinical',
    icon: 'UserCircle',
    description: 'Support areas for standardized patients (actors) including dressing rooms, lounge, and exam rooms',
    sizing: {
      minSqft: 100,
      maxSqft: 2000,
      minViable: '100 sq ft prep area (office or break room)',
      bestInClass: '1000+ sq ft with locker room, lounge, and 10-20 exam rooms'
    },
    requirements: [
      'Private changing area',
      'Lockers for belongings',
      'Mirror and sink for makeup',
      'Waiting/lounge area',
      'Separate entrance from learners'
    ],
    features: {
      minViable: [
        'Borrowed office/break room for prep',
        'Restroom access nearby',
        'Sim room doubles as exam room'
      ],
      bestInClass: [
        'SP dressing room with lockers',
        'Comfortable SP lounge',
        'Briefing room for case instructions',
        '10-20 dedicated exam rooms (100 sq ft each)',
        'Hidden observation corridor',
        'Makeup and costume storage'
      ]
    },
    adjacentTo: ['sim-room'],
    specialConsiderations: [
      'Required for OSCE examinations',
      'Separate entrance preserves scenario integrity',
      'Can be phased in after core sim rooms'
    ]
  },
  {
    id: 'admin-office',
    name: 'Administrative & Office Space',
    category: 'administrative',
    icon: 'Briefcase',
    description: 'Workspaces for staff who run the center - scenario design, administration, and participant check-in',
    sizing: {
      minSqft: 50,
      maxSqft: 500,
      minViable: '50 sq ft workstation in corner',
      bestInClass: '400+ sq ft suite with reception, offices, and conference room'
    },
    requirements: [
      'Desk space for sim staff',
      'Computer for scenario programming',
      'File storage',
      'Check-in area for participants'
    ],
    features: {
      minViable: [
        'Workstation in control room corner',
        'Folding table for sign-in'
      ],
      bestInClass: [
        'Reception desk (100 sq ft)',
        'Director office (120 sq ft)',
        'Staff offices/cubicles',
        'Conference/planning room',
        'Staff break room with kitchenette'
      ]
    },
    adjacentTo: ['control-room', 'storage'],
    specialConsiderations: [
      'Reception creates professional first impression',
      'Director should have private office',
      'Hot-desk for visiting faculty useful'
    ]
  }
]

// =============================================================================
// PROPOSED FLOOR PLAN FOR BAPTIST HEALTH LEXINGTON
// =============================================================================

export const BAPTIST_HEALTH_FLOOR_PLAN: FloorPlanConcept = {
  id: 'bhl-main-campus',
  name: 'Baptist Health Lexington Simulation Center',
  description: 'Proposed 8,000 sq ft simulation center renovation based on Scenario A (Main Campus Buildout)',
  totalSqft: 8000,
  rooms: [
    // Phase 1 - Core Simulation
    {
      id: 'sim-icu',
      name: 'ICU/Critical Care Sim Room',
      spaceType: 'sim-room',
      sqft: 400,
      phase: 1,
      priority: 'critical',
      features: ['Full headwall', 'Patient monitor', 'Code cart', 'Ventilator hookup'],
      notes: 'Primary high-fidelity room for code blue, sepsis, respiratory failure scenarios'
    },
    {
      id: 'sim-or',
      name: 'Operating Room Sim',
      spaceType: 'sim-room',
      sqft: 500,
      phase: 1,
      priority: 'critical',
      features: ['Surgical lights', 'OR table', 'Anesthesia cart', 'Electrocautery simulator'],
      notes: 'For surgical team training, anesthesia, perioperative scenarios'
    },
    {
      id: 'sim-ld',
      name: 'Labor & Delivery Sim',
      spaceType: 'sim-room',
      sqft: 400,
      phase: 1,
      priority: 'critical',
      features: ['L&D bed', 'Infant warmer', 'Fetal monitor', 'C-section capability'],
      notes: 'OB emergencies, neonatal resuscitation, postpartum hemorrhage'
    },
    {
      id: 'sim-flex',
      name: 'Flexible Sim Room',
      spaceType: 'sim-room',
      sqft: 350,
      phase: 1,
      priority: 'important',
      features: ['Convertible setup', 'Mobile headwall', 'Multi-purpose'],
      notes: 'Med-surg, pediatric, home health, outpatient scenarios'
    },
    {
      id: 'control-main',
      name: 'Main Control Room',
      spaceType: 'control-room',
      sqft: 200,
      phase: 1,
      priority: 'critical',
      features: ['4 workstations', 'Windows to all sim rooms', 'Central AV hub'],
      notes: 'Central control with visibility to 2-3 sim rooms'
    },
    {
      id: 'debrief-1',
      name: 'Debriefing Room A',
      spaceType: 'debrief-room',
      sqft: 300,
      phase: 1,
      priority: 'critical',
      features: ['12-person capacity', '75" display', 'Video playback', 'Whiteboard'],
      notes: 'Primary debrief room adjacent to ICU/OR sims'
    },
    {
      id: 'debrief-2',
      name: 'Debriefing Room B',
      spaceType: 'debrief-room',
      sqft: 250,
      phase: 1,
      priority: 'important',
      features: ['10-person capacity', '65" display', 'Flexible seating'],
      notes: 'Secondary debrief for L&D and flex rooms'
    },
    {
      id: 'skills-lab',
      name: 'Skills Training Lab',
      spaceType: 'skills-lab',
      sqft: 600,
      phase: 1,
      priority: 'important',
      features: ['6 bed bays', 'Task trainers', 'IV arms', 'CPR manikins'],
      notes: 'Basic skills practice, BLS/ACLS, competency check-offs'
    },
    {
      id: 'storage-main',
      name: 'Equipment Storage',
      spaceType: 'storage',
      sqft: 350,
      phase: 1,
      priority: 'critical',
      features: ['Floor-to-ceiling shelving', 'Manikin charging', 'Climate controlled'],
      notes: 'Central storage for all equipment and supplies'
    },
    {
      id: 'moulage-workshop',
      name: 'Moulage & Prep Workshop',
      spaceType: 'storage',
      sqft: 150,
      phase: 1,
      priority: 'important',
      features: ['Deep sink', 'Counter space', 'Makeup storage', 'Repair tools'],
      notes: 'Wound simulation, manikin prep, equipment maintenance'
    },
    {
      id: 'av-server',
      name: 'AV/IT Server Room',
      spaceType: 'av-room',
      sqft: 100,
      phase: 1,
      priority: 'critical',
      features: ['Server racks', 'UPS backup', 'Dedicated cooling'],
      notes: 'Recording servers, network equipment, central AV control'
    },
    {
      id: 'admin-office',
      name: 'Administrative Suite',
      spaceType: 'admin-office',
      sqft: 300,
      phase: 1,
      priority: 'important',
      features: ['Director office', 'Staff workstations', 'Small conference area'],
      notes: 'Simulation director, operations coordinator, scenario design'
    },
    {
      id: 'reception',
      name: 'Reception & Waiting',
      spaceType: 'admin-office',
      sqft: 150,
      phase: 1,
      priority: 'important',
      features: ['Check-in desk', 'Waiting seating', 'Signage'],
      notes: 'Welcome area, orientation, scheduling'
    },

    // Phase 2 - Expansion
    {
      id: 'sim-peds',
      name: 'Pediatric Sim Room',
      spaceType: 'sim-room',
      sqft: 350,
      phase: 2,
      priority: 'important',
      features: ['Pediatric bed', 'Child-size equipment', 'Family area'],
      notes: 'Pediatric emergencies, family-centered care'
    },
    {
      id: 'sp-exam-1',
      name: 'SP Exam Rooms (6)',
      spaceType: 'sp-suite',
      sqft: 600,
      phase: 2,
      priority: 'optional',
      features: ['6 exam rooms @ 100 sq ft', 'Observation corridor', 'Two-way mirrors'],
      notes: 'For OSCE exams and communication training'
    },
    {
      id: 'sp-lounge',
      name: 'SP Dressing/Lounge',
      spaceType: 'sp-suite',
      sqft: 200,
      phase: 2,
      priority: 'optional',
      features: ['Lockers', 'Lounge seating', 'Makeup area'],
      notes: 'Standardized patient preparation area'
    },

    // Phase 3 - Future
    {
      id: 'vr-lab',
      name: 'VR/Innovation Lab',
      spaceType: 'skills-lab',
      sqft: 300,
      phase: 3,
      priority: 'optional',
      features: ['VR stations', 'Haptic devices', 'Research capability'],
      notes: 'Future technology integration'
    }
  ],
  zones: [
    {
      name: 'Clinical Simulation Zone',
      description: 'High-fidelity simulation rooms with adjacent control',
      roomIds: ['sim-icu', 'sim-or', 'sim-ld', 'sim-flex', 'control-main']
    },
    {
      name: 'Debriefing Zone',
      description: 'Quiet, comfortable spaces for reflection and video review',
      roomIds: ['debrief-1', 'debrief-2']
    },
    {
      name: 'Skills Training Zone',
      description: 'Open lab for task training and competency assessment',
      roomIds: ['skills-lab']
    },
    {
      name: 'Support Zone',
      description: 'Storage, preparation, and technology infrastructure',
      roomIds: ['storage-main', 'moulage-workshop', 'av-server']
    },
    {
      name: 'Administrative Zone',
      description: 'Staff offices and participant reception',
      roomIds: ['admin-office', 'reception']
    },
    {
      name: 'Academic Zone (Phase 2+)',
      description: 'Standardized patient and expanded training areas',
      roomIds: ['sim-peds', 'sp-exam-1', 'sp-lounge', 'vr-lab']
    }
  ]
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getTypologyById(id: string): SimulationTypology | undefined {
  return SIMULATION_TYPOLOGIES.find(t => t.id === id)
}

export function getSpaceTypeById(id: string): SpaceType | undefined {
  return SPACE_TYPES.find(s => s.id === id)
}

export function calculateTotalSqft(rooms: ProposedRoom[], phase?: number): number {
  const filtered = phase ? rooms.filter(r => r.phase <= phase) : rooms
  return filtered.reduce((sum, room) => sum + room.sqft, 0)
}

export function getRoomsByPhase(rooms: ProposedRoom[], phase: number): ProposedRoom[] {
  return rooms.filter(r => r.phase === phase)
}

export function getRoomsByZone(floorPlan: FloorPlanConcept, zoneName: string): ProposedRoom[] {
  const zone = floorPlan.zones.find(z => z.name === zoneName)
  if (!zone) return []
  return floorPlan.rooms.filter(r => zone.roomIds.includes(r.id))
}

// Summary statistics for the floor plan
export function getFloorPlanSummary(floorPlan: FloorPlanConcept) {
  const phase1Rooms = getRoomsByPhase(floorPlan.rooms, 1)
  const phase2Rooms = getRoomsByPhase(floorPlan.rooms, 2)
  const phase3Rooms = getRoomsByPhase(floorPlan.rooms, 3)

  return {
    totalRooms: floorPlan.rooms.length,
    totalSqft: floorPlan.totalSqft,
    phase1: {
      rooms: phase1Rooms.length,
      sqft: calculateTotalSqft(phase1Rooms)
    },
    phase2: {
      rooms: phase2Rooms.length,
      sqft: calculateTotalSqft(phase2Rooms)
    },
    phase3: {
      rooms: phase3Rooms.length,
      sqft: calculateTotalSqft(phase3Rooms)
    },
    byCategory: {
      clinical: floorPlan.rooms.filter(r => {
        const spaceType = getSpaceTypeById(r.spaceType)
        return spaceType?.category === 'clinical'
      }).length,
      support: floorPlan.rooms.filter(r => {
        const spaceType = getSpaceTypeById(r.spaceType)
        return spaceType?.category === 'support'
      }).length,
      technology: floorPlan.rooms.filter(r => {
        const spaceType = getSpaceTypeById(r.spaceType)
        return spaceType?.category === 'technology'
      }).length,
      administrative: floorPlan.rooms.filter(r => {
        const spaceType = getSpaceTypeById(r.spaceType)
        return spaceType?.category === 'administrative'
      }).length
    }
  }
}
