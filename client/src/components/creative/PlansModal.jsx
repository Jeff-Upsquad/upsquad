"use client"
import { useEffect, useRef } from 'react'
import AvailabilityTable from '../pricing/AvailabilityTable'

// Read-only "Show plans" popup. Mirrors the squadhub /connect brief-form
// "Compare plans" modal — the same five availability plans (Starter → Personal)
// in a side-by-side table — but display-only (no per-plan select), with a single
// "Build my subscription" CTA that hands off to the brief form.
export default function PlansModal({ open, onClose, buildUrl }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement
    const focusables = panelRef.current?.querySelectorAll('button, a[href]')
    focusables?.[0]?.focus()

    // Lock background scroll while the modal is up.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
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
      document.body.style.overflow = prevOverflow
      const prev = previouslyFocused.current
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plans-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-2xl border-[1.5px] border-text-primary shadow-brutal-lg animate-fade-up overflow-hidden"
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div className="flex items-start gap-4 px-6 sm:px-8 pt-6 pb-5 border-b border-[rgba(0,0,0,0.08)] bg-white">
          <div className="flex-1 min-w-0">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">
              Subscription plans
            </p>
            <h2 id="plans-modal-title" className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary leading-tight">
              Compare plans
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Pick the weekly availability that fits — the same plans you&rsquo;ll choose from in the brief.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-lg border border-[rgba(0,0,0,0.08)] text-text-secondary hover:text-text-primary hover:bg-surface-secondary flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Plans table (read-only) ────────────────────── */}
        <div className="overflow-y-auto px-5 sm:px-7 py-6">
          <AvailabilityTable showCta={false} />
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <div className="px-6 sm:px-8 py-4 border-t border-[rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <p className="text-xs text-text-secondary">
            Flat monthly pricing · pause or cancel anytime.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary text-sm font-medium px-5 py-2.5"
            >
              Close
            </button>
            <a
              href={buildUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-sm font-semibold px-6 py-2.5"
            >
              Build my subscription &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
