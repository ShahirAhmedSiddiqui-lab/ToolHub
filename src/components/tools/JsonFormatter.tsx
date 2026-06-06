import React, { useState } from 'react';

interface JsonFormatterProps {
  onCopySuccess: () => void;
}

export default function JsonFormatter({ onCopySuccess }: JsonFormatterProps) {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "ToolHub",\n  "status": "online",\n  "features": ["fast", "seo-friendly", "free"]\n}');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState('2');

  const handleBeautify = () => {
    if (!jsonInput.trim()) {
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      const space = parseInt(indentSize);
      setJsonInput(JSON.stringify(parsed, null, space));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax. Checkout double quotes or nested commas.');
    }
  };

  const handleMinify = () => {
    if (!jsonInput.trim()) {
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax. Verify brackets matching.');
    }
  };

  const handleValidate = () => {
    if (!jsonInput.trim()) {
      setError(null);
      return;
    }
    try {
      JSON.parse(jsonInput);
      setError('VALID: JSON format is perfectly accurate!');
    } catch (e: any) {
      setError('ERROR: ' + (e.message || 'Syntax error detected.'));
    }
  };

  const handleCopy = () => {
    if (!jsonInput) return;
    navigator.clipboard.writeText(jsonInput);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-4">
        {/* Indent controls toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-rose-50/15 p-3 rounded-xl border border-rose-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-400 font-mono uppercase">Indent Spaces:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(e.target.value)}
              className="p-1 px-2 border border-rose-100 bg-white rounded font-mono text-xs text-slate-700"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="8">8 spaces</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBeautify}
              className="px-3 py-1.5 bg-white border border-rose-100 hover:bg-rose-50/50 text-[#FF334B] font-extrabold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
            >
              Beautify
            </button>
            <button
              onClick={handleMinify}
              className="px-3 py-1.5 bg-white border border-rose-100 hover:bg-rose-50/50 text-slate-700 font-extrabold text-xs rounded-lg transition-all shadow-xs cursor-pointer"
            >
              Minify
            </button>
            <button
              onClick={handleValidate}
              className="px-3 py-1.5 bg-rose-50 border border-rose-100 text-[#FF334B] font-black text-xs rounded-lg transition-all cursor-pointer hover:bg-rose-100/40"
            >
              Validate Formatting
            </button>
          </div>
        </div>

        {/* Input box */}
        <div>
          <textarea
            className="w-full h-80 p-4 text-slate-800 bg-white border border-rose-100 rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden transition-all font-mono text-xs leading-relaxed placeholder-slate-400"
            placeholder="Paste your JSON string here to indent, validate or minify..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        {/* Validator readout box */}
        {error && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold font-mono border ${
              error.startsWith('VALID')
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                : 'bg-rose-50 border-rose-100 text-[#FF334B]'
            }`}
          >
            {error}
          </div>
        )}

        {/* Standard controls bar */}
        <div className="flex gap-3 justify-end border-t border-rose-50 pt-4 mt-2">
          <button
            onClick={() => {
              setJsonInput('');
              setError(null);
            }}
            disabled={!jsonInput}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors border border-slate-100"
          >
            Clear Text
          </button>
          <button
            onClick={handleCopy}
            disabled={!jsonInput}
            className="px-5 py-2 bg-[#FF334B] hover:bg-[#e0243b] disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer font-extrabold text-xs rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-150"
          >
            Copy Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
