import LandingPage from '../../../../pages/LandingPage'
import { LANDING_PAGE_SLUGS } from '../../../../data/landingPageSlugs'

export function generateStaticParams() {
  return LANDING_PAGE_SLUGS.map((slug) => ({ slug }))
}

export default function LpPage({ params }) {
  return <LandingPage slug={params.slug} />
}
