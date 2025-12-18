"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Building2,
  Package,
  Users,
  Activity,
  Settings2,
  TrendingUp,
  Calculator,
  PieChart as PieChartIcon,
  BarChart3,
  Layers
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend as RechartsLegend,
  AreaChart,
  Area
} from "recharts"

import { SliderGroup, MetricCard, LineItemRow } from "@/components/budget/slider-group"
import { LabeledSlider, OptionButtonGroup, ToggleSwitch } from "@/components/budget/labeled-slider"
import { ExportMenu } from "@/components/budget/export-menu"
import { SaveIndicator } from "@/components/budget/save-indicator"
import { VendorBidMenu } from "@/components/budget/vendor-bid-menu"
import { ROISummaryCards, ROIConfidenceBar } from "@/components/budget/roi-summary"
import { ROICategoryBreakdown } from "@/components/budget/roi-category-breakdown"
import { ROIAssetTable } from "@/components/budget/roi-asset-table"
import { ROITimelineChart, ROIComparisonBars } from "@/components/budget/roi-timeline-chart"
import { ROIInputsPanel } from "@/components/budget/roi-inputs"
import {
  SimulatorParameters,
  predefinedScenarios,
  formatCurrency,
  formatCurrencyFull,
  compareScenarios
} from "@/data/seed/budget-simulator"
import { useSimulationStore } from "@/store/simulation-store"

// Chart colors
const COLORS = {
  capex: '#3b82f6',    // blue
  opex: '#10b981',     // green
  staffing: '#8b5cf6', // purple
  equipment: '#f59e0b', // amber
  construction: '#06b6d4', // cyan
  maintenance: '#ef4444', // red
  software: '#ec4899',  // pink
  other: '#6b7280'     // gray
}

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4899', '#ef4444', '#6b7280']

export default function BudgetSimulatorPage() {
  // Get state and actions from store
  const { params, results, setParams, applyPredefinedScenario, currentScenarioName } = useSimulationStore()

  // Scenario comparison
  const scenarioComparison = useMemo(
    () => compareScenarios(params, predefinedScenarios),
    [params]
  )

  // Update a single parameter
  const updateParam = <K extends keyof SimulatorParameters>(
    key: K,
    value: SimulatorParameters[K]
  ) => {
    setParams({ [key]: value })
  }

  // Apply a scenario
  const applyScenario = (scenarioId: string) => {
    applyPredefinedScenario(scenarioId)
  }

  // Chart data
  const capexPieData = [
    { name: 'Construction', value: results.capex.construction, color: COLORS.construction },
    { name: 'Equipment', value: results.capex.equipment, color: COLORS.equipment },
    { name: 'A/V System', value: results.capex.avSystem, color: COLORS.software },
    { name: 'Soft Costs', value: results.capex.softCosts, color: COLORS.other },
    { name: 'Contingency', value: results.capex.contingency, color: COLORS.maintenance }
  ]

  const opexPieData = [
    { name: 'Staffing', value: results.opex.staffing, color: COLORS.staffing },
    { name: 'Maintenance', value: results.opex.maintenance, color: COLORS.maintenance },
    { name: 'Consumables', value: results.opex.consumables, color: COLORS.equipment },
    { name: 'Software', value: results.opex.software, color: COLORS.software },
    { name: 'Utilities', value: results.opex.utilities, color: COLORS.construction },
    { name: 'Refresh Reserve', value: results.opex.refresh, color: COLORS.other }
  ]

  const fiveYearChartData = results.fiveYear.yearByYear.map(y => ({
    name: y.label,
    CAPEX: y.capex,
    OPEX: y.opex,
    Total: y.total
  }))

  return (
    <div className="min-h-screen bg-slate-900 -m-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Budget Simulator</h1>
          <p className="text-slate-400 text-sm">
            Interactive cost modeling with real-time CAPEX and OPEX calculations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <VendorBidMenu />
          <ExportMenu
            params={params}
            results={results}
            scenarioName={currentScenarioName}
          />
          <SaveIndicator />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <MetricCard
          label="Total 5-Year Cost"
          value={formatCurrency(results.fiveYear.totalCost)}
          subValue="CAPEX + 5yr OPEX"
          icon={<DollarSign className="h-4 w-4" />}
          color="blue"
        />
        <MetricCard
          label="Phase 1 CAPEX"
          value={formatCurrency(results.capex.net)}
          subValue={`Net of ${formatCurrency(results.capex.existingCredits)} credits`}
          icon={<Building2 className="h-4 w-4" />}
          color="purple"
        />
        <MetricCard
          label="Annual OPEX"
          value={formatCurrency(results.opex.annual)}
          subValue={`${formatCurrency(results.opex.monthly)}/month`}
          icon={<Activity className="h-4 w-4" />}
          color="green"
        />
        <MetricCard
          label="Cost per Session"
          value={formatCurrency(results.metrics.costPerSession)}
          subValue={`${results.metrics.annualSessions.toLocaleString()} sessions/year`}
          icon={<Calculator className="h-4 w-4" />}
          color="amber"
        />
        <MetricCard
          label="Cost per SF"
          value={formatCurrency(results.metrics.costPerSF)}
          subValue={`${params.floorArea.toLocaleString()} SF total`}
          icon={<Layers className="h-4 w-4" />}
          color="red"
        />
      </div>

      {/* Main Content: Sliders + Visualizations */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Panel: Control Sliders */}
        <div className="lg:col-span-2 space-y-4">
          {/* Facility Parameters */}
          <SliderGroup
            title="Facility"
            icon={<Building2 className="h-4 w-4 text-blue-400" />}
          >
            <LabeledSlider
              label="Floor Area"
              value={params.floorArea}
              min={2000}
              max={10000}
              step={500}
              format={(v) => `${v.toLocaleString()} SF`}
              onChange={(v) => updateParam('floorArea', v)}
            />
            <LabeledSlider
              label="Simulation Rooms"
              value={params.simRooms}
              min={1}
              max={8}
              step={1}
              format={(v) => `${v} rooms`}
              onChange={(v) => updateParam('simRooms', v)}
            />
            <LabeledSlider
              label="Control Rooms"
              value={params.controlRooms}
              min={1}
              max={4}
              step={1}
              format={(v) => `${v} rooms`}
              onChange={(v) => updateParam('controlRooms', v)}
            />
            <LabeledSlider
              label="Debrief Rooms"
              value={params.debriefRooms}
              min={1}
              max={4}
              step={1}
              format={(v) => `${v} rooms`}
              onChange={(v) => updateParam('debriefRooms', v)}
            />
          </SliderGroup>

          {/* Equipment Parameters */}
          <SliderGroup
            title="Equipment"
            icon={<Package className="h-4 w-4 text-amber-400" />}
          >
            <LabeledSlider
              label="High-Fidelity Manikins"
              value={params.highFidelityManikins}
              min={0}
              max={6}
              step={1}
              format={(v) => `${v} units`}
              onChange={(v) => updateParam('highFidelityManikins', v)}
              description="SimMan, HAL, Apollo ($75K each)"
            />
            <LabeledSlider
              label="Task Trainers"
              value={params.taskTrainers}
              min={0}
              max={20}
              step={1}
              format={(v) => `${v} units`}
              onChange={(v) => updateParam('taskTrainers', v)}
              description="IV arms, airways, etc. ($3.5K each)"
            />
            <OptionButtonGroup
              label="A/V Tier"
              value={params.avTier}
              options={[
                { value: 'basic', label: 'Basic' },
                { value: 'standard', label: 'Standard' },
                { value: 'premium', label: 'Premium' }
              ]}
              onChange={(v) => updateParam('avTier', v)}
              description="Recording and debriefing system"
            />
          </SliderGroup>

          {/* Staffing Parameters */}
          <SliderGroup
            title="Staffing"
            icon={<Users className="h-4 w-4 text-purple-400" />}
          >
            <LabeledSlider
              label="Core Staff FTE"
              value={params.coreFTE}
              min={1}
              max={5}
              step={0.5}
              format={(v) => `${v} FTE`}
              onChange={(v) => updateParam('coreFTE', v)}
              description="Director, coordinator, admin"
            />
            <LabeledSlider
              label="Faculty Allocation"
              value={params.facultyAllocationPercent}
              min={0}
              max={50}
              step={5}
              format={(v) => `${v}%`}
              onChange={(v) => updateParam('facultyAllocationPercent', v)}
              description="% of faculty time for sim training"
            />
            <LabeledSlider
              label="Training Hours/Year"
              value={params.trainingHoursPerYear}
              min={0}
              max={200}
              step={10}
              format={(v) => `${v} hrs`}
              onChange={(v) => updateParam('trainingHoursPerYear', v)}
              description="Faculty development & certification"
            />
          </SliderGroup>

          {/* Operations Parameters */}
          <SliderGroup
            title="Operations"
            icon={<Activity className="h-4 w-4 text-emerald-400" />}
          >
            <LabeledSlider
              label="Sessions per Month"
              value={params.sessionsPerMonth}
              min={20}
              max={300}
              step={10}
              format={(v) => `${v} sessions`}
              onChange={(v) => updateParam('sessionsPerMonth', v)}
            />
            <OptionButtonGroup
              label="OPEX Calculation Model"
              value={params.opexModel}
              options={[
                { value: 'room-based', label: 'Room-Based' },
                { value: 'sessions-based', label: 'Sessions-Based' }
              ]}
              onChange={(v) => updateParam('opexModel', v)}
              description="How consumables/utilities are calculated"
            />
            <LabeledSlider
              label="Growth Rate"
              value={params.growthRatePercent}
              min={0}
              max={15}
              step={1}
              format={(v) => `${v}%/year`}
              onChange={(v) => updateParam('growthRatePercent', v)}
            />
            <LabeledSlider
              label="Inflation Rate"
              value={params.inflationPercent}
              min={0}
              max={10}
              step={0.5}
              format={(v) => `${v}%/year`}
              onChange={(v) => updateParam('inflationPercent', v)}
            />
          </SliderGroup>

          {/* Advanced Parameters */}
          <SliderGroup
            title="Advanced"
            icon={<Settings2 className="h-4 w-4 text-slate-400" />}
            defaultOpen={false}
          >
            <OptionButtonGroup
              label="Quality Level"
              value={params.qualityLevel}
              options={[
                { value: 'budget', label: 'Budget' },
                { value: 'standard', label: 'Standard' },
                { value: 'premium', label: 'Premium' }
              ]}
              onChange={(v) => updateParam('qualityLevel', v)}
              description="Affects construction and furniture costs"
            />
            <OptionButtonGroup
              label="Cost Region"
              value={params.costRegion}
              options={[
                { value: 'low-cost', label: 'Low' },
                { value: 'moderate-cost', label: 'Moderate' },
                { value: 'high-cost', label: 'High' }
              ]}
              onChange={(v) => updateParam('costRegion', v)}
              description="Regional cost multiplier"
            />
            <LabeledSlider
              label="Contingency"
              value={params.contingencyPercent}
              min={5}
              max={20}
              step={1}
              format={(v) => `${v}%`}
              onChange={(v) => updateParam('contingencyPercent', v)}
            />
            <LabeledSlider
              label="Refresh Reserve"
              value={params.refreshReservePercent}
              min={10}
              max={25}
              step={1}
              format={(v) => `${v}%`}
              onChange={(v) => updateParam('refreshReservePercent', v)}
              description="Annual set-aside for equipment replacement"
            />
          </SliderGroup>
        </div>

        {/* Right Panel: Visualizations */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-slate-800 border border-slate-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                <PieChartIcon className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="capex" className="data-[state=active]:bg-blue-600">
                <Building2 className="h-4 w-4 mr-2" />
                CAPEX
              </TabsTrigger>
              <TabsTrigger value="opex" className="data-[state=active]:bg-blue-600">
                <Activity className="h-4 w-4 mr-2" />
                OPEX
              </TabsTrigger>
              <TabsTrigger value="projection" className="data-[state=active]:bg-blue-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                5-Year
              </TabsTrigger>
              <TabsTrigger value="roi" className="data-[state=active]:bg-green-600">
                <DollarSign className="h-4 w-4 mr-2" />
                ROI
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* CAPEX Pie */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">CAPEX Distribution</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <Pie
                        data={capexPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {capexPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrencyFull(value)}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Legend as grid below chart */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 px-2">
                    {capexPieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-slate-300 truncate">{entry.name}</span>
                        <span className="text-xs text-slate-500 ml-auto">{((entry.value / results.capex.total) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 text-center">
                    <span className="text-2xl font-bold text-white">{formatCurrency(results.capex.net)}</span>
                    <span className="text-sm text-slate-400 ml-2">Net CAPEX</span>
                  </div>
                </div>

                {/* OPEX Pie */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Annual OPEX Distribution</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <Pie
                        data={opexPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {opexPieData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrencyFull(value)}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Legend as grid below chart */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 px-2">
                    {opexPieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-slate-300 truncate">{entry.name}</span>
                        <span className="text-xs text-slate-500 ml-auto">{((entry.value / results.opex.annual) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 text-center">
                    <span className="text-2xl font-bold text-white">{formatCurrency(results.opex.annual)}</span>
                    <span className="text-sm text-slate-400 ml-2">per year</span>
                  </div>
                </div>
              </div>

              {/* Scenario Comparison */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Scenario Comparison</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {scenarioComparison.map(({ scenario, results: scenarioResults, deltaFromCurrent }) => (
                    <button
                      key={scenario.id}
                      onClick={() => applyScenario(scenario.id)}
                      className="p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-left transition-colors"
                    >
                      <div className="text-sm font-medium text-white">{scenario.name}</div>
                      <div className="text-lg font-bold text-blue-400 mt-1">
                        {formatCurrency(scenarioResults.fiveYear.totalCost)}
                      </div>
                      <div className={`text-xs mt-1 ${
                        deltaFromCurrent > 0 ? 'text-red-400' :
                        deltaFromCurrent < 0 ? 'text-emerald-400' :
                        'text-slate-400'
                      }`}>
                        {deltaFromCurrent !== 0 && (deltaFromCurrent > 0 ? '+' : '')}
                        {deltaFromCurrent !== 0 ? formatCurrency(deltaFromCurrent) : 'Current'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* CAPEX Tab */}
            <TabsContent value="capex" className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">CAPEX Line Items</h3>
                <div className="space-y-1">
                  {results.capex.lineItems.map((item) => (
                    <LineItemRow
                      key={item.id}
                      name={item.name}
                      amount={item.amount}
                      calculation={item.calculation}
                      notes={item.notes}
                      isNegative={item.amount < 0}
                      formatCurrency={formatCurrencyFull}
                    />
                  ))}
                  <div className="border-t-2 border-slate-600 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Net CAPEX</span>
                      <span className="text-lg font-bold text-blue-400">{formatCurrencyFull(results.capex.net)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CAPEX Bar Chart */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Cost by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={capexPieData}
                    layout="vertical"
                    margin={{ left: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} stroke="#94a3b8" />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" width={90} />
                    <Tooltip
                      formatter={(value: number) => formatCurrencyFull(value)}
                      contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {capexPieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            {/* OPEX Tab */}
            <TabsContent value="opex" className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Annual OPEX Line Items</h3>
                  <span className="text-xs text-slate-400 px-2 py-1 bg-slate-700 rounded">
                    {params.opexModel === 'room-based' ? 'Room-Based Model' : 'Sessions-Based Model'}
                  </span>
                </div>
                <div className="space-y-1">
                  {results.opex.lineItems.map((item) => (
                    <LineItemRow
                      key={item.id}
                      name={item.name}
                      amount={item.amount}
                      calculation={item.calculation}
                      notes={item.notes}
                      formatCurrency={formatCurrencyFull}
                    />
                  ))}
                  <div className="border-t-2 border-slate-600 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">Total Annual OPEX</span>
                      <span className="text-lg font-bold text-emerald-400">{formatCurrencyFull(results.opex.annual)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-400">Monthly</span>
                      <span className="text-sm text-slate-300">{formatCurrencyFull(results.opex.monthly)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key OPEX Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.metrics.costPerSession)}</div>
                  <div className="text-xs text-slate-400 mt-1">Cost per Session</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.metrics.costPerLearnerHour)}</div>
                  <div className="text-xs text-slate-400 mt-1">Cost per Learner Hour</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white">{results.metrics.annualSessions.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 mt-1">Sessions per Year</div>
                </div>
              </div>
            </TabsContent>

            {/* 5-Year Projection Tab */}
            <TabsContent value="projection" className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">5-Year Cost Projection</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={fiveYearChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis tickFormatter={(v) => formatCurrency(v)} stroke="#94a3b8" />
                    <Tooltip
                      formatter={(value: number) => formatCurrencyFull(value)}
                      contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <RechartsLegend />
                    <Area type="monotone" dataKey="CAPEX" stackId="1" stroke={COLORS.capex} fill={COLORS.capex} fillOpacity={0.6} />
                    <Area type="monotone" dataKey="OPEX" stackId="1" stroke={COLORS.opex} fill={COLORS.opex} fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Year-by-Year Table */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Year-by-Year Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-2 text-slate-400 font-medium">Year</th>
                        <th className="text-right py-2 text-slate-400 font-medium">CAPEX</th>
                        <th className="text-right py-2 text-slate-400 font-medium">OPEX</th>
                        <th className="text-right py-2 text-slate-400 font-medium">Total</th>
                        <th className="text-right py-2 text-slate-400 font-medium">Sessions</th>
                        <th className="text-right py-2 text-slate-400 font-medium">$/Session</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.fiveYear.yearByYear.map((year) => (
                        <tr key={year.year} className="border-b border-slate-700/50">
                          <td className="py-2 text-white font-medium">{year.label}</td>
                          <td className="py-2 text-right text-blue-400">{formatCurrency(year.capex)}</td>
                          <td className="py-2 text-right text-emerald-400">{formatCurrency(year.opex)}</td>
                          <td className="py-2 text-right text-white font-medium">{formatCurrency(year.total)}</td>
                          <td className="py-2 text-right text-slate-300">{year.sessionsPerYear.toLocaleString()}</td>
                          <td className="py-2 text-right text-amber-400">{formatCurrency(year.costPerSession)}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-slate-600 bg-slate-800/30">
                        <td className="py-3 text-white font-bold">5-Year Total</td>
                        <td className="py-3 text-right text-blue-400 font-bold">{formatCurrency(results.fiveYear.totalCapex)}</td>
                        <td className="py-3 text-right text-emerald-400 font-bold">{formatCurrency(results.fiveYear.totalOpex)}</td>
                        <td className="py-3 text-right text-white font-bold">{formatCurrency(results.fiveYear.totalCost)}</td>
                        <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* ROI Analysis Tab */}
            <TabsContent value="roi" className="space-y-6">
              {/* ROI Summary Cards */}
              <ROISummaryCards />

              {/* Confidence Range */}
              <ROIConfidenceBar />

              {/* Two-column layout for breakdown and inputs */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Category Breakdown */}
                <ROICategoryBreakdown />

                {/* Organization Inputs */}
                <ROIInputsPanel />
              </div>

              {/* Timeline Chart */}
              <ROITimelineChart />

              {/* Asset Table */}
              <ROIAssetTable />

              {/* Evidence Note */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">About These Projections</h4>
                <p className="text-sm text-slate-400">
                  ROI calculations are based on peer-reviewed research and industry reports including the NSI 2025
                  National Health Care Retention Report, AHRQ patient safety studies, and CDC infection prevention
                  data. Click on any citation badge to view source details. Actual results may vary based on
                  implementation quality, organizational factors, and local conditions. Use the Organization Inputs
                  panel to customize calculations for your specific situation.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
