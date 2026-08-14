"use client"
import ScrollReveal from '../ScrollReveal'
import { scrollToWorkMode } from './WorkModeNav'

// Compact definition cards that sit above the full-length sections so a visitor
// immediately understands the difference between Subscription, Assignments, and Jobs
// before diving into the detail.

const COPY = {
  creative: {
    intro:
      'Same vetted designers and video editors — three different ways to bring them onto your work. Pick the one that matches how often you need help.',
    modes: [
      {
        id: 'subscription',
        step: '01',
        name: 'Subscription',
        tagline: 'Your creative team, on a flat monthly plan',
        definition:
          'A dedicated squad of designers and editors, plus a Squad Manager for oversight and support. Send requests anytime, get steady on-brand work every week, and pause or cancel whenever you want.',
        bestFor: 'Ongoing design & video needs',
        highlight: 'Recommended',
      },
      {
        id: 'assignments',
        step: '02',
        name: 'Assignments',
        tagline: 'One project. Fixed fee. Fixed deadline.',
        definition:
          'A one-off design or video job quoted as a flat price with a clear delivery date. No monthly commitment — you pay only for that piece of work.',
        bestFor: 'One-time projects & campaigns',
      },
      {
        id: 'hiring',
        step: '03',
        name: 'Jobs',
        tagline: 'Hire someone onto your own team',
        definition:
          'Post a role and we shortlist vetted designers or editors. You interview, hire them onto your payroll, and get a replacement guarantee if it isn’t a fit.',
        bestFor: 'Building an in-house team',
      },
    ],
  },
  accountant: {
    intro:
      'Same vetted accountants — three different ways to bring them onto your books. Pick the one that matches how often you need help.',
    modes: [
      {
        id: 'subscription',
        step: '01',
        name: 'Subscription',
        tagline: 'Your accounting team, on a flat monthly plan',
        definition:
          'A dedicated squad of qualified accountants, plus a Squad Manager for oversight and support. Your squad keeps your books current, files on time, and sends clear reports every month — pause or cancel anytime.',
        bestFor: 'Ongoing books & compliance',
        highlight: 'Recommended',
      },
      {
        id: 'assignments',
        step: '02',
        name: 'Assignments',
        tagline: 'One filing or clean-up. Fixed fee. Fixed deadline.',
        definition:
          'A one-off bookkeeping or compliance task quoted as a flat price with a clear delivery date. No monthly commitment — you pay only for that piece of work.',
        bestFor: 'One-time filings & clean-ups',
      },
      {
        id: 'hiring',
        step: '03',
        name: 'Jobs',
        tagline: 'Hire an accountant onto your own team',
        definition:
          'Post a role and we shortlist vetted accountants. You interview, hire them onto your payroll, and get a replacement guarantee if it isn’t a fit.',
        bestFor: 'Building an in-house finance team',
      },
    ],
  },
}

const icons = {
  subscription: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  ),
  assignments: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  ),
  hiring: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20a5.5 5.5 0 0111 0M17 8h4.5M19.25 5.75v4.5" />
    </svg>
  ),
}

export default function WorkModeOverview({ variant = 'creative' }) {
  const content = COPY[variant] || COPY.creative

  return (
    <section className="py-14 lg:py-16 px-5 sm:px-8 bg-white border-b border-[rgba(0,0,0,0.06)]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="max-w-2xl mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                What each option means
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary tracking-[-0.025em]">
              Know the difference before you choose.
            </h2>
            <p className="mt-3 text-base text-text-secondary leading-relaxed">
              {content.intro}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {content.modes.map((mode, i) => {
            const isPrimary = mode.id === 'subscription'
            return (
              <ScrollReveal key={mode.id} delay={i * 0.08}>
                <button
                  type="button"
                  onClick={() => scrollToWorkMode(mode.id)}
                  className={`group w-full h-full text-left rounded-2xl border-[1.5px] p-6 sm:p-7 transition-all duration-short hover:-translate-y-1 hover:shadow-card-hover ${
                    isPrimary
                      ? 'border-black bg-brand-purple/10 shadow-brutal-sm'
                      : 'border-[rgba(0,0,0,0.1)] bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span
                      className={`inline-flex w-10 h-10 rounded-xl items-center justify-center border ${
                        isPrimary
                          ? 'bg-brand-purple text-white border-text-primary shadow-brutal-sm'
                          : 'bg-white text-text-primary border-[rgba(0,0,0,0.1)]'
                      }`}
                    >
                      {icons[mode.id]}
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-muted">
                        {mode.step}
                      </span>
                      {mode.highlight && (
                        <span className="inline-flex items-center gap-1 bg-brand-accent text-black border border-text-primary shadow-brutal-sm text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                          {mode.highlight}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary mb-1.5">
                    {mode.name}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-text-primary tracking-[-0.015em] leading-snug">
                    {mode.tagline}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {mode.definition}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-text-muted">
                      Best for: {mode.bestFor}
                    </span>
                    <span className="text-xs font-semibold text-text-primary group-hover:translate-x-0.5 transition-transform duration-short whitespace-nowrap">
                      See details &rarr;
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
