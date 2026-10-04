import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'bespoke-web-design',
    number: '01',
    title: 'Bespoke Website Design',
    summary: 'Tailored visual systems designed from scratch around your brand ethos.',
    description: 'We reject cookie-cutter page builders. Every HAVEN website is architected with deliberate typographic hierarchy, nuanced atmospheric lighting, and high-impact art direction that commands attention.',
    deliverables: [
      'Original brand-specific visual identity',
      'High-fidelity desktop & mobile UI systems',
      'Custom iconography & art-directed visual assets',
      'Interactive design prototypes before coding'
    ],
    icon: 'Palette',
    highlightTag: 'Brand Differentiation'
  },
  {
    id: 'full-stack-engineering',
    number: '02',
    title: 'Production Web Engineering',
    summary: 'Lightning-fast modern frontend code built on resilient web standards.',
    description: 'Engineered with clean TypeScript, modern CSS architectures, and zero bloated runtimes. Our builds achieve perfect lighthouse performance metrics, seamless responsive fluidity, and rock-solid cross-browser stability.',
    deliverables: [
      'Modern TypeScript & React architecture',
      'Sub-second first-contentful-paint speeds',
      'Fluid responsiveness from 360px to 4K displays',
      'Clean component modularity and maintainability'
    ],
    icon: 'Code2',
    highlightTag: 'Sub-Second Performance'
  },
  {
    id: 'cinematic-motion',
    number: '03',
    title: 'Cinematic Motion & Interaction',
    summary: 'Tasteful micro-interactions, smooth reveals, and immersive pacing.',
    description: 'Motion should communicate hierarchy, not cause distraction. We integrate compositor-accelerated micro-interactions, scroll-anchored revelations, and night/day transformations that elevate your site into an emotional digital experience.',
    deliverables: [
      'Hardware-accelerated 60fps animations',
      'Contextual scroll reveal sequences',
      'Prefers-reduced-motion accessibility compliance',
      'Tactile hover and active feedback states'
    ],
    icon: 'Sparkles',
    highlightTag: 'Frictionless Delight'
  },
  {
    id: 'conversion-funnels',
    number: '04',
    title: 'Lead Capture & Conversion Flow',
    summary: 'Frictionless enquiry pipelines and booking engines that convert visitors.',
    description: 'A gorgeous website is only as valuable as the business it drives. We engineer intuitive enquiry funnels, multi-step booking flows, and zero-dropoff contact forms tailored to qualified client acquisition.',
    deliverables: [
      'Multi-step validated client enquiry forms',
      'Custom reservation & consultation bookers',
      'Direct CRM & email notification hooks',
      'Conversion tracking readiness'
    ],
    icon: 'TrendingUp',
    highlightTag: 'Revenue Alignment'
  },
  {
    id: 'seo-infrastructure',
    number: '05',
    title: 'Technical SEO & Structured Data',
    summary: 'Semantic markup, OpenGraph social cards, and schema architecture.',
    description: 'We build your digital foundation to be cleanly understood by search engines and social platforms. Semantic HTML5 tags, comprehensive JSON-LD schemas, and dynamic social preview cards ensure organic discoverability.',
    deliverables: [
      'Full Schema.org JSON-LD structured data',
      'OpenGraph and Twitter summary social cards',
      'Clean semantic markup & accessible ARIA milestones',
      'Optimized meta titles and descriptive tags'
    ],
    icon: 'Search',
    highlightTag: 'Organic Visibility'
  },
  {
    id: 'hosting-continuity',
    number: '06',
    title: 'Managed Hosting & Continuous Care',
    summary: 'Global CDN distribution, SSL certificates, and ongoing maintenance.',
    description: 'Never worry about server down-times, expired domain certificates, or plugin conflicts. HAVEN provides managed deployment pipelines, continuous automated backups, and priority support updates.',
    deliverables: [
      'Global multi-region edge CDN deployment',
      'Automated SSL certification & custom domain mapping',
      'Scheduled security checks & asset optimization',
      'Priority turnaround on content updates'
    ],
    icon: 'ShieldCheck',
    highlightTag: 'Zero-Downtime Reliability'
  }
];
