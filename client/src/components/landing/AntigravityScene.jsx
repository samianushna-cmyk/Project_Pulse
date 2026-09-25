import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingProjectCore from './FloatingProjectCore';
import UniversityIsland3D from './UniversityIsland3D';
import SkillNetwork3D from './SkillNetwork3D';
import StudentNetwork3D from './StudentNetwork3D';
import ProofCard3D from './ProofCard3D';
import ConnectiveDataBeams3D from './ConnectiveDataBeams3D';
import CrystalPlatform3D from './CrystalPlatform3D';
import SpaceParticles3D from './SpaceParticles3D';

function SceneContent({ mousePosition, isMobile }) {
  return (
    <>
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.7} color="#c084fc" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={2.0}
        color="#fbbf24"
        castShadow={false}
      />
      <directionalLight
        position={[-8, -4, 4]}
        intensity={1.6}
        color="#a855f7"
      />
      <pointLight position={[2, 2, 2]} intensity={1.8} color="#fde047" distance={10} />

      {/* Zero Gravity Particles */}
      <SpaceParticles3D count={isMobile ? 60 : 160} />

      {/* Central Collaboration Forge Core */}
      <FloatingProjectCore mousePosition={mousePosition} />

      {/* Floating University Island (Upper-Middle) */}
      <UniversityIsland3D mousePosition={mousePosition} />

      {/* Desktop / Tablet Extended Elements */}
      {!isMobile && (
        <>
          {/* Skill Matching Panel (Upper-Right) */}
          <SkillNetwork3D mousePosition={mousePosition} />

          {/* Student Squad Network (Lower-Middle / Left) */}
          <StudentNetwork3D mousePosition={mousePosition} />

          {/* Task / Proof Card (Lower-Right) */}
          <ProofCard3D mousePosition={mousePosition} />

          {/* Data Lines & Beams */}
          <ConnectiveDataBeams3D />

          {/* Bottom Crystal Base Platform */}
          <CrystalPlatform3D />
        </>
      )}

      {isMobile && (
        <group scale={0.7} position={[0, -0.5, 0]}>
          <CrystalPlatform3D />
        </group>
      )}
    </>
  );
}

export default function AntigravityScene({ className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 pointer-events-auto w-full h-full overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #15092a 0%, #0d061c 50%, #07030f 100%)',
      }}
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/6 w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[300px] bg-indigo-600/10 blur-[110px] rounded-full pointer-events-none -z-10"></div>

      <Canvas
        camera={{
          position: [0, 0, isMobile ? 11 : 8.8],
          fov: 46,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <SceneContent mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
