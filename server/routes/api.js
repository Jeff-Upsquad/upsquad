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
  const { serviceType, tier, plan, proposedPrice, workingDays, name, email, company, phone } = req.body || {}

  const errors = []
  if (!serviceType || !['Designers', 'Editors', 'Designer plus Editor'].includes(serviceType)) errors.push('Invalid service type')
  const validTiers = ['Juniors', 'Pros', 'Elites']
  const tierList = (tier || '').split(',').map(t => t.trim()).filter(Boolean)
  if (tierList.length === 0 || !tierList.every(t => validTiers.includes(t))) errors.push('Invalid tier')
  if (!plan || !['starter', 'basic', 'plus', 'pro', 'personal'].includes(plan)) errors.push('Invalid plan')
  if (!proposedPrice || typeof proposedPrice !== 'number' || proposedPrice <= 0) errors.push('Proposed price must be a positive number')
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!phone || typeof phone !== 'string' || phone.trim().length < 6) errors.push('Phone number is required')

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  try {
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const dayList = (workingDays || '').split(',').map(d => d.trim()).filter(d => validDays.includes(d))

    const id = createSubscriptionRequest({
      serviceType,
      tier,
      plan,
      proposedPrice: Math.round(proposedPrice),
      workingDays: dayList.join(','),
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
