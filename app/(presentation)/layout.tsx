"use client"

import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import UserButton to avoid SSR issues when Clerk isn't configured
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  {
    ssr: false,
    loading: () => <div className="h-8 w-8 rounded-full bg-slate-700" />
  }
)
import { Button } from "@/components/ui/button"
import { ArrowLeft, Box, Presentation, Maximize2 } from "lucide-react"
import { useState } from "react"

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header - hidden in fullscreen */}
      {!isFullscreen && (
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-700 bg-slate-900/95 backdrop-blur px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-blue-400" />
              <span className="font-semibold text-white">Presentation Mode</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Link href="/facility-3d">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <Box className="h-4 w-4 mr-2" />
                  3D Facility
                </Button>
              </Link>
              <Link href="/investor-deck">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <Presentation className="h-4 w-4 mr-2" />
                  Investor Deck
                </Button>
              </Link>
            </nav>
            <div className="h-6 w-px bg-slate-700" />
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              Fullscreen
            </Button>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={isFullscreen ? "h-screen" : "min-h-[calc(100vh-3.5rem)]"}>
        {children}
      </main>

      {/* Fullscreen exit hint */}
      {isFullscreen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 text-slate-300 text-sm px-4 py-2 rounded-full backdrop-blur">
          Press <kbd className="mx-1 px-2 py-0.5 bg-slate-700 rounded">Esc</kbd> to exit fullscreen
        </div>
      )}
    </div>
  )
}
