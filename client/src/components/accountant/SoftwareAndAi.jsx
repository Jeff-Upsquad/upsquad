"use client"
import ScrollReveal from '../ScrollReveal'
import { softwarePlatforms } from '../../data/accountant'

// Explainer script §8 + §9 — free software, your own software, and the AI Accountant.
export default function SoftwareAndAi() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        {/* §8 — software compatibility */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Works with your software
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Already use accounting software? Keep it.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Our accountants work directly on the platform your business already runs on — there&rsquo;s no forced
            migration to anything new.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {softwarePlatforms.map((name) => (
              <span
                key={name}
                className="text-xs sm:text-sm font-semibold text-text-primary bg-white border border-[rgba(0,0,0,0.08)] rounded-full px-4 py-2"
              >
                {name}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
            <div className="mt-6 flex items-start gap-3 text-sm text-text-secondary bg-surface-secondary rounded-xl px-5 py-4 max-w-3xl leading-relaxed">
            <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              <strong className="text-text-primary">One requirement:</strong> your accounting software must support
              remote access — so our accountants can securely access it from wherever they work.
            </p>
          </div>
        </ScrollReveal>

        {/* §8b + §9 — free software & the AI Accountant */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="rounded-2xl border-[1.5px] border-black bg-brand-purple/10 shadow-brutal p-7 h-full">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] bg-black text-brand-accent px-3 py-1 rounded-full mb-5">
                Free for your first year
              </span>
              <h3 className="font-heading text-xl font-extrabold text-text-primary">
                Software included with your subscription
              </h3>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-1 shrink-0 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-text-primary">Attendance &amp; Payroll Management Software</strong> — free
                    for the first year, included with your subscription.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-1 shrink-0 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <strong className="text-text-primary">No accounting software yet?</strong> Use UpSquad&rsquo;s own
                    accounting software, <strong className="text-text-primary">SquadBooks</strong> — also free for the
                    first year.
                  </p>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border-[1.5px] border-black bg-[#0A0A0A] text-white shadow-brutal p-7 h-full">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] bg-[#FFFF99] text-[#0A0A0A] px-3 py-1 rounded-full mb-5">
                Included with SquadBooks
              </span>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 shrink-0">
                  <svg className="w-5 h-5 text-[#FFFF99]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h3 className="font-heading text-xl font-extrabold text-white">Your AI Accountant</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                It&rsquo;s after office hours and you suddenly need your sales figures, a look at expenses, or a
                financial report? Don&rsquo;t wait for the next working day — just ask.
              </p>
              <p className="text-sm text-white/70 leading-relaxed mt-3">
                The AI Accountant retrieves answers directly from your accounting data in SquadBooks, so important
                information stays available even when your regular accountant isn&rsquo;t.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
