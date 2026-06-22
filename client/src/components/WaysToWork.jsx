"use client"
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

// "Three ways to work with us" — the home-page recap of the model the customer
// landing pages (designers/editors, accountants) are built around: Subscription
// first, then Assignments, then Hiring. Hierarchy is encoded in the layout:
// Subscription is the bright, full-width, recommended card; Assignments and
// Hiring are the two smaller, dark alternatives below it.
const WA_NUMBER = '919995266385'
const waLink = (note) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(note)}`

const ArrowIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const subscriptionPoints = [
  'A dedicated, vetted squad + a Squad Manager who learns your brand',
  'Flat monthly pricing — name the budget that works for you',
  'Send unlimited requests; get steady, on-brand work every week',
  'No contracts — pause or cancel anytime',
]

// The two lighter alternatives. Order matters: assignments before hiring.
const alternatives = [
  {
    step: '02',
    name: 'Assignments',
    title: 'Order a one-off assignment',
    description:
      'Just one thing that needs doing? Send a brief and get a flat fee with a fixed delivery date. Pay only for that piece of work — nothing recurring.',
    points: ['Fixed fee, fixed deadline', 'Revisions until you sign off'],
    cta: 'Send a brief',
    href: waLink("Hi UpSquad, I'd like a quote for a one-time assignment."),
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    step: '03',
    name: 'Hiring',
    title: 'Hire vetted talent in-house',
    description:
      'Want someone on your own payroll? We shortlist vetted candidates matched to your brief. You interview, select, and onboard — backed by a replacement guarantee.',
    points: ['Curated shortlist matched to your brief', 'Replacement guarantee'],
    cta: 'Explore hiring',
    href: waLink('Hi UpSquad, I want to hire vetted talent in-house.'),
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3.25" />
        <path d="M3.5 20a5.5 5.5 0 0111 0M17 8h4.5M19.25 5.75v4.5" />
      </svg>
    ),
  },
]

function CheckDot({ light }) {
  return (
    <span
      className={`mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full border ${
        light ? 'bg-white/10 border-white/20 text-white' : 'bg-[#FFFF99] border-black/20 text-[#0A0A0A]'
      }`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export default function WaysToWork() {
  return (
    <section id="ways-to-work" className="scroll-mt-24 py-[60px] lg:py-[120px] px-5 sm:px-8 bg-[#0A0A0A]">
      <div className="max-w-[1160px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 rounded-full bg-[#FFFF99]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-white/55">Ways to work</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-h2 font-extrabold text-white tracking-[-0.025em]">
              Three ways to work with us.
            </h2>
            <p className="text-base text-white/60 mt-3 leading-relaxed">
              Subscription is how most brands work with UpSquad — the best value, and the least to
              manage. Prefer something lighter? Order a one-off assignment, or hire vetted talent
              directly. Same squads, three ways in.
            </p>
          </div>
        </ScrollReveal>

        {/* Primary: Subscription — bright, full-width, recommended */}
        <ScrollReveal delay={0.05}>
          <div className="relative rounded-[28px] bg-white border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] p-7 sm:p-9 lg:p-10">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start">
              {/* Left: pitch */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[#F6F6F7] to-[#E7E7EA] border border-black/[0.06] text-text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_-4px_rgba(0,0,0,0.15)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 10h18M7 15h4" />
                      </svg>
                    </span>
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted">
                      01 &middot; Subscription
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-text-primary border border-black/15 rounded-full pl-2 pr-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
                    Recommended
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary tracking-[-0.02em] leading-tight">
                  Subscribe to a squad
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-xl">
                  Instead of hiring, training, and managing talent one by one, subscribe to a dedicated
                  squad that handles your work end to end. One plan covers content, marketing, tech,
                  accounts, and more — for a flat monthly price.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                  <a href="#categories" className="btn-gradient inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5">
                    Explore the squads
                    <ArrowIcon />
                  </a>
                  <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center text-sm font-semibold px-7 py-3.5">
                    View pricing
                  </Link>
                </div>
              </div>

              {/* Right: what's included */}
              <div className="lg:border-l lg:border-black/[0.07] lg:pl-12">
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted mb-4">
                  What every subscription includes
                </p>
                <ul className="flex flex-col gap-3.5">
                  {subscriptionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckDot />
                      <span className="text-sm text-text-secondary leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Secondary: Assignments + Hiring — smaller, dark alternatives */}
        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {alternatives.map((alt, i) => (
            <ScrollReveal key={alt.name} delay={0.1 + i * 0.08}>
              <div className="group h-full flex flex-col rounded-[24px] bg-[#141414] border border-white/[0.08] p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 border border-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                    {alt.icon}
                  </span>
                  <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-white/45">
                    {alt.step} &middot; {alt.name}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white tracking-[-0.01em] mb-2">{alt.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5">{alt.description}</p>

                <ul className="flex flex-col gap-2.5 mb-7">
                  {alt.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckDot light />
                      <span className="text-sm text-white/75 leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={alt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn mt-auto inline-flex items-center justify-between gap-3 w-full bg-white text-[#0A0A0A] rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.35)]"
                >
                  <span>{alt.cta}</span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
