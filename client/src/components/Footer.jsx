"use client"
import Link from 'next/link'

const links = {
  Platform: [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Subscriptions', href: '/#categories' },
    { name: 'Join Waitlist', href: '#' },
    { name: 'Pricing', href: '/pricing' }
  ],
  Squads: [
    { name: 'Content Squad', href: '#' },
    { name: 'Marketing Squad', href: '#' },
    { name: 'Tech Squad', href: '#' },
    { name: 'Legal Squad', href: '#' }
  ],
  Company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '/contact' }
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ],
}

const socials = [
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-500 pt-14 pb-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center mb-3">
              <span className="font-heading font-bold text-lg text-white">Up</span>
              <span className="font-heading font-bold text-lg text-lime-500">Squad</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-xs">
              Subscribing is better than hiring. The all-in-one subscription for modern brands.
            </p>
            <a
              href="mailto:hello@upsquadconnect.com"
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors block mb-4"
            >
              hello@upsquadconnect.com
            </a>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-7 h-7 rounded-md bg-gray-900 hover:bg-gray-800 text-gray-500 hover:text-gray-300 flex items-center justify-center transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="col-span-1">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">{heading}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith('/') ? (
                      <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
                        {item.name}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-700">&copy; 2025, D-var Dynamics Technologies Pvt Ltd. All rights reserved.</p>
          <p className="text-xs text-gray-700">Subscribing is better than hiring.</p>
        </div>
      </div>
    </footer>
  )
}
