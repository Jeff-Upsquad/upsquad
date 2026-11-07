"use client"
import { useEffect, useState } from 'react'
import ExplainerHero from '../components/accountant/ExplainerHero'
import GetStartedCta from '../components/accountant/GetStartedCta'
import {
  ServiceOptions,
  HowItWorks,
  SquadHubProcess,
  PlanPipelines,
  PlanPricing,
} from '../components/creative-explainer/ExplainerSections'
import { getFallback } from '../data/landingPageFallbacks'
import {
  designerEditorWaLink,
  getStartedSteps,
  processSteps,
} from '../data/designerEditorExplainer'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'

// Hero copy and per-language videos are admin-managed under this slug. There is
// deliberately no video fallback: the get-started videos pitch the availability
// plans, which differ from the fixed plans on this page. Until a video is
// uploaded, the hero shows the process summary below.
const LANDING_SLUG = 'designer-editor-subscription-explainer'

function ProcessSummary() {
  return (
    <div className="rounded-2xl border-[1.5px] border-black bg-[#0A0A0A] text-white shadow-brutal p-7 sm:p-8">
      <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/50">Every task, in SquadHub</p>
      <ol className="mt-5 space-y-3.5">
        {processSteps.map((step, i) => (
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

  useEffect(() => {
    let alive = true
    fetchLandingPage(LANDING_SLUG).then((data) => {
      if (alive && data) setContent({ ...fallback, ...data })
    })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ExplainerHero
        slug={LANDING_SLUG}
        badge="Designer & Video Editor Subscription"
        heroTitle={content.heroTitle}
        heroDescription={content.heroDescription}
        languages={content.languages}
        defaultLanguageCode={content.defaultLanguageCode}
        waHref={designerEditorWaLink()}
        footnote="Monthly subscription · Unlimited requests and revisions"
        noVideoContent={<ProcessSummary />}
      />

      {/* Explainer script §1–§5, in order; §6 is the closing band. */}
      <ServiceOptions />
      <HowItWorks />
      <SquadHubProcess />
      <PlanPipelines />
      <PlanPricing />
      <GetStartedCta
        heading="Whether you need occasional creatives, regular video edits, or a personal creative resource, UpSquad has a plan for your business."
        subheading="Questions about plans, pricing, or which subscription suits your business? Our team will help you choose the right plan."
        steps={getStartedSteps}
        waHref={designerEditorWaLink()}
      />
    </>
  )
}
