import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import express from '../server/node_modules/express/index.js'
import cookieParser from '../server/node_modules/cookie-parser/index.js'
import jwt from '../server/node_modules/jsonwebtoken/index.js'

test('authenticated admin accountant submissions', async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'upsquad-admin-submissions-'))
  const originalFetch = globalThis.fetch
  const previousEnv = { ...process.env }
  let server
  let providerAmount = 5000
  let providerStatus = 'ACTIVE'
  let unavailable = false
  let gatewayCalls = 0
  try {
    Object.assign(process.env, { SESSION_SECRET: 'isolated-test-session', CASHFREE_APP_ID: 'test-app', CASHFREE_SECRET_KEY: 'test-secret', CASHFREE_ENV: 'sandbox' })
    fs.writeFileSync(path.join(dir, 'package.json'), '{"type":"module"}')
    for (const folder of ['lib', 'routes', 'views']) fs.cpSync(`server/${folder}`, path.join(dir, folder), { recursive: true })
    fs.symlinkSync(path.resolve('server/node_modules'), path.join(dir, 'node_modules'))
    const { default: adminRouter } = await import(pathToFileURL(path.join(dir, 'routes/admin.js')))
    const db = await import(pathToFileURL(path.join(dir, 'lib/db.js')))
    const contact = { name: 'Test Contact', company: 'Test Business', email: 'contact@example.com', phone: '+91 99999 99999' }
    const pending = db.createAccountantPayment({ id: 'a'.repeat(32), ...contact })
    const paid = db.createAccountantPayment({ id: 'b'.repeat(32), ...contact, name: 'Paid Customer' })
    db.markAccountantPaymentPaid(paid.id)
    const legacyId = db.createSubscriptionRequest({ ...contact, name: '<script>alert(1)</script>', serviceType: 'Accountants', tier: '', plan: '', proposedPrice: 0 })
    const designerId = db.createSubscriptionRequest({ ...contact, serviceType: 'Designers', tier: 'Pros', plan: 'basic', proposedPrice: 5000 })
    globalThis.fetch = async (url, options) => {
      if (!String(url).startsWith('https://sandbox.cashfree.com/')) return originalFetch(url, options)
      gatewayCalls++
      if (unavailable) throw new Error('Simulated outage')
      return Response.json({ link_id: String(url).split('/').at(-1), link_status: providerStatus, link_currency: 'INR', link_amount: providerAmount, link_amount_paid: providerAmount })
    }
    const app = express()
    app.set('view engine', 'ejs')
    app.set('views', path.join(dir, 'views'))
    app.use(cookieParser())
    app.use('/admin', adminRouter)
    server = await new Promise(resolve => { const instance = app.listen(0, '127.0.0.1', () => resolve(instance)); })
    const base = `http://127.0.0.1:${server.address().port}/admin/subscription-requests`
    const cookie = `upsquad_admin=${jwt.sign({ sub: 'admin@example.com' }, process.env.SESSION_SECRET, { expiresIn: '1h' })}`
    const get = (suffix = '') => fetch(base + suffix, { headers: { Cookie: cookie }, redirect: 'manual' })

    await t.test('requires an admin session for list, detail and payment refresh', async () => {
      for (const suffix of ['', `/${pending.subscription_request_id}`, `/${pending.subscription_request_id}/refresh-payment`]) {
        const response = await fetch(base + suffix, { redirect: 'manual', method: suffix.endsWith('refresh-payment') ? 'POST' : 'GET' })
        assert.equal(response.status, 302)
        assert.equal(response.headers.get('location'), '/admin/login')
      }
    })

    await t.test('shows saved contacts, paid totals and legacy requests without exposing other services', async () => {
      const response = await get()
      assert.equal(response.status, 200)
      assert.equal(response.headers.get('cache-control'), 'no-store')
      const html = await response.text()
      for (const value of ['Test Contact', 'Test Business', 'contact@example.com', '+91 99999 99999', 'Paid Customer', 'Not started', '₹5,000']) assert.ok(html.includes(value), value)
      assert.ok(html.includes('3 requests'))
      assert.ok(!html.includes(`href="/admin/subscription-requests/${designerId}"`))
      assert.ok(html.includes('&lt;script&gt;'))
      assert.ok(!html.includes('<script>alert(1)</script>'))
      assert.equal(gatewayCalls, 0)
    })

    await t.test('searches all four contact fields and filters by payment status', async () => {
      for (const search of ['Paid Customer', 'Test Business', 'contact@example.com', '99999']) {
        assert.ok((await (await get(`?search=${encodeURIComponent(search)}`)).text()).includes('Paid Customer'))
      }
      const paidHtml = await (await get('?paymentStatus=paid')).text()
      assert.ok(paidHtml.includes('Paid Customer'))
      assert.ok(!paidHtml.includes('Test Contact'))
      assert.ok(paidHtml.includes('1 requests'))
      const legacyHtml = await (await get('?paymentStatus=not_started')).text()
      assert.ok(legacyHtml.includes(`href="/admin/subscription-requests/${legacyId}"`))
      assert.ok(!legacyHtml.includes('Paid Customer'))
      assert.ok((await (await get('?search=does-not-exist')).text()).includes('No subscription requests found for these filters'))
      assert.ok((await (await get('?search=%27%20OR%201%3D1--')).text()).includes('No subscription requests found'))
    })

    await t.test('detail includes business, payment reference, amount and dates; missing or wrong-service IDs return 404', async () => {
      const html = await (await get(`/${pending.subscription_request_id}`)).text()
      for (const value of ['Contact person name', 'Business name', 'Test Business', pending.id, 'Cashfree', '₹5,000', 'IST']) assert.ok(html.includes(value), value)
      assert.equal((await get('/9999999')).status, 404)
      assert.equal((await get(`/${designerId}`)).status, 404)
      assert.equal((await get('/invalid')).status, 404)
    })

    await t.test('payment refresh validates CSRF and verifies gateway price before recording paid', async () => {
      const html = await (await get(`/${pending.subscription_request_id}`)).text()
      const csrf = html.match(/name="csrf" value="([a-f0-9]+)"/)[1]
      const refresh = token => fetch(`${base}/${pending.subscription_request_id}/refresh-payment`, { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ csrf: token }), redirect: 'manual' })
      assert.equal((await refresh('forged')).status, 403)
      assert.equal(gatewayCalls, 0)
      unavailable = true
      let response = await refresh(csrf)
      assert.equal(response.status, 303)
      assert.ok(response.headers.get('location').endsWith('?error=1'))
      assert.equal(db.getAccountantPayment(pending.id).status, 'pending')
      unavailable = false
      providerStatus = 'PAID'
      providerAmount = 1
      assert.equal((await refresh(csrf)).status, 303)
      assert.equal(db.getAccountantPayment(pending.id).status, 'pending')
      providerAmount = 5000
      response = await refresh(csrf)
      assert.ok(response.headers.get('location').endsWith('?refreshed=1'))
      assert.equal(db.getAccountantPayment(pending.id).status, 'paid')
      assert.ok((await (await get(`/${pending.subscription_request_id}`)).text()).includes('Paid'))
    })

    await t.test('paginates and keeps filters in next/previous links', async () => {
      for (let i = 0; i < 51; i++) db.createSubscriptionRequest({ ...contact, company: 'Pagination fixture', serviceType: 'Accountants', tier: '', plan: '', proposedPrice: 0 })
      const first = await (await get('?search=Pagination&paymentStatus=not_started')).text()
      assert.ok(first.includes('Page 1 of 2'))
      assert.ok(first.includes('search=Pagination&amp;paymentStatus=not_started&amp;page=2'))
      assert.equal((first.match(/aria-label="View request/g) || []).length, 50)
      const second = await (await get('?search=Pagination&paymentStatus=not_started&page=999')).text()
      assert.ok(second.includes('Page 2 of 2'))
      assert.equal((second.match(/aria-label="View request/g) || []).length, 1)
    })
  } finally {
    globalThis.fetch = originalFetch
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key]
    Object.assign(process.env, previousEnv)
    if (server) await new Promise(resolve => server.close(resolve))
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
