import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { name: 'React', pos: [0.8, 0.9, 0.2], color: '#38bdf8' },
  { name: 'Node.js', pos: [1.4, 0.3, -0.2], color: '#22c55e' },
  { name: 'MongoDB', pos: [1.1, -0.6, 0.2], color: '#10b981' },
  { name: 'UI/UX', pos: [-0.6, 0.8, -0.1], color: '#f43f5e' },
  { name: 'Git/GitHub', pos: [-0.9, -0.4, 0.2], color: '#f97316' },
  { name: 'Testing', pos: [0.1, -0.9, -0.2], color: '#a855f7' },
];

export default function SkillNetwork3D({ mousePosition }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = 1.8 + Math.sin(t * 0.65 + 0.5) * 0.08;
      if (mousePosition) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          -0.12 + mousePosition.x * 0.08,
          0.04
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[4.8, 1.8, -0.6]}>
      {/* Upper-Right Skill Matching Glass Card */}
      <Html transform center distanceFactor={9} position={[0.2, 0.1, 0]}>
        <div className="w-[230px] p-3.5 rounded-2xl bg-[#120824]/80 border border-purple-500/35 backdrop-blur-xl shadow-2xl shadow-purple-950/60 text-slate-100 select-none pointer-events-none">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-2.5">
            <span className="text-[11px] font-bold tracking-wider text-purple-200 uppercase font-mono">
              Skill Matching
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                Active
              </span>
            </div>
          </div>

          {/* Central Indicator */}
          <div className="flex items-center justify-between bg-purple-950/60 p-2 rounded-xl border border-yellow-500/30 mb-2.5">
            <span className="text-[10px] text-purple-300 font-medium">Platform Match Rate</span>
            <span className="text-xs font-black font-mono text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-500/40">
              92% MATCH
            </span>
          </div>

          {/* Connected Skill Chips */}
          <div className="flex flex-wrap gap-1">
            {SKILLS.map((sk) => (
              <span
                key={sk.name}
                className="text-[9px] px-2 py-0.5 rounded-md bg-purple-950/70 border border-purple-500/30 text-purple-200 font-medium flex items-center gap-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: sk.color }}
                ></span>
                {sk.name}
              </span>
            ))}
          </div>
        </div>
      </Html>

      {/* 3D Geometric Nodes in the Background of the Card */}
      {SKILLS.map((skill) => {
        const linePoints = [
          new THREE.Vector3(0.2, 0.1, 0),
          new THREE.Vector3(skill.pos[0], skill.pos[1], skill.pos[2]),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <group key={skill.name}>
            <line geometry={lineGeo}>
              <lineBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
            </line>
            <mesh position={skill.pos}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
