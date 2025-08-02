export const searchConfig = {
  provider: 'local' as const,
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: 'Arama',
            buttonAriaLabel: 'Arama',
          },
          modal: {
            resetButtonTitle: 'Sıfırla',
            backButtonTitle: 'Geri',
            noResultsText: 'Sonuç bulunamadı.',
          },
        },
      },
      en: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search',
          },
          modal: {
            resetButtonTitle: 'Reset',
            backButtonTitle: 'Back',
            noResultsText: 'No results found.',
          },
        },
      },
    },
  },
}; 