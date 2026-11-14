import Link from 'next/link'

export default function LegalPage({ title, introduction, sections, relatedHref, relatedTitle }) {
  return (
    <article className="px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">UpSquad · Legal</p>
        <h1 className="mb-5 font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">{title}</h1>
        <p className="mb-6 text-sm text-text-secondary">Last updated: <time dateTime="2026-11-14">14 November 2026</time></p>
        <p className="text-base leading-8 text-text-secondary">{introduction}</p>

        <nav aria-label={`${title} contents`} className="my-10 rounded-2xl border border-black/10 bg-surface-secondary p-6 dark:border-white/10">
          <h2 className="mb-4 font-heading text-lg font-semibold">On this page</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-text-secondary sm:columns-2 sm:gap-8">
            {sections.map(({ id, title: sectionTitle }) => (
              <li key={id} className="break-inside-avoid"><a href={`#${id}`} className="underline underline-offset-4 hover:text-text-primary">{sectionTitle}</a></li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10">
          {sections.map(({ id, title: sectionTitle, paragraphs }, index) => (
            <section id={id} key={id} className="scroll-mt-28">
              <h2 className="mb-4 font-heading text-xl font-bold text-text-primary sm:text-2xl">{index + 1}. {sectionTitle}</h2>
              <div className="space-y-4 text-base leading-8 text-text-secondary">
                {paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-6 text-sm dark:border-white/10">
          <Link href={relatedHref} className="underline underline-offset-4">{relatedTitle}</Link>
          <Link href="/contact/" className="underline underline-offset-4">Contact UpSquad</Link>
        </div>
      </div>
    </article>
  )
}

export function LegalContact() {
  return <>UpSquad, Panadans, CUSAT, Kalamassery, Kochi, Kerala 682022, India. Email: <a href="mailto:hello@upsquadconnect.com" className="underline underline-offset-4">hello@upsquadconnect.com</a>. Phone: <a href="tel:+919995266385" className="underline underline-offset-4">+91 99952 66385</a>.</>
}
