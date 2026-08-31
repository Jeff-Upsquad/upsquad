// Campaign / design pages listed on /studio.
// To ship a new one: add an entry here, then add app/(main)/studio/<id>/page.jsx.

export const STUDIO_PAGES = [
  {
    id: 'dream-team',
    href: '/studio/dream-team',
    title: 'Dream Team',
    kicker: 'Open call',
    audience: 'Video editors & designers',
    blurb:
      'Partner-program posters for Meta — Stories/Reels, feed portrait, square, and landscape. Download PNGs from the page.',
    status: 'live',
    formats: ['9:16', '4:5', '1:1', '1.91:1'],
    accent: 'yellow',
  },
]

export function getStudioPage(id) {
  return STUDIO_PAGES.find((p) => p.id === id)
}
