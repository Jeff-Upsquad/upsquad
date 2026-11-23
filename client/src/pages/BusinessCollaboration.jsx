"use client"

import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import WhatsAppIcon from '../components/WhatsAppIcon'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import { useLanguageGate } from '../lib/useLanguageGate'
import { fetchLandingPage } from '../lib/landingPageApi'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'
import {
  DEFAULT_HERO_DESCRIPTION,
  DEFAULT_HERO_TITLE,
  afterKeep,
  collabFaqs,
  collabProducts,
  collabSteps,
  collabWaLink,
  interestOptions,
  programStats,
  youGetItems,
} from '../data/collaboration'

const LANDING_SLUG = 'business-collaboration-program'

function CheckIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ProductIcon({ name, className = 'w-5 h-5' }) {
  const common = {
    className,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }
  if (name === 'squadbooks') {
    return (
      <svg {...common}>
        <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v18H7.5A2.5 2.5 0 0 0 5 22V4.5Z" />
        <path d="M9 7h6M9 11h6" />
      </svg>
    )
  }
  if (name === 'payroll') {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2.5" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </svg>
    )
  }
  if (name === 'inventory') {
    return (
      <svg {...common}>
        <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z" />
        <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="m17 11 2 2 4-4" />
    </svg>
  )
}

function ReelIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <path d="M2.5 7.5h19M7.5 2.5l3 5M14 2.5l3 5" />
      <path d="m10 11.5 5 3-5 3v-6Z" />
    </svg>
  )
}

function SectionLabel({ children, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className={`h-px w-8 ${light ? 'bg-[#FFFF99]' : 'accent-bar'}`} />
      <span className={`font-mono-tech text-xs uppercase tracking-[0.14em] ${light ? 'text-white/50' : 'text-text-secondary'}`}>
        {children}
      </span>
    </div>
  )
}

// The hero's visual: a receipt where every line item is ₹0 and the whole
// collaboration is settled with one Instagram Reel.
function CollaborationReceipt() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:mr-0">
      <svg
        viewBox="0 0 120 120"
        className="pointer-events-none absolute -top-12 right-4 h-24 w-24 rotate-[-13deg] text-text-secondary/55"
        aria-hidden="true"
      >
        <defs>
          <path id="collab-stamp-circle" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
        </defs>
        <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 3" />
        <text fill="currentColor" fontSize="7.4" letterSpacing="2.1" fontFamily="Sometype Mono, monospace">
          <textPath href="#collab-stamp-circle">UP SQUAD · COLLABORATION ·</textPath>
        </text>
        <text x="60" y="57" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
          ₹0
        </text>
        <text x="60" y="70" textAnchor="middle" fill="currentColor" fontSize="6.4" letterSpacing="1.4" fontFamily="Sometype Mono, monospace">
          1–3 MONTHS
        </text>
      </svg>

      <div className="overflow-hidden rounded-2xl border-[1.5px] border-black bg-white shadow-brutal">
        <div className="px-6 pb-5 pt-14 sm:px-7">
          <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-secondary">
            <span>Collaboration receipt</span>
            <span>No. 001</span>
          </div>
          <h2 className="mt-3 font-heading text-xl font-extrabold tracking-[-0.02em] text-text-primary">
            Business Collaboration Program
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            UpSquad &middot; For selected startups &amp; businesses
          </p>

          <div className="mt-5 border-t border-dashed border-black/20" />

          <ul className="mt-2">
            {collabProducts.map((product) => (
              <li
                key={product.key}
                className="flex items-center justify-between gap-3 border-b border-dotted border-black/10 py-2.5 text-[13px] last:border-0"
              >
                <span className="min-w-0 text-text-primary">{product.name}</span>
                <span className="shrink-0 font-mono-tech font-semibold text-text-primary">₹0</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 border-t border-dashed border-black/20" />

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                Total &middot; 1–3 months
              </p>
              <p className="mt-1 text-xs text-text-secondary">No card. No invoice.</p>
            </div>
            <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-text-primary">₹0</p>
          </div>
        </div>

        <div className="mx-2 mb-2 rounded-xl border border-black/10 bg-[#FFFF99] px-5 py-4">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/70">
            Settled with
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0A0A0A]/20 bg-white text-[#0A0A0A]">
              <ReelIcon className="h-5 w-5" />
            </span>
            <p className="font-heading text-sm font-extrabold text-[#0A0A0A]">
              1 &times; Instagram Reel
            </p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[#3f3f46]">
            Posted as a collaboration with UpSquad&rsquo;s official Instagram page.
          </p>
        </div>

        <p className="px-6 pb-5 pt-1 font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-muted">
          A few businesses only &middot; by fit
        </p>
      </div>
    </div>
  )
}

export default function BusinessCollaboration() {
  useLandingScrollReset()
  const [hero, setHero] = useState({
    title: DEFAULT_HERO_TITLE,
    description: DEFAULT_HERO_DESCRIPTION,
    defaultLanguageCode: 'en',
    languages: [],
  })
  const [loadingMedia, setLoadingMedia] = useState(true)
  const [form, setForm] = useState({
    name: '',
    business: '',
    interest: interestOptions[0],
    note: '',
  })

  useEffect(() => {
    let alive = true
    fetchLandingPage(LANDING_SLUG).then((data) => {
      if (!alive) return
      if (data) {
        setHero({
          title: data.heroTitle || DEFAULT_HERO_TITLE,
          description: data.heroDescription || DEFAULT_HERO_DESCRIPTION,
          defaultLanguageCode: data.defaultLanguageCode || 'en',
          languages: data.languages || [],
        })
      }
      setLoadingMedia(false)
    })
    return () => { alive = false }
  }, [])

  const languages = hero.languages.filter((language) => language.videoUrl)
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
    languages,
    defaultLanguageCode: hero.defaultLanguageCode,
  })

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleWhatsAppSubmit(e) {
    e.preventDefault()
    const lines = [
      "Hi UpSquad, I'd like to join the Business Collaboration Program.",
      form.name.trim() && `Name: ${form.name.trim()}`,
      form.business.trim() && `Business: ${form.business.trim()}`,
      `Interested in: ${form.interest}`,
      form.note.trim() && `About my business: ${form.note.trim()}`,
    ].filter(Boolean)
    window.open(collabWaLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-x-clip bg-white pb-14 pt-24 md:pb-20 md:pt-28 lg:pt-32">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="min-w-0">
            <ScrollReveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/80 bg-white px-3.5 py-1.5 shadow-brutal-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0A0A0A]" />
                <span className="text-xs font-medium text-text-primary">
                  UpSquad Business Collaboration Program
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="text-balance font-heading text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-text-primary sm:text-[2.9rem] lg:text-[3.15rem]">
                {hero.title}
                <span className="mt-2 block">
                  <span className="hero-highlight box-decoration-clone italic">
                    Free for up to 3 months.
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                {hero.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={collabWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Apply on WhatsApp
                </a>
                <a
                  href="#included"
                  className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
                >
                  See what&rsquo;s included
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <p className="mt-5 text-xs text-text-muted">
                A few collaborations only &middot; 1–3 months &middot; No card, no invoice, no lock-in
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.18} direction="right">
            <CollaborationReceipt />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Program video ===== */}
      <section aria-labelledby="program-video-title" className="bg-white px-5 pb-14 sm:px-8 md:pb-20">
        <div className="mx-auto max-w-[900px]">
          <ScrollReveal>
            <div className="mb-7 text-center">
              <SectionLabel>Watch the introduction</SectionLabel>
              <h2 id="program-video-title" className="font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
                See how the collaboration works.
              </h2>
              <p className="mt-3 text-base text-text-secondary">
                Get to know the program, what&rsquo;s included, and what we ask in return.
              </p>
            </div>
            <div className="rounded-2xl border border-black/15 bg-white p-3 shadow-brutal">
              {languages.length > 0 ? (
                <HeroMedia
                  videoUrl={selected?.videoUrl}
                  previewUrl={languages[0]?.videoUrl}
                  onRequestGate={requestPlay}
                  autoPlay={pendingPlay}
                  needsGate={languages.length > 1}
                />
              ) : (
                <div className="aspect-video flex flex-col items-center justify-center rounded-xl bg-[#141414] p-5 text-center text-white sm:p-8">
                  <ReelIcon className="mb-4 h-10 w-10 text-[#FFFF99]" />
                  <p className="font-heading text-xl font-bold sm:text-3xl">
                    Your accounting ecosystem. Explained.
                  </p>
                  <p className="mt-3 text-sm text-white/60" role="status">
                    {loadingMedia ? 'Loading program introduction…' : 'Program introduction video coming soon.'}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-2 pt-4">
                <p className="text-xs font-semibold text-text-secondary">
                  UpSquad Business Collaboration Program
                </p>
                {hasLangChooser && (
                  <button
                    type="button"
                    onClick={() => setGateOpen(true)}
                    className="text-xs font-semibold text-text-primary underline underline-offset-4"
                    aria-label="Change video language"
                  >
                    {selected.name} · Change language
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <LanguageGate
        open={gateOpen}
        languages={languages}
        selectedCode={selectedCode}
        onSelect={onSelectLanguage}
        onDismiss={() => setGateOpen(false)}
      />

      {/* ===== Ticker ===== */}
      <div className="overflow-hidden border-y border-black/10 bg-[#0A0A0A] py-3 text-white">
        <div className="collab-marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {[
                '₹0 for 1–3 months',
                'SquadBooks',
                'Squad Payroll',
                'SquadBooks Inventory',
                'A professional accountant',
                '1 Instagram Reel',
              ].map((item) => (
                <span key={item} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/80">
                    {item}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#FFFF99]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== The program ===== */}
      <section id="program" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal>
            <SectionLabel>The program</SectionLabel>
            <h2 className="text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              A few businesses. Their whole accounting stack. ₹0.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              Introducing the <strong className="font-semibold text-text-primary">UpSquad Business Collaboration Program</strong>.
              We&rsquo;re partnering with a few selected startups and businesses to give them free access to our
              complete accounting ecosystem for 1 to 3 months.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              This is not a stripped-down trial. It is the same accountant subscription, SquadBooks, Squad Payroll,
              and SquadBooks Inventory we run for paying businesses — at no cost for the collaboration period.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-3">
              {programStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4 text-center shadow-sm"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-heading text-2xl font-extrabold tracking-[-0.03em] text-text-primary sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[11px] leading-tight text-text-secondary">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== What's included ===== */}
      <section id="included" className="scroll-mt-24 bg-surface-secondary px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1160px]">
          <ScrollReveal>
            <SectionLabel>What&rsquo;s included</SectionLabel>
            <h2 className="max-w-3xl text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              Four products. One accountant. All free.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Everything below is part of the collaboration — no add-ons, no upgrade needed.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {collabProducts.map((product, i) => (
              <ScrollReveal key={product.key} delay={(i % 2) * 0.08} className="h-full">
                <article
                  className={`flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
                    product.featured
                      ? 'border-[1.5px] border-black bg-[#FFFF99] shadow-brutal'
                      : 'border border-[rgba(0,0,0,0.08)] bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                        product.featured
                          ? 'border-[#0A0A0A]/20 bg-white text-[#0A0A0A]'
                          : 'border-black/10 bg-surface-secondary text-text-primary'
                      }`}
                    >
                      <ProductIcon name={product.key} />
                    </span>
                    <span className={`font-mono-tech text-[11px] tracking-[0.16em] ${product.featured ? 'text-[#0A0A0A]/50' : 'text-text-muted'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className={`mt-5 font-mono-tech text-[10px] uppercase tracking-[0.14em] ${product.featured ? 'text-[#0A0A0A]/60' : 'text-text-secondary'}`}>
                    {product.kind}
                  </p>
                  <h3 className={`mt-1 font-heading text-xl font-extrabold tracking-[-0.02em] ${product.featured ? 'text-[#0A0A0A]' : 'text-text-primary'}`}>
                    {product.name}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${product.featured ? 'text-[#3f3f46]' : 'text-text-secondary'}`}>
                    {product.desc}
                  </p>

                  <div className="mt-auto pt-6">
                    <p className={`flex items-center gap-1.5 border-t pt-4 text-xs font-semibold ${product.featured ? 'border-[#0A0A0A]/15 text-[#0A0A0A]' : 'border-black/[0.06] text-text-primary'}`}>
                      <CheckIcon className="h-3.5 w-3.5" />
                      Included &middot; ₹0
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
              <CheckIcon className="h-4 w-4 shrink-0" />
              All at no cost during the collaboration period.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== The exchange ===== */}
      <section id="how-it-works" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1160px]">
          <ScrollReveal>
            <SectionLabel>How the collaboration works</SectionLabel>
            <h2 className="max-w-3xl text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              The whole ask is one Reel.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Create and post a Reel sharing your experience with UpSquad and publish it as a collaboration post
              with our official Instagram page.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <ScrollReveal className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm sm:p-8">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                  You get
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-[-0.025em] text-text-primary">
                  The full accounting stack.
                </h3>

                <ul className="mt-6 space-y-3.5">
                  {youGetItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-text-primary">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="flex items-end justify-between gap-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-4">
                    <div>
                      <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                        For 1–3 months
                      </p>
                      <p className="mt-1 text-sm font-medium text-text-primary">Everything included</p>
                    </div>
                    <p className="font-heading text-4xl font-extrabold leading-none tracking-[-0.03em] text-text-primary">
                      ₹0
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="flex items-center justify-center">
              <span className="flex h-10 w-10 rotate-90 items-center justify-center rounded-full border border-black/10 bg-white text-text-secondary shadow-sm lg:rotate-0">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4 4 4m6 4v12m0 0 4-4m-4 4-4-4" />
                </svg>
              </span>
            </div>

            <ScrollReveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border-[1.5px] border-black bg-[#0A0A0A] p-6 text-white shadow-brutal sm:p-8">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#FFFF99]">
                  You give
                </p>
                <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-[-0.025em] text-white">
                  One Instagram Reel.
                </h3>

                <div className="mt-6 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-[#FFFF99] text-[#0A0A0A]">
                    <ReelIcon />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-white">Share your experience</p>
                    <p className="text-sm text-white/60">In your own words, on camera.</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/70">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FFFF99]" />
                    Create and post a Reel about working with UpSquad.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FFFF99]" />
                    Publish it as a collaboration post with our official Instagram page.
                  </li>
                </ul>

                <p className="mt-auto pt-6 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#FFFF99]">
                  That&rsquo;s it.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== Steps ===== */}
      <section className="bg-surface-secondary px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-[1160px]">
          <ScrollReveal>
            <SectionLabel>From message to Reel</SectionLabel>
            <h2 className="max-w-3xl text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              Four steps. One of them is a Reel.
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collabSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.07} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
                  <span className="font-mono-tech text-[11px] tracking-[0.18em] text-text-muted">
                    STEP {step.number}
                  </span>
                  <span aria-hidden="true" className="mt-3 h-1 w-10 rounded-full bg-[#FFFF99]" />
                  <h3 className="mt-4 font-heading text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Afterwards ===== */}
      <section id="after" className="scroll-mt-24 overflow-x-clip bg-white px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1160px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal>
            <SectionLabel>After the collaboration</SectionLabel>
            <h2 className="max-w-xl text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              The free software stays free.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              When the collaboration period ends, you can continue using the free versions of our software —
              even without an Accountant Subscription.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
              The accountant subscription is the only piece that ends with the collaboration. It is optional
              afterwards: keep it if you want our team to keep managing your books, or carry on with the
              software on your own.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} direction="right">
            <div className="rounded-2xl border-[1.5px] border-black bg-white p-6 shadow-brutal sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                  What you get, over time
                </p>
                <span className="shrink-0 rounded-full border border-black/10 px-2.5 py-1 font-mono-tech text-[10px] text-text-secondary">
                  Up to 3 months
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {['Month 1', 'Month 2', 'Month 3'].map((month) => (
                  <div key={month} className="rounded-xl border border-black/15 bg-[#FFFF99] px-2 py-3 text-center">
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.12em] text-[#0A0A0A]/70">
                      {month}
                    </p>
                    <p className="mt-1 font-heading text-sm font-extrabold text-[#0A0A0A]">Free</p>
                  </div>
                ))}
              </div>

              <div className="my-3 flex items-center justify-center">
                <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
                </svg>
              </div>

              <div className="rounded-xl border border-black/80 bg-[#0A0A0A] p-4 text-white">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/50">
                  After the collaboration
                </p>
                <p className="mt-1 font-heading text-base font-bold text-white">
                  Keep the free software versions
                </p>
                <p className="mt-1 text-xs text-white/60">No Accountant Subscription required.</p>
              </div>

              <ul className="mt-4 space-y-2">
                {afterKeep.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-primary">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-24 bg-surface-secondary px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <SectionLabel>Questions</SectionLabel>
            <h2 className="max-w-md text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-text-primary md:text-4xl">
              The honest answers.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary">
              Still unsure? Text us on WhatsApp — we will tell you plainly whether the program fits your business.
            </p>
            <a
              href={collabWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-primary underline decoration-black/20 decoration-2 underline-offset-4 transition-colors hover:decoration-black/60"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border-t border-black/[0.08]">
              {collabFaqs.map((faq) => (
                <details key={faq.q} className="group border-b border-black/[0.08] py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-heading text-base font-semibold text-text-primary">
                      {faq.q}
                    </span>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/15 text-text-secondary transition-transform duration-200 group-open:rotate-45">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl pr-10 text-sm leading-relaxed text-text-secondary">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Closing CTA ===== */}
      <section id="apply" className="scroll-mt-24 overflow-x-clip bg-[#0A0A0A] px-5 py-16 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[1fr_430px] lg:gap-16">
          <ScrollReveal>
            <SectionLabel tone="light">Limited collaborations</SectionLabel>
            <h2 className="max-w-xl text-balance font-heading text-3xl font-extrabold tracking-[-0.025em] text-white md:text-4xl">
              Interested in collaborating with UpSquad?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              Text us on WhatsApp to express your interest, and let&rsquo;s explore working together.
            </p>

            <a
              href={collabWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#FFFF99] bg-[#FFFF99] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-transform hover:-translate-y-0.5 hover:bg-[#F7F78A]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Text us on WhatsApp
            </a>

            <p className="mt-4 max-w-md text-xs leading-relaxed text-white/40">
              A few selected startups and businesses at a time. Tell us what you need in order and we will
              take it from there.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12} direction="right">
            <form
              onSubmit={handleWhatsAppSubmit}
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur sm:p-7"
            >
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/50">
                Start your message
              </p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-white">
                Tell us about your business
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                We&rsquo;ll open WhatsApp with this message ready to send.
              </p>

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-[11px] font-medium text-white/60">
                    Your name <span className="text-white/35">(optional)</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#FFFF99] focus:ring-2 focus:ring-[#FFFF99]/20"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-medium text-white/60">
                    Business name <span className="text-white/35">(optional)</span>
                  </span>
                  <input
                    type="text"
                    name="business"
                    value={form.business}
                    onChange={(e) => setField('business', e.target.value)}
                    placeholder="Your business"
                    className="mt-1 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#FFFF99] focus:ring-2 focus:ring-[#FFFF99]/20"
                  />
                </label>

                <div>
                  <span className="text-[11px] font-medium text-white/60">Interested in</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {interestOptions.map((option) => {
                      const active = form.interest === option
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setField('interest', option)}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                            active
                              ? 'border-[#FFFF99] bg-[#FFFF99] text-[#0A0A0A]'
                              : 'border-white/15 text-white/60 hover:border-white/35 hover:text-white/85'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="text-[11px] font-medium text-white/60">
                    Anything about your business? <span className="text-white/35">(optional)</span>
                  </span>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={(e) => setField('note', e.target.value)}
                    rows={2}
                    placeholder="What do you want to get in order?"
                    className="mt-1 w-full resize-none rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#FFFF99] focus:ring-2 focus:ring-[#FFFF99]/20"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFFF99] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] transition-transform hover:-translate-y-0.5 hover:bg-[#F7F78A]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Open WhatsApp with this message
              </button>
              <p className="mt-3 text-center font-mono-tech text-[10px] uppercase tracking-[0.14em] text-white/35">
                No payment details &middot; Just a conversation
              </p>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
