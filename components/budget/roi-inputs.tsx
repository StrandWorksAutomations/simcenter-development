"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw, Building2, Users, DollarSign, Activity } from "lucide-react"
import { useROIParams, useSimulationStore } from "@/store/simulation-store"
import { DEFAULT_ROI_PARAMS } from "@/data/seed/budget-simulator"

interface SliderInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  format?: (value: number) => string
  unit?: string
  description?: string
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format = (v) => v.toString(),
  unit = '',
  description
}: SliderInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm text-slate-300">{label}</label>
        <span className="text-sm font-medium text-white">
          {format(value)}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}

interface ToggleInputProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  description?: string
}

function ToggleInput({ label, checked, onChange, description }: ToggleInputProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label className="text-sm text-slate-300">{label}</label>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-blue-500' : 'bg-slate-600'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  )
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 transition-colors"
      >
        <span className="text-slate-400">{icon}</span>
        <span className="text-sm font-medium text-white flex-1 text-left">{title}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 space-y-4 bg-slate-800/20">
          {children}
        </div>
      )}
    </div>
  )
}

export function ROIInputsPanel() {
  const roiParams = useROIParams()
  const setROIParams = useSimulationStore(state => state.setROIParams)
  const resetROIParams = useSimulationStore(state => state.resetROIParams)

  const formatCurrency = (v: number) => `$${v.toLocaleString()}`
  const formatPercent = (v: number) => `${(v * 100).toFixed(1)}`
  const formatNumber = (v: number) => v.toLocaleString()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Organization Inputs</h3>
          <p className="text-sm text-slate-400">Customize ROI calculations for your organization</p>
        </div>
        <button
          onClick={resetROIParams}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset to Defaults
        </button>
      </div>

      <Section title="Staffing Metrics" icon={<Users className="h-4 w-4" />}>
        <SliderInput
          label="Total RNs"
          value={roiParams.totalRNs}
          onChange={(v) => setROIParams({ totalRNs: v })}
          min={100}
          max={2000}
          step={50}
          format={formatNumber}
          description="Total number of registered nurses in your organization"
        />
        <SliderInput
          label="Current Turnover Rate"
          value={roiParams.currentTurnoverRate}
          onChange={(v) => setROIParams({ currentTurnoverRate: v })}
          min={0.05}
          max={0.35}
          step={0.01}
          format={formatPercent}
          unit="%"
          description="National average is 18.4% (2025)"
        />
        <SliderInput
          label="Average RN Turnover Cost"
          value={roiParams.avgRNTurnoverCost}
          onChange={(v) => setROIParams({ avgRNTurnoverCost: v })}
          min={40000}
          max={90000}
          step={1000}
          format={formatCurrency}
          description="Industry average is $61,110 per turnover (2025)"
        />
      </Section>

      <Section title="Clinical Metrics" icon={<Activity className="h-4 w-4" />} defaultOpen={false}>
        <SliderInput
          label="Annual Code Blue Events"
          value={roiParams.annualCodeBlueEvents}
          onChange={(v) => setROIParams({ annualCodeBlueEvents: v })}
          min={50}
          max={500}
          step={10}
          format={formatNumber}
          description="Total cardiac arrests/rapid response calls per year"
        />
        <SliderInput
          label="Current Code Blue Survival"
          value={roiParams.currentCodeBlueSurvival}
          onChange={(v) => setROIParams({ currentCodeBlueSurvival: v })}
          min={0.10}
          max={0.40}
          step={0.01}
          format={formatPercent}
          unit="%"
          description="National average is 21% for adult in-hospital cardiac arrest"
        />
        <SliderInput
          label="Annual Medication Errors"
          value={roiParams.annualMedicationErrors}
          onChange={(v) => setROIParams({ annualMedicationErrors: v })}
          min={50}
          max={1000}
          step={10}
          format={formatNumber}
          description="Reported medication administration errors per year"
        />
        <SliderInput
          label="Average Medication Error Cost"
          value={roiParams.avgMedicationErrorCost}
          onChange={(v) => setROIParams({ avgMedicationErrorCost: v })}
          min={100}
          max={2000}
          step={50}
          format={formatCurrency}
          description="Direct cost per medication error incident"
        />
        <SliderInput
          label="Central Line Days"
          value={roiParams.centralLineDays}
          onChange={(v) => setROIParams({ centralLineDays: v })}
          min={5000}
          max={50000}
          step={1000}
          format={formatNumber}
          description="Total central line days per year"
        />
        <SliderInput
          label="CLABSI Rate"
          value={roiParams.annualCLABSIRate}
          onChange={(v) => setROIParams({ annualCLABSIRate: v })}
          min={0.5}
          max={5}
          step={0.1}
          format={(v) => v.toFixed(1)}
          unit=" per 1,000 line days"
          description="Current CLABSI rate per 1,000 central line days"
        />
        <SliderInput
          label="Average CLABSI Cost"
          value={roiParams.avgCLABSICost}
          onChange={(v) => setROIParams({ avgCLABSICost: v })}
          min={15000}
          max={75000}
          step={2500}
          format={formatCurrency}
          description="Cost per CLABSI infection ($25K-$50K typical)"
        />
      </Section>

      <Section title="Financial Metrics" icon={<DollarSign className="h-4 w-4" />} defaultOpen={false}>
        <SliderInput
          label="Malpractice Premium"
          value={roiParams.malpracticePremium}
          onChange={(v) => setROIParams({ malpracticePremium: v })}
          min={100000}
          max={1000000}
          step={25000}
          format={formatCurrency}
          description="Annual malpractice insurance premium"
        />
        <SliderInput
          label="Annual Discharges"
          value={roiParams.annualDischarges}
          onChange={(v) => setROIParams({ annualDischarges: v })}
          min={5000}
          max={50000}
          step={1000}
          format={formatNumber}
          description="Total patient discharges per year"
        />
        <SliderInput
          label="Discount Rate (NPV)"
          value={roiParams.discountRate}
          onChange={(v) => setROIParams({ discountRate: v })}
          min={0.04}
          max={0.15}
          step={0.01}
          format={formatPercent}
          unit="%"
          description="Discount rate for Net Present Value calculations"
        />
      </Section>

      <Section title="Strategic Goals" icon={<Building2 className="h-4 w-4" />} defaultOpen={false}>
        <ToggleInput
          label="Pursuing Magnet Status"
          checked={roiParams.pursuingMagnet}
          onChange={(v) => setROIParams({ pursuingMagnet: v })}
          description="Include Magnet designation revenue benefits in ROI calculations"
        />
        <ToggleInput
          label="Already Magnet Designated"
          checked={roiParams.hasMagnetStatus}
          onChange={(v) => setROIParams({ hasMagnetStatus: v })}
          description="Already achieved Magnet status (affects calculations)"
        />
      </Section>

      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-400">
          <strong className="text-slate-300">Note:</strong> These inputs customize ROI calculations
          for your organization. Default values are based on national averages and peer-reviewed research.
          Adjust these to match your specific situation for more accurate projections.
        </p>
      </div>
    </div>
  )
}
