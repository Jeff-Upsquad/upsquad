"use client"

export default function StepHeader({ number, title, subtitle }) {
  return (
    <div className="mb-5 mt-12 first:mt-0">
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-purple text-text-primary text-xs font-bold border-2 border-text-primary shadow-brutal-sm">
          {number}
        </span>
        <h2 className="font-heading text-lg sm:text-xl font-bold text-text-primary">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-sm text-text-secondary ml-11">{subtitle}</p>
      )}
    </div>
  )
}
