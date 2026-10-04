import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { TemplateId } from '../../types';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openTemplate } = useNavigation();
  const { isNight } = useTheme();

  return (
    <footer
      className={`border-t transition-colors duration-300 relative overflow-hidden ${
        isNight
          ? 'bg-[#050309] border-purple-950/40 text-neutral-400'
          : 'bg-[#f5f4fb] border-purple-100 text-neutral-600'
      }`}
    >
      {/* Background ambient glow */}
      {isNight && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-800 flex items-center justify-center p-0.5 shadow-md shadow-purple-500/20">
                <span className="font-syne font-black text-white text-base">H</span>
              </div>
              <span
                className={`font-syne text-2xl font-black tracking-widest uppercase ${
                  isNight ? 'text-white' : 'text-neutral-900'
                }`}
              >
                HAVEN
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              HAVEN is a premier digital craftsmanship studio. We conceive, design, and engineer distinctive websites for modern brands, gaming teams, culinary masters, and innovators.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>hello.havenweb@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>London · New York · Tokyo</span>
              </div>
            </div>
          </div>

          {/* Column 2: Studio Pages */}
          <div>
            <h4
              className={`font-syne text-xs font-bold uppercase tracking-wider mb-4 ${
                isNight ? 'text-neutral-200' : 'text-neutral-900'
              }`}
            >
              Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('pricing')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  About the Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Start Project
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Live Templates */}
          <div>
            <h4
              className={`font-syne text-xs font-bold uppercase tracking-wider mb-4 ${
                isNight ? 'text-neutral-200' : 'text-neutral-900'
              }`}
            >
              Live Templates
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'nexus', name: 'Nexus Gaming' },
                { id: 'vintage', name: 'Vintage Atelier' },
                { id: 'lumi', name: 'Lumi Studio' },
                { id: 'business', name: 'Apex Advisory' },
                { id: 'restaurant', name: 'L’Étoile Gourmet' },
              ].map((tmpl) => (
                <li key={tmpl.id}>
                  <button
                    onClick={() => openTemplate(tmpl.id as TemplateId)}
                    className="hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-1 group text-left"
                  >
                    <span>{tmpl.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Client Categories */}
          <div>
            <h4
              className={`font-syne text-xs font-bold uppercase tracking-wider mb-4 ${
                isNight ? 'text-neutral-200' : 'text-neutral-900'
              }`}
            >
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('templates')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Esports & Interactive Gaming
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('templates')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Luxury & Editorial Ateliers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('templates')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Minimalist Tech & Hardware
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('templates')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Corporate Strategy & Legal
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('templates')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  Culinary & Hospitality
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isNight ? 'border-purple-950/40 text-neutral-500' : 'border-neutral-200 text-neutral-400'
          }`}
        >
          <div>
            © {new Date().getFullYear()} HAVEN Digital Studio Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built for Modern Brands</span>
            <span>·</span>
            <span>Zero AI Slop Guarantee</span>
            <span>·</span>
            <span>Human-Engineered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
