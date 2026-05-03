"use client"
import { useState, forwardRef } from 'react'
import { availabilityPlans } from '../../data/pricing'
import SubmissionConfirmation from './SubmissionConfirmation'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

const NameYourPriceForm = forwardRef(function NameYourPriceForm({ serviceType, selectedTier, selectedPlan }, ref) {
  const plan = availabilityPlans.find(p => p.id === selectedPlan)
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
          serviceType,
          tier: selectedTier,
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

  if (submitted) {
    return (
      <div ref={ref} className="bg-white border border-gray-200 rounded-xl p-8 mb-12">
        <SubmissionConfirmation />
      </div>
    )
  }

  return (
    <div ref={ref} className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-12">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Name Your Budget</h2>
        <p className="text-sm text-slate-500">
          You've selected <span className="font-medium text-slate-700">{plan?.name}</span> ({plan?.availability} availability) with <span className="font-medium text-slate-700">{selectedTier}</span> talent for <span className="font-medium text-slate-700">{serviceType}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="proposedPrice" className="block text-sm font-medium text-slate-700 mb-1.5">
            Monthly Budget (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
            <input
              id="proposedPrice"
              name="proposedPrice"
              type="number"
              min="1"
              step="1"
              value={form.proposedPrice}
              onChange={handleChange}
              placeholder="Enter your monthly budget"
              className={`w-full pl-8 pr-4 py-3 border rounded-lg text-sm outline-none transition-colors ${
                errors.proposedPrice ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400'
              }`}
            />
          </div>
          {errors.proposedPrice && <p className="text-xs text-red-500 mt-1">{errors.proposedPrice}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-colors ${
                errors.name ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-colors ${
                errors.email ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
              Company <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Phone / WhatsApp</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 99955 66385"
              className={`w-full px-4 py-3 border rounded-lg text-sm outline-none transition-colors ${
                errors.phone ? 'border-red-300 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>

        <p className="text-xs text-slate-400 text-center">
          Our team reviews every request personally. No auto-charges, no commitments.
        </p>
      </form>
    </div>
  )
})

export default NameYourPriceForm
