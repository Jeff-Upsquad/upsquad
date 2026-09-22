"use client"
import ScrollReveal from '../ScrollReveal'

const upsquadHandles = [
  {
    title: 'Inbound Client Acquisition',
    desc: 'We market globally and close client subscriptions — your agency never has to pitch or compete in RFPs.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Pre-vetted Scoping & Briefs',
    desc: 'We define client expectations, scope, and deliverables before kickoff so your team has complete clarity.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Invoicing, Billing & Risk',
    desc: 'We handle recurring international credit cards, wire transfers, and currency conversions with guaranteed disbursements.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Client Success Lead',
    desc: 'An UpSquad client manager bridges communication, triage requests, and keeps feedback constructive.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: 'Account Retention & Expansion',
    desc: 'We work actively to renew subscriptions and upsell multi-squad engagements for long-term partner growth.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

const partnerFocus = [
  {
    title: 'Assigned Ongoing Accounts',
    desc: 'Your agency is assigned one or more recurring subscription accounts. Steady, recurring retainer revenue without seasonal dry spells.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Guaranteed Monthly Retainer',
    desc: 'Predictable recurring payouts deposited on schedule every month for each active client squad. No unpaid invoices or late fees.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Zero Customer Acquisition Cost (CAC)',
    desc: 'Eliminate business development spend, proposal writing, and chasing leads. We deliver closed subscription accounts directly to you.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Flexible Agency Bandwidth',
    desc: 'Deploy full dedicated squads, fractional pods, or specialist benches depending on your internal agency utilization.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: 'White-Label Delivery',
    desc: 'Operate seamlessly under UpSquad delivery standards and infrastructure — UpSquad manages the client relationships, contracts, and portfolio while your agency team focuses purely on execution.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

const gettingStartedSteps = [
  {
    number: '1',
    title: 'Apply & Showcase Capabilities',
    description: 'Submit your agency profile, core specialties, verified case studies, and available delivery capacity across our squads.',
  },
  {
    number: '2',
    title: 'Squad Certification & Alignment',
    description: 'Our partner team conducts a fast capability review, approves your eligible squad categories, and defines SLA guidelines.',
  },
  {
    number: '3',
    title: 'Account Matching & Monthly Revenue',
    description: 'We match your agency with active subscription clients. Your squad executes, UpSquad handles client success, and you earn monthly retainers.',
  },
]

export default function AgencySubscriptionTab() {
  return (
    <>
      {/* ── How the Subscription Program works ─────────── */}
      <ScrollReveal>
        <section className="relative py-16 px-5 sm:px-8 bg-surface-secondary overflow-hidden">
          <div className="relative max-w-[1160px] mx-auto">
            {/* Header */}
            <div className="mb-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-px bg-brand-purple" />
                <p className="text-[11px] font-bold text-text-primary uppercase tracking-[0.2em]">
                  Subscription Model · Recurring Retainers
                </p>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
                Stop pitching.{' '}
                <span className="italic font-medium text-text-muted">Scale monthly retainer revenue.</span>
              </h2>
              <p className="text-base text-text-secondary leading-relaxed mt-4">
                You are assigned ongoing client accounts tailored to your agency&apos;s squad domain. Your team focuses
                purely on high-quality delivery, while UpSquad handles global marketing, inbound sales, contract billing,
                and client retention.
              </p>
            </div>

            {/* Two columns: what you get vs what we handle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What your agency gets */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-brand-purple" />
                  <h3 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider">
                    What your agency gets
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {partnerFocus.map((item) => (
                    <div
                      key={item.title}
                      className="relative bg-brand-purple/5 rounded-xl p-5 border border-brand-purple/20 hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-white border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center shadow-sm mb-3">
                        {item.icon}
                      </div>
                      <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What UpSquad handles */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-text-primary" />
                  <h3 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider">
                    What UpSquad handles
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {upsquadHandles.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white rounded-xl p-5 border border-[rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center mb-3">
                        {item.icon}
                      </div>
                      <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── 3-Step Agency Onboarding ──────────────────────── */}
      <ScrollReveal>
        <section className="py-16 px-5 sm:px-8 bg-white border-b border-[rgba(0,0,0,0.08)]">
          <div className="max-w-[1160px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted">
                Simple & Transparent
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-2">
                How agency partnership works
              </h3>
              <p className="text-sm text-text-secondary mt-2">
                From initial application to active monthly payouts in 3 clear steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gettingStartedSteps.map((step) => (
                <div
                  key={step.number}
                  className="relative p-6 rounded-2xl bg-surface-secondary border border-[rgba(0,0,0,0.08)] flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-accent text-black font-bold text-base border border-text-primary shadow-brutal-sm mb-4">
                      {step.number}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-text-primary mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
