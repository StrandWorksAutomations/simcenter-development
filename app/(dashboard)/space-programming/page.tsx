"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Box,
  Grid3X3,
  Truck,
  GraduationCap,
  Building2,
  Layers,
  BedDouble,
  Monitor,
  Users,
  Syringe,
  Package,
  Server,
  UserCircle,
  Briefcase,
  CheckCircle2,
  Circle,
  AlertCircle,
  Info,
  LayoutGrid,
  List,
  Ruler,
  Target
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from "recharts"
import {
  SIMULATION_TYPOLOGIES,
  SPACE_TYPES,
  BAPTIST_HEALTH_FLOOR_PLAN,
  DATA_SOURCES,
  getFloorPlanSummary,
  getRoomsByPhase,
  getSpaceTypeById,
  type SimulationTypology,
  type SpaceType,
  type ProposedRoom
} from "@/data/seed/space-programming"

// =============================================================================
// ICON MAPPING
// =============================================================================

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>

const ICON_MAP: Record<string, IconComponent> = {
  'Box': Box,
  'Grid3X3': Grid3X3,
  'Truck': Truck,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
  'Layers': Layers,
  'BedDouble': BedDouble,
  'Monitor': Monitor,
  'Users': Users,
  'Syringe': Syringe,
  'Package': Package,
  'Server': Server,
  'UserCircle': UserCircle,
  'Briefcase': Briefcase
}

function getIcon(iconName: string): IconComponent {
  return ICON_MAP[iconName] || Box
}

// =============================================================================
// COLORS
// =============================================================================

const PHASE_COLORS = {
  1: '#3b82f6', // blue
  2: '#10b981', // green
  3: '#f59e0b'  // amber
}

const CATEGORY_COLORS = {
  'clinical': '#ef4444',    // red
  'support': '#8b5cf6',     // purple
  'technology': '#06b6d4',  // cyan
  'administrative': '#f59e0b' // amber
}

const PRIORITY_COLORS = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'important': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'optional': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

// =============================================================================
// FORMATTING
// =============================================================================

function formatSqft(value: number): string {
  return `${value.toLocaleString()} sq ft`
}

// =============================================================================
// TYPOLOGY CARD
// =============================================================================

function TypologyCard({
  typology,
  isSelected,
  onSelect
}: {
  typology: SimulationTypology
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = getIcon(typology.icon)

  return (
    <Card
      className={`bg-slate-800/50 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 shadow-lg shadow-blue-500/20'
          : 'border-slate-700 hover:border-slate-600'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
            <IconComponent className={`h-5 w-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
          </div>
          <div>
            <CardTitle className="text-white text-sm">{typology.shortName}</CardTitle>
            <CardDescription className="text-xs">{typology.sqftRange.typical}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-slate-400 line-clamp-2">{typology.description}</p>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// TYPOLOGY DETAIL
// =============================================================================

function TypologyDetail({ typology }: { typology: SimulationTypology }) {
  const IconComponent = getIcon(typology.icon)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-500/20">
          <IconComponent className="h-8 w-8 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{typology.name}</h3>
          <p className="text-slate-400 mt-1">{typology.description}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-700/30 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Square Footage</div>
            <div className="text-lg font-bold text-white">{typology.sqftRange.typical}</div>
            <div className="text-xs text-slate-500">Range: {typology.sqftRange.min.toLocaleString()} - {typology.sqftRange.max.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700/30 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Sim Rooms</div>
            <div className="text-lg font-bold text-white">{typology.roomCounts.simRooms}</div>
            <div className="text-xs text-slate-500">Control: {typology.roomCounts.controlRooms}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700/30 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Per Session</div>
            <div className="text-lg font-bold text-white">{typology.capacity.learnersPerSession}</div>
            <div className="text-xs text-slate-500">learners</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-700/30 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Annual Capacity</div>
            <div className="text-lg font-bold text-emerald-400">{typology.capacity.annualCapacity}</div>
          </CardContent>
        </Card>
      </div>

      {/* Suitable For */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-300">Best Suited For</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {typology.suitableFor.map((item, i) => (
              <Badge key={i} variant="outline" className="border-slate-600 text-slate-300">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {typology.pros.map((pro, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-400 text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {typology.cons.map((con, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-red-400 mt-1">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Characteristics */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-sm text-slate-300">Design Characteristics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-medium text-blue-400 mb-2">Adjacency Requirements</h5>
              <ul className="space-y-1">
                {typology.characteristics.adjacency.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-medium text-purple-400 mb-2">Acoustics & Sightlines</h5>
              <ul className="space-y-1">
                {typology.characteristics.acoustics.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-medium text-emerald-400 mb-2">Infection Control</h5>
              <ul className="space-y-1">
                {typology.characteristics.infectionControl.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400">• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-medium text-amber-400 mb-2">Circulation</h5>
              <ul className="space-y-1">
                {typology.characteristics.circulation.map((item, i) => (
                  <li key={i} className="text-xs text-slate-400">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================================================================
// SPACE TYPE CARD
// =============================================================================

function SpaceTypeCard({ spaceType }: { spaceType: SpaceType }) {
  const IconComponent = getIcon(spaceType.icon)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${CATEGORY_COLORS[spaceType.category]}20` }}>
              <IconComponent className="h-5 w-5" style={{ color: CATEGORY_COLORS[spaceType.category] }} />
            </div>
            <div>
              <CardTitle className="text-white text-sm">{spaceType.name}</CardTitle>
              <CardDescription className="text-xs capitalize">{spaceType.category}</CardDescription>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-blue-400 hover:underline"
          >
            {showDetails ? 'Less' : 'More'}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-400 mb-3">{spaceType.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-slate-500">Min Viable</div>
            <div className="text-white">{spaceType.sizing.minViable}</div>
          </div>
          <div className="p-2 rounded bg-slate-700/30">
            <div className="text-slate-500">Best-in-Class</div>
            <div className="text-white">{spaceType.sizing.bestInClass}</div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-3">
            <div>
              <h5 className="text-xs font-medium text-slate-300 mb-1">Requirements</h5>
              <ul className="space-y-0.5">
                {spaceType.requirements.map((req, i) => (
                  <li key={i} className="text-xs text-slate-400">• {req}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-medium text-slate-300 mb-1">Adjacent To</h5>
              <div className="flex flex-wrap gap-1">
                {spaceType.adjacentTo.map((adj, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] border-slate-600">
                    {adj}
                  </Badge>
                ))}
              </div>
            </div>
            {spaceType.specialConsiderations && (
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                <h5 className="text-xs font-medium text-amber-400 mb-1">Special Considerations</h5>
                <ul className="space-y-0.5">
                  {spaceType.specialConsiderations.map((note, i) => (
                    <li key={i} className="text-xs text-amber-200/70">• {note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// =============================================================================
// FLOOR PLAN VISUALIZATION
// =============================================================================

function FloorPlanVisualization() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null)
  const summary = useMemo(() => getFloorPlanSummary(BAPTIST_HEALTH_FLOOR_PLAN), [])

  const filteredRooms = selectedPhase
    ? getRoomsByPhase(BAPTIST_HEALTH_FLOOR_PLAN.rooms, selectedPhase)
    : BAPTIST_HEALTH_FLOOR_PLAN.rooms

  // Pie chart data
  const pieData = [
    { name: 'Phase 1', value: summary.phase1.sqft, color: PHASE_COLORS[1] },
    { name: 'Phase 2', value: summary.phase2.sqft, color: PHASE_COLORS[2] },
    { name: 'Phase 3', value: summary.phase3.sqft, color: PHASE_COLORS[3] }
  ]

  // Bar chart data by category
  const categoryData = [
    { name: 'Clinical', sqft: BAPTIST_HEALTH_FLOOR_PLAN.rooms.filter(r => getSpaceTypeById(r.spaceType)?.category === 'clinical').reduce((sum, r) => sum + r.sqft, 0), color: CATEGORY_COLORS.clinical },
    { name: 'Support', sqft: BAPTIST_HEALTH_FLOOR_PLAN.rooms.filter(r => getSpaceTypeById(r.spaceType)?.category === 'support').reduce((sum, r) => sum + r.sqft, 0), color: CATEGORY_COLORS.support },
    { name: 'Technology', sqft: BAPTIST_HEALTH_FLOOR_PLAN.rooms.filter(r => getSpaceTypeById(r.spaceType)?.category === 'technology').reduce((sum, r) => sum + r.sqft, 0), color: CATEGORY_COLORS.technology },
    { name: 'Admin', sqft: BAPTIST_HEALTH_FLOOR_PLAN.rooms.filter(r => getSpaceTypeById(r.spaceType)?.category === 'administrative').reduce((sum, r) => sum + r.sqft, 0), color: CATEGORY_COLORS.administrative }
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="text-xs text-slate-500">Total Space</div>
            <div className="text-2xl font-bold text-white">{formatSqft(summary.totalSqft)}</div>
            <div className="text-xs text-slate-500">{summary.totalRooms} rooms</div>
          </CardContent>
        </Card>
        <Card
          className={`border cursor-pointer transition-all ${selectedPhase === 1 ? 'bg-blue-500/20 border-blue-500' : 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50'}`}
          onClick={() => setSelectedPhase(selectedPhase === 1 ? null : 1)}
        >
          <CardContent className="pt-4">
            <div className="text-xs text-blue-400">Phase 1</div>
            <div className="text-2xl font-bold text-white">{formatSqft(summary.phase1.sqft)}</div>
            <div className="text-xs text-slate-500">{summary.phase1.rooms} rooms</div>
          </CardContent>
        </Card>
        <Card
          className={`border cursor-pointer transition-all ${selectedPhase === 2 ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-800/50 border-slate-700 hover:border-emerald-500/50'}`}
          onClick={() => setSelectedPhase(selectedPhase === 2 ? null : 2)}
        >
          <CardContent className="pt-4">
            <div className="text-xs text-emerald-400">Phase 2</div>
            <div className="text-2xl font-bold text-white">{formatSqft(summary.phase2.sqft)}</div>
            <div className="text-xs text-slate-500">{summary.phase2.rooms} rooms</div>
          </CardContent>
        </Card>
        <Card
          className={`border cursor-pointer transition-all ${selectedPhase === 3 ? 'bg-amber-500/20 border-amber-500' : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50'}`}
          onClick={() => setSelectedPhase(selectedPhase === 3 ? null : 3)}
        >
          <CardContent className="pt-4">
            <div className="text-xs text-amber-400">Phase 3</div>
            <div className="text-2xl font-bold text-white">{formatSqft(summary.phase3.sqft)}</div>
            <div className="text-xs text-slate-500">{summary.phase3.rooms} rooms</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Space by Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [formatSqft(value), '']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-base">Space by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={60} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => [formatSqft(value), '']}
                  />
                  <Bar dataKey="sqft" fill="#3b82f6">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Room List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <List className="h-4 w-4 text-blue-400" />
            Room Program
            {selectedPhase && (
              <Badge className={`ml-2 ${selectedPhase === 1 ? 'bg-blue-500/20 text-blue-400' : selectedPhase === 2 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                Phase {selectedPhase} Only
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400 font-medium">Room</th>
                  <th className="text-left py-2 text-slate-400 font-medium">Type</th>
                  <th className="text-right py-2 text-slate-400 font-medium">Sq Ft</th>
                  <th className="text-center py-2 text-slate-400 font-medium">Phase</th>
                  <th className="text-center py-2 text-slate-400 font-medium">Priority</th>
                  <th className="text-left py-2 text-slate-400 font-medium">Key Features</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="border-b border-slate-700/50">
                    <td className="py-2 text-white font-medium">{room.name}</td>
                    <td className="py-2 text-slate-400 capitalize">{room.spaceType.replace('-', ' ')}</td>
                    <td className="py-2 text-right text-white font-mono">{room.sqft.toLocaleString()}</td>
                    <td className="py-2 text-center">
                      <Badge
                        style={{ backgroundColor: `${PHASE_COLORS[room.phase]}20`, color: PHASE_COLORS[room.phase], borderColor: `${PHASE_COLORS[room.phase]}50` }}
                        variant="outline"
                      >
                        Phase {room.phase}
                      </Badge>
                    </td>
                    <td className="py-2 text-center">
                      <Badge className={PRIORITY_COLORS[room.priority]} variant="outline">
                        {room.priority}
                      </Badge>
                    </td>
                    <td className="py-2 text-slate-400 text-xs">{room.features.slice(0, 2).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-700/30">
                  <td className="py-2 font-bold text-white" colSpan={2}>Total</td>
                  <td className="py-2 text-right font-bold text-white font-mono">
                    {filteredRooms.reduce((sum, r) => sum + r.sqft, 0).toLocaleString()}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Zones */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-purple-400" />
            Functional Zones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BAPTIST_HEALTH_FLOOR_PLAN.zones.map((zone) => (
              <div key={zone.name} className="p-3 rounded-lg bg-slate-700/30">
                <h4 className="font-medium text-white text-sm">{zone.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{zone.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {zone.roomIds.slice(0, 4).map((roomId) => {
                    const room = BAPTIST_HEALTH_FLOOR_PLAN.rooms.find(r => r.id === roomId)
                    return room ? (
                      <Badge key={roomId} variant="outline" className="text-[10px] border-slate-600">
                        {room.name.split(' ')[0]}
                      </Badge>
                    ) : null
                  })}
                  {zone.roomIds.length > 4 && (
                    <Badge variant="outline" className="text-[10px] border-slate-600">
                      +{zone.roomIds.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function SpaceProgrammingPage() {
  const [selectedTypology, setSelectedTypology] = useState<SimulationTypology>(
    SIMULATION_TYPOLOGIES.find(t => t.id === 'hospital-based') || SIMULATION_TYPOLOGIES[0]
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Space Programming</h1>
          <p className="text-slate-400">Simulation lab typologies, room requirements, and floor plan concepts</p>
        </div>
        <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 flex items-center gap-1">
          <Ruler className="h-3 w-3" />
          Prompt 2 Analysis
        </Badge>
      </div>

      {/* Info Banner */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-200">
                This space program is based on SSH (Society for Simulation in Healthcare) guidelines and comparable
                healthcare simulation facility designs. Room sizes and configurations are recommendations that should
                be adapted to your specific site conditions and program needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="typologies" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="typologies" className="data-[state=active]:bg-slate-700">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Typologies
          </TabsTrigger>
          <TabsTrigger value="space-types" className="data-[state=active]:bg-slate-700">
            <Box className="h-4 w-4 mr-2" />
            Space Types
          </TabsTrigger>
          <TabsTrigger value="floor-plan" className="data-[state=active]:bg-slate-700">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Proposed Floor Plan
          </TabsTrigger>
        </TabsList>

        {/* Typologies Tab */}
        <TabsContent value="typologies" className="space-y-6">
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SIMULATION_TYPOLOGIES.map((typology) => (
              <TypologyCard
                key={typology.id}
                typology={typology}
                isSelected={selectedTypology.id === typology.id}
                onSelect={() => setSelectedTypology(typology)}
              />
            ))}
          </div>
          <TypologyDetail typology={selectedTypology} />
        </TabsContent>

        {/* Space Types Tab */}
        <TabsContent value="space-types" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPACE_TYPES.map((spaceType) => (
              <SpaceTypeCard key={spaceType.id} spaceType={spaceType} />
            ))}
          </div>
        </TabsContent>

        {/* Floor Plan Tab */}
        <TabsContent value="floor-plan">
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">{BAPTIST_HEALTH_FLOOR_PLAN.name}</CardTitle>
              <CardDescription>{BAPTIST_HEALTH_FLOOR_PLAN.description}</CardDescription>
            </CardHeader>
          </Card>
          <FloorPlanVisualization />
        </TabsContent>
      </Tabs>
    </div>
  )
}
