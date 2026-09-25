import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

// Single tactile module block with rounded edges & custom tactile material
function TactileBlock({ position, size = [1, 1, 1], color, isGlass = false, roughness = 0.85, rotation = [0, 0, 0], label, status, speed = 1, offset = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.08;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.7) * 0.05;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.5) * 0.05;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.12} smoothness={4} castShadow receiveShadow>
        {isGlass ? (
          <meshPhysicalMaterial
            color="#FFFFFF"
            roughness={0.2}
            transmission={0.9}
            thickness={0.8}
            ior={1.45}
            transparent
            opacity={0.88}
            reflectivity={0.2}
            clearcoat={0.1}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={0.05}
            flatShading={false}
          />
        )}
      </RoundedBox>

      {/* Internal Core Light for frosted blocks */}
      {isGlass && (
        <pointLight color="#82957C" intensity={0.4} distance={2} />
      )}

      {/* Subtle Floating Label Badge in 3D Space */}
      {label && (
        <Html position={[0, size[1] / 2 + 0.35, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="pointer-events-none select-none px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#1B1C1A]/10 shadow-tactile flex items-center gap-1.5 whitespace-nowrap">
            <span className={`w-1.5 h-1.5 rounded-full ${status === 'olive' ? 'bg-[#4A5A48]' : status === 'terracotta' ? 'bg-[#C87841]' : 'bg-[#82957C]'} animate-pulse`} />
            <span className="text-[10px] font-bold tracking-tight text-[#1B1C1A]">{label}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Delicate connecting line network in 3D
function ModularConnectors() {
  const points = useMemo(() => [
    [new THREE.Vector3(-1.4, 0.4, 0.2), new THREE.Vector3(0, 0, 0)],
    [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.5, 0.6, -0.2)],
    [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.2, -1.3, 0.4)],
    [new THREE.Vector3(-1.4, 0.4, 0.2), new THREE.Vector3(-0.6, -1.1, -0.3)],
    [new THREE.Vector3(1.5, 0.6, -0.2), new THREE.Vector3(0.8, -1.2, 0.1)],
  ], []);

  const lineGeometries = useMemo(() => {
    return points.map(([start, end]) => {
      const geom = new THREE.BufferGeometry().setFromPoints([start, end]);
      return geom;
    });
  }, [points]);

  return (
    <group>
      {lineGeometries.map((geom, idx) => (
        <line key={idx} geometry={geom}>
          <lineDashedMaterial
            color="#82957C"
            dashSize={0.15}
            gapSize={0.08}
            linewidth={1.5}
            transparent
            opacity={0.5}
          />
        </line>
      ))}
    </group>
  );
}

// Interactive Scene with smooth Cursor Tilt
function InteractiveStageGroup() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Smooth lerp mouse tracking
    const targetX = (state.pointer.x * Math.PI) / 14;
    const targetY = (-state.pointer.y * Math.PI) / 16;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.04);
  });

  return (
    <group ref={groupRef}>
      {/* Central Frosted Glass Core Block */}
      <TactileBlock
        position={[0, 0.05, 0]}
        size={[1.15, 1.15, 1.15]}
        isGlass={true}
        label="Verified Proof Engine"
        status="olive"
        speed={1.0}
        offset={0}
      />

      {/* Primary Matte Olive Block (Left) */}
      <TactileBlock
        position={[-1.35, 0.4, 0.2]}
        size={[0.95, 0.85, 0.95]}
        color="#4A5A48"
        roughness={0.8}
        rotation={[0.08, 0.15, -0.04]}
        label="Skill Matrix: 98%"
        status="olive"
        speed={0.9}
        offset={1.2}
      />

      {/* Terracotta Milestone Block (Right) */}
      <TactileBlock
        position={[1.35, 0.35, -0.2]}
        size={[0.9, 0.95, 0.85]}
        color="#C87841"
        roughness={0.76}
        rotation={[-0.08, -0.2, 0.08]}
        label="Sprint Milestone Met"
        status="terracotta"
        speed={0.85}
        offset={2.4}
      />

      {/* Warm Linen Base Pillar (Bottom Center) */}
      <TactileBlock
        position={[0.1, -1.15, 0.3]}
        size={[1.1, 0.65, 1.0]}
        color="#E8E2D5"
        roughness={0.88}
        rotation={[0.04, 0.08, -0.04]}
        label="Faculty Review: Approved"
        status="olive"
        speed={1.0}
        offset={3.6}
      />

      {/* Secondary Sage Cube (Bottom Left Floating) */}
      <TactileBlock
        position={[-0.95, -1.0, -0.4]}
        size={[0.65, 0.65, 0.65]}
        color="#82957C"
        roughness={0.82}
        rotation={[-0.1, 0.3, 0.15]}
        speed={0.8}
        offset={4.5}
      />

      {/* Mini Terracotta Accent Cube (Right Floating) */}
      <TactileBlock
        position={[1.15, -0.8, 0.35]}
        size={[0.55, 0.55, 0.55]}
        color="#DB8850"
        roughness={0.82}
        rotation={[0.15, -0.1, -0.1]}
        speed={1.1}
        offset={5.2}
      />

      {/* Connecting Beams */}
      <ModularConnectors />
    </group>
  );
}

// Fallback visual if WebGL is unavailable
function Tactile3DFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F3EFE6]/60 rounded-3xl border border-[#1B1C1A]/8">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-2xl bg-[#4A5A48] shadow-tactile-lg transform -rotate-6"></div>
        <div className="absolute w-28 h-28 rounded-2xl bg-[#C87841] shadow-tactile transform rotate-12 opacity-90"></div>
        <div className="absolute w-24 h-24 rounded-2xl bg-white/90 backdrop-blur-md border border-[#1B1C1A]/10 shadow-tactile flex items-center justify-center">
          <span className="text-xs font-bold text-[#1B1C1A]">Verified Proof</span>
        </div>
      </div>
    </div>
  );
}

// Circular Animated Rotating Stamp Badge Component
export function FloatingEditorialStamp({ className = "" }) {
  return (
    <div className={`relative w-24 h-24 sm:w-28 sm:h-28 pointer-events-auto select-none ${className}`}>
      {/* Outer spinning circular text */}
      <div className="w-full h-full animate-spin-slow">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <path
              id="stampCirclePath"
              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text className="text-[9px] font-bold uppercase tracking-[0.24em] fill-[#4A5A48]">
            <textPath href="#stampCirclePath" startOffset="0%">
              PROJECTPULSE • VERIFIED PROOF • COLLABORATION ↗ •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Static Badge with Tactile Emblem */}
      <div className="absolute inset-0 m-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF8F4] border border-[#1B1C1A]/10 shadow-tactile flex items-center justify-center">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#4A5A48] text-[#FAF8F4] flex items-center justify-center text-[11px] sm:text-xs font-serif italic">
          P
        </div>
      </div>
    </div>
  );
}

export default function TactileHero3D() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Tactile3DFallback />;
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px] flex items-center justify-center">
      {/* Tactile Diffuse Radial Glow Behind 3D Stage */}
      <div className="absolute inset-0 bg-radial-warm pointer-events-none rounded-3xl"></div>
      
      {/* Three.js Canvas Stage */}
      <div className="w-full h-full relative z-10">
        <Canvas
          shadows
          camera={{ position: [0, 0, 5.4], fov: 38 }}
          onError={() => setHasError(true)}
          gl={{ antialias: true, alpha: true, toneMappingExposure: 1.1 }}
        >
          {/* Warm Diffuse Studio Lighting (NO harsh specular reflections) */}
          <ambientLight intensity={1.25} color="#FFF9F2" />
          
          {/* Main Key Studio Light */}
          <directionalLight
            position={[4, 5, 4]}
            intensity={1.35}
            color="#FFFFFF"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Soft Sage Fill Light */}
          <directionalLight
            position={[-4, 2, -2]}
            intensity={0.55}
            color="#CFDBCB"
          />

          {/* Warm Terracotta Underlight */}
          <pointLight
            position={[1, -3, 2]}
            intensity={0.7}
            color="#ECCBB5"
            distance={6}
          />

          {/* Floating Interconnected Modular Structure */}
          <InteractiveStageGroup />
        </Canvas>
      </div>

      {/* Floating Tactical Annotation Capsule (Bottom Center/Left) */}
      <div className="absolute -bottom-2 left-6 sm:left-10 z-20 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#1B1C1A]/8 shadow-tactile flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4A5A48] animate-ping" />
        <span className="text-[11px] font-semibold text-[#1B1C1A]">Live Synergy Engine</span>
        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E7EDE5] text-[#3D4C3C] font-bold">ACTIVE</span>
      </div>
    </div>
  );
}
