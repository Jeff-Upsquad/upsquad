import express from 'express'
import { createHmac, timingSafeEqual } from 'crypto'
import { listAccountantSubmissions, getAccountantSubmission, getAccountantPayment } from '../lib/db.js'
import { syncAccountantPayment } from '../lib/accountantPaymentStatus.js'

const router = express.Router()
const statuses = { paid: 'Paid', pending: 'Payment pending', cancelled: 'Cancelled', not_started: 'Not started' }
const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
const date = value => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date(value.replace(' ', 'T') + 'Z')) : '—'
const token = req => createHmac('sha256', process.env.SESSION_SECRET).update(req.cookies.upsquad_admin).digest('hex')

router.use((_req, res, next) => { res.setHeader('Cache-Control', 'no-store'); next() })

router.get('/', (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 254) : ''
  const paymentStatus = Object.hasOwn(statuses, req.query.paymentStatus) ? req.query.paymentStatus : ''
  const parsed = Number(req.query.page)
  let page = Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, 1000000) : 1
  let result = listAccountantSubmissions({ search, paymentStatus, offset: (page - 1) * 50 })
  const pageCount = Math.max(1, Math.ceil(result.total / 50))
  if (page > pageCount) {
    page = pageCount
    result = listAccountantSubmissions({ search, paymentStatus, offset: (page - 1) * 50 })
  }
  const pageUrl = target => `/admin/subscription-requests?${new URLSearchParams({ search, paymentStatus, page: String(target) })}`
  res.render('accountant-submissions', { admin: req.admin, ...result, search, paymentStatus, statuses, page, pageCount, pageUrl, money, date })
})

router.get('/:id', (req, res) => {
  const entry = /^\d+$/.test(req.params.id) ? getAccountantSubmission(Number(req.params.id)) : null
  if (!entry) return res.status(404).send('Subscription request not found')
  res.render('accountant-submission', {
    admin: req.admin, entry, statuses, money, date, csrf: token(req),
    refreshed: req.query.refreshed === '1', error: req.query.error === '1',
  })
})

router.post('/:id/refresh-payment', express.urlencoded({ extended: false }), async (req, res) => {
  const expected = Buffer.from(token(req))
  const supplied = Buffer.from(typeof req.body.csrf === 'string' ? req.body.csrf : '')
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return res.sendStatus(403)
  const entry = /^\d+$/.test(req.params.id) ? getAccountantSubmission(Number(req.params.id)) : null
  if (!entry?.payment_reference) return res.status(404).send('Payment record not found')
  try {
    await syncAccountantPayment(getAccountantPayment(entry.payment_reference))
    res.redirect(303, `/admin/subscription-requests/${entry.id}?refreshed=1`)
  } catch {
    res.redirect(303, `/admin/subscription-requests/${entry.id}?error=1`)
  }
})

export default router
