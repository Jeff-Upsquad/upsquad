"use client"
import { useState } from 'react'
import { availabilityPlans } from '../../data/pricing'
import ScrollReveal from '../ScrollReveal'
import SignupCta from '../SignupCta'
import PlansModal from './PlansModal'

function planRows(plan) {
  return [
    { label: 'Unlimited work requests', value: 'Yes' },
    { label: 'Squad Manager', value: 'Yes' },
    { label: 'Urgent works', value: plan.urgentWorks ? 'Yes' : 'No' },
    { label: 'Access to Squad Hub', value: '5 users free · ₹500 per extra user' },
    { label: 'Meetings', value: plan.meetings },
    { label: 'Live collaboration', value: plan.liveCollaboration ? 'Yes — screen share & live edits' : 'No' },
    { label: 'Shared resource', value: plan.resource },
    { label: 'Best for', value: plan.bestFor },
  ]
}

function adaptPlan(plan, variant) {
  if (variant !== 'accountant') return plan
  return {
    ...plan,
    description:
      plan.id === 'personal'
        ? 'Your own personal accountant, like an in-house partner.'
        : plan.description,
    approach: plan.approach.replace('creative support', 'accounting support'),
  }
}

export default function PlansSection({ variant = 'creative' }) {
  const [compareOpen, setCompareOpen] = useState(false)
  const plans = availabilityPlans.map((plan) => adaptPlan(plan, variant))
  const intro =
    variant === 'accountant'
      ? 'Every plan includes the same accounting squad, Squad Hub, and Squad Manager. What changes is how much of their week is yours.'
      : 'Every plan includes the same squad, Squad Hub, and Squad Manager. What changes is how much of their week is yours.'

  return (
    <section id="subscription-plans" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Subscription plans
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Pick the availability that fits.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            {intro}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.05}>
              <article
                className={`h-full flex flex-col rounded-2xl border-[1.5px] p-5 ${
                  plan.highlighted
                    ? 'bg-[#FFFF99] border-black shadow-brutal-sm'
                    : 'bg-surface-secondary border-black/[0.08]'
                }`}
              >
                <div className="min-h-[22px] mb-3">
                  {plan.badge ? (
                    <span className="inline-flex items-center bg-black text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-heading text-lg font-extrabold text-text-primary tracking-[-0.02em]">
                  {plan.name}
                </h3>
                <p className="text-xs text-text-secondary leading-snug mt-1">
                  {plan.description}
                </p>

                <div className="mt-4 mb-4">
                  <div className="font-heading text-3xl font-extrabold text-text-primary leading-none tracking-[-0.03em]">
                    {plan.availability}
                  </div>
                  <p className="text-[11px] text-text-secondary mt-1.5 leading-snug">
                    {plan.hoursPerDay} / day
                    <span className="text-black/25"> · </span>
                    {plan.hoursPerWeek} / week
                  </p>
                  <p className="text-[11px] font-medium text-text-primary mt-1">
                    {plan.approach}
                  </p>
                </div>

                <ul className="mt-auto flex flex-col gap-2 pt-3 border-t border-black/[0.08]">
                  {planRows(plan).map((row) => (
                    <li key={row.label} className="text-[11px] leading-snug">
                      <span className="text-text-secondary">{row.label}</span>
                      <span className="block font-medium text-text-primary mt-0.5">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              Name your budget after you sign up. Pause or cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setCompareOpen(true)}
                className="btn-secondary text-sm font-semibold px-7 py-3.5"
              >
                Compare plans
              </button>
              <SignupCta className="btn-gradient text-sm font-semibold px-7 py-3.5 text-center">
                Sign up &rarr;
              </SignupCta>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <PlansModal open={compareOpen} onClose={() => setCompareOpen(false)} variant={variant} />
    </section>
  )
}
