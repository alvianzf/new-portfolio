import { Float, Html, RoundedBox, useTexture } from '@react-three/drei';
import { useAccentColor } from './useAccentColor';

interface HeroSceneProps {
  portraitSrc: string;
  /** Real skill names (from data.ts) rendered as labeled floating tiles — not arbitrary shapes. */
  skillLabels: string[];
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 600,
  fontSize: 13,
  color: '#fff',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

/**
 * The hero's actual visual: a small isometric desk diorama. The floating
 * tiles aren't arbitrary colored cubes — each one is labeled with a real
 * skill from data.ts, so the 3D scene carries the same information the old
 * flat skills list did, instead of being decoration with no content.
 */
export default function HeroScene({ portraitSrc, skillLabels }: HeroSceneProps) {
  const accent = useAccentColor('--accent-primary', '#4f46e5');
  const accent2 = useAccentColor('--accent-secondary', '#f59e0b');
  const texture = useTexture(portraitSrc);

  const positions: [number, number, number][] = [
    [2.7, 2.6, -1],
    [-2.9, 1.7, 1.3],
    [0.5, 3.1, 1.7],
    [-1.6, 3.4, -1.2],
  ];
  const tileColors = [accent2, '#1e293b', accent, accent2];

  return (
    <group position={[0, -1.2, 0]}>
      {/* Desk surface */}
      <RoundedBox args={[6.5, 0.3, 4]} radius={0.08} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e7e5e4" roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[6.5, 2.2, 4]} radius={0.08} position={[0, -1.25, 0]}>
        <meshStandardMaterial color="#d6d3d1" roughness={1} />
      </RoundedBox>

      {/* Monitor */}
      <group position={[-1.6, 1.0, -0.6]}>
        <RoundedBox args={[2.4, 1.5, 0.12]} radius={0.05} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[2.1, 1.2]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} />
        </mesh>
        <Html position={[0, 0, 0.08]} center style={{ ...labelStyle, fontSize: 11, opacity: 0.85 }}>
          {'</>'}
        </Html>
        <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.05} position={[0, -1.05, 0]}>
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </RoundedBox>
      </group>

      {/* Keyboard */}
      <RoundedBox args={[1.6, 0.1, 0.7]} radius={0.04} position={[-1.6, 0.2, 0.9]}>
        <meshStandardMaterial color="#44403c" roughness={0.6} />
      </RoundedBox>

      {/* Floating portrait card — a real photo-textured plane with 3D thickness */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <group position={[1.9, 1.3, 0.4]} rotation={[0, -0.35, 0.05]}>
          <RoundedBox args={[2.1, 2.6, 0.18]} radius={0.1} position={[0, 0, -0.1]}>
            <meshStandardMaterial color={accent} roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[1.9, 2.4]} />
            <meshStandardMaterial map={texture} />
          </mesh>
        </group>
      </Float>

      {/* Skill tiles — each one is a real skill name, not an arbitrary shape */}
      {skillLabels.map((label, i) => (
        <Float key={label} speed={1.3 + i * 0.2} rotationIntensity={0.4} floatIntensity={0.9}>
          <group position={positions[i % positions.length]}>
            <RoundedBox args={[1.1, 0.5, 0.2]} radius={0.08}>
              <meshStandardMaterial color={tileColors[i % tileColors.length]} roughness={0.4} />
            </RoundedBox>
            <Html position={[0, 0, 0.11]} center style={labelStyle}>
              {label}
            </Html>
          </group>
        </Float>
      ))}
    </group>
  );
}
