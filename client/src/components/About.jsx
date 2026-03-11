export default function About() {
  return (
    <section className="py-16 px-5 sm:px-8 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[180px_1fr] gap-10 items-start">
          {/* Label */}
          <div className="pt-1">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">About Us</span>
          </div>

          {/* Content */}
          <div className="max-w-2xl">
            <p className="text-lg text-gray-800 leading-relaxed mb-4 font-medium">
              We're building Upsquad — a subscription that helps businesses manage their activities
              into one powerful, easy-to-manage plan.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              Designed for brands, startups, and creators who want a flexible, system and
              process-driven team. Stay consistent, save time, and focus on what matters most —
              growing your business.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Join our waitlist to get early access, exclusive launch benefits, and be among the
              first to experience the future of subscriptions.
            </p>
            <p className="text-sm font-medium text-gray-900">
              ✦&nbsp; No contracts. No stress. Just creativity that works.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
