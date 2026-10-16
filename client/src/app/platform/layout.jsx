import { Plus_Jakarta_Sans, Inter, Sometype_Mono, Shantell_Sans } from 'next/font/google'
import './platform.css'

// Same type system as clickup.com/brain/agents: Plus Jakarta Sans headings,
// Inter body, Sometype Mono labels, Shantell Sans for hand-drawn accents.
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--pl-display' })
const body = Inter({ subsets: ['latin'], variable: '--pl-body' })
const hand = Shantell_Sans({ subsets: ['latin'], variable: '--pl-hand' })
const mono = Sometype_Mono({ subsets: ['latin'], variable: '--pl-mono' })

export const metadata = {
  title: 'Hire humans. Deploy AI agents. One squad.',
  description:
    'UpSquad is the hybrid workforce platform: hire vetted people through SquadHire, deploy AI employees through SquadBots, and run them together in SquadHub and the Squad apps.',
}

export default function PlatformLayout({ children }) {
  return (
    <div className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable} pl-root`}>
      {children}
    </div>
  )
}
