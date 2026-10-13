"use client"

import Link from 'next/link'
import ScrollReveal from '../ScrollReveal'
import PartnerSignupLink from '../PartnerSignupLink'
import { squads } from '../../data/squads'
import { SQUADHIRE_SIGNUP } from '../../lib/signup'

const PARTNER_ROUTES = {
  '/customers/designers-and-video-editors': '/partner-program/designer-and-video-editor/',
  '/customers/accountant-subscription': '/partner-program/accountant/',
}

export default function ServicesDirectory({ partner = false, signupUrl = SQUADHIRE_SIGNUP.talent }) {
  return (
    <section id="services" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary border-t border-black/[0.06]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="h-px w-8 accent-bar" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
              Services Directory
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
            {partner ? 'Explore all 6 squads and roles.' : 'Explore all 6 squads and products.'}
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            {partner
              ? 'Find where your skills fit across all our service offerings, for ongoing subscriptions and one-time assignments.'
              : 'Every service UpSquad offers across design, media, finance, growth marketing, tech, and legal operations.'}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {squads.map((squad) => (
              <div
                key={squad.id}
                className="rounded-2xl p-6 bg-white border border-black/[0.06] flex flex-col justify-between hover:border-black/20 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{squad.emoji}</span>
                    {squad.badge && (
                      <span className="text-[10px] font-mono uppercase tracking-wider bg-black/5 text-text-muted px-2 py-0.5 rounded-full border border-black/[0.05]">
                        {squad.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary">{squad.name}</h3>
                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{squad.description}</p>

                  <div className="mt-4 pt-4 border-t border-black/[0.06]">
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider text-text-muted block mb-2">
                      Squad Talents &amp; Roles
                    </span>
                    <ul className="space-y-1.5">
                      {squad.products.map((p) => (
                        <li key={p.name} className="text-xs flex items-center justify-between text-text-primary">
                          <span className="flex items-center gap-1.5">
                            <span>{p.emoji}</span>
                            <span>{p.name}</span>
                          </span>
                          {p.href ? (
                            <Link href={partner ? PARTNER_ROUTES[p.href] || signupUrl : p.href} className="text-[11px] font-semibold text-emerald-600 hover:underline">
                              {partner ? 'Explore' : 'Live'} &rarr;
                            </Link>
                          ) : (
                            <span className="text-[10px] font-mono text-text-muted">{p.status}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06]">
                  {partner ? (
                    <PartnerSignupLink
                      href={signupUrl}
                      className="text-xs font-semibold text-text-primary hover:underline flex items-center justify-between"
                    >
                      <span>Join as a partner</span>
                      <span>&rarr;</span>
                    </PartnerSignupLink>
                  ) : (
                    <Link
                      href="/pricing"
                      className="text-xs font-semibold text-text-primary hover:underline flex items-center justify-between"
                    >
                      <span>Custom plan builder</span>
                      <span>&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
