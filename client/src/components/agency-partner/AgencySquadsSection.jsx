"use client"
import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import { squads, totalProductCount } from '../../data/squads'

export default function AgencySquadsSection() {
  const [activeSquadId, setActiveSquadId] = useState('all')

  const visibleSquads =
    activeSquadId === 'all' ? squads : squads.filter((s) => s.id === activeSquadId)

  return (
    <ScrollReveal>
      <section id="squads" className="py-20 px-5 sm:px-8 bg-white border-b border-[rgba(0,0,0,0.08)]">
        <div className="max-w-[1160px] mx-auto">
          {/* Section Header */}
          <div className="mb-8 max-w-3xl">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-text-muted mb-2">
              Squads & Categories — {totalProductCount} categories across {squads.length} squads
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-2">
              Every category, open for agency partnership
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Everything UpSquad offers, grouped by squad. We are inviting agencies to partner across any or all of these categories — delivering through dedicated monthly subscriptions, fixed-fee project assignments, or both.
            </p>
          </div>

          {/* Squad Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              type="button"
              onClick={() => setActiveSquadId('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                activeSquadId === 'all'
                  ? 'border-brand-purple bg-white text-text-primary font-semibold shadow-sm'
                  : 'border-[rgba(0,0,0,0.08)] bg-surface-secondary text-text-secondary hover:border-brand-purple/40 hover:text-text-primary'
              }`}
            >
              All Squads
            </button>
            {squads.map((squad) => (
              <button
                key={squad.id}
                type="button"
                onClick={() => setActiveSquadId(squad.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  activeSquadId === squad.id
                    ? 'border-brand-purple bg-white text-text-primary font-semibold shadow-sm'
                    : 'border-[rgba(0,0,0,0.08)] bg-surface-secondary text-text-secondary hover:border-brand-purple/40 hover:text-text-primary'
                }`}
              >
                <span>{squad.emoji}</span>
                <span>{squad.name}</span>
              </button>
            ))}
          </div>

          {/* Squads and Products List */}
          <div className="flex flex-col gap-14">
            {visibleSquads.map((squad) => (
              <div key={squad.id}>
                {/* Squad Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary tracking-[-0.01em] flex items-center gap-2.5">
                    <span aria-hidden className="text-2xl">{squad.emoji}</span>
                    <span>{squad.name}</span>
                  </h3>
                  <span className="self-start sm:self-auto text-[11px] font-mono-tech text-text-muted bg-surface-secondary px-2.5 py-1 rounded-md border border-[rgba(0,0,0,0.06)]">
                    {squad.products.length} categories open
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-2xl">
                  {squad.description}
                </p>

                {/* Categories Grid inside this Squad */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {squad.products.map((product) => (
                    <div
                      key={product.name}
                      className="group/card relative bg-white border border-[rgba(0,0,0,0.08)] hover:border-brand-purple/50 hover:shadow-card-hover rounded-xl p-5 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top row: Emoji + Accepting badge */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="text-2xl shrink-0" aria-hidden>
                            {product.emoji}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Accepting Partners
                          </span>
                        </div>

                        {/* Category Name & Desc */}
                        <h4 className="text-sm font-semibold text-text-primary leading-snug mb-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {product.desc}
                        </p>
                      </div>

                      {/* Delivery models tag */}
                      <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.05)] flex items-center justify-between text-[11px]">
                        <span className="font-mono-tech text-text-muted">
                          Retainers &middot; Sprints
                        </span>
                        <span className="font-medium text-brand-purple flex items-center gap-1 group-hover/card:translate-x-0.5 transition-transform">
                          Partner
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}
