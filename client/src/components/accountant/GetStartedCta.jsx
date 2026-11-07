"use client"
import ScrollReveal from '../ScrollReveal'
import SignupCta from '../SignupCta'
import WhatsAppIcon from '../WhatsAppIcon'
import { scrollToSection } from '../../lib/useLandingScrollReset'

const WA_NUMBER = '919995266385'
const waLink = () =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    'Hi UpSquad, I have a question about the Accountant Subscription plans.'
  )}`

// Explainer script §10 — getting started, as the closing band of the
// subscription story.
const steps = [
  {
    number: '01',
    title: 'Explore the plans',
    description:
      'Look through the available subscription plans and select the one that suits your business requirements.',
    action: (
      <button
        type="button"
        onClick={() => scrollToSection('subscription-plans')}
        className="text-xs font-semibold text-[#FFFF99] underline underline-offset-4 hover:text-white transition-colors"
      >
        See plans &rarr;
      </button>
    ),
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
    action: (
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFFF99] underline underline-offset-4 hover:text-white transition-colors"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
        Message us &rarr;
      </a>
    ),
  },
]

export default function GetStartedCta() {
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
            A more organized, transparent, and flexible way to manage your business accounting.
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-2xl">
            Get started with UpSquad Accountant Subscription today.
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
                {step.action && <div className="mt-3">{step.action}</div>}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <SignupCta className="btn-gradient font-semibold text-sm px-7 py-3.5">
              Get started &rarr;
            </SignupCta>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/25 rounded-lg px-6 py-3.5 hover:bg-white/10 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Talk to our team
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
