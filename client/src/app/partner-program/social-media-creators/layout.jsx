import HangingLogo from '../../../components/HangingLogo'

export const metadata = {
  title: 'Brand Collaborations for Social Media Creators',
  description:
    'Find matching brand collaborations with a dedicated Squad Manager. Accept or negotiate briefs and get guaranteed payment within 10–20 days of video delivery.',
  alternates: { canonical: '/partner-program/social-media-creators/' },
}

export default function GeneralPartnerProgramLayout({ children }) {
  return (
    <>
      {/* Minimal header — logo only */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-center h-[76px]">
            <HangingLogo />
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  )
}
