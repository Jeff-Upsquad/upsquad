"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import WorkModeNav, { scrollToWorkMode } from '../components/landing/WorkModeNav'
import WorkModeOverview from '../components/landing/WorkModeOverview'
import PartnerSignupLink from '../components/PartnerSignupLink'
import WhatsAppIcon from '../components/WhatsAppIcon'
import { useLanguageGate } from '../lib/useLanguageGate'
import { fetchLandingPage } from '../lib/landingPageApi'
import { getFallback } from '../data/landingPageFallbacks'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'
import { partnerWaLink } from '../lib/partnerWhatsapp'

// Common entry point for every partner track. Role-specific detail lives on the
// dedicated /partner-program/<track>/ pages; this hub routes people to the right one.
const LANDING_SLUG = 'partners'
const CTA_SLUG = 'general'

const NAV_BLURBS = {
  subscription: 'Assigned clients',
  assignments: 'Per project',
  hiring: 'Full & part-time',
}

/* ── Data: partner tracks ──────────────────────────────── */
const tracks = [
  {
    id: 'creative',
    emoji: '🎨',
    name: 'Designers & Video Editors',
    desc: 'Graphic designers, motion designers, and video editors working with brands on ongoing creative.',
    href: '/partner-program/designer-and-video-editor/',
    waSlug: 'designer-and-video-editor',
  },
  {
    id: 'accountant',
    emoji: '📒',
    name: 'Accountants',
    desc: 'Bookkeeping, GST, TDS, and compliance professionals keeping client books current.',
    href: '/partner-program/accountant/',
    waSlug: 'accountant',
  },
  {
    id: 'sales',
    emoji: '📈',
    name: 'Sales',
    desc: 'Lead generation, outbound, and closing specialists who help brands grow revenue.',
    href: '/partner-program/sales/',
    waSlug: 'sales',
  },
  {
    id: 'agency',
    emoji: '🏢',
    name: 'Agencies',
    desc: 'Studios and agencies delivering client squads and project assignments as a team.',
    href: '/partner-program/agency/',
    waSlug: 'agency',
  },
  {
    id: 'general',
    emoji: '✨',
    name: 'Every other role',
    desc: 'Marketing, tech, writing, social media, and more — freelancers of every role are welcome.',
    href: '/partner-program/general/',
    waSlug: 'general',
  },
]

/* ── Data: Subscription ────────────────────────────────── */
const handledByUs = [
  { title: 'Sales & lead generation', desc: 'We find and close clients — you never have to pitch.' },
  { title: 'Marketing & branding', desc: 'We promote your skills to the right audience.' },
  { title: 'Client support', desc: 'We handle communication, revisions, and feedback loops.' },
  { title: 'Payments & invoicing', desc: 'Guaranteed monthly payments — no chasing invoices.' },
  { title: 'Squad Manager', desc: 'A dedicated manager coordinates with clients on your behalf.' },
]

const subscriptionSteps = [
  {
    number: '01',
    title: 'We create your profile',
    description: 'Share your details, skills, and portfolio. We build a professional profile that showcases your best work.',
  },
  {
    number: '02',
    title: 'Your profile goes to clients',
    description: 'Your profile is shared with active clients looking for talent that matches your skillset.',
  },
  {
    number: '03',
    title: 'A client selects you',
    description: 'Once picked, the client is assigned to you and you start working with guidance from your Squad Manager.',
  },
]

const subscriptionPerks = [
  'Set your own virtual office hours — full-time or part-time',
  'Guaranteed monthly payment for each client assigned',
  'No contracts or lock-ins — quit or switch clients anytime',
]

/* ── Data: Assignments ─────────────────────────────────── */
const assignmentSteps = [
  { number: '1', title: 'Browse open assignments', description: 'Each one lists the scope, fixed fee, and deadline upfront.' },
  { number: '2', title: 'Claim what fits', description: 'Pick work that matches your skills and free time. No bidding, no pitching.' },
  { number: '3', title: 'Deliver on time', description: 'Your Squad Manager is on hand if a brief needs clarifying.' },
  { number: '4', title: 'Get paid', description: 'Once the delivery is approved, the agreed fixed fee is released to you.' },
]

const sampleAssignments = [
  { track: 'Design', title: 'Social media creative pack (8)' },
  { track: 'Video', title: 'Short-form reel edit' },
  { track: 'Sales', title: 'Lead-list build (200 contacts)' },
  { track: 'Sales', title: 'Outbound email campaign' },
  { track: 'Accounts', title: 'Monthly GST filing' },
  { track: 'Accounts', title: 'Bookkeeping catch-up' },
]

/* ── Data: Jobs ────────────────────────────────────────── */
const jobSteps = [
  { n: '1', t: 'Set your preferences', d: 'Tell us your role, skills, expected salary, and where you want to work.' },
  { n: '2', t: 'Browse matching openings', d: 'Full-time and part-time roles from companies and brands hiring through UpSquad.' },
  { n: '3', t: 'Apply & interview', d: 'Apply to openings that fit. We help you prepare and connect you with the company.' },
  { n: '4', t: 'Get hired', d: 'Accept the offer and start your new role — full-time or part-time.' },
]

function SectionEyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="h-px w-8 accent-bar" />
      <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">{children}</span>
    </div>
  )
}

function Check() {
  return (
    <span className="inline-flex w-5 h-5 shrink-0 rounded-full border border-text-primary items-center justify-center bg-brand-accent text-black">
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export default function PartnerProgramHub() {
  useLandingScrollReset()

  const [content, setContent] = useState(getFallback(LANDING_SLUG))
  const signupUrl = usePartnerSignupUrl(CTA_SLUG)

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

  return (
    <div className="pt-20 pb-0 bg-surface-primary">
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white bg-dot-pattern border-b border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-primary bg-brand-accent/50 border border-black/15 px-3 py-1.5 rounded-full mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Now accepting partners &middot; Every role
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-[-0.03em] text-text-primary">
                {content.heroTitle || 'UpSquad Partner Program'}
                <span className="block mt-3 text-2xl sm:text-3xl font-bold text-text-secondary">
                  You do the work.{' '}
                  <span
                    className="bg-no-repeat box-decoration-clone text-text-primary"
                    style={{
                      backgroundImage:
                        'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                    }}
                  >
                    We bring the clients.
                  </span>
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
                {content.heroDescription}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#tracks" className="btn-gradient font-semibold text-sm px-6 py-3.5">
                  Find your track &darr;
                </a>
                <PartnerSignupLink
                  href={signupUrl}
                  className="btn-secondary font-semibold text-sm px-5 py-3.5"
                >
                  Sign Up Now
                </PartnerSignupLink>
                <a
                  href={partnerWaLink(CTA_SLUG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-3.5 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  Connect on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
                {['No pitching or bidding', 'Guaranteed monthly pay', 'Quit or switch anytime'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>

              {hasLangChooser && (
                <button
                  type="button"
                  onClick={() => setGateOpen(true)}
                  aria-label="Change language"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-[rgba(0,0,0,0.08)] rounded-full px-3 py-1.5 hover:border-gray-300 bg-white"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
                  </svg>
                  Language: {selected?.name || 'English'}
                </button>
              )}
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15}>
            <HeroMedia
              videoUrl={selected?.videoUrl || previewUrl}
              previewUrl={previewUrl}
              autoPlay={pendingPlay}
              onRequestGate={requestPlay}
            />
          </ScrollReveal>
        </div>

        <LanguageGate
          open={gateOpen}
          languages={content.languages || []}
          selectedCode={selectedCode}
          onSelect={onSelectLanguage}
          onDismiss={() => setGateOpen(false)}
        />
      </section>

      {/* ── 2. Tracks (#tracks) ─────────────────────────── */}
      <section id="tracks" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Choose your track</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              One partner program. A track for every role.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Pick the track that fits what you do to see role-specific details, examples, and the sign-up link for it.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mt-10">
            {tracks.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.05}>
                <div className="group h-full rounded-2xl p-6 bg-white border-[1.5px] border-black/10 flex flex-col transition-all duration-short hover:-translate-y-1 hover:border-text-primary hover:shadow-card-hover">
                  <span className="text-3xl leading-none">{t.emoji}</span>
                  <h3 className="font-heading text-lg font-bold text-text-primary mt-4">{t.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1.5 flex-1">{t.desc}</p>
                  <div className="mt-5 pt-4 border-t border-black/[0.08] flex items-center justify-between gap-3">
                    <Link href={t.href} className="text-sm font-semibold text-text-primary hover:underline">
                      Explore track &rarr;
                    </Link>
                    <a
                      href={partnerWaLink(t.waSlug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat about the ${t.name} track on WhatsApp`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted hover:text-text-primary"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      Ask
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Work modes nav & overview ────────────────── */}
      <WorkModeNav blurbs={NAV_BLURBS} />
      <WorkModeOverview variant="partners" />

      {/* ── 4. Subscription (#subscription) ─────────────── */}
      <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 01 &middot; Subscription</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Ongoing clients. Monthly pay. Zero selling.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              We run the business side so you can focus on your craft. Clients are assigned to you and you&rsquo;re paid every month for each one.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6 mt-10">
            <ScrollReveal>
              <div className="h-full bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06]">
                <h3 className="font-heading text-lg font-bold text-text-primary mb-5">What UpSquad handles</h3>
                <ul className="space-y-4">
                  {handledByUs.map((h) => (
                    <li key={h.title} className="flex gap-3">
                      <Check />
                      <span>
                        <span className="block text-sm font-semibold text-text-primary">{h.title}</span>
                        <span className="block text-sm text-text-secondary mt-0.5">{h.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="h-full bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06]">
                <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How it works</h3>
                <ol className="space-y-5">
                  {subscriptionSteps.map((s) => (
                    <li key={s.number} className="flex gap-4">
                      <span className="font-mono-tech text-xs font-bold text-text-muted pt-1 w-6 shrink-0">{s.number}</span>
                      <span>
                        <span className="block text-sm font-semibold text-text-primary">{s.title}</span>
                        <span className="block text-sm text-text-secondary mt-0.5 leading-relaxed">{s.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 pt-5 border-t border-black/[0.06] space-y-2">
                  {subscriptionPerks.map((p) => (
                    <p key={p} className="text-sm text-text-primary flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-text-primary shrink-0" />
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. Assignments (#assignments) ───────────────── */}
      <section id="assignments" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 02 &middot; Assignments</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Take on one-time work when it suits you.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Standalone assignments with the fee and deadline fixed before you start. Take what fits your schedule and skip the rest.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {assignmentSteps.map((s, i) => (
              <ScrollReveal key={s.number} delay={i * 0.05}>
                <div className="h-full rounded-2xl p-5 bg-surface-secondary border border-black/[0.06]">
                  <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center bg-brand-accent text-black border border-text-primary text-sm font-bold">
                    {s.number}
                  </span>
                  <h3 className="font-heading text-base font-bold text-text-primary mt-4">{s.title}</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <h3 className="font-heading text-lg font-bold text-text-primary mt-12 mb-4">Examples across tracks</h3>
            <div className="flex flex-wrap gap-2">
              {sampleAssignments.map((a) => (
                <span
                  key={a.title}
                  className="inline-flex items-center gap-2 text-sm text-text-primary bg-surface-secondary border border-black/[0.08] rounded-full pl-2 pr-3.5 py-1.5"
                >
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider bg-white border border-black/[0.08] text-text-muted px-2 py-0.5 rounded-full">
                    {a.track}
                  </span>
                  {a.title}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. Jobs (#hire) ─────────────────────────────── */}
      <section id="hire" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 03 &middot; Jobs</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Looking for a full-time or part-time role?
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Companies and brands hire through UpSquad. Tell us what you&rsquo;re looking for and apply to openings that match.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {jobSteps.map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 0.05}>
                <div className="h-full rounded-2xl p-5 bg-white border border-black/[0.06]">
                  <span className="font-mono-tech text-xs font-bold text-text-muted">Step {s.n}</span>
                  <h3 className="font-heading text-base font-bold text-text-primary mt-2">{s.t}</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{s.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Bottom CTA ───────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 bg-[#0A0A0A] text-white">
        <div className="max-w-[1160px] mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1.5 rounded-full mb-6">
              Ready to partner with UpSquad?
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
              Focus on your craft. Leave the rest to us.
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Sign up once to get started with subscriptions, assignments, and jobs — or pick your track above for role-specific details.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PartnerSignupLink
                href={signupUrl}
                className="bg-white text-black font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-neutral-100 transition-colors shadow-lg"
              >
                Sign Up Now &rarr;
              </PartnerSignupLink>
              <a
                href={partnerWaLink(CTA_SLUG)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-medium text-sm px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Connect on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => scrollToWorkMode('subscription')}
                className="text-sm font-medium text-white/70 hover:text-white px-2 py-3.5"
              >
                Compare ways to earn
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
