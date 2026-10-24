import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'

// Homepage-only link-preview image in the "Superpowered humans" design.
// Exported as a static file (out: og/home.png) so the server sends it as image/png;
// the rest of the site keeps app/opengraph-image.jsx. Fonts (OFL, from Fontsource)
// sit next to this file; the build runs from client/ locally and in Docker.
export const dynamic = 'force-static'

const size = { width: 1200, height: 630 }
const FONT_DIR = join(process.cwd(), 'src/app/og/home.png/fonts')

const pill = (label, human) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: '#FFFFFF',
      border: '1px solid rgba(10,10,20,.1)',
      borderRadius: '999px',
      padding: '8px 22px 8px 8px',
      fontSize: '24px',
      color: '#0B0B10',
    }}
  >
    <div style={{ display: 'flex' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '999px', background: '#FFFF99', border: '3px solid #FFFFFF' }} />
      {!human && (
        <div style={{ width: '34px', height: '34px', marginLeft: '-10px', borderRadius: '10px', background: '#8FE3FF', border: '3px solid #FFFFFF' }} />
      )}
    </div>
    {label}
  </div>
)

export async function GET() {
  const [jakarta, shantell, inter] = await Promise.all(
    ['PlusJakartaSans-800.woff', 'ShantellSans-500.woff', 'Inter-500.woff'].map((f) => readFile(join(FONT_DIR, f)))
  )
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '70px 90px',
          backgroundColor: '#FBFBF8',
          backgroundImage:
            'linear-gradient(to bottom, rgba(10,10,20,.06) 1px, transparent 1px), linear-gradient(to right, rgba(10,10,20,.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              fontFamily: 'Jakarta',
              fontSize: '32px',
              fontWeight: 800,
              padding: '12px 26px',
              borderRadius: '16px',
              boxShadow: '0 10px 24px -8px rgba(0,0,0,.45)',
            }}
          >
            upsquad
            <div style={{ width: '12px', height: '12px', borderRadius: '999px', backgroundColor: '#FFFF99' }} />
          </div>
        </div>
        <div style={{ fontFamily: 'Jakarta', fontSize: '86px', fontWeight: 800, lineHeight: 1, letterSpacing: '-3.5px', color: '#0B0B10' }}>
          Superpowered humans.
        </div>
        <div style={{ fontFamily: 'Shantell', fontSize: '56px', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-1px', color: '#8A7600', marginTop: '18px' }}>
          Humans and AI, working together.
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '44px' }}>
          {pill('Hire humans', true)}
          {pill('Deploy AI agents', false)}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 500, color: '#0B0B10', marginLeft: '12px' }}>
            upsquadconnect.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: jakarta, weight: 800, style: 'normal' },
        { name: 'Shantell', data: shantell, weight: 500, style: 'normal' },
        { name: 'Inter', data: inter, weight: 500, style: 'normal' },
      ],
    }
  )
}
