"use client"
import { useEffect, useRef, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import AgencySubscriptionTab from '../components/agency-partner/AgencySubscriptionTab'
import AgencyAssignmentsTab from '../components/agency-partner/AgencyAssignmentsTab'
import AgencySquadsSection from '../components/agency-partner/AgencySquadsSection'
import AgencyFaq from '../components/agency-partner/AgencyFaq'
import PartnerSignupLink from '../components/PartnerSignupLink'
import { useLanguageGate } from '../lib/useLanguageGate'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'
import { partnerWaLink } from '../lib/partnerWhatsapp'
import WhatsAppIcon from '../components/WhatsAppIcon'

const LP_SLUG = 'partner-program-agency'
const LP_FALLBACK_SLUG = 'agency'
const CTA_SLUG = 'agency'

const TABS = [
  {
    id: 'subscription',
    label: 'Subscription',
    tagline: 'Ongoing & Retainer Accounts',
    desc: 'Assigned ongoing client squads with guaranteed monthly retainer payments.',
    meta: 'Monthly retainers',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'assignments',
    label: 'Assignments',
    tagline: 'Fixed-Scope & Project Sprints',
    desc: 'Standalone client projects with pre-scoped deliverables — claim directly or submit your bid.',
    meta: 'Per-project payouts',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const heroCopy = {
  subscription: {
    badge: 'Now accepting agency partners · Subscriptions',
    desc: 'Partner with UpSquad to scale your agency revenue without the overhead of sales or client acquisition. We bring the clients, handle billing and contracts, while your agency delivers through dedicated monthly subscriptions across any squad.',
  },
  assignments: {
    badge: 'New · High-ticket project sprints',
    desc: 'Keep your agency bench fully utilized. Pick up standalone, pre-scoped client projects with fixed pricing or submit your bid, with clear milestones across tech, content, marketing, finance, and legal.',
  },
  both: {
    badge: 'Now accepting agency partners · Retainers & Sprints',
    desc: 'Scale your agency with the best of both models. Anchor your baseline cash flow with recurring monthly client subscriptions, and take on high-margin project assignments whenever your team has available capacity.',
  },
}

export default function AgencyPartnerProgram() {
  const [languages, setLanguages] = useState([])
  const [defaultLanguageCode, setDefaultLanguageCode] = useState('en')
  const [tab, setTab] = useState('subscription')
  const tabsRef = useRef(null)
  const signupUrl = usePartnerSignupUrl(CTA_SLUG)
  const whatsappUrl = partnerWaLink(CTA_SLUG)

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
        if (!d) {
          return fetch(`/api/v1/landing-pages/${LP_FALLBACK_SLUG}`)
            .then((r) => (r.ok ? r.json() : null))
        }
        return d
      })
      .then((d) => {
        if (!d) return
        setLanguages(d.languages || [])
        if (d.defaultLanguageCode) setDefaultLanguageCode(d.defaultLanguageCode)
      })
      .catch(() => {})
  }, [])

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
    window.scrollTo({ top: Math.max(0, top - 56), behavior: 'instant' })
  }, [tab])

  const goToTab = (id) => {
    pendingScroll.current = true
    setTab(id)
  }

  const copy = heroCopy[tab]

  return (
    <div className="pt-20 pb-0">
      {/* ── Hero ────────────────────────────────────────── */}
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
                  agencies & service firms
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

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-secondary font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Connect on WhatsApp
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

      {/* ── Top-level Selector: Two Agency Partner Options ── */}
      <section ref={tabsRef} className="bg-white border-y border-[rgba(0,0,0,0.08)]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 pt-10 pb-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Partner with UpSquad
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-2">
              Two ways to partner — pick one or both
            </h2>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              Agencies can deliver through recurring subscription retainers, claim fixed-fee project assignments, or do both to maximize revenue and bench utilization.
            </p>
          </div>

          {/* Partner Cards */}
          <div
            role="tablist"
            aria-label="Choose how your agency partners"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
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
                      {tab === 'both' ? 'Active' : 'Selected'}
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

      {/* ── Active Panel ─────────────────────────────────── */}
      <div role="tabpanel">
        {tab === 'subscription' && <AgencySubscriptionTab />}
        {tab === 'assignments' && (
          <AgencyAssignmentsTab signupUrl={signupUrl} whatsappUrl={whatsappUrl} />
        )}
      </div>

      {/* ── Squads & Categories Section ──────────────────── */}
      <AgencySquadsSection />

      {/* ── Agency FAQ ───────────────────────────────────── */}
      <AgencyFaq />

      {/* ── Closing Action Section ───────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-text-primary text-white">
        <div className="max-w-[960px] mx-auto text-center">
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-brand-accent mb-3 block">
            Scale With UpSquad
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to scale your agency revenue?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join the UpSquad Agency Partner Network. Get assigned recurring client subscriptions or pick up scoped project assignments across all 6 squads.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PartnerSignupLink
              href={signupUrl}
              className="inline-flex items-center gap-2 bg-brand-accent text-black font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-yellow-300 transition-colors shadow-brutal"
            >
              Sign Up as Agency
            </PartnerSignupLink>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Connect on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
