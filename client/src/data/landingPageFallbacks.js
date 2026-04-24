export const LANDING_PAGE_FALLBACKS = {
  'get-started': {
    slug: 'get-started',
    heroTitle: 'Designers and video editors on subscription.',
    heroDescription:
      'Get unlimited design and video-editing work from a dedicated squad. Flat monthly pricing. Cancel anytime.',
    defaultLanguageCode: 'en',
    languages: [],
  },
}

export function getFallback(slug) {
  return LANDING_PAGE_FALLBACKS[slug] || null
}
