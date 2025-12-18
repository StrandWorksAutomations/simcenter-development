"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Building2,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Calendar,
  Shield,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit3,
  Save,
  X
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
  ScatterChart,
  Scatter,
  Legend
} from "recharts"
import {
  csiDivisions,
  equipmentCategories,
  projectMilestones,
  constructionRisks,
  alternateItems,
  projectCostSummary,
  type CSIDivision,
  type ProjectMilestone,
  type ProjectRisk,
  type AlternateItem,
  type BidEntry
} from "@/data/seed/construction"

// Color palette for CSI divisions
const divisionColors: Record<string, string> = {
  '01': '#3b82f6',
  '02': '#ef4444',
  '03': '#6b7280',
  '05': '#78716c',
  '06/09': '#f59e0b',
  '08': '#8b5cf6',
  '10': '#ec4899',
  '21': '#dc2626',
  '22': '#06b6d4',
  '23': '#10b981',
  '26': '#eab308',
  '27': '#6366f1',
  '28': '#14b8a6'
}

// Risk color mapping
const riskColors = {
  impact: {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#dc2626'
  },
  probability: {
    low: 1,
    medium: 2,
    high: 3
  }
}

export default function ConstructionPage() {
  const [activeTab, setActiveTab] = useState('costs')
  const [costOverrides, setCostOverrides] = useState<Record<string, number>>({})
  const [editingDivision, setEditingDivision] = useState<string | null>(null)
  const [selectedAlternates, setSelectedAlternates] = useState<string[]>([])
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null)
  const [bidEntries, setBidEntries] = useState<BidEntry[]>([])
  const [showBidForm, setShowBidForm] = useState(false)

  // Calculate totals with overrides and alternates
  const calculatedTotals = useMemo(() => {
    const constructionSubtotal = csiDivisions.reduce((sum, div) => {
      return sum + (costOverrides[div.id] ?? div.estimatedCost)
    }, 0)
    const contingency = Math.round(constructionSubtotal * 0.10)
    const constructionTotal = constructionSubtotal + contingency

    const equipmentTotal = equipmentCategories.reduce((sum, eq) => sum + eq.estimatedCost, 0)

    const alternatesTotal = alternateItems
      .filter(item => selectedAlternates.includes(item.id))
      .reduce((sum, item) => sum + item.costImpact, 0)

    return {
      constructionSubtotal,
      contingency,
      constructionTotal,
      equipmentTotal,
      alternatesTotal,
      grandTotal: constructionTotal + equipmentTotal + alternatesTotal
    }
  }, [costOverrides, selectedAlternates])

  // Data for charts
  const costChartData = csiDivisions.map(div => ({
    name: div.name.length > 15 ? div.name.substring(0, 15) + '...' : div.name,
    fullName: div.name,
    division: div.division,
    cost: costOverrides[div.id] ?? div.estimatedCost,
    color: divisionColors[div.division] || '#6b7280'
  }))

  // Short names for pie chart
  const pieChartNames: Record<string, string> = {
    '01': 'Gen. Cond.',
    '02': 'Demo',
    '03': 'Concrete',
    '05': 'Metals',
    '06/09': 'Finishes',
    '08': 'Doors/Glass',
    '10': 'Specialties',
    '21': 'Fire Supp.',
    '22': 'Plumbing',
    '23': 'HVAC',
    '26': 'Electrical',
    '27': 'IT/Comm',
    '28': 'Security'
  }

  const pieChartData = csiDivisions.map(div => ({
    name: pieChartNames[div.division] || div.name,
    fullName: div.name,
    value: costOverrides[div.id] ?? div.estimatedCost,
    color: divisionColors[div.division] || '#6b7280'
  }))

  // Risk scatter data
  const riskScatterData = constructionRisks.map(risk => ({
    x: riskColors.probability[risk.probability],
    y: risk.impact === 'low' ? 1 : risk.impact === 'medium' ? 2 : risk.impact === 'high' ? 3 : 4,
    name: risk.risk,
    category: risk.category,
    color: riskColors.impact[risk.impact]
  }))

  // Gantt chart data
  const ganttData = projectMilestones.map(m => ({
    name: m.name,
    phase: m.phase,
    start: m.startMonth,
    duration: m.endMonth - m.startMonth + 1,
    status: m.status
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  const toggleAlternate = (id: string) => {
    setSelectedAlternates(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const handleCostUpdate = (divId: string, value: number) => {
    setCostOverrides(prev => ({
      ...prev,
      [divId]: value
    }))
    setEditingDivision(null)
  }

  // Calculate high risk count
  const highRiskCount = constructionRisks.filter(r => r.impact === 'high' || r.impact === 'critical').length

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Construction & Renovation Estimate</h1>
        <p className="text-slate-400">Phase 1 - 3-Room Simulation Center | ROM Budget Framework</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">Total Phase 1</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(calculatedTotals.grandTotal)}</div>
          <div className="text-xs text-emerald-400 mt-1">ROM Estimate</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Building2 className="h-4 w-4" />
            <span className="text-xs">Construction</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(calculatedTotals.constructionTotal)}</div>
          <div className="text-xs text-slate-500 mt-1">+10% contingency</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Equipment</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(calculatedTotals.equipmentTotal)}</div>
          <div className="text-xs text-slate-500 mt-1">Sims + A/V</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Timeline</span>
          </div>
          <div className="text-2xl font-bold text-white">12 mo</div>
          <div className="text-xs text-slate-500 mt-1">Design to Go-Live</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Risk Score</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{highRiskCount} High</div>
          <div className="text-xs text-slate-500 mt-1">of {constructionRisks.length} identified</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Contingency</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(calculatedTotals.contingency)}</div>
          <div className="text-xs text-slate-500 mt-1">10% reserve</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700 mb-6">
          <TabsTrigger value="costs" className="data-[state=active]:bg-slate-700">
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="risks" className="data-[state=active]:bg-slate-700">
            Risks
          </TabsTrigger>
          <TabsTrigger value="alternates" className="data-[state=active]:bg-slate-700">
            Alternates
          </TabsTrigger>
        </TabsList>

        {/* Cost Breakdown Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CSI Division Chart */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cost by CSI Division</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costChartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value: number) => [formatCurrency(value), 'Estimated Cost']}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                  />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                    {costChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cost Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="40%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number, name, props) => [formatCurrency(value), props?.payload?.fullName || name]}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Editable CSI Division Table */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">CSI Division Breakdown</h3>
              <button
                onClick={() => setShowBidForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                <Plus className="h-4 w-4" /> Add Contractor Bid
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Division</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Name</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">ROM Estimate</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Actual/Bid</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium text-sm">Status</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {csiDivisions.map((div) => {
                    const currentCost = costOverrides[div.id] ?? div.estimatedCost
                    const hasOverride = costOverrides[div.id] !== undefined
                    const isEditing = editingDivision === div.id

                    return (
                      <tr key={div.id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: divisionColors[div.division] }}
                            />
                            <span className="text-white font-mono">{div.division}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white text-sm">{div.name}</div>
                          <div className="text-slate-500 text-xs truncate max-w-xs">{div.notes}</div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={hasOverride ? 'text-slate-500 line-through' : 'text-white'}>
                            {formatCurrency(div.estimatedCost)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {isEditing ? (
                            <input
                              type="number"
                              defaultValue={currentCost}
                              className="w-28 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-right"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleCostUpdate(div.id, parseInt((e.target as HTMLInputElement).value))
                                } else if (e.key === 'Escape') {
                                  setEditingDivision(null)
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <span className={hasOverride ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                              {hasOverride ? formatCurrency(currentCost) : '-'}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            className={
                              div.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                              div.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-slate-500/20 text-slate-400'
                            }
                          >
                            {div.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isEditing ? (
                            <button
                              onClick={() => setEditingDivision(null)}
                              className="text-slate-400 hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setEditingDivision(div.id)}
                              className="text-slate-400 hover:text-white"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-600">
                    <td colSpan={2} className="py-3 px-4 text-white font-medium">Subtotal Construction</td>
                    <td className="py-3 px-4 text-right text-slate-400">{formatCurrency(csiDivisions.reduce((s,d) => s + d.estimatedCost, 0))}</td>
                    <td className="py-3 px-4 text-right text-white font-medium">{formatCurrency(calculatedTotals.constructionSubtotal)}</td>
                    <td colSpan={2}></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-2 px-4 text-slate-400">+ 10% Contingency</td>
                    <td className="py-2 px-4 text-right text-slate-500">{formatCurrency(Math.round(csiDivisions.reduce((s,d) => s + d.estimatedCost, 0) * 0.1))}</td>
                    <td className="py-2 px-4 text-right text-slate-400">{formatCurrency(calculatedTotals.contingency)}</td>
                    <td colSpan={2}></td>
                  </tr>
                  <tr className="bg-slate-800">
                    <td colSpan={2} className="py-3 px-4 text-white font-bold text-lg">Total Construction</td>
                    <td className="py-3 px-4 text-right text-slate-400">{formatCurrency(Math.round(csiDivisions.reduce((s,d) => s + d.estimatedCost, 0) * 1.1))}</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold text-lg">{formatCurrency(calculatedTotals.constructionTotal)}</td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Equipment (Owner-Furnished)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equipmentCategories.map((eq) => (
                <div key={eq.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{eq.category}</span>
                    <span className="text-emerald-400 font-bold">{formatCurrency(eq.estimatedCost)}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{eq.description}</p>
                  <ul className="space-y-1">
                    {eq.items.map((item, idx) => (
                      <li key={idx} className="text-slate-500 text-xs flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Source Reference */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Data Source & Methodology</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-slate-300 font-medium mb-2">Source Document</div>
                <p className="text-slate-400">
                  <span className="text-blue-400">Construction Module</span> — ROM estimates using CSI MasterFormat divisions, based on <span className="text-blue-400">healthcare construction standards</span>.
                </p>
              </div>
              <div>
                <div className="text-slate-300 font-medium mb-2">Methodology</div>
                <p className="text-slate-400">
                  ROM estimates based on CSI MasterFormat divisions using professional-quality, lower-end budget approach
                  with cost-effective solutions meeting healthcare standards. All figures in 2025 USD include direct costs
                  and contractor markups.
                </p>
              </div>
              <div>
                <div className="text-slate-300 font-medium mb-2">Key Assumptions</div>
                <ul className="text-slate-400 space-y-1 list-disc list-inside">
                  <li>No major unforeseen structural or MEP rework (existing utilities can be reused)</li>
                  <li>Mid-grade finishes (not luxury)</li>
                  <li>Hospital infrastructure can handle added loads without central upgrades</li>
                  <li>10% design contingency embedded in line items</li>
                  <li>Early vendor quotes used for A/V and manikin allowances</li>
                </ul>
              </div>
              <div>
                <div className="text-slate-300 font-medium mb-2">Benchmark Comparison</div>
                <p className="text-slate-400">
                  For context: a university simulation lab expansion (1,100 sq ft) was completed for $139K construction + $106K equipment.
                  Larger hospital sim centers often exceed $1M. This estimate aligns with a modest, phased approach leveraging existing infrastructure.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          {/* Gantt Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Timeline (12 Months)</h3>
            <div className="space-y-4">
              {/* Month headers */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-48"></div>
                <div className="flex-1 flex">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-slate-500">
                      M{i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt bars */}
              {projectMilestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-2">
                  <div className="w-48 text-sm text-slate-300 truncate">{milestone.name}</div>
                  <div className="flex-1 relative h-8 bg-slate-900/50 rounded">
                    <div
                      className={`absolute h-6 top-1 rounded ${
                        milestone.status === 'completed' ? 'bg-emerald-500' :
                        milestone.status === 'in_progress' ? 'bg-amber-500' :
                        'bg-blue-500'
                      }`}
                      style={{
                        left: `${(milestone.startMonth / 12) * 100}%`,
                        width: `${((milestone.endMonth - milestone.startMonth + 1) / 12) * 100}%`
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                        {milestone.phase}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`bg-slate-800/50 border rounded-lg p-4 ${
                  milestone.status === 'completed' ? 'border-emerald-500/50' :
                  milestone.status === 'in_progress' ? 'border-amber-500/50' :
                  'border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={
                    milestone.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                    milestone.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }>
                    {milestone.status.replace('_', ' ')}
                  </Badge>
                  <Calendar className="h-4 w-4 text-slate-500" />
                </div>
                <h4 className="text-white font-medium mb-1">{milestone.name}</h4>
                <p className="text-slate-400 text-xs mb-3">{milestone.phase}</p>
                <div className="text-xs text-slate-500">
                  Month {milestone.startMonth + 1} - {milestone.endMonth + 1}
                </div>
                {milestone.dependencies.length > 0 && (
                  <div className="mt-2 text-xs text-slate-600">
                    Depends on: {milestone.dependencies.join(', ')}
                  </div>
                )}
                <p className="text-slate-500 text-xs mt-2 line-clamp-2">{milestone.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Heat Map */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Heat Map</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0.5, 3.5]}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v) => v === 1 ? 'Low' : v === 2 ? 'Medium' : 'High'}
                    label={{ value: 'Probability', position: 'bottom', fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0.5, 4.5]}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(v) => v === 1 ? 'Low' : v === 2 ? 'Med' : v === 3 ? 'High' : 'Crit'}
                    label={{ value: 'Impact', angle: -90, position: 'left', fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value, name, props) => [props.payload.name, 'Risk']}
                  />
                  <Scatter data={riskScatterData}>
                    {riskScatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Summary */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-red-400">{constructionRisks.filter(r => r.impact === 'critical').length}</div>
                  <div className="text-slate-400 text-sm">Critical Impact</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-amber-400">{constructionRisks.filter(r => r.impact === 'high').length}</div>
                  <div className="text-slate-400 text-sm">High Impact</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">{constructionRisks.filter(r => r.impact === 'medium').length}</div>
                  <div className="text-slate-400 text-sm">Medium Impact</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-emerald-400">{constructionRisks.filter(r => r.impact === 'low').length}</div>
                  <div className="text-slate-400 text-sm">Low Impact</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Cards */}
          <div className="space-y-4">
            {constructionRisks.map((risk) => (
              <div
                key={risk.id}
                className={`bg-slate-800/50 border rounded-lg overflow-hidden ${
                  risk.impact === 'critical' ? 'border-red-500/50' :
                  risk.impact === 'high' ? 'border-amber-500/50' :
                  risk.impact === 'medium' ? 'border-yellow-500/50' :
                  'border-slate-700'
                }`}
              >
                <div
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => setExpandedRisk(expandedRisk === risk.id ? null : risk.id)}
                >
                  <div className="flex items-center gap-4">
                    <AlertTriangle className={`h-5 w-5 ${
                      risk.impact === 'critical' ? 'text-red-400' :
                      risk.impact === 'high' ? 'text-amber-400' :
                      risk.impact === 'medium' ? 'text-yellow-400' :
                      'text-emerald-400'
                    }`} />
                    <div>
                      <div className="text-white font-medium">{risk.risk}</div>
                      <div className="text-slate-500 text-sm">{risk.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      risk.impact === 'critical' ? 'bg-red-500/20 text-red-400' :
                      risk.impact === 'high' ? 'bg-amber-500/20 text-amber-400' :
                      risk.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }>
                      {risk.impact} impact
                    </Badge>
                    <Badge className="bg-slate-500/20 text-slate-400">
                      {risk.probability} prob
                    </Badge>
                    {expandedRisk === risk.id ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </div>
                </div>
                {expandedRisk === risk.id && (
                  <div className="px-4 pb-4 border-t border-slate-700 pt-4">
                    <div className="text-sm text-slate-400 mb-2">Mitigation Strategy:</div>
                    <p className="text-slate-300 text-sm">{risk.mitigation}</p>
                    <div className="mt-3">
                      <Badge className={
                        risk.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                        risk.status === 'mitigating' ? 'bg-blue-500/20 text-blue-400' :
                        risk.status === 'accepted' ? 'bg-slate-500/20 text-slate-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }>
                        {risk.status}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Alternates Tab */}
        <TabsContent value="alternates" className="space-y-6">
          {/* Cost Summary with Alternates */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Project Cost Summary</h3>
              <div className="text-2xl font-bold text-emerald-400">{formatCurrency(calculatedTotals.grandTotal)}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-slate-400 text-sm">Base Construction</div>
                <div className="text-white font-medium">{formatCurrency(calculatedTotals.constructionTotal)}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Equipment</div>
                <div className="text-white font-medium">{formatCurrency(calculatedTotals.equipmentTotal)}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Selected Alternates</div>
                <div className={`font-medium ${calculatedTotals.alternatesTotal > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                  {calculatedTotals.alternatesTotal > 0 ? `+${formatCurrency(calculatedTotals.alternatesTotal)}` : '$0'}
                </div>
              </div>
            </div>
          </div>

          {/* Required Base Scope */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Required Base Scope (Included in Phase 1)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternateItems.filter(a => a.category === 'required').map((item) => (
                <div key={item.id} className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">{item.name}</div>
                      <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nice-to-Have Alternates */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" />
              Nice-to-Have Alternates (Select to Add)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternateItems.filter(a => a.category === 'alternate').map((item) => {
                const isSelected = selectedAlternates.includes(item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleAlternate(item.id)}
                    className={`cursor-pointer border rounded-lg p-4 transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50'
                        : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-500'
                        }`}>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-slate-900" />}
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.name}</div>
                          <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                          <Badge className={`mt-2 ${
                            item.priority === 'recommended' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {item.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-amber-400 font-medium whitespace-nowrap">
                        +{formatCurrency(item.costImpact)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Bid Entry Modal */}
      {showBidForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add Contractor Bid</h3>
              <button onClick={() => setShowBidForm(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm">Contractor Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white mt-1"
                  placeholder="Enter contractor name"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">CSI Division</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white mt-1">
                  <option value="">Select division...</option>
                  {csiDivisions.map(div => (
                    <option key={div.id} value={div.id}>
                      Div {div.division} - {div.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Bid Amount</label>
                <input
                  type="number"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white mt-1"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">Notes</label>
                <textarea
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white mt-1"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowBidForm(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowBidForm(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Save Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
