"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  ClipboardCheck,
  DollarSign,
  Shield,
  Calendar,
  CheckCircle2,
  Circle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Scale
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
  rfqCategories,
  acceptanceTests,
  milestones,
  contractClauses,
  procurementTimeline,
  getProcurementSummary
} from "@/data/seed/procurement"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export default function ProcurementPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedTest, setExpandedTest] = useState<string | null>('sat')

  const summary = useMemo(() => getProcurementSummary(), [])

  // Chart data for RFQ weights
  const weightChartData = rfqCategories.map((cat, i) => ({
    name: cat.name.split(' ')[0],
    fullName: cat.name,
    weight: cat.weight,
    fill: COLORS[i % COLORS.length]
  }))

  // Chart data for payment schedule
  const paymentChartData = milestones.map((m, i) => ({
    name: m.name.split('/')[0].split(' ').slice(0, 2).join(' '),
    fullName: m.name,
    percent: m.paymentPercent,
    fill: COLORS[i % COLORS.length]
  }))

  // Group contract clauses by category
  const clausesByCategory = useMemo(() => {
    const grouped: Record<string, typeof contractClauses> = {}
    contractClauses.forEach(clause => {
      if (!grouped[clause.category]) grouped[clause.category] = []
      grouped[clause.category].push(clause)
    })
    return grouped
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-400" />
            Procurement Playbook
          </h1>
          <p className="text-slate-400">
            RFQ framework, evaluation criteria, acceptance testing, and contract guidelines
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
          Procurement Planning
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">RFQ Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.rfqCategories}</div>
            <p className="text-xs text-slate-500">Evaluation sections</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Acceptance Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.acceptanceTests.fat + summary.acceptanceTests.sat}</div>
            <p className="text-xs text-slate-500">FAT: {summary.acceptanceTests.fat} / SAT: {summary.acceptanceTests.sat}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Payment Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.milestones}</div>
            <p className="text-xs text-slate-500">10% holdback included</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Contract Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.contractClauses.total}</div>
            <p className="text-xs text-slate-500">{summary.contractClauses.critical} critical</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.estimatedDuration}</div>
            <p className="text-xs text-slate-500">{summary.procurementPhases} phases</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rfq" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="rfq" className="data-[state=active]:bg-slate-700">
            <Scale className="h-4 w-4 mr-2" />
            RFQ & Scoring
          </TabsTrigger>
          <TabsTrigger value="acceptance" className="data-[state=active]:bg-slate-700">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Acceptance Testing
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Payment Milestones
          </TabsTrigger>
          <TabsTrigger value="contract" className="data-[state=active]:bg-slate-700">
            <Shield className="h-4 w-4 mr-2" />
            Contract Clauses
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Timeline
          </TabsTrigger>
        </TabsList>

        {/* RFQ & Scoring Tab */}
        <TabsContent value="rfq">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Weight Distribution */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Evaluation Weights</CardTitle>
                <CardDescription className="text-slate-400">
                  Category weights for vendor scoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={weightChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="weight"
                        label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                        labelLine={false}
                      >
                        {weightChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `${value}%`}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value, entry: any) => (
                          <span style={{ color: '#cbd5e1', fontSize: '12px' }}>{entry.payload.fullName}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* RFQ Categories */}
            <div className="lg:col-span-2 space-y-4">
              {rfqCategories.map((category, i) => (
                <Card key={category.id} className="bg-slate-800/50 border-slate-700">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {category.name}
                            <Badge className="bg-slate-600">{category.weight}%</Badge>
                          </h3>
                          <p className="text-sm text-slate-400">{category.description}</p>
                        </div>
                      </div>
                      {expandedCategory === category.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {expandedCategory === category.id && (
                    <div className="border-t border-slate-700 p-4 space-y-4">
                      {/* Requirements */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">RFQ Requirements</h4>
                        <ul className="space-y-1">
                          {category.requirements.map((req, j) => (
                            <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                              <Circle className="h-2 w-2 mt-1.5 flex-shrink-0 text-blue-400" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evaluation Criteria */}
                      <div>
                        <h4 className="text-sm font-medium text-slate-300 mb-2">Evaluation Criteria</h4>
                        <div className="space-y-2">
                          {category.evaluationCriteria.map((criterion) => (
                            <div key={criterion.id} className="p-3 rounded-lg bg-slate-700/50">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-white text-sm">{criterion.name}</span>
                                <Badge variant="outline" className="border-slate-500 text-slate-300">
                                  Max {criterion.maxScore} pts
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-400">{criterion.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Acceptance Testing Tab */}
        <TabsContent value="acceptance">
          <div className="space-y-6">
            {acceptanceTests.map((test) => (
              <Card key={test.id} className="bg-slate-800/50 border-slate-700">
                <div
                  className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setExpandedTest(expandedTest === test.id ? null : test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white flex items-center gap-2">
                        <Badge className={test.phase === 'FAT' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}>
                          {test.phase}
                        </Badge>
                        {test.name}
                      </h3>
                      <p className="text-sm text-slate-400">{test.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400">{test.steps.length} steps</span>
                      {expandedTest === test.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedTest === test.id && (
                  <div className="border-t border-slate-700 p-4">
                    <div className="space-y-3">
                      {test.steps.map((step, i) => (
                        <div key={step.id} className="p-3 rounded-lg bg-slate-700/50">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-600 text-xs font-medium">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-white">{step.name}</h4>
                                <Badge variant="outline" className="border-slate-500 text-slate-400">
                                  {step.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                              <div className="text-xs text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Pass: {step.passFailCriteria}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payment Milestones Tab */}
        <TabsContent value="milestones">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Payment Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Schedule</CardTitle>
                <CardDescription className="text-slate-400">
                  Milestone-based payment with 10% holdback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis type="number" domain={[0, 35]} tickFormatter={(v) => `${v}%`} stroke="#94a3b8" />
                      <YAxis type="category" dataKey="name" width={100} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(value: number) => `${value}%`}
                        labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      />
                      <Bar dataKey="percent" radius={[0, 4, 4, 0]}>
                        {paymentChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Milestone Details */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Milestone Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Deliverables and conditions for each payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, i) => (
                    <div key={milestone.id} className="p-4 rounded-lg bg-slate-700/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{ backgroundColor: COLORS[i % COLORS.length] + '33', color: COLORS[i % COLORS.length] }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{milestone.name}</h4>
                            <p className="text-xs text-slate-400">{milestone.description}</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400">
                          {milestone.paymentPercent}%
                        </Badge>
                      </div>
                      <div className="ml-10">
                        <p className="text-xs text-slate-500 mb-1">Deliverables:</p>
                        <ul className="text-xs text-slate-400 space-y-0.5">
                          {milestone.deliverables.slice(0, 3).map((d, j) => (
                            <li key={j} className="flex items-center gap-1">
                              <Circle className="h-1.5 w-1.5" />
                              {d}
                            </li>
                          ))}
                          {milestone.deliverables.length > 3 && (
                            <li className="text-slate-500">+{milestone.deliverables.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contract Clauses Tab */}
        <TabsContent value="contract">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Contract Clause Checklist</CardTitle>
              <CardDescription className="text-slate-400">
                {summary.contractClauses.total} clauses: {summary.contractClauses.critical} critical, {summary.contractClauses.important} important, {summary.contractClauses.standard} standard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(clausesByCategory).map(([category, clauses]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      {category}
                      <Badge className="bg-slate-600">{clauses.length}</Badge>
                    </h3>
                    <div className="grid gap-2 md:grid-cols-2">
                      {clauses.map((clause) => (
                        <div key={clause.id} className="p-3 rounded-lg bg-slate-700/50">
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-medium text-white text-sm">{clause.name}</span>
                            <Badge className={
                              clause.importance === 'critical' ? 'bg-red-500/20 text-red-400' :
                              clause.importance === 'important' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-slate-600 text-slate-300'
                            }>
                              {clause.importance}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-400">{clause.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Procurement Timeline</CardTitle>
              <CardDescription className="text-slate-400">
                Estimated {summary.estimatedDuration} from RFQ to contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />

                <div className="space-y-6">
                  {procurementTimeline.map((phase, i) => (
                    <div key={phase.id} className="relative pl-14">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: '#1e293b',
                          borderColor: COLORS[i % COLORS.length],
                          color: COLORS[i % COLORS.length]
                        }}
                      >
                        {i + 1}
                      </div>

                      <div className="p-4 rounded-lg bg-slate-700/50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{phase.name}</h4>
                            <Badge variant="outline" className="border-slate-500 text-slate-400 mt-1">
                              {phase.duration}
                            </Badge>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {phase.activities.map((activity, j) => (
                            <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                              <Circle className="h-1.5 w-1.5 mt-2 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
