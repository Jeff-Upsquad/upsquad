"use client"
import { useState } from 'react'
import Link from 'next/link'
import { squads, totalProductCount } from '../../data/squads'
import ProductStatusBadge from '../ProductStatusBadge'

export default function SquadProducts() {
  const [activeSquadId, setActiveSquadId] = useState('all')
  const visibleSquads = activeSquadId === 'all' ? squads : squads.filter((s) => s.id === activeSquadId)

  return (
    <section id="products" className="mt-20">
      <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted mb-2">
        Products — {totalProductCount} across {squads.length} squads
      </p>
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">Every product, one subscription</h2>
      <p className="text-text-secondary mb-6 max-w-2xl leading-relaxed">
        Everything UpSquad offers, grouped by squad. Mix and match any products — each one is a dedicated,
        subscription-based resource you can scale up or down as your brand grows.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {[{ id: 'all', name: 'All Squads' }, ...squads].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSquadId(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              activeSquadId === tab.id
                ? 'border-brand-purple bg-white text-text-primary'
                : 'border-[rgba(0,0,0,0.08)] text-text-secondary hover:border-brand-purple/40'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-14">
        {visibleSquads.map((squad) => (
          <div key={squad.id}>
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-heading text-lg font-bold text-text-primary tracking-[-0.01em] flex items-center gap-2.5">
                <span aria-hidden>{squad.emoji}</span>
                {squad.name}
              </h3>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-2xl">{squad.description}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {squad.products.map((product) => {
                const available = product.status === 'live' || product.status === 'waitlist'
                const linked = available && product.href
                const cardClasses = `group/card relative border rounded-xl p-5 transition-all ${
                  available
                    ? 'bg-white border-[rgba(0,0,0,0.08)] hover:border-brand-purple/40'
                    : 'bg-surface-secondary border-[rgba(0,0,0,0.08)]'
                } ${linked ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover' : ''}`
                const inner = (
                  <>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="text-xl shrink-0" aria-hidden>{product.emoji}</span>
                      <ProductStatusBadge status={product.status} />
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary leading-snug flex items-center gap-1.5">
                      {product.name}
                      {linked && (
                        <svg
                          className="w-3.5 h-3.5 text-text-muted transition-transform duration-short group-hover/card:translate-x-0.5"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" aria-hidden
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      )}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">{product.desc}</p>
                  </>
                )
                return linked ? (
                  <Link key={product.name} href={product.href} className={`block ${cardClasses}`}>
                    {inner}
                  </Link>
                ) : (
                  <div key={product.name} className={cardClasses}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
