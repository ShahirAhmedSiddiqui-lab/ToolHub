import React from 'react';
import { Tool } from '../types';

interface SEOContentProps {
  tool: Tool;
}

export default function SEOContent({ tool }: SEOContentProps) {
  // A clean, robust client-side parser to render markdown into elegant JSX
  const renderMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={idx} className="h-4" />;
      }

      // Headers ###
      if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '');
        return (
          <h3
            key={idx}
            className="text-lg md:text-xl font-bold text-slate-905 mt-6 mb-3 font-sans border-l-4 border-[#FF334B] pl-3.5 tracking-tight"
          >
            {renderInlineMarkdown(title)}
          </h3>
        );
      }

      // Bullets *
      if (trimmed.startsWith('* ')) {
        const item = trimmed.replace('* ', '');
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-slate-600 my-1 font-sans">
            {renderInlineMarkdown(item)}
          </li>
        );
      }

      // Numbered items 1.
      if (/^\d+\.\s/.test(trimmed)) {
        const item = trimmed.replace(/^\d+\.\s/, '');
        return (
          <li key={idx} className="ml-5 list-decimal text-sm text-slate-600 my-1 font-sans">
            {renderInlineMarkdown(item)}
          </li>
        );
      }

      // Dividers ---
      if (trimmed === '---') {
        return <hr key={idx} className="my-6 border-rose-50" />;
      }

      // Paragraph
      return (
        <p key={idx} className="text-sm leading-relaxed text-slate-600 mb-4 font-sans">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  // Safe inline formatter for bold ** and inline code `
  const renderInlineMarkdown = (text: string) => {
    // Basic regex splitting for **bold** and `code`
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="font-mono text-xs bg-rose-50 p-0.5 px-1.5 rounded-md text-[#FF334B] font-semibold border border-rose-100/40">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 mt-8">
      {/* Article Title */}
      <div className="border-b border-rose-50 pb-4 mb-6">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          How to Use {tool.name} - Complete Guide & Benefits
        </h2>
        <p className="text-xs font-semibold text-[#FF334B] uppercase tracking-widest mt-1.5 font-mono">
          Last Updated: June 2026 • 5 Min Read • SEO Optimized Resource
        </p>
      </div>

      <article className="prose max-w-none">
        {renderMarkdown(tool.seoArticle)}
      </article>

      {/* Structured Tool FAQ details */}
      <div className="mt-8 pt-8 border-t border-rose-50">
        <h3 className="text-lg md:text-xl font-bold text-slate-909 mb-6 tracking-tight">
          Frequently Asked Questions (FAQs)
        </h3>
        <div className="space-y-4">
          {tool.faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-rose-100/50 bg-rose-50/5"
            >
              <h4 className="text-sm font-bold text-slate-900 font-sans">
                {faq.question}
              </h4>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
