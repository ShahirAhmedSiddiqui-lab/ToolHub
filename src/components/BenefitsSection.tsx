import React from 'react';

export default function BenefitsSection() {
  const benefits = [
    {
      title: '100% Free Forever',
      desc: 'No hidden paywalls, premium credits, or trial limitations. All tools are unlocked and fully functional from day one.',
      icon: (
        <svg className="w-5 h-5 text-[#FF334B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'No Signups Required',
      desc: 'Access all utilities instantly. We do not demand email confirmations, forms completion, or login authentications.',
      icon: (
        <svg className="w-5 h-5 text-[#FF334B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: 'Runs Instantly on Client',
      desc: 'Calculated inside your browser shell. Results render instantly with 100% security and privacy for your input text and parameters.',
      icon: (
        <svg className="w-5 h-5 text-[#FF334B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Mobile-First Responsive',
      desc: 'Perfect styling for smartphones, tablets, laptops, and ultra-wide desktops. Code on formatting wherever you go.',
      icon: (
        <svg className="w-5 h-5 text-[#FF334B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-rose-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Why Millions Trust ToolHub Every Day
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Simplifying formatting, calculations, and visual design assets instantly with high integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white shadow-xs border border-slate-100 p-6 rounded-2xl flex flex-col items-center text-center group hover:border-[#FF334B] hover:shadow-lg hover:shadow-rose-100/10 transition-all"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-rose-50 mb-4 transition-all duration-200 group-hover:bg-[#FF334B] group-hover:scale-105">
                <div className="group-hover:text-white transition-colors duration-200 text-[#FF334B]">
                  {benefit.icon}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-950 mb-2 font-sans">
                {benefit.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
