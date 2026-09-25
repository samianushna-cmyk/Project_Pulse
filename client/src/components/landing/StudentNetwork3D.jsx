import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const STUDENTS = [
  { name: 'Alex K.', skill: 'React', pos: [-1.1, 0.4, 0.2], color: '#38bdf8' },
  { name: 'Maya R.', skill: 'Node.js', pos: [0.5, 0.6, -0.2], color: '#34d399' },
  { name: 'Sara L.', skill: 'UI/UX', pos: [-0.6, -0.6, 0.3], color: '#f43f5e' },
  { name: 'Dev P.', skill: 'Database', pos: [0.9, -0.4, -0.1], color: '#fbbf24' },
];

export default function StudentNetwork3D({ mousePosition }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = -1.2 + Math.sin(t * 0.6 + 1) * 0.07;
      if (mousePosition) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          0.08 + mousePosition.x * 0.08,
          0.04
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[-2.8, -1.2, 0.2]}>
      {/* Central Connector Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 4 Connected Student Nodes */}
      {STUDENTS.map((st) => {
        const linePoints = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(st.pos[0], st.pos[1], st.pos[2]),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <group key={st.name}>
            <line geometry={lineGeo}>
              <lineBasicMaterial color="#a78bfa" transparent opacity={0.3} />
            </line>

            {/* Glowing Avatar Sphere Node */}
            <mesh position={st.pos}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial
                color={st.color}
                emissive={st.color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Compact Floating Student Card */}
            <Html transform center distanceFactor={10} position={st.pos}>
              <div className="pointer-events-none select-none px-2 py-1 rounded-xl bg-[#110724]/85 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-950/50 flex items-center gap-1.5 whitespace-nowrap min-w-[85px]">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-950"
                  style={{ backgroundColor: st.color }}
                >
                  {st.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-white leading-none">
                    {st.name}
                  </span>
                  <span className="text-[8px] text-purple-300 leading-none mt-0.5 font-mono">
                    {st.skill}
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
