"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import WorkstationScene from "./WorkstationScene";

function CyberCore({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.25 + scroll * 0.002;
    ref.current.position.y = Math.sin(scroll * 0.008) * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[-2.2, 0, 0]}>
        <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#003344"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00f0ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function ScrollScene({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z = scroll * 0.01;
      groupRef.current.rotation.y = scroll * 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <CyberCore scroll={scroll} />
      <WorkstationScene scroll={scroll} />
      <ParticleField />
      <Grid
        args={[30, 30]}
        cellSize={0.6}
        cellThickness={0.4}
        sectionSize={3}
        sectionThickness={0.8}
        fadeDistance={18}
        fadeStrength={1.2}
        position={[0, -2.2, 0]}
        rotation={[0, 0, 0]}
        cellColor="#0d3340"
        sectionColor="#00f0ff"
      />
    </group>
  );
}

export default function Scene3D({ scroll }: { scroll: number }) {
  return (
    <Canvas
      camera={{ position: [0.4, 1.35, 6.2], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <color attach="background" args={["#050810"]} />
      <fog attach="fog" args={["#050810", 8, 22]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 6, 4]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-4, 2, -2]} intensity={0.6} color="#ff006e" />

      <ScrollScene scroll={scroll} />

      <Stars radius={40} depth={30} count={800} factor={3} saturation={0} fade speed={0.6} />
    </Canvas>
  );
}
