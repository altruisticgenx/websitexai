import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// Design token colors - using HSL values from design system
const SPHERE_COLORS = {
  primary: 'hsl(168, 100%, 42%)',    // --primary
  accent: 'hsl(168, 89%, 53%)',      // --accent
  secondary: 'hsl(173, 95%, 21%)',   // --secondary
} as const;

interface SphereProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

const AnimatedSphere = memo(({ position, color, speed }: SphereProps) => {
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
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
});

AnimatedSphere.displayName = 'AnimatedSphere';

const ParticleField = memo(() => {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 50; // Reduced from 100 for better performance
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
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
        size={0.05}
        color={SPHERE_COLORS.primary}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
});

ParticleField.displayName = 'ParticleField';

export const Hero3DBackground = memo(() => {
  return (
    <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Performance optimization
        gl={{ 
          powerPreference: 'high-performance',
          antialias: false, // Disable for better performance
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color={SPHERE_COLORS.accent} intensity={0.5} />
        
        <AnimatedSphere position={[-3, 0, 0]} color={SPHERE_COLORS.primary} speed={0.8} />
        <AnimatedSphere position={[3, 1, -2]} color={SPHERE_COLORS.accent} speed={1.2} />
        
        <ParticleField />
      </Canvas>
    </div>
  );
});

Hero3DBackground.displayName = 'Hero3DBackground';
