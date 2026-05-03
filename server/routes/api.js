import express from 'express'
import { getLandingPageBySlug } from '../lib/db.js'
import { absolutize } from '../lib/urls.js'

const router = express.Router()

router.get('/v1/landing-pages/:slug', (req, res) => {
  const page = getLandingPageBySlug(req.params.slug)
  if (!page) return res.status(404).json({ error: 'Not found' })
  res.json({
    slug: page.slug,
    heroTitle: page.hero_title,
    heroDescription: page.hero_description,
    defaultLanguageCode: page.default_language_code,
    languages: page.languages.map((l) => ({
      code: l.code,
      name: l.name,
      videoUrl: absolutize(req, l.video_url),
      audioUrl: absolutize(req, l.audio_url),
    })),
    updatedAt: page.updated_at,
  })
})

export default router
