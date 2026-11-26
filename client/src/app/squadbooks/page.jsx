import AccountingSuiteLanding from '../../components/squadsuite/AccountingSuiteLanding'
import '../squadsuite/squadsuite.css'
import './accounting-suite.css'

const title = 'SquadBooks Accounting Suite — Books & Payroll'
const description = 'Accounting for your business. Payroll for your people. Explore SquadBooks SaaS and Squad Payroll, the accounting suite of apps by UpSquad.'
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
