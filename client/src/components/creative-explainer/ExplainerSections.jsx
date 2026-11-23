"use client"
import ScrollReveal from '../ScrollReveal'
import { serviceOptions, processSteps, plans } from '../../data/designerEditorExplainer'

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="h-px w-8 accent-bar" />
      <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-text-secondary">{children}</span>
    </div>
  )
}

function Check() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Script §1: the three things you can subscribe to.
export function ServiceOptions() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <Eyebrow>What you can get</Eyebrow>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            A designer, a video editor, or both.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Choose the subscription that matches what your business needs done.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceOptions.map((option, i) => (
            <ScrollReveal key={option.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 sm:p-7 h-full">
                <h3 className="font-heading text-lg font-bold text-text-primary">{option.title}</h3>
                <p className="text-sm text-text-secondary mt-1 mb-5">{option.description}</p>
                <ul className="space-y-3">
                  {option.examples.map((example) => (
                    <li key={example} className="flex items-start gap-2.5 text-sm text-text-primary">
                      <Check />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Script §2: the subscription model, including the limit on "unlimited".
export function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <ScrollReveal>
          <Eyebrow>How the subscription works</Eyebrow>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
            Subscribe instead of hiring full-time.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
            Pick a monthly plan based on your business requirements. Our team then handles your design or
            video editing requests according to that plan, and you can submit new requests whenever you need.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] p-5 sm:p-6">
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-[-0.02em]">Unlimited</p>
              <p className="text-sm text-text-secondary mt-1">work requests</p>
            </div>
            <div className="rounded-2xl border border-[rgba(0,0,0,0.08)] p-5 sm:p-6">
              <p className="font-heading text-2xl sm:text-3xl font-extrabold text-text-primary tracking-[-0.02em]">Unlimited</p>
              <p className="text-sm text-text-secondary mt-1">revisions</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border-[1.5px] border-black bg-brand-accent/40 shadow-brutal p-6">
            <h3 className="font-heading text-base font-bold text-text-primary">What your plan decides</h3>
            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
              How many tasks can be worked on at the same time, and how your requests are scheduled. Our team
              works through them based on your plan&rsquo;s workflow and available capacity.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// Script §3: the five-step SquadHub process.
export function SquadHubProcess() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">
        <ScrollReveal>
          <Eyebrow>Our process</Eyebrow>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em]">
            All your work is managed in SquadHub.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed">
            Once your subscription is active, you get access to SquadHub, our dedicated platform to submit,
            manage, and track all your creative requirements.
          </p>
        </ScrollReveal>

        <ol>
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.05}>
              <li className="relative flex gap-4 pb-8">
                {i < processSteps.length - 1 && (
                  <span className="absolute left-[17px] top-9 bottom-0 w-px bg-black/15" aria-hidden="true" />
                )}
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-purple text-white text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-heading text-base font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">{step.description}</p>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

const TASK_STYLES = {
  active: 'bg-brand-accent text-black border-black',
  scheduled: 'bg-transparent text-text-primary border-dashed border-text-primary',
  waiting: 'bg-surface-secondary text-text-muted border-transparent',
  managed: 'bg-brand-purple/10 text-text-secondary border-transparent',
}

const TASK_LABELS = {
  active: 'Active',
  scheduled: 'Scheduled',
  waiting: 'Waiting',
  managed: 'Managed by your creative',
}

function taskStates({ active, scheduled, rest }) {
  return Array.from({ length: 10 }, (_, i) => {
    if (i < active) return 'active'
    if (i < active + scheduled) return 'scheduled'
    return rest
  })
}

function TaskDiagram({ plan }) {
  const states = taskStates(plan.tasks)
  const description = [...new Set(states)]
    .map((state) => `${states.filter((s) => s === state).length} ${TASK_LABELS[state].toLowerCase()}`)
    .join(', ')
  return (
    <div>
      <div
        role="img"
        aria-label={`Ten requests on the ${plan.name} plan: ${description}`}
        className="grid grid-cols-5 sm:grid-cols-10 gap-1.5"
      >
        {states.map((state, i) => (
          <span
            key={i}
            className={`flex items-center justify-center h-9 rounded-md border text-xs font-semibold ${TASK_STYLES[state]}`}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5" aria-hidden="true">
        {[...new Set(states)].map((state) => (
          <li key={state} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span className={`w-3 h-3 rounded-sm border ${TASK_STYLES[state]}`} />
            {TASK_LABELS[state]}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Script §4: how each plan moves the same 10 requests through the pipeline.
export function PlanPipelines() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <Eyebrow>The four plans</Eyebrow>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Imagine your business has 10 requests.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            The main difference between plans is how your tasks move through the pipeline and how many can be
            worked on at a time. Here is how each plan handles the same work.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={(i % 2) * 0.1}>
              <article className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 sm:p-7 h-full flex flex-col">
                <h3 className="font-heading text-xl font-extrabold text-text-primary">{plan.name}</h3>
                <p className="text-sm text-text-secondary mt-1 mb-5">{plan.tagline}</p>
                <TaskDiagram plan={plan} />
                <ul className="mt-5 space-y-3 flex-1">
                  {plan.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed">
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-muted">Next task</p>
                  <p className="text-sm font-medium text-text-primary mt-1 leading-relaxed">{plan.nextTask}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function PriceRow({ label, amount }) {
  return (
    <div>
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="font-heading text-2xl font-extrabold text-text-primary tracking-[-0.02em] mt-0.5">
        {formatPrice(amount)}
        <span className="text-xs font-medium text-text-secondary tracking-normal"> /month</span>
      </p>
    </div>
  )
}

// Script §5: pricing for both subscription types, per plan.
export function PlanPricing() {
  return (
    <section className="py-16 lg:py-20 px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <Eyebrow>Subscription pricing</Eyebrow>
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-text-primary tracking-[-0.025em] max-w-3xl">
            Select a plan by your requirements and budget.
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl">
            With a Combo subscription, you can submit both design and video editing requests under a single
            plan. The workflow and task pipeline depend on the tier you choose.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] shadow-sm p-6 h-full flex flex-col">
                <h3 className="font-heading text-lg font-extrabold text-text-primary">{plan.name}</h3>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed flex-1">{plan.summary}</p>
                <div className="mt-5 pt-5 border-t border-[rgba(0,0,0,0.08)] space-y-4">
                  <PriceRow label="Designer or Video Editor" amount={plan.price.single} />
                  <PriceRow label="Designer + Video Editor Combo" amount={plan.price.combo} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
