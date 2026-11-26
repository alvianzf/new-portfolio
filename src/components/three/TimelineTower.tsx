import { Float, RoundedBox } from '@react-three/drei';
import { useAccentColor } from './useAccentColor';

/** A small stack of bars of increasing height — a literal "career timeline" built from real geometry. */
export default function TimelineTower() {
  const accent = useAccentColor('--accent-primary', '#4f46e5');
  const accent2 = useAccentColor('--accent-secondary', '#f59e0b');
  const heights = [0.6, 1.0, 1.5, 2.1, 2.8];
  const colors = [accent, accent, accent2, accent, accent2];

  return (
    <group position={[0, -1.4, 0]}>
      {heights.map((h, i) => (
        <RoundedBox
          key={i}
          args={[0.7, h, 0.7]}
          radius={0.06}
          position={[(i - (heights.length - 1) / 2) * 0.95, h / 2, 0]}
        >
          <meshStandardMaterial color={colors[i]} roughness={0.4} />
        </RoundedBox>
      ))}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 3.4, 0.6]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={accent2} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.8}>
        <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} position={[-2.6, 1.2, -0.8]}>
          <meshStandardMaterial color={accent} roughness={0.5} />
        </RoundedBox>
      </Float>
    </group>
  );
}
