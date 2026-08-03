"use client"
import { useEffect, useRef, useState } from 'react'

// Sticky section navigator for the three customer work modes.
// Intentionally NOT a pill/tab switcher — those three options used to live
// behind exclusive tabs; now each is a full-length section, so this chrome
// reads as "jump to section" anchors with scroll-spy active state.
export const WORK_MODES = [
  {
    id: 'subscription',
    step: '01',
    label: 'Subscription',
    blurb: 'Ongoing squad',
    sectionId: 'subscription',
  },
  {
    id: 'assignments',
    step: '02',
    label: 'Assignments',
    blurb: 'One-off work',
    sectionId: 'assignments',
  },
  {
    id: 'hiring',
    step: '03',
    label: 'Jobs',
    blurb: 'Hire in-house',
    sectionId: 'hire',
  },
]

export function scrollToWorkMode(modeId) {
  const mode = WORK_MODES.find((m) => m.id === modeId)
  if (!mode) return
  const el = document.getElementById(mode.sectionId)
  if (!el) return
  // Offset for fixed navbar (~76px) + sticky mode nav (~72px)
  const top = el.getBoundingClientRect().top + window.scrollY - 150
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

export default function WorkModeNav({ onSelect }) {
  const [active, setActive] = useState('subscription')
  const clickLock = useRef(false)

  useEffect(() => {
    const elements = WORK_MODES.map((m) => document.getElementById(m.sectionId)).filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (!visible[0]) return
        const sectionId = visible[0].target.id
        const mode = WORK_MODES.find((m) => m.sectionId === sectionId)
        if (mode) setActive(mode.id)
      },
      {
        rootMargin: '-150px 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (modeId) => {
    clickLock.current = true
    setActive(modeId)
    scrollToWorkMode(modeId)
    onSelect?.(modeId)
    window.setTimeout(() => {
      clickLock.current = false
    }, 700)
  }

  return (
    <div className="sticky top-[76px] z-40 border-y border-[rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-md">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4 pt-3 pb-0">
          <div className="hidden sm:block pb-3">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-text-muted">
              On this page
            </p>
            <p className="text-sm font-semibold text-text-primary mt-0.5">
              Three full sections — jump to any
            </p>
          </div>

          <nav
            aria-label="Jump to subscription, assignments, or jobs"
            className="flex-1 sm:flex-none grid grid-cols-3 sm:flex sm:items-stretch gap-0 w-full sm:w-auto"
          >
            {WORK_MODES.map((m) => {
              const isActive = active === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => goTo(m.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative flex flex-col items-start sm:items-center sm:min-w-[140px] px-3 sm:px-5 pt-2.5 pb-3 transition-colors duration-short border-b-2 ${
                    isActive
                      ? 'border-text-primary text-text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-[rgba(0,0,0,0.15)]'
                  }`}
                >
                  <span
                    className={`font-mono-tech text-[10px] uppercase tracking-[0.14em] ${
                      isActive ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {m.step}
                  </span>
                  <span className="text-sm font-bold leading-tight mt-0.5">{m.label}</span>
                  <span
                    className={`hidden sm:block text-[11px] mt-0.5 ${
                      isActive ? 'text-text-secondary' : 'text-text-muted'
                    }`}
                  >
                    {m.blurb}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
