import express from 'express'
import { getLandingPageBySlug, createSubscriptionRequest } from '../lib/db.js'
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

router.post('/v1/subscriptions', express.json(), (req, res) => {
  const { serviceType, tier, plan, proposedPrice, name, email, company, phone } = req.body || {}

  const errors = []
  if (!serviceType || !['Designers', 'Editors'].includes(serviceType)) errors.push('Invalid service type')
  if (!tier || !['Juniors', 'Pros', 'Elites'].includes(tier)) errors.push('Invalid tier')
  if (!plan || !['starter', 'basic', 'plus', 'pro', 'personal'].includes(plan)) errors.push('Invalid plan')
  if (!proposedPrice || typeof proposedPrice !== 'number' || proposedPrice <= 0) errors.push('Proposed price must be a positive number')
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!phone || typeof phone !== 'string' || phone.trim().length < 6) errors.push('Phone number is required')

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  try {
    const id = createSubscriptionRequest({
      serviceType,
      tier,
      plan,
      proposedPrice: Math.round(proposedPrice),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: (company || '').trim(),
      phone: phone.trim(),
    })
    res.status(201).json({ id, message: 'Subscription request submitted successfully' })
  } catch (err) {
    console.error('Subscription creation error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
