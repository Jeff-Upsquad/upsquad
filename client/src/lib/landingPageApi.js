import { getFixture } from '../data/landingPageFixture'

const TIMEOUT_MS = 5000

export async function fetchLandingPage(slug) {
  if (process.env.NEXT_PUBLIC_LANDING_FIXTURE === '1') {
    return getFixture(slug)
  }

  // Empty string = relative (same-origin), which is what we want in production
  // where Express serves both the admin API and the static Next build.
  const baseUrl = process.env.NEXT_PUBLIC_SQUADHUB_API_URL ?? ''

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${baseUrl}/api/v1/landing-pages/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}
