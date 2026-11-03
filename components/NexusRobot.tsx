'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ARMOR_COLOR   = '#c8d4e0';
const DARK_COLOR    = '#1a1f2e';
const ACCENT_COLOR  = '#3b82f6';
const PURPLE_ACC    = '#7c3aed';

function ArmorMat({ emissive = '#000000' }: { emissive?: string }) {
  return <meshStandardMaterial color={ARMOR_COLOR} emissive={emissive} roughness={0.3} metalness={0.9} />;
}
function GlowMat({ color = ACCENT_COLOR, intensity = 2.5 }: { color?: string; intensity?: number }) {
  return <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} roughness={0.1} metalness={0.1} />;
}
function DarkMat() {
  return <meshStandardMaterial color={DARK_COLOR} roughness={0.6} metalness={0.7} />;
}

// Three.js line uses lineSegments to avoid JSX conflict with SVG <line>
function EnergyLine({ from, to, color = ACCENT_COLOR }: { from: THREE.Vector3; to: THREE.Vector3; color?: string }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([from, to]);
    return g;
  }, [from, to]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color}/>
    </lineSegments>
  );
}

function Head({ headRef }: { headRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={headRef} position={[0, 1.72, 0]}>
      <mesh castShadow><boxGeometry args={[0.42, 0.38, 0.38]}/><ArmorMat emissive="#0a0f1a"/></mesh>
      <mesh position={[0, 0.17, 0.04]} rotation={[0.3, 0, 0]}><boxGeometry args={[0.38, 0.08, 0.12]}/><ArmorMat emissive="#0a0f1a"/></mesh>
      <mesh position={[0, -0.2, 0.02]}><boxGeometry args={[0.34, 0.1, 0.28]}/><ArmorMat emissive="#050810"/></mesh>
      <mesh position={[0, -0.25, 0.06]}><boxGeometry args={[0.18, 0.06, 0.14]}/><DarkMat/></mesh>
      {/* eyes */}
      {([-0.11, 0.11] as const).map((x, i) => (
        <group key={i} position={[x, 0.04, 0.18]}>
          <mesh><boxGeometry args={[0.1, 0.07, 0.04]}/><DarkMat/></mesh>
          <mesh position={[0, 0, 0.02]}><boxGeometry args={[0.075, 0.052, 0.02]}/><GlowMat color={ACCENT_COLOR} intensity={4}/></mesh>
          <mesh position={[0, 0, 0.032]}>
            <boxGeometry args={[0.09, 0.065, 0.01]}/>
            <meshStandardMaterial color={ACCENT_COLOR} emissive={ACCENT_COLOR} emissiveIntensity={1.5} transparent opacity={0.6} roughness={0} metalness={0.2}/>
          </mesh>
          <pointLight color={ACCENT_COLOR} intensity={0.8} distance={0.6} position={[0, 0, 0.05]}/>
        </group>
      ))}
      {/* face glows */}
      <mesh position={[0, -0.04, 0.2]}><boxGeometry args={[0.28, 0.01, 0.005]}/><GlowMat color={ACCENT_COLOR} intensity={1.5}/></mesh>
      <mesh position={[0, -0.1, 0.2]}><boxGeometry args={[0.18, 0.01, 0.005]}/><GlowMat color={PURPLE_ACC} intensity={1.2}/></mesh>
      {/* side panels */}
      {([-0.22, 0.22] as const).map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}><boxGeometry args={[0.04, 0.3, 0.28]}/><ArmorMat emissive="#0a0f1a"/></mesh>
      ))}
      {/* antenna nubs */}
      {([-0.12, 0.12] as const).map((x, i) => (
        <group key={i} position={[x, 0.22, 0]}>
          <mesh><cylinderGeometry args={[0.015, 0.02, 0.08, 6]}/><DarkMat/></mesh>
          <mesh position={[0, 0.06, 0]}><sphereGeometry args={[0.018, 8, 8]}/><GlowMat color={ACCENT_COLOR} intensity={3}/></mesh>
        </group>
      ))}
    </group>
  );
}

function Neck() {
  return (
    <group position={[0, 1.47, 0]}>
      <mesh><cylinderGeometry args={[0.08, 0.1, 0.22, 10]}/><DarkMat/></mesh>
      {([0.06, 0, -0.06] as const).map((y, i) => (
        <mesh key={i} position={[0, y, 0]}><cylinderGeometry args={[0.1, 0.1, 0.025, 10]}/><GlowMat color={i === 1 ? PURPLE_ACC : ACCENT_COLOR} intensity={1.2}/></mesh>
      ))}
    </group>
  );
}

function Chest({ chestRef }: { chestRef: React.RefObject<THREE.Group> }) {
  return (
    <group ref={chestRef} position={[0, 1.1, 0]}>
      <mesh castShadow><boxGeometry args={[0.62, 0.72, 0.3]}/><ArmorMat emissive="#08101a"/></mesh>
      <mesh position={[0, 0.08, 0.14]}><boxGeometry args={[0.26, 0.28, 0.04]}/><meshStandardMaterial color="#0d1520" roughness={0.2} metalness={0.95} emissive="#050a10" emissiveIntensity={1}/></mesh>
      {/* arc reactor */}
      <group position={[0, 0.08, 0.17]}>
        <mesh><cylinderGeometry args={[0.07, 0.07, 0.025, 16]}/><DarkMat/></mesh>
        <mesh position={[0, 0, 0.015]}><cylinderGeometry args={[0.05, 0.05, 0.02, 16]}/><GlowMat color={ACCENT_COLOR} intensity={5}/></mesh>
        <pointLight color={ACCENT_COLOR} intensity={2} distance={1.2} position={[0, 0, 0.05]}/>
      </group>
      {/* vertical energy lines */}
      {([-0.1, 0.1] as const).map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0.155]}><boxGeometry args={[0.008, 0.22, 0.008]}/><GlowMat color={i === 0 ? ACCENT_COLOR : PURPLE_ACC} intensity={2}/></mesh>
      ))}
      <mesh position={[0, 0.32, 0.14]}><boxGeometry args={[0.54, 0.04, 0.04]}/><ArmorMat emissive="#0a1020"/></mesh>
      {([-0.32, 0.32] as const).map((x, i) => (
        <mesh key={i} position={[x, 0.3, 0]}><boxGeometry args={[0.06, 0.12, 0.28]}/><ArmorMat emissive="#0a0f1a"/></mesh>
      ))}
      {[-0.18, -0.06, 0.06].map((y, i) => (
        <group key={i}>
          {([-0.1, 0.1] as const).map((x, j) => (
            <mesh key={j} position={[x, y, 0.14]}><boxGeometry args={[0.12, 0.1, 0.03]}/><ArmorMat emissive="#050a0f"/></mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, -0.38, 0]}><boxGeometry args={[0.5, 0.08, 0.24]}/><DarkMat/></mesh>
      <mesh position={[0, -0.38, 0.1]}><boxGeometry args={[0.44, 0.04, 0.01]}/><GlowMat color={PURPLE_ACC} intensity={1.5}/></mesh>
    </group>
  );
}

function Arm({ side, armRef }: { side: 1 | -1; armRef: React.RefObject<THREE.Group> }) {
  const sx = side * 0.44;
  return (
    <group ref={armRef} position={[sx, 1.28, 0]}>
      <mesh castShadow position={[side * 0.1, 0.06, 0]}>
        <sphereGeometry args={[0.16, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.6]}/>
        <ArmorMat emissive="#0a0f1a"/>
      </mesh>
      <mesh position={[side * 0.08, 0.02, 0]}><cylinderGeometry args={[0.1, 0.09, 0.06, 10]}/><ArmorMat emissive="#0a0f1a"/></mesh>
      <mesh position={[side * 0.08, -0.2, 0]}><cylinderGeometry args={[0.075, 0.065, 0.28, 10]}/><ArmorMat emissive="#08101a"/></mesh>
      <mesh position={[side * 0.08, -0.38, 0]}><sphereGeometry args={[0.075, 10, 10]}/><DarkMat/></mesh>
      <mesh position={[side * 0.08, -0.38, 0]}><cylinderGeometry args={[0.08, 0.08, 0.025, 10]}/><GlowMat color={ACCENT_COLOR} intensity={1.5}/></mesh>
      <mesh position={[side * 0.08, -0.58, 0]}><cylinderGeometry args={[0.065, 0.055, 0.3, 10]}/><ArmorMat emissive="#08101a"/></mesh>
      <mesh position={[side * 0.08 + side * 0.058, -0.58, 0]}><boxGeometry args={[0.01, 0.24, 0.01]}/><GlowMat color={PURPLE_ACC} intensity={2}/></mesh>
      <mesh position={[side * 0.08, -0.76, 0]}><cylinderGeometry args={[0.055, 0.06, 0.06, 10]}/><DarkMat/></mesh>
      {/* palm */}
      <mesh position={[side * 0.08, -0.88, 0]}><boxGeometry args={[0.1, 0.12, 0.06]}/><ArmorMat emissive="#08101a"/></mesh>
      <mesh position={[side * 0.08, -0.88, 0.034]}><cylinderGeometry args={[0.022, 0.022, 0.02, 10]}/><GlowMat color={ACCENT_COLOR} intensity={4}/></mesh>
      <pointLight color={ACCENT_COLOR} intensity={0.6} distance={0.5} position={[side * 0.08, -0.88, 0.06]}/>
      {/* fingers */}
      {([-0.03, -0.01, 0.01, 0.03] as const).map((fx, fi) => (
        <group key={fi} position={[side * 0.08 + fx, -1.0, 0.01]}>
          <mesh><boxGeometry args={[0.016, 0.07, 0.02]}/><ArmorMat/></mesh>
          <mesh position={[0, -0.044, 0]}><boxGeometry args={[0.014, 0.05, 0.018]}/><ArmorMat emissive="#08101a"/></mesh>
        </group>
      ))}
    </group>
  );
}

function LowerBody() {
  return (
    <group position={[0, 0.46, 0]}>
      <mesh castShadow><boxGeometry args={[0.52, 0.18, 0.24]}/><ArmorMat emissive="#06090f"/></mesh>
      {([-0.18, 0.18] as const).map((x, i) => (
        <mesh key={i} position={[x, 0, 0.11]}><boxGeometry args={[0.1, 0.04, 0.005]}/><GlowMat color={ACCENT_COLOR} intensity={1.5}/></mesh>
      ))}
      {([-0.16, 0.16] as const).map((x, i) => (
        <group key={i} position={[x, -0.28, 0]}>
          <mesh><cylinderGeometry args={[0.085, 0.075, 0.32, 10]}/><ArmorMat emissive="#08101a"/></mesh>
          <mesh position={[0, -0.22, 0.04]}><boxGeometry args={[0.11, 0.1, 0.08]}/><ArmorMat emissive="#06090f"/></mesh>
          <mesh position={[0, -0.22, 0.08]}><boxGeometry args={[0.09, 0.02, 0.005]}/><GlowMat color={ACCENT_COLOR} intensity={1.5}/></mesh>
          <mesh position={[0, -0.46, -0.01]}><cylinderGeometry args={[0.07, 0.06, 0.34, 10]}/><ArmorMat emissive="#08101a"/></mesh>
          <mesh position={[0, -0.68, 0.02]}><boxGeometry args={[0.12, 0.12, 0.18]}/><ArmorMat emissive="#06090f"/></mesh>
          <mesh position={[0, -0.74, 0.06]}><boxGeometry args={[0.1, 0.02, 0.005]}/><GlowMat color={PURPLE_ACC} intensity={1.5}/></mesh>
        </group>
      ))}
    </group>
  );
}

export type NexusRobotHandles = {
  headRef:     React.RefObject<THREE.Group>;
  leftArmRef:  React.RefObject<THREE.Group>;
  rightArmRef: React.RefObject<THREE.Group>;
  chestRef:    React.RefObject<THREE.Group>;
};

export default function NexusRobot({ headRef, leftArmRef, rightArmRef, chestRef }: NexusRobotHandles) {
  const v1 = useMemo(() => new THREE.Vector3(-0.18, 1.45, 0.15), []);
  const v2 = useMemo(() => new THREE.Vector3(-0.18, 0.72, 0.15), []);
  const v3 = useMemo(() => new THREE.Vector3(0.18, 1.45, 0.15), []);
  const v4 = useMemo(() => new THREE.Vector3(0.18, 0.72, 0.15), []);
  return (
    <group position={[0, -1.2, 0]}>
      <Head headRef={headRef}/>
      <Neck/>
      <Chest chestRef={chestRef}/>
      <Arm side={-1} armRef={leftArmRef}/>
      <Arm side={1} armRef={rightArmRef}/>
      <LowerBody/>
      <EnergyLine from={v1} to={v2} color={ACCENT_COLOR}/>
      <EnergyLine from={v3} to={v4} color={PURPLE_ACC}/>
      <pointLight color={ACCENT_COLOR} intensity={0.4} distance={1.5} position={[0, -0.6, 0.3]}/>
    </group>
  );
}
