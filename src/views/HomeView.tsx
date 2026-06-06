import React, { useState, useEffect } from 'react';
import { TOOLS } from '../toolsData';
import { Tool } from '../types';
import AdComponent from '../components/AdComponent';
import BenefitsSection from '../components/BenefitsSection';
import FAQSection from '../components/FAQSection';

// Custom design theme maps matching the high-fidelity Vibrant Palette
const TOOL_STYLES: Record<string, { bg: string; text: string; bgDark: string; textDark: string; pillBg: string; pillText: string; pillBgDark: string; pillTextDark: string }> = {
  'word-counter': {
    bg: 'bg-[#DBEAFE]',
    text: 'text-[#2563EB]',
    bgDark: 'bg-blue-950/40',
    textDark: 'text-blue-400',
    pillBg: 'bg-[#ECF2FF]',
    pillText: 'text-[#2563EB]',
    pillBgDark: 'bg-blue-950/30',
    pillTextDark: 'text-blue-300'
  },
  'age-calculator': {
    bg: 'bg-[#FEE2E2]',
    text: 'text-[#EF4444]',
    bgDark: 'bg-red-950/40',
    textDark: 'text-red-400',
    pillBg: 'bg-red-50',
    pillText: 'text-red-650',
    pillBgDark: 'bg-red-950/30',
    pillTextDark: 'text-red-300'
  },
  'percentage-calculator': {
    bg: 'bg-[#CCFBF1]',
    text: 'text-[#0D9488]',
    bgDark: 'bg-teal-950/40',
    textDark: 'text-teal-400',
    pillBg: 'bg-teal-50',
    pillText: 'text-teal-650',
    pillBgDark: 'bg-teal-950/30',
    pillTextDark: 'text-teal-300'
  },
  'text-case-converter': {
    bg: 'bg-[#FAE8FF]',
    text: 'text-[#C026D3]',
    bgDark: 'bg-fuchsia-950/40',
    textDark: 'text-fuchsia-400',
    pillBg: 'bg-fuchsia-100',
    pillText: 'text-fuchsia-700',
    pillBgDark: 'bg-fuchsia-950/30',
    pillTextDark: 'text-fuchsia-300'
  },
  'password-generator': {
    bg: 'bg-[#DCFCE7]',
    text: 'text-[#22C55E]',
    bgDark: 'bg-emerald-950/40',
    textDark: 'text-emerald-400',
    pillBg: 'bg-emerald-50',
    pillText: 'text-emerald-650',
    pillBgDark: 'bg-emerald-950/30',
    pillTextDark: 'text-emerald-300'
  },
  'qr-code-generator': {
    bg: 'bg-[#FEF9C3]',
    text: 'text-[#CA8A04]',
    bgDark: 'bg-yellow-950/40',
    textDark: 'text-yellow-400',
    pillBg: 'bg-yellow-50',
    pillText: 'text-yellow-700',
    pillBgDark: 'bg-yellow-950/30',
    pillTextDark: 'text-yellow-300'
  },
  'json-formatter': {
    bg: 'bg-[#F3E8FF]',
    text: 'text-[#9333EA]',
    bgDark: 'bg-purple-950/40',
    textDark: 'text-purple-400',
    pillBg: 'bg-purple-50',
    pillText: 'text-purple-650',
    pillBgDark: 'bg-purple-950/30',
    pillTextDark: 'text-purple-300'
  },
  'unit-converter': {
    bg: 'bg-[#E0F2FE]',
    text: 'text-[#0EA5E9]',
    bgDark: 'bg-sky-950/40',
    textDark: 'text-sky-400',
    pillBg: 'bg-sky-50',
    pillText: 'text-sky-650',
    pillBgDark: 'bg-sky-950/30',
    pillTextDark: 'text-sky-305'
  },
  'color-palette-generator': {
    bg: 'bg-[#FFEDD5]',
    text: 'text-[#EA580C]',
    bgDark: 'bg-orange-950/40',
    textDark: 'text-orange-400',
    pillBg: 'bg-orange-50',
    pillText: 'text-orange-655',
    pillBgDark: 'bg-orange-950/30',
    pillTextDark: 'text-orange-300'
  },
  'lorem-ipsum-generator': {
    bg: 'bg-[#F1F5F9]',
    text: 'text-[#475569]',
    bgDark: 'bg-slate-800/40',
    textDark: 'text-slate-400',
    pillBg: 'bg-slate-100',
    pillText: 'text-slate-705',
    pillBgDark: 'bg-slate-800/30',
    pillTextDark: 'text-slate-300'
  }
};

interface HomeViewProps {
  onSelectTool: (id: string) => void;
}

export default function HomeView({ onSelectTool }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentToolIds, setRecentToolIds] = useState<string[]>([]);

  // Load recently used tool IDs
  useEffect(() => {
    try {
      const stored = localStorage.getItem('toolhub_recently_used');
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids)) {
          setRecentToolIds(ids.slice(0, 3)); // show top 3
        }
      }
    } catch (e) {
      // safe bypass helper
    }
  }, []);

  // Filter full items list
  const filteredTools = TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRecentTools = () => {
    return TOOLS.filter((tool) => recentToolIds.includes(tool.id));
  };

  const recentTools = getRecentTools();

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      const match = TOOLS.find(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (match) {
        onSelectTool(match.id);
      } else {
        const el = document.getElementById('tools-grid-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById('tools-grid-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-full bg-[#FAFBFD]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-rose-100/40 py-16 md:py-24 transition-colors">
        {/* Subtle mesh background shapes */}
        <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-orange-400/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-rose-50 border border-rose-100 text-[#FF334B] font-sans tracking-wide">
            ✓ 100% Free • No Sign Up • No Limits
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl font-sans max-w-4xl mx-auto leading-tight md:leading-[1.12]">
            Free Online Tools <br className="hidden sm:inline" />
            That <span className="text-[#FF334B] relative inline-block">
              Just Work
              <span className="absolute left-0 bottom-1 w-full h-1 bg-rose-200/50 rounded-full" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base font-semibold text-slate-500 leading-relaxed font-sans">
            Fast, modern, privacy-friendly tools for creators, developers, students, and professionals. Zero signups, zero tracking — running directly on your secure browser shell.
          </p>

          {/* Large Hero Search bar */}
          <div className="mx-auto mt-10 max-w-xl relative">
            <div className="relative shadow-lg shadow-rose-100/40 rounded-2xl">
              <input
                type="text"
                placeholder="Search tools... (e.g. Word Counter, Password, QR Generator...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-14 pl-12 pr-28 rounded-2xl border border-rose-100 text-slate-800 bg-white focus:border-[#FF334B] focus:outline-hidden font-medium text-sm transition-all shadow-xs placeholder-slate-400"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF334B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 top-2 h-10 px-5 bg-[#FF334B] hover:bg-[#E11D48] text-white font-black text-xs rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {/* Elegant statistics counter boxes */}
          <div className="grid grid-cols-3 gap-3 max-w-sm sm:max-w-md mx-auto mt-12 bg-white/60 backdrop-blur-xs p-4 rounded-2xl border border-rose-100/50 shadow-xs">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-[#FF334B] font-sans">10+</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Tools</div>
            </div>
            <div className="text-center border-x border-rose-100/60">
              <div className="text-xl md:text-2xl font-black text-[#FF334B] font-sans">100K+</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Uses</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-black text-[#FF334B] font-sans">100%</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Header Placements Ad Slot */}
      <AdComponent slot="homepage-top" />

      {/* 2. RECENTLY USED SECTION */}
      {recentTools.length > 0 && (
        <section className="py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF334B] animate-pulse" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
              Your Recently Visited Utilities
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentTools.map((tool) => {
              const styles = TOOL_STYLES[tool.id];
              return (
                <div
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  className="p-4 rounded-xl border border-dashed border-rose-100 bg-white hover:bg-rose-50/30 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">
                      {tool.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate max-w-[200px] mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                  <span className={`text-[9px] font-mono ${styles?.text || 'text-[#FF334B]'} font-bold uppercase tracking-wider`}>
                    LAUNCH
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. FEATURED TOOLS GRID */}
      <section id="tools-grid-anchor" className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-rose-100 pb-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-sans">
              Dynamic Products Directory
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-1 font-sans">
              All 10 fundamental tools are instantly loaded on client side. No credentials needed.
            </p>
          </div>

          <span className="text-[11px] font-bold text-[#FF334B] font-mono bg-rose-50 p-1 px-3 rounded-full">
            Showing {filteredTools.length} of {TOOLS.length} utilities
          </span>
        </div>

        {/* Beautiful, responsive Grid with spacing matching design parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const styles = TOOL_STYLES[tool.id];
            return (
              <div
                key={tool.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:border-[#FF334B] hover:shadow-[0_10px_25px_-5px_rgba(255,51,75,0.08)] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer"
                onClick={() => onSelectTool(tool.id)}
              >
                <div>
                  {/* Decorative icon box with exact Vibrant Theme color coding */}
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles?.bg || 'bg-rose-50'} ${styles?.text || 'text-[#FF334B]'} transition-all duration-200`}>
                    <span className="text-lg font-black tracking-tight">
                      {tool.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-extrabold text-slate-900 font-sans group-hover:text-[#FF334B] transition-colors">
                    {tool.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-sans font-medium line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`pill text-[10px] uppercase font-bold px-3 py-1 rounded-full ${styles?.pillBg || 'bg-rose-50'} ${styles?.pillText || 'text-[#FF334B]'} font-mono`}>
                    {tool.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF334B]">
                    Open Tool
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}

          {/* More Tools Coming Soon! Professional grid card placeholder */}
          <div className="group relative flex flex-col justify-between bg-rose-50/15 rounded-2xl border-2 border-dashed border-rose-200/65 p-6 transition-all duration-200 select-none">
            <div>
              {/* Decorative plus design pattern */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100/50 text-[#FF334B]">
                <svg className="w-5 h-5 font-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>

              <h3 className="mt-4 text-sm font-extrabold text-slate-900 font-sans">
                More Tools Coming Soon!
              </h3>

              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                We are actively developing new fast browser-based utilities including Markdown Editors, Epoch Timestamp Converters, Text Diff Checkers, and Image Optimizers.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100/40 flex items-center justify-between">
              <span className="pill text-[9px] uppercase font-black tracking-widest px-2.5 py-1 rounded-full bg-rose-100 text-[#FF334B] font-mono">
                DEVELOPING
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-[#FF334B]/60 font-sans">
                Stay Tuned
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* In-feed Homepage Ads placement */}
      <AdComponent slot="homepage-middle" />

      {/* 4. BENEFITS */}
      <BenefitsSection />

      {/* 5. FAQS */}
      <FAQSection />

      {/* Floor placement ad */}
      <AdComponent slot="homepage-bottom" />
    </div>
  );
}

