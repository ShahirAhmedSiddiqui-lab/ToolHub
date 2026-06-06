import React, { useState, useEffect, useCallback } from 'react';

interface PasswordGeneratorProps {
  onCopySuccess: () => void;
}

export default function PasswordGenerator({ onCopySuccess }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setPassword('');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setPassword(generated);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Calculate password strength
  const getStrengthScore = () => {
    let score = 0;
    if (!password) return { label: 'Empty', color: 'bg-slate-200', width: 'w-0', text: 'text-slate-400' };

    if (password.length >= 8) score += 1;
    if (password.length >= 14) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) {
      return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/4', text: 'text-rose-500 font-extrabold' };
    } else if (score <= 4) {
      return { label: 'Medium', color: 'bg-amber-400', width: 'w-2/4', text: 'text-amber-500 font-extrabold' };
    } else if (score === 5) {
      return { label: 'Strong', color: 'bg-[#FF334B]/80', width: 'w-3/4', text: 'text-[#FF334B] font-extrabold' };
    } else {
      return { label: 'Excellent', color: 'bg-[#FF334B]', width: 'w-full', text: 'text-[#FF334B] font-black' };
    }
  };

  const strength = getStrengthScore();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-5">
        {/* Output Screen */}
        <div className="relative flex items-center bg-slate-50 p-4 border border-rose-100 rounded-xl">
          <input
            type="text"
            readOnly
            value={password || 'Please select at least one character option'}
            className="w-full pr-20 text-slate-900 font-mono text-lg font-bold bg-transparent border-0 outline-hidden focus:ring-0 overflow-x-auto select-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!password}
              className="p-1.5 hover:bg-rose-100/50 text-[#FF334B] disabled:opacity-40 rounded-lg cursor-pointer transition-all duration-150 active:scale-95"
              title="Copy Password"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
            <button
              onClick={generatePassword}
              className="p-1.5 hover:bg-rose-100/50 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer transition-all duration-150 active:scale-95"
              title="Regenerate Password"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1021 16h-3.003L12 21" />
              </svg>
            </button>
          </div>
        </div>

        {/* Strength Progress Indicator */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold mb-1">
            <span className="text-slate-500">Security Score:</span>
            <span className={`uppercase ${strength.text}`}>{strength.label}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
          </div>
        </div>

        {/* Adjust Length */}
        <div>
          <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
            <span>Password length:</span>
            <span className="font-mono text-[#FF334B] font-bold">{length} characters</span>
          </div>
          <input
            type="range"
            min="6"
            max="40"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#FF334B]"
          />
        </div>

        {/* Customizable Toggle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <label className="flex items-center gap-3 bg-rose-50/5 border border-rose-100/50 rounded-xl p-3 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-4 h-4 text-[#FF334B] border-rose-200 rounded focus:ring-[#FF334B] accent-[#FF334B]"
            />
            <div>
              <span className="text-xs font-bold block text-slate-800">Uppercase Letters</span>
              <span className="text-[10px] text-slate-400">Include ABCD...</span>
            </div>
          </label>

          <label className="flex items-center gap-3 bg-rose-50/5 border border-rose-100/50 rounded-xl p-3 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-4 h-4 text-[#FF334B] border-rose-200 rounded focus:ring-[#FF334B] accent-[#FF334B]"
            />
            <div>
              <span className="text-xs font-bold block text-slate-800">Lowercase Letters</span>
              <span className="text-[10px] text-slate-400">Include abcd...</span>
            </div>
          </label>

          <label className="flex items-center gap-3 bg-rose-50/5 border border-rose-100/50 rounded-xl p-3 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-[#FF334B] border-rose-200 rounded focus:ring-[#FF334B] accent-[#FF334B]"
            />
            <div>
              <span className="text-xs font-bold block text-slate-800">Numbers & Digits</span>
              <span className="text-[10px] text-slate-400">Include 0123...</span>
            </div>
          </label>

          <label className="flex items-center gap-3 bg-rose-50/5 border border-rose-100/50 rounded-xl p-3 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-[#FF334B] border-rose-200 rounded focus:ring-[#FF334B] accent-[#FF334B]"
            />
            <div>
              <span className="text-xs font-bold block text-slate-800">Special Symbols</span>
              <span className="text-[10px] text-slate-400">Include @#_!...</span>
            </div>
          </label>
        </div>

        {/* Global Action item */}
        <div className="flex gap-3 justify-end mt-2 pt-4 border-t border-rose-50">
          <button
            onClick={handleCopy}
            disabled={!password}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#FF334B] hover:bg-[#e0243b] disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all font-sans shadow-md flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 duration-150"
          >
            Copy Password
          </button>
        </div>
      </div>
    </div>
  );
}
