"use client"
import ScrollReveal from '../ScrollReveal'
import { subscriptionIncluded, subscriptionAddons } from '../../data/accountant'

// Explainer script §2 — what the plan covers by default + optional add-ons,
// as a standalone section for the explainer page.
export default function IncludedAndAddons() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              What&rsquo;s included
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Everything below is included by default.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            One subscription covers your business&rsquo;s accounting requirements — attach add-ons
            only if you need them.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 sm:p-7 h-full">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                Your plan covers
              </h3>
              <p className="text-sm text-text-secondary mb-5">
                All of this is included in your subscription by default.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
                {subscriptionIncluded.map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-dashed border-[rgba(0,0,0,0.15)] p-6 sm:p-7 h-full">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                Optional add-ons
              </h3>
              <p className="text-sm text-text-secondary mb-5">
                Attach them if your business needs them.
              </p>
              <div className="flex flex-wrap gap-2">
                {subscriptionAddons.map((addon) => (
                  <span
                    key={addon.title}
                    title={addon.desc}
                    className="text-xs font-semibold text-text-primary bg-brand-purple/10 border border-brand-purple/20 rounded-full px-3 py-1.5"
                  >
                    + {addon.title}
                  </span>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-5 leading-relaxed">
                One subscription covers your business&rsquo;s full accounting requirements.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
