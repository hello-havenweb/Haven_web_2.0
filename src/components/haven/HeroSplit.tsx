import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Sparkles, Moon, Sun, ShoppingBag, Terminal, Palette, Crown, Building2 } from 'lucide-react';
import havenWolfNightImg from '../../assets/images/haven_wolf_night_1790347456490.jpg';
import havenDayCityImg from '../../assets/images/haven_day_city_1790347468632.jpg';

export const HeroSplit: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight, setTheme } = useTheme();

  // Split slider position (percentage 0 to 100, default 60% so wolf and night atmosphere are prominent while city/mountains anchor the right)
  const [splitPos, setSplitPos] = useState<number>(60);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [idleOffset, setIdleOffset] = useState<number>(0);
  const [mouseParallax, setMouseParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Gentle cinematic idle breathing animation before user interaction
  useEffect(() => {
    if (hasInteracted || isDragging) {
      setIdleOffset(0);
      return;
    }
    let frameId: number;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      setIdleOffset(Math.sin(elapsed * 1.2) * 1.8);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasInteracted, isDragging]);

  const effectiveSplit = Math.max(15, Math.min(85, splitPos + (hasInteracted ? 0 : idleOffset)));

  // Dragging logic for the split divider
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    setIsDragging(true);
  };
  const handleTouchStart = () => {
    setHasInteracted(true);
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(12, Math.min(88, (x / rect.width) * 100));
      setSplitPos(percentage);

      // Smoothly sync global theme context based on threshold
      if (percentage < 45 && isNight) {
        setTheme('day');
      } else if (percentage >= 45 && !isNight) {
        setTheme('night');
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    const stopDrag = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', stopDrag);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, isNight, setTheme]);

  // Subtle cinematic mouse parallax across layers
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 8, y: y * 5 });
  };

  // Toggle night / day with cinematic smooth slider animation
  const handleModeToggle = (mode: 'night' | 'day') => {
    setHasInteracted(true);
    setTheme(mode);
    if (mode === 'night') {
      setSplitPos(76);
    } else {
      setSplitPos(26);
    }
  };

  const disciplines = [
    { label: 'E-Commerce', icon: ShoppingBag, slug: 'business' },
    { label: 'SaaS & Tech', icon: Terminal, slug: 'apex' },
    { label: 'Creative Studios', icon: Palette, slug: 'vintage' },
    { label: 'Luxury & Hospitality', icon: Crown, slug: 'restaurant' },
    { label: 'Enterprise Systems', icon: Building2, slug: 'minimal' },
  ];

  return (
    <section
      onMouseMove={handleContainerMouseMove}
      className="relative w-full min-h-[94vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden select-none bg-[#05020c]"
    >
      {/* Cinematic Panoramic Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        {/* Layer 1: Base Night Environment (Dark mountains, deep purple starry sky, moon glow, violet atmospheric mist, and the majestic dark wolf with violet rim light on center-right rocky foreground) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#05020c] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseParallax.x * -0.4}px, ${mouseParallax.y * -0.4}px, 0) scale(1.02)`
          }}
        >
          <img
            src={havenWolfNightImg}
            alt="HAVEN Majestic Dark Wolf in Nocturnal Mountain Environment with Violet Atmospheric Lighting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />

          {/* Deep volumetric nocturnal gradients & vignette for typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06030e]/95 via-[#06030e]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020c] via-transparent to-[#05020c]/60 pointer-events-none" />
          
          {/* Subtle cosmic violet radial aura behind the wolf and mountain ridge */}
          <div className="absolute top-1/3 left-[58%] -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Layer 2: Day Mountain & Modern City Environment (Bright warm sunlight, blue sky, golden highlights, sunlit mountain peaks, valley lake, and modern skyline) */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${
            isDragging ? 'transition-none' : 'transition-[clip-path] duration-500 ease-out'
          }`}
          style={{
            clipPath: `inset(0 0 0 ${effectiveSplit}%)`,
            WebkitClipPath: `inset(0 0 0 ${effectiveSplit}%)`,
          }}
        >
          <img
            src={havenDayCityImg}
            alt="HAVEN Sunlit Mountain Valley with Modern Skyline and Lake at Dawn"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
            style={{
              transform: `translate3d(${mouseParallax.x * -0.6}px, ${mouseParallax.y * -0.6}px, 0) scale(1.03)`
            }}
          />

          {/* Soft atmospheric daylight vignette and horizon blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020c] via-transparent to-[#05020c]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-amber-500/5 pointer-events-none mix-blend-color" />
        </div>

        {/* Atmospheric Environmental Harmonization Layers */}
        {/* Soft violet rim light halo blending between night wolf crag and daylight horizon */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[340px] h-[700px] bg-gradient-to-r from-purple-600/20 via-violet-400/15 to-transparent blur-[80px] pointer-events-none"
          style={{ left: `${effectiveSplit - 15}%` }}
        />

        {/* Ground obsidian anchor gradient across bottom */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#05020c] via-[#05020c]/80 to-transparent pointer-events-none" />

        {/* ========================================================================= */}
        {/* 3. REFINED VISIBLE VERTICAL PURPLE TRANSITION LINE & INTERACTIVE SLIDER    */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-y-0 z-30 flex items-center justify-center select-none cursor-ew-resize ${
            isDragging ? 'transition-none' : 'transition-[left] duration-500 ease-out'
          }`}
          style={{ left: `${effectiveSplit}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-valuenow={Math.round(effectiveSplit)}
          aria-label="Interactive Day and Night environment slider"
        >
          {/* Atmospheric Light Spill (Outermost soft violet glow column) */}
          <div className="absolute inset-y-0 w-24 -translate-x-1/2 pointer-events-none bg-gradient-to-r from-purple-700/0 via-purple-500/20 to-purple-700/0 blur-xl" />

          {/* Soft Violet Outer Glow (Medium diffuse luminous glow) */}
          <div className="absolute inset-y-0 w-4 -translate-x-1/2 pointer-events-none bg-gradient-to-b from-purple-400/20 via-purple-400/40 to-purple-500/20 blur-sm" />

          {/* Thin Bright Violet Core (Thin, controlled, high-end 2px line) */}
          <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-purple-300/40 via-purple-200 via-fuchsia-300 to-purple-400/50 shadow-[0_0_8px_rgba(216,180,254,0.95),0_0_18px_rgba(168,85,247,0.7),0_0_30px_rgba(147,51,234,0.4)]" />

          {/* Draggable-Style Control Handle (Elegantly positioned along the line) */}
          <div className="relative group flex items-center justify-center">
            {/* Soft pulsing aura behind handle */}
            <div className="absolute w-12 h-12 rounded-full bg-purple-500/30 blur-md pointer-events-none group-hover:bg-purple-500/50 group-hover:scale-125 transition-all duration-300" />

            {/* Circular Glass Disc Handle */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#12072b]/95 border-2 border-purple-300/90 text-white flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.85),inset_0_0_8px_rgba(192,132,252,0.6)] backdrop-blur-md group-hover:scale-110 active:scale-95 transition-transform duration-150">
              <span className="text-[11px] font-bold text-purple-100 select-none tracking-tighter">
                ⇄
              </span>
            </div>

            {/* Subtle drag tooltip on hover */}
            <div className="absolute -top-8 px-2.5 py-1 rounded-full bg-[#0d051c]/95 border border-purple-400/40 text-[9px] font-mono uppercase tracking-widest text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-xl">
              Night ⇄ Day
            </div>
          </div>
        </div>

        {/* Top-Right Day/Night Mode Pill Toggle */}
        <div className="absolute top-24 right-6 sm:right-12 z-30">
          <div className="px-3 py-1.5 rounded-full bg-[#0d0720]/80 border border-purple-500/40 backdrop-blur-xl flex items-center gap-2 text-xs font-semibold shadow-2xl">
            <button
              onClick={() => handleModeToggle('night')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                isNight
                  ? 'bg-purple-600/90 text-white shadow-[0_0_12px_rgba(168,85,247,0.7)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-purple-200" />
              <span>Night</span>
            </button>
            <button
              onClick={() => handleModeToggle('day')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                !isNight
                  ? 'bg-amber-500 text-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.7)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-300" />
              <span>Day</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Content (Left-Aligned, Typographic Polish, Clean Negative Space) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center pt-8">
        <div className="max-w-2xl">
          {/* Eyebrow Kicker */}
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-purple-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Website Building • Design • Branding</span>
          </div>

          {/* Chrome / Violet Metallic HAVEN Logo Banner with Chamfer Reflections */}
          <div className="relative inline-block mb-3">
            <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none bg-gradient-to-b from-white via-[#ded8f7] to-[#8d71d0] bg-clip-text text-transparent drop-shadow-[0_8px_32px_rgba(168,85,247,0.45)]">
              HAVEN
            </h1>
            {/* Soft metallic rim glare effect */}
            <div className="absolute -top-1 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-60 blur-xs" />
          </div>

          {/* Main Headline */}
          <h2 className="font-syne text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Websites Built for{' '}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(168,85,247,0.7)]">
              Your Vision.
            </span>
          </h2>

          {/* Value Proposition */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl mb-9 font-normal">
            We craft modern, high-converting websites and digital experiences tailored to your brand. From bespoke editorial designs to full-scale digital platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('templates')}
              className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_24px_rgba(147,51,234,0.55)] hover:shadow-[0_0_36px_rgba(147,51,234,0.75)] flex items-center gap-2.5 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <span>Explore Templates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className="px-7 py-3.5 rounded-full text-sm font-medium tracking-wide text-neutral-200 hover:text-white bg-[#0e0722]/70 hover:bg-[#150a33] border border-purple-600/40 hover:border-purple-400/80 backdrop-blur-xl shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Category Bar: TRUSTED BY FORWARD-THINKING BRANDS */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        {/* Sleek Neon Purple Contour Line Curve */}
        <div className="w-full h-4 mb-2 overflow-visible relative pointer-events-none">
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1200 16">
            <path
              d="M0,14 L180,14 Q230,14 260,2 L300,2"
              fill="none"
              stroke="rgba(168,85,247,0.75)"
              strokeWidth="1.8"
            />
            <path
              d="M300,2 L1200,2"
              fill="none"
              stroke="rgba(168,85,247,0.2)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-1">
          <div className="flex items-center gap-4">
            <div className="text-[11px] font-bold tracking-widest uppercase text-purple-300 whitespace-nowrap">
              Trusted By
              <br />
              <span className="text-neutral-400 font-medium">Visionary Brands</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-purple-900/50" />
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {disciplines.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => navigateTo('templates')}
                  className="flex items-center gap-2.5 text-xs text-neutral-400 hover:text-purple-300 transition-colors cursor-pointer group"
                >
                  <Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium tracking-wide">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
