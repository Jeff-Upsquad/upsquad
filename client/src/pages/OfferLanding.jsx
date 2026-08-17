"use client"

import { useEffect, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import { OFFER_PLANS, OFFER_ROLES, formatInr } from '../data/offer'
import { fetchOfferReservation, startOfferCheckout } from '../lib/offerApi'

const emptyForm = { name: '', email: '', phone: '', preference: '' }

function CheckIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function RoleIcon({ id }) {
  if (id === 'editor') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5A1.5 1.5 0 0121.75 6.75v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75A1.5 1.5 0 013.75 5.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9.75l5 2.25-5 2.25V9.75z" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  )
}

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

function scrollToAnchor(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

export default function OfferLanding() {
  const [roleIds, setRoleIds] = useState(['designer'])
  const [planId, setPlanId] = useState('basic')
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(null)

  const roles = OFFER_ROLES.filter((item) => roleIds.includes(item.id))
  const plan = OFFER_PLANS.find((item) => item.id === planId)
  const slotCount = roles.length
  const dueNow = (plan?.price || 0) * slotCount
  const roleLabel = roles.map((item) => item.label).join(' + ') || '—'
  const roleNoun = roles.length === 2
    ? 'designer and a video editor'
    : roles[0]?.noun || 'creative'

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    else if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number'
    if (roleIds.length === 0) next.role = 'Choose a designer, a video editor, or both'
    if (!planId) next.plan = 'Choose a plan'
    return next
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paidId = params.get('paid')
    const paymentState = params.get('payment')
    if (paymentState === 'cancelled') {
      setPayError('Payment was not completed. Your slot is not reserved yet.')
    }
    if (!paidId) return undefined

    let alive = true
    setConfirming(true)
    fetchOfferReservation(paidId)
      .then((data) => {
        if (!alive) return
        if (data?.status === 'paid') {
          setConfirmed({
            name: data.name,
            roleLabel: data.roleLabel,
            roleNoun: data.roleNoun,
            plan: { name: data.planName, hoursPerDay: data.hoursPerDay },
            slotCount: (data.roleIds || []).length || 1,
            dueNow: data.amount,
            paymentId: data.paymentId,
            preference: data.preference,
          })
          window.scrollTo(0, 0)
        } else {
          setPayError('We have not received this payment yet. If you were charged, message us on WhatsApp.')
        }
      })
      .catch(() => {
        if (alive) setPayError('Could not confirm the payment. Refresh this page or message us on WhatsApp.')
      })
      .finally(() => {
        if (alive) setConfirming(false)
      })

    return () => { alive = false }
  }, [])

  async function handleReserve(e) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    setPaying(true)
    setPayError('')
    try {
      const { checkoutUrl } = await startOfferCheckout({
        roleIds,
        planId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        preference: form.preference.trim(),
      })
      window.location.href = checkoutUrl
    } catch (err) {
      setPayError(err.message || 'Could not start payment')
      setPaying(false)
    }
  }

  if (confirming) {
    return (
      <section className="pt-32 pb-20 px-5 sm:px-8 min-h-[calc(100vh-80px)]">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-secondary">
            Razorpay
          </p>
          <h1 className="mt-3 font-heading text-2xl font-extrabold text-text-primary">
            Confirming your payment
          </h1>
          <p className="mt-2 text-text-secondary">This only takes a moment.</p>
        </div>
      </section>
    )
  }

  if (confirmed) {
    return (
      <section className="pt-32 pb-20 px-5 sm:px-8 min-h-[calc(100vh-80px)]">
        <div className="max-w-[640px] mx-auto">
          <div className="rounded-2xl border-[1.5px] border-black bg-white p-8 sm:p-10 shadow-brutal">
            <div className="w-14 h-14 rounded-full bg-[#FFFF99] border-2 border-black flex items-center justify-center mb-6">
              <CheckIcon className="w-7 h-7 text-[#0A0A0A]" />
            </div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-secondary mb-3">
              Slot confirmed
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-text-primary">
              You&apos;re in, {confirmed.name.split(' ')[0]}.
            </h1>
            <p className="mt-4 text-text-secondary leading-relaxed">
              We&apos;ll match you with a {confirmed.roleNoun} based on your preference.
              If they are not the right fit, the full {formatInr(confirmed.dueNow)} comes back.
            </p>

            <dl className="mt-8 divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {[
                ['Role', confirmed.roleLabel],
                ['Plan', `${confirmed.plan.name} · ${confirmed.plan.hoursPerDay} hours / day${confirmed.slotCount > 1 ? ` · ${confirmed.slotCount} people` : ''}`],
                ['First month', formatInr(confirmed.dueNow)],
                ['Payment', confirmed.paymentId],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-sm text-text-secondary">{label}</dt>
                  <dd className="text-sm font-medium text-text-primary text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <a
              href="https://wa.me/919995266385?text=I%20just%20reserved%20a%20first-month%20slot%20on%20UpSquad"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 btn-gradient inline-flex items-center justify-center w-full text-sm font-semibold px-7 py-3.5"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="pt-28 md:pt-32 pb-10 md:pb-14 px-5 sm:px-8 bg-white overflow-x-clip">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-end">
          <div className="min-w-0">
            <ScrollReveal>
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-text-primary bg-white border border-black/80 px-3 py-1.5 rounded-full mb-6 shadow-brutal-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Limited slots · First month only
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08} className="min-w-0">
              <h1 className="font-heading text-[1.85rem] sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-[-0.03em] text-text-primary">
                <span className="block">A designer, a video editor, or both.</span>
                <span
                  className="bg-no-repeat box-decoration-clone"
                  style={{
                    backgroundImage:
                      'linear-gradient(transparent 66%, #FFFF99 66%, #FFFF99 92%, transparent 92%)',
                  }}
                >
                  First month from {formatInr(5000)}.
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <p className="mt-5 text-base md:text-lg text-text-secondary leading-relaxed max-w-xl text-pretty">
                Same offer for both roles. Pick a designer, a video editor, or both,
                pick 2 or 4 hours a day, then pay to lock the slot. If the person is
                not a fit, you get every rupee back.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#reserve"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToAnchor('reserve')
                  }}
                  className="btn-gradient text-sm font-semibold px-7 py-3.5"
                >
                  Reserve a slot
                </a>
                <a
                  href="#who"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToAnchor('who')
                  }}
                  className="btn-secondary text-sm font-semibold px-7 py-3.5"
                >
                  Who will I get?
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12} direction="right">
            <div className="w-full min-w-0 rounded-2xl border-[1.5px] border-black bg-[#FFFF99] p-5 sm:p-7 shadow-brutal">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A]/70">
                Introductory month
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {OFFER_PLANS.map((item) => (
                  <div key={item.id} className="rounded-xl bg-[#FFFFFF] border border-black/15 p-3.5 sm:p-4 min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[#3f3f46]">{item.name}</p>
                    <p className="mt-1 font-heading text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0A]">
                      {item.hoursPerDay}h
                    </p>
                    <p className="text-[12px] text-[#3f3f46]">per day</p>
                    <p className="mt-3 font-heading text-base sm:text-lg font-bold text-[#0A0A0A]">
                      {formatInr(item.price)}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[#3f3f46]">
                First month only. Payment confirms your place among the first subscribers.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 px-5 sm:px-8 bg-surface-secondary border-y border-black/[0.06]">
        <div className="max-w-[1160px] mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { n: '01', t: 'Choose the role', d: 'Designer, video editor, or both — one person per role.' },
            { n: '02', t: 'Choose the hours', d: '2 hours a day at ₹5,000, or 4 hours at ₹10,000.' },
            { n: '03', t: 'Pay to lock the slot', d: 'First come, first reserved. We match after payment.' },
          ].map((step) => (
            <div key={step.n}>
              <p className="font-mono-tech text-[11px] text-text-muted">{step.n}</p>
              <h2 className="mt-2 font-heading text-lg font-bold text-text-primary">{step.t}</h2>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white overflow-x-clip">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-12 items-start">
          <div className="min-w-0">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 mb-4">
                <span className="h-px w-8 accent-bar" />
                <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">
                  Build your slot
                </span>
              </div>
              <h2 className="font-heading text-[1.75rem] md:text-3xl lg:text-4xl font-extrabold tracking-[-0.025em] text-text-primary">
                How many hours do you want?
              </h2>
            </ScrollReveal>

            <div className="mt-8">
              <p className="text-sm font-semibold text-text-primary mb-3">Plan — first month</p>
              {errors.plan ? <p className="text-sm text-red-600 mb-2">{errors.plan}</p> : null}
              <div className="grid sm:grid-cols-2 gap-3">
                {OFFER_PLANS.map((item) => {
                  const active = planId === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setPlanId(item.id)
                        if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }))
                      }}
                      className={`text-left rounded-2xl border-[1.5px] p-5 transition-all ${
                        active
                          ? 'border-black bg-white shadow-brutal-sm'
                          : 'border-black/[0.08] bg-surface-secondary hover:border-black/30'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-heading text-lg font-extrabold text-text-primary">{item.name}</span>
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                          First month
                        </span>
                      </span>
                      <span className="mt-4 block font-heading text-4xl font-extrabold tracking-[-0.03em] text-text-primary leading-none">
                        {item.hoursPerDay}
                        <span className="ml-1 text-lg font-bold tracking-normal">hrs/day</span>
                      </span>
                      <span className="mt-2 block text-[13px] text-text-secondary">
                        {item.hoursPerWeek} hrs / week · {item.hoursPerMonth} hrs / month
                      </span>
                      <span className="mt-4 block font-heading text-2xl font-extrabold text-text-primary">
                        {formatInr(item.price)}
                        <span className="ml-1 text-sm font-medium text-text-secondary">/ first month</span>
                      </span>
                      <span className="mt-2 block text-sm text-text-secondary leading-relaxed">{item.blurb}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div id="who" className="scroll-mt-28 mt-10 rounded-2xl border-[1.5px] border-black/[0.08] bg-surface-secondary p-6 sm:p-7">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-secondary">
                The matching question
              </p>
              <h3 className="mt-2 font-heading text-2xl font-extrabold tracking-[-0.02em] text-text-primary">
                Who will you get?
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed">
                You choose the role in the form — designer, video editor, or both.
                We then match a {roleNoun} to your preference — style, software,
                industry, whatever you tell us there. One person per role, selected for you.
              </p>
              <p className="mt-3 text-text-secondary leading-relaxed">
                If they are not an ideal fit, we refund the full amount. The payment is only to hold
                the slot, not to lock you into someone you do not want.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <form
              id="reserve"
              onSubmit={handleReserve}
              className="scroll-mt-28 rounded-2xl border-[1.5px] border-black bg-white p-6 shadow-brutal"
            >
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-secondary">
                Confirm your slot
              </p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-text-primary">
                Pay to reserve
              </h3>

              <div className="mt-5">
                <p className="text-[12px] font-medium text-text-secondary mb-2">Who do you want? <span className="font-normal">One or both</span></p>
                {errors.role ? <p className="text-sm text-red-600 mb-2">{errors.role}</p> : null}
                <div className="grid grid-cols-2 gap-2">
                  {OFFER_ROLES.map((item) => {
                    const active = roleIds.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setRoleIds((prev) => toggleId(prev, item.id))
                          if (errors.role) setErrors((prev) => ({ ...prev, role: '' }))
                        }}
                        className={`text-left rounded-xl border-[1.5px] p-3 transition-all ${
                          active
                            ? 'border-black bg-[#FFFF99] shadow-brutal-sm'
                            : 'border-black/[0.08] bg-surface-secondary hover:border-black/30'
                        }`}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                            active ? 'bg-white border-black/20 text-[#0A0A0A]' : 'bg-white border-black/[0.06] text-text-primary'
                          }`}>
                            <RoleIcon id={item.id} />
                          </span>
                          {active ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                              <CheckIcon className="w-3 h-3" />
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-2.5 block font-heading text-sm font-extrabold tracking-[-0.02em] text-text-primary">
                          {item.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[12px] font-medium text-text-secondary mb-2">Plan</p>
                {errors.plan ? <p className="text-sm text-red-600 mb-2">{errors.plan}</p> : null}
                <div className="grid grid-cols-2 gap-2">
                  {OFFER_PLANS.map((item) => {
                    const active = planId === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setPlanId(item.id)
                          if (errors.plan) setErrors((prev) => ({ ...prev, plan: '' }))
                        }}
                        className={`text-left rounded-xl border-[1.5px] px-3 py-2.5 transition-all ${
                          active
                            ? 'border-black bg-white shadow-brutal-sm'
                            : 'border-black/[0.08] bg-surface-secondary hover:border-black/30'
                        }`}
                      >
                        <span className="block font-heading text-sm font-extrabold text-text-primary">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-text-secondary">
                          {item.hoursPerDay}h / day
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-surface-secondary border border-black/[0.06] p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-text-secondary">Roles</span>
                  <span className="font-medium text-text-primary text-right">{roleLabel}</span>
                </div>
                <div className="mt-2 flex justify-between gap-3">
                  <span className="text-text-secondary">Plan</span>
                  <span className="font-medium text-text-primary">
                    {plan?.name} · {plan?.hoursPerDay}h / day
                    {slotCount > 1 ? ` × ${slotCount}` : ''}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-black/[0.06] flex justify-between gap-3">
                  <span className="text-text-secondary">Due now</span>
                  <span className="font-heading text-lg font-extrabold text-text-primary">
                    {formatInr(dueNow)}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Field
                  label="Full name"
                  name="name"
                  value={form.name}
                  error={errors.name}
                  onChange={setField}
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  onChange={setField}
                  placeholder="you@company.com"
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={setField}
                  placeholder="10-digit mobile"
                />
                <label className="block">
                  <span className="text-[12px] font-medium text-text-secondary">Preference (optional)</span>
                  <textarea
                    name="preference"
                    value={form.preference}
                    onChange={(e) => setField('preference', e.target.value)}
                    rows={3}
                    placeholder="Style, tools, industry — anything that helps us match the right person."
                    className="mt-1 w-full rounded-xl border border-black/[0.12] bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-black focus:ring-2 focus:ring-black/10 resize-none"
                  />
                </label>
              </div>

              {payError ? (
                <p className="mt-4 text-sm text-red-600 leading-relaxed">{payError}</p>
              ) : null}

              <button
                type="submit"
                disabled={paying}
                className="mt-5 btn-gradient w-full text-sm font-semibold px-7 py-3.5 disabled:opacity-60"
              >
                {paying ? 'Opening Razorpay…' : `Pay ${formatInr(dueNow)} to confirm slot`}
              </button>
              <p className="mt-3 text-[12px] leading-relaxed text-text-muted">
                You will pay on Razorpay&apos;s secure checkout. First month only. Limited to people who subscribe first. Full refund if the match is not right.
              </p>
            </form>
          </aside>
        </div>
      </section>

    </>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium text-text-secondary">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
            : 'border-black/[0.12] focus:border-black focus:ring-black/10'
        }`}
      />
      {error ? <span className="mt-1 block text-[12px] text-red-600">{error}</span> : null}
    </label>
  )
}
