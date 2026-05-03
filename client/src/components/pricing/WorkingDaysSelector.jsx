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
  const weekdaySet = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const weekendCount = selectedDays.filter(d => d === 'Sat' || d === 'Sun').length
  const allWeekdaysSelected = weekdaySet.every(d => selectedDays.includes(d))
  const showWeekendWarning = weekendCount > 0 && (allWeekdaysSelected || selectedDays.length > 5)

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

      {showWeekendWarning && (
        <div className="w-full max-w-md bg-brand-orange/10 border-2 border-brand-orange rounded-lg p-3 flex items-start gap-2">
          <svg className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span className="text-xs text-text-primary leading-relaxed font-medium">
            Less chance of talent accepting the request if weekends are selected.
          </span>
        </div>
      )}
    </div>
  )
}
