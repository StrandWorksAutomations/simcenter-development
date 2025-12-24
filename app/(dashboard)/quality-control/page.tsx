"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Shield,
  GitBranch,
  ClipboardCheck,
  Settings,
  MessageSquare,
  MessageCircle,
  Users,
  Search,
  FileText,
  BarChart3,
  Award,
  AlertTriangle,
  Target,
  TrendingUp,
  GraduationCap,
  FileEdit,
  PlayCircle,
  UserCheck,
  CheckCircle2,
  Circle
} from "lucide-react"
import {
  QC_COMPONENTS,
  QC_CHECKLISTS,
  OBSERVATION_RUBRIC,
  QUARTERLY_REPORT_SECTIONS,
  QUALITY_METRICS,
  getChecklistStats,
  getRubricStats,
  type QCComponent,
  type QCChecklist
} from "@/data/seed/quality-control"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'GitBranch': GitBranch,
  'ClipboardCheck': ClipboardCheck,
  'Settings': Settings,
  'MessageSquare': MessageSquare,
  'MessageCircle': MessageCircle,
  'Users': Users,
  'Search': Search,
  'FileText': FileText,
  'BarChart': BarChart3,
  'Award': Award,
  'AlertTriangle': AlertTriangle,
  'Target': Target,
  'TrendingUp': TrendingUp,
  'GraduationCap': GraduationCap,
  'FileEdit': FileEdit,
  'PlayCircle': PlayCircle,
  'UserCheck': UserCheck
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Shield
}

function ComponentCard({ component }: { component: QCComponent }) {
  const Icon = getIcon(component.icon)

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Icon className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-white text-sm">{component.shortName}</CardTitle>
            <CardDescription className="text-xs">{component.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-400 mb-3">{component.description}</p>
        <div className="space-y-2">
          <div className="text-xs font-medium text-slate-300">Key Practices:</div>
          <ul className="space-y-1">
            {component.keyPractices.slice(0, 4).map((practice, i) => (
              <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {component.standards.map((std, i) => (
            <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
              {std}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ChecklistView({ checklist }: { checklist: QCChecklist }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const Icon = getIcon(checklist.icon)
  const completed = checked.size
  const total = checklist.items.length
  const progress = (completed / total) * 100

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setChecked(newChecked)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white text-base">{checklist.shortName}</CardTitle>
              <CardDescription className="text-xs">{checklist.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${completed === total ? 'border-emerald-500 text-emerald-400' : 'border-slate-600'}`}>
            {completed}/{total}
          </Badge>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-slate-500">
          <span>Used by: {checklist.usedBy}</span>
          <span>Timing: {checklist.timing}</span>
        </div>
        <Progress value={progress} className="mt-2 h-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {checklist.items.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-2 rounded transition-all ${
                checked.has(item.id) ? 'bg-emerald-500/10' : 'bg-slate-700/30'
              }`}
            >
              <Checkbox
                checked={checked.has(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${checked.has(item.id) ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {item.text}
                  </span>
                  {item.required && (
                    <Badge className="bg-red-500/20 text-red-400 text-[10px]">Required</Badge>
                  )}
                  {item.category && (
                    <Badge variant="outline" className="text-[10px] border-slate-600">{item.category}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RubricView() {
  const stats = getRubricStats()

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-400" />
            QA Observation Rubric
          </CardTitle>
          <CardDescription>
            Used by QA observers to evaluate simulation session quality
          </CardDescription>
          <div className="flex gap-4 mt-2">
            <Badge variant="outline" className="border-slate-600">
              {stats.totalSections} Sections
            </Badge>
            <Badge variant="outline" className="border-slate-600">
              {stats.totalElements} Elements
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Accordion type="multiple" className="space-y-2">
        {OBSERVATION_RUBRIC.map(section => {
          const Icon = getIcon(section.icon)
          return (
            <AccordionItem key={section.id} value={section.id} className="border-slate-700 bg-slate-800/50 rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-medium">{section.section}</span>
                  <Badge variant="outline" className="border-slate-600 text-xs">
                    {section.elements.length} elements
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {section.elements.map(element => (
                    <div key={element.id} className="bg-slate-700/30 rounded-lg p-3">
                      <div className="font-medium text-white text-sm mb-1">{element.name}</div>
                      <div className="text-xs text-slate-400 mb-3">{element.description}</div>
                      <div className="grid md:grid-cols-3 gap-2">
                        {element.criteria.map((criterion, i) => (
                          <div
                            key={i}
                            className={`p-2 rounded text-xs ${
                              criterion.level === 'Met'
                                ? 'bg-emerald-500/10 border border-emerald-500/30'
                                : criterion.level === 'Partial'
                                ? 'bg-amber-500/10 border border-amber-500/30'
                                : 'bg-red-500/10 border border-red-500/30'
                            }`}
                          >
                            <div className={`font-medium mb-1 ${
                              criterion.level === 'Met' ? 'text-emerald-400' :
                              criterion.level === 'Partial' ? 'text-amber-400' : 'text-red-400'
                            }`}>
                              {criterion.level}
                            </div>
                            <div className="text-slate-400">{criterion.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

function QuarterlyReportView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Quarterly Quality Report Structure
          </CardTitle>
          <CardDescription>
            Standardized report format for tracking quality metrics and improvements
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quality Metrics Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            Quality Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            {QUALITY_METRICS.map(metric => (
              <div key={metric.id} className="bg-slate-700/30 rounded-lg p-3">
                <div className="text-xs text-slate-400">{metric.name}</div>
                <div className="text-lg font-bold text-emerald-400">{metric.target}</div>
                <div className="text-xs text-slate-500">{metric.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Sections */}
      <div className="grid md:grid-cols-2 gap-4">
        {QUARTERLY_REPORT_SECTIONS.map(section => {
          const Icon = getIcon(section.icon)
          return (
            <Card key={section.id} className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-sm">{section.title}</CardTitle>
                    <CardDescription className="text-xs">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <Circle className="h-2 w-2 text-slate-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function QualityControlPage() {
  const checklistStats = getChecklistStats()
  const rubricStats = getRubricStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quality Control Program</h1>
          <p className="text-slate-400">Simulation fidelity and faculty consistency standards</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Prompt 13 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{QC_COMPONENTS.length}</div>
                <div className="text-xs text-slate-500">QC Components</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <ClipboardCheck className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{checklistStats.totalChecklists}</div>
                <div className="text-xs text-slate-500">QC Checklists</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <CheckCircle2 className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{checklistStats.totalItems}</div>
                <div className="text-xs text-slate-500">Checklist Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{rubricStats.totalElements}</div>
                <div className="text-xs text-slate-500">Rubric Elements</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="components" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="components" className="data-[state=active]:bg-slate-700">
            <Shield className="h-4 w-4 mr-2" />
            QC Components
          </TabsTrigger>
          <TabsTrigger value="checklists" className="data-[state=active]:bg-slate-700">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Checklists
          </TabsTrigger>
          <TabsTrigger value="rubric" className="data-[state=active]:bg-slate-700">
            <Search className="h-4 w-4 mr-2" />
            Observation Rubric
          </TabsTrigger>
          <TabsTrigger value="report" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Quarterly Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {QC_COMPONENTS.map(component => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="checklists">
          <div className="grid lg:grid-cols-2 gap-4">
            {QC_CHECKLISTS.map(checklist => (
              <ChecklistView key={checklist.id} checklist={checklist} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rubric">
          <RubricView />
        </TabsContent>

        <TabsContent value="report">
          <QuarterlyReportView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
