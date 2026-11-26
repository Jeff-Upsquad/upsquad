'use client'

import { useState } from 'react'

const contact = (message) => `https://wa.me/919995266385?text=${encodeURIComponent(message)}`
const APPS = [
  {
    id: 'hub', name: 'SquadHub', short: 'Hub', category: 'Projects & communication',
    headline: 'Give your team a place to get things done.',
    description: 'Bring conversations, projects and tasks into a shared workspace. Keep the discussion close to the work, so everyone knows what happens next.',
    features: ['Team conversations', 'Projects & tasks', 'Shared workspaces'],
    url: 'https://app.squadhub.in', cta: 'Explore SquadHub',
  },
  {
    id: 'books', name: 'SquadBooks', short: 'Books', category: 'Accounting & finance',
    headline: 'Make room for a clearer financial picture.',
    description: 'Give your business a dedicated home for accounting. Keep invoices, financial records and reports organized, with access for the people who look after your books.',
    features: ['Invoices & records', 'Financial reports', 'Organization access'],
    url: 'https://squadbooks.upsquadconnect.com', cta: 'Explore SquadBooks',
  },
  {
    id: 'payroll', name: 'Squad Payroll', short: 'Payroll', category: 'Attendance & payroll',
    headline: 'Take the busywork out of payday.',
    description: 'Manage attendance, prepare monthly salaries and generate payslips. Choose the offline or cloud option that fits the way your business works.',
    features: ['Attendance tracking', 'Salary calculations', 'Payslips'],
    url: 'https://squadpayroll.upsquadconnect.com', cta: 'Explore Squad Payroll',
  },
]

function AppIcon({ id, className = '' }) {
  return <span className={`ss-icon ${className}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {id === 'hub' ? <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><path d="M17.5 14v7M14 17.5h7" /></> : id === 'books' ? <><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15" /><path d="M6 8h3M6 12h3M15 8h3M15 12h3" /></> : <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4M17 3v4M3 11h18m-13 5 3 2 5-4" /></>}
  </svg></span>
}

function ProductPreview({ app }) {
  return <div className="ss-preview" aria-label={`Illustrative ${app.name} preview`}>
    <div className="ss-window-top"><span className="ss-window-dots" aria-hidden="true"><i /><i /><i /></span><span>{app.name} / a little less busywork</span><span className="ss-demo-label">Illustrative preview</span></div>
    <div className="ss-workspace">
      <aside className="ss-sidebar" aria-hidden="true"><span className="ss-business">S<span>Studio North<small>Your business</small></span></span><p>WORKSPACE</p>{(app.id === 'hub' ? ['Overview', 'Conversations', 'Projects', 'My tasks'] : app.id === 'books' ? ['Overview', 'Invoices', 'Accounts', 'Reports'] : ['Overview', 'Attendance', 'Employees', 'Payroll']).map((item, i) => <div className={i === 0 ? 'ss-side-active' : ''} key={item}><span className="ss-side-marker" />{item}</div>)}<span className="ss-sidebar-bottom">Your team. Your workspace.</span></aside>
      <div className="ss-preview-main" key={app.id}>
        <div className="ss-preview-heading"><div><span className="ss-eyebrow">{app.category}</span><h3>{app.id === 'hub' ? 'Good work starts here.' : app.id === 'books' ? 'Your numbers, in view.' : 'A smoother month-end.'}</h3></div><span className="ss-avatar">SN</span></div>
        {app.id === 'hub' ? <>
          <div className="ss-preview-stats"><div><span>Today’s focus</span><strong>Brand launch</strong></div><div><span>The team</span><strong>All together</strong></div></div>
          <div className="ss-board">{[{ title: 'To do', tasks: ['Review launch brief', 'Plan the content'] }, { title: 'In progress', tasks: ['Design the website', 'Write launch copy'] }, { title: 'Done', tasks: ['Kick-off meeting', 'Share brand assets'] }].map((column, i) => <div key={column.title}><h4>{column.title}<span>2</span></h4>{column.tasks.map((task, j) => <div className="ss-task" key={task}><span className="ss-task-label">{j ? 'TEAM' : 'LAUNCH'}</span><p>{task}</p><div><span className="ss-tiny-avatar">{['AK', 'SM', 'JR'][i]}</span><span>{i === 2 ? 'Completed' : 'This week'}</span></div></div>)}</div>)}</div>
        </> : app.id === 'books' ? <>
          <div className="ss-preview-stats"><div><span>Invoices</span><strong>Everything in order</strong></div><div><span>Reports</span><strong>A clearer picture</strong></div></div>
          <div className="ss-ledger"><div className="ss-ledger-title"><h4>Recent invoices</h4><span>Sample records</span></div>{[['INV-024', 'Website project', 'Paid'], ['INV-025', 'Brand identity', 'Draft'], ['INV-026', 'Monthly services', 'Sent']].map(([id, name, status]) => <div className="ss-ledger-row" key={id}><span>{id}</span><strong>{name}</strong><span className={`ss-record-status ${status === 'Paid' ? 'ss-record-complete' : ''}`}>{status}</span></div>)}<div className="ss-ledger-foot">Keep the details close. See the bigger picture.</div></div>
        </> : <>
          <div className="ss-preview-stats"><div><span>Monthly payroll</span><strong>Ready for review</strong></div><div><span>Attendance</span><strong>In one place</strong></div></div>
          <div className="ss-ledger"><div className="ss-ledger-title"><h4>Payroll checklist</h4><span>Sample workflow</span></div>{[['Attendance checked', 'Complete'], ['Salary calculations', 'Prepared'], ['Payslips', 'Review next']].map(([title, status], i) => <div className="ss-payroll-row" key={title}><span className={i < 2 ? 'ss-check-complete' : 'ss-check-empty'} aria-hidden="true">{i < 2 ? '✓' : ''}</span><strong>{title}</strong><span>{status}</span></div>)}<div className="ss-ledger-foot">Your people put in the work. Make payday simpler.</div></div>
        </>}
      </div>
    </div>
  </div>
}

export default function SquadSuiteLanding() {
  const [selected, setSelected] = useState('hub')
  const app = APPS.find((item) => item.id === selected)
  return <div className="ss-root">
    <a className="ss-skip" href="#suite-main">Skip to content</a>
    <header className="ss-header ss-wrap"><a className="ss-brand" href="/" aria-label="UpSquad home">UpSquad<span aria-hidden="true" /></a><span className="ss-header-divider" /><a className="ss-suite-name" href="/squadsuite/">SquadSuite</a><nav aria-label="SquadSuite navigation"><a href="#apps">The apps</a><a href="#growing-together">Growing together</a><a href="#questions">FAQs</a></nav><a className="ss-button ss-button-small" href={contact('Hi UpSquad, I’d like help choosing a SquadSuite app for my business.')}>Let’s talk</a></header>
    <main id="suite-main">
      <section className="ss-hero ss-wrap">
        <p className="ss-eyebrow">THE BUSINESS SOFTWARE FAMILY BY UPSQUAD</p>
        <h1>Big plans.<br />Meet your <span className="ss-highlight">everyday apps.</span></h1>
        <div className="ss-hero-bottom"><p>Projects, books and payday.<br className="ss-desktop-break" /> Start with what you need. Add more as you grow.</p><div className="ss-hero-actions"><a className="ss-button" href="#apps">Find your first app</a><span>One app is a perfectly good start.</span></div></div>
        <div className="ss-product-picker" role="group" aria-label="Choose an app to preview">{APPS.map((item) => <button key={item.id} type="button" aria-pressed={item.id === selected} onClick={() => setSelected(item.id)}><AppIcon id={item.id} /><span><strong>{item.name}</strong><small>{item.category}</small></span><span className="ss-picker-indicator" aria-hidden="true">{item.id === selected ? '−' : '+'}</span></button>)}</div>
        <ProductPreview app={app} />
        <div className="ss-preview-caption"><span>Different jobs. A growing family of tools.</span><a href={app.url}>{app.cta}</a></div>
      </section>

      <section className="ss-apps ss-wrap" id="apps"><div className="ss-section-heading"><div><p className="ss-eyebrow">A GOOD FIT FOR YOUR NEXT STEP</p><h2>What needs a little<br />more order?</h2></div><p>You don’t have to change everything at once. Pick the app that makes your next workday easier.</p></div><div className="ss-app-grid">{APPS.map((item) => <article className="ss-app-card" key={item.id}><div className="ss-app-card-top"><AppIcon id={item.id} /><span className="ss-eyebrow">{item.category}</span></div><h3>{item.name}</h3><h4>{item.headline}</h4><p>{item.description}</p><ul>{item.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><a className="ss-button ss-button-outline" href={item.url}>{item.cta}</a></article>)}</div></section>

      <section className="ss-growth" id="growing-together"><div className="ss-wrap ss-growth-grid"><div><p className="ss-eyebrow">SMALL START. ROOM TO GROW.</p><h2>Your business changes.<br />Your tools should<br /><span>keep up.</span></h2><p>Maybe today you only need a better way to run payroll. Later, you need help with your books or a home for team projects. There’s an app for that next chapter, too.</p><a className="ss-text-link" href={contact('Hi UpSquad, help me choose the right SquadSuite apps for my business.')}>Talk through your business needs</a></div><div className="ss-growth-visual"><p className="ss-eyebrow">YOUR NEXT CHAPTER</p><div className="ss-growth-step"><AppIcon id="payroll" /><div><small>Start here, perhaps</small><strong>A simpler payday</strong></div><span>Payroll</span></div><div className="ss-growth-connector" aria-hidden="true" /><div className="ss-growth-step"><AppIcon id="books" /><div><small>When the time is right</small><strong>A home for your books</strong></div><span>Books</span></div><div className="ss-growth-connector" aria-hidden="true" /><div className="ss-growth-step"><AppIcon id="hub" /><div><small>As your team grows</small><strong>More room to collaborate</strong></div><span>Hub</span></div><p className="ss-growth-note">Your starting point. Your pace.</p></div></div></section>

      <section className="ss-roadmap ss-wrap"><div><span className="ss-roadmap-label">WHAT WE’RE WORKING TOWARD</span><h2>Closer connections.<br />Less repeat work.</h2><p>We’re bringing the family closer together. Shared sign-in, easier business switching and workflows between apps are part of the SquadSuite direction.</p><p className="ss-roadmap-note">These suite-wide connections are planned. Today, each app has its own access and setup.</p></div><div className="ss-roadmap-list">{[['A familiar way in', 'A shared sign-in experience across your apps.'], ['The right business, every time', 'A simpler way to move between businesses and their tools.'], ['Less entering things twice', 'Connections between work, payroll and accounting.']].map(([title, text]) => <div key={title}><span className="ss-roadmap-plus" aria-hidden="true">+</span><div><h3>{title}</h3><p>{text}</p></div><span className="ss-planned">Planned</span></div>)}</div></section>

      <section className="ss-faq ss-wrap" id="questions"><div><p className="ss-eyebrow">A FEW THINGS TO KNOW</p><h2>Good questions.</h2></div><div>{[
        ['Do I need all three apps?', 'No. Start with the app that meets your business needs. You can explore the others whenever they become useful.'],
        ['Is SquadSuite a single subscription?', 'This page brings the apps together so you can find the right tool. Each product has its own plans and access. Contact us for help choosing options for your business.'],
        ['Are the apps already connected?', 'Each app works independently today. Shared sign-in and workflows between products are planned; they are not included as existing suite-wide features.'],
        ['Can I use this for more than one business?', 'Tell us which businesses and apps you need. Multi-business access differs by product, and we can help you choose the right setup. A shared business switcher across the suite is planned.'],
        ['Does Payroll work offline?', 'Squad Payroll has offline and cloud options. Visit the product page to compare them and choose the setup that suits your team.'],
      ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="ss-closing ss-wrap"><div><p className="ss-eyebrow">LET’S MAKE THE EVERYDAY EASIER</p><h2>Start with one<br /><span>good decision.</span></h2><p>Tell us what’s keeping your business busy.<br />We’ll help you find the right app to start.</p></div><div><a className="ss-button ss-button-accent" href={contact('Hi UpSquad, I’m interested in SquadSuite. Can you help me choose an app for my business?')}>Find my fit on WhatsApp</a><a className="ss-closing-secondary" href="#apps">Or explore the apps</a></div></section>
    </main>
    <footer className="ss-footer ss-wrap"><div><a className="ss-footer-brand" href="/">UpSquad<span aria-hidden="true">.</span></a><p>People, software and a little less busywork.</p></div><nav aria-label="Footer"><a href="/">UpSquad home</a><a href="/privacy-policy/">Privacy</a><a href="/terms-of-service/">Terms</a><a href="mailto:hello@upsquadconnect.com">Get in touch</a></nav><span>© {new Date().getFullYear()} UpSquad</span></footer>
  </div>
}
