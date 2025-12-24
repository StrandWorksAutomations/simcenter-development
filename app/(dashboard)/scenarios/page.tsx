"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Building2,
  MapPin,
  Layers,
  DollarSign,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart3,
  Table2,
  Info,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  ExternalLink
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart
} from "recharts"
import {
  STRATEGIC_SCENARIOS,
  SCENARIO_COMPARISON,
  DATA_SOURCES,
  getYearlyComparisonData,
  getCumulativeCostData,
  getRecommendation,
  SENSITIVITY_SCENARIOS,
  calculateSensitivity,
  type StrategicScenario
} from "@/data/seed/strategic-scenarios"

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

function formatCurrencyFull(value: number): string {
  return `$${value.toLocaleString()}`
}

// =============================================================================
// CHART COLORS
// =============================================================================

const COLORS = {
  main: '#3b82f6',      // blue
  hamburg: '#10b981',   // green
  hybrid: '#f59e0b',    // amber
  capex: '#8b5cf6',     // purple
  opex: '#06b6d4'       // cyan
}

// =============================================================================
// SCENARIO CARD COMPONENT
// =============================================================================

function ScenarioCard({
  scenario,
  isSelected,
  onSelect
}: {
  scenario: StrategicScenario
  isSelected: boolean
  onSelect: () => void
}) {
  const iconMap = {
    'main-campus': Building2,
    'hamburg': MapPin,
    'hybrid': Layers
  }
  const Icon = iconMap[scenario.id]

  const badgeVariant = {
    'recommended': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'alternative': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'premium': 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }

  return (
    <Card
      className={`bg-slate-800/50 border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 shadow-lg shadow-blue-500/20'
          : 'border-slate-700 hover:border-slate-600'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
              <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>
            <div>
              <CardTitle className="text-white text-lg">{scenario.name}</CardTitle>
              <CardDescription className="text-slate-400 text-xs mt-1">
                {scenario.summary.squareFootage.toLocaleString()} sq ft | {scenario.summary.manikinCount} manikins
              </CardDescription>
            </div>
          </div>
          <Badge className={badgeVariant[scenario.recommendation]}>
            {scenario.recommendation === 'recommended' ? 'Recommended' :
             scenario.recommendation === 'alternative' ? 'Growth Option' : 'Phased'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-300">{scenario.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-xs text-slate-500">CAPEX</div>
            <div className="text-lg font-bold text-white">{formatCurrency(scenario.summary.initialCapex)}</div>
          </div>
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-xs text-slate-500">5-Year OPEX</div>
            <div className="text-lg font-bold text-white">{formatCurrency(scenario.summary.totalFiveYearOpex)}</div>
          </div>
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-xs text-slate-500">5-Year Total</div>
            <div className="text-lg font-bold text-emerald-400">{formatCurrency(scenario.summary.fiveYearCumulativeCost)}</div>
          </div>
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-xs text-slate-500">Time to Open</div>
            <div className="text-lg font-bold text-white">{scenario.summary.timeToOperational}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// PROS/CONS COMPONENT
// =============================================================================

function ProsCons({ scenario }: { scenario: StrategicScenario }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {scenario.pros.map((pro, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-emerald-400 mt-1">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-red-500/5 border-red-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-400 text-sm flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {scenario.cons.map((con, i) => (
              <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">-</span>
                {con}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================================================================
// CAPEX BREAKDOWN TABLE
// =============================================================================

function CapexBreakdown({ scenario }: { scenario: StrategicScenario }) {
  const categoryColors: Record<string, string> = {
    'construction': 'text-cyan-400',
    'equipment': 'text-amber-400',
    'technology': 'text-purple-400',
    'soft-costs': 'text-slate-400',
    'contingency': 'text-red-400',
    'credit': 'text-emerald-400'
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-blue-400" />
          Capital Expenditure Breakdown
        </CardTitle>
        <CardDescription>One-time costs for {scenario.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-slate-400 font-medium">Item</th>
                <th className="text-right py-2 text-slate-400 font-medium">Amount</th>
                <th className="text-left py-2 text-slate-400 font-medium pl-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {scenario.capex.map((item) => (
                <tr key={item.id} className="border-b border-slate-700/50">
                  <td className={`py-2 ${categoryColors[item.category]}`}>{item.name}</td>
                  <td className="text-right py-2 text-white font-mono">{formatCurrencyFull(item.amount)}</td>
                  <td className="py-2 text-slate-500 text-xs pl-4">{item.notes}</td>
                </tr>
              ))}
              <tr className="bg-slate-700/30">
                <td className="py-2 font-bold text-white">Total CAPEX</td>
                <td className="text-right py-2 font-bold text-white font-mono">{formatCurrencyFull(scenario.capexTotal)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {scenario.capexNotes.length > 0 && (
          <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-400 font-medium mb-2">Notes:</p>
            <ul className="text-xs text-slate-500 space-y-1">
              {scenario.capexNotes.map((note, i) => (
                <li key={i}>• {note}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// =============================================================================
// OPEX TABLE
// =============================================================================

function OpexTable({ scenario }: { scenario: StrategicScenario }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          5-Year Operating Expenses
        </CardTitle>
        <CardDescription>Annual recurring costs for {scenario.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-slate-400 font-medium">Category</th>
                {scenario.opex.map(y => (
                  <th key={y.year} className="text-right py-2 text-slate-400 font-medium">Year {y.year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-purple-400">Personnel</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.personnel)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-amber-400">Maintenance</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.maintenance)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-cyan-400">Supplies</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.supplies)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-pink-400">Standardized Patients</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.standardizedPatients)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-emerald-400">Facilities</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.facilities)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-blue-400">IT/Software</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.itSoftware)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700/50">
                <td className="py-2 text-red-400">Contingency</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 text-white font-mono text-xs">{formatCurrency(y.contingency)}</td>
                ))}
              </tr>
              <tr className="bg-slate-700/30">
                <td className="py-2 font-bold text-white">Total</td>
                {scenario.opex.map(y => (
                  <td key={y.year} className="text-right py-2 font-bold text-white font-mono">{formatCurrency(y.total)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// COMPARISON CHARTS
// =============================================================================

function ComparisonCharts() {
  const cumulativeData = getCumulativeCostData()
  const yearlyData = getYearlyComparisonData()

  // Stacked bar data for CAPEX + OPEX by year
  const stackedData = yearlyData.map(y => ({
    year: `Year ${y.year}`,
    'Main CAPEX': y.mainCapex,
    'Main OPEX': y.mainOpex,
    'Hamburg CAPEX': y.hamburgCapex,
    'Hamburg OPEX': y.hamburgOpex,
    'Hybrid CAPEX': y.hybridCapex,
    'Hybrid OPEX': y.hybridOpex
  }))

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Cumulative Cost Over Time */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Cumulative Cost Over Time</CardTitle>
          <CardDescription>Total investment by scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `Yr ${v}`} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                  formatter={(value: number) => [formatCurrencyFull(value), '']}
                />
                <Legend />
                <Line type="monotone" dataKey="main" name="Main Campus" stroke={COLORS.main} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hamburg" name="Hamburg" stroke={COLORS.hamburg} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hybrid" name="Hybrid" stroke={COLORS.hybrid} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 5-Year Total Comparison */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">5-Year Total Cost Comparison</CardTitle>
          <CardDescription>CAPEX vs OPEX by scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Main Campus', capex: 6300000, opex: 2380000 },
                { name: 'Hamburg', capex: 7500000, opex: 2230000 },
                { name: 'Hybrid', capex: 10000000, opex: 2274000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#f1f5f9' }}
                  formatter={(value: number) => [formatCurrencyFull(value), '']}
                />
                <Legend />
                <Bar dataKey="capex" name="CAPEX" fill={COLORS.capex} stackId="a" />
                <Bar dataKey="opex" name="OPEX (5-Year)" fill={COLORS.opex} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================================================================
// SENSITIVITY ANALYSIS
// =============================================================================

function SensitivityAnalysis({ scenario }: { scenario: StrategicScenario }) {
  const sensitivityResults = SENSITIVITY_SCENARIOS.map(s => ({
    scenario: s.name,
    ...calculateSensitivity(scenario, s),
    description: s.description
  }))

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          Sensitivity Analysis: {scenario.shortName}
        </CardTitle>
        <CardDescription>Impact of cost variations on total investment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-slate-400 font-medium">Scenario</th>
                <th className="text-right py-2 text-slate-400 font-medium">Adjusted CAPEX</th>
                <th className="text-right py-2 text-slate-400 font-medium">Adjusted OPEX</th>
                <th className="text-right py-2 text-slate-400 font-medium">5-Year Total</th>
                <th className="text-right py-2 text-slate-400 font-medium">Delta</th>
              </tr>
            </thead>
            <tbody>
              {sensitivityResults.map((result, i) => {
                const baseline = scenario.summary.fiveYearCumulativeCost
                const delta = result.adjustedTotal - baseline
                const deltaPercent = ((delta / baseline) * 100).toFixed(1)
                return (
                  <tr key={i} className={`border-b border-slate-700/50 ${result.scenario === 'Base Case' ? 'bg-slate-700/20' : ''}`}>
                    <td className="py-2 text-white">
                      {result.scenario}
                      <span className="text-xs text-slate-500 block">{result.description}</span>
                    </td>
                    <td className="text-right py-2 text-white font-mono">{formatCurrency(result.adjustedCapex)}</td>
                    <td className="text-right py-2 text-white font-mono">{formatCurrency(result.adjustedOpex)}</td>
                    <td className="text-right py-2 text-white font-mono font-bold">{formatCurrency(result.adjustedTotal)}</td>
                    <td className={`text-right py-2 font-mono ${delta > 0 ? 'text-red-400' : delta < 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {delta > 0 ? '+' : ''}{formatCurrency(delta)} ({deltaPercent}%)
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// DATA SOURCES COMPONENT
// =============================================================================

function DataSourcesPanel() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-blue-400" />
          Data Sources & Benchmarks
        </CardTitle>
        <CardDescription>Industry data supporting these estimates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-700/30">
            <h4 className="text-sm font-medium text-slate-300">Construction Costs</h4>
            <p className="text-xs text-slate-500 mt-1">{DATA_SOURCES.construction.benchmark}</p>
            <p className="text-xs text-blue-400 mt-1">{DATA_SOURCES.construction.source}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/30">
            <h4 className="text-sm font-medium text-slate-300">High-Fidelity Manikins</h4>
            <p className="text-xs text-slate-500 mt-1">{DATA_SOURCES.manikins.benchmark}</p>
            <p className="text-xs text-blue-400 mt-1">{DATA_SOURCES.manikins.source}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/30">
            <h4 className="text-sm font-medium text-slate-300">AV Systems</h4>
            <p className="text-xs text-slate-500 mt-1">{DATA_SOURCES.avSystems.benchmark}</p>
            <p className="text-xs text-blue-400 mt-1">{DATA_SOURCES.avSystems.source}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-700/30">
            <h4 className="text-sm font-medium text-slate-300">Maintenance Costs</h4>
            <p className="text-xs text-slate-500 mt-1">{DATA_SOURCES.maintenance.benchmark}</p>
            <p className="text-xs text-blue-400 mt-1">{DATA_SOURCES.maintenance.source}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2">Comparable Projects</h4>
          <div className="grid md:grid-cols-3 gap-2">
            {DATA_SOURCES.comparables.map((comp, i) => (
              <div key={i} className="p-2 rounded bg-slate-700/20 text-xs">
                <div className="font-medium text-white">{comp.name}</div>
                <div className="text-slate-400">{comp.sqft.toLocaleString()} sq ft | {formatCurrency(comp.cost)}</div>
                <div className="text-slate-500">{comp.type}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function ScenariosPage() {
  const [selectedScenario, setSelectedScenario] = useState<StrategicScenario>(STRATEGIC_SCENARIOS[0])

  // Get recommendation based on default criteria
  const recommendation = useMemo(() => getRecommendation({
    budgetConstrained: true,
    needImmediateCapability: true,
    expectHighGrowth: false,
    externalPartnershipsImportant: false
  }), [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">5-Year Strategic Scenarios</h1>
          <p className="text-slate-400">Compare development options for the Simulation Center</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Lightbulb className="h-3 w-3" />
          Prompt 16 Analysis
        </Badge>
      </div>

      {/* Recommendation Banner */}
      <Card className="bg-emerald-500/10 border-emerald-500/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-emerald-400">
                Recommended: {recommendation.primary.name}
              </h3>
              <ul className="mt-2 space-y-1">
                {recommendation.rationale.map((r, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 text-emerald-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">
                {formatCurrency(recommendation.primary.summary.fiveYearCumulativeCost)}
              </div>
              <div className="text-xs text-slate-400">5-Year Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection Cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        {STRATEGIC_SCENARIOS.map(scenario => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isSelected={selectedScenario.id === scenario.id}
            onSelect={() => setSelectedScenario(scenario)}
          />
        ))}
      </div>

      {/* Comparison Charts */}
      <ComparisonCharts />

      {/* Tabs for detailed view */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="details" className="data-[state=active]:bg-slate-700">
            <Table2 className="h-4 w-4 mr-2" />
            Detailed Budget
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Pros & Cons
          </TabsTrigger>
          <TabsTrigger value="sensitivity" className="data-[state=active]:bg-slate-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Sensitivity
          </TabsTrigger>
          <TabsTrigger value="sources" className="data-[state=active]:bg-slate-700">
            <Info className="h-4 w-4 mr-2" />
            Data Sources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <CapexBreakdown scenario={selectedScenario} />
          <OpexTable scenario={selectedScenario} />
        </TabsContent>

        <TabsContent value="comparison">
          <ProsCons scenario={selectedScenario} />
          <Card className="bg-slate-800/50 border-slate-700 mt-4">
            <CardHeader>
              <CardTitle className="text-white text-base">Strategic Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedScenario.strategicFactors.map((factor, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensitivity">
          <SensitivityAnalysis scenario={selectedScenario} />
        </TabsContent>

        <TabsContent value="sources">
          <DataSourcesPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
