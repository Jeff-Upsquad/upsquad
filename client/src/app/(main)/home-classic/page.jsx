import Home from '../../../pages/Home'

// The previous homepage, kept as a landing page after the redesign moved to /.
export const metadata = {
  alternates: { canonical: '/home-classic/' },
}

export default function Page() {
  return <Home />
}
