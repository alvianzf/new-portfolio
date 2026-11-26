import { Edges, Float, RoundedBox } from '@react-three/drei';
import { useAccentColor } from './useAccentColor';

/** A wireframe-edged cube with an inner glowing core — a literal "terminal block" for the README/dev-humor tone. */
export default function TerminalCube() {
  const accent = useAccentColor('--accent-primary', '#4f46e5');
  const textPrimary = useAccentColor('--text-primary', '#1c1917');

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.08}>
          <meshStandardMaterial color="#1c1917" roughness={0.6} transparent opacity={0.25} />
          <Edges color={accent} />
        </RoundedBox>
        <mesh>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[1.6, 1.2, -0.5]}>
          <icosahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial color={textPrimary} roughness={0.4} />
        </mesh>
      </Float>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9}>
        <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} position={[-1.7, -0.9, 0.6]}>
          <meshStandardMaterial color={accent} roughness={0.5} />
        </RoundedBox>
      </Float>
    </group>
  );
}
