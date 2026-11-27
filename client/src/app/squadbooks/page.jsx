import AccountingSuiteLanding from '../../components/squadsuite/AccountingSuiteLanding'
import './accounting-suite.css'

const title = 'SquadBooks — Accounting & Connected Business Apps'
const description = 'Start with SquadBooks accounting and explore connected apps for cash, inventory, people, customers, hiring and AI.'
const url = 'https://www.upsquadconnect.com/squadbooks/'

export const metadata = {
  title: { absolute: `${title} | UpSquad` },
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url },
  twitter: { card: 'summary_large_image', title, description },
}

export default function AccountingSuitePage() {
  return <AccountingSuiteLanding />
}
