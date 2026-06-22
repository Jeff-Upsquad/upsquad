"use client"
import { useEffect, useRef, useState } from 'react'
import AccountantHero from '../components/accountant/AccountantHero'
import SubscriptionDetails from '../components/accountant/SubscriptionDetails'
import AssignmentOptions from '../components/accountant/AssignmentOptions'
import HiringOptions from '../components/accountant/HiringOptions'

const TABS = [
  { id: 'subscription', label: 'Subscription' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'hiring', label: 'Hiring' },
]

export default function AccountantSubscription() {
  const [tab, setTab] = useState('subscription')
  const tabsRef = useRef(null)

  // After a tab change commits, align the sticky tab bar just under the fixed
  // nav so the chosen panel shows from its top. This runs in an effect (after
  // the panel swaps) rather than the click handler, because scrolling before the
  // swap lets the swap abort the smooth scroll and leave you mid-panel. The bar's
  // natural position is read via a brief `position` toggle — getBoundingClientRect
  // and offsetTop both report the *stuck* position once it is pinned.
  // Only scroll in response to a user tab switch (goToTab sets the flag), never
  // on mount — the flag also survives React StrictMode's double-invoked mount
  // effect, which a plain "first render" ref would not.
  const pendingScroll = useRef(false)
  useEffect(() => {
    if (!pendingScroll.current) return
    pendingScroll.current = false
    const el = tabsRef.current
    if (!el) return
    const saved = el.style.position
    el.style.position = 'static'
    const top = el.getBoundingClientRect().top + window.scrollY
    el.style.position = saved
    // Instant, not smooth: a smooth scroll started here gets aborted by the
    // panel swap / ScrollReveal mount, stranding you mid-panel. A jump to the
    // panel top is also the cleaner result when switching tabs.
    window.scrollTo({ top: Math.max(0, top - 76), behavior: 'instant' })
  }, [tab])

  const goToTab = (id) => {
    pendingScroll.current = true
    setTab(id)
  }

  return (
    <>
      <AccountantHero onSelectTab={goToTab} />

      {/* Tab switcher (sticky under the navbar) */}
      <div
        ref={tabsRef}
        className="sticky top-[76px] z-40 border-y border-[rgba(0,0,0,0.06)] bg-white/95 backdrop-blur-md"
      >
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-3 flex items-center justify-center sm:justify-between gap-4">
          <span className="hidden sm:block text-sm text-text-secondary">
            Three ways to work with us — pick one:
          </span>
          <div
            role="tablist"
            aria-label="Choose subscription, assignments, or hiring"
            className="inline-flex p-1 rounded-full border-[1.5px] border-black bg-white shadow-brutal-sm"
          >
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goToTab(t.id)}
                  className={`px-6 sm:px-9 py-2 rounded-full text-sm font-semibold transition-colors duration-short ${
                    active ? 'bg-brand-purple text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active panel */}
      <div role="tabpanel">
        {tab === 'subscription' ? (
          <SubscriptionDetails />
        ) : tab === 'assignments' ? (
          <AssignmentOptions />
        ) : (
          <HiringOptions />
        )}
      </div>
    </>
  )
}
