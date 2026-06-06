import React from 'react';

interface FooterProps {
  onSelectTool: (id: string | null) => void;
  onShowPolicy: (view: 'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null) => void;
}

export default function Footer({ onSelectTool, onShowPolicy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-rose-100 transition-colors mt-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Information */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectTool(null)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF334B] text-white font-sans text-lg font-black shadow-md shadow-rose-200/50">
              T
            </div>
            <span className="text-md font-extrabold tracking-tight text-slate-950 font-sans">
              Tool<span className="text-[#FF334B]">Hub</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-md leading-relaxed font-sans">
            ToolHub is a professional online toolbox built to simplify your everyday digital tasks. We provide quick, completely client-side utility services for writers, calculations, programming, design, and formatting without requiring signups or collecting private information.
          </p>
          <p className="text-[10px] text-slate-400 font-mono tracking-wide font-medium">
            100% Privacy Verified • Ad Exchange Monetized • Built for Speed
          </p>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 font-mono">
            Platform Links
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-500 font-sans">
            <li>
              <button
                onClick={() => onShowPolicy('about')}
                className="hover:text-[#FF334B] transition-colors cursor-pointer text-left"
              >
                About ToolHub
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowPolicy('blog')}
                className="hover:text-[#FF334B] transition-colors cursor-pointer text-left font-semibold text-slate-500"
              >
                Educational Blog Hub
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowPolicy('privacy')}
                className="hover:text-[#FF334B] transition-colors cursor-pointer text-left"
              >
                Privacy Statement
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowPolicy('terms')}
                className="hover:text-[#FF334B] transition-colors cursor-pointer text-left"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-rose-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-slate-400 font-medium font-sans">
          &copy; {currentYear} ToolHub Ltd. All rights reserved. Google AdSense & Adsterra Monetization Compliant.
        </p>

        <div className="flex gap-4 text-[10px] text-slate-400 font-mono">
          <span>SECURE SANDBOXED CODE</span>
          <span>•</span>
          <span>UTC {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
