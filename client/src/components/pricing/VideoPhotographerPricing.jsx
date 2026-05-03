"use client"
import { useState } from 'react'
import { videographerPlans, presentationPlans, formatPrice } from '../../data/pricing'
import { CheckIcon, CrossIcon } from './icons'

function VideographerTable() {
  const rows = [
    { label: 'Price per day', key: 'priceLabel', bold: true },
    { label: 'Shoot Duration', key: 'shootDuration' },
    { label: 'Equipments', key: 'equipments' },
    { label: 'Expert level', key: 'expertLevel' },
    { label: 'Crew', key: 'crew' },
    { label: 'Pre-Shoot Planning', key: 'preShooting' },
  ]
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[160px_repeat(5,1fr)]">
          <div />
          {videographerPlans.map((p) => (
            <div key={p.name} className={`text-center px-3 pt-6 pb-4 ${p.highlighted ? 'bg-brand-purple/5 border-t-2 border-l-2 border-r-2 border-brand-purple rounded-t-xl' : ''}`}>
              {p.badge && <span className="inline-block bg-gradient-to-r from-brand-pink to-brand-purple text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">{p.badge}</span>}
              <h3 className="font-heading font-semibold text-text-primary text-sm">{p.name}</h3>
            </div>
          ))}
        </div>
        {rows.map((row, rowIdx) => (
          <div key={row.label} className="grid grid-cols-[160px_repeat(5,1fr)] border-t border-[rgba(96,96,163,0.2)]">
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-text-primary">{row.label}</span>
            </div>
            {videographerPlans.map((p) => (
              <div key={p.name + row.key} className={`flex items-center justify-center py-4 px-2 text-center text-xs ${
                p.highlighted
                  ? rowIdx === rows.length - 1
                    ? 'bg-brand-purple/5 border-l-2 border-r-2 border-b-2 border-brand-purple rounded-b-xl'
                    : 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple'
                  : ''
              }`}>
                {row.key === 'preShooting' && p[row.key] === null
                  ? <CrossIcon />
                  : <span className={row.bold ? 'font-bold text-text-primary text-base' : 'text-text-secondary'}>{p[row.key]}</span>
                }
              </div>
            ))}
          </div>
        ))}
        <div className="grid grid-cols-[160px_repeat(5,1fr)] pt-4">
          <div />
          {videographerPlans.map((p) => (
            <div key={p.name + '-cta'} className="flex justify-center px-3">
              <button className="btn-gradient px-5 py-2.5 text-sm font-medium transition-all">
                {p.name === 'Personal' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PresentationTable() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[600px]">
        <div className="grid grid-cols-[160px_repeat(4,1fr)]">
          <div />
          {presentationPlans.map((p) => (
            <div key={p.name} className={`text-center px-3 pt-6 pb-4 ${p.highlighted ? 'bg-brand-purple/5 border-t-2 border-l-2 border-r-2 border-brand-purple rounded-t-xl' : ''}`}>
              {p.badge && <span className="inline-block bg-gradient-to-r from-brand-pink to-brand-purple text-text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">{p.badge}</span>}
              <h3 className="font-heading font-semibold text-text-primary text-sm">{p.name}</h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[160px_repeat(4,1fr)] border-t border-[rgba(96,96,163,0.2)]">
          <div className="flex items-center px-4 py-4"><span className="text-sm font-medium text-text-primary">Monthly Price</span></div>
          {presentationPlans.map((p) => (
            <div key={p.name + '-price'} className={`flex flex-col items-center justify-center py-4 ${p.highlighted ? 'bg-brand-purple/5 border-l-2 border-r-2 border-brand-purple' : ''}`}>
              <span className="text-2xl font-bold text-text-primary">₹{formatPrice(p.monthlyPrice)}</span>
              <span className="text-xs text-text-muted">/month</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[160px_repeat(4,1fr)] border-t border-[rgba(96,96,163,0.2)]">
          <div className="flex items-center px-4 py-4"><span className="text-sm text-text-primary">Videos</span></div>
          {presentationPlans.map((p) => (
            <div key={p.name + '-videos'} className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
              p.highlighted
                ? 'bg-brand-purple/5 border-l-2 border-r-2 border-b-2 border-brand-purple rounded-b-xl'
                : ''
            }`}>
              <span className="text-sm font-semibold text-text-primary">{p.videos}</span>
              <span className="text-xs text-text-muted mt-0.5">Short Videos (per month)</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[160px_repeat(4,1fr)] pt-4">
          <div />
          {presentationPlans.map((p) => (
            <div key={p.name + '-cta'} className="flex justify-center px-3">
              <button className="btn-gradient px-5 py-2.5 text-sm font-medium transition-all">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function VideoPhotographerPricing() {
  const [activeSubTab, setActiveSubTab] = useState('Videographer/Photographer')
  const subTabs = ['Videographer/Photographer', 'Presentation Videos']
  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="inline-flex border border-[rgba(96,96,163,0.2)] rounded-xl p-1 bg-white gap-1">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSubTab === tab ? 'bg-brand-purple text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'Videographer/Photographer' ? (
        <>
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Videographer/Photographer Subscriptions</h1>
            <p className="text-text-secondary">Get professional video and photography coverage with flexible, transparent pricing.</p>
          </div>
          <VideographerTable />
          <div className="mt-8 bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-xl p-6">
            <p className="text-sm font-semibold text-text-primary mb-3">Important Notes:</p>
            <ul className="text-sm text-text-secondary space-y-1.5 list-disc list-inside">
              <li>Concepts, Scripts and other content related things are not included.</li>
              <li>Travel expenses will be extra.</li>
              <li>If additional equipments are required, rental cost for the same will be extra.</li>
              <li>If models, studios, props, paid locations are required, cost for the same will be extra.</li>
              <li>Crew can be single or multiple as per the requirement.</li>
              <li>Editing is not included in this subscription, you can subscribe to video editor separately if needed.</li>
            </ul>
          </div>
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-1">Features</h2>
            <p className="text-text-secondary mb-5">Maximum flexibility and creativity for your content production needs.</p>
            <div className="space-y-3">
              {[
                'Change videographer at any time based on availability',
                <>Shoot unlimited content within the allotted <strong>8 hours per day</strong></>,
                'No limit on the number of video concepts per shoot day',
                'Multiple takes allowed for each shot within the shoot time',
                'Pause and resume shoots based on your content calendar',
                <>Use shoot days for <strong>any content type</strong> (reels, ads, interviews, product shots, etc.)</>,
                'Full usage rights on all footage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="mt-12 mb-16">
            <h2 className="font-heading text-xl font-bold text-text-primary mb-1">Fair-Use &amp; Transparency</h2>
            <p className="text-text-secondary mb-5">Clear guidelines to ensure smooth collaboration and mutual respect.</p>
            <ul className="text-sm text-text-secondary space-y-2 list-disc list-inside">
              <li>8-hour workday includes setup and wrap-up time.</li>
              <li>Breaks included as per standard production norms.</li>
              <li>Overtime available at additional cost.</li>
              <li>Travel time considered separately if applicable (if need to travel between locations).</li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Presentation Videos</h1>
            <p className="text-text-secondary">Complete video production from concept to delivery.</p>
          </div>
          <PresentationTable />
          <div className="mt-8 bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-xl p-6">
            <p className="text-sm font-semibold text-text-primary mb-3">Who this plan is for?</p>
            <div className="space-y-2">
              {[
                'Your requirement is fixed',
                'You need a fixed number of videos per month',
                <>You want us to take care of the entire process: create concepts for shorts and long form videos, scripting and story boarding, shooting and editing, and final delivery.</>,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-xl p-6">
            <p className="text-sm font-semibold text-text-primary mb-3">What is included?</p>
            <div className="space-y-2">
              {[
                'Content Calendar for a Month including Concept, Scripts and Story boards in advance.',
                'Anchor/Model/Actor presenting the script in a talking head or walk and talk format.',
                'Final Edited Video + Full Footage after Trimming.',
                '2 Rounds of revisions for videos created (Unlimited Revisions if you take editor subscription).',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 mb-16 bg-surface-secondary border border-[rgba(96,96,163,0.2)] rounded-xl p-6">
            <p className="text-sm font-semibold text-text-primary mb-3">What's not included?</p>
            <div className="space-y-2">
              {[
                'Travel expenses extra for if location shoot is needed.',
                'Separate Models/Anchors/Actors if required is charged based on their per day rate.',
                'If additional cameras, drones or other equipments or props are needed, their rental cost will also be extra.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CrossIcon />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
