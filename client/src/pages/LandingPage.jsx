"use client"
import { useEffect, useState } from 'react'
import CreativeHero from '../components/creative/CreativeHero'
import CreativeSubscription from '../components/creative/CreativeSubscription'
import CreativeAssignments from '../components/creative/CreativeAssignments'
import CreativeHiring from '../components/creative/CreativeHiring'
import WorkModeNav, { scrollToWorkMode } from '../components/landing/WorkModeNav'
import WorkModeOverview from '../components/landing/WorkModeOverview'
import { getFallback } from '../data/landingPageFallbacks'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'

export default function LandingPage({ slug }) {
  const fallback = getFallback(slug) || {
    slug,
    heroTitle: 'Designers and video editors on subscription.',
    heroDescription:
      'Get unlimited design and video-editing work from a dedicated squad. Flat monthly pricing. Cancel anytime.',
    defaultLanguageCode: 'en',
    languages: [],
  }
  useLandingScrollReset()
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    let alive = true
    fetchLandingPage(slug).then((data) => {
      if (alive && data) setContent({ ...fallback, ...data })
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  // Hero CTAs jump to the matching full-length section (no tab swap).
  const goToSection = (id) => scrollToWorkMode(id)

  return (
    <>
      <CreativeHero
        slug={slug}
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
        onSelectTab={goToSection}
      />

      {/* Sticky jump-nav + plain-language overview of the three modes */}
      <WorkModeNav />
      <WorkModeOverview variant="creative" />

      {/* Full-length sections stacked so visitors can read everything */}
      <CreativeSubscription />
      <CreativeAssignments />
      <CreativeHiring />
    </>
  )
}
