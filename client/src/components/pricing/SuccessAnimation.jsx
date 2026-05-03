"use client"
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI
  return {
    x: Math.cos(angle) * 80,
    y: Math.sin(angle) * 80,
    color: i % 3 === 0 ? 'bg-brand-purple' : i % 3 === 1 ? 'bg-brand-orange' : 'bg-brand-cyan',
    delay: i * 0.03,
  }
})

export default function SuccessAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex flex-col items-center justify-center py-16 relative">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full ${p.color}`}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ scale: [0, 1.2, 0], x: p.x, y: p.y, opacity: [1, 1, 0] }}
          transition={{ duration: 0.8, delay: 0.4 + p.delay, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="w-24 h-24 rounded-full bg-brand-purple border-2 border-text-primary shadow-brutal flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-text-primary">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      <motion.p
        className="font-heading text-xl font-bold text-text-primary mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        You're in!
      </motion.p>
    </div>
  )
}
