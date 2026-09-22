"use client"
import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'

const faqs = [
  {
    q: 'How does the Agency Partner Program differ from individual talent programs?',
    a: 'Individual talent join UpSquad as solo specialists assigned to individual deliverables. Agencies join as structured organizations with dedicated team rosters, capable of deploying multi-skilled pods, fractional resources, or complete squads across both monthly retainers and project sprints.',
  },
  {
    q: 'Can our agency take both Subscriptions and one-time Assignments?',
    a: 'Yes, absolutely. Many partner agencies maintain ongoing monthly retainers with assigned subscription clients for predictable MRR, while also picking up high-ticket project assignments whenever internal bench capacity opens up.',
  },
  {
    q: 'Who manages direct client communication and scope creep?',
    a: 'UpSquad assigns a dedicated Client Success Manager to every client account. The manager handles onboarding, scope definition, contracts, and revisions. Your agency team focuses purely on creative and technical execution without getting bogged down in billing friction or scope negotiations.',
  },
  {
    q: 'How and when are payments disbursed to our agency?',
    a: 'For Subscription retainers, payouts are processed automatically every month on a predictable date for each active account. For Assignments, client funds are secured in escrow upfront and released to your agency immediately upon milestone sign-off. We support direct NEFT/RTGS bank transfers in India and international wire/SWIFT payouts globally.',
  },
  {
    q: 'What are the criteria to qualify as a certified agency partner?',
    a: 'We evaluate agencies on three core pillars: a verified track record with case studies or client references, reliable team bandwidth (minimum of 2 full-time or dedicated practitioners in your discipline), and commitment to agreed quality SLAs and turnaround times.',
  },
  {
    q: 'How does client ownership and white-label delivery work?',
    a: 'All client accounts, contracts, and portfolios are owned and managed by UpSquad. Delivery runs through UpSquad-managed workspaces and quality standards, allowing your agency team to focus 100% on execution without administrative or client-management burden.',
  },
]

export default function AgencyFaq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <ScrollReveal>
      <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Frequently Asked Questions
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              Agency Partner FAQ
            </h2>
            <p className="text-sm text-text-secondary mt-2">
              Everything you need to know about partnering your agency with UpSquad.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-sm sm:text-base font-bold text-text-primary">
                      {faq.q}
                    </span>
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-secondary text-text-primary transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-brand-accent text-black' : ''
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-[rgba(0,0,0,0.04)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
