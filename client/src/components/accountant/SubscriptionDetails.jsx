"use client"
import ScrollReveal from '../ScrollReveal'
import { accountantBenefits, subscriptionIncluded, subscriptionAddons } from '../../data/accountant'
import { BenefitIcon } from '../pricing/icons'
import IncludedHighlights from '../pricing/IncludedHighlights'
import WhatYouCanRequest from './WhatYouCanRequest'
import WorkingHours from '../pricing/WorkingHours'
import PlansSection from '../creative/PlansSection'
import SignupCta from '../SignupCta'
import { scrollToSection } from '../../lib/useLandingScrollReset'

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
      'We match you with vetted accountants, plus a Squad Manager who assists you with overall management, support, and making sure work gets done.',
  },
  {
    number: '03',
    title: 'Hand over & relax',
    description:
      'Share access once. Your squad keeps your books current, files on time, and sends clear reports every month.',
  },
]

export default function SubscriptionDetails() {
  return (
    <>
      <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
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

            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
              <SignupCta className="btn-gradient text-sm font-semibold px-7 py-3.5 text-center">
                Sign up &rarr;
              </SignupCta>
              <button
                type="button"
                onClick={() => scrollToSection('subscription-plans')}
                className="btn-secondary text-sm font-semibold px-7 py-3.5 text-center"
              >
                See plans
              </button>
            </div>
          </ScrollReveal>

          {/* Explainer script §2 — what the plan covers by default + add-ons */}
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

          <div className="mt-14">
            <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 0.1}>
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

          <div className="mt-14">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                What&rsquo;s included in every subscription
              </h3>
              <p className="text-sm text-text-secondary mb-8">
                Everything you need to stay on top of your finances — accuracy, compliance, and complete flexibility.
              </p>
            </ScrollReveal>
            <IncludedHighlights items={accountantBenefits.filter((b) => b.featured)} />
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-7">
              {accountantBenefits.filter((b) => !b.featured).map((b, i) => (
                <ScrollReveal key={b.title} delay={(i % 2) * 0.08}>
                  <div className="flex gap-3.5">
                    <div className="flex-shrink-0 w-9 h-9 bg-brand-purple/15 rounded-lg flex items-center justify-center text-text-primary">
                      <BenefitIcon type={b.icon} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">{b.title}</h4>
                      <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{b.desc}</p>
                      {b.note && (
                        <p className="text-xs text-brand-orange font-semibold mt-1.5">{b.note}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PlansSection variant="accountant" />

      <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal><WhatYouCanRequest /></ScrollReveal>
          <ScrollReveal><WorkingHours /></ScrollReveal>

          <ScrollReveal>
            <div
              id="build"
              className="mt-16 rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Tailored to you
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Build your own subscription
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us the services you need, your budget, and a few details — we&rsquo;ll put together a
                  plan that fits. Takes under a minute.
                </p>
              </div>
              <SignupCta className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0">
                Sign up &rarr;
              </SignupCta>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
