'use client'

import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'
import PosterStudio from '../components/content-squad/PosterStudio'
import { COPY, JOBS_HREF, PARTNER_HREF, ROLES, WHATSAPP_HREF } from '../components/content-squad/copy'

const TICKER = ['Content squad', 'Freelance', 'Jobs', ...ROLES.map((r) => r.label), 'Connect with us in WhatsApp']

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="relative overflow-hidden border-y border-black/[0.08] dark:border-white/10 bg-white dark:bg-surface-primary">
      <div className="content-ticker flex w-max gap-10 py-3 pr-10">
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

export default function ContentSquad() {
  return (
    <div>
      <style>{`
        @keyframes contentTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .content-ticker { animation: contentTicker 36s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .content-ticker { animation: none; }
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
            <span className="text-text-primary">Content Squad</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-white/80 backdrop-blur-sm border border-black/[0.07] px-3.5 py-1.5 rounded-full mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFF99] opacity-80 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
            </span>
            Open call · Freelance &amp; jobs
          </div>

          <h1 className="font-heading text-[2.15rem] sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-[-0.035em] text-text-primary max-w-4xl text-balance">
            {COPY.headline}{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{COPY.kicker}</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-[#FFFF99] -z-0 rounded-sm" aria-hidden="true" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed pr-1">{COPY.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-gradient font-semibold text-sm px-6 py-3 rounded-full"
            >
              Connect with us in WhatsApp · {COPY.phoneDisplay}
            </a>
            <Link href={PARTNER_HREF} className="inline-flex items-center gap-2 btn-secondary font-semibold text-sm px-6 py-3 rounded-full">
              Freelance · partner program
            </Link>
            <Link href={JOBS_HREF} className="inline-flex items-center gap-2 btn-secondary font-semibold text-sm px-6 py-3 rounded-full">
              Jobs
            </Link>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="bg-[#0A0A0A] text-white px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-[1160px] mx-auto mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#FFFF99] mb-3">The seats</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Eight roles. One squad.</h2>
          </div>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed">
            Same roster whether you want assigned clients as a partner, or a role on a team.
          </p>
        </div>
        <div className="max-w-[1160px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ROLES.map((role) => (
            <div key={role.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#FFFF99] mb-3">{role.n}</p>
              <h3 className="font-heading text-xl font-extrabold tracking-tight text-white leading-tight">{role.label}</h3>
            </div>
          ))}
        </div>

        <div className="max-w-[1160px] mx-auto mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FFFF99] text-[#0A0A0A] p-7 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3">Path 01</p>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Freelance</h3>
            <p className="text-sm text-black/70 leading-relaxed mb-5">
              Partner program. We find the clients. You make the work. Hours you set.
            </p>
            <Link href={PARTNER_HREF} className="inline-flex items-center justify-center bg-[#0A0A0A] text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-black">
              Partner program
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#FFFF99] mb-3">Path 02</p>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Jobs</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Full-time and part-time roles through UpSquad. Connect with us in WhatsApp.
            </p>
            <Link href={JOBS_HREF} className="inline-flex items-center justify-center bg-white text-[#0A0A0A] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#FFFF99]">
              See jobs
            </Link>
          </div>
        </div>
      </section>

      <section id="posters" className="px-5 sm:px-8 py-16 sm:pb-24 scroll-mt-32">
        <div className="max-w-[1160px] mx-auto">
          <ScrollReveal>
            <p className="text-label text-text-muted mb-3">Meta ads</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary mb-3">
              Three posters. Four sizes.
            </h2>
            <p className="text-text-secondary max-w-2xl mb-10 leading-relaxed">
              Same invitation, three looks — a numbered roster, a two-path brief, and a paper lineup.
              All eight seats, freelance and jobs, sized for Stories/Reels, feed, square, and landscape.
            </p>
          </ScrollReveal>
          <PosterStudio />
        </div>
      </section>
    </div>
  )
}
