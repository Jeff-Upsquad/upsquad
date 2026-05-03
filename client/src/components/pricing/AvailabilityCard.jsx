"use client"
import { CheckIcon, CrossIcon } from './icons'

export default function AvailabilityCard({ plan, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(plan.id)}
      className={`relative text-left w-full rounded-xl p-5 transition-all cursor-pointer border-2 ${
        isSelected
          ? 'border-emerald-500 bg-emerald-50/40 shadow-md'
          : plan.highlighted
          ? 'border-emerald-200 bg-white hover:border-emerald-400 hover:shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full whitespace-nowrap">
          {plan.badge}
        </span>
      )}

      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className="mb-4 pt-1">
        <div className="text-4xl font-bold text-slate-900">{plan.availability}</div>
        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">Availability</div>
      </div>

      <h3 className="font-heading font-semibold text-slate-900 text-sm">{plan.name}</h3>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>

      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
        <Detail label="Per day" value={plan.hoursPerDay} />
        <Detail label="Per week" value={plan.hoursPerWeek} />
        <Detail label="Queue" value={plan.queue} />
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 w-16 flex-shrink-0">Urgent</span>
          {plan.urgentWorks ? <CheckIcon /> : <CrossIcon />}
        </div>
        {plan.liveCollaboration && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 w-16 flex-shrink-0">Live collab</span>
            <CheckIcon />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <span className="text-[11px] text-slate-400">Best for</span>
        <p className="text-xs text-slate-600 font-medium mt-0.5">{plan.bestFor}</p>
      </div>
    </button>
  )
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-slate-400 w-16 flex-shrink-0">{label}</span>
      <span className="text-xs text-slate-700">{value}</span>
    </div>
  )
}
