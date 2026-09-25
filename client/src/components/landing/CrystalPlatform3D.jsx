import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CrystalPlatform3D() {
  const platformRef = useRef();

  // Fractured crystal platform polygons
  const shards = useMemo(() => {
    const list = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist = 3.5 + (i % 3) * 0.8;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist * 0.8 - 1;
      const y = -3.8 + ((i % 4) - 2) * 0.15;
      const scaleX = 1.2 + (i % 3) * 0.4;
      const scaleZ = 1.0 + ((i + 1) % 3) * 0.3;
      list.push({ x, y, z, scaleX, scaleZ, id: i });
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (platformRef.current) {
      platformRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={platformRef} position={[0, 0, 0]}>
      {/* Central Hexagonal Base Platform */}
      <mesh position={[0, -4.0, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[4.2, 4.8, 0.25, 6]} />
        <meshStandardMaterial
          color="#0f0721"
          emissive="#2e1065"
          emissiveIntensity={0.25}
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Glowing Border Ring on Base Platform */}
      <mesh position={[0, -3.86, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.1, 4.25, 6]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Fractured Digital Shards Floating at the Base */}
      {shards.map((s) => (
        <mesh
          key={s.id}
          position={[s.x, s.y, s.z]}
          rotation={[-Math.PI / 2 + 0.1, 0, s.id * 0.5]}
          scale={[s.scaleX, s.scaleZ, 0.1]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#190d33"
            emissive="#581c87"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}

      {/* Subtle Bottom Grid Helper */}
      <gridHelper
        args={[24, 24, '#581c87', '#1e1138']}
        position={[0, -4.2, -1]}
      />
    </group>
  );
}
