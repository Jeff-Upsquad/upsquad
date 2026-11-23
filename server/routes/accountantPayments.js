import express from 'express'
import { randomBytes } from 'crypto'
import {
  createAccountantPayment, getAccountantPayment, attachAccountantPaymentLink,
  getSubscriptionRequestById,
} from '../lib/db.js'
import {
  ACCOUNTANT_PAYMENT_AMOUNT, cashfreeConfigured, createAccountantPaymentLink,
  verifyCashfreeWebhook,
} from '../lib/cashfree.js'
import { syncAccountantPayment } from '../lib/accountantPaymentStatus.js'

const router = express.Router()
const pagePath = '/customers/accountant-subscription-explainer/'
const baseUrl = () => (process.env.PUBLIC_BASE_URL || 'http://localhost:3100').replace(/\/$/, '')
const siteUrl = () => (process.env.PUBLIC_SITE_URL || baseUrl()).replace(/\/$/, '')

router.post('/v1/accountant-subscription-checkout', express.json(), async (req, res) => {
  const values = {}
  const errors = []
  for (const field of ['name', 'company', 'email', 'phone']) {
    values[field] = typeof req.body?.[field] === 'string' ? req.body[field].trim() : ''
    if (!values[field] || values[field].length > 254) errors.push(`Valid ${field} is required`)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.push('Valid email is required')
  let phone = values.phone.replace(/\D/g, '')
  if (phone.length === 12 && phone.startsWith('91')) phone = phone.slice(2)
  if (!/^\d{10}$/.test(phone)) errors.push('Enter a valid 10-digit Indian mobile number')
  const checkoutId = req.body?.checkoutId
  if (checkoutId !== undefined && (typeof checkoutId !== 'string' || !/^[a-f0-9]{32}$/.test(checkoutId))) errors.push('Invalid checkout reference')
  if (errors.length) return res.status(400).json({ error: 'Please check your contact details', details: errors })
  if (!cashfreeConfigured()) return res.status(503).json({ error: 'Payments are temporarily unavailable. Please try again later.' })

  const id = checkoutId || randomBytes(16).toString('hex')
  try {
    let row = getAccountantPayment(id)
    if (row) {
      const contact = getSubscriptionRequestById(row.subscription_request_id)
      if (contact.name !== values.name || contact.company !== values.company || contact.email !== values.email.toLowerCase() || contact.phone !== values.phone) {
        return res.status(409).json({ error: 'Contact details changed. Refresh the page to start a new checkout.' })
      }
      if (row.status === 'paid') return res.json({ reservationId: id, status: 'paid', amount: ACCOUNTANT_PAYMENT_AMOUNT })
    } else {
      row = createAccountantPayment({ id, ...values })
    }
    const link = await createAccountantPaymentLink({
      id, name: values.name, email: values.email.toLowerCase(), phone,
      returnUrl: `${baseUrl()}/api/v1/accountant-subscription-payments/${id}/return`,
      notifyUrl: `${baseUrl()}/api/webhooks/cashfree-accountant`,
    })
    if (link.link_id !== id || Number(link.link_amount) !== ACCOUNTANT_PAYMENT_AMOUNT || link.link_currency !== 'INR') throw new Error('Unexpected Cashfree payment details')
    const url = new URL(link.link_url)
    if (url.protocol !== 'https:' || !(url.hostname === 'cashfree.com' || url.hostname.endsWith('.cashfree.com'))) throw new Error('Unexpected checkout URL')
    attachAccountantPaymentLink(id, url.href)
    res.status(201).json({ reservationId: id, checkoutUrl: url.href, amount: ACCOUNTANT_PAYMENT_AMOUNT })
  } catch (err) {
    console.error('Cashfree accountant checkout:', err.message)
    res.status(502).json({ error: 'Could not open Cashfree checkout. Please try again.' })
  }
})

router.get('/v1/accountant-subscription-payments/:id', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store')
  const row = getAccountantPayment(req.params.id)
  if (!row) return res.status(404).json({ error: 'Payment reference not found' })
  try {
    const synced = await syncAccountantPayment(row)
    res.json({ status: synced.status, amount: synced.amount, checkoutUrl: synced.status === 'paid' ? undefined : synced.payment_link_url })
  } catch {
    res.status(502).json({ error: 'Could not verify payment yet. Please check again.' })
  }
})

router.get('/v1/accountant-subscription-payments/:id/return', async (req, res) => {
  const row = getAccountantPayment(req.params.id)
  if (!row) return res.redirect(302, `${siteUrl()}${pagePath}#buy-subscription`)
  // Query-string status is never proof of payment; the browser verifies via the API.
  return res.redirect(302, `${siteUrl()}${pagePath}?reservation=${encodeURIComponent(row.id)}#buy-subscription`)
})

router.post('/webhooks/cashfree-accountant', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!verifyCashfreeWebhook(req.body, req.headers['x-webhook-timestamp'], req.headers['x-webhook-signature'])) return res.sendStatus(401)
  let payload
  try { payload = JSON.parse(req.body.toString('utf8')) } catch { return res.sendStatus(400) }
  const id = payload.data?.link_id || payload.data?.link?.link_id
  const row = typeof id === 'string' ? getAccountantPayment(id) : null
  if (!row) return res.sendStatus(200)
  try {
    await syncAccountantPayment(row)
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(502)
  }
})

export default router
