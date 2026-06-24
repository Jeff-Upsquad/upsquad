"use client"
import { useRef } from 'react'
import Link from 'next/link'

// Animated hanging-signboard logo: drop-in entrance + idle wind sway + tap-to-swing.
// Mirrors the logo in Navbar so the brand mark animates identically on the minimal
// partner-program headers too. The animation classes (logo-drop / logo-tap /
// logo-sway) live in index.css.
export default function HangingLogo({ className = '' }) {
  const logoTapRef = useRef(null)
  const triggerLogoTap = (e) => {
    if (e && (e.button !== 0 || e.ctrlKey || e.metaKey)) return // left-press only
    const el = logoTapRef.current
    if (!el) return
    el.classList.remove('is-tapped')
    void el.offsetWidth // force reflow so the animation restarts on every tap
    el.classList.add('is-tapped')
  }

  return (
    <Link
      href="/"
      aria-label="UpSquad home"
      onPointerDown={triggerLogoTap}
      className={`relative inline-block self-start ${className}`}
    >
      <span className="logo-drop block">
        <span
          ref={logoTapRef}
          onAnimationEnd={(e) => { if (e.animationName === 'tapSwing') logoTapRef.current?.classList.remove('is-tapped') }}
          className="logo-tap block"
        >
          <span className="logo-sway relative block pt-5">
            {/* threads — converge at an anchor above the top edge, so their start is off-screen */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[-8px] h-7 w-full overflow-visible">
              <line x1="50%" y1="0" x2="14%" y2="100%" stroke="rgba(10,10,10,0.42)" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="50%" y1="0" x2="86%" y2="100%" stroke="rgba(10,10,10,0.42)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {/* signboard */}
            <span className="inline-flex items-baseline gap-1 bg-[#0A0A0A] text-white border-2 border-white rounded-xl px-4 py-2 font-heading font-extrabold text-lg leading-none tracking-tight shadow-[0_8px_18px_-6px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
              UpSquad
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FFFF99] shadow-[0_0_8px_rgba(255,255,153,0.75)]" />
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
