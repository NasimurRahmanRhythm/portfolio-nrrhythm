"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Progress = RefObject<number>;
type Palette = { slab: string; line: string; bg: string };

const EMBER = "#ff5a1f";
const SAGE = "#9faf9b";

// Where each window floats, in units of the window width: x, y, depth, scale, turn.
const LAYOUT: [number, number, number, number, number][] = [
  [0.1, 0.55, 0, 1.1, -0.28],
  [-0.75, -0.2, -1.1, 0.9, 0.32],
  [0.85, -0.45, 0.7, 0.8, -0.42],
  [-0.2, -1.05, 1.2, 0.7, 0.18],
  [0.95, 1.15, -1.6, 0.75, -0.2],
  [-0.95, 1.0, -0.6, 0.6, 0.4],
  [0.35, -1.6, -0.9, 0.55, -0.12],
];

// Cheap deterministic noise so every visit draws the same "code".
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function codeLines(index: number) {
  const lines: { x: number; y: number; w: number; color: string }[] = [];
  let y = 0.18;
  for (let row = 0; row < 7; row++) {
    const indent = Math.floor(rand(index * 31 + row) * 3) * 0.07;
    let x = -0.42 + indent;
    const tokens = 1 + Math.floor(rand(index * 17 + row * 3) * 3);
    for (let t = 0; t < tokens; t++) {
      const w = 0.06 + rand(index * 7 + row * 11 + t) * 0.22;
      if (x + w > 0.44) break;
      const roll = rand(index * 3 + row * 5 + t * 13);
      lines.push({ x: x + w / 2, y, w, color: roll > 0.78 ? EMBER : roll > 0.6 ? SAGE : "line" });
      x += w + 0.03;
    }
    y -= 0.075;
  }
  return lines;
}

function Window({ index, palette }: { index: number; palette: Palette }) {
  const lines = useMemo(() => codeLines(index), [index]);
  return (
    <group>
      <RoundedBox args={[1, 0.66, 0.035]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={palette.slab} roughness={0.55} metalness={0.15} />
      </RoundedBox>
      {/* title bar */}
      <mesh position={[0, 0.275, 0.019]}>
        <planeGeometry args={[0.94, 0.002]} />
        <meshBasicMaterial color={palette.line} transparent opacity={0.25} />
      </mesh>
      {[EMBER, SAGE, palette.line].map((c, i) => (
        <mesh key={i} position={[-0.44 + i * 0.035, 0.3, 0.019]}>
          <circleGeometry args={[0.009, 16]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}
      {lines.map((l, i) => (
        <mesh key={i} position={[l.x, l.y, 0.019]}>
          <planeGeometry args={[l.w, 0.022]} />
          <meshBasicMaterial
            color={l.color === "line" ? palette.line : l.color}
            transparent
            opacity={l.color === "line" ? 0.55 : 0.95}
          />
        </mesh>
      ))}
    </group>
  );
}

function Dust({ color, count = 260 }: { color: string; count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + rand(i) * 4;
      const theta = rand(i + 500) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i + 900) - 1);
      arr.set([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.6, r * Math.sin(phi) * Math.sin(theta) - 2], i * 3);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.018} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

function Windows({ progress, palette }: { progress: Progress; palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef({ v: 0 });
  const { viewport, size } = useThree();

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    const tween = gsap.to(intro.current, { v: 1, duration: 2.4, ease: "power3.out", paused: true });
    const off = onReady(() => tween.play());
    return () => {
      window.removeEventListener("pointermove", move);
      tween.kill();
      off();
    };
  }, []);

  const wide = size.width / size.height > 1;
  const unit = wide ? Math.min(viewport.width * 0.15, viewport.height * 0.3) : viewport.width * 0.36;
  const cx = wide ? viewport.width * 0.28 : 0;
  const cy = wide ? viewport.height * 0.06 : viewport.height * 0.2;

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    const t = intro.current.v;
    const time = state.clock.elapsedTime;
    const g = group.current;
    if (g) {
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.25 + p * 0.5, 3, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.15, 3, delta);
    }
    items.current.forEach((item, i) => {
      if (!item) return;
      const [x, y, z, , turn] = LAYOUT[i];
      const side = x >= 0 ? 1 : -1;
      // Rise in on intro, drift idly, then scatter outward and toward the camera on scroll.
      item.position.set(
        cx + x * unit + side * p * unit * 1.4,
        cy + y * unit * 0.75 - (1 - t) * unit * (2.4 + i * 0.35) + Math.sin(time * 0.6 + i) * unit * 0.04,
        z + p * (2.2 + i * 0.5),
      );
      item.rotation.y = turn + Math.sin(time * 0.4 + i * 2) * 0.05 + side * p * 0.6;
      item.rotation.z = Math.sin(time * 0.3 + i) * 0.02;
    });
  });

  return (
    <group ref={group}>
      {LAYOUT.map(([, , , scale], i) => (
        <group key={i} ref={(el) => void (items.current[i] = el)} scale={unit * scale}>
          <Window index={i} palette={palette} />
        </group>
      ))}
    </group>
  );
}

export default function HeroScene({
  progress,
  dark,
  className,
}: {
  progress: Progress;
  dark: boolean;
  className?: string;
}) {
  const palette: Palette = dark
    ? { slab: "#1d1a18", line: "#efe9df", bg: "#0f0e0d" }
    : { slab: "#fbf8f3", line: "#0f0e0d", bg: "#efe9df" };

  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={dark ? 0.55 : 1.8} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.4 : 1.1} color="#ffe2c4" />
      <pointLight position={[-3, -1, 3]} intensity={dark ? 14 : 6} color={EMBER} distance={12} />
      <Windows progress={progress} palette={palette} />
      <Dust color={dark ? "#efe9df" : "#0f0e0d"} />
    </SceneCanvas>
  );
}
