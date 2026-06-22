"use client"
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'upsquad-theme'

// Minimal light/dark switch for the nav bar.
// Source of truth is the `.dark` class on <html> (set pre-paint by the
// inline script in app/layout.jsx). This only reads/writes that class
// plus localStorage — it never consults the OS preference, so the site
// stays on whatever the user last chose, defaulting to light.
export default function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = !root.classList.contains('dark')
    // One-shot transition just for this switch, then cleaned up.
    root.classList.add('theme-transition')
    root.classList.toggle('dark', next)
    try { localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light') } catch (e) {}
    setIsDark(next)
    window.setTimeout(() => root.classList.remove('theme-transition'), 320)
  }

  // Until mounted, render the light-mode icon to match the server output.
  const dark = mounted && isDark

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-text-secondary transition-colors duration-300 hover:text-text-primary hover:border-black/25 dark:border-white/15 dark:hover:border-white/30 ${className}`}
    >
      {dark ? (
        // Sun — click to return to light
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Moon — click to switch to dark
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
