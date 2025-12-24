"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Settings2,
  RotateCcw,
  Info,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  Database
} from "lucide-react"
import { useSimulationStore, useROIParams } from "@/store/simulation-store"
import { DEFAULT_ROI_PARAMS } from "@/data/seed/budget-simulator"
import { useState } from "react"

// Industry benchmark sources for generic data
const DATA_SOURCES = {
  turnoverRate: {
    source: "NSI Nursing Solutions 2025",
    url: "https://www.nsinursingsolutions.com/Documents/Library/NSI_National_Health_Care_Retention_Report.pdf",
    note: "National average RN turnover is 18.4%"
  },
  turnoverCost: {
    source: "NSI Nursing Solutions 2025",
    url: "https://www.nsinursingsolutions.com/Documents/Library/NSI_National_Health_Care_Retention_Report.pdf",
    note: "Average cost to replace one RN: $52,100-$64,500"
  },
  codeBlueSurvival: {
    source: "AHRQ 2022",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7769772/",
    note: "National average in-hospital cardiac arrest survival ~21%"
  },
  clabsiRate: {
    source: "CDC NHSN 2024",
    url: "https://www.cdc.gov/nhsn/",
    note: "National average CLABSI rate varies by ICU type"
  },
  clabsiCost: {
    source: "CDC HAI Cost Analysis 2024",
    url: "https://www.cdc.gov/hai/data/portal/",
    note: "Average excess cost per CLABSI: $25,000-$50,000"
  }
}

interface DataSourceBadgeProps {
  sourceKey: keyof typeof DATA_SOURCES
}

function DataSourceBadge({ sourceKey }: DataSourceBadgeProps) {
  const source = DATA_SOURCES[sourceKey]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className="ml-2 text-[10px] border-amber-500/50 text-amber-400 cursor-help flex items-center gap-1"
        >
          <Database className="h-2.5 w-2.5" />
          Industry Default
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-slate-800 border-slate-700 p-3">
        <p className="font-medium text-amber-400 text-sm">{source.source}</p>
        <p className="text-xs text-slate-300 mt-1">{source.note}</p>
        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 mt-2"
          >
            View Source <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

export function ROIInputsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const roiParams = useROIParams()
  const { setROIParams, resetROIParams } = useSimulationStore()

  const handleChange = (field: string, value: number | boolean) => {
    setROIParams({ [field]: value })
  }

  const isDefault = (field: keyof typeof DEFAULT_ROI_PARAMS, currentValue: number | boolean) => {
    return currentValue === DEFAULT_ROI_PARAMS[field]
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <CollapsibleTrigger className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-blue-400" />
              <div className="text-left">
                <CardTitle className="text-white text-base">ROI Calculation Inputs</CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Customize with your organization's data
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                {isOpen ? "Click to collapse" : "Click to expand"}
              </Badge>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6 pt-4">
            {/* Info Banner */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-200 font-medium">Using Industry Defaults</p>
                <p className="text-xs text-amber-200/70 mt-1">
                  Values marked with <Database className="h-3 w-3 inline" /> are generic industry benchmarks.
                  Replace with your organization's actual data for accurate projections.
                </p>
              </div>
            </div>

            {/* Workforce Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-2">
                Workforce Data
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Total RNs</Label>
                    {isDefault('totalRNs', roiParams.totalRNs) && (
                      <DataSourceBadge sourceKey="turnoverRate" />
                    )}
                  </div>
                  <Input
                    type="number"
                    value={roiParams.totalRNs}
                    onChange={(e) => handleChange('totalRNs', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500">Number of RNs in your organization</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Current Turnover Rate</Label>
                    {isDefault('currentTurnoverRate', roiParams.currentTurnoverRate) && (
                      <DataSourceBadge sourceKey="turnoverRate" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[roiParams.currentTurnoverRate * 100]}
                      onValueChange={([v]) => handleChange('currentTurnoverRate', v / 100)}
                      min={5}
                      max={40}
                      step={0.5}
                      className="flex-1"
                    />
                    <span className="text-white font-mono w-14 text-right">
                      {(roiParams.currentTurnoverRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Avg RN Turnover Cost</Label>
                    {isDefault('avgRNTurnoverCost', roiParams.avgRNTurnoverCost) && (
                      <DataSourceBadge sourceKey="turnoverCost" />
                    )}
                  </div>
                  <Input
                    type="number"
                    value={roiParams.avgRNTurnoverCost}
                    onChange={(e) => handleChange('avgRNTurnoverCost', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500">Cost to replace one RN (recruitment + training)</p>
                </div>
              </div>
            </div>

            {/* Clinical Outcomes Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-2">
                Clinical Outcomes
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Annual Code Blue Events</Label>
                  </div>
                  <Input
                    type="number"
                    value={roiParams.annualCodeBlueEvents}
                    onChange={(e) => handleChange('annualCodeBlueEvents', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Current Code Blue Survival</Label>
                    {isDefault('currentCodeBlueSurvival', roiParams.currentCodeBlueSurvival) && (
                      <DataSourceBadge sourceKey="codeBlueSurvival" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[roiParams.currentCodeBlueSurvival * 100]}
                      onValueChange={([v]) => handleChange('currentCodeBlueSurvival', v / 100)}
                      min={10}
                      max={50}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-white font-mono w-14 text-right">
                      {(roiParams.currentCodeBlueSurvival * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Annual Medication Errors</Label>
                  <Input
                    type="number"
                    value={roiParams.annualMedicationErrors}
                    onChange={(e) => handleChange('annualMedicationErrors', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Avg Medication Error Cost</Label>
                  <Input
                    type="number"
                    value={roiParams.avgMedicationErrorCost}
                    onChange={(e) => handleChange('avgMedicationErrorCost', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Infection Prevention Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-2">
                Infection Prevention
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">CLABSI Rate</Label>
                    {isDefault('annualCLABSIRate', roiParams.annualCLABSIRate) && (
                      <DataSourceBadge sourceKey="clabsiRate" />
                    )}
                  </div>
                  <Input
                    type="number"
                    step="0.1"
                    value={roiParams.annualCLABSIRate}
                    onChange={(e) => handleChange('annualCLABSIRate', parseFloat(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500">Per 1,000 central line days</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Central Line Days</Label>
                  <Input
                    type="number"
                    value={roiParams.centralLineDays}
                    onChange={(e) => handleChange('centralLineDays', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                  <p className="text-xs text-slate-500">Annual total</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-slate-400">Avg CLABSI Cost</Label>
                    {isDefault('avgCLABSICost', roiParams.avgCLABSICost) && (
                      <DataSourceBadge sourceKey="clabsiCost" />
                    )}
                  </div>
                  <Input
                    type="number"
                    value={roiParams.avgCLABSICost}
                    onChange={(e) => handleChange('avgCLABSICost', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Financial Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300 border-b border-slate-700 pb-2">
                Financial & Strategic
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Annual Malpractice Premium</Label>
                  <Input
                    type="number"
                    value={roiParams.malpracticePremium}
                    onChange={(e) => handleChange('malpracticePremium', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Annual Discharges</Label>
                  <Input
                    type="number"
                    value={roiParams.annualDischarges}
                    onChange={(e) => handleChange('annualDischarges', parseInt(e.target.value) || 0)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                  <div>
                    <Label className="text-sm text-slate-300">Pursuing Magnet Status</Label>
                    <p className="text-xs text-slate-500">+$115/discharge if achieved</p>
                  </div>
                  <Switch
                    checked={roiParams.pursuingMagnet}
                    onCheckedChange={(checked) => handleChange('pursuingMagnet', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-400">Discount Rate (NPV)</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[roiParams.discountRate * 100]}
                      onValueChange={([v]) => handleChange('discountRate', v / 100)}
                      min={3}
                      max={15}
                      step={0.5}
                      className="flex-1"
                    />
                    <span className="text-white font-mono w-14 text-right">
                      {(roiParams.discountRate * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-end pt-2 border-t border-slate-700">
              <Button
                variant="outline"
                size="sm"
                onClick={resetROIParams}
                className="border-slate-600 text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Industry Defaults
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
