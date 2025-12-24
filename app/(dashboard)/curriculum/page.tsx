"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BookOpen,
  Heart,
  Users,
  Ambulance,
  Network,
  Calendar,
  Clock,
  Target,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  FileText,
  BarChart3,
  AlertTriangle
} from "lucide-react"
import {
  LEARNER_PATHWAYS,
  SCENARIO_LIBRARY,
  CURRICULUM_YEARS,
  EVALUATION_TOOLS,
  getScenariosByYear,
  getStats,
  type LearnerPathway,
  type Scenario
} from "@/data/seed/curriculum"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Heart': Heart,
  'Users': Users,
  'Ambulance': Ambulance,
  'Network': Network
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Users
}

const PRIORITY_COLORS = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'high': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'medium': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
}

function PathwaysView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Learner Pathways
          </CardTitle>
          <CardDescription>
            Each learner allocated 8 hours/month: 4 hours discipline-specific + 4 hours interprofessional team training
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {LEARNER_PATHWAYS.map(pathway => {
          const Icon = getIcon(pathway.icon)
          return (
            <Card key={pathway.id} className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-white text-sm">{pathway.name}</CardTitle>
                    <CardDescription className="text-xs">{pathway.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-slate-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {pathway.monthlyHours}h/mo
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-1">
                  <AccordionItem value="year1" className="border-slate-700">
                    <AccordionTrigger className="py-2 text-sm">
                      <Badge className="bg-blue-500/20 text-blue-400 mr-2">Year 1</Badge>
                      Foundation
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pt-1">
                        {pathway.year1Focus.map((item, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="year2" className="border-slate-700">
                    <AccordionTrigger className="py-2 text-sm">
                      <Badge className="bg-emerald-500/20 text-emerald-400 mr-2">Year 2</Badge>
                      Expansion
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pt-1">
                        {pathway.year2Focus.map((item, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="year3" className="border-slate-700">
                    <AccordionTrigger className="py-2 text-sm">
                      <Badge className="bg-purple-500/20 text-purple-400 mr-2">Year 3</Badge>
                      Mastery
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pt-1">
                        {pathway.year3Focus.map((item, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-purple-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function ScenarioLibraryView() {
  const [selectedYear, setSelectedYear] = useState<number>(1)

  const scenarios = getScenariosByYear(selectedYear)

  return (
    <div className="space-y-4">
      {/* Year Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        {CURRICULUM_YEARS.map(year => (
          <Card
            key={year.year}
            className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-all ${
              selectedYear === year.year ? 'ring-2 ring-blue-500' : 'hover:border-slate-600'
            }`}
            onClick={() => setSelectedYear(year.year)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge className={
                  year.year === 1 ? 'bg-blue-500/20 text-blue-400' :
                  year.year === 2 ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-purple-500/20 text-purple-400'
                }>
                  Year {year.year}
                </Badge>
                <Badge variant="outline" className="border-slate-600">
                  +{year.scenariosAdded} scenarios
                </Badge>
              </div>
              <CardTitle className="text-white text-sm">{year.theme}</CardTitle>
              <CardDescription className="text-xs">{year.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Scenario List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">
            Year {selectedYear} Scenarios
          </CardTitle>
          <CardDescription>
            {scenarios.length} scenarios introduced in Year {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scenarios.map(scenario => (
              <div key={scenario.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-white">{scenario.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{scenario.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={PRIORITY_COLORS[scenario.priority]}>
                      {scenario.priority}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600">
                      <Clock className="h-3 w-3 mr-1" />
                      {scenario.duration}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Target Learners</div>
                    <div className="flex flex-wrap gap-1">
                      {scenario.targetLearners.map((l, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                          {l}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Modalities</div>
                    <div className="flex flex-wrap gap-1">
                      {scenario.modalities.map((m, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Critical Actions</div>
                    <ul className="space-y-0.5">
                      {scenario.criticalActions.slice(0, 3).map((a, i) => (
                        <li key={i} className="text-[10px] text-slate-400 flex items-center gap-1">
                          <ArrowRight className="h-2 w-2 text-emerald-400" />
                          {a}
                        </li>
                      ))}
                      {scenario.criticalActions.length > 3 && (
                        <li className="text-[10px] text-slate-500">
                          +{scenario.criticalActions.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Year Milestones */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm">
            Year {selectedYear} Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {CURRICULUM_YEARS.find(y => y.year === selectedYear)?.keyMilestones.map((m, i) => (
              <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function EvaluationView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-400" />
            Evaluation Strategy
          </CardTitle>
          <CardDescription>
            Multi-faceted evaluation measuring learner performance, program effectiveness, and clinical outcomes
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EVALUATION_TOOLS.map(tool => (
          <Card key={tool.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">
                  {tool.type}
                </Badge>
              </div>
              <CardTitle className="text-white text-sm">{tool.name}</CardTitle>
              <CardDescription className="text-xs">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xs text-slate-500">
                  <strong>Use Case:</strong> {tool.useCase}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Metrics:</div>
                  <div className="flex flex-wrap gap-1">
                    {tool.metrics.map((m, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kirkpatrick Levels */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            Kirkpatrick Evaluation Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-slate-700/30">
              <div className="text-xs font-medium text-blue-400 mb-1">Level 1: Reaction</div>
              <div className="text-xs text-slate-400">Satisfaction surveys, engagement measures, perceived realism</div>
            </div>
            <div className="p-3 rounded bg-slate-700/30">
              <div className="text-xs font-medium text-emerald-400 mb-1">Level 2: Learning</div>
              <div className="text-xs text-slate-400">Pre/post knowledge tests, skill checklists, competency ratings</div>
            </div>
            <div className="p-3 rounded bg-slate-700/30">
              <div className="text-xs font-medium text-amber-400 mb-1">Level 3: Behavior</div>
              <div className="text-xs text-slate-400">Clinical performance observation, teamwork assessments, practice change</div>
            </div>
            <div className="p-3 rounded bg-slate-700/30">
              <div className="text-xs font-medium text-purple-400 mb-1">Level 4: Results</div>
              <div className="text-xs text-slate-400">Quality metrics, patient safety outcomes, adverse event rates</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CurriculumPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Curriculum Architecture</h1>
          <p className="text-slate-400">Scenario library and mandatory education conversion plan</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          Prompt 21 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Learner Pathways</div>
            <div className="text-2xl font-bold text-white">{stats.pathways}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Scenarios (3-Year Library)</div>
            <div className="text-2xl font-bold text-blue-400">{stats.scenarios}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Evaluation Tools</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.evaluationTools}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Monthly Hours/Learner</div>
            <div className="text-2xl font-bold text-amber-400">{stats.totalMonthlyHours}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pathways" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="pathways" className="data-[state=active]:bg-slate-700">
            <Users className="h-4 w-4 mr-2" />
            Learner Pathways
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Scenario Library
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="data-[state=active]:bg-slate-700">
            <ClipboardList className="h-4 w-4 mr-2" />
            Evaluation Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pathways">
          <PathwaysView />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioLibraryView />
        </TabsContent>

        <TabsContent value="evaluation">
          <EvaluationView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
