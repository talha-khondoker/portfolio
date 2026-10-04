import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Home', id: 'home', icon: ['M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z'] },
  { label: 'About', id: 'about', icon: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'] },
  { label: 'Skills', id: 'skills', icon: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  { label: 'Experience', id: 'experience', icon: ['M3 7h18v13H3z', 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'] },
  { label: 'Projects', id: 'projects', icon: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'] },
  { label: 'Coding', id: 'problem-solving', icon: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'] },
  { label: 'Contact', id: 'contact', icon: ['M3 5h18v14H3z', 'M3 7l9 6 9-6'] },
]

function NavIcon({ paths, className = 'size-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

const to = (id) => ({ pathname: '/', hash: `#${id}` })

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('home')
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  const headerRef = useRef(null)
  const lastY = useRef(0)
  const hovering = useRef(false)
  const openRef = useRef(false)

  useEffect(() => {
    openRef.current = open
    if (open) setHidden(false)
  }, [open])

  // Close the menu and show the bar on every page change
  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  // Scroll state, progress line, hide/show direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight

      setScrolled(y > 20)
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0)

      const delta = y - lastY.current
      if (y < 80) {
        setHidden(false)
      } else if (delta > 6 && !hovering.current && !openRef.current) {
        setHidden(true)
      } else if (delta < -6) {
        setHidden(false)
      }
      lastY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mouse near the top of the screen shows the navbar
  useEffect(() => {
    const onMove = (e) => {
      if (e.clientY < 70) setHidden(false)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Highlight the link for the section in view (home page only)
  useEffect(() => {
    if (pathname !== '/') {
      setActive('projects')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])

  // Close the mobile menu: Escape, tap outside, or when the screen gets wide
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onResize = () => mq.matches && setOpen(false)

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    mq.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      mq.removeEventListener('change', onResize)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      onMouseEnter={() => {
        hovering.current = true
      }}
      onMouseLeave={() => {
        hovering.current = false
      }}
      className={`fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-50 px-3 transition-transform duration-300 ease-out motion-reduce:transition-none sm:px-4 ${
        hidden ? '-translate-y-[160%]' : 'translate-y-0'
      }`}
    >
      <div
        className={`navbar relative mx-auto min-h-0 max-w-5xl rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none sm:px-4 ${
          scrolled
            ? 'border-base-content/15 bg-base-100/85 shadow-xl'
            : 'border-base-content/10 bg-base-100/60'
        }`}
      >
        {/* Scroll progress line */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-secondary to-info"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Left: brand */}
        <div className="navbar-start">
          <Link to={to('home')} className="group flex items-center gap-2.5 pl-1" aria-label="Talha, home">
            <span className="relative grid size-9 place-items-center">
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-secondary to-info opacity-40 blur-md transition duration-300 group-hover:opacity-80"
              />
              <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-secondary to-info font-extrabold text-secondary-content ring-2 ring-white/30 transition duration-300 group-hover:rotate-12 group-hover:scale-110">
                T
              </span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-extrabold tracking-[0.2em]">TALHA</span>
              <span className="hidden bg-gradient-to-r from-secondary to-info bg-clip-text text-xs font-semibold text-transparent lg:block">
                Full Stack Developer
              </span>
            </span>
          </Link>
        </div>

        {/* Center: links (tablet and up), with a sliding highlight */}
        <nav className="navbar-center hidden md:flex" aria-label="Main">
          <ul className="flex items-center gap-0.5 rounded-full border border-base-content/10 bg-base-200/60 p-1 text-sm">
            {links.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id}>
                  <Link
                    to={to(l.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors duration-300 ${
                      isActive ? 'text-secondary-content' : 'text-base-content/70 hover:text-base-content'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-info shadow-lg shadow-secondary/30"
                      />
                    )}
                    <NavIcon paths={l.icon} className="relative hidden size-3.5 xl:block" />
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: theme toggle, call to action (laptops) and menu button (phones) */}
        <div className="navbar-end gap-2">
          <ThemeToggle />

          <Link
            to={to('contact')}
            className="btn btn-sm hidden gap-1 rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/40 lg:inline-flex"
          >
            Let&apos;s Talk <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="btn btn-ghost btn-circle md:hidden"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel (phones only) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-3 top-full mx-auto mt-2 max-w-5xl rounded-2xl border border-base-content/10 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl transition duration-200 motion-reduce:transition-none sm:inset-x-4 md:hidden ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <ul className="grid grid-cols-2 gap-1.5">
          {links.map((l, i) => {
            const isActive = active === l.id
            return (
              <li
                key={l.id}
                className={`transition duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: open ? `${i * 35}ms` : '0ms' }}
              >
                <Link
                  to={to(l.id)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex min-h-12 items-center gap-2.5 rounded-xl px-3 font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30'
                      : 'bg-base-200/50 hover:bg-base-200 active:bg-base-200'
                  }`}
                >
                  <NavIcon paths={l.icon} className="size-4.5 shrink-0" />
                  {l.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-2 flex items-center justify-between rounded-xl bg-base-200/60 px-4 py-2">
          <span className="text-sm font-medium">Theme</span>
          <ThemeToggle />
        </div>

        <Link
          to={to('contact')}
          onClick={() => setOpen(false)}
          className="btn mt-2 w-full gap-1 rounded-xl border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30"
        >
          Let&apos;s Talk <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  )
}
