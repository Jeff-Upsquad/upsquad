"use client"
import { useEffect, useState } from 'react'
import LandingHero from '../components/landing/LandingHero'
import PricingFlow from '../components/pricing/PricingFlow'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import ImportantNote from '../components/pricing/ImportantNote'
import ScrollReveal from '../components/ScrollReveal'
import { getFallback } from '../data/landingPageFallbacks'
import { fetchLandingPage } from '../lib/landingPageApi'

export default function LandingPage({ slug }) {
  const fallback = getFallback(slug) || {
    slug,
    heroTitle: 'Creative on demand.',
    heroDescription: 'Designers and video editors on subscription.',
    defaultLanguageCode: 'en',
    languages: [],
  }
  const [content, setContent] = useState(fallback)

  useEffect(() => {
    let alive = true
    fetchLandingPage(slug).then((data) => {
      if (alive && data) setContent({ ...fallback, ...data })
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <>
      <LandingHero
        slug={slug}
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
      />

      <ScrollReveal>
        <div className="py-12 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
            <PricingFlow />
          </div>
        </div>
      </ScrollReveal>

      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <ScrollReveal><WhatYouCanRequest /></ScrollReveal>
        <ScrollReveal><WorkingHours /></ScrollReveal>
        <ScrollReveal><BenefitsSection /></ScrollReveal>
        <ScrollReveal><ImportantNote /></ScrollReveal>
      </div>
    </>
  )
}
