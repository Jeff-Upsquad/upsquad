export const LANDING_PAGE_FIXTURE = {
  'get-started': {
    slug: 'get-started',
    heroTitle: 'Designers and video editors on subscription.',
    heroDescription:
      'Get unlimited design and video-editing work from a dedicated squad. Flat monthly pricing. Cancel anytime.',
    defaultLanguageCode: 'en',
    languages: [
      {
        code: 'en',
        name: 'English',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        audioUrl: 'https://www.w3schools.com/html/horse.mp3',
      },
      {
        code: 'hi',
        name: 'Hindi',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        audioUrl: 'https://www.w3schools.com/html/horse.ogg',
      },
    ],
    updatedAt: new Date().toISOString(),
  },
}

export function getFixture(slug) {
  return LANDING_PAGE_FIXTURE[slug] || null
}
