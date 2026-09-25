import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function HolographicPanels3D({ mousePosition }) {
  const projectCardRef = useRef();
  const proofCardRef = useRef();
  const facultyCardRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Floating Project Card (Upper Left / Center-left at medium depth)
    if (projectCardRef.current) {
      projectCardRef.current.position.y = 1.6 + Math.sin(t * 0.75) * 0.12;
      projectCardRef.current.position.x = -3.8 + Math.cos(t * 0.5) * 0.08;
      if (mousePosition) {
        projectCardRef.current.rotation.y = THREE.MathUtils.lerp(
          projectCardRef.current.rotation.y,
          0.18 + mousePosition.x * 0.1,
          0.05
        );
        projectCardRef.current.rotation.x = THREE.MathUtils.lerp(
          projectCardRef.current.rotation.x,
          -0.08 - mousePosition.y * 0.08,
          0.05
        );
      }
    }

    // 2. Floating Proof of Work Card (Lower Right at near-medium depth)
    if (proofCardRef.current) {
      proofCardRef.current.position.y = -1.6 + Math.sin(t * 0.65 + 1.5) * 0.14;
      proofCardRef.current.position.x = 3.6 + Math.cos(t * 0.55) * 0.08;
      if (mousePosition) {
        proofCardRef.current.rotation.y = THREE.MathUtils.lerp(
          proofCardRef.current.rotation.y,
          -0.2 + mousePosition.x * 0.1,
          0.05
        );
        proofCardRef.current.rotation.x = THREE.MathUtils.lerp(
          proofCardRef.current.rotation.x,
          0.05 - mousePosition.y * 0.08,
          0.05
        );
      }
    }

    // 3. Floating Faculty Guidance Card (Far Lower Left at deeper depth)
    if (facultyCardRef.current) {
      facultyCardRef.current.position.y = -2.2 + Math.sin(t * 0.7 + 3) * 0.1;
      facultyCardRef.current.position.x = -1.8 + Math.sin(t * 0.45) * 0.06;
      if (mousePosition) {
        facultyCardRef.current.rotation.y = THREE.MathUtils.lerp(
          facultyCardRef.current.rotation.y,
          0.05 + mousePosition.x * 0.08,
          0.05
        );
      }
    }
  });

  return (
    <group>
      {/* 1. HOLOGRAPHIC PROJECT CARD */}
      <group ref={projectCardRef} position={[-3.8, 1.6, 0.5]}>
        {/* Subtle 3D Glass Slab Backdrop */}
        <mesh>
          <boxGeometry args={[3.2, 2.0, 0.05]} />
          <meshPhysicalMaterial
            color="#14092b"
            transmission={0.8}
            opacity={0.3}
            transparent
            roughness={0.2}
            metalness={0.1}
            clearcoat={1}
          />
        </mesh>

        <Html transform center distanceFactor={8} position={[0, 0, 0.04]}>
          <div className="w-[280px] p-4 rounded-2xl bg-[#120924]/85 border border-purple-500/30 backdrop-blur-xl shadow-2xl text-slate-100 select-none pointer-events-none">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-2.5 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                  PROJECT ACTIVE
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/30">
                Team 4 / 5
              </span>
            </div>

            {/* Project Title */}
            <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
              <span>Campus Connect</span>
              <span className="text-[10px] text-yellow-400 font-normal font-mono">v1.2</span>
            </h4>

            {/* Required Skills Badges */}
            <div className="mt-2.5">
              <div className="text-[9px] uppercase tracking-wider text-purple-300 font-semibold mb-1">
                Required Tech Stack
              </div>
              <div className="flex flex-wrap gap-1">
                {['React', 'Node.js', 'MongoDB', 'UI/UX'].map((sk) => (
                  <span
                    key={sk}
                    className="text-[9px] px-2 py-0.5 rounded-md bg-purple-950/70 border border-purple-500/30 text-purple-200 font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 pt-2.5 border-t border-purple-500/20 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-medium">Milestone Progress</span>
              <span className="text-emerald-400 font-bold font-mono">78%</span>
            </div>
            <div className="w-full bg-purple-950/60 rounded-full h-1.5 mt-1 overflow-hidden border border-purple-500/20">
              <div
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-full rounded-full"
                style={{ width: '78%' }}
              ></div>
            </div>
          </div>
        </Html>
      </group>

      {/* 2. TASK & PROOF OF WORK CARD */}
      <group ref={proofCardRef} position={[3.6, -1.6, 0.8]}>
        <mesh>
          <boxGeometry args={[3.0, 1.8, 0.05]} />
          <meshPhysicalMaterial
            color="#14092b"
            transmission={0.8}
            opacity={0.3}
            transparent
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        <Html transform center distanceFactor={8} position={[0, 0, 0.04]}>
          <div className="w-[260px] p-3.5 rounded-2xl bg-[#130b29]/88 border border-yellow-500/35 backdrop-blur-xl shadow-2xl text-slate-100 select-none pointer-events-none">
            {/* Task Completed Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-yellow-500/20">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/40">
                  ✓
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-yellow-400 font-bold">
                  TASK COMPLETED
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold">
                Verified
              </span>
            </div>

            <div className="text-xs font-bold text-white leading-tight">
              Implement Authentication
            </div>
            <p className="text-[10px] text-slate-300 mt-1 leading-snug">
              JWT auth tokens & protected role routing.
            </p>

            {/* Proof Submission Badge */}
            <div className="mt-2.5 pt-2 border-t border-purple-500/20 flex items-center justify-between text-[10px]">
              <span className="text-purple-300">Submitted Proof:</span>
              <span className="text-yellow-300 font-semibold flex items-center gap-1 bg-yellow-950/50 px-2 py-0.5 rounded border border-yellow-500/30">
                GitHub Commit ✓
              </span>
            </div>
          </div>
        </Html>
      </group>

      {/* 3. FACULTY GUIDANCE CARD */}
      <group ref={facultyCardRef} position={[-1.8, -2.4, -0.2]}>
        <mesh>
          <boxGeometry args={[3.2, 1.6, 0.05]} />
          <meshPhysicalMaterial
            color="#14092b"
            transmission={0.8}
            opacity={0.3}
            transparent
            roughness={0.2}
          />
        </mesh>

        <Html transform center distanceFactor={8.5} position={[0, 0, 0.04]}>
          <div className="w-[270px] p-3 rounded-2xl bg-[#150a2e]/90 border border-purple-400/30 backdrop-blur-xl shadow-2xl text-slate-100 select-none pointer-events-none">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-purple-400/20">
              <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-300 font-bold">
                FACULTY FEEDBACK
              </span>
              <span className="text-yellow-400 text-xs font-bold tracking-widest">
                ★★★★★
              </span>
            </div>
            <p className="text-[10px] text-purple-100 italic leading-snug">
              "Great progress on backend integration. Consider improving API error validation before final review."
            </p>
            <div className="mt-2 flex items-center justify-between text-[9px] text-slate-400 font-medium">
              <span>Dr. Aris Thorne (Guide)</span>
              <span className="text-emerald-400 font-mono">Approved</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
