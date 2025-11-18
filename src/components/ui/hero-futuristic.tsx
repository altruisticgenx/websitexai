'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroScene } from './hero-futuristic-scene';

export const HeroFuturistic = () => {
  const titleWords = 'Ethical AI Algorithms for Future Systems'.split(' ');
  const subtitle = 'Building transparent, accountable AI frameworks that prioritize human values, fairness, and long-term societal benefit over short-term optimization.';
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

  useEffect(() => {
    // Generate random delays for glitch effect (client-side only)
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 400);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('who');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-slate-950">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
        >
          <HeroScene />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Kicker Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            AltruisticX AI · Ethical Algorithm Framework
          </div>

          {/* Main Title with Gradient */}
          <div className="mb-6 text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <div className="flex flex-wrap justify-center gap-2 overflow-hidden sm:gap-3 lg:gap-4">
              {titleWords.map((word, index) => (
                <div
                  key={index}
                  className={`${index < visibleWords ? 'fade-in' : ''} bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent`}
                  style={{
                    animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                    opacity: index < visibleWords ? undefined : 0,
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div className="mx-auto mb-8 max-w-3xl overflow-hidden text-sm font-medium text-slate-300 sm:text-base md:text-lg lg:text-xl">
            <div
              className={subtitleVisible ? 'fade-in-subtitle' : ''}
              style={{
                animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
                opacity: subtitleVisible ? undefined : 0,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Key Points */}
          <div className="mx-auto mb-10 grid max-w-4xl gap-3 text-left text-xs text-slate-200 sm:grid-cols-3 sm:text-sm">
            <div
              className={`${subtitleVisible ? 'fade-in' : ''} rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur-sm`}
              style={{ animationDelay: '1.8s', opacity: subtitleVisible ? undefined : 0 }}
            >
              <div className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-400">
                Transparency
              </div>
              <div className="text-sm font-medium text-slate-50">
                Every decision traceable, every bias measurable
              </div>
            </div>
            <div
              className={`${subtitleVisible ? 'fade-in' : ''} rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur-sm`}
              style={{ animationDelay: '2s', opacity: subtitleVisible ? undefined : 0 }}
            >
              <div className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-400">
                Human-Aligned
              </div>
              <div className="text-sm font-medium text-slate-50">
                Optimizing for wellbeing, not just efficiency
              </div>
            </div>
            <div
              className={`${subtitleVisible ? 'fade-in' : ''} rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur-sm`}
              style={{ animationDelay: '2.2s', opacity: subtitleVisible ? undefined : 0 }}
            >
              <div className="mb-1 text-[11px] font-mono uppercase tracking-[0.18em] text-violet-400">
                Open Research
              </div>
              <div className="text-sm font-medium text-slate-50">
                Sharing our framework for collective AI safety
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`${subtitleVisible ? 'fade-in' : ''} flex flex-col items-center justify-center gap-4 sm:flex-row`}
            style={{ animationDelay: '2.4s', opacity: subtitleVisible ? undefined : 0 }}
          >
            <a
              href="mailto:altruisticxai@gmail.com?subject=Learn%20More%20About%20Ethical%20AI%20Framework"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:bg-emerald-300"
            >
              Read the Framework
            </a>
            <a
              href="mailto:altruisticxai@gmail.com?subject=Join%20AI%20Research"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-medium text-slate-100 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-slate-900"
            >
              Join the Research
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to explore button */}
      <button
        onClick={scrollToNext}
        className="explore-btn"
        aria-label="Scroll to explore more"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <span className="explore-arrow">
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
    </section>
  );
};

export default HeroFuturistic;
