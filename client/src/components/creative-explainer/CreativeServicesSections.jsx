import ScrollReveal from '../ScrollReveal'

function Section({ id, eyebrow, title, description, children, muted = false }) {
  return <section id={id} className={`py-16 lg:py-20 px-5 sm:px-8 ${muted ? 'bg-surface-secondary' : 'bg-white'}`}>
    <div className="max-w-[1160px] mx-auto">
      <ScrollReveal><p className="font-mono-tech text-sm uppercase tracking-[0.14em] text-text-secondary mb-4">{eyebrow}</p>
        <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-text-primary max-w-3xl">{title}</h2>
        {description && <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl">{description}</p>}
      </ScrollReveal>
      <div className="mt-10">{children}</div>
    </div>
  </section>
}

function Card({ title, children, accent = false }) {
  return <article className={`h-full rounded-2xl border p-6 sm:p-8 ${accent ? 'bg-brand-accent/30 border-black shadow-brutal' : 'bg-white border-black/10 shadow-sm'}`}>
    <h3 className="font-heading text-xl font-bold text-text-primary mb-4">{title}</h3>
    <div className="text-base text-text-secondary leading-relaxed space-y-4">{children}</div>
  </article>
}

export function CreativeExplainerSections() {
  return <>
    <nav aria-label="Explore creative services" className="border-y border-black/10 bg-surface-secondary px-5 py-5">
      <div className="max-w-[1160px] mx-auto flex flex-wrap gap-x-8 gap-y-3 text-base font-semibold">
        <a href="#subscriptions">Subscriptions</a><a href="#assignments">Assignments</a><a href="#hiring">Hiring</a><a href="#creative-enquiry">Get started</a>
      </div>
    </nav>
    <Section eyebrow="Three ways to work" title="Creative support that fits your business." description="A Graphic Designer, a Video Editor, or both. Choose how you want to work together.">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          ['Subscribe', 'Ongoing creative work, with a monthly hourly or output-based subscription.', '#subscriptions'],
          ['Assign', 'One-time projects with an agreed scope, price, and delivery timeline.', '#assignments'],
          ['Hire', 'Full-time or part-time creative professionals who join your own business.', '#hiring'],
        ].map(([title, text, href]) => <Card title={title} key={title}><p>{text}</p><a href={href} className="inline-block font-semibold text-text-primary underline underline-offset-4">Explore {title.toLowerCase()}</a></Card>)}
      </div>
    </Section>
    <Section id="subscriptions" muted eyebrow="Subscriptions" title="Two models. One dedicated creative partner." description="Subscribe monthly to a Graphic Designer, a Video Editor, or both. Choose flexibility by time or predictability by output.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Hourly subscription" accent>
          <p>Choose the working hours you need each day.</p>
          <div className="flex flex-wrap gap-2" aria-label="Available daily working hours">{[1,2,4,6,8].map(n => <span key={n} className="rounded-full bg-white border border-black/15 px-4 py-2 font-semibold text-text-primary">{n} {n === 1 ? 'hour' : 'hours'}/day</span>)}</div>
          <p>A two-hour Designer subscription gives you two hours of work on your business requirements every working day.</p>
          <p>Request social media posters, branding, presentations, or other creative work within your assigned professional’s skill set. Tasks are completed within your plan’s available hours.</p>
          <a href="#creative-enquiry" className="inline-block font-semibold text-text-primary underline underline-offset-4">Enquire about hourly support</a>
        </Card>
        <Card title="Output-based subscription">
          <p>Agree on a recurring set of deliverables and a customised monthly price.</p>
          <ul className="list-disc pl-5 space-y-2"><li>Five posters per day</li><li>Three reels per week</li><li>A fixed monthly mix of posters and videos</li></ul>
          <p>Share the scope and quantity you need. UpSquad will propose a subscription around those requirements.</p>
          <p>Only the task types in your agreed scope are included. A five-posters-per-day subscription covers those posters; other design work requires a separate agreement.</p>
          <a href="#creative-enquiry" className="inline-block font-semibold text-text-primary underline underline-offset-4">Request a customised subscription</a>
        </Card>
      </div>
      <p className="mt-6 border-l-4 border-brand-purple pl-5 text-base text-text-secondary leading-relaxed"><strong className="text-text-primary">The key difference:</strong> Hourly plans allow different tasks within your professional’s skills and available hours. Output-based plans cover the specific task types and quantities agreed in your subscription.</p>
    </Section>
    <Section eyebrow="Subscription benefits" title="Stay flexible as your business changes.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          ['Unlimited requests & revisions', 'On hourly plans, submit unlimited requests and revisions. Work is processed within your available plan hours.'],
          ['Pause when eligible', 'Eligible subscriptions can be paused, with unused value retained as credit for up to six months.'],
          ['Cancel & request a refund', 'Request a refund of the eligible unused balance when you cancel.'],
          ['Request a replacement', 'If your assigned professional is not the right fit, ask for a replacement.'],
          ['Adjust your hours', 'Upgrade or downgrade your hourly subscription as your workload changes.'],
          ['Support without permanent hiring', 'Get ongoing creative help without hiring a permanent employee.'],
        ].map(([title, text]) => <Card title={title} key={title}><p>{text}</p></Card>)}
      </div>
    </Section>
    <Section id="assignments" muted eyebrow="Assignments" title="One project. A clear scope." description="For a logo, branding project, promotional video, or a collection of social media creatives.">
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Share your project brief"><p>Tell us the requirements. Available Designers and Video Editors provide quotations with a defined scope, price, and delivery timeline.</p></Card>
        <Card title="Choose your professional"><p>Review proposals, select your preferred professional, and arrange payment through the assignment process.</p></Card>
        <Card title="Receive the agreed work"><p>Once the agreed work is delivered, payment is released to the service provider.</p></Card>
      </div>
      <p className="mt-6 text-base text-text-secondary">Start by sharing your requirements below. No payment is collected on this page.</p>
    </Section>
    <Section id="hiring" eyebrow="Jobs & hiring" title="Bring the right creative into your team." description="Hire a full-time or part-time Designer or Video Editor directly into your business, with a Recruitment Manager assisting throughout.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="You make the final selection"><p>Submit your job requirements. UpSquad helps shortlist suitable candidates so you can review profiles, schedule interviews, and evaluate your options.</p></Card>
        <Card title="Support through the hiring process" accent><p>Our hiring plans include replacement guarantees. If we cannot find a suitable candidate, your recruitment payment is refunded in full.</p></Card>
      </div>
    </Section>
    <Section muted eyebrow="SquadHub + Squad Manager" title="Your work, organised. Your team, supported." description="With subscriptions and assignments, you get a platform to manage the work and a dedicated person to help coordinate it.">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Manage everything in SquadHub"><ul className="list-disc pl-5 space-y-3"><li>Submit tasks and share reference files</li><li>Communicate with your creative team</li><li>Review work and request revisions</li><li>Monitor progress in one place</li></ul></Card>
        <Card title="A Squad Manager by your side"><p>Your Squad Manager helps coordinate work, monitor progress, and resolve issues, so you have a support person to turn to throughout the process.</p></Card>
      </div>
    </Section>
    <section className="bg-[#0A0A0A] text-white px-5 sm:px-8 py-16 lg:py-20">
      <div className="max-w-[1160px] mx-auto"><p className="text-[#FFFF99] text-sm uppercase tracking-widest mb-4">Getting started</p><h2 className="font-heading text-3xl md:text-4xl font-extrabold max-w-3xl">Your next creative partner starts with a conversation.</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-8">{[
          ['Share your business profile', 'Tell us about your business and the creative work you need.'],
          ['Find your fit', 'Our sales team helps you choose the right service or subscription and review available professionals.'],
          ['Choose your partner', 'Select your preferred professional and get ready to work together.'],
        ].map(([title, text]) => <div key={title} className="border-t border-white/25 pt-5"><h3 className="text-lg font-bold mb-3">{title}</h3><p className="text-base text-white/75 leading-relaxed">{text}</p></div>)}</div>
        <a href="#creative-enquiry" className="mt-10 inline-flex rounded-full bg-[#FFFF99] text-black px-7 py-3.5 font-semibold">Share your requirements</a>
      </div>
    </section>
  </>
}
