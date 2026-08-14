"use client"
import { useEffect, useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import HeroMedia from '../landing/HeroMedia'
import LanguageGate from '../landing/LanguageGate'
import { getLang, setLang, pickInitialLang } from '../../lib/localStoragePref'

// Hero for the creative (designers / video editors) landing page. Mirrors the
// accountant hero (badge + dual CTA + sub-note) while keeping the existing
// multi-language explainer-video gate that the landing page already supports.
export default function CreativeHero({
  slug,
  heroTitle,
  heroDescription,
  languages,
  defaultLanguageCode,
  onSelectTab,
}) {
  const [selectedCode, setSelectedCode] = useState(null)
  const [gateOpen, setGateOpen] = useState(false)
  const [pendingPlay, setPendingPlay] = useState(false)

  useEffect(() => {
    setSelectedCode(pickInitialLang({
      stored: getLang(slug),
      languages,
      defaultLanguageCode,
    }))
  }, [slug, languages, defaultLanguageCode])

  const selected = (languages || []).find((l) => l.code === selectedCode) || null
  const previewUrl = selected?.videoUrl || (languages || []).find((l) => l.videoUrl)?.videoUrl

  const ensureLanguage = () => {
    const langs = languages || []
    if (langs.length <= 1) {
      if (langs.length === 1 && !selectedCode) setSelectedCode(langs[0].code)
      return true
    }
    if (selectedCode) return true
    setPendingPlay(true)
    setGateOpen(true)
    return false
  }

  const onSelectLanguage = (code) => {
    setSelectedCode(code)
    setLang(slug, code)
    setGateOpen(false)
  }

  const hasLangChooser = selected && (languages || []).length > 1

  // Accent-highlight the role words (everything before " on …") so the marker
  // sits behind "Designers and video editors" but not "on subscription."
  const titleMatch = (heroTitle || '').match(/^(.*?)(\s+on\s+.*)$/i)
  const titleHead = titleMatch ? titleMatch[1] : (heroTitle || '')
  const titleTail = titleMatch ? titleMatch[2] : ''

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
              <span
                className="bg-no-repeat box-decoration-clone"
                style={{
                  backgroundImage:
                    'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                }}
              >
                {titleHead}
              </span>
              {titleTail}
              <br />
              <span className="italic font-bold">Or hire one in-house.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
              {heroDescription}
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
        <ScrollReveal direction="right" delay={0.2}>
          <div className="w-full">
            <HeroMedia
              videoUrl={selected?.videoUrl}
              previewUrl={previewUrl}
              autoPlay={pendingPlay}
              onRequestGate={ensureLanguage}
            />
          </div>
        </ScrollReveal>
      </div>

      <LanguageGate
        open={gateOpen}
        languages={languages || []}
        onSelect={onSelectLanguage}
        onDismiss={() => setGateOpen(false)}
      />
    </section>
  )
}
