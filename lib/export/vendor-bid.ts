import jsPDF from 'jspdf'
import type { SimulatorParameters, BudgetResults } from '@/data/seed/budget-simulator'

// Vendor categories for bid requests
export type VendorCategory =
  | 'av-systems'
  | 'simulation-equipment'
  | 'construction'
  | 'it-software'
  | 'furniture-fixtures'

export interface VendorBidOptions {
  params: SimulatorParameters
  results: BudgetResults
  category: VendorCategory
  organizationName?: string
  projectName?: string
  contactInfo?: {
    name: string
    email: string
    phone: string
  }
  submissionDeadline?: string
  additionalNotes?: string
}

const VENDOR_CATEGORY_INFO: Record<VendorCategory, {
  title: string
  description: string
}> = {
  'av-systems': {
    title: 'Audio/Visual Systems',
    description: 'Capture, recording, display, and communication systems for simulation rooms'
  },
  'simulation-equipment': {
    title: 'Simulation Equipment',
    description: 'High-fidelity manikins, task trainers, and medical simulation devices'
  },
  'construction': {
    title: 'Construction / General Contractor',
    description: 'Building renovation, MEP upgrades, and infrastructure installation'
  },
  'it-software': {
    title: 'IT Infrastructure & Software',
    description: 'Learning management systems, video management, scheduling, and network infrastructure'
  },
  'furniture-fixtures': {
    title: 'Furniture & Fixtures',
    description: 'Hospital beds, medical furniture, control room workstations, and storage solutions'
  }
}

// AV tier specifications
const AV_TIER_SPECS = {
  basic: {
    cameras: 'PTZ cameras (1 per room)',
    recording: 'Basic DVR recording',
    displays: '55" display per room',
    audio: 'Ceiling microphones, wall speakers',
    control: 'Basic control panel',
    features: ['Live viewing', 'Basic recording', 'Manual camera control']
  },
  standard: {
    cameras: 'HD PTZ cameras (2 per room)',
    recording: 'Multi-channel recording with playback',
    displays: '65" primary + 32" secondary per room',
    audio: 'Array microphones, directional speakers',
    control: 'Touch panel control system',
    features: ['Multi-angle recording', 'Debriefing software', 'Annotation tools', 'Basic analytics']
  },
  premium: {
    cameras: '4K PTZ cameras (3+ per room) with tracking',
    recording: 'Enterprise recording platform with cloud backup',
    displays: '75" primary + 55" secondary + mobile displays',
    audio: 'Professional array mics, surround sound',
    control: 'Centralized control with automation',
    features: ['AI-assisted tracking', 'Multi-room management', 'Advanced analytics', 'Remote observation', 'Integration APIs']
  }
}

// Quality level specifications for construction
const QUALITY_SPECS = {
  budget: {
    finishes: 'Standard commercial finishes',
    hvac: 'Zone heating/cooling',
    lighting: 'LED fixtures with dimming',
    acoustics: 'Basic sound absorption'
  },
  standard: {
    finishes: 'Healthcare-grade finishes with epoxy flooring',
    hvac: 'Individual room climate control',
    lighting: 'Programmable LED with simulation modes',
    acoustics: 'Sound-rated walls between rooms'
  },
  premium: {
    finishes: 'Premium healthcare finishes, seamless flooring',
    hvac: 'Hospital-grade air handling with HEPA filtration',
    lighting: 'Full simulation lighting with day/night cycles',
    acoustics: 'STC 50+ rated construction throughout'
  }
}

export async function generateVendorBidPDF(options: VendorBidOptions): Promise<void> {
  const {
    params,
    results,
    category,
    organizationName = 'Baptist Health Lexington',
    projectName = 'Healthcare Simulation Center',
    contactInfo = {
      name: 'Project Coordinator',
      email: 'simulation@baptisthealth.com',
      phone: '(859) 260-6100'
    },
    submissionDeadline = '30 days from receipt',
    additionalNotes
  } = options

  const doc = new jsPDF()
  const categoryInfo = VENDOR_CATEGORY_INFO[category]
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPos = margin

  // Helper functions
  const addNewPage = () => {
    doc.addPage()
    yPos = margin
  }

  const checkPageBreak = (needed: number) => {
    const pageHeight = doc.internal.pageSize.getHeight()
    if (yPos + needed > pageHeight - margin) {
      addNewPage()
      return true
    }
    return false
  }

  const addSectionHeader = (title: string) => {
    checkPageBreak(20)
    doc.setFillColor(30, 41, 59) // slate-800
    doc.rect(margin, yPos, contentWidth, 10, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(title, margin + 4, yPos + 7)
    doc.setTextColor(0, 0, 0)
    yPos += 15
  }

  const addKeyValue = (key: string, value: string, indent = 0) => {
    checkPageBreak(8)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text(key + ':', margin + indent, yPos)
    doc.setFont('helvetica', 'normal')
    const keyWidth = doc.getTextWidth(key + ': ')
    doc.text(value, margin + indent + keyWidth, yPos)
    yPos += 6
  }

  const addBulletPoint = (text: string, indent = 0) => {
    checkPageBreak(8)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('\u2022', margin + indent, yPos)

    const bulletWidth = 6
    const maxWidth = contentWidth - indent - bulletWidth
    const lines = doc.splitTextToSize(text, maxWidth)
    doc.text(lines, margin + indent + bulletWidth, yPos)
    yPos += (lines.length * 5) + 2
  }

  const addParagraph = (text: string) => {
    checkPageBreak(20)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(text, contentWidth)
    doc.text(lines, margin, yPos)
    yPos += (lines.length * 5) + 4
  }

  // ============================================================================
  // COVER / HEADER
  // ============================================================================

  // Header bar
  doc.setFillColor(37, 99, 235) // blue-600
  doc.rect(0, 0, pageWidth, 35, 'F')

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('REQUEST FOR PROPOSAL', pageWidth / 2, 15, { align: 'center' })

  doc.setFontSize(12)
  doc.text(categoryInfo.title.toUpperCase(), pageWidth / 2, 25, { align: 'center' })

  doc.setTextColor(0, 0, 0)
  yPos = 45

  // Organization info
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(organizationName, margin, yPos)
  yPos += 7

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(projectName, margin, yPos)
  yPos += 10

  // Date and deadline
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139) // slate-500
  doc.text(`Issue Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, yPos)
  yPos += 5
  doc.text(`Response Deadline: ${submissionDeadline}`, margin, yPos)
  doc.setTextColor(0, 0, 0)
  yPos += 15

  // ============================================================================
  // PROJECT OVERVIEW
  // ============================================================================

  addSectionHeader('1. PROJECT OVERVIEW')

  addParagraph(
    `${organizationName} is soliciting proposals from qualified vendors for ${categoryInfo.description.toLowerCase()} ` +
    `as part of the development of a new ${projectName}. This facility will serve as a training hub for ` +
    `healthcare professionals, providing simulation-based education and assessment capabilities.`
  )

  yPos += 5

  // Facility Summary
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Facility Summary:', margin, yPos)
  yPos += 8

  const totalRooms = params.simRooms + params.controlRooms + params.debriefRooms
  addKeyValue('Total Floor Area', `${params.floorArea.toLocaleString()} square feet`, 4)
  addKeyValue('Simulation Rooms', `${params.simRooms} rooms`, 4)
  addKeyValue('Control Rooms', `${params.controlRooms} rooms`, 4)
  addKeyValue('Debriefing Rooms', `${params.debriefRooms} rooms`, 4)
  addKeyValue('Total Rooms', `${totalRooms} rooms`, 4)
  addKeyValue('Quality Level', params.qualityLevel.charAt(0).toUpperCase() + params.qualityLevel.slice(1), 4)

  yPos += 10

  // ============================================================================
  // CATEGORY-SPECIFIC REQUIREMENTS
  // ============================================================================

  addSectionHeader('2. SCOPE OF WORK & REQUIREMENTS')

  switch (category) {
    case 'av-systems':
      generateAVRequirements(doc, params, results, { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos: () => yPos, setYPos: (y: number) => yPos = y })
      break
    case 'simulation-equipment':
      generateEquipmentRequirements(doc, params, results, { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos: () => yPos, setYPos: (y: number) => yPos = y })
      break
    case 'construction':
      generateConstructionRequirements(doc, params, results, { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos: () => yPos, setYPos: (y: number) => yPos = y })
      break
    case 'it-software':
      generateITRequirements(doc, params, results, { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos: () => yPos, setYPos: (y: number) => yPos = y })
      break
    case 'furniture-fixtures':
      generateFurnitureRequirements(doc, params, results, { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos: () => yPos, setYPos: (y: number) => yPos = y })
      break
  }

  // Get updated yPos from generator functions
  yPos = doc.internal.pageSize.getHeight() > yPos ? yPos : margin

  // ============================================================================
  // BUDGET GUIDANCE
  // ============================================================================

  addNewPage()
  addSectionHeader('3. BUDGET GUIDANCE')

  addParagraph(
    'The following budget estimates are provided as guidance only. Vendors should provide itemized ' +
    'pricing based on their proposed solutions. Alternative approaches that deliver equivalent or ' +
    'superior functionality within budget constraints are encouraged.'
  )

  yPos += 5

  const budgetAmount = getBudgetForCategory(category, results)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Estimated Budget Range:', margin, yPos)
  yPos += 7

  doc.setFontSize(14)
  doc.setTextColor(37, 99, 235)
  doc.text(`$${(budgetAmount * 0.85).toLocaleString()} - $${(budgetAmount * 1.15).toLocaleString()}`, margin + 4, yPos)
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  yPos += 10

  addParagraph('Note: This range represents +/- 15% of the planning estimate. Proposals outside this range will be considered if justified.')

  yPos += 10

  // ============================================================================
  // SUBMISSION REQUIREMENTS
  // ============================================================================

  addSectionHeader('4. PROPOSAL SUBMISSION REQUIREMENTS')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Required Proposal Contents:', margin, yPos)
  yPos += 7

  const submissionItems = [
    'Company profile and relevant healthcare simulation experience',
    'Detailed technical specifications for all proposed equipment/services',
    'Itemized pricing with options for different configurations',
    'Project timeline and implementation plan',
    'Warranty and support terms',
    'References from similar healthcare simulation installations',
    'Proof of relevant certifications and insurance'
  ]

  submissionItems.forEach(item => addBulletPoint(item, 4))

  yPos += 10

  doc.setFont('helvetica', 'bold')
  doc.text('Submission Format:', margin, yPos)
  yPos += 7

  addBulletPoint('Submit proposal in PDF format via email', 4)
  addBulletPoint('Include separate pricing spreadsheet (Excel format)', 4)
  addBulletPoint('Reference this RFP number in all correspondence', 4)

  yPos += 10

  // ============================================================================
  // EVALUATION CRITERIA
  // ============================================================================

  addSectionHeader('5. EVALUATION CRITERIA')

  const evalCriteria = [
    { criterion: 'Technical Capability & Solution Quality', weight: '30%' },
    { criterion: 'Healthcare Simulation Experience', weight: '25%' },
    { criterion: 'Total Cost of Ownership', weight: '20%' },
    { criterion: 'Support & Warranty Terms', weight: '15%' },
    { criterion: 'Implementation Timeline', weight: '10%' }
  ]

  // Table header
  doc.setFillColor(241, 245, 249) // slate-100
  doc.rect(margin, yPos, contentWidth, 8, 'F')
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Criterion', margin + 4, yPos + 5.5)
  doc.text('Weight', pageWidth - margin - 30, yPos + 5.5)
  yPos += 10

  evalCriteria.forEach((item, index) => {
    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252) // slate-50
      doc.rect(margin, yPos - 2, contentWidth, 8, 'F')
    }
    doc.setFont('helvetica', 'normal')
    doc.text(item.criterion, margin + 4, yPos + 4)
    doc.text(item.weight, pageWidth - margin - 25, yPos + 4)
    yPos += 8
  })

  yPos += 15

  // ============================================================================
  // CONTACT INFORMATION
  // ============================================================================

  addSectionHeader('6. CONTACT INFORMATION')

  addKeyValue('Primary Contact', contactInfo.name)
  addKeyValue('Email', contactInfo.email)
  addKeyValue('Phone', contactInfo.phone)

  yPos += 10

  addParagraph(
    'All questions regarding this RFP should be submitted in writing via email. ' +
    'Responses to substantive questions will be shared with all prospective bidders.'
  )

  // ============================================================================
  // ADDITIONAL NOTES
  // ============================================================================

  if (additionalNotes) {
    yPos += 10
    addSectionHeader('7. ADDITIONAL NOTES')
    addParagraph(additionalNotes)
  }

  // ============================================================================
  // FOOTER
  // ============================================================================

  const addFooter = (pageNum: number, totalPages: number) => {
    const pageHeight = doc.internal.pageSize.getHeight()
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text(
      `${organizationName} - ${projectName} RFP: ${categoryInfo.title}`,
      margin,
      pageHeight - 10
    )
    doc.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth - margin - 20,
      pageHeight - 10
    )
    doc.text(
      'CONFIDENTIAL',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }

  // Add footers to all pages
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    addFooter(i, totalPages)
  }

  // Save the PDF
  const filename = `RFP_${category}_${organizationName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}

// Helper function to get budget for category
function getBudgetForCategory(category: VendorCategory, results: BudgetResults): number {
  switch (category) {
    case 'av-systems':
      return results.capex.avSystem
    case 'simulation-equipment':
      const equipmentItems = results.capex.lineItems.filter(
        item => item.id === 'high-fidelity' || item.id === 'task-trainers'
      )
      return equipmentItems.reduce((sum, item) => sum + item.amount, 0)
    case 'construction':
      return results.capex.construction
    case 'it-software':
      return results.opex.software * 5 // 5-year software cost
    case 'furniture-fixtures':
      const furnitureItem = results.capex.lineItems.find(item => item.id === 'furniture')
      return furnitureItem?.amount || 0
    default:
      return 0
  }
}

// Generator function interfaces
interface GeneratorHelpers {
  addKeyValue: (key: string, value: string, indent?: number) => void
  addBulletPoint: (text: string, indent?: number) => void
  addParagraph: (text: string) => void
  checkPageBreak: (needed: number) => boolean
  margin: number
  yPos: () => number
  setYPos: (y: number) => void
}

// A/V Requirements
function generateAVRequirements(
  doc: jsPDF,
  params: SimulatorParameters,
  results: BudgetResults,
  helpers: GeneratorHelpers
) {
  const { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos, setYPos } = helpers
  const specs = AV_TIER_SPECS[params.avTier]

  addParagraph(
    `Vendor shall provide a complete audio/visual system for ${params.simRooms} simulation rooms, ` +
    `including cameras, microphones, recording systems, displays, and control systems. ` +
    `The system tier specified is "${params.avTier.toUpperCase()}".`
  )

  let y = yPos()
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('System Specifications:', margin, y)
  setYPos(y + 8)

  addKeyValue('Camera System', specs.cameras, 4)
  addKeyValue('Recording', specs.recording, 4)
  addKeyValue('Displays', specs.displays, 4)
  addKeyValue('Audio', specs.audio, 4)
  addKeyValue('Control', specs.control, 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Required Features:', margin, y)
  setYPos(y + 7)

  specs.features.forEach(feature => addBulletPoint(feature, 4))

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Room-by-Room Requirements:', margin, y)
  setYPos(y + 7)

  addBulletPoint(`${params.simRooms} Simulation Rooms: Full A/V capture and recording capability`, 4)
  addBulletPoint(`${params.controlRooms} Control Rooms: Operator workstations with multi-room monitoring`, 4)
  addBulletPoint(`${params.debriefRooms} Debriefing Rooms: Playback system with annotation capability`, 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Integration Requirements:', margin, y)
  setYPos(y + 7)

  addBulletPoint('Integration with simulation manikin systems (Laerdal, CAE, Gaumard)', 4)
  addBulletPoint('Patient monitor integration for vital signs overlay', 4)
  addBulletPoint('Learning management system (LMS) integration capability', 4)
  addBulletPoint('Network connectivity for remote observation', 4)
}

// Simulation Equipment Requirements
function generateEquipmentRequirements(
  doc: jsPDF,
  params: SimulatorParameters,
  results: BudgetResults,
  helpers: GeneratorHelpers
) {
  const { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos, setYPos } = helpers

  addParagraph(
    `Vendor shall provide simulation equipment including high-fidelity manikins and task trainers ` +
    `to support clinical training across multiple specialties.`
  )

  let y = yPos()
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('High-Fidelity Manikins:', margin, y)
  setYPos(y + 8)

  addKeyValue('Quantity Required', `${params.highFidelityManikins} units`, 4)

  y = yPos() + 3
  setYPos(y)
  addBulletPoint('Adult patient simulator with wireless operation', 4)
  addBulletPoint('Full-body with realistic anatomy and physiological responses', 4)
  addBulletPoint('Programmable vital signs and clinical scenarios', 4)
  addBulletPoint('Airway management capabilities (intubation, suctioning)', 4)
  addBulletPoint('IV access and medication administration', 4)
  addBulletPoint('Cardiac monitoring and defibrillation compatible', 4)
  addBulletPoint('Speech capability for patient communication scenarios', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Task Trainers:', margin, y)
  setYPos(y + 8)

  addKeyValue('Quantity Required', `${params.taskTrainers} units total`, 4)

  y = yPos() + 3
  setYPos(y)
  addBulletPoint('IV insertion arms (minimum 2 units)', 4)
  addBulletPoint('Intubation training heads (minimum 2 units)', 4)
  addBulletPoint('Chest tube insertion trainers', 4)
  addBulletPoint('Suturing and wound care trainers', 4)
  addBulletPoint('Injection pads (IM, subcutaneous)', 4)
  addBulletPoint('Catheterization trainers', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Support Requirements:', margin, y)
  setYPos(y + 7)

  addBulletPoint('Comprehensive training for simulation staff', 4)
  addBulletPoint('Service contract options (include pricing for 3-year and 5-year terms)', 4)
  addBulletPoint('On-site spare parts kit recommendation', 4)
  addBulletPoint('Remote technical support availability', 4)
  addBulletPoint('Software updates and scenario library access', 4)
}

// Construction Requirements
function generateConstructionRequirements(
  doc: jsPDF,
  params: SimulatorParameters,
  results: BudgetResults,
  helpers: GeneratorHelpers
) {
  const { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos, setYPos } = helpers
  const specs = QUALITY_SPECS[params.qualityLevel]

  addParagraph(
    `General contractor shall provide complete renovation/buildout of ${params.floorArea.toLocaleString()} ` +
    `square feet of space to healthcare simulation center specifications. Quality level: ${params.qualityLevel.toUpperCase()}.`
  )

  let y = yPos()
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Space Requirements:', margin, y)
  setYPos(y + 8)

  addKeyValue('Total Area', `${params.floorArea.toLocaleString()} SF`, 4)
  addKeyValue('Simulation Rooms', `${params.simRooms} rooms (approx. ${Math.round(params.floorArea * 0.4 / params.simRooms)} SF each)`, 4)
  addKeyValue('Control Rooms', `${params.controlRooms} rooms`, 4)
  addKeyValue('Debriefing Rooms', `${params.debriefRooms} rooms`, 4)
  addKeyValue('Support Areas', 'Storage, break room, office space', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Construction Specifications:', margin, y)
  setYPos(y + 8)

  addKeyValue('Finishes', specs.finishes, 4)
  addKeyValue('HVAC', specs.hvac, 4)
  addKeyValue('Lighting', specs.lighting, 4)
  addKeyValue('Acoustics', specs.acoustics, 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('MEP Requirements:', margin, y)
  setYPos(y + 7)

  addBulletPoint('Medical gas simulation capability in each sim room', 4)
  addBulletPoint('Dedicated electrical circuits for simulation equipment (20A minimum)', 4)
  addBulletPoint('Data drops (minimum 4 per room) for A/V and network', 4)
  addBulletPoint('Emergency power connection capability', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Special Considerations:', margin, y)
  setYPos(y + 7)

  addBulletPoint('Work to be performed in occupied healthcare facility', 4)
  addBulletPoint('Infection control protocols required', 4)
  addBulletPoint('Noise restrictions during patient care hours', 4)
  addBulletPoint('All work must comply with healthcare facility codes', 4)
}

// IT/Software Requirements
function generateITRequirements(
  doc: jsPDF,
  params: SimulatorParameters,
  results: BudgetResults,
  helpers: GeneratorHelpers
) {
  const { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos, setYPos } = helpers

  addParagraph(
    `Vendor shall provide software solutions for learning management, video capture and management, ` +
    `scheduling, and analytics for a ${params.simRooms}-room simulation center with ` +
    `${params.sessionsPerMonth * 12} projected annual sessions.`
  )

  let y = yPos()
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Learning Management System (LMS):', margin, y)
  setYPos(y + 8)

  addBulletPoint('Healthcare simulation-specific functionality', 4)
  addBulletPoint('Learner registration and scheduling', 4)
  addBulletPoint('Competency tracking and assessment', 4)
  addBulletPoint('Certificate generation', 4)
  addBulletPoint('Integration with hospital HR systems', 4)
  addBulletPoint('SCORM/xAPI compliance', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Video Management:', margin, y)
  setYPos(y + 7)

  addBulletPoint(`Storage capacity for ${params.sessionsPerMonth * 12 * 5} hours/year (5-year retention)`, 4)
  addBulletPoint('Secure, HIPAA-compliant storage and access', 4)
  addBulletPoint('Annotation and bookmarking tools', 4)
  addBulletPoint('Debriefing workflow support', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Analytics & Reporting:', margin, y)
  setYPos(y + 7)

  addBulletPoint('Utilization dashboards', 4)
  addBulletPoint('Learner performance analytics', 4)
  addBulletPoint('Custom report generation', 4)
  addBulletPoint('Executive summary reports', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Licensing Model:', margin, y)
  setYPos(y + 7)

  addKeyValue('Software Tier', `${params.avTier.charAt(0).toUpperCase() + params.avTier.slice(1)} ($${results.opex.software.toLocaleString()}/year)`, 4)
  addBulletPoint('Provide pricing for perpetual and subscription models', 4)
  addBulletPoint('Include user license tiers (unlimited recommended)', 4)
}

// Furniture/Fixtures Requirements
function generateFurnitureRequirements(
  doc: jsPDF,
  params: SimulatorParameters,
  results: BudgetResults,
  helpers: GeneratorHelpers
) {
  const { addKeyValue, addBulletPoint, addParagraph, checkPageBreak, margin, yPos, setYPos } = helpers

  const totalRooms = params.simRooms + params.controlRooms + params.debriefRooms

  addParagraph(
    `Vendor shall provide furniture and fixtures for ${totalRooms} rooms plus common areas ` +
    `in a healthcare simulation center. All items must be healthcare-grade and support ` +
    `simulation education activities.`
  )

  let y = yPos()
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(`Simulation Rooms (${params.simRooms} rooms):`, margin, y)
  setYPos(y + 8)

  addBulletPoint('Hospital beds (electric, full function) - 1 per room', 4)
  addBulletPoint('Overbed tables - 1 per room', 4)
  addBulletPoint('Bedside tables - 1 per room', 4)
  addBulletPoint('IV poles - 2 per room', 4)
  addBulletPoint('Mayo stands - 1 per room', 4)
  addBulletPoint('Supply carts/crash cart shells - 1 per room', 4)
  addBulletPoint('Patient chairs (recliner style) - 1 per room', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text(`Control Rooms (${params.controlRooms} rooms):`, margin, y)
  setYPos(y + 8)

  addBulletPoint('Operator workstations (L-shaped desks) - 2 per room', 4)
  addBulletPoint('Ergonomic task chairs - 2 per room', 4)
  addBulletPoint('Monitor mounts (multi-screen) - 2 per room', 4)
  addBulletPoint('Equipment racks - 1 per room', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text(`Debriefing Rooms (${params.debriefRooms} rooms):`, margin, y)
  setYPos(y + 8)

  addBulletPoint('Conference tables (seats 8-10) - 1 per room', 4)
  addBulletPoint('Conference chairs - 10 per room', 4)
  addBulletPoint('Whiteboard/glass writing surface - 1 per room', 4)
  addBulletPoint('Credenza with storage - 1 per room', 4)

  y = yPos() + 5
  setYPos(y)

  doc.setFont('helvetica', 'bold')
  doc.text('Common Areas:', margin, y)
  setYPos(y + 8)

  addBulletPoint('Reception desk with storage', 4)
  addBulletPoint('Waiting area seating (12-15 seats)', 4)
  addBulletPoint('Storage cabinets for supplies and equipment', 4)
  addBulletPoint('Staff break room furniture', 4)
  addBulletPoint('Office furniture for administrative space', 4)
}
