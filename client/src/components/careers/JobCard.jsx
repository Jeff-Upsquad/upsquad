"use client"
import { useState } from 'react'
import ApplicationForm from './ApplicationForm'

export default function JobCard({ position }) {
  const [expanded, setExpanded] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedTitle, setSubmittedTitle] = useState('')

  function handleApply() {
    setExpanded(true)
    setSubmitted(false)
  }

  function handleCancel() {
    setExpanded(false)
  }

  function handleSuccess(title) {
    setSubmitted(true)
    setSubmittedTitle(title)
    setExpanded(false)
  }

  return (
    <article className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-short">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="font-heading text-xl font-semibold text-text-primary">{position.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {position.department && (
              <span className="text-xs font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                {position.department}
              </span>
            )}
            {position.location && (
              <span className="text-xs font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                {position.location}
              </span>
            )}
            {position.employmentType && (
              <span className="text-xs font-medium text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                {position.employmentType}
              </span>
            )}
          </div>
        </div>
        {!expanded && !submitted && (
          <button
            type="button"
            onClick={handleApply}
            className="btn-gradient font-semibold text-sm px-6 py-3 shrink-0 self-start"
          >
            Apply
          </button>
        )}
      </div>

      <p className="text-sm text-text-secondary leading-relaxed mt-4">{position.description}</p>

      {submitted && (
        <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.08)]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-brand-purple text-white rounded-full flex items-center justify-center shrink-0 border-2 border-text-primary">
              <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-heading font-semibold text-text-primary">Application received</p>
              <p className="text-sm text-text-secondary mt-1">
                Thanks for applying to <span className="font-medium text-text-primary">{submittedTitle}</span>.
                Our team will review your details and get back to you soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {expanded && (
        <ApplicationForm position={position} onCancel={handleCancel} onSuccess={handleSuccess} />
      )}
    </article>
  )
}
