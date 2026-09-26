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
import ProductStatusBadge from '../components/ProductStatusBadge'
import { useLanguageGate } from '../lib/useLanguageGate'
import { fetchLandingPage } from '../lib/landingPageApi'
import { getFallback } from '../data/landingPageFallbacks'
import { useLandingScrollReset } from '../lib/useLandingScrollReset'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'
import { partnerWaLink } from '../lib/partnerWhatsapp'
import { squads } from '../data/squads'

const LANDING_SLUG = 'partners'
// The common page routes sign-ups and WhatsApp chats through the general
// partner program, whose CRM keyword rule ("partner program") already exists.
const CTA_SLUG = 'general'

/* ── Data: Partner programs ────────────────────────────── */
const programs = [
  {
    slug: 'designer-and-video-editor',
    emoji: '🎨',
    name: 'Designers & Video Editors',
    audience: 'Freelance creatives',
    desc: 'Work with brands on social creatives, reels, YouTube edits, and brand design — on assigned subscriptions or one-off projects.',
    points: ['Assigned brand clients', 'Design & video assignments', 'Creative job openings'],
    href: '/partner-program/designer-and-video-editor/',
  },
  {
    slug: 'accountant',
    emoji: '🧾',
    name: 'Accountants',
    audience: 'Accountants & bookkeepers',
    desc: 'Handle bookkeeping, GST, TDS, and compliance for assigned businesses. We bring the clients — you focus on the numbers.',
    points: ['Assigned business clients', 'Filing & bookkeeping assignments', 'Accounting job openings'],
    href: '/partner-program/accountant/',
  },
  {
    slug: 'sales',
    emoji: '📈',
    name: 'Sales Professionals',
    audience: 'Sales & business development',
    desc: 'Sell for businesses assigned to you, pick up one-time lead-gen and outreach assignments, or land a full-time sales role.',
    points: ['Assigned businesses to sell for', 'Lead-gen & outreach assignments', 'Sales job openings'],
    href: '/partner-program/sales/',
  },
  {
    slug: 'agency',
    emoji: '🏢',
    name: 'Agencies',
    audience: 'Studios & agencies',
    desc: 'Deliver recurring client squads and claim high-ticket project assignments across all 6 squads — without spending on sales.',
    points: ['Recurring client subscriptions', 'High-ticket project assignments', 'Scale across every squad'],
    href: '/partner-program/agency/',
  },
  {
    slug: 'general',
    emoji: '✨',
    name: 'Every other role',
    audience: 'Freelancers of every kind',
    desc: 'Writers, marketers, developers, legal and HR specialists — if you have a skill brands need, there’s a place for you.',
    points: ['Subscriptions as squads launch', 'Open assignments in your field', 'Full-time & part-time jobs'],
    href: '/partner-program/general/',
  },
]

/* ── Data: What UpSquad handles ────────────────────────── */
const upsquadHandles = [
  { title: 'Sales & lead generation', desc: 'We find and close the clients — you never have to pitch.' },
  { title: 'Marketing & branding', desc: 'We promote your skills to the businesses that need them.' },
  { title: 'Client support', desc: 'A Squad Manager handles communication, feedback, and revisions.' },
  { title: 'Payments & invoicing', desc: 'Guaranteed payouts on schedule — no chasing invoices.' },
]

/* ── Data: Subscription ────────────────────────────────── */
const subscriptionSteps = [
  {
    number: '01',
    title: 'Apply & get vetted',
    description: 'Share your skills, experience, and portfolio. We review your work and build a professional profile for you.',
  },
  {
    number: '02',
    title: 'Get matched with clients',
    description: 'Your profile is presented to subscribing businesses. Once a client picks you, a Squad Manager onboards you both.',
  },
  {
    number: '03',
    title: 'Work & get paid monthly',
    description: 'Deliver during your own virtual office hours. Get a guaranteed monthly payment for every client assigned to you.',
  },
]

const subscriptionPerks = [
  'Steady monthly income for each assigned client',
  'Set your own virtual office hours — full-time or part-time',
  'A dedicated Squad Manager handles the client side',
  'Take on more clients as you grow',
  'No contracts — quit or switch clients anytime',
  'Work remotely, from anywhere',
]

/* ── Data: Assignments ─────────────────────────────────── */
const assignmentSteps = [
  { number: '1', title: 'Browse open assignments', description: 'See one-off tasks with scope, deadline, and payout listed upfront.' },
  { number: '2', title: 'Claim what fits', description: 'Pick the work that matches your skills and schedule.' },
  { number: '3', title: 'Deliver on time', description: 'Complete the task by the deadline, with Squad Manager support if needed.' },
  { number: '4', title: 'Get paid', description: 'Your fixed payout is released once the delivery is approved.' },
]

const sampleAssignments = [
  { category: 'Creative', title: 'Social media creative pack (8)', payout: '₹1,800', timeline: '3 days', tag: 'Design' },
  { category: 'Creative', title: 'Short-form reel edit', payout: '₹1,500', timeline: '2 days', tag: 'Video' },
  { category: 'Finance', title: 'Monthly GST filing', payout: '₹2,000', timeline: '3 days', tag: 'Tax' },
  { category: 'Finance', title: 'Bookkeeping catch-up', payout: '₹2,800', timeline: '4 days', tag: 'Books' },
  { category: 'Sales', title: 'Lead-list build (200 contacts)', payout: '₹2,200', timeline: '4 days', tag: 'Lead gen' },
  { category: 'Sales', title: 'Outbound email campaign', payout: '₹2,500', timeline: '4 days', tag: 'Outreach' },
]

const ASSIGNMENT_FILTERS = ['All', 'Creative', 'Finance', 'Sales']

/* ── Data: Jobs ────────────────────────────────────────── */
const jobSteps = [
  { n: '1', t: 'Set your preferences', d: 'Role, full-time or part-time, location, and expected salary.' },
  { n: '2', t: 'Browse matching openings', d: 'Roles from businesses hiring through UpSquad, matched to you.' },
  { n: '3', t: 'Apply & interview', d: 'Apply directly and interview with the hiring company.' },
  { n: '4', t: 'Get hired', d: 'Join their team on their payroll — we help you through the process.' },
]

const sampleJobs = [
  { title: 'Graphic Designer', type: 'Full-time', salary: '₹18,000 – ₹25,000 / month', program: 'Creative' },
  { title: 'Junior Accountant', type: 'Full-time', salary: '₹22,000 – ₹30,000 / month', program: 'Finance' },
  { title: 'Inside Sales Executive', type: 'Part-time', salary: '₹15,000 – ₹20,000 / month', program: 'Sales' },
]

/* ── Data: FAQ ─────────────────────────────────────────── */
const faqs = [
  {
    q: 'Which partner program should I join?',
    a: 'Pick the one that matches your main skill — designers and video editors, accountants, sales professionals, or agencies. If your role isn’t listed, join the general program and we’ll match you as squads launch.',
  },
  {
    q: 'Can I do subscriptions, assignments, and jobs together?',
    a: 'Yes. One sign-up gives you access to all three. Many partners keep an assigned client or two while picking up assignments in their free hours.',
  },
  {
    q: 'Do I need to find clients myself?',
    a: 'No. UpSquad handles sales, marketing, client support, and payments. You focus on delivering great work.',
  },
  {
    q: 'How and when do I get paid?',
    a: 'Subscription partners receive a guaranteed monthly payment per assigned client. Assignment payouts are released once the delivery is approved.',
  },
  {
    q: 'Is there a lock-in or contract?',
    a: 'No. You can pause, quit, or switch clients anytime.',
  },
  {
    q: 'Does it cost anything to join?',
    a: 'Joining the partner program, taking subscriptions, and claiming assignments is free. Job placements have a one-time fee, charged only after you’re hired and receive your first salary — see your program page for details.',
  },
]

function CheckDot() {
  return (
    <span className="inline-flex w-6 h-6 rounded-full bg-brand-purple text-white border border-text-primary items-center justify-center shrink-0 mt-0.5">
      <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function SectionEyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="h-px w-8 accent-bar" />
      <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">{children}</span>
    </div>
  )
}

export default function PartnerLandingPage() {
  useLandingScrollReset()

  const [content, setContent] = useState(
    getFallback(LANDING_SLUG) || {
      slug: LANDING_SLUG,
      heroDescription: '',
      defaultLanguageCode: 'en',
      languages: [],
    }
  )
  const [activeSquadTab, setActiveSquadTab] = useState('content-creation')
  const [assignmentFilter, setAssignmentFilter] = useState('All')
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

  const filteredAssignments =
    assignmentFilter === 'All'
      ? sampleAssignments
      : sampleAssignments.filter((a) => a.category === assignmentFilter)

  const scrollToPrograms = () => {
    const el = document.getElementById('programs')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <div className="pt-20 pb-0 bg-surface-primary">
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-primary bg-[#FFFF99]/50 border border-black/15 px-3 py-1.5 rounded-full mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                UpSquad Partner Program &middot; Freelancers &amp; Agencies
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-[-0.03em] text-text-primary">
                Do what you&rsquo;re best at —{' '}
                <span
                  className="bg-no-repeat box-decoration-clone"
                  style={{
                    backgroundImage:
                      'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                  }}
                >
                  we bring the clients.
                </span>
                <br />
                <span className="italic font-bold text-text-secondary text-3xl sm:text-4xl">
                  Subscriptions, assignments &amp; jobs.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
                {content.heroDescription ||
                  'One partner program for designers, video editors, accountants, sales professionals, agencies, and every other skill brands need. We handle sales, marketing, client support, and payments — you do the work you love.'}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToPrograms}
                  className="btn-gradient font-semibold text-sm px-6 py-3.5"
                >
                  Find your program &rarr;
                </button>
                <PartnerSignupLink href={signupUrl} className="btn-secondary font-semibold text-sm px-5 py-3.5">
                  Sign up now
                </PartnerSignupLink>
                <a
                  href={partnerWaLink(CTA_SLUG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-3.5 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-muted">
                {['Free to join', 'Guaranteed payouts', 'No lock-in'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

          <ScrollReveal delay={0.15}>
            <div className="relative">
              <HeroMedia
                videoUrl={selected?.videoUrl || previewUrl}
                previewUrl={previewUrl}
                autoPlay={pendingPlay}
                onRequestGate={requestPlay}
              />
              <p className="text-center text-xs text-text-muted mt-3">
                Watch: How the UpSquad Partner Program works
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {hasLangChooser && (
        <LanguageGate
          open={gateOpen}
          onDismiss={() => setGateOpen(false)}
          languages={content.languages || []}
          selectedCode={selectedCode}
          onSelect={onSelectLanguage}
        />
      )}

      {/* ── 2. Choose your program (#programs) ──────────── */}
      <section id="programs" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Choose your program</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              One partner program. A track for every kind of talent.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Every track includes subscriptions, assignments, and jobs. Pick the one that matches your
              skill to see the details, payouts, and openings for your role.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {programs.map((p, i) => (
              <ScrollReveal key={p.slug} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl p-6 bg-white border border-black/[0.08] shadow-xs hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl" aria-hidden>{p.emoji}</span>
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      {p.audience}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-primary">{p.name}</h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">{p.desc}</p>
                  <ul className="mt-4 pt-4 border-t border-black/[0.06] space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex items-center gap-2">
                    <Link
                      href={p.href}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/90 transition-colors"
                    >
                      Explore program &rarr;
                    </Link>
                    <a
                      href={partnerWaLink(p.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat on WhatsApp about the ${p.name} program`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-black/10 hover:border-black/30 transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* What UpSquad handles */}
            <ScrollReveal delay={0.08}>
              <div className="h-full rounded-2xl p-6 border-[1.5px] border-black bg-brand-purple/15 shadow-brutal flex flex-col">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  In every program
                </span>
                <h3 className="font-heading text-xl font-extrabold text-text-primary mt-1">
                  We handle the business. You do the work.
                </h3>
                <ul className="mt-4 space-y-3">
                  {upsquadHandles.map((h) => (
                    <li key={h.title} className="flex items-start gap-2.5">
                      <CheckDot />
                      <span className="text-sm text-text-secondary leading-snug">
                        <span className="font-semibold text-text-primary">{h.title}</span> — {h.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 3. Mode nav & overview ──────────────────────── */}
      <WorkModeNav variant="partners" />
      <WorkModeOverview variant="partners" />

      {/* ── 4. Subscription (#subscription) ─────────────── */}
      <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 01 &middot; Subscription</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Get assigned clients. Get paid every month.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Businesses subscribe to UpSquad squads — and those squads are made of partners like you.
              Get matched with ongoing clients in your field and build steady, recurring income.
            </p>
          </ScrollReveal>

          <div className="mt-12">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How a subscription works for partners</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionSteps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                      {step.number}
                    </span>
                    <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">{step.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-5">Why partner on subscription</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
                {subscriptionPerks.map((p) => (
                  <div key={p} className="flex items-start gap-3">
                    <CheckDot />
                    <p className="text-sm text-text-secondary leading-snug">{p}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Squads & roles open to partners */}
          <div className="mt-16">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">Roles across all 6 squads</h3>
              <p className="text-sm text-text-secondary mb-6">
                Live squads are onboarding partners now. Join the waitlist for the rest and we&rsquo;ll reach out as they launch.
              </p>

              <div className="flex flex-wrap gap-2 pb-2 border-b border-black/[0.08]">
                {squads.map((squad) => (
                  <button
                    key={squad.id}
                    type="button"
                    onClick={() => setActiveSquadTab(squad.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeSquadTab === squad.id
                        ? 'bg-[#0A0A0A] text-white shadow-md'
                        : 'bg-white text-text-secondary hover:text-text-primary border border-black/[0.06]'
                    }`}
                  >
                    <span className="text-base leading-none">{squad.emoji}</span>
                    <span>{squad.name}</span>
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {(() => {
              const squad = squads.find((s) => s.id === activeSquadTab) || squads[0]
              const programHref =
                squad.id === 'content-creation'
                  ? '/partner-program/designer-and-video-editor/'
                  : squad.id === 'accounts-finance'
                  ? '/partner-program/accountant/'
                  : '/partner-program/general/'
              return (
                <ScrollReveal key={squad.id}>
                  <div className="mt-6 bg-white rounded-2xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-black/[0.06]">
                      <div>
                        <h4 className="font-heading text-2xl font-bold text-text-primary flex items-center gap-2.5">
                          <span>{squad.emoji}</span>
                          <span>{squad.name} Squad</span>
                        </h4>
                        <p className="text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">{squad.description}</p>
                      </div>
                      <Link
                        href={programHref}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/90 transition-colors shrink-0"
                      >
                        Partner in this squad &rarr;
                      </Link>
                    </div>
                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {squad.products.map((product) => (
                        <div
                          key={product.name}
                          className="p-4 rounded-xl border bg-surface-secondary/60 border-black/[0.06] h-full"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2.5">
                            <span className="text-2xl shrink-0" aria-hidden>{product.emoji}</span>
                            <ProductStatusBadge status={product.status} />
                          </div>
                          <h5 className="font-heading font-semibold text-sm text-text-primary">{product.name}</h5>
                          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{product.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ── 5. Assignments (#assignments) ───────────────── */}
      <section id="assignments" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 02 &middot; Assignments</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Pick up one-off work — fixed payout, fixed deadline.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Prefer flexibility? Claim standalone assignments that fit your schedule. Every assignment lists
              the <span className="font-semibold text-text-primary">payout</span> and{' '}
              <span className="font-semibold text-text-primary">deadline</span> upfront — deliver, get approved,
              and get paid.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {assignmentSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.08}>
                <div className="bg-surface-secondary rounded-xl p-6 border border-[rgba(0,0,0,0.08)] h-full">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                    {step.number}
                  </span>
                  <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">{step.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-14 flex items-center justify-between flex-wrap gap-3 mb-6">
              <h3 className="font-heading text-lg font-bold text-text-primary">Sample assignments</h3>
              <div className="flex gap-1.5 bg-surface-secondary p-1 rounded-lg border border-black/[0.08]">
                {ASSIGNMENT_FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setAssignmentFilter(f)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      assignmentFilter === f ? 'bg-[#0A0A0A] text-white shadow-xs' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssignments.map((a) => (
                <div
                  key={a.title}
                  className="bg-surface-secondary rounded-xl p-6 border border-[rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-brand-purple/20 border-[rgba(0,0,0,0.08)] text-text-primary">
                        {a.category} &middot; {a.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted font-mono">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {a.timeline}
                      </span>
                    </div>
                    <h4 className="font-heading text-base font-semibold text-text-primary mb-4 leading-snug">{a.title}</h4>
                  </div>
                  <div className="pt-3 border-t border-[rgba(0,0,0,0.08)]">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider block">You earn</span>
                    <span className="font-heading text-xl font-extrabold text-text-primary font-mono">{a.payout}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Sample assignments for illustration. Live assignments, payouts, and deadlines appear after you sign up.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 6. Jobs (#hire) ─────────────────────────────── */}
      <section id="hire" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary border-t border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>Mode 03 &middot; Jobs</SectionEyebrow>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Looking for a{' '}
              <span className="relative inline-block">
                <span className="relative z-10">full-time or part-time</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-accent -z-0 rounded-sm" aria-hidden="true" />
              </span>{' '}
              role?
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Businesses hiring through UpSquad post openings for designers, editors, accountants, sales
              professionals, and more. Set your preferences and apply directly to roles that match.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {jobSteps.map((s) => (
                <div key={s.n} className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent text-black text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                    {s.n}
                  </span>
                  <h4 className="font-heading text-sm font-semibold text-text-primary mt-3">{s.t}</h4>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h3 className="font-heading text-lg font-bold text-text-primary mt-14 mb-5">Sample openings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleJobs.map((j) => (
                <div key={j.title} className="rounded-xl bg-white border border-[rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-brand-blue/20 border-[rgba(0,0,0,0.08)] text-text-primary">
                      {j.program}
                    </span>
                    <span className="text-xs font-medium text-text-muted">{j.type}</span>
                  </div>
                  <h4 className="font-heading text-base font-semibold text-text-primary">{j.title}</h4>
                  <p className="font-mono text-sm font-bold text-text-primary mt-3">{j.salary}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-4">
              * Sample openings for illustration. See your program page for current openings and placement fees.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────── */}
      <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white border-t border-black/[0.06]">
        <div className="max-w-[860px] mx-auto">
          <ScrollReveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-heading text-3xl font-extrabold text-text-primary tracking-[-0.025em]">
              Questions partners ask
            </h2>
            <div className="mt-8 divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm sm:text-base font-semibold text-text-primary">
                    {f.q}
                    <span className="text-lg text-text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 8. Bottom CTA ───────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 bg-[#0A0A0A] text-white">
        <div className="max-w-[1160px] mx-auto text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1.5 rounded-full mb-6">
              Ready to partner with UpSquad?
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
              Start earning with clients we bring to you.
            </h2>
            <p className="mt-4 text-white/70 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Sign up once to access assigned-client subscriptions, one-off assignments, and job openings.
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
                Talk on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
