import LandingPage from '../../../../pages/LandingPage'

export const metadata = {
  title: 'Designers & Video Editors on Subscription — UpSquad',
  description:
    'Get unlimited design and video-editing work from a dedicated squad on a flat monthly subscription, or hire vetted creatives directly with a replacement guarantee.',
}

// Content is still managed under the "get-started" landing-page slug (admin +
// /api/v1/landing-pages/get-started); only the public URL changed. The old
// /lp/get-started path 301-redirects here (see server/index.js).
export default function DesignersAndVideoEditorsPage() {
  return <LandingPage slug="get-started" />
}
