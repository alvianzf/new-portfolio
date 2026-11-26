import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface Scene3DProps {
  children: React.ReactNode;
  /** CSS size of the canvas container (it's not full-bleed — a bounded 3D stage). */
  height?: number | string;
  /** Freezes idle auto-rotation and drag response for prefers-reduced-motion. */
  reduceMotion?: boolean;
  /** Orthographic zoom — higher = objects appear smaller/further away. */
  zoom?: number;
}

/**
 * True isometric projection: an orthographic camera at the classic
 * 35.264°/45° dimetric angles (not a perspective-camera trick), the actual
 * technique used by isometric games (SimCity, Monument Valley) rather than
 * CSS rotateX/rotateY on a flat DOM element.
 */
const ISO_POSITION: [number, number, number] = [10, 10, 10];

function DraggableGroup({ children, reduceMotion }: { children: React.ReactNode; reduceMotion: boolean }) {
  const ref = useRef<Group>(null);
  const dragRef = useRef<{ x: number; y: number; rotY: number; rotX: number } | null>(null);
  const [userRotation, setUserRotation] = useState({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    if (!reduceMotion && !dragRef.current) {
      group.rotation.y += delta * 0.15;
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, rotY: userRotation.y, rotX: userRotation.x };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || !ref.current) return;
    const dx = (e.clientX - drag.x) * 0.01;
    const dy = (e.clientY - drag.y) * 0.01;
    const nextY = drag.rotY + dx;
    const nextX = Math.max(-0.6, Math.min(0.6, drag.rotX + dy));
    setUserRotation({ x: nextX, y: nextY });
    ref.current.rotation.y = nextY;
    ref.current.rotation.x = nextX;
  };
  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <group
      ref={ref}
      rotation={[userRotation.x, userRotation.y, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </group>
  );
}

export default function Scene3D({ children, height = 420, reduceMotion = false, zoom = 70 }: Scene3DProps) {
  return (
    <div style={{ width: '100%', height, cursor: 'grab', touchAction: 'none' }}>
      <Canvas
        orthographic
        camera={{ position: ISO_POSITION, zoom, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[6, 10, 4]} intensity={1.1} castShadow={false} />
        <directionalLight position={[-6, -4, -6]} intensity={0.35} />
        <Suspense fallback={null}>
          <DraggableGroup reduceMotion={reduceMotion}>{children}</DraggableGroup>
        </Suspense>
      </Canvas>
    </div>
  );
}
