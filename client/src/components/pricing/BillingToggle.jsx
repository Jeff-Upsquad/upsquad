"use client"

export default function BillingToggle({ isYearly, setIsYearly }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <span className={`text-sm font-medium ${!isYearly ? 'text-text-primary' : 'text-text-muted'}`}>Monthly</span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className={`relative w-11 h-6 rounded-full transition-colors ${isYearly ? 'bg-brand-purple' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            isYearly ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isYearly ? 'text-text-primary' : 'text-text-muted'}`}>
        Yearly <span className="text-brand-green">2 months free</span>
      </span>
    </div>
  )
}
