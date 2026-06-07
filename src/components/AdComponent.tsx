import React, { useEffect, useRef, useState } from 'react';

interface AdComponentProps {
  slot: 'homepage-top' | 'homepage-middle' | 'homepage-bottom' | 'tool-top' | 'tool-bottom' | 'tool-content';
}

export default function AdComponent({ slot }: AdComponentProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadAd, setShouldLoadAd] = useState(false);
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const nextIsMobile = window.innerWidth < 768;
      setIsMobile((current) => (current === nextIsMobile ? current : nextIsMobile));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const runWhenIdle = idleWindow.requestIdleCallback || ((callback: () => void) => window.setTimeout(callback, 600));
    const cancelIdle = idleWindow.cancelIdleCallback || window.clearTimeout;
    let idleId: number | null = null;

    const markReady = () => {
      if (idleId !== null) return;
      idleId = runWhenIdle(() => setShouldLoadAd(true));
    };

    if (!('IntersectionObserver' in window) || !adRef.current) {
      markReady();
      return () => {
        if (idleId !== null) cancelIdle(idleId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markReady();
          observer.disconnect();
        }
      },
      { rootMargin: '360px 0px' }
    );

    observer.observe(adRef.current);
    return () => {
      observer.disconnect();
      if (idleId !== null) cancelIdle(idleId);
    };
  }, []);

  // Map slots & screen resolutions to the provided Adsterra Keys and dimensions
  const getAdConfig = () => {
    switch (slot) {
      case 'homepage-top':
      case 'tool-top':
      case 'tool-bottom':
        if (isMobile) {
          return {
            key: '82c571dd66cd432585fb2a819624f1ef', // 320x50 Banner
            width: 320,
            height: 50,
            label: 'Mobile Content Banner 320x50',
            className: 'min-h-[50px] w-[320px] h-[50px]',
          };
        } else {
          return {
            key: '8ee7fc46bac1716f0a3823cd40715021', // 728x90 Banner
            width: 728,
            height: 90,
            label: 'Leaderboard Banner 728x90',
            className: 'min-h-[90px] w-[728px] h-[90px]',
          };
        }

      case 'homepage-middle':
        if (isMobile) {
          return {
            key: '82c571dd66cd432585fb2a819624f1ef', // 320x50 Banner
            width: 320,
            height: 50,
            label: 'Mobile Content Banner 320x50',
            className: 'min-h-[50px] w-[320px] h-[50px]',
          };
        } else {
          return {
            key: '3dcba573cd506c78f74a33af65439cd9', // 468x60 Banner
            width: 468,
            height: 60,
            label: 'Standard Banner 468x60',
            className: 'min-h-[60px] w-[468px] h-[60px]',
          };
        }

      case 'homepage-bottom':
        if (isMobile) {
          return {
            key: '578babbf39fbae80b3bed78851496159', // 300x250 Banner
            width: 300,
            height: 250,
            label: 'Mobile Square Banner 300x250',
            className: 'min-h-[250px] w-[300px] h-[250px]',
          };
        } else {
          return {
            key: '8ee7fc46bac1716f0a3823cd40715021', // 728x90 Banner
            width: 728,
            height: 90,
            label: 'Bottom Leaderboard 728x90',
            className: 'min-h-[90px] w-[728px] h-[90px]',
          };
        }

      case 'tool-content':
      default:
        // Always render the square banner for side panel / content integration
        return {
          key: '578babbf39fbae80b3bed78851496159', // 300x250 Banner
          width: 300,
          height: 250,
          label: 'Square Native Ad 300x250',
          className: 'min-h-[250px] w-[300px] h-[250px]',
        };
    }
  };

  const adConfig = getAdConfig();
  const { key, width, height } = adConfig;

  // Render the exact scripts inside a sandboxed srcDoc iframe.
  // This isolated DOM environment allows document.write to parse naturally during loading.
  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          var atOptions = {
            'key' : '${key}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
      </body>
    </html>
  `.trim();

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 py-2 px-4 select-none overflow-hidden sm:overflow-visible">
      <div className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono mb-1.5 text-center font-bold">
        Sponsored Advertisement
      </div>
      <div
        ref={adRef}
        className={`relative overflow-hidden bg-slate-50/50 dark:bg-slate-800/10 border border-dashed border-slate-200/80 dark:border-slate-700/80 rounded-xl flex items-center justify-center ${adConfig.className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {shouldLoadAd && (
          <iframe
            key={`${key}-${isMobile}-${slot}`}
            srcDoc={iframeSrcDoc}
            width={width}
            height={height}
            scrolling="no"
            frameBorder="0"
            loading="lazy"
            className="border-0 overflow-hidden z-10"
            title={`sponsored-ad-${slot}`}
          />
        )}

        {/* Subtle decorative Ad label branding */}
        <div className="absolute right-2 bottom-1.5 flex items-center gap-1 z-0 pointer-events-none opacity-40">
          <span className="text-[8px] bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-500 font-bold font-sans">
            i
          </span>
          <span className="text-[8px] bg-rose-500/10 text-rose-500 px-1 py-0.5 rounded font-mono font-black uppercase tracking-wider">
            Ad
          </span>
        </div>
      </div>
    </div>
  );
}

export function useAdsterraPopunder(active: boolean = true) {
  useEffect(() => {
    if (!active) return;

    const loadScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//www.highperformanceformat.com/8ee7fc46bac1716f0a3823cd40715021/invoke.js';
      document.body.appendChild(script);
      return script;
    };

    let script: HTMLScriptElement | null = null;
    let idleId: number | null = null;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleCallback = idleWindow.requestIdleCallback || ((callback: () => void) => window.setTimeout(callback, 1200));
    const cancelIdleCallback = idleWindow.cancelIdleCallback || window.clearTimeout;
    idleId = idleCallback(() => {
      script = loadScript();
    });
    
    return () => {
      if (idleId !== null) {
        cancelIdleCallback(idleId);
      }
      try {
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      } catch (e) {
        // Safe check
      }
    };
  }, [active]);
}
