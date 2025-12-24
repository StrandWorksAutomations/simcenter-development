"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Users,
  PenTool,
  Layout,
  FileText,
  ShoppingCart,
  HardHat,
  Monitor,
  CheckCircle,
  Rocket,
  AlertTriangle,
  Clock,
  ArrowRight,
  Calendar,
  Flag
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell
} from "recharts"
import {
  BUILD_PHASES,
  GANTT_DATA,
  CRITICAL_PATH_ITEMS,
  COMMON_FAILURE_MODES,
  getTotalProjectDuration,
  getMilestones,
  type BuildPhase
} from "@/data/seed/build-process"

// Icon mapping with style prop support
type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>
const ICON_MAP: Record<string, IconComponent> = {
  'Target': Target,
  'Users': Users,
  'PenTool': PenTool,
  'Layout': Layout,
  'FileText': FileText,
  'ShoppingCart': ShoppingCart,
  'HardHat': HardHat,
  'Monitor': Monitor,
  'CheckCircle': CheckCircle,
  'Rocket': Rocket
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Target
}

// Colors for phases
const PHASE_COLORS = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#ec4899', '#6366f1', '#14b8a6', '#f97316'
]

function PhaseCard({
  phase,
  isSelected,
  onSelect,
  color
}: {
  phase: BuildPhase
  isSelected: boolean
  onSelect: () => void
  color: string
}) {
  const Icon = getIcon(phase.icon)

  return (
    <Card
      className={`bg-slate-800/50 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-slate-700 hover:border-slate-600'
      }`}
      onClick={onSelect}
    >
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">Phase {phase.number}</span>
              <Badge variant="outline" className="text-[10px] border-slate-600">{phase.duration}</Badge>
            </div>
            <h3 className="text-sm font-medium text-white truncate">{phase.shortName}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PhaseDetail({ phase, color }: { phase: BuildPhase; color: string }) {
  const Icon = ICON_MAP[phase.icon] || Target

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          <Icon className="h-8 w-8" style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-slate-600">Phase {phase.number}</Badge>
            <Badge style={{ backgroundColor: `${color}20`, color, borderColor: `${color}50` }}>{phase.monthRange}</Badge>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{phase.name}</h2>
          <p className="text-slate-400 mt-1">{phase.description}</p>
        </div>
      </div>

      {/* Activities */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">Key Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {phase.activities.map((activity, i) => (
              <div key={activity.id} className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{activity.name}</span>
                    <Badge variant="outline" className="text-[10px] border-slate-600 capitalize">{activity.owner}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Flag className="h-4 w-4 text-amber-400" />
            Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {phase.milestones.map(milestone => (
              <div key={milestone.id} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                <div className="flex items-center gap-2">
                  {milestone.criticalPath && (
                    <Badge className="bg-red-500/20 text-red-400 text-[10px]">Critical Path</Badge>
                  )}
                  <span className="text-sm text-white">{milestone.name}</span>
                </div>
                <span className="text-xs text-slate-400">Month {milestone.targetMonth}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deliverables & Critical Path */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {phase.deliverables.map((d, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-emerald-400" />
                  {d}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">Critical Path Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {phase.criticalPath.map((c, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                  {c}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Failure Modes */}
      <Card className="bg-red-500/5 border-red-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-400 text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Common Failure Modes & Mitigations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {phase.failureModes.map((fm, i) => (
              <div key={i} className="p-2 rounded bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Badge className={`text-[10px] ${
                    fm.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                    fm.impact === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>{fm.impact}</Badge>
                  <span className="text-xs text-white">{fm.risk}</span>
                </div>
                <p className="text-xs text-emerald-400 mt-1">Mitigation: {fm.mitigation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GanttChart() {
  const milestones = getMilestones()
  const duration = getTotalProjectDuration()

  // Create data for bar chart (simplified Gantt)
  const chartData = GANTT_DATA.filter(item => !item.isMilestone).map(item => ({
    task: item.task.length > 20 ? item.task.substring(0, 20) + '...' : item.task,
    start: item.startMonth,
    duration: item.endMonth - item.startMonth,
    phase: item.phase,
    isCriticalPath: item.isCriticalPath
  }))

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-400" />
          Project Timeline ({duration.months} months / ~{duration.years} years)
        </CardTitle>
        <CardDescription>Simplified Gantt view of major tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 120, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 60]}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickFormatter={(v) => `M${v}`}
              />
              <YAxis
                type="category"
                dataKey="task"
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                width={110}
              />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#f1f5f9' }}
                formatter={(value: number, name: string, props: any) => {
                  if (name === 'start') return [`Month ${value}`, 'Start']
                  return [`${value} months`, 'Duration']
                }}
              />
              <Bar dataKey="start" stackId="a" fill="transparent" />
              <Bar dataKey="duration" stackId="a">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isCriticalPath ? '#ef4444' : '#3b82f6'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-slate-400">Standard Task</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500"></div>
            <span className="text-slate-400">Critical Path</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FailureModesSummary() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          Common Failure Modes by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {COMMON_FAILURE_MODES.map(category => (
            <div key={category.category}>
              <h4 className="text-sm font-medium text-slate-300 mb-2">{category.category}</h4>
              <div className="space-y-2">
                {category.failures.map((f, i) => (
                  <div key={i} className="p-2 rounded bg-slate-700/30 text-xs">
                    <span className="text-white">{f.risk}</span>
                    <p className="text-emerald-400 mt-1">→ {f.mitigation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CriticalPathSummary() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-base flex items-center gap-2">
          <Flag className="h-4 w-4 text-red-400" />
          Critical Path Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {CRITICAL_PATH_ITEMS.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
              <Badge variant="outline" className="text-[10px] border-slate-600 shrink-0">{item.phase}</Badge>
              <div className="flex-1">
                <span className="text-sm text-white">{item.item}</span>
                <p className="text-xs text-emerald-400 mt-0.5">→ {item.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function BuildProcessPage() {
  const [selectedPhase, setSelectedPhase] = useState<BuildPhase>(BUILD_PHASES[0])
  const duration = getTotalProjectDuration()
  const milestones = getMilestones()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Build Process</h1>
          <p className="text-slate-400">End-to-end construction playbook from concept to go-live</p>
        </div>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration.months} Months Total
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Total Phases</div>
            <div className="text-2xl font-bold text-white">{BUILD_PHASES.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Key Milestones</div>
            <div className="text-2xl font-bold text-white">{milestones.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Critical Path Items</div>
            <div className="text-2xl font-bold text-red-400">{CRITICAL_PATH_ITEMS.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Project Duration</div>
            <div className="text-2xl font-bold text-blue-400">~{duration.years} years</div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
        {BUILD_PHASES.map((phase, i) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isSelected={selectedPhase.id === phase.id}
            onSelect={() => setSelectedPhase(phase)}
            color={PHASE_COLORS[i]}
          />
        ))}
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="details" className="data-[state=active]:bg-slate-700">Phase Details</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">Timeline</TabsTrigger>
          <TabsTrigger value="risks" className="data-[state=active]:bg-slate-700">Risks & Mitigations</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <PhaseDetail phase={selectedPhase} color={PHASE_COLORS[BUILD_PHASES.indexOf(selectedPhase)]} />
        </TabsContent>

        <TabsContent value="timeline">
          <GanttChart />
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <CriticalPathSummary />
          <FailureModesSummary />
        </TabsContent>
      </Tabs>
    </div>
  )
}
