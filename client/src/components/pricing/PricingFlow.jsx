"use client"
import { useState, useRef, useCallback } from 'react'
import ServiceTypeTabs from './ServiceTypeTabs'
import SubtierTabs from './SubtierTabs'
import StepHeader from './StepHeader'
import AvailabilityTable from './AvailabilityTable'
import WorkingDaysSelector from './WorkingDaysSelector'
import NameYourPriceForm from './NameYourPriceForm'

export default function PricingFlow() {
  const [selectedService, setSelectedService] = useState(null)
  const [selectedTiers, setSelectedTiers] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  const formRef = useRef(null)

  const handleToggleDay = useCallback((day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])
  }, [])

  const handleSelectService = useCallback((service) => {
    setSelectedService(service)
    setSelectedPlan(null)
  }, [])

  const handleToggleTier = useCallback((tier) => {
    setSelectedTiers(prev => prev.includes(tier) ? prev.filter(t => t !== tier) : [...prev, tier])
    setSelectedPlan(null)
  }, [])

  const handlePlanSelect = useCallback((planId) => {
    setSelectedPlan(planId)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }, [])

  const canSelectPlan = !!selectedService && selectedTiers.length > 0

  return (
    <>
      <StepHeader number="01" title="Pick your talent type" subtitle="Designers create static visuals, Editors craft motion and video, or pick a hybrid who can do both." />
      <ServiceTypeTabs selectedService={selectedService} onSelectService={handleSelectService} />

      <StepHeader number="02" title="Pick experience level(s)" subtitle="Select one or more — we'll match you with talent across all chosen levels." />
      <SubtierTabs selectedTiers={selectedTiers} onToggleTier={handleToggleTier} />

      <StepHeader number="03" title="Select your plan" subtitle="Plans differ by availability — how much of a creative partner you get each week." />
      {canSelectPlan ? (
        <AvailabilityTable selectedPlan={selectedPlan} onSelectPlan={handlePlanSelect} />
      ) : (
        <div className="bg-surface-secondary border-2 border-dashed border-text-primary/30 rounded-xl p-10 text-center">
          <p className="text-sm text-text-secondary">
            {!selectedService && selectedTiers.length === 0
              ? 'Pick a talent type and an experience level above to see plan options.'
              : !selectedService
              ? 'Pick a talent type above to see plan options.'
              : 'Pick at least one experience level above to see plan options.'}
          </p>
        </div>
      )}

      {selectedPlan && (
        <>
          <StepHeader number="04" title="Pick working days" subtitle="Monday to Friday is included by default. Saturday and Sunday are optional add-ons." />
          <WorkingDaysSelector selectedDays={selectedDays} onToggleDay={handleToggleDay} />

          <NameYourPriceForm
            ref={formRef}
            selectedService={selectedService}
            selectedTiers={selectedTiers}
            selectedPlan={selectedPlan}
            selectedDays={selectedDays}
          />
        </>
      )}
    </>
  )
}
