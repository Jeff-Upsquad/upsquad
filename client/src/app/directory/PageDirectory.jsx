'use client'

import { useState } from 'react'

const groups = [
  { id: 'overview', title: 'Start here', description: 'The big picture: UpSquad and its platform.', pages: [
    ['UpSquad home', '/', 'The main introduction to UpSquad.'],
    ['The platform', '/platform/', 'People, AI and the apps they work with.'],
  ] },
  { id: 'software', title: 'Software & app suites', description: 'Business tools, accounting and payroll.', pages: [
    ['SquadSuite', '/squadsuite/', 'SquadHub, SquadBooks and Squad Payroll.'],
    ['SquadBooks Accounting Suite', '/squadbooks/', 'SquadBooks SaaS and Squad Payroll.'],
  ] },
  { id: 'customers', title: 'For businesses', description: 'Services, subscriptions and ways to work with UpSquad.', pages: [
    ['All customer services', '/customers/', 'The customer services overview.'],
    ['Designers & video editors', '/customers/designers-and-video-editors/', 'Creative services and availability plans.'],
    ['Creative services explainer', '/customers/creative-services-explainer/', 'Subscribe, assign or hire for creative work.'],
    ['Designer & editor fixed plans', '/customers/designer-editor-subscription-explainer/', 'The fixed-plan creative subscription explainer.'],
    ['Accountant subscription', '/customers/accountant-subscription/', 'Accounting support for your business.'],
    ['Accountant subscription explainer', '/customers/accountant-subscription-explainer/', 'How accounting subscriptions work and plan selection.'],
    ['Business collaboration program', '/customers/business-collaboration-program/', 'The business collaboration offer.'],
    ['Pricing', '/pricing/', 'Service options and subscription pricing.'],
  ] },
  { id: 'partners', title: 'For talent & agency partners', description: 'Find the program that matches your work.', pages: [
    ['General partner program', '/partner-program/general/', 'Explore the general talent partner program.'],
    ['Designers & video editors', '/partner-program/designer-and-video-editor/', 'Partner opportunities for creative professionals.'],
    ['Accountant partner program', '/partner-program/accountant/', 'Partner opportunities for accountants.'],
    ['Sales partner program', '/partner-program/sales/', 'Partner opportunities in sales.'],
    ['Social media creators', '/partner-program/social-media-creators/', 'Creator and brand promotion opportunities.'],
    ['Agency partner program', '/partner-program/agency/', 'Collaboration opportunities for agencies.'],
  ] },
  { id: 'studio', title: 'Studio & creative teams', description: 'Creative teams and campaign presentation pages.', pages: [
    ['Studio', '/studio/', 'The UpSquad studio overview.'],
    ['Content Squad', '/studio/content-squad/', 'The Content Squad presentation and posters.'],
    ['Dream Team — studio', '/studio/dream-team/', 'The studio version of the Dream Team page.'],
    ['Dream Team — standalone', '/dream-team/', 'The standalone link to the same Dream Team experience.'],
  ] },
  { id: 'offers', title: 'Offers & campaigns', description: 'Dedicated offer pages. Check current terms before sharing.', pages: [
    ['Main offer', '/offer/', 'The general offer landing page.'],
    ['Accountant offer', '/offer/accountant/', 'The dedicated accounting offer page.'],
  ] },
  { id: 'company', title: 'Company & getting started', description: 'Contact, careers and signup.', pages: [
    ['Contact UpSquad', '/contact/', 'Contact details and business enquiries.'],
    ['Careers', '/careers/', 'Career opportunities and applications.'],
    ['Sign up', '/signup/', 'Choose business or talent signup.'],
  ] },
  { id: 'legal', title: 'Policies & legal', description: 'Customer policies and terms.', pages: [
    ['Privacy policy', '/privacy-policy/', 'How information is handled.'],
    ['Terms of service', '/terms-of-service/', 'Terms for using the services.'],
    ['Refund policy', '/refund-policy/', 'Refund terms and policy information.'],
  ] },
  { id: 'other', title: 'Previous versions & alternate links', description: 'Older designs and alternate routes, kept separate for reference.', pages: [
    ['Classic homepage', '/home-classic/', 'The previous homepage design.'],
    ['Classic pricing', '/pricing-classic/', 'The previous pricing experience.'],
    ['Agencies — alternate link', '/partner-program/agencies/', 'An alternate agency route; production redirects to the agency page.'],
  ] },
]

const total = groups.reduce((count, group) => count + group.pages.length, 0)

export default function PageDirectory() {
  const [query, setQuery] = useState('')
  const search = query.trim().toLowerCase()
  const visible = groups.map((group) => ({ ...group, pages: group.pages.filter((page) => !search || [group.title, group.description, ...page].join(' ').toLowerCase().includes(search)) })).filter((group) => group.pages.length)
  const matches = visible.reduce((count, group) => count + group.pages.length, 0)

  return <div className="pd-root">
    <a className="pd-skip" href="#page-list">Skip to page links</a>
    <header className="pd-header pd-wrap"><a className="pd-logo" href="/">UpSquad<span aria-hidden="true">.</span></a><span>Website directory</span><a href="/squadsuite/">Explore SquadSuite</a></header>
    <main className="pd-wrap">
      <section className="pd-intro"><p className="pd-kicker">ONE PLACE TO FIND YOUR WAY</p><h1>Every page.<br /><span>A little more organized.</span></h1><p>Products, services, partner programs and everything in between.<br />Find the right page without hunting for the link.</p><div className="pd-search"><label htmlFor="page-search">Find a page</label><div><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg><input id="page-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try accounting, partners, pricing…" />{query && <button type="button" onClick={() => setQuery('')}>Clear</button>}</div></div><p className="pd-count" role="status">{search ? `${matches} of ${total} pages match your search` : `${total} pages · ${groups.length} groups`}</p></section>
      <div className="pd-content" id="page-list"><aside className="pd-sidebar"><nav aria-label="Page categories"><p className="pd-kicker">BROWSE BY PURPOSE</p>{visible.map((group) => <a key={group.id} href={`#${group.id}`}><span>{group.title}</span><span>{group.pages.length}</span></a>)}</nav><p className="pd-local-note">Links open in this website, so a local preview stays on localhost.</p></aside>
        <div className="pd-groups">{visible.length ? visible.map((group) => <section className="pd-group" id={group.id} key={group.id}><div className="pd-group-heading"><div><h2>{group.title}</h2><p>{group.description}</p></div><span>{group.pages.length} pages</span></div><div className="pd-cards">{group.pages.map(([title, url, description]) => <a className="pd-card" href={url} key={url}><h3>{title}</h3><p>{description}</p><span className="pd-path">{url}</span></a>)}</div></section>) : <div className="pd-empty"><h2>No pages found.</h2><p>Try a different name, topic or URL.</p><button type="button" onClick={() => setQuery('')}>Show all pages</button></div>}</div>
      </div>
    </main><footer className="pd-wrap pd-footer"><span>UpSquad · Website page directory</span><a href="#page-search">Back to search</a></footer>
  </div>
}
