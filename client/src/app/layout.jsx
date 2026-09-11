import '../index.css'

export const metadata = {
  metadataBase: new URL('https://www.upsquadconnect.com'),
  title: {
    default: 'UpSquad — The All-in-One Talent Subscription for Modern Brands',
    template: '%s — UpSquad',
  },
  description:
    'One flat fee for a full squad — content, marketing, tech and more. Need just one job done? Pay per task or hire directly.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.upsquadconnect.com/',
    siteName: 'UpSquad',
    title: 'UpSquad — The All-in-One Talent Subscription for Modern Brands',
    description:
      'One flat fee for a full squad — content, marketing, tech and more. Need just one job done? Pay per task or hire directly.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UpSquad — The All-in-One Talent Subscription for Modern Brands',
    description:
      'One flat fee for a full squad — content, marketing, tech and more. Need just one job done? Pay per task or hire directly.',
  },
}

// Applies the saved theme before first paint to avoid a flash.
// Default is ALWAYS light — OS `prefers-color-scheme` is intentionally
// ignored, so the site loads light even when the system is in dark mode.
const themeInit = `(function(){try{if(localStorage.getItem('upsquad-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen text-text-primary">
        {children}
      </body>
    </html>
  )
}
