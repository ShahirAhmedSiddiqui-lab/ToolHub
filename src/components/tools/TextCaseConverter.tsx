import React, { useState } from 'react';

interface TextCaseConverterProps {
  onCopySuccess: () => void;
}

export default function TextCaseConverter({ onCopySuccess }: TextCaseConverterProps) {
  const [text, setText] = useState('');

  const toSentenceCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, g1, g2) => g1 + g2.toUpperCase());
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\b[a-z]/gi, (char) => char.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '');
  };

  const handleAction = (type: 'upper' | 'lower' | 'sentence' | 'title' | 'camel' | 'snake' | 'kebab') => {
    if (!text) return;
    let converted = '';
    switch (type) {
      case 'upper':
        converted = text.toUpperCase();
        break;
      case 'lower':
        converted = text.toLowerCase();
        break;
      case 'sentence':
        converted = toSentenceCase(text);
        break;
      case 'title':
        converted = toTitleCase(text);
        break;
      case 'camel':
        converted = toCamelCase(text);
        break;
      case 'snake':
        converted = toSnakeCase(text);
        break;
      case 'kebab':
        converted = toKebabCase(text);
        break;
    }
    setText(converted);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    onCopySuccess();
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 shadow-sm rounded-2xl border border-slate-150 dark:border-slate-800 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Enter or paste your text to restyle:
          </label>
          <textarea
            className="w-full h-56 p-4 text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-hidden dark:focus:border-indigo-400 transition-all placeholder-slate-400 text-base"
            placeholder="Type or paste text here to reform case types..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Counters & Limits Info */}
        <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
          <span>Characters: {text.length}</span>
          <span>Words: {text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</span>
        </div>

        {/* Buttons formatting toolbar */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={() => handleAction('upper')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => handleAction('lower')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            lowercase
          </button>
          <button
            onClick={() => handleAction('sentence')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            Sentence case
          </button>
          <button
            onClick={() => handleAction('title')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            Title Case
          </button>
          <button
            onClick={() => handleAction('camel')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            camelCase
          </button>
          <button
            onClick={() => handleAction('snake')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            snake_case
          </button>
          <button
            onClick={() => handleAction('kebab')}
            disabled={!text}
            className="px-4 py-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 dark:border-slate-800/80 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-2xs"
          >
            kebab-case (slug)
          </button>
        </div>

        {/* Global Action items */}
        <div className="flex gap-3 justify-end mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            onClick={() => setText('')}
            disabled={!text}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-semibold text-xs rounded-lg transition-colors"
          >
            Clear Text
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white cursor-pointer font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            Copy Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
