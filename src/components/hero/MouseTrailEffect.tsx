import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  speed: number;
}

interface MouseTrailEffectProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const MouseTrailEffect: React.FC<MouseTrailEffectProps> = ({ containerRef }) => {
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0, timestamp: 0 });
  const lastSoundTime = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play sound based on speed threshold
  const playSpeedSound = (speed: number) => {
    if (!audioContextRef.current) return;
    const now = Date.now();
    if (now - lastSoundTime.current < 100) return;

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (speed < 0.5) {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.05;
    } else if (speed < 1.5) {
      oscillator.frequency.value = 400;
      gainNode.gain.value = 0.08;
    } else {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.12;
    }

    oscillator.type = 'sine';
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    oscillator.stop(audioContext.currentTime + 0.15);
    lastSoundTime.current = now;
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const dt = Math.max(now - lastMousePos.current.timestamp, 1);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = Math.min(distance / dt, 3);

    if (speed > 0.3) {
      playSpeedSound(speed);
    }

    lastMousePos.current = { x, y, timestamp: now };

    const newParticle: TrailParticle = {
      id: particleIdRef.current++,
      x,
      y,
      timestamp: now,
      speed,
    };
    setTrailParticles((prev) => [...prev, newParticle]);
  };

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrailParticles((prev) => prev.filter((particle) => now - particle.timestamp < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div onMouseMove={handleMouseMove} className="absolute inset-0 z-[5]" />
      {trailParticles.map((particle) => {
        const age = Date.now() - particle.timestamp;
        const lifespan = 1000;
        const progress = age / lifespan;
        const speedRatio = Math.min(particle.speed / 3, 1);

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none z-[6]"
            style={{
              left: particle.x,
              top: particle.y,
              background:
                speedRatio < 0.5
                  ? `radial-gradient(circle, hsl(var(--primary) / ${1 - progress}), transparent)`
                  : `radial-gradient(circle, hsl(var(--accent) / ${1 - progress}), transparent)`,
              boxShadow:
                speedRatio < 0.5
                  ? `0 0 ${8 * (1 - progress)}px ${4 * (1 - progress)}px hsl(var(--primary) / ${
                      0.6 * (1 - progress)
                    })`
                  : `0 0 ${12 * (1 - progress)}px ${6 * (1 - progress)}px hsl(var(--accent) / ${
                      0.7 * (1 - progress)
                    })`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.5 + speedRatio * 0.5, 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{
              duration: 1 - speedRatio * 0.3,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
};
