"use client"
import ScrollReveal from '../ScrollReveal'
import HeroMedia from '../landing/HeroMedia'

// TODO: Replace with your real hero video (mp4 URL, or a YouTube / Vimeo / Loom link —
// HeroMedia auto-embeds those). Using a sample clip as a placeholder for now.
const HERO_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4'

export default function AccountantHero({ onSelectTab }) {
  return (
    <section className="pt-24 md:pt-28 pb-12 md:pb-16 bg-white">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
        {/* Left: copy */}
        <div>
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-white border border-black/80 px-3 py-1.5 rounded-full mb-6 shadow-brutal-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              New &middot; Subscribe or hire
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary">
              Accountants on subscription.
              <br />
              <span className="italic font-bold">Or hire one in-house.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
              Keep your books clean and your business compliant — without building a finance
              team from scratch. Subscribe to a dedicated accounting squad that handles
              bookkeeping, GST, payroll, and reporting every month, or have us shortlist vetted
              accountants you can hire directly, backed by a replacement guarantee.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectTab?.('subscription')}
                className="btn-gradient font-semibold text-sm px-7 py-3.5"
              >
                Explore subscription
              </button>
              <button
                type="button"
                onClick={() => onSelectTab?.('hiring')}
                className="btn-secondary font-medium text-sm px-6 py-3.5"
              >
                Hiring options &rarr;
              </button>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              Flat monthly pricing &middot; Pause or cancel anytime
            </p>
          </ScrollReveal>
        </div>

        {/* Right: video */}
        <ScrollReveal direction="right" delay={0.2}>
          <div className="w-full">
            <HeroMedia videoUrl={HERO_VIDEO_URL} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
