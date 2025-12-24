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
  Building2,
  FileText,
  MessageCircle,
  Shield,
  CheckCircle,
  Video,
  Database,
  GraduationCap,
  BarChart3,
  Calendar,
  ClipboardList,
  ExternalLink,
  ArrowRight
} from "lucide-react"
import {
  POLICY_SECTIONS,
  POLICY_TEMPLATES,
  REVIEW_CYCLE,
  STANDARDS_ALIGNMENT,
  getStats,
  type PolicySection
} from "@/data/seed/standards-policy"

// Icon mapping
type IconComponent = React.ComponentType<{ className?: string }>
const ICON_MAP: Record<string, IconComponent> = {
  'Building2': Building2,
  'FileText': FileText,
  'MessageCircle': MessageCircle,
  'Shield': Shield,
  'CheckCircle': CheckCircle,
  'Video': Video,
  'Database': Database,
  'GraduationCap': GraduationCap,
  'BarChart': BarChart3,
  'Calendar': Calendar
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || FileText
}

function TableOfContentsView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Simulation Policy & Procedure Manual
          </CardTitle>
          <CardDescription>
            Comprehensive framework aligned with SSH/INACSL standards and Baptist Health policies
          </CardDescription>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="border-slate-600 text-xs">Version 1.0</Badge>
            <Badge variant="outline" className="border-slate-600 text-xs">Review: Annual</Badge>
          </div>
        </CardHeader>
      </Card>

      <Accordion type="multiple" className="space-y-2">
        {POLICY_SECTIONS.map(section => {
          const Icon = getIcon(section.icon)
          return (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="border-slate-700 bg-slate-800/50 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-400 w-8 justify-center">
                    {section.number}
                  </Badge>
                  <div className="p-2 rounded-lg bg-slate-700/50">
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="text-white text-sm font-medium">{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2 pb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 rounded bg-slate-700/30">
                      <div className="text-xs font-medium text-blue-400 mb-1">Purpose</div>
                      <div className="text-xs text-slate-400">{section.purpose}</div>
                    </div>
                    <div className="p-3 rounded bg-slate-700/30">
                      <div className="text-xs font-medium text-emerald-400 mb-1">Scope</div>
                      <div className="text-xs text-slate-400">{section.scope}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-300 mb-2">Key Elements:</div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {section.keyElements.map((element, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{element}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-300 mb-2">Standards Aligned:</div>
                    <div className="flex flex-wrap gap-1">
                      {section.standards.map((std, i) => (
                        <Badge key={i} variant="outline" className="text-[10px] border-purple-500/30 text-purple-400">
                          {std}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

function TemplatesView() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {POLICY_TEMPLATES.map(template => (
        <Card key={template.id} className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <ClipboardList className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">{template.title}</CardTitle>
                <CardDescription className="text-xs">{template.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-medium text-slate-300 mb-2">Sections Include:</div>
                <ul className="space-y-1">
                  {template.sections.map((section, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                      <ArrowRight className="h-3 w-3 text-slate-600 mt-0.5 shrink-0" />
                      <span>{section}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 pt-2 border-t border-slate-700 text-xs text-slate-500">
                <span><strong>Owner:</strong> {template.owner}</span>
                <span><strong>Review:</strong> {template.reviewCycle}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ReviewCycleView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            Annual Review Calendar
          </CardTitle>
          <CardDescription>
            Systematic review of all policies, procedures, and program components
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {REVIEW_CYCLE.map((item, i) => (
          <Card key={item.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-4">
              <Badge className="bg-blue-500/20 text-blue-400 mb-2">
                {item.month}
              </Badge>
              <h4 className="text-sm font-medium text-white mb-1">{item.activity}</h4>
              <div className="space-y-1 text-xs text-slate-500">
                <div><strong>Responsible:</strong> {item.responsible}</div>
                <div><strong>Deliverable:</strong> {item.deliverable}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StandardsAlignmentView() {
  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-purple-400" />
            Standards Alignment Matrix
          </CardTitle>
          <CardDescription>
            Mapping of policy sections to SSH/INACSL national standards
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {STANDARDS_ALIGNMENT.map(alignment => (
          <Card key={alignment.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm">{alignment.standard}</CardTitle>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-[10px]">
                  {alignment.source}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Policy Section: {alignment.policySection}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {alignment.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function StandardsPolicyPage() {
  const stats = getStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Standards & Policy</h1>
          <p className="text-slate-400">SSH/INACSL best practice alignment and internal policy framework</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 flex items-center gap-1">
          <BookOpen className="h-3 w-3" />
          Prompt 20 Analysis
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <BookOpen className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.policySections}</div>
                <div className="text-xs text-slate-500">Policy Sections</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <ClipboardList className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.policyTemplates}</div>
                <div className="text-xs text-slate-500">Policy Templates</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Calendar className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.reviewActivities}</div>
                <div className="text-xs text-slate-500">Annual Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.standardsAligned}</div>
                <div className="text-xs text-slate-500">Standards Aligned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contents" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="contents" className="data-[state=active]:bg-slate-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Table of Contents
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-slate-700">
            <ClipboardList className="h-4 w-4 mr-2" />
            Policy Templates
          </TabsTrigger>
          <TabsTrigger value="review" className="data-[state=active]:bg-slate-700">
            <Calendar className="h-4 w-4 mr-2" />
            Annual Review
          </TabsTrigger>
          <TabsTrigger value="alignment" className="data-[state=active]:bg-slate-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Standards Alignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contents">
          <TableOfContentsView />
        </TabsContent>

        <TabsContent value="templates">
          <TemplatesView />
        </TabsContent>

        <TabsContent value="review">
          <ReviewCycleView />
        </TabsContent>

        <TabsContent value="alignment">
          <StandardsAlignmentView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
