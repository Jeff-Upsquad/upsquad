// Single source of truth for squads and their products.
// Consumed by the home page categories grid (Categories.jsx)
// and the pricing page products section (SquadProducts.jsx).
//
// Product statuses: 'live' | 'waitlist' | 'coming-soon'

export const squads = [
  {
    id: 'content-creation',
    name: 'Content Creation',
    featured: true,
    description:
      'End-to-end content production for brands across design, video, and social. Access designers, editors, creative leads, social media managers, and copywriters — all under one subscription.',
    emoji: '🎬',
    iconKey: 'content',
    tags: ['Design', 'Video', 'Social', 'Copywriting'],
    ctaLabel: 'Explore Squad',
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Any one or All of the skills and talents your brand need.',
      body: 'Save time, and scale your content effortlessly.',
      note: 'Everything you need — nothing you don\'t.',
    },
    products: [
      { name: 'Creative Director', emoji: '🎬', desc: 'Oversees creative vision and brand direction across all content.', status: 'coming-soon' },
      { name: 'Copy / Content Writers', emoji: '✍️', desc: 'Creates compelling copy and content that speaks to your audience.', status: 'coming-soon' },
      { name: 'Designers', emoji: '🎨', desc: 'Crafts visual assets, graphics, and brand identities that stand out.', status: 'live' },
      { name: 'Editors', emoji: '🖥️', desc: 'Polishes and refines video and written content to perfection.', status: 'live' },
      { name: 'Social Media Managers', emoji: '📣', desc: 'Manages and grows your brand\'s presence across social platforms.', status: 'coming-soon' },
      { name: 'Videographers & Photographers', emoji: '📷', desc: 'Captures high-quality visual content that tells your brand story.', status: 'waitlist' },
      { name: 'AI Video & Image Creator', emoji: '🤖', desc: 'Produces AI-generated visuals and video content to accelerate your creative output.', status: 'coming-soon' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description:
      'Growth-focused marketing support across digital, offline, and PR channels. Work with ad specialists, digital marketers, offline marketers, and PR experts through a single subscription.',
    emoji: '📣',
    iconKey: 'marketing',
    tags: ['Digital', 'Offline', 'PR', 'Ads'],
    badge: 'Beta',
    ctaLabel: 'Join waiting list',
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Marketing talent that drives real growth — on demand.',
      body: 'From ads to SEO to on-ground activations, we\'ve got you covered.',
      note: 'Your full-stack marketing engine — ready to go.',
    },
    products: [
      { name: 'Ad Specialists', emoji: '🎯', desc: 'Plans, executes, and optimizes high-performance ad campaigns across platforms like Google, Meta, LinkedIn & more — focused on ROI and scalable growth.', status: 'waitlist' },
      { name: 'SEO Specialists', emoji: '🔍', desc: 'Improves your search visibility, drives organic traffic, and builds long-term inbound growth.', status: 'coming-soon' },
      { name: 'Digital Marketing Team', emoji: '📊', desc: 'A complete team handling strategy, execution, analytics, and optimization across all channels.', status: 'coming-soon' },
      { name: 'Influencer Marketing Experts', emoji: '🤝', desc: 'Connects your brand with the right creators to drive trust, reach, and conversions.', status: 'coming-soon' },
      { name: 'Offline Marketing Specialists', emoji: '📢', desc: 'Executes on-ground campaigns, activations, and traditional marketing to build strong local presence.', status: 'coming-soon' },
    ],
  },
  {
    id: 'tech',
    name: 'Tech',
    description:
      'Web development, app building, automation, and software solutions — built to scale with your brand. From MVPs to full platforms.',
    emoji: '💻',
    iconKey: 'tech',
    tags: ['Web Dev', 'Apps', 'Automation'],
    badge: 'Pilot Run',
    products: [
      { name: 'Web Development', emoji: '🌐', desc: 'Websites and web platforms built to scale with your brand.', status: 'coming-soon' },
      { name: 'App Building', emoji: '📱', desc: 'Mobile apps — from quick MVPs to full production platforms.', status: 'coming-soon' },
      { name: 'Automation', emoji: '⚙️', desc: 'Workflows and automations that cut manual work and save time.', status: 'coming-soon' },
      { name: 'Software Solutions', emoji: '🛠️', desc: 'Custom software built around how your business actually works.', status: 'coming-soon' },
    ],
  },
  {
    id: 'accounts-finance',
    name: 'Accounts & Finance',
    description:
      'Bookkeeping, payroll, tax planning, financial reporting, and fractional CFO services. Your financial back office, fully managed.',
    emoji: '📊',
    iconKey: 'finance',
    tags: ['Bookkeeping', 'Tax', 'CFO'],
    badge: 'Beta',
    ctaLabel: 'Join waiting list',
    drawer: {
      subtitle: 'Subscribe to',
      highlight: 'Expert financial talent your business needs — on demand.',
      body: 'Stay compliant, save costs, and scale with confidence.',
      note: 'Your complete finance back-office — sorted.',
    },
    products: [
      { name: 'Accountants', emoji: '🧾', desc: 'Manages day-to-day bookkeeping, transactions, and financial records with accuracy.', status: 'live' },
      { name: 'CFOs / CAs', emoji: '📈', desc: 'Provides strategic financial guidance, planning, and high-level business insights.', status: 'coming-soon' },
      { name: 'GST Experts', emoji: '🧮', desc: 'Handles GST filings, compliance, and advisory to ensure smooth tax operations.', status: 'coming-soon' },
      { name: 'TDS Experts', emoji: '📑', desc: 'Manages TDS calculations, deductions, and timely filings without errors.', status: 'coming-soon' },
      { name: 'Labour Law Experts', emoji: '⚖️', desc: 'Ensures compliance with employment laws, payroll regulations, and statutory requirements.', status: 'coming-soon' },
      { name: 'Incorporation & Licenses', emoji: '🏢', desc: 'Supports company registration, legal structuring, and all required business licenses.', status: 'coming-soon' },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    description:
      'Contract drafting, IP protection, compliance, and business formation — covered. Get legal support without the hourly rates.',
    emoji: '⚖️',
    iconKey: 'legal',
    tags: ['Contracts', 'Compliance', 'IP'],
    badge: 'Launching Soon',
    products: [
      { name: 'Contract Drafting', emoji: '📄', desc: 'Contracts drafted and reviewed — without the hourly rates.', status: 'coming-soon' },
      { name: 'IP Protection', emoji: '🛡️', desc: 'Trademarks, copyrights, and intellectual property kept protected.', status: 'coming-soon' },
      { name: 'Compliance', emoji: '✅', desc: 'Stay on the right side of regulations that affect your business.', status: 'coming-soon' },
      { name: 'Business Formation', emoji: '🏢', desc: 'Company registration, structuring, and formation support.', status: 'coming-soon' },
    ],
  },
  {
    id: 'hiring-hr',
    name: 'Hiring & HR',
    description:
      'End-to-end hiring support, team building, and HR process management for growing brands. Build your team with confidence.',
    emoji: '🤝',
    iconKey: 'hr',
    tags: ['Recruiting', 'HR', 'Onboarding'],
    badge: 'Launching Soon',
    products: [
      { name: 'End-to-End Hiring', emoji: '🎯', desc: 'Sourcing, screening, and closing the right candidates for your team.', status: 'coming-soon' },
      { name: 'Team Building', emoji: '🏗️', desc: 'Build strong, well-rounded teams as your brand grows.', status: 'coming-soon' },
      { name: 'HR Process Management', emoji: '🗂️', desc: 'Onboarding, policies, and day-to-day HR operations handled for you.', status: 'coming-soon' },
    ],
  },
]

export function getSquadById(id) {
  return squads.find((s) => s.id === id)
}

export const totalProductCount = squads.reduce((sum, s) => sum + s.products.length, 0)
