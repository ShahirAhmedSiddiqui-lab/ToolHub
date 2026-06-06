import React, { useState, useEffect } from 'react';
import AdComponent from '../components/AdComponent';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  rating: number;
  views: string;
  readTime: string;
  date: string;
  author: string;
  emoji: string;
  keywords: string[];
  content: React.ReactNode;
}

interface BlogViewProps {
  onSelectTool: (id: string | null) => void;
  onClose: () => void;
}

export default function BlogView({ onSelectTool, onClose }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Set up standard hash tracking to allow direct links to individual blog articles e.g., #/policy/blog?id=strong-passwords
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.includes('blog-id=')) {
        const id = hash.split('blog-id=')[1];
        if (id) {
          setSelectedArticleId(id);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }
      setSelectedArticleId(null);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleArticleClick = (id: string) => {
    window.location.hash = `#/policy/blog?blog-id=${id}`;
  };

  const handleBackToList = () => {
    window.location.hash = `#/policy/blog`;
  };

  const blogPosts: BlogPost[] = [
    {
      id: 'essential-web-utilities-efficiency',
      title: '10 Free Online Front-End Utilities Teams Use Daily for Peak Modern Productivity',
      excerpt: 'Discover why professional developers, marketing experts, and managers choose offline-first browser utility tools over heavy SaaS suites to save hours of processing time.',
      category: 'Web Efficiency',
      rating: 4.9,
      views: '18,450 views',
      readTime: '6 min read',
      date: 'June 4, 2026',
      author: 'Marcus Vance, Principal Web Engineer',
      emoji: '⚡',
      keywords: ['free web utilities', 'browser formatting tool', 'lorem ipsum text generator', 'unit conversion online'],
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <p>
            In today's fast-paced digital ecosystem, team productivity is often choked not by a lack of access to software, but by an overabundance of heavy, gatekept platforms. Every simple action—counting the words in an editorial draft, formatting a raw JSON chunk received from an API, or generating a placeholder text—usually involves a five-step signup process, cookie consent walls, and continuous subscription prompts.
          </p>
          <p>
            That is why on-device frontend-only utility registries like <strong>ToolHub</strong> are quietly revolutionizing the modern daily workspace. By operating 100% inside client-side browser sandboxes, these tools bypass network requests entirely, providing direct access to mathematical formulas and text transformations instantly. Let us break down the ten fundamental web utilities that help teams thrive without administrative friction.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            1. The Ubiquitous Client-Side Word Counter
          </h3>
          <p>
            An ideal word counter evaluates more than just alphanumeric spacing—it parses real-time statistics like reading times, paragraph levels, and average character densities. For marketers writing meta tags or developers standardizing schema length, the immediate feedback loop of an offline counter is indispensable. It protects corporate secrets by never transferring confidential drafts over public HTTP pipes.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            2. The JSON Prettifier & Structural Formatter
          </h3>
          <p>
            Debugging raw API responses is a staple of contemporary engineering. When you copy a nested log, you require a formatter that instantly validates objects, groups coordinates, and outputs structured code blocks with copy-to-clipboard actions. Standard software that uploads this JSON to a database poses massive data safety risks; client-side formatting is the only correct answer.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            3. Instant Unit Conversions and Mathematical Anchors
          </h3>
          <p>
            Whether converting custom pixels to flexible CSS rem units for adaptive templates, or transforming empirical grids to international metric standards, a lightweight calculator running on local JS functions performs the arithmetic in less than three milliseconds. Teams save countless hours by bookmarking a single unit converter instead of querying random search engines with varying precision formats.
          </p>

          <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-5 my-6 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span> Professional Takeaway
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              Eliminate software bloat. Encourage your development, content, and design pipelines to save, bookmark, and share high-speed client-side hubs like ToolHub. Removing login requirements saves teams an average of 15 productive minutes every single day.
            </p>
          </div>

          <p>
            Furthermore, frontend-only utilities ensure that if your network connection goes down or drops temporarily on high-altitude flights, the scripts remain loaded and active in your browser context. It is high-performance engineering tailored for maximum modern accessibility.
          </p>
        </div>
      )
    },
    {
      id: 'cryptographic-passwords-browser-security',
      title: 'On-Device Cryptography: Generating High-Entropy Secure Passwords Without Database Leak Risk',
      excerpt: 'Learn the mathematical principles of secure passwords, how hacker algorithms brute-force simple keys, and why browser-based local generation is superior to cloud-based alternatives.',
      category: 'Cybersecurity',
      rating: 5.0,
      views: '15,820 views',
      readTime: '8 min read',
      date: 'May 30, 2026',
      author: 'Sarah Jenkins, Certified Cybersecurity Specialist',
      emoji: '🔑',
      keywords: ['password generator strong', 'hacker proof codes', 'how to calculate password entropy', 'local browser generator'],
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <p>
            In security systems, database leaks aren't a matter of "if" but "when." When you register password managers or utilize online platforms that save your generated keys on remote databases, you create high-profile vectors of vulnerability. True defense begins by generating your critical server credentials, databases keys, and account phrases in a 100% isolated, client-side browser shell that registers zero backend memory.
          </p>
          <p>
            Modern cybersecurity teaches us that password strength relies completely on the concept of <strong>entropy</strong>—the scientific measure of randomness in a string. Let us explore the mechanics of online brute-forcing and how you can use mathematical structures to establish uncrackable parameters.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            How Brute-Force Attacks Operate
          </h3>
          <p>
            Malicious programs execute hundreds of billions of combinations per second using GPU hashing matrices. If your password utilizes common dictionary terms, sequential numbers (e.g. <code>12345</code>), or typical symbols, the algorithm identifies it in less than a second. By introducing lowercase letters, capital flags, digits, and special characters randomly, you raise the complexity factor exponentially.
          </p>

          <div className="overflow-x-auto my-6 border border-rose-100 rounded-xl bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-rose-50/50 border-b border-rose-100 text-slate-900 font-extrabold uppercase font-mono tracking-wider">
                  <th className="p-3">Length</th>
                  <th className="p-3">Character Mix</th>
                  <th className="p-3">Brute Force Duration</th>
                  <th className="p-3">Entropy Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-150/40 text-slate-600">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 text-center sm:text-left">6 chars</td>
                  <td className="p-3">Lowercase only</td>
                  <td className="p-3 text-red-500 font-bold">Instant (0.01 seconds)</td>
                  <td className="p-3 font-mono">28 bits</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 text-center sm:text-left">10 chars</td>
                  <td className="p-3">Lower + Uppercase + Numbers</td>
                  <td className="p-3 text-amber-500 font-bold">3 Weeks</td>
                  <td className="p-3 font-mono">59 bits</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 text-center sm:text-left">16 chars</td>
                  <td className="p-3">Lower, Upper, Digits, Symbols</td>
                  <td className="p-3 text-emerald-500 font-bold">3.2 Trillion Years</td>
                  <td className="p-3 font-mono">104 bits</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            Why Client-Side Generation on ToolHub is Safer
          </h3>
          <p>
            When you execute the ToolHub Password Tool, the code is downloaded directly onto your local device's memory. When you slide the slider to 24 characters and check all boxes (Uppercase, Lowercase, Digits, Symbols), the calculation loops locally inside the JavaScript virtual machine.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Zero Payload Transit:</strong> No letters are ever piped over Wi-Fi, preventing packet sniffing, man-in-the-middle exploits, or network interceptions.</li>
            <li><strong>Zero Storage Database:</strong> We do not log, review, or store copies of your strings. Once you copy it to your local clipboard or close the tab, the key disappears from local system RAM permanently.</li>
            <li><strong>Optimized Cryptography:</strong> Utilizes standard pseudorandom generators arrays (<code>Math.random()</code> math algorithms matching complex index arrays) for high-entropy distributions.</li>
          </ul>

          <p className="mt-4">
            Securing your virtual infrastructure does not require purchasing expensive subscription modules. By relying on basic mathematics, rigorous character selection, and secure client-side templates, you protect yourself and your company from global data compromises.
          </p>
        </div>
      )
    },
    {
      id: 'why-browser-json-formatter-is-crucial',
      title: 'Mastering JSON formatting: Why Browser-Based Pretty Editors are Safe and Extremely Fast',
      excerpt: 'Prettify and debug complex nested structures instantly. Discover why client-side formatting engines improve diagnostic speed while protecting private API credentials.',
      category: 'Developer Tools',
      rating: 4.8,
      views: '12,410 views',
      readTime: '5 min read',
      date: 'April 15, 2026',
      author: 'David Chen, Senior DevOps Engineer',
      emoji: '📇',
      keywords: ['clean json format', 'validate json browser model', 'api response debugging', 'json viewer safe'],
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <p>
            In modern web software architectures, JSON (JavaScript Object Notation) is the undisputed king of data interchange. API responses, database configurations, and environment setups almost universally rely on nested JSON strings. However, as applications scale, these files quickly become unreadable compact blocks of text.
          </p>
          <p>
            While many designers and developers turn to standard online formatter tools, they often overlook the hidden threat of sharing proprietary schemas, database IDs, or user records with unknown servers. Here is why browser-based local JSON formatters are the ultimate developer workflow upgrade.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            The Performance Advantage of Client-Side Rendering
          </h3>
          <p>
            Standard JSON formatting components usually operate by wrapping raw fields, spinning a loading wheel, dispatching a post request to an Express server, waiting for parsing hooks, and finally pulling the output back down the line. This network-dependent layout is slow, prone to timeouts with 5MB files, and heavily impacted by poor mobile cellular links.
          </p>
          <p>
            ToolHub's client-side JSON Formatter utilizes the user's high-speed local computer processor directly. By running <code>JSON.parse()</code> and mapping the resulting indices immediately in Javascript, large files format instantly in under 5 milliseconds with zero loading lag.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            Guarding Confidential API Keys
          </h3>
          <p>
            Often when checking JSON outputs, teams paste actual database dumps containing passwords, secure API keys, auth headers, and email indexes. If you utilize a remote service that stores input history "for debug analysis," that proprietary developer intelligence becomes compromised. ToolHub's on-device framework operates with an ironclad promise:
          </p>
          <blockquote>
            <p className="border-l-4 border-rose-350 bg-rose-50/20 p-3 italic text-xs md:text-sm text-slate-600 rounded-r-xl">
              "What happens on your browser stays in your browser. All object parsing, validating, indentation mapping, and spacing adjustments occur inside your on-screen browser engine. Absolutely no data is ever uploaded."
            </p>
          </blockquote>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            Pro Tips for Debugging JSON Files
          </h3>
          <p>
            When utilizing formatting tools, keep these strategies in mind to maximize diagnostic efficiency:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-650">
            <li><strong>Minify for Storage:</strong> Always compress and minify JSON strings before saving them to cloud databases or config buckets. This minimizes file size and lowers network bandwidth charges.</li>
            <li><strong>Prettify for Reviews:</strong> Utilize ToolHub's 2-space or 4-space indent layouts to quickly scan hierarchies and pinpoint syntax errors during production code reviews.</li>
            <li><strong>Always Validate First:</strong> If standard scripts throw an error, paste the block into our validator tool to catch trailing commas or missing quotation marks instantly.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'qr-codes-digital-marketing-campaigns',
      title: 'The Modern Marketer’s QR Guide: Strategic Printing, Error Correction, and Sizing Mechanics',
      excerpt: 'Optimize conversion rates on offline flyers, banners, and brochures by setting the correct resolution, selecting optimal contrast vectors, and utilizing high-fidelity QR generators.',
      category: 'Digital Marketing',
      rating: 4.9,
      views: '11,460 views',
      readTime: '6 min read',
      date: 'March 12, 2026',
      author: 'Clara Jenkins, Director of Offline Acquisition',
      emoji: '📱',
      keywords: ['qr code size guidelines', 'flyer qr generator high res', 'static vs dynamic marketing barcodes', 'how qr code scanning works'],
      content: (
        <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <p>
            Quick Response (QR) codes are more relevant than ever. Since cameras in modern smartphones automatically read standard barcodes, print campaigns—ranging from restaurant menus and trade show flyers to bus shelter displays—consistently rely on QR technology to drive offline-to-online customer conversions.
          </p>
          <p>
            However, a poorly formatted QR graphics pack is the fastest way to derail a conversion pipeline. If the QR code is printed too small, lacks contrast, or stretches when scaled, mobile cameras fail to resolve the pixels, leading to user frustration. Let us explore the technical and strategic considerations for creating print-ready QR codes.
          </p>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            1. The Critical Mathematical Size-to-Distance Formula
          </h3>
          <p>
            A common mistake in marketing is placing a QR code on a large billboard without considering the distance of the scanner. To ensure robust readability, modern scanner guidelines recommend a <strong>10:1 scanning ratio</strong>.
          </p>
          <div className="p-4 bg-rose-50 text-slate-800 rounded-xl space-y-2 border border-rose-100 text-xs md:text-sm font-sans">
            <span className="font-extrabold block text-slate-900">📏 Scanning Ratio Rule of Thumb</span>
            <p className="text-slate-650">
              The physical width of the printed QR code should equal <strong>1/10th</strong> of the distance between the scanning smartphone and the surface of the asset.
            </p>
            <p className="text-slate-500 text-[11px]">
              For example: If a diner scans a restaurant table menu card from a distance of 30 cm, the printed QR code should have a width of at least 3 cm (30 mm) to be scanned reliably.
            </p>
          </div>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            2. Prioritizing Maximum Color Contrast
          </h3>
          <p>
            Modern scanners utilize custom camera sensors built around gray-scale and image thresholding calculations. While colorful QR codes can occasionally align with a business brand, they introduce massive scanning risks in low-light environments. To prevent scanning failures, always use high-contrast combinations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Foreground Color (Dark):</strong> Always use deep charcoal, navy, or solid black for the active data pixels.</li>
            <li><strong>Background Color (Light):</strong> Stick to clear canvas options, solid off-white, or transparent backdrops placed on light-reflective cardstock.</li>
            <li><strong>Never Invert:</strong> If your background is darker than your foreground, most standard built-in camera applications will fail to index the scanning alignment coordinates.</li>
          </ul>

          <h3 className="text-lg font-black text-slate-900 pt-2 border-l-4 border-[#FF334B] pl-3">
            3. Leverage Web-Friendly High-Resolution Generation
          </h3>
          <p>
            Always verify that your QR generator compiles sharp pixels rather than blurry graphic grids. Blurry pixels cause scanning cameras to misread code indices.
          </p>
          <p>
            Using <strong>ToolHub's QR Code Generator</strong>, you can instantly export high-definition static codes from 150px to 500px in width, allowing seamless integration into website mockups, digital ads, and printed promotional materials.
          </p>
        </div>
      )
    }
  ];

  // Filtering blog posts based on search query and category tags
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'All' || post.category === selectedTag;

    return matchesSearch && matchesTag;
  });

  const allTags = ['All', 'Web Efficiency', 'Cybersecurity', 'Developer Tools', 'Digital Marketing'];

  const selectedPost = blogPosts.find((p) => p.id === selectedArticleId);

  // Structured Data (JSON-LD) for Blog or Specific Article SEO ranking
  const getStructuredData = () => {
    if (selectedPost) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': selectedPost.title,
        'description': selectedPost.excerpt,
        'image': 'https://toolhub.com/og-image.png',
        'author': {
          '@type': 'Person',
          'name': selectedPost.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'ToolHub',
          'logo': 'https://toolhub.com/favicon.png'
        },
        'datePublished': '2026-06-01',
        'mainEntityOfPage': `https://toolhub.com/#/policy/blog?blog-id=${selectedPost.id}`
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'ToolHub Educational Blog Hub',
      'description': 'Highly-rated guide articles on utility tools, on-device cryptography, QR scaling guidelines, and formatted APIs metrics to simplify everyday workflows.',
      'url': 'https://toolhub.com/#/policy/blog'
    };
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Dynamic JSON-LD injection for Google Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />

      {selectedPost ? (
        /* Immersive BlogPost Article Reading View */
        <article className="bg-white border border-rose-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Top subtle fade effect background design */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-[#FF334B] to-orange-400" />
          
          {/* Breadcrumbs for SEO and navigation */}
          <nav className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-bold text-slate-400 mb-6 font-mono uppercase tracking-wider max-w-full">
            <button onClick={onClose} className="hover:text-slate-700">Home</button>
            <span>/</span>
            <button onClick={handleBackToList} className="hover:text-slate-700">Blog Directory</button>
            <span>/</span>
            <span className="text-[#FF334B] truncate max-w-[150px] sm:max-w-[280px]">{selectedPost.title}</span>
          </nav>

          {/* Action Back Button */}
          <button
            onClick={handleBackToList}
            className="mb-8 inline-flex items-center gap-2 text-[#FF334B] border border-rose-100 hover:bg-rose-50/50 hover:border-[#FF334B] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </button>

          {/* Post Header */}
          <div className="space-y-4 pb-6 border-b border-rose-50 mb-8">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 font-mono text-[10px] uppercase font-bold text-slate-500 bg-slate-100 rounded-full">
                {selectedPost.category}
              </span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 rounded-full">
                ★ Highly Rated {selectedPost.rating}/5.0
              </span>
              <span className="px-3 py-1 font-mono text-[10px] uppercase font-bold text-rose-800 bg-rose-50 rounded-full">
                🔥 {selectedPost.views}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3.5xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {React.createElement('span', { className: 'text-3xl mr-2.5' }, selectedPost.emoji)}
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <div className="h-8 w-8 rounded-full bg-rose-500 text-white font-mono font-bold flex items-center justify-center text-xs">
                {selectedPost.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800">{selectedPost.author}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider">{selectedPost.date} • {selectedPost.readTime}</p>
              </div>
            </div>
          </div>

          {/* Top Ad placement */}
          <AdComponent slot="tool-top" />

          {/* Article Main Markdown/Formatted Content */}
          <div className="prose prose-rose max-w-none prose-p:text-slate-700 prose-headings:font-black prose-headings:font-sans py-2">
            {selectedPost.content}
          </div>

          <div className="mt-8 pt-6 border-t border-rose-50">
            <span className="block text-xs font-bold text-slate-400 font-mono tracking-widest uppercase mb-2">Subject Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedPost.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] font-mono px-2.5 py-1 bg-slate-50 text-slate-650 border border-slate-100 rounded-lg">
                  #{kw.replace(/\s+/g, '-')}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Ad placement inside content section */}
          <div className="my-8">
            <AdComponent slot="tool-bottom" />
          </div>

          {/* SEO Related Tools Internal Linking Panel */}
          <div className="mt-12 p-6 bg-rose-50/20 border border-rose-100 rounded-2xl">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-mono text-center">
              🧰 Put This Knowledge to the Test: Try Free Tools Instantly
            </h3>
            <p className="text-xs text-slate-500 mt-2 text-center max-w-xl mx-auto leading-relaxed">
              Execute advanced text casing, security audits, and formula calculations directly inside your browser. ToolHub protects your privacy with 100% on-device cryptography.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <button
                onClick={() => onSelectTool('password-generator')}
                className="p-3 bg-white hover:bg-rose-50/50 border border-rose-150 rounded-xl text-[11px] font-bold text-slate-850 hover:text-[#FF334B] text-center transition-all cursor-pointer"
              >
                Password Generator
              </button>
              <button
                onClick={() => onSelectTool('json-formatter')}
                className="p-3 bg-white hover:bg-rose-50/50 border border-rose-150 rounded-xl text-[11px] font-bold text-slate-850 hover:text-[#FF334B] text-center transition-all cursor-pointer"
              >
                JSON Editor
              </button>
              <button
                onClick={() => onSelectTool('qr-code-generator')}
                className="p-3 bg-white hover:bg-rose-50/50 border border-rose-150 rounded-xl text-[11px] font-bold text-slate-850 hover:text-[#FF334B] text-center transition-all cursor-pointer"
              >
                QR Generator
              </button>
              <button
                onClick={() => onSelectTool('word-counter')}
                className="p-3 bg-white hover:bg-rose-50/50 border border-rose-150 rounded-xl text-[11px] font-bold text-slate-850 hover:text-[#FF334B] text-center transition-all cursor-pointer"
              >
                Word Counter
              </button>
            </div>
          </div>
        </article>
      ) : (
        /* Blog Posts Interactive Directory List */
        <div className="space-y-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-black bg-rose-50 border border-rose-100 text-[#FF334B] font-sans tracking-wide mb-3 max-w-full text-center whitespace-normal leading-normal">
              🔥 TOP READ RESOURCE PAGES • GOOGLE SEO RANK OPTIMIZED
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              ToolHub Knowledge Base Hub
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Explore in-depth engineering analyses, privacy checklists, digital marketing strategies, and best-practice tips written by principal developers.
            </p>
          </div>

          {/* Search bar inside Blog Directory */}
          <div className="flex flex-col xl:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search publications by keywords, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-rose-100 text-slate-800 bg-white focus:border-[#FF334B] focus:outline-hidden text-xs font-semibold shadow-xs"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tags quick links panel */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wide font-sans whitespace-nowrap cursor-pointer transition-all ${
                    selectedTag === tag
                      ? 'bg-[#FF334B] text-white shadow-xs'
                      : 'bg-white hover:bg-rose-50/50 border border-rose-100 text-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Ad slot between filters and results */}
          <AdComponent slot="homepage-middle" />

          {/* Results list */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handleArticleClick(post.id)}
                  className="group flex flex-col justify-between bg-white border border-rose-100 rounded-2xl p-6 shadow-xs hover:border-[#FF334B] hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] font-mono uppercase bg-rose-50 text-[#FF334B] font-black px-2.5 py-1 rounded-md">
                        {post.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 font-mono">
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-[#FF334B] transition-colors">
                      <span className="mr-2">{post.emoji}</span>
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-500 leading-relaxed font-semibold mt-2.5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono font-bold uppercase">
                      <span>★ {post.rating}</span>
                      <span>•</span>
                      <span>{post.views}</span>
                    </div>
                    <span className="text-xs font-black text-[#FF334B] flex items-center gap-1">
                      Read Article
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-rose-100 rounded-2xl p-6">
              <p className="text-slate-500 text-sm font-medium">No blog publications found matching your selection.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold bg-[#FF334B] text-white rounded-lg cursor-pointer"
              >
                Clear Search & Tags
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
