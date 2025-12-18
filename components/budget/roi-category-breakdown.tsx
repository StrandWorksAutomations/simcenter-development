"use client"

import { useState } from "react"
import { ChevronDown, Users, Heart, Pill, Shield, Scale, Award, Clock } from "lucide-react"
import { useROIByCategory } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"
import { CitationList } from "./evidence-citation"
import { type ROICategory } from "@/data/seed/roi-evidence"

const categoryIcons: Record<ROICategory, React.ReactNode> = {
  'nurse-retention': <Users className="h-4 w-4" />,
  'code-blue': <Heart className="h-4 w-4" />,
  'medication-errors': <Pill className="h-4 w-4" />,
  'infection-prevention': <Shield className="h-4 w-4" />,
  'malpractice': <Scale className="h-4 w-4" />,
  'magnet-status': <Award className="h-4 w-4" />,
  'onboarding-efficiency': <Clock className="h-4 w-4" />
}

const categoryDescriptions: Record<ROICategory, string> = {
  'nurse-retention': 'Reduced turnover costs from improved retention rates through simulation-based residency programs',
  'code-blue': 'Improved cardiac arrest survival rates and reduced malpractice exposure through regular mock codes',
  'medication-errors': 'Reduced medication administration errors through simulation-based competency training',
  'infection-prevention': 'Lower CLABSI and other hospital-acquired infection rates through procedural simulation',
  'malpractice': 'Premium discounts and reduced claims from documented competency verification',
  'magnet-status': 'Enhanced revenue per discharge and recruitment advantages from Magnet designation',
  'onboarding-efficiency': 'Faster time to competency and reduced orientation costs for new hires'
}

interface CategoryRowProps {
  category: {
    category: ROICategory
    name: string
    annualSavings: number
    fiveYearSavings: number
    citations: any[]
    confidence: 'high' | 'moderate' | 'low'
  }
  totalAnnual: number
}

function CategoryRow({ category, totalAnnual }: CategoryRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const percentage = totalAnnual > 0 ? (category.annualSavings / totalAnnual) * 100 : 0

  const confidenceColors = {
    high: 'bg-green-500',
    moderate: 'bg-amber-500',
    low: 'bg-slate-500'
  }

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-4 p-4 hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex-shrink-0 p-2 bg-slate-700 rounded-lg text-slate-300">
          {categoryIcons[category.category]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white">{category.name}</h4>
            <span className={`w-2 h-2 rounded-full ${confidenceColors[category.confidence]}`} />
          </div>
          <div className="mt-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-semibold text-white">{formatCurrency(category.annualSavings)}</p>
          <p className="text-xs text-slate-400">{percentage.toFixed(1)}% of total</p>
        </div>

        <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-700 bg-slate-800/30">
          <p className="text-sm text-slate-400 mt-3 mb-4">
            {categoryDescriptions[category.category]}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Annual Savings</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(category.annualSavings)}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">5-Year Savings</p>
              <p className="text-lg font-semibold text-white">{formatCurrency(category.fiveYearSavings)}</p>
            </div>
          </div>

          {category.citations.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 mb-2">Evidence Sources</p>
              <CitationList citations={category.citations} maxVisible={3} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ROICategoryBreakdown() {
  const categories = useROIByCategory()
  const totalAnnual = categories.reduce((sum, c) => sum + c.annualSavings, 0)

  // Sort by annual savings (highest first)
  const sortedCategories = [...categories].sort((a, b) => b.annualSavings - a.annualSavings)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">ROI by Category</h3>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            High confidence
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Low
          </span>
        </div>
      </div>

      {sortedCategories.map(category => (
        <CategoryRow key={category.category} category={category} totalAnnual={totalAnnual} />
      ))}

      <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Annual Savings</span>
          <span className="text-xl font-bold text-white">{formatCurrency(totalAnnual)}</span>
        </div>
      </div>
    </div>
  )
}
