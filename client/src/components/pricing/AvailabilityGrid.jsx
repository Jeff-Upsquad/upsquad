"use client"
import { availabilityPlans } from '../../data/pricing'
import AvailabilityCard from './AvailabilityCard'

export default function AvailabilityGrid({ selectedPlan, onSelectPlan }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {availabilityPlans.map((plan) => (
        <AvailabilityCard
          key={plan.id}
          plan={plan}
          isSelected={selectedPlan === plan.id}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  )
}
