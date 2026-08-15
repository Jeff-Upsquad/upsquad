"use client"
import { useEffect, useRef, useState } from 'react'
import SpeedControl from './SpeedControl'

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
        <div className="mt-3 flex items-center gap-3 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-3 py-2 shadow-sm">
          <button
            type="button"
            onClick={() => onRequestGate()}
            aria-label="Play audio"
            className="flex-shrink-0 w-10 h-10 btn-gradient rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <span className="text-xs text-text-secondary">Click play to choose a language</span>
        </div>
      )
    }
    return (
      <div className="mt-3 h-14 rounded-xl bg-surface-secondary border border-[rgba(0,0,0,0.08)] animate-pulse" aria-label="Audio loading" />
    )
  }

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Hero audio player"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="mt-3 flex items-center gap-3 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
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
        className="flex-shrink-0 w-10 h-10 btn-gradient rounded-full flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
        ) : (
          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>

      <span className="text-xs text-text-secondary tabular-nums w-10 text-right">{formatTime(currentTime)}</span>
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
        className="flex-1 accent-brand-purple"
      />
      <span className="text-xs text-text-secondary tabular-nums w-10">{formatTime(duration)}</span>

      <SpeedControl rate={rate} onChange={setRate} />
    </div>
  )
}
