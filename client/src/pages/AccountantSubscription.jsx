"use client"
import { useEffect, useState } from 'react'
import AccountantHero from '../components/accountant/AccountantHero'
import SubscriptionDetails from '../components/accountant/SubscriptionDetails'
import AssignmentOptions from '../components/accountant/AssignmentOptions'
import HiringOptions from '../components/accountant/HiringOptions'
import WorkModeNav, { scrollToWorkMode } from '../components/landing/WorkModeNav'
import WorkModeOverview from '../components/landing/WorkModeOverview'
import { fetchLandingPage } from '../lib/landingPageApi'

// Admin-managed landing page whose per-language explainer videos feed the hero.
// Content is edited under this slug in the admin (+ /api/v1/landing-pages/
// accountant-subscription); videos are uploaded there, not hardcoded.
const LANDING_SLUG = 'accountant-subscription'

export default function AccountantSubscription() {
  const [content, setContent] = useState({ languages: [], defaultLanguageCode: 'en' })

  useEffect(() => {
    let alive = true
    fetchLandingPage(LANDING_SLUG).then((data) => {
      if (alive && data) setContent((prev) => ({ ...prev, ...data }))
    })
    return () => { alive = false }
  }, [])

  // Hero CTAs jump to the matching full-length section (no tab swap).
  const goToSection = (id) => scrollToWorkMode(id)

  return (
    <>
      <AccountantHero
        slug={LANDING_SLUG}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
        onSelectTab={goToSection}
      />

      {/* Sticky jump-nav + plain-language overview of the three modes */}
      <WorkModeNav />
      <WorkModeOverview variant="accountant" />

      {/* Full-length sections stacked so visitors can read everything */}
      <SubscriptionDetails />
      <AssignmentOptions />
      <HiringOptions />
    </>
  )
}
