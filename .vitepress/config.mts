import { defineConfig } from 'vitepress';
import { themeConfig } from './config/theme';
import { trLocale } from './config/locales/tr';
import { enLocale } from './config/locales/en';

export default defineConfig({
  title: 'TurkiyeAPI',
  description: "REST API for Turkey's administrative data",
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#40e0d0' }],
    ['meta', { name: 'author', content: 'Ubeyde Emir Özdemir' }],
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  themeConfig,
  locales: {
    root: trLocale,
    en: enLocale,
  },
});
