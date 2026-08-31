export const INK = '#0A0A0A'
export const YELLOW = '#FFFF99'
export const PAPER = '#FAFAFA'
export const WHITE = '#FFFFFF'
export const MUTED = '#525252'

export const COPY = {
  brand: 'UpSquad',
  kicker: "We're building a dream team.",
  wantIn: 'Want in?',
  freelancerQ: 'Are you a freelancer?',
  roles: [
    { id: 'editor', code: '01', label: 'Video Editor' },
    { id: 'designer', code: '02', label: 'Designer' },
  ],
  program: 'Partner Program',
  incomeKicker: 'Regular monthly income',
  income: '₹10K – 1 Lakh',
  incomeLong: '₹10,000 to ₹1,00,000',
  phoneDisplay: '+91 99955 66382',
  phoneRaw: '919995566382',
  web: 'upsquadconnect.com',
  webUrl: 'https://www.upsquadconnect.com',
  applyHint: 'Send your CV on WhatsApp',
}

export const WHATSAPP_HREF = `https://wa.me/${COPY.phoneRaw}?text=${encodeURIComponent(
  "Hi UpSquad, I'm a freelancer (video editor / designer) and I want to join the partner program. I'll send my CV."
)}`

export const PARTNER_HREF = '/partner-program/designer-and-video-editor/'

export const FORMATS = [
  {
    id: 'stories',
    w: 1080,
    h: 1920,
    label: 'Stories / Reels',
    ratio: '9:16',
    placement: 'Instagram & Facebook Stories, Reels, in-stream',
  },
  {
    id: 'portrait',
    w: 1080,
    h: 1350,
    label: 'Feed portrait',
    ratio: '4:5',
    placement: 'Instagram and Facebook feed — the size Meta recommends',
  },
  {
    id: 'square',
    w: 1080,
    h: 1080,
    label: 'Feed square',
    ratio: '1:1',
    placement: 'Feed, carousel, and profile grid',
  },
  {
    id: 'landscape',
    w: 1200,
    h: 628,
    label: 'Landscape',
    ratio: '1.91:1',
    placement: 'Link ads, right column, Audience Network',
  },
]

export const CONCEPTS = [
  {
    id: 'cast',
    name: 'Call Sheet',
    blurb: 'A production call sheet. Black field, yellow clapper, role tickets.',
  },
  {
    id: 'highlight',
    name: 'Highlighter',
    blurb: 'A marked-up brief. Full yellow, giant type, no fluff.',
  },
  {
    id: 'classified',
    name: 'Classified',
    blurb: 'A broadsheet want-ad. White paper, hairline rules, editorial type.',
  },
]

export const FONT_DISPLAY = '"Plus Jakarta Sans", Inter, sans-serif'
export const FONT_MONO = '"Sometype Mono", ui-monospace, monospace'
export const FONT_BODY = 'Inter, system-ui, sans-serif'

// Instagram Reels / Stories chrome. Keep every important line inside this box
// on 1080×1920 so username, audio, caption, and the Reels tab bar cannot cover it.
export const REELS_SAFE = {
  top: 320,
  bottom: 430,
  x: 72,
}
