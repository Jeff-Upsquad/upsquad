import { createHmac, timingSafeEqual } from 'crypto'

export const ACCOUNTANT_PAYMENT_AMOUNT = 5000

export function cashfreeConfigured() {
  return Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY)
}

async function request(path, options = {}) {
  if (!cashfreeConfigured()) throw new Error('Cashfree is not configured')
  const base = process.env.CASHFREE_ENV === 'sandbox' ? 'https://sandbox.cashfree.com' : 'https://api.cashfree.com'
  const response = await fetch(`${base}/pg${path}`, {
    ...options,
    signal: AbortSignal.timeout(20000),
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      'x-api-version': process.env.CASHFREE_API_VERSION || '2025-01-01',
    },
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(`Cashfree request failed (${response.status})`)
  return data
}

export function fetchAccountantPaymentLink(id) {
  return request(`/links/${encodeURIComponent(id)}`)
}

export async function createAccountantPaymentLink({ id, name, email, phone, returnUrl, notifyUrl }) {
  try {
    return await request('/links', {
      method: 'POST',
      body: JSON.stringify({
        link_id: id,
        link_amount: ACCOUNTANT_PAYMENT_AMOUNT,
        link_currency: 'INR',
        link_purpose: 'UpSquad accountant subscription — first month',
        customer_details: { customer_name: name, customer_email: email, customer_phone: phone },
        link_partial_payments: false,
        link_notify: { send_sms: false, send_email: false },
        link_auto_reminders: false,
        link_notes: { source: 'accountant-subscription-explainer', reservation_id: id },
        link_meta: { return_url: returnUrl, notify_url: notifyUrl },
      }),
    })
  } catch (error) {
    // Reuse the deterministic link after a timeout or a repeated submission.
    try { return await fetchAccountantPaymentLink(id) } catch { throw error }
  }
}

export function isAccountantPaymentPaid(link, id) {
  return link?.link_id === id && link.link_status === 'PAID'
    && link.link_currency === 'INR' && Number(link.link_amount) === ACCOUNTANT_PAYMENT_AMOUNT
    && Number(link.link_amount_paid) >= ACCOUNTANT_PAYMENT_AMOUNT
}

export function verifyCashfreeWebhook(rawBody, timestamp, signature) {
  if (!process.env.CASHFREE_SECRET_KEY || typeof timestamp !== 'string' || typeof signature !== 'string') return false
  const expected = createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
    .update(timestamp).update(rawBody).digest('base64')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  return a.length === b.length && timingSafeEqual(a, b)
}
