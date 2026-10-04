import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { TEMPLATES_DATA } from '../data/templatesData';
import { ArrowRight, Eye, Sparkles, Check } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const { openTemplate, getThisWebsite } = useNavigation();
  const { isNight } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Templates' },
    { id: 'gaming', label: 'Gaming & Esports' },
    { id: 'vintage', label: 'Luxury & Editorial' },
    { id: 'orbit', label: 'Spatial & Futuristic' },
    { id: 'minimal', label: 'Minimalist Tech' },
    { id: 'business', label: 'Enterprise & Advisory' },
    { id: 'restaurant', label: 'Culinary & Dining' },
  ];

  const filtered = activeFilter === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter((t) => t.categorySlug === activeFilter);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Architectures</span>
          </div>
          <h1
            className={`font-syne text-4xl sm:text-6xl font-black tracking-tight mb-4 ${
              isNight ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Production Website Templates
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            Every template is a fully working, independent website with distinct branding, custom navigation, and tailored interactions. Click <strong className="text-purple-400 font-semibold">Visit Website</strong> to experience the live build.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : isNight
                  ? 'bg-purple-950/40 text-neutral-400 hover:text-white hover:bg-purple-900/40 border border-purple-800/30'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Templates Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((template) => (
            <div
              key={template.id}
              className={`rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                isNight
                  ? 'bg-[#0e091d]/80 border border-purple-900/30 hover:border-purple-600/60 shadow-xl shadow-purple-950/20'
                  : 'bg-white border border-purple-100 hover:border-purple-300 shadow-sm'
              }`}
            >
              <div>
                {/* Visual Window */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {template.category}
                    </span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openTemplate(template.id)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-neutral-950 flex items-center gap-1.5 shadow-md hover:bg-white transition-transform active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </button>
                    <button
                      onClick={() => getThisWebsite(template.id)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md shadow-purple-600/40 transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Get This</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h2 className={`font-syne text-xl font-bold ${isNight ? 'text-white' : 'text-neutral-900'}`}>
                      {template.name}
                    </h2>
                    <span className="text-xs font-bold text-purple-400">
                      From ${template.startingPrice}
                    </span>
                  </div>

                  <p className="text-xs text-purple-300/80 mb-4 font-medium">
                    {template.tagline}
                  </p>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {template.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Key Highlights:
                    </div>
                    {template.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className={isNight ? 'text-neutral-300' : 'text-neutral-700'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="p-6 pt-0 border-t border-purple-900/20 mt-4 flex items-center gap-3">
                <button
                  onClick={() => openTemplate(template.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isNight
                      ? 'bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-800/40'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visit Website</span>
                </button>

                <button
                  onClick={() => getThisWebsite(template.id)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Get Website</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
