"use client"
import ScrollReveal from '../ScrollReveal'

const SIGNUP_URL = 'https://squadhire.upsquadconnect.com/signup/talent'

/* ── data ─────────────────────────────────────────────── */

const howItWorks = [
  {
    number: '1',
    title: 'Browse open assignments',
    description: 'New design and video tasks are posted regularly. Each one lists the scope, the fixed fee, and the deadline upfront.',
  },
  {
    number: '2',
    title: 'Claim what fits',
    description: 'Pick assignments that match your skills and free time. No bidding, no pitching, no negotiation.',
  },
  {
    number: '3',
    title: 'Deliver on time',
    description: 'Complete the work within the timeline. Your Squad Manager is on hand if you need a brief clarified.',
  },
  {
    number: '4',
    title: 'Get paid',
    description: 'Once your delivery is approved, the agreed fixed fee is released to you. That simple.',
  },
]

const designWork = [
  'Social media creatives',
  'Posters & flyers',
  'Logo & brand marks',
  'Brochures & menus',
  'Presentation decks',
  'Thumbnails',
]

const videoWork = [
  'Instagram reels & shorts',
  'YouTube long-form edits',
  'Promo & ad cuts',
  'Motion graphics',
  'Subtitles & captions',
  'Highlight reels',
]

const sampleAssignments = [
  { category: 'Design', title: 'Set of 5 Instagram posts', fee: '1,500', timeline: '3 days' },
  { category: 'Video', title: '30-sec product promo edit', fee: '2,500', timeline: '4 days' },
  { category: 'Design', title: 'Logo + brand mark', fee: '4,000', timeline: '5 days' },
  { category: 'Video', title: 'YouTube edit (10 min)', fee: '3,000', timeline: '3 days' },
  { category: 'Design', title: 'Festival poster pack', fee: '2,000', timeline: '2 days' },
  { category: 'Video', title: 'Instagram reels (pack of 3)', fee: '3,500', timeline: '5 days' },
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
              Pick up one-time assignments. Get paid per project.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Not ready to commit to a regular client? Browse standalone design and video editing
              assignments — each with a <span className="font-semibold text-text-primary">fixed payment</span> and a
              <span className="font-semibold text-text-primary"> clear timeline</span>. Take what fits your schedule,
              deliver great work, and get paid. No strings attached.
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
                Assignments span the full range of creative work. Take the ones that play to your strengths.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Design */}
              <div className="rounded-2xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/20 border border-[rgba(96,96,163,0.2)] text-text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h12a2 2 0 012 2v12a4 4 0 01-4 4H7zM7 21v-4a2 2 0 012-2h2M15 7h.01M15 11h.01" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">Design</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {designWork.map((w) => (
                    <span
                      key={w}
                      className="text-xs font-medium text-text-secondary bg-white border border-[rgba(96,96,163,0.2)] px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="rounded-2xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-[rgba(96,96,163,0.2)] text-text-primary flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary">Video editing</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {videoWork.map((w) => (
                    <span
                      key={w}
                      className="text-xs font-medium text-text-secondary bg-white border border-[rgba(96,96,163,0.2)] px-3 py-1.5 rounded-full"
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
                Every assignment shows its payment and deadline before you accept — so you always know exactly what you&apos;ll earn and by when.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleAssignments.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-xl p-6 border border-[rgba(96,96,163,0.2)] hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        a.category === 'Design'
                          ? 'bg-brand-purple/20 border-[rgba(96,96,163,0.2)] text-text-primary'
                          : 'bg-brand-blue/20 border-[rgba(96,96,163,0.2)] text-text-primary'
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
                  <div className="pt-3 border-t border-[rgba(96,96,163,0.2)] flex items-baseline justify-between">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Fixed fee</span>
                    <span className="font-heading text-xl font-extrabold text-text-primary">{'₹'}{a.fee}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Sample assignments shown for illustration. Live assignments list their own fee and deadline.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Why freelance with UpSquad ──────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-white">
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
