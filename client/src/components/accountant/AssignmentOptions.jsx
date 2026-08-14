"use client"
import ScrollReveal from '../ScrollReveal'
import SignupCta from '../SignupCta'

// Customer-facing one-time work. Mirrors the partner "Freelance" tab in concept
// (fixed fee, fixed timeline) but framed for the buyer: send a brief, get a quote,
// receive the delivery. CTA goes to the SquadHire signup chooser.

/* ── data ─────────────────────────────────────────────── */

const howItWorks = [
  {
    number: '1',
    title: 'Send your brief',
    description: 'Tell us the one-time task — the books or filing involved, the period, and your deadline.',
  },
  {
    number: '2',
    title: 'Get a fixed quote',
    description: 'We come back with a flat fee and a clear delivery date. No hourly billing, no surprises.',
  },
  {
    number: '3',
    title: 'We get to work',
    description: 'A vetted accountant handles it end to end. Your Squad Manager is there for support and to help make sure it gets done.',
  },
  {
    number: '4',
    title: 'Review & receive',
    description: 'Check the returns or reports, ask for any corrections, and get the finals filed or handed over.',
  },
]

const bookkeepingWork = [
  'Monthly bookkeeping',
  'Bank reconciliation',
  'Accounts payable / receivable',
  'Ledger clean-up',
  'Financial statements',
  'MIS reports',
]

const complianceWork = [
  'GST returns (GSTR-1 & 3B)',
  'TDS returns',
  'Income tax filing',
  'ROC / MCA filings',
  'Payroll processing',
  'Year-end close',
]

const sampleAssignments = [
  { category: 'Compliance', title: 'Monthly GST return (GSTR-1 & 3B)', fee: '1,500', timeline: '3 days' },
  { category: 'Bookkeeping', title: '3 months book clean-up', fee: '6,000', timeline: '6 days' },
  { category: 'Compliance', title: 'TDS return filing (1 quarter)', fee: '2,000', timeline: '3 days' },
  { category: 'Bookkeeping', title: 'Bank reconciliation (1 year)', fee: '4,000', timeline: '5 days' },
  { category: 'Compliance', title: 'ITR filing — small business', fee: '2,500', timeline: '4 days' },
  { category: 'Bookkeeping', title: 'Year-end financial statements', fee: '5,000', timeline: '7 days' },
]

const perks = [
  'No monthly commitment — order only when you need it',
  'Flat price agreed before any work starts',
  'A clear delivery date you can plan around',
  'Vetted accountants, with delivery managed for you',
  'Corrections included until it’s filed clean',
  'Pay per task — nothing recurring',
]

/* ── component ────────────────────────────────────────── */

export default function AssignmentOptions() {
  return (
    <>
      {/* ── Intro ───────────────────────────────────────── */}
      <section id="assignments" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Assignments &middot; One-time work
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Just one filing or clean-up? Get it done — fixed fee, fixed deadline.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Not ready for a monthly subscription and don’t need a full-time hire — you just have one
              specific thing that needs doing. Send us the brief and we’ll come back with a{' '}
              <span className="font-semibold text-text-primary">flat fee</span> and a{' '}
              <span className="font-semibold text-text-primary">clear delivery date</span>. A vetted
              accountant handles it, you review, and you pay only for that one piece of work.
            </p>
          </ScrollReveal>

          {/* How it works */}
          <div className="mt-12">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How an assignment works</h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {howItWorks.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.08}>
                  <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
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

      {/* ── Types of work ───────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">What you can order</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">Types of assignments</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Send us a single task — bookkeeping or a compliance filing — and we’ll quote it as a one-time assignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bookkeeping */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/20 border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 10h16M4 14h10M4 18h10" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">Bookkeeping &amp; accounts</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bookkeepingWork.map((w) => (
                    <span
                      key={w}
                      className="text-xs font-medium text-text-secondary bg-white border border-[rgba(0,0,0,0.08)] px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compliance */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">Compliance &amp; filings</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {complianceWork.map((w) => (
                    <span
                      key={w}
                      className="text-xs font-medium text-text-secondary bg-white border border-[rgba(0,0,0,0.08)] px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Sample assignments ──────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Fixed fee &middot; Fixed timeline</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">What an assignment looks like</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                Here’s the kind of work people order one-off, with indicative pricing. You’ll get an exact
                fee and delivery date before anything starts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleAssignments.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        a.category === 'Bookkeeping'
                          ? 'bg-brand-purple/20 border-[rgba(0,0,0,0.08)] text-text-primary'
                          : 'bg-brand-blue/20 border-[rgba(0,0,0,0.08)] text-text-primary'
                      }`}
                    >
                      {a.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {a.timeline}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-text-primary mb-4 leading-snug">{a.title}</h3>
                  <div className="pt-3 border-t border-[rgba(0,0,0,0.08)] flex items-baseline justify-between">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">From</span>
                    <span className="font-heading text-xl font-extrabold text-text-primary">{'₹'}{a.fee}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Indicative pricing shown for illustration. Your final quote depends on scope and turnaround.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Why order an assignment ─────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Why order one-off</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">When an assignment makes sense</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
              {perks.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <span className="inline-flex w-6 h-6 rounded-full bg-brand-purple text-white border border-text-primary items-center justify-center shrink-0 mt-0.5">
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
                  Have something in mind?
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Send your brief, get a quote
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us what you need and we’ll reply with a fixed fee and delivery date — same-day,
                  10 AM–6 PM IST, Monday to Friday.
                </p>
              </div>
              <SignupCta className="inline-flex items-center justify-center btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0">
                Sign up &rarr;
              </SignupCta>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
