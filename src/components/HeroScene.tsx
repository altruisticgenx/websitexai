import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let mesh: THREE.Mesh | null = null;
    let particles: THREE.Points | null = null;
    let animationId: number | null = null;

    try {
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true, 
        antialias: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      scene = new THREE.Scene();
      scene.background = null;

      camera = new THREE.PerspectiveCamera(
        60, 
        canvas.clientWidth / canvas.clientHeight, 
        0.1, 
        1000
      );
      camera.position.set(0, 0, 5);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x00d4aa, 1.2, 50);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const geometry = new THREE.IcosahedronGeometry(1.8, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x00d4aa,
        wireframe: true,
        opacity: 0.25,
        transparent: true,
      });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 50;
      const positions = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 5;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00d4aa,
        size: 0.05,
        transparent: true,
        opacity: 0.4,
      });
      
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      const animate = () => {
        if (!mesh || !particles || !renderer || !scene || !camera) return;
        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      const onResize = () => {
        if (!canvas || !camera || !renderer) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener("resize", onResize);

      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
      };
    } catch (error) {
      console.error('HeroScene initialization error:', error);
      return;
    }
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-40"
    />
  );
}
