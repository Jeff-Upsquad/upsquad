'use client'
import { useEffect, useState } from 'react'
import { SQUADHIRE_SIGNUP } from './signup'

const TIMEOUT_MS = 5000
const ROLE_SIGNUP_URLS = {
  accountant: 'https://squadhire.upsquadconnect.com/apply/accountant',
  'designer-and-video-editor': 'https://squadhire.upsquadconnect.com/apply/creative',
  sales: 'https://squadhire.upsquadconnect.com/apply/sales',
  agency: 'https://squadhire.upsquadconnect.com/signup/agency',
}

export function usePartnerSignupUrl(slug) {
  const [url, setUrl] = useState(ROLE_SIGNUP_URLS[slug] || SQUADHIRE_SIGNUP.talent)

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
