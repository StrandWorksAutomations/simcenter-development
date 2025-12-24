"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Presentation,
  Target,
  DollarSign,
  TrendingUp,
  Shield,
  Calendar,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Star,
  AlertTriangle
} from "lucide-react"
import {
  EXECUTIVE_SUMMARY,
  INVESTMENT_OPTIONS,
  ROI_PROJECTIONS,
  RISK_MITIGATIONS,
  MILESTONES,
  SUCCESS_METRICS,
  CALL_TO_ACTION,
  getTotalROI,
  getStats
} from "@/data/seed/leadership-proposal"

const RISK_COLORS = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-amber-500/20 text-amber-400',
  low: 'bg-emerald-500/20 text-emerald-400'
}

function ExecutiveSummaryView() {
  return (
    <div className="space-y-6">
      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">{EXECUTIVE_SUMMARY.missionStatement}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-400" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300">{EXECUTIVE_SUMMARY.visionStatement}</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Benefits & Strategic Alignment */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              Key Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {EXECUTIVE_SUMMARY.keyBenefits.map((benefit, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Strategic Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {EXECUTIVE_SUMMARY.strategicAlignment.map((item, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InvestmentOptionsView() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {INVESTMENT_OPTIONS.map(option => (
        <Card
          key={option.id}
          className={`bg-slate-800/50 border-slate-700 relative ${
            option.recommended ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          {option.recommended && (
            <Badge className="absolute -top-2 left-4 bg-blue-500 text-white">
              Recommended
            </Badge>
          )}
          <CardHeader className="pt-6">
            <CardTitle className="text-white text-lg">{option.name}</CardTitle>
            <div className="text-2xl font-bold text-emerald-400">{option.investment}</div>
            <CardDescription className="text-xs">{option.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-300 mb-2">Capabilities:</div>
                <ul className="space-y-1">
                  {option.capabilities.map((cap, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-300 mb-2">Expected Outcomes:</div>
                <ul className="space-y-1">
                  {option.outcomes.map((outcome, i) => (
                    <li key={i} className="text-xs text-emerald-400 flex items-start gap-2">
                      <ArrowRight className="h-3 w-3 mt-0.5 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Badge variant="outline" className="border-slate-600">
                {option.timeline}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ROIView() {
  const year1Total = getTotalROI(1)
  const year3Total = getTotalROI(3)
  const year5Total = getTotalROI(5)

  return (
    <div className="space-y-4">
      {/* ROI Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Year 1 ROI</div>
            <div className="text-2xl font-bold text-white">${(year1Total / 1000).toFixed(0)}K</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Year 3 Cumulative</div>
            <div className="text-2xl font-bold text-blue-400">${(year3Total / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Year 5 Cumulative</div>
            <div className="text-2xl font-bold text-emerald-400">${(year5Total / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Breakdown */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            ROI Projections by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ROI_PROJECTIONS.map((proj, i) => (
              <div key={i} className="p-3 rounded bg-slate-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{proj.category}</span>
                  <div className="flex gap-4 text-xs">
                    <span className="text-slate-400">Y1: <span className="text-white">{proj.year1}</span></span>
                    <span className="text-slate-400">Y3: <span className="text-blue-400">{proj.year3}</span></span>
                    <span className="text-slate-400">Y5: <span className="text-emerald-400">{proj.year5}</span></span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{proj.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RiskView() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {RISK_MITIGATIONS.map((risk, i) => (
        <Card key={i} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">{risk.risk}</CardTitle>
              <div className="flex gap-2">
                <Badge className={RISK_COLORS[risk.likelihood]}>
                  L: {risk.likelihood}
                </Badge>
                <Badge className={RISK_COLORS[risk.impact]}>
                  I: {risk.impact}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-400">{risk.mitigation}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function MilestonesView() {
  return (
    <div className="space-y-4">
      {MILESTONES.map((milestone, i) => (
        <Card key={milestone.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <div>
                <CardTitle className="text-white text-sm">{milestone.phase}</CardTitle>
                <Badge variant="outline" className="border-slate-600 text-xs mt-1">
                  {milestone.timeline}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-slate-300 mb-2">Deliverables:</div>
                <ul className="space-y-1">
                  {milestone.deliverables.map((d, j) => (
                    <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-xs font-medium text-emerald-400 mb-1">Success Criteria:</div>
                <p className="text-xs text-slate-300">{milestone.successCriteria}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CallToActionView() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-white text-xl">{CALL_TO_ACTION.headline}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 mb-4">{CALL_TO_ACTION.summary}</p>
          <div className="p-4 rounded bg-slate-800/50 border border-blue-500/30 mb-4">
            <p className="text-blue-300 font-medium">{CALL_TO_ACTION.askStatement}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-2">Recommended Next Steps:</div>
            <ol className="space-y-2">
              {CALL_TO_ACTION.nextSteps.map((step, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Key Success Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUCCESS_METRICS.map((metric, i) => (
              <div key={i} className="p-3 rounded bg-slate-700/30">
                <Badge className="bg-blue-500/20 text-blue-400 mb-2">{metric.category}</Badge>
                <div className="text-sm text-white">{metric.metric}</div>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-slate-500">Baseline: {metric.baseline}</span>
                  <span className="text-emerald-400">Target: {metric.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LeadershipProposalPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leadership Proposal</h1>
          <p className="text-slate-400">Executive investment proposal and strategic case</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <Presentation className="h-3 w-3" />
          Prompt 24 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Investment Options</div>
            <div className="text-2xl font-bold text-white">{stats.investmentOptions}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">ROI Categories</div>
            <div className="text-2xl font-bold text-blue-400">{stats.roiCategories}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Milestones</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.milestones}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Success Metrics</div>
            <div className="text-2xl font-bold text-amber-400">{stats.successMetrics}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">5-Year ROI</div>
            <div className="text-2xl font-bold text-purple-400">${(stats.totalYear5ROI / 1000000).toFixed(1)}M</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="summary" className="data-[state=active]:bg-slate-700">
            <Target className="h-4 w-4 mr-2" />
            Executive Summary
          </TabsTrigger>
          <TabsTrigger value="investment" className="data-[state=active]:bg-slate-700">
            <DollarSign className="h-4 w-4 mr-2" />
            Investment Options
          </TabsTrigger>
          <TabsTrigger value="roi" className="data-[state=active]:bg-slate-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            ROI Analysis
          </TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-slate-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Risk Mitigation
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="action" className="data-[state=active]:bg-slate-700">
            <Presentation className="h-4 w-4 mr-2" />
            Call to Action
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <ExecutiveSummaryView />
        </TabsContent>

        <TabsContent value="investment">
          <InvestmentOptionsView />
        </TabsContent>

        <TabsContent value="roi">
          <ROIView />
        </TabsContent>

        <TabsContent value="risk">
          <RiskView />
        </TabsContent>

        <TabsContent value="milestones">
          <MilestonesView />
        </TabsContent>

        <TabsContent value="action">
          <CallToActionView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
