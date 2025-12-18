"use client"

import { Slider } from "@/components/ui/slider"

interface LabeledSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  format?: (value: number) => string
  onChange: (value: number) => void
  description?: string
  disabled?: boolean
}

export function LabeledSlider({
  label,
  value,
  min,
  max,
  step,
  format = (v) => v.toString(),
  onChange,
  description,
  disabled = false
}: LabeledSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <span className="text-sm font-semibold text-white tabular-nums">
          {format(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        disabled={disabled}
        className="[&_[data-slot=slider-track]]:bg-slate-700 [&_[data-slot=slider-range]]:bg-blue-500 [&_[data-slot=slider-thumb]]:border-blue-500"
      />
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}

// Button group for selecting from options
interface OptionButtonGroupProps<T extends string> {
  label: string
  value: T
  options: Array<{ value: T; label: string }>
  onChange: (value: T) => void
  description?: string
}

export function OptionButtonGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  description
}: OptionButtonGroupProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              value === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {description && (
        <p className="text-xs text-slate-500">{description}</p>
      )}
    </div>
  )
}

// Toggle switch for binary options
interface ToggleSwitchProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  trueLabel?: string
  falseLabel?: string
}

export function ToggleSwitch({
  label,
  value,
  onChange,
  trueLabel = 'On',
  falseLabel = 'Off'
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="flex bg-slate-700 rounded-lg p-0.5">
        <button
          onClick={() => onChange(false)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            !value ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          {falseLabel}
        </button>
        <button
          onClick={() => onChange(true)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            value ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          {trueLabel}
        </button>
      </div>
    </div>
  )
}
