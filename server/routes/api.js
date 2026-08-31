import express from 'express'
import { randomBytes } from 'crypto'
import {
  getLandingPageBySlug,
  getPartnerLandingCtaBySlug,
  createSubscriptionRequest,
  listOpenCareerPositions,
  getOpenCareerPositionById,
  createCareerApplication,
  createOfferReservation,
  getOfferReservationById,
  getOfferReservationByPaymentLinkId,
  markOfferReservationPaid,
} from '../lib/db.js'
import { resolvePartnerCtaUrl } from '../lib/signupCta.js'
import { absolutize } from '../lib/urls.js'
import { quoteFor, roleLabel, roleNoun, normalizePhone } from '../lib/offerPlans.js'
import {
  razorpayConfigured,
  createOfferPaymentLink,
  fetchPaymentLink,
  verifyWebhookSignature,
  verifyPaymentLinkCallback,
} from '../lib/razorpay.js'

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

router.get('/v1/partner-landing-ctas/:slug', (req, res) => {
  const page = getPartnerLandingCtaBySlug(req.params.slug)
  if (!page) return res.status(404).json({ error: 'Not found' })
  res.json({
    slug: page.slug,
    title: page.title,
    publicPath: page.public_path,
    destination: page.destination,
    url: resolvePartnerCtaUrl(page.destination),
    updatedAt: page.updated_at,
  })
})

router.post('/v1/subscriptions', express.json(), (req, res) => {
  const {
    serviceType, tier, plan, proposedPrice, workingDays,
    name, email, company, phone,
    country, states, languages,
    brandName, natureOfBusiness, shortNote, locationOfBusiness, requirementNote,
  } = req.body || {}

  const errors = []
  if (!serviceType || !['Designers', 'Editors', 'Designer plus Editor'].includes(serviceType)) errors.push('Invalid service type')
  // Accept both legacy 'Elites' and new 'Top Talents' during the rename so
  // in-flight requests from cached client bundles don't 400 right after deploy.
  // Drop 'Elites' once the cutover has soaked.
  const validTiers = ['Juniors', 'Pros', 'Elites', 'Top Talents']
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
      requirementNote: typeof requirementNote === 'string' ? requirementNote.trim() : '',
    })
    res.status(201).json({ id, message: 'Subscription request submitted successfully' })
  } catch (err) {
    console.error('Subscription creation error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/v1/careers/positions', (_req, res) => {
  try {
    res.json({ positions: listOpenCareerPositions() })
  } catch (err) {
    console.error('List career positions error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/v1/careers/applications', express.json(), (req, res) => {
  const { positionId, name, email, phone } = req.body || {}
  const errors = []
  const id = parseInt(positionId, 10)
  if (!id) errors.push('Position is required')
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!phone || typeof phone !== 'string' || phone.trim().length < 6) errors.push('Phone number is required')

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  const position = getOpenCareerPositionById(id)
  if (!position) {
    return res.status(404).json({ error: 'Position not found or no longer open' })
  }

  try {
    const applicationId = createCareerApplication({
      positionId: id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
    })
    res.status(201).json({
      id: applicationId,
      message: 'Application submitted successfully',
      positionTitle: position.title,
    })
  } catch (err) {
    console.error('Career application error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

function siteUrl() {
  return (process.env.PUBLIC_SITE_URL || process.env.PUBLIC_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')
}

function apiBaseUrl() {
  return (process.env.PUBLIC_BASE_URL || 'http://localhost:3100').replace(/\/$/, '')
}

function publicReservation(row) {
  if (!row) return null
  const quote = quoteFor(row.plan_id, row.role_ids)
  const roles = quote?.roles || []
  return {
    id: row.id,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    preference: row.preference,
    roleIds: (row.role_ids || '').split(',').filter(Boolean),
    roleLabel: roleLabel(roles),
    roleNoun: roleNoun(roles),
    planId: row.plan_id,
    planName: quote?.plan.name || row.plan_id,
    hoursPerDay: quote?.plan.hoursPerDay || null,
    amount: row.amount,
    paymentId: row.payment_id || '',
    paidAt: row.paid_at,
  }
}

async function syncReservationFromRazorpay(row) {
  if (!row || row.status === 'paid' || !row.payment_link_id || !razorpayConfigured()) return row
  try {
    const link = await fetchPaymentLink(row.payment_link_id)
    if (link?.status === 'paid') {
      const payments = link.payments || []
      const paymentId = payments[0]?.payment_id || payments[0]?.id || ''
      return markOfferReservationPaid(row.id, paymentId)
    }
  } catch (err) {
    console.error('[offer] payment-link fetch failed:', err.message)
  }
  return getOfferReservationById(row.id)
}

router.post('/v1/offer/checkout', express.json(), async (req, res) => {
  const { roleIds, planId, name, email, phone, preference } = req.body || {}
  const quote = quoteFor(planId, roleIds)
  const errors = []
  if (!quote) errors.push('Choose a plan and at least one role')
  if (!name || typeof name !== 'string' || !name.trim()) errors.push('Name is required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required')
  if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
    errors.push('Valid phone number is required')
  }
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors })
  if (!razorpayConfigured()) {
    return res.status(503).json({ error: 'Payments are not configured yet' })
  }

  const id = randomBytes(12).toString('hex')
  const description = `UpSquad first-month offer — ${quote.plan.name} · ${roleLabel(quote.roles)} · ${quote.plan.hoursPerDay} hrs/day`
  const callbackUrl = `${apiBaseUrl()}/api/v1/offer/callback?reservation=${id}`

  try {
    const link = await createOfferPaymentLink({
      amountPaise: quote.amount * 100,
      customer: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        contact: normalizePhone(phone),
      },
      reservationId: id,
      description,
      callbackUrl,
    })

    createOfferReservation({
      id,
      roleIds: quote.roles.map((role) => role.id).join(','),
      planId: quote.plan.id,
      amount: quote.amount,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preference: typeof preference === 'string' ? preference.trim() : '',
      paymentLinkId: link.id,
      paymentLinkUrl: link.shortUrl,
    })

    res.status(201).json({
      reservationId: id,
      checkoutUrl: link.shortUrl,
      amount: quote.amount,
    })
  } catch (err) {
    console.error('Offer checkout error:', err)
    res.status(502).json({ error: 'Could not start Razorpay checkout' })
  }
})

router.get('/v1/offer/reservations/:id', async (req, res) => {
  const row = getOfferReservationById(req.params.id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  const synced = await syncReservationFromRazorpay(row)
  res.json(publicReservation(synced))
})

router.get('/v1/offer/callback', async (req, res) => {
  const reservationId = typeof req.query.reservation === 'string' ? req.query.reservation : ''
  const paidUrl = `${siteUrl()}/offer/?paid=${encodeURIComponent(reservationId)}`
  const cancelUrl = `${siteUrl()}/offer/?payment=cancelled`

  if (!reservationId) return res.redirect(302, cancelUrl)

  const row = getOfferReservationById(reservationId)
  if (!row) return res.redirect(302, cancelUrl)

  const status = String(req.query.razorpay_payment_link_status || '')
  const paymentId = typeof req.query.razorpay_payment_id === 'string' ? req.query.razorpay_payment_id : ''
  const signedOk = verifyPaymentLinkCallback(req.query)

  if (status === 'paid' && (signedOk || row.payment_link_id === req.query.razorpay_payment_link_id)) {
    markOfferReservationPaid(row.id, paymentId)
    return res.redirect(302, paidUrl)
  }

  const synced = await syncReservationFromRazorpay(row)
  if (synced?.status === 'paid') return res.redirect(302, paidUrl)
  return res.redirect(302, `${siteUrl()}/offer/?payment=cancelled&reservation=${encodeURIComponent(reservationId)}`)
})

router.post('/webhooks/razorpay', express.raw({ type: 'application/json' }), (req, res) => {
  const raw = req.body
  const signature = req.headers['x-razorpay-signature']
  if (!verifyWebhookSignature(raw, signature)) {
    return res.status(400).json({ error: 'Invalid signature' })
  }

  let event
  try {
    event = JSON.parse(Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw))
  } catch {
    return res.status(400).json({ error: 'Bad JSON' })
  }

  if (event.event !== 'payment_link.paid') {
    return res.json({ received: true })
  }

  const link = event.payload?.payment_link?.entity || {}
  const payment = event.payload?.payment?.entity || {}
  const notes = link.notes || {}
  const reservationId = notes.reservation_id
  const linkId = link.id
  const paymentId = payment.id || ''

  const row = (reservationId && getOfferReservationById(reservationId))
    || (linkId && getOfferReservationByPaymentLinkId(linkId))
  if (!row) return res.json({ received: true })

  markOfferReservationPaid(row.id, paymentId)
  return res.json({ received: true })
})

export default router

