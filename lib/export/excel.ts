import * as XLSX from 'xlsx'
import type { BudgetResults, SimulatorParameters } from '@/data/seed/budget-simulator'

interface ExportExcelOptions {
  params: SimulatorParameters
  results: BudgetResults
  scenarioName?: string
}

export function exportBudgetToExcel({
  params,
  results,
  scenarioName = 'Budget Scenario'
}: ExportExcelOptions): void {
  // Create workbook
  const wb = XLSX.utils.book_new()

  // Sheet 1: Summary
  const summaryData = [
    ['SIMULATION CENTER BUDGET SUMMARY'],
    [''],
    ['Scenario:', scenarioName],
    ['Generated:', new Date().toLocaleString()],
    [''],
    ['KEY METRICS'],
    ['Total 5-Year Cost', results.fiveYear.totalCost],
    ['Phase 1 CAPEX (Net)', results.capex.net],
    ['Annual OPEX', results.opex.annual],
    ['Monthly OPEX', results.opex.monthly],
    ['Cost per Session', results.metrics.costPerSession],
    ['Cost per SF', results.metrics.costPerSF],
    ['Cost per Learner Hour', results.metrics.costPerLearnerHour],
    ['Annual Sessions', results.metrics.annualSessions],
    [''],
    ['FACILITY CONFIGURATION'],
    ['Floor Area (SF)', params.floorArea],
    ['Simulation Rooms', params.simRooms],
    ['Control Rooms', params.controlRooms],
    ['Debrief Rooms', params.debriefRooms],
    ['High-Fidelity Manikins', params.highFidelityManikins],
    ['Task Trainers', params.taskTrainers],
    ['A/V Tier', params.avTier],
    ['Quality Level', params.qualityLevel],
    ['Cost Region', params.costRegion],
    [''],
    ['STAFFING & OPERATIONS'],
    ['Core Staff FTE', params.coreFTE],
    ['Faculty Allocation %', params.facultyAllocationPercent],
    ['Training Hours/Year', params.trainingHoursPerYear],
    ['Sessions per Month', params.sessionsPerMonth],
    ['OPEX Model', params.opexModel],
    ['Growth Rate %', params.growthRatePercent],
    ['Inflation Rate %', params.inflationPercent],
    ['Contingency %', params.contingencyPercent],
    ['Refresh Reserve %', params.refreshReservePercent]
  ]

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)

  // Set column widths
  summarySheet['!cols'] = [{ wch: 25 }, { wch: 20 }]

  // Format currency cells
  const currencyFormat = '$#,##0'
  const currencyCells = ['B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13']
  currencyCells.forEach(cell => {
    if (summarySheet[cell]) {
      summarySheet[cell].z = currencyFormat
    }
  })

  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary')

  // Sheet 2: CAPEX Details
  const capexData = [
    ['CAPEX BREAKDOWN'],
    [''],
    ['Category', 'Amount', 'Calculation', 'Notes'],
    ...results.capex.lineItems.map(item => [
      item.name,
      item.amount,
      item.calculation || '',
      item.notes || ''
    ]),
    [''],
    ['TOTALS'],
    ['Gross CAPEX', results.capex.total],
    ['Existing Asset Credits', results.capex.existingCredits],
    ['Net CAPEX', results.capex.net],
    [''],
    ['CATEGORY BREAKDOWN'],
    ['Construction', results.capex.construction],
    ['Equipment', results.capex.equipment],
    ['A/V System', results.capex.avSystem],
    ['Soft Costs', results.capex.softCosts],
    ['Contingency', results.capex.contingency]
  ]

  const capexSheet = XLSX.utils.aoa_to_sheet(capexData)
  capexSheet['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 35 }, { wch: 30 }]

  XLSX.utils.book_append_sheet(wb, capexSheet, 'CAPEX Details')

  // Sheet 3: OPEX Details
  const opexData = [
    ['ANNUAL OPEX BREAKDOWN'],
    [`Model: ${params.opexModel === 'room-based' ? 'Room-Based' : 'Sessions-Based'}`],
    [''],
    ['Category', 'Annual Amount', 'Monthly', 'Calculation', 'Notes'],
    ...results.opex.lineItems.map(item => [
      item.name,
      item.amount,
      item.amount / 12,
      item.calculation || '',
      item.notes || ''
    ]),
    [''],
    ['TOTALS'],
    ['Total Annual OPEX', results.opex.annual, results.opex.monthly],
    [''],
    ['CATEGORY BREAKDOWN'],
    ['Staffing', results.opex.staffing, results.opex.staffing / 12],
    ['Maintenance', results.opex.maintenance, results.opex.maintenance / 12],
    ['Consumables', results.opex.consumables, results.opex.consumables / 12],
    ['Software', results.opex.software, results.opex.software / 12],
    ['Utilities', results.opex.utilities, results.opex.utilities / 12],
    ['Refresh Reserve', results.opex.refresh, results.opex.refresh / 12]
  ]

  const opexSheet = XLSX.utils.aoa_to_sheet(opexData)
  opexSheet['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 35 }, { wch: 30 }]

  XLSX.utils.book_append_sheet(wb, opexSheet, 'OPEX Details')

  // Sheet 4: 5-Year Projection
  const projectionData = [
    ['5-YEAR PROJECTION'],
    [`Growth Rate: ${params.growthRatePercent}% | Inflation: ${params.inflationPercent}%`],
    [''],
    ['Year', 'CAPEX', 'OPEX', 'Total Cost', 'Sessions/Year', 'Cost per Session'],
    ...results.fiveYear.yearByYear.map(year => [
      year.label,
      year.capex,
      year.opex,
      year.total,
      year.sessionsPerYear,
      year.costPerSession
    ]),
    [''],
    ['5-YEAR TOTALS'],
    ['Total CAPEX', results.fiveYear.totalCapex],
    ['Total OPEX', results.fiveYear.totalOpex],
    ['Total Cost', results.fiveYear.totalCost]
  ]

  const projectionSheet = XLSX.utils.aoa_to_sheet(projectionData)
  projectionSheet['!cols'] = [
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 }
  ]

  XLSX.utils.book_append_sheet(wb, projectionSheet, '5-Year Projection')

  // Sheet 5: Parameters (for reimport)
  const paramsData = [
    ['SIMULATION PARAMETERS'],
    ['These values can be used to recreate this scenario'],
    [''],
    ['Parameter', 'Value', 'Description'],
    ['floorArea', params.floorArea, 'Total floor area in square feet'],
    ['simRooms', params.simRooms, 'Number of simulation rooms'],
    ['controlRooms', params.controlRooms, 'Number of control rooms'],
    ['debriefRooms', params.debriefRooms, 'Number of debrief rooms'],
    ['highFidelityManikins', params.highFidelityManikins, 'High-fidelity manikin count'],
    ['taskTrainers', params.taskTrainers, 'Task trainer count'],
    ['avTier', params.avTier, 'A/V system tier (basic/standard/premium)'],
    ['coreFTE', params.coreFTE, 'Core staff FTE'],
    ['facultyAllocationPercent', params.facultyAllocationPercent, 'Faculty allocation percentage'],
    ['trainingHoursPerYear', params.trainingHoursPerYear, 'Annual training hours'],
    ['sessionsPerMonth', params.sessionsPerMonth, 'Expected sessions per month'],
    ['opexModel', params.opexModel, 'OPEX calculation model'],
    ['growthRatePercent', params.growthRatePercent, 'Annual growth rate'],
    ['inflationPercent', params.inflationPercent, 'Annual inflation rate'],
    ['qualityLevel', params.qualityLevel, 'Quality tier (budget/standard/premium)'],
    ['costRegion', params.costRegion, 'Cost region factor'],
    ['contingencyPercent', params.contingencyPercent, 'Contingency percentage'],
    ['refreshReservePercent', params.refreshReservePercent, 'Equipment refresh reserve']
  ]

  const paramsSheet = XLSX.utils.aoa_to_sheet(paramsData)
  paramsSheet['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 40 }]

  XLSX.utils.book_append_sheet(wb, paramsSheet, 'Parameters')

  // Generate filename and download
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = `simulation-budget-${scenarioName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.xlsx`

  XLSX.writeFile(wb, filename)
}

// Simple CSV export for line items
export function exportToCSV(
  data: Array<Record<string, string | number>>,
  filename: string
): void {
  const ws = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(ws)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}
