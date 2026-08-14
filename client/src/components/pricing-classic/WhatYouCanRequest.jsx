"use client"
import { useState } from 'react'
import { designServices, videoServices } from '../../data/pricing-classic'
import { ServiceIcon } from './icons'

export default function WhatYouCanRequest() {
  const [activeTab, setActiveTab] = useState('Designs')
  const services = activeTab === 'Designs' ? designServices : videoServices

  return (
    <section className="mt-20">
      <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-2">
        Examples — not a fixed menu
      </p>
      <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">What you can request</h2>
      <p className="text-slate-500 mb-6 max-w-2xl leading-relaxed">
        Below are examples of the kind of work people send. They are not a complete list, and not
        every designer or editor does all of them. The actual skills depend on the talent you pick
        — browse profiles and select the person whose work matches your brief.
      </p>
      <div className="flex gap-2 mb-6">
        {['Designs', 'Video edits'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              activeTab === tab
                ? 'border-gray-900 bg-white text-slate-900'
                : 'border-gray-200 text-slate-500 hover:border-gray-300'
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
            className={`border rounded-xl p-5 transition-all ${
              s.launchingSoon
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <ServiceIcon type={s.icon} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              {s.launchingSoon && (
                <span className="flex-shrink-0 text-[10px] font-medium text-text-primary bg-black/[0.06] px-2.5 py-1 rounded-full">
                  Launching Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
