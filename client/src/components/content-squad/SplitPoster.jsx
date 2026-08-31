import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, REELS_SAFE, ROLES, YELLOW } from './copy'
import { Grain, PosterRoot, Wordmark } from '../dream-team/chrome'

function PathBlock({ label, hint, compact }) {
  return (
    <div
      style={{
        flex: 1,
        background: INK,
        color: YELLOW,
        padding: compact ? '14px 16px' : '20px 22px',
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: compact ? 11 : 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: 6,
        }}
      >
        {hint}
      </div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: compact ? 22 : 28,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function RoleChips({ compact }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? 6 : 8 }}>
      {ROLES.map((r) => (
        <span
          key={r.id}
          style={{
            border: `1.5px solid ${INK}`,
            color: INK,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: compact ? 15 : 18,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            padding: compact ? '7px 10px' : '9px 12px',
          }}
        >
          {r.label}
        </span>
      ))}
    </div>
  )
}

export default function SplitPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'
  const padX = wide ? 32 : stories ? REELS_SAFE.x : 56
  const padTop = stories ? REELS_SAFE.top : wide ? 24 : 52
  const padBottom = stories ? REELS_SAFE.bottom : wide ? 24 : 48

  return (
    <PosterRoot format={format} background={YELLOW} color={INK} innerRef={innerRef}>
      <Grain opacity={0.05} light />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: wide ? 'row' : 'column',
          padding: `${padTop}px ${padX}px ${padBottom}px`,
          gap: wide ? 28 : 0,
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ flex: wide ? '0 0 42%' : undefined, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Wordmark color={INK} size={wide || square ? 22 : 26} />
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {COPY.squad}
            </span>
          </div>

          {!wide && <div style={{ flex: stories ? '0.35 1 auto' : '0.2 1 auto', minHeight: 12 }} />}

          <div
            style={{
              marginTop: wide ? 18 : 0,
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: wide ? 36 : stories ? 56 : square ? 40 : 46,
              letterSpacing: '-0.045em',
              lineHeight: 0.92,
              color: INK,
            }}
          >
            Two ways in.
            <br />
            Eight seats.
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0, marginTop: wide ? 0 : stories ? 22 : 18 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <PathBlock label={COPY.freelanceLabel} hint="Partner program" compact={wide || square} />
            <PathBlock label={COPY.jobsLabel} hint="Full-time & part-time" compact={wide || square} />
          </div>

          <div style={{ marginTop: wide ? 16 : stories ? 22 : 18 }}>
            <RoleChips compact={wide || square} />
          </div>

          <div
            style={{
              marginTop: wide ? 14 : stories ? 22 : 18,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              fontFamily: FONT_BODY,
              fontSize: wide || square ? 15 : 17,
            }}
          >
            <span>
              {COPY.applyHint} · {COPY.phoneDisplay}
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {COPY.web}
            </span>
          </div>
        </div>
      </div>
    </PosterRoot>
  )
}
