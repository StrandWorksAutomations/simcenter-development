"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wrench,
  Calendar,
  Package,
  FileText,
  AlertTriangle,
  Battery,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  BarChart3
} from "lucide-react"
import {
  MAINTENANCE_TASKS,
  SPARE_PARTS,
  SERVICE_CONTRACT_CRITERIA,
  EQUIPMENT_LIFECYCLE,
  TICKETING_WORKFLOW,
  RELIABILITY_METRICS,
  BATTERY_GUIDELINES,
  FIRMWARE_GUIDELINES,
  generatePMCalendar,
  getTasksByFrequency,
  getCriticalTasks,
  type MaintenanceTask
} from "@/data/seed/maintenance"

const FREQUENCY_COLORS: Record<string, string> = {
  'after-use': '#10b981',
  'weekly': '#3b82f6',
  'monthly': '#8b5cf6',
  'quarterly': '#f59e0b',
  'semiannual': '#ef4444',
  'annual': '#ec4899',
  'as-needed': '#6b7280'
}

const PRIORITY_BADGE: Record<string, string> = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'high': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'medium': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'low': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

function PMScheduleTab() {
  const frequencies = ['after-use', 'weekly', 'monthly', 'quarterly', 'semiannual', 'annual'] as const

  return (
    <div className="space-y-6">
      {frequencies.map(freq => {
        const tasks = getTasksByFrequency(freq)
        if (tasks.length === 0) return null

        return (
          <Card key={freq} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FREQUENCY_COLORS[freq] }}></div>
                <CardTitle className="text-white text-base capitalize">{freq.replace('-', ' ')} Tasks</CardTitle>
                <Badge variant="outline" className="text-xs border-slate-600">{tasks.length} tasks</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div key={task.id} className="p-3 rounded bg-slate-700/30">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{task.name}</span>
                          <Badge className={PRIORITY_BADGE[task.priority]}>{task.priority}</Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{task.description}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="text-xs text-slate-500">{task.estimatedTime}</div>
                        <div className="text-xs text-slate-500 capitalize">{task.responsible}</div>
                      </div>
                    </div>
                    {task.checklist.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-600">
                        <div className="grid grid-cols-2 gap-1">
                          {task.checklist.slice(0, 4).map((item, i) => (
                            <div key={i} className="text-xs text-slate-400 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                              {item.length > 40 ? item.substring(0, 40) + '...' : item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function PMCalendarTab() {
  const calendar = generatePMCalendar()

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {calendar.map(month => (
        <Card key={month.month} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm">{month.monthName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {month.tasks.map(task => (
                <div key={task.taskId} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: FREQUENCY_COLORS[task.frequency] || '#6b7280' }}
                  ></div>
                  <span className="text-slate-300 truncate">{task.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SparePartsTab() {
  const categories = ['consumable', 'component', 'battery', 'cable', 'accessory'] as const

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const parts = SPARE_PARTS.filter(p => p.category === category)
        if (parts.length === 0) return null

        return (
          <Card key={category} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base capitalize">{category}s</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-slate-400 font-medium">Part</th>
                      <th className="text-left py-2 text-slate-400 font-medium">Applies To</th>
                      <th className="text-center py-2 text-slate-400 font-medium">Stock Level</th>
                      <th className="text-center py-2 text-slate-400 font-medium">Lead Time</th>
                      <th className="text-right py-2 text-slate-400 font-medium">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map(part => (
                      <tr key={part.id} className="border-b border-slate-700/50">
                        <td className="py-2 text-white">{part.name}</td>
                        <td className="py-2 text-slate-400 text-xs">{part.applicableTo.slice(0, 2).join(', ')}</td>
                        <td className="py-2 text-center">
                          <Badge variant="outline" className={`text-[10px] ${
                            part.stockLevel === 'always' ? 'border-emerald-500 text-emerald-400' :
                            part.stockLevel === 'backup' ? 'border-amber-500 text-amber-400' :
                            'border-slate-500 text-slate-400'
                          }`}>
                            {part.stockLevel}
                          </Badge>
                        </td>
                        <td className="py-2 text-center text-slate-400 text-xs">{part.typicalLeadTime}</td>
                        <td className="py-2 text-right text-slate-400 text-xs">{part.estimatedCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function ServiceContractsTab() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Service Contract Decision Criteria</CardTitle>
          <CardDescription>When to buy vs. self-insure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SERVICE_CONTRACT_CRITERIA.map((criteria, i) => (
              <div key={i} className="p-3 rounded bg-slate-700/30">
                <h4 className="text-sm font-medium text-white mb-2">{criteria.factor}</h4>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-emerald-400 font-medium mb-1">Buy Contract If:</div>
                    <p className="text-slate-300">{criteria.forContract}</p>
                  </div>
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                    <div className="text-red-400 font-medium mb-1">Skip Contract If:</div>
                    <p className="text-slate-300">{criteria.againstContract}</p>
                  </div>
                </div>
                <p className="text-xs text-blue-400 mt-2">→ {criteria.decisionRule}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Equipment Lifecycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {EQUIPMENT_LIFECYCLE.map((eq, i) => (
              <div key={i} className="p-3 rounded bg-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{eq.equipmentType}</span>
                  <Badge variant="outline" className="border-slate-600">{eq.expectedLifespan}</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-slate-500 mb-1">EOL Indicators:</div>
                    <ul className="space-y-0.5">
                      {eq.eolIndicators.slice(0, 3).map((ind, j) => (
                        <li key={j} className="text-slate-400 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-amber-400" />
                          {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Maintenance Cost:</div>
                    <p className="text-slate-400">{eq.annualMaintenanceCost} of equipment value annually</p>
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

function TicketingTab() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Failure Ticketing Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {TICKETING_WORKFLOW.map((step, i) => (
              <div key={step.step} className="flex items-start gap-4 p-3 rounded bg-slate-700/30">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{step.name}</span>
                    <Badge variant="outline" className="text-[10px] border-slate-600">{step.timeframe}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{step.description}</p>
                  <div className="text-xs text-slate-500 mt-1">Responsible: {step.responsible}</div>
                  {step.escalationTrigger && (
                    <div className="text-xs text-amber-400 mt-1">Escalate if: {step.escalationTrigger}</div>
                  )}
                </div>
                {i < TICKETING_WORKFLOW.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-600 shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-400" />
            Reliability Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {RELIABILITY_METRICS.map((metric, i) => (
              <div key={i} className="p-3 rounded bg-slate-700/30">
                <h4 className="text-sm font-medium text-white">{metric.metric}</h4>
                <p className="text-xs text-slate-400 mt-1">{metric.description}</p>
                <div className="mt-2 p-2 rounded bg-slate-800 text-xs">
                  <div className="text-blue-400 font-mono">{metric.formula}</div>
                </div>
                <div className="text-xs text-emerald-400 mt-2">Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BatteryFirmwareTab() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Battery className="h-4 w-4 text-green-400" />
            Battery Maintenance Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {BATTERY_GUIDELINES.map((guideline, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
                <Badge variant="outline" className="text-[10px] border-slate-600 shrink-0">{guideline.frequency}</Badge>
                <div className="flex-1">
                  <span className="text-sm text-white">{guideline.guideline}</span>
                  <p className="text-xs text-slate-500 mt-0.5">{guideline.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Cpu className="h-4 w-4 text-purple-400" />
            Firmware & Software Version Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {FIRMWARE_GUIDELINES.map((guideline, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded bg-slate-700/30">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-white">{guideline.practice}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{guideline.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MaintenancePage() {
  const criticalTasks = getCriticalTasks()
  const totalTasks = MAINTENANCE_TASKS.length

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance & Reliability</h1>
          <p className="text-slate-400">Preventive maintenance program for simulation equipment</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
          <Wrench className="h-3 w-3" />
          Prompt 12 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Total PM Tasks</div>
            <div className="text-2xl font-bold text-white">{totalTasks}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Critical/High Priority</div>
            <div className="text-2xl font-bold text-red-400">{criticalTasks.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Spare Parts Tracked</div>
            <div className="text-2xl font-bold text-amber-400">{SPARE_PARTS.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Ticketing Steps</div>
            <div className="text-2xl font-bold text-blue-400">{TICKETING_WORKFLOW.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="schedule" className="data-[state=active]:bg-slate-700">
            <Wrench className="h-4 w-4 mr-2" />
            PM Schedule
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            PM Calendar
          </TabsTrigger>
          <TabsTrigger value="parts" className="data-[state=active]:bg-slate-700">
            <Package className="h-4 w-4 mr-2" />
            Spare Parts
          </TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:bg-slate-700">
            <FileText className="h-4 w-4 mr-2" />
            Service Contracts
          </TabsTrigger>
          <TabsTrigger value="ticketing" className="data-[state=active]:bg-slate-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Ticketing
          </TabsTrigger>
          <TabsTrigger value="battery" className="data-[state=active]:bg-slate-700">
            <Battery className="h-4 w-4 mr-2" />
            Battery & Firmware
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule"><PMScheduleTab /></TabsContent>
        <TabsContent value="calendar"><PMCalendarTab /></TabsContent>
        <TabsContent value="parts"><SparePartsTab /></TabsContent>
        <TabsContent value="contracts"><ServiceContractsTab /></TabsContent>
        <TabsContent value="ticketing"><TicketingTab /></TabsContent>
        <TabsContent value="battery"><BatteryFirmwareTab /></TabsContent>
      </Tabs>
    </div>
  )
}
