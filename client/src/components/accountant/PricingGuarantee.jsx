"use client"
import ScrollReveal from '../ScrollReveal'

// Explainer script §3 — how the ₹5,000/mo starting price behaves over time.
const phases = [
  {
    number: '01',
    title: 'Your price is fixed for the first 2 months',
    description:
      'From day one you pay one fixed monthly price — starting from ₹5,000/month. No hourly billing, no meter running.',
  },
  {
    number: '02',
    title: 'We evaluate the actual work',
    description:
      'During those 2 months we look at how much effort your accounting takes — the time your accountant spends and the types of tasks involved.',
  },
  {
    number: '03',
    title: 'Then the price may be revised — up or down',
    description:
      'After 2 months the price can move in either direction to match the real workload. As your business grows and the work grows with it, the price may be revised accordingly.',
  },
]

export default function PricingGuarantee() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              How the pricing works
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Is the price fixed — or will it change later?
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            It&rsquo;s fixed to start, and any change is always mutual. Here&rsquo;s exactly how your
            subscription price behaves over time.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <ScrollReveal key={phase.number} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                  {phase.number}
                </span>
                <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">
                  {phase.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{phase.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 rounded-2xl border-[1.5px] border-black bg-brand-accent/40 shadow-brutal p-7 sm:p-9 grid md:grid-cols-[auto_1fr] gap-6 items-start">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-black text-brand-accent shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="font-heading text-xl font-extrabold text-text-primary">
                No surprise bills. Ever.
              </h3>
              <p className="text-sm md:text-base text-text-secondary mt-2 leading-relaxed max-w-3xl">
                Any price increase is communicated to you <strong className="text-text-primary">in advance</strong> and
                implemented <strong className="text-text-primary">only after you agree to it</strong>. Think of it like
                an employee&rsquo;s salary being revised as their workload and responsibilities grow — nothing changes
                without a conversation first.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
