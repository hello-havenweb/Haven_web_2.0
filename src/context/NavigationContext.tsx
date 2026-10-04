import React, { createContext, useContext, useEffect, useState } from 'react';
import { PageRoute, TemplateId } from '../types';

interface NavigationContextType {
  currentPage: PageRoute;
  activeTemplate: TemplateId | null;
  selectedEnquiryTemplate: TemplateId | 'custom' | '';
  navigateTo: (page: PageRoute) => void;
  openTemplate: (templateId: TemplateId) => void;
  closeTemplate: () => void;
  getThisWebsite: (templateId: TemplateId) => void;
  setSelectedEnquiryTemplate: (templateId: TemplateId | 'custom' | '') => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId | null>(null);
  const [selectedEnquiryTemplate, setSelectedEnquiryTemplate] = useState<TemplateId | 'custom' | ''>('');

  // Synchronize with URL hash on load and hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPage('home');
        setActiveTemplate(null);
        return;
      }

      if (hash.startsWith('template/')) {
        const id = hash.replace('template/', '') as TemplateId;
        if (['nexus', 'vintage', 'orbit', 'lumi', 'business', 'restaurant'].includes(id)) {
          setActiveTemplate(id);
        }
        return;
      }

      // Check contact with query
      if (hash.startsWith('contact')) {
        setCurrentPage('contact');
        setActiveTemplate(null);
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const t = params.get('template') as TemplateId;
        if (t && ['nexus', 'vintage', 'orbit', 'lumi', 'business', 'restaurant'].includes(t)) {
          setSelectedEnquiryTemplate(t);
        }
        return;
      }

      if (['home', 'templates', 'services', 'pricing', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
        setActiveTemplate(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setActiveTemplate(null);
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTemplate = (templateId: TemplateId) => {
    setActiveTemplate(templateId);
    window.location.hash = `template/${templateId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeTemplate = () => {
    setActiveTemplate(null);
    window.location.hash = currentPage === 'home' ? '' : currentPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getThisWebsite = (templateId: TemplateId) => {
    setSelectedEnquiryTemplate(templateId);
    setActiveTemplate(null);
    setCurrentPage('contact');
    window.location.hash = `contact?template=${templateId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        activeTemplate,
        selectedEnquiryTemplate,
        navigateTo,
        openTemplate,
        closeTemplate,
        getThisWebsite,
        setSelectedEnquiryTemplate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
