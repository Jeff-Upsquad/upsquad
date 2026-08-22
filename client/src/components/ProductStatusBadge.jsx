"use client"

const statusMeta = {
  live: {
    label: 'Live',
    className: 'text-brand-green bg-brand-green/10 border border-brand-green/20',
    dot: 'bg-brand-green',
  },
  waitlist: {
    label: 'Join Waiting List',
    className: 'text-white bg-[#0A0A0A] border border-black/10',
    dot: 'bg-[#FFFF99]',
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'text-text-muted bg-black/[0.03] border border-black/[0.06]',
    dot: null,
  },
}

export default function ProductStatusBadge({ status }) {
  const meta = statusMeta[status] ?? statusMeta['coming-soon']
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${meta.className}`}
    >
      {meta.dot && <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />}
      {meta.label}
    </span>
  )
}
