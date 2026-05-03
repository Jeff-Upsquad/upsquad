"use client"
import { useState, useCallback, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { availabilityPlans, formatPrice } from '../../data/pricing'
import SubmissionConfirmation from './SubmissionConfirmation'
import SuccessAnimation from './SuccessAnimation'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

const NameYourPriceForm = forwardRef(function NameYourPriceForm({
  selectedService, selectedTiers, selectedPlan, selectedDays,
  selectedCountry, selectedStates, selectedLanguages,
}, ref) {
  const plan = availabilityPlans.find(p => p.id === selectedPlan)
  const tiersLabel = selectedTiers.join(' + ')
  const daysLabel = (selectedDays || []).join(', ')
  const [form, setForm] = useState({
    contactName: '', email: '', company: '', phone: '', proposedPrice: '',
    natureOfBusiness: '', shortNote: '', locationOfBusiness: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false)
    setSubmitted(true)
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.proposedPrice) errs.proposedPrice = 'Enter your proposed monthly budget'
    else if (Number(form.proposedPrice) <= 0) errs.proposedPrice = 'Budget must be a positive number'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (form.phone.trim().length < 6) errs.phone = 'Enter a valid phone number'
    if (!form.company.trim()) errs.company = 'Brand or company name is required'
    if (!form.contactName.trim()) errs.contactName = 'Contact person name is required'
    if (!form.natureOfBusiness.trim()) errs.natureOfBusiness = 'Nature of business is required'
    if (!form.shortNote.trim()) errs.shortNote = 'A short note about the business is required'
    if (!form.locationOfBusiness.trim()) errs.locationOfBusiness = 'Location of business is required'
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
          serviceType: selectedService,
          tier: selectedTiers.join(','),
          plan: selectedPlan,
          workingDays: (selectedDays || []).join(','),
          proposedPrice: Number(form.proposedPrice),
          name: form.contactName.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          phone: form.phone.trim(),
          country: selectedCountry || '',
          states: selectedStates || [],
          languages: selectedLanguages || [],
          brandName: form.company.trim(),
          natureOfBusiness: form.natureOfBusiness.trim(),
          shortNote: form.shortNote.trim(),
          locationOfBusiness: form.locationOfBusiness.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setShowAnimation(true)
    } catch (err) {
      setServerError(err.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'w-full px-4 py-3 border-2 rounded-lg text-sm outline-none transition-all bg-white focus:shadow-brutal-sm focus:-translate-y-px'
  const inputOK = 'border-text-primary focus:border-text-primary'
  const inputErr = 'border-brand-orange focus:border-brand-orange'

  const priceNumber = Number(form.proposedPrice) || 0

  return (
    <div ref={ref} className="bg-white border-2 border-text-primary rounded-xl p-6 sm:p-8 mb-12 shadow-brutal overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SubmissionConfirmation />
          </motion.div>
        ) : showAnimation ? (
          <motion.div
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SuccessAnimation onComplete={handleAnimationComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <span className="text-label font-mono-tech text-text-muted">Final step</span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-1 mb-1">Name Your Budget</h2>
              <p className="text-sm text-text-secondary">
                You've selected <span className="font-semibold text-text-primary">{plan?.name}</span> ({plan?.availability} availability) with <span className="font-semibold text-text-primary">{tiersLabel}</span> talent for <span className="font-semibold text-text-primary">{selectedService}</span>{daysLabel && <>, working <span className="font-semibold text-text-primary">{daysLabel}</span></>}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Hero Budget Input */}
              <div className={`relative bg-gradient-to-br from-brand-pink/40 via-white to-brand-purple/40 border-2 rounded-xl p-6 ${
                errors.proposedPrice ? 'border-brand-orange' : 'border-text-primary'
              } shadow-brutal-sm`}>
                <div className="absolute top-3 left-4">
                  <span className="text-label font-mono-tech text-text-muted">Your Monthly Budget</span>
                </div>
                <label htmlFor="proposedPrice" className="sr-only">Monthly Budget</label>
                <div className="flex items-baseline gap-2 mt-5">
                  <span className="font-heading text-4xl sm:text-5xl font-bold text-text-primary">₹</span>
                  <input
                    id="proposedPrice"
                    name="proposedPrice"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={form.proposedPrice}
                    onChange={(e) => handleChange({ target: { name: 'proposedPrice', value: e.target.value.replace(/[^0-9]/g, '') } })}
                    placeholder="0"
                    className="flex-1 bg-transparent border-0 outline-none font-heading text-4xl sm:text-5xl font-bold text-text-primary placeholder:text-text-muted/40 min-w-0"
                  />
                  <span className="text-sm font-semibold text-text-secondary whitespace-nowrap">/ month</span>
                </div>
                {priceNumber > 0 && (
                  <p className="text-xs text-text-secondary mt-2">≈ ₹{formatPrice(priceNumber)} per month, reviewed by our team before any commitment.</p>
                )}
                {errors.proposedPrice && <p className="text-xs text-brand-orange mt-2 font-medium">{errors.proposedPrice}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
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
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-1.5">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 99955 66385"
                    className={`${inputBase} ${errors.phone ? inputErr : inputOK}`}
                  />
                  <p className="text-xs text-text-muted mt-1">Enter the same number you have contacted us with on WhatsApp.</p>
                  {errors.phone && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.phone}</p>}
                </div>
              </div>

              {/* Brand + Contact Person */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-text-primary mb-1.5">Brand or Company Name</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Studios"
                    className={`${inputBase} ${errors.company ? inputErr : inputOK}`}
                  />
                  {errors.company && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="contactName" className="block text-sm font-semibold text-text-primary mb-1.5">Contact Person Name</label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`${inputBase} ${errors.contactName ? inputErr : inputOK}`}
                  />
                  {errors.contactName && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.contactName}</p>}
                </div>
              </div>

              {/* Tell us about your brand */}
              <div className="space-y-4 pt-2">
                <div>
                  <label htmlFor="locationOfBusiness" className="block text-sm font-semibold text-text-primary mb-1.5">
                    Location of Business
                  </label>
                  <input
                    id="locationOfBusiness"
                    name="locationOfBusiness"
                    type="text"
                    value={form.locationOfBusiness}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, India"
                    className={`${inputBase} ${errors.locationOfBusiness ? inputErr : inputOK}`}
                  />
                  {errors.locationOfBusiness && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.locationOfBusiness}</p>}
                </div>
                <div>
                  <label htmlFor="natureOfBusiness" className="block text-sm font-semibold text-text-primary mb-1.5">
                    Nature of Business
                  </label>
                  <input
                    id="natureOfBusiness"
                    name="natureOfBusiness"
                    type="text"
                    value={form.natureOfBusiness}
                    onChange={handleChange}
                    placeholder="e.g. D2C apparel, B2B SaaS, education…"
                    className={`${inputBase} ${errors.natureOfBusiness ? inputErr : inputOK}`}
                  />
                  {errors.natureOfBusiness && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.natureOfBusiness}</p>}
                </div>
                <div>
                  <label htmlFor="shortNote" className="block text-sm font-semibold text-text-primary mb-1.5">
                    Short Note About the Business
                  </label>
                  <textarea
                    id="shortNote"
                    name="shortNote"
                    rows={3}
                    value={form.shortNote}
                    onChange={handleChange}
                    placeholder="A few lines so the talent has context before they start."
                    className={`${inputBase} ${errors.shortNote ? inputErr : inputOK} resize-none`}
                  />
                  {errors.shortNote && <p className="text-xs text-brand-orange mt-1 font-medium">{errors.shortNote}</p>}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default NameYourPriceForm
