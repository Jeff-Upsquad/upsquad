export function requireApiToken(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  const expected = process.env.ADMIN_API_TOKEN || ''

  if (!expected) {
    return res.status(503).json({ error: 'Admin API not configured' })
  }
  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
