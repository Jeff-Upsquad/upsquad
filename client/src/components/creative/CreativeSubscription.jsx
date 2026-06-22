"use client"
import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import { benefits } from '../../data/pricing'
import { BenefitIcon } from '../pricing/icons'
import WhatYouCanRequest from '../pricing/WhatYouCanRequest'
import WorkingHours from '../pricing/WorkingHours'
import ImportantNote from '../pricing/ImportantNote'
import PlansModal from './PlansModal'

// Where the creative (designer / video editor) "Client Brief" form lives
// (squadhub web app). Mirrors the accountant page, which links to /connect/accountant.
const BUILD_FORM_URL = 'https://squadhub.in/connect'

const steps = [
  {
    number: '01',
    title: 'Choose a plan & budget',
    description:
      'Pick your talent type, experience level, and plan — then name the flat monthly budget that works for you.',
  },
  {
    number: '02',
    title: 'Meet your squad',
    description:
      'We match you with vetted designers and editors plus a Squad Manager who learn your brand inside out.',
  },
  {
    number: '03',
    title: 'Hand over & relax',
    description:
      'Send a request anytime. Your squad delivers steady, on-brand design and video every week — one task at a time.',
  },
]

export default function CreativeSubscription() {
  const [plansOpen, setPlansOpen] = useState(false)

  return (
    <>
      {/* What is a creative subscription */}
      <section id="subscription" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                What is a creative subscription
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              A full creative team, on a flat monthly plan.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Instead of hiring, training, and managing creatives one by one, you subscribe to a
              dedicated squad that handles your design and video work end to end. Pick a plan and
              budget, send your requests, and get steady, on-brand content every week — graphics,
              branding, social, and video edits.
            </p>

            {/* Primary actions: build the subscription, or preview the plans */}
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={BUILD_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient text-sm font-semibold px-7 py-3.5 text-center"
              >
                Build my subscription &rarr;
              </a>
              <button
                type="button"
                onClick={() => setPlansOpen(true)}
                className="btn-secondary text-sm font-semibold px-7 py-3.5"
              >
                Show plans
              </button>
            </div>
          </ScrollReveal>

          {/* How it works */}
          <div className="mt-12">
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

          {/* What's included */}
          <div className="mt-14">
            <ScrollReveal>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-1">
                What&rsquo;s included in every subscription
              </h3>
              <p className="text-sm text-text-secondary mb-8">
                Everything your brand needs to stay consistent — creativity, reliability, and complete flexibility.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-7">
              {benefits.map((b, i) => (
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

      {/* Detail sections (service catalog, hours, fit) on white for card contrast */}
      <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal><WhatYouCanRequest /></ScrollReveal>
          <ScrollReveal><WorkingHours /></ScrollReveal>
          <ScrollReveal><ImportantNote /></ScrollReveal>

          {/* Build your own subscription */}
          <ScrollReveal>
            <div
              id="build"
              className="mt-4 rounded-2xl border-[1.5px] border-black bg-brand-purple/15 shadow-brutal p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Tailored to you
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Build your own subscription
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us the talent you need, your budget, and a few details — we&rsquo;ll put together a
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

      <PlansModal open={plansOpen} onClose={() => setPlansOpen(false)} buildUrl={BUILD_FORM_URL} />
    </>
  )
}
