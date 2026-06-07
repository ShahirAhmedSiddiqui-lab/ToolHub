import React, { useEffect, useState } from 'react';
import { TOOLS } from '../toolsData';
import { Tool, ToolId } from '../types';
import AdComponent from '../components/AdComponent';
import SEOContent from '../components/SEOContent';

// Lazy imports replacement - Direct imports of compiled tools for safety and speed
import WordCounter from '../components/tools/WordCounter';
import AgeCalculator from '../components/tools/AgeCalculator';
import PercentageCalculator from '../components/tools/PercentageCalculator';
import TextCaseConverter from '../components/tools/TextCaseConverter';
import PasswordGenerator from '../components/tools/PasswordGenerator';
import QrGenerator from '../components/tools/QrGenerator';
import JsonFormatter from '../components/tools/JsonFormatter';
import UnitConverter from '../components/tools/UnitConverter';
import ColorGenerator from '../components/tools/ColorGenerator';
import LoremGenerator from '../components/tools/LoremGenerator';
import QuickClientTools from '../components/tools/QuickClientTools';

interface ToolViewProps {
  toolId: ToolId;
  onSelectTool: (id: string | null) => void;
  onCopySuccess: () => void;
}

export default function ToolView({ toolId, onSelectTool, onCopySuccess }: ToolViewProps) {
  const tool = TOOLS.find((t) => t.id === toolId);
  const [breadcrumbsSchema, setBreadcrumbsSchema] = useState('');

  useEffect(() => {
    if (!tool) return;

    // Load and update Recently used tool log arrays
    try {
      const stored = localStorage.getItem('toolhub_recently_used');
      let arr: string[] = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(arr)) arr = [];
      const filtered = arr.filter((id) => id !== tool.id);
      filtered.unshift(tool.id);
      localStorage.setItem('toolhub_recently_used', JSON.stringify(filtered.slice(0, 10)));
    } catch (e) {
      // safe bypass
    }

    // Set Dynamic Breadcrumb Schema
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://toolhub.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: tool.name,
          item: `https://toolhub.com/${tool.id}`,
        },
      ],
    };
    setBreadcrumbsSchema(JSON.stringify(schema));

    // Dynamic Title and Meta modifications for Live SEO emulation
    document.title = tool.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', tool.seoDescription);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center font-sans">
        <p className="text-xl font-bold text-red-500">Tool Not Found</p>
        <button
          onClick={() => onSelectTool(null)}
          className="mt-4 px-5 py-2.5 bg-[#FF334B] text-white font-extrabold rounded-lg hover:bg-[#E11D48] cursor-pointer animate-pulse"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Related Tools Recommendation List (Except current)
  const relatedTools = TOOLS.filter((t) => t.id !== tool.id).slice(0, 3);

  // Share link trigger
  const handleShare = () => {
    try {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      onCopySuccess();
    } catch (e) {
      // safe bypass controls
    }
  };

  // Render correct utility module matching selected ID
  const renderInteractiveInterface = () => {
    switch (tool.id) {
      case 'word-counter':
        return <WordCounter onCopySuccess={onCopySuccess} />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'text-case-converter':
        return <TextCaseConverter onCopySuccess={onCopySuccess} />;
      case 'password-generator':
        return <PasswordGenerator onCopySuccess={onCopySuccess} />;
      case 'qr-code-generator':
        return <QrGenerator />;
      case 'json-formatter':
        return <JsonFormatter onCopySuccess={onCopySuccess} />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'color-palette-generator':
        return <ColorGenerator onCopySuccess={onCopySuccess} />;
      case 'lorem-ipsum-generator':
        return <LoremGenerator onCopySuccess={onCopySuccess} />;
      case 'discount-calculator':
      case 'tip-calculator':
      case 'gpa-calculator':
      case 'binary-converter':
      case 'base64-encoder-decoder':
      case 'url-encoder-decoder':
      case 'uuid-generator':
      case 'jwt-decoder':
      case 'hash-generator':
      case 'hex-rgb-converter':
        return <QuickClientTools toolId={tool.id} onCopySuccess={onCopySuccess} />;
      default:
        return <div className="p-4 bg-slate-50 border rounded text-center">Module is preparing deployment.</div>;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* 1. Dynamic Breadcrumbs element */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 select-none font-mono">
        <button
          onClick={() => onSelectTool(null)}
          className="hover:text-[#FF334B] transition-colors uppercase cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-slate-400 capitalize">{tool.category}</span>
        <span>/</span>
        <span className="text-[#FF334B] font-extrabold truncate">
          {tool.name}
        </span>
      </nav>

      {/* JSON-LD Script Tag injection for relative crawling */}
      {breadcrumbsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbsSchema }}
        />
      )}

      {/* 2. Headline & description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          {tool.name}
        </h1>
        <p className="text-sm font-semibold text-slate-505 mt-2 leading-relaxed max-w-3xl">
          {tool.description}
        </p>
      </div>

      {/* Place: ONE premium ad ABOVE the tool */}
      <AdComponent slot="tool-top" />

      {/* 3. INTERACTIVE CONTAINER LAYOUT */}
      <div className="my-8">
        {renderInteractiveInterface()}
      </div>

      {/* Place: ONE contextual ad BELOW the tool */}
      <AdComponent slot="tool-bottom" />

      {/* 4. HIGH FIDELITY SEO ARTICLES CONTENT */}
      <div className="my-10">
        <SEOContent tool={tool} />
      </div>

      {/* Place: ad deep INSIDE content section */}
      <AdComponent slot="tool-content" />

      {/* 5. RELATED PRODUCTS INDEX INTERNAL LINKS */}
      <section className="mt-12 border-t border-rose-100 pt-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 font-mono">
          Recommend Utility Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedTools.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectTool(rel.id);
                // Scroll back to top for fluid UX on internal navs
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 border border-slate-100 hover:border-[#FF334B] hover:shadow-[0_4px_20px_-4px_rgba(255,51,75,0.06)] bg-white rounded-xl transition-all hover:translate-y-[-1px] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-950 group-hover:text-[#FF334B]">
                  {rel.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2 max-w-full font-medium">
                  {rel.description}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wide font-extrabold text-[#FF334B] block mt-4 select-none">
                Open Utility →
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
