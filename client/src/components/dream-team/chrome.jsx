import { COPY, FONT_DISPLAY, FONT_MONO, INK, WHITE, YELLOW } from './copy'

export function Wordmark({ color = WHITE, size = 32 }) {
  const dot = Math.max(8, Math.round(size * 0.28))
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.round(size * 0.22),
        color,
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '-0.03em',
        lineHeight: 1,
      }}
    >
      {COPY.brand}
      <span
        aria-hidden="true"
        style={{
          width: dot,
          height: dot,
          borderRadius: '50%',
          background: YELLOW,
          display: 'inline-block',
          boxShadow: `0 0 ${dot}px rgba(255,255,153,0.7)`,
        }}
      />
    </span>
  )
}

export function Clapper({ height = 52 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height,
        flexShrink: 0,
        background: `repeating-linear-gradient(-28deg, ${INK} 0 14px, ${YELLOW} 14px 28px)`,
      }}
    />
  )
}

export function FilmHoles({ color = YELLOW, count = 18 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 42,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '8px 0',
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            width: 18,
            height: 13,
            borderRadius: 3,
            background: color,
            display: 'block',
          }}
        />
      ))}
    </div>
  )
}

export function MonoLabel({ children, color = YELLOW, size = 18, tracking = '0.16em' }) {
  return (
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: size,
        fontWeight: 500,
        letterSpacing: tracking,
        textTransform: 'uppercase',
        color,
        lineHeight: 1.3,
      }}
    >
      {children}
    </span>
  )
}

export function PosterRoot({ format, background, color, children, innerRef }) {
  return (
    <div
      ref={innerRef}
      data-poster
      style={{
        width: format.w,
        height: format.h,
        background,
        color,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'geometricPrecision',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}

export function FreelancerHeadline({
  size = 92,
  kickerSize,
  color = INK,
  slab = false,
  slabBg = INK,
  slabColor = YELLOW,
}) {
  const sub = kickerSize || Math.max(22, Math.round(size * 0.3))
  return (
    <div>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 800,
          fontSize: sub,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color,
          marginBottom: Math.round(size * 0.1),
        }}
      >
        Are you a
      </div>
      {slab ? (
        <div
          style={{
            display: 'inline-block',
            background: slabBg,
            color: slabColor,
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: size,
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            padding: `${Math.round(size * 0.16)}px ${Math.round(size * 0.2)}px`,
          }}
        >
          Freelancer?
        </div>
      ) : (
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: size,
            letterSpacing: '-0.05em',
            lineHeight: 0.86,
            color,
          }}
        >
          Freelancer?
        </div>
      )}
    </div>
  )
}

export function Grain({ opacity = 0.07, light = false }) {
  const fill = light ? INK : WHITE
  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        opacity,
        backgroundImage: `radial-gradient(circle, ${fill} 0.6px, transparent 0.7px)`,
        backgroundSize: '4px 4px',
      }}
    />
  )
}
