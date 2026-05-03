"use client"
import { useState, forwardRef } from 'react'
import { availabilityPlans } from '../../data/pricing'
import SubmissionConfirmation from './SubmissionConfirmation'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

const NameYourPriceForm = forwardRef(function NameYourPriceForm({ selectedServices, selectedTiers, selectedPlan }, ref) {
  const plan = availabilityPlans.find(p => p.id === selectedPlan)
  const tiersLabel = selectedTiers.join(' + ')
  const servicesLabel = selectedServices.join(' + ')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', proposedPrice: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone / WhatsApp number is required'
    else if (form.phone.trim().length < 6) errs.phone = 'Enter a valid phone number'
    if (!form.proposedPrice) errs.proposedPrice = 'Enter your proposed monthly budget'
    else if (Number(form.proposedPrice) <= 0) errs.proposedPrice = 'Budget must be a positive number'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    setServerError('')

    try {
      const res = await fetch(`${API_URL}/api/v1/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: selectedServices.join(','),
          tier: selectedTiers.join(','),
          plan: selectedPlan,
          proposedPrice: Number(form.proposedPrice),
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          phone: form.phone.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'w-full px-4 py-3 border-2 rounded-lg text-sm outline-none transition-all bg-white focus:shadow-brutal-sm focus:-translate-y-px'
  const inputOK = 'border-text-primary focus:border-text-primary'
  const inputErr = 'border-brand-orange focus:border-brand-orange'

  if (submitted) {
    return (
      <div ref={ref} className="bg-white border-2 border-text-primary rounded-xl p-8 mb-12 shadow-brutal">
        <SubmissionConfirmation />
      </div>
    )
  }

  return (
    <div ref={ref} className="bg-white border-2 border-text-primary rounded-xl p-6 sm:p-8 mb-12 shadow-brutal">
      <div className="mb-6">
        <span className="text-label font-mono-tech text-text-muted">Final step</span>
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-1 mb-1">Name Your Budget</h2>
        <p className="text-sm text-text-secondary">
          You've selected <span className="font-semibold text-text-primary">{plan?.name}</span> ({plan?.availability} availability) with <span className="font-semibold text-text-primary">{tiersLabel}</span> talent for <span className="font-semibold text-text-primary">{servicesLabel}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="proposedPrice" className="block text-sm font-semibold text-text-primary mb-1.5">
            Monthly Budget (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold">₹</span>
            <input
              id="proposedPrice"
              name="proposedPrice"
              type="number"
              min="1"
              step="1"
              value={form.proposedPrice}
              onChange={handleChange}
              placeholder="Enter your monthly budget"
              className={`${inputBase} ${errors.proposedPrice ? inputErr : inputOK} pl-8`}
            />
          </div>
          {errors.proposedPrice && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.proposedPrice}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-1.5">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`${inputBase} ${errors.name ? inputErr : inputOK}`}
            />
            {errors.name && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={`${inputBase} ${errors.email ? inputErr : inputOK}`}
            />
            {errors.email && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.email}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-text-primary mb-1.5">
              Company <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
              className={`${inputBase} ${inputOK}`}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-1.5">Phone / WhatsApp</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 99955 66385"
              className={`${inputBase} ${errors.phone ? inputErr : inputOK}`}
            />
            {errors.phone && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.phone}</p>}
          </div>
        </div>

        {serverError && (
          <div className="bg-brand-orange/10 border-2 border-brand-orange rounded-lg px-4 py-3 text-sm text-text-primary font-medium">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-gradient w-full px-6 py-3.5 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>

        <p className="text-xs text-text-muted text-center">
          Our team reviews every request personally. No auto-charges, no commitments.
        </p>
      </form>
    </div>
  )
})

export default NameYourPriceForm
