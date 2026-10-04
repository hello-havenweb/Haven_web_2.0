import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { ArrowRight, Palette, Code2, Sparkles, TrendingUp, Search, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Code2,
  Sparkles,
  TrendingUp,
  Search,
  ShieldCheck,
};

export const ServicesSection: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <section className="py-28 relative overflow-hidden bg-[#05020c]">
      {/* Soft atmospheric gradient */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Capabilities</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl font-black tracking-tight text-white">
              Tailored Digital Services
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl">
              From bespoke visual direction to global cloud deployment, we cover the complete modern web development lifecycle.
            </p>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="self-start md:self-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#130728] hover:bg-[#1b0a3b] border border-purple-600/40 hover:border-purple-400 text-purple-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-purple-950/50 group"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => {
            const Icon = iconMap[srv.icon] || Sparkles;
            return (
              <div
                key={srv.id}
                className="p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group bg-[#0c051a]/80 border border-purple-900/30 hover:border-purple-500/60 hover:bg-[#120726] shadow-xl hover:shadow-purple-950/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-purple-400">
                      {srv.number}
                    </span>
                  </div>

                  <h3 className="font-syne text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {srv.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-mono font-medium">
                    {srv.highlightTag}
                  </span>
                  <button
                    onClick={() => navigateTo('services')}
                    className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1 text-neutral-400"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
