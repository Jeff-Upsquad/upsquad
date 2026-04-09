export const metadata = {
  title: 'UpSquad Partner Program',
  description: 'Partner with UpSquad as a freelance designer or video editor',
}

export default function PartnerProgramLayout({ children }) {
  return (
    <>
      {/* Minimal header — logo only */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F3]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-center h-14">
            <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">
              Up<span className="text-lime-500">Squad</span>
            </span>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}
