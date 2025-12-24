"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Plus,
  Shield,
  CheckCircle2,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp
} from "lucide-react"

import {
  riskRegister,
  complianceChecklist,
  riskSummary,
  getRiskMatrix,
  type Risk,
  type RiskImpact,
  type RiskProbability
} from "@/data/seed/risks"

// Color mappings with dark mode support
const impactColors: Record<RiskImpact, { bg: string; text: string; cell: string }> = {
  low: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-800 dark:text-green-300", cell: "bg-green-50 dark:bg-green-900/20" },
  medium: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-800 dark:text-yellow-300", cell: "bg-yellow-50 dark:bg-yellow-900/20" },
  high: { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-800 dark:text-orange-300", cell: "bg-orange-50 dark:bg-orange-900/20" },
  critical: { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-800 dark:text-red-300", cell: "bg-red-50 dark:bg-red-900/20" }
}

const probabilityColors: Record<RiskProbability, { bg: string; text: string }> = {
  low: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-800 dark:text-green-300" },
  medium: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-800 dark:text-yellow-300" },
  high: { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-800 dark:text-red-300" }
}

const statusColors = {
  identified: { bg: "bg-slate-100 dark:bg-slate-700", text: "text-slate-800 dark:text-slate-200", icon: AlertTriangle },
  mitigating: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-800 dark:text-blue-300", icon: Clock },
  resolved: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-800 dark:text-green-300", icon: CheckCircle2 },
  accepted: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-800 dark:text-purple-300", icon: Shield },
  monitoring: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-800 dark:text-amber-300", icon: Clock }
}

const categoryColors = {
  privacy: "bg-purple-500",
  security: "bg-red-500",
  compliance: "bg-blue-500",
  operational: "bg-green-500",
  financial: "bg-amber-500",
  technical: "bg-cyan-500",
  safety: "bg-orange-500"
}

export default function RisksPage() {
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  // Get risk matrix data
  const riskMatrix = getRiskMatrix()

  // Filter risks
  const filteredRisks = filterCategory
    ? riskRegister.filter(r => r.category === filterCategory)
    : riskRegister

  // Heat map cell calculation
  const getHeatMapCell = (impact: RiskImpact, probability: RiskProbability) => {
    const count = riskMatrix.find(
      m => m.impact === impact && m.probability === probability
    )?.count || 0

    const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[impact]
    const probScore = { low: 1, medium: 2, high: 3 }[probability]
    const score = impactScore * probScore

    let bgColor = "bg-green-100"
    if (score >= 9) bgColor = "bg-red-200"
    else if (score >= 6) bgColor = "bg-orange-200"
    else if (score >= 3) bgColor = "bg-yellow-100"

    return { count, bgColor }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Risk Management</h1>
          <p className="text-slate-500">Risk register, heat map, and compliance tracking</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Risk
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskSummary.totalRisks}</div>
            <p className="text-xs text-slate-500">In register</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">High Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{riskSummary.highRiskCount}</div>
            <p className="text-xs text-slate-500">Score 6+</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Critical Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{riskSummary.criticalImpactCount}</div>
            <p className="text-xs text-slate-500">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Mitigating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {riskRegister.filter(r => r.status === 'mitigating').length}
            </div>
            <p className="text-xs text-slate-500">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(complianceChecklist.filter(c => c.status === 'compliant').length / complianceChecklist.length * 100)}%
            </div>
            <p className="text-xs text-slate-500">Items complete</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">Risk Register</TabsTrigger>
          <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="register" className="space-y-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(null)}
            >
              All ({riskRegister.length})
            </Button>
            {Object.entries(riskSummary.byCategory).map(([cat, count]) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(cat)}
                className="capitalize"
              >
                <span className={`w-2 h-2 rounded-full mr-2 ${categoryColors[cat as keyof typeof categoryColors]}`} />
                {cat} ({count})
              </Button>
            ))}
          </div>

          {/* Risk list */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Register ({filteredRisks.length} risks)</CardTitle>
              <CardDescription>Click to expand details and controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredRisks.map((risk) => {
                  const StatusIcon = statusColors[risk.status].icon
                  const isExpanded = expandedRisk === risk.id

                  return (
                    <div
                      key={risk.id}
                      className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                    >
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setExpandedRisk(isExpanded ? null : risk.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-1 h-12 rounded ${categoryColors[risk.category]}`} />
                          <div>
                            <p className="font-medium">{risk.title}</p>
                            <p className="text-xs text-slate-500 capitalize">{risk.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-center px-2">
                            <p className="text-xs text-slate-500">Score</p>
                            <p className={`font-bold ${risk.riskScore >= 6 ? 'text-red-600' : risk.riskScore >= 3 ? 'text-amber-600' : 'text-green-600'}`}>
                              {risk.riskScore}
                            </p>
                          </div>
                          <Badge className={`${impactColors[risk.impact].bg} ${impactColors[risk.impact].text}`}>
                            {risk.impact}
                          </Badge>
                          <Badge className={`${probabilityColors[risk.probability].bg} ${probabilityColors[risk.probability].text}`}>
                            {risk.probability}
                          </Badge>
                          <Badge className={`${statusColors[risk.status].bg} ${statusColors[risk.status].text}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {risk.status}
                          </Badge>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Description</p>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{risk.description}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium mb-2">Mitigation Strategy</p>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{risk.mitigation}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Controls ({risk.controls.length})</p>
                            <div className="flex flex-wrap gap-1">
                              {risk.controls.map((control, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                                  {control}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Owner: {risk.owner}</span>
                            <span>Review: {risk.reviewDate || 'Not scheduled'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Heat Map</CardTitle>
                <CardDescription>Probability vs Impact matrix</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        <th colSpan={4} className="text-center text-xs font-medium text-slate-500 pb-2">IMPACT</th>
                      </tr>
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2 text-xs font-medium text-slate-600">Low</th>
                        <th className="p-2 text-xs font-medium text-slate-600">Medium</th>
                        <th className="p-2 text-xs font-medium text-slate-600">High</th>
                        <th className="p-2 text-xs font-medium text-slate-600">Critical</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(['high', 'medium', 'low'] as RiskProbability[]).map((prob, pi) => (
                        <tr key={prob}>
                          {pi === 0 && (
                            <td rowSpan={3} className="p-2 text-xs font-medium text-slate-500 align-middle">
                              <span className="transform -rotate-90 inline-block whitespace-nowrap">
                                PROBABILITY
                              </span>
                            </td>
                          )}
                          <td className="p-1 text-xs text-slate-600 capitalize">{prob}</td>
                          {(['low', 'medium', 'high', 'critical'] as RiskImpact[]).map((impact) => {
                            const cell = getHeatMapCell(impact, prob)
                            return (
                              <td key={impact} className={`p-2 text-center ${cell.bgColor} border`}>
                                <span className="font-bold text-lg">{cell.count}</span>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-100 dark:bg-green-900/40 rounded" />
                    <span className="text-slate-700 dark:text-slate-300">Low (1-2)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/40 rounded" />
                    <span className="text-slate-700 dark:text-slate-300">Medium (3-5)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-orange-200 dark:bg-orange-900/40 rounded" />
                    <span className="text-slate-700 dark:text-slate-300">High (6-8)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-red-200 dark:bg-red-900/40 rounded" />
                    <span className="text-slate-700 dark:text-slate-300">Critical (9+)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Breakdown by category and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2 dark:text-slate-200">By Category</p>
                  <div className="space-y-2">
                    {Object.entries(riskSummary.byCategory).map(([cat, count]) => (
                      <div key={cat} className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded ${categoryColors[cat as keyof typeof categoryColors]}`} />
                        <span className="text-sm capitalize flex-1 dark:text-slate-300">{cat}</span>
                        <span className="font-medium dark:text-slate-200">{count}</span>
                        <div className="w-20 bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${categoryColors[cat as keyof typeof categoryColors]}`}
                            style={{ width: `${(count / riskSummary.totalRisks) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2 dark:text-slate-200">By Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(statusColors).map(([status, colors]) => {
                      const count = riskRegister.filter(r => r.status === status).length
                      const Icon = colors.icon
                      return (
                        <div key={status} className={`p-2 rounded-lg ${colors.bg}`}>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${colors.text}`} />
                            <span className={`text-sm capitalize ${colors.text}`}>{status}</span>
                          </div>
                          <p className={`text-xl font-bold ${colors.text}`}>{count}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Recording Privacy Compliance</CardTitle>
              <CardDescription>HIPAA-adjacent controls and policy requirements</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Group by category */}
              {['Consent & Notification', 'Data Security', 'Retention & Deletion', 'Access Control', 'Vendor Management'].map(category => {
                const items = complianceChecklist.filter(c => c.category === category)
                const compliantCount = items.filter(i => i.status === 'compliant').length

                return (
                  <div key={category} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{category}</h3>
                      <Badge variant="outline">
                        {compliantCount}/{items.length} complete
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border ${
                            item.status === 'compliant' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                            item.status === 'in_progress' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                            'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {item.status === 'compliant' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : item.status === 'in_progress' ? (
                            <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm dark:text-slate-200">{item.requirement}</p>
                            {item.evidence && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Evidence: {item.evidence}</p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              item.status === 'compliant' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700' :
                              item.status === 'in_progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700' :
                              'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                            }
                          >
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
