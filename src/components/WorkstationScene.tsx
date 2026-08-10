"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

type WorkState = "coding" | "soldering" | "wiring" | "inspecting";

const STATE_ORDER: WorkState[] = ["coding", "soldering", "wiring", "inspecting"];
const STATE_DURATION = 5.5;

type Pose = {
  headRotX: number;
  headRotY: number;
  torsoRotX: number;
  leftArmRotX: number;
  leftArmRotZ: number;
  rightArmRotX: number;
  rightArmRotZ: number;
  toolGlow: number;
};

const POSES: Record<WorkState, Pose> = {
  coding: {
    headRotX: 0.35,
    headRotY: -0.45,
    torsoRotX: 0.08,
    leftArmRotX: -1.05,
    leftArmRotZ: 0.15,
    rightArmRotX: -0.95,
    rightArmRotZ: -0.12,
    toolGlow: 0,
  },
  soldering: {
    headRotX: 0.55,
    headRotY: -0.15,
    torsoRotX: 0.22,
    leftArmRotX: -1.35,
    leftArmRotZ: 0.05,
    rightArmRotX: -0.55,
    rightArmRotZ: -0.35,
    toolGlow: 1,
  },
  wiring: {
    headRotX: 0.42,
    headRotY: 0.08,
    torsoRotX: 0.15,
    leftArmRotX: -1.2,
    leftArmRotZ: 0.35,
    rightArmRotX: -1.15,
    rightArmRotZ: -0.28,
    toolGlow: 0.2,
  },
  inspecting: {
    headRotX: 0.68,
    headRotY: -0.05,
    torsoRotX: 0.28,
    leftArmRotX: -0.75,
    leftArmRotZ: 0.22,
    rightArmRotX: -1.05,
    rightArmRotZ: -0.08,
    toolGlow: 0,
  },
};

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const k = (key: keyof Pose) => THREE.MathUtils.lerp(a[key], b[key], t);
  return {
    headRotX: k("headRotX"),
    headRotY: k("headRotY"),
    torsoRotX: k("torsoRotX"),
    leftArmRotX: k("leftArmRotX"),
    leftArmRotZ: k("leftArmRotZ"),
    rightArmRotX: k("rightArmRotX"),
    rightArmRotZ: k("rightArmRotZ"),
    toolGlow: k("toolGlow"),
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
      <meshStandardMaterial
        map={texture ?? undefined}
        emissive="#003344"
        emissiveIntensity={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

function DataWire({ pulseRef }: { pulseRef: RefObject<number> }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.05, 0.18, 0.05),
        new THREE.Vector3(0.35, 0.08, 0.22),
        new THREE.Vector3(0.62, 0.04, 0.38),
      ]),
    [],
  );

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 32, 0.012, 8, false), [curve]);
  const pulseMeshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (pulseMeshRef.current) {
      pulseMeshRef.current.position.copy(curve.getPointAt(pulseRef.current ?? 0));
    }
  });

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial color="#1e293b" emissive="#0ea5e9" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={pulseMeshRef}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function SolderSpark({ poseRef }: { poseRef: RefObject<Pose> }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(18);
    for (let i = 0; i < 6; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.08;
      arr[i * 3 + 1] = Math.random() * 0.06;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const active = poseRef.current?.toolGlow ?? 0;
    ref.current.visible = active > 0.35;
    ref.current.rotation.y += delta * 4;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.85 * active;
  });

  return (
    <points ref={ref} position={[0.48, 0.06, 0.42]} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#ffb347" transparent opacity={0} sizeAttenuation />
    </points>
  );
}

function DeveloperFigure({ poseRef }: { poseRef: RefObject<Pose> }) {
  const headRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const ironRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const pose = poseRef.current;
    if (!pose) return;
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, pose.headRotX, 0.08);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pose.headRotY, 0.08);
    }
    if (torsoRef.current) {
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, pose.torsoRotX, 0.08);
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, pose.leftArmRotX, 0.08);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, pose.leftArmRotZ, 0.08);
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        pose.rightArmRotX,
        0.08,
      );
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        pose.rightArmRotZ,
        0.08,
      );
    }
    if (ironRef.current) {
      const mat = ironRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, pose.toolGlow * 1.8, 0.1);
    }
  });

  const skin = "#cbd5e1";
  const shirt = "#0f172a";

  return (
    <group position={[-0.55, 0.02, 0.05]}>
      {/* Chair */}
      <mesh position={[0, 0.28, 0.08]}>
        <boxGeometry args={[0.52, 0.08, 0.48]} />
        <meshStandardMaterial color="#111827" emissive="#001a22" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.62, 0.28]}>
        <boxGeometry args={[0.48, 0.55, 0.06]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      {/* Legs (seated) */}
      <mesh position={[-0.14, 0.12, 0.22]} rotation={[1.1, 0, 0.08]}>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.14, 0.12, 0.22]} rotation={[1.1, 0, -0.08]}>
        <boxGeometry args={[0.14, 0.42, 0.14]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Torso */}
      <group ref={torsoRef} position={[0, 0.72, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.46, 0.22]} />
          <meshStandardMaterial color={shirt} emissive="#002233" emissiveIntensity={0.25} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.42, 0]}>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color={skin} />
          </mesh>
          {/* Cyber visor */}
          <mesh position={[0, 0.02, 0.13]}>
            <boxGeometry args={[0.22, 0.06, 0.04]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} transparent opacity={0.85} />
          </mesh>
        </group>

        {/* Left arm */}
        <group ref={leftArmRef} position={[-0.24, 0.14, 0]}>
          <mesh position={[0, -0.16, 0.04]}>
            <boxGeometry args={[0.1, 0.32, 0.1]} />
            <meshStandardMaterial color={shirt} />
          </mesh>
        </group>

        {/* Right arm + soldering iron */}
        <group ref={rightArmRef} position={[0.24, 0.14, 0]}>
          <mesh position={[0, -0.16, 0.04]}>
            <boxGeometry args={[0.1, 0.32, 0.1]} />
            <meshStandardMaterial color={shirt} />
          </mesh>
          <mesh ref={ironRef} position={[0.06, -0.34, 0.18]} rotation={[0.6, 0, -0.4]}>
            <cylinderGeometry args={[0.012, 0.012, 0.22, 8]} />
            <meshStandardMaterial color="#64748b" emissive="#ff6b00" emissiveIntensity={0} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function DeskSetup() {
  return (
    <group>
      {/* Desk surface */}
      <mesh position={[0.35, 0.02, 0.18]}>
        <boxGeometry args={[1.35, 0.06, 0.72]} />
        <meshStandardMaterial color="#0b1220" emissive="#001520" emissiveIntensity={0.35} />
      </mesh>
      {/* Desk legs */}
      {[
        [-0.22, -0.22, -0.12],
        [0.92, -0.22, -0.12],
        [-0.22, -0.22, 0.48],
        [0.92, -0.22, 0.48],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.06, 0.44, 0.06]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}

      {/* Laptop base */}
      <mesh position={[0.02, 0.08, 0.02]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.52, 0.04, 0.36]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <group position={[0.02, 0.1, 0.02]} rotation={[0, 0.35, 0]}>
        <CodeScreen />
      </group>

      {/* Breadboard + components */}
      <mesh position={[0.55, 0.08, 0.38]}>
        <boxGeometry args={[0.42, 0.03, 0.22]} />
        <meshStandardMaterial color="#ecfccb" emissive="#14532d" emissiveIntensity={0.15} />
      </mesh>
      {[0.42, 0.52, 0.62].map((x, i) => (
        <mesh key={i} position={[x, 0.12, 0.36]}>
          <cylinderGeometry args={[0.015, 0.015, 0.06, 8]} />
          <meshStandardMaterial color={i === 1 ? "#f59e0b" : "#64748b"} />
        </mesh>
      ))}

      {/* ESP32 / Arduino board */}
      <mesh position={[0.72, 0.1, 0.42]} rotation={[0, -0.25, 0]}>
        <boxGeometry args={[0.28, 0.04, 0.2]} />
        <meshStandardMaterial color="#065f46" emissive="#10b981" emissiveIntensity={0.45} />
      </mesh>
      {/* USB port glow */}
      <mesh position={[0.58, 0.1, 0.42]}>
        <boxGeometry args={[0.04, 0.03, 0.06]} />
        <meshStandardMaterial color="#334155" emissive="#00f0ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Desk lamp */}
      <group position={[0.95, 0.08, -0.05]}>
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.08, 0.68, 0]}>
          <coneGeometry args={[0.12, 0.14, 12, 1, true]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0.08, 0.62, 0.05]} intensity={0.6} color="#00f0ff" distance={2} />
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
    pulseRef.current = (pulseRef.current + delta * 0.35) % 1;

    const cycle = timeRef.current % (STATE_DURATION * STATE_ORDER.length);
    const stateIdx = Math.floor(cycle / STATE_DURATION);
    const nextIdx = (stateIdx + 1) % STATE_ORDER.length;
    const t = (cycle % STATE_DURATION) / STATE_DURATION;
    const eased = t < 0.15 ? 0 : t > 0.85 ? 1 : (t - 0.15) / 0.7;

    const from = POSES[STATE_ORDER[stateIdx]];
    const to = POSES[STATE_ORDER[nextIdx]];
    poseRef.current = lerpPose(from, to, THREE.MathUtils.smoothstep(eased, 0, 1));

    if (groupRef.current) {
      groupRef.current.position.y = -1.05 + Math.sin(scroll * 0.004) * 0.04;
      groupRef.current.rotation.y = -0.35 + scroll * 0.0004;
    }
  });

  return (
    <group ref={groupRef} position={[2.4, -1.05, -0.8]} scale={1.15}>
      <DeskSetup />
      <DeveloperFigure poseRef={poseRef} />
      <DataWire pulseRef={pulseRef} />
      <SolderSpark poseRef={poseRef} />
    </group>
  );
}
