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
  const {
    serviceType, tier, plan, proposedPrice, workingDays,
    name, email, company, phone,
    country, states, languages,
    brandName, natureOfBusiness, shortNote, locationOfBusiness,
  } = req.body || {}

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
  if (!company || typeof company !== 'string' || company.trim().length === 0) errors.push('Brand or company name is required')
  if (!brandName || typeof brandName !== 'string' || brandName.trim().length === 0) errors.push('Brand name is required')
  if (!natureOfBusiness || typeof natureOfBusiness !== 'string' || natureOfBusiness.trim().length === 0) errors.push('Nature of business is required')
  if (!shortNote || typeof shortNote !== 'string' || shortNote.trim().length === 0) errors.push('Short note about the business is required')
  if (!locationOfBusiness || typeof locationOfBusiness !== 'string' || locationOfBusiness.trim().length === 0) errors.push('Location of business is required')

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  try {
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const dayList = (workingDays || '').split(',').map(d => d.trim()).filter(d => validDays.includes(d))

    const statesArr = Array.isArray(states) ? states.map((s) => String(s).trim()).filter(Boolean) : []
    const languagesArr = Array.isArray(languages) ? languages.map((l) => String(l).trim()).filter(Boolean) : []

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
      country: typeof country === 'string' ? country.trim() : '',
      statesCsv: statesArr.join(','),
      languagesCsv: languagesArr.join(','),
      brandName: typeof brandName === 'string' ? brandName.trim() : '',
      natureOfBusiness: typeof natureOfBusiness === 'string' ? natureOfBusiness.trim() : '',
      shortNote: typeof shortNote === 'string' ? shortNote.trim() : '',
      locationOfBusiness: typeof locationOfBusiness === 'string' ? locationOfBusiness.trim() : '',
    })
    res.status(201).json({ id, message: 'Subscription request submitted successfully' })
  } catch (err) {
    console.error('Subscription creation error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
