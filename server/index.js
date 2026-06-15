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

// The get-started landing page moved to a customer-focused URL. Permanently
// redirect the old path (with or without a trailing slash) to the new one.
app.get(['/lp/get-started', '/lp/get-started/'], (_req, res) => {
  res.redirect(301, '/customers/designers-and-video-editors/')
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`UpSquad server running on http://localhost:${PORT}`)
  console.log(`Admin:  http://localhost:${PORT}/admin/login`)
})
