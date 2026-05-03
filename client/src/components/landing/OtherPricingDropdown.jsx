"use client"
import { useEffect, useRef, useState } from 'react'

export default function OtherPricingDropdown({ options, activeType, onSelect }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!options || options.length === 0) return null

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-text-secondary hover:text-slate-700 transition-colors whitespace-nowrap"
      >
        See other categories
        <svg className={`w-3 h-3 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute z-40 right-0 mt-2 w-60 bg-white border border-[rgba(96,96,163,0.2)] rounded-xl shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              role="menuitem"
              onClick={() => { onSelect(opt); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                activeType === opt ? 'bg-brand-purple/10 text-text-primary font-medium' : 'text-slate-600 hover:bg-surface-secondary'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
