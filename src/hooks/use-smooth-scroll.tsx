import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Add 3D effect during scroll
        document.body.style.perspective = '1000px';
        targetElement.style.transformStyle = 'preserve-3d';
        
        // Smooth scroll with offset for fixed header
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Add subtle 3D animation on arrival
        targetElement.style.transform = 'translateZ(20px) rotateX(2deg)';
        targetElement.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
          targetElement.style.transform = 'translateZ(0) rotateX(0)';
        }, 100);
        
        setTimeout(() => {
          targetElement.style.transform = '';
          targetElement.style.transition = '';
        }, 700);
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
