import React, { useState } from 'react';
import { TemplateId } from '../../types';
import { TemplateToolbar } from './TemplateToolbar';
import { NexusGamingApp } from '../../templates/nexus/NexusGamingApp';
import { VintageAtelierApp } from '../../templates/vintage/VintageAtelierApp';
import { OrbitSpatialApp } from '../../templates/orbit/OrbitSpatialApp';
import { LumiStudioApp } from '../../templates/lumi/LumiStudioApp';
import { BusinessProApp } from '../../templates/business/BusinessProApp';
import { RestaurantApp } from '../../templates/restaurant/RestaurantApp';

interface TemplateContainerProps {
  templateId: TemplateId;
}

export const TemplateContainer: React.FC<TemplateContainerProps> = ({ templateId }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const renderTemplateContent = () => {
    switch (templateId) {
      case 'nexus':
        return <NexusGamingApp />;
      case 'vintage':
        return <VintageAtelierApp />;
      case 'orbit':
        return <OrbitSpatialApp />;
      case 'lumi':
        return <LumiStudioApp />;
      case 'business':
        return <BusinessProApp />;
      case 'restaurant':
        return <RestaurantApp />;
      default:
        return <NexusGamingApp />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07040f] text-neutral-100 flex flex-col pt-12">
      {/* Floating HAVEN Template Control Bar */}
      <TemplateToolbar
        templateId={templateId}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Viewport Frame Handler */}
      <div className="flex-1 flex justify-center items-start w-full bg-[#05030a] py-4 overflow-x-hidden">
        <div
          className={`transition-all duration-300 w-full min-h-screen shadow-2xl ${
            viewMode === 'desktop'
              ? 'max-w-full'
              : viewMode === 'tablet'
              ? 'max-w-[768px] my-4 rounded-3xl border-4 border-purple-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]'
              : 'max-w-[390px] my-4 rounded-[40px] border-8 border-purple-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]'
          }`}
        >
          {renderTemplateContent()}
        </div>
      </div>
    </div>
  );
};
