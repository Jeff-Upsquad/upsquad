const stats = [
  { value: 'One plan', label: 'Everything included' },
  { value: '6 squads', label: 'Ready to deploy' },
  { value: 'No contracts', label: 'Pause or cancel anytime' },
]

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-5 sm:px-8 bg-dot-pattern border-b border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">

          {/* Left: text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
              Waitlist open &middot; Early access &amp; launch offers
            </div>

            {/* Two-tone headline */}
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight mb-6">
              <span className="text-gray-900">The All-in-One Subscription</span>
              <br />
              <span className="text-gray-400 font-bold">for Modern Brands.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-500 leading-[1.7] mb-8 max-w-lg">
              Subscribing is better than hiring. One plan gives your brand access to content,
              marketing, tech, accounts, legal, and hiring — all under one roof.
              Stay consistent. Scale fast.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#"
                className="bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Join the Waitlist
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-6 py-3 rounded-lg border border-gray-200 hover:border-gray-300 bg-white transition-all"
              >
                How it works →
              </a>
            </div>

            <p className="text-xs text-gray-400">
              Get early access and exclusive launch offers when you join the waitlist.
            </p>
          </div>

          {/* Right: decorative stat card */}
          <div className="hidden lg:flex flex-col gap-3 pt-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#F7F6F3] border border-gray-200/70 rounded-xl px-6 py-4 min-w-[200px]"
              >
                <div className="text-base font-semibold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-100 lg:hidden">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
