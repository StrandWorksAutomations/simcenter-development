"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Star,
  ExternalLink,
  Package,
  Wrench,
  CheckCircle2,
  Box,
  Syringe,
  Video,
  Phone,
  Mail,
  Globe,
  FileText,
  DollarSign,
  Users,
  MapPin,
  Clock,
  Check,
  X,
  Minus,
  Upload
} from "lucide-react"
import {
  vendors,
  equipmentCatalog,
  existingInventory,
  proceduralSupplies,
  getExistingInventoryValue,
  type EquipmentItem
} from "@/data/seed/equipment"
import {
  avVendors,
  avVendorBids,
  getAVVendorStats,
  getBidsByVendor,
  type AVVendor,
  type AVVendorBid
} from "@/data/seed/av-vendors"

// Group equipment by vendor
function getEquipmentByVendor(vendorId: string): EquipmentItem[] {
  return equipmentCatalog.filter(e => e.vendorId === vendorId)
}

// Format price range
function formatPrice(low: number, high: number): string {
  const formatNum = (n: number) => {
    if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
    return `$${n}`
  }
  return `${formatNum(low)} - ${formatNum(high)}`
}

// Category labels
const categoryLabels: Record<string, string> = {
  adult_simulator: 'Adult Simulator',
  ob_simulator: 'OB/Birthing',
  pediatric_simulator: 'Pediatric',
  geriatric: 'Geriatric',
  respiratory: 'Respiratory',
  av_system: 'A/V System',
  lms: 'LMS',
  task_trainer: 'Task Trainer'
}

// Supply category labels
const supplyCategoryLabels: Record<string, string> = {
  airway: 'Airway Management',
  vascular: 'Vascular Access',
  urinary: 'Urinary/Catheter',
  chest: 'Chest Procedures',
  wound: 'Wound Care',
  monitoring: 'Patient Monitoring',
  general: 'General Supplies'
}

// AV Vendor category labels
const avCategoryLabels: Record<string, string> = {
  'full-suite': 'Full Suite',
  'recording-only': 'Recording Only',
  'integration': 'Integration',
  'manikin-av': 'Manikin AV'
}

// Bid status colors
const bidStatusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  under_review: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  accepted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

// Format currency
function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

// Feature icon component
function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-emerald-400" />
  if (value === false) return <X className="h-4 w-4 text-red-400" />
  if (value === 'limited') return <Minus className="h-4 w-4 text-amber-400" />
  return <Minus className="h-4 w-4 text-slate-500" />
}

export default function VendorsPage() {
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)
  const [expandedEquipment, setExpandedEquipment] = useState<string | null>(null)
  const [expandedAVVendor, setExpandedAVVendor] = useState<string | null>(null)

  const inventoryValue = getExistingInventoryValue()
  const avStats = getAVVendorStats()

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipment & Vendors</h1>
          <p className="text-slate-400">
            Equipment catalog, vendor comparison, and existing inventory
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Equipment Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{vendors.length}</div>
            <p className="text-xs text-slate-500">Simulator suppliers</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">AV Software Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{avStats.totalVendors}</div>
            <p className="text-xs text-slate-500">{avStats.fullSuite} full-suite</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{avStats.pendingBids}</div>
            <p className="text-xs text-slate-500">{formatCurrency(avStats.totalBidValue)} total</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Already Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{existingInventory.length}</div>
            <p className="text-xs text-slate-500">~${(inventoryValue / 1000).toFixed(0)}K value</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Catalog Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{equipmentCatalog.length}</div>
            <p className="text-xs text-slate-500">Products available</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Procedural Supplies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400">{proceduralSupplies.length}</div>
            <p className="text-xs text-slate-500">{proceduralSupplies.filter(s => s.quantity === 'abundant').length} abundant</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="av-software" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="av-software" className="data-[state=active]:bg-slate-700">
            <Video className="h-4 w-4 mr-2" />
            AV Software
          </TabsTrigger>
          <TabsTrigger value="vendors" className="data-[state=active]:bg-slate-700">
            <Building2 className="h-4 w-4 mr-2" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="catalog" className="data-[state=active]:bg-slate-700">
            <Package className="h-4 w-4 mr-2" />
            Catalog
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-slate-700">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="supplies" className="data-[state=active]:bg-slate-700">
            <Syringe className="h-4 w-4 mr-2" />
            Supplies
          </TabsTrigger>
        </TabsList>

        {/* AV Software Tab */}
        <TabsContent value="av-software">
          <div className="space-y-6">
            {/* Active Bids Section */}
            {avVendorBids.length > 0 && (
              <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-400" />
                        Active Bids & Proposals
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {avVendorBids.filter(b => b.status === 'under_review' || b.status === 'pending').length} proposals under review
                      </CardDescription>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Bid
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {avVendorBids.map((bid) => {
                      const vendor = avVendors.find(v => v.id === bid.vendorId)
                      return (
                        <div key={bid.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-white">{bid.proposalName}</h4>
                                <Badge className={bidStatusColors[bid.status]}>
                                  {bid.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-400">{vendor?.name}</p>
                              <div className="flex items-center gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Received: {bid.dateReceived}
                                </span>
                                {bid.validUntil && (
                                  <span className="flex items-center gap-1">
                                    Valid until: {bid.validUntil}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-emerald-400">{formatCurrency(bid.totalYear1)}</p>
                              <p className="text-xs text-slate-500">Year 1</p>
                              {bid.totalYear5 && (
                                <p className="text-xs text-slate-400">{formatCurrency(bid.totalYear5)} 5-yr TCO</p>
                              )}
                            </div>
                          </div>
                          {bid.lineItems && bid.lineItems.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-700">
                              <p className="text-xs text-slate-400 mb-2">Line Items:</p>
                              <div className="grid grid-cols-2 gap-2">
                                {bid.lineItems.slice(0, 4).map((item, i) => (
                                  <div key={i} className="flex justify-between text-xs">
                                    <span className="text-slate-400 truncate">{item.description}</span>
                                    <span className={item.type === 'recurring' ? 'text-blue-400' : 'text-white'}>
                                      {formatCurrency(item.amount)}
                                      {item.type === 'recurring' && '/yr'}
                                    </span>
                                  </div>
                                ))}
                                {bid.lineItems.length > 4 && (
                                  <span className="text-xs text-slate-500">+{bid.lineItems.length - 4} more items</span>
                                )}
                              </div>
                            </div>
                          )}
                          {bid.notes && (
                            <p className="mt-2 text-xs text-slate-500 italic">{bid.notes}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AV Vendors List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">AV Software Vendors</h3>
                <div className="flex gap-2">
                  {Object.entries(avCategoryLabels).map(([key, label]) => (
                    <Badge key={key} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {label}: {avVendors.filter(v => v.category === key).length}
                    </Badge>
                  ))}
                </div>
              </div>

              {avVendors.map((vendor) => {
                const vendorBids = getBidsByVendor(vendor.id)
                const isExpanded = expandedAVVendor === vendor.id

                return (
                  <Card key={vendor.id} className="bg-slate-800/50 border-slate-700">
                    <div
                      className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                      onClick={() => setExpandedAVVendor(isExpanded ? null : vendor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            vendor.category === 'full-suite' ? 'bg-purple-500/20' :
                            vendor.category === 'recording-only' ? 'bg-blue-500/20' :
                            vendor.category === 'integration' ? 'bg-amber-500/20' :
                            'bg-slate-600/50'
                          }`}>
                            <Video className={`h-6 w-6 ${
                              vendor.category === 'full-suite' ? 'text-purple-400' :
                              vendor.category === 'recording-only' ? 'text-blue-400' :
                              vendor.category === 'integration' ? 'text-amber-400' :
                              'text-slate-400'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{vendor.name}</h3>
                              <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                                {avCategoryLabels[vendor.category]}
                              </Badge>
                              <Badge className={`text-xs ${
                                vendor.priceTier === '$$$' ? 'bg-amber-500/20 text-amber-400' :
                                vendor.priceTier === '$$' ? 'bg-blue-500/20 text-blue-400' :
                                vendor.priceTier === '$' ? 'bg-emerald-500/20 text-emerald-400' :
                                'bg-slate-600 text-slate-400'
                              }`}>
                                {vendor.priceTier}
                              </Badge>
                              {vendorBids.length > 0 && (
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                                  {vendorBids.length} bid{vendorBids.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">{vendor.shortName || vendor.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                              <MapPin className="h-3 w-3" />
                              {vendor.headquarters.city}, {vendor.headquarters.country}
                            </div>
                            <a
                              href={`https://${vendor.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {vendor.website}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-700 p-4 space-y-4">
                        <p className="text-sm text-slate-300">{vendor.description}</p>

                        {/* Contact Information */}
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                              <Phone className="h-4 w-4 text-blue-400" />
                              Contact Information
                            </h4>
                            <div className="p-3 rounded-lg bg-slate-700/50 space-y-2">
                              {vendor.salesPhone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-3 w-3 text-slate-500" />
                                  <span className="text-slate-300">{vendor.salesPhone}</span>
                                </div>
                              )}
                              {vendor.salesEmail && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-3 w-3 text-slate-500" />
                                  <span className="text-slate-300">{vendor.salesEmail}</span>
                                </div>
                              )}
                              {vendor.supportEmail && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-3 w-3 text-slate-500" />
                                  <span className="text-slate-400">Support: {vendor.supportEmail}</span>
                                </div>
                              )}
                              {vendor.contacts && vendor.contacts.map((contact, i) => (
                                <div key={i} className="pt-2 border-t border-slate-600">
                                  {contact.name && <p className="text-sm text-white">{contact.name}</p>}
                                  {contact.title && <p className="text-xs text-slate-400">{contact.title}</p>}
                                  {contact.email && (
                                    <a href={`mailto:${contact.email}`} className="text-xs text-blue-400 hover:underline">
                                      {contact.email}
                                    </a>
                                  )}
                                  {contact.phone && <p className="text-xs text-slate-300">{contact.phone}</p>}
                                  {contact.notes && <p className="text-xs text-slate-500 italic">{contact.notes}</p>}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Products */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                              <Package className="h-4 w-4 text-emerald-400" />
                              Products
                            </h4>
                            <div className="p-3 rounded-lg bg-slate-700/50 space-y-2">
                              {vendor.products.map((product, i) => (
                                <div key={i} className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm text-white">{product.name}</p>
                                    <p className="text-xs text-slate-400">{product.description}</p>
                                  </div>
                                  {product.priceRange && product.priceRange.high > 0 && (
                                    <span className="text-sm text-emerald-400 whitespace-nowrap">
                                      {formatCurrency(product.priceRange.low)} - {formatCurrency(product.priceRange.high)}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Notable Clients */}
                        {(vendor.notableClients && vendor.notableClients.length > 0) && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                              <Users className="h-4 w-4 text-purple-400" />
                              Notable Clients / Benchmark Organizations
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {vendor.notableClients.map((client, i) => (
                                <Badge key={i} variant="outline" className="border-purple-500/30 text-purple-300">
                                  {client}
                                </Badge>
                              ))}
                              {vendor.clientCount && (
                                <Badge className="bg-purple-500/20 text-purple-300">
                                  {vendor.clientCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Key Features Grid */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-slate-300">Key Features</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.showsSimDetails} />
                              <span className="text-slate-400">Sim Details</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.showsManikinVitals} />
                              <span className="text-slate-400">Manikin Vitals</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.scheduling} />
                              <span className="text-slate-400">Scheduling</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.osceWorkflows} />
                              <span className="text-slate-400">OSCE Workflows</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.lmsIntegration} />
                              <span className="text-slate-400">LMS Integration</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.ssoSupport} />
                              <span className="text-slate-400">SSO Support</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.cloudStorage} />
                              <span className="text-slate-400">Cloud Storage</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <FeatureIcon value={vendor.features.manikinAgnostic} />
                              <span className="text-slate-400">Manikin Agnostic</span>
                            </div>
                          </div>
                        </div>

                        {vendor.notes && (
                          <p className="text-xs text-slate-500 italic border-t border-slate-700 pt-3">
                            {vendor.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors">
          <div className="space-y-4">
            {vendors.map((vendor) => {
              const vendorEquipment = getEquipmentByVendor(vendor.id)
              const isExpanded = expandedVendor === vendor.id

              return (
                <Card key={vendor.id} className="bg-slate-800/50 border-slate-700">
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{vendor.name}</h3>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {vendor.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400">{vendor.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-slate-400">{vendorEquipment.length} products</p>
                          <a
                            href={`https://${vendor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {vendor.website}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && vendorEquipment.length > 0 && (
                    <div className="border-t border-slate-700 p-4">
                      <h4 className="text-sm font-medium text-slate-300 mb-3">Available Products</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        {vendorEquipment.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer"
                            onClick={() => setExpandedEquipment(expandedEquipment === item.id ? null : item.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-white">{item.name}</h5>
                                <Badge className="mt-1 bg-slate-600 text-slate-200">
                                  {categoryLabels[item.category] || item.category}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-emerald-400">
                                  {formatPrice(item.priceRange.low, item.priceRange.high)}
                                </p>
                              </div>
                            </div>

                            {expandedEquipment === item.id && (
                              <div className="mt-3 pt-3 border-t border-slate-600 space-y-2">
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <span className="text-slate-400">Warranty:</span>
                                    <span className="text-white ml-1">{item.warrantyYears} yr</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Maint:</span>
                                    <span className="text-white ml-1">{item.annualMaintenancePct}%/yr</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">Lifecycle:</span>
                                    <span className="text-white ml-1">{item.lifecycleYears} yrs</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 mb-1">Features:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {item.features.map((feature, i) => (
                                      <Badge key={i} variant="outline" className="text-xs border-slate-500 text-slate-300">
                                        {feature}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                {item.notes && (
                                  <p className="text-xs text-slate-400 italic">{item.notes}</p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Full Catalog Tab */}
        <TabsContent value="catalog">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Equipment Catalog</CardTitle>
              <CardDescription className="text-slate-400">
                All available simulation equipment by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(categoryLabels).map(([catKey, catLabel]) => {
                  const categoryItems = equipmentCatalog.filter(e => e.category === catKey)
                  if (categoryItems.length === 0) return null

                  return (
                    <div key={catKey}>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Box className="h-5 w-5 text-blue-400" />
                        {catLabel}
                        <Badge className="bg-slate-600">{categoryItems.length}</Badge>
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {categoryItems.map((item) => {
                          const vendor = vendors.find(v => v.id === item.vendorId)
                          return (
                            <div
                              key={item.id}
                              className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer"
                              onClick={() => setExpandedEquipment(expandedEquipment === item.id ? null : item.id)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium text-white">{item.name}</h4>
                                  <p className="text-xs text-slate-400">{vendor?.name}</p>
                                </div>
                                <p className="font-semibold text-emerald-400 text-sm">
                                  {formatPrice(item.priceRange.low, item.priceRange.high)}
                                </p>
                              </div>

                              {expandedEquipment === item.id && (
                                <div className="mt-3 pt-3 border-t border-slate-600 space-y-2">
                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div>
                                      <span className="text-slate-400">Warranty:</span>
                                      <span className="text-white ml-1">{item.warrantyYears} yr</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-400">Maint:</span>
                                      <span className="text-white ml-1">{item.annualMaintenancePct}%/yr</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-400">Lifecycle:</span>
                                      <span className="text-white ml-1">{item.lifecycleYears} yrs</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-400 mb-1">Features:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {item.features.slice(0, 4).map((feature, i) => (
                                        <Badge key={i} variant="outline" className="text-xs border-slate-500 text-slate-300">
                                          {feature}
                                        </Badge>
                                      ))}
                                      {item.features.length > 4 && (
                                        <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">
                                          +{item.features.length - 4} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  {item.notes && (
                                    <p className="text-xs text-slate-400 italic">{item.notes}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Existing Inventory Tab */}
        <TabsContent value="inventory">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                Existing Inventory
              </CardTitle>
              <CardDescription className="text-slate-400">
                Equipment BHL already owns - estimated value ~${(inventoryValue / 1000).toFixed(0)}K
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {existingInventory.map((item) => {
                  const catalogItem = equipmentCatalog.find(e => e.id === item.equipmentId)
                  const estimatedValue = item.purchasePrice || (catalogItem ? (catalogItem.priceRange.low + catalogItem.priceRange.high) / 2 : 0)

                  return (
                    <div key={item.id} className="p-4 rounded-lg bg-slate-700/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <Badge className={
                              item.condition === 'new' ? 'bg-emerald-500/20 text-emerald-400' :
                              item.condition === 'excellent' ? 'bg-blue-500/20 text-blue-400' :
                              item.condition === 'good' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-slate-600 text-slate-300'
                            }>
                              {item.condition}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400">Model: {item.model}</p>
                          {item.location && (
                            <p className="text-sm text-slate-500">Location: {item.location}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-400">
                            ~${(estimatedValue / 1000).toFixed(0)}K
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.purchaseDate === 'existing' ? 'Existing' : `Purchased ${item.purchaseDate}`}
                          </p>
                        </div>
                      </div>
                      {item.notes && (
                        <p className="mt-2 text-sm text-slate-400 italic">{item.notes}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Procedural Supplies Tab */}
        <TabsContent value="supplies">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Syringe className="h-5 w-5 text-blue-400" />
                Procedural Supplies Available
              </CardTitle>
              <CardDescription className="text-slate-400">
                Expired medical supplies from hospital - perfect for simulation training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {proceduralSupplies.map((supply) => (
                  <div key={supply.id} className="p-4 rounded-lg bg-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{supply.name}</h3>
                      <Badge className={
                        supply.quantity === 'abundant' ? 'bg-emerald-500/20 text-emerald-400' :
                        supply.quantity === 'moderate' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }>
                        {supply.quantity}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300 mb-2">
                      {supplyCategoryLabels[supply.category]}
                    </Badge>
                    <p className="text-sm text-slate-400">{supply.notes}</p>
                    <p className="text-xs text-slate-500 mt-2">Source: {supply.source}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="font-medium text-blue-400 mb-2">💡 Cost Savings Note</h4>
                <p className="text-sm text-slate-300">
                  Having access to expired hospital supplies significantly reduces ongoing consumable costs
                  for the simulation center. These supplies are safe for training purposes and provide
                  realistic hands-on experience with actual medical equipment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
