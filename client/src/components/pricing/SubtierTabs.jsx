"use client"
import { subtiers, subtierDescriptions } from '../../data/pricing'

export default function SubtierTabs({ selectedTiers, onToggleTier }) {
  return (
    <div className="flex flex-col items-center mb-2 gap-4">
      <div className="inline-flex flex-wrap justify-center gap-2">
        {subtiers.map((tier) => {
          const isActive = selectedTiers.includes(tier)
          return (
            <button
              key={tier}
              onClick={() => onToggleTier(tier)}
              aria-pressed={isActive}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                isActive
                  ? 'bg-brand-purple text-text-primary border-text-primary shadow-brutal-sm'
                  : 'bg-white text-text-secondary border-text-primary/30 hover:border-text-primary hover:text-text-primary'
              }`}
            >
              {isActive && (
                <svg className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {tier}
            </button>
          )
        })}
      </div>

      {selectedTiers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-4xl mt-2">
          {subtiers.map((tier) => {
            if (!selectedTiers.includes(tier)) return null
            return (
              <div
                key={tier + '-desc'}
                className="bg-white border-2 border-text-primary rounded-lg p-4 shadow-brutal-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-purple border border-text-primary" />
                  <span className="font-heading font-bold text-sm text-text-primary">{tier}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{subtierDescriptions[tier]}</p>
              </div>
            )
          })}
        </div>
      )}

      {selectedTiers.length === 0 && (
        <p className="text-sm text-brand-orange font-medium">Select at least one experience level to continue.</p>
      )}
    </div>
  )
}
