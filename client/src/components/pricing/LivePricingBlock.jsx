"use client"
import { useState } from 'react'
import SubtierTabs from './SubtierTabs'
import BillingToggle from './BillingToggle'
import PricingTable from './PricingTable'
import NoteSection from './NoteSection'

export default function LivePricingBlock({ activeType }) {
  const [isYearly, setIsYearly] = useState(false)
  const [activeSubtier, setActiveSubtier] = useState('Pros')

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">{activeType} Plan</h1>
        <p className="text-text-secondary">Unlimited requests. Unlimited revisions. Pick a plan that fits your workflow.</p>
      </div>
      <SubtierTabs activeSubtier={activeSubtier} setActiveSubtier={setActiveSubtier} />
      <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
      <PricingTable isYearly={isYearly} activeSubtier={activeSubtier} />
      <NoteSection />
    </>
  )
}
