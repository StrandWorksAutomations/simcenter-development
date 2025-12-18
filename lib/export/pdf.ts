import jsPDF from 'jspdf'
import type { BudgetResults, SimulatorParameters } from '@/data/seed/budget-simulator'

// Format currency for display
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Format large currency values
const formatCurrencyShort = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return formatCurrency(value)
}

interface ExportPDFOptions {
  params: SimulatorParameters
  results: BudgetResults
  scenarioName?: string
}

export async function exportBudgetToPDF({
  params,
  results,
  scenarioName = 'Budget Scenario'
}: ExportPDFOptions): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let y = margin

  // Colors
  const primaryColor: [number, number, number] = [59, 130, 246] // blue-500
  const textColor: [number, number, number] = [30, 41, 59] // slate-800
  const mutedColor: [number, number, number] = [100, 116, 139] // slate-500

  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Simulation Center Budget Report', margin, 25)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`${scenarioName} | Generated ${new Date().toLocaleDateString()}`, margin, 35)

  y = 55

  // Executive Summary Box
  doc.setFillColor(248, 250, 252) // slate-50
  doc.roundedRect(margin, y, contentWidth, 45, 3, 3, 'F')

  doc.setTextColor(...textColor)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Executive Summary', margin + 5, y + 10)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  const summaryItems = [
    ['Total 5-Year Cost:', formatCurrencyShort(results.fiveYear.totalCost)],
    ['Phase 1 CAPEX:', formatCurrencyShort(results.capex.net)],
    ['Annual OPEX:', formatCurrencyShort(results.opex.annual)],
    ['Cost per Session:', formatCurrency(results.metrics.costPerSession)]
  ]

  const colWidth = contentWidth / 4
  summaryItems.forEach((item, i) => {
    const x = margin + 5 + (i * colWidth)
    doc.setTextColor(...mutedColor)
    doc.text(item[0], x, y + 25)
    doc.setTextColor(...primaryColor)
    doc.setFont('helvetica', 'bold')
    doc.text(item[1], x, y + 35)
    doc.setFont('helvetica', 'normal')
  })

  y += 55

  // Facility Configuration
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Facility Configuration', margin, y)
  y += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mutedColor)

  const facilityConfig = [
    [`Floor Area: ${params.floorArea.toLocaleString()} SF`, `Simulation Rooms: ${params.simRooms}`],
    [`Control Rooms: ${params.controlRooms}`, `Debrief Rooms: ${params.debriefRooms}`],
    [`High-Fidelity Manikins: ${params.highFidelityManikins}`, `Task Trainers: ${params.taskTrainers}`],
    [`A/V Tier: ${params.avTier.charAt(0).toUpperCase() + params.avTier.slice(1)}`, `Quality Level: ${params.qualityLevel.charAt(0).toUpperCase() + params.qualityLevel.slice(1)}`]
  ]

  facilityConfig.forEach(row => {
    doc.text(row[0], margin, y)
    doc.text(row[1], margin + contentWidth / 2, y)
    y += 7
  })

  y += 10

  // CAPEX Breakdown
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('CAPEX Breakdown', margin, y)
  y += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')

  // Table header
  doc.setFillColor(241, 245, 249) // slate-100
  doc.rect(margin, y - 4, contentWidth, 8, 'F')
  doc.setTextColor(...textColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Category', margin + 5, y)
  doc.text('Amount', margin + contentWidth - 30, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mutedColor)

  results.capex.lineItems.forEach(item => {
    if (item.amount !== 0) {
      const isCredit = item.amount < 0
      doc.setTextColor(isCredit ? 16 : 100, isCredit ? 185 : 116, isCredit ? 129 : 139)
      doc.text(item.name, margin + 5, y)
      doc.text((isCredit ? '-' : '') + formatCurrency(Math.abs(item.amount)), margin + contentWidth - 30, y)
      y += 7
    }
  })

  // CAPEX Total
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, margin + contentWidth, y)
  y += 6
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Net CAPEX', margin + 5, y)
  doc.text(formatCurrency(results.capex.net), margin + contentWidth - 30, y)
  y += 15

  // Check if we need a new page
  if (y > 200) {
    doc.addPage()
    y = margin
  }

  // OPEX Breakdown
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Annual OPEX Breakdown', margin, y)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mutedColor)
  doc.text(`(${params.opexModel === 'room-based' ? 'Room-Based' : 'Sessions-Based'} Model)`, margin + 65, y)
  y += 10

  doc.setFontSize(10)

  // Table header
  doc.setFillColor(241, 245, 249)
  doc.rect(margin, y - 4, contentWidth, 8, 'F')
  doc.setTextColor(...textColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Category', margin + 5, y)
  doc.text('Annual Amount', margin + contentWidth - 40, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mutedColor)

  results.opex.lineItems.forEach(item => {
    doc.text(item.name, margin + 5, y)
    doc.text(formatCurrency(item.amount), margin + contentWidth - 40, y)
    y += 7
  })

  // OPEX Total
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, margin + contentWidth, y)
  y += 6
  doc.setTextColor(16, 185, 129) // emerald-500
  doc.setFont('helvetica', 'bold')
  doc.text('Total Annual OPEX', margin + 5, y)
  doc.text(formatCurrency(results.opex.annual), margin + contentWidth - 40, y)
  y += 15

  // Check if we need a new page
  if (y > 200) {
    doc.addPage()
    y = margin
  }

  // 5-Year Projection
  doc.setTextColor(...textColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('5-Year Projection', margin, y)
  y += 10

  doc.setFontSize(10)

  // Table header
  doc.setFillColor(241, 245, 249)
  doc.rect(margin, y - 4, contentWidth, 8, 'F')
  doc.setTextColor(...textColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Year', margin + 5, y)
  doc.text('CAPEX', margin + 35, y)
  doc.text('OPEX', margin + 70, y)
  doc.text('Total', margin + 105, y)
  doc.text('Sessions', margin + 140, y)
  y += 8

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...mutedColor)

  results.fiveYear.yearByYear.forEach(year => {
    doc.text(year.label, margin + 5, y)
    doc.text(formatCurrencyShort(year.capex), margin + 35, y)
    doc.text(formatCurrencyShort(year.opex), margin + 70, y)
    doc.text(formatCurrencyShort(year.total), margin + 105, y)
    doc.text(year.sessionsPerYear.toLocaleString(), margin + 140, y)
    y += 7
  })

  // 5-Year Total
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, margin + contentWidth, y)
  y += 6
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('5-Year Total', margin + 5, y)
  doc.text(formatCurrencyShort(results.fiveYear.totalCapex), margin + 35, y)
  doc.text(formatCurrencyShort(results.fiveYear.totalOpex), margin + 70, y)
  doc.text(formatCurrencyShort(results.fiveYear.totalCost), margin + 105, y)

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...mutedColor)
    doc.text(
      `Baptist Health Lexington Simulation Center | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  // Generate filename and download
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `simulation-budget-${scenarioName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.pdf`

  doc.save(filename)
}
