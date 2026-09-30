import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
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

  // Mouse near the top of the screen shows the navbar (desktop and laptops)
  useEffect(() => {
    const onMove = (e) => {
      if (e.clientY < 70) setHidden(false)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Highlight the link for the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1))
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close the mobile menu: Escape key, tap outside, or when the screen gets wide
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
      {/* Main bar */}
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
          <a href="#home" className="group flex items-center gap-2.5 pl-1" aria-label="Talha, home">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-secondary to-info font-extrabold text-secondary-content transition duration-300 group-hover:rotate-12 group-hover:scale-110">
              T
            </span>
            {/* Phones: logo only. Tablets: name. Laptops and up: name and title */}
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-extrabold tracking-wide">TALHA</span>
              <span className="hidden text-xs text-base-content/60 lg:block">Full Stack Developer</span>
            </span>
          </a>
        </div>

        {/* Center: links (tablet and up) */}
        <nav className="navbar-center hidden md:flex" aria-label="Main">
          <ul className="flex items-center gap-0.5 rounded-full bg-base-200/60 p-1 text-sm lg:gap-1">
            {links.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block rounded-full px-3 py-1.5 font-medium transition duration-300 lg:px-4 ${
                      isActive
                        ? 'bg-secondary text-secondary-content shadow'
                        : 'text-base-content/70 hover:bg-base-100 hover:text-base-content'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: call to action and menu button */}
        <div className="navbar-end gap-1.5">
          <a
            href="#contact"
            className="btn btn-secondary btn-sm hidden gap-1 rounded-full shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
          >
            Let&apos;s Talk <span aria-hidden="true">→</span>
          </a>

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
        <ul className="grid gap-1">
          {links.map((l) => {
            const isActive = active === l.href.slice(1)
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-4 font-medium transition ${
                    isActive
                      ? 'bg-secondary text-secondary-content'
                      : 'hover:bg-base-200 active:bg-base-200'
                  }`}
                >
                  {l.label}
                  {isActive && <span aria-hidden="true">●</span>}
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="btn btn-secondary mt-2 w-full gap-1 rounded-xl"
        >
          Let&apos;s Talk <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  )
}