"use client"
import { SQUADHIRE_SIGNUP } from '../lib/signup'

const roles = [
  {
    id: 'business',
    href: SQUADHIRE_SIGNUP.business,
    eyebrow: 'For brands',
    title: 'I am a business',
    desc: 'Subscribe to a squad, send a one-off brief, or hire vetted talent in-house.',
    points: ['Flat monthly subscriptions', 'One-off assignments', 'Hire in-house'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    id: 'talent',
    href: SQUADHIRE_SIGNUP.talent,
    eyebrow: 'For professionals',
    title: 'I am talent',
    desc: 'Join the roster as a designer, editor, or other professional and get discovered by brands.',
    points: ['Create your profile', 'Get matched to work', 'Work with modern brands'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export default function Signup() {
  return (
    <section className="pt-32 pb-20 px-5 sm:px-8 bg-surface-secondary min-h-[calc(100vh-80px)]">
      <div className="max-w-[880px] mx-auto">
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Sign up
            </span>
            <span className="h-px w-8 accent-bar" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
            Are you a business or talent?
          </h1>
          <p className="mt-3 text-base text-text-secondary leading-relaxed max-w-xl mx-auto">
            Pick the account that fits. We’ll take you to the SquadHire signup form for that role.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {roles.map((role) => (
            <a
              key={role.id}
              href={role.href}
              className="group flex flex-col rounded-2xl border-[1.5px] border-black bg-white p-7 sm:p-8 shadow-brutal hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 bg-brand-purple/15 border border-black/[0.06] text-text-primary">
                  {role.icon}
                </span>
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {role.eyebrow}
                </span>
              </div>

              <h2 className="font-heading text-2xl font-extrabold text-text-primary tracking-[-0.02em]">
                {role.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mt-2 mb-5">
                {role.desc}
              </p>

              <ul className="flex flex-col gap-2 mb-7">
                {role.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-[#FFFF99] border border-black/20 text-[#0A0A0A]">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-text-secondary leading-snug">{point}</span>
                  </li>
                ))}
              </ul>

              <span className="mt-auto inline-flex items-center justify-between gap-3 w-full bg-[#0A0A0A] text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold">
                <span>Continue to signup</span>
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#0A0A0A] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
