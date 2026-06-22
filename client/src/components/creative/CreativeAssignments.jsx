"use client"
import ScrollReveal from '../ScrollReveal'

// Customer-facing one-time work. Mirrors the partner "Freelance" tab in concept
// (fixed fee, fixed timeline) but framed for the buyer: send a brief, get a quote,
// receive the delivery. CTA goes to WhatsApp like the hiring tab.
const WA_NUMBER = '919995266385'
const briefLink = (note) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(note)}`

/* ── data ─────────────────────────────────────────────── */

const howItWorks = [
  {
    number: '1',
    title: 'Send your brief',
    description: 'Describe the one-time task — scope, references, brand assets, and the deadline you need.',
  },
  {
    number: '2',
    title: 'Get a fixed quote',
    description: 'We come back with a flat fee and a clear delivery date. No hourly billing, no surprises.',
  },
  {
    number: '3',
    title: 'We get to work',
    description: 'A vetted designer or editor handles it end to end. Your Squad Manager keeps you posted.',
  },
  {
    number: '4',
    title: 'Review & receive',
    description: 'Check the delivery, ask for tweaks until it’s right, and get the final files. Pay only for what you ordered.',
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
  'No monthly commitment — order only when you need it',
  'Flat price agreed before any work starts',
  'A clear delivery date you can plan around',
  'Vetted creatives, with delivery managed for you',
  'Revisions included until you sign off',
  'Pay per project — nothing recurring',
]

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/* ── component ────────────────────────────────────────── */

export default function CreativeAssignments() {
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
              Got a one-off project? Get it done — fixed fee, fixed deadline.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Not ready for a monthly subscription and don’t need a full-time hire — you just have one
              specific thing that needs doing. Send us the brief and we’ll come back with a{' '}
              <span className="font-semibold text-text-primary">flat fee</span> and a{' '}
              <span className="font-semibold text-text-primary">clear delivery date</span>. A vetted
              designer or editor handles it, you review, and you pay only for that one piece of work.
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
                Send us a single task — graphics or video — and we’ll quote it as a one-time assignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Design */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/20 border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center">
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
                      className="text-xs font-medium text-text-secondary bg-white border border-[rgba(0,0,0,0.08)] px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/20 border border-[rgba(0,0,0,0.08)] text-text-primary flex items-center justify-center">
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
                        a.category === 'Design'
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
              <a
                href={briefLink('Hi UpSquad, I’d like a quote for a one-time design / video assignment.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Send your brief on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
