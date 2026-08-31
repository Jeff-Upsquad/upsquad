"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isHome = pathname === '/'

  const logoTapRef = useRef(null)
  const triggerLogoTap = (e) => {
    if (e && (e.button !== 0 || e.ctrlKey || e.metaKey)) return // left-press only
    const el = logoTapRef.current
    if (!el) return
    el.classList.remove('is-tapped')
    void el.offsetWidth // force reflow so the animation restarts on every tap
    el.classList.add('is-tapped')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/10 shadow-[0_1px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="px-5 sm:px-8">
       <div className="max-w-[1160px] mx-auto">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo: hanging signboard, suspended from the top of the page */}
          <Link
            href="/"
            aria-label="UpSquad home"
            onPointerDown={triggerLogoTap}
            onClick={(e) => { if (isHome) e.preventDefault() }}
            className="relative inline-block self-start"
          >
            <span className="logo-drop block">
              <span
                ref={logoTapRef}
                onAnimationEnd={(e) => { if (e.animationName === 'tapSwing') logoTapRef.current?.classList.remove('is-tapped') }}
                className="logo-tap block"
              >
                <span className="logo-sway relative block pt-5">
                  {/* threads — converge at an anchor above the top edge, so their start is off-screen */}
                  <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[-8px] h-7 w-full overflow-visible">
                    <line x1="50%" y1="0" x2="14%" y2="100%" stroke="rgba(10,10,10,0.42)" strokeWidth="1.4" strokeLinecap="round" />
                    <line x1="50%" y1="0" x2="86%" y2="100%" stroke="rgba(10,10,10,0.42)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {/* signboard */}
                  <span className="inline-flex items-baseline gap-1 bg-[#0A0A0A] text-white border-2 border-white rounded-xl px-4 py-2 font-heading font-extrabold text-lg leading-none tracking-tight shadow-[0_8px_18px_-6px_rgba(0,0,0,0.45)] ring-1 ring-black/10">
                    UpSquad
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FFFF99] shadow-[0_0_8px_rgba(255,255,153,0.75)]" />
                  </span>
                </span>
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {isHome ? (
              <>
                <a href="#ways-to-work" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-short">
                  How it Works
                </a>
                <a href="#categories" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-short">
                  The Squads
                </a>
              </>
            ) : (
              <>
                <Link href="/#ways-to-work" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-short">
                  How it Works
                </Link>
                <Link href="/#categories" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-short">
                  The Squads
                </Link>
              </>
            )}
            <Link
              href="/pricing"
              className={`text-sm transition-colors duration-short ${
                pathname === '/pricing' ? 'text-text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className={`text-sm transition-colors duration-short ${
                pathname === '/contact' ? 'text-text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="https://wa.me/919995266385?text=I%20want%20to%20know%20more%20about%20UpSquad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#0A0A0A] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-black transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.14)]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black/[0.06] py-3 space-y-0.5">
            {isHome ? (
              <>
                {['How it Works|#ways-to-work', 'The Squads|#categories'].map((item) => {
                  const [label, href] = item.split('|')
                  return (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-sm text-text-secondary px-2 py-2 rounded-md hover:bg-surface-secondary"
                    >
                      {label}
                    </a>
                  )
                })}
              </>
            ) : (
              <Link href="/" className="block text-sm text-text-secondary px-2 py-2 rounded-md hover:bg-surface-secondary">
                Home
              </Link>
            )}
            <Link
              href="/pricing"
              className={`block text-sm px-2 py-2 rounded-md hover:bg-surface-secondary ${
                pathname === '/pricing' ? 'text-text-primary font-medium' : 'text-text-secondary'
              }`}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className={`block text-sm px-2 py-2 rounded-md hover:bg-surface-secondary ${
                pathname === '/contact' ? 'text-text-primary font-medium' : 'text-text-secondary'
              }`}
            >
              Contact
            </Link>
            <div className="pt-2 border-t border-black/[0.06] mt-1">
              <a
                href="https://wa.me/919995266385?text=I%20want%20to%20know%20more%20about%20UpSquad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#0A0A0A] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        )}
       </div>
      </div>
    </nav>
  )
}
