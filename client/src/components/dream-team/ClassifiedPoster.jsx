import { COPY, FONT_BODY, FONT_DISPLAY, FONT_MONO, INK, PAPER, REELS_SAFE, YELLOW } from './copy'
import { FreelancerHeadline, Grain, PosterRoot } from './chrome'

function Rule() {
  return <div style={{ height: 1, background: INK, opacity: 0.9, width: '100%' }} />
}

function DoubleRule() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <div style={{ height: 2, background: INK }} />
      <div style={{ height: 1, background: INK }} />
    </div>
  )
}

export default function ClassifiedPoster({ format, innerRef }) {
  const wide = format.id === 'landscape'
  const stories = format.id === 'stories'
  const square = format.id === 'square'
  const pad = wide ? 28 : stories ? 64 : 56

  const masthead = (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: FONT_MONO,
          fontSize: wide ? 11 : 13,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span>Kochi</span>
        <span>Vol. I · No. 07</span>
        <span>Open call</span>
      </div>
      <div
        style={{
          margin: wide ? '8px 0 6px' : '10px 0 8px',
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: wide ? 42 : stories ? 72 : square ? 56 : 64,
          letterSpacing: '-0.045em',
          lineHeight: 0.9,
          textAlign: 'center',
          textTransform: 'uppercase',
          color: INK,
        }}
      >
        The UpSquad Times
      </div>
      <DoubleRule />
    </div>
  )

  const payChip = (
    <span
      style={{
        background: YELLOW,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
        padding: '0 8px',
      }}
    >
      {COPY.incomeLong}
    </span>
  )

  if (wide) {
    return (
      <PosterRoot format={format} background={PAPER} color={INK} innerRef={innerRef}>
        <Grain opacity={0.04} light />
        <div
          style={{
            flex: 1,
            padding: `${pad}px ${pad + 8}px`,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
            minHeight: 0,
          }}
        >
          {masthead}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.15fr 0.95fr 0.9fr', gap: 28, marginTop: 18, minHeight: 0 }}>
            <div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Situations vacant
              </div>
              <FreelancerHeadline size={36} kickerSize={16} color={INK} slab slabBg={INK} slabColor={YELLOW} />
              <div
                style={{
                  marginTop: 12,
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  fontSize: 26,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.02,
                }}
              >
                Video editors &amp; designers
              </div>
              <p
                style={{
                  margin: '10px 0 0',
                  fontFamily: FONT_BODY,
                  fontSize: 16,
                  lineHeight: 1.35,
                }}
              >
                {COPY.kicker} {COPY.wantIn}
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                The arrangement
              </div>
              <p style={{ margin: 0, fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.4 }}>
                Join the {COPY.program}. We find the clients. You make the work. Pay ranges {payChip}.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Box 07 · Apply
              </div>
              <p style={{ margin: 0, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {COPY.phoneDisplay}
              </p>
              <p style={{ margin: '8px 0 0', fontFamily: FONT_MONO, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {COPY.web}
              </p>
              <p style={{ margin: '8px 0 0', fontFamily: FONT_BODY, fontSize: 15 }}>
                {COPY.applyHint}
              </p>
            </div>
          </div>
        </div>
      </PosterRoot>
    )
  }

  return (
    <PosterRoot format={format} background={PAPER} color={INK} innerRef={innerRef}>
      <Grain opacity={0.045} light />
      <div
        style={{
          flex: 1,
          padding: stories
            ? `${REELS_SAFE.top}px ${REELS_SAFE.x}px ${REELS_SAFE.bottom}px`
            : square
              ? '56px 56px 52px'
              : '64px 64px 56px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        {masthead}

        <div
          style={{
            marginTop: stories ? 28 : 22,
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Situations vacant
        </div>

        <div style={{ marginTop: stories ? 18 : 14, display: 'flex', justifyContent: 'center' }}>
          <FreelancerHeadline
            size={stories ? 78 : square ? 56 : 66}
            kickerSize={stories ? 28 : 22}
            color={INK}
            slab
            slabBg={INK}
            slabColor={YELLOW}
          />
        </div>

        <div
          style={{
            margin: `${stories ? 20 : 16}px 0 0`,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: stories ? 56 : square ? 42 : 48,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            textAlign: 'center',
            color: INK,
          }}
        >
          Video editors
          <br />
          &amp; designers
        </div>

        <p
          style={{
            margin: `${stories ? 24 : 18}px auto 0`,
            maxWidth: 720,
            textAlign: 'center',
            fontFamily: FONT_BODY,
            fontSize: stories ? 28 : square ? 22 : 24,
            lineHeight: 1.4,
          }}
        >
          {COPY.kicker} {COPY.wantIn} Join the {COPY.program} — we find the clients, you make the work.
        </p>

        <div style={{ flex: 1, minHeight: 20 }} />

        <Rule />
        <div
          style={{
            padding: stories ? '28px 0' : '22px 0',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Regular monthly income
          </div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 800,
              fontSize: stories ? 56 : square ? 40 : 48,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
            }}
          >
            {payChip}
          </div>
        </div>
        <Rule />

        <div
          style={{
            marginTop: stories ? 28 : 22,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'flex-end',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 13,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              Box 07 · Apply
            </div>
            <div
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: square ? 22 : 26,
                letterSpacing: '-0.02em',
              }}
            >
              {COPY.phoneDisplay}
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 16, marginTop: 4 }}>{COPY.applyHint}</div>
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textAlign: 'right',
            }}
          >
            {COPY.web}
          </div>
        </div>
      </div>
    </PosterRoot>
  )
}
