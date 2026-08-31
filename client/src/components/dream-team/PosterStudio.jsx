'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CONCEPTS, FORMATS } from './copy'
import CastPoster from './CastPoster'
import HighlightPoster from './HighlightPoster'
import ClassifiedPoster from './ClassifiedPoster'
import { downloadPosterPng, posterFilename, wait } from './downloadPoster'

function Poster({ concept, format, innerRef }) {
  if (concept === 'highlight') return <HighlightPoster format={format} innerRef={innerRef} />
  if (concept === 'classified') return <ClassifiedPoster format={format} innerRef={innerRef} />
  return <CastPoster format={format} innerRef={innerRef} />
}

export default function PosterStudio() {
  const [conceptId, setConceptId] = useState('cast')
  const [formatId, setFormatId] = useState('portrait')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const c = q.get('concept')
    const f = q.get('format')
    if (c && CONCEPTS.some((x) => x.id === c)) setConceptId(c)
    if (f && FORMATS.some((x) => x.id === f)) setFormatId(f)
  }, [])
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [stageSize, setStageSize] = useState({ w: 420, h: 640 })
  const posterRef = useRef(null)
  const stageRef = useRef(null)
  const formatIdRef = useRef(formatId)
  formatIdRef.current = formatId

  const format = FORMATS.find((f) => f.id === formatId) || FORMATS[1]
  const concept = CONCEPTS.find((c) => c.id === conceptId) || CONCEPTS[0]

  useEffect(() => {
    const el = stageRef.current
    if (!el) return undefined
    const measure = () => {
      const rect = el.getBoundingClientRect()
      setStageSize({ w: Math.max(240, rect.width), h: Math.max(320, rect.height) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale = Math.min(stageSize.w / format.w, stageSize.h / format.h, 1)
  const previewW = Math.round(format.w * scale)
  const previewH = Math.round(format.h * scale)

  const captureCurrent = useCallback(async () => {
    const node = posterRef.current
    const currentFormat = FORMATS.find((f) => f.id === formatIdRef.current)
    await downloadPosterPng(node, posterFilename(conceptId, currentFormat), currentFormat)
  }, [conceptId])

  const paintAndCapture = useCallback(async () => {
    await wait(60)
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    await captureCurrent()
  }, [captureCurrent])

  const onDownloadOne = async () => {
    setError('')
    setBusy('one')
    try {
      await paintAndCapture()
    } catch (err) {
      console.error('Poster download failed', err)
      setError(err?.message || String(err) || 'Could not export this poster')
    } finally {
      setBusy('')
    }
  }

  const onDownloadAllSizes = async () => {
    setError('')
    setBusy('all')
    const restore = formatId
    try {
      for (const next of FORMATS) {
        setFormatId(next.id)
        await wait(120)
        await paintAndCapture()
        await wait(350)
      }
    } catch (err) {
      console.error('Poster download failed', err)
      setError(err?.message || String(err) || 'Could not export every size')
    } finally {
      setFormatId(restore)
      setBusy('')
    }
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 items-start">
      <div>
        <div
          ref={stageRef}
          className="relative flex items-center justify-center rounded-2xl border border-black/[0.08] dark:border-white/10 bg-[#111] dark:bg-black min-h-[420px] sm:min-h-[560px] overflow-hidden"
        >
          <div
            className="shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]"
            style={{ width: previewW, height: previewH, overflow: 'hidden' }}
          >
            <div
              style={{
                width: format.w,
                height: format.h,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            >
              <Poster concept={conceptId} format={format} innerRef={posterRef} />
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-text-muted font-mono tracking-wide uppercase">
          Preview · {format.w}×{format.h}px · {format.ratio} · {format.placement}
        </p>
        {format.id === 'stories' && (
          <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
            Reels/Stories safe zone: headline and pay sit in the middle of the frame so the username, audio chip, caption, and tab bar cannot cover them.
          </p>
        )}
      </div>

      <div className="lg:sticky lg:top-28">
        <p className="text-label text-text-muted mb-3">Design</p>
        <div className="flex flex-col gap-2 mb-8">
          {CONCEPTS.map((c) => {
            const on = c.id === conceptId
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setConceptId(c.id)}
                className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                  on
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                    : 'bg-white dark:bg-surface-primary border-black/[0.08] dark:border-white/10 hover:border-black/30'
                }`}
              >
                <span className="block font-heading font-bold text-sm">{c.name}</span>
                <span className={`block text-xs mt-1 leading-relaxed ${on ? 'text-white/70' : 'text-text-secondary'}`}>
                  {c.blurb}
                </span>
              </button>
            )
          })}
        </div>

        <p className="text-label text-text-muted mb-3">Meta size</p>
        <div className="grid grid-cols-2 gap-2 mb-8">
          {FORMATS.map((f) => {
            const on = f.id === formatId
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormatId(f.id)}
                className={`rounded-xl border px-3 py-3 text-left transition-colors ${
                  on
                    ? 'bg-[#FFFF99] text-[#0A0A0A] border-black'
                    : 'bg-white dark:bg-surface-primary border-black/[0.08] dark:border-white/10 hover:border-black/30'
                }`}
              >
                <span className="block font-heading font-bold text-sm leading-tight">{f.label}</span>
                <span className={`block font-mono text-[10px] tracking-wider uppercase mt-1 ${on ? 'text-black/60' : 'text-text-muted'}`}>
                  {f.ratio} · {f.w}×{f.h}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onDownloadOne}
            disabled={!!busy}
            className="btn-gradient w-full justify-center inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full disabled:opacity-60"
          >
            {busy === 'one' ? 'Preparing PNG…' : `Download ${concept.name} · ${format.ratio}`}
          </button>
          <button
            type="button"
            onClick={onDownloadAllSizes}
            disabled={!!busy}
            className="btn-secondary w-full justify-center inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full disabled:opacity-60"
          >
            {busy === 'all' ? 'Downloading all four sizes…' : `All 4 sizes of ${concept.name}`}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-text-primary border border-black/15 rounded-lg px-3 py-2 bg-white">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
