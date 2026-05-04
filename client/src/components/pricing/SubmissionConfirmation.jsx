"use client"

export default function SubmissionConfirmation() {
  return (
    <div className="text-center py-12">
      <div className="w-14 h-14 bg-brand-purple rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-text-primary shadow-brutal-sm">
        <svg className="w-7 h-7 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
        Request Submitted
      </h3>
      <p className="text-text-secondary max-w-md mx-auto leading-relaxed mb-6">
        Our team will review your subscription request and get back to you within 24 hours.
        We'll reach out via WhatsApp or email to confirm.
      </p>
      <a
        href="https://wa.me/919995266385?text=I%20just%20submitted%20a%20request%20on%20UpSquad%20and%20have%20a%20question"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-text-primary hover:text-text-secondary font-semibold underline underline-offset-4 decoration-brand-purple decoration-2 transition-colors"
      >
        Have questions? Contact us on WhatsApp
      </a>
    </div>
  )
}
