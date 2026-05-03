"use client"
import { countries, statesByCountry } from '../../data/locations'
import { languages as LANGUAGE_OPTIONS } from '../../data/languages'

export default function LocationLanguageSelector({
  country,
  states,
  languages,
  onChangeCountry,
  onToggleState,
  onToggleLanguage,
}) {
  const stateOptions = statesByCountry[country] || []

  return (
    <div className="space-y-6">
      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Country
        </label>
        <select
          value={country || ''}
          onChange={(e) => onChangeCountry(e.target.value || null)}
          className="w-full max-w-md rounded-lg border-2 border-text-primary/30 bg-white px-4 py-2.5 text-sm text-text-primary focus:border-text-primary focus:outline-none"
        >
          <option value="">Select a country…</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* States */}
      {country && stateOptions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-text-primary">
            States / regions <span className="text-text-secondary font-normal">(select one or more)</span>
          </label>
          <p className="text-xs text-text-secondary mb-2">
            Select the states from which the talent should be sourced. Leave empty if any state is fine.
          </p>
          <div className="flex flex-wrap gap-2">
            {stateOptions.map((state) => {
              const isActive = states.includes(state)
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => onToggleState(state)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${
                    isActive
                      ? 'bg-brand-purple text-text-primary border-text-primary shadow-brutal-sm'
                      : 'bg-white text-text-secondary border-text-primary/30 hover:border-text-primary hover:text-text-primary'
                  }`}
                >
                  {isActive && (
                    <svg className="w-3 h-3 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {state}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-text-primary">
          Languages the talent should know <span className="text-text-secondary font-normal">(select one or more)</span>
        </label>
        <p className="text-xs text-text-secondary mb-2">
          Select the languages the talent should be comfortable working in — for client calls, copy, captions, and any deliverable that involves writing or speaking.
        </p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isActive = languages.includes(lang)
            return (
              <button
                key={lang}
                type="button"
                onClick={() => onToggleLanguage(lang)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 ${
                  isActive
                    ? 'bg-brand-orange text-text-primary border-text-primary shadow-brutal-sm'
                    : 'bg-white text-text-secondary border-text-primary/30 hover:border-text-primary hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <svg className="w-3 h-3 inline-block mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {lang}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
