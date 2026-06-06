import React, { useState } from 'react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [val1_x, setVal1_x] = useState('15');
  const [val1_y, setVal1_y] = useState('200');
  const result1 = parseFloat(val1_x) && parseFloat(val1_y) 
    ? ((parseFloat(val1_x) / 100) * parseFloat(val1_y)).toFixed(2) 
    : '0';

  // Mode 2: X is what percentage of Y?
  const [val2_x, setVal2_x] = useState('30');
  const [val2_y, setVal2_y] = useState('150');
  const result2 = parseFloat(val2_x) && parseFloat(val2_y) 
    ? ((parseFloat(val2_x) / parseFloat(val2_y)) * 100).toFixed(2) 
    : '0';

  // Mode 3: Percentage Change (Increase/Decrease) from X to Y
  const [val3_x, setVal3_x] = useState('80');
  const [val3_y, setVal3_y] = useState('120');
  const parse3_x = parseFloat(val3_x);
  const parse3_y = parseFloat(val3_y);
  let result3 = '0';
  let diffTypeObj = { label: 'No Change', color: 'text-slate-500' };

  if (parse3_x && parse3_y) {
    const diff = parse3_y - parse3_x;
    const ratio = (diff / parse3_x) * 100;
    result3 = Math.abs(ratio).toFixed(2);
    if (ratio > 0) {
      diffTypeObj = { label: 'Increase', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
    } else if (ratio < 0) {
      diffTypeObj = { label: 'Decrease', color: 'text-[#FF334B] bg-rose-50 border-rose-100/60' };
    }
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans space-y-8">
      {/* Dynamic Grid of 3 Independent Calculators */}
      
      {/* SECTION 1 */}
      <div className="p-4 rounded-xl border border-rose-100/50 bg-rose-50/10">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-rose-50 pb-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF334B]" />
          Mode 1: Simple Percentage Finder (X% of Y)
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium text-slate-500 min-w-[50px] md:min-w-0 font-sans">What is</span>
            <input
              type="number"
              value={val1_x}
              onChange={(e) => setVal1_x(e.target.value)}
              className="w-full md:w-24 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">% of</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="number"
              value={val1_y}
              onChange={(e) => setVal1_y(e.target.value)}
              className="w-full md:w-32 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">?</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto bg-rose-50/30 border border-rose-100/40 p-2.5 px-4 rounded-xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Result:</span>
            <span className="text-lg font-extrabold text-[#FF334B] font-mono">
              {result1}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="p-4 rounded-xl border border-rose-100/50 bg-rose-50/10">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-rose-50 pb-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF334B]" />
          Mode 2: Proportion Finder (What % is X of Y)
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="number"
              value={val2_x}
              onChange={(e) => setVal2_x(e.target.value)}
              className="w-full md:w-28 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">is what % of</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="number"
              value={val2_y}
              onChange={(e) => setVal2_y(e.target.value)}
              className="w-full md:w-32 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">?</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto bg-rose-50/30 border border-rose-100/40 p-2.5 px-4 rounded-xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Result:</span>
            <span className="text-lg font-extrabold text-[#FF334B] font-mono">
              {result2}%
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="p-4 rounded-xl border border-rose-100/50 bg-rose-50/10">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-rose-50 pb-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF334B]" />
          Mode 3: Percentage Change (Increase / Decrease)
        </h4>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium text-slate-500 min-w-[50px] md:min-w-0 font-sans">From</span>
            <input
              type="number"
              value={val3_x}
              onChange={(e) => setVal3_x(e.target.value)}
              className="w-full md:w-28 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">to</span>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="number"
              value={val3_y}
              onChange={(e) => setVal3_y(e.target.value)}
              className="w-full md:w-32 p-2.5 border border-rose-100 text-slate-800 bg-white rounded-lg text-center font-mono font-bold focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden"
            />
            <span className="text-sm font-medium text-slate-500 font-sans">is equivalent to</span>
          </div>

          <div className="flex items-center flex-wrap gap-2 w-full md:w-auto md:ml-auto bg-rose-50/30 border border-rose-100/40 p-2.5 px-4 rounded-xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Result:</span>
            <span className="text-lg font-extrabold text-[#FF334B] font-mono">
              {result3}%
            </span>
            <span className={`text-[10px] tracking-wider uppercase font-extrabold px-2.5 py-1 rounded-md border ${diffTypeObj.color}`}>
              {diffTypeObj.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
