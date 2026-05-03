"use client"
import { serviceTypes, serviceTypeDescriptions } from '../../data/pricing'

export default function ServiceTypeTabs({ selectedService, onSelectService }) {
  return (
    <div className="flex flex-col items-center mb-2 gap-4">
      <div className="inline-flex flex-wrap justify-center gap-2">
        {serviceTypes.map((type) => {
          const isActive = selectedService === type
          return (
            <button
              key={type}
              onClick={() => onSelectService(type)}
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
              {type}
            </button>
          )
        })}
      </div>

      {selectedService && (
        <div className="w-full max-w-md mt-2">
          <div className="bg-white border-2 border-text-primary rounded-lg p-4 shadow-brutal-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-purple border border-text-primary" />
              <span className="font-heading font-bold text-sm text-text-primary">{selectedService}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">{serviceTypeDescriptions[selectedService]}</p>
          </div>
        </div>
      )}

      {!selectedService && (
        <p className="text-sm text-brand-orange font-medium">Select a talent type to continue.</p>
      )}
    </div>
  )
}
