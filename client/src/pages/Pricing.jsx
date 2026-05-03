"use client"
import { useState, useRef, useCallback } from 'react'
import PlanTypeTabs from '../components/pricing/PlanTypeTabs'
import SubtierTabs from '../components/pricing/SubtierTabs'
import PricingHero from '../components/pricing/PricingHero'
import AvailabilityTable from '../components/pricing/AvailabilityTable'
import NameYourPriceForm from '../components/pricing/NameYourPriceForm'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import UnlimitedRequestsExplainer from '../components/pricing/UnlimitedRequestsExplainer'
import ImportantNote from '../components/pricing/ImportantNote'

export default function Pricing() {
  const [activeType, setActiveType] = useState('Designers')
  const [activeTier, setActiveTier] = useState('Pros')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const formRef = useRef(null)

  const handleTypeChange = useCallback((type) => {
    setActiveType(type)
    setSelectedPlan(null)
  }, [])

  const handleTierChange = useCallback((tier) => {
    setActiveTier(tier)
    setSelectedPlan(null)
  }, [])

  const handlePlanSelect = useCallback((planId) => {
    setSelectedPlan(planId)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }, [])

  return (
    <div className="pt-20 pb-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <PricingHero />
        <PlanTypeTabs activeType={activeType} setActiveType={handleTypeChange} types={['Designers', 'Editors']} />
        <SubtierTabs activeSubtier={activeTier} setActiveSubtier={handleTierChange} />
        <AvailabilityTable selectedPlan={selectedPlan} onSelectPlan={handlePlanSelect} />

        {selectedPlan && (
          <NameYourPriceForm
            ref={formRef}
            serviceType={activeType}
            selectedTier={activeTier}
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
