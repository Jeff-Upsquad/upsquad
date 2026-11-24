// Copy for the UpSquad Business Collaboration Program landing page.
// The offer: selected startups and businesses get the full accounting stack
// (accountant subscription + SquadBooks + Squad Payroll + SquadBooks Inventory)
// free for 1–3 months, in exchange for one Instagram Reel published as a
// collaboration post with UpSquad's official page.

export const WA_NUMBER = '919995266385'

const DEFAULT_WA_MESSAGE =
  "Hi UpSquad, I'm interested in the Business Collaboration Program. I'd like to explore a free 1–3 month collaboration for my business."

export function collabWaLink(message = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export const DEFAULT_HERO_TITLE = 'Accountant. Software. Payroll. Inventory.'
export const DEFAULT_HERO_DESCRIPTION =
  "We're partnering with a few selected startups and businesses — giving them our complete accounting ecosystem, at no cost, for 1 to 3 months."

// Prominent hero note under the CTAs: small businesses whose revenue is below
// ₹5 lakh a year can continue using the accounting apps after the collaboration.
export const revenueCallout = {
  condition: 'Revenue below ₹5 lakh a year?',
  benefit: 'You can continue using our accounting apps — free.',
  note: 'Even after the collaboration ends.',
}

export const programStats = [
  { value: '1–3', label: 'months of access' },
  { value: '4', label: 'products included' },
  { value: '₹0', label: 'to pay' },
]

export const collabProducts = [
  {
    key: 'squadbooks',
    name: 'SquadBooks',
    kind: 'Accounting & bookkeeping software',
    desc: 'Invoices, ledgers, reconciliations, and reports in one place — kept current by your accountant.',
  },
  {
    key: 'payroll',
    name: 'Squad Payroll',
    kind: 'Attendance & payroll management',
    desc: 'Track attendance and turn it into accurate salaries every month, without a spreadsheet maze.',
  },
  {
    key: 'inventory',
    name: 'SquadBooks Inventory',
    kind: 'Inventory management software',
    desc: 'Stock in, stock out, and item-level visibility — so your books match what is actually on the shelf.',
  },
  {
    key: 'accountant',
    name: 'UpSquad Accountant Subscription',
    kind: 'A professional accountant',
    desc: 'A real accountant to set up, organise, and manage your books of accounts through the collaboration.',
    featured: true,
  },
]

export const youGetItems = [
  'SquadBooks accounting software',
  'Squad Payroll & attendance',
  'SquadBooks Inventory',
  'A professional accountant',
]

export const collabSteps = [
  {
    number: '01',
    title: 'Text us on WhatsApp',
    desc: 'Tell us a little about your business. We check whether the program is a fit and agree on the collaboration period.',
  },
  {
    number: '02',
    title: 'We set you up',
    desc: 'Your accountant and your workspace come first — SquadBooks, Squad Payroll, and Inventory configured for your business.',
  },
  {
    number: '03',
    title: 'Run free for 1–3 months',
    desc: 'Use the full stack at no cost for the agreed period. No invoice, no card, no lock-in.',
  },
  {
    number: '04',
    title: 'Post the Reel',
    desc: 'Share your experience in a Reel and publish it as a collaboration post with UpSquad’s official Instagram page.',
  },
]

export const afterKeep = [
  'SquadBooks — free version',
  'Squad Payroll — free version',
  'SquadBooks Inventory — free version',
]

export const collabFaqs = [
  {
    q: 'Is it really free?',
    a: 'Yes. During the collaboration period you pay nothing for the accountant subscription, SquadBooks, Squad Payroll, or SquadBooks Inventory.',
  },
  {
    q: 'How long does the collaboration last?',
    a: 'Anywhere from 1 to 3 months. We agree on the length before you start, based on what your business needs to get in order.',
  },
  {
    q: 'What exactly do I have to post?',
    a: 'One Reel sharing your experience with UpSquad, published as a collaboration post with our official Instagram page. That is the entire ask.',
  },
  {
    q: 'What happens when the collaboration ends?',
    a: 'You can continue using the free versions of our software, even without an Accountant Subscription. The software does not disappear when the free accountant period does.',
  },
  {
    q: 'Can I keep the accountant after the free period?',
    a: 'If you want our team to keep managing your books, you can continue on a paid Accountant Subscription. If not, you keep using the free software versions.',
  },
  {
    q: 'How do I get selected?',
    a: 'We open a few collaborations at a time. Send us a message about your business on WhatsApp and we will tell you honestly whether there is an opening that fits.',
  },
]

export const interestOptions = ['The full stack', 'Books + accountant', 'Payroll', 'Inventory']
