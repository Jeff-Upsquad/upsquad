import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, REELS_SAFE, YELLOW } from './copy'
import { FreelancerHeadline, Grain, PosterRoot, Wordmark } from './chrome'

function RoleBar({ label, compact }) {
  return (
    <div
      style={{
        background: INK,
        color: YELLOW,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: compact ? '12px 16px' : '16px 22px',
        borderRadius: 6,
      }}
    >
      <span
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: compact ? 22 : 30,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: compact ? 11 : 13,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        Casting
      </span>
    </div>
  )
}

export default function HighlightPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'

  if (wide) {
    return (
      <PosterRoot format={format} background={YELLOW} color={INK} innerRef={innerRef}>
        <Grain opacity={0.06} light />
        <div
          style={{
            flex: 1,
            display: 'flex',
            padding: '28px 36px',
            gap: 32,
            position: 'relative',
            zIndex: 1,
            minHeight: 0,
          }}
        >
          <div style={{ flex: '1.2 1 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <Wordmark color={INK} size={22} />
            <FreelancerHeadline size={64} kickerSize={26} slab slabBg={INK} slabColor={YELLOW} />
          </div>
          <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {COPY.roles.map((r) => (
                <RoleBar key={r.id} label={r.label} compact />
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 28,
                  letterSpacing: '-0.03em',
                  marginBottom: 10,
                }}
              >
                Then we need you.
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 40,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {COPY.income}
              </div>
              <div style={{ marginTop: 8, fontFamily: FONT_BODY, fontSize: 16 }}>
                {COPY.program} · {COPY.phoneDisplay}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {COPY.web}
              </div>
            </div>
          </div>
        </div>
      </PosterRoot>
    )
  }

  const padTop = stories ? REELS_SAFE.top : square ? 64 : 72
  const padBottom = stories ? REELS_SAFE.bottom : square ? 56 : 64
  const padX = stories ? REELS_SAFE.x : 64
  const freelancerSize = stories ? 92 : square ? 78 : 86

  return (
    <PosterRoot format={format} background={YELLOW} color={INK} innerRef={innerRef}>
      <Grain opacity={0.055} light />
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <Wordmark color={INK} size={square ? 24 : 28} />
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {COPY.program}
          </span>
        </div>

        <div style={{ flex: stories ? '0.55 1 auto' : '0.35 1 auto', minHeight: stories ? 28 : 16 }} />

        <div>
          <FreelancerHeadline
            size={freelancerSize}
            kickerSize={stories ? 36 : 30}
            slab
            slabBg={INK}
            slabColor={YELLOW}
          />
          <div
            style={{
              marginTop: stories ? 22 : 16,
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: stories ? 36 : square ? 28 : 32,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: INK,
            }}
          >
            Then we need you.
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 16 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: stories ? 28 : 18 }}>
          {COPY.roles.map((r) => (
            <RoleBar key={r.id} label={r.label} compact={square} />
          ))}
        </div>

        <div
          style={{
            borderTop: `2px solid ${INK}`,
            paddingTop: stories ? 22 : 18,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {COPY.incomeKicker}
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: stories ? 56 : square ? 44 : 52,
              letterSpacing: '-0.045em',
              lineHeight: 0.95,
            }}
          >
            {COPY.income}
          </div>
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              fontFamily: FONT_BODY,
              fontSize: square ? 16 : 18,
            }}
          >
            <span>{COPY.applyHint} · {COPY.phoneDisplay}</span>
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: square ? 12 : 14,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {COPY.web}
            </span>
          </div>
        </div>
      </div>
    </PosterRoot>
  )
}
