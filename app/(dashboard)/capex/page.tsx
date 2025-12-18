"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  DollarSign,
  Building2,
  Settings2,
  TrendingUp,
  Calculator,
  Layers,
  CheckCircle2,
  BarChart3,
  Info
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import {
  costCategories,
  benchmarkMetrics,
  predefinedScenarios,
  existingAssets,
  calculateCAPEX,
  getTotalExistingAssets,
  type ProjectParameters
} from "@/data/seed/capex-model"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

export default function CAPEXPage() {
  // Editable parameters
  const [params, setParams] = useState<ProjectParameters>({
    floorArea: 4000,
    simRooms: 3,
    controlRooms: 1,
    debriefRooms: 2,
    supportSpaces: 3,
    constructionType: 'hospital-renovation',
    costRegion: 'moderate-cost',
    qualityLevel: 'standard'
  })

  // Calculate costs based on current parameters
  const capex = useMemo(() => calculateCAPEX(params), [params])
  const existingAssetsTotal = getTotalExistingAssets()
  const netInvestment = capex.totalProjectCost - existingAssetsTotal

  // Chart data
  const categoryChartData = capex.lineItems.map((item, i) => ({
    name: item.categoryName.split(' ')[0], // Short name
    fullName: item.categoryName,
    value: item.calculatedCost,
    fill: COLORS[i % COLORS.length]
  }))

  const scenarioComparisonData = predefinedScenarios.map(scenario => {
    const calc = calculateCAPEX(scenario.parameters)
    return {
      name: scenario.name,
      total: calc.totalProjectCost,
      perRoom: calc.costPerRoom,
      perSF: calc.costPerSF
    }
  })

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-400" />
            CAPEX Cost Model
          </h1>
          <p className="text-slate-400">
            Parameterized capital expenditure calculator for simulation center planning
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
          Capital Planning
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Project Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(capex.totalProjectCost)}</div>
            <p className="text-xs text-slate-500">Gross estimate</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Existing Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">-{formatCurrency(existingAssetsTotal)}</div>
            <p className="text-xs text-slate-500">Equipment already owned</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 border-2 border-blue-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Net Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{formatCurrency(netInvestment)}</div>
            <p className="text-xs text-slate-500">New capital required</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Cost per SF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${capex.costPerSF}</div>
            <p className="text-xs text-slate-500">Industry: $300-$600</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Cost per Room</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(capex.costPerRoom)}</div>
            <p className="text-xs text-slate-500">Industry avg: $500K</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="calculator" className="data-[state=active]:bg-slate-700">
            <Settings2 className="h-4 w-4 mr-2" />
            Calculator
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="data-[state=active]:bg-slate-700">
            <Layers className="h-4 w-4 mr-2" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-slate-700">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Existing Assets
          </TabsTrigger>
        </TabsList>

        {/* Calculator Tab */}
        <TabsContent value="calculator">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Parameter Controls */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Project Parameters</CardTitle>
                <CardDescription className="text-slate-400">
                  Adjust values to see cost impact in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Floor Area */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-slate-300">Floor Area</label>
                    <span className="text-sm font-medium text-white">{params.floorArea.toLocaleString()} SF</span>
                  </div>
                  <Slider
                    value={[params.floorArea]}
                    onValueChange={([v]) => setParams({ ...params, floorArea: v })}
                    min={2000}
                    max={10000}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>2,000 SF</span>
                    <span>10,000 SF</span>
                  </div>
                </div>

                {/* Sim Rooms */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-slate-300">Simulation Rooms</label>
                    <span className="text-sm font-medium text-white">{params.simRooms} rooms</span>
                  </div>
                  <Slider
                    value={[params.simRooms]}
                    onValueChange={([v]) => setParams({ ...params, simRooms: v })}
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 room</span>
                    <span>8 rooms</span>
                  </div>
                </div>

                {/* Construction Type */}
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Construction Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setParams({ ...params, constructionType: 'hospital-renovation' })}
                      className={`p-3 rounded-lg border transition-colors ${
                        params.constructionType === 'hospital-renovation'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Building2 className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Hospital Renovation</div>
                      <div className="text-xs opacity-70">+25% multiplier</div>
                    </button>
                    <button
                      onClick={() => setParams({ ...params, constructionType: 'clean-shell' })}
                      className={`p-3 rounded-lg border transition-colors ${
                        params.constructionType === 'clean-shell'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <Layers className="h-5 w-5 mx-auto mb-1" />
                      <div className="text-sm font-medium">Clean Shell</div>
                      <div className="text-xs opacity-70">No multiplier</div>
                    </button>
                  </div>
                </div>

                {/* Quality Level */}
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Quality Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['budget', 'standard', 'premium'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setParams({ ...params, qualityLevel: level })}
                        className={`p-2 rounded-lg border transition-colors ${
                          params.qualityLevel === level
                            ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                            : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-sm font-medium capitalize">{level}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region */}
                <div>
                  <label className="text-sm text-slate-300 block mb-2">Cost Region</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setParams({ ...params, costRegion: 'low-cost' })}
                      className={`p-2 rounded-lg border transition-colors ${
                        params.costRegion === 'low-cost'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-sm font-medium">Low Cost</div>
                      <div className="text-xs opacity-70">-15%</div>
                    </button>
                    <button
                      onClick={() => setParams({ ...params, costRegion: 'moderate-cost' })}
                      className={`p-2 rounded-lg border transition-colors ${
                        params.costRegion === 'moderate-cost'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-sm font-medium">Moderate</div>
                      <div className="text-xs opacity-70">KY baseline</div>
                    </button>
                    <button
                      onClick={() => setParams({ ...params, costRegion: 'high-cost' })}
                      className={`p-2 rounded-lg border transition-colors ${
                        params.costRegion === 'high-cost'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="text-sm font-medium">High Cost</div>
                      <div className="text-xs opacity-70">+30%</div>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Distribution Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cost Distribution</CardTitle>
                <CardDescription className="text-slate-400">
                  Breakdown by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                        labelLine={false}
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value, entry: any) => (
                          <span style={{ color: '#cbd5e1' }}>{entry.payload.fullName}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Breakdown Tab */}
        <TabsContent value="breakdown">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Cost Breakdown</CardTitle>
              <CardDescription className="text-slate-400">
                All 7 CAPEX categories with calculation basis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capex.lineItems.map((item, i) => (
                  <div key={item.categoryId} className="p-4 rounded-lg bg-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <div>
                          <h3 className="font-semibold text-white">{item.categoryName}</h3>
                          <p className="text-sm text-slate-400">{item.basis}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{formatCurrency(item.calculatedCost)}</p>
                        <p className="text-xs text-slate-500">
                          {((item.calculatedCost / capex.totalProjectCost) * 100).toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-slate-800/50">
                      <p className="text-xs text-slate-400 flex items-start gap-1">
                        <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {item.notes}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Contingency */}
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-amber-400">Contingency (5%)</h3>
                      <p className="text-sm text-slate-400">Reserve for unforeseen conditions</p>
                    </div>
                    <p className="text-xl font-bold text-amber-400">{formatCurrency(capex.contingency)}</p>
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-blue-400">TOTAL PROJECT COST</h3>
                      <p className="text-sm text-slate-400">All categories + contingency</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{formatCurrency(capex.totalProjectCost)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Scenario Comparison</CardTitle>
                <CardDescription className="text-slate-400">
                  Pre-defined build options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenarioComparisonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis
                        type="number"
                        tickFormatter={(v) => formatCurrency(v)}
                        stroke="#94a3b8"
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="total" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Scenario Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Click to apply parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predefinedScenarios.map((scenario) => {
                    const calc = calculateCAPEX(scenario.parameters)
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => setParams(scenario.parameters)}
                        className="w-full p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-left"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{scenario.name}</h3>
                            <p className="text-sm text-slate-400">{scenario.description}</p>
                          </div>
                          <p className="font-bold text-emerald-400">{formatCurrency(calc.totalProjectCost)}</p>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span>{scenario.parameters.floorArea.toLocaleString()} SF</span>
                          <span>{scenario.parameters.simRooms} rooms</span>
                          <span className="capitalize">{scenario.parameters.qualityLevel}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Existing Assets Tab */}
        <TabsContent value="assets">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  Existing Assets
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Equipment and resources already owned by BHL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingAssets.map((asset) => (
                    <div key={asset.description} className="p-4 rounded-lg bg-slate-700/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{asset.description}</h3>
                          <Badge className="mt-1 bg-slate-600 text-slate-200">
                            {costCategories.find(c => c.id === asset.categoryId)?.name || asset.categoryId}
                          </Badge>
                        </div>
                        <p className="font-bold text-emerald-400">{formatCurrency(asset.estimatedValue)}</p>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-emerald-400">Total Existing Assets</h3>
                        <p className="text-sm text-slate-400">Credit toward project</p>
                      </div>
                      <p className="text-xl font-bold text-emerald-400">{formatCurrency(existingAssetsTotal)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Net Investment Calculation</CardTitle>
                <CardDescription className="text-slate-400">
                  Actual new capital required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Gross Project Cost</span>
                      <span className="font-bold text-white">{formatCurrency(capex.totalProjectCost)}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Less: Existing Assets</span>
                      <span className="font-bold text-emerald-400">-{formatCurrency(existingAssetsTotal)}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-600 pt-4">
                    <div className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-blue-400">Net New Investment</h3>
                          <p className="text-sm text-slate-400">Capital to be raised/approved</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">{formatCurrency(netInvestment)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-700/30">
                    <h4 className="font-medium text-slate-300 mb-2">Savings from Existing Assets</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-600 rounded-full h-3">
                        <div
                          className="bg-emerald-500 h-3 rounded-full"
                          style={{ width: `${(existingAssetsTotal / capex.totalProjectCost) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-emerald-400">
                        {((existingAssetsTotal / capex.totalProjectCost) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Industry Benchmarks */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            Industry Benchmarks
          </CardTitle>
          <CardDescription className="text-slate-400">
            How this estimate compares to industry standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {benchmarkMetrics.map((metric) => {
              const currentValue = metric.id === 'total-cost-per-sf' ? capex.costPerSF :
                                   metric.id === 'cost-per-room' ? capex.costPerRoom :
                                   ((capex.lineItems.find(l => l.categoryId === 'simulators')?.calculatedCost || 0) / capex.totalProjectCost) * 100

              const position = ((currentValue - metric.lowValue) / (metric.highValue - metric.lowValue)) * 100
              const clampedPosition = Math.max(0, Math.min(100, position))

              return (
                <div key={metric.id} className="p-4 rounded-lg bg-slate-700/50">
                  <h4 className="font-medium text-white mb-1">{metric.name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{metric.description}</p>

                  <div className="relative mb-2">
                    <div className="h-2 bg-slate-600 rounded-full">
                      <div
                        className="absolute h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div
                      className="absolute w-3 h-3 bg-white rounded-full border-2 border-blue-500 -top-0.5 transform -translate-x-1/2"
                      style={{ left: `${clampedPosition}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{metric.unit === '%' ? `${metric.lowValue}%` : formatCurrency(metric.lowValue)}</span>
                    <span className="font-medium text-blue-400">
                      {metric.unit === '%' ? `${currentValue.toFixed(0)}%` : formatCurrency(currentValue)}
                    </span>
                    <span>{metric.unit === '%' ? `${metric.highValue}%` : formatCurrency(metric.highValue)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
