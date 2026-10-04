import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Compass, Layers, Zap, Sparkles, ShieldCheck } from 'lucide-react';

export const IntroStorySection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <section className="py-28 relative overflow-hidden bg-[#06020d]">
      {/* Ambient background glow and soft purple nebular lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text / Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40 text-xs font-mono uppercase tracking-widest text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>What HAVEN Does</span>
            </div>

            <h2 className="font-syne text-3xl sm:text-5xl font-black leading-tight text-white tracking-tight">
              We replace generic templates with bespoke digital masterpieces.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-neutral-300 font-normal">
              Most website builders deliver lifeless blocks that look identical to every competitor. At HAVEN, we treat every digital presence as an editorial signature — blending cinematic visual direction with razor-sharp web engineering.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#14082c] hover:bg-[#1d0c40] border border-purple-600/40 hover:border-purple-400 text-purple-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 group shadow-lg"
              >
                <span>Read Our Craft Philosophy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Highlights: 3 Layered Premium Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-7 rounded-2xl bg-gradient-to-r from-[#120726] to-[#0a0316] border border-purple-800/40 hover:border-purple-500/60 transition-all duration-300 shadow-xl flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-purple-400 font-semibold mb-1">
                  Pillar 01 // Bespoke Art Direction
                </div>
                <h3 className="font-syne text-xl font-bold text-white mb-1.5">
                  Original Brand Identity
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Unique layouts, customized lighting palettes, and deliberate typographic hierarchy tailored to your exact industry. No duplicate themes.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-gradient-to-r from-[#120726] to-[#0a0316] border border-purple-800/40 hover:border-purple-500/60 transition-all duration-300 shadow-xl flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-indigo-400 font-semibold mb-1">
                  Pillar 02 // Engineering Standards
                </div>
                <h3 className="font-syne text-xl font-bold text-white mb-1.5">
                  Sub-Second Performance
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Engineered with clean TypeScript and modern CSS. Fluid 60fps animations, rock-solid security, and flawless responsive fluidity from mobile to 4K displays.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-gradient-to-r from-[#170932] to-[#0e041f] border border-purple-600/50 hover:border-purple-400 transition-all duration-300 shadow-xl shadow-purple-950/40 flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/25 border border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-purple-300 font-semibold mb-1">
                  Pillar 03 // Real Functionality
                </div>
                <h3 className="font-syne text-xl font-bold text-white mb-1.5">
                  Real Working Websites
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Every template is a complete, functioning web application with real navigation, booking flows, and interactive state ready for immediate production deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
