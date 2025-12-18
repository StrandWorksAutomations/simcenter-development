"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Camera,
  Server,
  Shield,
  Clock,
  DollarSign,
  Network,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  Cloud,
  Database,
  Lock,
  Eye,
  Mic,
  Monitor,
  Settings,
  Users,
  ChevronDown,
  ChevronUp
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
  avEquipmentBudget,
  avBudgetSummary,
  architectureComponents,
  storageOptions,
  implementationTimeline,
  securityControls,
  retentionPolicy,
  avVendors,
  getAVBudgetByCategory,
  getSecurityControlsByCategory,
  avSummary
} from "@/data/seed/av-architecture"

// Category colors
const categoryColors: Record<string, string> = {
  software: '#3b82f6',
  cameras: '#10b981',
  audio: '#f59e0b',
  network: '#8b5cf6',
  displays: '#ec4899',
  storage: '#06b6d4',
  services: '#6366f1',
  contingency: '#64748b'
}

const layerColors: Record<string, string> = {
  capture: '#10b981',
  network: '#3b82f6',
  storage: '#8b5cf6',
  access: '#f59e0b',
  security: '#ef4444'
}

const securityCategoryColors: Record<string, string> = {
  access: '#3b82f6',
  encryption: '#10b981',
  network: '#8b5cf6',
  audit: '#f59e0b',
  vendor: '#ec4899',
  physical: '#64748b'
}

export default function AVArchitecturePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedVendor, setExpandedVendor] = useState<string | null>('ivs-valt')

  const budgetByCategory = getAVBudgetByCategory()
  const securityByCategory = getSecurityControlsByCategory()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  // Pie chart data for budget distribution
  const pieData = budgetByCategory.map(cat => ({
    name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
    value: cat.total,
    color: categoryColors[cat.category]
  }))

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">A/V & IT Architecture</h1>
        <p className="text-slate-400">Audio/Video capture, storage, security, and compliance design</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">Total Budget</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(avSummary.totalBudget)}</div>
          <div className="text-xs text-slate-500 mt-1">Initial investment</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Camera className="h-4 w-4" />
            <span className="text-xs">Cameras</span>
          </div>
          <div className="text-2xl font-bold text-white">{avSummary.cameraCount}</div>
          <div className="text-xs text-slate-500 mt-1">HD PTZ cameras</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Monitor className="h-4 w-4" />
            <span className="text-xs">Rooms Covered</span>
          </div>
          <div className="text-2xl font-bold text-white">{avSummary.roomsCovered}</div>
          <div className="text-xs text-slate-500 mt-1">Simulation suites</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Implementation</span>
          </div>
          <div className="text-2xl font-bold text-white">{avSummary.implementationMonths} mo</div>
          <div className="text-xs text-slate-500 mt-1">Planning to go-live</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Security Controls</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{avSummary.securityControlsCount}</div>
          <div className="text-xs text-slate-500 mt-1">HIPAA compliant</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Settings className="h-4 w-4" />
            <span className="text-xs">Annual Maint.</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{formatCurrency(avSummary.annualMaintenance)}</div>
          <div className="text-xs text-slate-500 mt-1">~15% of initial</div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800 border border-slate-700 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">Overview</TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-slate-700">Budget</TabsTrigger>
          <TabsTrigger value="architecture" className="data-[state=active]:bg-slate-700">Architecture</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">Security</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700">Timeline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Distribution Pie */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Budget Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    label={({ percent }) => percent && percent >= 0.08 ? `${(percent * 100).toFixed(0)}%` : ''}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number, name) => [formatCurrency(value), name]}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recommended Vendor */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Solution</h3>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <div className="text-white font-semibold">IVS VALT</div>
                    <div className="text-emerald-400 text-sm">Primary Recommendation</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  Simple, stable, scalable, secure - browser-based access with strong encryption,
                  tailored for training environments.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400">$50K-$100K</Badge>
                  <Badge className="bg-slate-500/20 text-slate-400">3-room package</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-slate-300 text-sm font-medium">Storage Recommendation</div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Cloud className="h-4 w-4 text-blue-400" />
                    <span className="text-white text-sm font-medium">Hybrid Approach</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    On-premises initially for full control, with cloud archival integration for long-term scalability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Layers */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Architecture Layers</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {architectureComponents.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-slate-900/50 border rounded-lg p-4"
                  style={{ borderColor: `${layerColors[comp.layer]}50` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: layerColors[comp.layer] }}
                    />
                    <span className="text-white font-medium text-sm">{comp.name}</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-3">{comp.description}</p>
                  <ul className="space-y-1">
                    {comp.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-slate-400 text-xs flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Network className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Dedicated VLAN</div>
                <div className="text-slate-500 text-xs">Isolated from hospital network</div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Lock className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">End-to-End Encryption</div>
                <div className="text-slate-500 text-xs">TLS + AES-256</div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">SSO Integration</div>
                <div className="text-slate-500 text-xs">Active Directory</div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Eye className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Audit Logging</div>
                <div className="text-slate-500 text-xs">Full access tracking</div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Bar Chart */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Budget by Category</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={budgetByCategory} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                  <YAxis type="category" dataKey="category" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                    {budgetByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[entry.category]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Summary */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cost Summary</h3>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Initial Investment</span>
                    <span className="text-2xl font-bold text-white">{formatCurrency(avBudgetSummary.totalInitial)}</span>
                  </div>
                  <div className="text-xs text-slate-500">Equipment, software, installation, contingency</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Annual Maintenance</span>
                    <span className="text-xl font-bold text-amber-400">{formatCurrency(avBudgetSummary.annualMaintenance)}</span>
                  </div>
                  <div className="text-xs text-slate-500">~15% of initial for support, updates, cloud fees</div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">5-Year TCO</span>
                    <span className="text-xl font-bold text-blue-400">
                      {formatCurrency(avBudgetSummary.totalInitial + (avBudgetSummary.annualMaintenance * 5))}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">Initial + 5 years of maintenance</div>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment List */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Equipment & Software List</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Item</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Description</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium text-sm">Qty</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Unit Cost</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium text-sm">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {avEquipmentBudget.map((item) => (
                    <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: categoryColors[item.category] }}
                          />
                          <span className="text-white text-sm">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-400 text-sm truncate max-w-xs">{item.description}</div>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-300 text-sm">{item.quantity}</td>
                      <td className="py-3 px-4 text-right text-slate-400 text-sm">{formatCurrency(item.unitCost)}</td>
                      <td className="py-3 px-4 text-right text-white font-medium text-sm">{formatCurrency(item.totalCost)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-800">
                    <td colSpan={4} className="py-3 px-4 text-white font-bold">Total A/V Budget</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold text-lg">{formatCurrency(avBudgetSummary.totalInitial)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Vendor Comparison */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">A/V Platform Comparison</h3>
            <div className="space-y-3">
              {avVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className={`border rounded-lg overflow-hidden ${
                    vendor.recommended ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700'
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer flex items-center justify-between"
                    onClick={() => setExpandedVendor(expandedVendor === vendor.id ? null : vendor.id)}
                  >
                    <div className="flex items-center gap-3">
                      {vendor.recommended && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                      <div>
                        <div className="text-white font-medium">{vendor.name} - {vendor.product}</div>
                        <div className="text-slate-500 text-sm">
                          {formatCurrency(vendor.priceRange.low)} - {formatCurrency(vendor.priceRange.high)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {vendor.recommended && <Badge className="bg-emerald-500/20 text-emerald-400">Recommended</Badge>}
                      {expandedVendor === vendor.id ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                    </div>
                  </div>
                  {expandedVendor === vendor.id && (
                    <div className="px-4 pb-4 border-t border-slate-700 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-emerald-400 text-sm font-medium mb-2">Strengths</div>
                          <ul className="space-y-1">
                            {vendor.strengths.map((s, idx) => (
                              <li key={idx} className="text-slate-400 text-xs flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-amber-400 text-sm font-medium mb-2">Considerations</div>
                          <ul className="space-y-1">
                            {vendor.considerations.map((c, idx) => (
                              <li key={idx} className="text-slate-400 text-xs flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Architecture Tab */}
        <TabsContent value="architecture" className="space-y-6">
          {/* Storage Options */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Storage Architecture Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {storageOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-lg p-4 ${
                    option.recommendation ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {option.type === 'on-premises' && <Server className="h-5 w-5 text-blue-400" />}
                    {option.type === 'cloud' && <Cloud className="h-5 w-5 text-purple-400" />}
                    {option.type === 'hybrid' && <Database className="h-5 w-5 text-emerald-400" />}
                    <span className="text-white font-medium">{option.name}</span>
                    {option.recommendation && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs ml-auto">Recommended</Badge>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="text-emerald-400 text-xs font-medium mb-1">Pros</div>
                    <ul className="space-y-1">
                      {option.pros.slice(0, 3).map((pro, idx) => (
                        <li key={idx} className="text-slate-400 text-xs flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <div className="text-amber-400 text-xs font-medium mb-1">Cons</div>
                    <ul className="space-y-1">
                      {option.cons.slice(0, 2).map((con, idx) => (
                        <li key={idx} className="text-slate-400 text-xs flex items-start gap-1">
                          <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-slate-500 border-t border-slate-700 pt-2 mt-2">
                    {option.costModel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retention Policy */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Data Retention Policy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {retentionPolicy.map((rule) => (
                <div key={rule.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{rule.recordingType}</span>
                    {rule.autoDelete && (
                      <Badge className="bg-amber-500/20 text-amber-400 text-xs">Auto-delete</Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {rule.retentionDays === -1 ? 'Indefinite' : `${rule.retentionDays} days`}
                  </div>
                  <p className="text-slate-500 text-xs">{rule.description}</p>
                  <p className="text-slate-600 text-xs mt-2 italic">{rule.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram (Text representation) */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Network Architecture</h3>
            <div className="bg-slate-900/50 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Sim Rooms */}
                <div className="space-y-2">
                  <div className="text-slate-400 text-sm font-medium">Simulation Rooms</div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
                        <div className="flex items-center justify-center gap-2">
                          <Camera className="h-4 w-4 text-emerald-400" />
                          <Mic className="h-4 w-4 text-emerald-400" />
                        </div>
                        <div className="text-emerald-400 text-xs">Sim Room {i}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Network Core */}
                <div className="space-y-2">
                  <div className="text-slate-400 text-sm font-medium">Network Layer</div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4">
                    <Network className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-blue-400 text-sm font-medium">Simulation VLAN</div>
                    <div className="text-slate-500 text-xs">Isolated Network</div>
                  </div>
                  <div className="text-slate-500 text-xs">PoE+ Switches</div>
                  <div className="h-8 border-l-2 border-dashed border-slate-600 mx-auto"></div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4">
                    <Server className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-purple-400 text-sm font-medium">A/V Server</div>
                    <div className="text-slate-500 text-xs">VALT/SimCapture</div>
                  </div>
                </div>

                {/* Access Points */}
                <div className="space-y-2">
                  <div className="text-slate-400 text-sm font-medium">Access Points</div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <Monitor className="h-4 w-4 text-amber-400 mx-auto" />
                    <div className="text-amber-400 text-xs">Control Room</div>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-2">
                    <Monitor className="h-4 w-4 text-amber-400 mx-auto" />
                    <div className="text-amber-400 text-xs">Debrief Room</div>
                  </div>
                  <div className="h-8 border-l-2 border-dashed border-slate-600 mx-auto"></div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <Shield className="h-4 w-4 text-red-400 mx-auto" />
                    <div className="text-red-400 text-xs">Hospital Firewall</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Security Controls by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityByCategory.map((cat) => (
              <div key={cat.category} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: securityCategoryColors[cat.category] }}
                  />
                  <span className="text-white font-medium capitalize">{cat.category}</span>
                  <Badge className="bg-slate-600 text-slate-300 text-xs ml-auto">{cat.count}</Badge>
                </div>
                <div className="space-y-2">
                  {cat.controls.map((control) => (
                    <div key={control.id} className="bg-slate-900/50 rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 text-sm">{control.control}</span>
                        <Badge className={
                          control.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                          control.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-slate-500/20 text-slate-400'
                        }>
                          {control.priority}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs">{control.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Security Compliance Summary */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Compliance Framework</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-white font-medium">HIPAA</div>
                <div className="text-slate-500 text-xs">Security Rule Compliant</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-medium">Encryption</div>
                <div className="text-slate-500 text-xs">TLS 1.2+ / AES-256</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-white font-medium">RBAC</div>
                <div className="text-slate-500 text-xs">Role-Based Access</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                <Eye className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <div className="text-white font-medium">Audit Trail</div>
                <div className="text-slate-500 text-xs">Full Access Logging</div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          {/* Gantt-style Timeline */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Implementation Timeline</h3>
            <div className="space-y-4">
              {/* Month headers */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-32"></div>
                <div className="flex-1 flex">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-slate-500">
                      M{i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase bars */}
              {implementationTimeline.map((phase, idx) => {
                const startMonth = parseInt(phase.month.match(/\d+/)?.[0] || '0')
                const endMonth = parseInt(phase.month.match(/\d+$/)?.[0] || phase.month.match(/\d+/)?.[0] || '0')
                const duration = endMonth - startMonth + 1

                return (
                  <div key={phase.id} className="flex items-center gap-2">
                    <div className="w-32 text-sm text-slate-300 truncate">{phase.name}</div>
                    <div className="flex-1 relative h-8 bg-slate-900/50 rounded">
                      <div
                        className="absolute h-6 top-1 bg-blue-500 rounded"
                        style={{
                          left: `${(startMonth / 10) * 100}%`,
                          width: `${(duration / 10) * 100}%`
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium truncate px-1">
                          {phase.phase}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {implementationTimeline.slice(0, 4).map((phase, idx) => (
              <div key={phase.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-slate-400 text-sm">{phase.month}</span>
                </div>
                <h4 className="text-white font-medium mb-2">{phase.name}</h4>
                <p className="text-slate-500 text-xs mb-3">{phase.description}</p>
                <div className="space-y-1">
                  {phase.deliverables.slice(0, 3).map((d, i) => (
                    <div key={i} className="text-slate-400 text-xs flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Source Reference */}
      <div className="mt-8 bg-slate-800/30 border border-slate-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Source</h3>
        <div className="text-sm text-slate-400">
          <p>
            <span className="text-blue-400">A/V Architecture Module</span> — HIPAA-compliant video capture, retention policies, security controls, and system reliability requirements based on <span className="text-blue-400">healthcare simulation standards</span>.
          </p>
          <p className="mt-2">
            Reference architecture based on healthcare IT standards, IVS VALT specifications, and industry best practices
            for simulation center A/V systems.
          </p>
        </div>
      </div>
    </div>
  )
}
