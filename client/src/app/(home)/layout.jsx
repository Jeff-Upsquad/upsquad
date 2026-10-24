import { Plus_Jakarta_Sans, Inter, Sometype_Mono, Shantell_Sans } from 'next/font/google'

// Fonts from the "upsquad Landing" design: Plus Jakarta Sans headings, Inter body,
// Sometype Mono labels, Shantell Sans for hand-drawn accents.
const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], style: ['normal', 'italic'], variable: '--hm-display' })
const body = Inter({ subsets: ['latin'], variable: '--hm-body' })
const hand = Shantell_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--hm-hand' })
const mono = Sometype_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--hm-mono' })

export default function HomeLayout({ children }) {
  return (
    <div className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable} hm-root`}>
      {children}
    </div>
  )
}
