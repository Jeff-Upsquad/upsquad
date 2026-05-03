"use client"
import PricingHero from '../components/pricing/PricingHero'
import PricingFlow from '../components/pricing/PricingFlow'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import UnlimitedRequestsExplainer from '../components/pricing/UnlimitedRequestsExplainer'
import ImportantNote from '../components/pricing/ImportantNote'

export default function Pricing() {
  return (
    <div className="pt-20 pb-0">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <PricingHero />

        <PricingFlow />

        <BenefitsSection />
        <WhatYouCanRequest />
        <WorkingHours />
        <UnlimitedRequestsExplainer />
        <ImportantNote />
      </div>
    </div>
  )
}
