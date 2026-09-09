"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Generate neurons distributed on sphere surface
function generateNeurons(count: number, radius: number) {
  const neurons: Array<{ position: THREE.Vector3; color: string }> = [];
  
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(1 - (2 * i) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    const colors = ["#00f0ff", "#8b3dff", "#00ff88", "#0088ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    neurons.push({
      position: new THREE.Vector3(x, y, z),
      color,
    });
  }
  
  return neurons;
}

// Generate full mesh connections (every neuron connects to many others)
function generateConnections(neurons: Array<{ position: THREE.Vector3 }>) {
  const connections: Array<[number, number]> = [];
  const totalNeurons = neurons.length;
  
  // Connect each neuron to multiple others
  for (let i = 0; i < totalNeurons; i++) {
    // Connect to nearby neurons (always)
    for (let j = i + 1; j < totalNeurons; j++) {
      const distance = neurons[i].position.distanceTo(neurons[j].position);
      
      // Close connections - always connect
      if (distance < 1.2) {
        connections.push([i, j]);
      }
      // Medium distance - 70% chance
      else if (distance < 2.0 && Math.random() > 0.3) {
        connections.push([i, j]);
      }
      // Far connections - 40% chance for dense network
      else if (distance < 3.5 && Math.random() > 0.6) {
        connections.push([i, j]);
      }
    }
  }
  
  return connections;
}

// Signal that travels along connections
interface Signal {
  connectionIndex: number;
  progress: number;
  speed: number;
  color: string;
}

function AnimatedSignals({
  neurons,
  connections,
}: {
  neurons: Array<{ position: THREE.Vector3; color: string }>;
  connections: Array<[number, number]>;
}) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const signalsRef = useRef<Signal[]>([]);

  // Initialize signals
  useEffect(() => {
    const initialSignals: Signal[] = [];
    const signalCount = Math.min(20, connections.length);
    
    for (let i = 0; i < signalCount; i++) {
      const colors = ["#00f0ff", "#00ff88", "#8b3dff", "#ffffff", "#ff00ff"];
      initialSignals.push({
        connectionIndex: Math.floor(Math.random() * connections.length),
        progress: Math.random(),
        speed: 0.01 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    signalsRef.current = initialSignals;
    setSignals(initialSignals);
  }, [connections.length]);

  // Update signals every frame
  useFrame(() => {
    const updated = signalsRef.current.map((signal) => {
      let newProgress = signal.progress + signal.speed;
      let newConnectionIndex = signal.connectionIndex;
      
      // When signal reaches end, jump to a connected neuron
      if (newProgress >= 1) {
        newProgress = 0;
        const [, endNeuron] = connections[signal.connectionIndex];
        
        // Find connections starting from this neuron
        const nextConnections = connections
          .map((conn, idx) => ({ conn, idx }))
          .filter(({ conn }) => conn[0] === endNeuron || conn[1] === endNeuron);
        
        if (nextConnections.length > 0) {
          newConnectionIndex = nextConnections[Math.floor(Math.random() * nextConnections.length)].idx;
        } else {
          newConnectionIndex = Math.floor(Math.random() * connections.length);
        }
      }
      
      return {
        ...signal,
        progress: newProgress,
        connectionIndex: newConnectionIndex,
      };
    });
    
    signalsRef.current = updated;
  });

  return (
    <>
      {signalsRef.current.map((signal, idx) => {
        const [from, to] = connections[signal.connectionIndex];
        const start = neurons[from].position;
        const end = neurons[to].position;
        
        // Interpolate position
        const pos = new THREE.Vector3().lerpVectors(start, end, signal.progress);
        
        return (
          <group key={`signal-${idx}`}>
            <mesh position={pos}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color={signal.color}
                emissive={signal.color}
                emissiveIntensity={2}
              />
            </mesh>
            <pointLight position={pos} color={signal.color} intensity={1} distance={0.8} />
          </group>
        );
      })}
    </>
  );
}

function FloatingNeurons({
  neurons,
  connections,
}: {
  neurons: Array<{ position: THREE.Vector3; color: string }>;
  connections: Array<[number, number]>;
}) {
  const neuronRefs = useRef<THREE.Mesh[]>([]);
  const initialPositions = useMemo(() => neurons.map((n) => n.position.clone()), [neurons]);

  // Animate neurons floating inside sphere
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    neuronRefs.current.forEach((mesh, i) => {
      if (!mesh) return;

      const initial = initialPositions[i];
      const offset = i * 0.5;

      // Floating motion with sine waves
      const floatX = Math.sin(time * 0.3 + offset) * 0.15;
      const floatY = Math.cos(time * 0.4 + offset * 1.2) * 0.15;
      const floatZ = Math.sin(time * 0.35 + offset * 0.8) * 0.15;

      mesh.position.set(initial.x + floatX, initial.y + floatY, initial.z + floatZ);
    });
  });

  return (
    <>
      {/* Dynamic connections that follow neurons */}
      {connections.map(([from, to], idx) => (
        <FloatingConnection
          key={`conn-${idx}`}
          from={from}
          to={to}
          neuronRefs={neuronRefs}
          neurons={neurons}
        />
      ))}

      {/* Neurons */}
      {neurons.map((neuron, idx) => (
        <mesh
          key={`neuron-${idx}`}
          ref={(el) => {
            if (el) neuronRefs.current[idx] = el;
          }}
          position={neuron.position}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color={neuron.color}
            emissive={neuron.color}
            emissiveIntensity={0.5}
          />
          <pointLight color={neuron.color} intensity={0.3} distance={0.4} />
        </mesh>
      ))}
    </>
  );
}

function FloatingConnection({
  from,
  to,
  neuronRefs,
  neurons,
}: {
  from: number;
  to: number;
  neuronRefs: React.MutableRefObject<THREE.Mesh[]>;
  neurons: Array<{ position: THREE.Vector3; color: string }>;
}) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(() => {
    const fromMesh = neuronRefs.current[from];
    const toMesh = neuronRefs.current[to];

    if (!lineRef.current || !fromMesh || !toMesh) return;

    const positions = lineRef.current.geometry.attributes.position;
    const fromPos = fromMesh.position;
    const toPos = toMesh.position;

    positions.setXYZ(0, fromPos.x, fromPos.y, fromPos.z);
    positions.setXYZ(1, toPos.x, toPos.y, toPos.z);
    positions.needsUpdate = true;
  });

  const start = neurons[from].position;
  const end = neurons[to].position;
  const distance = start.distanceTo(end);
  const opacity = distance < 1.5 ? 0.35 : distance < 2.5 ? 0.25 : 0.15;

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array([
      start.x, start.y, start.z,
      end.x, end.y, end.z
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [start, end]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#00f0ff", opacity, transparent: true }),
    [opacity]
  );

  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />;
}

function BrainSphereCore() {
  const groupRef = useRef<THREE.Group>(null);
  const neurons = useMemo(() => generateNeurons(35, 2), []);
  const connections = useMemo(() => generateConnections(neurons), [neurons]);

  // Particles geometry
  const particlesGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(
      Array.from({ length: 450 }, () => (Math.random() - 0.5) * 6)
    );
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer sphere wireframe */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" wireframe opacity={0.1} transparent />
      </mesh>

      {/* Floating neurons with dynamic connections */}
      <FloatingNeurons neurons={neurons} connections={connections} />

      {/* Animated signals */}
      <AnimatedSignals neurons={neurons} connections={connections} />

      {/* Ambient particles */}
      <points geometry={particlesGeometry}>
        <pointsMaterial size={0.015} color="#00f0ff" transparent opacity={0.4} />
      </points>
    </group>
  );
}

export default function BrainSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b3dff" />
        <BrainSphereCore />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

