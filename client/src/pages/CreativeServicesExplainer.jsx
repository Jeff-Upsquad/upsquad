"use client"
import { useEffect, useState } from 'react'
import ExplainerHero from '../components/accountant/ExplainerHero'
import CreativeEnquiryForm from '../components/creative-explainer/CreativeEnquiryForm'
import { CreativeExplainerSections } from '../components/creative-explainer/CreativeServicesSections'
import { getFallback } from '../data/landingPageFallbacks'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'

// This page uses its own admin-managed video so unrelated legacy demos are never shown.
const LANDING_SLUG = 'creative-services-explainer'

function VideoPlaceholder() {
  return (
    <div className="aspect-video rounded-2xl border border-black bg-[#0A0A0A] text-white shadow-brutal p-7 flex flex-col items-center justify-center gap-5 text-center" aria-label="Explainer video coming soon">
      <span className="w-16 h-16 rounded-full bg-[#FFFF99] text-black flex items-center justify-center" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
      <p className="font-heading text-xl font-bold">Designers &amp; Video Editors, explained.</p>
      <p className="text-base text-white/75">Explainer video coming soon</p>
    </div>
  )
}

export default function CreativeServicesExplainer() {
  useLandingScrollReset()
  const fallback = getFallback(LANDING_SLUG)
  const [content, setContent] = useState(fallback)
  const [isLocalPreview, setIsLocalPreview] = useState(false)

  useEffect(() => {
    setIsLocalPreview(['localhost', '127.0.0.1', '::1'].includes(window.location.hostname))
    let alive = true
    fetchLandingPage(LANDING_SLUG).then((data) => {
      if (alive && data) setContent((prev) => ({ ...prev, ...data }))
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ExplainerHero
        slug={LANDING_SLUG}
        externalVideoPlayback={isLocalPreview}
        badge="Designers & Video Editors"
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={(content.languages || []).filter(language => language.videoUrl)}
        defaultLanguageCode={content.defaultLanguageCode}
        waHref={`https://wa.me/919995266385?text=${encodeURIComponent('Hi UpSquad, I need a Graphic Designer or Video Editor. Please help me choose the right service.')}`}
        subscriptionHref="#creative-enquiry"
        subscriptionLabel="Share your requirements"
        priceLine="Subscribe. Assign. Hire."
        enrollmentNote={null}
        footnote="Tell us what you need · No payment required to enquire"
        noVideoContent={<VideoPlaceholder />}
      />

      <CreativeExplainerSections />
      <CreativeEnquiryForm />
    </>
  )
}
