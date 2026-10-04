import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Sparkles, Code2, HeartHandshake, Eye } from 'lucide-react';
import heroHavenWolfNightImg from '../assets/images/hero_haven_wolf_night_1790340961914.jpg';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Ethos & Origin</span>
          </div>
          <h1
            className={`font-syne text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Digital Craftsmanship Without Compromise.
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            HAVEN is an independent digital design and web engineering studio. We build web applications that treat typography, lighting, and performance with genuine artistic intent.
          </p>
        </div>

        {/* Story Section 1: The Problem with the Web */}
        <div
          className={`p-8 sm:p-12 rounded-3xl mb-12 transition-all ${
            isNight ? 'bg-[#0d091c]/70 border border-purple-900/30' : 'bg-white border border-purple-100 shadow-md'
          }`}
        >
          <div className="max-w-3xl space-y-6">
            <h2 className={`font-syne text-2xl sm:text-3xl font-bold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              The antidote to generic web monotony.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
              The modern web has become homogenized. Millions of businesses look virtually indistinguishable, assembled using identical SaaS builder templates filled with purple jelly blobs and vacuous buzzwords.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-neutral-400">
              At HAVEN, we believe your website should feel like walking into a flagship architectural pavilion. Whether you are an elite esports roster commanding global tournaments, a heritage horology atelier crafting mechanical wonders, or a culinary master curating sensory tasting menus — your digital home must carry weight, prestige, and authenticity.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div
            className={`p-8 rounded-2xl ${
              isNight ? 'bg-[#0c0819]/80 border border-purple-900/30' : 'bg-white border border-purple-100 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-5">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className={`font-syne text-lg font-bold mb-3 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              Cinematic Visuals
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              We design with atmosphere. Dramatic contrast, intentional negative space, and evocative lighting that captures your visitor’s imagination immediately.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl ${
              isNight ? 'bg-[#0c0819]/80 border border-purple-900/30' : 'bg-white border border-purple-100 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-5">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className={`font-syne text-lg font-bold mb-3 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              Clean Code Integrity
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Engineered with modern TypeScript and responsive CSS. Fast load times, zero runtime vulnerabilities, and full code ownership for our clients.
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl ${
              isNight ? 'bg-[#0c0819]/80 border border-purple-900/30' : 'bg-white border border-purple-100 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className={`font-syne text-lg font-bold mb-3 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              Direct Collaboration
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              You collaborate directly with senior designers and engineers. Clear feedback loops, iterative staging environments, and zero bureaucratic friction.
            </p>
          </div>
        </div>

        {/* Mascot Origin Note */}
        <div
          className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center gap-8 ${
            isNight
              ? 'bg-gradient-to-r from-purple-950/40 to-indigo-950/20 border-purple-800/40'
              : 'bg-purple-50/60 border-purple-200'
          }`}
        >
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-purple-500/30 shadow-lg">
            <img
              src={heroHavenWolfNightImg}
              alt="The HAVEN Wolf"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
              Symbol of Guarded Craftsmanship
            </div>
            <h3 className={`font-syne text-xl font-bold mb-2 ${isNight ? 'text-white' : 'text-neutral-900'}`}>
              The HAVEN Guardian
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Our wolf mascot represents quiet strength, instinctual precision, and guarding the sacred standard of digital craftsmanship in an era of automated mediocrity.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>Commission a HAVEN Build</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
