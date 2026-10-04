import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  const steps = [
    {
      num: '01',
      title: 'Choose a Template Foundation',
      desc: 'Browse our collection of live production templates or request a 100% custom canvas. Every template provides an architectural baseline.',
      note: '6 Live Archetypes'
    },
    {
      num: '02',
      title: 'Tell Us Your Vision',
      desc: 'Share your brand assets, color palette desires, copy, and specific business needs through our guided enquiry flow or discovery call.',
      note: 'Tailored Discovery'
    },
    {
      num: '03',
      title: 'We Build & Customize',
      desc: 'Our senior engineers adapt every component, refine motion timings, integrate your media, and test responsiveness across all viewports.',
      note: 'Senior Execution'
    },
    {
      num: '04',
      title: 'Launch & Continuous Care',
      desc: 'We map your custom domain, establish SSL encryption, optimize edge CDN routing, and hand over a pristine, live digital asset.',
      note: 'Zero-Downtime Launch'
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden bg-[#06030e]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Execution Methodology</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-5xl font-black tracking-tight text-white">
            How HAVEN Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            A transparent, client-centric 4-step path from initial concept to live digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="p-7 rounded-2xl transition-all duration-300 relative flex flex-col justify-between bg-[#0c051b]/80 border border-purple-900/30 hover:border-purple-500/60 shadow-xl group hover:shadow-purple-950/30"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-syne text-3xl font-black text-purple-400 group-hover:scale-105 transition-transform">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-300">
                    {step.note}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-bold mb-3 text-white">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-purple-400 font-medium pt-4 border-t border-purple-900/30 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Phase {idx + 1} Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/40 inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95 group"
          >
            <span>Start Your 4-Step Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
