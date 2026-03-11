const squads = [
  {
    name: 'Content Creation',
    description:
      'End-to-end content production for brands across design, video, and social. Access designers, editors, creative leads, social media managers, and copywriters — all under one subscription.',
    emoji: '🎬',
    tags: ['Design', 'Video', 'Social', 'Copywriting'],
  },
  {
    name: 'Marketing',
    description:
      'Growth-focused marketing support across digital, offline, and PR channels. Work with ad specialists, digital marketers, offline marketers, and PR experts through a single subscription.',
    emoji: '📣',
    tags: ['Digital', 'Offline', 'PR', 'Ads'],
  },
  {
    name: 'Tech',
    description:
      'Web development, app building, automation, and software solutions — built to scale with your brand. From MVPs to full platforms.',
    emoji: '💻',
    tags: ['Web Dev', 'Apps', 'Automation'],
  },
  {
    name: 'Accounts & Finance',
    description:
      'Bookkeeping, payroll, tax planning, financial reporting, and fractional CFO services. Your financial back office, fully managed.',
    emoji: '📊',
    tags: ['Bookkeeping', 'Tax', 'CFO'],
  },
  {
    name: 'Legal',
    description:
      'Contract drafting, IP protection, compliance, and business formation — covered. Get legal support without the hourly rates.',
    emoji: '⚖️',
    tags: ['Contracts', 'Compliance', 'IP'],
  },
  {
    name: 'Hiring & HR',
    description:
      'End-to-end hiring support, team building, and HR process management for growing brands. Build your team with confidence.',
    emoji: '🤝',
    tags: ['Recruiting', 'HR', 'Onboarding'],
  },
]

export default function Categories() {
  return (
    <section id="categories" className="py-20 px-5 sm:px-8 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Subscriptions</p>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Game-changing features for creative productivity.</h2>
          <p className="text-base text-gray-500 mt-2 max-w-xl">
            Discover the squads that help you stay organized, consistent, and scale your brand effortlessly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {squads.map((squad) => (
            <div
              key={squad.name}
              className="group bg-white rounded-xl p-5 border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <span className="text-2xl mb-3 block">{squad.emoji}</span>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{squad.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3.5">{squad.description}</p>
              <div className="flex flex-wrap gap-1">
                {squad.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
