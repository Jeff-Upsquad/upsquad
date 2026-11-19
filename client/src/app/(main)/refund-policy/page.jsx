import Link from 'next/link'
import DownloadRefundPolicyButton from '../../../components/legal/DownloadRefundPolicyButton'
import { refundPolicy, REFUND_POLICY_UPDATED, REFUND_POLICY_UPDATED_ISO } from '../../../data/refundPolicy'

export const metadata = {
  title: 'First Month Refund Policy',
  description:
    "UpSquad's No Questions Asked first-month refund policy for selected customers: a 100% refund during the first 15 days, or 50% at the end of month one.",
  alternates: { canonical: '/refund-policy/' },
}

const contents = [
  { id: 'guarantee', title: '100% Satisfaction Guarantee' },
  { id: 'how-it-works', title: 'How It Works' },
  { id: 'refund-processing', title: 'Refund Processing' },
  { id: 'terms', title: 'Terms & Conditions' },
]

export default function RefundPolicy() {
  return (
    <article className="px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">UpSquad · Legal</p>

        <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
              {refundPolicy.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <span>
                Last updated:{' '}
                <time dateTime={REFUND_POLICY_UPDATED_ISO}>{REFUND_POLICY_UPDATED}</time>
              </span>
              <span className="inline-flex items-center rounded-full border border-[#0A0A0A]/15 bg-[#FFFF99] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#0A0A0A]">
                Selected customers
              </span>
            </div>
          </div>
          <DownloadRefundPolicyButton className="shrink-0" />
        </div>

        <section
          id="guarantee"
          className="mt-10 scroll-mt-28 rounded-2xl border border-black/10 bg-surface-secondary p-6 dark:border-white/10 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFF99] text-[#0A0A0A]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.2 4.2L19 7" />
              </svg>
            </span>
            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                {refundPolicy.guaranteeTitle}
              </h2>
              <p className="mt-3 text-base leading-8 text-text-secondary">{refundPolicy.introduction}</p>
            </div>
          </div>
        </section>

        <nav
          aria-label="First Month Refund Policy contents"
          className="my-10 rounded-2xl border border-black/10 bg-surface-secondary p-6 dark:border-white/10"
        >
          <h2 className="mb-4 font-heading text-lg font-semibold text-text-primary">On this page</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-text-secondary sm:columns-2 sm:gap-8">
            {contents.map(({ id, title }) => (
              <li key={id} className="break-inside-avoid">
                <a href={`#${id}`} className="underline underline-offset-4 hover:text-text-primary">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="how-it-works" className="scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            How It Works
          </h2>

          <div className="mt-6 space-y-5">
            {refundPolicy.stages.map((stage) => (
              <section
                id={stage.id}
                key={stage.id}
                className="scroll-mt-28 rounded-2xl border border-black/10 bg-surface-primary p-6 dark:border-white/10 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] font-mono text-xs font-bold text-white dark:bg-white dark:text-[#0A0A0A]">
                      {stage.number}
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{stage.label}</p>
                      <h3 className="mt-1 font-heading text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                        {stage.title}
                      </h3>
                    </div>
                  </div>
                  {stage.refund ? (
                    <span className="inline-flex items-center rounded-full bg-[#FFFF99] px-3 py-1 text-xs font-semibold text-[#0A0A0A]">
                      {stage.refund}
                    </span>
                  ) : null}
                </div>

                {stage.description ? (
                  <p className="mt-4 text-sm leading-7 text-text-secondary">{stage.description}</p>
                ) : null}

                <ul className="mt-4 space-y-3">
                  {stage.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-7 text-text-secondary">
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-[#0A0A0A] dark:bg-white"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {stage.note ? <p className="mt-4 text-sm font-semibold text-text-primary">{stage.note}</p> : null}
              </section>
            ))}
          </div>
        </section>

        <section
          id="refund-processing"
          className="mt-10 scroll-mt-28 rounded-2xl bg-[#FFFF99] p-6 text-[#0A0A0A] sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">{refundPolicy.processing.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#0A0A0A]/80">{refundPolicy.processing.text}</p>
            </div>
            <div className="shrink-0 rounded-2xl border border-[#0A0A0A]/15 bg-white/45 px-6 py-4 text-center">
              <span className="block font-heading text-4xl font-extrabold leading-none">5</span>
              <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#0A0A0A]/70">
                working days
              </span>
            </div>
          </div>
        </section>

        <section id="terms" className="mt-10 scroll-mt-28">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Terms &amp; Conditions
          </h2>
          <ol className="mt-6 space-y-3">
            {refundPolicy.terms.map((term, index) => (
              <li
                key={term}
                className="flex gap-4 rounded-xl border border-black/10 bg-surface-secondary p-4 dark:border-white/10 sm:p-5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/15 font-mono text-[11px] font-bold text-text-primary dark:border-white/20">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-text-secondary">{term}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-10 rounded-2xl bg-[#0A0A0A] px-6 py-8 text-center font-heading text-xl font-bold tracking-tight text-white dark:bg-white dark:text-[#0A0A0A] sm:text-2xl">
          {refundPolicy.slogan}
        </p>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-black/10 bg-surface-secondary p-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-text-primary">Keep a copy</h2>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Download this policy as a PDF. The file records the date and time of download.
            </p>
          </div>
          <DownloadRefundPolicyButton className="shrink-0" />
        </div>

        <div className="mt-12 border-t border-black/10 pt-6 text-sm dark:border-white/10">
          <p className="leading-7 text-text-secondary">
            Questions about a refund? Email{' '}
            <a href="mailto:hello@upsquadconnect.com" className="underline underline-offset-4 hover:text-text-primary">
              hello@upsquadconnect.com
            </a>{' '}
            or call{' '}
            <a href="tel:+919995266385" className="underline underline-offset-4 hover:text-text-primary">
              +91 99952 66385
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/terms-of-service/" className="underline underline-offset-4 hover:text-text-primary">
              Terms of Service
            </Link>
            <Link href="/privacy-policy/" className="underline underline-offset-4 hover:text-text-primary">
              Privacy Policy
            </Link>
            <Link href="/contact/" className="underline underline-offset-4 hover:text-text-primary">
              Contact UpSquad
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
