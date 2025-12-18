"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, HelpCircle } from "lucide-react"
import { WalkthroughProvider, TourLauncher, mainSiteTour } from "@/components/walkthrough"

// Simple user avatar placeholder - Clerk can be added later when keys are configured
function UserAvatar() {
  return (
    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
      <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    </div>
  )
}
import { cn } from "@/lib/utils"
import {
  DollarSign,
  Calendar,
  Users,
  Building2,
  FileText,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Settings,
  LayoutDashboard,
  Box,
  Presentation,
  Menu,
  X,
  HardHat,
  Calculator,
  Monitor,
  Workflow,
  ClipboardList,
  Package
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const navigation = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Benchmarks", href: "/benchmarks", icon: BarChart3 },
    ]
  },
  {
    title: "Budget & Planning",
    items: [
      { name: "CAPEX Model", href: "/capex", icon: Calculator },
      { name: "Construction", href: "/construction", icon: HardHat },
      { name: "A/V Architecture", href: "/av-architecture", icon: Monitor },
      { name: "Budget", href: "/budget", icon: DollarSign },
      { name: "Staffing", href: "/staffing", icon: Users },
      { name: "Timeline", href: "/timeline", icon: Calendar },
    ]
  },
  {
    title: "Procurement",
    items: [
      { name: "Procurement", href: "/procurement", icon: ClipboardList },
      { name: "Vendors", href: "/vendors", icon: Package },
      { name: "Bids", href: "/bids", icon: FileText },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Operations Model", href: "/operations", icon: Workflow },
      { name: "Risks", href: "/risks", icon: AlertTriangle },
      { name: "ROI", href: "/roi", icon: TrendingUp },
    ]
  },
  {
    title: "Presentation",
    items: [
      { name: "Donor Presentation", href: "/presentation", icon: Presentation },
      { name: "3D Facility", href: "/facility-3d", icon: Box },
      { name: "Investor Deck", href: "/investor-deck", icon: Presentation },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <WalkthroughProvider>
    {/* Skip navigation for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Sim Center</span>
              <span className="text-xs text-slate-500">Baptist Health</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <UserAvatar />
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
    <TourLauncher tour={mainSiteTour} />
    </WalkthroughProvider>
  )
}
