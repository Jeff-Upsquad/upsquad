"use client"
import { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { squads } from '../data/squads'

const iconClass = "w-6 h-6"
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
}

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const squadIcons = {
  content: (
    <svg className={iconClass} {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M3 15h18M8 4v16M16 4v16" />
    </svg>
  ),
  marketing: (
    <svg className={iconClass} {...iconProps}>
      <path d="M4 9v6h3l9 4V5L7 9H4z" />
      <path d="M18.5 9.5a3.5 3.5 0 010 5" />
    </svg>
  ),
  tech: (
    <svg className={iconClass} {...iconProps}>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
    </svg>
  ),
  finance: (
    <svg className={iconClass} {...iconProps}>
      <path d="M3 21h18" />
      <path d="M6 21v-7M12 21V8M18 21v-4" />
      <path d="M5 10l5-4 4 3 5-5" />
    </svg>
  ),
  legal: (
    <svg className={iconClass} {...iconProps}>
      <path d="M12 3v18M7 21h10M5 7h14" />
      <path d="M5 7l-2.5 5.5a2.75 2.75 0 005 0L5 7zM19 7l-2.5 5.5a2.75 2.75 0 005 0L19 7z" />
    </svg>
  ),
  hr: (
    <svg className={iconClass} {...iconProps}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20a5.5 5.5 0 0111 0M17 8h4.5M19.25 5.75v4.5" />
    </svg>
  ),
}

function SquadIcon({ squad }) {
  return squadIcons[squad.iconKey] ?? null
}

function IconTile({ children, onDark }) {
  return (
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
        onDark
          ? 'bg-white/10 border-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
          : 'bg-gradient-to-br from-[#F6F6F7] to-[#E7E7EA] border-black/[0.06] text-text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_6px_14px_-6px_rgba(0,0,0,0.18)]'
      }`}
    >
      {children}
    </div>
  )
}

function Drawer({ squad, onClose }) {
  const d = squad.drawer
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-md"
        onClick={onClose}
      />

      <div className="fixed right-3 top-3 bottom-3 w-[calc(100%-1.5rem)] sm:w-[480px] bg-white z-[61] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] rounded-3xl flex flex-col overflow-hidden animate-slide-in border border-black/[0.06]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F6F6F7] to-[#E7E7EA] border border-black/[0.06] flex items-center justify-center text-text-primary">
              <span className="[&>svg]:w-5 [&>svg]:h-5"><SquadIcon squad={squad} /></span>
            </div>
            <span className="text-sm font-semibold text-text-primary">{squad.name}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.04] text-text-muted hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="inline-flex items-center border border-black/10 bg-black/[0.03] rounded-lg px-3 py-1.5 text-xs font-medium text-text-primary">
              Features
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center border border-black/[0.08] rounded-lg px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-black/[0.03] hover:border-black/20 transition-colors"
            >
              Products
            </Link>
          </div>

          <p className="text-base leading-relaxed mb-6">
            <span className="text-text-muted">{d.subtitle} </span>
            <span className="font-semibold text-text-primary">{d.highlight}</span>
            {' '}
            <span className="text-text-secondary">{d.body}</span>
            {' '}
            <span className="text-text-muted">{d.note}</span>
          </p>

          <div className="flex flex-col gap-2.5">
            {squad.products.map((talent) => (
              <div
                key={talent.name}
                className="bg-[#FAFAFA] border border-black/[0.06] rounded-2xl p-4 flex items-start gap-4 hover:border-black/15 transition-colors"
              >
                <span className="text-2xl mt-0.5 shrink-0 grayscale opacity-90">{talent.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-snug">{talent.name}</p>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{talent.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-black/[0.06]">
          <a
            href="https://wa.me/919995266385?text=I%20want%20to%20know%20more%20about%20UpSquad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#0A0A0A] text-white text-sm font-semibold py-3.5 rounded-full hover:bg-black transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Connect with us on WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

export default function Categories() {
  const [activeSquad, setActiveSquad] = useState(null)

  return (
    <section id="categories" className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-[#F1F1F3]">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="mb-12 max-w-2xl">
            <span className="inline-block w-8 h-[3px] rounded-full bg-text-primary mb-3" />
            <p className="font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.18em] mb-3">Subscriptions</p>
            <h2 className="font-heading text-3xl lg:text-h2 font-extrabold text-text-primary tracking-[-0.025em]">Six squads. One subscription.</h2>
            <p className="text-base text-text-secondary mt-3">
              Discover the squads that help you stay organized, consistent, and scale your brand effortlessly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {squads.map((squad, i) => {
            const interactive = Boolean(squad.drawer)
            const dark = squad.featured
            return (
              <ScrollReveal key={squad.name} delay={i * 0.08} className="h-full">
                <div
                  onClick={() => interactive && setActiveSquad(squad)}
                  className={`group h-full rounded-[28px] border p-2 transition-all duration-300 ${
                    interactive ? 'cursor-pointer' : ''
                  } ${
                    dark
                      ? 'bg-[#1C1C1F] border-white/[0.08] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.55)] lg:-translate-y-2 hover:-translate-y-3'
                      : 'bg-white border-black/[0.06] shadow-[0_18px_50px_-28px_rgba(0,0,0,0.22)] hover:shadow-[0_26px_60px_-26px_rgba(0,0,0,0.28)] hover:-translate-y-1.5'
                  }`}
                >
                 <div className={`h-full flex flex-col p-6 rounded-[20px] ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F6]'}`}>
                  <div className="flex items-start justify-between mb-5">
                    <IconTile onDark={dark}><SquadIcon squad={squad} /></IconTile>
                    {dark ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white border border-white/25 rounded-full pl-2 pr-2.5 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFFF99] ring-1 ring-white/30" />
                        New
                      </span>
                    ) : squad.badge ? (
                      <span className="text-[11px] font-medium text-text-secondary bg-black/[0.04] border border-black/[0.06] rounded-full px-2.5 py-1">
                        {squad.badge}
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-text-primary border border-black/10 rounded-full px-2.5 py-1">
                        New
                      </span>
                    )}
                  </div>

                  <h3 className={`font-heading text-lg font-bold mb-2 tracking-[-0.01em] ${dark ? 'text-white' : 'text-text-primary'}`}>{squad.name}</h3>
                  <p className={`text-sm leading-relaxed mb-5 flex-1 ${dark ? 'text-white/65' : 'text-text-secondary'}`}>{squad.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {squad.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2.5 py-1 rounded-full border ${dark ? 'text-white/80 bg-white/10 border-white/10' : 'text-text-secondary bg-black/[0.035] border-black/[0.05]'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {interactive ? (
                    dark ? (
                      <button className="group/btn w-full inline-flex items-center justify-between gap-3 bg-white text-[#0A0A0A] rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_12px_30px_-10px_rgba(255,255,255,0.35)]">
                        <span>{squad.ctaLabel ?? 'Explore Squad'}</span>
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <ArrowIcon />
                        </span>
                      </button>
                    ) : (
                      <button className="group/btn w-full inline-flex items-center justify-between gap-3 bg-[#0A0A0A] text-white rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-black">
                        <span>{squad.ctaLabel ?? 'Explore Squad'}</span>
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#0A0A0A] transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <ArrowIcon />
                        </span>
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-full text-sm font-semibold text-text-muted bg-black/[0.025] border border-black/[0.06] cursor-default"
                    >
                      Coming Soon
                    </button>
                  )}
                 </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {activeSquad && (
        <Drawer squad={activeSquad} onClose={() => setActiveSquad(null)} />
      )}
    </section>
  )
}
