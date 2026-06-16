"use client"
import ScrollReveal from '../ScrollReveal'
import AssignmentExampleCard from '../partner/AssignmentExampleCard'

// TODO: Confirm the real sales application URL.
const SIGNUP_URL = 'https://squadhire.upsquadconnect.com/apply/sales'

/* ── data ─────────────────────────────────────────────── */

const howItWorks = [
  {
    number: '1',
    title: 'Browse open assignments',
    description: 'New sales assignments are posted regularly. Each one lists the scope, the fixed fee, and the deadline upfront.',
  },
  {
    number: '2',
    title: 'Claim what fits',
    description: 'Pick assignments that match your strengths and free time. No bidding, no pitching, no negotiation.',
  },
  {
    number: '3',
    title: 'Deliver on time',
    description: 'Run the campaign or sprint within the timeline. Your Squad Manager is on hand if you need a brief clarified.',
  },
  {
    number: '4',
    title: 'Get paid',
    description: 'Once your delivery is approved, the agreed fixed fee is released to you. That simple.',
  },
]

// The kinds of one-time assignments you can take on. Each is a standalone job
// with a start date, a deadline, and a fixed payment agreed upfront.
const assignmentTypes = [
  { category: 'Lead Gen', accent: 'purple', title: 'Lead list build (300 leads)', start: '22 Jun', due: '25 Jun', duration: '3 days', fee: '3,500' },
  { category: 'Lead Gen', accent: 'purple', title: 'Cold calling sprint (200 calls)', start: '22 Jun', due: '26 Jun', duration: '4 days', fee: '3,000' },
  { category: 'Lead Gen', accent: 'purple', title: 'Appointment setting (15 meetings)', start: '23 Jun', due: '1 Jul', duration: '8 days', fee: '4,500' },
  { category: 'Sales Ops', accent: 'blue', title: 'CRM setup & cleanup', start: '23 Jun', due: '28 Jun', duration: '5 days', fee: '5,000' },
  { category: 'Sales Ops', accent: 'blue', title: 'Sales script & playbook', start: '24 Jun', due: '28 Jun', duration: '4 days', fee: '3,000' },
  { category: 'Sales Ops', accent: 'blue', title: 'Proposal / quote templates', start: '24 Jun', due: '27 Jun', duration: '3 days', fee: '2,500' },
]

const perks = [
  'Fixed fees agreed before you start',
  'No client hunting or negotiation',
  'Clear deadlines, no scope creep',
  'Work whenever you have time',
  'Payment guaranteed on approval',
  'Build a track record with UpSquad',
]

/* ── component ────────────────────────────────────────── */

export default function FreelanceTab() {
  return (
    <>
      {/* ── Intro ───────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Freelance &middot; One-time work
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Pick up one-time assignments. Get paid per engagement.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Not ready to commit to a regular client? Browse standalone sales and lead-gen
              assignments — each with a <span className="font-semibold text-text-primary">fixed fee</span> and a
              <span className="font-semibold text-text-primary"> clear deadline</span>. Take what fits your schedule,
              deliver results, and get paid. No strings attached.
            </p>

            {/* How it works */}
            <div className="mt-12">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How freelance works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howItWorks.map((step, i) => (
                  <ScrollReveal key={step.number} delay={i * 0.08}>
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
          </div>
        </section>
      </ScrollReveal>

      {/* ── Types of work ───────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">What you can take on</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">Types of assignments</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Every assignment is a <span className="font-semibold text-text-primary">one-time job</span> — it comes with a
                start date, a deadline, and a fixed payment agreed upfront. Here are the kinds of work you can pick up.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignmentTypes.map((a) => (
                <AssignmentExampleCard key={a.title} {...a} />
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Examples shown for illustration. Live assignments list their own start date, deadline, and fixed payment.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Why freelance with UpSquad ──────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Why freelance here</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">The upside of one-time work</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
              {perks.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="inline-flex w-6 h-6 rounded-full bg-brand-purple border border-text-primary items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm text-text-secondary leading-snug">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Closing CTA ─────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Ready when you are
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Start picking up assignments
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Create your profile once. We&apos;ll notify you when assignments that match your skills go live.
                </p>
              </div>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0"
              >
                Sign up to get assignments &rarr;
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
