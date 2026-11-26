import { Float, RoundedBox, useTexture } from '@react-three/drei';
import { useAccentColor } from './useAccentColor';

interface HeroSceneProps {
  portraitSrc: string;
}

/**
 * The hero's actual visual: a small isometric desk diorama built from real
 * 3D geometry (not a DOM card with a CSS tilt) — a desk, a monitor with a
 * glowing screen, the portrait rendered as a floating photo-textured card
 * with real thickness, and a few bobbing accent blocks. Draggable/rotatable
 * via Scene3D's orbit handling.
 */
export default function HeroScene({ portraitSrc }: HeroSceneProps) {
  const accent = useAccentColor('--accent-primary', '#990000');
  const accent2 = useAccentColor('--accent-secondary', '#7f1d1d');
  const texture = useTexture(portraitSrc);

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

      {/* Bobbing accent blocks */}
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.1}>
        <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.08} position={[2.6, 2.6, -1]}>
          <meshStandardMaterial color={accent2} roughness={0.4} />
        </RoundedBox>
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.9}>
        <RoundedBox args={[0.35, 0.35, 0.35]} radius={0.06} position={[-2.9, 1.6, 1.4]}>
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </RoundedBox>
      </Float>
      <Float speed={1.9} rotationIntensity={0.5} floatIntensity={1.3}>
        <mesh position={[0.6, 2.9, 1.6]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={accent} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
