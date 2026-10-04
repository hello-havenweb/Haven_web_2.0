import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { TemplateContainer } from './components/common/TemplateContainer';
import { HomePage } from './pages/HomePage';
import { TemplatesPage } from './pages/TemplatesPage';
import { ServicesPage } from './pages/ServicesPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const MainLayout: React.FC = () => {
  const { currentPage, activeTemplate } = useNavigation();
  const { isNight } = useTheme();

  // If a template is opened in full view, render the dedicated Template Container with HAVEN top toolbar
  if (activeTemplate) {
    return <TemplateContainer templateId={activeTemplate} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'templates':
        return <TemplatesPage />;
      case 'services':
        return <ServicesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isNight ? 'bg-[#06040b] text-[#f1f1f6]' : 'bg-[#f8f7fc] text-[#120f24]'
      }`}
    >
      <Navbar />
      <main className="flex-1 w-full">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <MainLayout />
      </NavigationProvider>
    </ThemeProvider>
  );
}
