import React, { useState } from 'react';

interface WordCounterProps {
  onCopySuccess: () => void;
}

export default function WordCounter({ onCopySuccess }: WordCounterProps) {
  const [text, setText] = useState('');

  // Remove extra whitespaces to calculate exact counts
  const cleanWords = text.trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = cleanWords.length;
  const charCountWithSpaces = text.length;
  const charCountWithoutSpaces = text.replace(/\s/g, '').length;
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphCount = text.split(/\n+/).filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(wordCount / 225); // 225 WPM avg
  const speakingTime = Math.ceil(wordCount / 150); // 150 WPM avg

  // Count keyword frequencies
  const getKeywordFrequency = () => {
    const freq: { [key: string]: number } = {};
    cleanWords.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '');
      if (cleanWord.length > 2) {
        freq[cleanWord] = (freq[cleanWord] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const frequencies = getKeywordFrequency();

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8">
      <div className="flex flex-col gap-4">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-rose-50/20 p-4 rounded-xl text-center border border-rose-50/50">
            <span className="block text-4xl font-extrabold text-[#FF334B] font-mono">
              {wordCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1 block">
              Words
            </span>
          </div>

          <div className="bg-rose-50/20 p-4 rounded-xl text-center border border-rose-50/50">
            <span className="block text-4xl font-extrabold text-slate-900 font-mono">
              {charCountWithSpaces}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1 block">
              Characters (Total)
            </span>
          </div>

          <div className="bg-rose-50/20 p-4 rounded-xl text-center border border-rose-50/50">
            <span className="block text-4xl font-extrabold text-slate-900 font-mono">
              {paragraphCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1 block">
              Paragraphs
            </span>
          </div>

          <div className="bg-rose-50/20 p-4 rounded-xl text-center border border-rose-50/50">
            <span className="block text-4xl font-extrabold text-[#FF334B] font-mono">
              {readingTime}m
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1 block">
              Reading Time
            </span>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="mt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2 font-sans">
            Start typing or paste your content:
          </label>
          <textarea
            className="w-full h-64 p-4 text-slate-800 bg-white border border-rose-100/80 rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden transition-all font-sans placeholder-slate-400 text-base"
            placeholder="Type your document here to analyze length, paragraphs, reading speed, density..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setText('')}
            disabled={!text}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 cursor-pointer font-extrabold text-xs rounded-xl transition-all font-sans select-none"
          >
            Clear Text
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className="px-5 py-2.5 bg-[#FF334B] hover:bg-[#E11D48] disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer font-extrabold text-xs rounded-xl transition-all font-sans shadow-md shadow-rose-200/50 select-none"
          >
            Copy Clipboard
          </button>
        </div>

        {/* Dynamic Expanded Section */}
        {text.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pt-4 border-t border-rose-100 font-sans">
            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">
                Sentence Analysis
              </h4>
              <ul className="mt-2 space-y-2 text-xs font-medium text-slate-600">
                <li className="flex justify-between">
                  <span>Characters (no spaces):</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {charCountWithoutSpaces}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Total Sentences:</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {sentenceCount}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Average speak time:</span>
                  <span className="font-mono text-[#FF334B] font-bold">
                    {speakingTime} min (150 WPM)
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">
                Key Phrase Density
              </h4>
              {frequencies.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {frequencies.map(([word, count]) => (
                    <div
                      key={word}
                      className="flex items-center text-xs px-2.5 py-1 rounded-full bg-rose-50/40 border border-rose-100/50"
                    >
                      <span className="font-bold text-slate-700">
                        {word}
                      </span>
                      <span className="ml-1.5 font-mono text-[#FF334B] font-bold">
                        {count}x
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-2">
                  Type longer words to generate real-time keyword densities.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
