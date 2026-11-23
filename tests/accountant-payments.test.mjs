import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHmac } from 'node:crypto'
import express from '../server/node_modules/express/index.js'

test('plan-priced Cashfree accountant checkout', async (t) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'upsquad-cashfree-test-'))
  const originalFetch = globalThis.fetch
  const previousEnv = { ...process.env }
  const links = new Map()
  const calls = []
  let unavailable = false
  let server
  try {
    Object.assign(process.env, { CASHFREE_APP_ID: 'test-app', CASHFREE_SECRET_KEY: 'test-secret', CASHFREE_ENV: 'sandbox', PUBLIC_BASE_URL: 'https://example.test' })
    fs.writeFileSync(path.join(dir, 'package.json'), '{"type":"module"}')
    fs.cpSync('server/lib', path.join(dir, 'lib'), { recursive: true })
    fs.mkdirSync(path.join(dir, 'routes'))
    fs.copyFileSync('server/routes/accountantPayments.js', path.join(dir, 'routes/accountantPayments.js'))
    fs.symlinkSync(path.resolve('server/node_modules'), path.join(dir, 'node_modules'))
    const { default: router } = await import(pathToFileURL(path.join(dir, 'routes/accountantPayments.js')))
    const db = await import(pathToFileURL(path.join(dir, 'lib/db.js')))
    globalThis.fetch = async (url, options) => {
      if (!String(url).startsWith('https://sandbox.cashfree.com/')) return originalFetch(url, options)
      calls.push({ url, options })
      if (unavailable) throw new Error('Simulated gateway outage')
      if (options.method === 'POST') {
        const body = JSON.parse(options.body)
        if (links.has(body.link_id)) return Response.json({}, { status: 409 })
        links.set(body.link_id, { ...body, link_status: 'ACTIVE', link_amount_paid: 0, link_url: `https://payments.cashfree.com/links/${body.link_id}` })
        return Response.json(links.get(body.link_id))
      }
      const id = String(url).split('/').at(-1)
      return Response.json(links.get(id) || {}, { status: links.has(id) ? 200 : 404 })
    }
    const app = express()
    app.use('/api', router)
    server = await new Promise(resolve => { const instance = app.listen(0, '127.0.0.1', () => resolve(instance)); })
    const base = `http://127.0.0.1:${server.address().port}/api`
    const contact = { checkoutId: 'a'.repeat(32), name: ' Test Person ', company: ' Test Business ', email: 'TEST@example.com', phone: '+91 99999 99999' }
    const post = body => fetch(`${base}/v1/accountant-subscription-checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const status = id => fetch(`${base}/v1/accountant-subscription-payments/${id}`)

    await t.test('rejects missing or malformed contact fields before calling the gateway', async () => {
      for (const field of ['name', 'company', 'email', 'phone']) assert.equal((await post({ ...contact, [field]: '' })).status, 400)
      assert.equal((await post({ ...contact, email: {} })).status, 400)
      assert.equal((await post({ ...contact, phone: '123' })).status, 400)
      assert.equal((await post({ ...contact, checkoutId: '../forged' })).status, 400)
      assert.equal((await post({ ...contact, planId: 'plus' })).status, 400)
      assert.equal(calls.length, 0)
    })

    await t.test('fixes the server price to INR 5,000 and preserves the four contact fields', async () => {
      const response = await post({ ...contact, amount: 1, planId: 'starter' })
      assert.equal(response.status, 201)
      const data = await response.json()
      assert.equal(data.amount, 5000)
      assert.equal(data.checkoutUrl, `https://payments.cashfree.com/links/${contact.checkoutId}`)
      const payload = JSON.parse(calls[0].options.body)
      assert.equal(payload.link_amount, 5000)
      assert.equal(payload.link_currency, 'INR')
      assert.equal(payload.customer_details.customer_phone, '9999999999')
      assert.equal(payload.link_partial_payments, false)
      assert.deepEqual(payload.link_notify, { send_sms: false, send_email: false })
      assert.match(payload.link_meta.return_url, /\/return$/)
      const row = db.getAccountantPayment(contact.checkoutId)
      const saved = db.getSubscriptionRequestById(row.subscription_request_id)
      assert.equal(saved.name, 'Test Person')
      assert.equal(saved.company, 'Test Business')
      assert.equal(saved.email, 'test@example.com')
      assert.equal(saved.phone, contact.phone)
      assert.equal(saved.plan, 'Starter')
      assert.equal(row.status, 'pending')
    })

    await t.test('retries reuse the same payment and reject changes to its contact details', async () => {
      const row = db.getAccountantPayment(contact.checkoutId)
      assert.equal((await post(contact)).status, 201)
      assert.equal(links.size, 1)
      assert.equal(db.getAccountantPayment(contact.checkoutId).subscription_request_id, row.subscription_request_id)
      assert.equal((await post({ ...contact, company: 'Other business' })).status, 409)
    })

    await t.test('Basic charges INR 10,000, preserves the plan and rejects partial or mismatched payments', async () => {
      const id = 'd'.repeat(32)
      const response = await post({ ...contact, checkoutId: id, planId: 'basic', amount: 1 })
      assert.equal(response.status, 201)
      assert.equal((await response.json()).amount, 10000)
      assert.equal(links.get(id).link_amount, 10000)
      const row = db.getAccountantPayment(id)
      assert.equal(row.amount, 10000)
      assert.equal(db.getSubscriptionRequestById(row.subscription_request_id).plan, 'Basic')
      assert.equal((await post({ ...contact, planId: 'basic' })).status, 409)
      assert.equal((await post({ ...contact, checkoutId: id, planId: 'basic' })).status, 201)
      Object.assign(links.get(id), { link_status: 'PAID', link_amount_paid: 5000 })
      assert.equal((await (await status(id)).json()).status, 'pending')
      Object.assign(links.get(id), { link_amount: 5000, link_amount_paid: 10000 })
      assert.equal((await (await status(id)).json()).status, 'pending')
      Object.assign(links.get(id), { link_amount: 10000, link_amount_paid: 10000 })
      const paid = await (await status(id)).json()
      assert.equal(paid.status, 'paid')
      assert.equal(paid.amount, 10000)
      assert.equal((await (await post({ ...contact, checkoutId: id, planId: 'basic' })).json()).amount, 10000)
    })

    await t.test('return parameters cannot mark a payment paid', async () => {
      const response = await fetch(`${base}/v1/accountant-subscription-payments/${contact.checkoutId}/return?status=PAID`, { redirect: 'manual' })
      assert.equal(response.status, 302)
      assert.match(response.headers.get('location'), /accountant-subscription-explainer\/\?reservation=/)
      const result = await status(contact.checkoutId)
      assert.equal(result.headers.get('cache-control'), 'no-store')
      assert.equal((await result.json()).status, 'pending')
      assert.equal((await status('unknown')).status, 404)
    })

    await t.test('paid status requires matching gateway amount, currency and fully paid total', async () => {
      const link = links.get(contact.checkoutId)
      Object.assign(link, { link_status: 'PAID', link_currency: 'USD', link_amount_paid: 5000 })
      assert.equal((await (await status(contact.checkoutId)).json()).status, 'pending')
      Object.assign(link, { link_currency: 'INR', link_amount: 1 })
      assert.equal((await (await status(contact.checkoutId)).json()).status, 'pending')
      Object.assign(link, { link_amount: 5000, link_amount_paid: 100 })
      assert.equal((await (await status(contact.checkoutId)).json()).status, 'pending')
    })

    await t.test('rejects unsigned webhooks, confirms verified payment and handles repeats', async () => {
      const body = JSON.stringify({ data: { link_id: contact.checkoutId } })
      const url = `${base}/webhooks/cashfree-accountant`
      assert.equal((await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })).status, 401)
      links.get(contact.checkoutId).link_amount_paid = 5000
      const timestamp = String(Date.now())
      const signature = createHmac('sha256', 'test-secret').update(timestamp).update(body).digest('base64')
      const options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-webhook-timestamp': timestamp, 'x-webhook-signature': signature }, body }
      assert.equal((await fetch(url, options)).status, 200)
      const paidAt = db.getAccountantPayment(contact.checkoutId).paid_at
      assert.equal((await fetch(url, options)).status, 200)
      assert.equal(db.getAccountantPayment(contact.checkoutId).paid_at, paidAt)
      assert.equal((await (await status(contact.checkoutId)).json()).status, 'paid')
      assert.equal((await (await post(contact)).json()).status, 'paid')
    })

    await t.test('gateway failure never produces a checkout URL or paid record', async () => {
      unavailable = true
      const id = 'b'.repeat(32)
      const response = await post({ ...contact, checkoutId: id })
      assert.equal(response.status, 502)
      assert.equal((await response.json()).checkoutUrl, undefined)
      assert.equal(db.getAccountantPayment(id).status, 'pending')
      assert.equal((await status(id)).status, 502)
      delete process.env.CASHFREE_APP_ID
      assert.equal((await post({ ...contact, checkoutId: 'c'.repeat(32) })).status, 503)
    })
  } finally {
    globalThis.fetch = originalFetch
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key]
    Object.assign(process.env, previousEnv)
    if (server) await new Promise(resolve => server.close(resolve))
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
