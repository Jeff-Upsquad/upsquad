"use client"
import { motion } from 'framer-motion'

const variants = {
  up:    { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export default function ScrollReveal({ children, direction = 'up', delay = 0, className = '' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.5, 0, 0.5, 1], delay }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
