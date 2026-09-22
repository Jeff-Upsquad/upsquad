"use client"
import ScrollReveal from '../ScrollReveal'
import PartnerSignupLink from '../PartnerSignupLink'
import { SQUADHIRE_SIGNUP } from '../../lib/signup'
import WhatsAppIcon from '../WhatsAppIcon'

const howAssignmentsWork = [
  {
    number: '1',
    title: 'Receive Pre-Scoped Briefs',
    description:
      'We curate client requirements into clear, technical briefs with defined scope, deliverables, and fixed fees upfront.',
  },
  {
    number: '2',
    title: 'Claim or Bid on Assignments',
    description:
      'Review project briefs and claim directly at the listed fixed fee or submit your custom bid based on your team’s scope and capacity.',
  },
  {
    number: '3',
    title: 'Execute & Milestone Delivery',
    description:
      'Deliver milestone assets on schedule. Your dedicated UpSquad manager coordinates client review and keeps feedback organized.',
  },
  {
    number: '4',
    title: 'Prompt Milestone Payouts',
    description:
      'Funds are held in escrow before kickoff and released directly to your agency account immediately upon milestone approval.',
  },
]

// Representative agency-tier assignments across squads
const sampleAssignments = [
  {
    squad: 'Tech Squad',
    squadKey: 'tech',
    title: 'Full-Stack Next.js Web App & Headless CMS',
    scope: 'Complete frontend development, responsive UI, CMS modeling, and API integrations.',
    timeline: '4 weeks',
    deliverables: '8 pages · API integration · CMS schema',
    fee: '₹1,50,000',
    tag: 'Development',
  },
  {
    squad: 'Content Creation',
    squadKey: 'content',
    title: 'Brand Identity System & Motion Design Kit',
    scope: 'Comprehensive brand guidelines, logo system, typography, 30 social templates, and animated logo stingers.',
    timeline: '3 weeks',
    deliverables: 'Design system · 30 templates · Motion kit',
    fee: '₹85,000',
    tag: 'Design & Motion',
  },
  {
    squad: 'Marketing Squad',
    squadKey: 'marketing',
    title: 'Full-Funnel Meta & Google Ads Setup + 30-Day Scale',
    scope: 'Ad creative strategy, pixel & CAPI setup, custom audience architecture, and campaign optimization sprint.',
    timeline: '4 weeks',
    deliverables: '20 ad creatives · 4 campaigns · Weekly reports',
    fee: '₹95,000',
    tag: 'Performance Ads',
  },
  {
    squad: 'Tech Squad',
    squadKey: 'tech',
    title: 'Cross-Platform Mobile App MVP (React Native)',
    scope: 'Authentication, core marketplace workflows, push notifications, and store deployment readiness.',
    timeline: '6 weeks',
    deliverables: 'iOS & Android builds · Firebase backend · TestFlight',
    fee: '₹2,25,000',
    tag: 'Mobile App',
  },
  {
    squad: 'Accounts & Finance',
    squadKey: 'finance',
    title: 'Financial Due Diligence & Year-End Compliance Audit',
    scope: 'Historical ledger reconciliation, GST & TDS audit, balance sheet cleanup, and executive investor summary.',
    timeline: '3 weeks',
    deliverables: 'Reconciled books · Audit report · Compliance pack',
    fee: '₹75,000',
    tag: 'Tax & Audit',
  },
  {
    squad: 'Legal Squad',
    squadKey: 'legal',
    title: 'Enterprise SaaS MSA & Comprehensive IP Filing Suite',
    scope: 'Custom Master Services Agreement, SLA policies, privacy/GDPR review, and 2 trademark filings.',
    timeline: '2 weeks',
    deliverables: 'MSA agreement · SLA doc · 2 Trademark submissions',
    fee: '₹60,000',
    tag: 'Contracts & IP',
  },
]

const assignmentPerks = [
  'Option to bid or claim at pre-agreed fixed fees',
  '100% fixed fee agreed before kickoff',
  'Protected escrow deposits for all milestones',
  'Monetize available agency bench capacity',
  'UpSquad handles client meetings & admin work',
  'High performers fast-tracked to monthly retainer accounts',
]

export default function AgencyAssignmentsTab({
  signupUrl = SQUADHIRE_SIGNUP.agency,
  whatsappUrl,
}) {
  return (
    <>
      {/* ── Intro Section ──────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="h-px w-8 bg-brand-purple" />
              <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                Assignments Model · Project Sprints
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
              High-value project assignments. Fixed fees or option to bid.
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
              Keep your agency bench fully utilized. Take on standalone, pre-scoped client projects with{' '}
              <span className="font-semibold text-text-primary">guaranteed fixed pricing or the option to bid</span>, with{' '}
              <span className="font-semibold text-text-primary">transparent milestone schedules</span> across tech,
              content, marketing, finance, and legal.
            </p>

            {/* How it works */}
            <div className="mt-12">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-6">
                How agency assignments work
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howAssignmentsWork.map((step, i) => (
                  <ScrollReveal key={step.number} delay={i * 0.08}>
                    <div className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short h-full flex flex-col justify-between">
                      <div>
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-accent text-black text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
                          {step.number}
                        </span>
                        <h4 className="font-heading text-base font-semibold text-text-primary mt-4 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Representative Agency Assignments ────────────── */}
      <ScrollReveal>
        <section className="py-16 px-5 sm:px-8 bg-white border-b border-[rgba(0,0,0,0.08)]">
          <div className="max-w-[1160px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Representative Scopes
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mt-1">
                  Sample agency assignments
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Projects matched to certified partner agencies based on capabilities and availability.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live client briefs weekly
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sampleAssignments.map((assignment) => (
                <div
                  key={assignment.title}
                  className="group relative bg-surface-secondary rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] hover:border-text-primary hover:bg-white transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-purple/10 text-brand-purple">
                        {assignment.squad}
                      </span>
                      <span className="text-xs font-medium text-text-muted">
                        {assignment.timeline}
                      </span>
                    </div>

                    <h4 className="font-heading text-base font-bold text-text-primary group-hover:text-black mb-2">
                      {assignment.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      {assignment.scope}
                    </p>

                    <div className="text-[11px] font-mono-tech text-text-muted bg-white group-hover:bg-surface-secondary px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.06)] mb-4">
                      📦 {assignment.deliverables}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono-tech text-text-muted block">Fixed Fee / Est. Payout</span>
                      <span className="font-heading text-lg font-black text-text-primary">
                        {assignment.fee}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-text-secondary bg-white px-2.5 py-1 rounded-md border border-[rgba(0,0,0,0.08)]">
                      {assignment.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Agency Perks for Assignments ──────────────────── */}
      <ScrollReveal>
        <section className="py-16 px-5 sm:px-8 bg-surface-secondary">
          <div className="max-w-[1160px] mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[rgba(0,0,0,0.08)] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted block mb-2">
                  Built for Agencies
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                  Why agencies take assignments with UpSquad
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mt-3 mb-6">
                  No unpaid RFP proposals, no client ghosting, and no payment delays. We give your agency predictable project revenue whenever you have bandwidth to spare.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {assignmentPerks.map((perk) => (
                    <div key={perk} className="flex items-start gap-2 text-xs text-text-secondary font-medium">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 p-6 rounded-2xl bg-brand-accent/20 border-2 border-text-primary shadow-brutal-sm">
                <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-text-primary">
                  Ready to claim assignments?
                </span>
                <h4 className="font-heading text-xl font-bold text-text-primary">
                  Register your agency to receive project briefs
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Join our verified agency directory and start receiving pre-scoped assignments directly in your inbox.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <PartnerSignupLink
                    href={signupUrl}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold btn-gradient transition-all"
                  >
                    Register as Agency Partner
                  </PartnerSignupLink>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 text-center py-2 px-4 rounded-xl text-xs font-semibold btn-secondary transition-all"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
