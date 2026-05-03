export const plans = [
  { name: 'Starter Plan', description: 'For brands that are starting out.', monthlyPrice: 5000, highlighted: false, badge: null, cta: 'Get Started', ctaStyle: 'default' },
  { name: 'Basic Plan', description: 'Our standard and most affordable plan.', monthlyPrice: 10000, highlighted: false, badge: null, cta: 'Get Started', ctaStyle: 'default' },
  { name: 'Plus Plan', description: 'Get your tasks completed faster with elevated priority.', monthlyPrice: 15000, highlighted: true, badge: 'BEST VALUE', cta: 'Get Started', ctaStyle: 'highlighted' },
  { name: 'Pro Plan', description: 'Highest speed and fastest response time within standard plans.', monthlyPrice: 20000, highlighted: false, badge: null, cta: 'Get Started', ctaStyle: 'default' },
  { name: 'Personal Plan', description: 'Your own personal designer and editor, like an in-house partner.', monthlyPrice: 25000, highlighted: false, badge: null, cta: 'Contact Sales', ctaStyle: 'dark' },
]

export const subtiers = ['Juniors', 'Pros', 'Elites']

export const subtierPricing = {
  Pros:    [7000, 12000, 17000, 23000, 30000],
  Juniors: [3000, 6000, 10000, 13000, 15000],
  Elites:  [null, 25000, 50000, 75000, 100000],
}

export const availabilityPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For brands that are starting out.',
    availability: '10%',
    hoursPerDay: '~1 hour',
    hoursPerWeek: '~6 hours',
    approach: 'Light-touch creative support',
    urgentWorks: false,
    queue: 'Standard',
    meetings: 'By request',
    liveCollaboration: false,
    resource: 'Shared',
    bestFor: 'Small brands & startups',
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Our standard and most affordable plan.',
    availability: '25%',
    hoursPerDay: '2–3 hours',
    hoursPerWeek: '~13 hours',
    approach: 'Quarter of a full-time employee',
    urgentWorks: false,
    queue: 'Standard',
    meetings: 'By request',
    liveCollaboration: false,
    resource: 'Shared',
    bestFor: 'Active brands',
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Get your tasks completed faster with elevated priority.',
    availability: '50%',
    hoursPerDay: '4–5 hours',
    hoursPerWeek: '~25 hours',
    approach: 'Half employee capacity',
    urgentWorks: true,
    queue: 'High priority',
    meetings: 'By request',
    liveCollaboration: false,
    resource: 'Shared',
    bestFor: 'High-volume teams & agencies',
    highlighted: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Highest speed and fastest response time.',
    availability: '80%',
    hoursPerDay: '6–7 hours',
    hoursPerWeek: '~35 hours',
    approach: 'Nearly full-time employee',
    urgentWorks: true,
    queue: 'Ultra Priority',
    meetings: 'By request',
    liveCollaboration: false,
    resource: 'Shared (High Priority)',
    bestFor: 'Growing businesses',
  },
  {
    id: 'personal',
    name: 'Personal',
    description: 'Your own personal designer, like an in-house partner.',
    availability: '100%',
    hoursPerDay: 'Full-time equivalent',
    hoursPerWeek: '~45 hours',
    approach: 'Dedicated full-time equivalent',
    urgentWorks: true,
    queue: 'Ultra Priority + Instant Access',
    meetings: 'Instant call + meeting access',
    liveCollaboration: true,
    resource: 'Personal (exclusive)',
    bestFor: 'Founders & creators wanting close collaboration',
  },
]

export const subtierDescriptions = {
  Juniors: 'Less than 2 years of experience. Great for straightforward tasks and cost-effective output.',
  Pros: 'More than 2 years of experience with strong, well-rounded skill sets. Reliable quality across a wide range of work.',
  Elites: 'Top talents with 5+ years of experience. Best for high-stakes, complex, or premium creative work.',
}

export const featureRows = [
  {
    label: 'Unlimited work requests',
    tooltip: 'Unlimited work request means you can place as many design or video edit requests with us. We will deliver them one by one based on your applicable plan.',
    values: ['check', 'check', 'check', 'check', 'check'],
  },
  {
    label: 'Squad Manager',
    tooltip: 'You will also be given a resource called Squad Manager, who will help you manage all the works. Coordinate works with designers and editors, and ensure delivery on time.',
    values: ['check', 'check', 'check', 'check', 'check'],
  },
  {
    label: 'Capacity',
    sublabel: '(compared to a full time employee)',
    tooltip: "This shows the execution capacity of each plan compared to having a full-time employee. Capacity doesn't mean number of hours per day. This term is used to get an idea about the availability and the expected output.",
    values: [
      { bold: '10% Capacity', sub: 'Approx 1 hour of work per day', approach: 'Approx: ~1 hour of work per day', weekly: '~6 hours per week' },
      { bold: '25% Capacity', sub: '¼ of a full-time employee', approach: 'Approx: 2–3 hours of work per day', weekly: '~13 hours per week' },
      { bold: '50% Capacity', sub: 'Half employee capacity', approach: 'Approx: 4–5 hours of work per day', weekly: '~25 hours per week' },
      { bold: '80% Capacity', sub: 'Nearly full-time employee', approach: 'Approx: 6–7 hours of work per day', weekly: '~35 hours per week' },
      { bold: '100% Capacity', sub: 'Dedicated full-time equivalent', approach: 'Approx: Full-time equivalent', weekly: '~45 hours per week' },
    ],
  },
  {
    label: 'Urgent Works',
    tooltip: 'For starter, basic, and plus plan. We do not entertain urgent work meaning placing request today and expecting delivery today itself. If our designers or editors are available, we will try to accommodate it, but it is not guaranteed.',
    values: ['cross', 'cross', 'check', 'check', 'check'],
  },
  {
    label: 'Queue',
    values: ['Standard queue priority', 'Standard queue priority', 'High priority queue', 'Ultra Priority queue', 'Ultra Priority + Instant Access'],
  },
  {
    label: 'Access to Our Platform',
    values: ['Per user Rs 500', 'Per user Rs 500', 'Per user Rs 500', 'Per user Rs 500', 'Per user Rs 500'],
  },
  {
    label: 'Meetings',
    values: ['By request', 'By request', 'By request', 'By request', 'Instant call + meeting access'],
  },
  {
    label: 'Live Collaboration',
    values: ['No', 'No', 'No', 'No', 'Yes — screen share & live edits'],
  },
  {
    label: 'Shared Resource',
    values: ['Shared', 'Shared', 'Shared', 'Shared ( High Priority)', 'Personal (exclusive when requests are active)'],
  },
  {
    label: 'Best For',
    values: ['Small brands & startups', 'Active brands', 'High-volume teams & agencies', 'Growing businesses', 'Founders & creators wanting close collaboration'],
  },
]

export const benefits = [
  { icon: 'squad-manager', title: 'Squad Manager', desc: 'You will also get a Squad Manager (project manager) to manage all the works and ensure delivery on time.' },
  { icon: 'zero-downtime', title: 'Zero Downtime', desc: 'Even if your designer or editor is on leave, you will get a backup.' },
  { icon: 'unlimited-requests', title: 'Unlimited Work Requests', desc: 'Submit as many tasks as you want. One request at a time, delivered with quality and consistency.' },
  { icon: 'unlimited-changes', title: 'Unlimited Changes', desc: 'If you are not happy with the output, you can request an unlimited number of changes.' },
  { icon: 'replacement', title: 'Replacement', desc: 'If you are not happy with the resource assigned to you, you can replace them any number of times.' },
  { icon: 'talent-swapping', title: 'Talent Swapping', desc: 'Swap to another designer or editor anytime to perfectly match your exact project requirements.' },
  { icon: 'scale-up', title: 'Scale Up When Needed', desc: 'Upgrade or purchase multiple plans to expand your creative capacity instantly.' },
  { icon: 'pause', title: 'Pause Anytime', desc: 'Pause your subscription anytime. Your balance stays safe for 6 months.' },
  { icon: 'cancel', title: 'Cancel Anytime', desc: 'No long-term commitments. Full flexibility, always.' },
]

export const designServices = [
  { icon: 'marketing', title: 'Marketing & Social Media', desc: 'Social Media Posts / Creatives, Thumbnails / Cover Art, Email Templates & Newsletters' },
  { icon: 'icons', title: 'Icons & Illustrations', desc: 'Custom Icon Sets (Filled / Line / Flat), Character / Mascot Illustrations, Scene Illustrations, Spot Illustrations for UI or Print' },
  { icon: 'branding', title: 'Branding & Identity', desc: 'Logo Design (Primary, Secondary, Monogram), Brand Guidelines (Colors, Fonts, Usage), Brand Book, Business Cards, Letterhead, Stationery, Rebranding / Brand Refresh' },
  { icon: 'presentations', title: 'Presentations & Communication', desc: 'Business Stationery, Company Profiles / Pitch Decks, Investor Decks / Proposal Templates, Internal Reports / HR Documents, Data Sheets / Case Study Layouts' },
  { icon: 'print', title: 'Print & Collateral Design', desc: 'Brochures / Catalogues / Flyers, Posters / Banners / Billboards, Product Packaging' },
  { icon: 'uiux', title: 'UI/UX & Web Design', desc: 'Wireframes, Website Design (Landing Page / Full Website), Mobile App UI Design, Android / Web App UI, UI Components / Design Systems', launchingSoon: true },
]

export const videoServices = [
  { icon: 'short-form', title: 'Short-Form Editing', desc: 'Reels, Shorts, Ads (Basic cut + transitions + basic texts). Optimized for Instagram, YouTube Shorts, TikTok' },
  { icon: 'long-form', title: 'Long-Form Editing', desc: 'YouTube, Podcasts, Webinars' },
  { icon: 'corporate', title: 'Corporate & Event Videos', desc: 'Company Promos, Event Highlights, Interviews' },
  { icon: 'product', title: 'Product & E-commerce', desc: 'Product Showcase, Lifestyle, Model Videos' },
  { icon: 'social-branding', title: 'Social Media Branding', desc: 'Brand Intros, Transitions, Template Packs' },
  { icon: 'animated', title: 'Animated Videos', desc: 'Explainer, Logo Animations, full animated clips', launchingSoon: true },
  { icon: 'ai-video', title: 'AI Video Creation and Editing', desc: 'AI-Generated Videos, Voiceovers, Text-to-Video', launchingSoon: true },
]

export const planTypes = [
  'Creative Head',
  'Copy / Content Writers',
  'Designers',
  'Editors',
  'SM Manager',
  'Video/Photographer',
  'AI Video',
]

export const liveTypes = ['Designers', 'Editors']

export const videographerPlans = [
  { name: 'Starter', priceLabel: '₹6k', highlighted: false, badge: null, shootDuration: 'Half Day (4 hours)', equipments: 'Professional camera + Standard mic and lighting kit', expertLevel: 'Skilled', crew: 'Single person', preShooting: null },
  { name: 'Basic', priceLabel: '₹13k', highlighted: false, badge: null, shootDuration: 'Full Day (8 Hours)', equipments: 'Professional camera + Standard mic and lighting kit', expertLevel: 'Skilled', crew: 'Single person', preShooting: null },
  { name: 'Plus', priceLabel: '₹18k', highlighted: true, badge: 'BEST VALUE', shootDuration: 'Full Day (8 Hours)', equipments: 'Professional camera + Standard mic and lighting kit', expertLevel: 'Experienced', crew: 'Single/Multiple', preShooting: 'Basic shot planning' },
  { name: 'Pro', priceLabel: '₹25k', highlighted: false, badge: null, shootDuration: 'Full Day (8 Hours)', equipments: 'Professional camera + mic + Cinematic lighting', expertLevel: 'Pros', crew: 'Single/Multiple', preShooting: 'Detailed shot list & creative direction' },
  { name: 'Personal', priceLabel: 'Custom Pricing', highlighted: false, badge: null, shootDuration: '—', equipments: '—', expertLevel: '—', crew: '—', preShooting: '—' },
]

export const presentationPlans = [
  { name: 'Starter', monthlyPrice: 6000, videos: '2 videos', highlighted: false, badge: null },
  { name: 'Basic', monthlyPrice: 13000, videos: '4 videos', highlighted: false, badge: null },
  { name: 'Plus', monthlyPrice: 15000, videos: '8 videos', highlighted: true, badge: 'BEST VALUE' },
  { name: 'Pro', monthlyPrice: 20000, videos: '10 videos', highlighted: false, badge: null },
]

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN').format(price)
}

export function getPlansForSubtier(subtier) {
  const prices = subtierPricing[subtier]
  return plans.map((plan, i) => ({ ...plan, monthlyPrice: prices[i] }))
}
