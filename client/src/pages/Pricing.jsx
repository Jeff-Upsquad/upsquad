import { useState } from 'react'

const plans = [
  {
    name: 'Starter Plan',
    description: 'For brands that are starting out.',
    monthlyPrice: 5000,
    highlighted: false,
    badge: null,
    cta: 'Get Started',
    ctaStyle: 'default',
  },
  {
    name: 'Basic Plan',
    description: 'Our standard and most affordable plan.',
    monthlyPrice: 10000,
    highlighted: false,
    badge: null,
    cta: 'Get Started',
    ctaStyle: 'default',
  },
  {
    name: 'Plus Plan',
    description: 'Get your tasks completed faster with elevated priority.',
    monthlyPrice: 15000,
    highlighted: true,
    badge: 'BEST VALUE',
    cta: 'Get Started',
    ctaStyle: 'highlighted',
  },
  {
    name: 'Pro Plan',
    description: 'Highest speed and fastest response time within standard plans.',
    monthlyPrice: 20000,
    highlighted: false,
    badge: null,
    cta: 'Get Started',
    ctaStyle: 'default',
  },
  {
    name: 'Personal Plan',
    description: 'Your own personal designer and editor, like an in-house partner.',
    monthlyPrice: 25000,
    highlighted: false,
    badge: null,
    cta: 'Contact Sales',
    ctaStyle: 'dark',
  },
]

const featureRows = [
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
      { bold: '10% Capacity', sub: 'Approx 1 hour of work per day' },
      { bold: '25% Capacity', sub: '¼ of a full-time employee' },
      { bold: '50% Capacity', sub: 'Half employee capacity' },
      { bold: '80% Capacity', sub: 'Nearly full-time employee' },
      { bold: '100% Capacity', sub: 'Dedicated full-time equivalent' },
    ],
  },
  {
    label: 'Urgent Works',
    tooltip: 'For starter, basic, and plus plan. We do not entertain urgent work meaning placing request today and expecting delivery today itself. If our designers or editors are available, we will try to accommodate it, but it is not guaranteed.',
    values: ['cross', 'cross', 'check', 'check', 'check'],
  },
  {
    label: 'Queue',
    values: [
      'Standard queue priority',
      'Standard queue priority',
      'High priority queue',
      'Ultra Priority queue',
      'Ultra Priority + Instant Access',
    ],
  },
  {
    label: 'Access to Our Platform',
    values: [
      'Per user Rs 500',
      'Per user Rs 500',
      'Per user Rs 500',
      'Per user Rs 500',
      'Per user Rs 500',
    ],
  },
  {
    label: 'Meetings',
    values: [
      'By request',
      'By request',
      'By request',
      'By request',
      'Instant call + meeting access',
    ],
  },
  {
    label: 'Live Collaboration',
    values: ['No', 'No', 'No', 'No', 'Yes — screen share & live edits'],
  },
  {
    label: 'Shared Resource',
    values: [
      'Shared',
      'Shared',
      'Shared',
      'Shared ( High Priority)',
      'Personal (exclusive when requests are active)',
    ],
  },
  {
    label: 'Best For',
    values: [
      'Small brands & startups',
      'Active brands',
      'High-volume teams & agencies',
      'Growing businesses',
      'Founders & creators wanting close collaboration',
    ],
  },
]

const benefits = [
  {
    icon: 'squad-manager',
    title: 'Squad Manager',
    desc: 'You will also get a Squad Manager (project manager) to manage all the works and ensure delivery on time.',
  },
  {
    icon: 'zero-downtime',
    title: 'Zero Downtime',
    desc: 'Even if your designer or editor is on leave, you will get a backup.',
  },
  {
    icon: 'unlimited-requests',
    title: 'Unlimited Work Requests',
    desc: 'Submit as many tasks as you want. One request at a time, delivered with quality and consistency.',
  },
  {
    icon: 'unlimited-changes',
    title: 'Unlimited Changes',
    desc: 'If you are not happy with the output, you can request an unlimited number of changes.',
  },
  {
    icon: 'replacement',
    title: 'Replacement',
    desc: 'If you are not happy with the resource assigned to you, you can replace them any number of times.',
  },
  {
    icon: 'talent-swapping',
    title: 'Talent Swapping',
    desc: 'Swap to another designer or editor anytime to perfectly match your exact project requirements.',
  },
  {
    icon: 'scale-up',
    title: 'Scale Up When Needed',
    desc: 'Upgrade or purchase multiple plans to expand your creative capacity instantly.',
  },
  {
    icon: 'pause',
    title: 'Pause Anytime',
    desc: 'Pause your subscription anytime. Your balance stays safe for 6 months.',
  },
  {
    icon: 'cancel',
    title: 'Cancel Anytime',
    desc: 'No long-term commitments. Full flexibility, always.',
  },
]

const designServices = [
  {
    icon: 'marketing',
    title: 'Marketing & Social Media',
    desc: 'Social Media Posts / Creatives, Thumbnails / Cover Art, Email Templates & Newsletters',
  },
  {
    icon: 'icons',
    title: 'Icons & Illustrations',
    desc: 'Custom Icon Sets (Filled / Line / Flat), Character / Mascot Illustrations, Scene Illustrations, Spot Illustrations for UI or Print',
  },
  {
    icon: 'branding',
    title: 'Branding & Identity',
    desc: 'Logo Design (Primary, Secondary, Monogram), Brand Guidelines (Colors, Fonts, Usage), Brand Book, Business Cards, Letterhead, Stationery, Rebranding / Brand Refresh',
  },
  {
    icon: 'presentations',
    title: 'Presentations & Communication',
    desc: 'Business Stationery, Company Profiles / Pitch Decks, Investor Decks / Proposal Templates, Internal Reports / HR Documents, Data Sheets / Case Study Layouts',
  },
  {
    icon: 'print',
    title: 'Print & Collateral Design',
    desc: 'Brochures / Catalogues / Flyers, Posters / Banners / Billboards, Product Packaging',
  },
  {
    icon: 'uiux',
    title: 'UI/UX & Web Design',
    desc: 'Wireframes, Website Design (Landing Page / Full Website), Mobile App UI Design, Android / Web App UI, UI Components / Design Systems',
    launchingSoon: true,
  },
]

const videoServices = [
  {
    icon: 'short-form',
    title: 'Short-Form Editing',
    desc: 'Reels, Shorts, Ads (Basic cut + transitions + basic texts). Optimized for Instagram, YouTube Shorts, TikTok',
  },
  {
    icon: 'long-form',
    title: 'Long-Form Editing',
    desc: 'YouTube, Podcasts, Webinars',
  },
  {
    icon: 'corporate',
    title: 'Corporate & Event Videos',
    desc: 'Company Promos, Event Highlights, Interviews',
  },
  {
    icon: 'product',
    title: 'Product & E-commerce',
    desc: 'Product Showcase, Lifestyle, Model Videos',
  },
  {
    icon: 'social-branding',
    title: 'Social Media Branding',
    desc: 'Brand Intros, Transitions, Template Packs',
  },
  {
    icon: 'animated',
    title: 'Animated Videos',
    desc: 'Explainer, Logo Animations, full animated clips',
    launchingSoon: true,
  },
  {
    icon: 'ai-video',
    title: 'AI Video Creation and Editing',
    desc: 'AI-Generated Videos, Voiceovers, Text-to-Video',
    launchingSoon: true,
  },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function InfoTooltip({ text }) {
  return (
    <span className="relative inline-block ml-1 group/tip">
      <svg className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <div className="hidden group-hover/tip:block absolute z-50 left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-xs text-slate-600 leading-relaxed text-center">
        {text}
      </div>
    </span>
  )
}

function BenefitIcon({ type }) {
  const icons = {
    'squad-manager': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    'zero-downtime': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    'unlimited-requests': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
    'unlimited-changes': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
      </svg>
    ),
    replacement: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>
    ),
    'talent-swapping': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    'scale-up': (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    pause: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    ),
    cancel: (
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  }
  return icons[type] || null
}

function ServiceIcon({ type }) {
  const base = 'w-5 h-5 text-slate-400'
  const icons = {
    marketing: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    icons: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    branding: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    presentations: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    print: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
      </svg>
    ),
    uiux: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    'short-form': (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25c0 .621.504 1.125 1.125 1.125M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
      </svg>
    ),
    'long-form': (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    corporate: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
    product: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    'social-branding': (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    animated: (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    'ai-video': (
      <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  }
  return icons[type] || null
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN').format(price)
}

// --- Section Components ---

const planTypes = [
  'Creative Head',
  'Copy / Content Writers',
  'Designers',
  'Editors',
  'SM Manager',
  'Video/Photographer',
  'AI Video',
]

const liveTypes = ['Designers', 'Editors']

function PlanTypeTabs({ activeType, setActiveType }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="mb-8">
      {/* Mobile: Dropdown */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 shadow-sm"
        >
          {activeType}
          <svg className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {planTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setDropdownOpen(false) }}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  activeType === type
                    ? 'bg-gray-100 text-slate-900'
                    : 'text-slate-600 hover:bg-gray-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Desktop: Pill tabs */}
      <div className="hidden sm:flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1 gap-0.5">
          {planTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeType === type
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BillingToggle({ isYearly, setIsYearly }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className={`relative w-11 h-6 rounded-full transition-colors ${isYearly ? 'bg-emerald-500' : 'bg-gray-300'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            isYearly ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
        Yearly <span className="text-emerald-500">2 months free</span>
      </span>
    </div>
  )
}

function PricingTable({ isYearly }) {
  const tablePlans = plans.slice(1) // Exclude Starter plan
  const getPrice = (plan) => isYearly ? plan.monthlyPrice * 10 : plan.monthlyPrice
  const periodLabel = isYearly ? '/year' : '/month'
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Plan Headers */}
        <div className="grid grid-cols-[180px_repeat(4,1fr)] gap-0">
          <div /> {/* empty label column */}
          {tablePlans.map((plan, i) => (
            <div
              key={plan.name}
              className={`text-center px-3 pt-6 pb-4 relative ${
                plan.highlighted
                  ? 'bg-emerald-50/50 border-t-2 border-l-2 border-r-2 border-emerald-500 rounded-t-xl'
                  : ''
              }`}
            >
              {plan.badge && (
                <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-heading font-semibold text-slate-900 text-sm">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-snug min-h-[32px]">{plan.description}</p>
            </div>
          ))}
        </div>

        {/* Price Row */}
        <div className="grid grid-cols-[180px_repeat(4,1fr)] gap-0 border-t border-gray-200">
          <div className="flex items-center px-4 py-4">
            <span className="text-sm font-medium text-slate-700">Monthly Price</span>
          </div>
          {tablePlans.map((plan) => (
            <div
              key={plan.name + '-price'}
              className={`flex flex-col items-center justify-center py-4 ${
                plan.highlighted ? 'bg-emerald-50/50 border-l-2 border-r-2 border-emerald-500' : ''
              }`}
            >
              <span className="text-2xl font-bold text-slate-900">
                ₹{formatPrice(getPrice(plan))}
              </span>
              <span className="text-xs text-slate-400">{periodLabel}</span>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        {featureRows.map((row, rowIdx) => (
          <div
            key={row.label}
            className="grid grid-cols-[180px_repeat(4,1fr)] gap-0 border-t border-gray-100"
          >
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-slate-700">
                {row.label}
                {row.sublabel && <span className="block text-xs text-slate-400">{row.sublabel}</span>}
                {row.tooltip && <InfoTooltip text={row.tooltip} />}
              </span>
            </div>
            {row.values.slice(1).map((val, colIdx) => {
              const plan = tablePlans[colIdx]
              return (
                <div
                  key={`${row.label}-${colIdx}`}
                  className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
                    plan.highlighted
                      ? rowIdx === featureRows.length - 1
                        ? 'bg-emerald-50/50 border-l-2 border-r-2 border-b-2 border-emerald-500 rounded-b-xl'
                        : 'bg-emerald-50/50 border-l-2 border-r-2 border-emerald-500'
                      : ''
                  }`}
                >
                  {val === 'check' ? (
                    <CheckIcon />
                  ) : val === 'cross' ? (
                    <CrossIcon />
                  ) : typeof val === 'object' ? (
                    <>
                      <span className="text-xs font-semibold text-slate-900">{val.bold}</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">{val.sub}</span>
                    </>
                  ) : (
                    <span className="text-xs text-slate-600">{val}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* CTA Row */}
        <div className="grid grid-cols-[180px_repeat(4,1fr)] gap-0 pt-4">
          <div />
          {tablePlans.map((plan) => (
            <div key={plan.name + '-cta'} className="flex justify-center px-3">
              <button
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  plan.ctaStyle === 'highlighted'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : plan.ctaStyle === 'dark'
                    ? 'bg-gray-900 hover:bg-gray-700 text-white'
                    : 'bg-gray-900 hover:bg-gray-700 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StarterPlanCard({ isYearly }) {
  const starterPlan = plans[0]
  const price = isYearly ? starterPlan.monthlyPrice * 10 : starterPlan.monthlyPrice
  const periodLabel = isYearly ? '/year' : '/month'
  const starterFeatures = featureRows.map((row) => ({
    label: row.label,
    value: row.values[0],
  }))

  return (
    <div className="mt-10 border border-gray-200 rounded-xl p-8 bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:gap-10">
        {/* Left: Plan info + CTA */}
        <div className="flex-shrink-0 md:w-56 text-center md:text-left mb-6 md:mb-0">
          <h3 className="font-heading text-lg font-bold text-slate-900">{starterPlan.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{starterPlan.description}</p>
          <div className="mt-3">
            <span className="text-3xl font-bold text-slate-900">₹{formatPrice(price)}</span>
            <span className="text-sm text-slate-400 ml-1">{periodLabel}</span>
          </div>
          <button className="mt-5 px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-900 hover:bg-gray-700 text-white transition-all">
            {starterPlan.cta}
          </button>
        </div>
        {/* Right: Features grid */}
        <div className="flex-1 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {starterFeatures.map((f) => {
              const val = f.value
              return (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{f.label}</span>
                  <span className="text-right ml-3">
                    {val === 'check' ? (
                      <CheckIcon />
                    ) : val === 'cross' ? (
                      <CrossIcon />
                    ) : typeof val === 'object' ? (
                      <span className="text-xs font-semibold text-slate-900">{val.bold}</span>
                    ) : (
                      <span className="text-xs text-slate-700">{val}</span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function NoteSection() {
  return (
    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
      <p className="text-sm font-semibold text-slate-900 mb-2">Note:</p>
      <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
        <li>
          Capacity mentioned is the combined capacity of Squad Manager and the resource which is designer and/or editor.
          Meaning, they both work together to give the output of a full-time equivalent employee.
        </li>
        <li>All plans are billed monthly. Prices in Indian Rupees (₹). Applicable taxes extra. Cancel anytime.</li>
      </ul>
    </div>
  )
}

function BenefitsSection() {
  return (
    <section className="mt-20">
      <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
        As a Brand, When You Subscribe to UpSquad, What Do You Get?
      </h2>
      <p className="text-slate-500 mb-10">
        Our Designer + Editor subscription gives your brand creativity, consistency, and complete flexibility.
      </p>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-slate-600">
              <BenefitIcon type={b.icon} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{b.title}</h4>
              <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhatYouCanRequest() {
  const [activeTab, setActiveTab] = useState('Designs')
  const services = activeTab === 'Designs' ? designServices : videoServices

  return (
    <section className="mt-20">
      <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">What You Can Request</h2>
      <p className="text-slate-500 mb-6">
        From social media graphics to complete brand identities—our design services cover everything your brand needs.
      </p>
      <div className="flex gap-2 mb-6">
        {['Designs', 'Video edits'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              activeTab === tab
                ? 'border-gray-900 bg-white text-slate-900'
                : 'border-gray-200 text-slate-500 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s) => (
          <div
            key={s.title}
            className={`border rounded-xl p-5 transition-all ${
              s.launchingSoon
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <ServiceIcon type={s.icon} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
              {s.launchingSoon && (
                <span className="flex-shrink-0 text-[10px] font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Launching Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WorkingHours() {
  return (
    <section className="mt-20 border border-gray-200 rounded-xl p-8 bg-white">
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6">Working Days & Business Hours</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="flex gap-3">
          <span className="text-sm font-medium text-slate-900">Working Days:</span>
          <span className="text-sm text-slate-600">Monday to Friday</span>
        </div>
        <div className="flex gap-3">
          <span className="text-sm font-medium text-slate-900">Working Hours:</span>
          <span className="text-sm text-slate-600">10:00 AM – 6:00 PM (IST)</span>
        </div>
      </div>
      <div className="text-sm text-slate-600 space-y-3">
        <p>
          <span className="font-medium text-slate-700">During working hours, our team is available for:</span>
          <br />
          Project execution &middot; Client communication &middot; Meetings & reviews &middot; Support requests
        </p>
        <p>
          <span className="font-medium text-slate-900">Weekends & Holidays:</span> Closed on Sundays and Public
          Holidays. Saturdays are conditional based on project needs.
        </p>
        <p>
          <span className="font-medium text-slate-900">Response Time:</span> Same-day during business hours.
          After-hours messages addressed next working day (10-11 AM planning window).
        </p>
      </div>
    </section>
  )
}

function UnlimitedRequestsExplainer() {
  return (
    <section className="mt-20">
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">
        How Our "Unlimited Requests — One at a Time" System Works
      </h2>
      <p className="text-sm text-slate-600 mb-6">
        At UpSquad, you can submit <strong>unlimited design and video editing requests</strong>, but our team works on{' '}
        <strong>one request at a time</strong>. This ensures high quality, full focus, and fast delivery for every task.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Here's the simplest way to understand it:</h3>
          <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>You can add <strong>as many tasks as you want</strong> to your queue.</li>
            <li>We will pick up <strong>one design or one video edit</strong> at a time.</li>
            <li>Once that task is completed and delivered to you...</li>
            <li>
              The <strong>next task in your queue automatically starts</strong>, without you needing to follow up.
            </li>
            <li>When that is completed, the next one begins — and so on.</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700">Think of it like a conveyor belt:</p>
            <p className="text-sm text-slate-500 mt-1">
              You can load unlimited items onto the belt, but the machine processes{' '}
              <strong>one item at a time</strong>, very efficiently.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Why we do this:</h3>
          <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>
              It gives you <strong>unlimited output</strong> without compromising quality.
            </li>
            <li>
              Designers and editors can fully focus on <strong>one task</strong>, resulting in better work.
            </li>
            <li>Delivery timelines stay predictable (24–48 hours depending on your plan).</li>
            <li>Your entire queue keeps moving smoothly.</li>
          </ul>

          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-emerald-800 mb-2">Important clarity:</h4>
            <p className="text-sm text-emerald-700">
              The limit is <strong>not on how many tasks you can submit</strong>.
            </p>
            <p className="text-sm text-emerald-700">
              The limit is only on <strong>how many tasks we work on simultaneously</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ImportantNote() {
  return (
    <section className="mt-16 mb-20">
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Important Note for New Clients</h2>
      <p className="text-sm text-slate-600 mb-2">
        At UpSquad, we strongly value the <strong>creativity and mental space</strong> of our designers and editors.
      </p>
      <p className="text-sm text-slate-600 mb-6">
        Our goal is to deliver <strong>consistent, high-quality content every week</strong>, not to rush through as many
        outputs as possible in a single day.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <h4 className="text-sm font-semibold text-slate-900">If you are looking for:</h4>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Maximum number of designs per day</li>
            <li>Bulk edits in the shortest time</li>
            <li>Quantity over quality</li>
          </ul>
          <p className="text-sm font-medium text-slate-900 mt-4">
            Then none of our plans will be the right fit for you.
          </p>
        </div>

        <div className="border-2 border-emerald-500 rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <h4 className="text-sm font-semibold text-slate-900">Our plans are designed for:</h4>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              Brands who want <strong>steady, professional, high-quality content</strong>
            </li>
            <li>Businesses that value consistency, creativity, and reliability</li>
            <li>Clients who want expert-level design and editing — not mass-production output.</li>
          </ul>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <p className="text-sm text-slate-600">
          We focus on delivering content that <strong>represents your brand beautifully</strong>, not on delivering high
          volumes at the expense of quality.
        </p>
      </div>
    </section>
  )
}

// --- Video/Photographer Pricing ---

const videographerPlans = [
  {
    name: 'Starter', priceLabel: '₹6k', highlighted: false, badge: null,
    shootDuration: 'Half Day (4 hours)',
    equipments: 'Professional camera + Standard mic and lighting kit',
    expertLevel: 'Skilled', crew: 'Single person', preShooting: null,
  },
  {
    name: 'Basic', priceLabel: '₹13k', highlighted: false, badge: null,
    shootDuration: 'Full Day (8 Hours)',
    equipments: 'Professional camera + Standard mic and lighting kit',
    expertLevel: 'Skilled', crew: 'Single person', preShooting: null,
  },
  {
    name: 'Plus', priceLabel: '₹18k', highlighted: true, badge: 'BEST VALUE',
    shootDuration: 'Full Day (8 Hours)',
    equipments: 'Professional camera + Standard mic and lighting kit',
    expertLevel: 'Experienced', crew: 'Single/Multiple', preShooting: 'Basic shot planning',
  },
  {
    name: 'Pro', priceLabel: '₹25k', highlighted: false, badge: null,
    shootDuration: 'Full Day (8 Hours)',
    equipments: 'Professional camera + mic + Cinematic lighting',
    expertLevel: 'Pros', crew: 'Single/Multiple', preShooting: 'Detailed shot list & creative direction',
  },
  {
    name: 'Personal', priceLabel: 'Custom Pricing', highlighted: false, badge: null,
    shootDuration: '—', equipments: '—', expertLevel: '—', crew: '—', preShooting: '—',
  },
]

const presentationPlans = [
  { name: 'Starter', monthlyPrice: 6000, videos: '2 videos', highlighted: false, badge: null },
  { name: 'Basic', monthlyPrice: 13000, videos: '4 videos', highlighted: false, badge: null },
  { name: 'Plus', monthlyPrice: 15000, videos: '8 videos', highlighted: true, badge: 'BEST VALUE' },
  { name: 'Pro', monthlyPrice: 20000, videos: '10 videos', highlighted: false, badge: null },
]

function VideographerTable() {
  const rows = [
    { label: 'Price per day', key: 'priceLabel', bold: true },
    { label: 'Shoot Duration', key: 'shootDuration' },
    { label: 'Equipments', key: 'equipments' },
    { label: 'Expert level', key: 'expertLevel' },
    { label: 'Crew', key: 'crew' },
    { label: 'Pre-Shoot Planning', key: 'preShooting' },
  ]
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        {/* Headers */}
        <div className="grid grid-cols-[160px_repeat(5,1fr)]">
          <div />
          {videographerPlans.map((p) => (
            <div key={p.name} className={`text-center px-3 pt-6 pb-4 ${p.highlighted ? 'bg-emerald-50/50 border-t-2 border-l-2 border-r-2 border-emerald-500 rounded-t-xl' : ''}`}>
              {p.badge && <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">{p.badge}</span>}
              <h3 className="font-heading font-semibold text-slate-900 text-sm">{p.name}</h3>
            </div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, rowIdx) => (
          <div key={row.label} className="grid grid-cols-[160px_repeat(5,1fr)] border-t border-gray-100">
            <div className="flex items-center px-4 py-4">
              <span className="text-sm text-slate-700">{row.label}</span>
            </div>
            {videographerPlans.map((p, colIdx) => (
              <div key={p.name + row.key} className={`flex items-center justify-center py-4 px-2 text-center text-xs ${
                p.highlighted
                  ? rowIdx === rows.length - 1
                    ? 'bg-emerald-50/50 border-l-2 border-r-2 border-b-2 border-emerald-500 rounded-b-xl'
                    : 'bg-emerald-50/50 border-l-2 border-r-2 border-emerald-500'
                  : ''
              }`}>
                {row.key === 'preShooting' && p[row.key] === null
                  ? <CrossIcon />
                  : <span className={row.bold ? 'font-bold text-slate-900 text-base' : 'text-slate-600'}>{p[row.key]}</span>
                }
              </div>
            ))}
          </div>
        ))}
        {/* CTA Row */}
        <div className="grid grid-cols-[160px_repeat(5,1fr)] pt-4">
          <div />
          {videographerPlans.map((p) => (
            <div key={p.name + '-cta'} className="flex justify-center px-3">
              <button className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${p.highlighted ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-900 hover:bg-gray-700 text-white'}`}>
                {p.name === 'Personal' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PresentationTable() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[600px]">
        {/* Headers */}
        <div className="grid grid-cols-[160px_repeat(4,1fr)]">
          <div />
          {presentationPlans.map((p) => (
            <div key={p.name} className={`text-center px-3 pt-6 pb-4 ${p.highlighted ? 'bg-emerald-50/50 border-t-2 border-l-2 border-r-2 border-emerald-500 rounded-t-xl' : ''}`}>
              {p.badge && <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">{p.badge}</span>}
              <h3 className="font-heading font-semibold text-slate-900 text-sm">{p.name}</h3>
            </div>
          ))}
        </div>
        {/* Price Row */}
        <div className="grid grid-cols-[160px_repeat(4,1fr)] border-t border-gray-200">
          <div className="flex items-center px-4 py-4"><span className="text-sm font-medium text-slate-700">Monthly Price</span></div>
          {presentationPlans.map((p) => (
            <div key={p.name + '-price'} className={`flex flex-col items-center justify-center py-4 ${p.highlighted ? 'bg-emerald-50/50 border-l-2 border-r-2 border-emerald-500' : ''}`}>
              <span className="text-2xl font-bold text-slate-900">₹{formatPrice(p.monthlyPrice)}</span>
              <span className="text-xs text-slate-400">/month</span>
            </div>
          ))}
        </div>
        {/* Videos Row */}
        <div className="grid grid-cols-[160px_repeat(4,1fr)] border-t border-gray-100">
          <div className="flex items-center px-4 py-4"><span className="text-sm text-slate-700">Videos</span></div>
          {presentationPlans.map((p, i) => (
            <div key={p.name + '-videos'} className={`flex flex-col items-center justify-center py-4 px-2 text-center ${
              p.highlighted
                ? 'bg-emerald-50/50 border-l-2 border-r-2 border-b-2 border-emerald-500 rounded-b-xl'
                : ''
            }`}>
              <span className="text-sm font-semibold text-slate-900">{p.videos}</span>
              <span className="text-xs text-slate-400 mt-0.5">Short Videos (per month)</span>
            </div>
          ))}
        </div>
        {/* CTA Row */}
        <div className="grid grid-cols-[160px_repeat(4,1fr)] pt-4">
          <div />
          {presentationPlans.map((p) => (
            <div key={p.name + '-cta'} className="flex justify-center px-3">
              <button className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${p.highlighted ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-900 hover:bg-gray-700 text-white'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VideoPhotographerPricing() {
  const [activeSubTab, setActiveSubTab] = useState('Videographer/Photographer')
  const subTabs = ['Videographer/Photographer', 'Presentation Videos']
  return (
    <>
      {/* Sub-tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex border border-gray-200 rounded-xl p-1 bg-white gap-1">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSubTab === tab ? 'bg-gray-900 text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'Videographer/Photographer' ? (
        <>
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Videographer/Photographer Subscriptions</h1>
            <p className="text-slate-500">Get professional video and photography coverage with flexible, transparent pricing.</p>
          </div>
          <VideographerTable />
          {/* Important Notes */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-slate-900 mb-3">Important Notes:</p>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Concepts, Scripts and other content related things are not included.</li>
              <li>Travel expenses will be extra.</li>
              <li>If additional equipments are required, rental cost for the same will be extra.</li>
              <li>If models, studios, props, paid locations are required, cost for the same will be extra.</li>
              <li>Crew can be single or multiple as per the requirement.</li>
              <li>Editing is not included in this subscription, you can subscribe to video editor separately if needed.</li>
            </ul>
          </div>
          {/* Features */}
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Features</h2>
            <p className="text-slate-500 mb-5">Maximum flexibility and creativity for your content production needs.</p>
            <div className="space-y-3">
              {[
                'Change videographer at any time based on availability',
                <>Shoot unlimited content within the allotted <strong>8 hours per day</strong></>,
                'No limit on the number of video concepts per shoot day',
                'Multiple takes allowed for each shot within the shoot time',
                'Pause and resume shoots based on your content calendar',
                <>Use shoot days for <strong>any content type</strong> (reels, ads, interviews, product shots, etc.)</>,
                'Full usage rights on all footage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </section>
          {/* Fair-Use */}
          <section className="mt-12 mb-16">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Fair-Use &amp; Transparency</h2>
            <p className="text-slate-500 mb-5">Clear guidelines to ensure smooth collaboration and mutual respect.</p>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>8-hour workday includes setup and wrap-up time.</li>
              <li>Breaks included as per standard production norms.</li>
              <li>Overtime available at additional cost.</li>
              <li>Travel time considered separately if applicable (if need to travel between locations).</li>
            </ul>
          </section>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">Presentation Videos</h1>
            <p className="text-slate-500">Complete video production from concept to delivery.</p>
          </div>
          <PresentationTable />
          {/* Who this plan is for */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-slate-900 mb-3">Who this plan is for?</p>
            <div className="space-y-2">
              {[
                'Your requirement is fixed',
                'You need a fixed number of videos per month',
                <>You want us to take care of the entire process: create concepts for shorts and long form videos, scripting and story boarding, shooting and editing, and final delivery.</>,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* What is included */}
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-slate-900 mb-3">What is included?</p>
            <div className="space-y-2">
              {[
                'Content Calendar for a Month including Concept, Scripts and Story boards in advance.',
                'Anchor/Model/Actor presenting the script in a talking head or walk and talk format.',
                'Final Edited Video + Full Footage after Trimming.',
                '2 Rounds of revisions for videos created (Unlimited Revisions if you take editor subscription).',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* What's not included */}
          <div className="mt-4 mb-16 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-sm font-semibold text-slate-900 mb-3">What's not included?</p>
            <div className="space-y-2">
              {[
                'Travel expenses extra for if location shoot is needed.',
                'Separate Models/Anchors/Actors if required is charged based on their per day rate.',
                'If additional cameras, drones or other equipments or props are needed, their rental cost will also be extra.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CrossIcon />
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

// --- Main Pricing Page ---

export default function Pricing() {
  const [activeType, setActiveType] = useState('Designers')
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="pt-20 pb-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <PlanTypeTabs activeType={activeType} setActiveType={setActiveType} />

        {activeType === 'Video/Photographer' ? (
          <VideoPhotographerPricing />
        ) : liveTypes.includes(activeType) ? (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">{activeType} Plan</h1>
              <p className="text-slate-500">Unlimited requests. Unlimited revisions. Pick a plan that fits your workflow.</p>
            </div>
            <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
            <PricingTable isYearly={isYearly} />
            <StarterPlanCard isYearly={isYearly} />
            <NoteSection />
            <BenefitsSection />
            <WhatYouCanRequest />
            <WorkingHours />
            <UnlimitedRequestsExplainer />
            <ImportantNote />
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl font-bold text-slate-900 mb-2">{activeType} Plan</h1>
            </div>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
              <p className="text-slate-500 max-w-md">
                Pricing for <span className="font-semibold text-slate-700">{activeType}</span> is on its way. Join the waitlist to get notified when it launches.
              </p>
              <a href="#" className="mt-8 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors">
                Join the Waitlist
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
