import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function UniversityIsland3D({ mousePosition }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle float above the central core
      groupRef.current.position.y = 2.4 + Math.sin(t * 0.7 + 1.2) * 0.08;
      groupRef.current.position.x = 0.5 + Math.cos(t * 0.5) * 0.05;
      
      if (mousePosition) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          -0.15 + mousePosition.x * 0.1,
          0.04
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0.12 - mousePosition.y * 0.08,
          0.04
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={[0.5, 2.4, -0.8]} scale={0.45}>
      {/* Floating Base Plinth */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[3.2, 0.25, 2.2]} />
        <meshStandardMaterial
          color="#c89659"
          emissive="#78350f"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Steps / Sub-base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.18, 1.8]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#b45309"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Main Building Body */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.4, 1.1, 1.4]} />
        <meshStandardMaterial
          color="#c58f58"
          emissive="#92400e"
          emissiveIntensity={0.25}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Colonnade Pillars */}
      {[-0.9, -0.45, 0, 0.45, 0.9].map((px, i) => (
        <mesh key={i} position={[px, 0.65, 0.75]}>
          <cylinderGeometry args={[0.07, 0.07, 1.05, 12]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Entablature Header */}
      <mesh position={[0, 1.25, 0.4]}>
        <boxGeometry args={[2.6, 0.15, 1.1]} />
        <meshStandardMaterial
          color="#eab308"
          emissive="#b45309"
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Triangular Pediment / Roof */}
      <mesh position={[0, 1.6, 0.4]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.5, 0.6, 4]} />
        <meshStandardMaterial
          color="#c89659"
          emissive="#78350f"
          emissiveIntensity={0.35}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Small Central Academic Dome */}
      <mesh position={[0, 1.5, -0.1]}>
        <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#fde047"
          emissive="#eab308"
          emissiveIntensity={0.5}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Small Glowing Energy Core beneath the island */}
      <mesh position={[0, -0.5, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}
