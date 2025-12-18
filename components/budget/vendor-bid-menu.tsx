"use client"

import { useState } from "react"
import { FileText, ChevronDown, Building2, Monitor, Wrench, Server, Sofa, Loader2 } from "lucide-react"
import { useSimulationStore } from "@/store/simulation-store"
import { generateVendorBidPDF, type VendorCategory } from "@/lib/export/vendor-bid"

const VENDOR_CATEGORIES: {
  id: VendorCategory
  label: string
  description: string
  icon: typeof Building2
}[] = [
  {
    id: 'av-systems',
    label: 'A/V Systems',
    description: 'Cameras, recording, displays',
    icon: Monitor
  },
  {
    id: 'simulation-equipment',
    label: 'Simulation Equipment',
    description: 'Manikins, task trainers',
    icon: Wrench
  },
  {
    id: 'construction',
    label: 'Construction',
    description: 'General contractor, MEP',
    icon: Building2
  },
  {
    id: 'it-software',
    label: 'IT & Software',
    description: 'LMS, video management',
    icon: Server
  },
  {
    id: 'furniture-fixtures',
    label: 'Furniture & Fixtures',
    description: 'Beds, desks, storage',
    icon: Sofa
  }
]

interface VendorBidMenuProps {
  organizationName?: string
  projectName?: string
}

export function VendorBidMenu({
  organizationName = "Baptist Health Lexington",
  projectName = "Healthcare Simulation Center"
}: VendorBidMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState<VendorCategory | null>(null)
  const [showCustomize, setShowCustomize] = useState(false)
  const [customOrgName, setCustomOrgName] = useState(organizationName)
  const [customProjectName, setCustomProjectName] = useState(projectName)
  const [deadline, setDeadline] = useState("30 days from receipt")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const { params, results } = useSimulationStore()

  const handleExport = async (category: VendorCategory) => {
    setIsExporting(category)
    try {
      await generateVendorBidPDF({
        params,
        results,
        category,
        organizationName: customOrgName,
        projectName: customProjectName,
        submissionDeadline: deadline,
        additionalNotes: additionalNotes || undefined
      })
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(null)
      setIsOpen(false)
    }
  }

  const handleExportAll = async () => {
    for (const category of VENDOR_CATEGORIES) {
      setIsExporting(category.id)
      try {
        await generateVendorBidPDF({
          params,
          results,
          category: category.id,
          organizationName: customOrgName,
          projectName: customProjectName,
          submissionDeadline: deadline,
          additionalNotes: additionalNotes || undefined
        })
        // Small delay between exports
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.error(`Export failed for ${category.id}:`, error)
      }
    }
    setIsExporting(null)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium text-white transition-colors"
      >
        <FileText className="h-4 w-4" />
        Vendor RFP
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white text-sm">Generate Vendor Bid Requests</h3>
                <button
                  onClick={() => setShowCustomize(!showCustomize)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  {showCustomize ? 'Hide Options' : 'Customize'}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Create RFP documents based on current parameters
              </p>
            </div>

            {/* Customization Options */}
            {showCustomize && (
              <div className="px-4 py-3 border-b border-slate-700 space-y-3 bg-slate-900/50">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={customOrgName}
                    onChange={(e) => setCustomOrgName(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={customProjectName}
                    onChange={(e) => setCustomProjectName(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Response Deadline</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g., March 15, 2025"
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Additional Notes (optional)</label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={2}
                    placeholder="Any special requirements..."
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Current Configuration Summary */}
            <div className="px-4 py-2 bg-slate-900/30 border-b border-slate-700">
              <p className="text-xs text-slate-400">
                Current config: <span className="text-white">{params.simRooms} sim rooms</span>,{' '}
                <span className="text-white">{params.floorArea.toLocaleString()} SF</span>,{' '}
                <span className="text-white">{params.avTier}</span> A/V
              </p>
            </div>

            {/* Category List */}
            <div className="py-1">
              {VENDOR_CATEGORIES.map((category) => {
                const Icon = category.icon
                const isLoading = isExporting === category.id

                return (
                  <button
                    key={category.id}
                    onClick={() => handleExport(category.id)}
                    disabled={isExporting !== null}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-700/50 transition-colors text-left disabled:opacity-50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 text-amber-400 animate-spin" />
                      ) : (
                        <Icon className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{category.label}</div>
                      <div className="text-xs text-slate-400">{category.description}</div>
                    </div>
                    <FileText className="h-4 w-4 text-slate-500" />
                  </button>
                )
              })}
            </div>

            {/* Export All */}
            <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50">
              <button
                onClick={handleExportAll}
                disabled={isExporting !== null}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors"
              >
                {isExporting !== null ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Export All RFPs (5 PDFs)
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
