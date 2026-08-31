export function posterFilename(conceptId, format, prefix = 'upsquad-dream-team') {
  const ratio = format.ratio.replace(':', 'x')
  return `${prefix}-${conceptId}-${ratio}-${format.w}x${format.h}.png`
}

function captureOptions(format, extra = {}) {
  return {
    cacheBust: true,
    pixelRatio: 1,
    width: format.w,
    height: format.h,
    canvasWidth: format.w,
    canvasHeight: format.h,
    skipAutoScale: true,
    backgroundColor: extra.backgroundColor,
    skipFonts: extra.skipFonts || false,
    style: {
      transform: 'none',
      transformOrigin: 'top left',
      left: '0px',
      top: '0px',
      margin: '0px',
      inset: 'auto',
      width: `${format.w}px`,
      height: `${format.h}px`,
      position: 'relative',
      opacity: '1',
      zIndex: '1',
    },
  }
}

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export async function downloadPosterPng(node, filename, format) {
  if (!node) throw new Error('Poster is not ready — try again in a moment')
  if (document.fonts?.ready) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ])
  }

  const { toBlob } = await import('html-to-image')

  const attempt = async (extra) => {
    const blob = await Promise.race([
      toBlob(node, captureOptions(format, extra)),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Export timed out')), 20000)
      }),
    ])
    if (!blob || blob.size < 100) throw new Error('Export produced an empty image')
    return blob
  }

  let blob
  try {
    blob = await attempt({ skipFonts: false })
  } catch (first) {
    try {
      blob = await attempt({ skipFonts: true })
    } catch (second) {
      const detail = second?.message || first?.message || String(second || first)
      throw new Error(detail)
    }
  }

  saveBlob(blob, filename)
}

export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
