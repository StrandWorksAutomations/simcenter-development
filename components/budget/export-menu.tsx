"use client"

import { useState } from "react"
import { Download, FileText, FileSpreadsheet, ChevronDown, Loader2 } from "lucide-react"
import { exportBudgetToPDF, exportBudgetToExcel } from "@/lib/export"
import type { BudgetResults, SimulatorParameters } from "@/data/seed/budget-simulator"

interface ExportMenuProps {
  params: SimulatorParameters
  results: BudgetResults
  scenarioName?: string
}

export function ExportMenu({ params, results, scenarioName = 'Current Scenario' }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState<'pdf' | 'excel' | null>(null)

  const handleExportPDF = async () => {
    setIsExporting('pdf')
    try {
      await exportBudgetToPDF({ params, results, scenarioName })
    } catch (error) {
      console.error('PDF export failed:', error)
    } finally {
      setIsExporting(null)
      setIsOpen(false)
    }
  }

  const handleExportExcel = () => {
    setIsExporting('excel')
    try {
      exportBudgetToExcel({ params, results, scenarioName })
    } catch (error) {
      console.error('Excel export failed:', error)
    } finally {
      setIsExporting(null)
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors"
      >
        <Download className="h-4 w-4" />
        Export
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20 overflow-hidden">
            <div className="p-1">
              <button
                onClick={handleExportPDF}
                disabled={isExporting !== null}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded-md transition-colors disabled:opacity-50"
              >
                {isExporting === 'pdf' ? (
                  <Loader2 className="h-4 w-4 animate-spin text-red-400" />
                ) : (
                  <FileText className="h-4 w-4 text-red-400" />
                )}
                <div className="text-left">
                  <div className="font-medium">Export as PDF</div>
                  <div className="text-xs text-slate-400">Printable report format</div>
                </div>
              </button>

              <button
                onClick={handleExportExcel}
                disabled={isExporting !== null}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 rounded-md transition-colors disabled:opacity-50"
              >
                {isExporting === 'excel' ? (
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
                )}
                <div className="text-left">
                  <div className="font-medium">Export as Excel</div>
                  <div className="text-xs text-slate-400">Editable spreadsheet</div>
                </div>
              </button>
            </div>

            <div className="border-t border-slate-700 px-3 py-2">
              <p className="text-xs text-slate-500">
                Exports current scenario settings and calculations
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
