'use client'

import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'
import PosterStudio from '../components/dream-team/PosterStudio'
import { COPY, PARTNER_HREF, WHATSAPP_HREF } from '../components/dream-team/copy'

const TICKER = [
  'Open call',
  'Video editor',
  'Designer',
  '₹10K – 1 Lakh',
  'Partner program',
  'Connect with us in WhatsApp',
]

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="relative overflow-hidden border-y border-black/[0.08] dark:border-white/10 bg-white dark:bg-surface-primary">
      <div className="dream-ticker flex w-max gap-10 py-3 pr-10">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-primary">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function DreamTeam() {
  return (
    <div>
      <style>{`
        @keyframes dreamTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .dream-ticker { animation: dreamTicker 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .dream-ticker { animation: none; }
        }
      `}</style>

      <section className="relative pt-32 pb-16 px-5 sm:px-8 overflow-hidden bg-[radial-gradient(130%_120%_at_50%_-10%,#FFFFFF_0%,#F4F4F5_52%,#E9E9EC_100%)] dark:bg-[radial-gradient(130%_120%_at_50%_-10%,#1A1A1A_0%,#121212_52%,#0B0B0B_100%)]">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(10,10,10,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.06)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(118%_88%_at_50%_-4%,#000_42%,transparent_82%)]" />

        <div className="relative max-w-[1160px] mx-auto">
          <nav className="mb-6 text-xs font-mono tracking-[0.14em] uppercase text-text-muted">
            <Link href="/studio" className="hover:text-text-primary transition-colors">
              Studio
            </Link>
            <span className="mx-2 text-text-muted/50">/</span>
            <span className="text-text-primary">Dream Team</span>
          </nav>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-white/80 backdrop-blur-sm border border-black/[0.07] px-3.5 py-1.5 rounded-full mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFF99] opacity-80 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
            </span>
            Open call · Video editors &amp; designers
          </div>

          <h1 className="font-heading text-[2.15rem] sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-[-0.035em] text-text-primary max-w-4xl text-balance">
            {COPY.kicker}{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{COPY.wantIn}</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-[#FFFF99] -z-0 rounded-sm" aria-hidden="true" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed pr-1">
            If you cut film or shape brands, the {COPY.program} is hiring partners.
            Regular work. Regular pay. {COPY.income} a month, depending on the clients we assign you.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-6 py-3 rounded-full"
            >
              Connect with us in WhatsApp · {COPY.phoneDisplay}
            </a>
            <Link
              href={PARTNER_HREF}
              className="inline-flex items-center gap-2 btn-secondary font-semibold text-sm px-6 py-3 rounded-full"
            >
              Read the partner program
            </Link>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="bg-[#0A0A0A] text-white px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-6">
          {[
            { code: '01', title: 'Video Editor', body: 'You cut. We bring the briefs, the clients, and the calendar.' },
            { code: '02', title: 'Designer', body: 'You design. A squad manager handles the rest of the noise.' },
          ].map((role) => (
            <div key={role.code} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-9">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#FFFF99] mb-4">Scene {role.code} · Open</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">{role.title}</h2>
              <p className="text-white/70 leading-relaxed">{role.body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-[1160px] mx-auto mt-6 rounded-2xl bg-[#FFFF99] text-[#0A0A0A] p-7 sm:p-9 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3">The arrangement</p>
            <p className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-none">{COPY.income}</p>
            <p className="mt-3 text-sm sm:text-base text-black/70 max-w-md">
              Regular monthly income through the partner program — not a one-off gig, not a pitch contest.
            </p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#0A0A0A] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-black"
          >
            Connect with us in WhatsApp
          </a>
        </div>
      </section>

      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1160px] mx-auto grid md:grid-cols-3 gap-6">
          {[
            { n: '01', t: 'We sell', d: 'Leads, pitches, and client chat stay on our desk.' },
            { n: '02', t: 'You make', d: 'Design and edit on hours you set. Full-time or part-time.' },
            { n: '03', t: 'You get paid', d: 'Monthly, for the clients assigned to you. No invoice chasing.' },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-surface-primary p-6">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted mb-4">{step.n}</p>
              <h3 className="font-heading text-xl font-bold mb-2">{step.t}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="posters" className="px-5 sm:px-8 pb-24 scroll-mt-32">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <p className="text-label text-text-muted mb-3">Meta ads</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-3">
              Three posters. Four sizes.
            </h2>
            <p className="text-text-secondary max-w-2xl mb-10 leading-relaxed">
              Same call, three looks — a production call sheet, a highlighter brief, and a classified want-ad.
              Download PNGs sized for Stories/Reels (9:16), feed portrait (4:5), square (1:1), and landscape (1.91:1).
            </p>
          </ScrollReveal>
          <PosterStudio />
        </div>
      </section>
    </div>
  )
}
