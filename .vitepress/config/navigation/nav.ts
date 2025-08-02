export const trNav = [
  /* { text: 'Ana Sayfa', link: '/' }, */
  { text: 'Rehber', link: '/tr/v1/guide/welcome' },
  /* { text: 'API Referansı', link: '/tr/v1/api-reference' }, */
  {
    text: 'v1',
    items: [
      {
        items: [
          /* { text: 'v2', link: '/tr/v1/guide/getting-started' }, */
          { text: 'v1', link: '/tr/v1/guide/welcome' },
        ],
      },
      {
        items: [
          { text: 'Sürüm Notları', link: '/tr/v1/changelog' },
          {
            text: 'Eski Dokümantasyon (v1)',
            link: 'https://turkiyeapi.dev/docs',
          },
        ],
      },
    ],
  },
];

export const enNav = [
  /* { text: 'Home', link: '/en/' }, */
  { text: 'Guide', link: '/en/v1/guide/welcome' },
  /* { text: 'API Reference', link: '/en/v1/api-reference' }, */
  {
    text: 'v1',
    items: [
      {
        items: [
          /* { text: 'v2', link: '/tr/v1/guide/getting-started' }, */
          { text: 'v1', link: '/en/v1/guide/welcome' },
        ],
      },
      {
        items: [
          { text: 'Changelog', link: '/en/v1/changelog' },
          {
            text: 'Old Documentation (v1)',
            link: 'https://turkiyeapi.dev/docs',
          },
        ],
      },
    ],
  },
];
