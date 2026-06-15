"use client"
import { useRef, useState } from 'react'
import AccountantHero from '../components/accountant/AccountantHero'
import SubscriptionDetails from '../components/accountant/SubscriptionDetails'
import HiringOptions from '../components/accountant/HiringOptions'

const TABS = [
  { id: 'subscription', label: 'Subscription' },
  { id: 'hiring', label: 'Hiring' },
]

export default function AccountantSubscription() {
  const [tab, setTab] = useState('subscription')
  const tabsRef = useRef(null)

  // Switch tab, then align the tab bar just under the fixed navbar so the
  // chosen panel is shown from its top.
  const goToTab = (id) => {
    setTab(id)
    requestAnimationFrame(() => {
      const el = tabsRef.current
      if (!el) return
      // Read the tab bar's natural document position. getBoundingClientRect() and
      // offsetTop both report the *stuck* position once the sticky bar is pinned,
      // so the scroll target would collapse to the current scroll and leave you
      // mid-panel when switching tabs after scrolling down. Briefly neutralising
      // `position` exposes the in-flow position (no repaint between sync writes).
      const saved = el.style.position
      el.style.position = 'static'
      const top = el.getBoundingClientRect().top + window.scrollY
      el.style.position = saved
      window.scrollTo({ top: Math.max(0, top - 76), behavior: 'smooth' })
    })
  }

  return (
    <>
      <AccountantHero onSelectTab={goToTab} />

      {/* Tab switcher (sticky under the navbar) */}
      <div
        ref={tabsRef}
        className="sticky top-[76px] z-40 border-y border-[rgba(96,96,163,0.15)] bg-white/95 backdrop-blur-md"
      >
        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 py-3 flex items-center justify-center sm:justify-between gap-4">
          <span className="hidden sm:block text-sm text-text-secondary">
            Two ways to work with us — pick one:
          </span>
          <div
            role="tablist"
            aria-label="Choose subscription or hiring"
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
                    active ? 'bg-brand-purple text-text-primary' : 'text-text-secondary hover:text-text-primary'
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
        {tab === 'subscription' ? <SubscriptionDetails /> : <HiringOptions />}
      </div>
    </>
  )
}
