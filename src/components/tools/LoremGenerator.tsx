import React, { useState, useEffect } from 'react';

interface LoremGeneratorProps {
  onCopySuccess: () => void;
}

const LOREM_DATABASE = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
];

export default function LoremGenerator({ onCopySuccess }: LoremGeneratorProps) {
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [includeTags, setIncludeTags] = useState(false);
  const [loremOutput, setLoremOutput] = useState('');

  useEffect(() => {
    let result = '';

    if (unit === 'paragraphs') {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        const text = LOREM_DATABASE[i % LOREM_DATABASE.length];
        paragraphs.push(includeTags ? `<p>${text}</p>` : text);
      }
      result = paragraphs.join(includeTags ? '\n\n' : '\n\n');
    } 
    else if (unit === 'sentences') {
      const allSentences = LOREM_DATABASE.join(' ').split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(allSentences[i % allSentences.length] + '.');
      }
      const text = sentences.join(' ');
      result = includeTags ? `<p>${text}</p>` : text;
    } 
    else if (unit === 'words') {
      const allWords = LOREM_DATABASE.join(' ').replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').split(/\s+/).filter(w => w.length > 0);
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(allWords[i % allWords.length].toLowerCase());
      }
      // Capitalize first word
      if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      }
      const text = words.join(' ') + '.';
      result = includeTags ? `<p>${text}</p>` : text;
    }

    setLoremOutput(result);
  }, [unit, count, includeTags]);

  const handleCopy = () => {
    if (!loremOutput) return;
    navigator.clipboard.writeText(loremOutput);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-5">
        {/* Unit & quantity controllers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end bg-rose-50/15 p-4 rounded-xl border border-rose-100">
          <div>
            <label className="block text-xs font-black text-slate-400 font-mono uppercase mb-2">
              Generate Unit:
            </label>
            <div className="flex bg-white border border-rose-100 rounded-lg p-1">
              {(['paragraphs', 'sentences', 'words'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => {
                    setUnit(u);
                    // Set sensible default ranges for units
                    if (u === 'paragraphs') setCount(3);
                    else if (u === 'sentences') setCount(8);
                    else if (u === 'words') setCount(50);
                  }}
                  className={`flex-1 py-1 px-2.5 text-xs font-bold capitalize rounded-md transition-colors cursor-pointer ${
                    unit === u
                      ? 'bg-[#FF334B] text-white shadow-xs'
                      : 'text-slate-650 hover:bg-rose-50/50'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 font-mono uppercase mb-2">
              Amount Ticker ({count}):
            </label>
            <input
              type="number"
              min="1"
              max={unit === 'paragraphs' ? 25 : unit === 'sentences' ? 100 : 500}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-2 border border-rose-100 text-slate-800 bg-white rounded-lg font-mono font-bold text-sm focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center pb-1">
            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={includeTags}
                onChange={(e) => setIncludeTags(e.target.checked)}
                className="w-4 h-4 text-[#FF334B] border-rose-200 rounded focus:ring-[#FF334B] accent-[#FF334B]"
              />
              <span className="text-sm font-semibold text-slate-700">
                Embed HTML tag wrappers
              </span>
            </label>
          </div>
        </div>

        {/* Output Text box */}
        <div>
          <textarea
            readOnly
            className="w-full h-64 p-4 text-slate-800 bg-slate-50 border border-rose-100/50 rounded-xl outline-hidden font-sans text-sm leading-relaxed"
            value={loremOutput}
          />
        </div>

        {/* Global actions row */}
        <div className="flex gap-3 justify-end border-t border-rose-50 pt-4 mt-2">
          <button
            onClick={handleCopy}
            disabled={!loremOutput}
            className="px-5 py-2 bg-[#FF334B] hover:bg-[#e0243b] disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer font-extrabold text-xs rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-150"
          >
            Copy Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
