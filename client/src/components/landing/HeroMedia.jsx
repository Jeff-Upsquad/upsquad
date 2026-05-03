"use client"
import { useEffect, useRef, useState } from 'react'

function isEmbedUrl(url) {
  if (!url) return false
  return /(?:youtube\.com|youtu\.be|vimeo\.com|loom\.com)/i.test(url)
}

function toEmbed(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`
    }
    if (u.hostname.includes('loom.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      if (id) return `https://www.loom.com/embed/${id}?autoplay=1`
    }
  } catch {
    return url
  }
  return url
}

export default function HeroMedia({ videoUrl, onRequestGate }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [embedActive, setEmbedActive] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
    setPlaying(false)
    setEmbedActive(false)
  }, [videoUrl])

  const handlePlayClick = () => {
    if (onRequestGate && !onRequestGate()) return
    if (isEmbedUrl(videoUrl)) {
      setEmbedActive(true)
      setPlaying(true)
      return
    }
    const v = videoRef.current
    if (!v) return
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  if (!videoUrl) {
    if (onRequestGate) {
      return (
        <button
          type="button"
          onClick={() => onRequestGate()}
          aria-label="Play hero video"
          className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center group"
        >
          <span className="w-16 h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
            <svg className="w-6 h-6 ml-0.5 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/80">
            Click play to choose a language
          </span>
        </button>
      )
    }
    return (
      <div className="w-full aspect-video rounded-xl bg-surface-secondary border border-[rgba(96,96,163,0.2)] animate-pulse" aria-label="Video loading" />
    )
  }

  if (isEmbedUrl(videoUrl)) {
    if (embedActive) {
      return (
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={toEmbed(videoUrl)}
            title="Hero video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )
    }
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#090C1D] flex items-center justify-center">
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label="Play hero video"
          className="group w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
        >
          <svg className="w-6 h-6 ml-0.5 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        playsInline
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="w-full h-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label="Play hero video"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 to-transparent"
        >
          <span className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all">
            <svg className="w-6 h-6 ml-0.5 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
