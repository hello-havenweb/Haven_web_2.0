export type ThemeMode = 'night' | 'day';

export type PageRoute = 
  | 'home' 
  | 'templates' 
  | 'services' 
  | 'pricing' 
  | 'about' 
  | 'contact';

export type TemplateId = 'nexus' | 'vintage' | 'orbit' | 'lumi' | 'business' | 'restaurant';

export interface TemplateItem {
  id: TemplateId;
  name: string;
  tagline: string;
  category: 'Gaming' | 'Editorial & Vintage' | 'Spatial & Futuristic' | 'Minimalist Tech' | 'Enterprise' | 'Culinary';
  categorySlug: 'gaming' | 'vintage' | 'orbit' | 'minimal' | 'business' | 'restaurant';
  description: string;
  longDescription: string;
  previewImage: string;
  accentColor: string;
  features: string[];
  recommendedFor: string[];
  startingPrice: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  icon: string;
  highlightTag: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthlyUSD: number;
  priceAnnualUSD: number;
  setupFeeUSD: number;
  hostingIncluded: boolean;
  domainIncluded: boolean;
  features: string[];
  highlight: boolean;
  ctaText: string;
}

export interface ClientEnquiry {
  fullName: string;
  email: string;
  businessName: string;
  selectedTemplate: TemplateId | 'custom' | '';
  projectType: string;
  needHosting: boolean;
  needDomain: boolean;
  budgetRange: string;
  timeline: string;
  message: string;
}
