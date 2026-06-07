import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import ToolView from './views/ToolView';
import PolicyViews from './views/PolicyViews';
import BlogView from './views/BlogView';
import { ToolId, Theme } from './types';
import { useAdsterraPopunder } from './components/AdComponent';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null>(null);
  const [showAllTools, setShowAllTools] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Activate Adsterra dynamic Popunder scripts
  useAdsterraPopunder(true);

  // Force light mode
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark');
      setTheme('light');
    } catch (e) {
      // safe bypass controls
    }
  }, []);

  // Set up path-based routing triggers to parse URLs automatically.
  useEffect(() => {
    const handleRouteChange = () => {
      const legacyHash = window.location.hash;
      if (legacyHash.startsWith('#/')) {
        const legacyPath = legacyHash.replace(/^#/, '') || '/';
        window.history.replaceState(null, '', legacyPath);
      }

      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      if (path === '/' || path === '/explore') {
        setActiveTool(null);
        setActivePolicy(null);
        setShowAllTools(path === '/explore');
        document.title = 'ToolHub - Free Online Tools';
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (path === '/blog' || path.startsWith('/blog/')) {
        setActivePolicy('blog');
        setActiveTool(null);
        setShowAllTools(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (['/privacy', '/terms', '/about', '/sitemap'].includes(path)) {
        setActivePolicy(path.slice(1) as any);
        setActiveTool(null);
        setShowAllTools(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        const toolVal = path.slice(1) as ToolId;
        setActiveTool(toolVal);
        setActivePolicy(null);
        setShowAllTools(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // trigger initial page matches on loads

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const applyThemeClass = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark');
  };

  const handleToggleTheme = () => {
    // Only light mode is allowed
    setTheme('light');
    applyThemeClass('light');
  };

  const handleSelectTool = (id: string | null) => {
    const nextPath = id ? `/${id}` : '/';
    window.history.pushState(null, '', nextPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleShowPolicy = (type: 'privacy' | 'terms' | 'about' | 'sitemap' | 'blog' | null) => {
    const nextPath = type ? `/${type}` : '/';
    window.history.pushState(null, '', nextPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleShowToast = (msg: string = 'Copied to Clipboard!') => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500); // clear toast after 3.5s
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBFC] text-slate-800 antialiased font-sans">
      {/* 1. Header Navigation block */}
      <Navbar
        currentTheme="light"
        toggleTheme={handleToggleTheme}
        onSelectTool={handleSelectTool}
        onShowPolicy={handleShowPolicy}
        activePolicy={activePolicy}
      />

      {/* 2. Main content panels list */}
      <main className="flex-1 w-full flex flex-col">
        {activePolicy === 'blog' ? (
          <BlogView
            onSelectTool={handleSelectTool}
            onClose={() => handleShowPolicy(null)}
          />
        ) : activePolicy ? (
          <PolicyViews
            viewType={activePolicy as any}
            onSelectTool={handleSelectTool}
            onClose={() => handleShowPolicy(null)}
          />
        ) : activeTool ? (
          <ToolView
            toolId={activeTool}
            onSelectTool={handleSelectTool}
            onCopySuccess={() => handleShowToast('Copied text successfully to your clipboard!')}
          />
        ) : (
          <HomeView onSelectTool={handleSelectTool} showAllTools={showAllTools} />
        )}
      </main>

      {/* 3. Global Footer controls */}
      <Footer
        onSelectTool={handleSelectTool}
        onShowPolicy={handleShowPolicy}
      />

      {/* 4. Beautiful accessible Toast Alert component */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-850 dark:bg-white text-white dark:text-slate-950 shadow-xl px-5 py-3 rounded-xl flex items-center gap-3 transition-all animate-bounce max-w-sm">
          <svg className="w-4 h-4 text-emerald-500 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-xs font-bold leading-tight font-sans">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
