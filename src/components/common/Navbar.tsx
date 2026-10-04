import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { PageRoute } from '../../types';
import { Moon, Sun, ArrowRight, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo } = useNavigation();
  const { theme, toggleTheme, isNight } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Templates', route: 'templates' },
    { label: 'Services', route: 'services' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleLinkClick = (route: PageRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isNight
              ? 'bg-[#080512]/90 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-purple-950/20'
              : 'bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
            aria-label="HAVEN Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-800 flex items-center justify-center p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-syne font-black text-white text-base tracking-tighter">H</span>
            </div>
            <span
              className={`font-syne text-2xl font-black tracking-widest uppercase transition-colors ${
                isNight
                  ? 'text-white group-hover:text-purple-300'
                  : 'text-neutral-900 group-hover:text-purple-700'
              }`}
            >
              HAVEN
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => {
              const active = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item.route)}
                  className={`text-sm font-medium transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                    active
                      ? isNight
                        ? 'text-purple-300 font-semibold'
                        : 'text-purple-700 font-semibold'
                      : isNight
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isNight
                          ? 'bg-gradient-to-r from-purple-500 to-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                          : 'bg-purple-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Theme Toggle & CTA) */}
          <div className="flex items-center gap-4">
            {/* Night / Day interactive toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isNight ? 'Day' : 'Night'} mode`}
              className={`p-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                isNight
                  ? 'bg-purple-950/60 border border-purple-800/40 text-neutral-300 hover:border-purple-600'
                  : 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:border-purple-400'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-all duration-200 ${
                  isNight
                    ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                    : 'text-neutral-400'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </div>
              <div
                className={`p-1 rounded-full transition-all duration-200 ${
                  !isNight
                    ? 'bg-amber-500 text-white shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : 'text-neutral-500'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold px-1 select-none hidden lg:inline">
                {isNight ? 'Night' : 'Day'}
              </span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleLinkClick('contact')}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                isNight
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_18px_rgba(147,51,234,0.4)] hover:shadow-[0_0_24px_rgba(147,51,234,0.6)]'
                  : 'bg-purple-700 hover:bg-purple-800 text-white shadow-md shadow-purple-600/20'
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`md:hidden p-2 rounded-lg cursor-pointer ${
                isNight
                  ? 'text-neutral-300 hover:bg-purple-950/50'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col justify-between pt-24 pb-8 px-6 backdrop-blur-xl animate-in fade-in duration-200"
          style={{
            backgroundColor: isNight ? 'rgba(8, 5, 18, 0.98)' : 'rgba(255, 255, 255, 0.98)'
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="text-xs font-bold tracking-widest uppercase text-purple-400 mb-2">
              Navigation
            </div>
            {navLinks.map((item) => {
              const active = currentPage === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleLinkClick(item.route)}
                  className={`text-left text-xl font-syne font-semibold py-2 transition-colors cursor-pointer flex items-center justify-between ${
                    active
                      ? isNight ? 'text-purple-400' : 'text-purple-700'
                      : isNight ? 'text-neutral-200' : 'text-neutral-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-purple-500" />}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-purple-900/20 flex flex-col gap-4">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3.5 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
              <span>HAVEN 2.0 Digital Studio</span>
              <span>Mode: {isNight ? 'Night' : 'Day'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
