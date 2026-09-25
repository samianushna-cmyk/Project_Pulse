import React from 'react';
import { Html } from '@react-three/drei';

export default function FacultyFeedback3D(props) {
  return (
    <group {...props}>
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
  );
}
