"use client"
import { useEffect, useState } from 'react'
import JobCard from '../components/careers/JobCard'

const API_URL = process.env.NEXT_PUBLIC_SQUADHUB_API_URL || ''

export default function Careers() {
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`${API_URL}/api/v1/careers/positions`)
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'Failed to load positions')
        if (!cancelled) setPositions(data.positions || [])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load open positions')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className="pt-32 pb-20 px-5 sm:px-8">
      <div className="max-w-[1160px] mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-brand-purple/10 border border-brand-purple/20 px-3 py-1.5 rounded-full mb-8">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Careers
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-4 text-text-primary">
          Join the UpSquad
        </h1>
        <p className="text-base text-text-secondary mb-12 max-w-2xl leading-relaxed">
          We&apos;re building the subscription model for modern brand teams. Browse open roles below
          and apply with your name, email, and phone — we&apos;ll be in touch.
        </p>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-surface-secondary border border-[rgba(96,96,163,0.2)] animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-white border-2 border-brand-orange rounded-xl p-6 text-sm text-text-primary">
            <p className="font-semibold mb-1">Couldn&apos;t load positions</p>
            <p className="text-text-secondary">{error}</p>
            <p className="text-text-secondary mt-3">
              You can still reach us at{' '}
              <a href="mailto:hello@upsquadconnect.com" className="font-medium underline">
                hello@upsquadconnect.com
              </a>
              .
            </p>
          </div>
        )}

        {!loading && !error && positions.length === 0 && (
          <div className="bg-white border border-[rgba(96,96,163,0.2)] rounded-xl p-8 text-center">
            <p className="font-heading text-lg font-semibold text-text-primary mb-2">No open positions right now</p>
            <p className="text-sm text-text-secondary">
              Check back soon, or email{' '}
              <a href="mailto:hello@upsquadconnect.com" className="font-medium text-text-primary hover:opacity-70">
                hello@upsquadconnect.com
              </a>{' '}
              with your resume.
            </p>
          </div>
        )}

        {!loading && !error && positions.length > 0 && (
          <div className="space-y-6">
            {positions.map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
