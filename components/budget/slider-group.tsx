"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface SliderGroupProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  badge?: string
}

export function SliderGroup({
  title,
  icon,
  children,
  defaultOpen = true,
  badge
}: SliderGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-white">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 py-4 space-y-4 bg-slate-900/50">
          {children}
        </div>
      )}
    </div>
  )
}

// Summary metric card for displaying calculated values
interface MetricCardProps {
  label: string
  value: string
  subValue?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
}

export function MetricCard({
  label,
  value,
  subValue,
  trend,
  icon,
  color = 'blue'
}: MetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    green: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
    red: 'from-red-500/20 to-red-500/5 border-red-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30'
  }

  const iconColors = {
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    amber: 'text-amber-400',
    red: 'text-red-400',
    purple: 'text-purple-400'
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </span>
        {icon && <span className={iconColors[color]}>{icon}</span>}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {subValue && (
        <div className="mt-1 text-xs text-slate-400">{subValue}</div>
      )}
    </div>
  )
}

// Line item row for detailed breakdowns
interface LineItemRowProps {
  name: string
  amount: number
  calculation?: string
  notes?: string
  isNegative?: boolean
  formatCurrency: (value: number) => string
}

export function LineItemRow({
  name,
  amount,
  calculation,
  notes,
  isNegative = false,
  formatCurrency
}: LineItemRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
      <div className="flex-1">
        <div className="text-sm text-slate-200">{name}</div>
        {calculation && (
          <div className="text-xs text-slate-500">{calculation}</div>
        )}
        {notes && (
          <div className="text-xs text-slate-500 italic">{notes}</div>
        )}
      </div>
      <div className={`text-sm font-semibold tabular-nums ${
        isNegative ? 'text-emerald-400' : 'text-white'
      }`}>
        {isNegative && amount < 0 ? '' : ''}{formatCurrency(Math.abs(amount))}
        {isNegative && amount < 0 && ' credit'}
      </div>
    </div>
  )
}
