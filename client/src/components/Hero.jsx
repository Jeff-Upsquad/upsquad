"use client"
import ScrollReveal from './ScrollReveal'

// The three ways to work, surfaced right in the hero — Subscribe (primary,
// featured dark) first, then Assign, then Hire.
const stats = [
  {
    value: 'Subscribe',
    label: 'A dedicated squad, monthly',
    dark: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    ),
  },
  {
    value: 'Assign',
    label: 'One-off work, fixed fee',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    value: 'Hire',
    label: 'Vetted talent, guaranteed',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.25" />
        <path d="M3.5 20a5.5 5.5 0 0111 0M17 8h4.5M19.25 5.75v4.5" />
      </svg>
    ),
  },
]

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 px-5 sm:px-8 overflow-hidden bg-[radial-gradient(130%_120%_at_50%_-10%,#FFFFFF_0%,#F4F4F5_52%,#E9E9EC_100%)] dark:bg-[radial-gradient(130%_120%_at_50%_-10%,#1A1A1A_0%,#121212_52%,#0B0B0B_100%)]">
      {/* graph-paper grid pattern (light) */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(10,10,10,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.06)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(118%_88%_at_50%_-4%,#000_42%,transparent_82%)] [-webkit-mask-image:radial-gradient(118%_88%_at_50%_-4%,#000_42%,transparent_82%)]" />

      <div className="relative max-w-[1160px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">

          {/* Left: text */}
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-white/80 backdrop-blur-sm border border-black/[0.07] px-3.5 py-1.5 rounded-full mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFF99] opacity-80 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
                </span>
                Waitlist open &middot; Early access &amp; launch offers
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-4xl sm:text-display font-extrabold leading-[1.04] tracking-[-0.03em] mb-6 text-text-primary">
                The All-in-One Talent
                <br />
                Subscription for
                {' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic">Modern Brands.</span>
                  <span className="absolute inset-x-0 bottom-1 h-3 bg-[#FFFF99] -z-0 rounded-sm" aria-hidden="true" />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-text-secondary leading-[1.65] mb-8 max-w-lg">
                One subscription gives your brand a dedicated squad — content, marketing, tech,
                accounts, and more — for a flat monthly price. Prefer something lighter? Order a
                one-off assignment, or hire vetted talent directly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <a
                  href="https://wa.me/919995266385?text=I%20want%20to%20know%20more%20about%20UpSquad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Connect on WhatsApp
                </a>
                <a
                  href="#ways-to-work"
                  className="group/btn flex items-center gap-3 bg-white text-text-primary font-semibold text-sm pl-6 pr-1.5 py-1.5 rounded-full border border-black/10 hover:border-black/25 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                >
                  <span>Ways to work</span>
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0A0A] text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
              <p className="text-xs text-text-muted">
                Get early access and exclusive launch offers when you join the waitlist.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: floating stat cards */}
          <div className="hidden lg:flex flex-col gap-4 pt-2">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="right" delay={i * 0.1}>
                <div
                  className={`group flex items-center gap-4 rounded-2xl p-3.5 min-w-[252px] border transition-all duration-300 hover:-translate-y-1 ${
                    stat.dark
                      ? 'bg-[#0A0A0A] border-white/10 shadow-[0_22px_50px_-20px_rgba(0,0,0,0.55)]'
                      : 'bg-white border-black/[0.06] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.25)] hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                      stat.dark
                        ? 'bg-white/10 border-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
                        : 'bg-gradient-to-br from-[#F6F6F7] to-[#E7E7EA] dark:from-[#262626] dark:to-[#1a1a1a] border-black/[0.06] dark:border-white/10 text-text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_-4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_10px_-4px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className={`text-base font-semibold tracking-tight ${stat.dark ? 'text-white' : 'text-text-primary'}`}>{stat.value}</div>
                    <div className={`text-xs mt-0.5 ${stat.dark ? 'text-white/55' : 'text-text-secondary'}`}>{stat.label}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="flex flex-wrap items-center gap-6 mt-10 pt-7 border-t border-black/10 lg:hidden">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-sm font-semibold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-secondary mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
