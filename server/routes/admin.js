import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import {
  listLandingPages, getLandingPageBySlug, createLandingPage, updateLandingPage,
  deleteLandingPage, replaceLandingPageLanguages, listLanguages, createLanguage, deleteLanguage,
} from '../lib/db.js'
import { verifyCredentials, issueSession, clearSession, requireAuth, currentAdmin } from '../lib/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UPLOADS_DIR = path.resolve(__dirname, '..', 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase()
      const random = crypto.randomBytes(8).toString('hex')
      cb(null, `${Date.now()}-${random}${ext}`)
    },
  }),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^(video|audio|image)\//.test(file.mimetype)
    cb(ok ? null : new Error('Unsupported file type'), ok)
  },
})

const router = express.Router()
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function validSlug(s) { return typeof s === 'string' && SLUG_RE.test(s) }

router.get('/login', (req, res) => {
  if (currentAdmin(req)) return res.redirect('/admin')
  res.render('login', { error: null, email: '' })
})

router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  const { email, password } = req.body || {}
  if (!verifyCredentials(email, password)) {
    return res.status(401).render('login', { error: 'Invalid email or password.', email: email || '' })
  }
  issueSession(res, email)
  res.redirect('/admin')
})

router.post('/logout', (_req, res) => {
  clearSession(res)
  res.redirect('/admin/login')
})

router.use(requireAuth)

router.get('/', (req, res) => {
  const pages = listLandingPages()
  res.render('dashboard', { pages, admin: req.admin })
})

router.get('/languages', (req, res) => {
  res.render('languages', { languages: listLanguages(), admin: req.admin, error: null })
})

router.post('/languages', express.urlencoded({ extended: true }), (req, res) => {
  const code = String(req.body.code || '').trim().toLowerCase()
  const name = String(req.body.name || '').trim()
  if (!/^[a-z]{2,10}$/.test(code) || !name) {
    return res.status(400).render('languages', {
      languages: listLanguages(), admin: req.admin,
      error: 'Code must be 2–10 lowercase letters; name is required.',
    })
  }
  try {
    createLanguage({ code, name })
  } catch (e) {
    return res.status(400).render('languages', {
      languages: listLanguages(), admin: req.admin,
      error: e.message.includes('UNIQUE') ? 'That code already exists.' : e.message,
    })
  }
  res.redirect('/admin/languages')
})

router.post('/languages/:code/delete', (req, res) => {
  deleteLanguage(req.params.code)
  res.redirect('/admin/languages')
})

router.get('/landing-pages/new', (req, res) => {
  res.render('landing-page-edit', {
    admin: req.admin,
    isNew: true,
    page: { slug: '', hero_title: '', hero_description: '', default_language_code: '', languages: [] },
    allLanguages: listLanguages(),
    error: null,
  })
})

router.get('/landing-pages/:slug/edit', (req, res) => {
  const page = getLandingPageBySlug(req.params.slug)
  if (!page) return res.redirect('/admin')
  res.render('landing-page-edit', {
    admin: req.admin,
    isNew: false,
    page,
    allLanguages: listLanguages(),
    error: null,
  })
})

router.post(
  '/landing-pages/:slug?',
  express.urlencoded({ extended: true }),
  (req, res) => {
    const existing = req.params.slug ? getLandingPageBySlug(req.params.slug) : null
    const slug = String(req.body.slug || '').trim()
    const heroTitle = String(req.body.heroTitle || '').trim()
    const heroDescription = String(req.body.heroDescription || '').trim()
    const defaultLanguageCode = String(req.body.defaultLanguageCode || '').trim() || null

    if (!validSlug(slug)) {
      return res.status(400).render('landing-page-edit', {
        admin: req.admin,
        isNew: !existing,
        page: { ...(existing || {}), slug, hero_title: heroTitle, hero_description: heroDescription, default_language_code: defaultLanguageCode, languages: parseLanguagesFromBody(req.body) },
        allLanguages: listLanguages(),
        error: 'Slug must be lowercase, digits, hyphens only (e.g., get-started).',
      })
    }

    const languages = parseLanguagesFromBody(req.body)
    let pageId
    try {
      if (existing) {
        updateLandingPage(existing.id, { slug, heroTitle, heroDescription, defaultLanguageCode })
        pageId = existing.id
      } else {
        pageId = createLandingPage({ slug, heroTitle, heroDescription, defaultLanguageCode })
      }
      replaceLandingPageLanguages(pageId, languages)
    } catch (e) {
      return res.status(400).render('landing-page-edit', {
        admin: req.admin,
        isNew: !existing,
        page: { ...(existing || {}), slug, hero_title: heroTitle, hero_description: heroDescription, default_language_code: defaultLanguageCode, languages },
        allLanguages: listLanguages(),
        error: e.message.includes('UNIQUE') ? 'That slug is already taken.' : e.message,
      })
    }
    res.redirect(`/admin/landing-pages/${slug}/edit`)
  }
)

router.post('/landing-pages/:slug/delete', (req, res) => {
  const page = getLandingPageBySlug(req.params.slug)
  if (page) deleteLandingPage(page.id)
  res.redirect('/admin')
})

router.post('/uploads', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

function parseLanguagesFromBody(body) {
  const codes = [].concat(body['lang_code'] || [])
  const videos = [].concat(body['lang_video'] || [])
  const audios = [].concat(body['lang_audio'] || [])
  const out = []
  for (let i = 0; i < codes.length; i++) {
    const code = String(codes[i] || '').trim().toLowerCase()
    if (!code) continue
    out.push({
      languageCode: code,
      videoUrl: String(videos[i] || '').trim(),
      audioUrl: String(audios[i] || '').trim(),
    })
  }
  return out
}

export default router
