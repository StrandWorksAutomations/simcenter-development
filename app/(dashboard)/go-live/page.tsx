"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Rocket,
  CheckCircle2,
  Circle,
  Building2,
  Package,
  Monitor,
  Users,
  FileText,
  Megaphone,
  Calendar,
  Flag,
  AlertTriangle,
  Clock
} from "lucide-react"
import {
  CHECKLIST_CATEGORIES,
  LAUNCH_MILESTONES,
  READINESS_PHASES,
  getChecklistSummary,
  getTimelineView,
  getCriticalPathMilestones,
  type ChecklistItem,
  type ChecklistCategory
} from "@/data/seed/go-live"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'Building2': Building2,
  'Package': Package,
  'Monitor': Monitor,
  'Users': Users,
  'FileText': FileText,
  'CheckCircle': CheckCircle2,
  'Megaphone': Megaphone
}

const PRIORITY_COLORS: Record<string, string> = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'high': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'medium': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'low': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

function ChecklistCategoryCard({ category, checkedItems, onToggle }: {
  category: ChecklistCategory
  checkedItems: Set<string>
  onToggle: (id: string) => void
}) {
  const Icon = ICON_MAP[category.icon] || CheckCircle2
  const completed = category.items.filter(item => checkedItems.has(item.id)).length
  const total = category.items.length
  const progress = (completed / total) * 100

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white text-base">{category.name}</CardTitle>
              <CardDescription className="text-xs">{category.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${completed === total ? 'border-emerald-500 text-emerald-400' : 'border-slate-600'}`}>
            {completed}/{total}
          </Badge>
        </div>
        <Progress value={progress} className="mt-2 h-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {category.items.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-2 rounded transition-all ${
                checkedItems.has(item.id) ? 'bg-emerald-500/10' : 'bg-slate-700/30'
              }`}
            >
              <Checkbox
                checked={checkedItems.has(item.id)}
                onCheckedChange={() => onToggle(item.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${checkedItems.has(item.id) ? 'text-slate-400 line-through' : 'text-white'}`}>
                    {item.name}
                  </span>
                  <Badge className={`${PRIORITY_COLORS[item.priority]} text-[10px]`}>{item.priority}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  <span>Week {item.targetWeek < 0 ? item.targetWeek : `+${item.targetWeek}`}</span>
                  <span>{item.responsible}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TimelineView({ checkedItems, onToggle }: {
  checkedItems: Set<string>
  onToggle: (id: string) => void
}) {
  const timeline = getTimelineView()

  return (
    <div className="space-y-4">
      {timeline.map(week => (
        <Card key={week.week} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                {week.weekLabel}
              </CardTitle>
              <Badge variant="outline" className="border-slate-600">
                {week.items.length} tasks • {week.milestones.length} milestones
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Milestones */}
            {week.milestones.length > 0 && (
              <div className="mb-4 space-y-2">
                {week.milestones.map(milestone => (
                  <div key={milestone.id} className="flex items-center gap-3 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                    <Flag className={`h-4 w-4 ${milestone.criticalPath ? 'text-red-400' : 'text-amber-400'}`} />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">{milestone.name}</span>
                      {milestone.criticalPath && (
                        <Badge className="ml-2 bg-red-500/20 text-red-400 text-[10px]">Critical Path</Badge>
                      )}
                      <p className="text-xs text-slate-400">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tasks */}
            {week.items.length > 0 ? (
              <div className="space-y-1">
                {week.items.map(({ category, item }) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-2 rounded ${
                      checkedItems.has(item.id) ? 'bg-emerald-500/10' : 'bg-slate-700/20'
                    }`}
                  >
                    <Checkbox
                      checked={checkedItems.has(item.id)}
                      onCheckedChange={() => onToggle(item.id)}
                    />
                    <span className={`text-sm flex-1 ${checkedItems.has(item.id) ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {item.name}
                    </span>
                    <Badge variant="outline" className="text-[10px] border-slate-600">{category}</Badge>
                    <Badge className={`${PRIORITY_COLORS[item.priority]} text-[10px]`}>{item.priority}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No tasks scheduled for this week</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MilestonesView() {
  const criticalMilestones = getCriticalPathMilestones()

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Flag className="h-4 w-4 text-amber-400" />
            All Launch Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700"></div>

            <div className="space-y-4">
              {LAUNCH_MILESTONES.map((milestone, i) => (
                <div key={milestone.id} className="flex items-start gap-4 pl-2">
                  {/* Timeline dot */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    milestone.criticalPath ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    <Flag className="h-3 w-3 text-white" />
                  </div>

                  <div className="flex-1 p-3 rounded bg-slate-700/30 -mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{milestone.name}</span>
                      <Badge variant="outline" className="text-[10px] border-slate-600">
                        Week {milestone.targetWeek < 0 ? milestone.targetWeek : `+${milestone.targetWeek}`}
                      </Badge>
                      {milestone.criticalPath && (
                        <Badge className="bg-red-500/20 text-red-400 text-[10px]">Critical Path</Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{milestone.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {milestone.deliverables.map((d, j) => (
                        <Badge key={j} variant="outline" className="text-[10px] border-slate-600">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-red-500/5 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Critical Path Milestones
          </CardTitle>
          <CardDescription>These milestones must be completed on time to avoid project delays</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {criticalMilestones.map(milestone => (
              <div key={milestone.id} className="p-3 rounded bg-slate-800/50 border border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{milestone.name}</span>
                  <Badge className="bg-red-500/20 text-red-400">Week {milestone.targetWeek}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">{milestone.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PhasesView() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {READINESS_PHASES.map((phase, i) => (
        <Card key={phase.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div>
                <CardTitle className="text-white text-sm">{phase.name}</CardTitle>
                <CardDescription className="text-xs">{phase.weekRange}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-400 mb-3">{phase.description}</p>
            <div className="flex flex-wrap gap-1">
              {phase.categories.map(cat => (
                <Badge key={cat} variant="outline" className="text-[10px] border-slate-600 capitalize">
                  {cat}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function GoLivePage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const summary = getChecklistSummary()

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const completedCount = checkedItems.size
  const progress = (completedCount / summary.total) * 100

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Go-Live Checklist</h1>
          <p className="text-slate-400">Launch readiness and pre-opening milestones</p>
        </div>
        <Badge className="bg-rocket-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Rocket className="h-3 w-3" />
          Prompt 18 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Total Items</div>
            <div className="text-2xl font-bold text-white">{summary.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Critical Items</div>
            <div className="text-2xl font-bold text-red-400">{summary.critical}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Categories</div>
            <div className="text-2xl font-bold text-blue-400">{summary.categories}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Completed</div>
            <div className="text-2xl font-bold text-emerald-400">{completedCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Progress</div>
            <div className="text-2xl font-bold text-white">{progress.toFixed(0)}%</div>
            <Progress value={progress} className="mt-1 h-1" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="categories" className="data-[state=active]:bg-slate-700">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            By Category
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Timeline View
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-700">
            <Flag className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="phases" className="data-[state=active]:bg-slate-700">
            <Clock className="h-4 w-4 mr-2" />
            Phases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid lg:grid-cols-2 gap-4">
            {CHECKLIST_CATEGORIES.map(category => (
              <ChecklistCategoryCard
                key={category.id}
                category={category}
                checkedItems={checkedItems}
                onToggle={toggleItem}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <TimelineView checkedItems={checkedItems} onToggle={toggleItem} />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestonesView />
        </TabsContent>

        <TabsContent value="phases">
          <PhasesView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
