export const subtiers = ['Juniors', 'Pros', 'Top Talents']

export const availabilityPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For brands that are starting out.',
    availability: '10%',
    hoursPerDay: '1 hour',
    hoursPerWeek: '~5 hours',
    hoursPerMonth: '~20 hours',
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
    hoursPerDay: '2 hours',
    hoursPerWeek: '10 hours',
    hoursPerMonth: '40 hours',
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
    hoursPerDay: '4 hours',
    hoursPerWeek: '20 hours',
    hoursPerMonth: '80 hours',
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
    hoursPerDay: '6 hours',
    hoursPerWeek: '30 hours',
    hoursPerMonth: '120 hours',
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
    hoursPerDay: '8 hours',
    hoursPerWeek: '~40 hours',
    hoursPerMonth: '~160 hours',
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
  'Top Talents': 'Top talents with 5+ years of experience. Best for high-stakes, complex, or premium creative work.',
}

export const serviceTypes = ['Designers', 'Editors', 'Designer plus Editor']

export const serviceTypeDescriptions = {
  Designers: 'Static visuals — graphics, logos, branding, presentations, UI/UX, print collateral.',
  Editors: 'Motion & video — short-form reels, long-form edits, ads, corporate videos, animations.',
  'Designer plus Editor': 'Hybrid talent who can do both — design and video editing in one creative resource.',
}

export const benefits = [
  {
    icon: 'squadhub',
    title: 'Squad Hub',
    featured: 'core',
    label: 'Your workspace',
    pills: ['View work', 'Track progress', 'Chat'],
    desc: 'Manage all your work through Squad Hub. View submissions, track progress, chat, and interact with your designers and editors in one place.',
  },
  {
    icon: 'squad-manager',
    title: 'Squad Manager',
    featured: 'core',
    label: 'Your support',
    pills: ['Oversee', 'Assist', 'Support'],
    desc: 'A Squad Manager assists you with overall management and support, and makes sure everything is getting done. They oversee and help — they are not a full project manager.',
  },
  {
    icon: 'pause',
    title: 'Pause Anytime',
    featured: 'flex',
    label: 'No lock-in',
    desc: 'Pause your subscription anytime. Your balance stays safe for 6 months.',
  },
  {
    icon: 'cancel',
    title: 'Cancel Anytime',
    featured: 'flex',
    label: 'No lock-in',
    desc: 'No long-term commitments. Full flexibility, always.',
  },
  { icon: 'replacement', title: 'Replacement', desc: 'If you are not happy with the resource assigned to you, you can replace them any number of times.' },
  { icon: 'talent-swapping', title: 'Talent Swapping', desc: 'Swap to another designer or editor anytime to perfectly match your exact project requirements.' },
  { icon: 'unlimited-changes', title: 'Unlimited Changes', desc: 'If you are not happy with the output, you can request an unlimited number of changes.' },
  { icon: 'unlimited-requests', title: 'Unlimited Work Requests', desc: 'Submit as many tasks as you want. One request at a time, delivered with quality and consistency.' },
  { icon: 'scale-up', title: 'Scale Up When Needed', desc: 'Upgrade or purchase multiple plans to expand your creative capacity instantly.' },
  { icon: 'zero-downtime', title: 'Zero Downtime', desc: 'Even if your designer or editor is on leave, you will get a backup.', note: 'Available at Rs 1,000 per month additional cost.' },
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

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN').format(price)
}
