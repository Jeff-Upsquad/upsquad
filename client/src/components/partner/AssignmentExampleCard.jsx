"use client"

/* A single one-time freelance assignment, shown as an example.
   Every card makes the three defining traits explicit:
   a start date, a deadline, and a fixed payment. */

export default function AssignmentExampleCard({ category, accent = 'purple', title, start, due, duration, fee }) {
  const badgeTone =
    accent === 'blue'
      ? 'bg-brand-blue/20 border-[rgba(0,0,0,0.08)] text-text-primary'
      : 'bg-brand-purple/20 border-[rgba(0,0,0,0.08)] text-text-primary'

  return (
    <div className="bg-white rounded-xl p-6 border border-[rgba(0,0,0,0.08)] shadow-sm hover:-translate-y-1 hover:shadow-card-hover transition-all duration-short">
      {/* category + one-time tag */}
      <div className="flex items-center justify-between mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeTone}`}>
          {category}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          One-time
        </span>
      </div>

      <h3 className="font-heading text-base font-semibold text-text-primary mb-5 leading-snug">{title}</h3>

      {/* start → deadline mini-timeline */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1.5">
          <span>Start</span>
          <span>Deadline</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-purple text-white border border-text-primary shrink-0" />
          <div className="flex-1 relative h-px bg-[rgba(0,0,0,0.1)]">
            <span className="absolute left-1/2 -translate-x-1/2 -top-[7px] bg-white px-1.5 text-[10px] font-medium text-text-secondary whitespace-nowrap">
              {duration}
            </span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-text-primary shrink-0" />
        </div>
        <div className="flex items-center justify-between text-xs font-semibold text-text-primary mt-1.5">
          <span>{start}</span>
          <span>{due}</span>
        </div>
      </div>

      {/* fixed payment */}
      <div className="pt-3 border-t border-[rgba(0,0,0,0.08)] flex items-baseline justify-between">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Fixed payment</span>
        <span className="font-heading text-xl font-extrabold text-text-primary">{'₹'}{fee}</span>
      </div>
    </div>
  )
}
