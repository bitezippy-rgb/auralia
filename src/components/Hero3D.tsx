import React, { useRef, useState, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Sparkles as SparklesIcon, Calendar, ArrowDown, Compass, Award } from 'lucide-react';

// Error boundary to gracefully catch any WebGL failure
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL Rendering fallback active:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600/30 via-orange-500/20 to-amber-200/10 blur-3xl animate-pulse" />
          <div className="absolute w-60 h-60 rounded-full border border-amber-500/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="w-48 h-48 rounded-full border border-dashed border-amber-300/40" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Procedural 3D Centerpiece: Culinary Torus & Orbiting Gastronomy Spheres
interface CenterpieceProps {
  themeColor: string;
  wireframe: boolean;
  roughness: number;
}

function CulinaryCenterpiece({ themeColor, wireframe, roughness }: CenterpieceProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const orbitGroupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    // Parallax mouse tracking with smooth lerp
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY + state.clock.elapsedTime * 0.25, 0.04);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX + state.clock.elapsedTime * 0.35, 0.04);
      meshRef.current.rotation.z += delta * 0.1;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y -= delta * 0.4;
      orbitGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Main Avant-Garde Torus Knot Structure */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.2, 0.36, 160, 36, 2, 3]} />
          <MeshDistortMaterial
            color={themeColor}
            emissive={themeColor}
            emissiveIntensity={0.25}
            distort={0.16}
            speed={1.5}
            roughness={roughness}
            metalness={0.92}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            wireframe={wireframe}
          />
        </mesh>
      </Float>

      {/* Orbiting flavor spheres representing micro-gastronomic celestial spheres */}
      <group ref={orbitGroupRef}>
        {[
          { pos: [2.3, 0.6, 0] as [number, number, number], scale: 0.18, color: '#f59e0b' },
          { pos: [-2.1, -0.8, 0.5] as [number, number, number], scale: 0.14, color: '#fbbf24' },
          { pos: [0.8, 2.0, -0.6] as [number, number, number], scale: 0.12, color: '#fef08a' },
          { pos: [-1.2, 1.8, 1.0] as [number, number, number], scale: 0.16, color: '#d97706' },
          { pos: [1.6, -1.7, -0.8] as [number, number, number], scale: 0.15, color: '#f59e0b' },
        ].map((sphere, index) => (
          <mesh key={index} position={sphere.pos}>
            <sphereGeometry args={[sphere.scale, 32, 32]} />
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* Subtle sparkling ambient particles */}
      <Sparkles count={45} scale={6} size={2.5} speed={0.4} opacity={0.6} color={themeColor} />

      {/* Soft Contact Floor Shadow */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.45} scale={8} blur={2.4} far={4} color="#000000" />
    </group>
  );
}

export default function Hero3D() {
  const [themeMode, setThemeMode] = useState<'gold' | 'obsidian' | 'emerald'>('gold');
  const [isWireframe, setIsWireframe] = useState(false);

  const themeConfig = {
    gold: {
      name: 'Solstice Amber',
      color: '#d97706',
      accentGlow: 'from-amber-500/20 via-orange-500/10 to-transparent',
      roughness: 0.18,
    },
    obsidian: {
      name: 'Smoked Truffle',
      color: '#475569',
      accentGlow: 'from-slate-500/20 via-zinc-600/10 to-transparent',
      roughness: 0.45,
    },
    emerald: {
      name: 'Matcha Herbarium',
      color: '#059669',
      accentGlow: 'from-emerald-500/20 via-teal-600/10 to-transparent',
      roughness: 0.22,
    },
  };

  const currentTheme = themeConfig[themeMode];

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#08080a] pt-24 pb-16">
      {/* Background Ambient Lighting & Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr ${currentTheme.accentGlow} blur-[120px] transition-all duration-1000 opacity-60`} />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-950/15 blur-[100px]" />
      </div>

      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary>
          <Canvas
            shadows
            camera={{ position: [0, 0, 5.2], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[6, 8, 6]} intensity={1.8} castShadow shadow-mapSize={1024} color="#fffbeb" />
            <pointLight position={[-5, -3, -2]} intensity={1.2} color={currentTheme.color} />
            <spotLight position={[0, 6, 2]} intensity={1.4} angle={0.6} penumbra={0.8} color="#fef08a" />
            <Suspense fallback={null}>
              <CulinaryCenterpiece
                themeColor={currentTheme.color}
                wireframe={isWireframe}
                roughness={currentTheme.roughness}
              />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* Floating 2D Foreground Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pointer-events-none">
        
        {/* Subtle Accolade Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-950/30 backdrop-blur-md mb-6 pointer-events-auto shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-200/90 font-medium">
            3 Michelin Stars · World 50 Best Gastronomy
          </span>
        </motion.div>

        {/* Main Restaurant Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-3 max-w-4xl"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.18em] text-white uppercase drop-shadow-2xl">
            A U R E L I A
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-stone-300 font-light tracking-[0.1em] max-w-2xl mx-auto drop-shadow-md">
            Where Haute Modern Gastronomy Meets Spatial Kinetic Architecture
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <a
            href="#reservation"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-stone-900 transition-transform group-hover:rotate-12" />
            <span>Book a Table</span>
          </a>

          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-stone-900/70 hover:bg-stone-800/80 border border-stone-700/60 hover:border-amber-400/40 text-stone-200 text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Explore Tasting Menu</span>
          </a>
        </motion.div>

        {/* 3D Interaction HUD Controls (Switch Theme & Wireframe) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 pointer-events-auto flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-stone-950/60 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mr-2">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wider uppercase text-[11px]">3D Essence:</span>
          </div>

          {(['gold', 'obsidian', 'emerald'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setThemeMode(mode)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 capitalize ${
                themeMode === mode
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {mode}
            </button>
          ))}

          <div className="w-[1px] h-4 bg-white/15 mx-1" />

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              isWireframe
                ? 'bg-white/20 text-white border border-white/30'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {isWireframe ? 'Wireframe On' : 'Wireframe'}
          </button>
        </motion.div>

        {/* Interactive Mouse Hint & Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-2 pointer-events-auto"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-light">
            Move mouse to interact with 3D Centerpiece
          </span>
          <a
            href="#experience"
            className="text-stone-500 hover:text-amber-400 transition-colors p-2 animate-bounce"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
