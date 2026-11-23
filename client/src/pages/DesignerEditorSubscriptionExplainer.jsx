"use client"
import { useEffect, useState } from 'react'
import ExplainerHero from '../components/accountant/ExplainerHero'
import CreativeEnquiryForm from '../components/creative-explainer/CreativeEnquiryForm'
import { CreativeExplainerSections } from '../components/creative-explainer/ExplainerSections'
import { getFallback } from '../data/landingPageFallbacks'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'

// This page uses its own admin-managed video so unrelated legacy demos are never shown.
const LANDING_SLUG = 'designer-editor-subscription-explainer'

function ProcessSummary() {
  return (
    <div className="rounded-2xl border-[1.5px] border-black bg-[#0A0A0A] text-white shadow-brutal p-7 sm:p-8">
      <p className="font-mono-tech text-sm uppercase tracking-[0.16em] text-white/50">Three ways to work with UpSquad</p>
      <ol className="mt-5 space-y-3.5">
        {[{ title: 'Subscribe · Ongoing creative support' }, { title: 'Assign · One-time projects' }, { title: 'Hire · Your next creative team member' }].map((step, i) => (
          <li key={step.title} className="flex items-center gap-3 text-sm font-medium text-white">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFFF99] text-[#0A0A0A] text-xs font-bold shrink-0">
              {i + 1}
            </span>
            {step.title}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function DesignerEditorSubscriptionExplainer() {
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
        heroTitle={content.heroTitle === 'Your design and video work, on a simple monthly subscription.' ? fallback.heroTitle : content.heroTitle}
        heroDescription={content.heroDescription === 'Get a graphic designer, a video editor, or both through one monthly plan. Submit unlimited work requests, ask for unlimited revisions, and manage everything in SquadHub.' ? fallback.heroDescription : content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
        waHref={`https://wa.me/919995266385?text=${encodeURIComponent('Hi UpSquad, I need a Graphic Designer or Video Editor. Please help me choose the right service.')}`}
        subscriptionHref="#creative-enquiry"
        subscriptionLabel="Share your requirements"
        priceLine="Subscribe. Assign. Hire."
        enrollmentNote={null}
        footnote="Tell us what you need · No payment required to enquire"
        noVideoContent={<ProcessSummary />}
      />

      <CreativeExplainerSections />
      <CreativeEnquiryForm />
    </>
  )
}
