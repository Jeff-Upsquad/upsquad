"use client"
import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
          <ScrollReveal direction="left">
            <div className="pt-1">
              <span className="inline-block w-8 h-[3px] rounded-full bg-text-primary mb-3" />
              <span className="block font-mono text-[11px] font-medium text-text-muted uppercase tracking-[0.18em]">About Us</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl">
              <p className="text-2xl sm:text-[28px] text-text-primary leading-[1.25] mb-6 font-heading font-extrabold tracking-[-0.02em]">
                The future of work starts here.
              </p>
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                UpSquad is a new way for businesses to get work done — without the cost and
                complexity of traditional hiring.
              </p>
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                It works three ways.{' '}
                <span className="font-semibold text-text-primary">Subscribe</span> to a dedicated squad
                that handles your work end to end, month after month.{' '}
                <span className="font-semibold text-text-primary">Order a one-off assignment</span> when
                you just need a single thing done. Or{' '}
                <span className="font-semibold text-text-primary">hire vetted talent</span> directly,
                backed by a replacement guarantee.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Subscription is where most brands start — the best value, and the least to manage.
                Whichever way you choose, you get skilled professionals across content, marketing,
                tech, accounts, and more, exactly when you need them.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
