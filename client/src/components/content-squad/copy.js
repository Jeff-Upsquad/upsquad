export const INK = '#0A0A0A'
export const YELLOW = '#FFFF99'
export const PAPER = '#FAFAFA'
export const WHITE = '#FFFFFF'
export const MUTED = '#525252'

export const ROLES = [
  { id: 'editor', n: '01', label: 'Video Editor' },
  { id: 'designer', n: '02', label: 'Designer' },
  { id: 'copy', n: '03', label: 'Copywriter' },
  { id: 'director', n: '04', label: 'Creative Director' },
  { id: 'social', n: '05', label: 'Social Media Manager' },
  { id: 'video', n: '06', label: 'Videographer' },
  { id: 'photo', n: '07', label: 'Photographer' },
  { id: 'ai', n: '08', label: 'AI Video & Image Creator' },
]

export const COPY = {
  brand: 'UpSquad',
  squad: 'Content Squad',
  kicker: 'Freelance it. Or get hired.',
  headline: 'The content squad is open.',
  sub:
    'Eight seats across making, writing, directing, and capturing. Partner with us as a freelancer, or come on as a hire.',
  phoneDisplay: '+91 99955 66382',
  phoneRaw: '919995566382',
  web: 'upsquadconnect.com',
  applyHint: 'Connect with us in WhatsApp',
  freelanceLabel: 'Freelance',
  jobsLabel: 'Jobs',
}

export const WHATSAPP_HREF = `https://wa.me/${COPY.phoneRaw}?text=${encodeURIComponent(
  "Hi UpSquad, I want to join the Content Squad as a freelancer or for a job."
)}`

export const PARTNER_HREF = '/partner-program/general/'
export const JOBS_HREF = '/careers/'

export const FONT_DISPLAY = '"Plus Jakarta Sans", Inter, sans-serif'
export const FONT_MONO = '"Sometype Mono", ui-monospace, monospace'
export const FONT_BODY = 'Inter, system-ui, sans-serif'

export { FORMATS, REELS_SAFE } from '../dream-team/copy'

export const CONCEPTS = [
  {
    id: 'roster',
    name: 'Roster',
    blurb: 'Black field, numbered seats. Two paths: freelance or jobs.',
  },
  {
    id: 'split',
    name: 'Two paths',
    blurb: 'Yellow brief. Freelance on one side, jobs on the other, roles in the middle.',
  },
  {
    id: 'lineup',
    name: 'Lineup',
    blurb: 'Paper lineup of all eight seats. Editorial, high-contrast type.',
  },
]
