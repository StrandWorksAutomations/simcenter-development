"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  RefreshCw,
  Target,
  BarChart3,
  Search,
  Zap,
  Shield,
  AlertTriangle,
  AlertCircle,
  Activity,
  Bell,
  MessageSquare,
  Clock,
  Pill,
  User,
  Users,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from "lucide-react"
import {
  PI_PHASES,
  SAFETY_SIGNALS,
  PRIORITIZATION_CRITERIA,
  GOVERNANCE_MEETINGS,
  STANDARD_WORK,
  QUARTERLY_REPORT,
  EXAMPLE_PROJECTS,
  getStats,
  type PIPhase
} from "@/data/seed/process-improvement"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Target': Target,
  'BarChart': BarChart3,
  'Search': Search,
  'Zap': Zap,
  'Shield': Shield,
  'AlertTriangle': AlertTriangle,
  'AlertCircle': AlertCircle,
  'Activity': Activity,
  'Bell': Bell,
  'MessageSquare': MessageSquare,
  'Clock': Clock,
  'Pill': Pill,
  'User': User
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Target
}

const PHASE_COLORS = [
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
]

function PhaseCard({ phase, index }: { phase: PIPhase; index: number }) {
  const Icon = getIcon(phase.icon)
  const colorClass = PHASE_COLORS[index % PHASE_COLORS.length]

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClass.split(' ')[0]}`}>
            <Icon className={`h-5 w-5 ${colorClass.split(' ')[1]}`} />
          </div>
          <div>
            <Badge className={colorClass}>{phase.shortName}</Badge>
            <CardDescription className="text-xs mt-1">{phase.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-400 mb-3">{phase.description}</p>

        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-slate-300 mb-1">Key Activities:</div>
            <ul className="space-y-1">
              {phase.activities.slice(0, 4).map((activity, i) => (
                <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-300 mb-1">Tools:</div>
            <div className="flex flex-wrap gap-1">
              {phase.tools.map((tool, i) => (
                <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SafetySignalsView() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {SAFETY_SIGNALS.map(signal => {
        const Icon = getIcon(signal.icon)
        return (
          <Card key={signal.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Icon className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">{signal.name}</CardTitle>
                  <Badge variant="outline" className="text-[10px] border-slate-600 mt-1">
                    {signal.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-400 mb-2">{signal.description}</p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-300">Metrics:</div>
                <ul className="space-y-1">
                  {signal.metrics.map((metric, i) => (
                    <li key={i} className="text-xs text-slate-500">• {metric}</li>
                  ))}
                </ul>
                <div className="mt-2 p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-xs text-emerald-400">
                    <strong>Target:</strong> {signal.targetImprovement}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function PrioritizationView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Prioritization Scoring Matrix
          </CardTitle>
          <CardDescription>
            Score each improvement opportunity 1-5 on these criteria to determine priority ranking
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {PRIORITIZATION_CRITERIA.map(criterion => (
          <Card key={criterion.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">{criterion.name}</CardTitle>
                <Badge className="bg-blue-500/20 text-blue-400">
                  Weight: {criterion.weight}%
                </Badge>
              </div>
              <CardDescription className="text-xs">{criterion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {criterion.scoringGuide.map(guide => (
                  <div
                    key={guide.score}
                    className="flex items-start gap-3 p-2 rounded bg-slate-700/30"
                  >
                    <Badge
                      className={`shrink-0 ${
                        guide.score === 5 ? 'bg-emerald-500/20 text-emerald-400' :
                        guide.score === 4 ? 'bg-blue-500/20 text-blue-400' :
                        guide.score === 3 ? 'bg-amber-500/20 text-amber-400' :
                        guide.score === 2 ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {guide.score}
                    </Badge>
                    <span className="text-xs text-slate-400">{guide.description}</span>
                  </div>
                ))}
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
      {/* Governance Meetings */}
      <div className="grid md:grid-cols-2 gap-4">
        {GOVERNANCE_MEETINGS.map(meeting => (
          <Card key={meeting.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-sm">{meeting.name}</CardTitle>
                  <Badge variant="outline" className="text-[10px] border-slate-600 mt-1">
                    {meeting.frequency}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Attendees:</div>
                  <div className="flex flex-wrap gap-1">
                    {meeting.attendees.map((attendee, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Agenda:</div>
                  <ul className="space-y-1">
                    {meeting.agenda.map((item, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-purple-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-300 mb-1">Outputs:</div>
                  <ul className="space-y-1">
                    {meeting.outputs.map((output, i) => (
                      <li key={i} className="text-xs text-slate-500">• {output}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Standard Work */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Standard Work Documents
          </CardTitle>
          <CardDescription>
            Standardized templates and procedures for consistent PI execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-2">
            {STANDARD_WORK.map(doc => (
              <AccordionItem key={doc.id} value={doc.id} className="border-slate-700 bg-slate-700/30 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-white text-sm">{doc.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-slate-400">{doc.description}</p>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span><strong>Owner:</strong> {doc.owner}</span>
                      <span><strong>Frequency:</strong> {doc.frequency}</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-300 mb-1">Steps:</div>
                      <ol className="space-y-1">
                        {doc.steps.map((step, i) => (
                          <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                            <span className="text-blue-400 font-medium">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Quarterly PI Report Structure
          </CardTitle>
          <CardDescription>
            Standardized format for tracking and communicating improvement results
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {QUARTERLY_REPORT.map((section, i) => (
          <Card key={section.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <CardTitle className="text-white text-sm">{section.title}</CardTitle>
              </div>
              <CardDescription className="text-xs">{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="text-xs text-slate-500 flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-slate-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Example Projects */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            Example Improvement Projects
          </CardTitle>
          <CardDescription>
            Sample projects demonstrating the connection between safety signals and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {EXAMPLE_PROJECTS.map(project => (
              <div key={project.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                <h4 className="text-sm font-medium text-white mb-2">{project.name}</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Badge className="bg-red-500/20 text-red-400 shrink-0">Signal</Badge>
                    <span className="text-slate-400">{project.signal}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 shrink-0">Intervention</Badge>
                    <span className="text-slate-400">{project.intervention}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 shrink-0">Result</Badge>
                    <span className="text-slate-400">{project.result}</span>
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

export default function ProcessImprovementPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Process Improvement</h1>
          <p className="text-slate-400">Lean PDSA/DMAIC system tied to safety outcomes</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          Prompt 14 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <RefreshCw className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.phases}</div>
                <div className="text-xs text-slate-500">DMAIC Phases</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.safetySignals}</div>
                <div className="text-xs text-slate-500">Safety Signals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Target className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.prioritizationCriteria}</div>
                <div className="text-xs text-slate-500">Priority Criteria</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <FileText className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.standardWorkDocs}</div>
                <div className="text-xs text-slate-500">Standard Work Docs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DMAIC Flow */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">DMAIC/PDSA Improvement Cycle</CardTitle>
          <CardDescription>Five-phase methodology for systematic improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {PI_PHASES.map((phase, i) => {
              const Icon = getIcon(phase.icon)
              const colorClass = PHASE_COLORS[i]
              return (
                <div key={phase.id} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[100px]">
                    <div className={`p-3 rounded-full ${colorClass.split(' ')[0]} mb-2`}>
                      <Icon className={`h-6 w-6 ${colorClass.split(' ')[1]}`} />
                    </div>
                    <span className="text-xs font-medium text-white">{phase.shortName}</span>
                  </div>
                  {i < PI_PHASES.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-slate-600 mx-2" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="phases" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="phases" className="data-[state=active]:bg-slate-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            DMAIC Phases
          </TabsTrigger>
          <TabsTrigger value="signals" className="data-[state=active]:bg-slate-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Safety Signals
          </TabsTrigger>
          <TabsTrigger value="prioritization" className="data-[state=active]:bg-slate-700">
            <Target className="h-4 w-4 mr-2" />
            Prioritization
          </TabsTrigger>
          <TabsTrigger value="governance" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Governance
          </TabsTrigger>
          <TabsTrigger value="reporting" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Reporting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phases">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {PI_PHASES.map((phase, i) => (
              <PhaseCard key={phase.id} phase={phase} index={i} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="signals">
          <SafetySignalsView />
        </TabsContent>

        <TabsContent value="prioritization">
          <PrioritizationView />
        </TabsContent>

        <TabsContent value="governance">
          <GovernanceView />
        </TabsContent>

        <TabsContent value="reporting">
          <ReportView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
