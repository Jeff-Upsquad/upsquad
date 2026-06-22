"use client"
import ScrollReveal from './ScrollReveal'

const steps = [
  {
    number: '1',
    title: 'Subscribe to a plan',
    description:
      'Choose the subscription that fits your brand\'s needs. No contracts, no lock-ins — pause or cancel anytime.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Meet your squad',
    description:
      'We assemble the right experts from the right squad for your brand — vetted professionals, ready to get to work.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Scale your brand',
    description:
      'Stay consistent, save time, and focus on what matters — growing your business. Your squad handles the rest.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-[#FAFAFA]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <span className="inline-block w-8 h-[3px] rounded-full bg-text-primary mb-3" />
            <p className="font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.18em] mb-3">Process</p>
            <h2 className="font-heading text-3xl lg:text-h2 font-extrabold text-text-primary tracking-[-0.025em]">How UpSquad works</h2>
            <p className="text-base text-text-secondary mt-3">
              Everything you need — nothing you don&apos;t.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="group h-full bg-white rounded-3xl p-7 border border-black/[0.05] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.22)] hover:shadow-[0_26px_60px_-26px_rgba(0,0,0,0.28)] hover:-translate-y-1.5 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F5F5F6] to-[#E7E7EA] border border-black/[0.06] text-text-primary flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_-4px_rgba(0,0,0,0.15)]">
                    {step.icon}
                  </div>
                  <span className="font-mono text-[40px] font-bold leading-none text-black/[0.06] tracking-tight">0{step.number}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-text-primary mb-2 tracking-[-0.01em]">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
