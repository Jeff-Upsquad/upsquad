"use client"
import { useLayoutEffect } from 'react'

const JUMP_HASHES = new Set(['#plans', '#subscription', '#build', '#assignments', '#hire'])

// Marketing landings should open at the hero. Shared links often keep a leftover
// hash (e.g. #plans after "See plans") or the browser restores a mid-page scroll.
export function useLandingScrollReset() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (JUMP_HASHES.has(window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
  }, [])
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 150
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
