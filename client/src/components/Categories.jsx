import { useState } from 'react'

const squads = [
  {
    name: 'Content Creation',
    description:
      'End-to-end content production for brands across design, video, and social. Access designers, editors, creative leads, social media managers, and copywriters — all under one subscription.',
    emoji: '🎬',
    tags: ['Design', 'Video', 'Social', 'Copywriting'],
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Any one or All of the skills and talents your brand need.',
      body: 'Save time, and scale your content effortlessly.',
      note: 'Everything you need — nothing you don\'t.',
      talents: [
        { name: 'Creative Director', emoji: '🎬', span: 'col-span-2' },
        { name: 'Copy / Content Writers', emoji: '✍️', span: 'col-span-1' },
        { name: 'Designers', emoji: '🎨', span: 'col-span-1' },
        { name: 'Editors', emoji: '🖥️', span: 'col-span-1' },
        { name: 'Social Media Managers', emoji: '📣', span: 'col-span-1' },
        { name: 'Videographers & Photographers', emoji: '📷', span: 'col-span-2' },
      ],
    },
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

function Drawer({ squad, onClose }) {
  const d = squad.drawer
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-3 top-3 bottom-3 w-[calc(100%-1.5rem)] sm:w-[480px] bg-white z-50 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">{squad.emoji}</span>
            <span className="text-sm font-semibold text-slate-900">{squad.name}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Tab */}
          <div className="inline-flex items-center border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 mb-5">
            Features
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed mb-6">
            <span className="text-gray-400">{d.subtitle} </span>
            <span className="font-semibold text-slate-900">{d.highlight}</span>
            {' '}
            <span className="text-gray-500">{d.body}</span>
            {' '}
            <span className="text-gray-400">{d.note}</span>
          </p>

          {/* Talent grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {d.talents.map((talent) => (
              <div
                key={talent.name}
                className={`${talent.span} bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col justify-between min-h-[110px]`}
              >
                <span className="text-3xl">{talent.emoji}</span>
                <p className="text-xs font-semibold text-slate-800 mt-3 leading-snug">{talent.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function Categories() {
  const [activeSquad, setActiveSquad] = useState(null)

  return (
    <section id="categories" className="py-20 px-5 sm:px-8 bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Subscriptions</p>
          <h2 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">Game-changing features for creative productivity.</h2>
          <p className="text-base text-slate-500 mt-2 max-w-xl">
            Discover the squads that help you stay organized, consistent, and scale your brand effortlessly.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {squads.map((squad) => (
            <div
              key={squad.name}
              onClick={() => squad.drawer && setActiveSquad(squad)}
              className={`group bg-white rounded-xl p-5 border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-200 ${squad.drawer ? 'cursor-pointer' : ''}`}
            >
              <span className="text-2xl mb-3 block">{squad.emoji}</span>
              <h3 className="font-heading text-sm font-semibold text-slate-900 mb-1">{squad.name}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3.5">{squad.description}</p>
              <div className="flex flex-wrap gap-1">
                {squad.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              {squad.drawer && (
                <p className="text-xs text-gray-400 mt-3 group-hover:text-gray-600 transition-colors">View talents →</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeSquad && (
        <Drawer squad={activeSquad} onClose={() => setActiveSquad(null)} />
      )}
    </section>
  )
}
