"use client"
import { useState } from 'react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

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
        { name: 'Creative Director', emoji: '🎬', desc: 'Oversees creative vision and brand direction across all content.' },
        { name: 'Copy / Content Writers', emoji: '✍️', desc: 'Creates compelling copy and content that speaks to your audience.' },
        { name: 'Designers', emoji: '🎨', desc: 'Crafts visual assets, graphics, and brand identities that stand out.' },
        { name: 'Editors', emoji: '🖥️', desc: 'Polishes and refines video and written content to perfection.' },
        { name: 'Social Media Managers', emoji: '📣', desc: 'Manages and grows your brand\'s presence across social platforms.' },
        { name: 'Videographers & Photographers', emoji: '📷', desc: 'Captures high-quality visual content that tells your brand story.' },
        { name: 'AI Video & Image Creator', emoji: '🤖', desc: 'Produces AI-generated visuals and video content to accelerate your creative output.' },
      ],
    },
  },
  {
    name: 'Marketing',
    description:
      'Growth-focused marketing support across digital, offline, and PR channels. Work with ad specialists, digital marketers, offline marketers, and PR experts through a single subscription.',
    emoji: '📣',
    tags: ['Digital', 'Offline', 'PR', 'Ads'],
    badge: 'Beta',
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Marketing talent that drives real growth — on demand.',
      body: 'From ads to SEO to on-ground activations, we\'ve got you covered.',
      note: 'Your full-stack marketing engine — ready to go.',
      talents: [
        { name: 'Ad Specialists', emoji: '🎯', desc: 'Plans, executes, and optimizes high-performance ad campaigns across platforms like Google, Meta, LinkedIn & more — focused on ROI and scalable growth.' },
        { name: 'SEO Specialists', emoji: '🔍', desc: 'Improves your search visibility, drives organic traffic, and builds long-term inbound growth.' },
        { name: 'Digital Marketing Team', emoji: '📊', desc: 'A complete team handling strategy, execution, analytics, and optimization across all channels.' },
        { name: 'Influencer Marketing Experts', emoji: '🤝', desc: 'Connects your brand with the right creators to drive trust, reach, and conversions.' },
        { name: 'Offline Marketing Specialists', emoji: '📢', desc: 'Executes on-ground campaigns, activations, and traditional marketing to build strong local presence.' },
      ],
    },
  },
  {
    name: 'Tech',
    description:
      'Web development, app building, automation, and software solutions — built to scale with your brand. From MVPs to full platforms.',
    emoji: '💻',
    tags: ['Web Dev', 'Apps', 'Automation'],
    badge: 'Pilot Run',
  },
  {
    name: 'Accounts & Finance',
    description:
      'Bookkeeping, payroll, tax planning, financial reporting, and fractional CFO services. Your financial back office, fully managed.',
    emoji: '📊',
    tags: ['Bookkeeping', 'Tax', 'CFO'],
    badge: 'Beta',
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Expert financial talent your business needs — on demand.',
      body: 'Stay compliant, save costs, and scale with confidence.',
      note: 'Your complete finance back-office — sorted.',
      talents: [
        { name: 'Accountants', emoji: '🧾', desc: 'Manages day-to-day bookkeeping, transactions, and financial records with accuracy.' },
        { name: 'CFOs / CAs', emoji: '📈', desc: 'Provides strategic financial guidance, planning, and high-level business insights.' },
        { name: 'GST Experts', emoji: '🧮', desc: 'Handles GST filings, compliance, and advisory to ensure smooth tax operations.' },
        { name: 'TDS Experts', emoji: '📑', desc: 'Manages TDS calculations, deductions, and timely filings without errors.' },
        { name: 'Labour Law Experts', emoji: '⚖️', desc: 'Ensures compliance with employment laws, payroll regulations, and statutory requirements.' },
        { name: 'Incorporation & Licenses', emoji: '🏢', desc: 'Supports company registration, legal structuring, and all required business licenses.' },
      ],
    },
  },
  {
    name: 'Legal',
    description:
      'Contract drafting, IP protection, compliance, and business formation — covered. Get legal support without the hourly rates.',
    emoji: '⚖️',
    tags: ['Contracts', 'Compliance', 'IP'],
    badge: 'Launching Soon',
  },
  {
    name: 'Hiring & HR',
    description:
      'End-to-end hiring support, team building, and HR process management for growing brands. Build your team with confidence.',
    emoji: '🤝',
    tags: ['Recruiting', 'HR', 'Onboarding'],
    badge: 'Launching Soon',
  },
]

function Drawer({ squad, onClose }) {
  const d = squad.drawer
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-md"
        onClick={onClose}
      />

      <div className="fixed right-3 top-3 bottom-3 w-[calc(100%-1.5rem)] sm:w-[480px] bg-white z-[61] shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-in border border-[rgba(96,96,163,0.2)]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(96,96,163,0.15)]">
          <div className="flex items-center gap-2">
            <span className="text-xl">{squad.emoji}</span>
            <span className="text-sm font-semibold text-text-primary">{squad.name}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-secondary text-text-muted hover:text-text-primary transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="inline-flex items-center border border-brand-purple/30 bg-brand-purple/5 rounded-lg px-3 py-1.5 text-xs font-medium text-text-primary">
              Features
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center border border-[rgba(96,96,163,0.2)] rounded-lg px-3 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-secondary hover:border-brand-purple/30 transition-colors"
            >
              Pricing
            </Link>
          </div>

          <p className="text-base leading-relaxed mb-6">
            <span className="text-text-muted">{d.subtitle} </span>
            <span className="font-semibold text-text-primary">{d.highlight}</span>
            {' '}
            <span className="text-text-secondary">{d.body}</span>
            {' '}
            <span className="text-text-muted">{d.note}</span>
          </p>

          <div className="flex flex-col gap-2.5">
            {d.talents.map((talent) => (
              <div
                key={talent.name}
                className="bg-surface-secondary border border-[rgba(96,96,163,0.15)] rounded-xl p-4 flex items-start gap-4 hover:border-brand-purple/30 transition-colors"
              >
                <span className="text-3xl mt-0.5 shrink-0">{talent.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-text-primary leading-snug">{talent.name}</p>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{talent.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[rgba(96,96,163,0.15)]">
          <a
            href="https://wa.me/919995566362?text=I%20want%20to%20know%20more%20about%20UpSquad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full btn-gradient text-sm font-semibold py-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Connect with us on WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

export default function Categories() {
  const [activeSquad, setActiveSquad] = useState(null)

  return (
    <section id="categories" className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="mb-10">
            <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple mb-3" />
            <p className="font-mono text-[11px] font-medium text-text-secondary uppercase tracking-[0.14em] mb-2">Subscriptions</p>
            <h2 className="font-heading text-3xl lg:text-h2 font-bold text-text-primary tracking-tight">Game-changing features for creative productivity.</h2>
            <p className="text-base text-text-secondary mt-2 max-w-xl">
              Discover the squads that help you stay organized, consistent, and scale your brand effortlessly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {squads.map((squad, i) => (
            <ScrollReveal key={squad.name} delay={i * 0.08}>
              <div
                onClick={() => squad.drawer && setActiveSquad(squad)}
                className={`group p-2 bg-white border border-[rgba(96,96,163,0.2)] rounded-xl shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-short ${squad.drawer ? 'cursor-pointer' : ''}`}
              >
                <div className="bg-surface-secondary rounded-lg p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-xl shrink-0">
                      {squad.emoji}
                    </div>
                    {squad.drawer && !squad.badge && (
                      <span className="text-xs font-medium text-text-primary border border-brand-purple/30 rounded-full px-2.5 py-1">
                        New
                      </span>
                    )}
                    {squad.badge && (
                      <span className="text-xs font-medium text-brand-orange bg-brand-orange/10 border border-brand-orange/20 rounded-full px-2.5 py-1">
                        {squad.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-base font-semibold text-text-primary mb-1.5">{squad.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">{squad.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {squad.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-brand-purple/5 border border-brand-purple/20 text-text-primary px-2.5 py-1 rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-short ${
                    squad.drawer
                      ? 'btn-gradient'
                      : 'btn-secondary'
                  }`}>
                    {squad.drawer ? 'Explore Squad →' : 'Coming Soon'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeSquad && (
        <Drawer squad={activeSquad} onClose={() => setActiveSquad(null)} />
      )}
    </section>
  )
}
