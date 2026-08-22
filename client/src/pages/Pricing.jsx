"use client"
import PricingHero from '../components/pricing/PricingHero'
import SquadProducts from '../components/pricing/SquadProducts'
import LandingProcess from '../components/landing/LandingProcess'
import BenefitsSection from '../components/pricing/BenefitsSection'

export default function Pricing() {
  return (
    <div className="pt-20 pb-0">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <PricingHero />
        <SquadProducts />
      </div>

      <LandingProcess />

      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <BenefitsSection />
      </div>
    </div>
  )
}
