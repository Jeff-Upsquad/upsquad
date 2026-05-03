"use client"
import { availabilityPlans } from '../../data/pricing'
import { CheckIcon, CrossIcon, InfoTooltip } from './icons'

const featureRows = [
  {
    label: 'Unlimited work requests',
    tooltip: 'Unlimited work request means you can place as many design or video edit requests with us. We will deliver them one by one based on your applicable plan.',
    render: () => <CheckIcon />,
  },
  {
    label: 'Squad Manager',
    tooltip: 'You will also be given a resource called Squad Manager, who will help you manage all the works. Coordinate works with designers and editors, and ensure delivery on time.',
    render: () => <CheckIcon />,
  },
  {
    label: 'Urgent Works',
    tooltip: 'For starter, basic, and plus plan. We do not entertain urgent work meaning placing request today and expecting delivery today itself. If our designers or editors are available, we will try to accommodate it, but it is not guaranteed.',
    render: (plan) => plan.urgentWorks ? <CheckIcon /> : <CrossIcon />,
  },
  {
    label: 'Queue',
    render: (plan) => <span className="text-xs text-text-secondary">{plan.queue}</span>,
  },
  {
    label: 'Access to Our Platform',
    render: () => <span className="text-xs text-text-secondary">Per user Rs 500</span>,
  },
  {
    label: 'Meetings',
    render: (plan) => <span className="text-xs text-text-secondary">{plan.meetings}</span>,
  },
  {
    label: 'Live Collaboration',
    render: (plan) => plan.liveCollaboration
      ? <span className="text-xs text-text-secondary">Yes — screen share & live edits</span>
      : <span className="text-xs text-text-secondary">No</span>,
  },
  {
    label: 'Shared Resource',
    render: (plan) => <span className="text-xs text-text-secondary">{plan.resource}</span>,
  },
  {
    label: 'Best For',
    render: (plan) => <span className="text-xs text-text-secondary">{plan.bestFor}</span>,
  },
]

export default function AvailabilityTable({ selectedPlan, onSelectPlan }) {
  const gridClass = 'grid-cols-[180px_repeat(5,1fr)]'

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[1000px]">
        {/* Plan Headers */}
        <div className={`grid ${gridClass} gap-0`}>
          <div />
          {availabilityPlans.map((plan) => (
            <div
              key={plan.id}
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

        {/* Availability Row (replaces Monthly Price) */}
        <div className={`grid ${gridClass} gap-0 border-t border-[rgba(96,96,163,0.2)]`}>
          <div className="flex items-center px-4 py-4">
            <span className="text-sm font-medium text-text-primary">Availability</span>
          </div>
          {availabilityPlans.map((plan) => (
            <div
              key={plan.id + '-avail'}
              className={`flex flex-col items-center justify-center py-4 ${
                plan.highlighted ? 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple' : ''
              }`}
            >
              <span className="text-2xl font-bold text-text-primary">{plan.availability}</span>
              <span className="text-xs text-text-muted">{plan.approach}</span>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        {featureRows.map((row) => (
          <div
            key={row.label}
            className={`grid ${gridClass} gap-0 border-t border-[rgba(96,96,163,0.2)]`}
          >
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-text-primary">
                {row.label}
                {row.tooltip && <InfoTooltip text={row.tooltip} />}
              </span>
            </div>
            {availabilityPlans.map((plan) => (
              <div
                key={`${row.label}-${plan.id}`}
                className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
                  plan.highlighted
                    ? 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple'
                    : ''
                }`}
              >
                {row.render(plan)}
              </div>
            ))}
          </div>
        ))}

        {/* CTA Row */}
        <div className={`grid ${gridClass} gap-0`}>
          <div />
          {availabilityPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <div
                key={plan.id + '-cta'}
                className={`flex justify-center px-3 pt-4 pb-4 ${
                  plan.highlighted
                    ? 'bg-brand-purple/5 border-l-2 border-r-2 border-b-2 border-brand-purple rounded-b-xl'
                    : ''
                }`}
              >
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`px-5 py-2.5 text-sm transition-all ${
                    isSelected
                      ? 'btn-gradient font-bold'
                      : 'btn-secondary font-medium'
                  }`}
                >
                  {isSelected ? 'Selected ✓' : 'Select Plan'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
