import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/60'
          : 'bg-[#F7F6F3]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5">
            <span className="font-bold text-lg text-gray-900 tracking-tight">Up</span>
            <span className="font-bold text-lg text-lime-500 tracking-tight">Squad</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#categories" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              The Squads
            </a>
            <a href="#testimonials" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Reviews
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-2 py-1">
              Sign in
            </a>
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-3 space-y-0.5">
            {['How it Works|#how-it-works', 'The Squads|#categories', 'Reviews|#testimonials'].map((item) => {
              const [label, href] = item.split('|')
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-600 px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  {label}
                </a>
              )
            })}
            <div className="pt-2 border-t border-gray-100 mt-1">
              <a href="#" className="block bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
