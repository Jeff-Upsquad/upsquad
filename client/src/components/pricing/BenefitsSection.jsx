import { benefits } from '../../data/pricing'
import { BenefitIcon } from './icons'

export default function BenefitsSection() {
  return (
    <section className="mt-20">
      <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
        As a Brand, When You Subscribe to UpSquad, What Do You Get?
      </h2>
      <p className="text-slate-500 mb-10">
        Our Designer + Editor subscription gives your brand creativity, consistency, and complete flexibility.
      </p>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-slate-600">
              <BenefitIcon type={b.icon} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">{b.title}</h4>
              <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
