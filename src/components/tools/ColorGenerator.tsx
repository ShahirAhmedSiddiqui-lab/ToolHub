import React, { useState, useEffect, useCallback } from 'react';

interface ColorBlock {
  hex: string;
  locked: boolean;
  name: string;
}

interface ColorGeneratorProps {
  onCopySuccess: () => void;
}

export default function ColorGenerator({ onCopySuccess }: ColorGeneratorProps) {
  // Common beautiful core hues to seed nice palettes
  const CORE_COLORS = [
    { hex: '#3B82F6', name: 'Royal Blue' },
    { hex: '#8B5CF6', name: 'Lavender Violet' },
    { hex: '#EC4899', name: 'Deep Pink' },
    { hex: '#F59E0B', name: 'Amber Gold' },
    { hex: '#10B981', name: 'Emerald Mint' },
    { hex: '#EF4444', name: 'Crimson Red' },
    { hex: '#6366F1', name: 'Indigo Dream' },
    { hex: '#14B8A6', name: 'Teal Lagoon' },
    { hex: '#F43F5E', name: 'Rose Petal' },
    { hex: '#06B6D4', name: 'Cyan Sky' },
  ];

  const generateRandomHex = () => {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getAestheticName = (hex: string) => {
    // Return standard aesthetic names for known shades or calculate dynamic label
    const hexNum = parseInt(hex.slice(1), 16);
    if (hexNum % 7 === 0) return 'Prism Tint';
    if (hexNum % 5 === 0) return 'Luminous Glow';
    if (hexNum % 3 === 0) return 'Pastel Dream';
    if (hexNum % 2 === 0) return 'Modern Shade';
    return 'Creative Accent';
  };

  const [blocks, setBlocks] = useState<ColorBlock[]>([
    { hex: '#3B82F6', locked: false, name: 'Royal Blue' },
    { hex: '#8B5CF6', locked: false, name: 'Lavender Violet' },
    { hex: '#FA8231', locked: false, name: 'Sunset Bronze' },
    { hex: '#20BF6B', locked: false, name: 'Emerald Grass' },
    { hex: '#F59E0B', locked: false, name: 'Amber Gold' },
  ]);

  const handleShuffle = useCallback(() => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.locked) return block;
        const newHex = generateRandomHex();
        return {
          hex: newHex,
          locked: false,
          name: getAestheticName(newHex),
        };
      })
    );
  }, []);

  // Listen to Spacebar keyboard actions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        handleShuffle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleShuffle]);

  const toggleLock = (index: number) => {
    setBlocks((prev) =>
      prev.map((block, i) => (i === index ? { ...block, locked: !block.locked } : block))
    );
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-6">
        {/* Helper instruction */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-500 text-center sm:text-left flex items-center gap-1.5 font-mono">
            <kbd className="px-2 py-1 bg-rose-50 border border-rose-100/50 rounded-md text-xs font-black text-slate-700">
              Spacebar
            </kbd>
            Press Spacebar on keyboard or click button to randomize shades.
          </p>

          <button
            onClick={handleShuffle}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#FF334B] hover:bg-[#e0243b] text-white cursor-pointer font-black text-xs uppercase tracking-wider rounded-xl transition-all font-sans shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            Generate New Palette
          </button>
        </div>

        {/* Color blocks row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 h-[280px]">
          {blocks.map((block, index) => (
            <div
              key={index}
              style={{ backgroundColor: block.hex }}
              className="relative rounded-2xl h-full flex flex-col items-center justify-end p-4 border border-black/5 group cursor-pointer transition-transform duration-250 hover:scale-[1.02] select-none"
              onClick={() => handleCopyHex(block.hex)}
            >
              {/* Overlay with contrasting colors */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity rounded-2xl" />

              {/* Action indicators top */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Avoid copy on lock click
                  toggleLock(index);
                }}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/10 hover:bg-black/25 text-white border border-white/20 hover:border-white/40 cursor-pointer backdrop-blur-xs transition-colors"
                title={block.locked ? 'Unlock shade' : 'Lock shade'}
              >
                {block.locked ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                )}
              </button>

              {/* Copy prompt overlay center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase font-black tracking-widest text-white bg-[#FF334B] p-2.5 px-3.5 rounded-full backdrop-blur-md shadow-lg border border-white/10 font-mono">
                  Copy HEX
                </span>
              </div>

              {/* Text outputs bottom */}
              <div className="z-10 text-center text-white font-mono mt-auto select-none pointer-events-none">
                <span className="block text-md font-extrabold tracking-wide drop-shadow-sm leading-tight">
                  {block.hex}
                </span>
                <span className="block text-[10px] opacity-75 font-semibold text-slate-100 font-sans mt-0.5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {block.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
