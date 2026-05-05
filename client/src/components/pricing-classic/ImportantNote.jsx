export default function ImportantNote() {
  return (
    <section className="mt-16 mb-20">
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Important Note for New Clients</h2>
      <p className="text-sm text-slate-600 mb-2">
        At UpSquad, we strongly value the <strong>creativity and mental space</strong> of our designers and editors.
      </p>
      <p className="text-sm text-slate-600 mb-6">
        Our goal is to deliver <strong>consistent, high-quality content every week</strong>, not to rush through as many
        outputs as possible in a single day.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <h4 className="text-sm font-semibold text-slate-900">If you are looking for:</h4>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            <li>Maximum number of designs per day</li>
            <li>Bulk edits in the shortest time</li>
            <li>Quantity over quality</li>
          </ul>
          <p className="text-sm font-medium text-slate-900 mt-4">
            Then none of our plans will be the right fit for you.
          </p>
        </div>

        <div className="border-2 border-emerald-500 rounded-xl p-6 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <h4 className="text-sm font-semibold text-slate-900">Our plans are designed for:</h4>
          </div>
          <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
            <li>
              Brands who want <strong>steady, professional, high-quality content</strong>
            </li>
            <li>Businesses that value consistency, creativity, and reliability</li>
            <li>Clients who want expert-level design and editing — not mass-production output.</li>
          </ul>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <p className="text-sm text-slate-600">
          We focus on delivering content that <strong>represents your brand beautifully</strong>, not on delivering high
          volumes at the expense of quality.
        </p>
      </div>
    </section>
  )
}
