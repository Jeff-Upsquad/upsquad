export const metadata = {
  title: 'UpSquad Partner Program — For Accountants',
  description: 'Partner with UpSquad as an accountant or bookkeeper — get assigned clients, pick up freelance assignments, or find full-time and part-time jobs.',
}

export default function AccountantPartnerLayout({ children }) {
  return (
    <>
      {/* Minimal header — logo only */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-center h-16">
            <a href="/" aria-label="UpSquad home" className="inline-flex items-center">
              <span className="inline-flex items-baseline gap-1 bg-[#0A0A0A] text-white border-2 border-white rounded-xl px-3.5 py-1.5 font-heading font-extrabold text-base leading-none tracking-tight shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
                UpSquad
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FFFF99]" />
              </span>
            </a>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}
