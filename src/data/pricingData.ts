import { PricingPlan } from '../types';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'website-only',
    name: 'Website Only',
    tagline: 'Complete custom website build ready for your own host.',
    priceMonthlyUSD: 0,
    priceAnnualUSD: 0,
    setupFeeUSD: 990,
    hostingIncluded: false,
    domainIncluded: false,
    ctaText: 'Choose Website Only',
    highlight: false,
    features: [
      'Complete custom website design & build',
      'Choose from any HAVEN template foundation',
      'Full source code delivery (Clean React/TypeScript)',
      'Fully responsive & mobile optimized',
      'Integrated contact & enquiry form',
      'Self-hosted deployment package',
      '30-day post-launch bug warranty'
    ]
  },
  {
    id: 'website-hosting',
    name: 'Website + Hosting',
    tagline: 'Custom build plus managed high-speed cloud edge hosting.',
    badge: 'Popular',
    priceMonthlyUSD: 29,
    priceAnnualUSD: 290,
    setupFeeUSD: 1190,
    hostingIncluded: true,
    domainIncluded: false,
    ctaText: 'Get Website + Hosting',
    highlight: true,
    features: [
      'Everything in Website Only',
      'Ultra-fast Global Edge CDN hosting (99.99% uptime)',
      'Automated daily cloud backups',
      'Free SSL certificates & DDoS protection',
      'Ongoing core security patches',
      'Monthly minor copy & asset updates (1 hour/mo)',
      'Dedicated email & WhatsApp studio support'
    ]
  },
  {
    id: 'website-domain',
    name: 'Website + Custom Domain',
    tagline: 'Custom build with branded domain registration & DNS management.',
    priceMonthlyUSD: 12,
    priceAnnualUSD: 120,
    setupFeeUSD: 1090,
    hostingIncluded: false,
    domainIncluded: true,
    ctaText: 'Get Website + Domain',
    highlight: false,
    features: [
      'Everything in Website Only',
      'Custom domain registration (.com, .io, .co, or regional)',
      'DNS records and TXT record management',
      'Custom email domain forwarding (e.g., hello@yourbrand.com)',
      'Annual automatic domain renewal',
      'WHOIS privacy protection included',
      'DNS migration assistance'
    ]
  },
  {
    id: 'website-all-inclusive',
    name: 'Website + Hosting + Domain',
    tagline: 'The complete all-inclusive digital presence with zero hassle.',
    badge: 'Best Value',
    priceMonthlyUSD: 39,
    priceAnnualUSD: 390,
    setupFeeUSD: 1390,
    hostingIncluded: true,
    domainIncluded: true,
    ctaText: 'Get All-Inclusive Suite',
    highlight: false,
    features: [
      'Everything in Website Only',
      'Ultra-fast Global Edge CDN hosting included',
      'Custom brand domain (.com, .io, etc.) included',
      'Free SSL, automated backups & security firewall',
      'Professional branded email inbox setup',
      'Priority ongoing maintenance & copy updates',
      'Quarterly performance & SEO checkup'
    ]
  }
];

export const ADDONS_DATA = [
  {
    id: 'extra-pages',
    title: 'Additional Custom Pages',
    priceUSD: 190,
    description: 'Bespoke page design and implementation matching your template aesthetic.'
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Logo Kit',
    priceUSD: 350,
    description: 'Custom wordmark, vector icon marks, color palette guide, and typography manual.'
  },
  {
    id: 'speed-optimization',
    title: 'Advanced Core Web Vitals Optimization',
    priceUSD: 240,
    description: 'Extreme image compression, sub-resource integrity, and edge caching for 99+ scores.'
  }
];
