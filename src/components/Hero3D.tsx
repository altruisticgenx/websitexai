import { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// Design token colors - AI control room aesthetic (calm cyan and blue tones)
const SPHERE_COLORS = {
  primary: '#38bdf8',       // hsl(199, 89%, 48%) - Cyan
  accent: '#0ea5e9',        // Lighter cyan for accents
  glow: '#22d3ee',          // Bright cyan for glow effects
  dark: '#1e293b',          // Dark blue-grey
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
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
          toneMapped={false}
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
        color={SPHERE_COLORS.glow}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

ParticleField.displayName = 'ParticleField';

export const Hero3DBackground = memo(() => {
  return (
    <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Performance optimization
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 5, 15]} />
        
        <ambientLight intensity={0.3} color="#38bdf8" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={SPHERE_COLORS.primary} />
        <pointLight position={[-10, -10, -10]} color={SPHERE_COLORS.glow} intensity={1} />
        <pointLight position={[0, 5, 5]} color={SPHERE_COLORS.accent} intensity={0.8} />
        
        <AnimatedSphere position={[-3, 0, 0]} color={SPHERE_COLORS.primary} speed={0.8} />
        <AnimatedSphere position={[3, 1, -2]} color={SPHERE_COLORS.glow} speed={1.2} />
        
        <ParticleField />
      </Canvas>
    </div>
  );
});

Hero3DBackground.displayName = 'Hero3DBackground';
