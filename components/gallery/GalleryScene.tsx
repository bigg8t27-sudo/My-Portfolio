'use client';
/**
 * GalleryScene — pmndrs cards-with-border-radius carousel
 * All cards use Drei <Image> with real photo textures.
 */

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';

import './util';
import { type MeshSineMaterial } from './util';
import { type PortfolioCard } from '@/data/portfolioCards';

export interface GallerySceneProps {
  cards: PortfolioCard[];
  textureUrls: string[];
  onCardClick: (card: PortfolioCard) => void;
  prefersReduced: boolean;
}

// ── Single image card ──────────────────────────────────────────────────────────
function Card({
  url,
  card,
  onCardClick,
  ...props
}: {
  url: string;
  card: PortfolioCard;
  onCardClick: (card: PortfolioCard) => void;
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp((ref.current as any).material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta);
    easing.damp((ref.current as any).material, 'zoom',   hovered ? 1   : 1.5,  0.2, delta);
  });

  return (
    <Image
      ref={ref as any}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer'; }}
      onPointerOut={()  => {                       setHovered(false); document.body.style.cursor = 'auto';    }}
      onClick={(e)      => { e.stopPropagation(); onCardClick(card); }}
      {...props}
    >
      {/* @ts-ignore — bentPlaneGeometry registered via util.ts extend() */}
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

// ── Carousel — all cards as images ────────────────────────────────────────────
function Carousel({
  cards,
  textureUrls,
  onCardClick,
}: {
  cards: PortfolioCard[];
  textureUrls: string[];
  onCardClick: (card: PortfolioCard) => void;
}) {
  const count  = cards.length;
  const radius = 1.4;

  return (
    <>
      {cards.map((card, i) => (
        <Card
          key={card.id}
          url={textureUrls[i]}
          card={card}
          position={[
            Math.sin((i / count) * Math.PI * 2) * radius,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius,
          ]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
          onCardClick={onCardClick}
        />
      ))}
    </>
  );
}

// ── Rig — rotates carousel on scroll, camera tracks pointer ───────────────────
function Rig({ children, prefersReduced }: { children: React.ReactNode; prefersReduced: boolean }) {
  const ref    = useRef<THREE.Group>(null!);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update?.();
    if (!prefersReduced) {
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <group ref={ref} rotation={[0, 0, 0.15]}>{children}</group>;
}

// ── Banner — scrolling sine-wave text cylinder ────────────────────────────────
function Banner({ bannerUrl }: { bannerUrl: string }) {
  const ref     = useRef<THREE.Mesh<THREE.BufferGeometry, MeshSineMaterial>>(null!);
  const texture = useTexture(bannerUrl);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll  = useScroll();

  useFrame((_s, delta) => {
    if (!ref.current?.material) return;
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    if (ref.current.material.map) ref.current.material.map.offset.x += delta / 2;
  });

  return (
    <mesh ref={ref} position={[0, -0.15, 0]}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      {/* @ts-ignore */}
      <meshSineMaterial map={texture} map-anisotropy={16} map-repeat={[30, 1]} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ cards, textureUrls, onCardClick, prefersReduced }: GallerySceneProps) {
  const cardUrls  = textureUrls.slice(0, cards.length);
  const bannerUrl = textureUrls[cards.length] ?? textureUrls[0];

  return (
    <>
      <fog attach="fog" args={['#000010', 8.5, 12]} />
      <ScrollControls pages={4} infinite>
        <Rig prefersReduced={prefersReduced}>
          <Suspense fallback={null}>
            <Carousel cards={cards} textureUrls={cardUrls} onCardClick={onCardClick} />
          </Suspense>
        </Rig>
        <Suspense fallback={null}>
          <Banner bannerUrl={bannerUrl} />
        </Suspense>
      </ScrollControls>
      <Environment preset="dawn" background blur={0.5} />
    </>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────────
export default function GalleryScene(props: GallerySceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 15 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <Scene {...props} />
    </Canvas>
  );
}
