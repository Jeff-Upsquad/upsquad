import SquadSuiteLanding from '../../components/squadsuite/SquadSuiteLanding'
import './squadsuite.css'

const title = 'SquadSuite — Business apps that grow with you'
const description = 'Meet SquadHub, SquadBooks and Squad Payroll. Start with the app your business needs today, and add more as you grow.'

export const metadata = {
  title: { absolute: `${title} | UpSquad` },
  description,
  alternates: { canonical: 'https://www.upsquadconnect.com/squadsuite/' },
  openGraph: { title, description, url: 'https://www.upsquadconnect.com/squadsuite/' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function SquadSuitePage() {
  return <SquadSuiteLanding />
}
