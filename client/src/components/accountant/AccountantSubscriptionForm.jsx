"use client"

import { useState } from 'react'

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

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return
    setError('')
    if (fields.some(({ name }) => !form[name].trim())) {
      setError('Please complete all four contact fields.')
      return
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number with at least 10 digits.')
      return
    }
    setSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/api/v1/accountant-subscription-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]))),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.details?.join('. ') || data.error || 'Could not submit your request. Please try again.')
      setSubmitted(true)
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
          <p role="status" className="mt-5 text-text-primary">Thank you! Our team will contact you about your accountant subscription.</p>
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
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
