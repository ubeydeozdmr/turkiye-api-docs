export const searchConfig = {
  provider: 'local' as const,
  options: {
    miniSearch: {
      searchOptions: {
        boostDocument(documentId: string) {
          if (typeof window === 'undefined') return 1;

          const getVersionFromPath = (path: string) => path.match(/\/v([12])(?:\/|$)/)?.[1];
          const activeVersion = getVersionFromPath(window.location.pathname);
          if (!activeVersion) return 1;

          const resultVersion = getVersionFromPath(documentId);
          if (!resultVersion) return 1;

          return resultVersion === activeVersion ? 3 : 0.4;
        },
      },
    },
    locales: {
      root: {
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
      tr: {
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
