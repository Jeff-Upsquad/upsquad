import { BenefitIcon } from './icons'

const THEMES = {
  squadhub: {
    card: 'bg-[#0A0A0A] text-white border-black',
    iconWrap: 'bg-[#FFFF99] text-[#0A0A0A] border-black/10',
    label: 'text-white/50',
    title: 'text-white',
    desc: 'text-white/65',
    pill: 'bg-white/10 text-white/80 border-white/15',
  },
  'squad-manager': {
    card: 'bg-[#FFFF99] text-[#0A0A0A] border-black',
    iconWrap: 'bg-white text-[#0A0A0A] border-black/15',
    label: 'text-black/50',
    title: 'text-[#0A0A0A]',
    desc: 'text-black/65',
    pill: 'bg-white/70 text-[#0A0A0A] border-black/10',
  },
}

function CoreCards({ items }) {
  if (!items.length) return null

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item) => {
        const theme = THEMES[item.icon] || THEMES.squadhub
        return (
          <div
            key={item.title}
            className={`relative overflow-hidden rounded-xl border-[1.5px] ${theme.card} shadow-brutal-sm p-4`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-flex w-9 h-9 rounded-xl items-center justify-center border shrink-0 ${theme.iconWrap}`}>
                <BenefitIcon type={item.icon} />
              </span>
              <div className="min-w-0 flex-1">
                {item.label && (
                  <p className={`font-mono-tech text-[10px] uppercase tracking-[0.16em] leading-none mb-1 ${theme.label}`}>
                    {item.label}
                  </p>
                )}
                <h4 className={`font-heading text-base font-extrabold tracking-[-0.02em] leading-tight ${theme.title}`}>
                  {item.title}
                </h4>
              </div>
            </div>

            <p className={`text-sm leading-snug ${theme.desc}`}>
              {item.desc}
            </p>

            {item.pills?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {item.pills.map((pill) => (
                  <span
                    key={pill}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${theme.pill}`}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function FlexStrip({ items }) {
  if (!items.length) return null

  return (
    <div className="rounded-xl border border-dashed border-black/25 bg-white overflow-hidden">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dashed divide-black/20">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3 px-4 py-3.5">
            <span className="inline-flex w-8 h-8 rounded-lg items-center justify-center shrink-0 bg-surface-secondary border border-black/[0.08] text-text-primary">
              <BenefitIcon type={item.icon} />
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-heading text-sm font-extrabold tracking-[-0.015em] text-text-primary leading-tight">
                  {item.title}
                </h4>
                {item.label && (
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-text-muted">
                    {item.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-secondary leading-snug mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function IncludedHighlights({ items }) {
  if (!items?.length) return null

  const core = items.filter((item) => item.featured === 'core')
  const flex = items.filter((item) => item.featured === 'flex')

  return (
    <div className="flex flex-col gap-3 mb-8">
      <CoreCards items={core} />
      <FlexStrip items={flex} />
    </div>
  )
}
