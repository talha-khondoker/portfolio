import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import SocialLinks from './SocialLinks'
import './Navbar.css'

const links = [
  { label: 'Home', id: 'home', icon: ['M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z'] },
  { label: 'About', id: 'about', icon: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'] },
  { label: 'Skills', id: 'skills', icon: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  { label: 'Education', id: 'education', icon: ['M22 9 12 4 2 9l10 5 10-5z', 'M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5'] },
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
  const [hover, setHover] = useState(null)

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
      setActive(pathname.startsWith('/projects') ? 'projects' : '')
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

  const current =
    pathname === '/resume'
      ? { id: 'resume', label: 'Resume', icon: ['M6 3h8l4 4v14H6z', 'M14 3v4h4M9 12h6M9 16h6'] }
      : links.find((l) => l.id === active) ?? links[0]

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
        className={`navbar relative mx-auto min-h-0 max-w-5xl rounded-full border px-2 py-1.5 backdrop-blur-2xl transition-all duration-500 motion-reduce:transition-none sm:px-4 ${
          scrolled
            ? 'border-base-content/15 bg-base-100/80 shadow-[0_12px_40px_-12px] shadow-secondary/40'
            : 'border-base-content/10 bg-base-100/50 shadow-lg shadow-black/5'
        }`}
      >
        {/* Gradient hairline along the top edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent"
        />

        {/* Scroll progress line with a glowing head */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-secondary to-info"
            style={{ width: `${progress}%` }}
          />
          <span
            className="absolute bottom-[-2px] size-2 -translate-x-1/2 rounded-full bg-info shadow-[0_0_10px_3px] shadow-info/70"
            style={{ left: `${progress}%`, opacity: progress > 0.5 ? 1 : 0 }}
          />
        </div>

        {/* Left: brand */}
        <div className="navbar-start">
          <Link to={to('home')} className="group flex items-center gap-2.5 pl-1" aria-label="Talha, home">
            <span className="relative grid size-9 place-items-center">
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-secondary to-info opacity-40 blur-md transition duration-300 group-hover:opacity-90"
              />
              <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-secondary to-info font-extrabold text-secondary-content ring-2 ring-white/30 transition duration-300 group-hover:rotate-12 group-hover:scale-110">
                T
              </span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-extrabold tracking-[0.2em]">TALHA</span>
              <span className="hidden bg-gradient-to-r from-secondary to-info bg-clip-text text-xs font-semibold text-transparent lg:block">
                Junior Full-Stack Developer
              </span>
            </span>
          </Link>
        </div>

        {/* Center on phones: the section you are reading */}
        <div className="navbar-center md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 rounded-full border border-base-content/10 bg-base-200/60 px-3 py-1.5 text-xs font-semibold"
            >
              <NavIcon paths={current.icon} className="size-3.5 text-secondary" />
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center: links (tablet and up), with a sliding highlight and a hover glow */}
        <nav className="navbar-center hidden md:flex" aria-label="Main">
          <ul
            onMouseLeave={() => setHover(null)}
            className="flex items-center gap-0.5 rounded-full border border-base-content/10 bg-base-200/60 p-1 text-sm shadow-inner"
          >
            {links.map((l) => {
              const isActive = active === l.id
              return (
                <li key={l.id} onMouseEnter={() => setHover(l.id)}>
                  <Link
                    to={to(l.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium transition-colors duration-300 ${
                      isActive ? 'text-secondary-content' : 'text-base-content/70 hover:text-base-content'
                    }`}
                  >
                    {hover === l.id && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                        className="absolute inset-0 rounded-full bg-base-content/10"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-info shadow-lg shadow-secondary/40"
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
            className="nb-shimmer btn btn-sm hidden gap-1 rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/40 lg:inline-flex"
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
            {/* Three lines that morph into a cross */}
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'scale-x-0 opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel (phones only) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-3 top-full mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-5xl overflow-y-auto rounded-3xl border border-base-content/10 bg-base-100/90 p-2.5 shadow-2xl shadow-secondary/20 backdrop-blur-2xl transition duration-300 motion-reduce:transition-none sm:inset-x-4 md:hidden ${
          open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-3 scale-95 opacity-0'
        }`}
      >
        <ul className="grid grid-cols-2 gap-1.5">
          {links.map((l, i) => {
            const isActive = active === l.id
            return (
              <li
                key={l.id}
                className={`transition duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <Link
                  to={to(l.id)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex min-h-12 items-center gap-2.5 rounded-2xl px-3 font-medium transition ${
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

        <div className="mt-2 flex items-center justify-between rounded-2xl bg-base-200/60 px-4 py-2">
          <span className="text-sm font-medium">Theme</span>
          <ThemeToggle />
        </div>


        <Link
          to={to('contact')}
          onClick={() => setOpen(false)}
          className="nb-shimmer btn mt-2 w-full gap-1 rounded-2xl border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30"
        >
          Let&apos;s Talk <span aria-hidden="true">→</span>
        </Link>

        <SocialLinks className="mt-3 justify-center pb-1" />
      </div>
    </header>
  )
}
