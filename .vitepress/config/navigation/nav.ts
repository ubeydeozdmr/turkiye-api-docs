export const trNav = [
  /* { text: 'Ana Sayfa', link: '/' }, */
  { text: 'Rehber', link: '/tr/v1/guide/' },
  /* { text: 'API Referansı', link: '/tr/v1/api-reference' }, */
  {
    text: 'v1',
    items: [
      {
        items: [
          /* { text: 'v2', link: '/tr/v2/guide/getting-started' }, */
          { text: 'v1', link: '/tr/v1/guide/' },
        ],
      },
      {
        items: [
          {
            text: 'Eski Dokümantasyon (v1)',
            link: 'https://ubeydeozdmr.github.io/turkiye-api-templates/docs',
          },
        ],
      },
    ],
  },
];

export const enNav = [
  /* { text: 'Home', link: '/en/' }, */
  { text: 'Guide', link: '/en/v1/guide/' },
  /* { text: 'API Reference', link: '/en/v1/api-reference' }, */
  {
    text: 'v1',
    items: [
      {
        items: [
          /* { text: 'v2', link: '/en/v2/guide/getting-started' }, */
          { text: 'v1', link: '/en/v1/guide/' },
        ],
      },
      {
        items: [
          {
            text: 'Old Documentation (v1)',
            link: 'https://ubeydeozdmr.github.io/turkiye-api-templates/docs',
          },
        ],
      },
    ],
  },
];
