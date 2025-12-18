"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  TrendingUp,
  Users,
  Heart,
  DollarSign,
  Award,
  Target,
  Shield,
  Zap,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  PieChart,
  Globe,
  Video,
  Layers,
  Play,
  ArrowRight,
  Sparkles,
  Download,
  Printer,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Activity,
  TrendingDown,
  Briefcase,
  GraduationCap,
  Star,
  Eye,
  Monitor,
  Maximize2
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import { useSimulationStore } from "@/store/simulation-store"
import { formatCurrency } from "@/data/seed/budget-simulator"

// Chart colors
const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  cyan: '#06b6d4',
  slate: '#64748b'
}

// Impact Data
const impactMetrics = [
  { label: "Healthcare Professionals Trained Annually", value: 5000, icon: GraduationCap, color: "blue" },
  { label: "Lives Potentially Saved per Year", value: 250, icon: Heart, color: "red" },
  { label: "Reduction in Medical Errors", value: 35, suffix: "%", icon: Shield, color: "green" },
  { label: "Nurse Retention Improvement", value: 40, suffix: "%", icon: Users, color: "purple" }
]

// ROI Projections
const roiData = [
  { year: "Year 1", investment: 8000000, savings: 800000, net: -7200000 },
  { year: "Year 2", investment: 900000, savings: 1200000, net: -6900000 },
  { year: "Year 3", investment: 950000, savings: 1500000, net: -6350000 },
  { year: "Year 4", investment: 1000000, savings: 1800000, net: -5550000 },
  { year: "Year 5", investment: 1050000, savings: 2200000, net: -4400000 }
]

// Naming Opportunities
const namingTiers = [
  {
    tier: "Platinum",
    amount: 5000000,
    name: "Entire Simulation Center Naming Rights",
    benefits: [
      "Permanent building naming rights",
      "Dedication ceremony with regional media coverage",
      "Prominent lobby recognition display",
      "VIP access to all simulation events",
      "Annual impact report presentations",
      "Invitation to serve on advisory board"
    ],
    color: "slate",
    available: true
  },
  {
    tier: "Gold",
    amount: 1000000,
    opportunities: [
      "Labor & Delivery Simulation Suite",
      "Trauma/Emergency Simulation Suite",
      "Operating Room Simulation Suite"
    ],
    benefits: [
      "Suite naming plaques",
      "Dedication event",
      "Quarterly impact updates",
      "Suite tour privileges",
      "Recognition on website"
    ],
    color: "amber",
    available: 3
  },
  {
    tier: "Silver",
    amount: 500000,
    opportunities: [
      "Pediatric/Neonatal Suite",
      "Control Room & Technology Center",
      "Skills Lab & Training Center"
    ],
    benefits: [
      "Room naming recognition",
      "Annual donor appreciation event",
      "Bi-annual progress reports",
      "Website recognition"
    ],
    color: "slate",
    available: 3
  },
  {
    tier: "Bronze",
    amount: 250000,
    opportunities: [
      "Equipment Sponsorship Package",
      "Debrief & Education Rooms",
      "Simulation Equipment Collections"
    ],
    benefits: [
      "Equipment naming plaques",
      "Recognition wall listing",
      "Annual impact summary",
      "Newsletter features"
    ],
    color: "orange",
    available: 5
  }
]

// Testimonials
const testimonials = [
  {
    quote: "Our simulation center reduced first-year nurse turnover from 30% to 12% in just two years.",
    author: "Dr. Sarah Mitchell",
    role: "Chief Nursing Officer",
    organization: "Regional Medical Center",
    image: "👩‍⚕️"
  },
  {
    quote: "Simulation training saved my career. I wasn't ready for real emergencies until I practiced here.",
    author: "Jessica Chen, RN",
    role: "Emergency Department Nurse",
    organization: "Baptist Health System",
    image: "👨‍⚕️"
  },
  {
    quote: "The ROI is clear: fewer errors, better outcomes, and staff who are confident and prepared.",
    author: "Michael Torres",
    role: "Hospital CEO",
    organization: "Community Healthcare Network",
    image: "👔"
  }
]

// Market data
const marketGrowthData = [
  { year: '2024', value: 2.4 },
  { year: '2026', value: 3.1 },
  { year: '2028', value: 4.0 },
  { year: '2030', value: 5.8 }
]

// Comparative metrics
const comparisonData = [
  { category: "Staff Confidence", withSim: 95, withoutSim: 65 },
  { category: "Error Reduction", withSim: 85, withoutSim: 45 },
  { category: "Retention Rate", withSim: 88, withoutSim: 70 },
  { category: "Patient Outcomes", withSim: 92, withoutSim: 78 },
  { category: "Cost Efficiency", withSim: 80, withoutSim: 55 }
]

export default function PresentationPage() {
  const [viewMode, setViewMode] = useState<"executive" | "detailed" | "visual" | "investment">("executive")
  const [isPrintMode, setIsPrintMode] = useState(false)
  const { params, results } = useSimulationStore()

  // Calculate funding progress (example)
  const fundingGoal = 8000000
  const currentFunding = 1500000
  const fundingProgress = (currentFunding / fundingGoal) * 100

  const handlePrint = () => {
    setIsPrintMode(true)
    setTimeout(() => {
      window.print()
      setIsPrintMode(false)
    }, 100)
  }

  return (
    <div className={`space-y-8 ${isPrintMode ? 'print-mode' : ''}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-12 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/30 to-transparent" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-white/20 text-white hover:bg-white/30 text-sm px-3 py-1">
              <Star className="h-3 w-3 mr-1 inline" />
              Investment Opportunity
            </Badge>
            <Badge className="bg-green-500/20 text-green-200 hover:bg-green-500/30 text-sm px-3 py-1">
              <TrendingUp className="h-3 w-3 mr-1 inline" />
              High Impact
            </Badge>
          </div>

          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Baptist Health Lexington
            <br />
            <span className="text-blue-200">Healthcare Simulation Center</span>
          </h1>

          <p className="text-2xl text-blue-100 max-w-3xl mb-8 leading-relaxed">
            Transforming Healthcare Education in Central Kentucky Through
            State-of-the-Art Simulation Training
          </p>

          {/* Key Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex justify-center mb-2">
                <DollarSign className="h-8 w-8 text-green-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{formatCurrency(results.capex.net)}</div>
              <div className="text-blue-200 text-sm">Investment Required</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-purple-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">5,000+</div>
              <div className="text-blue-200 text-sm">Learners Annually</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-red-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">250+</div>
              <div className="text-blue-200 text-sm">Lives Saved/Year</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-emerald-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">$5.8M</div>
              <div className="text-blue-200 text-sm">5-Year Cost Avoidance</div>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="relative z-10 mt-10 flex flex-wrap gap-3">
          <Button
            variant={viewMode === "executive" ? "default" : "outline"}
            onClick={() => setViewMode("executive")}
            className={viewMode === "executive" ? "bg-white text-blue-900" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}
          >
            <Eye className="h-4 w-4 mr-2" />
            Executive View
          </Button>
          <Button
            variant={viewMode === "detailed" ? "default" : "outline"}
            onClick={() => setViewMode("detailed")}
            className={viewMode === "detailed" ? "bg-white text-blue-900" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed View
          </Button>
          <Button
            variant={viewMode === "visual" ? "default" : "outline"}
            onClick={() => setViewMode("visual")}
            className={viewMode === "visual" ? "bg-white text-blue-900" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Visual Tour
          </Button>
          <Button
            variant={viewMode === "investment" ? "default" : "outline"}
            onClick={() => setViewMode("investment")}
            className={viewMode === "investment" ? "bg-white text-blue-900" : "bg-white/10 text-white border-white/30 hover:bg-white/20"}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Investment Brief
          </Button>

          <div className="flex-1" />

          <Button
            variant="outline"
            onClick={handlePrint}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* EXECUTIVE VIEW */}
      {viewMode === "executive" && (
        <div className="space-y-8">
          {/* Vision Statement */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900">
            <CardContent className="pt-8 pb-8">
              <div className="text-center max-w-4xl mx-auto">
                <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Vision</h2>
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                  To establish Central Kentucky's premier healthcare simulation center,
                  revolutionizing medical education and patient safety through immersive,
                  hands-on training that prepares healthcare professionals for real-world
                  challenges while saving lives and reducing medical errors.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Impact Dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, idx) => (
              <Card key={idx} className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${metric.color}-100 dark:bg-${metric.color}-900/30 rounded-bl-full opacity-50`} />
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <metric.icon className={`h-8 w-8 text-${metric.color}-600`} />
                  </div>
                  <div className="text-4xl font-bold mb-2 dark:text-white">
                    {metric.value.toLocaleString()}{metric.suffix || ''}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-900 dark:text-red-300">The Challenge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "250,000+ annual deaths from medical errors (3rd leading cause)",
                    "25-30% first-year nurse turnover costing $61K per nurse",
                    "1.2 million new nurses needed by 2030",
                    "Rural hospitals lack access to advanced training",
                    "Traditional training inadequate for rare, high-acuity events"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:bg-green-950/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-900 dark:text-green-300">Our Solution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "State-of-the-art simulation suites with high-fidelity manikins",
                    "Safe environment to practice high-risk scenarios",
                    "84% reduction in central line infections (proven)",
                    "50% fewer malpractice claims for trained providers",
                    "Regional training hub serving community hospitals"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Impact Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Performance With vs. Without Simulation Training
              </CardTitle>
              <CardDescription>Proven improvements across key healthcare metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={comparisonData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748b' }} />
                    <Radar name="With Simulation" dataKey="withSim" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Radar name="Without Simulation" dataKey="withoutSim" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Funding Progress */}
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Funding Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold dark:text-white">
                    ${(currentFunding / 1000000).toFixed(1)}M raised
                  </span>
                  <span className="text-lg font-semibold text-purple-600">
                    ${(fundingGoal / 1000000).toFixed(0)}M goal
                  </span>
                </div>
                <Progress value={fundingProgress} className="h-4" />
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{fundingProgress.toFixed(0)}%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Complete</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${((fundingGoal - currentFunding) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Remaining</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Q3 2026</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Target Launch</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DETAILED VIEW */}
      {viewMode === "detailed" && (
        <div className="space-y-8">
          {/* Facility Overview */}
          <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/10 rounded-xl">
                  <Building2 className="h-12 w-12 text-blue-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Phase 1: {params.simRooms}-Room Simulation Center</h3>
                  <p className="text-blue-200 mb-4">
                    {params.floorArea.toLocaleString()} SF state-of-the-art facility featuring {params.highFidelityManikins} high-fidelity manikins
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-3xl font-bold text-blue-300">{params.simRooms}</div>
                      <div className="text-sm text-blue-200">Simulation Suites</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-3xl font-bold text-emerald-300">{params.controlRooms}</div>
                      <div className="text-sm text-blue-200">Control Rooms</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-3xl font-bold text-purple-300">{params.debriefRooms}</div>
                      <div className="text-sm text-blue-200">Debrief Rooms</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-lg">
                      <div className="text-3xl font-bold text-amber-300">{params.highFidelityManikins}</div>
                      <div className="text-sm text-blue-200">Hi-Fi Manikins</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Capital Expenditure Breakdown
                </CardTitle>
                <CardDescription>Phase 1 Investment: {formatCurrency(results.capex.net)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Construction & Renovation", amount: results.capex.construction, color: CHART_COLORS.cyan },
                    { label: "Medical Equipment", amount: results.capex.equipment, color: CHART_COLORS.warning },
                    { label: "A/V Recording System", amount: results.capex.avSystem, color: CHART_COLORS.pink },
                    { label: "Soft Costs & Planning", amount: results.capex.softCosts, color: CHART_COLORS.slate },
                    { label: "Contingency Reserve", amount: results.capex.contingency, color: CHART_COLORS.danger }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium dark:text-white">{item.label}</span>
                          <span className="text-sm font-bold dark:text-white">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: item.color,
                              width: `${(item.amount / results.capex.total) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Annual Operating Expenses
                </CardTitle>
                <CardDescription>Year 1 OPEX: {formatCurrency(results.opex.annual)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Personnel & Staffing", amount: results.opex.staffing, color: CHART_COLORS.purple },
                    { label: "Equipment Maintenance", amount: results.opex.maintenance, color: CHART_COLORS.danger },
                    { label: "Training Consumables", amount: results.opex.consumables, color: CHART_COLORS.warning },
                    { label: "Software & Licenses", amount: results.opex.software, color: CHART_COLORS.pink },
                    { label: "Utilities & Facilities", amount: results.opex.utilities, color: CHART_COLORS.cyan },
                    { label: "Equipment Refresh Fund", amount: results.opex.refresh, color: CHART_COLORS.slate }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium dark:text-white">{item.label}</span>
                          <span className="text-sm font-bold dark:text-white">{formatCurrency(item.amount)}</span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full mt-1">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: item.color,
                              width: `${(item.amount / results.opex.annual) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5-Year Financial Projection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                5-Year Financial Model
              </CardTitle>
              <CardDescription>Investment vs. Cost Avoidance Projection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roiData}>
                    <defs>
                      <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} stroke="#64748b" />
                    <Tooltip
                      formatter={(value: number) => `$${(value / 1000000).toFixed(2)}M`}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="investment"
                      stroke="#ef4444"
                      fill="url(#investmentGradient)"
                      name="Annual Investment"
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#10b981"
                      fill="url(#savingsGradient)"
                      name="Cost Avoidance"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Investment</div>
                  <div className="text-2xl font-bold text-red-600">
                    ${(results.fiveYear.totalCost / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Cost Avoidance</div>
                  <div className="text-2xl font-bold text-green-600">$5.8M</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Net Position</div>
                  <div className="text-2xl font-bold text-amber-600">46% Recovery</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {formatCurrency(results.metrics.costPerSession)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Cost per Session</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {results.metrics.annualSessions.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Sessions per Year</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">
                  {formatCurrency(results.metrics.costPerSF)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Cost per SF</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {params.coreFTE.toFixed(1)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Core Staff FTE</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* VISUAL TOUR */}
      {viewMode === "visual" && (
        <div className="space-y-8">
          {/* 3D Facility Visualization Placeholder */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Interactive 3D Facility Walkthrough
              </CardTitle>
              <CardDescription>
                Explore the simulation center in an immersive 3D environment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl inline-block">
                      <Layers className="h-24 w-24 text-white mx-auto mb-4" />
                      <div className="text-white text-xl font-semibold mb-2">3D Facility Model</div>
                      <div className="text-blue-200 text-sm mb-4">
                        Interactive virtual tour of the simulation center
                      </div>
                      <Button className="bg-white text-blue-900 hover:bg-blue-50">
                        <Play className="h-4 w-4 mr-2" />
                        Launch 3D Tour
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    <Maximize2 className="h-3 w-3 mr-1" />
                    Full Screen Available
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-4">
                {["Overview", "Simulation Suite", "Control Room", "Debrief Area"].map((view, idx) => (
                  <Button key={idx} variant="outline" className="text-sm">
                    {view}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Walkthrough */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Walkthrough & Demonstration
              </CardTitle>
              <CardDescription>
                See simulation-based training in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-white mb-4 mx-auto opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                      <div className="text-white font-semibold">Facility Overview</div>
                      <div className="text-slate-300 text-sm">5:30 duration</div>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-white mb-4 mx-auto opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                      <div className="text-white font-semibold">Training Simulation</div>
                      <div className="text-blue-200 text-sm">8:45 duration</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Floor Plans */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI-Generated Floor Plan Showcase
              </CardTitle>
              <CardDescription>
                Intelligent layout optimization for maximum training efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="main" className="space-y-4">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="main">Main Floor</TabsTrigger>
                  <TabsTrigger value="sim">Simulation Suites</TabsTrigger>
                  <TabsTrigger value="control">Control Rooms</TabsTrigger>
                  <TabsTrigger value="support">Support Areas</TabsTrigger>
                </TabsList>

                {["main", "sim", "control", "support"].map((tab) => (
                  <TabsContent key={tab} value={tab}>
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <Building2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                          <div className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} Floor Plan
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-500">
                            AI-optimized layout • {params.floorArea.toLocaleString()} SF
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Market Growth Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Healthcare Simulation Market Growth
              </CardTitle>
              <CardDescription>
                Global market projected to reach $5.8B by 2030 (13.5% CAGR)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketGrowthData}>
                    <defs>
                      <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis tickFormatter={(v) => `$${v}B`} stroke="#64748b" />
                    <Tooltip
                      formatter={(value: number) => [`$${value}B`, 'Market Size']}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#marketGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* INVESTMENT BRIEF */}
      {viewMode === "investment" && (
        <div className="space-y-8">
          {/* Investment Summary */}
          <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white border-0">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Investment Opportunity Summary</h2>
                <p className="text-blue-200 text-lg">
                  Join us in creating a legacy of healthcare excellence
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <DollarSign className="h-12 w-12 text-green-300 mx-auto mb-3" />
                  <div className="text-4xl font-bold mb-2">{formatCurrency(results.capex.net)}</div>
                  <div className="text-blue-200">Capital Investment Required</div>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <TrendingUp className="h-12 w-12 text-amber-300 mx-auto mb-3" />
                  <div className="text-4xl font-bold mb-2">$5.8M</div>
                  <div className="text-blue-200">5-Year Cost Avoidance</div>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <Heart className="h-12 w-12 text-red-300 mx-auto mb-3" />
                  <div className="text-4xl font-bold mb-2">Immeasurable</div>
                  <div className="text-blue-200">Lives Impacted</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Naming Opportunities */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2 dark:text-white">Naming & Sponsorship Opportunities</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Create a lasting legacy in medical education and patient safety
              </p>
            </div>

            {namingTiers.map((tier, idx) => (
              <Card key={idx} className={`border-2 ${tier.available ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' : 'border-slate-200'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-${tier.color}-400`} />
                      <CardTitle className="text-2xl">{tier.tier} Level</CardTitle>
                      {tier.tier === "Platinum" && (
                        <Badge className="bg-gradient-to-r from-slate-400 to-slate-600 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Premier Opportunity
                        </Badge>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-right">
                      ${(tier.amount / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {tier.name && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Naming Rights:
                          </h4>
                          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                            {tier.name}
                          </p>
                        </div>
                      )}
                      {tier.opportunities && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Available Opportunities ({tier.available}):
                          </h4>
                          <ul className="space-y-2">
                            {tier.opportunities.map((opp, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-slate-700 dark:text-slate-300">{opp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Recognition Benefits:
                      </h4>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Projections */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Investment Impact
              </CardTitle>
              <CardDescription>
                Projected outcomes over the first 5 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                  <GraduationCap className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600 mb-1">25,000+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Healthcare professionals trained
                  </div>
                </div>
                <div className="text-center p-6 bg-red-50 dark:bg-red-950/30 rounded-xl">
                  <Heart className="h-10 w-10 text-red-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-600 mb-1">1,250+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Lives potentially saved
                  </div>
                </div>
                <div className="text-center p-6 bg-green-50 dark:bg-green-950/30 rounded-xl">
                  <TrendingDown className="h-10 w-10 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600 mb-1">60%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Reduction in preventable errors
                  </div>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                  <Users className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600 mb-1">500+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Nurses retained through better training
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                What Healthcare Leaders Are Saying
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-4xl mb-4">{testimonial.image}</div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <div className="font-semibold dark:text-white">{testimonial.author}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500">{testimonial.organization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Call to Action - Always Visible */}
      <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white border-0">
        <CardContent className="py-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Healthcare Education?</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join us in creating a world-class simulation center that will save lives,
              develop the next generation of healthcare professionals, and establish
              Central Kentucky as a leader in medical education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule a Presentation
              </Button>
              <Button size="lg" variant="outline" className="bg-blue-500/20 text-white border-white/30 hover:bg-blue-500/30 font-semibold">
                <Download className="h-5 w-5 mr-2" />
                Download Full Proposal
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3 justify-center">
                <Mail className="h-5 w-5 text-blue-200" />
                <div className="text-left">
                  <div className="text-xs text-blue-200">Email</div>
                  <div className="font-medium">development@baptisthealth.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <Phone className="h-5 w-5 text-blue-200" />
                <div className="text-left">
                  <div className="text-xs text-blue-200">Phone</div>
                  <div className="font-medium">(859) 260-6104</div>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <MapPin className="h-5 w-5 text-blue-200" />
                <div className="text-left">
                  <div className="text-xs text-blue-200">Location</div>
                  <div className="font-medium">Lexington, KY</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .print-mode {
            background: white !important;
          }
          .print-mode * {
            background: white !important;
            color: black !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
