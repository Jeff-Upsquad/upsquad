"use client"
import { useState } from 'react'
import { planTypes as allPlanTypes } from '../../data/pricing'

export default function PlanTypeTabs({ activeType, setActiveType, rightSlot = null, types }) {
  const planTypes = types || allPlanTypes
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // With only a few tabs (e.g. Designers + Editors on a landing page) the pills
  // fit on mobile so we show them directly. The /pricing page has 7 types and
  // would overflow, so we fall back to a dropdown on mobile there.
  const useMobilePills = planTypes.length <= 3

  return (
    <div className="mb-8">
      {/* Mobile: Pill tabs when few types, dropdown when many */}
      <div className="sm:hidden">
        {useMobilePills ? (
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-full p-1 gap-0.5">
              {planTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeType === type
                      ? 'bg-brand-purple text-text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {rightSlot}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-white border border-[rgba(96,96,163,0.2)] rounded-xl px-4 py-3 text-sm font-medium text-text-primary shadow-sm"
            >
              {activeType}
              <svg className={`w-4 h-4 text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-[rgba(96,96,163,0.2)] rounded-xl shadow-lg overflow-hidden">
                {planTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => { setActiveType(type); setDropdownOpen(false) }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      activeType === type
                        ? 'bg-surface-secondary text-text-primary'
                        : 'text-text-secondary hover:bg-surface-secondary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            {rightSlot && <div className="mt-3">{rightSlot}</div>}
          </div>
        )}
      </div>
      {/* Desktop: Pill tabs */}
      <div className="hidden sm:flex justify-center items-center gap-3">
        <div className="inline-flex bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-full p-1 gap-0.5">
          {planTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeType === type
                  ? 'bg-brand-purple text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {rightSlot}
      </div>
    </div>
  )
}
