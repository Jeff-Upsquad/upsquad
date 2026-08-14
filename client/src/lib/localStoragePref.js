const keyFor = (slug) => `upsquad:lp:lang:${slug}`

export function getLang(slug) {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(keyFor(slug))
  } catch {
    return null
  }
}

export function setLang(slug, code) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(keyFor(slug), code)
  } catch {
    // ignore quota / disabled storage
  }
}

// Prefer the visitor's last choice, then the page default, then the first language.
// Always pick something so the hero video is ready on the first play click.
export function pickInitialLang({ stored, languages, defaultLanguageCode }) {
  const list = languages || []
  const codes = new Set(list.map((l) => l.code))
  if (stored && codes.has(stored)) return stored
  if (defaultLanguageCode && codes.has(defaultLanguageCode)) return defaultLanguageCode
  return list[0]?.code || null
}
