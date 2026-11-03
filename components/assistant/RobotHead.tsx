'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AssistantState } from './types';

interface RobotHeadProps {
  state: AssistantState;
  intensity?: number;
}

export default function RobotHead({ state, intensity = 1 }: RobotHeadProps) {
  const groupRef  = useRef<THREE.Group>(null!);
  const eyeL      = useRef<THREE.PointLight>(null!);
  const eyeR      = useRef<THREE.PointLight>(null!);
  const jawRef    = useRef<THREE.Group>(null!);
  const pupilL    = useRef<THREE.Mesh>(null!);
  const pupilR    = useRef<THREE.Mesh>(null!);

  // Eye color by state
  const eyeColor = useMemo(() => {
    switch (state) {
      case 'listening': return '#00ffff';
      case 'thinking':  return '#a855f7';
      case 'speaking':  return '#22d3ee';
      case 'error':     return '#f59e0b';
      case 'sleep':     return '#1e40af';
      default:          return '#06b6d4';
    }
  }, [state]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!groupRef.current) return;

    // Idle float
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.06 * intensity;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08 * intensity;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03 * intensity;

    // Eye pulse
    const eyeInt = state === 'sleep'
      ? 0.3
      : state === 'thinking'
        ? (0.8 + Math.sin(t * 4) * 0.5) * intensity
        : state === 'listening'
          ? (1.2 + Math.sin(t * 6) * 0.4) * intensity
          : (0.8 + Math.sin(t * 1.2) * 0.3) * intensity;

    if (eyeL.current) eyeL.current.intensity = eyeInt;
    if (eyeR.current) eyeR.current.intensity = eyeInt;

    // Jaw for speaking
    if (jawRef.current && state === 'speaking') {
      jawRef.current.rotation.x = Math.abs(Math.sin(t * 8)) * 0.18;
    } else if (jawRef.current) {
      jawRef.current.rotation.x = THREE.MathUtils.lerp(jawRef.current.rotation.x, 0, 0.1);
    }

    // Thinking spin pupils
    if (state === 'thinking') {
      if (pupilL.current) pupilL.current.rotation.z = t * 3;
      if (pupilR.current) pupilR.current.rotation.z = t * 3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── NECK ──────────────────────────────────────── */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.32, 16]}/>
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.9}/>
      </mesh>
      {/* Neck ring */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[0.16, 0.025, 8, 32]}/>
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.8}/>
      </mesh>

      {/* ── MAIN HEAD SHELL ────────────────────────────── */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]}/>
        <meshStandardMaterial color="#0d1117" roughness={0.25} metalness={0.95}
          envMapIntensity={1.2}/>
      </mesh>

      {/* Forehead plate */}
      <mesh position={[0, 0.22, 0.32]}>
        <boxGeometry args={[0.44, 0.14, 0.06]}/>
        <meshStandardMaterial color="#161b22" roughness={0.2} metalness={0.95}/>
      </mesh>

      {/* Cheek plates */}
      {([-0.3, 0.3] as const).map((x, i) => (
        <mesh key={i} position={[x, -0.04, 0.26]}>
          <boxGeometry args={[0.18, 0.26, 0.06]}/>
          <meshStandardMaterial color="#161b22" roughness={0.2} metalness={0.95}/>
        </mesh>
      ))}

      {/* ── EYE SOCKETS ────────────────────────────────── */}
      {([-0.15, 0.15] as const).map((x, i) => (
        <group key={i} position={[x, 0.05, 0.35]}>
          {/* Socket recess */}
          <mesh>
            <boxGeometry args={[0.14, 0.09, 0.04]}/>
            <meshStandardMaterial color="#030712" roughness={0.8} metalness={0.3}/>
          </mesh>
          {/* Glowing iris */}
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[0.11, 0.072, 0.01]}/>
            <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3}
              transparent opacity={0.9}/>
          </mesh>
          {/* Thinking spinner */}
          <mesh ref={i === 0 ? pupilL : pupilR} position={[0, 0, 0.03]}>
            <torusGeometry args={[0.028, 0.008, 6, 12, state === 'thinking' ? Math.PI : Math.PI * 2]}/>
            <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2}/>
          </mesh>
          {/* Eye light */}
          <pointLight
            ref={i === 0 ? eyeL : eyeR}
            color={eyeColor} intensity={0.8} distance={1.2}
            position={[0, 0, 0.06]}
          />
        </group>
      ))}

      {/* ── MOUTH / VOICE GRILLE ───────────────────────── */}
      <group ref={jawRef as React.RefObject<THREE.Group>} position={[0, -0.2, 0]}>
        <mesh position={[0, 0, 0.36]}>
          <boxGeometry args={[0.28, 0.06, 0.03]}/>
          <meshStandardMaterial color="#0d1117" roughness={0.6} metalness={0.8}/>
        </mesh>
        {/* Grille lines */}
        {[-0.08, -0.02, 0.04, 0.10].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.375]}>
            <boxGeometry args={[0.012, 0.045, 0.005]}/>
            <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={1.5}/>
          </mesh>
        ))}
      </group>

      {/* ── TOP ANTENNA ────────────────────────────────── */}
      <group position={[0, 0.44, 0]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.016, 0.12, 8]}/>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.3}/>
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.022, 10, 10]}/>
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={3}/>
        </mesh>
        <pointLight color={eyeColor} intensity={0.3} distance={0.5} position={[0, 0.1, 0]}/>
      </group>

      {/* ── SIDE VENTS ─────────────────────────────────── */}
      {([-0.4, 0.4] as const).map((x, i) => (
        <group key={i} position={[x, 0.0, 0.06]}>
          {[0.06, 0, -0.06].map((y, j) => (
            <mesh key={j} position={[0, y, 0]}>
              <boxGeometry args={[0.04, 0.018, 0.1]}/>
              <meshStandardMaterial color="#0a0f1a" roughness={0.4} metalness={0.9}/>
            </mesh>
          ))}
        </group>
      ))}

      {/* ── UPPER TORSO ────────────────────────────────── */}
      <mesh position={[0, -0.92, 0]} castShadow>
        <boxGeometry args={[0.56, 0.22, 0.32]}/>
        <meshStandardMaterial color="#0d1117" roughness={0.3} metalness={0.9}/>
      </mesh>
      {/* Chest emblem */}
      <group position={[0, -0.92, 0.17]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.018, 16]}/>
          <meshStandardMaterial color="#030712" roughness={0.2} metalness={0.9}/>
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <cylinderGeometry args={[0.042, 0.042, 0.012, 16]}/>
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={4}/>
        </mesh>
        <pointLight color={eyeColor} intensity={0.6} distance={0.8} position={[0, 0, 0.04]}/>
      </group>

      {/* Chest energy lines */}
      {([-0.1, 0.1] as const).map((x, i) => (
        <mesh key={i} position={[x, -0.92, 0.16]}>
          <boxGeometry args={[0.006, 0.16, 0.005]}/>
          <meshStandardMaterial color={eyeColor} emissive={eyeColor} emissiveIntensity={2}/>
        </mesh>
      ))}

      {/* Shoulders */}
      {([-0.36, 0.36] as const).map((x, i) => (
        <mesh key={i} position={[x, -0.82, 0]}>
          <sphereGeometry args={[0.13, 16, 14, 0, Math.PI * 2, 0, Math.PI * 0.6]}/>
          <meshStandardMaterial color="#161b22" roughness={0.2} metalness={0.95}/>
        </mesh>
      ))}
    </group>
  );
}
