"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text, Box, Grid } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Box as BoxIcon, Eye, RotateCcw, ZoomIn } from "lucide-react"

// Simple 3D room component
function SimulationRoom({ position, name, color }: { position: [number, number, number], name: string, color: string }) {
  return (
    <group position={position}>
      {/* Room floor */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 4]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 1.5, -2]} castShadow>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-2, 1.5, 0]} castShadow>
        <boxGeometry args={[0.1, 3, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.4}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

// Control room component
function ControlRoom({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.1, 2]} />
        <meshStandardMaterial color="#dbeafe" />
      </mesh>
      <mesh position={[0, 1, -1]} castShadow>
        <boxGeometry args={[2.5, 2, 0.1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        Control Room
      </Text>
    </group>
  )
}

// Debrief room component
function DebriefRoom({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[5, 0.1, 3]} />
        <meshStandardMaterial color="#dcfce7" />
      </mesh>
      <mesh position={[0, 1.5, -1.5]} castShadow>
        <boxGeometry args={[5, 3, 0.1]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.4}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        Debrief Room
      </Text>
    </group>
  )
}

// Main 3D scene
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[15, 12, 15]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

      {/* Environment */}
      <Environment preset="city" />

      {/* Ground grid */}
      <Grid
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#94a3b8"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#64748b"
        fadeDistance={50}
        position={[0, 0, 0]}
      />

      {/* Simulation rooms */}
      <SimulationRoom position={[-5, 0, 0]} name="Sim Room 1 (ICU)" color="#f87171" />
      <SimulationRoom position={[0, 0, 0]} name="Sim Room 2 (OR)" color="#60a5fa" />
      <SimulationRoom position={[5, 0, 0]} name="Sim Room 3 (L&D)" color="#c084fc" />

      {/* Control room */}
      <ControlRoom position={[-2.5, 0, -5]} />

      {/* Debrief room */}
      <DebriefRoom position={[5, 0, -6]} />

      {/* Floor plan title */}
      <Text
        position={[0, 0.1, 8]}
        fontSize={0.8}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
      >
        Baptist Health Simulation Center - Phase 1
      </Text>
    </>
  )
}

// Loading component
function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white">
        <BoxIcon className="h-12 w-12 mx-auto mb-4 animate-pulse" />
        <p>Loading 3D Scene...</p>
      </div>
    </div>
  )
}

export default function Facility3DPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas shadows className="bg-gradient-to-b from-slate-800 to-slate-900">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset View
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
            <ZoomIn className="h-4 w-4 mr-2" />
            Zoom to Fit
          </Button>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 left-4 bg-slate-800/80 text-white text-sm px-4 py-2 rounded-lg backdrop-blur">
          <p className="font-medium mb-1">Navigation</p>
          <p className="text-slate-300 text-xs">Left-click + drag to rotate</p>
          <p className="text-slate-300 text-xs">Right-click + drag to pan</p>
          <p className="text-slate-300 text-xs">Scroll to zoom</p>
        </div>
      </div>

      {/* Sidebar info panel */}
      <div className="w-80 bg-slate-800 border-l border-slate-700 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Floor Plan Overview</h2>

        <div className="space-y-4">
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-4 w-4 rounded bg-red-400" />
                <span className="text-white font-medium">Sim Room 1 - ICU</span>
              </div>
              <p className="text-slate-300 text-sm">High-fidelity critical care simulation with full monitoring capabilities.</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-500">~350 SF</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-500">Adult Sim</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-4 w-4 rounded bg-blue-400" />
                <span className="text-white font-medium">Sim Room 2 - OR</span>
              </div>
              <p className="text-slate-300 text-sm">Surgical simulation with overhead lighting and sterile field setup.</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-500">~400 SF</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-500">Procedural</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-4 w-4 rounded bg-purple-400" />
                <span className="text-white font-medium">Sim Room 3 - L&D</span>
              </div>
              <p className="text-slate-300 text-sm">Labor & delivery suite with birthing simulator capabilities.</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-500">~350 SF</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-500">OB Sim</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-4 w-4 rounded bg-blue-500" />
                <span className="text-white font-medium">Control Room</span>
              </div>
              <p className="text-slate-300 text-sm">Centralized observation and manikin control station.</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-500">~80 SF</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-500">A/V Hub</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-4 w-4 rounded bg-green-500" />
                <span className="text-white font-medium">Debrief Room</span>
              </div>
              <p className="text-slate-300 text-sm">Post-simulation review with large display for video playback.</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="outline" className="text-slate-300 border-slate-500">~250 SF</Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-500">8-10 seats</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4 border-t border-slate-600">
            <p className="text-slate-400 text-sm">
              <strong className="text-white">Total Phase 1:</strong> ~3,500 SF
            </p>
            <p className="text-slate-400 text-sm mt-1">
              <strong className="text-white">Construction:</strong> $300,000
            </p>
            <p className="text-slate-400 text-sm mt-1">
              <strong className="text-white">Equipment:</strong> $250,000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
