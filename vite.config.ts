import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(() => {
  return {
    base: './',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          play: resolve(__dirname, 'play.html'),
          ai: resolve(__dirname, 'ai.html'),
          services: resolve(__dirname, 'services.html'),
          templates: resolve(__dirname, 'templates.html'),
          pricing: resolve(__dirname, 'pricing.html'),
          about: resolve(__dirname, 'about.html'),
          contact: resolve(__dirname, 'contact.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms: resolve(__dirname, 'terms.html'),
          notFound: resolve(__dirname, '404.html'),
          nexus: resolve(__dirname, 'templates/nexus.html'),
          nexusTeam: resolve(__dirname, 'templates/nexus-team.html'),
          nexusGames: resolve(__dirname, 'templates/nexus-games.html'),
          nexusTournaments: resolve(__dirname, 'templates/nexus-tournaments.html'),
          nexusNews: resolve(__dirname, 'templates/nexus-news.html'),
          nexusContact: resolve(__dirname, 'templates/nexus-contact.html'),

          vintage: resolve(__dirname, 'templates/vintage.html'),
          vintageMenu: resolve(__dirname, 'templates/vintage-menu.html'),
          vintageAbout: resolve(__dirname, 'templates/vintage-about.html'),
          vintageGallery: resolve(__dirname, 'templates/vintage-gallery.html'),
          vintageReservations: resolve(__dirname, 'templates/vintage-reservations.html'),
          vintageContact: resolve(__dirname, 'templates/vintage-contact.html'),

          lumi: resolve(__dirname, 'templates/lumi.html'),
          lumiWork: resolve(__dirname, 'templates/lumi-work.html'),
          lumiServices: resolve(__dirname, 'templates/lumi-services.html'),
          lumiAbout: resolve(__dirname, 'templates/lumi-about.html'),
          lumiJournal: resolve(__dirname, 'templates/lumi-journal.html'),
          lumiContact: resolve(__dirname, 'templates/lumi-contact.html'),

          orbit: resolve(__dirname, 'templates/orbit.html'),
          orbitFeatures: resolve(__dirname, 'templates/orbit-features.html'),
          orbitSolutions: resolve(__dirname, 'templates/orbit-solutions.html'),
          orbitPricing: resolve(__dirname, 'templates/orbit-pricing.html'),
          orbitFaq: resolve(__dirname, 'templates/orbit-faq.html'),
          orbitContact: resolve(__dirname, 'templates/orbit-contact.html'),

          nova: resolve(__dirname, 'templates/nova.html'),
          novaAbout: resolve(__dirname, 'templates/nova-about.html'),
          novaServices: resolve(__dirname, 'templates/nova-services.html'),
          novaIndustries: resolve(__dirname, 'templates/nova-industries.html'),
          novaTeam: resolve(__dirname, 'templates/nova-team.html'),
          novaContact: resolve(__dirname, 'templates/nova-contact.html'),

          monarch: resolve(__dirname, 'templates/monarch.html'),
          monarchAbout: resolve(__dirname, 'templates/monarch-about.html'),
          monarchServices: resolve(__dirname, 'templates/monarch-services.html'),
          monarchSpeaking: resolve(__dirname, 'templates/monarch-speaking.html'),
          monarchInsights: resolve(__dirname, 'templates/monarch-insights.html'),
          monarchContact: resolve(__dirname, 'templates/monarch-contact.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
