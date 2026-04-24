"use client"
import { useEffect, useState } from 'react'
import HeroMedia from './HeroMedia'
// AudioPlayer is intentionally unused right now — audio feature is hidden
// on the landing page. Admin editor and API still manage per-language audio
// URLs so this can be re-enabled later by restoring the import and <AudioPlayer />.
// import AudioPlayer from './AudioPlayer'
import LanguageGate from './LanguageGate'
import { getLang, setLang } from '../../lib/localStoragePref'

export default function LandingHero({ slug, heroTitle, heroDescription, languages, defaultLanguageCode }) {
  const [selectedCode, setSelectedCode] = useState(null)
  const [gateOpen, setGateOpen] = useState(false)

  useEffect(() => {
    const stored = getLang(slug)
    const validCodes = new Set((languages || []).map((l) => l.code))
    if (stored && validCodes.has(stored)) {
      setSelectedCode(stored)
    } else if (defaultLanguageCode && validCodes.has(defaultLanguageCode) && (languages || []).length === 1) {
      setSelectedCode(defaultLanguageCode)
    } else {
      setSelectedCode(null)
    }
  }, [slug, languages, defaultLanguageCode])

  const selected = (languages || []).find((l) => l.code === selectedCode) || null

  const ensureLanguage = () => {
    const langs = languages || []
    if (langs.length <= 1) {
      if (langs.length === 1 && !selectedCode) setSelectedCode(langs[0].code)
      return true
    }
    if (selectedCode) return true
    setGateOpen(true)
    return false
  }

  const onSelectLanguage = (code) => {
    setSelectedCode(code)
    setLang(slug, code)
    setGateOpen(false)
  }

  return (
    <section className="pt-20 md:min-h-[50vh] flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 md:py-12 grid md:grid-cols-2 gap-10 items-center w-full">
        <div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed max-w-xl">
            {heroDescription}
          </p>
          {selected && (languages || []).length > 1 && (
            <button
              type="button"
              onClick={() => setGateOpen(true)}
              aria-label="Change language"
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-600 border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12s2.015 9 4.5 9zM3.6 9h16.8M3.6 15h16.8" />
              </svg>
              Language: {selected.name}
            </button>
          )}
        </div>
        <div className="w-full">
          <HeroMedia videoUrl={selected?.videoUrl} onRequestGate={ensureLanguage} />
          {/* Audio player hidden for now. Re-enable by restoring the import
              above and uncommenting the <AudioPlayer /> below. */}
          {/* <AudioPlayer audioUrl={selected?.audioUrl} onRequestGate={ensureLanguage} /> */}
        </div>
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
