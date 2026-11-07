"use client"
import ScrollReveal from '../ScrollReveal'
import HeroMedia from '../landing/HeroMedia'
import LanguageGate from '../landing/LanguageGate'
import WhatsAppIcon from '../WhatsAppIcon'
import { useLanguageGate } from '../../lib/useLanguageGate'

// SquadHire Business line — the single CTA destination for this page.
const WA_NUMBER = '919995266342'
export const explainerWaLink = () =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi UpSquad, I'm interested in the Accountant Subscription. (Fixed Plans)"
  )}`

// Hero for the standalone accountant-subscription explainer page. The
// explainer video and hero copy are admin-managed under the
// "accountant-subscription-explainer" landing page slug (admin +
// /api/v1/landing-pages/accountant-subscription-explainer) — same
// multi-language gate the other landing page heroes use. The props fall back
// to the explainer-script copy.
const FALLBACK_TITLE = 'Your business accounting, on a fixed monthly payment.'
const FALLBACK_DESCRIPTION =
  'A dedicated UpSquad accountant manages your day-to-day books, monthly reports, GST, and payroll — backed by two secondary accountants and a Squad Manager. Plans start from ₹5,000/month.'

export default function ExplainerHero({
  slug = 'accountant-subscription-explainer',
  badge = 'Accountant Subscription',
  heroTitle,
  heroDescription,
  languages,
  defaultLanguageCode,
  waHref,
  footnote = 'Flat monthly pricing · Pause or cancel anytime',
  // Optional: shown instead of the player when no language has a video.
  noVideoContent,
}) {
  const {
    selected,
    selectedCode,
    gateOpen,
    setGateOpen,
    pendingPlay,
    requestPlay,
    onSelectLanguage,
    hasLangChooser,
  } = useLanguageGate({ slug, languages, defaultLanguageCode })

  const previewUrl = selected?.videoUrl || (languages || []).find((l) => l.videoUrl)?.videoUrl

  // Accent-highlight the words before " on …" so the marker sits behind
  // "Your business accounting" but not "on a fixed monthly payment."
  const title = heroTitle || FALLBACK_TITLE
  const titleMatch = title.match(/^(.*?)(\s+on\s+.*)$/i)
  const titleHead = titleMatch ? titleMatch[1] : title
  const titleTail = titleMatch ? titleMatch[2] : ''

  return (
    <section className="pt-24 md:pt-28 pb-12 md:pb-16 bg-white">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-10 lg:gap-12 items-center w-full">
        {/* Left: copy */}
        <div>
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-white border border-black/80 px-3 py-1.5 rounded-full mb-6 shadow-brutal-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              {badge} &middot; Explained
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-text-primary">
              {/* .hero-highlight is dark-mode aware (see index.css): solid
                  #FFFF99 makes near-white dark-mode ink unreadable. */}
              <span className="hero-highlight box-decoration-clone">{titleHead}</span>
              {titleTail}
              <br />
              <span className="italic font-bold">Plans from &#8377;5,000/month.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
              {heroDescription || FALLBACK_DESCRIPTION}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {/* The page's single CTA: WhatsApp to the business line. */}
              <a
                href={waHref || explainerWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              {footnote}
            </p>

            {hasLangChooser && (
              <button
                type="button"
                onClick={() => setGateOpen(true)}
                aria-label="Change language"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-[rgba(0,0,0,0.08)] rounded-full px-3 py-1.5 hover:border-gray-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
                </svg>
                Language: {selected.name}
              </button>
            )}
          </ScrollReveal>
        </div>

        {/* Right: video */}
        <ScrollReveal delay={0.2}>
          <div className="w-full">
            {noVideoContent && !previewUrl ? (
              noVideoContent
            ) : (
              <HeroMedia
                videoUrl={selected?.videoUrl}
                previewUrl={previewUrl}
                autoPlay={pendingPlay}
                onRequestGate={requestPlay}
                needsGate={(languages || []).length > 1}
              />
            )}
          </div>
        </ScrollReveal>
      </div>

      <LanguageGate
        open={gateOpen}
        languages={languages || []}
        selectedCode={selectedCode}
        onSelect={onSelectLanguage}
        onDismiss={() => setGateOpen(false)}
      />
    </section>
  )
}
