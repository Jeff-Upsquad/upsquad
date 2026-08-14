"use client"
import { useState } from 'react'
import { bookkeepingServices, complianceServices } from '../../data/accountant'
import { ServiceIcon } from '../pricing/icons'

export default function WhatYouCanRequest() {
  const [activeTab, setActiveTab] = useState('Bookkeeping')
  const services = activeTab === 'Bookkeeping' ? bookkeepingServices : complianceServices

  return (
    <section className="mt-4">
      <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted mb-2">
        Examples — not a fixed menu
      </p>
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">What you can request</h2>
      <p className="text-text-secondary mb-5 max-w-2xl leading-relaxed">
        Below are examples of the kind of work people send. They are not a complete list, and not
        every accountant does all of them. The actual skills depend on the talent you pick —
        browse profiles and select the person whose work matches your brief.
      </p>

      <div className="mb-8 rounded-xl border border-black/[0.08] bg-white px-5 py-4">
        <p className="text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-text-primary">Skills live with the person, not the plan.</span>{' '}
          Open a profile, see what they actually do, and choose the resource that fits.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        {['Bookkeeping', 'Compliance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              activeTab === tab
                ? 'border-brand-purple bg-white text-text-primary'
                : 'border-[rgba(0,0,0,0.08)] text-text-secondary hover:border-brand-purple/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="border rounded-xl p-5 transition-all bg-white border-[rgba(0,0,0,0.08)] hover:border-brand-purple/40"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <ServiceIcon type={s.icon} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{s.title}</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
