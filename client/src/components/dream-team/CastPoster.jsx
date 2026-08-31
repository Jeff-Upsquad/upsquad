import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, MUTED, REELS_SAFE, WHITE, YELLOW } from './copy'
import { Clapper, FilmHoles, FreelancerHeadline, Grain, MonoLabel, PosterRoot, Wordmark } from './chrome'

function RoleTicket({ code, label, compact }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: WHITE,
        color: INK,
        borderRadius: compact ? 10 : 14,
        padding: compact ? '16px 18px' : '22px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: compact ? 6 : 10,
      }}
    >
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: compact ? 12 : 15,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: MUTED,
        }}
      >
        Scene {code}
      </span>
      <span
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: compact ? 22 : 34,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
        }}
      >
        {label}
      </span>
      <span
        style={{
          alignSelf: 'flex-start',
          marginTop: 4,
          background: YELLOW,
          color: INK,
          fontFamily: FONT_MONO,
          fontSize: compact ? 11 : 13,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: compact ? '4px 8px' : '5px 10px',
          fontWeight: 700,
        }}
      >
        Open
      </span>
    </div>
  )
}

function Footer({ compact, light }) {
  const color = light ? INK : 'rgba(255,255,255,0.78)'
  const size = compact ? 16 : 20
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: compact ? 'nowrap' : 'wrap',
        fontFamily: FONT_BODY,
        fontSize: size,
        color,
        letterSpacing: '-0.01em',
      }}
    >
      <span>{COPY.applyHint} · {COPY.phoneDisplay}</span>
      <span style={{ fontFamily: FONT_MONO, fontSize: size - 2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {COPY.web}
      </span>
    </div>
  )
}

export default function CastPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'
  const clapperH = stories ? 56 : 52
  const padX = wide ? 36 : stories ? REELS_SAFE.x : 64
  const padTop = stories ? Math.max(24, REELS_SAFE.top - clapperH) : 0
  const padBottom = stories ? REELS_SAFE.bottom : wide ? 28 : 48

  if (wide) {
    return (
      <PosterRoot format={format} background={INK} color={WHITE} innerRef={innerRef}>
        <Clapper height={36} />
        <Grain opacity={0.05} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            padding: `28px ${padX}px ${padBottom}px`,
            gap: 36,
            position: 'relative',
            zIndex: 1,
            minHeight: 0,
          }}
        >
          <div style={{ flex: '1 1 46%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <div>
              <Wordmark size={22} />
              <div style={{ marginTop: 14 }}>
                <MonoLabel size={13} color={YELLOW}>Open call · Take 01</MonoLabel>
              </div>
              <div style={{ marginTop: 14 }}>
                <FreelancerHeadline size={42} kickerSize={18} color={WHITE} slab slabBg={YELLOW} slabColor={INK} />
              </div>
            </div>
            <div
              style={{
                alignSelf: 'flex-start',
                background: YELLOW,
                color: INK,
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: '-0.03em',
                padding: '8px 14px',
                lineHeight: 1,
              }}
            >
              {COPY.wantIn}
            </div>
          </div>
          <div style={{ flex: '1 1 54%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              {COPY.roles.map((r) => (
                <RoleTicket key={r.id} code={r.code} label={r.label} compact />
              ))}
            </div>
            <div>
              <MonoLabel size={12} color={YELLOW}>{COPY.program} · {COPY.incomeKicker}</MonoLabel>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 42,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  margin: '6px 0 14px',
                }}
              >
                {COPY.income}
              </div>
              <Footer compact light={false} />
            </div>
          </div>
        </div>
      </PosterRoot>
    )
  }

  return (
    <PosterRoot format={format} background={INK} color={WHITE} innerRef={innerRef}>
      <Clapper height={clapperH} />
      <Grain opacity={0.055} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0, position: 'relative', zIndex: 1 }}>
        <FilmHoles count={stories ? 22 : square ? 14 : 16} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: `${padTop + (stories ? 12 : 40)}px ${padX}px ${padBottom}px 28px`,
            minWidth: 0,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: stories ? 48 : 28 }}>
            <Wordmark size={square ? 28 : 32} />
            <MonoLabel size={14} color={YELLOW}>Take 01</MonoLabel>
          </div>

          <MonoLabel size={14} color={YELLOW}>Open call · {COPY.program}</MonoLabel>

          <div style={{ marginTop: stories ? 18 : 14 }}>
            <FreelancerHeadline
              size={stories ? 68 : square ? 52 : 60}
              kickerSize={stories ? 28 : 24}
              color={WHITE}
              slab
              slabBg={YELLOW}
              slabColor={INK}
            />
          </div>

          <div
            style={{
              margin: `${stories ? 18 : 14}px 0 0`,
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: stories ? 88 : square ? 64 : 76,
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              color: WHITE,
            }}
          >
            Dream
            <br />
            team.
          </div>

          <div
            style={{
              marginTop: stories ? 28 : 20,
              alignSelf: 'flex-start',
              background: YELLOW,
              color: INK,
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: stories ? 42 : 34,
              letterSpacing: '-0.03em',
              padding: stories ? '12px 20px' : '10px 16px',
              lineHeight: 1,
            }}
          >
            {COPY.wantIn}
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', gap: 16, marginBottom: stories ? 36 : 24 }}>
            {COPY.roles.map((r) => (
              <RoleTicket key={r.id} code={r.code} label={r.label} compact={square} />
            ))}
          </div>

          <div
            style={{
              borderTop: `1px solid rgba(255,255,153,0.28)`,
              paddingTop: stories ? 28 : 22,
            }}
          >
            <MonoLabel size={14} color={YELLOW}>{COPY.incomeKicker}</MonoLabel>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: stories ? 64 : square ? 48 : 56,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                margin: '8px 0 22px',
              }}
            >
              {COPY.income}
            </div>
            <Footer compact={square} />
          </div>
        </div>
      </div>
    </PosterRoot>
  )
}
