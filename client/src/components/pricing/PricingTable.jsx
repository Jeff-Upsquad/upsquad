"use client"
import { plans, featureRows, formatPrice, getPlansForSubtier } from '../../data/pricing'
import { CheckIcon, CrossIcon, InfoTooltip } from './icons'

export default function PricingTable({ isYearly, activeSubtier }) {
  const currentPlans = activeSubtier ? getPlansForSubtier(activeSubtier) : plans
  const tablePlans = currentPlans.filter(p => p.monthlyPrice !== null)
  const getPrice = (plan) => isYearly ? plan.monthlyPrice * 10 : plan.monthlyPrice
  const periodLabel = isYearly ? '/year' : '/month'
  const gridClass = tablePlans.length === 5
    ? 'grid-cols-[180px_repeat(5,1fr)]'
    : 'grid-cols-[180px_repeat(4,1fr)]'

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[1000px]">
        {/* Plan Headers */}
        <div className={`grid ${gridClass} gap-0`}>
          <div />
          {tablePlans.map((plan) => (
            <div
              key={plan.name}
              className={`text-center px-3 pt-6 pb-4 relative ${
                plan.highlighted
                  ? 'bg-brand-purple/5 border-t-2 border-l-2 border-r-2 border-brand-purple rounded-t-xl'
                  : ''
              }`}
            >
              {plan.badge && (
                <span className="inline-block bg-gradient-to-r from-brand-pink to-brand-purple text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-heading font-semibold text-text-primary text-sm">{plan.name}</h3>
              <p className="text-xs text-text-secondary mt-1 leading-snug min-h-[32px]">{plan.description}</p>
            </div>
          ))}
        </div>

        {/* Price Row */}
        <div className={`grid ${gridClass} gap-0 border-t border-[rgba(96,96,163,0.2)]`}>
          <div className="flex items-center px-4 py-4">
            <span className="text-sm font-medium text-text-primary">Monthly Price</span>
          </div>
          {tablePlans.map((plan) => (
            <div
              key={plan.name + '-price'}
              className={`flex flex-col items-center justify-center py-4 ${
                plan.highlighted ? 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple' : ''
              }`}
            >
              <span className="text-2xl font-bold text-text-primary">
                ₹{formatPrice(getPrice(plan))}
              </span>
              <span className="text-xs text-text-muted">{periodLabel}</span>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        {featureRows.map((row, rowIdx) => (
          <div
            key={row.label}
            className={`grid ${gridClass} gap-0 border-t border-[rgba(96,96,163,0.2)]`}
          >
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-text-primary">
                {row.label}
                {row.sublabel && <span className="block text-xs text-text-muted">{row.sublabel}</span>}
                {row.tooltip && <InfoTooltip text={row.tooltip} />}
              </span>
            </div>
            {tablePlans.map((plan, colIdx) => {
              const originalIndex = plans.findIndex(p => p.name === plan.name)
              const val = row.values[originalIndex]
              return (
                <div
                  key={`${row.label}-${colIdx}`}
                  className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
                    plan.highlighted
                      ? rowIdx === featureRows.length - 1
                        ? 'bg-brand-purple/5 border-l-2 border-r-2 border-b-2 border-brand-purple rounded-b-xl'
                        : 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple'
                      : ''
                  }`}
                >
                  {val === 'check' ? (
                    <CheckIcon />
                  ) : val === 'cross' ? (
                    <CrossIcon />
                  ) : typeof val === 'object' ? (
                    <>
                      <span className="text-xs font-semibold text-text-primary">{val.bold}</span>
                      <span className="text-[11px] text-text-muted mt-0.5">{val.sub}</span>
                      {val.approach && <span className="text-[11px] text-text-secondary mt-1 italic">{val.approach}</span>}
                      {val.weekly && <span className="text-[11px] text-text-secondary italic">{val.weekly}</span>}
                    </>
                  ) : (
                    <span className="text-xs text-text-secondary">{val}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* CTA Row */}
        <div className={`grid ${gridClass} gap-0 pt-4`}>
          <div />
          {tablePlans.map((plan) => (
            <div key={plan.name + '-cta'} className="flex justify-center px-3">
              <button
                className="btn-gradient px-5 py-2.5 text-sm font-medium transition-all"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
