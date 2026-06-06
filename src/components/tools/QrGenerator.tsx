import React, { useState } from 'react';

export default function QrGenerator() {
  const [text, setText] = useState('https://toolhub.com');
  const [size, setSize] = useState('250');
  const fgColor = '#000000';
  const bgColor = '#ffffff';
  const [downloading, setDownloading] = useState(false);

  // Dynamic QRServer API address mapping
  const rawFgColor = fgColor.replace('#', '');
  const rawBgColor = bgColor.replace('#', '');
  const qrUrl = text
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&color=${rawFgColor}&bgcolor=${rawBgColor}&data=${encodeURIComponent(text)}`
    : '';

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      setDownloading(true);
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to trigger QR code image download direct', error);
      // Fallback: open in new tab if blob failed
      window.open(qrUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Configurations Panel */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter Content / URL Target:
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste website link or type standard text here..."
              className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Dimensions size (pixels):
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden transition-all font-mono"
            >
              <option value="150">150 x 150 px</option>
              <option value="200">200 x 200 px</option>
              <option value="250">250 x 250 px</option>
              <option value="300">300 x 300 px</option>
              <option value="400">400 x 400 px</option>
              <option value="500">500 x 500 px</option>
            </select>
          </div>
        </div>

        {/* Visual Preview Frame */}
        <div className="flex flex-col items-center justify-center bg-rose-50/10 p-6 rounded-2xl border border-rose-100/50">
          <div className="bg-white p-4 rounded-xl shadow-xs border border-rose-100 flex items-center justify-center min-w-[200px] min-h-[200px]">
            {text ? (
              <img
                src={qrUrl}
                alt="QR Code Generator Matrix Preview"
                className="max-w-[200px] max-h-[200px] object-contain select-none"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center text-xs text-slate-400 font-medium max-w-[150px]">
                Enter some content to generate active QR pixel grids.
              </div>
            )}
          </div>

          {text && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="mt-6 px-6 py-2.5 bg-[#FF334B] hover:bg-[#e0243b] disabled:opacity-40 text-white cursor-pointer font-extrabold text-sm rounded-xl transition-all font-sans shadow-md flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 duration-150"
            >
              {downloading ? 'Compiling Blob...' : 'Download PNG Image'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
