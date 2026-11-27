'use client'

import { useEffect, useRef, useState } from 'react'

const contact = (name = 'SquadBooks') => `https://wa.me/919995266385?text=${encodeURIComponent(`Hi UpSquad, I want to know more about ${name} and connected apps.`)}`
const groups = [
  { id: 'cash', label: '01 / CASH & EXPENSES', title: 'Cash & expense management', intro: 'Squad Cashbook is the transaction capture app around your SquadBooks accounting core.', apps: [
    ['Squad Cashbook','Cash & expenses','Capture cash in and out, expenses, cheques and receipt photos from your team.','App available','↗'],
  ]},
  { id: 'inventory', label: '02 / INVENTORY', title: 'Inventory management', intro: 'Add inventory management when your business buys, stores or sells products.', apps: [
    ['SquadBooks Inventory','Stock control','Manage products, stock movement and inventory records alongside your accounting workflow.','Explore with us','▦'],
  ]},
  { id: 'customers', label: '03 / CUSTOMERS & COMMUNICATION', title: 'Customer relationship management', intro: 'Use CRM for customer relationships, with SquadBooks remaining your accounting home.', apps: [
    ['Squad CRM','Customer relationships','Keep a separate customer record with invoices and conversations for better follow-up.','Connection planned','◎'],
  ]},
  { id: 'people', label: '04 / PEOPLE & HIRING', title: 'HR, attendance & hiring', intro: 'From the first candidate conversation to daily attendance and payday.', apps: [
    ['Squad Payroll','Attendance & payroll','Record attendance, calculate salaries and prepare payslips in one focused app.','App available','▥','https://squadpayroll.upsquadconnect.com'],
    ['Squad Attendance','Attendance only','Record daily attendance when you handle payroll elsewhere.','App available','◷','https://attendanceapp.upsquadconnect.com'],
    ['Face Recognition Attendance','Phone check-in','Turn an old smartphone into a touchless entrance kiosk. Part of the Squad Payroll roadmap.','Coming soon','◉'],
    ['Squad Recruit','Candidate operations · working name','Manage candidates sourced through job portals, then organize conversations, proposals, follow-ups and automations.','App available · working name','✳'],
  ]},
  { id: 'ai', label: '05 / AI & AUTOMATION', title: 'AI accountant & automation', intro: 'Bring useful AI into the workflows your team already knows.', apps: [
    ['Squad Bots','AI accountant','Create an AI accountant bot and connect it with SquadBooks for supported accounting tasks and insights.','Connection planned','✺'],
  ]},
]
// Platform labels follow the sibling projects' release manifests and distribution docs.
// Inventory is web only per the product owner's current direction.
const platforms = {
  SquadBooks: { available: ['Web'], note: 'Use the web app from your browser on Mac or Windows. Native Android, iOS, Mac and Windows apps are not confirmed.' },
  'Squad Cashbook': { available: ['Web', 'Android'], note: 'iOS release not confirmed. Native Mac and Windows apps are not confirmed.' },
  'SquadBooks Inventory': { available: ['Web'], note: 'Web only for now.' },
  'Squad CRM': { available: ['Web', 'Android'], preview: ['Mac · local build'], note: 'Mac builds exist; public distribution is not confirmed. Native iOS and Windows releases are not confirmed.' },
  'Squad Payroll': { available: ['Web', 'Android'], preview: ['iOS · planned'], note: 'Use the web app on Mac or Windows. Separate native desktop apps are not confirmed.' },
  'Squad Attendance': { available: ['Web', 'Android'], preview: ['iOS · planned'], note: 'Use the web app on Mac or Windows. Separate native desktop apps are not confirmed.' },
  'Face Recognition Attendance': { available: [], preview: ['Coming soon'], note: 'Phone-based attendance kiosk in development. Platforms will be announced at launch.' },
  'Squad Recruit': { available: ['Web', 'Android'], note: 'Based on the existing SquadHire CRM. Native iOS, Mac and Windows releases are not confirmed.' },
  'Squad Bots': { available: ['Web', 'Android'], preview: ['Mac · local build'], note: 'Mac companion is a local build, not a public release. Native iOS and Windows releases are not confirmed.' },
}
function PlatformChips({ name }) {
  const item = platforms[name]
  return <div className="as-platforms"><span className="as-platform-label">Available on</span><div className="as-platform-chips">{item.available.map(platform => <span className="as-platform-chip" key={platform}><span aria-hidden="true">✓</span> {platform}</span>)}{(item.preview || []).map(platform => <span className="as-platform-chip as-platform-planned" key={platform}>{platform}</span>)}</div><p>{item.note}</p></div>
}
const demos = {
  SquadBooks: [['Try SquadBooks demo', 'https://squadbooks.upsquadconnect.com/demo']],
  'Squad Payroll': [['Try web demo', 'https://squadpayroll.upsquadconnect.com/app.html?demo=1'], ['Try mobile demo', 'https://squadpayroll.upsquadconnect.com/mobile-demo.html']],
}
function DemoButtons({ name }) {
  if (!demos[name]) return null
  return <div className="as-demo-buttons"><span>Explore with sample data</span><div>{demos[name].map(([label, url]) => <a href={url} target="_blank" rel="noopener noreferrer" key={url}>{label} <span aria-hidden="true">↗</span><span className="as-visually-hidden"> (opens in a new tab)</span></a>)}</div></div>
}
const previews = {
  cash: [['Receipt photo', 'Capture'], ['Cash & expense entry', 'Review'], ['Accounting record', 'SquadBooks']],
  inventory: [['Products & stock', 'Inventory'], ['Sales & purchases', 'Review'], ['Accounting record', 'SquadBooks']],
  customers: [['Customer & invoice', 'SquadBooks'], ['Customer workspace', 'CRM'], ['Conversation & follow-up', 'Your team']],
  people: [['Attendance', 'Your team'], ['Salaries & payslips', 'Payroll'], ['Accounting workflow', 'SquadBooks']],
  ai: [['Accounting task', 'Your team'], ['Accountant bot', 'Squad Bots'], ['Review & approve', 'Your accountant']],
}
function WorkflowPreview({ id }) {
  return <div className="as-workflow"><div className="as-workflow-bar"><span className="as-window-dots"><i/><i/><i/></span><span>YOUR WORKFLOW / {id}</span><small>ILLUSTRATIVE</small></div><div className="as-workflow-nodes">{previews[id].map(([label, owner], i) => <div className="as-workflow-node" key={label}><span className="as-flow-number">0{i + 1}</span><div><small>{owner}</small><strong>{label}</strong></div>{i < 2 && <span className="as-flow-arrow" aria-hidden="true">→</span>}</div>)}</div></div>
}
function AppMap() {
  const [selected, setSelected] = useState('cash')
  const options = [['cash','↗','Cashbook'],['inventory','▦','Inventory'],['customers','◎','CRM'],['people','◷','People'],['ai','✺','AI bots']]
  return <div className="as-map-shell"><div className="as-map-label"><span className="as-pulse-dot"/> YOUR BUSINESS / CONNECTED APPS <small>EXPLORE THE SETUP</small></div><div className="as-map" aria-label="Explore apps around SquadBooks"><div className="as-map-ring"/><div className="as-map-ring as-map-ring-outer"/><svg className="as-map-lines" viewBox="0 0 800 460" preserveAspectRatio="none" aria-hidden="true"><path d="M400 230 100 100M400 230 700 100M400 230 100 350M400 230 700 350M400 230 400 420"/></svg><div className="as-map-core"><span className="as-core-icon">B.</span><small>YOUR ACCOUNTING CORE</small><strong>SquadBooks</strong><span>Invoices · Records · Reports</span></div>{options.map(([id, icon, label], i) => <button className={`as-map-app as-map-app-${i}`} aria-pressed={selected === id} onClick={() => setSelected(id)} key={id}><span>{icon}</span><strong>{label}</strong><small>{selected === id ? 'Selected' : 'Explore app'}</small></button>)}</div><div className="as-map-detail" aria-live="polite"><span className="as-map-detail-icon">{options.find(item => item[0] === selected)[1]}</span><div><strong>{groups.find(group => group.id === selected).label.split(' / ')[1]}</strong><p>{groups.find(group => group.id === selected).intro}</p></div><a href={`#${selected}`}>Explore <span aria-hidden="true">↗</span></a></div><p className="as-map-footnote">A view of the app ecosystem. Connection availability varies by app.</p></div>
}
export default function AccountingSuiteLanding() {
  const root = useRef(null)
  useEffect(() => {
    const nodes = root.current.querySelectorAll('.as-foundation, .as-catalog-head, .as-group, .as-steps, .as-cta')
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('as-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.06 })
    nodes.forEach(node => { node.classList.add('as-reveal'); observer.observe(node) })
    return () => observer.disconnect()
  }, [])
  return <div className="as-page" ref={root}>
  <a className="as-skip" href="#main">Skip to content</a>
  <header className="as-site-header"><div className="as-header as-wrap"><a className="as-hanging-logo" href="/" aria-label="UpSquad home"><span className="as-sign"><svg aria-hidden="true" viewBox="0 0 120 28"><path d="M60 0 17 28M60 0l43 28" fill="none" stroke="rgba(10,10,10,.42)" strokeWidth="1.4" strokeLinecap="round"/></svg><span className="as-logo">upsquad<span aria-hidden="true"/></span></span></a><nav aria-label="SquadBooks navigation"><a href="#platform">SquadBooks</a><a href="#apps">Connected apps</a><a href="#people">People & hiring</a><a href="#how">How it works</a></nav><a className="as-header-cta" href={contact()}>WhatsApp ↗</a></div></header>
  <main id="main"><section className="as-hero as-wrap" id="platform"><div><p className="as-kicker">SQUADBOOKS + CONNECTED BUSINESS APPS</p><h1>SquadBooks at the core.<em>Connect the apps you need.</em></h1><p className="as-lede">SquadBooks is your main accounting software. Connect specialist apps for cash, inventory, payroll, customers and AI — choosing only what your business and industry need.</p><div className="as-actions"><a className="as-primary" href="https://squadbooks.upsquadconnect.com/demo">Try SquadBooks demo ↗</a><a href="#apps">Explore connected apps ↓</a></div></div><AppMap/></section>
  <div className="as-ticker" aria-label="Accounting, cash, inventory, people, customers and AI"><div className="as-marquee" aria-hidden="true">{[0,1].map(copy => <div key={copy}>{['ACCOUNTING','CASH & EXPENSES','INVENTORY','PAYROLL','CUSTOMERS','AI ACCOUNTANT'].map(label => <span key={label}>{label}<b>✳</b></span>)}</div>)}</div></div>
  <section className="as-foundation as-wrap"><div><p className="as-kicker">THE STARTING POINT</p><h2>Your accounting<br/><em>starts here.</em></h2></div><div className="as-foundation-card"><span className="as-core-icon">B.</span><div><span className="as-type">01 / CORE PLATFORM</span><h3>SquadBooks</h3><p>Your main accounting workspace for invoices, records and financial reporting. Build your setup around it, adding specialist tools that fit your industry and team.</p><PlatformChips name="SquadBooks"/><DemoButtons name="SquadBooks"/><div className="as-foundation-links"><a href="https://squadbooks.upsquadconnect.com">Open SquadBooks ↗</a></div></div></div></section>
  <section className="as-catalog" id="apps"><div className="as-wrap"><div className="as-catalog-head"><div><p className="as-kicker">BUILD YOUR OWN SETUP</p><h2>One accounting core.<br/><em>Five ways to extend it.</em></h2></div><p>Keep accounting in SquadBooks. Explore each specialist area below and add the apps your business needs. Connection availability is confirmed during setup; planned integrations are labelled.</p></div>{groups.map(group => <section className={`as-group ${group.apps.length === 1 ? 'as-group-single' : ''}`} id={group.id} key={group.label}><div className="as-group-intro"><span>{group.label}</span><h3>{group.title}</h3><p>{group.intro}</p></div><div className="as-group-content"><WorkflowPreview id={group.id}/><div className="as-cards">{group.apps.map(([name,type,description,status,icon,url]) => <article className="as-card" key={name}><div className="as-card-top"><span className="as-card-icon">{icon}</span><span className="as-status">{status}</span></div><span className="as-type">{type}</span><h4>{name}</h4><p>{description}</p><PlatformChips name={name}/><DemoButtons name={name}/><a href={url || contact(name)}>{name === 'Face Recognition Attendance' ? 'Notify me at launch' : url ? 'Explore app' : 'Ask about this app'} ↗</a></article>)}</div><div className="as-connection-note"><span>SquadBooks</span><span aria-hidden="true">↔</span><span>{group.label.split(' / ')[1]}</span><p>SquadBooks holds your accounting. These apps handle the specialist work around it. Ask us about the supported connection for your setup.</p></div></div></section>)}</div></section>
  <section className="as-steps as-wrap" id="how"><div><p className="as-kicker">HOW IT COMES TOGETHER</p><h2>Start simple.<br/><em>Grow on purpose.</em></h2></div><div className="as-step-list"><div><span>01</span><p><strong>Begin with your books.</strong> Make SquadBooks the accounting foundation for your business.</p></div><div><span>02</span><p><strong>Pick the work that needs help.</strong> Add cash, stock, people or customer tools as your needs become clear.</p></div><div><span>03</span><p><strong>Connect where it makes sense.</strong> We’ll help map your workflow and explain which integrations are available or planned.</p></div></div></section>
  <section className="as-cta as-wrap"><div><p className="as-kicker">LET’S DESIGN YOUR SETUP</p><h2>Your books, connected.<br/><em>Your business, in focus.</em></h2><p>We’ll help you choose a sensible starting point and talk through the connected apps.</p></div><a href={contact()}>Plan my setup on WhatsApp ↗</a></section></main>
  <footer className="as-footer as-wrap"><a className="as-logo" href="/">upsquad<span>●</span></a><p>SquadBooks and connected apps, by UpSquad.</p><nav><a href="/squadsuite/">SquadSuite</a><a href="/privacy-policy/">Privacy</a><a href="mailto:hello@upsquadconnect.com">Contact</a></nav></footer>
</div> }
