"use client"
import ScrollReveal from '../ScrollReveal'

// Explainer script §5 — SquadHub, the platform all accounting work runs on.
const capabilities = [
  'View your regularly scheduled accounting activities',
  'Submit additional work requests as new tasks',
  'Chat with your accountant and send voice notes',
  'Share and store important business files',
  'Schedule meetings — online discussions via Google Meet',
  'Track task statuses, time spent, and completed work',
]

const platforms = [
  { label: 'Web app', available: true },
  { label: 'Android app', available: true },
  { label: 'iOS app', available: false, note: 'Coming soon' },
]

export default function SquadHubSection() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: copy + platform availability */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Introducing SquadHub
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
            Everything runs through one platform.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
            All your communication with your accountant, task assignments, work tracking, and file sharing
            happen on <strong className="text-text-primary">SquadHub</strong> — basically everything related to
            your accountant&rsquo;s work, managed in a single place.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {platforms.map((p) => (
              <span
                key={p.label}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full border ${
                  p.available
                    ? 'bg-white text-text-primary border-[rgba(0,0,0,0.08)]'
                    : 'bg-surface-secondary text-text-muted border-dashed border-[rgba(0,0,0,0.12)]'
                }`}
              >
                {p.available ? (
                  <svg className="w-3.5 h-3.5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-pulse" />
                )}
                {p.label}
                {p.note && <span className="font-mono-tech text-[10px] uppercase tracking-wider text-text-muted">· {p.note}</span>}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Right: dark SquadHub capability card */}
        {/* `up`, not `direction="right"`: the hidden state of a right-reveal is
            translateX(40px), which pushes this below-the-fold card past the
            mobile viewport edge and creates a horizontal scrollbar until it
            reveals. Every other below-fold section animates up. */}
        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl border-[1.5px] border-black bg-[#0A0A0A] text-white shadow-brutal p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFFF99] text-[#0A0A0A] border border-black/10 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </span>
              <div>
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-white/50 leading-none">
                  Your workspace
                </p>
                <h3 className="font-heading text-lg font-extrabold text-white mt-1">SquadHub</h3>
              </div>
            </div>
            <ul className="space-y-3.5">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#FFFF99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
