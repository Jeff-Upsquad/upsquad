import HomeLanding from '../../components/home/HomeLanding'

const title = 'UpSquad — Superpowered humans. Humans and AI, working together.'
const description =
  'upsquad builds systems and software that give every person on your team super powers. Hire vetted people through SquadHire, deploy AI agents through SquadBots, and run them together in SquadHub.'

// openGraph/twitter replace the root layout's objects wholesale, which also drops
// the file-based share image, so the shared fields and app/opengraph-image are
// repeated here.
const image = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'UpSquad — The All-in-One Talent Subscription for Modern Brands',
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
