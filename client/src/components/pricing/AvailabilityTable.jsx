"use client"
import { availabilityPlans } from '../../data/pricing'
import { CheckIcon, CrossIcon, InfoTooltip } from './icons'

function getFeatureRows(talent) {
  return [
    {
      label: 'Unlimited work requests',
      tooltip: 'Unlimited work request means you can place as many requests with us. We will deliver them one by one based on your applicable plan.',
      render: () => <CheckIcon />,
    },
    {
      label: 'Squad Manager',
      tooltip: 'A Squad Manager assists you with overall management and support, and makes sure everything is getting done. They oversee and help — they are not a full project manager.',
      render: () => <CheckIcon />,
    },
    {
      label: 'Urgent Works',
      tooltip: `For starter, basic, and plus plan. We do not entertain urgent work meaning placing request today and expecting delivery today itself. If our ${talent} are available, we will try to accommodate it, but it is not guaranteed.`,
      render: (plan) => plan.urgentWorks ? <CheckIcon /> : <CrossIcon />,
    },
    {
      label: 'Access to Squad Hub',
      tooltip: `We use our own platform called SquadHub to manage all the work. You will be able to view the work submitted, progress, chat, and interact with your ${talent} through this. Five users are included free. Additional users are ₹500 per user per month.`,
      render: () => (
        <div className="text-xs text-text-secondary leading-relaxed">
          <div><span className="font-semibold text-text-primary">5 users:</span> free access</div>
          <div><span className="font-semibold text-text-primary">Additional user:</span> ₹500 per month</div>
        </div>
      ),
    },
    {
      label: 'Meetings',
      tooltip: `If you want to take a meeting with your ${talent}, you need to schedule it. Instant meetings are not available. Instant meeting is only available in personal plan.`,
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
}

export default function AvailabilityTable({ selectedPlan, onSelectPlan, showCta = true, variant = 'creative' }) {
  const talent = variant === 'accountant' ? 'accountants' : 'designers and editors'
  const featureRows = getFeatureRows(talent)
  const plans = availabilityPlans.map((plan) => {
    if (variant !== 'accountant') return plan
    return {
      ...plan,
      description:
        plan.id === 'personal'
          ? 'Your own personal accountant, like an in-house partner.'
          : plan.description,
      approach: plan.approach.replace('creative support', 'accounting support'),
    }
  })
  const gridClass = 'grid-cols-[180px_repeat(5,1fr)]'

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[1000px]">
        <div className={`grid ${gridClass} gap-0`}>
          <div />
          {plans.map((plan) => (
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

        <div className={`grid ${gridClass} gap-0 border-t border-[rgba(0,0,0,0.08)]`}>
          <div className="flex items-center px-4 py-4">
            <span className="text-sm font-medium text-text-primary">
              Availability
              <InfoTooltip text="Availability shows the number of hours your selected talent will be available on a per-day, per-week, and per-month basis." />
            </span>
          </div>
          {plans.map((plan) => (
            <div
              key={plan.id + '-avail'}
              className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
                plan.highlighted ? 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple' : ''
              }`}
            >
              <span className="text-2xl font-bold text-text-primary">{plan.hoursPerDay}</span>
              <span className="text-[11px] text-text-secondary mt-0.5">per day</span>
              <span className="text-[11px] text-text-muted mt-1">{plan.approach}</span>
              <span className="text-[11px] text-text-secondary italic mt-1">{plan.hoursPerWeek} per week</span>
              <span className="text-[11px] text-text-secondary italic">{plan.hoursPerMonth} per month</span>
            </div>
          ))}
        </div>

        {featureRows.map((row) => (
          <div
            key={row.label}
            className={`grid ${gridClass} gap-0 border-t border-[rgba(0,0,0,0.08)]`}
          >
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-text-primary">
                {row.label}
                {row.tooltip && <InfoTooltip text={row.tooltip} />}
              </span>
            </div>
            {plans.map((plan) => (
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

        {showCta && (
          <div className={`grid ${gridClass} gap-0`}>
            <div />
            {plans.map((plan) => {
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
        )}

        {!showCta && (
          <div className={`grid ${gridClass} gap-0`}>
            <div />
            {plans.map((plan) => (
              <div
                key={plan.id + '-foot'}
                className={`pb-1 ${
                  plan.highlighted
                    ? 'bg-brand-purple/5 border-l-2 border-r-2 border-b-2 border-brand-purple rounded-b-xl'
                    : ''
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
