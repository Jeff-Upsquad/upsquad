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
