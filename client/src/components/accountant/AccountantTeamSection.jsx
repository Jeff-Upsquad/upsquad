"use client"
import ScrollReveal from '../ScrollReveal'

// Explainer script §6 — how your accountant works with you.
const workingModel = [
  'Think of your UpSquad accountant as a part-time or shared employee who works remotely for your business.',
  'They own the regular responsibilities — day-to-day accounting, monthly reports, and applicable filings.',
  'Need customized reports or other accounting work? Discuss it and assign it as an additional task — handled depending on available time and your subscription’s scope.',
]

// Explainer script §7 — the team behind your primary accountant.
const roles = [
  {
    role: 'Primary Accountant',
    title: 'Your dedicated accountant',
    description:
      'Assigned to your business and responsible for managing your regular accounting activities every month.',
    highlighted: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    role: '2 × Secondary Accountants',
    title: 'Your backup cover',
    description:
      'If your Primary Accountant is on leave, unavailable, or needs help with additional work, the Secondary Accountants step in — minimizing disruption to your accounting operations.',
    highlighted: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    role: 'Squad Manager',
    title: 'Your overall oversight',
    description:
      'Oversees the workflow, coordinates tasks, monitors progress, and provides client support whenever you need it.',
    highlighted: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export default function AccountantTeamSection() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        {/* §6 — the working model */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              How your accountant works with you
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Like a part-time employee — without the hiring headache.
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {workingModel.map((point, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.08)] p-5 text-sm text-text-secondary leading-relaxed h-full">
                {point}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* §7 — the team */}
        <ScrollReveal>
          <div className="mt-16 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Your support team
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
              Not just one accountant — an entire team behind them.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
              When you subscribe, a Primary Accountant is assigned to your business — backed by Secondary
              Accountants and a Squad Manager.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <ScrollReveal key={r.role} delay={i * 0.1}>
              <div
                className={`rounded-2xl p-6 h-full border-[1.5px] transition-all duration-short hover:-translate-y-1 ${
                  r.highlighted
                    ? 'border-black bg-[#FFFF99] shadow-brutal'
                    : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 border ${
                    r.highlighted
                      ? 'bg-white text-[#0A0A0A] border-black/15'
                      : 'bg-brand-purple/15 text-text-primary border-transparent'
                  }`}
                >
                  {r.icon}
                </span>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-muted mb-1.5">
                  {r.role}
                </p>
                <h4 className="font-heading text-lg font-bold text-text-primary">{r.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed mt-2">{r.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
