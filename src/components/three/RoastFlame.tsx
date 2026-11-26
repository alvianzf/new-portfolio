import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';
import { useAccentColor } from './useAccentColor';

interface RoastFlameProps {
  /** Real benefit strings (from the page's own content) labeling the embers — not decoration with no meaning. */
  labels: string[];
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-primary)',
  fontWeight: 600,
  fontSize: 11,
  color: 'var(--text-secondary)',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

/** An elongated, pulsing, distorted flame with a brighter inner core — stylized fire for the "Roast" theme, embers labeled with real benefits. */
export default function RoastFlame({ labels }: RoastFlameProps) {
  const accent2 = useAccentColor('--accent-secondary', '#f59e0b');
  const meshRef = useRef<Mesh>(null);
  const emberPositions: [number, number, number][] = [
    [1.7, 0.8, 0.5],
    [-1.6, -0.4, -0.3],
    [0.3, 1.9, 0.4],
  ];

  useFrame(({ clock }) => {
    const mat = meshRef.current?.material;
    if (mat && 'distort' in mat) {
      (mat as unknown as { distort: number }).distort = 0.3 + Math.sin(clock.elapsedTime * 1.8) * 0.1;
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Elongated body (scaled vertically) so it reads as a flame, not a sphere */}
        <mesh ref={meshRef} scale={[0.85, 1.5, 0.85]}>
          <icosahedronGeometry args={[0.9, 4]} />
          <MeshDistortMaterial color={accent2} roughness={0.2} metalness={0.1} distort={0.3} speed={2.5} />
        </mesh>
        {/* Brighter inner core */}
        <mesh scale={[0.5, 0.9, 0.5]} position={[0, -0.2, 0]}>
          <icosahedronGeometry args={[0.7, 3]} />
          <meshStandardMaterial color="#fde047" emissive="#fde047" emissiveIntensity={0.7} roughness={0.3} />
        </mesh>
      </Float>
      {emberPositions.map((pos, i) => (
        <Float key={i} speed={1.2 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.9}>
          <group position={pos}>
            <mesh>
              <icosahedronGeometry args={[0.16 + i * 0.03, 0]} />
              <meshStandardMaterial color={accent2} roughness={0.3} />
            </mesh>
            {labels[i] && (
              <Html position={[0, -0.35, 0]} center style={labelStyle}>
                {labels[i]}
              </Html>
            )}
          </group>
        </Float>
      ))}
    </group>
  );
}
