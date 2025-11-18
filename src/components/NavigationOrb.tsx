import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Mail, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  icon: any;
  label: string;
  action: () => void;
  color: string;
}

export function NavigationOrb() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let rafId: number;
    let targetX = window.innerWidth - 100;
    let targetY = window.innerHeight - 100;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth following with easing
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsHovered(false);
    }
  };

  const navItems: NavItem[] = [
    { 
      icon: Home, 
      label: 'Home',
      action: () => { navigate('/'); setIsHovered(false); },
      color: 'hsl(var(--primary))'
    },
    { 
      icon: Briefcase, 
      label: 'Projects',
      action: () => scrollToSection('builds'),
      color: 'hsl(var(--accent))'
    },
    { 
      icon: Sparkles, 
      label: 'How It Works',
      action: () => scrollToSection('how'),
      color: 'hsl(var(--secondary))'
    },
    { 
      icon: BookOpen, 
      label: 'Portfolio',
      action: () => { navigate('/portfolio'); setIsHovered(false); },
      color: 'hsl(var(--primary))'
    },
    { 
      icon: Mail, 
      label: 'Contact',
      action: () => scrollToSection('pilot'),
      color: 'hsl(var(--accent))'
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        ref={orbRef}
        className="absolute pointer-events-auto"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          x: '-50%',
          y: '-50%',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Orb */}
        <motion.div
          className="relative"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 0 : 360,
          }}
          transition={{
            scale: { duration: 0.3, ease: 'easeOut' },
            rotate: { duration: 20, ease: 'linear', repeat: Infinity },
          }}
        >
          <motion.div
            className="w-16 h-16 rounded-full cursor-pointer relative"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--accent) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.3)',
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 0 60px hsl(var(--primary) / 0.8), 0 0 120px hsl(var(--accent) / 0.6), inset 0 0 30px hsl(var(--primary) / 0.5)'
                : '0 0 40px hsl(var(--primary) / 0.6), 0 0 80px hsl(var(--accent) / 0.4), inset 0 0 20px hsl(var(--primary) / 0.3)',
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.8), transparent)',
              }}
              animate={{
                opacity: isHovered ? 1 : 0.6,
              }}
            />
            
            {/* Center icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: isHovered ? 0 : -360,
              }}
              transition={{
                rotate: { duration: 20, ease: 'linear', repeat: Infinity },
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Navigation Items */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {navItems.map((item, index) => {
                const angle = (index / navItems.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={item.label}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x, y, scale: 1, opacity: 1 }}
                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.05,
                    }}
                  >
                    <motion.button
                      onClick={item.action}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white relative group"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 20px ${item.color}`,
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: `0 0 30px ${item.color}, 0 0 60px ${item.color}`,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.icon className="w-5 h-5" />
                      
                      {/* Tooltip */}
                      <motion.div
                        className="absolute top-full mt-2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          backgroundColor: 'hsl(var(--background))',
                          color: 'hsl(var(--foreground))',
                          border: '1px solid hsl(var(--border))',
                        }}
                      >
                        {item.label}
                      </motion.div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint text when not hovered */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 2 }}
              className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap px-3 py-1 rounded-full"
              style={{
                backgroundColor: 'hsl(var(--background) / 0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Hover to navigate
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
