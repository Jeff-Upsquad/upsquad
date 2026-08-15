"use client"
import { useEffect, useRef, useState } from 'react'

export const PLAYBACK_SPEEDS = [0.5, 1, 1.25, 1.5, 2]

export default function SpeedControl({
  rate,
  onChange,
  menuPlacement = 'up',
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const menuPos = menuPlacement === 'down'
    ? 'top-full mt-1'
    : 'bottom-full mb-1'

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Playback speed"
        className="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md border border-[rgba(0,0,0,0.08)] bg-white/95 text-slate-700 hover:border-gray-300 shadow-sm"
      >
        {rate}×
      </button>
      {open && (
        <div
          role="menu"
          className={`absolute right-0 ${menuPos} w-20 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg shadow-lg overflow-hidden z-20`}
        >
          {PLAYBACK_SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              role="menuitemradio"
              aria-checked={s === rate}
              onClick={() => {
                onChange(s)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-1.5 text-xs ${
                s === rate
                  ? 'bg-surface-secondary text-text-primary'
                  : 'text-slate-600 hover:bg-surface-secondary'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
