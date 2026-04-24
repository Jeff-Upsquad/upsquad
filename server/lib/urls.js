export function absolutize(req, maybeUrl) {
  if (!maybeUrl) return ''
  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`
  return base.replace(/\/$/, '') + (maybeUrl.startsWith('/') ? '' : '/') + maybeUrl
}
