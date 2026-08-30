import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { ExtrudeGeometry, MathUtils, Shape } from "three";

/**
 * HERO 3D — DIGITAL IDENTITY
 * "DK" monogram built from real extruded letterform outlines (not stacked primitives),
 * so the letters read correctly: glass "D" + chrome "K" inside a thin technical frame.
 */

const GLASS = {
  color: "#a8daff",
  transmission: 0.62,
  thickness: 1.4,
  roughness: 0.05,
  metalness: 0.08,
  ior: 1.45,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  emissive: "#0a4ea8",
  emissiveIntensity: 0.45,
} as const;

const CHROME = {
  color: "#d9ecff",
  roughness: 0.16,
  metalness: 0.95,
  clearcoat: 1,
  clearcoatRoughness: 0.06,
  emissive: "#0b3f8f",
  emissiveIntensity: 0.3,
} as const;

const EXTRUDE = {
  depth: 0.42,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.045,
  bevelSegments: 4,
  curveSegments: 24,
} as const;

/** Letter "D" outline with counter (hole). */
function makeD() {
  const s = new Shape();
  s.moveTo(0, -1);
  s.lineTo(0.5, -1);
  s.bezierCurveTo(1.16, -1, 1.34, -0.58, 1.34, 0);
  s.bezierCurveTo(1.34, 0.58, 1.16, 1, 0.5, 1);
  s.lineTo(0, 1);
  s.lineTo(0, -1);

  const hole = new Shape();
  hole.moveTo(0.32, -0.68);
  hole.lineTo(0.5, -0.68);
  hole.bezierCurveTo(0.9, -0.68, 1.0, -0.4, 1.0, 0);
  hole.bezierCurveTo(1.0, 0.4, 0.9, 0.68, 0.5, 0.68);
  hole.lineTo(0.32, 0.68);
  hole.lineTo(0.32, -0.68);
  s.holes.push(hole);
  return s;
}

/** Letter "K" outline as a single closed path. */
function makeK() {
  const s = new Shape();
  const pts: [number, number][] = [
    [0, -1], [0.32, -1], [0.32, -0.16], [1.0, -1], [1.42, -1],
    [0.63, -0.02], [1.46, 1], [1.04, 1], [0.32, 0.12], [0.32, 1], [0, 1],
  ];
  const first = pts[0]!;
  s.moveTo(first[0], first[1]);
  pts.slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.closePath();
  return s;
}

function Monogram({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const frame = useRef<Group>(null);

  const [dGeo, kGeo] = useMemo(() => {
    const d = new ExtrudeGeometry(makeD(), EXTRUDE);
    const k = new ExtrudeGeometry(makeK(), EXTRUDE);
    d.center();
    k.center();
    return [d, k] as const;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetY = reduced ? -0.16 : state.pointer.x * 0.3 + Math.sin(t * 0.16) * 0.14;
    const targetX = reduced ? 0.05 : -state.pointer.y * 0.16 + Math.sin(t * 0.21) * 0.04;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 2.4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetX, 2.4, delta);
    if (frame.current && !reduced) frame.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={reduced ? 0 : 0.9} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.4}>
      <group ref={group} scale={1.06}>
        <mesh geometry={dGeo} position={[-0.95, 0, 0]}>
          <meshPhysicalMaterial {...GLASS} />
        </mesh>
        <mesh geometry={kGeo} position={[0.95, 0, 0]}>
          <meshPhysicalMaterial {...CHROME} />
        </mesh>

        {/* thin technical frame */}
        <group ref={frame}>
          <mesh rotation={[Math.PI / 2.6, 0, 0]}>
            <torusGeometry args={[2.3, 0.012, 8, 128]} />
            <meshBasicMaterial color="#5cc4ff" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[Math.PI / 2.1, 0.5, 0]}>
            <torusGeometry args={[2.55, 0.008, 8, 128]} />
            <meshBasicMaterial color="#2f7dff" transparent opacity={0.28} />
          </mesh>
        </group>

        <pointLight color="#4fb6ff" intensity={16} distance={9} position={[1.4, 1.2, 2.2]} />
        <pointLight color="#0f5ce0" intensity={9} distance={9} position={[-2, -1.4, -1.5]} />
      </group>
    </Float>
  );
}

export function IdentityMonogram({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 6.6], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={2.8} color="#d8efff" />
      <directionalLight position={[-5, -2, 3]} intensity={1.1} color="#7cc0ff" />
      <Monogram reduced={reduced} />
    </Canvas>
  );
}

export default IdentityMonogram;
