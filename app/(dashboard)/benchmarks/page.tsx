"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  MapPin,
  CheckCircle2
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell
} from "recharts"

// Size tier classification
type SizeTier = 'large' | 'medium' | 'comparable'

// Comprehensive benchmark center data from research
const benchmarkCenters = [
  // === LARGE CENTERS (outliers - $15M+, 25K+ sqft) ===
  {
    id: 'osf',
    name: 'OSF Jump',
    fullName: 'OSF HealthCare - Jump Trading Simulation Center',
    location: 'Peoria, IL',
    year: 2013,
    sqft: 168000,
    investment: 50,
    staff: 75,
    learners: 220000,
    maturity: 'Mature',
    tier: 'large' as SizeTier,
    color: '#3b82f6',
    accreditation: 'SSH/ACS',
    funding: '$25M donor + $25M OSF match',
    staffingModel: 'CMO, Executive Director, 50-100+ staff incl. physicians, nurses, engineers, data analysts',
    techStack: ['High-fi manikins (all ages)', 'Full hospital replicas', 'AR/VR labs', 'SimCapture AV', '3D printing lab', 'AI Innovation Lab'],
    outcomes: ['$180M economic impact to region', '1,000+ jobs created', 'Reduced hospital-acquired conditions', '12,800+ K-12 students via STEM', '1.1M+ learner engagements']
  },
  {
    id: 'cleveland',
    name: 'Cleveland Clinic',
    fullName: 'Cleveland Clinic Simulation Center',
    location: 'Cleveland, OH',
    year: 2004,
    sqft: 40000,
    investment: 18,
    staff: 30,
    learners: 43831,
    maturity: 'Mature',
    tier: 'large' as SizeTier,
    color: '#e11d48',
    accreditation: 'SSH/ACS',
    funding: 'Institution funded + research grants',
    staffingModel: 'Integrated with medical education, dedicated sim faculty across specialties',
    techStack: ['Comprehensive manikin inventory', 'Surgical simulation labs', 'Robotic surgery trainers', 'Full AV infrastructure'],
    outcomes: ['43,831 learners in 2023', '2,760 courses in 2023', 'Pioneering robotic surgery simulation', 'Research publications leader']
  },
  {
    id: 'sharp',
    name: 'Sharp Prebys',
    fullName: 'Sharp HealthCare - Prebys Innovation & Education Center',
    location: 'San Diego, CA',
    year: 2023,
    sqft: 70000,
    investment: 27.5,
    staff: 17,
    learners: 3000,
    maturity: 'Startup',
    tier: 'large' as SizeTier,
    color: '#8b5cf6',
    accreditation: 'SSH Provisional',
    funding: 'Conrad Prebys Foundation + Sharp investment',
    staffingModel: 'Nursing-led with Technology Immersion Lab engineers, cross-departmental governance',
    techStack: ['Latest-gen manikins', 'AR/VR spatial computing', 'AI/ML Technology Immersion Lab', 'Technology Demo room'],
    outcomes: ['Supports 7,000 nurses system-wide', 'AI/VR technology exploration', 'International knowledge exchange', 'Scaling to 10K+ learners']
  },
  {
    id: 'atrium',
    name: 'Atrium Carolinas',
    fullName: 'Atrium Health - Carolinas Simulation Center',
    location: 'Charlotte, NC',
    year: 2007,
    sqft: 25000,
    investment: 12.5,
    staff: 20,
    learners: 5000,
    maturity: 'Mature',
    tier: 'large' as SizeTier,
    color: '#10b981',
    accreditation: 'SSH/ACS Distinguished',
    funding: 'Hospital budget + external grants',
    staffingModel: 'Medical Director (MD), Assistant VP, 20+ nurse educators, sim ops specialists',
    techStack: ['High-fi manikins (adult, peds, OB)', 'Task trainers', 'Virtual simulators', 'Full AV debrief', 'Surgical Skills Center'],
    outcomes: ['Dual SSH/ACS Distinguished accreditation', 'Regional Simulation Alliance leader', 'Improved procedural skills', 'Enhanced team decision-making']
  },

  // === MEDIUM CENTERS ($5-15M, 8K-25K sqft) ===
  {
    id: 'uab',
    name: 'UAB',
    fullName: 'UAB Medicine - Clinical Simulation Program',
    location: 'Birmingham, AL',
    year: 2010,
    sqft: 15000,
    investment: 12,
    staff: 15,
    learners: 5000,
    maturity: 'Mature',
    tier: 'medium' as SizeTier,
    color: '#a855f7',
    accreditation: 'SSH Accredited',
    funding: 'UAB budget + state grants for rural health',
    staffingModel: 'Medical Director, Director of Clinical Simulation, multi-disciplinary faculty',
    techStack: ['High-fi mannequins', 'VR and AR options', 'Task trainers', 'Mobile Sim Lab (2-room vehicle)'],
    outcomes: ['SimFirst culture institution-wide', 'Mobile lab serves statewide', 'Cross-disciplinary training', 'Improved procedure success rates']
  },
  {
    id: 'baycare',
    name: 'BayCare',
    fullName: 'BayCare Health System - Simulation Program',
    location: 'West Central FL',
    year: 2015,
    sqft: 10000,
    investment: 10,
    staff: 20,
    learners: 8000,
    maturity: 'Mature',
    tier: 'medium' as SizeTier,
    color: '#06b6d4',
    accreditation: 'SSH Accredited',
    funding: 'Operational budget for staff education',
    staffingModel: 'System-level coordination with local hospital-based educators across 15 sites',
    techStack: ['State-of-art manikins at each site', 'VR simulation system-wide', 'Standardized curriculum', 'Mobile sim carts for in-situ'],
    outcomes: ['Largest sim program in region', '15 hospital network coverage', 'VR fostering competency', 'Reduced errors in critical scenarios']
  },
  {
    id: 'rwj',
    name: 'RWJBarnabas',
    fullName: 'RWJBarnabas Health - Institute for Nursing Excellence',
    location: 'New Jersey',
    year: 2023,
    sqft: 8000,
    investment: 10,
    staff: 12,
    learners: 600,
    maturity: 'Scaling',
    tier: 'medium' as SizeTier,
    color: '#f97316',
    accreditation: 'SSH Provisional',
    funding: 'System workforce development investment + grants',
    staffingModel: 'Nursing-centric, System Nursing Education Director, train-the-trainer approach',
    techStack: ['High-fi mannequins incl. MamaAnne', 'OR and ICU simulation rooms', 'Standardized patient actors', 'HealthStream LMS'],
    outcomes: ['Curbed first-year RN turnover', 'Standardized practice across 12 hospitals', 'Improved patient safety metrics', '600+ new nurses/year']
  },
  {
    id: 'carilion',
    name: 'Carilion',
    fullName: 'Carilion Clinic - Center for Simulation, Research & Patient Safety',
    location: 'Roanoke, VA',
    year: 2013,
    sqft: 10000,
    investment: 8,
    staff: 10,
    learners: 2000,
    maturity: 'Mature',
    tier: 'medium' as SizeTier,
    color: '#84cc16',
    accreditation: 'SSH Accredited',
    funding: 'Carilion capital + Virginia Tech research grants',
    staffingModel: 'Medical Director with human factors expertise, integrated with VT med school',
    techStack: ['Tesseract 360° immersive room', 'Passive motion sensors', '3D printing makerspace', 'AI and XR tools'],
    outcomes: ['Redesigned trauma bay layout', 'Human factors device testing', 'System-level workflow improvements', 'Innovation-focused research']
  },
  {
    id: 'nch',
    name: 'NCH Herb',
    fullName: 'NCH Healthcare - Herb Family Simulation Center',
    location: 'Naples, FL',
    year: 2020,
    sqft: 12000,
    investment: 6.5,
    staff: 6,
    learners: 4032,
    maturity: 'Scaling',
    tier: 'medium' as SizeTier,
    color: '#f59e0b',
    accreditation: 'SSH Provisional',
    funding: 'Herb family philanthropy + hospital budget',
    staffingModel: 'Small core team (5-8), leverages hospital educators, community partners as adjunct',
    techStack: ['High-fi adult, pediatric, infant manikins', 'Mixed-reality simulation', 'VR for de-escalation', 'Mobile AV debrief'],
    outcomes: ['Doubled learner volume each year since 2021', '18,689 training hours in 2023', '655 simulation classes', 'Improved patient satisfaction']
  },

  // === COMPARABLE CENTERS ($1-6M, 3K-10K sqft) - Most similar to BHL's planned center ===
  {
    id: 'riverside',
    name: 'Riverside',
    fullName: 'Riverside Health System - Simulation Training Lab',
    location: 'Newport News, VA',
    year: 2020,
    sqft: 8400,
    investment: 4,
    staff: 4,
    learners: 3933,
    maturity: 'Scaling',
    tier: 'comparable' as SizeTier,
    color: '#ec4899',
    accreditation: 'SSH Accredited',
    funding: 'Hospital capital project + local grants',
    staffingModel: 'Lean core staff (4 FTEs), volunteer physician/nurse instructors',
    techStack: ['High-fi mannequins per room', 'Real clinical equipment', 'In-situ simulation kits', 'Video recording & debrief software'],
    outcomes: ['20%+ improvement in skills checkoffs', '11,800+ learners in 3 years', '4 projects at IMSH 2024', 'Rapid SSH accreditation']
  },
  {
    id: 'parkview',
    name: 'Parkview Mirro',
    fullName: 'Parkview Health - Mirro Center Simulation Lab',
    location: 'Fort Wayne, IN',
    year: 2015,
    sqft: 4000,
    investment: 5,
    staff: 5,
    learners: 1500,
    maturity: 'Scaling',
    tier: 'comparable' as SizeTier,
    color: '#14b8a6',
    accreditation: 'SSH/ACS',
    funding: 'Philanthropy + state/federal grants',
    staffingModel: 'Small team (4-6), Simulation Program Manager (RN), Medical Director',
    techStack: ['High-fi manikins', 'VR simulation systems', 'Surgical simulation suite', '3D printing service', '42-ft Mobile Sim Lab'],
    outcomes: ['Mobile unit reaches rural providers', '250 hours mobile training/year', '3D printing for patient-specific models', 'Improved regional emergency preparedness']
  },
  // NEW COMPARABLE CENTERS
  {
    id: 'uk-healthcare',
    name: 'UK HealthCare',
    fullName: 'UK HealthCare Simulation Center',
    location: 'Lexington, KY',
    year: 2018,
    sqft: 6000,
    investment: 3,
    staff: 6,
    learners: 3000,
    maturity: 'Mature',
    tier: 'comparable' as SizeTier,
    color: '#0ea5e9',
    accreditation: 'Working toward SSH',
    funding: 'University/hospital funded + initial grants',
    staffingModel: '6 simulation faculty + 3 support staff, Medical Director (Dr. Zaki Hassan)',
    techStack: ['3 patient rooms', '1 ICU', '1 OR', '1 Flex Room', 'Large Debriefing Room with video review', 'Multipurpose skills room'],
    outcomes: ['Serves medical students, residents, fellows, hospital staff', 'College of Nursing training', 'Pre-nursing through graduate programs', '30-year simulation education history']
  },
  {
    id: 'carroll',
    name: 'Carroll Hospital',
    fullName: 'Carroll Hospital Kahlert Foundation Simulation Center',
    location: 'Westminster, MD',
    year: 2023,
    sqft: 4000,
    investment: 2,
    staff: 3,
    learners: 1500,
    maturity: 'Startup',
    tier: 'comparable' as SizeTier,
    color: '#22c55e',
    accreditation: 'Community hospital focus',
    funding: '$750K Kahlert Foundation + $750K Hospital Auxiliary + other donors',
    staffingModel: 'Simulation Manager + 2 support staff, community partnerships',
    techStack: ['OR Simulation Room', 'Family Birthplace Sim Room', 'ED Simulation Room', 'Multi-Purpose Medical Room', 'Quest 2 Pro VR headsets'],
    outcomes: ['Free access for EMS and fire departments', 'Community college nursing students', 'McDaniel College partnership', 'Local physician group training']
  },
  {
    id: 'arkansas-children',
    name: 'Arkansas Children',
    fullName: 'Arkansas Children Simulation Education Center (ACSEC)',
    location: 'Little Rock, AR',
    year: 2007,
    sqft: 4200,
    investment: 2.5,
    staff: 5,
    learners: 2500,
    maturity: 'Mature',
    tier: 'comparable' as SizeTier,
    color: '#f43f5e',
    accreditation: 'SSH Accredited (2024)',
    funding: 'Hospital-funded',
    staffingModel: 'Core simulation team, mobile simulation capabilities',
    techStack: ['2 medical education/simulation rooms', '3 outpatient clinic/exam rooms', '2 debrief/conference rooms', '1 observation room', 'Wireless manikins'],
    outcomes: ['First comprehensive pediatric simulation program in US', 'Mobile simulation in actual clinical spaces', 'Can simulate clinic rooms, inpatient, ED bays, lobby', 'SSH accreditation achieved 2024']
  },
  {
    id: 'allen-college',
    name: 'Allen College',
    fullName: 'Allen College Simulation Lab',
    location: 'Waterloo, IA',
    year: 2025,
    sqft: 8000,
    investment: 3,
    staff: 4,
    learners: 1200,
    maturity: 'Startup',
    tier: 'comparable' as SizeTier,
    color: '#a78bfa',
    accreditation: 'Nursing college focus',
    funding: '$1M Van G. Miller Foundation + $500K Fogdall donation + institutional',
    staffingModel: 'Certified healthcare simulation educator + faculty support',
    techStack: ['4 medical/surgical simulation rooms', '4 clinic simulation rooms', '1 home health suite', '3 classrooms/debriefing rooms', 'Skills Lab'],
    outcomes: ['Addresses healthcare provider shortage', 'Quadruples previous space', 'Proven simulation methodology', 'Superior graduate outcomes']
  },
  {
    id: 'evanston',
    name: 'Evanston Grainger',
    fullName: 'Evanston Hospital Grainger Center for Simulation',
    location: 'Evanston, IL',
    year: 2019,
    sqft: 16000,
    investment: 5.2,
    staff: 8,
    learners: 8000,
    maturity: 'Mature',
    tier: 'comparable' as SizeTier,
    color: '#64748b',
    accreditation: 'SSH/ACS Level I',
    funding: 'NorthShore University Health + Grainger Foundation',
    staffingModel: 'Multi-disciplinary team, 150 hours curriculum/month',
    techStack: ['High-fi manikins', 'Task trainers', 'Full AV debrief system', 'Surgical simulation'],
    outcomes: ['8,000+ learners annually', '150 active curriculum hours/month', 'ACS Level I Comprehensive Education Institute', '8-month build completion']
  }
]

// Tier labels and descriptions
const tierInfo = {
  large: { label: 'Large', description: '$15M+, 25K+ sqft', color: 'bg-red-500/20 text-red-400 border-red-500/50' },
  medium: { label: 'Medium', description: '$5-15M, 8K-25K sqft', color: 'bg-amber-500/20 text-amber-400 border-amber-500/50' },
  comparable: { label: 'Comparable', description: '$1-6M, 3K-10K sqft', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' }
}

// Get comparable centers for default selection
const comparableCenterIds = benchmarkCenters.filter(c => c.tier === 'comparable').map(c => c.id)

export default function BenchmarksPage() {
  const [selectedCenters, setSelectedCenters] = useState<string[]>(comparableCenterIds)
  const [tierFilter, setTierFilter] = useState<SizeTier | 'all'>('comparable')
  const [showAllCenters, setShowAllCenters] = useState(false)

  // Filter centers by tier
  const filteredCenters = useMemo(() => {
    if (tierFilter === 'all') return benchmarkCenters
    return benchmarkCenters.filter(c => c.tier === tierFilter)
  }, [tierFilter])

  // Calculate aggregate stats based on filtered/selected centers
  const aggregateStats = useMemo(() => {
    const centers = showAllCenters ? filteredCenters : filteredCenters.filter(c => selectedCenters.includes(c.id))
    if (centers.length === 0) return { totalCenters: 0, avgSqFt: 0, avgInvestment: '0', avgStaff: 0, avgLearners: 0, sshAccredited: 0 }
    return {
      totalCenters: centers.length,
      avgSqFt: Math.round(centers.reduce((sum, c) => sum + c.sqft, 0) / centers.length),
      avgInvestment: (centers.reduce((sum, c) => sum + c.investment, 0) / centers.length).toFixed(1),
      avgStaff: Math.round(centers.reduce((sum, c) => sum + c.staff, 0) / centers.length),
      avgLearners: Math.round(centers.reduce((sum, c) => sum + c.learners, 0) / centers.length),
      sshAccredited: centers.filter(c => c.accreditation.includes('SSH')).length
    }
  }, [filteredCenters, selectedCenters, showAllCenters])

  const toggleCenter = (id: string) => {
    setSelectedCenters(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const selectTier = (tier: SizeTier) => {
    setTierFilter(tier)
    const tierCenters = benchmarkCenters.filter(c => c.tier === tier).map(c => c.id)
    setSelectedCenters(tierCenters)
  }

  const selectAll = () => {
    setTierFilter('all')
    setSelectedCenters(benchmarkCenters.map(c => c.id))
  }

  const clearAll = () => setSelectedCenters([])

  const selectedData = useMemo(() =>
    selectedCenters.map(id => benchmarkCenters.find(c => c.id === id)!).filter(Boolean),
    [selectedCenters]
  )

  const scatterData = selectedData.map(c => ({
    x: c.sqft / 1000,
    y: c.investment,
    name: c.name,
    color: c.color
  }))

  return (
    <div className="space-y-6 bg-slate-900 -m-6 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-1">Research Overview</p>
          <h1 className="text-2xl font-bold text-white">Benchmarking Analysis</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white">
            Export Data
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium text-white">
            Full Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Centers Analyzed</div>
          <div className="text-3xl font-bold text-white">{aggregateStats.totalCenters}</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Average Size</div>
          <div className="text-3xl font-bold text-blue-400">
            {(aggregateStats.avgSqFt / 1000).toFixed(1)}K
            <span className="text-lg text-slate-500 ml-1">sq ft</span>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Average Investment</div>
          <div className="text-3xl font-bold text-green-400">${aggregateStats.avgInvestment}M</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Average Staff</div>
          <div className="text-3xl font-bold text-purple-400">
            {aggregateStats.avgStaff}
            <span className="text-lg text-slate-500 ml-1">FTEs</span>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Avg Learners/Year</div>
          <div className="text-3xl font-bold text-amber-400">
            {(aggregateStats.avgLearners / 1000).toFixed(0)}K+
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">SSH Accredited</div>
          <div className="text-3xl font-bold text-cyan-400">
            {Math.round((aggregateStats.sshAccredited / aggregateStats.totalCenters) * 100)}%
          </div>
        </div>
      </div>

      {/* Tier Filter Buttons */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-white">Filter by Size</h2>
            <span className="text-slate-400 text-sm">(Click to filter centers)</span>
          </div>
          <div className="text-slate-400 text-sm">
            Showing: <span className="text-white font-bold">{filteredCenters.length}</span> of {benchmarkCenters.length} centers
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => selectTier('comparable')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
              tierFilter === 'comparable'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:border-emerald-500/50'
            }`}
          >
            <span className="font-bold">Comparable</span>
            <span className="ml-2 opacity-70">$1-6M • 3K-10K sqft</span>
            <Badge className="ml-2 bg-emerald-500/30 text-emerald-300">
              {benchmarkCenters.filter(c => c.tier === 'comparable').length}
            </Badge>
          </button>
          <button
            onClick={() => selectTier('medium')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
              tierFilter === 'medium'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:border-amber-500/50'
            }`}
          >
            <span className="font-bold">Medium</span>
            <span className="ml-2 opacity-70">$5-15M • 8K-25K sqft</span>
            <Badge className="ml-2 bg-amber-500/30 text-amber-300">
              {benchmarkCenters.filter(c => c.tier === 'medium').length}
            </Badge>
          </button>
          <button
            onClick={() => selectTier('large')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
              tierFilter === 'large'
                ? 'bg-red-500/20 text-red-400 border-red-500'
                : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:border-red-500/50'
            }`}
          >
            <span className="font-bold">Large (Outliers)</span>
            <span className="ml-2 opacity-70">$15M+ • 25K+ sqft</span>
            <Badge className="ml-2 bg-red-500/30 text-red-300">
              {benchmarkCenters.filter(c => c.tier === 'large').length}
            </Badge>
          </button>
          <button
            onClick={selectAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
              tierFilter === 'all'
                ? 'bg-blue-500/20 text-blue-400 border-blue-500'
                : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:border-blue-500/50'
            }`}
          >
            <span className="font-bold">Show All</span>
            <Badge className="ml-2 bg-blue-500/30 text-blue-300">
              {benchmarkCenters.length}
            </Badge>
          </button>
        </div>
      </div>

      {/* Center Selection Chips */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-white">Select Centers to Compare</h2>
            <span className="text-slate-400 text-sm">(Click to toggle individual centers)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">
              Selected: <span className="text-white font-bold">{selectedCenters.length}</span>
            </span>
            <button
              onClick={clearAll}
              className="text-slate-400 hover:text-white text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {filteredCenters.map(center => {
            const isSelected = selectedCenters.includes(center.id)
            const tierClass = tierInfo[center.tier]
            return (
              <button
                key={center.id}
                onClick={() => toggleCenter(center.id)}
                className="group px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 relative"
                style={{
                  backgroundColor: isSelected ? center.color : `${center.color}20`,
                  color: isSelected ? 'white' : center.color,
                  border: `2px solid ${isSelected ? center.color : center.color + '40'}`
                }}
              >
                <span className="flex items-center gap-2">
                  {center.name}
                  <span className="opacity-60">({center.location.split(',')[0]})</span>
                </span>
              </button>
            )
          })}
        </div>
        {tierFilter !== 'all' && (
          <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
            <span>Tip: Click &quot;Show All&quot; above to see all {benchmarkCenters.length} centers including outliers</span>
          </div>
        )}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="col-span-2 space-y-6">
          {/* Scatter Chart */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="font-semibold text-white mb-4">Size vs Investment (Selected Centers)</h3>
            <div className="h-72">
              {selectedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      type="number"
                      dataKey="x"
                      name="Size"
                      unit="K sq ft"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      name="Investment"
                      unit="M"
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8' }}
                      tickFormatter={(v) => `$${v}M`}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ payload }) => {
                        if (payload && payload.length > 0) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-slate-700 p-2 rounded shadow-lg border border-slate-600">
                              <p className="font-semibold text-white">{data.name}</p>
                              <p className="text-sm text-slate-300">{data.x}K sq ft</p>
                              <p className="text-sm text-slate-300">${data.y}M investment</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter data={scatterData}>
                      {scatterData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  Select centers to see comparison
                </div>
              )}
            </div>
          </div>

          {/* Bar Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Size Chart */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Facility Size Comparison</h3>
              <div className="h-64">
                {selectedData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedData} layout="vertical" margin={{ left: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickFormatter={(v) => `${v/1000}K`} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fill: '#e2e8f0' }} width={75} />
                      <Tooltip
                        formatter={(value: number) => [`${(value/1000).toFixed(0)}K sq ft`, 'Size']}
                        contentStyle={{ backgroundColor: '#334155', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="sqft" radius={[0, 4, 4, 0]}>
                        {selectedData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    Select centers to see comparison
                  </div>
                )}
              </div>
            </div>

            {/* Staff Chart */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Staff FTE Comparison</h3>
              <div className="h-64">
                {selectedData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedData} layout="vertical" margin={{ left: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fill: '#e2e8f0' }} width={75} />
                      <Tooltip
                        formatter={(value: number) => [`${value} FTEs`, 'Staff']}
                        contentStyle={{ backgroundColor: '#334155', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="staff" radius={[0, 4, 4, 0]}>
                        {selectedData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500">
                    Select centers to see comparison
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Learner Comparison */}
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="font-semibold text-white mb-4">Annual Learner Capacity</h3>
            <div className="h-64">
              {selectedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedData} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#e2e8f0' }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickFormatter={(v) => `${v/1000}K`} />
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString()} learners/year`, 'Volume']}
                      contentStyle={{ backgroundColor: '#334155', border: 'none', borderRadius: '8px' }}
                    />
                    <Bar dataKey="learners" radius={[4, 4, 0, 0]}>
                      {selectedData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  Select centers to see comparison
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Detail Cards */}
        <div className="space-y-4 max-h-[900px] overflow-y-auto">
          {selectedData.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <p>Select centers above to see details</p>
            </div>
          ) : (
            selectedData.map(center => (
              <div
                key={center.id}
                className="bg-slate-800 rounded-xl p-4 border-l-4"
                style={{ borderColor: center.color }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold" style={{ color: center.color }}>{center.name}</h4>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {center.location} | Est. {center.year}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      backgroundColor: `${center.color}20`,
                      color: center.color,
                      borderColor: center.color
                    }}
                  >
                    {center.maturity}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-700/50 rounded p-2 text-center">
                    <div className="text-lg font-bold text-white">{(center.sqft/1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">sq ft</div>
                  </div>
                  <div className="bg-slate-700/50 rounded p-2 text-center">
                    <div className="text-lg font-bold text-white">${center.investment}M</div>
                    <div className="text-xs text-slate-400">investment</div>
                  </div>
                  <div className="bg-slate-700/50 rounded p-2 text-center">
                    <div className="text-lg font-bold text-white">{center.staff}</div>
                    <div className="text-xs text-slate-400">staff</div>
                  </div>
                  <div className="bg-slate-700/50 rounded p-2 text-center">
                    <div className="text-lg font-bold text-white">
                      {center.learners >= 10000 ? `${(center.learners/1000).toFixed(0)}K` : center.learners.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">learners/yr</div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-3">
                  <p className="text-xs text-slate-400 mb-1">Key Outcomes:</p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {center.outcomes.slice(0, 3).map((outcome, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Detailed Comparison Matrix</h3>
        {selectedData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="text-left py-3 px-4">Metric</th>
                  {selectedData.map(c => (
                    <th key={c.id} className="text-center py-3 px-4" style={{ color: c.color }}>
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Established</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.year}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Location</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.location}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Size (sq ft)</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.sqft.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Investment</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">${c.investment}M</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Staff FTEs</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.staff}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Learners/Year</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.learners.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Maturity</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.maturity}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Accreditation</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center">{c.accreditation}</td>
                  ))}
                </tr>
                <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-400">Funding Model</td>
                  {selectedData.map(c => (
                    <td key={c.id} className="py-3 px-4 text-center text-xs">{c.funding}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-8">
            Select centers above to see comparison matrix
          </div>
        )}
      </div>
    </div>
  )
}
