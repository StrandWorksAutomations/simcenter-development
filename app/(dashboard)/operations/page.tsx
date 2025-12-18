"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Workflow,
  ClipboardList,
  BarChart3,
  FileText,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import {
  workflows,
  kpiDefinitions,
  documentTemplates,
  monthlyReviewAgenda,
  sampleDashboardMetrics,
  operationalRoles,
  getOperationsSummary,
  getKPIsByCategory
} from "@/data/seed/operations"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4']

const raciColors: Record<string, string> = {
  'R': '#3b82f6', // Responsible - Blue
  'A': '#10b981', // Accountable - Green
  'C': '#f59e0b', // Consulted - Amber
  'I': '#94a3b8'  // Informed - Gray
}

export default function OperationsPage() {
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>('intake')
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null)

  const summary = useMemo(() => getOperationsSummary(), [])

  // KPI data by category for chart
  const kpiCategories = [...new Set(kpiDefinitions.map(k => k.category))]
  const kpiCountByCategory = kpiCategories.map((cat, i) => ({
    name: cat,
    count: kpiDefinitions.filter(k => k.category === cat).length,
    fill: COLORS[i % COLORS.length]
  }))

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Workflow className="h-6 w-6 text-blue-400" />
            Operations Model
          </h1>
          <p className="text-slate-400">
            Workflows, KPIs, documentation, and monthly operations review
          </p>
        </div>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
          Operations Model
        </Badge>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.workflows}</div>
            <p className="text-xs text-slate-500">Operational stages</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">KPIs Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.kpis}</div>
            <p className="text-xs text-slate-500">{summary.kpiCategories} categories</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.templates}</div>
            <p className="text-xs text-slate-500">Standard forms</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Core Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.roles}</div>
            <p className="text-xs text-slate-500">{summary.totalFTE} FTE dedicated</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Review Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary.reviewAgendaItems}</div>
            <p className="text-xs text-slate-500">Monthly agenda</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Session Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">12-16</div>
            <p className="text-xs text-slate-500">Sessions/month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="workflows" className="data-[state=active]:bg-slate-700">
            <Workflow className="h-4 w-4 mr-2" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="kpis" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            KPIs
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="review" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Monthly Review
          </TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows">
          <div className="space-y-4">
            {workflows.map((workflow, i) => (
              <Card key={workflow.id} className="bg-slate-800/50 border-slate-700">
                <div
                  className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setExpandedWorkflow(expandedWorkflow === workflow.id ? null : workflow.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: COLORS[i % COLORS.length] + '33', color: COLORS[i % COLORS.length] }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{workflow.name}</h3>
                        <p className="text-sm text-slate-400">{workflow.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {workflow.raciMatrix.map((r, j) => (
                          <div
                            key={j}
                            className="w-6 h-6 rounded text-xs font-bold flex items-center justify-center"
                            style={{ backgroundColor: raciColors[r.responsibility] + '33', color: raciColors[r.responsibility] }}
                            title={`${r.role}: ${r.responsibility}`}
                          >
                            {r.responsibility}
                          </div>
                        ))}
                      </div>
                      {expandedWorkflow === workflow.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedWorkflow === workflow.id && (
                  <div className="border-t border-slate-700 p-4 space-y-4">
                    {/* Steps */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">Process Steps</h4>
                      <div className="space-y-2">
                        {workflow.steps.map((step, j) => (
                          <div key={j} className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
                            <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-xs">
                              {j + 1}
                            </div>
                            <span className="text-sm text-slate-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RACI Matrix */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">RACI Matrix</h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {workflow.raciMatrix.map((entry, j) => (
                          <div key={j} className="p-3 rounded-lg bg-slate-700/50 flex items-start gap-3">
                            <Badge
                              className="text-xs font-bold"
                              style={{
                                backgroundColor: raciColors[entry.responsibility] + '33',
                                color: raciColors[entry.responsibility],
                                border: `1px solid ${raciColors[entry.responsibility]}`
                              }}
                            >
                              {entry.responsibility}
                            </Badge>
                            <div>
                              <p className="font-medium text-white text-sm">{entry.role}</p>
                              <p className="text-xs text-slate-400">{entry.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KPIs */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-300 mb-2">KPIs for This Stage</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.kpis.map((kpi, j) => (
                          <Badge key={j} variant="outline" className="border-slate-500 text-slate-300">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* RACI Legend */}
          <Card className="bg-slate-800/50 border-slate-700 mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">RACI Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Badge style={{ backgroundColor: raciColors['R'] + '33', color: raciColors['R'] }}>R</Badge>
                  <span className="text-sm text-slate-300">Responsible - Does the work</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge style={{ backgroundColor: raciColors['A'] + '33', color: raciColors['A'] }}>A</Badge>
                  <span className="text-sm text-slate-300">Accountable - Final authority</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge style={{ backgroundColor: raciColors['C'] + '33', color: raciColors['C'] }}>C</Badge>
                  <span className="text-sm text-slate-300">Consulted - Provides input</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge style={{ backgroundColor: raciColors['I'] + '33', color: raciColors['I'] }}>I</Badge>
                  <span className="text-sm text-slate-300">Informed - Kept updated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KPIs Tab */}
        <TabsContent value="kpis">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* KPI Distribution Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">KPIs by Category</CardTitle>
                <CardDescription className="text-slate-400">
                  {kpiDefinitions.length} metrics tracked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={kpiCountByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="count"
                        label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                        labelLine={false}
                      >
                        {kpiCountByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                      />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value, entry: any) => (
                          <span style={{ color: '#cbd5e1' }}>{entry.payload.name} ({entry.payload.count})</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* KPI List by Category */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">KPI Definitions</CardTitle>
                  <CardDescription className="text-slate-400">
                    Metrics with targets and measurement frequency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {kpiCategories.map((category, catIdx) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[catIdx % COLORS.length] }}
                          />
                          {category}
                        </h3>
                        <div className="grid gap-2">
                          {getKPIsByCategory(category).map((kpi) => (
                            <div key={kpi.id} className="p-3 rounded-lg bg-slate-700/50">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-white">{kpi.name}</span>
                                <div className="flex gap-2">
                                  {kpi.target && (
                                    <Badge className="bg-emerald-500/20 text-emerald-400">
                                      Target: {kpi.target}
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className="border-slate-500 text-slate-400">
                                    {kpi.frequency}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-slate-400">{kpi.description}</p>
                              {kpi.formula && (
                                <p className="text-xs text-slate-500 mt-1 font-mono">{kpi.formula}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Sample Operations Dashboard</CardTitle>
              <CardDescription className="text-slate-400">
                Real-time metrics for stakeholder visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {sampleDashboardMetrics.map((metric) => (
                  <div key={metric.id} className="p-4 rounded-lg bg-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-slate-400">{metric.name}</span>
                      {metric.status === 'good' && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                      {metric.status === 'warning' && <AlertCircle className="h-5 w-5 text-amber-400" />}
                      {metric.status === 'critical' && <AlertCircle className="h-5 w-5 text-red-400" />}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-white">{metric.currentValue}</span>
                      <div className="flex items-center gap-1 mb-1">
                        {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                        {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-400" />}
                        {metric.trend === 'stable' && <Minus className="h-4 w-4 text-slate-400" />}
                        <span className="text-xs text-slate-500">from {metric.previousValue}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Target: {metric.target}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <div className="space-y-4">
            {documentTemplates.map((template, i) => (
              <Card key={template.id} className="bg-slate-800/50 border-slate-700">
                <div
                  className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5" style={{ color: COLORS[i % COLORS.length] }} />
                      <div>
                        <h3 className="font-semibold text-white">{template.name}</h3>
                        <p className="text-sm text-slate-400">{template.purpose}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="border-slate-500 text-slate-400">
                        {template.fields.length} fields
                      </Badge>
                      {expandedTemplate === template.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedTemplate === template.id && (
                  <div className="border-t border-slate-700 p-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Form Fields</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      {template.fields.map((field, j) => (
                        <div key={j} className="p-2 rounded bg-slate-700/30 flex justify-between items-center">
                          <span className="text-sm text-slate-300">{field.name}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                              {field.type}
                            </Badge>
                            {field.required && (
                              <Badge className="bg-red-500/20 text-red-400 text-xs">Required</Badge>
                            )}
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

        {/* Roles Tab */}
        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-2">
            {operationalRoles.map((role, i) => (
              <Card key={role.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5" style={{ color: COLORS[i % COLORS.length] }} />
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {role.fte > 0 ? `${role.fte} FTE dedicated` : 'Faculty pool (not dedicated FTE)'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Responsibilities</h4>
                    <ul className="space-y-1">
                      {role.responsibilities.map((resp, j) => (
                        <li key={j} className="text-sm text-slate-400 flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Qualifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.qualifications.map((qual, j) => (
                        <Badge key={j} variant="outline" className="border-slate-500 text-slate-300">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Monthly Review Tab */}
        <TabsContent value="review">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                Monthly Operations Review Agenda
              </CardTitle>
              <CardDescription className="text-slate-400">
                Standard agenda for continuous quality improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />

                <div className="space-y-4">
                  {monthlyReviewAgenda.map((item, i) => (
                    <div key={item.id} className="relative pl-14">
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
                            <h4 className="font-semibold text-white">{item.topic}</h4>
                            <p className="text-sm text-slate-400">{item.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-slate-500 text-slate-400">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500">
                          Owner: {item.owner}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="font-medium text-blue-400 mb-2">Review Best Practices</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Schedule monthly (same day/time for consistency)</li>
                  <li>• Invite Education Director, sim staff, and department representatives</li>
                  <li>• Distribute dashboard metrics 2 days before meeting</li>
                  <li>• Maintain minutes and track action items</li>
                  <li>• Conduct quarterly deep-dives aligned with accreditation standards</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
