"use client"
import { useEffect, useRef } from 'react'

export default function LanguageGate({ open, languages, onSelect, onDismiss }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement
    const focusables = panelRef.current?.querySelectorAll('button')
    focusables?.[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onDismiss?.()
      } else if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      const prev = previouslyFocused.current
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [open, onDismiss])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss?.() }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="px-6 pt-6 pb-4 border-b border-[rgba(96,96,163,0.2)]">
          <h2 id="language-gate-title" className="font-heading text-lg font-bold text-text-primary">
            Choose your language
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Pick a language to watch the video and listen to the audio.
          </p>
        </div>
        <ul className="py-2">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => onSelect?.(lang.code)}
                className="w-full text-left px-6 py-3 text-sm font-medium text-slate-800 hover:bg-surface-secondary transition-colors"
              >
                {lang.name}
                <span className="ml-2 text-xs text-text-muted">{lang.code.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="px-6 py-3 border-t border-[rgba(96,96,163,0.2)] text-right">
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs text-text-secondary hover:text-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
