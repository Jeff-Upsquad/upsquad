"use client"
import { useEffect, useRef, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import PartnerProgramTab from '../components/partner/PartnerProgramTab'
import FreelanceTab from '../components/partner/FreelanceTab'
import JobsTab from '../components/partner/JobsTab'
import { getLang, setLang } from '../lib/localStoragePref'

const LP_SLUG = 'partner-program'

const TABS = [
  { id: 'partner', label: 'Partner Program' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'jobs', label: 'Jobs' },
]

const heroCopy = {
  partner: {
    badge: 'Now accepting partners',
    desc: 'Partner with UpSquad and focus only on what you do best — we handle the sales, marketing, client support, and payments while you work with assigned clients.',
  },
  freelance: {
    badge: 'New · One-time assignments',
    desc: 'Pick up standalone design and video editing assignments with a fixed payment and a clear timeline. Take what fits your schedule, deliver, and get paid.',
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
  const [selectedCode, setSelectedCode] = useState(null)
  const [gateOpen, setGateOpen] = useState(false)
  const [tab, setTab] = useState('partner')
  const tabsRef = useRef(null)

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

  const copy = heroCopy[tab]

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
                  designers &amp; video editors
                </span>
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-[1.7] mb-8">
              {copy.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://squadhire.upsquadconnect.com/apply/creative"
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

      {/* ── Tab switcher (sticky under the navbar) ──────── */}
      <div
        ref={tabsRef}
        className="sticky top-16 z-40 border-y border-[rgba(0,0,0,0.08)] bg-white/90 backdrop-blur-md"
      >
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-3 flex items-center justify-center lg:justify-between gap-4">
          <span className="hidden lg:block text-sm text-text-secondary">
            Three ways to work with UpSquad — pick one:
          </span>
          <div
            role="tablist"
            aria-label="Choose how you want to work"
            className="inline-flex p-1 rounded-full border-[1.5px] border-black bg-white shadow-brutal-sm"
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
                  className={`whitespace-nowrap px-4 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-short ${
                    active ? 'bg-brand-purple text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Active panel ────────────────────────────────── */}
      <div role="tabpanel">
        {tab === 'partner' && <PartnerProgramTab onSwitchTab={goToTab} />}
        {tab === 'freelance' && <FreelanceTab />}
        {tab === 'jobs' && <JobsTab />}
      </div>
    </div>
  )
}
