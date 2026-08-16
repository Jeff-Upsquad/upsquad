import Razorpay from 'razorpay'
import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Razorpay payment-link helper. Same merchant account / SDK pattern as
 * SquadBooks (`src/lib/payments/razorpay.server.ts`): env keys, hosted
 * payment links, HMAC webhook check. Money settles to this account.
 */

function keys() {
  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET
  if (!key_id || !key_secret) {
    throw new Error('Razorpay env missing: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET')
  }
  return { key_id, key_secret }
}

export function razorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}

let _rzp = null
function rzp() {
  if (!_rzp) _rzp = new Razorpay(keys())
  return _rzp
}

export async function createOfferPaymentLink({
  amountPaise,
  customer,
  reservationId,
  description,
  callbackUrl,
}) {
  const link = await rzp().paymentLink.create({
    amount: Math.round(amountPaise),
    currency: 'INR',
    accept_partial: false,
    description,
    customer: {
      name: customer.name,
      contact: customer.contact,
      email: customer.email,
    },
    notify: { sms: false, email: false },
    reminder_enable: false,
    notes: {
      reservation_id: String(reservationId),
      source: 'upsquad-offer',
    },
    ...(callbackUrl
      ? { callback_url: callbackUrl, callback_method: 'get' }
      : {}),
  })

  return {
    id: link.id,
    shortUrl: link.short_url,
    status: link.status || 'created',
  }
}

export async function fetchPaymentLink(paymentLinkId) {
  return rzp().paymentLink.fetch(paymentLinkId)
}

export function verifyWebhookSignature(rawBody, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!signature || !secret) return false
  const body = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody, 'utf8')
  const expected = createHmac('sha256', secret).update(body).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && timingSafeEqual(a, b)
}

/**
 * Payment-link redirect callback signature.
 * HMAC-SHA256(payment_link_id|reference_id|status|payment_id, key_secret)
 */
export function verifyPaymentLinkCallback(query) {
  const {
    razorpay_payment_id: paymentId,
    razorpay_payment_link_id: linkId,
    razorpay_payment_link_reference_id: referenceId = '',
    razorpay_payment_link_status: status,
    razorpay_signature: signature,
  } = query || {}
  if (!paymentId || !linkId || !status || !signature) return false
  const { key_secret } = keys()
  const payload = `${linkId}|${referenceId}|${status}|${paymentId}`
  const expected = createHmac('sha256', key_secret).update(payload).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && timingSafeEqual(a, b)
}
