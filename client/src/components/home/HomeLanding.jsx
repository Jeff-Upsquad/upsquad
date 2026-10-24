'use client'

// New homepage, ported from the "upsquad Landing" Claude Design file
// (source: client/design/upsquad-landing.dc.html). Markup lives in
// HomeMarkup.jsx, generated from it by tools/dc_to_jsx.py; this file
// holds the design's data and behaviour, and passes render values to it as `v`.
import React from 'react'
import HomeMarkup from './HomeMarkup'
import './home.css'

const ICONS = {
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/>',
  bot: '<rect x="4.5" y="8" width="15" height="11" rx="3.5"/><path d="M12 4.5V8M9 13h.01M15 13h.01M9.5 16.2h5"/><circle cx="12" cy="4" r="1"/>',
  hub: '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="1.8"/><circle cx="19" cy="6" r="1.8"/><circle cx="5" cy="18" r="1.8"/><circle cx="19" cy="18" r="1.8"/><path d="M6.5 7.2 9.6 10M17.5 7.2 14.4 10M6.5 16.8l3.1-2.8M17.5 16.8l-3.1-2.8"/>',
  book: '<path d="M5 4.5h9.5A3.5 3.5 0 0 1 18 8v11.5H8.5A3.5 3.5 0 0 1 5 16V4.5Z"/><path d="M5 16a3.5 3.5 0 0 1 3.5-3.5H18M9 8h5"/>',
  megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z"/><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11"/>',
  palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.5-1.9-.3-1.1.4-2.1 1.6-2.1H17a3.5 3.5 0 0 0 3.5-3.5c0-5.2-3.8-9.5-8.5-9.5Z"/><circle cx="8" cy="11" r="1"/><circle cx="11" cy="7.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/>',
  film: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="M3.5 9h17M3.5 15h17M8 5v4M8 15v4M16 5v4M16 15v4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  chat: '<path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16h-6l-4.5 4v-4H7a2.5 2.5 0 0 1-2.5-2.5v-7Z"/><path d="M8.5 9h7M8.5 12h4"/>',
  assign: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>',
  hire: '<circle cx="9" cy="8" r="3.25"/><path d="M3.5 20a5.5 5.5 0 0111 0M17 8h4.5M19.25 5.75v4.5"/>',
  clip: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
  team: '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>',
  trend: '<path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>',
  content: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/>',
  marketing: '<path d="M4 9v6h3l9 4V5L7 9H4z"/><path d="M18.5 9.5a3.5 3.5 0 010 5"/>',
  tech: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"/>',
  finance: '<path d="M3 21h18"/><path d="M6 21v-7M12 21V8M18 21v-4"/><path d="M5 10l5-4 4 3 5-5"/>',
  legal: '<path d="M12 3v18M7 21h10M5 7h14"/><path d="M5 7l-2.5 5.5a2.75 2.75 0 005 0L5 7zM19 7l-2.5 5.5a2.75 2.75 0 005 0L19 7z"/>',
};
const ic = (name, size = 20, sw = 1.6) => React.createElement('svg', { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, dangerouslySetInnerHTML: { __html: ICONS[name] } });

const ROLES = ['Accountant', 'Social media manager', 'Ads specialist', 'Graphic designer', 'Video editor', 'HR & payroll', 'Sales rep', 'Content writer', 'Bookkeeper', 'Community manager'];
const CYCLE = ['accountant', 'designer', 'video editor', 'sales rep', 'HR manager', 'social manager'];
const INNER = ['Accountant', 'Designer', 'Video editor', 'Sales rep'];
const OUTER = ['Social manager', 'HR lead', 'Bookkeeper', 'Content writer', 'Ads specialist', 'Support rep'];

const STAGES = [
  { n: '01', title: 'Your team member leads', text: 'Your accountant, designer or video editor sets the brief and the standard. The work starts with a person.', label: 'stage 1 · they lead', tag: 'Sets the brief' },
  { n: '02', title: 'AI does the heavy lifting', text: 'AI picks up the drafting, sorting, matching and rendering, around the clock.', label: 'stage 2 · ai amplifies', tag: 'Directing AI' },
  { n: '03', title: 'They sign off, you get results', text: 'Your team member reviews and approves. You get finished work, faster, with a person accountable for it.', label: 'stage 3 · delivered', tag: 'Final call' },
];
const DESKS = [
  { name: 'Your accountant', slug: 'accounts', agents: ['Categorises', 'Matches invoices', 'Drafts reports'], tasks: ['Monthly P&L', 'Vendor bill check', 'GST summary'] },
  { name: 'Your designer', slug: 'design', agents: ['Variations', 'Resizes', 'Applies brand kit'], tasks: ['Diwali campaign visuals', 'Banner set, every size', 'Brand kit refresh'] },
  { name: 'Your video editor', slug: 'video', agents: ['Finds hooks', 'Rough cuts', 'Captions & renders'], tasks: ['Founder interview reel', 'Five short clips', '9:16 and 1:1 exports'] },
];
const AGENT_TOPS = ['20%', '50%', '80%'];
const TASK_STATES = [
  { status: 'On their desk', color: '#8a7600', bg: 'rgba(214,186,0,.1)', border: 'rgba(10,10,20,.08)' },
  { status: 'Drafted by AI', color: '#0a7fae', bg: 'rgba(20,160,214,.1)', border: 'rgba(20,160,214,.25)' },
  { status: 'Approved · sent to you', color: '#13a35a', bg: 'rgba(19,163,90,.1)', border: 'rgba(19,163,90,.3)' },
];

const APPS = [
  { id: 'books', name: 'Squad Books', role: 'Accounting', status: 'Live', icon: 'book', url: 'books.squadhub.in', nav: ['Ledger', 'Invoices', 'Reports'],
    blurb: 'Ledgers, invoices, reconciliation and reports — the accounting desk your accountant works from, with AI at their side.',
    feed: {
      human: [['h', 'Priya · Accountant', 'Reviewed vendor bills and flagged a duplicate'], ['h', 'Priya · Accountant', 'Closed the books for last month'], ['h', 'Priya · Accountant', 'Shared the P&L with the founder']],
      agent: [['a', 'Ledger · Accountant AI', 'Categorised every new bank transaction'], ['a', 'Ledger · Accountant AI', 'Matched open invoices to incoming payments'], ['a', 'Ledger · Accountant AI', 'Drafted the monthly P&L']],
      both: [['a', 'Ledger · Accountant AI', 'Drafted the monthly P&L and reconciliation'], ['h', 'Priya · Accountant', 'Approved the draft, adjusted two entries'], ['a', 'Ledger · Accountant AI', 'Filed the final report to the owner']] } },
  { id: 'smm', name: 'SMM Studio', role: 'Social media', status: 'Live', icon: 'megaphone', url: 'smm.squadhub.in', nav: ['Calendar', 'Posts', 'Ads'],
    blurb: 'Plan, create, schedule and publish across every account — with ad management on the way.',
    feed: {
      human: [['h', 'Arjun · Social manager', 'Planned next week’s content calendar'], ['h', 'Arjun · Social manager', 'Replied to comments on the launch reel'], ['h', 'Arjun · Social manager', 'Scheduled 6 posts across Instagram & LinkedIn']],
      agent: [['a', 'Pulse · Social AI', 'Wrote captions and hashtags for 6 posts'], ['a', 'Pulse · Social AI', 'Picked best posting times per channel'], ['a', 'Pulse · Social AI', 'Published on schedule and logged results']],
      both: [['a', 'Pulse · Social AI', 'Drafted a week of posts from the brand brief'], ['h', 'Arjun · Social manager', 'Tweaked tone on two captions, approved the rest'], ['a', 'Pulse · Social AI', 'Scheduled everything and is watching replies']] } },
  { id: 'creative', name: 'Creative Studio', role: 'Design', status: 'Building', icon: 'palette', url: 'creative.squadhub.in', nav: ['Briefs', 'Canvas', 'Approvals'],
    blurb: 'Briefs, design requests, versions and approvals in one board — your designer sets the direction, AI expands it.',
    feed: {
      human: [['h', 'Maya · Designer', 'Picked up the festive campaign brief'], ['h', 'Maya · Designer', 'Uploaded 3 key-visual directions'], ['h', 'Maya · Designer', 'Delivered final files in every size']],
      agent: [['a', 'Canvas · Design AI', 'Generated 12 banner variations from the brief'], ['a', 'Canvas · Design AI', 'Resized the set for every placement'], ['a', 'Canvas · Design AI', 'Applied brand fonts and colours automatically']],
      both: [['h', 'Maya · Designer', 'Set the art direction and hero visual'], ['a', 'Canvas · Design AI', 'Expanded it into 24 on-brand variations'], ['h', 'Maya · Designer', 'Picked the winners and sent for approval']] } },
  { id: 'video', name: 'Video Studio', role: 'Video editing', status: 'Building', icon: 'film', url: 'video.squadhub.in', nav: ['Timeline', 'Captions', 'Exports'],
    blurb: 'A real video editor in the browser — cuts, captions and exports, with AI doing the rough work.',
    feed: {
      human: [['h', 'Rahul · Video editor', 'Cut the founder interview to 60 seconds'], ['h', 'Rahul · Video editor', 'Colour-graded and added music'], ['h', 'Rahul · Video editor', 'Exported reels in 9:16 and 1:1']],
      agent: [['a', 'Reel · Editor AI', 'Transcribed footage and found the best hooks'], ['a', 'Reel · Editor AI', 'Auto-cut 5 short clips with captions'], ['a', 'Reel · Editor AI', 'Rendered every aspect ratio']],
      both: [['a', 'Reel · Editor AI', 'Rough-cut 5 clips and burned in captions'], ['h', 'Rahul · Video editor', 'Polished pacing and transitions on the top 2'], ['a', 'Reel · Editor AI', 'Rendered and handed off to SMM Studio']] } },
  { id: 'payroll', name: 'Squad Payroll', role: 'Attendance & payroll', status: 'Live', icon: 'clock', url: 'squadpayroll.upsquadconnect.com', nav: ['Attendance', 'Leave', 'Payruns'],
    blurb: 'Attendance, leave and salary runs — your HR person stays in control while AI prepares the numbers.',
    feed: {
      human: [['h', 'Neha · HR', 'Approved leave requests for the week'], ['h', 'Neha · HR', 'Checked attendance exceptions'], ['h', 'Neha · HR', 'Ran payroll and sent payslips']],
      agent: [['a', 'Roster · HR AI', 'Compiled attendance from every check-in'], ['a', 'Roster · HR AI', 'Calculated salaries, overtime and deductions'], ['a', 'Roster · HR AI', 'Generated payslips for review']],
      both: [['a', 'Roster · HR AI', 'Prepared the payrun with every adjustment'], ['h', 'Neha · HR', 'Reviewed the two edge cases, approved the run'], ['a', 'Roster · HR AI', 'Sent payslips to the whole team']] } },
  { id: 'crm', name: 'Squad CRM', role: 'Sales', status: 'Live', icon: 'chat', url: 'crm.squadhub.in', nav: ['Inbox', 'Pipeline', 'Follow-ups'],
    blurb: 'Every conversation that comes into the business, in one inbox and pipeline — AI answers fast, your rep closes.',
    feed: {
      human: [['h', 'Kiran · Sales rep', 'Called three warm leads from WhatsApp'], ['h', 'Kiran · Sales rep', 'Moved a deal to proposal stage'], ['h', 'Kiran · Sales rep', 'Logged notes and next steps']],
      agent: [['a', 'Closer · Sales AI', 'Answered new enquiries within seconds'], ['a', 'Closer · Sales AI', 'Qualified leads and tagged intent'], ['a', 'Closer · Sales AI', 'Scheduled follow-ups automatically']],
      both: [['a', 'Closer · Sales AI', 'Replied instantly and qualified the lead'], ['h', 'Kiran · Sales rep', 'Took over the hot lead on a call'], ['a', 'Closer · Sales AI', 'Logged the call and set the follow-up']] } },
];
const MODES = [{ id: 'human', label: 'Human', icon: 'person' }, { id: 'agent', label: 'AI', icon: 'bot' }, { id: 'both', label: 'Together', icon: 'hub' }];

const WA = (n) => 'https://wa.me/919995266385?text=' + encodeURIComponent(n);
const ROLES_BY_SQUAD = {"Content Creation":[["Creative Director","Oversees creative vision and brand direction across all content.","soon"],["Copy / Content Writers","Creates compelling copy and content that speaks to your audience.","soon"],["Designers","Crafts visual assets, graphics, and brand identities that stand out.","live"],["Editors","Polishes and refines video and written content to perfection.","live"],["Social Media Managers","Manages and grows your brand's presence across social platforms.","soon"],["Videographers & Photographers","Captures high-quality visual content that tells your brand story.","wait"],["AI Video & Image Creator","","soon"]]};
const BOTS = [
        { name: 'Sales bot', status: 'wait', desc: 'Replies to new enquiries, qualifies leads and books follow-ups in Squad CRM.' },
        { name: 'Customer support bot', status: 'wait', desc: 'Answers customer questions instantly and hands tricky cases to your team.' },
        { name: 'SMM bot', status: 'beta', desc: 'Plans, writes and schedules posts across your accounts in SMM Studio.' },
        { name: 'Ad specialist bot', status: 'beta', desc: 'Sets up, monitors and tunes your ad campaigns.', note: 'Meta ads now · more ad platforms soon' },
        { name: 'Content bot', status: 'beta', desc: 'Writes captions, scripts and blog drafts in your brand voice.' },
        { name: 'Accountant bot', desc: 'Keeps your books up to date and flags anything that needs a human eye.' },
      ];
const SQUADS = [
  { name: 'Content Creation', icon: 'content', dark: true, tags: ['Graphic Designers', 'Video Editors', 'Creative Leads', 'Social Media Managers', 'Copywriters'], description: 'End-to-end content for your brand across design, video and social.' },
  { name: 'Marketing', icon: 'marketing', badge: 'Beta', tags: ['Ad Specialists', 'Digital Marketers', 'Offline Marketers', 'PR Experts'], description: 'Growth-focused marketing across digital, offline and PR.' },
  { name: 'Tech', icon: 'tech', badge: 'Pilot Run', tags: ['Web Development', 'App Building', 'Automation', 'Software Solutions'], description: 'Websites, apps and automation built to scale with you.' },
  { name: 'Accounts & Finance', icon: 'finance', badge: 'Beta', tags: ['Bookkeeping', 'Payroll', 'Tax Planning', 'Financial Reporting', 'Fractional CFO'], description: 'Your financial back office, fully managed.' },
  { name: 'Legal', icon: 'legal', badge: 'Launching Soon', tags: ['Contract Drafting', 'IP Protection', 'Compliance', 'Business Formation'], description: 'Legal support without the hourly rates.' },
  { name: 'Hiring & HR', icon: 'hire', badge: 'Launching Soon', tags: ['Recruiting', 'Team Building', 'HR Processes', 'Onboarding'], description: 'Hiring and HR for growing teams.' },
];


export default class HomeLanding extends React.Component {
  state = { modelMode: 'mix', oneModel: 'Anthropic', botModels: {}, boardCards: [{ id: 't1', title: 'Monthly P&L', app: 'Squad Books', who: 'a', av: 'LG' }, { id: 't2', title: 'Diwali campaign visuals', app: 'Creative Studio', who: 'h', av: 'MY' }, { id: 't3', title: 'Reply to new leads', app: 'Squad CRM', who: 'a', av: 'CL' }, { id: 't4', title: 'Week 42 content calendar', app: 'SMM Studio', who: 'h', av: 'AR' }, { id: 't5', title: 'Founder interview reel', app: 'Video Studio', who: 'a', av: 'RL' }, { id: 't6', title: 'October payrun', app: 'Squad Payroll', who: 'h', av: 'NH' }].map((c, i) => ({ ...c, col: i % 4 })), boardTick: 0, drawerSq: null, openSq: 'Content Creation', deskI: 0, roleI: 0, stage: 0, stageKey: 0, appI: 0, appKey: 0, touched: false, mode: 'both', feedN: 0, orbitScale: 1 };
  orbitRef = React.createRef();

  componentDidMount() {
    this.tb = setInterval(() => this.setState(s => { const a = s.boardCards.slice(), i = s.boardTick % a.length; a[i] = { ...a[i], col: (a[i].col + 1) % 4 }; return { boardCards: a, boardTick: s.boardTick + 1 }; }), 1600);
    const anim = this.props.autoplay ?? true;
    this.t1 = setInterval(() => this.setState(s => ({ roleI: (s.roleI + 1) % CYCLE.length })), 2200);
    if (anim) this.startStage();
    this.startApps();
    this.runFeed();
    const fit = () => { const el = this.orbitRef.current; if (el) this.setState({ orbitScale: Math.min(1, el.clientWidth / 760) }); };
    fit();
    this.ro = new ResizeObserver(fit);
    if (this.orbitRef.current) this.ro.observe(this.orbitRef.current);
  }
  componentWillUnmount() { clearInterval(this.tb); clearInterval(this.t1); clearInterval(this.t2); clearTimeout(this.t3); clearInterval(this.t4); this.ro && this.ro.disconnect(); }
  stageSecs() { return 3.8; }
  startStage() {
    clearInterval(this.t2);
    this.t2 = setInterval(() => this.setState(s => { const next = (s.stage + 1) % 3; return { stage: next, stageKey: s.stageKey + 1, deskI: next === 0 ? (s.deskI + 1) % DESKS.length : s.deskI }; }), this.stageSecs() * 1000);
  }
  startApps() {
    clearTimeout(this.t3);
    if (this.state.touched) return;
    this.t3 = setTimeout(() => { this.setState(s => ({ appI: (s.appI + 1) % APPS.length, appKey: s.appKey + 1 }), () => { this.runFeed(); this.startApps(); }); }, 6000);
  }
  runFeed() {
    clearInterval(this.t4);
    this.setState({ feedN: 0 });
    let n = 0;
    this.t4 = setInterval(() => { n += 1; this.setState({ feedN: n }); if (n >= 3) clearInterval(this.t4); }, 550);
  }

  renderVals() {
    const { stage, appI, mode, feedN } = this.state;
    const tf = (i, len) => ((360 / len) * i) + 'deg';
    const app = APPS[appI];
    const feed = app.feed[mode].slice(0, feedN).map(([who, name, text]) => {
      const h = who === 'h';
      return { name, text, icon: ic(h ? 'person' : 'bot', 16), avBg: h ? '#ffff99' : '#8fe3ff', avRadius: h ? '999px' : '30%', avRing: h ? 'rgba(214,186,0,.12)' : 'rgba(20,160,214,.12)', border: h ? 'rgba(214,186,0,.25)' : 'rgba(20,160,214,.25)' };
    });
    const showMarquee = this.props.showMarquee ?? true;
    return {
      heroLine: this.props.heroLine ?? 'Humans and AI, working together.',
      showMarquee,
      role: CYCLE[this.state.roleI], roleKey: 'r' + this.state.roleI,
      orbitRef: this.orbitRef, orbitScale: this.state.orbitScale,
      orbitInner: INNER.map((label, i) => ({ label, a: tf(i, INNER.length) })),
      orbitOuter: OUTER.map((label, i) => ({ label, a: tf(i, OUTER.length) })),
      botIcon: ic('bot', 14), personIcon: ic('person', 14), personIconLg: ic('person', 28),
      marquee: [...ROLES, ...ROLES],
      stageSecs: this.stageSecs(),
      stages: STAGES.map((s, i) => ({ ...s, on: i === stage, barKey: 'b' + this.state.stageKey,
        bg: i === stage ? '#fff' : 'transparent', border: i === stage ? 'rgba(10,10,20,.16)' : 'rgba(10,10,20,.08)', numColor: i === stage ? (i === 1 ? '#0a7fae' : '#8a7600') : '#9a9aa5',
        pick: () => { this.setState(st => ({ stage: i, stageKey: st.stageKey + 1 })); this.startStage(); } })),
      stageLabel: STAGES[stage].label,
      humanTag: STAGES[stage].tag,
      humanScale: stage === 2 ? 1.1 : 1,
      humanGlow: stage === 0 ? '0 0 0 4px rgba(214,186,0,.15)' : stage === 1 ? '0 0 0 6px rgba(214,186,0,.15),0 0 0 14px rgba(20,160,214,.12)' : '0 0 0 8px rgba(214,186,0,.2),0 0 0 18px rgba(20,160,214,.14),0 0 60px rgba(20,160,214,.35)',
      agentOpacity: stage >= 1 ? 1 : 0,
      deskName: DESKS[this.state.deskI].name, deskSlug: DESKS[this.state.deskI].slug, deskKey: 'd' + this.state.deskI,
      hubIconLg: ic('hub', 28), hubIcon: ic('hub', 24),
      agents: DESKS[this.state.deskI].agents.map((label, i) => ({ label, top: AGENT_TOPS[i], x: stage >= 1 ? '0px' : '40px', delay: (i * 0.12) + 's' })),
      tasks: DESKS[this.state.deskI].tasks.map((title, i) => { const st = TASK_STATES[stage]; return { title, ...st, key: 't' + this.state.stageKey + i, delay: (i * 0.15) + 's' }; }),
      modes: MODES.map(m => {
        const on = m.id === mode;
        return { label: m.label, icon: ic(m.icon, 16), color: on ? '#000' : '#5b5b66',
          bg: on ? (m.id === 'human' ? '#ffff99' : m.id === 'agent' ? '#8fe3ff' : 'linear-gradient(90deg,#ffff99,#8fe3ff)') : 'transparent',
          pick: () => { this.setState({ mode: m.id, touched: true }, () => this.runFeed()); clearTimeout(this.t3); } };
      }),
      modeLabel: MODES.find(m => m.id === mode).label,
      apps: APPS.map((a, i) => {
        const on = i === appI;
        return { name: a.name, role: a.role, blurb: a.blurb, status: a.status, on, bar: on && !this.state.touched, barKey: 'a' + this.state.appKey,
          icon: ic(a.icon, 18), bg: on ? 'rgba(10,10,20,.055)' : 'transparent', border: on ? 'rgba(10,10,20,.16)' : 'rgba(10,10,20,.08)',
          iconBg: on ? '#0b0b10' : 'rgba(10,10,20,.055)', iconColor: on ? '#fbfbf8' : '#0b0b10',
          statusColor: a.status === 'Live' ? '#13a35a' : '#5b5b66', statusBg: a.status === 'Live' ? 'rgba(19,163,90,.08)' : 'rgba(10,10,20,.055)',
          pick: () => { this.setState({ appI: i, touched: true }, () => this.runFeed()); clearTimeout(this.t3); } };
      }),
      app: { name: app.name, url: app.url, icon: ic(app.icon, 16), navItems: app.nav.map((label, i) => ({ label, color: i === 0 ? '#0b0b10' : '#5b5b66', bg: i === 0 ? 'rgba(10,10,20,.055)' : 'transparent' })) },
      showHumanAv: mode !== 'agent', showAgentAv: mode !== 'human',
      feed,
      subPoints: ['A dedicated, vetted squad + a Squad Manager for overall oversight and support', 'Flat monthly pricing — name the budget that works for you', 'Send unlimited requests; get steady, on-brand work every week', 'No contracts — pause or cancel anytime'],
      alternatives: [
        { step: '02', name: 'Assignments', title: 'Order a one-off assignment', description: 'Just one thing that needs doing? Send a brief and get a flat fee with a fixed delivery date. Pay only for that piece of work — nothing recurring.', points: ['Fixed fee, fixed deadline', 'Revisions until you sign off'], cta: 'Send a brief', href: WA("Hi upsquad, I'd like a quote for a one-time assignment."), icon: ic('assign') },
        { step: '03', name: 'Hiring', title: 'Hire vetted talent in-house', description: 'Want someone on your own payroll? We shortlist vetted candidates matched to your brief. You interview, select, and onboard — backed by a replacement guarantee.', points: ['Curated shortlist matched to your brief', 'Replacement guarantee'], cta: 'Explore hiring', href: WA('Hi upsquad, I want to hire vetted talent in-house.'), icon: ic('hire') },
      ],
      steps: [
        { n: '01', title: 'Subscribe to a plan', description: 'Choose the subscription that fits your brand\'s needs. No contracts, no lock-ins — pause or cancel anytime.', icon: ic('clip') },
        { n: '02', title: 'Meet your squad', description: 'We assemble the right experts from the right squad for your brand — vetted professionals, ready to get to work.', icon: ic('team') },
        { n: '03', title: 'Scale your brand', description: 'Stay consistent, save time, and focus on what matters — growing your business. Your squad handles the rest.', icon: ic('trend') },
      ],
      humanIcon: ic('person', 28, 1.6), botIcon: ic('bot', 28, 1.6),
      hubIcons: { spark: ic('spark', 18, 1.6), person: ic('person', 18, 1.6), bot: ic('bot', 18, 1.6), hub: ic('hub', 18, 1.6) },
      ...(() => { const HU = { avBg: '#FFFF99', avR: '999px', avRing: 'rgba(214,186,0,.12)' }, AG = { avBg: '#8fe3ff', avR: '30%', avRing: 'rgba(20,160,214,.12)' }, W = (w) => w === 'h' ? HU : AG;
        const cards = this.state.boardCards;
        const board = ['Queued', 'In progress', 'Review', 'Done'].map((name, ci) => { const cs = cards.filter(c => c.col === ci).map(c => ({ ...c, ...W(c.who) })); return { name, count: cs.length, cards: cs, cardBd: ci === 3 ? 'rgba(34,197,94,.3)' : 'rgba(10,10,20,.08)' }; });
        const tag = (w) => w === 'h' ? { tag: 'Human', ink: '#8a7a00', tagBg: 'rgba(214,186,0,.08)', tagBd: 'rgba(214,186,0,.2)', tagIcon: ic('person', 12, 1.6) } : { tag: 'Agent', ink: '#0e7fa8', tagBg: 'rgba(20,160,214,.08)', tagBd: 'rgba(20,160,214,.2)', tagIcon: ic('bot', 12, 1.6) };
        const growers = [
          { lead: { who: 'h', av: 'MY', name: 'Maya', role: 'Designer · hired via SquadHire' }, subs: [{ who: 'h', av: 'F1', name: 'Freelance illustrator' }, { who: 'a', av: 'CV', name: 'Canvas · resize bot' }], verb: 'brought in' },
          { lead: { who: 'a', av: 'LG', name: 'Ledger', role: 'Accountant bot · via SquadBots' }, subs: [{ who: 'a', av: 'RC', name: 'Reconciler sub-agent' }, { who: 'h', av: 'CA', name: 'Freelance CA for sign-off' }], verb: 'spun up' },
        ].map(g => ({ ...g.lead, ...W(g.lead.who), verb: g.verb, subs: g.subs.map(k => ({ ...k, ...W(k.who), ...tag(k.who) })) }));
        return { board, growers }; })(),
      hubIcons: { spark: ic('spark', 20, 1.6), person: ic('person', 20, 1.6), bot: ic('bot', 20, 1.6), hub: ic('hub', 20, 1.6) },
      modelPoints: ['Pick a provider per bot, or one for all', 'Switch providers whenever you like', 'The control stays fully with you'],
      ...(() => { const { modelMode, oneModel, botModels } = this.state, mix = modelMode === 'mix';
        const P = { OpenAI: '#10a37f', Anthropic: '#d97757', Google: '#4285f4', DeepSeek: '#4d6bfe', GLM: '#7c5cff' };
        return { oneMode: !mix, mixBg: mix ? '#0b0b10' : 'transparent', mixFg: mix ? '#fbfbf8' : '#5b5b66', oneBg: mix ? 'transparent' : '#0b0b10', oneFg: mix ? '#5b5b66' : '#fbfbf8',
          setMix: () => this.setState({ modelMode: 'mix' }), setOne: () => this.setState({ modelMode: 'one' }),
          oneOpts: Object.keys(P).map(p => ({ name: p, color: P[p], bd: p === oneModel ? '#0b0b10' : 'rgba(10,10,20,.08)', pick: () => this.setState({ oneModel: p }) })),
          modelRows: BOTS.map((b, i) => { const name = b.name, cur = mix ? (botModels[name] || Object.keys(P)[i % 5]) : oneModel;
            return { name, icon: ic('bot', 14, 1.6), current: cur, opts: Object.keys(P).map(p => { const on = p === cur;
              return { name: p, color: P[p], weight: on ? 500 : 400, fg: on ? '#0b0b10' : '#5b5b66', bg: on ? P[p] + '1f' : 'transparent', bd: on ? P[p] : 'transparent',
                pick: () => mix ? this.setState(s => ({ botModels: { ...s.botModels, [name]: p } })) : this.setState({ oneModel: p }) }; }) }; }) }; })(),
      drawerOpen: !!this.state.drawerSq,
      closeDrawer: () => this.setState({ drawerSq: null }),
      drawer: (() => { const s = SQUADS.find(x => x.name === this.state.drawerSq); if (!s) return { roles: [] };
        const def = 'live';
        const list = ROLES_BY_SQUAD[s.name] || s.tags.map(t => [t, '', def]);
        const st = { live: ['Live', '#0A0A0A', '#E9E9EC', 'rgba(0,0,0,.12)', true, '#0A0A0A'], wait: ['Join Waiting List', '#fff', '#0A0A0A', '#0A0A0A', true, '#FFFF99'], soon: ['Coming Soon', '#A3A3A3', '#fff', 'rgba(0,0,0,.08)', false, ''] };
        return { name: s.name, icon: ic(s.icon, 22, 1.5), smallIcon: ic(s.icon, 18, 1.5), href: WA('I want to know more about the ' + s.name + ' squad'),
          roles: list.map(([name, desc, k]) => { const v = st[k]; return { name, desc: desc || false, status: v[0], fg: v[1], bg: v[2], bd: v[3], dot: v[4], dotColor: v[5], border: k === 'wait' ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.06)', href: WA('I want to know more about ' + name + ' in the ' + s.name + ' squad') }; }) }; })(),
      squads: SQUADS.map(s => ({ ...s, open: () => this.setState({ drawerSq: s.name }), icon: ic(s.icon, 20, 1.5), light: !s.dark, soon: !s.interactive, interactive: !!s.interactive, badge: 'Live', tags: ROLES_BY_SQUAD[s.name] ? ROLES_BY_SQUAD[s.name].map(r => r[0]) : s.tags, href: WA('I want to know more about the ' + s.name + ' squad') })),
      bots: BOTS.map(b => { const st = { beta: ['Beta', '#525252', 'rgba(0,0,0,.04)', 'rgba(0,0,0,.08)', '#A3A3A3'], wait: ['Waiting list', '#fff', '#0A0A0A', '#0A0A0A', '#FFFF99'], live: ['Live', '#15803d', 'rgba(34,197,94,.1)', 'rgba(34,197,94,.2)', '#22c55e'] }[b.status || 'live']; return { ...b, sLabel: st[0], sFg: st[1], sBg: st[2], sBd: st[3], sDot: st[4], description: b.desc, note: b.note || false, icon: ic('bot', 20, 1.5), href: WA('I want to deploy the ' + b.name) }; }),
      squadGroups: [
        { label: 'Available now', pill: 'Live', pillColor: '#15803d', pillBg: 'rgba(34,197,94,.1)', dot: '#22c55e', names: ['Content Creation'] },
        { label: 'Join the waitlist', pill: 'Beta', pillColor: '#525252', pillBg: 'rgba(0,0,0,.05)', dot: '#A3A3A3', names: ['Marketing', 'Accounts & Finance'] },
        { label: 'Launching soon', pill: 'Soon', pillColor: '#525252', pillBg: 'rgba(0,0,0,.05)', dot: '#D4D4D4', names: ['Tech', 'Legal', 'Hiring & HR'] },
      ].map(g => ({ ...g, rows: g.names.map(n => {
        const sq = SQUADS.find(x => x.name === n), open = this.state.openSq === n;
        return { ...sq, icon: ic(sq.icon, 18, 1.6), open, rot: open ? '45deg' : '0deg', count: sq.tags.length + ' roles', interactive: !!sq.interactive,
          href: WA('I want to know more about the ' + n + ' squad'),
          bg: open ? '#FFFDE6' : '#F7F7F8', border: open ? 'rgba(214,186,0,.45)' : 'rgba(0,0,0,.06)',
          toggle: () => this.setState(s => ({ openSq: s.openSq === n ? null : n })) };
      }) })),
      footerCols: [
        { heading: 'Platform', items: [{ name: 'The idea', href: '#idea' }, { name: 'Humans + AI', href: '#together' }, { name: 'How it Works', href: '#how-it-works' }, { name: 'Subscriptions', href: '#categories' }] },
        { heading: 'Squads', items: [{ name: 'Content Squad', href: '#categories' }, { name: 'Marketing Squad', href: '#categories' }, { name: 'Tech Squad', href: '#categories' }, { name: 'Legal Squad', href: '#categories' }] },
        { heading: 'Company', items: [{ name: 'About', href: '#' }, { name: 'Careers', href: '/careers/' }, { name: 'Contact', href: '#contact' }] },
        { heading: 'Legal', items: [{ name: 'Privacy Policy', href: '#' }, { name: 'Terms of Service', href: '#' }, { name: 'Cookie Policy', href: '#' }] },
      ],
    };
  }

  render() {
    return <HomeMarkup v={this.renderVals()} />
  }
}
