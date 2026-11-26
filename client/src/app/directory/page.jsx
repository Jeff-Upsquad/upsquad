import PageDirectory from './PageDirectory'
import './directory.css'

export const metadata = {
  title: 'Website page directory',
  description: 'All UpSquad public pages, grouped by products, customer services, partner programs and more.',
  robots: { index: false, follow: false },
}

export default function DirectoryPage() {
  return <PageDirectory />
}
