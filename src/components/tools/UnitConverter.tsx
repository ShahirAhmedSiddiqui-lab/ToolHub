import React, { useState, useEffect } from 'react';

type Category = 'length' | 'weight' | 'temp' | 'speed';

interface UnitOption {
  value: string;
  label: string;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [calculatedResult, setCalculatedResult] = useState<string>('3.280840');

  const unitOptions: Record<Category, UnitOption[]> = {
    length: [
      { value: 'm', label: 'Metres (m)' },
      { value: 'cm', label: 'Centimeters (cm)' },
      { value: 'km', label: 'Kilometers (km)' },
      { value: 'in', label: 'Inches (in)' },
      { value: 'ft', label: 'Feet (ft)' },
      { value: 'mi', label: 'Miles (mi)' },
    ],
    weight: [
      { value: 'kg', label: 'Kilograms (kg)' },
      { value: 'g', label: 'Grams (g)' },
      { value: 'lb', label: 'Pounds (lb)' },
      { value: 'oz', label: 'Ounces (oz)' },
    ],
    temp: [
      { value: 'c', label: 'Celsius (°C)' },
      { value: 'f', label: 'Fahrenheit (°F)' },
      { value: 'k', label: 'Kelvin (K)' },
    ],
    speed: [
      { value: 'm/s', label: 'Metres per Sec (m/s)' },
      { value: 'km/h', label: 'Kilometres per Hr (km/h)' },
      { value: 'mph', label: 'Miles per Hour (mph)' },
    ],
  };

  // Set default units when category changes
  useEffect(() => {
    const options = unitOptions[category];
    if (options && options.length >= 2) {
      setFromUnit(options[0].value);
      setToUnit(options[1].value);
    }
  }, [category]);

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setCalculatedResult('0');
      return;
    }

    let result = 0;

    if (category === 'length') {
      // Base unit: meters
      let meters = val;
      if (fromUnit === 'cm') meters = val / 100;
      else if (fromUnit === 'km') meters = val * 1000;
      else if (fromUnit === 'in') meters = val * 0.0254;
      else if (fromUnit === 'ft') meters = val * 0.3048;
      else if (fromUnit === 'mi') meters = val * 1609.344;

      if (toUnit === 'm') result = meters;
      else if (toUnit === 'cm') result = meters * 100;
      else if (toUnit === 'km') result = meters / 1000;
      else if (toUnit === 'in') result = meters / 0.0254;
      else if (toUnit === 'ft') result = meters / 0.3048;
      else if (toUnit === 'mi') result = meters / 1609.344;
    } 
    else if (category === 'weight') {
      // Base unit: grams
      let grams = val;
      if (fromUnit === 'kg') grams = val * 1000;
      else if (fromUnit === 'lb') grams = val * 453.59237;
      else if (fromUnit === 'oz') grams = val * 28.3495231;

      if (toUnit === 'g') result = grams;
      else if (toUnit === 'kg') result = grams / 1000;
      else if (toUnit === 'lb') result = grams / 453.59237;
      else if (toUnit === 'oz') result = grams / 28.3495231;
    } 
    else if (category === 'temp') {
      let celsius = val;
      if (fromUnit === 'f') celsius = (val - 32) * (5/9);
      else if (fromUnit === 'k') celsius = val - 273.15;

      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = celsius * (9/5) + 32;
      else if (toUnit === 'k') result = celsius + 273.15;
    } 
    else if (category === 'speed') {
      // Base unit: m/s
      let ms = val;
      if (fromUnit === 'km/h') ms = val / 3.6;
      else if (fromUnit === 'mph') ms = val * 0.44704;

      if (toUnit === 'm/s') result = ms;
      else if (toUnit === 'km/h') result = ms * 3.6;
      else if (toUnit === 'mph') result = ms / 0.44704;
    }

    setCalculatedResult(result.toFixed(6).replace(/\.?0+$/, '')); // clean floating-point display
  }, [category, inputValue, fromUnit, toUnit]);

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="flex flex-col gap-6">
        {/* Category selector pills */}
        <div className="flex flex-wrap gap-2 border-b border-rose-50 pb-4">
          {(['length', 'weight', 'temp', 'speed'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer border ${
                category === cat
                  ? 'bg-[#FF334B] border-[#FF334B] text-white shadow-md'
                  : 'bg-white border-rose-100 text-slate-700 hover:bg-rose-50/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input parameters panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-2">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Value Input:
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              From Unit:
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden font-sans font-medium"
            >
              {unitOptions[category].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              To Unit:
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden font-sans font-medium"
            >
              {unitOptions[category].map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic conversion board */}
        <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-6 text-center mt-4">
          <span className="block text-xs uppercase tracking-widest text-[#FF334B] font-black font-mono mb-1">
            Conversion Calculation Summary
          </span>
          <div className="flex flex-wrap justify-center gap-x-3 items-baseline">
            <span className="text-xl font-black font-mono text-slate-900">
              {inputValue || '0'}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {unitOptions[category].find((o) => o.value === fromUnit)?.label.split(' (')[0]}
            </span>
            <span className="text-[#FF334B] font-black font-mono">=</span>
            <span className="text-3xl font-black font-mono text-[#FF334B]">
              {calculatedResult}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {unitOptions[category].find((o) => o.value === toUnit)?.label.split(' (')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
