import { trNav, trSidebar } from '../navigation';

export const trLocale = {
  label: 'Türkçe',
  lang: 'tr',
  title: 'TurkiyeAPI',
  description: "Türkiye'nin idari verileri için REST API",
  themeConfig: {
    outline: {
      label: 'İçindekiler',
    },
    editLink: {
      text: "Bu sayfayı GitHub'da düzenle",
      pattern: 'https://github.com/ubeydeozdmr/turkiye-api-docs/edit/main/:path',
    },
    footer: {
      message:
        'MIT Lisansı altında yayınlanmıştır. <a href="/tr/v2/guide/privacy">Gizlilik</a> · <a href="/tr/v2/guide/terms">Şartlar</a> · <a href="/tr/v2/guide/support">Destek</a>',
      copyright:
        'Copyright © 2022-present <a href="https://github.com/ubeydeozdmr" target="_blank">Ubeyde Emir Özdemir</a>',
    },
    nav: trNav,
    sidebar: trSidebar,
  },
};
