"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  DollarSign,
  Calendar,
  FileText,
  Globe,
  MapPin,
  BookOpen,
  Heart,
  Landmark,
  Users,
  GraduationCap,
  Building,
  Mountain
} from "lucide-react"

// =============================================================================
// FEDERAL GRANTS DATA
// =============================================================================
interface FundingSource {
  id: string
  name: string
  organization: string
  type: 'federal' | 'state' | 'foundation' | 'healthcare' | 'simulation' | 'regional'
  website: string
  description: string
  fundingRange: {
    min: number
    max: number
  }
  eligibility: string[]
  focusAreas: string[]
  deadline?: string
  applicationCycle?: string
  contactEmail?: string
  contactPhone?: string
  notes?: string
}

const federalGrants: FundingSource[] = [
  {
    id: 'hrsa-nurse-workforce',
    name: 'Nurse Education, Practice, Quality and Retention (NEPQR)',
    organization: 'HRSA - Health Resources and Services Administration',
    type: 'federal',
    website: 'hrsa.gov/grants/find-funding/hrsa-24-020',
    description: 'Supports nursing education and practice programs that address workforce demand, enhance diversity, and improve healthcare outcomes.',
    fundingRange: { min: 300000, max: 1500000 },
    eligibility: ['Accredited nursing schools', 'Hospitals with nursing programs', 'Healthcare systems'],
    focusAreas: ['Nursing education', 'Workforce development', 'Clinical training', 'Simulation-based education'],
    applicationCycle: 'Annual - typically Spring',
    notes: 'Strong fit for simulation center development and nursing competency programs'
  },
  {
    id: 'hrsa-ahec',
    name: 'Area Health Education Centers (AHEC)',
    organization: 'HRSA',
    type: 'federal',
    website: 'hrsa.gov/grants/find-funding',
    description: 'Supports community-based training for health professions students and healthcare workforce development in underserved areas.',
    fundingRange: { min: 250000, max: 500000 },
    eligibility: ['Academic health centers', 'Community healthcare organizations', 'Rural health entities'],
    focusAreas: ['Rural health education', 'Community-based training', 'Health professions education'],
    applicationCycle: 'Varies by program',
    notes: 'Kentucky AHEC programs are active partners for healthcare workforce initiatives'
  },
  {
    id: 'hrsa-rural-hospital',
    name: 'Rural Hospital Flexibility Program',
    organization: 'HRSA Federal Office of Rural Health Policy',
    type: 'federal',
    website: 'hrsa.gov/rural-health/grants',
    description: 'Supports rural hospitals in improving quality, financial performance, and community services.',
    fundingRange: { min: 50000, max: 300000 },
    eligibility: ['Critical Access Hospitals', 'Rural hospitals', 'State rural health offices'],
    focusAreas: ['Quality improvement', 'Staff training', 'Emergency preparedness'],
    applicationCycle: 'Annual',
    notes: 'Simulation training can support quality improvement and emergency preparedness goals'
  },
  {
    id: 'title-viii-nursing',
    name: 'Title VIII Nursing Workforce Development Programs',
    organization: 'HRSA Bureau of Health Workforce',
    type: 'federal',
    website: 'bhw.hrsa.gov/funding/title-viii',
    description: 'Multiple programs supporting nursing education, diversity, and specialty training including Advanced Nursing Education and Nurse Faculty Loan Program.',
    fundingRange: { min: 200000, max: 2000000 },
    eligibility: ['Accredited nursing schools', 'Teaching hospitals', 'Academic health centers'],
    focusAreas: ['Nurse faculty development', 'Advanced practice nursing', 'Clinical education', 'Simulation'],
    applicationCycle: 'Annual - varies by specific program',
    notes: 'Primary federal funding source for nursing education innovation'
  },
  {
    id: 'ahrq-patient-safety',
    name: 'AHRQ Patient Safety Research Grants',
    organization: 'Agency for Healthcare Research and Quality',
    type: 'federal',
    website: 'ahrq.gov/funding/index.html',
    description: 'Supports research to improve patient safety and healthcare quality, including simulation-based training effectiveness studies.',
    fundingRange: { min: 100000, max: 500000 },
    eligibility: ['Research institutions', 'Healthcare organizations', 'Academic medical centers'],
    focusAreas: ['Patient safety', 'Quality improvement', 'Healthcare simulation research'],
    applicationCycle: 'Ongoing',
    notes: 'Good fit for simulation research and outcome measurement programs'
  },
  {
    id: 'ems-training-grant',
    name: 'Emergency Medical Services for Children (EMSC)',
    organization: 'HRSA Maternal and Child Health Bureau',
    type: 'federal',
    website: 'emscimprovement.center',
    description: 'Supports pediatric emergency care training and improvement programs.',
    fundingRange: { min: 100000, max: 400000 },
    eligibility: ['State EMS agencies', 'Healthcare systems', 'Training organizations'],
    focusAreas: ['Pediatric emergency care', 'EMS training', 'Simulation education'],
    applicationCycle: 'Annual',
    notes: 'Can support pediatric simulation scenarios and EMS training programs'
  }
]

const stateGrants: FundingSource[] = [
  {
    id: 'ky-cabinet-workforce',
    name: 'Kentucky Healthcare Workforce Initiative',
    organization: 'Kentucky Cabinet for Health and Family Services',
    type: 'state',
    website: 'chfs.ky.gov',
    description: 'State funding for healthcare workforce development and training programs addressing Kentucky healthcare shortages.',
    fundingRange: { min: 50000, max: 500000 },
    eligibility: ['Kentucky healthcare facilities', 'Educational institutions', 'Workforce development boards'],
    focusAreas: ['Healthcare workforce', 'Nurse training', 'Rural health'],
    notes: 'Contact: Division of Health Professions Licensing'
  },
  {
    id: 'ky-cpe-grants',
    name: 'Council on Postsecondary Education Healthcare Education Grants',
    organization: 'Kentucky Council on Postsecondary Education',
    type: 'state',
    website: 'cpe.ky.gov',
    description: 'Grants to support healthcare education programs at Kentucky colleges and universities.',
    fundingRange: { min: 25000, max: 200000 },
    eligibility: ['Kentucky colleges and universities', 'Community colleges', 'Healthcare training programs'],
    focusAreas: ['Healthcare education', 'Nursing programs', 'Allied health training'],
    applicationCycle: 'Annual'
  },
  {
    id: 'ky-ahec-program',
    name: 'Kentucky AHEC Program',
    organization: 'University of Kentucky Area Health Education Centers',
    type: 'state',
    website: 'mc.uky.edu/AHEC',
    description: 'Regional program supporting healthcare education and workforce development in underserved Kentucky communities.',
    fundingRange: { min: 10000, max: 100000 },
    eligibility: ['Healthcare facilities in Kentucky', 'Educational programs', 'Community health organizations'],
    focusAreas: ['Rural health', 'Community-based training', 'Health professions education'],
    contactEmail: 'ahec@uky.edu',
    notes: 'Excellent partner for community outreach and training programs'
  },
  {
    id: 'ky-work-ready',
    name: 'Work Ready Skills Initiative',
    organization: 'Kentucky Labor Cabinet',
    type: 'state',
    website: 'labor.ky.gov',
    description: 'Funding for workforce training and skills development in high-demand industries including healthcare.',
    fundingRange: { min: 25000, max: 300000 },
    eligibility: ['Kentucky employers', 'Training providers', 'Healthcare organizations'],
    focusAreas: ['Workforce development', 'Skills training', 'Career pathways'],
    notes: 'Healthcare is a priority sector for workforce funding'
  }
]

const foundationGrants: FundingSource[] = [
  {
    id: 'rwj-foundation',
    name: 'Robert Wood Johnson Foundation',
    organization: 'Robert Wood Johnson Foundation',
    type: 'foundation',
    website: 'rwjf.org',
    description: 'Nations largest philanthropy dedicated to health. Supports innovative approaches to healthcare improvement and health equity.',
    fundingRange: { min: 50000, max: 1000000 },
    eligibility: ['501(c)(3) organizations', 'Healthcare systems', 'Community organizations'],
    focusAreas: ['Health equity', 'Healthcare quality', 'Nursing workforce', 'Innovation'],
    applicationCycle: 'Multiple open calls annually',
    notes: 'Strong history of supporting nursing education and simulation initiatives'
  },
  {
    id: 'kresge-foundation',
    name: 'The Kresge Foundation - Health Program',
    organization: 'The Kresge Foundation',
    type: 'foundation',
    website: 'kresge.org/our-work/health',
    description: 'Supports innovative healthcare delivery and workforce programs, particularly those addressing health disparities.',
    fundingRange: { min: 100000, max: 500000 },
    eligibility: ['Nonprofit healthcare organizations', 'Community health centers', 'Academic institutions'],
    focusAreas: ['Health equity', 'Healthcare workforce', 'Community health'],
    applicationCycle: 'Open grant program'
  },
  {
    id: 'foundation-for-ky',
    name: 'Blue Grass Community Foundation',
    organization: 'Blue Grass Community Foundation',
    type: 'foundation',
    website: 'bgcf.org',
    description: 'Central Kentucky community foundation supporting education, health, and community development.',
    fundingRange: { min: 5000, max: 50000 },
    eligibility: ['Kentucky nonprofits', 'Healthcare organizations', 'Educational programs'],
    focusAreas: ['Community health', 'Education', 'Workforce development'],
    notes: 'Good fit for community-focused simulation programs'
  },
  {
    id: 'jnj-foundation',
    name: 'Johnson & Johnson Foundation - Nursing Initiative',
    organization: 'Johnson & Johnson Foundation',
    type: 'foundation',
    website: 'jnj.com/our-company/johnson-johnson-foundation',
    description: 'Supports nursing education innovation and workforce development programs.',
    fundingRange: { min: 50000, max: 250000 },
    eligibility: ['Nursing schools', 'Healthcare systems', 'Nursing organizations'],
    focusAreas: ['Nursing education', 'Nurse faculty development', 'Clinical simulation'],
    notes: 'Campaign for Nursings Future initiative'
  },
  {
    id: 'medtronic-foundation',
    name: 'Medtronic Foundation',
    organization: 'Medtronic Foundation',
    type: 'foundation',
    website: 'foundation.medtronic.com',
    description: 'Corporate foundation supporting healthcare access and education, particularly cardiac and chronic disease.',
    fundingRange: { min: 25000, max: 200000 },
    eligibility: ['Healthcare nonprofits', 'Training programs', 'Community health organizations'],
    focusAreas: ['Healthcare access', 'Medical education', 'Cardiac care training'],
    notes: 'Focus on cardiovascular and chronic disease education'
  },
  {
    id: 'aarp-foundation',
    name: 'AARP Foundation',
    organization: 'AARP Foundation',
    type: 'foundation',
    website: 'aarp.org/aarp-foundation',
    description: 'Supports programs serving older adults, including geriatric healthcare training.',
    fundingRange: { min: 25000, max: 150000 },
    eligibility: ['Healthcare organizations', 'Aging services providers', 'Educational institutions'],
    focusAreas: ['Geriatric care', 'Caregiver training', 'Age-friendly healthcare'],
    notes: 'Good fit for geriatric simulation programs'
  }
]

const simulationGrants: FundingSource[] = [
  {
    id: 'ssh-research-grant',
    name: 'SSH Research Grants',
    organization: 'Society for Simulation in Healthcare',
    type: 'simulation',
    website: 'ssih.org/SSH-Resources/Research-Grants',
    description: 'Supports research advancing the science and practice of healthcare simulation.',
    fundingRange: { min: 5000, max: 50000 },
    eligibility: ['SSH members', 'Healthcare simulation researchers', 'Academic programs'],
    focusAreas: ['Simulation research', 'Educational outcomes', 'Program evaluation'],
    applicationCycle: 'Annual',
    notes: 'Good for pilot studies and program evaluation research'
  },
  {
    id: 'inacsl-grants',
    name: 'INACSL Research Grants',
    organization: 'International Nursing Association for Clinical Simulation and Learning',
    type: 'simulation',
    website: 'inacsl.org/grants',
    description: 'Supports nursing simulation education research and standards development.',
    fundingRange: { min: 2500, max: 15000 },
    eligibility: ['INACSL members', 'Nursing educators', 'Simulation researchers'],
    focusAreas: ['Nursing simulation', 'Standards development', 'Best practices research'],
    applicationCycle: 'Annual'
  },
  {
    id: 'laerdal-foundation',
    name: 'Laerdal Foundation for Acute Medicine',
    organization: 'Laerdal Foundation',
    type: 'simulation',
    website: 'laerdalfoundation.org',
    description: 'Supports research and programs to help save lives through improved resuscitation and emergency care training.',
    fundingRange: { min: 10000, max: 200000 },
    eligibility: ['Research institutions', 'Healthcare organizations', 'Emergency care programs'],
    focusAreas: ['Resuscitation training', 'Emergency care', 'Simulation education', 'Global health'],
    applicationCycle: 'Rolling applications',
    notes: 'Excellent fit for CPR training and emergency simulation programs'
  },
  {
    id: 'cae-partnership',
    name: 'CAE Healthcare Educational Partnership',
    organization: 'CAE Healthcare',
    type: 'simulation',
    website: 'caehealthcare.com',
    description: 'Partnership programs with educational institutions including equipment loans, training, and research collaboration.',
    fundingRange: { min: 0, max: 100000 },
    eligibility: ['Healthcare education programs', 'Academic simulation centers', 'Research institutions'],
    focusAreas: ['Equipment partnerships', 'Research collaboration', 'Training programs'],
    notes: 'Contact CAE academic relations for partnership opportunities'
  }
]

const regionalGrants: FundingSource[] = [
  {
    id: 'arc-healthcare',
    name: 'Appalachian Regional Commission - Healthcare Grants',
    organization: 'Appalachian Regional Commission',
    type: 'regional',
    website: 'arc.gov/grants-and-contracts',
    description: 'Supports economic development and healthcare infrastructure in Appalachian communities across 13 states.',
    fundingRange: { min: 50000, max: 500000 },
    eligibility: ['Appalachian region organizations', 'Local governments', 'Healthcare providers'],
    focusAreas: ['Healthcare workforce', 'Rural healthcare', 'Economic development', 'Infrastructure'],
    applicationCycle: 'Annual - typically Fall',
    notes: 'Eastern Kentucky is a priority investment area. Strong fit for rural healthcare workforce programs.'
  },
  {
    id: 'arc-inspire',
    name: 'ARC INSPIRE (Investment in Americas High-Need Communities)',
    organization: 'Appalachian Regional Commission',
    type: 'regional',
    website: 'arc.gov/grants-and-contracts/inspire-initiative',
    description: 'Enhanced funding for Appalachias most distressed communities, including healthcare infrastructure.',
    fundingRange: { min: 100000, max: 1000000 },
    eligibility: ['Distressed counties in Appalachia', 'Healthcare organizations', 'Community partners'],
    focusAreas: ['Healthcare access', 'Workforce development', 'Community health'],
    notes: 'Several Eastern Kentucky counties qualify as distressed or at-risk'
  },
  {
    id: 'soar-kentucky',
    name: 'SOAR (Shaping Our Appalachian Region)',
    organization: 'SOAR Kentucky',
    type: 'regional',
    website: 'soar-ky.org',
    description: 'Regional initiative supporting economic diversification and healthcare improvement in Eastern Kentucky.',
    fundingRange: { min: 10000, max: 250000 },
    eligibility: ['Eastern Kentucky organizations', 'Healthcare providers', 'Educational institutions'],
    focusAreas: ['Healthcare workforce', 'Technology', 'Education', 'Economic development'],
    notes: 'Strong focus on healthcare workforce and technology adoption'
  },
  {
    id: 'kha-foundation',
    name: 'Kentucky Hospital Association Foundation',
    organization: 'Kentucky Hospital Association',
    type: 'regional',
    website: 'kyha.com/foundation',
    description: 'Supports Kentucky hospitals and healthcare workforce development initiatives.',
    fundingRange: { min: 5000, max: 75000 },
    eligibility: ['KHA member hospitals', 'Healthcare organizations', 'Educational programs'],
    focusAreas: ['Hospital workforce', 'Quality improvement', 'Healthcare education'],
    notes: 'Excellent networking and partnership opportunities'
  }
]

// Helper functions
function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

function getFundingTypeIcon(type: FundingSource['type']) {
  switch (type) {
    case 'federal': return Landmark
    case 'state': return Building
    case 'foundation': return Heart
    case 'healthcare': return Users
    case 'simulation': return GraduationCap
    case 'regional': return Mountain
    default: return DollarSign
  }
}

function getFundingTypeColor(type: FundingSource['type']): string {
  switch (type) {
    case 'federal': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'state': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    case 'foundation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'healthcare': return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'simulation': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'regional': return 'bg-teal-500/20 text-teal-400 border-teal-500/30'
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

// Main component
function FundingCard({ source }: { source: FundingSource }) {
  const [expanded, setExpanded] = useState(false)
  const IconComponent = getFundingTypeIcon(source.type)

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <div
        className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
              source.type === 'federal' ? 'bg-blue-500/20' :
              source.type === 'state' ? 'bg-emerald-500/20' :
              source.type === 'foundation' ? 'bg-purple-500/20' :
              source.type === 'simulation' ? 'bg-amber-500/20' :
              source.type === 'regional' ? 'bg-teal-500/20' :
              'bg-slate-600/50'
            }`}>
              <IconComponent className={`h-5 w-5 ${
                source.type === 'federal' ? 'text-blue-400' :
                source.type === 'state' ? 'text-emerald-400' :
                source.type === 'foundation' ? 'text-purple-400' :
                source.type === 'simulation' ? 'text-amber-400' :
                source.type === 'regional' ? 'text-teal-400' :
                'text-slate-400'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white">{source.name}</h3>
              </div>
              <p className="text-sm text-slate-400">{source.organization}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="font-semibold text-emerald-400">
                {formatCurrency(source.fundingRange.min)} - {formatCurrency(source.fundingRange.max)}
              </p>
              <a
                href={`https://${source.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                {source.website}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-700 p-4 space-y-4">
          <p className="text-sm text-slate-300">{source.description}</p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Eligibility */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Eligibility
              </h4>
              <ul className="space-y-1">
                {source.eligibility.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Focus Areas */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                Focus Areas
              </h4>
              <div className="flex flex-wrap gap-1">
                {source.focusAreas.map((area, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid gap-4 md:grid-cols-3 pt-3 border-t border-slate-700">
            {source.applicationCycle && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-3 w-3" />
                <span>{source.applicationCycle}</span>
              </div>
            )}
            {source.contactEmail && (
              <div className="flex items-center gap-2 text-xs">
                <Globe className="h-3 w-3 text-slate-400" />
                <a href={`mailto:${source.contactEmail}`} className="text-blue-400 hover:underline">
                  {source.contactEmail}
                </a>
              </div>
            )}
            {source.deadline && (
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <Calendar className="h-3 w-3" />
                <span>Deadline: {source.deadline}</span>
              </div>
            )}
          </div>

          {source.notes && (
            <p className="text-xs text-slate-500 italic bg-slate-700/30 p-3 rounded-lg">
              {source.notes}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}

export default function FundingPage() {
  const allGrants = [...federalGrants, ...stateGrants, ...foundationGrants, ...simulationGrants, ...regionalGrants]
  const totalPotentialMin = allGrants.reduce((sum, g) => sum + g.fundingRange.min, 0)
  const totalPotentialMax = allGrants.reduce((sum, g) => sum + g.fundingRange.max, 0)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donor Resources & Funding</h1>
          <p className="text-slate-400">
            Grants, foundations, and funding opportunities for medical simulation
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Federal Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{federalGrants.length}</div>
            <p className="text-xs text-slate-500">HRSA, AHRQ, Title VIII</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Kentucky State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{stateGrants.length}</div>
            <p className="text-xs text-slate-500">State workforce funds</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Foundations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{foundationGrants.length}</div>
            <p className="text-xs text-slate-500">Private philanthropy</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Simulation-Specific</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">{simulationGrants.length}</div>
            <p className="text-xs text-slate-500">SSH, INACSL, vendors</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Regional/Appalachian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-400">{regionalGrants.length}</div>
            <p className="text-xs text-slate-500">ARC, SOAR, KHA</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalPotentialMax)}</div>
            <p className="text-xs text-slate-500">{allGrants.length} opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Grant Application Strategy Card */}
      <Card className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-emerald-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            Grant Strategy for BHL Simulation Center
          </CardTitle>
          <CardDescription className="text-slate-400">
            Recommended approach for maximizing funding opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-400">High Priority Targets</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• HRSA Title VIII nursing programs</li>
                <li>• ARC healthcare workforce grants</li>
                <li>• Kentucky AHEC partnerships</li>
                <li>• Laerdal Foundation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-400">Competitive Advantages</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Rural/underserved location</li>
                <li>• Community hospital partner</li>
                <li>• Nursing workforce focus</li>
                <li>• Appalachian region eligibility</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-400">Next Steps</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Register with Grants.gov</li>
                <li>• Contact KY AHEC regional coordinator</li>
                <li>• Join SSH for member grants</li>
                <li>• Schedule ARC pre-application call</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="federal" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="federal" className="data-[state=active]:bg-slate-700">
            <Landmark className="h-4 w-4 mr-2" />
            Federal
          </TabsTrigger>
          <TabsTrigger value="state" className="data-[state=active]:bg-slate-700">
            <Building className="h-4 w-4 mr-2" />
            Kentucky State
          </TabsTrigger>
          <TabsTrigger value="foundations" className="data-[state=active]:bg-slate-700">
            <Heart className="h-4 w-4 mr-2" />
            Foundations
          </TabsTrigger>
          <TabsTrigger value="simulation" className="data-[state=active]:bg-slate-700">
            <GraduationCap className="h-4 w-4 mr-2" />
            Simulation
          </TabsTrigger>
          <TabsTrigger value="regional" className="data-[state=active]:bg-slate-700">
            <Mountain className="h-4 w-4 mr-2" />
            Regional/ARC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="federal">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Federal Grant Programs</h3>
              <Badge className="bg-blue-500/20 text-blue-400">
                {federalGrants.length} programs
              </Badge>
            </div>
            {federalGrants.map((grant) => (
              <FundingCard key={grant.id} source={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="state">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Kentucky State Funding</h3>
              <Badge className="bg-emerald-500/20 text-emerald-400">
                {stateGrants.length} programs
              </Badge>
            </div>
            {stateGrants.map((grant) => (
              <FundingCard key={grant.id} source={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="foundations">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Private Foundations</h3>
              <Badge className="bg-purple-500/20 text-purple-400">
                {foundationGrants.length} foundations
              </Badge>
            </div>
            {foundationGrants.map((grant) => (
              <FundingCard key={grant.id} source={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Simulation-Specific Funding</h3>
              <Badge className="bg-amber-500/20 text-amber-400">
                {simulationGrants.length} programs
              </Badge>
            </div>
            {simulationGrants.map((grant) => (
              <FundingCard key={grant.id} source={grant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Regional & Appalachian Programs</h3>
              <Badge className="bg-teal-500/20 text-teal-400">
                {regionalGrants.length} programs
              </Badge>
            </div>
            <Card className="bg-teal-500/10 border-teal-500/30 mb-4">
              <CardContent className="pt-4">
                <p className="text-sm text-teal-300">
                  <strong>Note:</strong> Eastern Kentucky qualifies for enhanced Appalachian Regional Commission funding
                  due to its designation as a distressed/at-risk region. ARC grants can cover up to 80% of project costs
                  in these areas.
                </p>
              </CardContent>
            </Card>
            {regionalGrants.map((grant) => (
              <FundingCard key={grant.id} source={grant} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Application Resources */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Grant Application Resources</CardTitle>
          <CardDescription className="text-slate-400">
            Helpful links and tools for preparing competitive applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <a
              href="https://grants.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex flex-col items-center gap-2"
            >
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-sm font-medium text-white">Grants.gov</span>
              <span className="text-xs text-slate-400 text-center">Federal grant portal</span>
            </a>
            <a
              href="https://arc.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex flex-col items-center gap-2"
            >
              <Mountain className="h-8 w-8 text-teal-400" />
              <span className="text-sm font-medium text-white">ARC Portal</span>
              <span className="text-xs text-slate-400 text-center">Appalachian grants</span>
            </a>
            <a
              href="https://hrsa.gov/grants"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex flex-col items-center gap-2"
            >
              <Building2 className="h-8 w-8 text-emerald-400" />
              <span className="text-sm font-medium text-white">HRSA Grants</span>
              <span className="text-xs text-slate-400 text-center">Healthcare workforce</span>
            </a>
            <a
              href="https://ssih.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors flex flex-col items-center gap-2"
            >
              <GraduationCap className="h-8 w-8 text-amber-400" />
              <span className="text-sm font-medium text-white">SSH Resources</span>
              <span className="text-xs text-slate-400 text-center">Simulation research</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
