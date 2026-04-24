"use client"
import { useEffect, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'

/* ── data ─────────────────────────────────────────────── */

const upsquadHandles = [
  {
    title: 'Sales & Lead Generation',
    desc: 'We find and close clients — you never have to pitch.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    title: 'Marketing & Branding',
    desc: 'We promote your skills to the right audience.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    title: 'Client Support',
    desc: 'We handle all communication, revisions, and feedback loops.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Payments & Invoicing',
    desc: 'Guaranteed monthly payments — no chasing invoices.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Squad Manager',
    desc: 'A dedicated manager coordinates with clients on your behalf.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const partnerFocus = [
  {
    title: 'Focus on Your Craft',
    desc: 'Just do what you love — design, edit, create.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Per-Client Payment',
    desc: 'Earn per client assigned — not per task or per hour.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Full-Time or Part-Time',
    desc: 'Choose how much you want to work — flexible commitment.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const gettingStartedSteps = [
  {
    number: '1',
    title: 'We Create Your Profile',
    description: 'Share your basic details, skills, and portfolio with us. We build a professional profile that showcases your best work.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Profile Presented to Clients',
    description: 'Your profile is shared with our active clients who are looking for creative talent that matches your skillset.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Client Selects You',
    description: 'When a client picks you, they get assigned to you. You start working directly with guidance from your Squad Manager.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const planCards = [
  {
    name: 'Starter',
    hours: '~1 hour/day',
    capacity: '10% Capacity',
    deliverables: 'e.g. 2 posters per day',
    payment: '5,000',
    highlighted: false,
  },
  {
    name: 'Basic',
    hours: '2–3 hours/day',
    capacity: '25% Capacity',
    deliverables: 'e.g. 5 posters per week',
    payment: '15,000',
    highlighted: false,
  },
  {
    name: 'Plus',
    hours: '4–5 hours/day',
    capacity: '50% Capacity',
    deliverables: 'e.g. 20 posters per month',
    payment: '20,000',
    highlighted: true,
    badge: 'POPULAR',
  },
  {
    name: 'Pro',
    hours: '6–7 hours/day',
    capacity: '80% Capacity',
    deliverables: 'e.g. 30 posters per month',
    payment: '30,000',
    highlighted: false,
  },
  {
    name: 'Personal',
    hours: 'Full-time',
    capacity: '100% Capacity',
    deliverables: 'Dedicated full-time work',
    payment: '40,000',
    highlighted: false,
  },
]

/* ── component ────────────────────────────────────────── */

export default function PartnerProgram() {
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    fetch('/api/v1/landing-pages/partner-program')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return
        const langs = d.languages || []
        const lang = langs.find((l) => l.code === d.defaultLanguageCode) || langs[0]
        setVideoUrl(lang?.videoUrl || '')
      })
      .catch(() => {})
  }, [])

  return (
    <div className="pt-20 pb-0">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-16 pb-20 px-5 sm:px-8 bg-dot-pattern border-b border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              Now accepting partners
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
              <span className="text-slate-900">UpSquad Partner Program</span>
            </h1>

            <p className="text-lg text-slate-500 leading-[1.7] mb-8">
              Are you a freelance designer or video editor? Partner with UpSquad and focus only on
              what you do best — we handle the sales, marketing, client support, and payments.
            </p>

            <a
              href="https://wa.me/919995266342?text=I%20want%20to%20join%20the%20UpSquad%20Partner%20Program"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Apply Now
            </a>
          </div>
          <div className="w-full">
            <HeroMedia videoUrl={videoUrl} />
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Partnership Model</p>
            <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">How it works</h2>
            <p className="text-base text-slate-500 mt-2">You create. We handle everything else.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* What UpSquad handles */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-lime-500" />
                <h3 className="font-heading text-sm font-semibold text-slate-900 uppercase tracking-wider">What UpSquad Handles</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upsquadHandles.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#F7F6F3] rounded-xl p-5 border border-gray-200/50 hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-slate-500 flex items-center justify-center shadow-sm mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-heading text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What you focus on */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="font-heading text-sm font-semibold text-slate-900 uppercase tracking-wider">What You Focus On</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {partnerFocus.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#F7F6F3] rounded-xl p-5 border border-gray-200/50 hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-slate-500 flex items-center justify-center shadow-sm mb-3">
                      {item.icon}
                    </div>
                    <h4 className="font-heading text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Get Started ────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-[#F7F6F3]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Onboarding</p>
            <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">How to get started</h2>
            <p className="text-base text-slate-500 mt-2">Three simple steps to start earning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gettingStartedSteps.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Connector line (desktop only) */}
                {i < gettingStartedSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-60px)] h-px bg-gray-300/60 -translate-x-1/2 z-0" />
                )}
                <div className="bg-white rounded-xl p-6 border border-gray-200/50 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                    <span className="text-xs font-medium text-gray-400">Step {step.number}</span>
                  </div>
                  <h3 className="font-heading text-base font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Your Partner Tier ─────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Partner Tiers</p>
            <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Your partner tier</h2>
            <p className="text-base text-slate-500 mt-2 max-w-2xl">
              Based on your experience, skill set, and portfolio, your profile will be placed into one of three tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Junior */}
            <div className="rounded-xl p-6 border border-gray-200/50 bg-[#F7F6F3] hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-slate-900">Junior</h3>
                  <span className="text-[11px] text-slate-400 font-medium">Entry Level</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Less than 2 years of experience. Great for straightforward tasks and cost-effective output.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ideal for starting your creative career
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-xl p-6 border-2 border-emerald-500 bg-emerald-50/60 hover:-translate-y-0.5 transition-transform duration-200 relative">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Common
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-slate-900">Pro</h3>
                  <span className="text-[11px] text-slate-400 font-medium">2+ Years Experience</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                More than 2 years of experience with strong, well-rounded skill sets. Reliable quality across a wide range of work.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Higher pay per client assignment
              </div>
            </div>

            {/* Elite */}
            <div className="rounded-xl p-6 border border-gray-200/50 bg-[#F7F6F3] hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-slate-900">Elite</h3>
                  <span className="text-[11px] text-slate-400 font-medium">5+ Years Experience</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Top talents with 5+ years of experience. Best for high-stakes, complex, or premium creative work.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium rates for premium talent
              </div>
            </div>
          </div>

          {/* Custom Pricing Option */}
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-slate-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-heading text-sm font-semibold text-slate-900 mb-0.5">Custom Pricing Plan</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Don&apos;t fit neatly into a tier? You can also opt in for a custom pricing plan tailored to your unique skill set and availability. We&apos;ll work together to find the right fit.
              </p>
            </div>
            <a
              href="https://wa.me/919995266342?text=I%20want%20to%20discuss%20a%20custom%20partner%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-sm font-medium text-gray-900 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg transition-all"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </section>

      {/* ── How Works Get Assigned (Plan Cards) ───────── */}
      <section className="py-20 px-5 sm:px-8 bg-[#F7F6F3]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Assignments</p>
            <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">How works get assigned</h2>
            <p className="text-base text-slate-500 mt-2">
              Clients subscribe to a plan. Based on their plan, here&apos;s what you can expect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {planCards.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative ${
                  plan.highlighted
                    ? 'bg-emerald-50/60 border-emerald-500 border-2'
                    : 'bg-[#F7F6F3] border-gray-200/50'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">{plan.name}</h3>

                {/* Hours */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Hours</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{plan.hours}</p>
                  <p className="text-xs text-slate-400">{plan.capacity}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Deliverables</span>
                  </div>
                  <p className="text-sm text-slate-600">{plan.deliverables}</p>
                </div>

                {/* Payment */}
                <div className="pt-3 border-t border-gray-200/60">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Payment</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    <span className="text-emerald-600">{'\u20B9'}{plan.payment}</span>
                    <span className="text-xs font-normal text-slate-400"> /month</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center mt-6">
            * Deliverables are selected by the client. Payments shown are approximate partner earnings per client.
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Ready to partner with UpSquad?
          </h2>
          <p className="text-base text-gray-400 mb-8">
            No contracts, no upfront costs. Just your skills and our support.
          </p>
          <a
            href="https://wa.me/919995266342?text=I%20want%20to%20join%20the%20UpSquad%20Partner%20Program"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Apply on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
