import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export function InteractiveParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(initialParticles);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Calculate mouse velocity
      mouseVelocityRef.current = {
        x: e.clientX - lastMousePosRef.current.x,
        y: e.clientY - lastMousePosRef.current.y,
      };
      
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x, y });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 100;
      const y = ((touch.clientY - rect.top) / rect.height) * 100;
      
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Calculate distance from mouse
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply attraction/repulsion based on mouse velocity
          const velocityMagnitude = Math.sqrt(
            mouseVelocityRef.current.x ** 2 + mouseVelocityRef.current.y ** 2
          );
          
          let attractionX = 0;
          let attractionY = 0;
          
          if (distance < 30 && velocityMagnitude > 2) {
            // Repel when mouse is moving fast and close
            attractionX = -(dx / distance) * 0.5;
            attractionY = -(dy / distance) * 0.5;
          } else if (distance < 40) {
            // Gentle attraction when mouse is close
            attractionX = (dx / distance) * 0.15;
            attractionY = (dy / distance) * 0.15;
          }

          // Update position with attraction and base movement
          let newX = particle.x + particle.speedX + attractionX;
          let newY = particle.y + particle.speedY + attractionY;
          
          // Wrap around edges
          if (newX < -5) newX = 105;
          if (newX > 105) newX = -5;
          if (newY < -5) newY = 105;
          if (newY > 105) newY = -5;

          // Update opacity based on distance to mouse
          const newOpacity = distance < 25 
            ? Math.min(particle.opacity + 0.3, 1) 
            : Math.max(particle.opacity * 0.95, 0.3);

          return {
            ...particle,
            x: newX,
            y: newY,
            opacity: newOpacity,
          };
        })
      );
      
      // Decay mouse velocity
      mouseVelocityRef.current.x *= 0.9;
      mouseVelocityRef.current.y *= 0.9;
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, hsl(var(--lime)) ${particle.opacity * 100}%, transparent)`,
            boxShadow: `0 0 ${particle.size * 3}px hsl(var(--lime) / ${particle.opacity}), 0 0 ${particle.size * 6}px hsl(var(--lime) / ${particle.opacity * 0.5})`,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Mouse cursor glow effect */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          width: "60px",
          height: "60px",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(var(--lime) / 0.3) 0%, transparent 70%)`,
          boxShadow: "0 0 40px hsl(var(--lime) / 0.4)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
