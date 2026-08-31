"use client"
import { useEffect, useRef, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import PartnerProgramTab from '../components/sales-partner/PartnerProgramTab'
import FreelanceTab from '../components/sales-partner/FreelanceTab'
import JobsTab from '../components/sales-partner/JobsTab'
import PartnerSignupLink from '../components/PartnerSignupLink'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'

const CTA_SLUG = 'sales'

// TODO: Replace with the real hero video (mp4 URL, or a YouTube / Vimeo / Loom
// link — HeroMedia auto-embeds those). Using a sample clip as a placeholder.
const HERO_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4'

const TABS = [
  { id: 'partner', label: 'Subscriptions' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'jobs', label: 'Jobs' },
]

const heroCopy = {
  partner: {
    badge: 'Now accepting sales partners',
    desc: 'Partner with UpSquad and focus only on selling — we find the businesses, hand you the leads, and handle onboarding, support, and payments while you drive outreach, demos, and closing for assigned clients.',
  },
  freelance: {
    badge: 'New · One-time assignments',
    desc: 'Pick up standalone sales assignments — an outbound campaign, a lead-list build, a closing sprint — with a fixed fee and a clear timeline. Take what fits your schedule, deliver, and get paid.',
  },
  jobs: {
    badge: 'New · Full-time & part-time roles',
    desc: 'Browse full-time and part-time sales roles from companies hiring through UpSquad. Find a role that matches your preference and apply directly.',
  },
}

/* ── component ────────────────────────────────────────── */

export default function SalesPartnerProgram() {
  const [tab, setTab] = useState('partner')
  const tabsRef = useRef(null)
  const signupUrl = usePartnerSignupUrl(CTA_SLUG)

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
                  sales professionals
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
            </div>
          </div>
          <div className="w-full">
            <HeroMedia videoUrl={HERO_VIDEO_URL} />
          </div>
        </div>
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
        {tab === 'partner' && <PartnerProgramTab onSwitchTab={goToTab} signupUrl={signupUrl} />}
        {tab === 'freelance' && <FreelanceTab signupUrl={signupUrl} />}
        {tab === 'jobs' && <JobsTab signupUrl={signupUrl} />}
      </div>
    </div>
  )
}
