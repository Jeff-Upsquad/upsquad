"use client"
import ScrollReveal from '../ScrollReveal'

// Where the accountant "Client Brief" form lives (squadhub web app).
const BUILD_FORM_URL = 'https://squadhub.in/connect/accountant'

const steps = [
  {
    number: '01',
    title: 'Choose a plan & budget',
    description:
      'Pick the services you need — bookkeeping, GST & TDS, payroll, or reporting — and the flat monthly budget that works for you.',
  },
  {
    number: '02',
    title: 'Meet your squad',
    description:
      'We match you with a dedicated team of qualified accountants and a manager who learn your business inside out.',
  },
  {
    number: '03',
    title: 'Hand over & relax',
    description:
      'Share access once. Your squad keeps your books current, files on time, and sends clear reports every month.',
  },
]

const benefits = [
  {
    title: 'A dedicated accounting squad',
    desc: 'Qualified accountants who work as your finance team — not a different freelancer every month.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Bookkeeping, done right',
    desc: 'Accurate, reconciled books kept up to date every month — so you always know where you stand.',
    icon: 'M4 6h16M4 10h16M4 14h10M4 18h10',
  },
  {
    title: 'Compliance, on time',
    desc: 'GST, TDS, and statutory filings handled before every deadline. No scrambling, no penalties.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Payroll & reporting',
    desc: 'Salary processing, payslips, and clear monthly MIS reports that make decisions easy.',
    icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'A dedicated manager',
    desc: 'One point of contact who plans the work, runs reviews, and answers your questions.',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 3v-3z',
  },
  {
    title: 'Pause or cancel anytime',
    desc: 'No long lock-ins. Flexible flat monthly pricing that scales up or down as your business changes.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
]

function Icon({ d }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={d} />
    </svg>
  )
}

export default function SubscriptionDetails() {
  return (
    <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        {/* Heading */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              What is an accountant subscription
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            A full accounting team, on a flat monthly plan.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Instead of hiring, training, and managing accountants one by one, you subscribe to a
            dedicated team that runs your finances end to end. Pick a plan and budget, hand over
            your books, and get clean, compliant, up-to-date accounts every month — bookkeeping,
            GST, TDS, payroll, and reporting.
          </p>
        </ScrollReveal>

        {/* How it works */}
        <div className="mt-12">
          <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-[rgba(96,96,163,0.2)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-text-primary text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                    {step.number}
                  </span>
                  <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div className="mt-14">
          <ScrollReveal>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
              What’s included in every subscription
            </h3>
            <p className="text-sm text-text-secondary mb-8">
              Everything you need to stay on top of your finances — accuracy, compliance, and complete flexibility.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-7">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={(i % 2) * 0.08}>
                <div className="flex gap-3.5">
                  <div className="flex-shrink-0 w-9 h-9 bg-brand-purple/15 rounded-lg flex items-center justify-center text-text-primary">
                    <Icon d={b.icon} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">{b.title}</h4>
                    <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Build your own subscription */}
        <ScrollReveal>
          <div
            id="build"
            className="mt-12 rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          >
            <div>
              <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                Tailored to you
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                Build your own subscription
              </h3>
              <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                Tell us the services you need, your budget, and a few details — we’ll put together a
                plan that fits. Takes under a minute.
              </p>
            </div>
            <a
              href={BUILD_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0"
            >
              Build my subscription &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
