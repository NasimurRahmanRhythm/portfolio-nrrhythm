"use client";

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Progress = RefObject<number>;
type Palette = { slab: string; line: string };
export type HeroSite = { name: string; url: string; cover: string };

const EMBER = "#ff5a1f";
const SAGE = "#9faf9b";

// Where each browser window floats, in units of the window width: x, y, depth, scale, turn.
// Two rows of two and one below, so every site stays visible.
const LAYOUT: [number, number, number, number, number][] = [
  [-0.55, 0.85, 0, 1.0, 0.25],
  [0.75, 1.0, -0.6, 0.9, -0.25],
  [-0.75, -0.25, 0.4, 0.95, 0.3],
  [0.65, -0.1, -0.2, 1.0, -0.3],
  [0, -1.25, 0.8, 0.85, 0.05],
];

// Cheap deterministic noise for the background dust.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/** A browser window showing one site's screenshot. */
function SiteWindow({
  site,
  palette,
  hovered,
  onHover,
}: {
  site: HeroSite;
  palette: Palette;
  hovered: boolean;
  onHover: (over: boolean) => void;
}) {
  const texture = useTexture(site.cover);
  texture.colorSpace = THREE.SRGBColorSpace;
  const glow = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = glow.current;
    if (g) g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, hovered ? 1.06 : 1, 8, delta));
  });

  const open = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    window.open(site.url, "_blank", "noopener,noreferrer");
  };

  return (
    <group
      ref={glow}
      onClick={open}
      onPointerOver={(e) => (e.stopPropagation(), onHover(true))}
      onPointerOut={() => onHover(false)}
    >
      <RoundedBox args={[1, 0.69, 0.035]} radius={0.03} smoothness={4}>
        <meshStandardMaterial
          color={palette.slab}
          roughness={0.55}
          metalness={0.15}
          emissive={EMBER}
          emissiveIntensity={hovered ? 0.25 : 0}
        />
      </RoundedBox>
      {/* title bar */}
      {[EMBER, SAGE, palette.line].map((c, i) => (
        <mesh key={i} position={[-0.45 + i * 0.03, 0.31, 0.019]}>
          <circleGeometry args={[0.008, 16]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}
      {/* the site itself, 16:10 like the screenshots */}
      <mesh position={[0, -0.025, 0.019]}>
        <planeGeometry args={[0.96, 0.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
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

function Windows({
  sites,
  progress,
  palette,
  hovered,
  onHover,
}: {
  sites: HeroSite[];
  progress: Progress;
  palette: Palette;
  hovered: number | null;
  onHover: (index: number | null) => void;
}) {
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
      // A hovered window turns to face the visitor.
      const facing = hovered === i ? 0 : turn + Math.sin(time * 0.4 + i * 2) * 0.05 + side * p * 0.6;
      item.rotation.y = THREE.MathUtils.damp(item.rotation.y, facing, 6, delta);
      item.rotation.z = Math.sin(time * 0.3 + i) * 0.02;
    });
  });

  return (
    <group ref={group}>
      {sites.slice(0, LAYOUT.length).map((site, i) => (
        <group key={site.url} ref={(el) => void (items.current[i] = el)} scale={unit * LAYOUT[i][3]}>
          <SiteWindow
            site={site}
            palette={palette}
            hovered={hovered === i}
            onHover={(over) => onHover(over ? i : null)}
          />
        </group>
      ))}
    </group>
  );
}

export default function HeroScene({
  sites,
  progress,
  dark,
  hovered,
  onHover,
  className,
}: {
  sites: HeroSite[];
  progress: Progress;
  dark: boolean;
  hovered: number | null;
  onHover: (index: number | null) => void;
  className?: string;
}) {
  const palette: Palette = dark ? { slab: "#1d1a18", line: "#efe9df" } : { slab: "#fbf8f3", line: "#0f0e0d" };

  return (
    <SceneCanvas className={className} camera={{ position: [0, 0, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={dark ? 0.55 : 1.8} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.4 : 1.1} color="#ffe2c4" />
      <pointLight position={[-3, -1, 3]} intensity={dark ? 14 : 6} color={EMBER} distance={12} />
      <Suspense fallback={null}>
        <Windows sites={sites} progress={progress} palette={palette} hovered={hovered} onHover={onHover} />
      </Suspense>
      <Dust color={dark ? "#efe9df" : "#0f0e0d"} />
    </SceneCanvas>
  );
}
