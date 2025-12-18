"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight, HelpCircle, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

// =============================================================================
// TYPES
// =============================================================================

export interface WalkthroughStep {
  id: string
  target: string // CSS selector for the element to highlight
  title: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
  page?: string // Optional: only show on specific page
}

export interface WalkthroughTour {
  id: string
  name: string
  description: string
  steps: WalkthroughStep[]
}

interface WalkthroughContextType {
  isActive: boolean
  currentTour: WalkthroughTour | null
  currentStepIndex: number
  startTour: (tour: WalkthroughTour) => void
  endTour: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
}

// =============================================================================
// CONTEXT
// =============================================================================

const WalkthroughContext = createContext<WalkthroughContextType | null>(null)

export function useWalkthrough() {
  const context = useContext(WalkthroughContext)
  if (!context) {
    throw new Error('useWalkthrough must be used within a WalkthroughProvider')
  }
  return context
}

// =============================================================================
// SPOTLIGHT OVERLAY
// =============================================================================

interface SpotlightProps {
  step: WalkthroughStep
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  currentIndex: number
  totalSteps: number
}

function Spotlight({ step, onNext, onPrev, onClose, currentIndex, totalSteps }: SpotlightProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const element = document.querySelector(step.target)
      if (element) {
        const rect = element.getBoundingClientRect()
        setTargetRect(rect)

        // Calculate tooltip position based on step.position
        const padding = 16
        const tooltipWidth = 320
        const tooltipHeight = 200 // approximate

        let top = 0
        let left = 0

        switch (step.position) {
          case 'top':
            top = rect.top - tooltipHeight - padding
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case 'bottom':
            top = rect.bottom + padding
            left = rect.left + rect.width / 2 - tooltipWidth / 2
            break
          case 'left':
            top = rect.top + rect.height / 2 - tooltipHeight / 2
            left = rect.left - tooltipWidth - padding
            break
          case 'right':
            top = rect.top + rect.height / 2 - tooltipHeight / 2
            left = rect.right + padding
            break
        }

        // Keep tooltip in viewport
        if (left < padding) left = padding
        if (left + tooltipWidth > window.innerWidth - padding) {
          left = window.innerWidth - tooltipWidth - padding
        }
        if (top < padding) top = padding
        if (top + tooltipHeight > window.innerHeight - padding) {
          top = window.innerHeight - tooltipHeight - padding
        }

        setTooltipPosition({ top, left })

        // Scroll element into view if needed
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition)
    }
  }, [step])

  if (!targetRect) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - 8}
              y={targetRect.top - 8}
              width={targetRect.width + 16}
              height={targetRect.height + 16}
              rx="8"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.75)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Highlight border around target */}
      <div
        className="absolute border-2 border-blue-500 rounded-lg pointer-events-none animate-pulse"
        style={{
          top: targetRect.top - 8,
          left: targetRect.left - 8,
          width: targetRect.width + 16,
          height: targetRect.height + 16,
        }}
      />

      {/* Tooltip bubble */}
      <div
        className="absolute w-80 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4"
        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
      >
        {/* Arrow pointer */}
        <div
          className={`absolute w-4 h-4 bg-slate-800 border-slate-600 transform rotate-45 ${
            step.position === 'top' ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-r border-b' :
            step.position === 'bottom' ? 'top-[-8px] left-1/2 -translate-x-1/2 border-l border-t' :
            step.position === 'left' ? 'right-[-8px] top-1/2 -translate-y-1/2 border-t border-r' :
            'left-[-8px] top-1/2 -translate-y-1/2 border-b border-l'
          }`}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <X className="h-4 w-4 text-slate-400" />
        </button>

        {/* Step counter */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-400 font-medium">
            Step {currentIndex + 1} of {totalSteps}
          </span>
          <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">{step.content}</p>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          <Button
            size="sm"
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentIndex === totalSteps - 1 ? 'Finish' : 'Next'}
            {currentIndex < totalSteps - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

interface WalkthroughProviderProps {
  children: React.ReactNode
}

export function WalkthroughProvider({ children }: WalkthroughProviderProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentTour, setCurrentTour] = useState<WalkthroughTour | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const startTour = useCallback((tour: WalkthroughTour) => {
    setCurrentTour(tour)
    setCurrentStepIndex(0)
    setIsActive(true)
  }, [])

  const endTour = useCallback(() => {
    setIsActive(false)
    setCurrentTour(null)
    setCurrentStepIndex(0)
  }, [])

  const nextStep = useCallback(() => {
    if (currentTour && currentStepIndex < currentTour.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      endTour()
    }
  }, [currentTour, currentStepIndex, endTour])

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }, [currentStepIndex])

  const goToStep = useCallback((index: number) => {
    if (currentTour && index >= 0 && index < currentTour.steps.length) {
      setCurrentStepIndex(index)
    }
  }, [currentTour])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        endTour()
      }
      if (e.key === 'ArrowRight' && isActive) {
        nextStep()
      }
      if (e.key === 'ArrowLeft' && isActive) {
        prevStep()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, endTour, nextStep, prevStep])

  const currentStep = currentTour?.steps[currentStepIndex]

  return (
    <WalkthroughContext.Provider
      value={{
        isActive,
        currentTour,
        currentStepIndex,
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
      {isActive && currentStep && currentTour && (
        <Spotlight
          step={currentStep}
          onNext={nextStep}
          onPrev={prevStep}
          onClose={endTour}
          currentIndex={currentStepIndex}
          totalSteps={currentTour.steps.length}
        />
      )}
    </WalkthroughContext.Provider>
  )
}

// =============================================================================
// TOUR LAUNCHER BUTTON
// =============================================================================

interface TourLauncherProps {
  tour: WalkthroughTour
  className?: string
}

export function TourLauncher({ tour, className }: TourLauncherProps) {
  const { startTour, isActive } = useWalkthrough()

  if (isActive) return null

  return (
    <Button
      onClick={() => startTour(tour)}
      className={`fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg ${className}`}
      size="lg"
    >
      <HelpCircle className="h-5 w-5 mr-2" />
      Take a Tour
    </Button>
  )
}

// =============================================================================
// INLINE TOUR START BUTTON
// =============================================================================

interface StartTourButtonProps {
  tour: WalkthroughTour
  children?: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function StartTourButton({ tour, children, className, variant = 'default' }: StartTourButtonProps) {
  const { startTour } = useWalkthrough()

  return (
    <Button
      onClick={() => startTour(tour)}
      variant={variant}
      className={className}
    >
      <Play className="h-4 w-4 mr-2" />
      {children || 'Start Tour'}
    </Button>
  )
}
