"use client"
import { subtiers, subtierDescriptions } from '../../data/pricing'

export default function SubtierTabs({ activeSubtier, setActiveSubtier }) {
  return (
    <div className="flex flex-col items-center mb-6 gap-3">
      <div className="inline-flex bg-gray-100 rounded-lg p-1">
        {subtiers.map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveSubtier(tier)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeSubtier === tier
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>
      {activeSubtier && (
        <p className="text-sm text-slate-500 text-center max-w-md">
          {subtierDescriptions[activeSubtier]}
        </p>
      )}
    </div>
  )
}
