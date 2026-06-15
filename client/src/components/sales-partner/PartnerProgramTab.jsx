"use client"
import ScrollReveal from '../ScrollReveal'

// TODO: Confirm the real sales application URL. Mirrors the creative flow
// (/apply/creative) used on the designers-and-editors partner page.
const SIGNUP_URL = 'https://squadhire.upsquadconnect.com/apply/sales'
const WA_NUMBER = '919995266385'

/* ── data ─────────────────────────────────────────────── */

const upsquadHandles = [
  {
    title: 'Client Acquisition',
    desc: 'We find and onboard the businesses — you never prospect for your own accounts.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Leads & Targets',
    desc: 'We hand you qualified leads and clear monthly targets to work against.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v8m0 0l3-3m-3 3l-3-3m9 3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    title: 'Tools & Enablement',
    desc: 'CRM, dialer, scripts, and sales collateral — set up and ready for you.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Payments & Collections',
    desc: 'Guaranteed monthly payments — no chasing invoices or commissions.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Squad Manager',
    desc: 'A dedicated manager coordinates with each business on your behalf.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const partnerFocus = [
  {
    title: 'Focus on Selling',
    desc: 'Just do what you do best — outreach, demos, follow-ups, and closing.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Per-Client Payment',
    desc: 'Earn per business assigned — plus performance incentives on results.',
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

const whyFeatures = [
  {
    title: 'Accounts come to you',
    desc: 'We assign businesses to you — no more cold prospecting for your own clients or chasing the next deal.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Guaranteed monthly pay',
    desc: 'Sell regularly for your assigned businesses and get paid every month. No chasing commissions.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'We handle the business',
    desc: 'Client acquisition, marketing, onboarding, and collections are all on us. You never touch the admin.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Work on your terms',
    desc: 'Set your own working days and hours (virtual office timings). Full-time or part-time — your call.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Never locked in',
    desc: 'Quit or switch clients anytime. No contracts, no lock-ins — you stay in control.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Focus only on selling',
    desc: 'A dedicated Squad Manager handles the accounts, so you can stay on the phones and in the pipeline.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

const gettingStartedSteps = [
  {
    number: '1',
    title: 'We Create Your Profile',
    description: 'Share your basic details, sales experience, the segments you know (B2B, D2C, SaaS, etc.), and your track record. We build a professional profile that showcases your strengths.',
  },
  {
    number: '2',
    title: 'Profile Presented to Clients',
    description: 'Your profile is shared with our active clients who are looking for sales talent that matches their market and motion.',
  },
  {
    number: '3',
    title: 'Client Selects You',
    description: 'When a client picks you, they get assigned to you. You start selling for them directly with guidance from your Squad Manager.',
  },
]

const planCards = [
  {
    name: 'Starter',
    hours: '~1 hour/day',
    capacity: '10% Capacity',
    deliverables: 'e.g. outreach for 1 micro business',
    payment: '6,000',
    highlighted: false,
  },
  {
    name: 'Basic',
    hours: '2–3 hours/day',
    capacity: '25% Capacity',
    deliverables: 'e.g. lead-gen + follow-up for 2 businesses',
    payment: '15,000',
    highlighted: false,
  },
  {
    name: 'Plus',
    hours: '4–5 hours/day',
    capacity: '50% Capacity',
    deliverables: 'e.g. full sales cycle for 4–5 businesses',
    payment: '22,000',
    highlighted: true,
    badge: 'POPULAR',
  },
  {
    name: 'Pro',
    hours: '6–7 hours/day',
    capacity: '80% Capacity',
    deliverables: 'e.g. outreach + closing for 8 businesses',
    payment: '32,000',
    highlighted: false,
  },
  {
    name: 'Personal',
    hours: 'Full-time',
    capacity: '100% Capacity',
    deliverables: 'Dedicated full-time sales support',
    payment: '45,000',
    highlighted: false,
  },
]

// How the Partner Program differs from one-off Freelance work.
const partnerVsFreelance = {
  partner: [
    'Regular, guaranteed monthly payments',
    'Paid per business assigned — not per campaign or task',
    'Set your own virtual office timings and work accordingly',
    'Quit clients anytime and get assigned new ones',
  ],
  freelance: [
    'Paid once per assignment you complete',
    'Paid per campaign, sprint, or individual engagement',
    'Work to each assignment’s own fixed deadline',
    'Pick up standalone, one-off engagements as they come',
  ],
}

/* ── component ────────────────────────────────────────── */

export default function PartnerProgramTab({ onSwitchTab }) {
  return (
    <>
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
                  Stop hunting for clients.{' '}
                  <span className="italic font-medium text-text-muted">Start closing deals.</span>
                </h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                The freelance grind drains your energy on everything except the selling itself. Here&apos;s what you get when you partner with UpSquad.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyFeatures.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-6 border border-[rgba(96,96,163,0.2)] hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-purple/20 border border-[rgba(96,96,163,0.2)] text-text-primary flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-text-primary mb-1.5">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Partner Program vs Freelance ───────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Partner Program vs Freelance</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">How is this different from freelance?</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Both let you earn through UpSquad. The Partner Program is built for steady, ongoing work with
                assigned businesses — Freelance is for one-off engagements you pick up whenever it suits you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Partner Program */}
              <div className="rounded-2xl border-2 border-brand-purple bg-brand-purple/5 p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-purple text-text-primary border-2 border-text-primary shadow-brutal-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary">Partner Program</h3>
                    <span className="text-[11px] text-text-muted font-medium">Steady, ongoing client work</span>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {partnerVsFreelance.partner.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="inline-flex w-6 h-6 rounded-full bg-brand-purple border border-text-primary items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-sm font-medium text-text-primary leading-snug">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Freelance */}
              <div className="rounded-2xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white text-text-primary border border-[rgba(96,96,163,0.2)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-text-primary">Freelance</h3>
                    <span className="text-[11px] text-text-muted font-medium">One-time assignments</span>
                  </div>
                </div>
                <ul className="space-y-3.5 flex-1">
                  {partnerVsFreelance.freelance.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="inline-flex w-6 h-6 rounded-full bg-white border border-[rgba(96,96,163,0.2)] items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      </span>
                      <p className="text-sm text-text-secondary leading-snug">{item}</p>
                    </li>
                  ))}
                </ul>
                {onSwitchTab && (
                  <button
                    type="button"
                    onClick={() => onSwitchTab('freelance')}
                    className="btn-secondary mt-6 inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 self-start"
                  >
                    Explore Freelance &rarr;
                  </button>
                )}
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
              <p className="text-base text-text-secondary mt-2">You handle the selling. We handle everything else.</p>
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
                Based on your experience, segments, and track record, your profile will be placed into one of three tiers.
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
                  Less than 2 years of experience. Great for SDR work, lead generation, telecalling, and appointment setting.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal for starting your sales career
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
                    <span className="text-[11px] text-text-muted font-medium">2+ Years</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  More than 2 years of full-cycle sales experience — outreach, demos, negotiation, and closing. Reliable, consistent performers.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <svg className="w-3.5 h-3.5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Higher pay per client assignment
                </div>
              </div>

              {/* Top Talents */}
              <div className="rounded-xl p-6 border border-[rgba(96,96,163,0.2)] bg-surface-secondary hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary">Top Talents</h3>
                    <span className="text-[11px] text-text-muted font-medium">5+ Years</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  Senior closers and sales leaders with 5+ years of experience. Best for complex B2B deals, enterprise accounts, and high-ticket selling.
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
                  Don&apos;t fit neatly into a tier? You can also opt in for a custom pricing plan tailored to your unique experience and availability. We&apos;ll work together to find the right fit.
                </p>
              </div>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('I want to discuss a custom sales partner plan')}`}
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
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">How work gets assigned</h2>
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
                      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Scope</span>
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
              * Scope is selected by the client. Payments shown are approximate partner earnings per client, before performance incentives.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Closing CTA ─────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Ready to partner
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Partner with UpSquad
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  No contracts, no upfront costs. Create your profile once and start selling for
                  businesses assigned to you.
                </p>
              </div>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0"
              >
                Sign up to partner &rarr;
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
