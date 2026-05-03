"use client"
import { useState } from 'react'
import { liveTypes } from '../data/pricing'
import PlanTypeTabs from '../components/pricing/PlanTypeTabs'
import LivePricingBlock from '../components/pricing/LivePricingBlock'
import BenefitsSection from '../components/pricing/BenefitsSection'
import WhatYouCanRequest from '../components/pricing/WhatYouCanRequest'
import WorkingHours from '../components/pricing/WorkingHours'
import UnlimitedRequestsExplainer from '../components/pricing/UnlimitedRequestsExplainer'
import ImportantNote from '../components/pricing/ImportantNote'
import VideoPhotographerPricing from '../components/pricing/VideoPhotographerPricing'

export default function Pricing() {
  const [activeType, setActiveType] = useState('Designers')

  return (
    <div className="pt-20 pb-0">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <PlanTypeTabs activeType={activeType} setActiveType={setActiveType} />

        {activeType === 'Video/Photographer' ? (
          <VideoPhotographerPricing />
        ) : liveTypes.includes(activeType) ? (
          <>
            <LivePricingBlock activeType={activeType} />
            <BenefitsSection />
            <WhatYouCanRequest />
            <WorkingHours />
            <UnlimitedRequestsExplainer />
            <ImportantNote />
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">{activeType} Plan</h1>
            </div>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">Coming Soon</h2>
              <p className="text-text-secondary max-w-md">
                Pricing for <span className="font-semibold text-text-primary">{activeType}</span> is on its way. Join the waitlist to get notified when it launches.
              </p>
              <a href="#" className="mt-8 btn-gradient font-semibold text-sm px-6 py-3 transition-colors">
                Join the Waitlist
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
