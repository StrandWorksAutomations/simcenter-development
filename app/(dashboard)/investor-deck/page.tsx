"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Globe
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  Legend
} from "recharts"

// Data imports from our comprehensive research
const marketGrowthData = [
  { year: '2024', size: 2.4 },
  { year: '2025', size: 2.7 },
  { year: '2026', size: 3.1 },
  { year: '2027', size: 3.5 },
  { year: '2028', size: 4.0 },
  { year: '2029', size: 4.6 },
  { year: '2030', size: 5.8 },
]

const roiProjections = [
  { scenario: 'Conservative', costAvoidance: 4.65, investment: 12.5, roi: -63 },
  { scenario: 'Base Case', costAvoidance: 5.8, investment: 12.5, roi: -54 },
  { scenario: 'Optimistic', costAvoidance: 9.5, investment: 12.5, roi: -24 },
]

const costAvoidanceBreakdown = [
  { name: 'Turnover Reduction', value: 3000000, color: '#3b82f6' },
  { name: 'Orientation Savings', value: 1500000, color: '#10b981' },
  { name: 'Adverse Events Prevented', value: 750000, color: '#f59e0b' },
  { name: 'ICU Transfers Avoided', value: 300000, color: '#8b5cf6' },
  { name: 'External Revenue', value: 250000, color: '#ec4899' },
]

const benchmarkComparison = [
  { name: 'OSF Jump', sqft: 168000, investment: 50, learners: 220000, maturity: 'Mature' },
  { name: 'Cleveland Clinic', sqft: 40000, investment: 18, learners: 43831, maturity: 'Mature' },
  { name: 'Sharp Prebys', sqft: 70000, investment: 28, learners: 10000, maturity: 'Startup' },
  { name: 'NCH Herb', sqft: 12000, investment: 6, learners: 4032, maturity: 'Scaling' },
  { name: 'Riverside', sqft: 8400, investment: 4, learners: 3933, maturity: 'Scaling' },
  { name: 'Baptist Health (Proposed)', sqft: 12000, investment: 8, learners: 5000, maturity: 'Proposed' },
]

const kpiImpacts = [
  { kpi: 'First-Year Nurse Turnover', before: 25, after: 15, unit: '%', savings: '$500K/yr' },
  { kpi: 'Orientation Duration', before: 12, after: 8, unit: 'weeks', savings: '$250K/yr' },
  { kpi: 'Adverse Events', before: 100, after: 85, unit: '% of baseline', savings: '$75K/yr' },
  { kpi: 'Code Survival Rate', before: 33, after: 50, unit: '%', savings: 'Lives saved' },
]

const namingOpportunities = [
  { tier: 'Platinum', name: 'Simulation Center Naming Rights', amount: 5000000, available: true },
  { tier: 'Gold', name: 'Labor & Delivery Simulation Suite', amount: 1000000, available: true },
  { tier: 'Gold', name: 'Trauma/Emergency Simulation Suite', amount: 1000000, available: true },
  { tier: 'Silver', name: 'Pediatric/Neonatal Suite', amount: 500000, available: true },
  { tier: 'Silver', name: 'Control Room & Technology Center', amount: 500000, available: true },
  { tier: 'Bronze', name: 'Equipment Sponsorship Package', amount: 250000, available: true },
  { tier: 'Bronze', name: 'Debrief & Education Room', amount: 250000, available: true },
]

const outcomeStats = [
  { stat: '84%', label: 'Reduction in Central Line Infections', source: 'Multi-hospital study' },
  { stat: '50%', label: 'Fewer Malpractice Claims (OB)', source: 'Simulation-trained MDs' },
  { stat: '35%', label: 'Shorter Nurse Orientation', source: 'Industry benchmark' },
  { stat: '$289K', label: 'Saved per 1% Turnover Reduction', source: 'NSI 2024 Report' },
]

export default function InvestorDeckPage() {
  const [activeSlide, setActiveSlide] = useState('overview')

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-8 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Investment Opportunity</Badge>
          <h1 className="text-4xl font-bold mb-4">
            Baptist Health Lexington<br />
            <span className="text-blue-200">Simulation Center</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-6">
            Transforming Healthcare Education in Central Kentucky
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">$5.8B</div>
              <div className="text-blue-200 text-sm">Global Market by 2030</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">13.5%</div>
              <div className="text-blue-200 text-sm">Annual Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">$5-6M</div>
              <div className="text-blue-200 text-sm">5-Year Cost Avoidance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">∞</div>
              <div className="text-blue-200 text-sm">Lives Saved Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeSlide} onValueChange={setActiveSlide} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="roi">ROI Model</TabsTrigger>
          <TabsTrigger value="invest">Invest</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          {/* Problem Statement */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-900">The Problem: Healthcare Training Crisis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">1.2M</div>
                  <div className="text-sm text-slate-600">New nurses needed by 2030</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">25-30%</div>
                  <div className="text-sm text-slate-600">First-year nurse turnover rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-red-600">$61K</div>
                  <div className="text-sm text-slate-600">Cost per nurse turnover</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-slate-700">
                  <strong>Medical errors are the 3rd leading cause of death in the US</strong> (250,000+ annually).
                  Traditional training methods cannot adequately prepare healthcare workers for high-acuity,
                  rare-event situations. Rural and community hospitals lack access to advanced training resources.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-900">The Solution: Simulation-Based Training</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What Simulation Centers Do:</h4>
                  <ul className="space-y-2">
                    {[
                      'Practice high-risk scenarios without patient risk',
                      'Reduce errors through repetitive skills training',
                      'Improve staff retention through better preparation',
                      'Test new processes and equipment safely',
                      'Train interdisciplinary teams together'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold mb-3">Proven Outcomes:</h4>
                  {outcomeStats.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div>
                        <div className="font-bold text-green-700">{item.stat}</div>
                        <div className="text-xs text-slate-500">{item.label}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">{item.source}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Projected KPI Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kpiImpacts} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="kpi" type="category" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}${kpiImpacts.find(k => k.kpi === name)?.unit || ''}`,
                        name === 'before' ? 'Before Simulation' : 'After Simulation'
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="before" name="Before Simulation" fill="#ef4444" />
                    <Bar dataKey="after" name="After Simulation" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MARKET TAB */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Simulation Market Growth
                </CardTitle>
                <CardDescription>Healthcare simulation market projected to reach $5.8B by 2030</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(v) => `$${v}B`} />
                      <Tooltip formatter={(v) => [`$${v}B`, 'Market Size']} />
                      <Area
                        type="monotone"
                        dataKey="size"
                        stroke="#3b82f6"
                        fill="url(#colorGradient)"
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Market Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { driver: 'Patient Safety Mandates', icon: Shield, growth: 'Regulatory requirement' },
                    { driver: 'Nursing Shortage', icon: Users, growth: '1.2M needed by 2030' },
                    { driver: 'Malpractice Insurance', icon: DollarSign, growth: '50% premium reduction' },
                    { driver: 'Technology Advances', icon: Zap, growth: 'VR/AR +67% growth' },
                    { driver: 'COVID-19 Acceleration', icon: Heart, growth: 'Fast-tracked adoption' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                      <div className="p-2 rounded-full bg-blue-100">
                        <item.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.driver}</div>
                        <div className="text-sm text-slate-500">{item.growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kentucky Market Opportunity */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Kentucky Market Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">Market Gap:</h4>
                  <p className="text-slate-700 mb-4">
                    No dedicated regional simulation training center serving community hospitals
                    in Central/Eastern Kentucky. UK HealthCare serves the academic market,
                    leaving community hospitals underserved.
                  </p>
                  <h4 className="font-semibold mb-3 text-blue-800">Target Audience:</h4>
                  <ul className="space-y-2">
                    {[
                      'Baptist Health system staff (multiple hospitals)',
                      'Regional EMS and first responders',
                      'Rural hospital partners',
                      'Nursing school partnerships',
                      'Community health providers'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-800">Our Differentiators:</h4>
                  <div className="space-y-3">
                    {[
                      'Community hospital focus (vs. academic)',
                      'Regional outreach with mobile simulation',
                      'OB/maternal health specialization',
                      'Affordable access for smaller facilities',
                      'Partnership model with nursing schools'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-white rounded">
                        <Award className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BENCHMARKS TAB */}
        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Peer Simulation Center Comparison
              </CardTitle>
              <CardDescription>Investment vs. Annual Learner Capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="investment"
                      name="Investment"
                      unit="M"
                      tickFormatter={(v) => `$${v}M`}
                    />
                    <YAxis
                      type="number"
                      dataKey="learners"
                      name="Learners"
                      tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'Investment') return [`$${value}M`, 'Investment']
                        if (name === 'Learners') return [value.toLocaleString(), 'Annual Learners']
                        return [value, name]
                      }}
                      labelFormatter={(value) => benchmarkComparison.find(b => b.investment === value)?.name}
                    />
                    <Scatter
                      data={benchmarkComparison}
                      fill="#3b82f6"
                    >
                      {benchmarkComparison.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.name.includes('Baptist') ? '#22c55e' : '#3b82f6'}
                          stroke={entry.name.includes('Baptist') ? '#15803d' : '#1d4ed8'}
                          strokeWidth={entry.name.includes('Baptist') ? 3 : 1}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <Badge className="bg-blue-100 text-blue-800">Existing Centers</Badge>
                <Badge className="bg-green-100 text-green-800">Baptist Health (Proposed)</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Benchmark Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarkComparison.slice(0, 6).map((center, i) => (
              <Card key={i} className={center.name.includes('Baptist') ? 'border-green-500 border-2' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <Badge variant={center.maturity === 'Mature' ? 'default' : center.maturity === 'Scaling' ? 'secondary' : 'outline'}>
                      {center.maturity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {typeof center.sqft === 'number' ? `${(center.sqft/1000).toFixed(0)}K` : center.sqft}
                      </div>
                      <div className="text-xs text-slate-500">Sq Ft</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">${center.investment}M</div>
                      <div className="text-xs text-slate-500">Investment</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">
                        {center.learners >= 1000 ? `${(center.learners/1000).toFixed(0)}K` : center.learners}
                      </div>
                      <div className="text-xs text-slate-500">Learners/Yr</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROI TAB */}
        <TabsContent value="roi" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cost Avoidance Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  5-Year Cost Avoidance (Base Case)
                </CardTitle>
                <CardDescription>$5.8M in projected savings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={costAvoidanceBreakdown}
                        cx="35%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                        labelLine={false}
                      >
                        {costAvoidanceBreakdown.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => [`$${(Number(v)/1000000).toFixed(1)}M`, 'Savings']} />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value) => <span style={{ color: '#64748b', fontSize: '11px' }}>{value}</span>}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* ROI Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ROI Scenario Analysis
                </CardTitle>
                <CardDescription>$12.5M total investment over 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiProjections}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scenario" />
                      <YAxis tickFormatter={(v) => `$${v}M`} />
                      <Tooltip formatter={(v) => [`$${v}M`, '']} />
                      <Legend />
                      <Bar dataKey="investment" name="Investment" fill="#ef4444" />
                      <Bar dataKey="costAvoidance" name="Cost Avoidance" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50">
            <CardHeader>
              <CardTitle>Financial Model Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$8M</div>
                  <div className="text-sm text-slate-600">Capital Expenditure</div>
                  <div className="text-xs text-slate-400 mt-1">Construction + Equipment</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600">$4.5M</div>
                  <div className="text-sm text-slate-600">5-Year Operating</div>
                  <div className="text-xs text-slate-400 mt-1">Staff + Maintenance</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">$5.8M</div>
                  <div className="text-sm text-slate-600">Cost Avoidance</div>
                  <div className="text-xs text-slate-400 mt-1">Base Case Projection</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-amber-600">46%</div>
                  <div className="text-sm text-slate-600">Investment Recovery</div>
                  <div className="text-xs text-slate-400 mt-1">5-Year Payback %</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2">Key Assumptions:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Turnover Reduction:</strong> $289K saved per 1% RN turnover drop
                  </div>
                  <div>
                    <strong>Orientation:</strong> $5,550 saved per nurse (3.7 weeks × $1,500/week)
                  </div>
                  <div>
                    <strong>Adverse Events:</strong> $12K average cost per prevented event
                  </div>
                  <div>
                    <strong>ICU Transfers:</strong> $12K average cost avoided per transfer
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-800 font-semibold">
                  <Heart className="h-5 w-5" />
                  Beyond the Numbers: Intangible Returns
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Lives saved, families preserved, reduced staff burnout, community reputation,
                  regional healthcare leadership, workforce pipeline development, and quality of care
                  improvements that cannot be quantified in dollars.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* INVEST TAB */}
        <TabsContent value="invest" className="space-y-6">
          {/* Investment Ask */}
          <Card className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
            <CardContent className="pt-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Investment Opportunity</h2>
                <p className="text-blue-200">Transform Healthcare Education in Central Kentucky</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="text-4xl font-bold text-green-400">$5-10M</div>
                  <div className="text-blue-200">Philanthropic Goal</div>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-amber-400">5,000+</div>
                  <div className="text-blue-200">Learners Annually</div>
                </div>
                <div className="p-4">
                  <div className="text-4xl font-bold text-purple-400">∞</div>
                  <div className="text-blue-200">Lives Impacted</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Naming Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                Naming & Sponsorship Opportunities
              </CardTitle>
              <CardDescription>Create a lasting legacy in medical education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                  <div key={tier}>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${
                        tier === 'Platinum' ? 'bg-slate-400' :
                        tier === 'Gold' ? 'bg-amber-400' :
                        tier === 'Silver' ? 'bg-slate-300' : 'bg-amber-600'
                      }`} />
                      {tier} Level
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {namingOpportunities
                        .filter(o => o.tier === tier)
                        .map((opp, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <div className="font-medium">{opp.name}</div>
                              <div className="text-sm text-slate-500">
                                ${(opp.amount / 1000000).toFixed(opp.amount >= 1000000 ? 0 : 1)}
                                {opp.amount >= 1000000 ? 'M' : 'K'}
                              </div>
                            </div>
                            <Badge variant={opp.available ? 'default' : 'secondary'}>
                              {opp.available ? 'Available' : 'Reserved'}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Statement */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">With Your Investment, We Will:</h4>
                  <ul className="space-y-3">
                    {[
                      'Train 5,000+ healthcare professionals annually',
                      'Reduce preventable medical errors in Central Kentucky',
                      'Cut first-year nurse turnover by 10%+',
                      'Establish regional maternal health training excellence',
                      'Create pipeline for healthcare workforce',
                      'Position Baptist Health as education leader'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold mb-4 text-center">Recognition & Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      'Permanent naming recognition',
                      'Dedication ceremony',
                      'Annual impact reports',
                      'Exclusive tours and demonstrations',
                      'Recognition in all marketing materials',
                      'Invitations to simulation events',
                      'Tax-deductible charitable contribution'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Healthcare Education?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join us in creating a world-class simulation center that will save lives,
                develop the next generation of healthcare professionals, and establish
                Central Kentucky as a leader in medical education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Schedule a Presentation
                </button>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border border-blue-400">
                  Download Full Proposal
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
