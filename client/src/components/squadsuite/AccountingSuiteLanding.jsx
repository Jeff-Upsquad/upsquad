'use client'

import { useState } from 'react'
import { APPS, AppIcon, ProductPreview } from './SquadSuiteLanding'

const apps = APPS.filter((app) => ['books', 'payroll'].includes(app.id))
const enquiry = 'https://wa.me/919995266385?text=' + encodeURIComponent('Hi UpSquad, I’m interested in the SquadBooks Accounting Suite. Please help me choose between SquadBooks SaaS and Squad Payroll, or set up both.')
const questions = [
  ['What is the SquadBooks Accounting Suite?', 'It’s a family of two apps: SquadBooks SaaS for accounting and Squad Payroll for attendance and payroll. Choose one for your immediate needs, or use both for different parts of your business.'],
  ['Do I need to buy both apps?', 'No. You can start with either app. Each has its own plans and access; contact us to discuss the right setup for your business.'],
  ['Do payroll entries automatically sync to SquadBooks?', 'Automatic payroll-to-accounting sync is not available as a suite-wide feature today. Each app operates independently. Contact us to discuss your accounting workflow before choosing your setup.'],
  ['Is SquadBooks SaaS a cloud app?', 'Yes. SquadBooks SaaS is accessed through your browser. Open the app to sign in, or contact us for help setting up your organization and user access.'],
  ['Can I use Payroll offline?', 'Squad Payroll offers offline and cloud options. Explore its product page to choose the option that fits how your team records attendance and prepares payroll.'],
  ['Can my accountant or team use these apps?', 'Access is managed within each product. Tell us who needs to work on accounting and payroll, and we’ll help you choose the appropriate setup and permissions.'],
]

export default function AccountingSuiteLanding() {
  const [selected, setSelected] = useState('books')
  const active = apps.find((app) => app.id === selected)
  return <div className="ss-root as-root">
    <a className="ss-skip" href="#accounting-main">Skip to content</a>
    <header className="ss-header ss-wrap">
      <a className="ss-brand" href="/" aria-label="UpSquad home">UpSquad<span aria-hidden="true" /></a>
      <span className="ss-header-divider" />
      <a className="ss-suite-name" href="/squadbooks/">SquadBooks<span className="as-brand-caption">Accounting Suite</span></a>
      <nav aria-label="Accounting Suite navigation"><a href="#apps">The apps</a><a href="#your-workday">Your workday</a><a href="#questions">FAQs</a></nav>
      <a className="ss-button ss-button-small" href={enquiry}>Let’s talk</a>
    </header>

    <main id="accounting-main">
      <section className="ss-hero ss-wrap">
        <p className="ss-eyebrow">SQUADBOOKS ACCOUNTING SUITE BY UPSQUAD</p>
        <h1>Your books.<br />Your people.<br /><span className="ss-highlight">Better accounted for.</span></h1>
        <div className="ss-hero-bottom"><p>Accounting for your business. Payroll for your team.<br className="ss-desktop-break" /> Two focused apps for the work behind every workday.</p><div className="ss-hero-actions"><a className="ss-button" href="#apps">Explore the accounting suite</a><span>Start with one. Add the other when you need it.</span></div></div>
        <div className="ss-product-picker" role="group" aria-label="Choose an accounting app to preview">{apps.map((app) => <button key={app.id} type="button" aria-pressed={selected === app.id} onClick={() => setSelected(app.id)}><AppIcon id={app.id} /><span><strong>{app.id === 'books' ? 'SquadBooks SaaS' : app.name}</strong><small>{app.category}</small></span><span className="ss-picker-indicator" aria-hidden="true">{selected === app.id ? '−' : '+'}</span></button>)}</div>
        <ProductPreview app={active} />
        <div className="ss-preview-caption"><span>Illustrative examples. Real tools for your business.</span><a href={active.url}>{active.cta}</a></div>
      </section>

      <section className="ss-apps ss-wrap" id="apps">
        <div className="ss-section-heading"><div><p className="ss-eyebrow">TWO APPS. CLEAR RESPONSIBILITIES.</p><h2>A place for the numbers.<br />A place for payday.</h2></div><p>Give your accounting and payroll the attention each needs, with tools built around the job.</p></div>
        <div className="ss-app-grid">{apps.map((app) => <article key={app.id} className="ss-app-card"><div className="ss-app-card-top"><AppIcon id={app.id} /><span className="ss-eyebrow">{app.id === 'books' ? 'BROWSER-BASED ACCOUNTING' : 'ATTENDANCE & PAYROLL'}</span></div><h3>{app.id === 'books' ? 'SquadBooks SaaS' : app.name}</h3><h4>{app.headline}</h4><p>{app.description}</p><ul>{app.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><div className="as-card-actions"><a className="ss-button" href={app.url}>{app.id === 'books' ? 'Open SquadBooks' : 'Explore Payroll'}</a><a className="as-help-link" href={enquiry}>Help me get started</a></div></article>)}</div>
      </section>

      <section className="ss-growth" id="your-workday"><div className="ss-wrap ss-growth-grid"><div><p className="ss-eyebrow">THE WORK BEHIND THE BUSINESS</p><h2>From the first invoice<br />to the last<br /><span>payslip.</span></h2><p>Some days are about keeping financial records in order. Others are about checking attendance and preparing salaries. Choose the tool for the task, and keep your team focused.</p><a className="ss-text-link" href={enquiry}>Talk through your accounting needs</a></div><div className="as-workday"><article><AppIcon id="books" /><div><span className="ss-eyebrow">YOUR BUSINESS</span><h3>Keep the books in view.</h3><p>Organize invoices and records. Review financial reports. Give the right people access to your organization.</p><a href="https://squadbooks.upsquadconnect.com">Explore SquadBooks SaaS</a></div></article><article><AppIcon id="payroll" /><div><span className="ss-eyebrow">YOUR PEOPLE</span><h3>Be ready for payday.</h3><p>Track attendance, prepare salary calculations and generate payslips in Squad Payroll.</p><a href="https://squadpayroll.upsquadconnect.com">Explore Squad Payroll</a></div></article></div></div></section>

      <section className="as-setup ss-wrap"><div><p className="ss-eyebrow">A SETUP THAT FITS</p><h2>Start where you<br />need the help.</h2></div><div className="as-setup-options"><article><span className="as-option-tag">ACCOUNTING</span><h3>“I need to organize my books.”</h3><p>Start with SquadBooks SaaS for invoices, accounting records and reports.</p><a href="https://squadbooks.upsquadconnect.com">Open SquadBooks</a></article><article><span className="as-option-tag">PAYROLL</span><h3>“I need a simpler payday.”</h3><p>Start with Squad Payroll for attendance, salary calculations and payslips.</p><a href="https://squadpayroll.upsquadconnect.com">Explore Payroll</a></article><article><span className="as-option-tag">BOTH APPS</span><h3>“I need help with both.”</h3><p>Talk to us about access and setup for both apps. Each currently works independently.</p><a href={enquiry}>Discuss my setup</a></article></div></section>

      <section className="as-independence ss-wrap"><AppIcon id="books" /><div><h2>One family. Two focused apps.</h2><p>SquadBooks SaaS and Squad Payroll currently have separate access, plans and setup. Shared sign-in and automatic payroll-to-accounting workflows are not available as suite-wide features today.</p></div></section>

      <section className="ss-faq ss-wrap" id="questions"><div><p className="ss-eyebrow">BEFORE YOU GET STARTED</p><h2>A little clarity.</h2></div><div>{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="ss-closing ss-wrap"><div><p className="ss-eyebrow">YOUR NEXT MONTH-END STARTS HERE</p><h2>Less chasing.<br /><span>More clarity.</span></h2><p>Tell us about your business.<br />We’ll help you find your starting point.</p></div><div><a className="ss-button ss-button-accent" href={enquiry}>Talk accounting on WhatsApp</a><a className="ss-closing-secondary" href="#apps">Explore the two apps</a></div></section>
    </main>

    <footer className="ss-footer ss-wrap"><div><a className="ss-footer-brand" href="/">UpSquad<span aria-hidden="true">.</span></a><p>SquadBooks Accounting Suite · Part of SquadSuite.</p></div><nav aria-label="Footer"><a href="/squadsuite/">Explore SquadSuite</a><a href="/privacy-policy/">Privacy</a><a href="/terms-of-service/">Terms</a><a href="mailto:hello@upsquadconnect.com">Get in touch</a></nav><span>© {new Date().getFullYear()} UpSquad</span></footer>
  </div>
}
