"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Eye, Clock, FolderOpen, Video, Building2, Cpu } from "lucide-react"
import { avVendorBids, avVendors } from "@/data/seed/av-vendors"

// Status colors
const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  under_review: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  expired: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400",
}

// Format currency
function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value.toLocaleString()}`
}

// Bid categories for organization
const bidCategories = [
  { id: 'av', label: 'A/V Systems', icon: Video, color: 'text-purple-500', link: '/vendors' },
  { id: 'construction', label: 'Construction', icon: Building2, color: 'text-blue-500', link: null },
  { id: 'equipment', label: 'Equipment', icon: Cpu, color: 'text-emerald-500', link: '/vendors' },
]

export default function BidsPage() {
  // Get real AV bids from the data file
  const activeBids = avVendorBids.filter(b => b.status === 'pending' || b.status === 'under_review')
  const totalBidValue = avVendorBids.reduce((sum, b) => sum + b.totalYear1, 0)
  const acceptedBids = avVendorBids.filter(b => b.status === 'accepted')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Procurement & Bids</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage and evaluate vendor bid submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Bid
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="dark:bg-slate-800/50 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Bids</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{avVendorBids.length}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Received</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-800/50 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{activeBids.length}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Being evaluated</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-800/50 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{formatCurrency(totalBidValue)}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">All bids combined</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-slate-800/50 dark:border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{acceptedBids.length}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Awarded</p>
          </CardContent>
        </Card>
      </div>

      {/* Bid Categories */}
      <div className="grid gap-4 md:grid-cols-3">
        {bidCategories.map((cat) => {
          const Icon = cat.icon
          const categoryBidCount = cat.id === 'av' ? avVendorBids.length : 0

          return (
            <Card key={cat.id} className="dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-700 ${cat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">{cat.label}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {categoryBidCount} bid{categoryBidCount !== 1 ? 's' : ''} received
                      </p>
                    </div>
                  </div>
                  {cat.link ? (
                    <Link href={cat.link}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                  ) : (
                    <Button variant="outline" size="sm" disabled>No bids</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bid Submissions */}
      <Card className="dark:bg-slate-800/50 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Bid Submissions</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Review and evaluate vendor proposals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {avVendorBids.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <FolderOpen className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium dark:text-white mb-2">No bids yet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                Upload vendor proposals or add bid information from the Vendors page to start tracking procurement.
              </p>
              <div className="flex gap-3">
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Bid
                </Button>
                <Link href="/vendors">
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    View AV Vendors
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Bid List */
            <div className="space-y-4">
              {avVendorBids.map((bid) => {
                const vendor = avVendors.find(v => v.id === bid.vendorId)
                return (
                  <div key={bid.id} className="flex items-center justify-between p-4 rounded-lg border dark:border-slate-700 dark:bg-slate-800/30">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-white">{bid.proposalName}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <span>{vendor?.name || 'Unknown Vendor'}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{bid.dateReceived}</span>
                          {bid.validUntil && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 dark:text-amber-400">Valid until {bid.validUntil}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold dark:text-white">{formatCurrency(bid.totalYear1)}</p>
                        <Badge className={statusColors[bid.status]}>
                          {bid.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <Link href="/vendors">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Managing Bids</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                AV Software bids are managed in the <Link href="/vendors" className="underline font-medium">Vendors → AV Software</Link> tab.
                Construction and equipment bids will appear here once uploaded. Use the "Upload Bid" button to add new proposals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
