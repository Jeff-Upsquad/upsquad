"use client"
import ScrollReveal from '../ScrollReveal'
import WhatsAppIcon from '../WhatsAppIcon'
import { explainerWaLink } from './ExplainerHero'

// Explainer script §10 — getting started, as the closing band of the
// subscription story. The page's single CTA is WhatsApp to the business line.
const defaultSteps = [
  {
    number: '01',
    title: 'Explore the plans',
    description:
      'Look through the available subscription plans and select the one that suits your business requirements.',
  },
  {
    number: '02',
    title: 'Subscribe & pay online',
    description:
      'Purchase your subscription directly through the website and complete your payment online — no paperwork chase.',
  },
  {
    number: '03',
    title: 'Questions? Talk to us',
    description:
      'Not sure which plan fits? Our team will help you understand your requirements and choose a suitable plan.',
  },
]

export default function GetStartedCta({
  heading = 'A more organized, transparent, and flexible way to manage your business accounting.',
  subheading = 'Get started with UpSquad Accountant Subscription today.',
  steps = defaultSteps,
  waHref,
}) {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-[#0A0A0A] text-white">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 bg-[#FFFF99]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-white/50">
              How to get started
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-[-0.025em] max-w-3xl">
            {heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-2xl">
            {subheading}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="rounded-2xl bg-white/[0.06] border border-white/15 p-6 h-full">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FFFF99] text-[#0A0A0A] text-xs font-bold border-2 border-white/20">
                  {step.number}
                </span>
                <h4 className="font-heading text-base font-semibold text-white mt-4 mb-1.5">{step.title}</h4>
                <p className="text-sm text-white/65 leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-12">
            {/* The page's single CTA: WhatsApp to the business line. */}
            <a
              href={waHref || explainerWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-7 py-3.5"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
