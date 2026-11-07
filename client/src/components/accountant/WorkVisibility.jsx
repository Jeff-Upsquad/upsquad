"use client"
import ScrollReveal from '../ScrollReveal'

// Explainer script §4 — monitoring your accountant's work.
const features = [
  {
    title: 'See the time spent, every day',
    description:
      'Know exactly how much time your accountant spends on your business each day — not a black box.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Task-level detail',
    description:
      'See which tasks your accountant is working on and how much time each task requires.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Daily, weekly & monthly reports',
    description:
      'Structured work reports through UpSquad’s platform — delivered on a daily, weekly, and monthly rhythm.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6m4 6V7m4 10v-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Assign & track additional tasks',
    description:
      'Beyond regular accounting, assign extra work and monitor its progress — status, time spent, and completed output.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 4v2m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function WorkVisibility() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Complete visibility
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Always know what your accountant is working on.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            With UpSquad you have complete visibility into your accountant&rsquo;s activities — so you always know
            what you&rsquo;re paying for, and what your accountant is working on.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 2) * 0.1}>
              <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-purple/15 text-text-primary mb-4">
                  {f.icon}
                </span>
                <h4 className="font-heading text-base font-semibold text-text-primary mb-1.5">{f.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <p className="mt-8 text-sm text-text-secondary bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-5 py-4 max-w-3xl leading-relaxed">
            These reports and the actual effort behind them are also what determines whether your subscription
            price ever needs to be revised — <span className="font-semibold text-text-primary">transparent in both directions.</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
