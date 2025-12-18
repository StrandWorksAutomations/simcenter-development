"use client"

import { TrendingUp, DollarSign, Clock, Percent, Info } from "lucide-react"
import { useROISummary, useROIConfidenceRange } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"

interface MetricCardProps {
  label: string
  value: string
  subValue?: string
  icon: React.ReactNode
  status: 'positive' | 'neutral' | 'caution'
  tooltip?: string
}

function MetricCard({ label, value, subValue, icon, status, tooltip }: MetricCardProps) {
  const statusColors = {
    positive: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
    neutral: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
    caution: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
  }

  const iconColors = {
    positive: 'text-green-400',
    neutral: 'text-blue-400',
    caution: 'text-amber-400'
  }

  return (
    <div className={`relative p-4 rounded-xl bg-gradient-to-br ${statusColors[status]} border`}>
      <div className="flex items-start justify-between mb-2">
        <span className={`p-2 rounded-lg bg-slate-800/50 ${iconColors[status]}`}>
          {icon}
        </span>
        {tooltip && (
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500 cursor-help" />
            <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 text-xs text-slate-300">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {subValue && (
          <p className="text-xs text-slate-400 mt-1">{subValue}</p>
        )}
      </div>
    </div>
  )
}

export function ROISummaryCards() {
  const summary = useROISummary()
  const confidence = useROIConfidenceRange()

  const getPaybackStatus = (months: number) => {
    if (months <= 6) return 'positive'
    if (months <= 18) return 'neutral'
    return 'caution'
  }

  const getROIStatus = (percent: number) => {
    if (percent >= 100) return 'positive'
    if (percent >= 50) return 'neutral'
    return 'caution'
  }

  const formatPayback = (months: number) => {
    if (months === Infinity) return 'N/A'
    if (months < 12) return `${months} months`
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
    return `${years}y ${remainingMonths}m`
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Annual Savings"
        value={formatCurrency(summary.totalAnnualSavings)}
        subValue={`5-Year NPV: ${formatCurrency(summary.totalFiveYearSavings)}`}
        icon={<DollarSign className="h-5 w-5" />}
        status="positive"
        tooltip="Total annual savings from improved retention, reduced errors, and other benefits. 5-Year NPV uses 8% discount rate."
      />

      <MetricCard
        label="5-Year Net ROI"
        value={formatCurrency(summary.netROI)}
        subValue={`After all costs`}
        icon={<TrendingUp className="h-5 w-5" />}
        status={summary.netROI > 0 ? 'positive' : 'caution'}
        tooltip="Total 5-year savings minus total 5-year costs (CAPEX + OPEX). Positive means the investment pays for itself."
      />

      <MetricCard
        label="Payback Period"
        value={formatPayback(summary.paybackPeriodMonths)}
        subValue="Time to recover CAPEX"
        icon={<Clock className="h-5 w-5" />}
        status={getPaybackStatus(summary.paybackPeriodMonths)}
        tooltip="How long until annual savings cover the initial capital investment. Shorter is better."
      />

      <MetricCard
        label="ROI Percentage"
        value={`${summary.roiPercent.toFixed(0)}%`}
        subValue={`IRR: ${summary.irr.toFixed(1)}%`}
        icon={<Percent className="h-5 w-5" />}
        status={getROIStatus(summary.roiPercent)}
        tooltip="Return on Investment = (5-Year Savings - 5-Year Costs) / 5-Year Costs. IRR is the Internal Rate of Return."
      />
    </div>
  )
}

export function ROIConfidenceBar() {
  const confidence = useROIConfidenceRange()
  const summary = useROISummary()

  const formatShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Annual Savings Range</h4>
        <span className="text-xs text-slate-400">Based on evidence confidence levels</span>
      </div>

      <div className="relative h-8 bg-slate-700/50 rounded-lg overflow-hidden">
        {/* Conservative range (30% less) */}
        <div
          className="absolute inset-y-0 left-0 bg-amber-500/20"
          style={{ width: `${(confidence.conservative / confidence.optimistic) * 100}%` }}
        />
        {/* Baseline (center) */}
        <div
          className="absolute inset-y-0 bg-green-500/30"
          style={{
            left: `${(confidence.conservative / confidence.optimistic) * 100}%`,
            width: `${((confidence.baseline - confidence.conservative) / confidence.optimistic) * 100}%`
          }}
        />
        {/* Optimistic range (30% more) */}
        <div
          className="absolute inset-y-0 right-0 bg-blue-500/20"
          style={{ width: `${((confidence.optimistic - confidence.baseline) / confidence.optimistic) * 100}%` }}
        />

        {/* Baseline marker */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `${(confidence.baseline / confidence.optimistic) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs">
        <span className="text-amber-400">
          Conservative: {formatShort(confidence.conservative)}/yr
        </span>
        <span className="text-green-400 font-medium">
          Baseline: {formatShort(confidence.baseline)}/yr
        </span>
        <span className="text-blue-400">
          Optimistic: {formatShort(confidence.optimistic)}/yr
        </span>
      </div>
    </div>
  )
}
