"use client"
import ScrollReveal from './ScrollReveal'

const testimonials = [
  {
    quote: 'Finally, a subscription that actually replaces hiring. Our content output tripled in the first month — without adding a single full-time employee.',
    name: 'Riya Menon',
    role: 'Founder, Studio Leaf',
    initials: 'RM',
    squad: 'Content Creation',
  },
  {
    quote: 'We were paying 4 different agencies. Now it\'s one subscription, one team, one bill. UpSquad is exactly what modern brands need.',
    name: 'Arjun Nair',
    role: 'Co-founder, Brik Ventures',
    initials: 'AN',
    squad: 'Marketing',
  },
  {
    quote: 'Having accounts, legal, and hiring all under one plan saved us weeks of coordination every month. It\'s a completely different way to run a brand.',
    name: 'Sneha Patil',
    role: 'Head of Ops, Creatify',
    initials: 'SP',
    squad: 'Accounts & Legal',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-brand-purple" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-[60px] lg:py-[120px] px-5 sm:px-8 bg-white">
      <div className="max-w-[1160px] mx-auto">
        <ScrollReveal>
          <div className="mb-14 pb-14 border-b border-[rgba(96,96,163,0.15)]">
            <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple mb-3" />
            <p className="font-mono text-[11px] font-medium text-text-secondary uppercase tracking-[0.14em] mb-4">Our Vision</p>
            <p className="text-xl sm:text-2xl font-medium text-text-primary leading-relaxed max-w-3xl">
              To empower businesses, brands, and creators with an all-in-one subscription solution
              that brings together content, marketing, accounts, finance, hiring, and legal —
              helping them scale faster and smarter.
            </p>
          </div>
        </ScrollReveal>

        <div className="mb-12">
          <ScrollReveal>
            <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-brand-pink to-brand-purple mb-3" />
            <p className="font-mono text-[11px] font-medium text-text-secondary uppercase tracking-[0.14em] mb-2">Early Feedback</p>
            <h2 className="font-heading text-3xl lg:text-h2 font-bold text-text-primary tracking-tight mb-10">What brands are saying</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-[rgba(96,96,163,0.2)] shadow-sm hover:shadow-card-hover transition-all duration-short flex flex-col h-full">
                  <Stars />
                  <blockquote className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple text-text-primary font-semibold text-xs flex items-center justify-center flex-shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-text-primary truncate">{t.name}</div>
                      <div className="text-xs text-text-muted truncate">{t.role}</div>
                    </div>
                    <span className="text-xs text-text-primary bg-brand-purple/5 border border-brand-purple/20 px-2 py-0.5 rounded-md flex-shrink-0">
                      {t.squad}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="bg-gradient-to-r from-brand-pink to-brand-purple rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5 border-2 border-black shadow-brutal-lg">
            <div>
              <h3 className="font-heading text-xl font-bold text-text-primary mb-1">Be among the first.</h3>
              <p className="text-sm text-text-primary/80">
                Join the waitlist to get early access and exclusive launch offers.
              </p>
            </div>
            <a
              href="#"
              className="flex-shrink-0 bg-black hover:bg-gray-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl border-2 border-black transition-all duration-short whitespace-nowrap"
            >
              Join the Waitlist →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
