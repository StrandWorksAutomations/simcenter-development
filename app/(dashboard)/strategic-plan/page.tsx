"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Compass,
  Target,
  Shield,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Flag,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Building2,
  Award,
  Eye
} from "lucide-react"
import {
  MISSION,
  VISION,
  GUIDING_PRINCIPLES,
  ANNUAL_PRIORITIES,
  MILESTONES,
  SCORECARD_METRICS,
  GOVERNANCE_ROLES,
  getMilestonesByYear,
  getStats,
  type AnnualPriority,
  type Milestone
} from "@/data/seed/strategic-plan"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Shield': Shield,
  'Target': Target,
  'Users': Users,
  'FileText': FileText,
  'TrendingUp': TrendingUp
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Target
}

const YEAR_COLORS = [
  { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
  { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' }
]

function MissionVisionView() {
  return (
    <div className="space-y-6">
      {/* Mission */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Target className="h-6 w-6 text-blue-400" />
            </div>
            <CardTitle className="text-white text-xl">Mission</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{MISSION}</p>
        </CardContent>
      </Card>

      {/* Vision */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-slate-800/50 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <Eye className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle className="text-white text-xl">Vision</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{VISION}</p>
        </CardContent>
      </Card>

      {/* Guiding Principles */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Compass className="h-5 w-5 text-amber-400" />
            Guiding Principles
          </CardTitle>
          <CardDescription>
            Core principles aligned with Baptist Health's values and national best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GUIDING_PRINCIPLES.map(principle => {
              const Icon = getIcon(principle.icon)
              return (
                <div key={principle.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-amber-500/20">
                      <Icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-sm font-medium text-white">{principle.name}</span>
                  </div>
                  <p className="text-xs text-slate-400">{principle.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnnualPrioritiesView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            5-Year Strategic Roadmap
          </CardTitle>
          <CardDescription>
            Annual priorities mapping to BHLEX simulation targets
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {ANNUAL_PRIORITIES.map((priority, i) => {
          const colors = YEAR_COLORS[i % YEAR_COLORS.length]
          return (
            <Card key={priority.id} className={`bg-slate-800/50 border-slate-700`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                    {priority.year}
                  </Badge>
                  <div>
                    <CardTitle className="text-white text-base">{priority.theme}</CardTitle>
                    <CardDescription className="text-xs">{priority.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {priority.priorities.map((p, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className={`h-3 w-3 ${colors.text} mt-0.5 shrink-0`} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function MilestonesView() {
  const [selectedYear, setSelectedYear] = useState<string>('Year 0')
  const years = ['Year 0', 'Year 1', 'Year 2']

  const milestones = getMilestonesByYear(selectedYear)

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Flag className="h-5 w-5 text-emerald-400" />
                Quarterly Milestones
              </CardTitle>
              <CardDescription>
                Detailed deliverables by quarter for Years 0-2
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {years.map((year, i) => (
                <Badge
                  key={year}
                  className={`cursor-pointer transition-all ${
                    selectedYear === year
                      ? `${YEAR_COLORS[i].bg} ${YEAR_COLORS[i].text}`
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700 hidden md:block"></div>

        <div className="space-y-4">
          {milestones.map((milestone, i) => (
            <div key={milestone.id} className="flex gap-4 md:pl-4">
              {/* Timeline dot */}
              <div className="hidden md:flex w-5 h-5 rounded-full bg-blue-500 items-center justify-center shrink-0 z-10 mt-4">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              <Card className="flex-1 bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-slate-600 text-xs">
                      {milestone.quarter}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                      {milestone.targetArea}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-sm">{milestone.title}</CardTitle>
                  <CardDescription className="text-xs">{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {milestone.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-slate-400">
                        <ArrowRight className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScorecardView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Implementation Scorecard
          </CardTitle>
          <CardDescription>
            Key performance indicators tracking progress against strategic targets
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {SCORECARD_METRICS.map(metric => (
          <Card key={metric.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">{metric.target}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-2">
                {metric.kpis.map((kpi, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                    {kpi}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="p-3 rounded bg-slate-700/30">
                  <div className="text-xs text-slate-500 mb-1">Baseline (Year 0)</div>
                  <div className="text-xs text-slate-300">{metric.baseline}</div>
                </div>
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <div className="text-xs text-blue-400 mb-1">Year 1 Goal</div>
                  <div className="text-xs text-slate-300">{metric.year1Goal}</div>
                </div>
                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-xs text-emerald-400 mb-1">Year 3 Goal</div>
                  <div className="text-xs text-slate-300">{metric.year3Goal}</div>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                  <div className="text-xs text-purple-400 mb-1">Year 5 Goal</div>
                  <div className="text-xs text-slate-300">{metric.year5Goal}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function GovernanceView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-400" />
            Governance Model
          </CardTitle>
          <CardDescription>
            Structure ensuring alignment with organizational goals and accountability for results
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {GOVERNANCE_ROLES.map(role => (
          <Card key={role.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">{role.name}</CardTitle>
                  <CardDescription className="text-xs">{role.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {role.responsibilities.map((r, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-purple-400 mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function StrategicPlanPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Strategic Plan</h1>
          <p className="text-slate-400">3-5 year simulation program roadmap aligned to BHLEX metrics</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Compass className="h-3 w-3" />
          Prompt 19 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Guiding Principles</div>
            <div className="text-2xl font-bold text-white">{stats.guidingPrinciples}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Annual Priorities</div>
            <div className="text-2xl font-bold text-blue-400">{stats.annualPriorities}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Quarterly Milestones</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.milestones}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Scorecard Metrics</div>
            <div className="text-2xl font-bold text-amber-400">{stats.scorecardMetrics}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Governance Roles</div>
            <div className="text-2xl font-bold text-purple-400">{stats.governanceRoles}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mission" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="mission" className="data-[state=active]:bg-slate-700">
            <Target className="h-4 w-4 mr-2" />
            Mission & Vision
          </TabsTrigger>
          <TabsTrigger value="priorities" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Annual Priorities
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-700">
            <Flag className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="scorecard" className="data-[state=active]:bg-slate-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Scorecard
          </TabsTrigger>
          <TabsTrigger value="governance" className="data-[state=active]:bg-slate-700">
            <Building2 className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mission">
          <MissionVisionView />
        </TabsContent>

        <TabsContent value="priorities">
          <AnnualPrioritiesView />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestonesView />
        </TabsContent>

        <TabsContent value="scorecard">
          <ScorecardView />
        </TabsContent>

        <TabsContent value="governance">
          <GovernanceView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
