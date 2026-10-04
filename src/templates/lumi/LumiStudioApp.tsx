import React, { useState } from 'react';
import { ArrowUpRight, Box, Compass, Cpu, Layers, Sparkles, Check, ChevronRight } from 'lucide-react';

export const LumiStudioApp: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'spatial' | 'haptic' | 'materials'>('spatial');
  const [inquirySent, setInquirySent] = useState(false);

  const features = {
    spatial: {
      title: 'Spatial Operating Logic',
      desc: 'Fluid depth layering and micro-elevation cues calibrated for zero-friction interaction across modern glass viewports.',
      metrics: '0.4ms compositor response · 60fps gesture latency',
      tag: 'Interface Architecture'
    },
    haptic: {
      title: 'Subtle Haptic Synchrony',
      desc: 'Harmonized tactile response profiles that translate tactile mechanical clicks into responsive digital tactile feedback.',
      metrics: 'Integrated haptic feedback profiles',
      tag: 'Sensory Calibration'
    },
    materials: {
      title: 'Acoustic & Monolithic Materials',
      desc: 'Constructed from sustainably harvested anodized titanium alloys and frosted optical borosilicate crystal.',
      metrics: '100% recycled aerospace titanium',
      tag: 'Material Integrity'
    }
  };

  const caseStudies = [
    { client: 'Aether Spatial', scope: 'Spatial Computing OS & Hardware Ergonomics', year: '2026', impact: '+340% Focus Dwell' },
    { client: 'Nordic Acoustic', scope: 'Audiophile Noise Cancellation Rig', year: '2025', impact: 'Design Award 2025' },
    { client: 'Forma Objects', scope: 'Modular Titanium Kitchen Atelier', year: '2025', impact: 'Featured in Wallpaper*' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#16161a] font-sans selection:bg-black selection:text-white">
      {/* Minimal Top Bar */}
      <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-neutral-900 flex items-center justify-center text-white text-[11px] font-bold">
            L
          </div>
          <span className="font-syne font-bold text-lg tracking-tight uppercase">
            LUMI STUDIO
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-500">
          <a href="#principles" className="hover:text-black transition-colors">Philosophy</a>
          <a href="#hardware" className="hover:text-black transition-colors">Industrial Rig</a>
          <a href="#work" className="hover:text-black transition-colors">Selected Work</a>
        </nav>

        <a
          href="#contact"
          className="px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all cursor-pointer"
        >
          Initiate Brief
        </a>
      </header>

      {/* Spacious Minimalist Hero */}
      <section className="py-28 px-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">
          <span>COPENHAGEN & TOKYO</span>
          <span>·</span>
          <span>SPATIAL INDUSTRIAL DESIGN</span>
        </div>

        <h1 className="font-syne text-5xl sm:text-7xl font-bold tracking-tight text-neutral-950 mb-8 leading-[1.05]">
          Less noise. <br />
          <span className="text-neutral-400 font-normal">Pure physical clarity.</span>
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed mb-10 font-normal">
          Lumi is an industrial product and digital interface studio. We synthesize tactile physical architecture with weightless spatial software for the next decade of human computing.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#hardware"
            className="px-7 py-3 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-all"
          >
            Explore Industrial System
          </a>
          <a
            href="#work"
            className="px-7 py-3 rounded-full text-xs font-semibold border border-neutral-300 text-neutral-800 hover:border-black transition-all"
          >
            View Monograph
          </a>
        </div>
      </section>

      {/* Interactive Hardware / Product Breakdown */}
      <section id="hardware" className="py-20 border-t border-neutral-200/80 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">Architecture 01</span>
              <h2 className="font-syne text-3xl font-bold">Spatial Console Rig</h2>
            </div>

            {/* Feature selector tabs */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-full text-xs font-medium">
              {(['spatial', 'haptic', 'materials'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key)}
                  className={`px-3.5 py-1.5 rounded-full capitalize transition-all cursor-pointer ${
                    activeFeature === key
                      ? 'bg-white text-neutral-950 shadow-sm font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 border border-neutral-200/80 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-neutral-200 text-neutral-800">
                {features[activeFeature].tag}
              </span>
              <h3 className="font-syne text-2xl font-bold text-neutral-950">
                {features[activeFeature].title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {features[activeFeature].desc}
              </p>
              <div className="pt-2 text-xs font-mono text-neutral-500 border-t border-neutral-200">
                {features[activeFeature].metrics}
              </div>
            </div>

            <div className="aspect-square rounded-2xl bg-neutral-200/70 border border-neutral-300 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="w-32 h-32 rounded-3xl bg-neutral-900 shadow-2xl flex items-center justify-center text-white text-3xl font-bold transform -rotate-6 transition-transform duration-500 hover:rotate-0">
                <Box className="w-12 h-12 text-white/80" />
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neutral-400">
                ISOMETRIC PROJECTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Case Studies */}
      <section id="work" className="py-24 max-w-5xl mx-auto px-8">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">Index of Work</span>
          <h2 className="font-syne text-3xl font-bold">Selected Commissions</h2>
        </div>

        <div className="divide-y divide-neutral-200">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer"
            >
              <div>
                <h3 className="font-syne text-2xl font-bold group-hover:translate-x-2 transition-transform">
                  {cs.client}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">{cs.scope}</p>
              </div>

              <div className="flex items-center gap-8 text-xs font-mono text-neutral-500">
                <span>{cs.year}</span>
                <span className="font-semibold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full">
                  {cs.impact}
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer id="contact" className="border-t border-neutral-200 py-16 px-8 bg-neutral-100 text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-syne font-bold text-neutral-900 text-sm mb-1">LUMI INDUSTRIAL ATELIER</div>
            <p>Designed on HAVEN Spatial Minimalist Framework</p>
          </div>
          <div className="flex items-center gap-6">
            <span>studio@lumi-atelier.com</span>
            <span>·</span>
            <span>© 2026 LUMI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
