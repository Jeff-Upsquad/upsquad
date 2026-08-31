import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, PAPER, REELS_SAFE, ROLES, YELLOW } from './copy'
import { Grain, PosterRoot } from '../dream-team/chrome'

function DoubleRule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ height: 2, background: INK }} />
      <div style={{ height: 1, background: INK }} />
    </div>
  )
}

export default function LineupPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'
  const padX = wide ? 32 : stories ? REELS_SAFE.x : 56
  const padTop = stories ? REELS_SAFE.top : wide ? 22 : 48
  const padBottom = stories ? REELS_SAFE.bottom : wide ? 22 : 44

  const left = ROLES.slice(0, 4)
  const right = ROLES.slice(4)

  return (
    <PosterRoot format={format} background={PAPER} color={INK} innerRef={innerRef}>
      <Grain opacity={0.04} light />
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: FONT_MONO,
            fontSize: wide ? 11 : 13,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span>UpSquad</span>
          <span>{COPY.squad}</span>
          <span>Open call</span>
        </div>
        <div
          style={{
            margin: wide ? '8px 0 8px' : '12px 0 10px',
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: wide ? 36 : stories ? 52 : square ? 40 : 46,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            textAlign: 'center',
            color: INK,
          }}
        >
          Freelance or jobs.
          <br />
          Content squad.
        </div>
        <DoubleRule />

        <div
          style={{
            marginTop: wide ? 14 : stories ? 22 : 18,
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {[COPY.freelanceLabel, COPY.jobsLabel].map((label) => (
            <span
              key={label}
              style={{
                background: INK,
                color: YELLOW,
                fontFamily: FONT_MONO,
                fontSize: wide ? 12 : 14,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: wide ? '6px 10px' : '8px 14px',
                fontWeight: 700,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: wide ? 12 : stories ? 18 : 14,
            marginTop: wide ? 16 : stories ? 24 : 20,
            minHeight: 0,
          }}
        >
          {[left, right].map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: wide ? 8 : stories ? 14 : 10 }}>
              {col.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'baseline', gap: 10, borderBottom: `1px solid ${INK}`, paddingBottom: wide ? 6 : 8 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: wide ? 11 : 13, letterSpacing: '0.12em' }}>{r.n}</span>
                  <span
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 800,
                      fontSize: wide ? 18 : stories ? 26 : square ? 20 : 22,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                    }}
                  >
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: wide ? 12 : 18,
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
    </PosterRoot>
  )
}
