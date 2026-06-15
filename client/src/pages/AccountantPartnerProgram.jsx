"use client"
import { useRef, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import PartnerProgramTab from '../components/accountant-partner/PartnerProgramTab'
import FreelanceTab from '../components/accountant-partner/FreelanceTab'
import JobsTab from '../components/accountant-partner/JobsTab'

// TODO: Confirm the real accountant application URL. Mirrors the creative flow
// (/apply/creative) used on the designers-and-editors partner page.
const SIGNUP_URL = 'https://squadhire.upsquadconnect.com/apply/accountant'

// TODO: Replace with the real hero video (mp4 URL, or a YouTube / Vimeo / Loom
// link — HeroMedia auto-embeds those). Using a sample clip as a placeholder.
const HERO_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4'

const TABS = [
  { id: 'partner', label: 'Partner Program' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'jobs', label: 'Jobs' },
]

const heroCopy = {
  partner: {
    badge: 'Now accepting accountant partners',
    desc: 'Partner with UpSquad and focus only on the numbers — we handle the sales, marketing, client support, and payments while you work with assigned businesses on their books, GST, payroll, and reporting.',
  },
  freelance: {
    badge: 'New · One-time assignments',
    desc: 'Pick up standalone accounting and compliance assignments — a GST filing, a book clean-up, a year-end close — with a fixed fee and a clear timeline. Take what fits your schedule, deliver, and get paid.',
  },
  jobs: {
    badge: 'New · Full-time & part-time roles',
    desc: 'Browse full-time and part-time accounting roles from companies hiring through UpSquad. Find a role that matches your preference and apply directly.',
  },
}

/* ── component ────────────────────────────────────────── */

export default function AccountantPartnerProgram() {
  const [tab, setTab] = useState('partner')
  const tabsRef = useRef(null)

  // Switch tab, then align the tab bar just under the fixed navbar so the
  // chosen panel is shown from its top.
  const goToTab = (id) => {
    setTab(id)
    requestAnimationFrame(() => {
      const el = tabsRef.current
      if (!el) return
      // Read the tab bar's natural document position. getBoundingClientRect() and
      // offsetTop both report the *stuck* position once the sticky bar is pinned,
      // so the scroll target would collapse to the current scroll and leave you
      // mid-panel when switching tabs after scrolling down. Briefly neutralising
      // `position` exposes the in-flow position (no repaint between sync writes).
      const saved = el.style.position
      el.style.position = 'static'
      const top = el.getBoundingClientRect().top + window.scrollY
      el.style.position = saved
      window.scrollTo({ top: Math.max(0, top - 56), behavior: 'smooth' })
    })
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
                For accountants &amp; bookkeepers
              </span>
            </h1>

            <p className="text-lg text-text-secondary leading-[1.7] mb-8">
              {copy.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Sign Up Now
              </a>
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
        className="sticky top-14 z-40 border-y border-[rgba(96,96,163,0.2)] bg-[#F7F6F3]/95 backdrop-blur-md"
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
                    active ? 'bg-brand-purple text-text-primary' : 'text-text-secondary hover:text-text-primary'
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
