'use client';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { AssistantState } from './types';
import RobotHead from './RobotHead';

function Rings({ state }: { state: AssistantState }) {
  if (state === 'sleep') return null;
  return (
    <>
      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <torusGeometry args={[0.65, 0.008, 8, 64]}/>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4"
          emissiveIntensity={state === 'listening' ? 2 : 0.6} transparent opacity={0.7}/>
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0.4]} position={[0, -1.05, 0]}>
        <torusGeometry args={[0.48, 0.006, 8, 64]}/>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7"
          emissiveIntensity={state === 'thinking' ? 2 : 0.5} transparent opacity={0.6}/>
      </mesh>
    </>
  );
}

function isWebGLAvailable() {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}

interface RobotSceneProps {
  state: AssistantState;
  intensity?: number;
}

export default function RobotScene({ state, intensity = 1 }: RobotSceneProps) {
  if (!isWebGLAvailable()) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">🤖</div>
          <div className="text-xs text-white/30 tracking-widest uppercase">NEXUS</div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 2.4], fov: 40 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.2}/>
      <directionalLight position={[-2, 3, 2]} intensity={1.2} color="#c0d8ff" castShadow/>
      <directionalLight position={[2, 1, -1]} intensity={0.4} color="#a855f7"/>
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#06b6d4" distance={4}/>
      <Suspense fallback={null}>
        <RobotHead state={state} intensity={intensity}/>
        <Rings state={state}/>
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={2} blur={2} far={2}/>
      </Suspense>
    </Canvas>
  );
}
