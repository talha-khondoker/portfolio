import { motion, useReducedMotion } from 'framer-motion'

// Fades and slides content up once, when it scrolls into view
export default function Reveal({ as = 'div', children, delay = 0, y = 28, className = '' }) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
