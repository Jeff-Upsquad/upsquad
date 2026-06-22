"use client"
import { Fragment } from 'react'
import ScrollReveal from '../ScrollReveal'

const WA_NUMBER = '919995266385'
const waLink = (pkg) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi UpSquad, I’m interested in the ${pkg} accountant hiring package.`
  )}`

// Pricing for the hire packages. `amount` is shown big; `unit` is the small line under it.
const PRICING = {
  basic: { amount: '₹3,000', unit: 'one-time · per hire' },
  plus: { amount: '₹5,000', unit: 'one-time · per hire' },
}

const steps = [
  { n: '1', t: 'Share your requirements', d: 'Role, skills, experience, and budget.' },
  { n: '2', t: 'We shortlist', d: 'Vetted accountants matched to your brief.' },
  { n: '3', t: 'You select & onboard', d: 'Choose who you want and bring them onto your team.' },
  { n: '4', t: 'Replacement if needed', d: 'Not the right fit? We shortlist a replacement.' },
]

// Feature comparison. `true` = included, `false` = not included, string = shown as a value.
const features = [
  { label: 'Curated shortlist matched to your brief', basic: true, plus: true },
  { label: 'You interview and select your hires', basic: true, plus: true },
  { label: 'Self-managed onboarding into your team', basic: true, plus: true },
  { label: 'Priority shortlisting from our talent pool', basic: false, plus: true },
  { label: 'Replacement guarantee', basic: '1 month', plus: '3 months' },
  { label: 'Free replacement within the guarantee window', basic: true, plus: true },
]

function Check() {
  return (
    <span className="inline-flex w-5 h-5 rounded-full bg-brand-purple text-white border border-text-primary items-center justify-center">
      <svg className="w-3 h-3 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

function Cell({ v }) {
  if (v === true) return <Check />
  if (v === false)
    return <span className="inline-block w-3.5 h-[2px] rounded bg-text-muted/60" aria-label="Not included" />
  return <span className="text-xs sm:text-sm font-bold text-text-primary whitespace-nowrap">{v}</span>
}

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function HiringOptions() {
  return (
    <section id="hire" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        {/* Heading */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Prefer to hire
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Hire vetted accountants — with a replacement guarantee.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Want an accountant on your own payroll? We shortlist candidates that match your
            requirements. You select who you want and onboard them into your team — and if
            someone isn’t the right fit, we shortlist a replacement.
          </p>
        </ScrollReveal>

        {/* How hiring works */}
        <ScrollReveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-surface-secondary p-5"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-text-primary text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                  {s.n}
                </span>
                <h4 className="font-heading text-sm font-semibold text-text-primary mt-3">{s.t}</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal>
          <div className="mt-12 overflow-hidden rounded-2xl border-[1.5px] border-black shadow-brutal bg-white">
            <div className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
              {/* Header row */}
              <div className="p-4 sm:p-6 flex flex-col justify-end">
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  Compare
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary mt-1 leading-tight">
                  What you get
                </h3>
              </div>

              <div className="px-2 sm:px-6 pt-7 sm:pt-8 pb-4 sm:pb-6 border-l border-[rgba(0,0,0,0.06)] text-center">
                <div className="font-heading text-base sm:text-lg font-extrabold text-text-primary">Basic</div>
                <div className="mt-2 font-heading text-lg sm:text-3xl font-extrabold text-text-primary leading-none whitespace-nowrap">
                  {PRICING.basic.amount}
                </div>
                <div className="text-[10px] sm:text-[11px] text-text-muted mt-1">{PRICING.basic.unit}</div>
              </div>

              <div className="relative px-2 sm:px-6 pt-7 sm:pt-8 pb-4 sm:pb-6 border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 text-center">
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 ticker-tag text-[9px] sm:text-[10px] font-bold uppercase tracking-normal sm:tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap">
                  <span className="sm:hidden">Popular</span>
                  <span className="hidden sm:inline">Most popular</span>
                </span>
                <div className="font-heading text-base sm:text-lg font-extrabold text-text-primary">Plus</div>
                <div className="mt-2 font-heading text-lg sm:text-3xl font-extrabold text-text-primary leading-none whitespace-nowrap">
                  {PRICING.plus.amount}
                </div>
                <div className="text-[10px] sm:text-[11px] text-text-muted mt-1">{PRICING.plus.unit}</div>
              </div>

              {/* Feature rows */}
              {features.map((f) => (
                <Fragment key={f.label}>
                  <div className="px-4 sm:px-6 py-3.5 border-t border-[rgba(0,0,0,0.06)] text-xs sm:text-sm text-text-secondary font-medium flex items-center">
                    {f.label}
                  </div>
                  <div className="px-2 sm:px-6 py-3.5 border-t border-l border-[rgba(0,0,0,0.06)] flex items-center justify-center text-center">
                    <Cell v={f.basic} />
                  </div>
                  <div className="px-2 sm:px-6 py-3.5 border-t border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 flex items-center justify-center text-center">
                    <Cell v={f.plus} />
                  </div>
                </Fragment>
              ))}

              {/* CTA row */}
              <div className="flex px-2 sm:px-6 py-4 sm:py-5 border-t border-[rgba(0,0,0,0.06)] items-center">
                <span className="hidden sm:inline text-xs text-text-muted">Onboard directly into your team.</span>
              </div>
              <div className="px-2 sm:px-6 py-4 sm:py-5 border-t border-l border-[rgba(0,0,0,0.06)] flex items-center justify-center">
                <a
                  href={waLink('Basic')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2.5"
                >
                  <WhatsAppIcon className="hidden sm:block w-4 h-4" />
                  Choose<span className="hidden sm:inline">&nbsp;Basic</span>
                </a>
              </div>
              <div className="px-2 sm:px-6 py-4 sm:py-5 border-t border-l border-[rgba(0,0,0,0.06)] bg-brand-purple/10 flex items-center justify-center">
                <a
                  href={waLink('Plus')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient w-full inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-2 sm:px-4 py-2.5"
                >
                  <WhatsAppIcon className="hidden sm:block w-4 h-4" />
                  Choose<span className="hidden sm:inline">&nbsp;Plus</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <p className="mt-3 text-xs text-text-muted">
          Final fee depends on the role and seniority you’re hiring for. Replacement guarantee runs
          one month on Basic and three months on Plus.
        </p>

        {/* Closing CTA */}
        <ScrollReveal>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border-[1.5px] border-black bg-brand-purple/15 px-7 py-6 shadow-brutal-sm">
            <div>
              <h4 className="font-heading text-lg font-bold text-text-primary">
                Still deciding between subscribe and hire?
              </h4>
              <p className="text-sm text-text-secondary mt-1">
                Tell us what your business needs and we’ll point you to the right option.
                We reply same-day, 10 AM–6 PM IST, Monday to Friday.
              </p>
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                'Hi UpSquad, help me choose between an accountant subscription and hiring.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient text-sm font-semibold px-6 py-3.5 shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Message us on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
