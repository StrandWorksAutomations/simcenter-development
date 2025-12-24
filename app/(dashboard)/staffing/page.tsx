"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Plus,
  Calculator,
  GraduationCap,
  Award,
  DollarSign,
  Clock,
  Calendar
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

import {
  coreStaffingModel,
  facultyPoolModel,
  trainingCosts,
  staffingCostSummary,
  opexCategories,
  centerProfiles
} from "@/data/seed/staffing"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

export default function StaffingPage() {
  const [roomsActive, setRoomsActive] = useState(2)
  const [sessionsPerDay, setSessionsPerDay] = useState(4)
  const [centerSize, setCenterSize] = useState<'small' | 'medium' | 'large'>('medium')

  // Calculate totals
  const totalIncrementalFte = coreStaffingModel.reduce((sum, p) => sum + p.fte, 0)
  const totalIncrementalCost = coreStaffingModel.reduce((sum, p) => sum + (p.loadedCost * p.fte), 0)

  // Coverage calculation
  const coverageRequirements = useMemo(() => {
    // 1 coordinator can handle 2 concurrent rooms
    // Each room needs at least 1 facilitator
    const coordinatorsNeeded = Math.ceil(roomsActive / 2)
    const facilitatorsNeeded = roomsActive
    const adminSupport = sessionsPerDay >= 6 ? 1 : 0.5

    return {
      coordinators: coordinatorsNeeded,
      facilitators: facilitatorsNeeded,
      adminFte: adminSupport,
      totalRequired: coordinatorsNeeded + facilitatorsNeeded + adminSupport,
      coverage: {
        sessions: sessionsPerDay * roomsActive,
        learners: sessionsPerDay * roomsActive * 6, // avg 6 learners per session
        monthlyCapacity: sessionsPerDay * roomsActive * 22 // 22 working days
      }
    }
  }, [roomsActive, sessionsPerDay])

  // Cost breakdown for pie chart
  const costBreakdownData = coreStaffingModel.map(p => ({
    name: p.role.split(' ')[1] || p.role.split(' ')[0], // Shortened name
    value: Math.round(p.loadedCost * p.fte),
    fullName: p.role
  }))

  // Annual projection data
  const annualProjection = useMemo(() => {
    const years = [1, 2, 3, 4, 5]
    return years.map(year => {
      const inflation = Math.pow(1.03, year - 1)
      return {
        year: `Year ${year}`,
        'Core Staff': Math.round(totalIncrementalCost * inflation),
        'Faculty Value': Math.round(facultyPoolModel.totalReallocatedValue * inflation),
        'Training': year === 1 ? trainingCosts.totalInitialTrainingCost : Math.round(3000 * inflation)
      }
    })
  }, [totalIncrementalCost, facultyPoolModel.totalReallocatedValue, trainingCosts.totalInitialTrainingCost])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staffing & Operations</h1>
          <p className="text-slate-500">
            FTE allocation, coverage planning, and labor cost projections
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Position
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Core FTE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncrementalFte.toFixed(1)}</div>
            <p className="text-xs text-slate-500">New hires needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Faculty Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facultyPoolModel.totalFte} FTE</div>
            <p className="text-xs text-slate-500">{facultyPoolModel.educatorsNeeded} educators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total FTE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(totalIncrementalFte + facultyPoolModel.totalFte).toFixed(1)}
            </div>
            <p className="text-xs text-slate-500">Combined coverage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Annual Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalIncrementalCost / 1000).toFixed(0)}k</div>
            <p className="text-xs text-slate-500">Direct costs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Monthly Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${staffingCostSummary.monthlyPayrollCost.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Per month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="positions">Staff Positions</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Planner</TabsTrigger>
          <TabsTrigger value="training">Training & Certification</TabsTrigger>
          <TabsTrigger value="projections">Cost Projections</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Core Staff (Incremental)
                </CardTitle>
                <CardDescription>Direct payroll positions for simulation center</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coreStaffingModel.map((position) => (
                    <div key={position.id} className="p-4 rounded-lg border hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{position.role}</h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {position.fte} FTE
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">${position.loadedCost.toLocaleString()}/yr</p>
                          <p className="text-xs text-slate-500">Base: ${position.baseSalary.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{position.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {position.certifications.map((cert, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t flex justify-between items-center">
                    <span className="font-semibold">Total Core Staff</span>
                    <div className="text-right">
                      <p className="font-bold text-lg text-blue-600">${totalIncrementalCost.toLocaleString()}/yr</p>
                      <p className="text-xs text-slate-500">{totalIncrementalFte} FTE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-green-500" />
                  Faculty Pool (Reallocated)
                </CardTitle>
                <CardDescription>Existing educators contributing to simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500">Educators Needed</p>
                      <p className="text-xl font-bold">{facultyPoolModel.educatorsNeeded}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Time Each</p>
                      <p className="text-xl font-bold">{facultyPoolModel.hoursPerWeekPerEducator}h/week</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Total FTE</p>
                      <p className="text-xl font-bold">{facultyPoolModel.totalFte}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">If Backfilled</p>
                      <p className="text-xl font-bold text-green-700">${(facultyPoolModel.totalReallocatedValue / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{facultyPoolModel.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Responsibilities</h4>
                  <ul className="space-y-1">
                    {facultyPoolModel.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-slate-500">{facultyPoolModel.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution</CardTitle>
              <CardDescription>Annual labor cost breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => percent && percent >= 0.08 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Coverage Calculator</CardTitle>
                <CardDescription>Adjust parameters to see staffing needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex justify-between">
                    <span>Active Rooms</span>
                    <span className="text-blue-600">{roomsActive}</span>
                  </label>
                  <Slider
                    value={[roomsActive]}
                    onValueChange={(v) => setRoomsActive(v[0])}
                    min={1}
                    max={4}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex justify-between">
                    <span>Sessions per Day</span>
                    <span className="text-blue-600">{sessionsPerDay}</span>
                  </label>
                  <Slider
                    value={[sessionsPerDay]}
                    onValueChange={(v) => setSessionsPerDay(v[0])}
                    min={2}
                    max={8}
                    step={1}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Daily Staffing Need</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm">Coordinators/Technicians</span>
                      <span className="font-medium">{coverageRequirements.coordinators}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm">Facilitators (from faculty pool)</span>
                      <span className="font-medium">{coverageRequirements.facilitators}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm">Admin Support</span>
                      <span className="font-medium">{coverageRequirements.adminFte} FTE</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded font-medium">
                      <span>Total Required</span>
                      <span className="text-blue-600">{coverageRequirements.totalRequired.toFixed(1)} people</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity Output</CardTitle>
                <CardDescription>Based on current configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-2xl font-bold">{coverageRequirements.coverage.sessions}</p>
                    <p className="text-xs text-slate-500">Sessions/Day</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-2xl font-bold">{coverageRequirements.coverage.learners}</p>
                    <p className="text-xs text-slate-500">Learners/Day</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-2xl font-bold">{coverageRequirements.coverage.monthlyCapacity}</p>
                    <p className="text-xs text-slate-500">Sessions/Month</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold text-blue-600">{coverageRequirements.coverage.learners * 22}</p>
                    <p className="text-xs text-slate-500">Learners/Month</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Coverage Guidelines</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                      1 Coordinator can support 2 concurrent simulation rooms
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                      Each room needs at least 1 faculty facilitator per session
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                      Admin support scales with session volume (&gt;6/day = 1 FTE)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2" />
                      Average 6 learners per simulation session
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Certification Costs
                </CardTitle>
                <CardDescription>SSH CHSE and related certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">CHSE Certification (SSH)</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Exam Fee (Member)</span>
                        <span>${trainingCosts.certification.chseExamFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exam Fee (Non-Member)</span>
                        <span>${trainingCosts.certification.chseExamFeeNonMember}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prep Materials</span>
                        <span>${trainingCosts.certification.chsePrepMaterials}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-medium">
                        <span>Renewal ({trainingCosts.certification.renewalCycleYears} years)</span>
                        <span>${trainingCosts.certification.chseRenewalFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Annual Professional Development</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Per Staff Allowance</span>
                        <span>${trainingCosts.annualProfessionalDevelopment.perStaffAllowance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conference Travel</span>
                        <span>${trainingCosts.annualProfessionalDevelopment.conferenceTravel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Workshop Fees</span>
                        <span>${trainingCosts.annualProfessionalDevelopment.workshopFees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-green-500" />
                  Onboarding Costs
                </CardTitle>
                <CardDescription>Initial training for new staff</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Total Initial Training Cost</p>
                    <p className="text-3xl font-bold text-blue-600">
                      ${trainingCosts.totalInitialTrainingCost.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Director Onboarding</p>
                        <p className="text-xs text-slate-500">{trainingCosts.onboarding.durationWeeks} weeks</p>
                      </div>
                      <span className="font-medium">${trainingCosts.onboarding.directorOnboardingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Coordinator Onboarding</p>
                        <p className="text-xs text-slate-500">{trainingCosts.onboarding.durationWeeks} weeks</p>
                      </div>
                      <span className="font-medium">${trainingCosts.onboarding.coordinatorOnboardingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Admin Onboarding</p>
                        <p className="text-xs text-slate-500">{trainingCosts.onboarding.durationWeeks} weeks</p>
                      </div>
                      <span className="font-medium">${trainingCosts.onboarding.adminOnboardingCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Includes vendor training, shadowing, scenario development, and equipment familiarization
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>5-Year Staffing Cost Projection</CardTitle>
              <CardDescription>Annual labor costs with 3% inflation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={annualProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Core Staff" fill="#3b82f6" stackId="a" />
                    <Bar dataKey="Faculty Value" fill="#10b981" stackId="a" />
                    <Bar dataKey="Training" fill="#f59e0b" stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 grid grid-cols-5 gap-4">
                {annualProjection.map((year, i) => (
                  <div key={i} className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">{year.year}</p>
                    <p className="font-bold">
                      ${((year['Core Staff'] + year['Training']) / 1000).toFixed(0)}k
                    </p>
                    <p className="text-xs text-slate-400">direct cost</p>
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
