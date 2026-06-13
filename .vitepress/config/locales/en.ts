import { enNav, enSidebar } from '../navigation';

export const enLocale = {
  label: 'English',
  lang: 'en',
  title: 'TurkiyeAPI',
  description: "REST API for Turkey's administrative data",
  themeConfig: {
    outline: {
      label: 'Contents',
    },
    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/ubeydeozdmr/turkiye-api-docs/edit/main/:path',
    },
    footer: {
      message:
        'Published under the MIT License. <a href="/en/v2/guide/privacy">Privacy</a> · <a href="/en/v2/guide/terms">Terms</a> · <a href="/en/v2/guide/support">Support</a>',
      copyright:
        'Copyright © 2022-present <a href="https://github.com/ubeydeozdmr" target="_blank">Ubeyde Emir Özdemir</a>',
    },
    nav: enNav,
    sidebar: enSidebar,
  },
};
