import { benefits } from '../../data/pricing'
import { BenefitIcon } from './icons'

export default function BenefitsSection() {
  return (
    <section className="mt-20">
      <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
        As a Brand, When You Subscribe to UpSquad, What Do You Get?
      </h2>
      <p className="text-text-secondary mb-10">
        Our Designer + Editor subscription gives your brand creativity, consistency, and complete flexibility.
      </p>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-brand-purple/10 rounded-lg flex items-center justify-center text-text-primary">
              <BenefitIcon type={b.icon} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary">{b.title}</h4>
              <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{b.desc}</p>
              {b.note && (
                <p className="text-xs text-brand-orange font-semibold mt-1.5">{b.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
