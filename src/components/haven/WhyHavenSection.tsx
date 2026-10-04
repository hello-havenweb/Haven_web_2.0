import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Shield, Smartphone, Terminal, Clock, Users, Sparkles } from 'lucide-react';

export const WhyHavenSection: React.FC = () => {
  const { isNight } = useTheme();

  const reasons = [
    {
      icon: Sparkles,
      title: 'Built Around Your Vision',
      desc: 'We never force your business into an inflexible template box. Every element is adapted to tell your unique brand story.'
    },
    {
      icon: Terminal,
      title: 'Modern Front-End Tech',
      desc: 'Engineered with clean TypeScript, modern CSS, and Vite. Zero bloated WordPress plugins, sluggish page-builders, or security holes.'
    },
    {
      icon: Smartphone,
      title: 'Responsive by Nature',
      desc: 'Tested fluidly from 360px mobile viewports to ultra-wide 4K desktop screens without awkward breaks or clipped copy.'
    },
    {
      icon: Clock,
      title: 'Prompt Turnaround',
      desc: 'Direct communication with the engineer building your site. No multi-layer agency red tape or months-long delays.'
    },
    {
      icon: Users,
      title: 'Client-Focused Collaboration',
      desc: 'You receive transparent staging links throughout the build process to inspect, test, and provide iterative feedback.'
    },
    {
      icon: Shield,
      title: 'Reliable Production Quality',
      desc: 'Accessible semantic markup, SSL certificates, automated backups, and 30-day post-launch support warranty included.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <span>The HAVEN Difference</span>
          </div>
          <h2
            className={`font-syne text-3xl sm:text-5xl font-bold tracking-tight ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Why Modern Brands Choose HAVEN
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            A digital studio founded on genuine engineering discipline, bespoke aesthetic care, and honest client partnership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl transition-all duration-300 ${
                  isNight
                    ? 'bg-[#0b0718]/60 border border-purple-900/30 hover:border-purple-600/40'
                    : 'bg-white border border-purple-100 shadow-sm hover:border-purple-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/15 text-purple-400 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className={`font-syne text-lg font-bold mb-2.5 ${
                    isNight ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
