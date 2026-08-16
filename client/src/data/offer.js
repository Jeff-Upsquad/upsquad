export const OFFER_ROLES = [
  {
    id: 'designer',
    label: 'Designer',
    noun: 'designer',
    description: 'Brand, social, presentations, packaging, UI — static visual work.',
    examples: ['Social creatives', 'Brand identity', 'Decks & ads', 'UI screens'],
  },
  {
    id: 'editor',
    label: 'Video editor',
    noun: 'video editor',
    description: 'Reels, ads, YouTube, motion — anyone who cuts and finishes video.',
    examples: ['Short-form reels', 'Ads', 'Long-form edits', 'Motion graphics'],
  },
]

export const OFFER_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    hoursPerDay: 2,
    hoursPerWeek: 10,
    hoursPerMonth: 40,
    price: 5000,
    blurb: 'A focused daily block. Enough to keep a brand moving.',
  },
  {
    id: 'plus',
    name: 'Plus',
    hoursPerDay: 4,
    hoursPerWeek: 20,
    hoursPerMonth: 80,
    price: 10000,
    blurb: 'Half a workday, every day. For teams with a real pipeline.',
  },
]

export const OFFER_SLOT_NOTE = 'Limited to the first subscribers. Payment confirms your slot.'

export function formatInr(amount, { paise = false } = {}) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: paise ? 2 : 0,
    maximumFractionDigits: paise ? 2 : 0,
  }).format(amount)
}
