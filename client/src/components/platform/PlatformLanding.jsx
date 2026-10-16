'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { squads } from '../../data/squads'
import { PARTNER_SQUAD_MODE } from '../landing/ServicesDirectory'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ROLES = [
  'Accountant', 'Social media manager', 'Ads specialist', 'Graphic designer',
  'Video editor', 'HR & payroll', 'Sales rep', 'Content writer', 'Bookkeeper', 'Community manager',
]

const APPS = [
  {
    id: 'books',
    name: 'Squad Books',
    role: 'Accounting',
    status: 'Live',
    icon: 'book',
    blurb: 'Ledgers, invoices, reconciliation and reports — the accounting desk your accountant (human or agent) works from.',
    url: 'books.squadhub.in',
    agentStatus: 'live',
    shot: null,
    nav: ['Ledger', 'Invoices', 'Reports'],
    feed: {
      human: [
        { who: 'h', name: 'Priya · Accountant', text: 'Reviewed vendor bills and flagged a duplicate' },
        { who: 'h', name: 'Priya · Accountant', text: 'Closed the books for last month' },
        { who: 'h', name: 'Priya · Accountant', text: 'Shared the P&L with the founder' },
      ],
      agent: [
        { who: 'a', name: 'Ledger · Accountant bot', text: 'Categorised every new bank transaction' },
        { who: 'a', name: 'Ledger · Accountant bot', text: 'Matched open invoices to incoming payments' },
        { who: 'a', name: 'Ledger · Accountant bot', text: 'Drafted the monthly P&L' },
      ],
      both: [
        { who: 'a', name: 'Ledger · Accountant bot', text: 'Drafted the monthly P&L and reconciliation' },
        { who: 'h', name: 'Priya · Accountant', text: 'Approved the draft, adjusted two entries' },
        { who: 'a', name: 'Ledger · Accountant bot', text: 'Filed the final report to the owner' },
      ],
    },
  },
  {
    id: 'smm',
    name: 'SMM Studio',
    role: 'Social media',
    status: 'Live',
    extra: 'Ads manager coming soon',
    icon: 'megaphone',
    blurb: 'Plan, create, schedule and publish across every account — with ad management on the way.',
    agentStatus: 'live',
    shot: null,
    nav: ['Calendar', 'Posts', 'Ads'],
    feed: {
      human: [
        { who: 'h', name: 'Arjun · Social manager', text: 'Planned next week’s content calendar' },
        { who: 'h', name: 'Arjun · Social manager', text: 'Replied to comments on the launch reel' },
        { who: 'h', name: 'Arjun · Social manager', text: 'Scheduled 6 posts across Instagram & LinkedIn' },
      ],
      agent: [
        { who: 'a', name: 'Pulse · Social bot', text: 'Wrote captions and hashtags for 6 posts' },
        { who: 'a', name: 'Pulse · Social bot', text: 'Picked best posting times per channel' },
        { who: 'a', name: 'Pulse · Social bot', text: 'Published on schedule and logged results' },
      ],
      both: [
        { who: 'a', name: 'Pulse · Social bot', text: 'Drafted a week of posts from the brand brief' },
        { who: 'h', name: 'Arjun · Social manager', text: 'Tweaked tone on two captions, approved the rest' },
        { who: 'a', name: 'Pulse · Social bot', text: 'Scheduled everything and is watching replies' },
      ],
    },
  },
  {
    id: 'creative',
    name: 'Creative Studio',
    role: 'Design',
    status: 'Building',
    icon: 'palette',
    blurb: 'Briefs, design requests, versions and approvals in one board — for human designers and designer agents alike.',
    agentStatus: 'beta',
    shot: null,
    nav: ['Briefs', 'Canvas', 'Approvals'],
    feed: {
      human: [
        { who: 'h', name: 'Maya · Designer', text: 'Picked up the festive campaign brief' },
        { who: 'h', name: 'Maya · Designer', text: 'Uploaded 3 key-visual directions' },
        { who: 'h', name: 'Maya · Designer', text: 'Delivered final files in every size' },
      ],
      agent: [
        { who: 'a', name: 'Canvas · Designer bot', text: 'Generated 12 banner variations from the brief' },
        { who: 'a', name: 'Canvas · Designer bot', text: 'Resized the set for every placement' },
        { who: 'a', name: 'Canvas · Designer bot', text: 'Applied brand fonts and colours automatically' },
      ],
      both: [
        { who: 'h', name: 'Maya · Designer', text: 'Set the art direction and hero visual' },
        { who: 'a', name: 'Canvas · Designer bot', text: 'Expanded it into 24 on-brand variations' },
        { who: 'h', name: 'Maya · Designer', text: 'Picked the winners and sent for approval' },
      ],
    },
  },
  {
    id: 'video',
    name: 'Video Studio',
    role: 'Video editing',
    status: 'Building',
    icon: 'film',
    blurb: 'A real video editor in the browser — cuts, captions and exports, driven by an editor, an agent, or both.',
    agentStatus: 'beta',
    shot: null,
    nav: ['Timeline', 'Captions', 'Exports'],
    feed: {
      human: [
        { who: 'h', name: 'Rahul · Video editor', text: 'Cut the founder interview to 60 seconds' },
        { who: 'h', name: 'Rahul · Video editor', text: 'Colour-graded and added music' },
        { who: 'h', name: 'Rahul · Video editor', text: 'Exported reels in 9:16 and 1:1' },
      ],
      agent: [
        { who: 'a', name: 'Reel · Editor bot', text: 'Transcribed footage and found the best hooks' },
        { who: 'a', name: 'Reel · Editor bot', text: 'Auto-cut 5 short clips with captions' },
        { who: 'a', name: 'Reel · Editor bot', text: 'Rendered every aspect ratio' },
      ],
      both: [
        { who: 'a', name: 'Reel · Editor bot', text: 'Rough-cut 5 clips and burned in captions' },
        { who: 'h', name: 'Rahul · Video editor', text: 'Polished pacing and transitions on the top 2' },
        { who: 'a', name: 'Reel · Editor bot', text: 'Rendered and handed off to SMM Studio' },
      ],
    },
  },
  {
    id: 'payroll',
    name: 'Squad Payroll',
    role: 'Attendance & payroll',
    status: 'Live',
    icon: 'clock',
    blurb: 'Attendance, leave and salary runs — handled by your HR person, an HR agent, or the two together.',
    url: 'squadpayroll.upsquadconnect.com',
    agentStatus: 'soon',
    shot: null,
    nav: ['Attendance', 'Leave', 'Payruns'],
    feed: {
      human: [
        { who: 'h', name: 'Neha · HR', text: 'Approved leave requests for the week' },
        { who: 'h', name: 'Neha · HR', text: 'Checked attendance exceptions' },
        { who: 'h', name: 'Neha · HR', text: 'Ran payroll and sent payslips' },
      ],
      agent: [
        { who: 'a', name: 'Roster · HR bot', text: 'Compiled attendance from every check-in' },
        { who: 'a', name: 'Roster · HR bot', text: 'Calculated salaries, overtime and deductions' },
        { who: 'a', name: 'Roster · HR bot', text: 'Generated payslips for review' },
      ],
      both: [
        { who: 'a', name: 'Roster · HR bot', text: 'Prepared the payrun with every adjustment' },
        { who: 'h', name: 'Neha · HR', text: 'Reviewed the two edge cases, approved the run' },
        { who: 'a', name: 'Roster · HR bot', text: 'Sent payslips to the whole team' },
      ],
    },
  },
  {
    id: 'crm',
    name: 'Squad CRM',
    role: 'Sales',
    status: 'Live',
    icon: 'chat',
    blurb: 'Every conversation that comes into the business, in one inbox and pipeline — for reps and sales agents.',
    url: 'crm.squadhub.in',
    agentStatus: 'live',
    shot: null,
    nav: ['Inbox', 'Pipeline', 'Follow-ups'],
    feed: {
      human: [
        { who: 'h', name: 'Kiran · Sales rep', text: 'Called three warm leads from WhatsApp' },
        { who: 'h', name: 'Kiran · Sales rep', text: 'Moved a deal to proposal stage' },
        { who: 'h', name: 'Kiran · Sales rep', text: 'Logged notes and next steps' },
      ],
      agent: [
        { who: 'a', name: 'Closer · Sales bot', text: 'Answered new enquiries within seconds' },
        { who: 'a', name: 'Closer · Sales bot', text: 'Qualified leads and tagged intent' },
        { who: 'a', name: 'Closer · Sales bot', text: 'Scheduled follow-ups automatically' },
      ],
      both: [
        { who: 'a', name: 'Closer · Sales bot', text: 'Replied instantly and qualified the lead' },
        { who: 'h', name: 'Kiran · Sales rep', text: 'Took over the hot lead on a call' },
        { who: 'a', name: 'Closer · Sales bot', text: 'Logged the call and set the follow-up' },
      ],
    },
  },
]

const BOARD_TASKS = [
  { id: 't1', title: 'Monthly P&L', app: 'Squad Books', who: 'a', av: 'LG' },
  { id: 't2', title: 'Diwali campaign visuals', app: 'Creative Studio', who: 'h', av: 'MY' },
  { id: 't3', title: 'Reply to new leads', app: 'Squad CRM', who: 'a', av: 'CL' },
  { id: 't4', title: 'Week 42 content calendar', app: 'SMM Studio', who: 'h', av: 'AR' },
  { id: 't5', title: 'Founder interview reel', app: 'Video Studio', who: 'a', av: 'RL' },
  { id: 't6', title: 'October payrun', app: 'Squad Payroll', who: 'h', av: 'NH' },
]
const BOARD_COLS = ['Queued', 'In progress', 'Review', 'Done']

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1]

function Icon({ name, className = 'w-5 h-5' }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" /></>,
    bot: <><rect x="4.5" y="8" width="15" height="11" rx="3.5" /><path d="M12 4.5V8M9 13h.01M15 13h.01M9.5 16.2h5" /><circle cx="12" cy="4" r="1" /></>,
    hub: <><circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="1.8" /><circle cx="19" cy="6" r="1.8" /><circle cx="5" cy="18" r="1.8" /><circle cx="19" cy="18" r="1.8" /><path d="M6.5 7.2 9.6 10M17.5 7.2 14.4 10M6.5 16.8l3.1-2.8M17.5 16.8l-3.1-2.8" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    book: <><path d="M5 4.5h9.5A3.5 3.5 0 0 1 18 8v11.5H8.5A3.5 3.5 0 0 1 5 16V4.5Z" /><path d="M5 16a3.5 3.5 0 0 1 3.5-3.5H18M9 8h5" /></>,
    megaphone: <><path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11" /></>,
    palette: <><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.5-1.9-.3-1.1.4-2.1 1.6-2.1H17a3.5 3.5 0 0 0 3.5-3.5c0-5.2-3.8-9.5-8.5-9.5Z" /><circle cx="8" cy="11" r="1" /><circle cx="11" cy="7.5" r="1" /><circle cx="15.5" cy="8.5" r="1" /></>,
    film: <><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="M3.5 9h17M3.5 15h17M8 5v4M8 15v4M16 5v4M16 15v4" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    chat: <><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-6l-4.5 4v-4H7a2.5 2.5 0 0 1-2.5-2.5v-7Z" /><path d="M8.5 9h7M8.5 12h4" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    plus: <path d="M12 5v14M5 12h14" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>,
    moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
    spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  }
  return <svg viewBox="0 0 24 24" className={className} {...p} aria-hidden="true">{paths[name]}</svg>
}

function Badge({ who, className = '' }) {
  const h = who === 'h'
  return (
    <span
      className={`pl-mono inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${className}`}
      style={{
        color: h ? 'var(--pl-human-ink)' : 'var(--pl-agent-ink)',
        background: h ? 'rgb(var(--pl-h) / .08)' : 'rgb(var(--pl-a) / .08)',
        border: `1px solid ${h ? 'rgb(var(--pl-h) / .2)' : 'rgb(var(--pl-a) / .2)'}`,
      }}
    >
      <Icon name={h ? 'person' : 'bot'} className="w-3 h-3" />
      {h ? 'Human' : 'Agent'}
    </span>
  )
}

function Avatar({ who, label, size = 'w-8 h-8 text-[10px]' }) {
  const h = who === 'h'
  return (
    <span
      className={`pl-mono ${size} inline-flex shrink-0 items-center justify-center rounded-full font-medium`}
      style={{
        color: '#000',
        background: h ? 'var(--pl-human)' : 'var(--pl-agent)',
        boxShadow: `0 0 0 3px ${h ? 'rgb(var(--pl-h) / .12)' : 'rgb(var(--pl-a) / .12)'}`,
        borderRadius: h ? '999px' : '30%',
      }}
    >
      {label}
    </span>
  )
}

function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children }) {
  return (
    <div className="pl-mono mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] pl-dim">
      <span className="h-px w-6" style={{ background: 'var(--pl-line-strong)' }} />
      {children}
    </div>
  )
}

function spotHandlers(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function MagneticButton({ children, href, primary }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, ...(primary ? { background: 'var(--pl-human)' } : {}) }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.25)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors ${
        primary ? 'text-black' : 'pl-glass text-[color:var(--pl-text)] hover:bg-[color:var(--pl-soft-2)]'
      }`}
    >
      {children}
      <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </motion.a>
  )
}

/* ------------------------------------------------------------------ */
/*  Nav + chrome                                                       */
/* ------------------------------------------------------------------ */

function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['Humans', '#humans'], ['Agents', '#agents'], ['SquadHub', '#hub'], ['Apps', '#apps'], ['Models', '#providers']]
  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, var(--pl-human), var(--pl-agent))' }}
      />
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-all duration-500 ${
            scrolled ? 'pl-glass shadow-[var(--pl-shadow)]' : 'border border-transparent'
          }`}
        >
          <a href="#top" className="pl-display flex items-center gap-2 text-lg font-bold">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute left-0 top-0 h-3.5 w-3.5 rounded-full" style={{ background: 'var(--pl-human)' }} />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-[30%]" style={{ background: 'var(--pl-agent)' }} />
            </span>
            UpSquad
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {links.map(([l, h]) => (
              <a key={l} href={h} className="rounded-full px-4 py-2 text-sm pl-dim transition-colors hover:bg-[color:var(--pl-soft-2)] hover:text-[color:var(--pl-text)]">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href="/signup/"
            className="rounded-full px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            style={{ background: 'var(--pl-human)' }}
          >
            Build your squad
          </a>
          </div>
        </nav>
      </motion.header>
    </>
  )
}

// Shares the site-wide `upsquad-theme` key, so the root layout's no-flash
// script applies the saved choice before first paint. Default is light.
function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')) }, [])
  const flip = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('upsquad-theme', next ? 'dark' : 'light') } catch (e) {}
  }
  return (
    <button
      onClick={flip}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border transition-colors hover:bg-[color:var(--pl-soft-2)]"
      style={{ borderColor: 'var(--pl-line)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'moon' : 'sun'}
          initial={{ y: 14, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease }}
        >
          <Icon name={dark ? 'moon' : 'sun'} className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 60, damping: 20 })
  const sy = useSpring(y, { stiffness: 60, damping: 20 })
  useEffect(() => {
    const on = (e) => { x.set(e.clientX - 300); y.set(e.clientY - 300) }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [x, y])
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full md:block"
      style={{ x: sx, y: sy, background: 'radial-gradient(circle, rgb(var(--pl-a) / .07), rgb(var(--pl-h) / .04) 40%, transparent 70%)' }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const ORBIT_INNER = [
  { who: 'h', label: 'Accountant' },
  { who: 'a', label: 'Sales bot' },
  { who: 'h', label: 'Designer' },
  { who: 'a', label: 'Support bot' },
]
const ORBIT_OUTER = [
  { who: 'a', label: 'Editor bot' },
  { who: 'h', label: 'Social manager' },
  { who: 'a', label: 'Accountant bot' },
  { who: 'h', label: 'Sales rep' },
  { who: 'a', label: 'Designer bot' },
  { who: 'h', label: 'HR lead' },
]

function OrbitRing({ items, radius, dur, reverse }) {
  return (
    <div
      className={`absolute inset-0 ${reverse ? 'pl-orbit-rev' : 'pl-orbit'}`}
      style={{ '--dur': `${dur}s` }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-dashed"
        style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius, borderColor: 'var(--pl-line-strong)' }}
      />
      {items.map((it, i) => {
        const angle = (360 / items.length) * i
        return (
          <div
            key={it.label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)` }}
          >
            <div className={reverse ? 'pl-orbit' : 'pl-orbit-rev'} style={{ '--dur': `${dur}s` }}>
              <div className="pl-glass -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3 text-xs">
                <Avatar who={it.who} label={<Icon name={it.who === 'h' ? 'person' : 'bot'} className="w-3.5 h-3.5" />} size="w-6 h-6" />
                {it.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HeroOrbit() {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 80, damping: 20 })
  const sry = useSpring(ry, { stiffness: 80, damping: 20 })
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[600px]"
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
    >
      <motion.div className="absolute inset-0 origin-center scale-[0.52] sm:scale-[0.85] md:scale-100" style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-[18%] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgb(var(--pl-h) / .16), rgb(var(--pl-a) / .12) 50%, transparent 70%)' }} />
        <OrbitRing items={ORBIT_INNER} radius={150} dur={48} />
        <OrbitRing items={ORBIT_OUTER} radius={255} dur={80} reverse />
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="absolute left-1/2 top-1/2 -ml-[78px] -mt-[78px] flex h-[156px] w-[156px] flex-col items-center justify-center rounded-[36px] pl-glass text-center"
          style={{ boxShadow: '0 0 80px -10px rgb(var(--pl-a) / .35), inset 0 1px 0 rgba(255,255,255,.08)' }}
        >
          <Icon name="hub" className="mb-2 h-8 w-8 text-[color:var(--pl-text)]" />
          <div className="pl-display text-lg font-semibold">SquadHub</div>
          <div className="pl-mono mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider pl-dim">
            <span className="pl-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--pl-live)', color: 'var(--pl-live)' }} />
            one workspace
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function SplitWords({ text, className = '', delay = 0 }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const CYCLE = ['accountant', 'designer', 'video editor', 'sales rep', 'HR manager', 'social manager']

function CyclingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % CYCLE.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex h-[1.625em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={CYCLE[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-block whitespace-nowrap font-medium text-[color:var(--pl-text)]"
        >
          {CYCLE[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-36 md:pt-44">
      <div className="pl-grid absolute inset-0 -z-0" />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.a
          href="#hub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="pl-glass mb-8 inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-4 text-[13px] pl-dim hover:text-[color:var(--pl-text)]"
        >
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-black" style={{ background: 'var(--pl-human)' }}>New</span>
          The hybrid workforce platform
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </motion.a>

        <h1 className="pl-display mx-auto max-w-5xl text-[44px] font-semibold leading-[0.98] sm:text-7xl md:text-[88px]">
          <SplitWords text="Hire people." />
          <br />
          <SplitWords text="Deploy agents." delay={0.2} />
          <br />
          <span className="pl-hand pl-gradient-text inline-block pr-2 text-[0.84em] leading-[1.15]">
            <SplitWords text="Run them as one squad." delay={0.45} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed pl-dim md:text-xl"
        >
          Hire a real person through <span className="pl-text-human">SquadHire</span>, deploy an AI employee through{' '}
          <span className="pl-text-agent">SquadBots</span> — or both. They work side by side in SquadHub, on apps built for
          every role. Your next <CyclingRole /> could be either.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="/signup/" primary>Build your squad</MagneticButton>
          <MagneticButton href="#how">See how it works</MagneticButton>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-2 md:mt-12">
        <HeroOrbit />
      </div>
    </section>
  )
}

function RoleMarquee() {
  const row = [...ROLES, ...ROLES]
  return (
    <div className="pl-marquee relative border-y py-5" style={{ borderColor: 'var(--pl-line)' }}>
      <div className="pl-marquee-track flex w-max gap-3">
        {row.map((r, i) => (
          <div key={i} className="pl-mono flex items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-wider pl-dim" style={{ borderColor: 'var(--pl-line)' }}>
            <span className="flex -space-x-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--pl-human)' }} />
              <span className="h-2.5 w-2.5 rounded-[30%]" style={{ background: 'var(--pl-agent)' }} />
            </span>
            {r}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Two doors: SquadHire + SquadBots                                   */
/* ------------------------------------------------------------------ */

// Bot availability as of Oct 2026 — update here when a bot changes stage.
const BOTS = [
  { name: 'Sales bot', status: 'live' },
  { name: 'Customer support bot', status: 'live' },
  { name: 'Social media manager bot', status: 'live' },
  { name: 'Ad specialist bot', status: 'live', note: 'Meta Ads now · more ad platforms soon' },
  { name: 'Accountant bot', status: 'live' },
  { name: 'Designer bot', status: 'beta' },
  { name: 'Video editor bot', status: 'beta' },
]

const STATUS_STYLE = {
  live: { label: 'Live', color: 'var(--pl-live)', bg: 'color-mix(in srgb, var(--pl-live) 12%, transparent)' },
  beta: { label: 'Beta', color: 'var(--pl-agent-ink)', bg: 'rgb(var(--pl-a) / .12)' },
  soon: { label: 'Coming soon', color: 'var(--pl-dim)', bg: 'var(--pl-soft-2)' },
  waitlist: { label: 'Waitlist', color: 'var(--pl-dim)', bg: 'var(--pl-soft-2)' },
}

function StatusPill({ status }) {
  const st = STATUS_STYLE[status]
  return (
    <span className="pl-mono inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[9.5px] uppercase tracking-wider" style={{ color: st.color, background: st.bg }}>
      {status === 'live' && <span className="pl-pulse h-1.5 w-1.5 rounded-full" style={{ background: st.color, color: st.color }} />}
      {st.label}
    </span>
  )
}

function DoorCard({ id, kind, title, kicker, desc, cta, href, delay, children }) {
  const h = kind === 'h'
  const fill = h ? 'var(--pl-human)' : 'var(--pl-agent)'
  const color = h ? 'var(--pl-human-ink)' : 'var(--pl-agent-ink)'
  return (
    <Reveal delay={delay} className="h-full">
      <div
        id={id}
        onMouseMove={spotHandlers}
        className="pl-spot pl-panel group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[28px] p-7 md:p-9"
        style={{
          '--spot': h ? 'rgb(var(--pl-h) / .07)' : 'rgb(var(--pl-a) / .08)',
          '--spot-edge': h ? 'rgb(var(--pl-h) / .5)' : 'rgb(var(--pl-a) / .55)',
        }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center text-black transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ background: fill, borderRadius: h ? 999 : 16 }}>
            <Icon name={h ? 'person' : 'bot'} className="h-7 w-7" />
          </div>
          <span className="pl-mono text-[11px] uppercase tracking-[0.2em]" style={{ color }}>{kicker}</span>
        </div>
        <h3 className="pl-display text-4xl font-semibold md:text-5xl">{title}</h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed pl-dim">{desc}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-auto pt-8">
          <a href={href} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color }}>
            {cta} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

// Mirrors the partner program's Services Directory (open vs waitlist squads),
// so both pages always agree on which humans can be hired today.
function HumanAvailability() {
  const groups = [
    { status: 'live', title: 'Hiring now', list: squads.filter((s) => PARTNER_SQUAD_MODE[s.id] === 'open') },
    { status: 'waitlist', title: 'Join the waitlist', list: squads.filter((s) => PARTNER_SQUAD_MODE[s.id] === 'waitlist') },
  ]
  const [openId, setOpenId] = useState(groups[0].list[0]?.id)
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.status}>
          <div className="pl-mono mb-2.5 flex items-center justify-between text-[10px] uppercase tracking-wider pl-faint">
            {g.title}
            <StatusPill status={g.status} />
          </div>
          <div className="space-y-2">
            {g.list.map((sq, i) => {
              const open = openId === sq.id
              const live = g.status === 'live'
              return (
                <motion.div
                  key={sq.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease }}
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: open ? 'rgb(var(--pl-h) / .45)' : 'var(--pl-line)', background: open ? 'rgb(var(--pl-h) / .06)' : 'var(--pl-soft)' }}
                >
                  <button
                    onClick={() => setOpenId(open ? null : sq.id)}
                    aria-expanded={open}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left ${live ? '' : 'opacity-70'}`}
                  >
                    <span className="flex items-center gap-2.5 text-[15px] font-medium">
                      <span>{sq.emoji}</span>
                      {sq.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="pl-mono text-[10px] pl-faint">{sq.products.length} roles</span>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="pl-dim">
                        <Icon name="plus" className="h-4 w-4" />
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        <div className="flex flex-wrap gap-1.5 px-4 pb-4">
                          {sq.products.map((p) => (
                            <span key={p.name} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--pl-line)', background: 'var(--pl-panel)' }}>
                              <span>{p.emoji}</span>{p.name}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function BotAvailability() {
  return (
    <ul className="space-y-2">
      {BOTS.map((b, i) => (
        <motion.li
          key={b.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
          className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3"
          style={{ borderColor: 'var(--pl-line)', background: 'var(--pl-soft)' }}
        >
          <span className="flex min-w-0 items-center gap-3">
            <Avatar who="a" label={<Icon name="bot" className="h-3.5 w-3.5" />} size="w-7 h-7" />
            <span className="min-w-0">
              <span className="block text-[15px] font-medium">{b.name}</span>
              {b.note && <span className="pl-mono block text-[10px] uppercase tracking-wider pl-faint">{b.note}</span>}
            </span>
          </span>
          <StatusPill status={b.status} />
        </motion.li>
      ))}
      <li className="pl-mono px-1 pt-2 text-[10px] uppercase tracking-wider pl-faint">More roles coming soon</li>
    </ul>
  )
}

function TwoDoors() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6 md:py-36">
      <Reveal className="mb-14 max-w-3xl">
        <Eyebrow>Two ways to staff any role</Eyebrow>
        <h2 className="pl-display text-4xl font-semibold leading-[1.02] md:text-6xl">
          Real humans or <span className="pl-hand pl-text-agent">AI employees.</span>
          <span className="pl-dim"> Same role, your call.</span>
        </h2>
      </Reveal>
      <div className="grid gap-5 md:grid-cols-2">
        <DoorCard
          id="humans"
          kind="h"
          kicker="via SquadHire"
          title="SquadHire"
          desc="Hire real, vetted people from our squads — full-time, part-time or by the task. They can bring in their own freelancers as the work grows."
          cta="Hire a human"
          href="/signup/"
          delay={0}
        >
          <HumanAvailability />
        </DoorCard>
        <DoorCard
          id="agents"
          kind="a"
          kicker="via SquadBots"
          title="SquadBots"
          desc="Deploy AI employees trained for a role. They log in to the same apps, work around the clock, and can spin up sub-agents for bigger jobs."
          cta="Deploy an agent"
          href="/signup/"
          delay={0.12}
        >
          <BotAvailability />
        </DoorCard>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Bring your own AI provider                                         */
/* ------------------------------------------------------------------ */

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', dot: '#10a37f' },
  { id: 'anthropic', name: 'Anthropic', dot: '#d97757' },
  { id: 'google', name: 'Google', dot: '#4285f4' },
  { id: 'deepseek', name: 'DeepSeek', dot: '#4d6bfe' },
  { id: 'glm', name: 'GLM', dot: '#7c5cff' },
]

function Providers() {
  const [mode, setMode] = useState('mix')
  const [single, setSingle] = useState('anthropic')
  const [perBot, setPerBot] = useState(() =>
    Object.fromEntries(BOTS.map((b, i) => [b.name, PROVIDERS[i % PROVIDERS.length].id]))
  )
  const pick = (bot, pid) => {
    if (mode === 'one') setSingle(pid)
    else setPerBot((m) => ({ ...m, [bot]: pid }))
  }
  return (
    <section id="providers" className="relative scroll-mt-20 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--pl-line-strong), transparent)' }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>Bring your own AI</Eyebrow>
            <h2 className="pl-display text-4xl font-semibold leading-[1.02] md:text-6xl">
              Your bots. <span className="pl-hand pl-text-agent">Your models.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed pl-dim">
              SquadBots don&apos;t lock you in to one AI. Connect the providers you trust — OpenAI, Anthropic, Google, DeepSeek or
              GLM — then give each bot the model you think is best, or run the whole squad on one.
            </p>
            <ul className="mt-8 space-y-3 text-[15px]">
              {['Pick a provider per bot, or one for all', 'Switch providers whenever you like', 'The control stays fully with you'].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgb(var(--pl-a) / .14)', color: 'var(--pl-agent-ink)' }}>
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pl-panel overflow-hidden rounded-[24px]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5" style={{ borderColor: 'var(--pl-line)' }}>
                <span className="pl-mono text-xs pl-dim">squadbots / settings / models</span>
                <div className="relative inline-flex rounded-full p-1" style={{ background: 'var(--pl-soft-2)' }} role="tablist" aria-label="Provider mode">
                  {[['mix', 'Mix per bot'], ['one', 'One for all']].map(([id, label]) => (
                    <button
                      key={id}
                      role="tab"
                      aria-selected={mode === id}
                      onClick={() => setMode(id)}
                      className={`relative z-10 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${mode === id ? 'text-[color:var(--pl-bg)]' : 'pl-dim'}`}
                    >
                      {mode === id && (
                        <motion.span layoutId="pl-prov-mode" className="absolute inset-0 -z-10 rounded-full" style={{ background: 'var(--pl-text)' }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                      )}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {mode === 'one' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden border-b"
                    style={{ borderColor: 'var(--pl-line)' }}
                  >
                    <div className="flex flex-wrap items-center gap-2 px-5 py-4">
                      <span className="mr-1 text-sm pl-dim">Run every bot on</span>
                      {PROVIDERS.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSingle(p.id)}
                          className="relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                          style={{ borderColor: single === p.id ? 'var(--pl-text)' : 'var(--pl-line)' }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: p.dot }} />
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ul className="divide-y" style={{ borderColor: 'var(--pl-line)' }}>
                {BOTS.map((b) => {
                  const current = mode === 'one' ? single : perBot[b.name]
                  const prov = PROVIDERS.find((p) => p.id === current)
                  return (
                    <li key={b.name} className="flex flex-col gap-3 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--pl-line)' }}>
                      <span className="flex items-center gap-3">
                        <Avatar who="a" label={<Icon name="bot" className="h-3.5 w-3.5" />} size="w-7 h-7" />
                        <span className="text-sm font-medium">{b.name}</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={current}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="pl-mono hidden text-[10px] uppercase tracking-wider pl-faint md:inline"
                          >
                            → {prov.name}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {PROVIDERS.map((p) => {
                          const on = current === p.id
                          return (
                            <button
                              key={p.id}
                              onClick={() => pick(b.name, p.id)}
                              aria-pressed={on}
                              aria-label={`Run ${b.name} on ${p.name}`}
                              className={`relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors ${on ? 'font-medium' : 'pl-dim hover:text-[color:var(--pl-text)]'}`}
                            >
                              {on && (
                                <motion.span
                                  layoutId={`pl-prov-${b.name}`}
                                  className="absolute inset-0 -z-0 rounded-full border"
                                  style={{ borderColor: p.dot, background: `color-mix(in srgb, ${p.dot} 12%, transparent)` }}
                                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                />
                              )}
                              <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: p.dot }} />
                              <span className="relative">{p.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <p className="pl-mono mt-3 text-[10px] uppercase tracking-wider pl-faint">Interactive preview — try switching providers</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SquadHub: flow diagram + live board                                */
/* ------------------------------------------------------------------ */

function FlowDiagram() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: 0.3 + i * 0.2, ease } }),
  }
  const node = (x, y, w, label, sub, color, icon, i) => (
    <motion.g
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease }}
    >
      <rect x={x - w / 2} y={y - 30} width={w} height={60} rx={16} style={{ fill: 'var(--pl-card)', stroke: color || 'var(--pl-line-strong)' }} />
      <foreignObject x={x - w / 2} y={y - 30} width={w} height={60}>
        <div className="flex h-full items-center justify-center gap-2.5 px-3" style={{ color: color || 'var(--pl-text)' }}>
          <Icon name={icon} className="h-5 w-5 shrink-0" />
          <div className="text-left leading-tight">
            <div className="pl-display text-[15px] font-semibold" style={{ color: 'var(--pl-text)' }}>{label}</div>
            <div className="pl-mono text-[9.5px] uppercase tracking-wider" style={{ color: 'var(--pl-dim)' }}>{sub}</div>
          </div>
        </div>
      </foreignObject>
    </motion.g>
  )
  return (
    <svg viewBox="0 0 720 360" className="h-auto w-full" role="img" aria-label="Your business hires humans through SquadHire and deploys agents through SquadBots; both work together in SquadHub">
      {[
        'M360 70 C360 120 180 110 180 170',
        'M360 70 C360 120 540 110 540 170',
        'M180 200 C180 260 360 250 360 300',
        'M540 200 C540 260 360 250 360 300',
      ].map((d, i) => {
        const ink = i % 2 === 0 ? 'var(--pl-human-ink)' : 'var(--pl-agent-ink)'
        return (
          <g key={d}>
            <motion.path d={d} fill="none" style={{ stroke: ink }} strokeWidth="1.5" variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} />
            <path d={d} fill="none" style={{ stroke: ink }} strokeOpacity=".5" strokeWidth="1.5" className="pl-flow" />
          </g>
        )
      })}
      {node(360, 40, 200, 'Your business', 'needs work done', null, 'spark', 0)}
      {node(180, 185, 200, 'SquadHire', 'hire humans', 'var(--pl-human-ink)', 'person', 1)}
      {node(540, 185, 200, 'SquadBots', 'deploy agents', 'var(--pl-agent-ink)', 'bot', 2)}
      {node(360, 318, 220, 'SquadHub', 'they work together', 'var(--pl-text)', 'hub', 3)}
    </svg>
  )
}

function LiveBoard() {
  const reduce = useReducedMotion()
  const [tasks, setTasks] = useState(() => BOARD_TASKS.map((t, i) => ({ ...t, col: i % 4 })))
  const cursor = useRef(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => {
      setTasks((prev) => {
        const next = prev.slice()
        const k = cursor.current % next.length
        cursor.current += 1
        next[k] = { ...next[k], col: (next[k].col + 1) % 4 }
        return next
      })
    }, 1600)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div className="pl-panel overflow-hidden rounded-[24px]">
      <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--pl-line)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--pl-line-strong)]" /><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--pl-line-strong)]" /><span className="h-2.5 w-2.5 rounded-full bg-[color:var(--pl-line-strong)]" />
          </div>
          <span className="pl-mono text-xs pl-dim">squadhub / acme-co / board</span>
        </div>
        <span className="pl-mono flex items-center gap-2 text-[10px] uppercase tracking-wider" style={{ color: 'var(--pl-live)' }}>
          <span className="pl-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--pl-live)' }} /> live
        </span>
      </div>
      <LayoutGroup>
        <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4">
          {BOARD_COLS.map((c, ci) => (
            <div key={c} className="min-h-[150px] rounded-2xl bg-[color:var(--pl-soft)] p-2.5 lg:min-h-[260px]">
              <div className="pl-mono mb-2.5 flex items-center justify-between px-1 text-[10px] uppercase tracking-wider pl-faint">
                {c}
                <span>{tasks.filter((t) => t.col === ci).length}</span>
              </div>
              <div className="space-y-2">
                {tasks.filter((t) => t.col === ci).map((t) => (
                  <motion.div
                    layout
                    layoutId={t.id}
                    key={t.id}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="rounded-xl border bg-[var(--pl-card)] p-3"
                    style={{ borderColor: ci === 3 ? 'rgba(94,242,160,.25)' : 'var(--pl-line)' }}
                  >
                    <div className="text-[13px] font-medium leading-snug">{t.title}</div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="pl-mono truncate text-[9.5px] uppercase tracking-wider pl-faint">{t.app}</span>
                      <Avatar who={t.who} label={t.av} size="w-6 h-6 text-[8.5px]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </div>
  )
}

function HiresOwn() {
  const items = [
    { lead: { who: 'h', av: 'MY', name: 'Maya', role: 'Designer · hired via SquadHire' }, subs: [{ who: 'h', av: 'F1', name: 'Freelance illustrator' }, { who: 'a', av: 'CV', name: 'Canvas · resize bot' }], verb: 'brought in' },
    { lead: { who: 'a', av: 'LG', name: 'Ledger', role: 'Accountant bot · via SquadBots' }, subs: [{ who: 'a', av: 'RC', name: 'Reconciler sub-agent' }, { who: 'h', av: 'CA', name: 'Freelance CA for sign-off' }], verb: 'spun up' },
  ]
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((it, k) => (
        <Reveal key={it.lead.name} delay={k * 0.1}>
          <div className="pl-panel rounded-[24px] p-6">
            <div className="flex items-center gap-3">
              <Avatar who={it.lead.who} label={it.lead.av} size="w-11 h-11 text-xs" />
              <div>
                <div className="pl-display text-lg font-semibold">{it.lead.name}</div>
                <div className="text-xs pl-dim">{it.lead.role}</div>
              </div>
            </div>
            <div className="relative ml-5 mt-2 border-l border-dashed pl-7 pt-3" style={{ borderColor: 'var(--pl-line-strong)' }}>
              <div className="pl-mono mb-3 text-[10px] uppercase tracking-wider pl-faint">{it.verb}</div>
              {it.subs.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease }}
                  className="relative mb-2.5 flex items-center justify-between rounded-xl border bg-[color:var(--pl-soft)] px-3 py-2.5"
                  style={{ borderColor: 'var(--pl-line)' }}
                >
                  <span className="absolute -left-7 top-1/2 h-px w-7 border-t border-dashed" style={{ borderColor: 'var(--pl-line-strong)' }} />
                  <span className="flex items-center gap-2.5 text-sm">
                    <Avatar who={s.who} label={s.av} size="w-7 h-7 text-[9px]" />
                    {s.name}
                  </span>
                  <Badge who={s.who} />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Hub() {
  return (
    <section id="hub" className="relative scroll-mt-20 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--pl-line-strong), transparent)' }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Eyebrow>SquadHub</Eyebrow>
            <h2 className="pl-display text-4xl font-semibold leading-[1.02] md:text-6xl">
              One workspace where <span className="pl-hand pl-text-human">people</span> and <span className="pl-hand pl-text-agent">agents</span> share the work.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed pl-dim">
              Whoever you hired — human, agent, or both — lands in SquadHub. Tasks, files, approvals and hand-offs live in one
              place, so an agent can draft and a person can sign off without anything falling through the cracks.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <FlowDiagram />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <LiveBoard />
        </Reveal>

        <div className="mt-24 mb-10 max-w-3xl">
          <Reveal>
            <Eyebrow>Your squad can grow itself</Eyebrow>
            <h3 className="pl-display text-3xl font-semibold leading-tight md:text-5xl">
              Humans and agents can hire <span className="pl-hand">their own</span> help.
            </h3>
            <p className="mt-5 text-lg pl-dim">
              A designer can bring in freelancers. An accountant bot can spin up sub-agents. Everyone they add works inside the same
              SquadHub — so you always see who&apos;s doing what.
            </p>
          </Reveal>
        </div>
        <HiresOwn />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Apps explorer                                                      */
/* ------------------------------------------------------------------ */

const MODES = [
  { id: 'human', label: 'Human', icon: 'person' },
  { id: 'agent', label: 'Agent', icon: 'bot' },
  { id: 'both', label: 'Together', icon: 'hub' },
]

function TypingLine({ text, start }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) return
    setN(0)
    let i = 0
    let t
    const s = setTimeout(() => {
      t = setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) clearInterval(t)
      }, 18)
    }, start)
    return () => { clearTimeout(s); clearInterval(t) }
  }, [text, start, reduce])
  return <span className={n < text.length && n > 0 ? 'pl-caret' : ''}>{text.slice(0, n) || ' '}</span>
}

function FeedList({ app, mode, compact }) {
  const feed = app.feed[mode]
  return (
    <AnimatePresence mode="wait">
      <motion.ol
        key={app.id + mode}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
        variants={{ show: { transition: { staggerChildren: 0.55 } } }}
        className={`relative ${compact ? 'space-y-2' : 'space-y-3'}`}
      >
        {feed.map((f, i) => (
          <motion.li
            key={i}
            variants={{ hidden: { opacity: 0, y: 12, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } } }}
            className={`flex gap-3 rounded-2xl border bg-[color:var(--pl-soft)] ${compact ? 'p-2.5' : 'p-3.5'}`}
            style={{ borderColor: f.who === 'h' ? 'rgb(var(--pl-h) / .25)' : 'rgb(var(--pl-a) / .25)' }}
          >
            <Avatar who={f.who} label={<Icon name={f.who === 'h' ? 'person' : 'bot'} className="h-4 w-4" />} size={compact ? 'w-7 h-7' : undefined} />
            <div className="min-w-0 flex-1">
              <span className={`${compact ? 'text-[11px]' : 'text-xs'} pl-dim`}>{f.name}</span>
              <div className={`mt-0.5 leading-snug ${compact ? 'text-[13px]' : 'text-[14px]'}`}>
                <TypingLine text={f.text} start={i * 550 + 150} />
              </div>
            </div>
            {!compact && <span className="pl-mono hidden shrink-0 self-start text-[10px] pl-faint sm:block">just now</span>}
          </motion.li>
        ))}
      </motion.ol>
    </AnimatePresence>
  )
}

// Real product screenshots: save to /public/platform/apps/ and set the app's
// `shot` field (e.g. shot: '/platform/apps/books.png'). Without one, the window
// shows the illustrated mock instead.
function AppWindow({ app, mode }) {
  const feed = app.feed[mode]
  const shot = app.shot
  return (
    <div className="pl-panel relative overflow-hidden rounded-[24px]">
      <div className="flex items-center justify-between gap-3 border-b px-5 py-3.5" style={{ borderColor: 'var(--pl-line)' }}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--pl-text)] text-[color:var(--pl-bg)]"><Icon name={app.icon} className="h-4 w-4" /></span>
          <span className="pl-display font-semibold">{app.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {app.url && <span className="pl-mono hidden truncate rounded-full bg-[color:var(--pl-soft-2)] px-3 py-1 text-[11px] pl-dim md:block">{app.url}</span>}
          <span className="pl-mono text-[9.5px] uppercase tracking-wider pl-faint">Agent</span>
          <StatusPill status={app.agentStatus} />
        </div>
      </div>
      {shot ? (
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={shot}
              src={shot}
              alt={`${app.name} screenshot`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="block aspect-[16/10] w-full object-cover object-top"
            />
          </AnimatePresence>
          <div className="pl-glass absolute bottom-3 right-3 w-[min(340px,calc(100%-24px))] rounded-2xl p-3 shadow-[var(--pl-shadow)]">
            <div className="pl-mono mb-2 flex items-center gap-2 px-1 text-[10px] uppercase tracking-wider pl-faint">
              <span className="pl-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--pl-live)', color: 'var(--pl-live)' }} /> Live on this desk
            </div>
            <FeedList app={app} mode={mode} compact />
          </div>
        </div>
      ) : (
        <div className="grid min-h-[340px] grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr]">
          <div className="border-r p-3" style={{ borderColor: 'var(--pl-line)' }}>
            {app.nav.map((n, i) => (
              <div key={n} className={`mb-1 rounded-lg px-3 py-2 text-[13px] ${i === 0 ? 'bg-[color:var(--pl-soft-2)] text-[color:var(--pl-text)]' : 'pl-dim'}`}>{n}</div>
            ))}
            <div className="pl-mono mt-6 px-3 text-[9.5px] uppercase tracking-wider pl-faint">On this desk</div>
            <div className="mt-2 flex gap-1.5 px-3">
              {(mode === 'human' || mode === 'both') && <Avatar who="h" label={feed.find((f) => f.who === 'h')?.name.slice(0, 2).toUpperCase()} size="w-7 h-7 text-[9px]" />}
              {(mode === 'agent' || mode === 'both') && <Avatar who="a" label={feed.find((f) => f.who === 'a')?.name.slice(0, 2).toUpperCase()} size="w-7 h-7 text-[9px]" />}
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="pl-mono mb-4 flex items-center gap-2 text-[10px] uppercase tracking-wider pl-faint">
              <span className="pl-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--pl-live)', color: 'var(--pl-live)' }} /> Activity
            </div>
            <FeedList app={app} mode={mode} />
          </div>
        </div>
      )}
    </div>
  )
}

function Apps() {
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState('both')
  const [touched, setTouched] = useState(false)
  const app = APPS[active]

  // Gently auto-advance through the apps until the visitor takes over.
  useEffect(() => {
    if (touched) return
    const t = setTimeout(() => setActive((a) => (a + 1) % APPS.length), 6000)
    return () => clearTimeout(t)
  }, [active, touched])

  return (
    <section id="apps" className="relative scroll-mt-20 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--pl-line-strong), transparent)' }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow>The Squad apps</Eyebrow>
            <h2 className="pl-display text-4xl font-semibold leading-[1.02] md:text-6xl">
              A desk for every role. <span className="pl-hand pl-dim">Anyone can sit at it.</span>
            </h2>
            <p className="mt-5 text-lg pl-dim">
              Each app is built for one job. Put a person on it, an agent on it, or both — and watch the work change.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pl-glass relative inline-flex rounded-full p-1" role="tablist" aria-label="Who is working">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={mode === m.id}
                  onClick={() => { setMode(m.id); setTouched(true) }}
                  className={`relative z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${mode === m.id ? 'text-black' : 'pl-dim hover:text-[color:var(--pl-text)]'}`}
                >
                  {mode === m.id && (
                    <motion.span
                      layoutId="pl-mode-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ background: m.id === 'human' ? 'var(--pl-human)' : m.id === 'agent' ? 'var(--pl-agent)' : 'linear-gradient(90deg, var(--pl-human), var(--pl-agent))' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon name={m.icon} className="h-4 w-4" />
                  {m.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0" role="tablist" aria-label="Squad apps">
            {APPS.map((a, i) => {
              const on = i === active
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setActive(i); setTouched(true) }}
                  onMouseMove={spotHandlers}
                  className={`pl-spot relative min-w-[240px] overflow-hidden rounded-2xl border p-4 text-left transition-colors lg:min-w-0 ${on ? 'bg-[color:var(--pl-soft-2)]' : 'hover:bg-[color:var(--pl-soft)]'}`}
                  style={{ borderColor: on ? 'var(--pl-line-strong)' : 'var(--pl-line)' }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${on ? 'bg-[color:var(--pl-text)] text-[color:var(--pl-bg)]' : 'bg-[color:var(--pl-soft-2)] text-[color:var(--pl-text)]'}`}>
                      <Icon name={a.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <div className="flex-1">
                      <div className="pl-display font-semibold">{a.name}</div>
                      <div className="text-xs pl-dim">{a.role}</div>
                    </div>
                    <span
                      className="pl-mono rounded-full px-2 py-0.5 text-[9.5px] uppercase tracking-wider"
                      style={a.status === 'Live'
                        ? { color: 'var(--pl-live)', background: 'rgba(94,242,160,.08)' }
                        : { color: 'var(--pl-dim)', background: 'var(--pl-soft-2)' }}
                    >
                      {a.status}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="hidden overflow-hidden lg:block"
                      >
                        <p className="pt-3 text-[13px] leading-relaxed pl-dim">{a.blurb}</p>
                        {a.extra && <p className="pl-mono pt-2 text-[10px] uppercase tracking-wider pl-text-human">+ {a.extra}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {on && !touched && (
                    <motion.span
                      key={`bar-${active}`}
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ background: 'linear-gradient(90deg, var(--pl-human), var(--pl-agent))' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <div>
            <AppWindow app={app} mode={mode} />
            <p className="mt-4 text-sm pl-dim lg:hidden">{app.blurb}{app.extra ? ` (${app.extra}.)` : ''}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  How it works + CTA                                                 */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Pick the role', text: 'Accountant, designer, video editor, social manager, HR or sales — start with the job, not the tool.' },
    { n: '02', title: 'Choose who does it', text: 'A real person from SquadHire, an AI agent from SquadBots, or a pair that works together.' },
    { n: '03', title: 'Work happens in one place', text: 'They show up in SquadHub and the role’s Squad app. You see every task, hand-off and result.' },
  ]
  return (
    <section id="how" className="relative scroll-mt-20 py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--pl-line-strong), transparent)' }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="pl-display text-4xl font-semibold leading-[1.02] md:text-6xl">Three steps to a squad.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="h-full">
              <div onMouseMove={spotHandlers} className="pl-spot pl-panel group h-full rounded-[24px] p-7">
                <div className="pl-hand text-6xl leading-none pl-faint transition-colors duration-500 group-hover:text-[color:var(--pl-text)]">{s.n}</div>
                <h3 className="pl-display mt-10 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed pl-dim">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border px-6 py-20 text-center md:py-28" style={{ borderColor: 'var(--pl-line-strong)' }}>
          <div className="pl-grid absolute inset-0" />
          <div className="absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[110px]" style={{ background: 'rgb(var(--pl-h) / .18)' }} />
          <div className="absolute -right-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[110px]" style={{ background: 'rgb(var(--pl-a) / .2)' }} />
          <div className="relative">
            <h2 className="pl-display mx-auto max-w-3xl text-5xl font-semibold leading-[0.98] md:text-7xl">
              Build your squad. <span className="pl-hand pl-gradient-text">Half human, half machine,</span> fully yours.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg pl-dim">Tell us the roles you need — we&apos;ll help you staff them with people, agents, or both.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/signup/" primary>Get started</MagneticButton>
              <MagneticButton href="/contact/">Talk to us</MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t px-4 py-10 sm:px-6" style={{ borderColor: 'var(--pl-line)' }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm pl-dim md:flex-row">
        <span className="pl-display font-semibold text-[color:var(--pl-text)]">UpSquad</span>
        <span className="pl-mono text-xs">SquadHire · SquadBots · SquadHub · Squad Books · SMM Studio · Squad Payroll · Squad CRM</span>
        <span>© {new Date().getFullYear()} UpSquad</span>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */

export default function PlatformLanding() {
  return (
    <div className="relative">
      <div className="pl-grain" aria-hidden />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <RoleMarquee />
        <TwoDoors />
        <Hub />
        <Apps />
        <Providers />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
