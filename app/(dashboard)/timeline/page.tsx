"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Play,
  Pause
} from "lucide-react"

import { projectMilestones, constructionRisks } from "@/data/seed/construction"

// Status type for phases
type PhaseStatus = 'pending' | 'in_progress' | 'completed'
type MilestoneStatus = 'pending' | 'in_progress' | 'completed'

// Enhanced project phases for timeline visualization
const projectPhases: Array<{
  id: string
  phase: string
  name: string
  description: string
  startMonth: number
  endMonth: number
  duration: string
  status: PhaseStatus
  progress: number
  color: string
  milestones: Array<{ name: string; status: MilestoneStatus; month: number }>
}> = [
  {
    id: 'design',
    phase: "Phase 1",
    name: "Design & Approvals",
    description: "Schematic design, engineering, permits",
    startMonth: 0,
    endMonth: 2,
    duration: "Months 1-2",
    status: "in_progress",
    progress: 35,
    color: "bg-blue-500",
    milestones: [
      { name: "Project Kickoff", status: "completed", month: 0 },
      { name: "Schematic Design", status: "in_progress", month: 1 },
      { name: "Engineering Layouts", status: "pending", month: 1 },
      { name: "Permit Application", status: "pending", month: 2 },
    ]
  },
  {
    id: 'procurement',
    phase: "Phase 2",
    name: "Procurement & Bidding",
    description: "Contractor selection, equipment orders",
    startMonth: 3,
    endMonth: 3,
    duration: "Month 3",
    status: "pending",
    progress: 0,
    color: "bg-purple-500",
    milestones: [
      { name: "RFP/RFQ Release", status: "pending", month: 3 },
      { name: "Bid Evaluation", status: "pending", month: 3 },
      { name: "Contractor Selection", status: "pending", month: 3 },
      { name: "Long-Lead Equipment Orders", status: "pending", month: 3 },
    ]
  },
  {
    id: 'construction',
    phase: "Phase 3",
    name: "Construction Build-Out",
    description: "ICRA, demolition, framing, MEP rough-in",
    startMonth: 4,
    endMonth: 7,
    duration: "Months 4-7",
    status: "pending",
    progress: 0,
    color: "bg-amber-500",
    milestones: [
      { name: "ICRA Barriers & Demolition", status: "pending", month: 4 },
      { name: "Framing & MEP Rough-In", status: "pending", month: 5 },
      { name: "Rough-In Inspections", status: "pending", month: 6 },
      { name: "Finishes (Drywall, Paint, Floor)", status: "pending", month: 6 },
      { name: "Substantial Completion", status: "pending", month: 7 },
    ]
  },
  {
    id: 'systems',
    phase: "Phase 4",
    name: "Systems Installation",
    description: "A/V integration, equipment setup, commissioning",
    startMonth: 8,
    endMonth: 8,
    duration: "Month 8",
    status: "pending",
    progress: 0,
    color: "bg-cyan-500",
    milestones: [
      { name: "A/V System Installation", status: "pending", month: 8 },
      { name: "Simulation Equipment Delivery", status: "pending", month: 8 },
      { name: "IT Network Integration", status: "pending", month: 8 },
      { name: "Systems Commissioning", status: "pending", month: 8 },
    ]
  },
  {
    id: 'training',
    phase: "Phase 5",
    name: "Training & Soft Opening",
    description: "Staff training, dry runs, punchlist",
    startMonth: 9,
    endMonth: 9,
    duration: "Month 9",
    status: "pending",
    progress: 0,
    color: "bg-green-500",
    milestones: [
      { name: "Staff Training on Equipment", status: "pending", month: 9 },
      { name: "Dry Run Simulations", status: "pending", month: 9 },
      { name: "Punchlist Completion", status: "pending", month: 9 },
      { name: "Soft Opening", status: "pending", month: 9 },
    ]
  },
  {
    id: 'golive',
    phase: "Phase 6",
    name: "Go-Live",
    description: "Grand opening, operations handover",
    startMonth: 10,
    endMonth: 10,
    duration: "Month 10",
    status: "pending",
    progress: 0,
    color: "bg-emerald-500",
    milestones: [
      { name: "Certificate of Occupancy", status: "pending", month: 10 },
      { name: "Grand Opening Event", status: "pending", month: 10 },
      { name: "First Training Sessions", status: "pending", month: 10 },
      { name: "Documentation Handover", status: "pending", month: 10 },
    ]
  },
]

const criticalPath = [
  { item: "Funding Approval", phase: "Pre-Design", status: "completed" },
  { item: "Design Completion", phase: "Design", status: "in_progress" },
  { item: "Permit Issuance", phase: "Design", status: "pending" },
  { item: "Long-Lead Equipment Orders", phase: "Procurement", status: "pending" },
  { item: "ICRA Setup & Approval", phase: "Construction", status: "pending" },
  { item: "MEP Inspections", phase: "Construction", status: "pending" },
  { item: "A/V System Integration", phase: "Systems", status: "pending" },
  { item: "Certificate of Occupancy", phase: "Go-Live", status: "pending" },
]

// Calculate total milestones
const totalMilestones = projectPhases.reduce((sum, p) => sum + p.milestones.length, 0)
const completedMilestones = projectPhases.reduce(
  (sum, p) => sum + p.milestones.filter(m => m.status === 'completed').length, 0
)

export default function TimelinePage() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

  // Calculate overall progress
  const overallProgress = Math.round(
    projectPhases.reduce((sum, p, i) => {
      const phaseWeight = (p.endMonth - p.startMonth + 1) / 10 // Weight by duration
      return sum + (p.progress * phaseWeight)
    }, 0)
  )

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Timeline & Milestones</h1>
          <p className="text-slate-500">
            10-month implementation schedule with critical path tracking
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Gantt
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 Months</div>
            <p className="text-xs text-slate-500">Design to Go-Live</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Design</div>
            <p className="text-xs text-slate-500">Phase 1 of 6</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="h-2 mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMilestones} / {totalMilestones}</div>
            <p className="text-xs text-slate-500">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Critical Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{criticalPath.length}</div>
            <p className="text-xs text-slate-500">On critical path</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gantt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          <TabsTrigger value="phases">Phase Details</TabsTrigger>
          <TabsTrigger value="critical">Critical Path</TabsTrigger>
          <TabsTrigger value="risks">Schedule Risks</TabsTrigger>
        </TabsList>

        <TabsContent value="gantt">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>10-month implementation schedule</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Month headers */}
              <div className="mb-4">
                <div className="flex items-center">
                  <div className="w-48 shrink-0"></div>
                  <div className="flex-1 flex">
                    {Array.from({ length: 11 }, (_, i) => (
                      <div key={i} className="flex-1 text-center text-xs text-slate-500 border-l first:border-l-0">
                        Month {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gantt bars */}
              <div className="space-y-3">
                {projectPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className="flex items-center cursor-pointer hover:bg-gray-100 -mx-2 px-2 py-1 rounded transition-colors"
                    onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                  >
                    <div className="w-48 shrink-0 pr-4">
                      <div className="flex items-center gap-2">
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : phase.status === 'in_progress' ? (
                          <Play className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-slate-400" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{phase.name}</p>
                          <p className="text-xs text-slate-500">{phase.duration}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative h-8">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: 11 }, (_, i) => (
                          <div key={i} className="flex-1 border-l border-slate-100 first:border-l-0" />
                        ))}
                      </div>
                      {/* Bar */}
                      <div
                        className={`absolute top-1 h-6 rounded ${phase.color} opacity-80`}
                        style={{
                          left: `${(phase.startMonth / 10) * 100}%`,
                          width: `${((phase.endMonth - phase.startMonth + 1) / 10) * 100}%`
                        }}
                      >
                        {phase.progress > 0 && (
                          <div
                            className="h-full bg-white/30 rounded-l"
                            style={{ width: `${phase.progress}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase details expansion */}
              {selectedPhase && (
                <div className="mt-4 p-4 border rounded-lg bg-white">
                  {(() => {
                    const phase = projectPhases.find(p => p.id === selectedPhase)
                    if (!phase) return null
                    return (
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{phase.name}</h4>
                            <p className="text-sm text-slate-500">{phase.description}</p>
                          </div>
                          <Badge>{phase.progress}% complete</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          {phase.milestones.map((m, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 bg-white rounded border"
                            >
                              {m.status === 'completed' ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : m.status === 'in_progress' ? (
                                <Clock className="h-4 w-4 text-blue-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                              )}
                              <span className="text-sm">{m.name}</span>
                              <span className="text-xs text-slate-400 ml-auto">M{m.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Legend */}
              <div className="mt-6 pt-4 border-t flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-blue-500" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-white/30 border rounded" />
                  <span>Progress bar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectPhases.map((phase, index) => (
              <Card key={phase.id} className={phase.status === 'in_progress' ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{phase.phase}</Badge>
                    <Badge
                      className={
                        phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }
                    >
                      {phase.status === 'completed' ? 'Complete' :
                       phase.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{phase.name}</CardTitle>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-500">{phase.duration}</span>
                      <span className="font-medium">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className={`h-2 ${phase.color.replace('bg-', '[&>div]:bg-')}`} />
                  </div>
                  <div className="space-y-2">
                    {phase.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {m.status === 'completed' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : m.status === 'in_progress' ? (
                          <Clock className="h-4 w-4 text-blue-500" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                        )}
                        <span className={m.status === 'completed' ? 'text-slate-500 line-through' : ''}>
                          {m.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="critical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Critical Path Analysis
              </CardTitle>
              <CardDescription>
                Items that directly impact the go-live date. Any delay in these items will delay the project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalPath.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                      item.status === 'completed' ? 'bg-green-50 border-green-200' :
                      item.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                      'bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-200' :
                      item.status === 'in_progress' ? 'bg-blue-200' :
                      'bg-orange-200'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-700" />
                      ) : item.status === 'in_progress' ? (
                        <Play className="h-5 w-5 text-blue-700" />
                      ) : (
                        <span className="text-sm font-bold text-orange-700">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.item}</p>
                      <p className="text-xs text-slate-500">{item.phase}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-medium mb-2">Critical Path Management</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Monitor these items weekly during construction</li>
                  <li>• Have contingency plans for potential delays</li>
                  <li>• Communicate status to stakeholders regularly</li>
                  <li>• Escalate issues immediately if critical items slip</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Schedule-Impacting Risks</CardTitle>
              <CardDescription>Risks that could affect project timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {constructionRisks.map((risk) => (
                  <div key={risk.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{risk.risk}</p>
                        <p className="text-xs text-slate-500 capitalize">{risk.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={
                            risk.probability === 'high' ? 'border-red-300 text-red-700' :
                            risk.probability === 'medium' ? 'border-amber-300 text-amber-700' :
                            'border-green-300 text-green-700'
                          }
                        >
                          P: {risk.probability}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            risk.impact === 'high' || risk.impact === 'critical' ? 'border-red-300 text-red-700' :
                            risk.impact === 'medium' ? 'border-amber-300 text-amber-700' :
                            'border-green-300 text-green-700'
                          }
                        >
                          I: {risk.impact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{risk.mitigation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
