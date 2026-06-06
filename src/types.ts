import { LucideIcon } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export type ToolId =
  | 'word-counter'
  | 'age-calculator'
  | 'percentage-calculator'
  | 'text-case-converter'
  | 'password-generator'
  | 'qr-code-generator'
  | 'json-formatter'
  | 'unit-converter'
  | 'color-palette-generator'
  | 'lorem-ipsum-generator';

export interface Tool {
  id: ToolId;
  name: string;
  description: string;
  category: 'text' | 'math' | 'dev' | 'design';
  iconName: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: FAQItem[];
  seoArticle: string; // Dynamic rich SEO content
}

export type Theme = 'light' | 'dark';

export interface AdFormat {
  id: string;
  title: string;
  format: 'banner-728x90' | 'banner-300x250' | 'banner-468x60' | 'popunder' | 'native';
  slot: string;
}
