import React, { useMemo, useState } from 'react';
import { ToolId } from '../../types';

interface QuickClientToolsProps {
  toolId: ToolId;
  onCopySuccess: () => void;
}

const inputClass = 'w-full p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg font-mono text-sm focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden';
const buttonClass = 'px-4 py-2 bg-[#FF334B] hover:bg-[#e0243b] text-white cursor-pointer font-extrabold text-xs rounded-xl transition-all shadow-sm';
const softButtonClass = 'px-4 py-2 bg-white border border-rose-100 hover:bg-rose-50 text-slate-700 cursor-pointer font-extrabold text-xs rounded-xl transition-all';

function shell(children: React.ReactNode) {
  return <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">{children}</div>;
}

function copy(text: string, onCopySuccess: () => void) {
  if (!text) return;
  navigator.clipboard.writeText(text);
  onCopySuccess();
}

function DiscountCalculator() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');
  const [tax, setTax] = useState('0');
  const original = parseFloat(price) || 0;
  const discountRate = parseFloat(discount) || 0;
  const taxRate = parseFloat(tax) || 0;
  const saved = original * (discountRate / 100);
  const afterDiscount = Math.max(0, original - saved);
  const finalPrice = afterDiscount + afterDiscount * (taxRate / 100);

  return shell(
    <div className="grid gap-5 md:grid-cols-3">
      <Field label="Original Price" value={price} onChange={setPrice} type="number" />
      <Field label="Discount %" value={discount} onChange={setDiscount} type="number" />
      <Field label="Tax %" value={tax} onChange={setTax} type="number" />
      <Result label="You Save" value={`$${saved.toFixed(2)}`} />
      <Result label="After Discount" value={`$${afterDiscount.toFixed(2)}`} />
      <Result label="Final Price" value={`$${finalPrice.toFixed(2)}`} />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState('50');
  const [tip, setTip] = useState('15');
  const [people, setPeople] = useState('1');
  const billValue = parseFloat(bill) || 0;
  const tipValue = billValue * ((parseFloat(tip) || 0) / 100);
  const total = billValue + tipValue;
  const split = Math.max(1, parseInt(people, 10) || 1);

  return shell(
    <div className="grid gap-5 md:grid-cols-3">
      <Field label="Bill Amount" value={bill} onChange={setBill} type="number" />
      <Field label="Tip %" value={tip} onChange={setTip} type="number" />
      <Field label="People" value={people} onChange={setPeople} type="number" />
      <Result label="Tip Amount" value={`$${tipValue.toFixed(2)}`} />
      <Result label="Total Bill" value={`$${total.toFixed(2)}`} />
      <Result label="Per Person" value={`$${(total / split).toFixed(2)}`} />
    </div>
  );
}

function GpaCalculator() {
  const [grades, setGrades] = useState('4, 3.7, 3.3, 4');
  const [credits, setCredits] = useState('3, 3, 4, 2');
  const result = useMemo(() => {
    const gradeList = grades.split(',').map((v) => parseFloat(v.trim()));
    const creditList = credits.split(',').map((v) => parseFloat(v.trim()));
    let points = 0;
    let totalCredits = 0;
    gradeList.forEach((grade, index) => {
      const credit = creditList[index];
      if (!Number.isNaN(grade) && !Number.isNaN(credit) && credit > 0) {
        points += grade * credit;
        totalCredits += credit;
      }
    });
    return totalCredits ? (points / totalCredits).toFixed(2) : '0.00';
  }, [grades, credits]);

  return shell(
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Grades / Points" value={grades} onChange={setGrades} />
      <Field label="Credits" value={credits} onChange={setCredits} />
      <div className="md:col-span-2"><Result label="Weighted GPA" value={result} /></div>
    </div>
  );
}

function BinaryConverter({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [text, setText] = useState('ToolHub');
  const [binary, setBinary] = useState('01010100 01101111 01101111 01101100 01001000 01110101 01100010');
  const binaryToText = () => setText(binary.split(/\s+/).map((chunk) => String.fromCharCode(parseInt(chunk, 2))).join(''));
  const textToBinary = () => setBinary([...text].map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));

  return shell(<DualText leftLabel="Text" left={text} setLeft={setText} rightLabel="Binary" right={binary} setRight={setBinary} actions={[
    ['Text to Binary', textToBinary],
    ['Binary to Text', binaryToText],
    ['Copy Binary', () => copy(binary, onCopySuccess)],
  ]} />);
}

function Base64Tool({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [input, setInput] = useState('ToolHub');
  const [output, setOutput] = useState('VG9vbEh1Yg==');
  const encode = () => setOutput(btoa(unescape(encodeURIComponent(input))));
  const decode = () => {
    try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput('Invalid Base64 input'); }
  };
  return shell(<TextTool input={input} setInput={setInput} output={output} actions={[
    ['Encode', encode],
    ['Decode', decode],
    ['Copy Output', () => copy(output, onCopySuccess)],
  ]} />);
}

function UrlTool({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [input, setInput] = useState('https://toolhub.com/search?q=free tools');
  const [output, setOutput] = useState('');
  return shell(<TextTool input={input} setInput={setInput} output={output} actions={[
    ['Encode', () => setOutput(encodeURIComponent(input))],
    ['Decode', () => { try { setOutput(decodeURIComponent(input)); } catch { setOutput('Invalid URL encoded input'); } }],
    ['Copy Output', () => copy(output, onCopySuccess)],
  ]} />);
}

function UuidGenerator({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const generate = () => setUuid(crypto.randomUUID());
  return shell(
    <div className="space-y-5">
      <Result label="UUID v4" value={uuid} />
      <div className="flex flex-wrap gap-2">
        <button onClick={generate} className={buttonClass}>Generate UUID</button>
        <button onClick={() => copy(uuid, onCopySuccess)} className={softButtonClass}>Copy UUID</button>
      </div>
    </div>
  );
}

function JwtDecoder({ onCopySuccess }: { onCopySuccess: () => void }) {
  const sample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9vbEh1YiIsInN0YXR1cyI6ImNsaWVudC1zaWRlIn0.signature';
  const [token, setToken] = useState(sample);
  const [output, setOutput] = useState('');
  const decode = () => {
    try {
      const [header, payload] = token.split('.');
      const parse = (part: string) => JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
      setOutput(JSON.stringify({ header: parse(header), payload: parse(payload) }, null, 2));
    } catch {
      setOutput('Invalid JWT format');
    }
  };
  return shell(<TextTool input={token} setInput={setToken} output={output} inputLabel="JWT" actions={[
    ['Decode JWT', decode],
    ['Copy Output', () => copy(output, onCopySuccess)],
  ]} />);
}

function HashGenerator({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [input, setInput] = useState('ToolHub');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [output, setOutput] = useState('');
  const generate = async () => {
    const bytes = new TextEncoder().encode(input);
    const hash = await crypto.subtle.digest(algorithm, bytes);
    setOutput([...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join(''));
  };
  return shell(
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className={`${inputClass} h-36`} />
      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className={inputClass}>
        <option>SHA-256</option>
        <option>SHA-384</option>
        <option>SHA-512</option>
      </select>
      <pre className="min-h-24 whitespace-pre-wrap break-all rounded-xl border border-rose-100 bg-rose-50/20 p-4 text-xs font-mono text-slate-700">{output || 'Hash output will appear here.'}</pre>
      <div className="flex flex-wrap gap-2">
        <button onClick={generate} className={buttonClass}>Generate Hash</button>
        <button onClick={() => copy(output, onCopySuccess)} className={softButtonClass}>Copy Hash</button>
      </div>
    </div>
  );
}

function HexRgbConverter({ onCopySuccess }: { onCopySuccess: () => void }) {
  const [hex, setHex] = useState('#FF334B');
  const [rgb, setRgb] = useState('255, 51, 75');
  const hexToRgb = () => {
    const clean = hex.replace('#', '').trim();
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return setRgb('Invalid HEX');
    const value = parseInt(clean, 16);
    setRgb(`${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`);
  };
  const rgbToHex = () => {
    const nums = rgb.match(/\d+/g)?.map(Number) || [];
    if (nums.length < 3 || nums.some((n) => n < 0 || n > 255)) return setHex('Invalid RGB');
    setHex(`#${nums.slice(0, 3).map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase()}`);
  };
  return shell(<DualText leftLabel="HEX" left={hex} setLeft={setHex} rightLabel="RGB" right={rgb} setRight={setRgb} actions={[
    ['HEX to RGB', hexToRgb],
    ['RGB to HEX', rgbToHex],
    ['Copy HEX', () => copy(hex, onCopySuccess)],
    ['Copy RGB', () => copy(rgb, onCopySuccess)],
  ]} />);
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="space-y-2"><span className="block text-xs font-black uppercase tracking-widest text-slate-400 font-mono">{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} /></label>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-4"><span className="block text-xs font-black uppercase tracking-widest text-slate-400 font-mono">{label}</span><span className="mt-2 block break-all text-2xl font-black text-[#FF334B] font-mono">{value}</span></div>;
}

function TextTool({ input, setInput, output, actions, inputLabel = 'Input' }: { input: string; setInput: (value: string) => void; output: string; actions: [string, () => void][]; inputLabel?: string }) {
  return <div className="space-y-4"><label className="space-y-2 block"><span className="block text-xs font-black uppercase tracking-widest text-slate-400 font-mono">{inputLabel}</span><textarea value={input} onChange={(e) => setInput(e.target.value)} className={`${inputClass} h-36`} /></label><pre className="min-h-36 whitespace-pre-wrap break-all rounded-xl border border-rose-100 bg-rose-50/20 p-4 text-xs font-mono text-slate-700">{output || 'Output will appear here.'}</pre><div className="flex flex-wrap gap-2">{actions.map(([label, action], index) => <button key={label} onClick={action} className={index === 0 ? buttonClass : softButtonClass}>{label}</button>)}</div></div>;
}

function DualText({ leftLabel, left, setLeft, rightLabel, right, setRight, actions }: { leftLabel: string; left: string; setLeft: (value: string) => void; rightLabel: string; right: string; setRight: (value: string) => void; actions: [string, () => void][] }) {
  return <div className="space-y-4"><div className="grid gap-4 md:grid-cols-2"><label className="space-y-2"><span className="block text-xs font-black uppercase tracking-widest text-slate-400 font-mono">{leftLabel}</span><textarea value={left} onChange={(e) => setLeft(e.target.value)} className={`${inputClass} h-44`} /></label><label className="space-y-2"><span className="block text-xs font-black uppercase tracking-widest text-slate-400 font-mono">{rightLabel}</span><textarea value={right} onChange={(e) => setRight(e.target.value)} className={`${inputClass} h-44`} /></label></div><div className="flex flex-wrap gap-2">{actions.map(([label, action], index) => <button key={label} onClick={action} className={index === 0 ? buttonClass : softButtonClass}>{label}</button>)}</div></div>;
}

export default function QuickClientTools({ toolId, onCopySuccess }: QuickClientToolsProps) {
  switch (toolId) {
    case 'discount-calculator':
      return <DiscountCalculator />;
    case 'tip-calculator':
      return <TipCalculator />;
    case 'gpa-calculator':
      return <GpaCalculator />;
    case 'binary-converter':
      return <BinaryConverter onCopySuccess={onCopySuccess} />;
    case 'base64-encoder-decoder':
      return <Base64Tool onCopySuccess={onCopySuccess} />;
    case 'url-encoder-decoder':
      return <UrlTool onCopySuccess={onCopySuccess} />;
    case 'uuid-generator':
      return <UuidGenerator onCopySuccess={onCopySuccess} />;
    case 'jwt-decoder':
      return <JwtDecoder onCopySuccess={onCopySuccess} />;
    case 'hash-generator':
      return <HashGenerator onCopySuccess={onCopySuccess} />;
    case 'hex-rgb-converter':
      return <HexRgbConverter onCopySuccess={onCopySuccess} />;
    default:
      return null;
  }
}
