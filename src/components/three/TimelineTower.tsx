import { Float, Html, RoundedBox } from '@react-three/drei';
import { experiences } from '../../data';
import { useAccentColor } from './useAccentColor';

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-primary)',
  fontWeight: 600,
  fontSize: 10,
  color: 'var(--text-secondary)',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
};

/**
 * A stack of bars — one per real role from data.ts, bar height derived from
 * how much is actually documented for that role (description bullets +
 * tech stack size), each labeled with the real company name. Not 5
 * arbitrary heights picked to look nice.
 */
export default function TimelineTower() {
  const accent = useAccentColor('--accent-primary', '#4f46e5');
  const accent2 = useAccentColor('--accent-secondary', '#f59e0b');
  const roles = experiences.slice(0, 5);
  const heights = roles.map((exp) => {
    const bulletCount = Array.isArray(exp.description) ? exp.description.length : 1;
    const techCount = exp.techStack?.length ?? 0;
    return 0.6 + Math.min(bulletCount * 0.3 + techCount * 0.08, 2.4);
  });
  const colors = roles.map((_, i) => (i % 2 === 0 ? accent : accent2));

  return (
    <group position={[0, -1.4, 0]}>
      {roles.map((exp, i) => {
        const h = heights[i];
        const x = (i - (roles.length - 1) / 2) * 1.0;
        return (
          <group key={exp.company + exp.title} position={[x, 0, 0]}>
            <RoundedBox args={[0.7, h, 0.7]} radius={0.06} position={[0, h / 2, 0]}>
              <meshStandardMaterial color={colors[i]} roughness={0.4} />
            </RoundedBox>
            <Html position={[0, -0.15, 0.4]} center style={labelStyle}>
              {exp.company.split(',')[0].split(' ').slice(0, 2).join(' ')}
            </Html>
          </group>
        );
      })}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, Math.max(...heights) + 0.6, 0.6]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color={accent2} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}
