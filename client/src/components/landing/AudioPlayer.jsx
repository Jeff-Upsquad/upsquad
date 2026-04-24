"use client"
import { useEffect, useRef, useState } from 'react'

const SPEEDS = [0.5, 1, 1.25, 1.5, 2]

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ audioUrl, onRequestGate }) {
  const audioRef = useRef(null)
  const regionRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRate] = useState(1)
  const [speedOpen, setSpeedOpen] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = rate
  }, [rate])

  const togglePlay = () => {
    if (onRequestGate && !onRequestGate()) return
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }

  const seek = (delta) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min((audio.duration || 0), audio.currentTime + delta))
  }

  const onKeyDown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return
    if (e.code === 'Space') { e.preventDefault(); togglePlay() }
    else if (e.code === 'ArrowLeft') { e.preventDefault(); seek(-5) }
    else if (e.code === 'ArrowRight') { e.preventDefault(); seek(5) }
  }

  if (!audioUrl) {
    if (onRequestGate) {
      return (
        <div className="mt-3 flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <button
            type="button"
            onClick={() => onRequestGate()}
            aria-label="Play audio"
            className="flex-shrink-0 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <span className="text-xs text-slate-500">Click play to choose a language</span>
        </div>
      )
    }
    return (
      <div className="mt-3 h-14 rounded-xl bg-gray-100 border border-gray-200 animate-pulse" aria-label="Audio loading" />
    )
  }

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Hero audio player"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mt-3 flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        className="flex-shrink-0 w-10 h-10 bg-gray-900 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>

      <span className="text-xs text-slate-500 tabular-nums w-10 text-right">{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={(e) => {
          const audio = audioRef.current
          if (audio) audio.currentTime = Number(e.target.value)
        }}
        aria-label="Seek audio"
        className="flex-1 accent-emerald-500"
      />
      <span className="text-xs text-slate-500 tabular-nums w-10">{formatTime(duration)}</span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setSpeedOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={speedOpen}
          aria-label="Playback speed"
          className="flex-shrink-0 px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 text-slate-700 hover:border-gray-300"
        >
          {rate}×
        </button>
        {speedOpen && (
          <div role="menu" className="absolute right-0 bottom-full mb-1 w-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20">
            {SPEEDS.map((s) => (
              <button
                key={s}
                role="menuitemradio"
                aria-checked={s === rate}
                onClick={() => { setRate(s); setSpeedOpen(false) }}
                className={`w-full text-left px-3 py-1.5 text-xs ${s === rate ? 'bg-gray-100 text-slate-900' : 'text-slate-600 hover:bg-gray-50'}`}
              >
                {s}×
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
