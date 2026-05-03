"use client"
import Link from 'next/link'

export default function SubmissionConfirmation() {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">
        Request Submitted
      </h3>
      <p className="text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
        Our team will review your subscription request and get back to you within 24 hours.
        We'll reach out via WhatsApp or email to confirm.
      </p>
      <Link
        href="/contact"
        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
      >
        Have questions? Contact us
      </Link>
    </div>
  )
}
