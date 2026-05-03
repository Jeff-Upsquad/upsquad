"use client"
import { useState, useRef, useCallback } from 'react'
import ServiceTypeTabs from '../components/pricing/ServiceTypeTabs'
import SubtierTabs from '../components/pricing/SubtierTabs'
import PricingHero from '../components/pricing/PricingHero'
import StepHeader from '../components/pricing/StepHeader'
import AvailabilityTable from '../components/pricing/AvailabilityTable'
import NameYourPriceForm from '../components/pricing/NameYourPriceForm'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import UnlimitedRequestsExplainer from '../components/pricing/UnlimitedRequestsExplainer'
import ImportantNote from '../components/pricing/ImportantNote'

export default function Pricing() {
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedTiers, setSelectedTiers] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const formRef = useRef(null)

  const handleToggleService = useCallback((service) => {
    setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service])
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

  const canSelectPlan = selectedServices.length > 0 && selectedTiers.length > 0

  return (
    <div className="pt-20 pb-0">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <PricingHero />

        <StepHeader number="01" title="Pick your talent type(s)" subtitle="Select one or more — Designers create static visuals, Editors craft motion and video." />
        <ServiceTypeTabs selectedServices={selectedServices} onToggleService={handleToggleService} />

        <StepHeader number="02" title="Pick experience level(s)" subtitle="Select one or more — we'll match you with talent across all chosen levels." />
        <SubtierTabs selectedTiers={selectedTiers} onToggleTier={handleToggleTier} />

        <StepHeader number="03" title="Select your plan" subtitle="Plans differ by availability — how much of a creative partner you get each week." />
        {canSelectPlan ? (
          <AvailabilityTable selectedPlan={selectedPlan} onSelectPlan={handlePlanSelect} />
        ) : (
          <div className="bg-surface-secondary border-2 border-dashed border-text-primary/30 rounded-xl p-10 text-center">
            <p className="text-sm text-text-secondary">
              {selectedServices.length === 0 && selectedTiers.length === 0
                ? 'Pick a talent type and an experience level above to see plan options.'
                : selectedServices.length === 0
                ? 'Pick at least one talent type above to see plan options.'
                : 'Pick at least one experience level above to see plan options.'}
            </p>
          </div>
        )}

        {selectedPlan && (
          <NameYourPriceForm
            ref={formRef}
            selectedServices={selectedServices}
            selectedTiers={selectedTiers}
            selectedPlan={selectedPlan}
          />
        )}

        <BenefitsSection />
        <WhatYouCanRequest />
        <WorkingHours />
        <UnlimitedRequestsExplainer />
        <ImportantNote />
      </div>
    </div>
  )
}
