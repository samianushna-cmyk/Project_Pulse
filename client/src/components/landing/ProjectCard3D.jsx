import React from 'react';
import { Html } from '@react-three/drei';

export default function ProjectCard3D(props) {
  return (
    <group {...props}>
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

          <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
            <span>Campus Connect</span>
            <span className="text-[10px] text-yellow-400 font-normal font-mono">v1.2</span>
          </h4>

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
  );
}
