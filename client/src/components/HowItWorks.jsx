const steps = [
  {
    number: '1',
    title: 'Subscribe to a plan',
    description:
      'Choose the subscription that fits your brand\'s needs. No contracts, no lock-ins — pause or cancel anytime.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Meet your squad',
    description:
      'We assemble the right experts from the right squad for your brand — vetted professionals, ready to get to work.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Scale your brand',
    description:
      'Stay consistent, save time, and focus on what matters — growing your business. Your squad handles the rest.',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Process</p>
          <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">How UpSquad works</h2>
          <p className="text-base text-slate-500 mt-2">
            Everything you need — nothing you don&apos;t.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#F7F6F3] rounded-xl p-6 border border-gray-200/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-white border border-gray-200 text-gray-500 flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <span className="text-xs font-medium text-gray-400">Step {step.number}</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-slate-900 mb-1.5">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
