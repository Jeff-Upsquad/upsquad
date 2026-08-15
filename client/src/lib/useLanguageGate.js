"use client"
import { useEffect, useState } from 'react'
import { getLang, setLang, pickInitialLang } from './localStoragePref'

// Shared hero-video language gate. A stored/default language still drives the
// poster, but play always re-opens the picker when more than one language exists.
export function useLanguageGate({ slug, languages, defaultLanguageCode }) {
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

  const list = languages || []
  const selected = list.find((l) => l.code === selectedCode) || null

  const requestPlay = () => {
    if (list.length <= 1) {
      if (list.length === 1 && !selectedCode) setSelectedCode(list[0].code)
      return true
    }
    // Pulse pendingPlay so selecting the same language still starts playback.
    setPendingPlay(false)
    setGateOpen(true)
    return false
  }

  const onSelectLanguage = (code) => {
    setSelectedCode(code)
    setLang(slug, code)
    setGateOpen(false)
    setPendingPlay(true)
  }

  return {
    selected,
    selectedCode,
    gateOpen,
    setGateOpen,
    pendingPlay,
    requestPlay,
    onSelectLanguage,
    hasLangChooser: Boolean(selected && list.length > 1),
  }
}
