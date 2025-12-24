"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  Building2,
  Users,
  BookOpen,
  ClipboardCheck,
  Settings,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Circle,
  Calendar,
  FileText,
  ArrowRight
} from "lucide-react"
import {
  ACCREDITATION_DOMAINS,
  CLOSURE_ACTIVITIES,
  EVIDENCE_BINDER,
  MOCK_SURVEY_TIMELINE,
  getGapSummary,
  getActivitiesByYear,
  getStats,
  type AccreditationDomain,
  type AccreditationStandard
} from "@/data/seed/accreditation"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Building2': Building2,
  'Users': Users,
  'BookOpen': BookOpen,
  'ClipboardCheck': ClipboardCheck,
  'Settings': Settings,
  'TrendingUp': TrendingUp
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Award
}

const STATUS_COLORS = {
  'met': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'partial': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  'gap': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
}

function GapAnalysisView() {
  const [selectedDomain, setSelectedDomain] = useState<string>('mission-governance')
  const gapSummary = getGapSummary()
  const progress = (gapSummary.met / gapSummary.total) * 100

  const domain = ACCREDITATION_DOMAINS.find(d => d.id === selectedDomain)

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-base">Accreditation Readiness</CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400">
              {gapSummary.met}/{gapSummary.total} Standards Met
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2 mb-3" />
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-400">Met: {gapSummary.met}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xs text-slate-400">Partial: {gapSummary.partial}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-slate-400">Gap: {gapSummary.gap}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Selection */}
      <div className="flex gap-2 flex-wrap">
        {ACCREDITATION_DOMAINS.map(d => {
          const Icon = getIcon(d.icon)
          const domainMet = d.standards.filter(s => s.currentStatus === 'met').length
          const domainTotal = d.standards.length
          return (
            <Badge
              key={d.id}
              className={`cursor-pointer transition-all ${
                selectedDomain === d.id
                  ? 'bg-blue-500/30 text-blue-300'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
              onClick={() => setSelectedDomain(d.id)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {d.name.split(' ')[0]} ({domainMet}/{domainTotal})
            </Badge>
          )
        })}
      </div>

      {/* Domain Standards */}
      {domain && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                {(() => {
                  const Icon = getIcon(domain.icon)
                  return <Icon className="h-5 w-5 text-blue-400" />
                })()}
              </div>
              <div>
                <CardTitle className="text-white text-base">{domain.name}</CardTitle>
                <CardDescription className="text-xs">{domain.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {domain.standards.map(standard => {
                const statusColors = STATUS_COLORS[standard.currentStatus]
                return (
                  <div key={standard.id} className={`p-4 rounded-lg ${statusColors.bg} border ${statusColors.border}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{standard.name}</span>
                          <Badge className={`${statusColors.bg} ${statusColors.text} text-[10px]`}>
                            {standard.currentStatus === 'met' ? 'Met' : standard.currentStatus === 'partial' ? 'Partial' : 'Gap'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{standard.description}</p>
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-xs">
                        Target: Year {standard.targetYear}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Evidence Required:</div>
                        <ul className="space-y-0.5">
                          {standard.evidence.map((e, i) => (
                            <li key={i} className="text-xs text-slate-400 flex items-start gap-1">
                              <FileText className="h-2 w-2 text-slate-600 mt-1 shrink-0" />
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {standard.actionItems.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Action Items:</div>
                          <ul className="space-y-0.5">
                            {standard.actionItems.map((a, i) => (
                              <li key={i} className="text-xs text-slate-400 flex items-start gap-1">
                                <ArrowRight className="h-2 w-2 text-amber-400 mt-1 shrink-0" />
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ClosurePlanView() {
  const [selectedYear, setSelectedYear] = useState<number>(0)
  const activities = getActivitiesByYear(selectedYear)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[0, 1, 2].map(year => (
          <Badge
            key={year}
            className={`cursor-pointer transition-all ${
              selectedYear === year
                ? 'bg-blue-500/30 text-blue-300'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }`}
            onClick={() => setSelectedYear(year)}
          >
            Year {year}
          </Badge>
        ))}
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">
            Year {selectedYear} Closure Activities
          </CardTitle>
          <CardDescription>
            {activities.length} activities planned for Year {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activities.map(activity => (
              <div key={activity.id} className="flex gap-3 p-3 rounded bg-slate-700/30">
                <Badge variant="outline" className="border-slate-600 shrink-0">
                  {activity.quarter}
                </Badge>
                <div className="flex-1">
                  <div className="text-sm text-white">{activity.activity}</div>
                  <div className="flex gap-4 mt-1 text-xs text-slate-500">
                    <span><strong>Owner:</strong> {activity.responsible}</span>
                    <span><strong>Domain:</strong> {activity.domain}</span>
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">
                    <strong>Deliverable:</strong> {activity.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EvidenceBinderView() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {EVIDENCE_BINDER.map(section => (
        <Card key={section.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">{section.section}</CardTitle>
            <CardDescription className="text-xs">{section.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {section.documents.map((doc, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <FileText className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MockSurveyView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Mock Survey Readiness Timeline
          </CardTitle>
          <CardDescription>
            12-month countdown to accreditation survey
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700"></div>

        <div className="space-y-4">
          {MOCK_SURVEY_TIMELINE.map((milestone, i) => (
            <div key={milestone.id} className="flex gap-4 pl-4">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                milestone.monthsBefore === 0 ? 'bg-emerald-500' : 'bg-blue-500'
              }`}>
                <span className="text-[10px] text-white font-bold">
                  {milestone.monthsBefore === 0 ? '!' : milestone.monthsBefore}
                </span>
              </div>

              <Card className="flex-1 bg-slate-800/50 border-slate-700">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{milestone.activity}</span>
                    <Badge variant="outline" className="border-slate-600 text-xs">
                      {milestone.monthsBefore === 0 ? 'Survey Day' : `${milestone.monthsBefore} months before`}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">{milestone.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AccreditationPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accreditation Readiness</h1>
          <p className="text-slate-400">Gap analysis and multi-year closure plan</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Award className="h-3 w-3" />
          Prompt 23 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Domains</div>
            <div className="text-2xl font-bold text-white">{stats.domains}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Standards</div>
            <div className="text-2xl font-bold text-blue-400">{stats.standards}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Standards Met</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.met}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Gaps to Close</div>
            <div className="text-2xl font-bold text-red-400">{stats.gaps}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Closure Activities</div>
            <div className="text-2xl font-bold text-amber-400">{stats.closureActivities}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gap" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="gap" className="data-[state=active]:bg-slate-700">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Gap Analysis
          </TabsTrigger>
          <TabsTrigger value="closure" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Closure Plan
          </TabsTrigger>
          <TabsTrigger value="binder" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Evidence Binder
          </TabsTrigger>
          <TabsTrigger value="survey" className="data-[state=active]:bg-slate-700">
            <Award className="h-4 w-4 mr-2" />
            Mock Survey
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gap">
          <GapAnalysisView />
        </TabsContent>

        <TabsContent value="closure">
          <ClosurePlanView />
        </TabsContent>

        <TabsContent value="binder">
          <EvidenceBinderView />
        </TabsContent>

        <TabsContent value="survey">
          <MockSurveyView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
