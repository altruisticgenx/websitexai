import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// Design token colors
const COLORS = {
  primary: '#00d9b1', // emerald-400
  accent: '#22d3ee',  // cyan-400
  secondary: '#a855f7', // violet-400
};

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale?: number;
}

const AnimatedSphere = ({ position, color, speed, scale = 1 }: AnimatedSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[scale, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
};

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={COLORS.primary}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ScanningEffect = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    // Animate scanning line from top to bottom
    meshRef.current.position.y = Math.sin(time * 0.5) * 6;
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <planeGeometry args={[50, 0.1]} />
      <meshBasicMaterial
        color="#ff0000"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const HeroScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color={COLORS.primary} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={COLORS.accent} />
      <pointLight position={[0, 0, 10]} intensity={0.3} color={COLORS.secondary} />

      {/* Animated Spheres */}
      <AnimatedSphere position={[-4, 0, -2]} color={COLORS.primary} speed={0.6} scale={1.2} />
      <AnimatedSphere position={[4, 1, -3]} color={COLORS.accent} speed={0.8} scale={0.9} />
      <AnimatedSphere position={[0, -2, -1]} color={COLORS.secondary} speed={1.0} scale={0.7} />

      {/* Particle Field */}
      <ParticleField />

      {/* Scanning Effect */}
      <ScanningEffect />

      {/* Additional atmosphere */}
      <fog attach="fog" args={['#0a0a14', 5, 25]} />
    </>
  );
};
