import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ProofCard3D({ mousePosition }) {
  const cardRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cardRef.current) {
      // Lower-right subtle float
      cardRef.current.position.y = -2.1 + Math.sin(t * 0.6 + 2) * 0.08;
      if (mousePosition) {
        cardRef.current.rotation.y = THREE.MathUtils.lerp(
          cardRef.current.rotation.y,
          -0.18 + mousePosition.x * 0.08,
          0.04
        );
      }
    }
  });

  return (
    <group ref={cardRef} position={[4.2, -2.1, -0.4]}>
      {/* 3D Glass Backdrop */}
      <mesh>
        <boxGeometry args={[2.4, 1.3, 0.04]} />
        <meshPhysicalMaterial
          color="#14092b"
          transmission={0.8}
          opacity={0.3}
          transparent
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <Html transform center distanceFactor={9} position={[0, 0, 0.03]}>
        <div className="w-[210px] p-3 rounded-2xl bg-[#130b29]/88 border border-yellow-500/35 backdrop-blur-xl shadow-2xl shadow-purple-950/60 text-slate-100 select-none pointer-events-none">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-yellow-500/20">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[9px] font-bold border border-emerald-500/40">
                ✓
              </span>
              <span className="text-[9px] font-mono uppercase tracking-wider text-yellow-400 font-bold">
                TASK COMPLETED
              </span>
            </div>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-semibold">
              Verified
            </span>
          </div>

          <div className="text-[11px] font-bold text-white leading-tight">
            Implement Authentication
          </div>

          <div className="mt-2 pt-1.5 border-t border-purple-500/20 flex items-center justify-between text-[9px]">
            <span className="text-purple-300">Proof:</span>
            <span className="text-yellow-300 font-semibold flex items-center gap-1 bg-yellow-950/50 px-1.5 py-0.5 rounded border border-yellow-500/30">
              GitHub Commit ✓
            </span>
          </div>
        </div>
      </Html>
    </group>
  );
}
