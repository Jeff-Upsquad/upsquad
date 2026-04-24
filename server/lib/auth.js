import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'upsquad_admin'
const SESSION_TTL_SECONDS = 60 * 60 * 8

export function verifyCredentials(email, password) {
  const expectedEmail = (process.env.ADMIN_EMAIL || '').toLowerCase()
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || ''
  if (!expectedEmail || !expectedHash) return false
  if ((email || '').toLowerCase() !== expectedEmail) return false
  return bcrypt.compareSync(password || '', expectedHash)
}

export function issueSession(res, email) {
  const token = jwt.sign({ sub: email.toLowerCase() }, process.env.SESSION_SECRET, {
    expiresIn: SESSION_TTL_SECONDS,
  })
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: '/',
  })
}

export function clearSession(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
}

export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.redirect('/admin/login')
  try {
    const payload = jwt.verify(token, process.env.SESSION_SECRET)
    req.admin = { email: payload.sub }
    next()
  } catch {
    return res.redirect('/admin/login')
  }
}

export function currentAdmin(req) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return null
  try {
    return jwt.verify(token, process.env.SESSION_SECRET)
  } catch {
    return null
  }
}
