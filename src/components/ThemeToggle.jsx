import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LIGHT = 'portfolio-light'
const DARK = 'portfolio-dark'

function initialTheme() {
  const current = document.documentElement.getAttribute('data-theme')
  if (current === LIGHT || current === DARK) return current
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT
}

const svg = {
  viewBox: '0 0 24 24',
  className: 'size-4',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function SunIcon() {
  return (
    <svg {...svg} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg {...svg} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(initialTheme)
  const dark = theme === DARK

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage can be blocked, ignore */
    }
  }, [theme])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(dark ? LIGHT : DARK)}
      className="relative flex h-8 w-14 shrink-0 items-center rounded-full border border-base-content/15 bg-base-200 p-1 transition-colors hover:border-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={`grid size-6 place-items-center rounded-full bg-secondary text-secondary-content shadow ${
          dark ? 'ml-auto' : ''
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? 'moon' : 'sun'}
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid place-items-center"
          >
            {dark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  )
}
