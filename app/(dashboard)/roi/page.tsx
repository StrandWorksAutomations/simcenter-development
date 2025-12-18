"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Heart } from "lucide-react"

// ROI data from planning document
const outcomes = [
  { metric: "CLABSI Reduction", before: "3.20", after: "0.50", unit: "per 1000 line-days", improvement: "84%" },
  { metric: "New Grad Retention", before: "75%", after: "90%+", unit: "first-year", improvement: "+15%" },
  { metric: "Code Blue Survival", before: "Baseline", after: "Improved", unit: "rate", improvement: "TBD" },
  { metric: "OR Error Rate", before: "Baseline", after: "Reduced", unit: "incidents", improvement: "TBD" },
]

const costAvoidance = [
  { item: "Turnover Reduction", description: "Reducing turnover from 18% to 12%", annualSavings: 150000 },
  { item: "CLABSI Prevention", description: "~$45K per infection avoided", annualSavings: 135000 },
  { item: "Reduced Training Time", description: "Faster competency achievement", annualSavings: 50000 },
  { item: "Error Prevention", description: "Avoided adverse events", annualSavings: 100000 },
]

const totalSavings = costAvoidance.reduce((sum, c) => sum + c.annualSavings, 0)

export default function ROIPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ROI & Outcomes</h1>
          <p className="text-slate-500">Return on investment and measurable impact projections</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$550K</div>
            <p className="text-xs text-slate-500">Phase 1 CAPEX</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Est. Annual Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(totalSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-slate-500">Cost avoidance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Break-Even</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~18 mo</div>
            <p className="text-xs text-slate-500">Estimated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">5-Year ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">~250%</div>
            <p className="text-xs text-slate-500">Projected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Quality & Safety Outcomes
            </CardTitle>
            <CardDescription>Measurable improvements from simulation training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {outcomes.map((outcome) => (
                <div key={outcome.metric} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{outcome.metric}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {outcome.improvement}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Before: </span>
                      <span className="font-medium">{outcome.before}</span>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div>
                      <span className="text-slate-500">After: </span>
                      <span className="font-medium text-green-600">{outcome.after}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{outcome.unit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Cost Avoidance
            </CardTitle>
            <CardDescription>Projected annual savings from simulation program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costAvoidance.map((item) => (
                <div key={item.item} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{item.item}</p>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <p className="font-semibold text-green-600">${item.annualSavings.toLocaleString()}</p>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between">
                <span className="font-semibold">Total Annual Savings</span>
                <span className="font-bold text-lg text-green-600">${totalSavings.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>5-Year Projection Calculator</CardTitle>
          <CardDescription>Interactive ROI modeling with adjustable parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Interactive ROI calculator coming soon</p>
              <p className="text-sm">Sliders for turnover rates, incident costs, and training volume</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
