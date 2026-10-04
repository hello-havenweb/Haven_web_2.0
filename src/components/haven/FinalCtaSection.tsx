import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <section className="py-32 relative overflow-hidden bg-[#05020c]">
      {/* Cinematic ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/25 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-950/80 border border-purple-600/50 text-purple-300 mb-8 backdrop-blur-xl shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Launch Your Digital Presence</span>
        </div>

        <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-8 text-white">
          Your Vision Deserves a{' '}
          <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]">
            Better Website.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
          Choose a starting point, tell us what you need, and let HAVEN turn your idea into a digital experience that commands respect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <button
            onClick={() => navigateTo('templates')}
            className="px-9 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:shadow-[0_0_40px_rgba(147,51,234,0.8)] flex items-center gap-3 transition-all duration-300 cursor-pointer active:scale-95 group"
          >
            <span>Explore Templates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className="px-9 py-4 rounded-full text-xs font-semibold tracking-wider uppercase text-neutral-200 hover:text-white bg-[#0f0724]/80 hover:bg-[#190c3b] border border-purple-600/50 hover:border-purple-400 backdrop-blur-xl shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
