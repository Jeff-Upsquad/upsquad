import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/admin.js'
import apiRouter from './routes/api.js'
import adminApiRouter from './routes/adminApi.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser())

const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function isAllowedOrigin(origin) {
  if (!origin) return false
  if (corsOrigins.includes(origin)) return true
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return true
  return false
}

app.use('/api', (req, res, next) => {
  const origin = req.headers.origin
  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Sites by UpSquad landing page (sites.upsquadconnect.com + /sites path).
// Mirrors the BYOS setup: static site lives in server/sites.
const SITES_HOSTS = new Set(['sites.upsquadconnect.com', 'sites.localhost'])
const SITES_DIR = path.join(__dirname, 'sites')
const sitesStatic = express.static(SITES_DIR, { index: ['index.html'], extensions: ['html'], maxAge: '1h' })

// Dedicated portfolio page routes
app.get(['/sites/portfolio', '/sites/portfolio/'], (_req, res) => {
  res.sendFile(path.join(SITES_DIR, 'portfolio', 'index.html'))
})

app.use('/sites', sitesStatic)
app.use((req, res, next) => {
  if (!SITES_HOSTS.has(req.hostname)) return next()
  if (/^\/(api|admin|uploads)(\/|$)/.test(req.path)) return next()
  if (req.path === '/portfolio' || req.path === '/portfolio/') {
    return res.sendFile(path.join(SITES_DIR, 'portfolio', 'index.html'))
  }
  sitesStatic(req, res, () => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    res.sendFile(path.join(SITES_DIR, 'index.html'))
  })
})
// BYOS landing page (byos.upsquadconnect.com). Same container, host-matched:
// the static site lives in server/byos (canonical copy — the design source is
// the Jeff-Upsquad/byos repo's landing/). /api and /admin stay reachable on the
// subdomain so the waiting-list form posts same-origin.
const BYOS_HOSTS = new Set(['byos.upsquadconnect.com', 'byos.localhost'])
const BYOS_DIR = path.join(__dirname, 'byos')
const byosStatic = express.static(BYOS_DIR, { index: 'index.html', maxAge: '1h' })
app.use((req, res, next) => {
  if (!BYOS_HOSTS.has(req.hostname)) return next()
  if (/^\/(api|admin|uploads)(\/|$)/.test(req.path)) return next()
  byosStatic(req, res, () => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    res.sendFile(path.join(BYOS_DIR, 'index.html'))
  })
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.setHeader('Access-Control-Allow-Origin', '*')
  },
}))

app.use('/admin', adminRouter)
app.use('/api', apiRouter)
app.use('/api/v1/admin', adminApiRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'UpSquad' })
})

// Partner-program landing pages moved under /partner-program/<type>.
// Permanently redirect the old paths (with or without a trailing slash).
app.get(['/accountants', '/accountants/'], (_req, res) => {
  res.redirect(301, '/partner-program/accountant/')
})
app.get(['/designers-and-editors', '/designers-and-editors/'], (_req, res) => {
  res.redirect(301, '/partner-program/designer-and-video-editor/')
})
app.get(['/partner-program', '/partner-program/'], (_req, res) => {
  res.redirect(301, '/partner-program/designer-and-video-editor/')
})
app.get(['/partner-program/agencies', '/partner-program/agencies/'], (_req, res) => {
  res.redirect(301, '/partner-program/agency/')
})

// Landing-page redirects: map admin slugs to their canonical public URLs.
const LP_REDIRECTS = {
  'get-started': '/customers/designers-and-video-editors/',
  'accountant-subscription': '/customers/accountant-subscription/',
  'partner-program': '/partner-program/designer-and-video-editor/',
  'partnerprogram-accountant': '/partner-program/accountant/',
  'partner-program-accountant': '/partner-program/accountant/',
  'accountant': '/partner-program/accountant/',
  'sales': '/partner-program/sales/',
  'partner-program-sales': '/partner-program/sales/',
  'general': '/partner-program/general/',
  'partner-program-general': '/partner-program/general/',
  'agency': '/partner-program/agency/',
  'customers': '/customers/',
  'customer-general': '/customers/',
  'partner-program-agency': '/partner-program/agency/',
  'partner-program-agencies': '/partner-program/agency/',
}

app.get(['/lp/:slug', '/lp/:slug/'], (req, res, next) => {
  const target = LP_REDIRECTS[req.params.slug]
  if (target) {
    return res.redirect(301, target)
  }
  next()
})

// Psychology practical record — hosted as static subpage under /psychology/
// Static files live in client/public/psychology -> server/public/psychology (built output).
// Keep aliases for easy sharing.
app.get(['/psychology-practical', '/psychology-practical/', '/psychology-practicals', '/psychology-practicals/', '/psychology-practical-record', '/psychology-practical-record/'], (_req, res) => {
  res.redirect(301, '/psychology/')
})
// Explicit handler for the subpage index ensures the wildcard fallback below
// (which serves the main SPA index.html) does not swallow /psychology requests
// when trailing-slash handling is involved.
app.get(['/psychology', '/psychology/'], (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'psychology', 'index.html'))
})

// SheHeal — psychological assessments app, hosted as a static subpage under
// /sheheal/. Built from the SheHeal repo (tools/sync-to-upsquad.sh) into
// client/public/sheheal -> server/public/sheheal. Explicit index handler so the
// SPA fallback below doesn't swallow it.
app.get(['/sheheal', '/sheheal/'], (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sheheal', 'index.html'))
})

// Link-preview image generated by Next (src/app/opengraph-image.jsx).
// Served with an explicit PNG content type — express.static would otherwise
// send it as application/octet-stream since the file has no extension,
// which makes WhatsApp / crawlers reject it as a preview image.
app.get('/opengraph-image', (_req, res) => {
  res.setHeader('Content-Type', 'image/png')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.sendFile(path.join(__dirname, 'public', 'opengraph-image'))
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`UpSquad server running on http://localhost:${PORT}`)
  console.log(`Admin:  http://localhost:${PORT}/admin/login`)
})
