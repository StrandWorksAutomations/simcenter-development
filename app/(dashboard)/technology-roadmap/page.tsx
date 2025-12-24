"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cpu,
  Video,
  Glasses,
  Brain,
  Database,
  Globe,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Users,
  Shield,
  ArrowRight
} from "lucide-react"
import {
  TECH_INITIATIVES,
  INITIATIVE_BUDGETS,
  EVALUATION_CRITERIA,
  GOVERNANCE_ROLES,
  PIPELINE_STAGES,
  getStats,
  type TechInitiative
} from "@/data/seed/technology-roadmap"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Video': Video,
  'Glasses': Glasses,
  'Brain': Brain,
  'Database': Database,
  'Globe': Globe
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Cpu
}

const YEAR_COLORS = [
  'bg-blue-500/20 text-blue-400',
  'bg-emerald-500/20 text-emerald-400',
  'bg-amber-500/20 text-amber-400',
  'bg-purple-500/20 text-purple-400',
  'bg-cyan-500/20 text-cyan-400'
]

function RoadmapView() {
  const [selectedInitiative, setSelectedInitiative] = useState<string>('av-analytics')

  const initiative = TECH_INITIATIVES.find(t => t.id === selectedInitiative)

  return (
    <div className="space-y-4">
      {/* Pipeline Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">Innovation Pipeline Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-[100px]">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${YEAR_COLORS[i]}`}>
                    <span className="text-sm font-bold">{i + 1}</span>
                  </div>
                  <span className="text-xs font-medium text-white mt-2">{stage.name}</span>
                  <span className="text-[10px] text-slate-500 text-center">{stage.description}</span>
                </div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-slate-600 mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Initiative Selection */}
      <div className="flex gap-2 flex-wrap">
        {TECH_INITIATIVES.map(init => {
          const Icon = getIcon(init.icon)
          return (
            <Badge
              key={init.id}
              className={`cursor-pointer transition-all ${
                selectedInitiative === init.id
                  ? 'bg-blue-500/30 text-blue-300 border-blue-500/50'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
              onClick={() => setSelectedInitiative(init.id)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {init.shortName}
            </Badge>
          )
        })}
      </div>

      {/* Selected Initiative Details */}
      {initiative && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                {(() => {
                  const Icon = getIcon(initiative.icon)
                  return <Icon className="h-5 w-5 text-blue-400" />
                })()}
              </div>
              <div>
                <CardTitle className="text-white text-base">{initiative.name}</CardTitle>
                <CardDescription className="text-xs">{initiative.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Benefits and Risks */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-xs font-medium text-emerald-400 mb-2">Benefits</div>
                <ul className="space-y-1">
                  {initiative.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20">
                <div className="text-xs font-medium text-amber-400 mb-2">Risks</div>
                <ul className="space-y-1">
                  {initiative.risks.map((r, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Year-by-Year Timeline */}
            <div className="text-xs font-medium text-slate-300 mb-2">5-Year Timeline</div>
            <div className="space-y-2">
              {initiative.years.map((year, i) => (
                <div key={year.year} className="flex gap-3">
                  <Badge className={YEAR_COLORS[i]}>
                    Year {year.year}
                  </Badge>
                  <div className="flex-1 p-2 rounded bg-slate-700/30">
                    <div className="text-xs font-medium text-white mb-1">{year.phase}</div>
                    <ul className="space-y-0.5">
                      {year.activities.map((a, j) => (
                        <li key={j} className="text-xs text-slate-400 flex items-start gap-1">
                          <ArrowRight className="h-2 w-2 text-slate-600 mt-1 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function BudgetView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            Budget Planning Tiers
          </CardTitle>
          <CardDescription>
            Flexible budget ranges from $1-2M base to $20M moonshot investment
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {INITIATIVE_BUDGETS.map(budget => (
          <Card key={budget.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4">
              <div className="font-medium text-white text-sm mb-3">{budget.initiative}</div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <div className="text-xs font-medium text-blue-400 mb-1">Basic</div>
                  <div className="text-xs text-slate-400">{budget.basic}</div>
                </div>
                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-xs font-medium text-emerald-400 mb-1">Intermediate</div>
                  <div className="text-xs text-slate-400">{budget.intermediate}</div>
                </div>
                <div className="p-3 rounded bg-purple-500/10 border border-purple-500/20">
                  <div className="text-xs font-medium text-purple-400 mb-1">Moonshot</div>
                  <div className="text-xs text-slate-400">{budget.moonshot}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EvaluationView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Minimum Evaluation Standards for Adoption
          </CardTitle>
          <CardDescription>
            All pilots must satisfy these criteria before scale-up
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {EVALUATION_CRITERIA.map(criterion => (
          <Card key={criterion.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">{criterion.name}</CardTitle>
              <CardDescription className="text-xs">{criterion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Metrics:</div>
                  <div className="flex flex-wrap gap-1">
                    {criterion.metrics.map((m, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-xs text-emerald-400">
                    <strong>Threshold:</strong> {criterion.threshold}
                  </div>
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
            <Users className="h-5 w-5 text-purple-400" />
            Pilot Governance Committee
          </CardTitle>
          <CardDescription>
            Multidisciplinary oversight ensuring alignment, security, and value
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GOVERNANCE_ROLES.map((role, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">{role.role}</CardTitle>
              <CardDescription className="text-xs">{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {role.responsibilities.map((r, j) => (
                  <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
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

export default function TechnologyRoadmapPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Technology Roadmap</h1>
          <p className="text-slate-400">3-5 year innovation plan with controlled pilots</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Cpu className="h-3 w-3" />
          Prompt 22 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Tech Initiatives</div>
            <div className="text-2xl font-bold text-white">{stats.initiatives}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Evaluation Criteria</div>
            <div className="text-2xl font-bold text-blue-400">{stats.evaluationCriteria}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Governance Roles</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.governanceRoles}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Pipeline Stages</div>
            <div className="text-2xl font-bold text-amber-400">{stats.pipelineStages}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roadmap" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="roadmap" className="data-[state=active]:bg-slate-700">
            <Cpu className="h-4 w-4 mr-2" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-slate-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget Tiers
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="data-[state=active]:bg-slate-700">
            <Shield className="h-4 w-4 mr-2" />
            Evaluation Standards
          </TabsTrigger>
          <TabsTrigger value="governance" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap">
          <RoadmapView />
        </TabsContent>

        <TabsContent value="budget">
          <BudgetView />
        </TabsContent>

        <TabsContent value="evaluation">
          <EvaluationView />
        </TabsContent>

        <TabsContent value="governance">
          <GovernanceView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
