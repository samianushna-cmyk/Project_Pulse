import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConnectiveDataBeams3D() {
  const pointsRef = useRef();

  const connections = useMemo(() => {
    return [
      { from: [2.0, 0.2, -0.6], to: [4.8, 1.8, -0.6], color: '#d4af37' }, // Core to Skill Match
      { from: [2.0, 0.2, -0.6], to: [0.5, 2.4, -0.8], color: '#f59e0b' }, // Core to University Island
      { from: [2.0, 0.2, -0.6], to: [-2.8, -1.2, 0.2], color: '#8b5cf6' }, // Core to Student Network
      { from: [2.0, 0.2, -0.6], to: [4.2, -2.1, -0.4], color: '#fbbf24' }, // Core to Task Proof
      { from: [-2.8, -1.2, 0.2], to: [0.5, 2.4, -0.8], color: '#a78bfa' }, // Students to University
    ];
  }, []);

  const particleCount = 35;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const connIndex = i % connections.length;
        const conn = connections[connIndex];
        const progress = ((t * 0.35 + i / particleCount) % 1);
        posAttr.setXYZ(
          i,
          THREE.MathUtils.lerp(conn.from[0], conn.to[0], progress),
          THREE.MathUtils.lerp(conn.from[1], conn.to[1], progress),
          THREE.MathUtils.lerp(conn.from[2], conn.to[2], progress)
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Thin Translucent Data Lines */}
      {connections.map((conn, idx) => {
        const linePoints = [
          new THREE.Vector3(...conn.from),
          new THREE.Vector3(...conn.to),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <line key={idx} geometry={lineGeo}>
            <lineBasicMaterial color={conn.color} transparent opacity={0.2} />
          </line>
        );
      })}

      {/* Subtle Flowing Data Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fde047"
          size={0.06}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
