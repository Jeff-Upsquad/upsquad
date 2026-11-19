'use client'

import { useEffect, useRef, useState } from 'react'
import { downloadRefundPolicyPdf } from '../../lib/refundPolicyPdf'

const labels = {
  idle: 'Download PDF',
  working: 'Preparing PDF…',
  done: 'Downloaded',
  error: 'Try again',
}

export default function DownloadRefundPolicyButton({ className = '' }) {
  const [status, setStatus] = useState('idle')
  const resetTimer = useRef(null)

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current)
  }, [])

  const handleClick = async () => {
    if (status === 'working') return
    if (resetTimer.current) clearTimeout(resetTimer.current)
    setStatus('working')
    try {
      await downloadRefundPolicyPdf(new Date())
      setStatus('done')
      resetTimer.current = setTimeout(() => setStatus('idle'), 2600)
    } catch (error) {
      console.error('Could not generate the refund policy PDF', error)
      setStatus('error')
      resetTimer.current = setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'working'}
        className="inline-flex items-center gap-2.5 rounded-full bg-[#0A0A0A] px-5 py-3 text-sm font-medium text-white transition-colors duration-short hover:bg-[#242424] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A] disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-[#0A0A0A] dark:hover:bg-[#EDEDED] dark:focus-visible:outline-white"
      >
        {status === 'done' ? (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.2 4.2L19 7" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4v11" />
            <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
            <path d="M5 19.5h14" />
          </svg>
        )}
        {labels[status]}
      </button>
      <p aria-live="polite" className="text-xs leading-5 text-text-muted">
        {status === 'error'
          ? 'Something went wrong. Please try again.'
          : 'PDF includes the date and time you downloaded it.'}
      </p>
    </div>
  )
}
