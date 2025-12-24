// =============================================================================
// GO-LIVE CHECKLIST & READINESS
// =============================================================================
// Source: Prompt 18 - "Go-Live Checklist (launch readiness, pre-opening milestones)"
// Comprehensive checklist for simulation center launch preparation
// =============================================================================

export interface ChecklistCategory {
  id: string
  name: string
  icon: string
  description: string
  items: ChecklistItem[]
}

export interface ChecklistItem {
  id: string
  name: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  responsible: string
  targetWeek: number // Weeks before go-live (negative = before, 0 = go-live week)
  dependencies?: string[]
  documentation?: string
  verificationMethod: string
}

export interface ReadinessPhase {
  id: string
  name: string
  weekRange: string
  description: string
  categories: string[]
}

export interface LaunchMilestone {
  id: string
  name: string
  targetWeek: number
  description: string
  criticalPath: boolean
  deliverables: string[]
}

// =============================================================================
// GO-LIVE READINESS PHASES
// =============================================================================

export const READINESS_PHASES: ReadinessPhase[] = [
  {
    id: 'pre-launch-8',
    name: 'Pre-Launch Preparation',
    weekRange: '8-6 weeks before',
    description: 'Final construction closeout, equipment delivery, initial staff orientation',
    categories: ['facility', 'equipment', 'staffing']
  },
  {
    id: 'pre-launch-6',
    name: 'Systems Integration',
    weekRange: '6-4 weeks before',
    description: 'AV/IT systems testing, manikin setup, network configuration',
    categories: ['technology', 'equipment', 'integration']
  },
  {
    id: 'pre-launch-4',
    name: 'Operational Readiness',
    weekRange: '4-2 weeks before',
    description: 'Staff training, SOPs finalization, trial scenarios',
    categories: ['staffing', 'operations', 'training']
  },
  {
    id: 'pre-launch-2',
    name: 'Final Verification',
    weekRange: '2-1 weeks before',
    description: 'Final inspections, dry runs, stakeholder reviews',
    categories: ['verification', 'operations', 'communications']
  },
  {
    id: 'soft-opening',
    name: 'Soft Opening',
    weekRange: '1-2 weeks after',
    description: 'Limited pilot sessions, refinement, feedback collection',
    categories: ['operations', 'training', 'feedback']
  },
  {
    id: 'grand-opening',
    name: 'Grand Opening',
    weekRange: '3-4 weeks after',
    description: 'Official launch, stakeholder event, full program rollout',
    categories: ['communications', 'operations', 'celebration']
  }
]

// =============================================================================
// LAUNCH MILESTONES
// =============================================================================

export const LAUNCH_MILESTONES: LaunchMilestone[] = [
  {
    id: 'construction-complete',
    name: 'Construction Substantially Complete',
    targetWeek: -8,
    description: 'All construction finished, punch list items minimal',
    criticalPath: true,
    deliverables: ['Certificate of Substantial Completion', 'Punch list <10 items', 'ICRA barriers removed']
  },
  {
    id: 'equipment-delivered',
    name: 'All Equipment Delivered',
    targetWeek: -6,
    description: 'Manikins, AV systems, furniture, medical equipment on-site',
    criticalPath: true,
    deliverables: ['Delivery receipts', 'Unpacking completed', 'Initial inspection passed']
  },
  {
    id: 'systems-online',
    name: 'AV/IT Systems Online',
    targetWeek: -4,
    description: 'All cameras, recording, network, manikin controls operational',
    criticalPath: true,
    deliverables: ['AV system test report', 'Network connectivity verified', 'Manikin software installed']
  },
  {
    id: 'staff-trained',
    name: 'Staff Training Complete',
    targetWeek: -3,
    description: 'All simulation staff trained on equipment and procedures',
    criticalPath: true,
    deliverables: ['Training certificates', 'Competency checklists', 'Vendor training completed']
  },
  {
    id: 'sops-finalized',
    name: 'SOPs Finalized',
    targetWeek: -2,
    description: 'All standard operating procedures written and approved',
    criticalPath: true,
    deliverables: ['SOP manual', 'Emergency procedures', 'Scheduling policies']
  },
  {
    id: 'dry-runs-complete',
    name: 'Dry Runs Successful',
    targetWeek: -1,
    description: 'Multiple mock simulations run without major issues',
    criticalPath: true,
    deliverables: ['Dry run reports', 'Issue resolution log', 'Final adjustments made']
  },
  {
    id: 'regulatory-signoff',
    name: 'Regulatory Sign-Off',
    targetWeek: -1,
    description: 'Fire marshal, safety, infection control approvals obtained',
    criticalPath: true,
    deliverables: ['Certificate of Occupancy', 'Safety inspection passed', 'IC clearance']
  },
  {
    id: 'soft-opening',
    name: 'Soft Opening Begins',
    targetWeek: 0,
    description: 'First pilot simulations with real learners',
    criticalPath: false,
    deliverables: ['First simulation completed', 'Feedback forms collected', 'Operations log started']
  },
  {
    id: 'grand-opening',
    name: 'Grand Opening Event',
    targetWeek: 4,
    description: 'Official ribbon cutting and stakeholder celebration',
    criticalPath: false,
    deliverables: ['Event completed', 'Media coverage', 'Donor recognition']
  }
]

// =============================================================================
// GO-LIVE CHECKLIST CATEGORIES
// =============================================================================

export const CHECKLIST_CATEGORIES: ChecklistCategory[] = [
  {
    id: 'facility',
    name: 'Facility Readiness',
    icon: 'Building2',
    description: 'Physical space, construction closeout, safety inspections',
    items: [
      { id: 'punch-list', name: 'Punch List Completed', description: 'All construction deficiencies resolved', priority: 'critical', responsible: 'Facilities/Contractor', targetWeek: -6, verificationMethod: 'Walk-through inspection with sign-off' },
      { id: 'deep-clean', name: 'Deep Cleaning Complete', description: 'Post-construction cleaning of all surfaces, above-ceiling dust removal', priority: 'high', responsible: 'Environmental Services', targetWeek: -6, verificationMethod: 'Visual inspection, white glove test' },
      { id: 'hvac-balanced', name: 'HVAC Balanced', description: 'All rooms at proper temperature, airflow, and pressure', priority: 'critical', responsible: 'Facilities', targetWeek: -6, verificationMethod: 'HVAC commissioning report, temperature readings' },
      { id: 'fire-inspection', name: 'Fire Marshal Inspection', description: 'Fire safety systems inspected and approved', priority: 'critical', responsible: 'Safety/Fire Marshal', targetWeek: -2, verificationMethod: 'Inspection certificate' },
      { id: 'occupancy-cert', name: 'Certificate of Occupancy', description: 'Building department approval for occupancy', priority: 'critical', responsible: 'Facilities', targetWeek: -1, verificationMethod: 'Certificate on file' },
      { id: 'signage', name: 'Signage Installed', description: 'Room signs, wayfinding, donor recognition, safety signs', priority: 'medium', responsible: 'Facilities', targetWeek: -2, verificationMethod: 'Visual inspection' },
      { id: 'security', name: 'Security/Access Control', description: 'Badge readers configured, access lists set up', priority: 'high', responsible: 'Security', targetWeek: -3, verificationMethod: 'Badge access test' },
      { id: 'emergency-prep', name: 'Emergency Procedures Posted', description: 'Evacuation routes, emergency contacts, first aid location', priority: 'high', responsible: 'Safety', targetWeek: -2, verificationMethod: 'Posted in visible locations' }
    ]
  },
  {
    id: 'equipment',
    name: 'Equipment & Supplies',
    icon: 'Package',
    description: 'Manikins, medical equipment, furniture, consumables',
    items: [
      { id: 'manikins-delivered', name: 'Manikins Delivered', description: 'All patient simulators received and unpacked', priority: 'critical', responsible: 'Sim Director', targetWeek: -6, verificationMethod: 'Delivery receipts, visual inspection' },
      { id: 'manikins-assembled', name: 'Manikins Assembled & Tested', description: 'All manikins set up, software installed, self-tests passed', priority: 'critical', responsible: 'Sim Tech', targetWeek: -4, verificationMethod: 'Self-test passed, all features functional' },
      { id: 'task-trainers', name: 'Task Trainers Set Up', description: 'IV arms, airway trainers, CPR manikins in place', priority: 'high', responsible: 'Sim Tech', targetWeek: -4, verificationMethod: 'Inventory check, functionality test' },
      { id: 'medical-equipment', name: 'Medical Equipment Ready', description: 'Beds, monitors, defibrillators, IV poles in rooms', priority: 'high', responsible: 'Sim Tech', targetWeek: -4, verificationMethod: 'Room setup checklist' },
      { id: 'consumables-stocked', name: 'Consumables Stocked', description: 'IV fluids, moulage, disposables, linens in storage', priority: 'high', responsible: 'Sim Tech', targetWeek: -3, verificationMethod: 'Inventory count meets par levels' },
      { id: 'spare-parts', name: 'Spare Parts Inventory', description: 'Critical spare parts on hand (batteries, cables, consumables)', priority: 'medium', responsible: 'Sim Tech', targetWeek: -3, verificationMethod: 'Spare parts checklist complete' },
      { id: 'furniture', name: 'Furniture Installed', description: 'Debrief tables, chairs, control room consoles in place', priority: 'medium', responsible: 'Facilities', targetWeek: -4, verificationMethod: 'Visual inspection' },
      { id: 'code-carts', name: 'Code Carts Equipped', description: 'Crash carts stocked with sim medications and supplies', priority: 'high', responsible: 'Sim Tech', targetWeek: -3, verificationMethod: 'Cart inventory checklist' }
    ]
  },
  {
    id: 'technology',
    name: 'Technology Systems',
    icon: 'Monitor',
    description: 'AV recording, network, computers, software',
    items: [
      { id: 'cameras-installed', name: 'Cameras Installed & Positioned', description: 'All PTZ cameras mounted, angles verified', priority: 'critical', responsible: 'AV Vendor', targetWeek: -5, verificationMethod: 'Each camera feed visible in control room' },
      { id: 'microphones-tested', name: 'Microphones Tested', description: 'All room microphones capturing audio clearly', priority: 'critical', responsible: 'AV Vendor', targetWeek: -5, verificationMethod: 'Speak in each room, verify playback quality' },
      { id: 'recording-server', name: 'Recording Server Online', description: 'Server installed, configured, storage available', priority: 'critical', responsible: 'IT/AV Vendor', targetWeek: -5, verificationMethod: 'Test recording, verify storage capacity' },
      { id: 'network-configured', name: 'Network Configured', description: 'VLAN set up, Wi-Fi coverage verified, security configured', priority: 'critical', responsible: 'IT', targetWeek: -5, verificationMethod: 'Connectivity test from all devices' },
      { id: 'control-pcs', name: 'Control Room PCs Ready', description: 'Simulation software installed, manikin connections verified', priority: 'critical', responsible: 'Sim Tech/IT', targetWeek: -4, verificationMethod: 'Launch software, connect to each manikin' },
      { id: 'debrief-displays', name: 'Debrief Room Displays Working', description: 'Large screens connected to AV system for video playback', priority: 'high', responsible: 'AV Vendor', targetWeek: -4, verificationMethod: 'Play test recording on each display' },
      { id: 'video-playback', name: 'Video Playback Tested', description: 'Full workflow: record, retrieve, play back in debrief', priority: 'critical', responsible: 'Sim Tech', targetWeek: -3, verificationMethod: 'End-to-end test scenario recorded and debriefed' },
      { id: 'backup-systems', name: 'Backup Systems Verified', description: 'UPS functioning, backup PC available, data backup working', priority: 'high', responsible: 'IT', targetWeek: -3, verificationMethod: 'UPS test, backup PC boots, data backup log' }
    ]
  },
  {
    id: 'staffing',
    name: 'Staffing & Training',
    icon: 'Users',
    description: 'Personnel, training, competencies',
    items: [
      { id: 'staff-hired', name: 'All Staff Hired', description: 'Sim Director, Sim Techs, Educators on board', priority: 'critical', responsible: 'HR/Sim Director', targetWeek: -8, verificationMethod: 'HR records, all positions filled' },
      { id: 'vendor-training', name: 'Vendor Training Completed', description: 'Staff trained by manikin and AV vendors', priority: 'critical', responsible: 'Sim Director', targetWeek: -3, verificationMethod: 'Training certificates, competency sign-off' },
      { id: 'staff-competencies', name: 'Staff Competencies Documented', description: 'Each staff member can operate assigned equipment', priority: 'high', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Competency checklists completed' },
      { id: 'schedule-coverage', name: 'Schedule Coverage Planned', description: 'Staff schedules set, backup coverage identified', priority: 'high', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Published schedule, on-call list' },
      { id: 'faculty-orientation', name: 'Faculty Orientation Scheduled', description: 'Plan for orienting instructors who will use the center', priority: 'medium', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Orientation dates on calendar' },
      { id: 'emergency-roles', name: 'Emergency Roles Assigned', description: 'Staff know what to do if equipment fails or real emergency', priority: 'high', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Emergency procedure walkthrough' }
    ]
  },
  {
    id: 'operations',
    name: 'Operations & Policies',
    icon: 'FileText',
    description: 'SOPs, scheduling, documentation',
    items: [
      { id: 'sops-written', name: 'SOPs Written & Approved', description: 'Standard operating procedures for all key processes', priority: 'critical', responsible: 'Sim Director', targetWeek: -3, verificationMethod: 'SOP manual complete, leadership sign-off' },
      { id: 'scheduling-system', name: 'Scheduling System Ready', description: 'Booking software or calendar configured, access granted', priority: 'high', responsible: 'Sim Director', targetWeek: -3, verificationMethod: 'Test booking created' },
      { id: 'booking-policy', name: 'Booking Policy Established', description: 'How departments request time, lead times, cancellation policy', priority: 'high', responsible: 'Sim Director', targetWeek: -3, verificationMethod: 'Policy document distributed' },
      { id: 'safety-policy', name: 'Safety Policies Documented', description: 'Participant safety, equipment handling, emergency procedures', priority: 'critical', responsible: 'Sim Director/Safety', targetWeek: -2, verificationMethod: 'Policies in SOP manual' },
      { id: 'cleaning-protocol', name: 'Cleaning Protocols Established', description: 'How to clean manikins, rooms between sessions', priority: 'high', responsible: 'Sim Tech', targetWeek: -3, verificationMethod: 'Cleaning checklist created' },
      { id: 'maintenance-schedule', name: 'Maintenance Schedule Set', description: 'PM calendar created, first maintenance scheduled', priority: 'high', responsible: 'Sim Tech', targetWeek: -2, verificationMethod: 'PM calendar published' },
      { id: 'inventory-system', name: 'Inventory System in Place', description: 'Asset register, consumables tracking established', priority: 'medium', responsible: 'Sim Tech', targetWeek: -2, verificationMethod: 'Initial inventory complete' },
      { id: 'documentation-forms', name: 'Documentation Forms Ready', description: 'Consent forms, evaluation forms, session logs', priority: 'high', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Forms printed or accessible' }
    ]
  },
  {
    id: 'verification',
    name: 'Final Verification',
    icon: 'CheckCircle',
    description: 'Dry runs, inspections, sign-offs',
    items: [
      { id: 'integration-test', name: 'Integration Test Complete', description: 'All systems tested together: manikins, AV, recording, playback', priority: 'critical', responsible: 'Sim Tech', targetWeek: -2, verificationMethod: 'Full scenario recorded and debriefed successfully' },
      { id: 'dry-run-1', name: 'Dry Run #1 (Staff Only)', description: 'Mock simulation with project team as participants', priority: 'critical', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Dry run completed, issues documented' },
      { id: 'dry-run-2', name: 'Dry Run #2 (Invited Users)', description: 'Mock simulation with select end-users (pilot participants)', priority: 'critical', responsible: 'Sim Director', targetWeek: -1, verificationMethod: 'Feedback collected, adjustments made' },
      { id: 'acoustics-check', name: 'Acoustics Verified', description: 'Sound isolation between rooms tested, HVAC noise acceptable', priority: 'high', responsible: 'Sim Tech', targetWeek: -2, verificationMethod: 'Sound test between rooms' },
      { id: 'lighting-check', name: 'Lighting Verified', description: 'All lights working, dimmers functional, emergency lights tested', priority: 'medium', responsible: 'Facilities', targetWeek: -2, verificationMethod: 'Lighting walkthrough' },
      { id: 'ic-clearance', name: 'Infection Control Clearance', description: 'IC team confirms area is clean and ready for use', priority: 'critical', responsible: 'Infection Control', targetWeek: -1, verificationMethod: 'IC sign-off document' },
      { id: 'leadership-walkthrough', name: 'Leadership Walkthrough', description: 'Hospital leadership tours completed space', priority: 'medium', responsible: 'Sim Director', targetWeek: -1, verificationMethod: 'Walkthrough completed' },
      { id: 'donor-preview', name: 'Donor Preview (if applicable)', description: 'Major donors invited for exclusive preview', priority: 'low', responsible: 'Foundation', targetWeek: -1, verificationMethod: 'Preview event held' }
    ]
  },
  {
    id: 'communications',
    name: 'Communications & Events',
    icon: 'Megaphone',
    description: 'Announcements, grand opening, media',
    items: [
      { id: 'announcement-internal', name: 'Internal Announcement', description: 'Email/intranet announcement to hospital staff about opening', priority: 'high', responsible: 'Communications', targetWeek: -2, verificationMethod: 'Announcement sent' },
      { id: 'faculty-notification', name: 'Faculty Notified', description: 'Instructors informed of opening, orientation dates', priority: 'high', responsible: 'Sim Director', targetWeek: -2, verificationMethod: 'Email sent to faculty' },
      { id: 'grand-opening-planned', name: 'Grand Opening Planned', description: 'Date set, invitations sent, program planned', priority: 'medium', responsible: 'Sim Director/Foundation', targetWeek: -3, verificationMethod: 'Event details finalized' },
      { id: 'donor-recognition', name: 'Donor Recognition Ready', description: 'Plaques, naming signage installed', priority: 'medium', responsible: 'Foundation', targetWeek: -1, verificationMethod: 'Signage in place' },
      { id: 'media-coordination', name: 'Media Coordination (if applicable)', description: 'Press release prepared, media invited to grand opening', priority: 'low', responsible: 'Communications', targetWeek: -1, verificationMethod: 'Press materials ready' },
      { id: 'talking-points', name: 'Talking Points Prepared', description: 'Key messages for tours and media about center value', priority: 'medium', responsible: 'Sim Director', targetWeek: -1, verificationMethod: 'Talking points document' }
    ]
  }
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getChecklistByCategory(categoryId: string): ChecklistCategory | undefined {
  return CHECKLIST_CATEGORIES.find(c => c.id === categoryId)
}

export function getItemsByWeek(targetWeek: number): ChecklistItem[] {
  return CHECKLIST_CATEGORIES.flatMap(c => c.items).filter(item => item.targetWeek === targetWeek)
}

export function getCriticalItems(): ChecklistItem[] {
  return CHECKLIST_CATEGORIES.flatMap(c => c.items).filter(item => item.priority === 'critical')
}

export function getItemsByResponsible(responsible: string): ChecklistItem[] {
  return CHECKLIST_CATEGORIES.flatMap(c => c.items).filter(item =>
    item.responsible.toLowerCase().includes(responsible.toLowerCase())
  )
}

export function getMilestonesByWeek(week: number): LaunchMilestone[] {
  return LAUNCH_MILESTONES.filter(m => m.targetWeek === week)
}

export function getCriticalPathMilestones(): LaunchMilestone[] {
  return LAUNCH_MILESTONES.filter(m => m.criticalPath)
}

export function getTotalChecklistItems(): number {
  return CHECKLIST_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0)
}

export function getChecklistSummary(): { total: number; critical: number; high: number; categories: number } {
  const allItems = CHECKLIST_CATEGORIES.flatMap(c => c.items)
  return {
    total: allItems.length,
    critical: allItems.filter(i => i.priority === 'critical').length,
    high: allItems.filter(i => i.priority === 'high').length,
    categories: CHECKLIST_CATEGORIES.length
  }
}

// Generate a timeline view of all items
export function getTimelineView(): Array<{
  week: number
  weekLabel: string
  items: Array<{ category: string; item: ChecklistItem }>
  milestones: LaunchMilestone[]
}> {
  const weeks = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4]

  return weeks.map(week => {
    const items: Array<{ category: string; item: ChecklistItem }> = []
    CHECKLIST_CATEGORIES.forEach(cat => {
      cat.items.filter(item => item.targetWeek === week).forEach(item => {
        items.push({ category: cat.name, item })
      })
    })

    let weekLabel: string
    if (week < 0) {
      weekLabel = `${Math.abs(week)} weeks before`
    } else if (week === 0) {
      weekLabel = 'Go-Live Week'
    } else {
      weekLabel = `${week} week${week > 1 ? 's' : ''} after`
    }

    return {
      week,
      weekLabel,
      items,
      milestones: LAUNCH_MILESTONES.filter(m => m.targetWeek === week)
    }
  })
}
