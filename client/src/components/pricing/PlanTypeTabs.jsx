"use client"
import { useState } from 'react'
import { planTypes as allPlanTypes } from '../../data/pricing'

export default function PlanTypeTabs({ activeType, setActiveType, rightSlot = null, types }) {
  const planTypes = types || allPlanTypes
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="mb-8">
      {/* Mobile: Dropdown */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 shadow-sm"
        >
          {activeType}
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {planTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setDropdownOpen(false) }}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  activeType === type
                    ? 'bg-gray-100 text-slate-900'
                    : 'text-slate-600 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
        {rightSlot && <div className="mt-3">{rightSlot}</div>}
      </div>
      {/* Desktop: Pill tabs */}
      <div className="hidden sm:flex justify-center items-center gap-3">
        <div className="inline-flex bg-gray-100 rounded-full p-1 gap-0.5">
          {planTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeType === type
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
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
