"use client"

const weekdays = [
  { key: 'Mon', label: 'Mon', full: 'Monday', optional: false },
  { key: 'Tue', label: 'Tue', full: 'Tuesday', optional: false },
  { key: 'Wed', label: 'Wed', full: 'Wednesday', optional: false },
  { key: 'Thu', label: 'Thu', full: 'Thursday', optional: false },
  { key: 'Fri', label: 'Fri', full: 'Friday', optional: false },
  { key: 'Sat', label: 'Sat', full: 'Saturday', optional: true },
  { key: 'Sun', label: 'Sun', full: 'Sunday', optional: true },
]

export default function WorkingDaysSelector({ selectedDays, onToggleDay }) {
  const weekendCount = selectedDays.filter(d => d === 'Sat' || d === 'Sun').length

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="grid grid-cols-7 gap-2 w-full max-w-2xl">
        {weekdays.map((day) => {
          const isActive = selectedDays.includes(day.key)
          return (
            <button
              key={day.key}
              onClick={() => onToggleDay(day.key)}
              aria-pressed={isActive}
              title={day.full + (day.optional ? ' (optional)' : '')}
              className={`relative flex flex-col items-center justify-center py-3 rounded-lg text-sm font-bold transition-all border-2 ${
                isActive
                  ? 'bg-brand-purple text-text-primary border-text-primary shadow-brutal-sm'
                  : day.optional
                  ? 'bg-white text-text-secondary border-text-primary/30 border-dashed hover:border-text-primary hover:text-text-primary'
                  : 'bg-white text-text-secondary border-text-primary/30 hover:border-text-primary hover:text-text-primary'
              }`}
            >
              <span>{day.label}</span>
              {day.optional && !isActive && (
                <span className="text-[9px] font-mono-tech tracking-widest text-text-muted mt-0.5 uppercase">opt</span>
              )}
              {isActive && (
                <svg className="absolute top-1 right-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-text-muted text-center max-w-md">
        Mon–Fri are included by default. Add{' '}
        <span className="font-semibold text-text-primary">Sat</span> and/or{' '}
        <span className="font-semibold text-text-primary">Sun</span> if you need weekend coverage
        {weekendCount > 0 && (
          <span className="text-text-secondary"> — currently {weekendCount} weekend day{weekendCount > 1 ? 's' : ''} added</span>
        )}.
      </p>
    </div>
  )
}
