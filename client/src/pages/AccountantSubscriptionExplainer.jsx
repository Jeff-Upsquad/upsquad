"use client"
import { useEffect, useState } from 'react'
import ExplainerHero from '../components/accountant/ExplainerHero'
import IncludedAndAddons from '../components/accountant/IncludedAndAddons'
import PricingGuarantee from '../components/accountant/PricingGuarantee'
import WorkVisibility from '../components/accountant/WorkVisibility'
import SquadHubSection from '../components/accountant/SquadHubSection'
import AccountantTeamSection from '../components/accountant/AccountantTeamSection'
import SoftwareAndAi from '../components/accountant/SoftwareAndAi'
import GetStartedCta from '../components/accountant/GetStartedCta'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'

// Standalone landing page for the accountant-subscription explainer script.
// Hero copy + per-language explainer videos are admin-managed under this
// slug in the admin (+ /api/v1/landing-pages/accountant-subscription-
// explainer); videos are uploaded there, not hardcoded.
const LANDING_SLUG = 'accountant-subscription-explainer'
// The per-language explainer videos already live under the main accountant
// page's slug. Until videos are uploaded under this page's own slug, they are
// reused so the hero player works on day one.
const VIDEO_FALLBACK_SLUG = 'accountant-subscription'

export default function AccountantSubscriptionExplainer() {
  useLandingScrollReset()
  const [content, setContent] = useState({ languages: [], defaultLanguageCode: 'en' })

  useEffect(() => {
    let alive = true
    fetchLandingPage(LANDING_SLUG).then(async (data) => {
      if (!alive) return
      const adoptFallbackVideos = async () => {
        const fallback = await fetchLandingPage(VIDEO_FALLBACK_SLUG)
        if (!alive || !fallback) return
        setContent((prev) => ({
          ...prev,
          languages: fallback.languages || [],
          defaultLanguageCode: fallback.defaultLanguageCode || prev.defaultLanguageCode,
        }))
      }
      if (!data) {
        // Slug not seeded yet (fresh DB) — fall back to the shared videos.
        await adoptFallbackVideos()
        return
      }
      setContent((prev) => ({ ...prev, ...data }))
      const hasVideos = (data.languages || []).some((l) => l.videoUrl)
      if (!hasVideos) await adoptFallbackVideos()
    })
    return () => { alive = false }
  }, [])

  return (
    <>
      <ExplainerHero
        slug={LANDING_SLUG}
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
      />

      {/* Explainer script §2–§10, in order. No plans grid on this page —
          "See plans" links to the main accountant page's plans section. */}
      <IncludedAndAddons />
      <PricingGuarantee />
      <WorkVisibility />
      <SquadHubSection />
      <AccountantTeamSection />
      <SoftwareAndAi />
      <GetStartedCta />
    </>
  )
}
