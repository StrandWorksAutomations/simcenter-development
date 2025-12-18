"use client"

import { useState } from "react"
import { ExternalLink, BookOpen, FlaskConical, Users, FileText, Building2 } from "lucide-react"
import { type EvidenceCitation } from "@/data/seed/roi-evidence"

interface EvidenceCitationBadgeProps {
  citation: EvidenceCitation
  compact?: boolean
}

const studyTypeIcons = {
  'meta-analysis': FlaskConical,
  'cohort': Users,
  'rct': FlaskConical,
  'case-study': Building2,
  'industry-report': FileText
}

const studyTypeLabels = {
  'meta-analysis': 'Meta-Analysis',
  'cohort': 'Cohort Study',
  'rct': 'RCT',
  'case-study': 'Case Study',
  'industry-report': 'Industry Report'
}

const confidenceColors = {
  high: 'bg-green-500/20 text-green-400 border-green-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  low: 'bg-red-500/20 text-red-400 border-red-500/30'
}

export function EvidenceCitationBadge({ citation, compact = false }: EvidenceCitationBadgeProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = studyTypeIcons[citation.studyType] || BookOpen

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border cursor-pointer transition-colors hover:bg-slate-700 ${confidenceColors[citation.confidenceLevel]}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title={`${citation.source} (${citation.year})`}
      >
        <Icon className="h-3 w-3" />
        <span>{citation.year}</span>
      </span>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all hover:bg-slate-700/50 ${confidenceColors[citation.confidenceLevel]}`}
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="font-medium">{citation.source}</span>
        <span className="text-slate-400">({citation.year})</span>
      </button>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsExpanded(false)}
          />
          <div className="relative w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h4 className="font-semibold text-white text-sm">{citation.source}</h4>
                <p className="text-xs text-slate-400">{citation.year}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${confidenceColors[citation.confidenceLevel]}`}>
                {citation.confidenceLevel}
              </span>
            </div>

            <p className="text-sm text-slate-300 mb-3">{citation.description}</p>

            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {studyTypeLabels[citation.studyType]}
              </span>
              {citation.sampleSize && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {citation.sampleSize}
                </span>
              )}
            </div>

            {citation.url && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
                View Source
              </a>
            )}

            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface CitationListProps {
  citations: EvidenceCitation[]
  maxVisible?: number
}

export function CitationList({ citations, maxVisible = 3 }: CitationListProps) {
  const [showAll, setShowAll] = useState(false)
  const uniqueCitations = citations.filter((c, i, arr) =>
    arr.findIndex(x => x.id === c.id) === i
  )
  const visibleCitations = showAll ? uniqueCitations : uniqueCitations.slice(0, maxVisible)
  const remaining = uniqueCitations.length - maxVisible

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibleCitations.map(citation => (
        <EvidenceCitationBadge key={citation.id} citation={citation} />
      ))}
      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          +{remaining} more
        </button>
      )}
      {showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  )
}
