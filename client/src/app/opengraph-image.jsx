import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'
export const alt = 'UpSquad — The All-in-One Talent Subscription for Modern Brands'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
          backgroundColor: '#F4F4F5',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              fontSize: '34px',
              fontWeight: 800,
              padding: '14px 28px',
              borderRadius: '16px',
            }}
          >
            UpSquad
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '999px',
                backgroundColor: '#FFFF99',
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#0A0A0A',
            marginBottom: '20px',
          }}
        >
          The All-in-One Talent Subscription for Modern Brands.
        </div>
        <div style={{ fontSize: '28px', lineHeight: 1.4, color: '#52525B' }}>
          One flat fee for content, marketing, tech and more.
        </div>
        <div style={{ fontSize: '24px', color: '#0A0A0A', marginTop: '28px', fontWeight: 700 }}>
          upsquadconnect.com
        </div>
      </div>
    ),
    { ...size }
  )
}
