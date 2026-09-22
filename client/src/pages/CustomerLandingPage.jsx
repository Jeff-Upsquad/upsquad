"use client"

import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import WorkModeNav, { scrollToWorkMode } from '../components/landing/WorkModeNav'
import WorkModeOverview from '../components/landing/WorkModeOverview'
import SignupCta from '../components/SignupCta'
import WhatsAppIcon from '../components/WhatsAppIcon'
import PlansSection from '../components/creative/PlansSection'
import IncludedHighlights from '../components/pricing/IncludedHighlights'
import WorkingHours from '../components/pricing/WorkingHours'
import ImportantNote from '../components/pricing/ImportantNote'
import { BenefitIcon } from '../components/pricing/icons'
import { useLanguageGate } from '../lib/useLanguageGate'
import { fetchLandingPage } from '../lib/landingPageApi'
import { getFallback } from '../data/landingPageFallbacks'
import { useLandingScrollReset, scrollToSection } from '../lib/useLandingScrollReset'
import { squads } from '../data/squads'
import { availabilityPlans, designServices, videoServices, benefits } from '../data/pricing'
import { bookkeepingServices, complianceServices } from '../data/accountant'

const LANDING_SLUG = 'customer-general'
const WA_NUMBER = '919995266385'
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

/* ── Data: Subscription How it Works ───────────────────── */
const subscriptionSteps = [
  {
    number: '01',
    title: 'Choose a plan & budget',
    description: 'Pick your squad, talent type, and availability tier — then name the flat monthly budget that works for you.',
  },
  {
    number: '02',
    title: 'Meet your squad & manager',
    description: 'We match you with vetted specialists, plus a dedicated Squad Manager who assists with oversight, QA, and support.',
  },
  {
    number: '03',
    title: 'Hand over & relax',
    description: 'Send requests anytime. Your squad delivers steady, high-quality work every week — pause or cancel anytime.',
  },
]

/* ── Data: Assignments ─────────────────────────────────── */
const assignmentSteps = [
  { number: '1', title: 'Send your brief', description: 'Describe the task — scope, references, brand files, and deadline.' },
  { number: '2', title: 'Get a fixed quote', description: 'We confirm a flat fee and clear delivery date upfront. No hourly billing.' },
  { number: '3', title: 'Vetted execution', description: 'A vetted specialist handles it end to end with Squad Manager support.' },
  { number: '4', title: 'Review & receive', description: 'Check the delivery, request revisions until satisfied, and sign off.' },
]

const sampleAssignments = [
  { squad: 'Creative', title: 'Set of 5 Instagram posts', fee: '₹1,500', timeline: '3 days', tag: 'Design' },
  { squad: 'Creative', title: '30-sec product promo video', fee: '₹2,500', timeline: '4 days', tag: 'Video' },
  { squad: 'Creative', title: 'Logo + brand mark package', fee: '₹4,000', timeline: '5 days', tag: 'Branding' },
  { squad: 'Creative', title: 'YouTube long-form edit (10 min)', fee: '₹3,000', timeline: '3 days', tag: 'Video' },
  { squad: 'Creative', title: 'Festival poster & banner pack', fee: '₹2,000', timeline: '2 days', tag: 'Design' },
  { squad: 'Creative', title: 'Instagram reels (pack of 3)', fee: '₹3,500', timeline: '5 days', tag: 'Reels' },
  { squad: 'Finance', title: 'Monthly GST return (GSTR-1 & 3B)', fee: '₹1,500', timeline: '3 days', tag: 'Tax' },
  { squad: 'Finance', title: '3 months bookkeeping clean-up', fee: '₹6,000', timeline: '6 days', tag: 'Books' },
  { squad: 'Finance', title: 'Quarterly TDS return filing', fee: '₹2,000', timeline: '3 days', tag: 'Compliance' },
  { squad: 'Finance', title: 'Bank reconciliation (1 full year)', fee: '₹4,000', timeline: '5 days', tag: 'Books' },
  { squad: 'Finance', title: 'Small business ITR preparation & filing', fee: '₹2,500', timeline: '4 days', tag: 'Income Tax' },
  { squad: 'Finance', title: 'Year-end financial statements & balance sheet', fee: '₹5,000', timeline: '7 days', tag: 'Reporting' },
]

const assignmentPerks = [
  'No monthly commitment — order only when you need it',
  'Flat price agreed before any work starts',
  'A clear delivery date you can plan around',
  'Vetted specialists, with delivery managed for you',
  'Revisions included until you sign off',
  'Pay per project — nothing recurring',
]

/* ── Data: Jobs & Direct Hiring ────────────────────────── */
const hiringSteps = [
  { n: '1', t: 'Share your requirements', d: 'Role, tech stack, experience level, and budget.' },
  { n: '2', t: 'We shortlist in 48-72 hrs', d: 'Curated, vetted candidates matched to your brief.' },
  { n: '3', t: 'You interview & onboard', d: 'Direct interviews, assessment, and hiring onto your payroll.' },
  { n: '4', t: 'Replacement guarantee', d: 'Free replacement within the guarantee window if not the right fit.' },
]

const HIRING_PRICING = {
  basic: { amount: '₹3,000', unit: 'one-time · per hire' },
  plus: { amount: '₹5,000', unit: 'one-time · per hire' },
  personal: { amount: '₹10,000', unit: 'one month · up to 5 hires' },
}

const hiringFeatures = [
  { label: 'Curated shortlist matched to your brief', basic: true, plus: true },
  { label: 'You interview and select your hires', basic: true, plus: true },
  { label: 'Self-managed onboarding into your team', basic: true, plus: true },
  { label: 'Priority shortlisting from our talent pool', basic: false, plus: true },
  { label: 'Replacement guarantee', basic: '1 month', plus: '3 months', personal: '1 month' },
  { label: 'Free replacement within guarantee window', basic: true, plus: true },
]

function TableCheck({ accent }) {
  return (
    <span
      className={`inline-flex w-5 h-5 shrink-0 rounded-full border border-text-primary items-center justify-center ${
        accent ? 'bg-brand-accent text-black' : 'bg-brand-purple text-white'
      }`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function TableCell({ v, accent }) {
  if (v === true) return <TableCheck accent={accent} />
  if (v === false)
    return <span className="inline-block w-3.5 h-[2px] rounded bg-text-muted/60" aria-label="Not included" />
  return <span className="text-xs sm:text-sm font-bold text-text-primary whitespace-nowrap">{v}</span>
}

export default function CustomerLandingPage() {
  useLandingScrollReset()

  const fallback = getFallback(LANDING_SLUG) || {
    slug: LANDING_SLUG,
    heroTitle: 'Every squad your brand needs — on subscription.',
    heroDescription:
      'Design, video, finance, marketing, and tech. Subscribe to a dedicated squad, order fixed-fee assignments, or hire vetted talent in-house.',
    defaultLanguageCode: 'en',
    languages: [],
  }

  const [content, setContent] = useState(fallback)
  const [activeSquadTab, setActiveSquadTab] = useState('content-creation')
  const [assignmentFilter, setAssignmentFilter] = useState('All')

  useEffect(() => {
    let alive = true
    fetchLandingPage(LANDING_SLUG).then((data) => {
      if (alive && data) setContent((prev) => ({ ...prev, ...data }))
    })
    return () => {
      alive = false
    }
  }, [])

  const {
    selected,
    selectedCode,
    gateOpen,
    setGateOpen,
    pendingPlay,
    requestPlay,
    onSelectLanguage,
    hasLangChooser,
  } = useLanguageGate({
    slug: LANDING_SLUG,
    languages: content.languages || [],
    defaultLanguageCode: content.defaultLanguageCode || 'en',
  })

  const previewUrl = selected?.videoUrl || (content.languages || []).find((l) => l.videoUrl)?.videoUrl

  const filteredAssignments =
    assignmentFilter === 'All'
      ? sampleAssignments
      : sampleAssignments.filter((a) => a.squad === assignmentFilter)

  return (
    <div className="pt-20 pb-0 bg-surface-primary">
      {/* ── 1. Hero Section ─────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          {/* Left: Headline & Copy */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-primary bg-[#FFFF99]/50 border border-black/15 px-3 py-1.5 rounded-full mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                All-in-One Squad Platform &middot; Brands &amp; Businesses
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-[-0.03em] text-text-primary">
                Every squad your brand needs —{' '}
                <span
                  className="bg-no-repeat box-decoration-clone"
                  style={{
                    backgroundImage:
                      'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                  }}
                >
                  on subscription.
                </span>
                <br />
                <span className="italic font-bold text-text-secondary text-3xl sm:text-4xl">
                  Or order per task &amp; hire directly.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
                {content.heroDescription ||
                  'One flat fee for a dedicated squad — content, video, accounts, compliance, marketing, and tech. Send unlimited requests, get steady delivery, or hire vetted professionals onto your own team.'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToWorkMode('subscription')}
                  className="btn-gradient font-semibold text-sm px-6 py-3.5"
                >
                  Explore subscriptions &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => scrollToWorkMode('assignments')}
                  className="btn-secondary font-semibold text-sm px-5 py-3.5"
                >
                  One-off assignments
                </button>
                <a
                  href={waLink("Hi UpSquad, I'm interested in subscribing to a squad or hiring talent.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-3.5 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Flat monthly pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated Squad Manager
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Pause or cancel anytime
                </span>
              </div>

              {hasLangChooser && (
                <button
                  type="button"
                  onClick={() => setGateOpen(true)}
                  aria-label="Change language"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-[rgba(0,0,0,0.08)] rounded-full px-3 py-1.5 hover:border-gray-300"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
                  </svg>
                  Language: {selected?.name || 'English'}
                </button>
              )}
            </ScrollReveal>
          </div>

          {/* Right: Media Player */}
          <ScrollReveal delay={0.15}>
            <div className="relative">
              <HeroMedia
                videoUrl={selected?.videoUrl || previewUrl}
                previewUrl={previewUrl}
                autoPlay={pendingPlay}
                onRequestGate={requestPlay}
                className="w-full aspect-video rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden bg-black"
              />
              <p className="text-center text-xs text-text-muted mt-3">
                Watch: How UpSquad provides on-demand squads for modern brands
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Language gate modal if multiple languages configured */}
      {hasLangChooser && (
        <LanguageGate
          open={gateOpen}
          onClose={() => setGateOpen(false)}
          languages={content.languages || []}
          selectedCode={selectedCode}
          onSelect={onSelectLanguage}
        />
      )}

      {/* ── 2. Sticky Mode Navigation & Overview ────────── */}
      <WorkModeNav />
      <WorkModeOverview variant="customers" />

      {/* ── 3. Section: Subscription (#subscription) ───── */}
      <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Mode 01 &middot; Subscription
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Six squads. One subscription platform.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Instead of hiring and managing individuals one by one, subscribe to a dedicated squad.
              Choose any of our 6 squads below to explore services, capabilities, and plans.
            </p>

            {/* Squad Tabs — 6 distinct squads */}
            <div className="mt-8 flex flex-wrap gap-2 pb-2 border-b border-black/[0.08]">
              {[
                { id: 'content-creation', name: 'Content Creation', badge: 'Live', emoji: '🎬' },
                { id: 'accounts-finance', name: 'Accounts & Finance', badge: 'Live', emoji: '📊' },
                { id: 'marketing', name: 'Marketing', badge: 'Beta', emoji: '📣' },
                { id: 'tech', name: 'Tech', badge: 'Pilot', emoji: '💻' },
                { id: 'legal', name: 'Legal', badge: 'Soon', emoji: '⚖️' },
                { id: 'hiring-hr', name: 'Hiring & HR', badge: 'Soon', emoji: '🤝' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSquadTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeSquadTab === tab.id
                      ? 'bg-[#0A0A0A] text-white shadow-md'
                      : 'bg-white text-text-secondary hover:text-text-primary border border-black/[0.06]'
                  }`}
                >
                  <span className="text-base leading-none">{tab.emoji}</span>
                  <span>{tab.name}</span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${
                      activeSquadTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-black/[0.05] text-text-muted'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Dynamic Tab Content for all 6 squads */}
          <div className="mt-8">
            {/* 1. SQUAD: CONTENT CREATION */}
            {activeSquadTab === 'content-creation' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live Subscription
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Content Creation: Graphic Designers &amp; Video Editors
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                        Unlimited static visuals, social media branding, presentations, UI design, reels, and video edits delivered one request at a time.
                      </p>
                    </div>
                    <Link
                      href="/customers/designers-and-video-editors/"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/90 transition-colors shrink-0"
                    >
                      View dedicated page &rarr;
                    </Link>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-mono-tech text-xs uppercase tracking-wider text-text-muted mb-3">
                      Included Design &amp; Video Capabilities
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[...designServices, ...videoServices].slice(0, 9).map((srv) => (
                        <div key={srv.title} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                          <div className="text-sm font-semibold text-text-primary">{srv.title}</div>
                          <div className="text-xs text-text-secondary mt-1 line-clamp-2">{srv.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/[0.06]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-mono-tech text-xs uppercase tracking-wider text-text-muted">
                        Availability Plans (Shared &amp; Dedicated)
                      </h4>
                      <button
                        type="button"
                        onClick={() => scrollToSection('subscription-plans')}
                        className="text-xs font-semibold text-brand-purple hover:underline"
                      >
                        Explore detailed calculator &darr;
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {availabilityPlans.map((p) => (
                        <div
                          key={p.id}
                          className={`p-3.5 rounded-xl border ${
                            p.highlighted
                              ? 'bg-amber-50/50 border-amber-200'
                              : 'bg-white border-black/[0.06]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-heading font-bold text-sm text-text-primary">{p.name}</span>
                            <span className="text-[10px] font-mono bg-black/[0.05] px-1.5 py-0.5 rounded">{p.availability}</span>
                          </div>
                          <div className="text-xs font-semibold text-text-primary">{p.hoursPerDay} / day</div>
                          <div className="text-[11px] text-text-muted mt-0.5">{p.hoursPerMonth}</div>
                          <div className="text-xs text-text-secondary mt-2 border-t border-black/[0.04] pt-2">{p.bestFor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 2. SQUAD: ACCOUNTS & FINANCE */}
            {activeSquadTab === 'accounts-finance' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live Subscription
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Accounts &amp; Finance: Qualified Accountants &amp; Tax Specialists
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                        Clean books, on-time GST and TDS filings, statutory payroll processing, bank reconciliation, and insightful MIS reports on flat monthly retainers.
                      </p>
                    </div>
                    <Link
                      href="/customers/accountant-subscription/"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/90 transition-colors shrink-0"
                    >
                      View dedicated page &rarr;
                    </Link>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-mono-tech text-xs uppercase tracking-wider text-text-muted mb-3">
                      Included Bookkeeping &amp; Compliance Services
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[...bookkeepingServices, ...complianceServices].map((srv) => (
                        <div key={srv.title} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                          <div className="text-sm font-semibold text-text-primary">{srv.title}</div>
                          <div className="text-xs text-text-secondary mt-1 leading-relaxed">{srv.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 3. SQUAD: MARKETING */}
            {activeSquadTab === 'marketing' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
                        Beta Access
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Marketing Squad: Performance, SEO &amp; Growth
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-xl">
                        End-to-end growth support from ad campaign managers, SEO specialists, digital marketing leads, and creator outreach coordinators.
                      </p>
                    </div>
                    <a
                      href={waLink("Hi UpSquad, I'd like early access to the Marketing Squad.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-4 py-2"
                    >
                      Join waitlist
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                    {squads.find((s) => s.id === 'marketing')?.products.map((p) => (
                      <div key={p.name} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <span>{p.emoji}</span>
                          <span>{p.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 4. SQUAD: TECH */}
            {activeSquadTab === 'tech' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full mb-2">
                        Pilot Run
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Tech Squad: Web, Apps &amp; Workflows
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-xl">
                        Frontend &amp; backend engineers, website builders, and automation specialists to build and maintain your digital products.
                      </p>
                    </div>
                    <a
                      href={waLink("Hi UpSquad, I'm interested in the Tech Squad pilot.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-4 py-2"
                    >
                      Request invite
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {squads.find((s) => s.id === 'tech')?.products.map((p) => (
                      <div key={p.name} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <span>{p.emoji}</span>
                          <span>{p.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 5. SQUAD: LEGAL */}
            {activeSquadTab === 'legal' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-2">
                        Launching Soon
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Legal Squad: Contracts, IP &amp; Compliance
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-xl">
                        Contract drafting, IP protection, regulatory compliance, and business formation — dependable legal backing without the hourly rates.
                      </p>
                    </div>
                    <a
                      href={waLink("Hi UpSquad, I'd like early access to the Legal Squad.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-4 py-2"
                    >
                      Join waitlist
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {squads.find((s) => s.id === 'legal')?.products.map((p) => (
                      <div key={p.name} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <span>{p.emoji}</span>
                          <span>{p.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* 6. SQUAD: HIRING & HR */}
            {activeSquadTab === 'hiring-hr' && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                    <div>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full mb-2">
                        Launching Soon
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-text-primary">
                        Hiring &amp; HR Squad: Talent Acquisition &amp; People Ops
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 max-w-xl">
                        End-to-end talent sourcing, team building, candidate screening, and HR policy workflows tailored for high-growth brands.
                      </p>
                    </div>
                    <a
                      href={waLink("Hi UpSquad, I'd like early access to the Hiring & HR Squad.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs px-4 py-2"
                    >
                      Join waitlist
                    </a>
                  </div>

                  <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
                    {squads.find((s) => s.id === 'hiring-hr')?.products.map((p) => (
                      <div key={p.name} className="p-3.5 rounded-xl bg-surface-secondary/70 border border-black/[0.04]">
                        <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                          <span>{p.emoji}</span>
                          <span>{p.name}</span>
                        </div>
                        <div className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* How a Subscription Works (3 Steps) */}
          <div className="mt-14">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-5">
              How a subscription works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionSteps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                      {step.number}
                    </span>
                    <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* What's Included in Every Subscription */}
          <div className="mt-14">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                What&rsquo;s included in every subscription
              </h3>
              <p className="text-sm text-text-secondary mb-8">
                Everything your brand needs to stay consistent — talent quality, dedicated management, and complete flexibility.
              </p>
            </ScrollReveal>
            <IncludedHighlights items={benefits.filter((b) => b.featured)} />
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-7 mt-8">
              {benefits.filter((b) => !b.featured).map((b, i) => (
                <ScrollReveal key={b.title} delay={(i % 2) * 0.08}>
                  <div className="flex gap-3.5">
                    <div className="flex-shrink-0 w-9 h-9 bg-brand-purple/15 rounded-lg flex items-center justify-center text-text-primary">
                      <BenefitIcon type={b.icon} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{b.title}</h4>
                      <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{b.desc}</p>
                      {b.note && (
                        <p className="text-xs text-brand-orange font-semibold mt-1.5">{b.note}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans & Availability Section */}
      <PlansSection variant="creative" />

      {/* Detailed Service Catalog, Hours & Fit */}
      <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">

          {/* Working Hours & Commitments */}
          <ScrollReveal>
            <WorkingHours />
          </ScrollReveal>

          {/* Important Note for New Clients */}
          <ScrollReveal>
            <ImportantNote />
          </ScrollReveal>

          {/* Tailored Custom Subscription Box */}
          <ScrollReveal>
            <div
              id="build"
              className="mt-8 rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Tailored to you
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Build your own custom subscription
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us the exact talent you need, your target hours, and a few details — we&rsquo;ll assemble
                  a dedicated squad tailored to your brand.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link href="/pricing" className="btn-secondary text-sm font-semibold px-6 py-3.5">
                  Browse products
                </Link>
                <SignupCta className="btn-gradient text-sm font-semibold px-7 py-3.5">
                  Sign up &rarr;
                </SignupCta>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. Section: One-Off Assignments (#assignments) ─ */}
      <section id="assignments" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          {/* Intro */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Mode 02 &middot; Assignments
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Got a one-off project? Get it done — fixed fee, fixed deadline.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Not ready for a monthly subscription and don’t need a full-time hire — you just have one
              specific thing that needs doing. Send us the brief and we’ll come back with a{' '}
              <span className="font-semibold text-text-primary">flat fee</span> and a{' '}
              <span className="font-semibold text-text-primary">clear delivery date</span>. A vetted
              specialist handles it, you review, and you pay only for that one piece of work.
            </p>
          </ScrollReveal>

          {/* How Assignments Work (4 steps) */}
          <div className="mt-12">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How an assignment works</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {assignmentSteps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                      {step.number}
                    </span>
                    <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Sample Assignments Matrix */}
      <section className="py-20 px-5 sm:px-8 bg-white border-t border-b border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Fixed fee &middot; Fixed timeline</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">What an assignment looks like</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Here’s the kind of work businesses order one-off, with indicative pricing. You’ll get an exact fee and delivery date before anything starts.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div className="flex gap-1.5 bg-surface-secondary p-1 rounded-lg border border-black/[0.08]">
                {['All', 'Creative', 'Finance'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAssignmentFilter(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      assignmentFilter === f
                        ? 'bg-[#0A0A0A] text-white shadow-xs'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <span className="text-xs text-text-muted">
                Showing {filteredAssignments.length} sample assignments
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssignments.map((a) => (
                <div
                  key={a.title}
                  className="bg-surface-secondary rounded-xl p-6 border border-[rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          a.squad === 'Creative'
                            ? 'bg-brand-purple/20 border-[rgba(0,0,0,0.08)] text-text-primary'
                            : 'bg-brand-blue/20 border-[rgba(0,0,0,0.08)] text-text-primary'
                        }`}
                      >
                        {a.squad} &middot; {a.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted font-mono">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {a.timeline}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-4 leading-snug">{a.title}</h3>
                  </div>

                  <div className="pt-3 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider block">From</span>
                      <span className="font-heading text-xl font-extrabold text-text-primary font-mono">{a.fee}</span>
                    </div>
                    <a
                      href={waLink(`Hi UpSquad, I'd like a quote for the assignment: "${a.title}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black text-white hover:bg-black/80 transition-colors"
                    >
                      Order task &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Indicative pricing shown for illustration. Your final quote depends on scope and turnaround.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Order One-Off / When an Assignment Makes Sense */}
      <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Why order one-off</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">When an assignment makes sense</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
              {assignmentPerks.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="inline-flex w-6 h-6 rounded-full bg-brand-purple text-white border border-text-primary items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm text-text-secondary leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing Assignment CTA */}
      <section className="py-16 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Have something in mind?
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Send your brief, get a fixed quote
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us what you need and we’ll reply with a flat fee and guaranteed delivery date — same-day,
                  10 AM–6 PM IST, Monday to Friday.
                </p>
              </div>
              <a
                href={waLink("Hi UpSquad, I'd like to submit a brief for a one-off assignment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0 inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Submit brief &rarr;
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. Section: Jobs / In-House Direct Hiring (#hire) ─ */}
      <section id="hire" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          {/* Heading */}
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Mode 03 &middot; Jobs / Direct Hire
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Post a job and hire vetted talent — with a{' '}
              <span className="relative inline-block">
                <span className="relative z-10">replacement guarantee</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-accent -z-0 rounded-sm" aria-hidden="true" />
              </span>
              .
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              A job here means hiring someone onto <span className="font-semibold text-text-primary">your</span>{' '}
              payroll — not contracting through us month to month. Share the role, we shortlist vetted
              specialists matched to your brief, you interview and hire who you want, and if
              someone isn’t the right fit we shortlist a replacement.
            </p>
          </ScrollReveal>

          {/* How Hiring Works (4 steps) */}
          <ScrollReveal>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {hiringSteps.map((s) => (
                <div
                  key={s.n}
                  className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-5"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent text-black text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                    {s.n}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-text-primary mt-3">{s.t}</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Hiring Packages Comparison Table (Basic vs Plus) */}
          <ScrollReveal>
            <div className="mt-14 overflow-hidden rounded-2xl border-[1.5px] border-black shadow-brutal bg-white">
              <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
                {/* Header row */}
                <div className="p-4 sm:p-6 flex flex-col justify-end">
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                    Compare Packages
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary mt-1 leading-tight">
                    What you get
                  </h3>
                </div>

                <div className="px-2 sm:px-6 pt-7 sm:pt-8 pb-4 sm:pb-6 border-l border-[rgba(0,0,0,0.06)] text-center">
                  <div className="font-heading text-base sm:text-lg font-extrabold text-text-primary">Basic</div>
                  <div className="mt-2 font-heading text-lg sm:text-3xl font-extrabold text-text-primary leading-none whitespace-nowrap">
                    {HIRING_PRICING.basic.amount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-text-muted mt-1">{HIRING_PRICING.basic.unit}</div>
                </div>

                <div className="relative px-2 sm:px-6 pt-7 sm:pt-8 pb-4 sm:pb-6 border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 text-center">
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 bg-brand-accent text-black border border-text-primary shadow-brutal-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-normal sm:tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap">
                    <span className="sm:hidden">Popular</span>
                    <span className="hidden sm:inline">Most popular</span>
                  </span>
                  <div className="font-heading text-base sm:text-lg font-extrabold text-text-primary">Plus</div>
                  <div className="mt-2 font-heading text-lg sm:text-3xl font-extrabold text-text-primary leading-none whitespace-nowrap">
                    {HIRING_PRICING.plus.amount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-text-muted mt-1">{HIRING_PRICING.plus.unit}</div>
                </div>

                {/* Feature rows */}
                {hiringFeatures.map((f) => (
                  <Fragment key={f.label}>
                    <div className="px-4 sm:px-6 py-3.5 border-t border-[rgba(0,0,0,0.06)] text-xs sm:text-sm text-text-secondary font-medium flex items-center">
                      {f.label}
                    </div>
                    <div className="px-2 sm:px-6 py-3.5 border-t border-l border-[rgba(0,0,0,0.06)] flex items-center justify-center text-center">
                      <TableCell v={f.basic} accent />
                    </div>
                    <div className="px-2 sm:px-6 py-3.5 border-t border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 flex items-center justify-center text-center">
                      <TableCell v={f.plus} accent />
                    </div>
                  </Fragment>
                ))}

                {/* CTA row */}
                <div className="flex px-2 sm:px-6 py-4 sm:py-5 border-t border-[rgba(0,0,0,0.06)] items-center">
                  <span className="hidden sm:inline text-xs text-text-muted">Onboard directly into your team.</span>
                </div>
                <div className="px-2 sm:px-6 py-4 sm:py-5 border-t border-l border-[rgba(0,0,0,0.06)] flex items-center justify-center">
                  <a
                    href={waLink('Hi UpSquad, I want to choose the Basic hiring package.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2.5"
                  >
                    <WhatsAppIcon className="hidden sm:block w-4 h-4" />
                    Choose<span className="hidden sm:inline">&nbsp;Basic</span>
                  </a>
                </div>
                <div className="px-2 sm:px-6 py-4 sm:py-5 border-t border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 flex items-center justify-center">
                  <a
                    href={waLink('Hi UpSquad, I want to choose the Plus hiring package.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient w-full inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2.5"
                  >
                    <WhatsAppIcon className="hidden sm:block w-4 h-4" />
                    Choose<span className="hidden sm:inline">&nbsp;Plus</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <p className="mt-3 text-xs text-text-muted">
            Final fee depends on the role and seniority you’re hiring for. Replacement guarantee runs
            one month on Basic and three months on Plus.
          </p>

          {/* Personal Recruiting Manager Plan */}
          <ScrollReveal>
            <div className="mt-8 overflow-hidden rounded-2xl border-[1.5px] border-black shadow-brutal bg-white">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-8 bg-brand-accent/10 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.1)]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center bg-brand-accent text-black border border-text-primary shadow-brutal-sm text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      Recruiting Manager
                    </span>
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                      Hire up to 5
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-[-0.02em] mt-4">
                    Personal Recruiting Manager
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
                    For businesses hiring several people at once. Basic and Plus each cover a single
                    hire — Personal gives you a dedicated recruiting manager for one month to fill up
                    to five roles, with priority shortlisting and a replacement guarantee.
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <div className="font-heading text-4xl font-extrabold text-text-primary leading-none whitespace-nowrap">
                      {HIRING_PRICING.personal.amount}
                    </div>
                    <div className="text-[11px] text-text-muted pb-1">{HIRING_PRICING.personal.unit}</div>
                  </div>

                  <a
                    href={waLink('Hi UpSquad, I want to choose the Personal Recruiting Manager package.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Choose Personal
                  </a>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary mb-4">
                    What&rsquo;s included
                  </div>
                  <ul className="flex flex-col gap-3">
                    {hiringFeatures.map((f) => {
                      const val = f.personal ?? f.plus
                      return (
                        <li key={f.label} className="flex items-start gap-2.5">
                          <TableCheck accent />
                          <span className="text-sm text-text-secondary leading-snug">
                            {f.label}
                            {typeof val === 'string' && (
                              <span className="font-semibold text-text-primary"> — {val}</span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Direct Hire CTA Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={waLink("Hi UpSquad, I want to hire vetted talent in-house on my payroll.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-sm font-semibold px-6 py-3"
            >
              Submit a hiring brief &rarr;
            </a>
            <Link href="/contact" className="btn-secondary text-sm font-semibold px-5 py-3">
              Talk with our talent team
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Section: Full Services Directory (#services) ─ */}
      <section id="services" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Services Directory
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
              Explore all 6 squads and products.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Every service UpSquad offers across design, media, finance, growth marketing, tech, and legal operations.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {squads.map((squad) => (
                <div
                  key={squad.id}
                  className="rounded-2xl p-6 bg-white border border-black/[0.06] flex flex-col justify-between hover:border-black/20 transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{squad.emoji}</span>
                      {squad.badge && (
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-black/5 text-text-muted px-2 py-0.5 rounded-full border border-black/[0.05]">
                          {squad.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-text-primary">{squad.name}</h3>
                    <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{squad.description}</p>

                    <div className="mt-4 pt-4 border-t border-black/[0.06]">
                      <span className="text-[11px] font-mono-tech uppercase tracking-wider text-text-muted block mb-2">
                        Squad Talents &amp; Roles
                      </span>
                      <ul className="space-y-1.5">
                        {squad.products.map((p) => (
                          <li key={p.name} className="text-xs flex items-center justify-between text-text-primary">
                            <span className="flex items-center gap-1.5">
                              <span>{p.emoji}</span>
                              <span>{p.name}</span>
                            </span>
                            {p.href ? (
                              <Link href={p.href} className="text-[11px] font-semibold text-emerald-600 hover:underline">
                                Live &rarr;
                              </Link>
                            ) : (
                              <span className="text-[10px] font-mono text-text-muted">{p.status}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/[0.06]">
                    <Link
                      href="/pricing"
                      className="text-xs font-semibold text-text-primary hover:underline flex items-center justify-between"
                    >
                      <span>Custom plan builder</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. Bottom Call-to-Action ─────────────────────── */}
      <section className="py-16 px-5 sm:px-8 bg-[#0A0A0A] text-white">
        <div className="max-w-[1160px] mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1.5 rounded-full mb-6">
              Ready to work with UpSquad?
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
              Get your dedicated squad up and running this week.
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Choose subscription for steady output, order fixed-fee assignments, or hire in-house with our 60-day replacement guarantee.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <SignupCta className="bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-neutral-100 transition-colors shadow-lg">
                Sign Up Now &rarr;
              </SignupCta>
              <a
                href={waLink("Hi UpSquad, I'm ready to get started with a squad.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-medium text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Talk on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
