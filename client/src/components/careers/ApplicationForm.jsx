"use client"
import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

const inputBase =
  'w-full px-4 py-3 border-2 rounded-lg text-sm outline-none transition-all bg-white focus:shadow-brutal-sm focus:-translate-y-px'
const inputOK = 'border-text-primary focus:border-text-primary'
const inputErr = 'border-brand-orange focus:border-brand-orange'

export default function ApplicationForm({ position, onCancel, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (form.phone.trim().length < 6) errs.phone = 'Enter a valid phone number'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    setServerError('')

    try {
      const res = await fetch(`${API_URL}/api/v1/careers/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          positionId: position.id,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const msg = data.details?.join?.(' ') || data.error || 'Failed to submit application'
        throw new Error(msg)
      }

      onSuccess(data.positionTitle || position.title)
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-[rgba(96,96,163,0.2)] space-y-4">
      <p className="text-sm font-semibold text-text-primary">Apply for {position.title}</p>

      <div>
        <label htmlFor={`name-${position.id}`} className="block text-sm font-semibold text-text-primary mb-1.5">
          Full name
        </label>
        <input
          id={`name-${position.id}`}
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          className={`${inputBase} ${errors.name ? inputErr : inputOK}`}
          placeholder="Your name"
        />
        {errors.name && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`email-${position.id}`} className="block text-sm font-semibold text-text-primary mb-1.5">
            Email
          </label>
          <input
            id={`email-${position.id}`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${errors.email ? inputErr : inputOK}`}
            placeholder="you@company.com"
          />
          {errors.email && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`phone-${position.id}`} className="block text-sm font-semibold text-text-primary mb-1.5">
            Phone
          </label>
          <input
            id={`phone-${position.id}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className={`${inputBase} ${errors.phone ? inputErr : inputOK}`}
            placeholder="+91 99999 99999"
          />
          {errors.phone && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.phone}</p>}
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-brand-orange font-medium" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="btn-gradient font-semibold text-sm px-6 py-3 disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="btn-secondary font-medium text-sm px-6 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
