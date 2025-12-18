"use client"

import { useROITimeline, useROISummary } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"

function formatAxis(value: number): string {
  if (Math.abs(value) >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  const data = payload[0]?.payload
  if (!data) return null

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
      <p className="font-semibold text-white mb-2">Year {data.year}</p>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-emerald-400">Cumulative Savings:</span>
          <span className="text-white font-medium">{formatCurrency(data.cumulativeSavings)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-red-400">Cumulative Costs:</span>
          <span className="text-white font-medium">{formatCurrency(data.cumulativeCost)}</span>
        </div>
        <div className="flex justify-between gap-4 pt-1 border-t border-slate-700">
          <span className={data.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}>Net Position:</span>
          <span className={`font-semibold ${data.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {data.netPosition >= 0 ? '+' : ''}{formatCurrency(data.netPosition)}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ROITimelineChart() {
  const timeline = useROITimeline()
  const summary = useROISummary()

  // Find break-even year (approximate)
  const breakEvenYear = timeline.findIndex(t => t.netPosition >= 0)

  // Prepare data for chart
  const chartData = timeline.map(t => ({
    ...t,
    name: `Year ${t.year}`
  }))

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">5-Year Value Timeline</h3>
          <p className="text-sm text-slate-400 mt-1">Cumulative costs vs. savings over time</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Savings</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-400">Costs</span>
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={formatAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="cumulativeSavings"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSavings)"
              name="Cumulative Savings"
            />
            <Area
              type="monotone"
              dataKey="cumulativeCost"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCosts)"
              name="Cumulative Costs"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats below chart */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-1">Break-even Point</p>
          <p className="text-lg font-semibold text-white">
            {summary.paybackPeriodMonths < 12
              ? `${summary.paybackPeriodMonths} months`
              : `Year ${Math.ceil(summary.paybackPeriodMonths / 12)}`}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-1">Year 5 Net Position</p>
          <p className={`text-lg font-semibold ${timeline[4]?.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {timeline[4] ? formatCurrency(timeline[4].netPosition) : '—'}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 mb-1">Total 5-Year Savings</p>
          <p className="text-lg font-semibold text-emerald-400">
            {timeline[4] ? formatCurrency(timeline[4].cumulativeSavings) : '—'}
          </p>
        </div>
      </div>
    </div>
  )
}

export function ROIComparisonBars() {
  const timeline = useROITimeline()

  if (!timeline.length) return null

  const year1 = timeline[0]
  const year5 = timeline[4]

  const maxValue = Math.max(
    year1?.cumulativeCost || 0,
    year1?.cumulativeSavings || 0,
    year5?.cumulativeCost || 0,
    year5?.cumulativeSavings || 0
  )

  const getWidth = (value: number) => `${(value / maxValue) * 100}%`

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-4">
      <h4 className="text-sm font-medium text-white mb-4">Year 1 vs Year 5 Comparison</h4>

      <div className="space-y-4">
        {/* Year 1 */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Year 1</span>
            <span>Net: {formatCurrency(year1?.netPosition || 0)}</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 w-12">Costs</span>
              <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500/70 rounded-full"
                  style={{ width: getWidth(year1?.cumulativeCost || 0) }}
                />
              </div>
              <span className="text-xs text-white w-16 text-right">
                {formatCurrency(year1?.cumulativeCost || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 w-12">Savings</span>
              <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500/70 rounded-full"
                  style={{ width: getWidth(year1?.cumulativeSavings || 0) }}
                />
              </div>
              <span className="text-xs text-white w-16 text-right">
                {formatCurrency(year1?.cumulativeSavings || 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Year 5 */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Year 5</span>
            <span className={year5?.netPosition >= 0 ? 'text-green-400' : 'text-red-400'}>
              Net: {formatCurrency(year5?.netPosition || 0)}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 w-12">Costs</span>
              <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500/70 rounded-full"
                  style={{ width: getWidth(year5?.cumulativeCost || 0) }}
                />
              </div>
              <span className="text-xs text-white w-16 text-right">
                {formatCurrency(year5?.cumulativeCost || 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 w-12">Savings</span>
              <div className="flex-1 h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500/70 rounded-full"
                  style={{ width: getWidth(year5?.cumulativeSavings || 0) }}
                />
              </div>
              <span className="text-xs text-white w-16 text-right">
                {formatCurrency(year5?.cumulativeSavings || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
