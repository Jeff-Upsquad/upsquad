const stats = [
  { value: 'One plan', label: 'Everything included' },
  { value: '6 squads', label: 'Ready to deploy' },
  { value: 'No contracts', label: 'Pause or cancel anytime' },
]

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-5 sm:px-8 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-500 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
            Waitlist open &middot; Early access &amp; launch offers
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
            The All-in-One Subscription
            <br />
            for Modern Brands.
          </h1>

          {/* Subtext */}
          <p className="text-xl text-gray-500 leading-relaxed mb-3 max-w-xl font-medium">
            Subscribing is better than hiring.
          </p>
          <p className="text-base text-gray-400 leading-relaxed mb-9 max-w-xl">
            One powerful plan that gives your brand access to content, marketing, tech, accounts,
            legal, and hiring — all under one roof. Stay consistent. Scale fast.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Join the Waitlist
            </a>
            <a
              href="#how-it-works"
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-5 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              How it works
            </a>
          </div>

          {/* Social proof nudge */}
          <p className="text-xs text-gray-400 mt-4">
            Join the waitlist to get early access and exclusive launch offers.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-gray-200/70">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-base font-semibold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
