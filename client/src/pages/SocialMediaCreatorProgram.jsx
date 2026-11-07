'use client'
import { useEffect, useState } from 'react'
import HeroMedia from '../components/landing/HeroMedia'
import LanguageGate from '../components/landing/LanguageGate'
import PartnerSignupLink from '../components/PartnerSignupLink'
import { useLanguageGate } from '../lib/useLanguageGate'
import { fetchLandingPage } from '../lib/landingPageApi'
import { usePartnerSignupUrl } from '../lib/usePartnerSignupUrl'

const SLUG = 'partner-program-social-media-creators'
const initialContent = {
  heroTitle: 'Your content. Your voice. Your next brand collaboration.',
  heroDescription:
    'Connect with brands that fit your profile. Your dedicated Squad Manager handles the conversations, briefs, and payments — so you can focus on creating.',
  defaultLanguageCode: 'en',
  languages: [],
}
const offers = [
  {
    number: '01',
    title: 'Brand Promotion Video',
    label: 'Explain & showcase',
    description:
      'Introduce a brand, product, or service to your audience. Shoot and edit a video that explains what it offers, then post it on your social media channel in collaboration with the brand’s channel.',
    points: [
      'Product, service, or brand explainers',
      'You shoot, edit, and publish',
      'A collaboration post with the brand',
    ],
  },
  {
    number: '02',
    title: 'Creative Brand Promotion Video',
    label: 'Concept & storytelling',
    description:
      'Bring the brand into a story your audience will want to watch. Develop an original concept, shoot and edit an engaging video, then publish it on your channel in collaboration with the brand’s channel.',
    points: [
      'An original concept developed by you',
      'More creative input and storytelling',
      'You shoot, edit, and publish with the brand',
    ],
  },
]
const steps = [
  [
    'Create your creator profile',
    'Showcase your social media channels, content, and interests so brands can find the right fit.',
  ],
  [
    'Find a collaboration that fits',
    'Receive matching brand requests, or browse brand-submitted requests that match your profile and apply to the ones you like.',
  ],
  [
    'Review the brief. Make it yours.',
    'Your Squad Manager discusses the requirement with the brand and shares a clear brief. Accept it, negotiate the terms, or decline. You decide.',
  ],
  [
    'Create, deliver, and get paid',
    'Shoot, edit, and post the agreed video in collaboration with the brand. UpSquad handles payment and guarantees you get paid within 10–20 days of delivery.',
  ],
]
const faqs = [
  [
    'How do I find brand collaborations?',
    'Create your profile to receive matching brand requests. You can also browse requests submitted by brands that match your profile and apply if you’re interested.',
  ],
  [
    'Do I have to negotiate through social media DMs?',
    'Your dedicated Squad Manager handles discussions with the brand and brings you the brief. You can accept it, ask to negotiate the terms through your manager, or decline.',
  ],
  [
    'When will I receive my payment?',
    'UpSquad handles the payment process and guarantees payment within 10–20 days after you deliver the video.',
  ],
  [
    'What is the difference between the two video offers?',
    'Brand Promotion Video explains a brand, product, or service. Creative Brand Promotion Video adds an original concept and engaging story developed by you. Both include shooting, editing, and posting on your channel in collaboration with the brand’s channel.',
  ],
  [
    'Are monthly sponsorships available?',
    'Channel Sponsor and Content Creator are coming soon. Channel Sponsor will let a brand sponsor your channel for a monthly amount. Content Creator will let you create content for a brand. The two promotion video offers are available now.',
  ],
]
const wrap = 'max-w-[1160px] mx-auto px-5 sm:px-8'
const eyebrow =
  'font-mono-tech text-xs uppercase tracking-[0.16em] text-text-secondary'
const heading =
  'font-heading text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight'

export default function SocialMediaCreatorProgram() {
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(true)
  const signupUrl = usePartnerSignupUrl('social-media-creators')
  useEffect(() => {
    let alive = true
    fetchLandingPage(SLUG).then((data) => {
      if (!alive) return
      if (data) setContent((previous) => ({ ...previous, ...data }))
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])
  const languages = (content.languages || []).filter(
    (language) => language.videoUrl,
  )
  const {
    selected,
    selectedCode,
    gateOpen,
    setGateOpen,
    pendingPlay,
    requestPlay,
    onSelectLanguage,
    hasLangChooser,
  } = useLanguageGate({
    slug: SLUG,
    languages,
    defaultLanguageCode: content.defaultLanguageCode,
  })
  const signup = (
    className = 'btn-gradient inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-sm font-semibold',
  ) => (
    <PartnerSignupLink href={signupUrl} className={className}>
      Create your creator profile{' '}
      <span aria-hidden="true" className="ml-2">
        ↗
      </span>
    </PartnerSignupLink>
  )

  return (
    <div className="pt-20 bg-surface-primary">
      <section className="bg-dot-pattern border-b border-black/10 pt-12 pb-14 sm:py-20">
        <div className={`${wrap} grid lg:grid-cols-2 gap-12 items-center`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-brand-accent/50 px-3 py-1.5 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-current rounded-full" />
              For social media creators
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight">
              {content.heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {signup()}
              <a
                href="#creator-offers"
                className="text-sm font-semibold underline underline-offset-4"
              >
                Explore the offers
              </a>
            </div>
            <p className="mt-5 text-sm text-text-secondary">
              Your choice of brands. Your say on the terms.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-black/15 bg-white p-3 shadow-brutal">
              {languages.length > 0 ? (
                <HeroMedia
                  videoUrl={selected?.videoUrl}
                  previewUrl={languages[0]?.videoUrl}
                  onRequestGate={requestPlay}
                  autoPlay={pendingPlay}
                  needsGate={languages.length > 1}
                />
              ) : (
                <div className="aspect-video min-h-[240px] rounded-xl bg-[#141414] text-white flex flex-col items-center justify-center p-5 sm:p-8 text-center">
                  <span className="text-3xl sm:text-5xl mb-3 sm:mb-5" aria-hidden="true">
                    ↗
                  </span>
                  <p className="font-heading text-xl sm:text-2xl font-bold">
                    Make room for your next brand collaboration.
                  </p>
                  <p className="text-sm text-white/60 mt-3" role="status">
                    {loading
                      ? 'Loading creator introduction…'
                      : 'Creator introduction video coming soon.'}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap justify-between items-center gap-2 px-2 pt-4 pb-2">
                <p className="text-xs font-semibold text-text-secondary">
                  Meet your creative support squad
                </p>
                {hasLangChooser && (
                  <button
                    type="button"
                    onClick={() => setGateOpen(true)}
                    className="text-xs font-semibold underline underline-offset-4"
                    aria-label="Change video language"
                  >
                    {selected.name} · Change language
                  </button>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-xl bg-brand-accent p-5 text-black border border-black/15">
              <span className="font-heading text-3xl font-extrabold whitespace-nowrap">
                10–20
              </span>
              <p className="text-sm leading-snug">
                <strong>days from delivery to payment.</strong>
                <br />
                Guaranteed by UpSquad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <p className={eyebrow}>You create. We coordinate.</p>
          <h2 className={`${heading} mt-3 max-w-2xl`}>
            Less time in DMs.
            <br />
            More time doing your thing.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-9">
            {[
              [
                'A dedicated Squad Manager',
                'One person to coordinate with brands, discuss requirements, and bring you a clear brief.',
              ],
              [
                'The final say stays with you',
                'Choose the opportunities you want. Review the brief, accept it, or negotiate before you commit.',
              ],
              [
                'Payments, taken care of',
                'We handle payment collection and processing. Your payment arrives within 10–20 days of video delivery, guaranteed.',
              ],
            ].map(([title, description], index) => (
              <div key={title} className="border-t-2 border-text-primary pt-5">
                <span className={eyebrow}>0{index + 1}</span>
                <h3 className="font-heading text-xl font-bold mt-4">{title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mt-3">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="creator-offers"
        className="scroll-mt-24 bg-surface-secondary py-16 sm:py-20 border-y border-black/10"
      >
        <div className={wrap}>
          <p className={eyebrow}>Social media creator offers</p>
          <h2 className={`${heading} mt-3`}>
            Two ways to bring a brand to life.
          </h2>
          <p className="text-text-secondary mt-4 max-w-2xl">
            Choose the format that fits your style. Both offers include creating
            the video and posting it on your channel in collaboration with the
            brand.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-9">
            {offers.map((offer) => (
              <article
                key={offer.number}
                className="bg-white border border-black/15 rounded-2xl p-6 sm:p-8 flex flex-col"
              >
                <div className="flex justify-between items-center gap-3">
                  <span className={eyebrow}>{offer.label}</span>
                  <span className="bg-brand-accent text-black border border-black/15 rounded-full px-3 py-1 text-xs font-semibold">
                    Available now
                  </span>
                </div>
                <span className="font-heading text-5xl font-extrabold text-text-muted/40 mt-8">
                  {offer.number}
                </span>
                <h3 className="font-heading text-2xl font-extrabold mt-4">
                  {offer.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm mt-4">
                  {offer.description}
                </p>
                <ul className="space-y-3 mt-6 pt-6 border-t border-black/10">
                  {offer.points.map((point) => (
                    <li className="flex gap-2 text-sm" key={point}>
                      <span aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {[
              [
                'Channel Sponsor',
                'A brand sponsors your channel and pays you a monthly amount.',
              ],
              [
                'Content Creator',
                'Create content for a brand as part of a dedicated creator engagement.',
              ],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl border border-dashed border-black/20 p-6"
              >
                <div className="flex flex-wrap gap-3 items-center">
                  <h3 className="font-heading font-bold text-lg">{title}</h3>
                  <span className="rounded-full border border-black/15 text-text-secondary text-xs px-2.5 py-1">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-text-secondary text-sm">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className={wrap}>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <p className={eyebrow}>From profile to payday</p>
              <h2 className={`${heading} mt-3`}>
                Your next collaboration starts here.
              </h2>
              <p className="text-text-secondary mt-5 leading-relaxed">
                Get discovered by matching brands and find opportunities
                yourself. Your Squad Manager supports you along the way.
              </p>
            </div>
            <ol className="space-y-8">
              {steps.map(([title, description], index) => (
                <li key={title} className="flex gap-5">
                  <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-black bg-brand-accent text-black font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{title}</h3>
                    <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-secondary border-y border-black/10">
        <div className={`${wrap} grid lg:grid-cols-[0.8fr_1.2fr] gap-10`}>
          <div>
            <p className={eyebrow}>A few things to know</p>
            <h2 className={`${heading} mt-3`}>
              Creator questions,
              <br />
              answered.
            </h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-black/15 py-5"
              >
                <summary className="cursor-pointer font-semibold leading-relaxed pr-4">
                  {question}
                </summary>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0A0A0A] text-white py-16 sm:py-20">
        <div className={`${wrap} text-center`}>
          <p className="font-mono-tech text-xs uppercase tracking-widest text-white/60">
            Create with brands. Backed by your squad.
          </p>
          <h2 className={`${heading} mt-5 max-w-2xl mx-auto`}>
            Bring your voice.
            <br />
            <span className="text-[#FFFF99]">
              We’ll handle the brand conversations.
            </span>
          </h2>
          <p className="mt-5 mb-8 text-white/70 max-w-lg mx-auto">
            Build your profile, discover matching requests, and choose the
            collaborations you want to create.
          </p>
          {signup(
            'inline-flex items-center justify-center bg-[#FFFF99] text-black font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-white transition-colors',
          )}
        </div>
      </section>
      <LanguageGate
        open={gateOpen}
        languages={languages}
        selectedCode={selectedCode}
        onSelect={onSelectLanguage}
        onDismiss={() => setGateOpen(false)}
      />
    </div>
  )
}
