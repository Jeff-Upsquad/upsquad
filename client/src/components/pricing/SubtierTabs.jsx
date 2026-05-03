"use client"
import { subtiers, subtierDescriptions } from '../../data/pricing'

export default function SubtierTabs({ activeSubtier, setActiveSubtier }) {
  return (
    <div className="flex flex-col items-center mb-6 gap-3">
      <div className="inline-flex bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-lg p-1">
        {subtiers.map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveSubtier(tier)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeSubtier === tier
                ? 'bg-brand-purple text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>
      {activeSubtier && (
        <p className="text-sm text-text-secondary text-center max-w-md">
          {subtierDescriptions[activeSubtier]}
        </p>
      )}
    </div>
  )
}
