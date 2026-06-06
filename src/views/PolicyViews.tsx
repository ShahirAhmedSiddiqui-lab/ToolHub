import React, { useState } from 'react';
import { TOOLS } from '../toolsData';

interface PolicyViewsProps {
  viewType: 'privacy' | 'terms' | 'about' | 'sitemap';
  onSelectTool: (id: string | null) => void;
  onClose: () => void;
}

export default function PolicyViews({ viewType, onSelectTool, onClose }: PolicyViewsProps) {
  const renderContent = () => {
    switch (viewType) {
      case 'about':
        return (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans tracking-tight">
              About ToolHub
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Welcome to **ToolHub**, your all-in-one platform for fast, responsive, and completely free web-based utility tools. Our philosophy is rooted in simplicity, premium design, and absolute utility. We build web applications that load in milliseconds, require zero user accounts or storage configurations, and are optimized from the ground up for high-value user accessibility.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              All of the software calculations, transformations, layouts, and encryption processes are run directly in your own browser sandbox. We never harvest metadata, store written texts, or log private dates to backend databases. Your information remains completely yours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-rose-50/10 border border-rose-100 rounded-xl p-4">
                <h4 className="text-sm font-bold text-slate-900">100% Client-Side Sandbox</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">No text upload, zero tracking. All processes execute on-device for total files confidentiality.</p>
              </div>
              <div className="bg-rose-50/10 border border-rose-100 rounded-xl p-4">
                <h4 className="text-sm font-bold text-slate-900">Zero signup walls</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Start converting, generated keys, formatting and testing immediately with absolutely no logins.</p>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans tracking-tight">
              Privacy Policy Statement
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              At ToolHub, accessible from our primary website domain, visitor confidentiality is one of our highest absolute priorities. This Privacy Statement documents how the platform handles assets and user telemetry.
            </p>
            <h3 className="text-base font-bold text-slate-900 mt-4 border-l-2 border-[#FF334B] pl-2">
              No Data Logging Policies
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Because all utility services operate purely through direct front-end React technologies, we do not have server models to collect, store, or monitor your files, words, databases, or keys. All items you insert (texts, passwords, JSON inputs, numerical ages) remain isolated inside your browser memory shell, immediately disappearing upon refreshing or navigation.
            </p>
            <h3 className="text-base font-bold text-slate-900 mt-4 border-l-2 border-[#FF334B] pl-2">
              Network Telemetry & Google AdSense
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Like other standard portals, ToolHub integrates third-party network advertisements (Google AdSense, Adsterra) to fund ongoing server maintenance. These suppliers may use browser cookies, tracking coordinates, or web beacons to customize placement structures based on historic web travels. Visitors can disable cookies through relative security settings in their browser systems.
            </p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans tracking-tight">
              Terms of Service
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By visiting or executing operations on ToolHub, you agree to comply with standard platform operating principles. If you do not accept these policies, we ask that you discontinue platform visits.
            </p>
            <h3 className="text-base font-bold text-slate-900 mt-4 border-l-2 border-[#FF334B] pl-2">
              Fair Usage & Code Licensing
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              You are permitted to utilize each service, generated file, or formatted text for both commercial and personal layouts (including publishing generated passwords, print QR graphics, or Lorem items). You are prohibited from executing automated script DDoS sequences or querying the platform API assets with scraping bots that could disrupt fast server deliveries for regular human users.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              All tools are provided on an "as-is" basis, with no explicit warranty of absolute mathematical precision or continuous live online status.
            </p>
          </div>
        );

      case 'sitemap':
        return (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans tracking-tight">
              HTML Directory Sitemap
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
              Our index catalog allows rapid lookup indices and indexing crawlers to reference individual pages. Tap on any tool title to navigate directly to its secure, client-side utility interface.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOOLS.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.id);
                    onClose();
                  }}
                  className="p-3 border border-rose-100 bg-white hover:bg-rose-50/20 rounded-xl cursor-pointer transition-all flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{tool.name}</h4>
                    <p className="text-[10px] text-slate-450 truncate max-w-[200px] mt-0.5">{tool.description}</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#FF334B] font-bold uppercase tracking-wider">OPEN</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl bg-white border border-rose-100 rounded-2xl shadow-xl p-8 relative font-sans my-8">
      {/* Return Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider text-[#FF334B] border border-rose-100 px-3 py-1.5 rounded-lg hover:bg-rose-50/50 cursor-pointer font-sans transition-colors"
      >
        Close View
      </button>

      {renderContent()}
    </div>
  );
}
