import React, { useEffect, useState } from 'react';

interface FAQ {
  q: string;
  a: string;
}

export default function FAQSection() {
  const faqs: FAQ[] = [
    {
      q: 'What is ToolHub?',
      a: 'ToolHub is a collection of 100% free, high-speed frontend utilities designed for everyday work. You can count text lengths, convert formats, compute financial percentages, generate strong keys, parse JSONs, check relative ages, design colors palette, and format placeholder text logs.',
    },
    {
      q: 'Are my private documents and keys safe here?',
      a: 'Yes, completely! Because ToolHub is a frontend-only platform, all conversion models and math processes are parsed locally in your own browser tab using basic React. Your written files are never dispatched to external backend databases.',
    },
    {
      q: 'Do I need a paid license or dynamic user login?',
      a: 'No subscription or registration is required. You can use every tool, copy unlimited characters, and generate files completely anonymously.',
    },
    {
      q: 'Are these tools compatible with my smart mobile device?',
      a: 'Yes, ToolHub is designed with mobile-first parameters. The interface supports simple rendering systems on iOS, Android, macOS, and Windows browsers.',
    },
    {
      q: 'How does this website fund operations?',
      a: 'ToolHub integrates low-profile banner placements using Google AdSense & Adsterra exchanges to cover server upkeep. These slots are optimized to avoid blocking or slowing down user interaction pathways.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    // Inject dynamic HTML JSON-LD FAQ Schema to facilitate SEO indexing crawls
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld-schema';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('faq-jsonld-schema');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  return (
    <section className="py-12 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Frequently Answered Questions (FAQs)
        </h2>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1.5 font-mono">
          Engineered with Structured Schema Markup
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-slate-100 rounded-xl overflow-hidden bg-white hover:border-rose-100 transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 px-5 text-left font-bold text-sm text-slate-900 hover:bg-rose-50/20 cursor-pointer transition-colors focus:outline-hidden"
              >
                <span className="font-sans font-extrabold">{faq.q}</span>
                <span className="text-[#FF334B] font-bold ml-4">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="p-5 pt-0 text-xs font-medium text-slate-500 leading-relaxed font-sans border-t border-slate-100/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
