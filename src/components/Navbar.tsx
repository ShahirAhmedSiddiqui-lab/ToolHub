import React, { useState } from 'react';

interface NavbarProps {
  currentTheme: 'light' | 'dark';
  toggleTheme: () => void;
  onSelectTool: (id: string | null) => void;
  onShowPolicy: (type: 'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null) => void;
  activePolicy: 'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null;
}

export default function Navbar({ onSelectTool, onShowPolicy, activePolicy }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (type: 'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null) => {
    onShowPolicy(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and title */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer select-none" 
          onClick={() => { 
            onSelectTool(null); 
            setIsMobileMenuOpen(false); 
          }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF334B] text-white font-sans text-lg font-black shadow-md shadow-rose-200/50">
            T
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 font-sans">
            Tool<span className="text-[#FF334B]">Hub</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-2 mx-6">
          <button
            onClick={() => handleMenuClick('about')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
              activePolicy === 'about'
                ? 'text-[#FF334B] bg-rose-50/50'
                : 'text-slate-600 hover:text-[#FF334B] hover:bg-rose-50/50'
            }`}
          >
            About ToolHub
          </button>
          <button
            onClick={() => handleMenuClick('privacy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
              activePolicy === 'privacy'
                ? 'text-[#FF334B] bg-rose-50/50'
                : 'text-slate-600 hover:text-[#FF334B] hover:bg-rose-50/50'
            }`}
          >
            Privacy Statement
          </button>
          <button
            onClick={() => handleMenuClick('terms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
              activePolicy === 'terms'
                ? 'text-[#FF334B] bg-rose-50/50'
                : 'text-slate-600 hover:text-[#FF334B] hover:bg-rose-50/50'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => handleMenuClick('blog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer font-sans ${
              activePolicy === 'blog'
                ? 'text-[#FF334B] bg-rose-50/50'
                : 'text-slate-600 hover:text-[#FF334B] hover:bg-rose-50/50'
            }`}
          >
            Educational Blog
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Desktop Explore Button */}
          <button
            onClick={() => {
              window.location.hash = '#/explore';
              setIsMobileMenuOpen(false);
            }}
            className="hidden sm:inline-block px-5 py-1.5 bg-[#FF334B] hover:bg-[#E11D48] text-white text-xs font-extrabold font-sans rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-rose-100 cursor-pointer"
          >
            Explore
          </button>

          {/* Hamburger Menu Toggle for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-[#FF334B] hover:bg-rose-50/50 rounded-xl transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu block */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white shadow-xl animate-fadeIn">
          <div className="flex flex-col p-4 space-y-2">
            <button
              onClick={() => handleMenuClick('about')}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-all font-sans rounded-lg ${
                activePolicy === 'about'
                  ? 'text-[#FF334B] bg-rose-50/45 font-extrabold'
                  : 'text-slate-700 hover:text-[#FF334B] hover:bg-rose-50/30'
              }`}
            >
              About ToolHub
            </button>
            <button
              onClick={() => handleMenuClick('privacy')}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-all font-sans rounded-lg ${
                activePolicy === 'privacy'
                  ? 'text-[#FF334B] bg-rose-50/45 font-extrabold'
                  : 'text-slate-700 hover:text-[#FF334B] hover:bg-rose-50/30'
              }`}
            >
              Privacy Statement
            </button>
            <button
              onClick={() => handleMenuClick('terms')}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-all font-sans rounded-lg ${
                activePolicy === 'terms'
                  ? 'text-[#FF334B] bg-rose-50/45 font-extrabold'
                  : 'text-slate-700 hover:text-[#FF334B] hover:bg-rose-50/30'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleMenuClick('blog')}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-all font-sans rounded-lg ${
                activePolicy === 'blog'
                  ? 'text-[#FF334B] bg-rose-50/45 font-extrabold'
                  : 'text-slate-700 hover:text-[#FF334B] hover:bg-rose-50/30'
              }`}
            >
              Educational Blog Hub
            </button>
            <button
              onClick={() => {
                window.location.hash = '#/explore';
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 bg-[#FF334B] hover:bg-[#E11D48] text-white text-xs font-black rounded-lg transition-all shadow-xs font-sans uppercase tracking-wider"
            >
              Explore All Tools
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
