"use client"
import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL ?? ''
const inputClass = 'mt-2 w-full rounded-xl border border-black/20 bg-white p-3.5 text-base text-black focus:outline-none focus:ring-2 focus:ring-brand-purple'

export default function CreativeEnquiryForm() {
  const [service, setService] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const values = Object.fromEntries(new FormData(event.currentTarget))
    setStatus('sending')
    setError('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(`${API_URL}/api/v1/creative-enquiries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values), signal: controller.signal,
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.details?.join('. ') || result.error || 'Could not submit your enquiry. Please try again.')
      setStatus('success')
    } catch (err) {
      setError(err.name === 'AbortError' ? 'The request timed out. Please try again.' : err.message || 'Could not submit your enquiry. Please try again.')
      setStatus('idle')
    } finally { clearTimeout(timeout) }
  }

  return <section id="creative-enquiry" className="scroll-mt-24 py-16 lg:py-20 px-5 sm:px-8 bg-white">
    <div className="max-w-[1160px] mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
      <div><p className="font-mono-tech text-sm uppercase tracking-[0.14em] text-text-secondary mb-4">Let’s talk creative</p><h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary">Tell us what you need.</h2><p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed">Share your details and requirements. Our team will help you choose a subscription, discuss a project, or find your next hire.</p><p className="mt-5 text-base font-semibold text-text-primary">Enquiry only. No payment required.</p><a className="mt-6 inline-block text-base underline underline-offset-4" href="https://wa.me/919995266385?text=Hi%20UpSquad%2C%20I%20need%20a%20Designer%20or%20Video%20Editor." target="_blank" rel="noopener noreferrer">Prefer WhatsApp? Chat with us</a></div>
      <div className="rounded-2xl border border-black/15 bg-surface-secondary p-6 sm:p-8">
        {status === 'success' ? <div role="status" className="py-12"><h3 className="font-heading text-2xl font-bold">Thanks! Your enquiry is saved.</h3><p className="mt-4 text-base text-text-secondary leading-relaxed">Our team will contact you to discuss your requirements and next steps. No payment has been taken.</p></div> : <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">{[
            ['name', 'Your name', 'text', 'name'], ['company', 'Business / brand name', 'text', 'organization'],
            ['email', 'Email address', 'email', 'email'], ['phone', 'Phone / WhatsApp number', 'tel', 'tel'],
          ].map(([name, label, type, autoComplete]) => <label key={name} className="block text-base font-medium">{label} <span aria-hidden="true">*</span><input required name={name} type={type} autoComplete={autoComplete} maxLength={254} pattern={name === 'phone' ? '[+0-9() .-]{10,30}' : undefined} className={inputClass} /></label>)}</div>
          <label className="block text-base font-medium">Who do you need? <span aria-hidden="true">*</span><select required name="role" defaultValue="" className={inputClass}><option value="" disabled>Select a creative role</option><option value="Designers">Graphic Designer</option><option value="Editors">Video Editor</option><option value="Designer plus Editor">Designer + Video Editor</option></select></label>
          <label className="block text-base font-medium">How would you like to work? <span aria-hidden="true">*</span><select required name="service" value={service} onChange={e => setService(e.target.value)} className={inputClass}><option value="" disabled>Select a service</option><option value="hourly">Hourly subscription</option><option value="output">Output-based subscription</option><option value="assignment">One-time assignment</option><option value="hiring">Full-time / part-time hiring</option><option value="guidance">Help me choose</option></select></label>
          {service === 'hourly' && <label className="block text-base font-medium">Working hours per day <span aria-hidden="true">*</span><select name="hours" required defaultValue="" className={inputClass}><option value="" disabled>Select daily hours</option>{[1,2,4,6,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'hour' : 'hours'} per day</option>)}</select></label>}
          <label className="block text-base font-medium">Your requirements <span aria-hidden="true">*</span><textarea required name="requirements" rows={4} maxLength={4000} placeholder={service === 'output' ? 'For example: five posters per day and three reels per week.' : 'Tell us about the work, expected volume, and timeline.'} className={inputClass} /></label>
          <p className="text-sm text-text-secondary">By submitting, you agree that UpSquad may contact you about this enquiry. <a href="/privacy-policy/" className="underline">Privacy policy</a></p>
          {error && <p role="alert" className="text-base text-red-700">{error}</p>}
          <button disabled={status === 'sending'} className="btn-gradient px-7 py-3.5 font-semibold text-base disabled:opacity-60" type="submit">{status === 'sending' ? 'Submitting…' : 'Send my enquiry'}</button>
        </form>}
      </div>
    </div>
  </section>
}
