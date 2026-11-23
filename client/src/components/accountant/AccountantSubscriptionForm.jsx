"use client"

import { useEffect, useRef, useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''
const fields = [
  { name: 'name', label: 'Contact person name', autoComplete: 'name', placeholder: 'Your full name' },
  { name: 'company', label: 'Business name', autoComplete: 'organization', placeholder: 'Your business name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', placeholder: 'Your phone number' },
]

export default function AccountantSubscriptionForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [reservation, setReservation] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resumeUrl, setResumeUrl] = useState('')
  const checkoutId = useRef('')

  async function checkPayment(id, signal) {
    setVerifying(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/v1/accountant-subscription-payments/${id}`, { cache: 'no-store', signal })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Could not verify payment. Please check again.')
      if (signal?.aborted) return
      setSubmitted(data.status === 'paid')
      setResumeUrl(data.checkoutUrl || '')
      if (data.status !== 'paid') setError('Your payment has not been confirmed yet. Check again or continue your payment below.')
    } catch (err) {
      if (!signal?.aborted) setError(err.message || 'Could not verify payment. Please check again.')
    } finally {
      if (!signal?.aborted) setVerifying(false)
    }
  }

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('reservation')
    if (!id || !/^[a-f0-9]{32}$/.test(id)) return
    const controller = new AbortController()
    setReservation(id)
    checkPayment(id, controller.signal)
    return () => controller.abort()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return
    setError('')
    if (fields.some(({ name }) => !form[name].trim())) {
      setError('Please complete all four contact fields.')
      return
    }
    if (!/^(?:91)?\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit Indian mobile number, optionally prefixed with +91.')
      return
    }
    setSubmitting(true)
    try {
      if (!checkoutId.current) checkoutId.current = crypto.randomUUID().replace(/-/g, '')
      const response = await fetch(`${API_URL}/api/v1/accountant-subscription-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])),
          checkoutId: checkoutId.current,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.details?.join('. ') || data.error || 'Could not submit your request. Please try again.')
      if (data.status === 'paid') setSubmitted(true)
      else if (data.checkoutUrl) window.location.assign(data.checkoutUrl)
      else throw new Error('Cashfree checkout is unavailable. Please try again.')
    } catch (err) {
      setError(err.message || 'Could not submit your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary" aria-label="Accountant subscription request">
      <div id="buy-subscription" className="scroll-mt-28 max-w-[1160px] mx-auto rounded-2xl border-[1.5px] border-black bg-white p-6 sm:p-8 shadow-brutal">
        <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-text-primary">Buy your accountant subscription</h2>
        {submitted ? (
          <p role="status" className="mt-5 text-text-primary">Payment of ₹5,000 confirmed. Thank you! Our team will contact you to activate your accountant subscription.</p>
        ) : reservation ? (
          <div className="mt-5" aria-live="polite">
            {verifying ? <p>Verifying your payment with Cashfree…</p> : <p>{error}</p>}
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" disabled={verifying} onClick={() => checkPayment(reservation)} className="btn-gradient px-7 py-3 text-sm font-semibold disabled:opacity-60">Check payment status</button>
              {resumeUrl && <a href={resumeUrl} className="inline-flex items-center rounded-full border border-current px-7 py-3 text-sm font-semibold">Continue payment · ₹5,000</a>}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {fields.map(({ name, label, type = 'text', autoComplete, placeholder }) => (
                <label key={name} className="block min-w-0">
                  <span className="text-sm font-medium text-text-secondary">{label}</span>
                  <input
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    value={form[name]}
                    onChange={(event) => setForm((prev) => ({ ...prev, [name]: event.target.value }))}
                    placeholder={placeholder}
                    required
                    maxLength={254}
                    className="mt-2 w-full rounded-xl border border-black/20 bg-white px-3 py-3 text-sm text-text-primary outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                </label>
              ))}
            </div>
            {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-6 btn-gradient w-full sm:w-auto px-8 py-3.5 text-sm font-semibold disabled:opacity-60">
              {submitting ? 'Opening Cashfree…' : 'Buy Subscription · ₹5,000'}
            </button>
            <p className="mt-3 text-xs text-text-muted">Pay ₹5,000 securely on Cashfree for your first month.</p>
          </form>
        )}
      </div>
    </section>
  )
}
