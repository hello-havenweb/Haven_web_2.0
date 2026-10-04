import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { SERVICES_DATA } from '../data/servicesData';
import { ArrowRight, CheckCircle2, Sparkles, Palette, Code2, TrendingUp, Search, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Palette,
  Code2,
  Sparkles,
  TrendingUp,
  Search,
  ShieldCheck,
};

export const ServicesPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { isNight } = useTheme();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Digital Craft</span>
          </div>
          <h1
            className={`font-syne text-4xl sm:text-6xl font-black tracking-tight mb-4 ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Services & Capabilities
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            We partner with ambitious founders, studios, and businesses to engineer distinctive websites that reflect their true caliber.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-12">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = iconMap[srv.icon] || Sparkles;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={srv.id}
                className={`p-8 sm:p-12 rounded-3xl transition-all duration-300 ${
                  isNight
                    ? 'bg-[#0d091c]/70 border border-purple-900/30'
                    : 'bg-white border border-purple-100 shadow-md'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Service info */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-semibold text-purple-400">
                          Capability {srv.number}
                        </span>
                        <h2 className={`font-syne text-2xl sm:text-3xl font-bold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                          {srv.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-purple-200/90 font-medium">
                      {srv.summary}
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => navigateTo('contact')}
                        className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 inline-flex items-center gap-2 cursor-pointer transition-all"
                      >
                        <span>Commission This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Deliverables Box */}
                  <div className="lg:col-span-5">
                    <div
                      className={`p-6 rounded-2xl ${
                        isNight
                          ? 'bg-purple-950/20 border border-purple-800/40'
                          : 'bg-purple-50/70 border border-purple-200/60'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4 flex items-center justify-between">
                        <span>Concrete Deliverables</span>
                        <span className="font-mono text-[11px] text-neutral-400">Scope Verified</span>
                      </div>
                      <ul className="space-y-3">
                        {srv.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
