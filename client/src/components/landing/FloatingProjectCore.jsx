import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingProjectCore({ mousePosition }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const pulseHeartRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const cubesGroupRef = useRef();

  // Generate structured bronze/gold cubes and geometric fragments
  const cubeData = useMemo(() => {
    const items = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + (i % 3) * 0.4;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 1.4) * 0.7 + ((i % 4) - 1.5) * 0.25;
      const z = Math.sin(angle) * radius * 0.85;
      const size = 0.2 + ((i * 7) % 4) * 0.07;
      const isGold = i % 2 === 0;
      items.push({ x, y, z, size, isGold, id: i });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(t * 0.75) * 0.12;
      if (mousePosition) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          t * 0.12 + mousePosition.x * 0.2,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          Math.sin(t * 0.4) * 0.08 - mousePosition.y * 0.15,
          0.05
        );
      } else {
        groupRef.current.rotation.y += delta * 0.12;
      }
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.35;
      innerCoreRef.current.rotation.z += delta * 0.25;
    }

    if (pulseHeartRef.current) {
      const scale = 1 + Math.sin(t * 3.5) * 0.12;
      pulseHeartRef.current.scale.set(scale, scale, scale);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.2;
      ringRef1.current.rotation.x += delta * 0.1;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.22;
      ringRef2.current.rotation.z += delta * 0.15;
    }

    if (cubesGroupRef.current) {
      cubesGroupRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2.0, 0.2, -0.6]} scale={1.05}>
      {/* Central Glowing Pulse Heart Element */}
      <mesh ref={pulseHeartRef}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#fde047"
          emissive="#eab308"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Translucent Purple Crystal Octahedron Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[1.25, 0]} />
        <meshPhysicalMaterial
          color="#a855f7"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.6}
          transmission={0.65}
          thickness={1.4}
          clearcoat={1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Outer Wireframe Tech Lattice */}
      <mesh scale={1.38}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Gold & Violet Tech Rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating Bronze and Gold Cubes */}
      <group ref={cubesGroupRef}>
        {cubeData.map((item) => (
          <mesh
            key={item.id}
            position={[item.x, item.y, item.z]}
            rotation={[item.id, item.id * 0.6, 0]}
          >
            <boxGeometry args={[item.size, item.size, item.size]} />
            <meshStandardMaterial
              color={item.isGold ? '#eab308' : '#b45309'}
              emissive={item.isGold ? '#d4af37' : '#78350f'}
              emissiveIntensity={0.35}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Point Lights Illuminating Core */}
      <pointLight color="#fbbf24" intensity={2.8} distance={7} decay={2} />
      <pointLight color="#a855f7" intensity={2.2} distance={9} decay={2} position={[0, -1, 0]} />
    </group>
  );
}
