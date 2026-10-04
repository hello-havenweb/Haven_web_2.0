import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { TEMPLATES_DATA } from '../../data/templatesData';
import { ArrowRight, Eye, Sparkles, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export const FeaturedTemplatesSection: React.FC = () => {
  const { openTemplate, getThisWebsite, navigateTo } = useNavigation();
  const { isNight } = useTheme();
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  // Prominently featured 3 masterworks requested by user: NEXUS, VINTAGE, ORBIT
  const featuredIds = ['nexus', 'vintage', 'orbit'] as const;
  const featuredTemplates = featuredIds
    .map((id) => TEMPLATES_DATA.find((t) => t.id === id))
    .filter(Boolean) as typeof TEMPLATES_DATA;

  return (
    <section className="py-28 relative overflow-hidden bg-[#06030e]">
      {/* Background ambient lighting and volumetric nebular glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-3 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Independent Production Architectures</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              Selected Masterworks
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Every template is a fully realized, independent web application with bespoke visual direction, custom motion, and zero shared boilerplate.
            </p>
          </div>

          <button
            onClick={() => navigateTo('templates')}
            className="self-start md:self-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#120826] hover:bg-[#1a0c36] border border-purple-600/40 hover:border-purple-400 text-purple-300 hover:text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-purple-950/50 group"
          >
            <span>Explore All 6 Templates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Large Cinematic Featured Templates (NEXUS, VINTAGE, ORBIT) */}
        <div className="space-y-16">
          {featuredTemplates.map((template, index) => {
            const isEven = index % 2 === 0;
            const domainUrl = `${template.id}.havenstudio.design`;

            return (
              <div
                key={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                className="rounded-3xl overflow-hidden bg-gradient-to-b from-[#100724] to-[#090316] border border-purple-800/40 hover:border-purple-500/70 transition-all duration-500 shadow-2xl shadow-purple-950/40 group p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column (or alternating): Cinematic Browser Mockup */}
                  <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="rounded-2xl overflow-hidden border border-purple-700/50 bg-[#06020d] shadow-2xl transition-transform duration-500 group-hover:scale-[1.015]">
                      {/* Browser Window Chrome Header */}
                      <div className="px-4 py-2.5 bg-[#0b0417] border-b border-purple-900/40 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="flex-1 max-w-sm px-3 py-1 rounded-md bg-[#130728] border border-purple-900/40 text-[11px] font-mono text-neutral-400 text-center truncate">
                          https://{domainUrl}
                        </div>
                        <div className="w-10 flex justify-end text-[10px] font-mono text-purple-400 font-semibold">
                          LIVE
                        </div>
                      </div>

                      {/* Large Screenshot Preview Canvas */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer" onClick={() => openTemplate(template.id)}>
                        <img
                          src={template.previewImage}
                          alt={template.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Interactive Overlay Button on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openTemplate(template.id);
                            }}
                            className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-black shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Launch Live Experience</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Template Content & Meta */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-950/70 text-purple-300 border border-purple-700/50">
                          {template.category}
                        </span>
                        <span className="text-xs font-mono font-semibold text-neutral-400">
                          Architecture {index + 1}
                        </span>
                      </div>

                      <h3 className="font-syne text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                        {template.name}
                      </h3>

                      <p className="text-sm font-medium text-purple-300 mb-4">
                        {template.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {template.longDescription}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-2.5 py-4 border-t border-purple-900/40">
                      {template.features.slice(0, 4).map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing & Dual Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                          Starting Scope
                        </div>
                        <div className="font-syne text-2xl font-black text-white">
                          ${template.startingPrice}{' '}
                          <span className="text-xs font-normal text-neutral-400">custom build</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openTemplate(template.id)}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#1a0a38] hover:bg-[#251052] border border-purple-600/50 text-purple-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visit Website</span>
                        </button>

                        <button
                          onClick={() => getThisWebsite(template.id)}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/40 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <span>Get This Website</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discovery Footer Strip for Other Archetypes */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#0b051b]/80 border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white mb-1">
              Looking for Minimalist Tech, Enterprise Advisory, or Fine Dining?
            </div>
            <div className="text-xs text-neutral-400">
              Explore Lumi Studio, Apex Advisory, and L’Étoile Gourmet in our complete template gallery.
            </div>
          </div>
          <button
            onClick={() => navigateTo('templates')}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 whitespace-nowrap cursor-pointer transition-all active:scale-95"
          >
            Browse All Templates
          </button>
        </div>
      </div>
    </section>
  );
};
