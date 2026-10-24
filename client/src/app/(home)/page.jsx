import HomeLanding from '../../components/home/HomeLanding'

const title = 'UpSquad — Superpowered humans. Humans and AI, working together.'
const description =
  'upsquad builds systems and software that give every person on your team super powers. Hire vetted people through SquadHire, deploy AI agents through SquadBots, and run them together in SquadHub.'

// openGraph/twitter replace the root layout's objects wholesale (and drop the
// file-based share image), so the shared fields are repeated here. The homepage
// uses its own share image, app/og/home.png/route.jsx.
const image = {
  url: '/og/home.png',
  width: 1200,
  height: 630,
  alt: title,
}

export const metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.upsquadconnect.com/',
    siteName: 'UpSquad',
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
}

export default function Page() {
  return <HomeLanding />
}
