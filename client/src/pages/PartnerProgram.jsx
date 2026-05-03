"use client"
import { useEffect, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import ScrollReveal from '../components/ScrollReveal'
import { getLang, setLang } from '../lib/localStoragePref'

const LP_SLUG = 'partner-program'

/* ── data ─────────────────────────────────────────────── */

const upsquadHandles = [
  {
    title: 'Sales & Lead Generation',
    desc: 'We find and close clients — you never have to pitch.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    title: 'Marketing & Branding',
    desc: 'We promote your skills to the right audience.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    title: 'Client Support',
    desc: 'We handle all communication, revisions, and feedback loops.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Payments & Invoicing',
    desc: 'Guaranteed monthly payments — no chasing invoices.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Squad Manager',
    desc: 'A dedicated manager coordinates with clients on your behalf.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const partnerFocus = [
  {
    title: 'Focus on Your Craft',
    desc: 'Just do what you love — design, edit, create.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Per-Client Payment',
    desc: 'Earn per client assigned — not per task or per hour.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Full-Time or Part-Time',
    desc: 'Choose how much you want to work — flexible commitment.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const currentSituation = [
  'Hunt for clients constantly — mostly project-based work',
  'Once a project ends, back to searching for the next one',
  'Handle negotiations, invoicing, payments, and client communication yourself',
  'Inconsistent income, unpredictable workload',
]

const withUpsquad = [
  'UpSquad handles sales, marketing, support, and payments',
  'Clients are assigned to you — no hunting',
  'Work regularly for clients, get paid monthly',
  "Quit or switch clients anytime — you're never locked in",
  'Set your own working days and hours (virtual office timings)',
]

const gettingStartedSteps = [
  {
    number: '1',
    title: 'We Create Your Profile',
    description: 'Share your basic details, skills, and portfolio with us. We build a professional profile that showcases your best work.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Profile Presented to Clients',
    description: 'Your profile is shared with our active clients who are looking for creative talent that matches your skillset.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Client Selects You',
    description: 'When a client picks you, they get assigned to you. You start working directly with guidance from your Squad Manager.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const planCards = [
  {
    name: 'Starter',
    hours: '~1 hour/day',
    capacity: '10% Capacity',
    deliverables: 'e.g. 2 posters per day',
    payment: '5,000',
    highlighted: false,
  },
  {
    name: 'Basic',
    hours: '2–3 hours/day',
    capacity: '25% Capacity',
    deliverables: 'e.g. 5 posters per week',
    payment: '15,000',
    highlighted: false,
  },
  {
    name: 'Plus',
    hours: '4–5 hours/day',
    capacity: '50% Capacity',
    deliverables: 'e.g. 20 posters per month',
    payment: '20,000',
    highlighted: true,
    badge: 'POPULAR',
  },
  {
    name: 'Pro',
    hours: '6–7 hours/day',
    capacity: '80% Capacity',
    deliverables: 'e.g. 30 posters per month',
    payment: '30,000',
    highlighted: false,
  },
  {
    name: 'Personal',
    hours: 'Full-time',
    capacity: '100% Capacity',
    deliverables: 'Dedicated full-time work',
    payment: '40,000',
    highlighted: false,
  },
]

/* ── component ────────────────────────────────────────── */

export default function PartnerProgram() {
  const [languages, setLanguages] = useState([])
  const [defaultLanguageCode, setDefaultLanguageCode] = useState('en')
  const [selectedCode, setSelectedCode] = useState(null)
  const [gateOpen, setGateOpen] = useState(false)

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

  // Mirror LandingHero's selection logic: stored preference wins, else
  // auto-pick when there's only one language, else leave unset so the gate
  // opens on the first play click.
  useEffect(() => {
    const stored = getLang(LP_SLUG)
    const validCodes = new Set((languages || []).map((l) => l.code))
    if (stored && validCodes.has(stored)) {
      setSelectedCode(stored)
    } else if (defaultLanguageCode && validCodes.has(defaultLanguageCode) && (languages || []).length === 1) {
      setSelectedCode(defaultLanguageCode)
    } else {
      setSelectedCode(null)
    }
  }, [languages, defaultLanguageCode])

  const selected = (languages || []).find((l) => l.code === selectedCode) || null

  const ensureLanguage = () => {
    const langs = languages || []
    if (langs.length <= 1) {
      if (langs.length === 1 && !selectedCode) setSelectedCode(langs[0].code)
      return true
    }
    if (selectedCode) return true
    setGateOpen(true)
    return false
  }

  const onSelectLanguage = (code) => {
    setSelectedCode(code)
    setLang(LP_SLUG, code)
    setGateOpen(false)
  }

  return (
    <div className="pt-20 pb-0">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-5 sm:px-8 bg-dot-pattern border-b border-[rgba(96,96,163,0.2)] overflow-hidden">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-brand-purple/10 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              Now accepting partners
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
              <span className="text-text-primary">UpSquad Partner Program</span>
            </h1>

            <p className="text-lg text-text-secondary leading-[1.7] mb-8">
              Are you a freelance designer or video editor? Partner with UpSquad and focus only on
              what you do best — we handle the sales, marketing, client support, and payments.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://squadhire.upsquadconnect.com/signup/talent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Sign Up Now
              </a>

              {selected && (languages || []).length > 1 && (
                <button
                  type="button"
                  onClick={() => setGateOpen(true)}
                  aria-label="Change language"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-[rgba(96,96,163,0.2)] rounded-full px-3 py-1.5 hover:border-gray-300 bg-white"
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
            <HeroMedia videoUrl={selected?.videoUrl} onRequestGate={ensureLanguage} />
          </div>
        </div>

        <LanguageGate
          open={gateOpen}
          languages={languages || []}
          onSelect={onSelectLanguage}
          onDismiss={() => setGateOpen(false)}
        />
      </section>

      {/* ── Why UpSquad ─────────────────────────────────── */}
      <ScrollReveal>
        <section className="relative py-16 px-5 sm:px-8 bg-surface-secondary overflow-hidden">
          <div className="relative max-w-[1160px] mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-5 h-px bg-brand-purple" />
                  <p className="text-[11px] font-bold text-text-primary uppercase tracking-[0.2em]">Why UpSquad</p>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
                  Stop hustling.{' '}
                  <span className="italic font-medium text-text-muted">Start creating.</span>
                </h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                The freelance grind drains your energy on everything except your craft. Here&apos;s how partnering with UpSquad changes that.
              </p>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-2 items-stretch">
              {/* Left — Without UpSquad */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.22em] text-text-muted uppercase">Without UpSquad</span>
                  <span className="text-[10px] text-slate-300 font-medium">— old way</span>
                </div>
                <div className="bg-white rounded-2xl border border-[rgba(96,96,163,0.2)] overflow-hidden flex-1">
                  {currentSituation.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3.5 ${i !== 0 ? 'border-t border-[rgba(96,96,163,0.2)]' : ''}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-sm text-text-secondary leading-snug line-through decoration-slate-300/80 decoration-[1.5px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center — Transformation arrow (desktop) */}
              <div className="hidden lg:flex flex-col items-center justify-center px-1 pt-7">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-purple/30 rounded-full blur-md" />
                  <div className="relative w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg ring-[3px] ring-surface-secondary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile arrow */}
              <div className="flex lg:hidden justify-center -my-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-purple/30 rounded-full blur-md" />
                  <div className="relative w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-3.5 h-3.5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right — With UpSquad */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[10px] font-bold tracking-[0.22em] text-text-primary uppercase">With UpSquad</span>
                  <span className="text-[10px] text-text-primary/60 font-medium">— new way</span>
                </div>
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden flex-1 shadow-[0_12px_30px_-12px_rgb(15_23_42_/_0.3)]">
                  {/* Glow */}
                  <div className="absolute -top-24 -right-16 w-56 h-56 bg-brand-purple/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-8 w-40 h-40 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative">
                    {withUpsquad.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 px-4 py-3.5 ${i !== 0 ? 'border-t border-white/[0.06]' : ''}`}
                      >
                        <div className="w-6 h-6 rounded-full bg-brand-green/[0.12] border border-brand-green/30 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-white/90 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── How It Works ──────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Partnership Model</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">How it works</h2>
              <p className="text-base text-text-secondary mt-2">You create. We handle everything else.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* What UpSquad handles */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-brand-purple" />
                  <h3 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider">What UpSquad Handles</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {upsquadHandles.map((item) => (
                    <div
                      key={item.title}
                      className="bg-surface-secondary rounded-xl p-5 border border-[rgba(96,96,163,0.2)] hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-[rgba(96,96,163,0.2)] text-text-secondary flex items-center justify-center shadow-sm mb-3">
                        {item.icon}
                      </div>
                      <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What you focus on */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-brand-purple" />
                  <h3 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider">What You Focus On</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {partnerFocus.map((item) => (
                    <div
                      key={item.title}
                      className="bg-surface-secondary rounded-xl p-5 border border-[rgba(96,96,163,0.2)] hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-[rgba(96,96,163,0.2)] text-text-secondary flex items-center justify-center shadow-sm mb-3">
                        {item.icon}
                      </div>
                      <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── How to Get Started ────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Onboarding</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">How to get started</h2>
              <p className="text-base text-text-secondary mt-2">Three simple steps to start earning.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gettingStartedSteps.map((step, i) => (
                <div key={step.number} className="relative">
                  {/* Connector line (desktop only) */}
                  {i < gettingStartedSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-60px)] h-px bg-gray-300/60 -translate-x-1/2 z-0" />
                  )}
                  <div className="bg-white rounded-xl p-6 border border-[rgba(96,96,163,0.2)] relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-brand-purple text-text-primary text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                      <span className="text-xs font-medium text-text-muted">Step {step.number}</span>
                    </div>
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-1.5">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Your Partner Tier ─────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Partner Tiers</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">Your partner tier</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Based on your experience, skill set, and portfolio, your profile will be placed into one of three tiers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Junior */}
              <div className="rounded-xl p-6 border border-[rgba(96,96,163,0.2)] bg-surface-secondary hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary">Junior</h3>
                    <span className="text-[11px] text-text-muted font-medium">Entry Level</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Less than 2 years of experience. Great for straightforward tasks and cost-effective output.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal for starting your creative career
                </div>
              </div>

              {/* Pro */}
              <div className="rounded-xl p-6 border-2 border-brand-purple bg-brand-purple/5 hover:-translate-y-0.5 transition-transform duration-200 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-pink to-brand-purple text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Common
                </span>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/5 border border-brand-purple/20 text-text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary">Pro</h3>
                    <span className="text-[11px] text-text-muted font-medium">2+ Years Experience</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  More than 2 years of experience with strong, well-rounded skill sets. Reliable quality across a wide range of work.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="w-3.5 h-3.5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Higher pay per client assignment
                </div>
              </div>

              {/* Elite */}
              <div className="rounded-xl p-6 border border-[rgba(96,96,163,0.2)] bg-surface-secondary hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary">Elite</h3>
                    <span className="text-[11px] text-text-muted font-medium">5+ Years Experience</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Top talents with 5+ years of experience. Best for high-stakes, complex, or premium creative work.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="w-3.5 h-3.5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium rates for premium talent
                </div>
              </div>
            </div>

            {/* Custom Pricing Option */}
            <div className="mt-8 rounded-xl border border-dashed border-brand-purple/30 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-[rgba(96,96,163,0.2)] text-text-secondary flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-heading text-sm font-semibold text-text-primary mb-0.5">Custom Pricing Plan</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Don&apos;t fit neatly into a tier? You can also opt in for a custom pricing plan tailored to your unique skill set and availability. We&apos;ll work together to find the right fit.
                </p>
              </div>
              <a
                href="https://wa.me/919995266342?text=I%20want%20to%20discuss%20a%20custom%20partner%20plan"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-text-primary border border-[rgba(96,96,163,0.2)] hover:border-gray-300 bg-white hover:bg-surface-secondary px-4 py-2 rounded-lg transition-all"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── How Works Get Assigned (Plan Cards) ───────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-12">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Assignments</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">How works get assigned</h2>
              <p className="text-base text-text-secondary mt-2">
                Clients subscribe to a plan. Based on their plan, here&apos;s what you can expect.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {planCards.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative ${
                    plan.highlighted
                      ? 'bg-brand-purple/5 border-brand-purple border-2'
                      : 'bg-surface-secondary border-[rgba(96,96,163,0.2)]'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-pink to-brand-purple text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}

                  <h3 className="font-heading text-lg font-bold text-text-primary mb-4">{plan.name}</h3>

                  {/* Hours */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Hours</span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{plan.hours}</p>
                    <p className="text-xs text-text-muted">{plan.capacity}</p>
                  </div>

                  {/* Deliverables */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Deliverables</span>
                    </div>
                    <p className="text-sm text-slate-600">{plan.deliverables}</p>
                  </div>

                  {/* Payment */}
                  <div className="pt-3 border-t border-[rgba(96,96,163,0.2)]">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Payment</span>
                    </div>
                    <p className="text-lg font-bold text-text-primary">
                      <span className="text-text-primary">{'₹'}{plan.payment}</span>
                      <span className="text-xs font-normal text-text-muted"> /month</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Deliverables are selected by the client. Payments shown are approximate partner earnings per client.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Bottom CTA ────────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 bg-[#090C1D]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to partner with UpSquad?
          </h2>
          <p className="text-base text-text-muted mb-8">
            No contracts, no upfront costs. Just your skills and our support.
          </p>
          <a
            href="https://squadhire.upsquadconnect.com/signup/talent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-text-primary font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  )
}
