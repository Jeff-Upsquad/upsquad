"use client"
import { useEffect, useRef } from 'react'

/* ── timeline scale (9 AM → 11 PM) ─────────────────────────
   A single shared scale so every bar in the infographic lines
   up. pct() maps a 24h hour onto 0–100% of the track. */
const DAY_START = 9   // 9 AM
const DAY_END = 23    // 11 PM
const SPAN = DAY_END - DAY_START
const pct = (h) => ((h - DAY_START) / SPAN) * 100

// Axis ticks — edge ones anchor to the track ends, the rest center, so labels
// never run off the track or collide on a narrow (mobile) viewport.
const ticks = [
  { h: 9, label: '9 AM', anchor: 'start' },
  { h: 15, label: '3 PM' },
  { h: 18, label: '6 PM' },
  { h: 23, label: '11 PM', anchor: 'end' },
]

// Example windows a partner might choose — full-time or part-time.
const exampleWindows = [
  { tag: 'Full day', start: 10, end: 18, range: '10 AM – 6 PM' },
  { tag: 'Part-time', start: 14, end: 17, range: '2 PM – 5 PM' },
  { tag: 'Evenings', start: 18, end: 22, range: '6 PM – 10 PM' },
]

// Capacity options — a fixed daily commitment. fill drives the bar height.
const capacity = [
  { hrs: '1', label: 'hr / day', fill: 22 },
  { hrs: '5', label: 'hrs / day', fill: 52 },
  { hrs: '8', label: 'hrs / day', fill: 80 },
  { hrs: '10', label: 'hrs / day', fill: 100 },
]

// Common windows clients ask for — used for the matching visual.
const clientWindows = ['10 AM – 6 PM', '3 PM – 6 PM', '6 PM – 10 PM']

/* ── small building blocks ─────────────────────────────── */

function StepBadge({ n }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-brand-purple text-text-primary text-xs font-bold border-[1.5px] border-text-primary shrink-0">
      {n}
    </span>
  )
}

function TimelineTrack({ children }) {
  return (
    <div className="relative">
      {/* base track */}
      <div className="relative h-2 rounded-full bg-surface-secondary border border-[rgba(96,96,163,0.15)]" />
      {children}
    </div>
  )
}

/* ── component ─────────────────────────────────────────── */

export default function VirtualOfficeHoursModal({ open, onClose }) {
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
      aria-labelledby="voh-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border-[1.5px] border-text-primary shadow-brutal-lg animate-fade-up"
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div className="sticky top-0 z-10 flex items-start gap-4 px-6 sm:px-8 pt-6 pb-5 border-b border-[rgba(96,96,163,0.2)] bg-white/95 backdrop-blur-sm">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-purple text-text-primary border-[1.5px] border-text-primary shadow-brutal-sm shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary">How it works</p>
            <h2 id="voh-title" className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary leading-tight">
              Virtual Office Hours
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-9 h-9 rounded-lg border border-[rgba(96,96,163,0.2)] text-text-secondary hover:text-text-primary hover:bg-surface-secondary flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-7">
          <p className="text-sm text-text-secondary leading-relaxed">
            Set your own online hours based on your capacity, then get matched with clients who want
            those exact hours. You stay reachable during your window — nothing more.
          </p>

          {/* ── Step 1 — capacity ───────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <StepBadge n="1" />
              <h3 className="font-heading text-base font-bold text-text-primary">Pick a daily commitment</h3>
            </div>
            <div className="rounded-xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-5">
              <div className="grid grid-cols-4 gap-3 items-end h-32">
                {capacity.map((c) => (
                  <div key={c.hrs} className="flex flex-col items-center justify-end h-full">
                    <span className="font-heading text-sm font-extrabold text-text-primary mb-1.5">{c.hrs}<span className="text-text-muted font-semibold text-[10px]">h</span></span>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className="w-full rounded-md bg-brand-purple border-[1.5px] border-text-primary"
                        style={{ height: `${c.fill}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-text-muted mt-2 text-center leading-tight">{c.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mt-4">
                Choose a fixed number of hours per day — <span className="font-semibold text-text-primary">1, 5, 8, or 10</span> —
                that matches the capacity you can give.
              </p>
            </div>
          </section>

          {/* ── Step 2 — window ─────────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <StepBadge n="2" />
              <h3 className="font-heading text-base font-bold text-text-primary">Set your timing window</h3>
            </div>
            <div className="rounded-xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-5">
              <div className="space-y-4">
                {exampleWindows.map((w) => (
                  <div key={w.tag} className="grid grid-cols-[84px_1fr] items-center gap-3">
                    <span className="text-[11px] font-semibold text-text-secondary">{w.tag}</span>
                    <TimelineTrack>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-brand-purple border border-text-primary"
                        style={{ left: `${pct(w.start)}%`, width: `${pct(w.end) - pct(w.start)}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-text-primary whitespace-nowrap">{w.range}</span>
                      </div>
                    </TimelineTrack>
                  </div>
                ))}
              </div>
              {/* hour axis */}
              <div className="grid grid-cols-[84px_1fr] gap-3 mt-3">
                <span />
                <div className="relative h-4">
                  {ticks.map((t) => {
                    const anchor =
                      t.anchor === 'start' ? 'translate-x-0'
                      : t.anchor === 'end' ? '-translate-x-full'
                      : '-translate-x-1/2'
                    return (
                      <span
                        key={t.h}
                        className={`absolute top-0 text-[9px] text-text-muted whitespace-nowrap ${anchor}`}
                        style={{ left: `${pct(t.h)}%` }}
                      >
                        {t.label}
                      </span>
                    )
                  })}
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mt-4">
                Choose the window you&apos;ll be online — full-time or part-time, your call. These are just examples.
              </p>
            </div>
          </section>

          {/* ── Step 3 — matching ───────────────────────── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <StepBadge n="3" />
              <h3 className="font-heading text-base font-bold text-text-primary">Get matched with clients</h3>
            </div>
            <div className="rounded-xl border border-[rgba(96,96,163,0.2)] bg-surface-secondary p-5">
              <div className="space-y-4">
                {/* your window */}
                <div className="grid grid-cols-[68px_1fr] items-center gap-3">
                  <span className="text-[11px] font-bold text-text-primary">You</span>
                  <TimelineTrack>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-brand-purple border border-text-primary"
                      style={{ left: `${pct(18)}%`, width: `${pct(22) - pct(18)}%` }}
                    />
                  </TimelineTrack>
                </div>
                {/* client window */}
                <div className="grid grid-cols-[68px_1fr] items-center gap-3">
                  <span className="text-[11px] font-bold text-text-primary">Client</span>
                  <TimelineTrack>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-brand-cyan border border-text-primary"
                      style={{ left: `${pct(18)}%`, width: `${pct(22) - pct(18)}%` }}
                    />
                  </TimelineTrack>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-text-primary bg-brand-green/15 border border-brand-green/40 rounded-full px-3 py-1">
                  <svg className="w-3.5 h-3.5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Hours overlap → matched
                </span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mt-4">
                Clients pick their preferred hours too. We pair you with the ones whose window fits yours.
                Common client windows:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {clientWindows.map((w) => (
                  <span key={w} className="text-[11px] font-medium text-text-primary bg-white border border-[rgba(96,96,163,0.2)] rounded-full px-3 py-1">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Online callout ──────────────────────────── */}
          <div className="rounded-xl border-[1.5px] border-text-primary bg-brand-purple/15 p-5 flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-[rgba(96,96,163,0.2)] text-text-primary shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            <div>
              <h4 className="font-heading text-sm font-bold text-text-primary mb-0.5">Stay online during your hours</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Within your window, be available for communication and client meetings. That&apos;s the only thing you owe the clock.
              </p>
            </div>
          </div>

          {/* ── Two rules ───────────────────────────────── */}
          <section>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-text-secondary mb-3">Good to know</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* rule 1 */}
              <div className="rounded-xl border border-[rgba(96,96,163,0.2)] bg-white p-5">
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/30 border border-[rgba(96,96,163,0.2)] text-text-primary flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">Change once every 30 days</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Need different hours? You can update your virtual office hours once every 30 days.
                </p>
              </div>
              {/* rule 2 */}
              <div className="rounded-xl border border-[rgba(96,96,163,0.2)] bg-white p-5">
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/30 border border-[rgba(96,96,163,0.2)] text-text-primary flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-sm font-semibold text-text-primary mb-1">Check in to get seen</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Check in on our software during your hours and clients are notified you&apos;re online and ready.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        <div className="px-6 sm:px-8 py-4 border-t border-[rgba(96,96,163,0.2)] flex justify-end bg-white">
          <button
            type="button"
            onClick={onClose}
            className="btn-gradient text-sm font-semibold px-6 py-2.5"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
