"use client";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

type WorkState = "coding" | "soldering" | "wiring" | "inspecting";

const STATE_ORDER: WorkState[] = ["coding", "soldering", "wiring", "inspecting"];
const STATE_LABELS: Record<WorkState, string> = {
  coding: "CODING",
  soldering: "SOLDERING",
  wiring: "WIRING",
  inspecting: "INSPECTING",
};
const STATE_DURATION = 5.5;

type Pose = {
  headRotX: number;
  headRotY: number;
  lean: number;
  toolGlow: number;
  state: WorkState;
};

const POSES: Record<WorkState, Pose> = {
  coding: { headRotX: 0.06, headRotY: -0.18, lean: 0.04, toolGlow: 0, state: "coding" },
  soldering: { headRotX: 0.14, headRotY: -0.06, lean: 0.1, toolGlow: 1, state: "soldering" },
  wiring: { headRotX: 0.1, headRotY: 0.05, lean: 0.08, toolGlow: 0.25, state: "wiring" },
  inspecting: { headRotX: 0.16, headRotY: -0.02, lean: 0.12, toolGlow: 0, state: "inspecting" },
};

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    headRotX: THREE.MathUtils.lerp(a.headRotX, b.headRotX, t),
    headRotY: THREE.MathUtils.lerp(a.headRotY, b.headRotY, t),
    lean: THREE.MathUtils.lerp(a.lean, b.lean, t),
    toolGlow: THREE.MathUtils.lerp(a.toolGlow, b.toolGlow, t),
    state: t < 0.5 ? a.state : b.state,
  };
}

function makeCodeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#020810";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const lines = [
    "const esp = new ESP32();",
    "await mqtt.connect(WSS);",
    "servo.write(angle);",
    "export default App;",
    "flutter run -d chrome",
    "supabase.from('hr')...",
    "// RoboDog gait v2",
    "if (imu.pitch > 12)",
  ];

  ctx.font = "14px monospace";
  lines.forEach((line, i) => {
    ctx.fillStyle = i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#7dd3fc" : "#94a3b8";
    ctx.fillText(line, 18, 36 + i * 28);
  });

  ctx.fillStyle = "rgba(0, 240, 255, 0.85)";
  ctx.fillRect(18, 36 + 2 * 28 + 4, 9, 16);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function CodeScreen() {
  const texture = useMemo(() => makeCodeTexture(), []);

  return (
    <mesh position={[0, 0.42, -0.18]} rotation={[-0.55, 0, 0]}>
      <planeGeometry args={[0.72, 0.46]} />
      <meshStandardMaterial map={texture ?? undefined} emissive="#003344" emissiveIntensity={0.9} toneMapped={false} />
    </mesh>
  );
}

function DataWire({ pulseRef }: { pulseRef: RefObject<number> }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.08, 0.2, 0.08),
        new THREE.Vector3(0.42, 0.1, 0.28),
        new THREE.Vector3(0.78, 0.06, 0.42),
      ]),
    [],
  );

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 32, 0.014, 8, false), [curve]);
  const pulseMeshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (pulseMeshRef.current) {
      pulseMeshRef.current.position.copy(curve.getPointAt(pulseRef.current ?? 0));
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color="#1e293b" emissive="#0ea5e9" emissiveIntensity={0.45} />
      </mesh>
      <mesh ref={pulseMeshRef}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.2} />
      </mesh>
    </group>
  );
}

function SolderSpark({ poseRef }: { poseRef: RefObject<Pose> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(24);
    for (let i = 0; i < 8; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.1;
      arr[i * 3 + 1] = Math.random() * 0.08;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const active = poseRef.current?.toolGlow ?? 0;
    ref.current.visible = active > 0.35;
    ref.current.rotation.y += delta * 5;
    (ref.current.material as THREE.PointsMaterial).opacity = 0.9 * active;
  });

  return (
    <points ref={ref} position={[0.62, 0.08, 0.44]} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffb347" transparent opacity={0} sizeAttenuation />
    </points>
  );
}

function StateLabel({ poseRef }: { poseRef: RefObject<Pose> }) {
  const textRef = useRef<THREE.Object3D & { text?: string }>(null);

  useFrame(() => {
    if (textRef.current && "text" in textRef.current) {
      textRef.current.text = STATE_LABELS[poseRef.current?.state ?? "coding"];
    }
  });

  return (
    <Text
      ref={textRef}
      fontSize={0.09}
      color="#00f0ff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.004}
      outlineColor="#003344"
    >
      CODING
    </Text>
  );
}

function CyberAvatar({ poseRef }: { poseRef: RefObject<Pose> }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scanRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);

  const portrait = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/hashem-cyber-avatar.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    const pose = poseRef.current;
    if (!pose || !groupRef.current) return;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pose.headRotX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pose.headRotY, 0.06);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0.12 + pose.lean, 0.06);

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 + Math.sin(clock.elapsedTime * 2.2) * 0.06 + pose.toolGlow * 0.15;
    }

    if (scanRef.current) {
      const y = ((clock.elapsedTime * 0.45) % 1) * 1.55 - 0.78;
      scanRef.current.position.y = y;
    }

    if (labelRef.current) {
      labelRef.current.visible = true;
    }
  });

  const w = 1.35;
  const h = 1.75;

  return (
    <group position={[-0.82, 0.62, -0.05]}>
      {/* Chair silhouette */}
      <mesh position={[0, -0.55, -0.08]}>
        <boxGeometry args={[0.62, 0.1, 0.55]} />
        <meshStandardMaterial color="#0a0f18" emissive="#001520" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.05, -0.22]}>
        <boxGeometry args={[0.58, 0.95, 0.07]} />
        <meshStandardMaterial color="#0a0f18" />
      </mesh>

      <group ref={groupRef}>
        {/* Hologram glow backing */}
        <mesh ref={glowRef} position={[0, 0, -0.04]}>
          <planeGeometry args={[w + 0.18, h + 0.18]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.22} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Portrait */}
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={portrait} toneMapped={false} />
        </mesh>

        {/* Cyan frame */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[w + 0.06, h + 0.06]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.5} />
        </mesh>

        {/* Scan line */}
        <mesh ref={scanRef} position={[0, 0, 0.02]}>
          <planeGeometry args={[w, 0.025]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Vignette overlay */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color="#050810" transparent opacity={0.18} />
        </mesh>
      </group>

      <group ref={labelRef} position={[0, -1.02, 0.05]}>
        <StateLabel poseRef={poseRef} />
      </group>
    </group>
  );
}

function DeskSetup() {
  return (
    <group>
      <mesh position={[0.42, 0.02, 0.2]} receiveShadow>
        <boxGeometry args={[1.5, 0.07, 0.78]} />
        <meshStandardMaterial color="#0b1220" emissive="#001520" emissiveIntensity={0.4} metalness={0.3} roughness={0.6} />
      </mesh>

      {[
        [-0.18, -0.22, -0.1],
        [1.02, -0.22, -0.1],
        [-0.18, -0.22, 0.5],
        [1.02, -0.22, 0.5],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.07, 0.46, 0.07]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}

      {/* Laptop */}
      <mesh position={[0.08, 0.09, 0.04]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.56, 0.045, 0.38]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
      <group position={[0.08, 0.11, 0.04]} rotation={[0, 0.4, 0]}>
        <CodeScreen />
      </group>

      {/* Breadboard */}
      <mesh position={[0.62, 0.09, 0.4]}>
        <boxGeometry args={[0.44, 0.035, 0.24]} />
        <meshStandardMaterial color="#ecfccb" emissive="#14532d" emissiveIntensity={0.2} />
      </mesh>
      {[0.48, 0.58, 0.68, 0.78].map((x, i) => (
        <mesh key={i} position={[x, 0.13, 0.38]}>
          <cylinderGeometry args={[0.016, 0.016, 0.07, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#64748b" : "#f59e0b"} />
        </mesh>
      ))}

      {/* ESP32 board */}
      <mesh position={[0.82, 0.11, 0.46]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.3, 0.045, 0.22]} />
        <meshStandardMaterial color="#065f46" emissive="#10b981" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0.66, 0.11, 0.44]}>
        <boxGeometry args={[0.05, 0.035, 0.07]} />
        <meshStandardMaterial color="#334155" emissive="#00f0ff" emissiveIntensity={0.65} />
      </mesh>

      {/* Extra wire on desk */}
      <mesh position={[0.55, 0.1, 0.32]} rotation={[0, 0.5, 0]}>
        <torusGeometry args={[0.08, 0.008, 8, 24, Math.PI * 1.2]} />
        <meshStandardMaterial color="#ef4444" emissive="#7f1d1d" emissiveIntensity={0.3} />
      </mesh>

      {/* Desk lamp */}
      <group position={[1.05, 0.09, -0.02]}>
        <mesh position={[0, 0.38, 0]} rotation={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.016, 0.016, 0.75, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.1, 0.72, 0]}>
          <coneGeometry args={[0.13, 0.15, 12, 1, true]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.9} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0.1, 0.66, 0.06]} intensity={0.75} color="#00f0ff" distance={2.5} />
      </group>
    </group>
  );
}

export default function WorkstationScene({ scroll }: { scroll: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const pulseRef = useRef(0);
  const poseRef = useRef<Pose>(POSES.coding);

  useFrame((_, delta) => {
    timeRef.current += delta;
    pulseRef.current = (pulseRef.current + delta * 0.4) % 1;

    const cycle = timeRef.current % (STATE_DURATION * STATE_ORDER.length);
    const stateIdx = Math.floor(cycle / STATE_DURATION);
    const nextIdx = (stateIdx + 1) % STATE_ORDER.length;
    const t = (cycle % STATE_DURATION) / STATE_DURATION;
    const eased = t < 0.15 ? 0 : t > 0.85 ? 1 : (t - 0.15) / 0.7;

    const from = POSES[STATE_ORDER[stateIdx]];
    const to = POSES[STATE_ORDER[nextIdx]];
    poseRef.current = lerpPose(from, to, THREE.MathUtils.smoothstep(eased, 0, 1));

    if (groupRef.current) {
      groupRef.current.position.y = -0.75 + Math.sin(scroll * 0.004) * 0.03;
      groupRef.current.rotation.y = -0.28 + scroll * 0.00035;
    }
  });

  return (
    <group ref={groupRef} position={[3.1, -0.75, -1.4]} scale={1.28}>
      <DeskSetup />
      <CyberAvatar poseRef={poseRef} />
      <DataWire pulseRef={pulseRef} />
      <SolderSpark poseRef={poseRef} />
    </group>
  );
}
