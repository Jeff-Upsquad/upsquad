"use client"
import { useEffect, useMemo, useState } from 'react'
import LandingHero from '../components/landing/LandingHero'
import OtherPricingDropdown from '../components/landing/OtherPricingDropdown'
import PlanTypeTabs from '../components/pricing/PlanTypeTabs'
import LivePricingBlock from '../components/pricing/LivePricingBlock'
import VideoPhotographerPricing from '../components/pricing/VideoPhotographerPricing'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import ImportantNote from '../components/pricing/ImportantNote'
import { liveTypes, planTypes } from '../data/pricing'
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
  const [activeType, setActiveType] = useState('Designers')

  useEffect(() => {
    let alive = true
    fetchLandingPage(slug).then((data) => {
      if (alive && data) setContent({ ...fallback, ...data })
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const otherOptions = useMemo(
    () => planTypes.filter((t) => !liveTypes.includes(t)),
    []
  )

  return (
    <>
      <LandingHero
        slug={slug}
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
      />

      <div className="py-12 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <PlanTypeTabs
            activeType={activeType}
            setActiveType={setActiveType}
            types={liveTypes}
            rightSlot={
              <OtherPricingDropdown
                options={otherOptions}
                activeType={activeType}
                onSelect={setActiveType}
              />
            }
          />

          {activeType === 'Video/Photographer' ? (
            <VideoPhotographerPricing />
          ) : liveTypes.includes(activeType) ? (
            <LivePricingBlock activeType={activeType} />
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">{activeType} Plan</h1>
              </div>
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
                <p className="text-slate-500 max-w-md">
                  Pricing for <span className="font-semibold text-slate-700">{activeType}</span> is on its way. Join the waitlist to get notified when it launches.
                </p>
                <a href="#" className="mt-8 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
                  Join the Waitlist
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <WhatYouCanRequest />
        <WorkingHours />
        <BenefitsSection />
        <ImportantNote />
      </div>
    </>
  )
}
