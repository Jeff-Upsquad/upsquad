"use client"
import ScrollReveal from '../ScrollReveal'
import PartnerSignupLink from '../PartnerSignupLink'
import { SQUADHIRE_SIGNUP } from '../../lib/signup'

const WA_NUMBER = '919995266385'
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

/* ── data ─────────────────────────────────────────────── */

const howItWorks = [
  {
    number: '1',
    title: 'Set your preferences',
    description: 'Tell us your role, sales experience, the segments you know, expected salary, and where you want to work.',
  },
  {
    number: '2',
    title: 'Browse matching openings',
    description: 'See full-time and part-time sales roles from companies and brands that hire through UpSquad.',
  },
  {
    number: '3',
    title: 'Apply & interview',
    description: 'Apply to openings that fit. We help you prepare and connect you with the company.',
  },
  {
    number: '4',
    title: 'Get hired',
    description: 'Accept the offer and start your new role with the company — full-time or part-time.',
  },
]

const sampleOpenings = [
  {
    role: 'Sales Executive',
    company: 'D2C retail brand',
    location: 'Bengaluru / Remote',
    salary: '₹22,000 – ₹32,000',
    type: 'Full-time',
  },
  {
    role: 'Business Development Associate',
    company: 'SaaS startup',
    location: 'Remote',
    salary: '₹18,000 – ₹25,000',
    type: 'Part-time',
  },
  {
    role: 'Senior Sales Manager',
    company: 'Manufacturing firm',
    location: 'Hyderabad',
    salary: '₹45,000 – ₹70,000',
    type: 'Full-time',
  },
]

// Placement-fee tiers, based on the salary package.
const feeTiers = [
  {
    bracket: 'Below ₹20,000',
    amount: '₹3,000',
    note: 'One-time placement fee',
  },
  {
    bracket: '₹20,000 & above',
    amount: '₹5,000',
    note: 'One-time placement fee',
    highlighted: true,
  },
]

const reassurance = [
  'No upfront payment — nothing to pay to apply or interview',
  'You pay only after you get the job and receive your first salary',
  'Prefer to split it? Pay as easy EMI of ₹1,000 / month',
]

/* ── component ────────────────────────────────────────── */

export default function JobsTab({ signupUrl = SQUADHIRE_SIGNUP.talent }) {
  return (
    <>
      {/* ── Intro ───────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 accent-bar" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Jobs &middot; Full-time &amp; part-time roles
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              Land a full-time or part-time sales job with companies hiring through UpSquad.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Companies and brands that work with UpSquad are hiring sales executives, BD associates, and
              sales managers for full-time and part-time roles. Browse new openings, and when one matches what
              you&apos;re looking for, apply directly through us. We help you get noticed and guide you through the process.
            </p>

            {/* How it works */}
            <div className="mt-12">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-5">How it works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howItWorks.map((step, i) => (
                  <ScrollReveal key={step.number} delay={i * 0.08}>
                    <div className="bg-surface-secondary rounded-xl p-6 border border-[rgba(0,0,0,0.08)] h-full">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-text-primary text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
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
      </ScrollReveal>

      {/* ── Sample openings ─────────────────────────────── */}
      <ScrollReveal>
        <section className="py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-2">Now hiring</p>
              <h2 className="font-heading text-3xl font-bold text-text-primary tracking-tight">Recent openings</h2>
              <p className="text-base text-text-secondary mt-2 max-w-2xl">
                A sample of the kinds of roles companies post through UpSquad. Set your preferences to get matched to live openings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleOpenings.map((job) => (
                <div
                  key={job.role}
                  className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short flex flex-col"
                >
                  <h3 className="font-heading text-lg font-semibold text-text-primary">{job.role}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{job.company}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="text-xs font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Salary / month</span>
                    <p className="font-heading text-base font-bold text-text-primary mt-0.5">{job.salary}</p>
                  </div>

                  <a
                    href={waLink(`Hi UpSquad, I'm interested in the ${job.role} opening.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary mt-5 inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 w-full"
                  >
                    Apply
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center mt-6">
              * Sample openings for illustration. Set your preferences to see and apply to live roles.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Job Opportunities — Placement fee ───────────── */}
      <ScrollReveal>
        <section id="job-opportunities" className="scroll-mt-24 py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-[1160px] mx-auto">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="h-px w-8 accent-bar" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                  Job opportunities &middot; Placement fee
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
                Pay only after you&apos;re hired — never before.
              </h2>
              <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
                There&apos;s a one-time placement fee once you land a job through UpSquad. The amount
                depends on your salary package — and you only pay it after you start earning.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-stretch">
              {/* Fee tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feeTiers.map((tier) => (
                  <div
                    key={tier.bracket}
                    className={`relative rounded-2xl border-[1.5px] border-black p-7 flex flex-col shadow-brutal-sm ${
                      tier.highlighted ? 'bg-brand-purple/15' : 'bg-white'
                    }`}
                  >
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                      Placement fee
                    </span>
                    <div className="mt-4 font-heading text-4xl font-extrabold text-text-primary leading-none">
                      {tier.amount}
                    </div>
                    <span className="text-xs text-text-muted mt-2">{tier.note}</span>

                    {/* Salary bracket this fee applies to — the key qualifier, shown prominently */}
                    <div className="mt-6 pt-5 border-t border-[rgba(0,0,0,0.08)]">
                      <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-muted">
                        For salary packages
                      </span>
                      <div className="mt-1.5 font-heading text-2xl sm:text-[28px] font-extrabold text-text-primary leading-tight">
                        {tier.bracket}
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                        <svg className="w-3.5 h-3.5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Charged once, after your first salary
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* How you pay */}
              <div className="rounded-2xl border-[1.5px] border-black bg-text-primary text-white p-7 sm:p-8 shadow-brutal flex flex-col">
                <h3 className="font-heading text-xl font-bold">How you pay</h3>
                <ul className="mt-5 space-y-4">
                  {reassurance.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="inline-flex w-6 h-6 rounded-full bg-brand-accent text-black border border-text-primary items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <p className="text-sm text-white/90 leading-snug">{r}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-white/[0.07] border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-white/60">EMI option</span>
                    <span className="font-heading text-lg font-extrabold text-brand-purple">₹1,000<span className="text-xs font-medium text-white/60"> /month</span></span>
                  </div>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">
                    Don&apos;t want to pay in one go? Spread the fee across easy monthly instalments.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-text-muted">
              You pay nothing until you&apos;ve secured the job and received your first salary. No placement, no fee.
            </p>
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
                  Find your next role
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary mt-1">
                  Set your job preferences
                </h3>
                <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                  Tell us the role, salary, and location you want. We&apos;ll match you to openings from
                  companies hiring through UpSquad — and you only pay once you&apos;re placed.
                </p>
              </div>
              <PartnerSignupLink
                href={signupUrl}
                className="btn-gradient text-sm font-semibold px-7 py-3.5 shrink-0"
              >
                Browse jobs &amp; apply &rarr;
              </PartnerSignupLink>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
