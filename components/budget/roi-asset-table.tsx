"use client"

import { Monitor, Wrench, DoorOpen, Eye, Users, Video, Server, Stethoscope } from "lucide-react"
import { useROIByAsset } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"
import { type AssetType } from "@/data/seed/roi-evidence"

const assetIcons: Record<AssetType, React.ReactNode> = {
  'high-fidelity-manikin': <Stethoscope className="h-4 w-4" />,
  'task-trainer': <Wrench className="h-4 w-4" />,
  'sim-room': <DoorOpen className="h-4 w-4" />,
  'control-room': <Eye className="h-4 w-4" />,
  'debrief-room': <Users className="h-4 w-4" />,
  'core-staff-fte': <Users className="h-4 w-4" />,
  'faculty-allocation': <Users className="h-4 w-4" />,
  'av-system': <Video className="h-4 w-4" />,
  'software-license': <Server className="h-4 w-4" />
}

function formatPayback(months: number | null): string {
  if (months === null || months === Infinity) return '—'
  if (months < 1) return '< 1 month'
  if (months < 12) return `${months} months`
  const years = Math.floor(months / 12)
  const remaining = months % 12
  if (remaining === 0) return `${years} year${years > 1 ? 's' : ''}`
  return `${years}y ${remaining}m`
}

function getPaybackColor(months: number | null): string {
  if (months === null) return 'text-slate-400'
  if (months <= 6) return 'text-green-400'
  if (months <= 12) return 'text-emerald-400'
  if (months <= 24) return 'text-amber-400'
  return 'text-red-400'
}

export function ROIAssetTable() {
  const assets = useROIByAsset()
  const totalAnnual = assets.reduce((sum, a) => sum + a.annualContribution, 0)

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Asset ROI Contribution</h3>
        <p className="text-sm text-slate-400 mt-1">Each asset's contribution to total ROI based on evidence attribution</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr className="text-left text-xs text-slate-400">
              <th className="px-4 py-3 font-medium">Asset</th>
              <th className="px-4 py-3 font-medium text-right">Annual Value</th>
              <th className="px-4 py-3 font-medium text-right">5-Year Value</th>
              <th className="px-4 py-3 font-medium text-right">% of Total</th>
              <th className="px-4 py-3 font-medium text-right">Payback</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {assets.map((asset) => {
              const percentage = totalAnnual > 0 ? (asset.annualContribution / totalAnnual) * 100 : 0

              return (
                <tr key={asset.assetType} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-slate-700/50 rounded-lg text-slate-400">
                        {assetIcons[asset.assetType]}
                      </span>
                      <span className="text-sm font-medium text-white">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(asset.annualContribution)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-slate-300">
                      {formatCurrency(asset.fiveYearContribution)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400 w-12 text-right">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-medium ${getPaybackColor(asset.paybackMonths)}`}>
                      {formatPayback(asset.paybackMonths)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot className="bg-slate-800/50 border-t border-slate-700">
            <tr className="text-white font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right">{formatCurrency(totalAnnual)}</td>
              <td className="px-4 py-3 text-right">{formatCurrency(totalAnnual * 5)}</td>
              <td className="px-4 py-3 text-right">100%</td>
              <td className="px-4 py-3 text-right">—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800/20">
        <p className="text-xs text-slate-400">
          * Payback periods are calculated per-asset based on the asset's cost and its attributed share of annual savings.
          Assets with shared contributions may show longer payback periods individually but contribute to faster overall payback.
        </p>
      </div>
    </div>
  )
}
