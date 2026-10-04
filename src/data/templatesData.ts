import { TemplateItem } from '../types';
import templateNexusImg from '../assets/images/template_nexus_gaming_1790340995454.jpg';
import templateVintageImg from '../assets/images/template_vintage_atelier_1790341012673.jpg';
import templateOrbitImg from '../assets/images/template_orbit_spatial_1790342995376.jpg';
import templateLumiImg from '../assets/images/template_lumi_minimal_1790341046258.jpg';
import templateBusinessImg from '../assets/images/template_business_apex_1790341065387.jpg';
import templateRestaurantImg from '../assets/images/template_restaurant_luxe_1790341030030.jpg';

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: 'nexus',
    name: 'Nexus Gaming',
    tagline: 'Futuristic esports & interactive gaming portal',
    category: 'Gaming',
    categorySlug: 'gaming',
    description: 'Dark cyber-aesthetic powerhouse with live tournament brackets, champion rosters, match countdowns, and high-octane community integration.',
    longDescription: 'Nexus Gaming delivers an electric, high-performance web experience crafted for esports teams, gaming guilds, streamers, and indie game developers. Built with high-contrast cyber visuals, tournament schedules, and instant Discord CTA integration.',
    previewImage: templateNexusImg,
    accentColor: '#8b5cf6',
    features: [
      'Interactive Tournament Bracket View',
      'Team Roster & Champion Showcase',
      'Live Match Schedule & Stream Countdown',
      'Discord & Twitch Community Hooks',
      'Responsive Esports Grid Layout'
    ],
    recommendedFor: ['Esports Teams', 'Gaming Clans', 'Streamers', 'Game Studios'],
    startingPrice: 1290,
  },
  {
    id: 'vintage',
    name: 'Vintage Atelier',
    tagline: 'Timeless luxury horology & artisanal craftsmanship',
    category: 'Editorial & Vintage',
    categorySlug: 'vintage',
    description: 'Warm editorial storytelling, serif typography, archival photography grids, and an intimate bespoke consultation appointment flow.',
    longDescription: 'Crafted for luxury watchmakers, bespoke tailoring ateliers, antique galleries, and heritage brands. Features graceful serif typography, historical timeline milestones, and high-fidelity artisan craft galleries.',
    previewImage: templateVintageImg,
    accentColor: '#d4af37',
    features: [
      'Archival Editorial Typographic Hierarchy',
      'Curated Horology / Craft Collection Filter',
      'Historical Atelier Timeline Milestone Component',
      'Bespoke Private Appointment Booking Flow',
      'Warm Sepia & Antique Paper Visual Palette'
    ],
    recommendedFor: ['Heritage Brands', 'Luxury Watchmakers', 'Bespoke Ateliers', 'Fine Art Galleries'],
    startingPrice: 1450,
  },
  {
    id: 'orbit',
    name: 'Orbit Spatial',
    tagline: 'Futuristic spatial computing & next-gen creative tech platform',
    category: 'Spatial & Futuristic',
    categorySlug: 'orbit',
    description: 'Deep cosmic aesthetic with holographic glass surfaces, interactive orbital system nodes, spatial product showcases, and interactive 3D particle atmosphere.',
    longDescription: 'Engineered for avant-garde technology labs, AI research studios, spatial computing platforms, and visionary creative technology houses. Combines astronomical visual depth, glass holographic interfaces, and real-time interactive nodes.',
    previewImage: templateOrbitImg,
    accentColor: '#a855f7',
    features: [
      'Interactive 3D Orbital Node Inspector',
      'Holographic Glassmorphic Data Cards',
      'Spatial Audio & Interactive Dimension Toggles',
      'Visionary Venture Project Presentation',
      'Zero-Latency Hardware Accelerated UI'
    ],
    recommendedFor: ['Spatial Computing', 'AI Labs', 'Creative Tech Studios', 'Next-Gen Startups'],
    startingPrice: 1650,
  },
  {
    id: 'lumi',
    name: 'Lumi Studio',
    tagline: 'Ultra-minimalist design studio & product showcase',
    category: 'Minimalist Tech',
    categorySlug: 'minimal',
    description: 'Clean spatial layouts, monochromatic surfaces, frosted glass panels, and interactive product feature toggles.',
    longDescription: 'Engineered for cutting-edge digital agencies, industrial design studios, and hardware innovators. Focuses on breathtaking negative space, subtle lighting transitions, and precise product storytelling.',
    previewImage: templateLumiImg,
    accentColor: '#38bdf8',
    features: [
      'Refined Monochromatic Spatial Canvas',
      'Interactive Interactive Product Feature Viewer',
      'Interactive Case Study Metric Spotlights',
      'Client Impact Proof Grid',
      'Zero-Clutter Minimalist Navigation'
    ],
    recommendedFor: ['Digital Studios', 'Tech Hardware', 'Architecture Firms', 'Product Designers'],
    startingPrice: 1190,
  },
  {
    id: 'business',
    name: 'Apex Advisory',
    tagline: 'Enterprise corporate strategy & growth consultancy',
    category: 'Enterprise',
    categorySlug: 'business',
    description: 'Deep obsidian & navy corporate architecture with practice area breakdowns, interactive growth estimator, and executive consultation scheduling.',
    longDescription: 'Built for enterprise consultancies, venture capital firms, corporate legal partners, and financial advisors. Emphasizes quantitative impact, advisory team credentials, and rapid qualified inquiry capture.',
    previewImage: templateBusinessImg,
    accentColor: '#3b82f6',
    features: [
      'Interactive ROI & Enterprise Growth Calculator',
      'Advisory Practice Areas with Outcome Proof',
      'Executive Leadership Credentials Grid',
      'Direct Confidential Consultation Booker',
      'Quantitative Impact Evidence Blocks'
    ],
    recommendedFor: ['Management Consultants', 'Financial Advisory', 'Corporate Law', 'B2B Firms'],
    startingPrice: 1590,
  },
  {
    id: 'restaurant',
    name: 'L’Étoile Gourmet',
    tagline: 'Michelin-starred culinary gastronomy & wine cellar',
    category: 'Culinary',
    categorySlug: 'restaurant',
    description: 'Moody candlelit slate ambience, multi-course tasting menus with dietary toggles, cellar selections, and live table reservation booking.',
    longDescription: 'Designed for Michelin-starred restaurants, boutique bistro concepts, and luxury culinary lounges. Features appetizing dish spotlights, sommelier wine curation, chef philosophy, and a complete table reservation booking engine.',
    previewImage: templateRestaurantImg,
    accentColor: '#f59e0b',
    features: [
      'Interactive Multi-Course Tasting Menu with Filter',
      'Sommelier Wine Cellar Pairings',
      'Live Table Reservation Booking Modal',
      'Chef’s Philosophy & Terroir Storytelling',
      'Atmospheric Dark Slate & Candlelit Imagery'
    ],
    recommendedFor: ['Fine Dining', 'Boutique Bistros', 'Wine Bars', 'Private Chefs'],
    startingPrice: 1350,
  },
];
