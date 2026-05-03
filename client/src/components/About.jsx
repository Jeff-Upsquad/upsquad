"use client"
import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-surface-secondary">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid md:grid-cols-[180px_1fr] gap-10 items-start">
          <ScrollReveal direction="left">
            <div className="pt-1">
              <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple mb-3" />
              <span className="block font-mono text-[11px] font-medium text-text-secondary uppercase tracking-[0.14em]">About Us</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl">
              <p className="text-lg text-text-primary leading-relaxed mb-4 font-heading font-bold">
                The Future of Work Starts Here
              </p>
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                UpSquad is a new way for businesses to build teams — without the complexity of
                traditional hiring.
              </p>
              <p className="text-base text-text-secondary leading-relaxed mb-4">
                Instead of recruiting full-time or part-time employees, businesses can subscribe to
                UpSquad and access skilled professionals on demand. From design and development to
                marketing and operations, you get the talent you need — when you need it.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                Built for startups, growing brands, and modern businesses that want flexibility,
                UpSquad helps you move faster without the cost and commitment of traditional hiring.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
