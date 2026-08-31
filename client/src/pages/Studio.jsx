'use client'

import Link from 'next/link'
import { STUDIO_PAGES } from '../data/studioPages'

function AccentPreview({ accent }) {
  if (accent === 'yellow') {
    return (
      <div className="relative h-44 sm:h-52 overflow-hidden bg-[#FFFF99] text-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#0A0A0A_0.6px,transparent_0.7px)] bg-[length:4px_4px] opacity-[0.06]" />
        <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
          <p className="font-heading font-extrabold text-[11px] tracking-tight mb-2">Are you a</p>
          <p className="inline-flex self-start bg-[#0A0A0A] text-[#FFFF99] font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none px-2.5 py-1.5">
            Freelancer?
          </p>
        </div>
      </div>
    )
  }

  if (accent === 'ink') {
    return (
      <div className="relative h-44 sm:h-52 overflow-hidden bg-[#0A0A0A] text-white">
        <div className="relative h-full flex flex-col justify-end p-5 sm:p-6">
          <div className="flex gap-1.5 mb-3">
            <span className="font-mono text-[10px] tracking-wider uppercase bg-[#FFFF99] text-[#0A0A0A] px-2 py-0.5 font-bold">
              Freelance
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase bg-[#FFFF99] text-[#0A0A0A] px-2 py-0.5 font-bold">
              Jobs
            </span>
          </div>
          <p className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight leading-none">
            Content
            <br />
            squad.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-44 sm:h-52 bg-[#0A0A0A] text-white flex items-end p-5 sm:p-6">
      <p className="font-heading font-extrabold text-2xl tracking-tight">UpSquad</p>
    </div>
  )
}

function PageCard({ page, index }) {
  const live = page.status === 'live'
  const inner = (
    <>
      <AccentPreview accent={page.accent} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-muted">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded-full ${
              live
                ? 'bg-[#0A0A0A] text-[#FFFF99]'
                : 'bg-black/[0.04] dark:bg-white/10 text-text-secondary'
            }`}
          >
            {live ? 'Live' : 'Soon'}
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-text-muted mb-1.5">
          {page.kicker}
        </p>
        <h2 className="font-heading text-2xl font-extrabold tracking-tight text-text-primary mb-2">
          {page.title}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">{page.blurb}</p>
        <div className="flex flex-wrap gap-1.5">
          {(page.formats || []).map((f) => (
            <span
              key={f}
              className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-md border border-black/[0.08] dark:border-white/10 text-text-muted"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  const frame =
    'group block rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/10 bg-white dark:bg-surface-primary shadow-sm hover:shadow-card-hover hover:border-black/25 dark:hover:border-white/25 transition-all duration-short'

  if (!live || !page.href) {
    return <article className={`${frame} opacity-70`}>{inner}</article>
  }

  return (
    <Link href={page.href} className={frame}>
      {inner}
    </Link>
  )
}

export default function Studio() {
  const liveCount = STUDIO_PAGES.filter((p) => p.status === 'live').length

  return (
    <section className="relative pt-32 pb-24 px-5 sm:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(10,10,10,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.06)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(118%_88%_at_50%_-4%,#000_42%,transparent_82%)]" />

      <div className="relative max-w-[1160px] mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-text-primary bg-white/80 backdrop-blur-sm border border-black/[0.07] px-3.5 py-1.5 rounded-full mb-7 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFFF99] opacity-80 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FFFF99] ring-1 ring-black/20" />
          </span>
          Studio · {liveCount} live {liveCount === 1 ? 'page' : 'pages'}
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold leading-[0.98] tracking-[-0.035em] text-text-primary max-w-3xl">
          Every campaign
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">in one place.</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-[#FFFF99] -z-0 rounded-sm" aria-hidden="true" />
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
          Landing pages and Meta ad posters. Open a page to view it, download assets, or come back here when the next one ships.
        </p>

        <div className={`mt-12 grid gap-5 ${STUDIO_PAGES.length > 1 ? 'sm:grid-cols-2' : 'max-w-[540px]'}`}>
          {STUDIO_PAGES.map((page, i) => (
            <PageCard key={page.id} page={page} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
