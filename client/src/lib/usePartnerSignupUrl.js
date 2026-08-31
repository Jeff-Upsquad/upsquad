'use client'
import { useEffect, useState } from 'react'
import { SQUADHIRE_SIGNUP } from './signup'

const TIMEOUT_MS = 5000

export function usePartnerSignupUrl(slug) {
  const [url, setUrl] = useState(SQUADHIRE_SIGNUP.talent)

  useEffect(() => {
    if (!slug) return undefined

    const baseUrl = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    fetch(`${baseUrl}/api/v1/partner-landing-ctas/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.url) setUrl(d.url)
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer))

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [slug])

  return url
}
