import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { TemplateId } from '../../types';
import { TEMPLATES_DATA } from '../../data/templatesData';
import { ArrowLeft, ArrowRight, Laptop, Tablet, Smartphone, Maximize2 } from 'lucide-react';

interface TemplateToolbarProps {
  templateId: TemplateId;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

export const TemplateToolbar: React.FC<TemplateToolbarProps> = ({
  templateId,
  viewMode,
  setViewMode,
}) => {
  const { closeTemplate, getThisWebsite } = useNavigation();
  const template = TEMPLATES_DATA.find((t) => t.id === templateId) || TEMPLATES_DATA[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#080512]/95 backdrop-blur-md border-b border-purple-900/40 px-4 py-2.5 flex items-center justify-between text-xs text-neutral-200 shadow-xl">
      {/* Left: Back to HAVEN */}
      <div className="flex items-center gap-3">
        <button
          onClick={closeTemplate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-purple-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-semibold">Back to HAVEN</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-purple-900/40">
          <span className="font-syne font-bold text-white text-sm">{template.name}</span>
          <span className="text-neutral-400">·</span>
          <span className="text-purple-400 font-medium">{template.category}</span>
        </div>
      </div>

      {/* Middle: Viewport Switcher (Desktop, Tablet, Mobile) */}
      <div className="hidden md:flex items-center gap-1 bg-purple-950/40 p-1 rounded-lg border border-purple-900/40">
        <button
          onClick={() => setViewMode('desktop')}
          title="Desktop View (Full Width)"
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            viewMode === 'desktop' ? 'bg-purple-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Laptop className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('tablet')}
          title="Tablet View (768px)"
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            viewMode === 'tablet' ? 'bg-purple-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          title="Mobile View (390px)"
          className={`p-1.5 rounded transition-colors cursor-pointer ${
            viewMode === 'mobile' ? 'bg-purple-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Get This Website CTA */}
      <div className="flex items-center gap-3">
        <span className="hidden lg:inline text-neutral-400">
          From <strong className="text-white font-semibold">${template.startingPrice}</strong>
        </span>
        <button
          onClick={() => getThisWebsite(templateId)}
          className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>Get This Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
