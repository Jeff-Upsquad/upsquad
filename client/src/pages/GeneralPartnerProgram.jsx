"use client"
import { useEffect, useRef, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import PartnerProgramTab from '../components/general-partner/PartnerProgramTab'
import FreelanceTab from '../components/general-partner/FreelanceTab'
import JobsTab from '../components/general-partner/JobsTab'
import PartnerSignupLink from '../components/PartnerSignupLink'
import { useLanguageGate } from '../lib/useLanguageGate'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'

const LP_SLUG = 'partner-program'
const CTA_SLUG = 'general'

const TABS = [
  {
    id: 'partner',
    label: 'Partner Program',
    tagline: 'Ongoing & flexible work',
    desc: 'Subscriptions with assigned clients, plus one-time assignments.',
    meta: '2 options inside',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'jobs',
    label: 'Jobs',
    tagline: 'Full-time & part-time roles',
    desc: 'Open roles from companies and brands hiring through UpSquad.',
    meta: 'Apply directly',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const SUB_TABS = [
  {
    id: 'subscription',
    label: 'Subscription',
    hint: 'Steady · monthly pay',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'assignments',
    label: 'Assignments',
    hint: 'Flexible · per project',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const heroCopy = {
  partner_subscription: {
    badge: 'Now accepting partners',
    desc: 'Partner with UpSquad and focus only on what you do best — we handle the sales, marketing, client support, and payments while you work with assigned clients.',
  },
  partner_assignments: {
    badge: 'New · One-time assignments',
    desc: 'Pick up standalone assignments with a fixed payment and a clear timeline. Take what fits your schedule, deliver, and get paid.',
  },
  jobs: {
    badge: 'New · Full-time & part-time roles',
    desc: 'Browse full-time and part-time job openings from companies and brands hiring through UpSquad. Find a role that matches your preference and apply directly.',
  },
}

/* ── component ────────────────────────────────────────── */

export default function PartnerProgram() {
  const [languages, setLanguages] = useState([])
  const [defaultLanguageCode, setDefaultLanguageCode] = useState('en')
  const [tab, setTab] = useState('partner')
  const [subTab, setSubTab] = useState('subscription')
  const tabsRef = useRef(null)
  const signupUrl = usePartnerSignupUrl(CTA_SLUG)
  const {
    selected,
    selectedCode,
    gateOpen,
    setGateOpen,
    pendingPlay,
    requestPlay,
    onSelectLanguage,
  } = useLanguageGate({ slug: LP_SLUG, languages, defaultLanguageCode })

  useEffect(() => {
    fetch(`/api/v1/landing-pages/${LP_SLUG}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        setLanguages(d.languages || [])
        if (d.defaultLanguageCode) setDefaultLanguageCode(d.defaultLanguageCode)
      })
      .catch(() => {})
  }, [])

  // After a tab change commits, align the sticky tab bar just under the fixed
  // nav so the chosen panel shows from its top. This runs in an effect (after
  // the panel swaps) rather than the click handler, because scrolling before the
  // swap lets the swap abort the smooth scroll and leave you mid-panel. The bar's
  // natural position is read via a brief `position` toggle — getBoundingClientRect
  // and offsetTop both report the *stuck* position once it is pinned.
  // Only scroll in response to a user tab switch (goToTab sets the flag), never
  // on mount — the flag also survives React StrictMode's double-invoked mount
  // effect, which a plain "first render" ref would not.
  const pendingScroll = useRef(false)
  useEffect(() => {
    if (!pendingScroll.current) return
    pendingScroll.current = false
    const el = tabsRef.current
    if (!el) return
    const saved = el.style.position
    el.style.position = 'static'
    const top = el.getBoundingClientRect().top + window.scrollY
    el.style.position = saved
    // Instant, not smooth: a smooth scroll started here gets aborted by the
    // panel swap / ScrollReveal mount, stranding you mid-panel. A jump to the
    // panel top is also the cleaner result when switching tabs.
    window.scrollTo({ top: Math.max(0, top - 56), behavior: 'instant' })
  }, [tab])

  const goToTab = (id) => {
    pendingScroll.current = true
    setTab(id)
  }

  const goToSubTab = (id) => {
    setSubTab(id)
  }

  // Legacy handler passed to the subscription panel: the old Freelance tab id
  // now maps to the Assignments subdivision under Partner Program.
  const handlePanelSwitch = (id) => {
    if (id === 'freelance' || id === 'assignments') {
      setTab('partner')
      pendingScroll.current = true
      setSubTab('assignments')
      return
    }
    goToTab(id)
  }

  const copy = tab === 'partner' ? heroCopy[`partner_${subTab}`] : heroCopy[tab]

  return (
    <div className="pt-20 pb-0">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-5 sm:px-8 bg-dot-pattern overflow-hidden">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-brand-purple/10 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              {copy.badge}
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
              <span className="text-text-primary">UpSquad Partner Program</span>
              <span className="block mt-2 text-2xl sm:text-3xl font-bold text-text-secondary">
                For{' '}
                <span
                  className="bg-no-repeat box-decoration-clone text-text-primary"
                  style={{
                    backgroundImage:
                      'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                  }}
                >
                  freelancers of every role
                </span>
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-[1.7] mb-8">
              {copy.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <PartnerSignupLink
                href={signupUrl}
                className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Sign Up Now
              </PartnerSignupLink>

              {selected && (languages || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => setGateOpen(true)}
                  aria-label="Change language"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-[rgba(0,0,0,0.08)] rounded-full px-3 py-1.5 hover:border-gray-300 bg-white"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
                  </svg>
                  Language: {selected.name}
                </button>
              )}
            </div>
          </div>
          <div className="w-full">
            <HeroMedia videoUrl={selected?.videoUrl} autoPlay={pendingPlay} onRequestGate={requestPlay} />
          </div>
        </div>

        <LanguageGate
          open={gateOpen}
          languages={languages || []}
          selectedCode={selectedCode}
          onSelect={onSelectLanguage}
          onDismiss={() => setGateOpen(false)}
        />
      </section>

      {/* ── Top-level selector: card style ────────────── */}
      <section ref={tabsRef} className="bg-white border-y border-[rgba(0,0,0,0.08)]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 pt-10 pb-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Work with UpSquad
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-2">
              Two ways to earn — pick one
            </h2>
          </div>
          {/* Mobile: compact segmented tabs with descriptions */}
          <div
            role="tablist"
            aria-label="Choose how you want to work"
            className="sm:hidden grid grid-cols-2 gap-1 p-1.5 rounded-2xl bg-surface-secondary border border-[rgba(0,0,0,0.08)] max-w-3xl mx-auto"
          >
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goToTab(t.id)}
                  className={`flex flex-col items-start gap-1 px-3 py-2.5 rounded-xl text-left transition-all duration-short border ${
                    active
                      ? 'bg-brand-accent text-black border-text-primary shadow-sm'
                      : 'text-text-secondary border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-bold">
                    <span className={active ? 'text-black' : 'text-text-muted'}>{t.icon}</span>
                    {t.label}
                  </span>
                  <span className={`text-[11px] font-normal leading-snug ${active ? 'text-black/70' : 'text-text-muted'}`}>
                    {t.desc}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Desktop: cards */}
          <div
            role="tablist"
            aria-label="Choose how you want to work"
            className="hidden sm:grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goToTab(t.id)}
                  className={`relative text-left rounded-2xl p-5 sm:p-6 border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                    active
                      ? 'border-text-primary bg-brand-accent/30 shadow-brutal'
                      : 'border-[rgba(0,0,0,0.08)] bg-white hover:border-gray-300 hover:shadow-card-hover'
                  }`}
                >
                  {active && (
                    <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 bg-text-primary text-brand-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Selected
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 border ${
                        active
                          ? 'bg-brand-accent text-black border-text-primary'
                          : 'bg-surface-secondary text-text-secondary border-[rgba(0,0,0,0.08)]'
                      }`}
                    >
                      {t.icon}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        {t.tagline}
                      </span>
                      <span className="block font-heading text-lg font-bold text-text-primary mt-0.5">
                        {t.label}
                      </span>
                      <span className="block text-sm text-text-secondary leading-relaxed mt-1">
                        {t.desc}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold mt-3 px-2.5 py-1 rounded-full border ${
                          active ? 'bg-brand-accent text-black border-text-primary' : 'bg-surface-secondary text-text-muted border-transparent'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-black' : 'bg-text-muted'}`} />
                        {t.meta}
                      </span>
                    </span>
                    <span
                      className={`mt-1 inline-flex w-5 h-5 rounded-full border-2 items-center justify-center shrink-0 ${
                        active ? 'border-text-primary bg-brand-accent text-black' : 'border-gray-300 text-transparent'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Partner Program subdivisions: short wide strip (sticky) ── */}
      {tab === 'partner' && (
        <div className="sticky top-16 z-40 border-b border-[rgba(0,0,0,0.08)] bg-white/90 backdrop-blur-md">
          <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-2.5 flex items-center gap-3">
            <span className="hidden md:block text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted shrink-0">
              Partner Program:
            </span>
            <div
              role="radiogroup"
              aria-label="Choose Partner Program type"
              className="flex-1 grid grid-cols-2 gap-1 p-1 rounded-xl bg-surface-secondary border border-[rgba(0,0,0,0.08)]"
            >
              {SUB_TABS.map((t) => {
                const active = subTab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => goToSubTab(t.id)}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-short border ${
                      active ? 'bg-brand-accent text-black border-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary border-transparent'
                    }`}
                  >
                    <span className={active ? 'text-black' : 'text-text-muted'}>{t.icon}</span>
                    {t.label}
                    <span className={`hidden lg:inline font-normal ${active ? 'text-black/60' : 'text-text-muted'}`}>
                      · {t.hint}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Active panel ────────────────────────────────── */}
      <div role="tabpanel">
        {tab === 'partner' && subTab === 'subscription' && (
          <PartnerProgramTab onSwitchTab={handlePanelSwitch} signupUrl={signupUrl} />
        )}
        {tab === 'partner' && subTab === 'assignments' && <FreelanceTab signupUrl={signupUrl} />}
        {tab === 'jobs' && <JobsTab signupUrl={signupUrl} />}
      </div>
    </div>
  )
}
