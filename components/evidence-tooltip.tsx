"use client"

import { Info, ExternalLink, BookOpen, FileText, CheckCircle2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface EvidenceData {
  id: string
  shortName: string
  fullCitation?: string
  url?: string
  doi?: string
  year?: number
  keyFindings?: string[]
  methodology?: string
  sampleSize?: string
  relevanceNote?: string
}

interface EvidenceTooltipProps {
  evidence: EvidenceData
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  variant?: 'inline' | 'card'
}

// Quick tooltip for hover - shows source and key stat
export function EvidenceTooltip({
  evidence,
  children,
  className,
  showIcon = true,
  variant = 'inline'
}: EvidenceTooltipProps) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <span className={cn(
              "cursor-help inline-flex items-center gap-1 border-b border-dashed border-slate-500 hover:border-blue-400 transition-colors",
              className
            )}>
              {children}
              {showIcon && (
                <Info className="h-3 w-3 text-slate-400 hover:text-blue-400 transition-colors" />
              )}
            </span>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-xs bg-slate-800 border-slate-700 text-white p-3"
          sideOffset={5}
        >
          <div className="space-y-1">
            <p className="font-medium text-sm text-blue-400">{evidence.shortName}</p>
            {evidence.year && (
              <p className="text-xs text-slate-400">Published: {evidence.year}</p>
            )}
            {evidence.keyFindings && evidence.keyFindings[0] && (
              <p className="text-xs text-slate-300 mt-1">
                {evidence.keyFindings[0]}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-2">Click for full citation</p>
          </div>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Evidence Source
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Supporting research and data for this statistic
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Source Header */}
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white text-lg">{evidence.shortName}</h3>
                {evidence.year && (
                  <Badge variant="outline" className="mt-1 border-slate-600 text-slate-300">
                    {evidence.year}
                  </Badge>
                )}
              </div>
              {evidence.url && (
                <a
                  href={evidence.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm shrink-0"
                >
                  View Source
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Full Citation */}
          {evidence.fullCitation && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Full Citation
              </h4>
              <p className="text-sm text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50 italic">
                {evidence.fullCitation}
              </p>
              {evidence.doi && (
                <p className="text-xs text-slate-500">
                  DOI: <a href={`https://doi.org/${evidence.doi}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{evidence.doi}</a>
                </p>
              )}
            </div>
          )}

          {/* Key Findings */}
          {evidence.keyFindings && evidence.keyFindings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Key Findings
              </h4>
              <ul className="space-y-2">
                {evidence.keyFindings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Methodology & Sample Size */}
          {(evidence.methodology || evidence.sampleSize) && (
            <div className="grid grid-cols-2 gap-4">
              {evidence.methodology && (
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Methodology</p>
                  <p className="text-sm text-slate-300">{evidence.methodology}</p>
                </div>
              )}
              {evidence.sampleSize && (
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Sample Size</p>
                  <p className="text-sm text-slate-300">{evidence.sampleSize}</p>
                </div>
              )}
            </div>
          )}

          {/* Relevance Note */}
          {evidence.relevanceNote && (
            <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-700/30">
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-1">Relevance</p>
              <p className="text-sm text-blue-200">{evidence.relevanceNote}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Compact inline badge for showing source attribution
interface SourceBadgeProps {
  source: string
  year?: number
  url?: string
  className?: string
}

export function SourceBadge({ source, year, url, className }: SourceBadgeProps) {
  const content = (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500 transition-colors cursor-pointer",
        className
      )}
    >
      <BookOpen className="h-3 w-3 mr-1" />
      {source}
      {year && <span className="ml-1 opacity-70">({year})</span>}
    </Badge>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

// Card wrapper that shows evidence on the entire card
interface EvidenceCardProps {
  evidence: EvidenceData
  children: React.ReactNode
  className?: string
}

export function EvidenceCard({ evidence, children, className }: EvidenceCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn(
          "cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all rounded-lg",
          className
        )}>
          {children}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="h-4 w-4 text-blue-400" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            Evidence Source
          </DialogTitle>
        </DialogHeader>
        {/* Same content as EvidenceTooltip dialog */}
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <h3 className="font-semibold text-white">{evidence.shortName}</h3>
            {evidence.fullCitation && (
              <p className="text-sm text-slate-400 mt-2 italic">{evidence.fullCitation}</p>
            )}
          </div>
          {evidence.keyFindings && (
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Key Findings</h4>
              <ul className="space-y-1">
                {evidence.keyFindings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5" />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
