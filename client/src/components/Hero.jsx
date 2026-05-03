"use client"
import ScrollReveal from './ScrollReveal'

const stats = [
  { value: 'One plan', label: 'Select the ones you want' },
  { value: '6 squads', label: 'Ready to deploy' },
  { value: 'No contracts', label: 'Pause or cancel anytime' },
]

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 px-5 sm:px-8 bg-[#f0fb29] overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Left: text */}
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-white border border-black/80 px-3 py-1.5 rounded-full mb-6 shadow-brutal-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Waitlist open &middot; Early access &amp; launch offers
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-4xl sm:text-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 text-text-primary">
                The All-in-One Talent Subscription
                <br />
                <span className="italic font-bold">for Modern Brands.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-text-primary/80 leading-[1.6] mb-7 max-w-lg">
                Subscribing is better than hiring. One plan gives your brand access to content,
                marketing, tech, accounts, legal, and hiring — all under one roof.
                Stay consistent. Scale fast.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="https://wa.me/919995566362?text=I%20want%20to%20know%20more%20about%20UpSquad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 btn-gradient font-semibold text-sm px-8 py-3.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Connect on WhatsApp
                </a>
                <a
                  href="#how-it-works"
                  className="btn-secondary font-medium text-sm px-6 py-3.5"
                >
                  How it works →
                </a>
              </div>
              <p className="text-xs text-text-muted">
                Get early access and exclusive launch offers when you join the waitlist.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: decorative stat card */}
          <div className="hidden lg:flex flex-col gap-3 pt-2">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="right" delay={i * 0.1}>
                <div className="bg-white border-[1.5px] border-black rounded-xl px-5 py-3 min-w-[200px] shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-short">
                  <div className="text-base font-semibold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-secondary mt-0.5">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-black/15 lg:hidden">
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
