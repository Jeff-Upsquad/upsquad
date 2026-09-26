export const LANDING_PAGE_FALLBACKS = {
  'get-started': {
    slug: 'get-started',
    heroTitle: 'Designers and video editors on subscription.',
    heroDescription:
      'Get unlimited design and video-editing work from a dedicated squad. Flat monthly pricing. Cancel anytime.',
    defaultLanguageCode: 'en',
    languages: [],
  },
  'customer-general': {
    slug: 'customer-general',
    heroTitle: 'Every squad your brand needs — on subscription.',
    heroDescription:
      'Design, video, finance, marketing, and tech. Subscribe to a dedicated squad, order fixed-fee assignments, or hire vetted talent in-house.',
    defaultLanguageCode: 'en',
    languages: [],
  },
  'customers': {
    slug: 'customers',
    heroTitle: 'Every squad your brand needs — on subscription.',
    heroDescription:
      'Design, video, finance, marketing, and tech. Subscribe to a dedicated squad, order fixed-fee assignments, or hire vetted talent in-house.',
    defaultLanguageCode: 'en',
    languages: [],
  },
  'partners': {
    slug: 'partners',
    heroTitle: 'UpSquad Partner Program',
    heroDescription:
      'One partner program for designers, video editors, accountants, sales professionals, agencies, and every other skill brands need. We handle sales, marketing, client support, and payments — you do the work you love.',
    defaultLanguageCode: 'en',
    languages: [],
  },
}

export function getFallback(slug) {
  return LANDING_PAGE_FALLBACKS[slug] || null
}
