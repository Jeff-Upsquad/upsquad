import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, REELS_SAFE, ROLES, WHITE, YELLOW } from './copy'
import { Grain, MonoLabel, PosterRoot, Wordmark } from '../dream-team/chrome'

function PathPills({ compact }) {
  const pad = compact ? '7px 12px' : '9px 16px'
  const size = compact ? 14 : 16
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[COPY.freelanceLabel, COPY.jobsLabel].map((label) => (
        <span
          key={label}
          style={{
            background: YELLOW,
            color: INK,
            fontFamily: FONT_MONO,
            fontSize: size,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: pad,
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

function RoleGrid({ compact, stories }) {
  const fs = compact ? 18 : stories ? 26 : 22
  const nSize = compact ? 11 : 13
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: compact ? '8px 16px' : stories ? '12px 28px' : '10px 22px',
      }}
    >
      {ROLES.map((r) => (
        <div key={r.id} style={{ display: 'flex', alignItems: 'baseline', gap: 10, minWidth: 0 }}>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: nSize,
              letterSpacing: '0.12em',
              color: YELLOW,
              flexShrink: 0,
            }}
          >
            {r.n}
          </span>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: fs,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: WHITE,
            }}
          >
            {r.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function RosterPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'
  const padX = wide ? 36 : stories ? REELS_SAFE.x : 64
  const padTop = stories ? REELS_SAFE.top : wide ? 28 : 56
  const padBottom = stories ? REELS_SAFE.bottom : wide ? 28 : 52

  if (wide) {
    return (
      <PosterRoot format={format} background={INK} color={WHITE} innerRef={innerRef}>
        <Grain opacity={0.05} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            gap: 32,
            padding: `${padTop}px ${padX}px ${padBottom}px`,
            position: 'relative',
            zIndex: 1,
            minHeight: 0,
          }}
        >
          <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Wordmark size={22} />
              <MonoLabel size={12} color={YELLOW}>Content squad</MonoLabel>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 42,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                  color: WHITE,
                }}
              >
                Freelance it.
                <br />
                Or get hired.
              </div>
            </div>
            <PathPills compact />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <RoleGrid compact />
            <div style={{ fontFamily: FONT_BODY, fontSize: 16, color: 'rgba(255,255,255,0.75)' }}>
              {COPY.applyHint} · {COPY.phoneDisplay}
              <span style={{ float: 'right', fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {COPY.web}
              </span>
            </div>
          </div>
        </div>
      </PosterRoot>
    )
  }

  return (
    <PosterRoot format={format} background={INK} color={WHITE} innerRef={innerRef}>
      <Grain opacity={0.05} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: `${padTop}px ${padX}px ${padBottom}px`,
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Wordmark size={square ? 24 : 28} />
          <MonoLabel size={13} color={YELLOW}>Content squad</MonoLabel>
        </div>

        <div style={{ flex: stories ? '0.4 1 auto' : '0.25 1 auto', minHeight: 16 }} />

        <PathPills compact={square} />
        <div
          style={{
            marginTop: stories ? 20 : 16,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: stories ? 64 : square ? 44 : 52,
            letterSpacing: '-0.045em',
            lineHeight: 0.9,
            color: WHITE,
          }}
        >
          Freelance it.
          <br />
          Or get hired.
        </div>

        <div style={{ flex: 1, minHeight: 16 }} />

        <RoleGrid compact={square} stories={stories} />

        <div
          style={{
            marginTop: stories ? 28 : 22,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            fontFamily: FONT_BODY,
            fontSize: square ? 16 : 18,
            color: 'rgba(255,255,255,0.78)',
          }}
        >
          <span>
            {COPY.applyHint} · {COPY.phoneDisplay}
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {COPY.web}
          </span>
        </div>
      </div>
    </PosterRoot>
  )
}
