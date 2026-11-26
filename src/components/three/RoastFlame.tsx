import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';
import { useAccentColor } from './useAccentColor';

/** A gently pulsing, distorted icosahedron — a stylized flame for the "Roast" theme. */
export default function RoastFlame() {
  const accent2 = useAccentColor('--accent-secondary', '#f59e0b');
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const mat = meshRef.current?.material;
    if (mat && 'distort' in mat) {
      (mat as unknown as { distort: number }).distort = 0.35 + Math.sin(clock.elapsedTime * 1.5) * 0.12;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.1, 4]} />
          <MeshDistortMaterial color={accent2} roughness={0.25} metalness={0.1} distort={0.35} speed={2} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1.6, 1.1, 0.5]}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color={accent2} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[-1.5, -0.8, -0.3]}>
          <icosahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={accent2} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
