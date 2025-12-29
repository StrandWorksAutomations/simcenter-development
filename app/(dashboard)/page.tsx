"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Calendar,
  Users,
  AlertTriangle,
  TrendingUp,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  ArrowRight,
  Activity,
  Target,
  Shield,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import {
  getDashboardStats,
  getUnifiedTimeline,
  getUnifiedRisks,
  promptStatuses,
  getPromptProgress,
  calculateBudgetSummary
} from "@/data/seed/project-data"
import { useSimulationStore } from "@/store/simulation-store"

// Get static data from the hub
const staticStats = getDashboardStats()
const timeline = getUnifiedTimeline()
const risks = getUnifiedRisks()
const budget = calculateBudgetSummary()
const planningProgress = getPromptProgress()

// Format currency
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  return `$${(value / 1000).toFixed(0)}K`
}

export default function DashboardPage() {
  // Get live budget data from store
  const { params, results } = useSimulationStore()

  const topRisks = risks.slice(0, 4)
  const completedModules = promptStatuses.filter(p => p.status === 'complete')

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Project Overview</h1>
          <p className="text-muted-foreground">
            Baptist Health Lexington Simulation Center Development
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1">
          Phase 1 Planning
        </Badge>
      </div>

      {/* Key metrics - using live data from Budget Simulator */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Sparkles className="h-3 w-3 text-blue-400" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Phase 1 CAPEX
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(results.capex.net)}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">5-Year Total:</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(results.fiveYear.totalCost)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Timeline
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staticStats.timelineMonths} Months</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={staticStats.progressPercent} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground">{staticStats.progressPercent}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Sparkles className="h-3 w-3 text-blue-400" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Staffing (FTE)
            </CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{params.coreFTE.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Core staff + {params.facultyAllocationPercent}% faculty allocation
            </p>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Risk Status
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staticStats.totalRisks} Identified</div>
            <p className="text-xs text-muted-foreground">
              {staticStats.highRisks} high priority requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget breakdown */}
      <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget Allocation
          </CardTitle>
          <CardDescription>
            Phase 1 capital and equipment investment breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { id: 'construction', name: 'Construction', amount: results.capex.construction, category: 'capital', description: 'Facility renovation & buildout' },
              { id: 'equipment', name: 'Equipment', amount: results.capex.equipment, category: 'equipment', description: 'Simulators & task trainers' },
              { id: 'av-system', name: 'A/V System', amount: results.capex.avSystem, category: 'equipment', description: 'Recording & debriefing systems' },
              { id: 'contingency', name: 'Contingency', amount: results.capex.contingency, category: 'contingency', description: `${params.contingencyPercent}% reserve` }
            ].map((cat) => (
              <div key={cat.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 text-muted-foreground">{cat.name}</span>
                  <span className="font-medium">{formatCurrency(cat.amount)}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cat.category === 'capital' ? 'bg-blue-500' :
                      cat.category === 'equipment' ? 'bg-emerald-500' :
                      cat.category === 'contingency' ? 'bg-amber-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${(cat.amount / results.capex.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total Phase 1 Investment</span>
                <Sparkles className="h-3 w-3 text-blue-400" />
              </div>
              <div className="text-xl font-bold">{formatCurrency(results.capex.net)}</div>
            </div>
            <Link href="/budget" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
              Open Budget Simulator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Timeline */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Project Timeline
            </CardTitle>
            <CardDescription>
              12-month implementation from design to go-live
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((phase, index) => (
                <div key={phase.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {phase.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : phase.status === 'in_progress' ? (
                      <Clock className="h-5 w-5 text-blue-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-border" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{phase.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Month {phase.startMonth + 1}{phase.endMonth > phase.startMonth ? `-${phase.endMonth + 1}` : ''}
                    </p>
                  </div>
                  <Badge
                    variant={
                      phase.status === 'completed' ? 'default' :
                      phase.status === 'in_progress' ? 'secondary' :
                      'outline'
                    }
                    className="text-xs"
                  >
                    {phase.status === 'completed' ? 'Complete' :
                     phase.status === 'in_progress' ? 'Active' :
                     'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Risks */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Top Risks
            </CardTitle>
            <CardDescription>
              Highest priority risks by score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRisks.map((risk) => (
                <div key={risk.id} className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    risk.riskScore >= 8 ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                    risk.riskScore >= 6 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400' :
                    risk.riskScore >= 4 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                    'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                  }`}>
                    {risk.riskScore}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{risk.title}</p>
                    <p className="text-xs text-muted-foreground">{risk.category}</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {risk.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/risks" className="mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1">
              View all {staticStats.totalRisks} risks <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Planning Progress */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Planning Progress
            </CardTitle>
            <CardDescription>
              Module completion ({planningProgress.complete}/{planningProgress.total})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Progress value={planningProgress.percent} className="flex-1 h-2" />
                <span className="text-sm font-medium">{planningProgress.percent}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {completedModules.map((module) => (
                  <Link
                    key={module.id}
                    href={module.pageRoute || '#'}
                    className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 truncate">
                      {module.title}
                    </span>
                  </Link>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {planningProgress.total - planningProgress.complete} modules remaining
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Navigation
            </CardTitle>
            <CardDescription>
              Jump to key project areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/construction" className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <Building2 className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-sm font-medium">Construction</span>
                <span className="text-xs text-muted-foreground">{formatCurrency(results.capex.construction)}</span>
              </Link>
              <Link href="/benchmarks" className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <Target className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-sm font-medium">Benchmarks</span>
                <span className="text-xs text-muted-foreground">11 Centers</span>
              </Link>
              <Link href="/investor-deck" className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-500 mb-2" />
                <span className="text-sm font-medium">Investor Deck</span>
                <span className="text-xs text-muted-foreground">Presentation</span>
              </Link>
              <Link href="/risks" className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <AlertTriangle className="h-6 w-6 text-amber-500 mb-2" />
                <span className="text-sm font-medium">Risk Register</span>
                <span className="text-xs text-muted-foreground">{staticStats.totalRisks} Risks</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facility summary - Live from Budget Simulator */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-emerald-900/30 border-blue-800 dark:border-blue-700 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <Sparkles className="h-4 w-4 text-blue-400" />
        </div>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-accent rounded-lg shadow-sm">
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg">Phase 1: {params.simRooms}-Room Simulation Center</h3>
              <p className="text-sm text-slate-300 mt-1">
                {params.floorArea.toLocaleString()} SF facility with {params.highFidelityManikins} high-fidelity manikins
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{params.simRooms}</div>
                  <div className="text-xs text-muted-foreground">Simulation Suites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">{params.controlRooms}</div>
                  <div className="text-xs text-muted-foreground">Control Room{params.controlRooms > 1 ? 's' : ''}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{params.debriefRooms}</div>
                  <div className="text-xs text-muted-foreground">Debrief Room{params.debriefRooms > 1 ? 's' : ''}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">{staticStats.timelineMonths}</div>
                  <div className="text-xs text-muted-foreground">Months to Go-Live</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
