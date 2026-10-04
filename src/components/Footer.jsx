import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { contactInfo } from '../Data'
import { getLenis } from '../lib/lenis'
import SocialLinks from './SocialLinks'
import './Footer.css'

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Coding', id: 'problem-solving' },
  { label: 'Contact', id: 'contact' },
]

const ribbon = [
  'Python',
  'FastAPI',
  'React',
  'JavaScript',
  'Tailwind CSS',
  'MySQL',
  'SQLAlchemy',
  'Supabase',
  'Docker',
  'Git & GitHub',
  'C++',
  'Problem solving',
]

const to = (id) => ({ pathname: '/', hash: `#${id}` })

const goTop = () => {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0, { duration: 1.4 })
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

const CIRCLE = 2 * Math.PI * 20

// Floating button: appears after scrolling, ring shows how far down the page you are
function BackToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(y > 400)
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-12 place-items-center rounded-full border border-base-content/10 bg-base-100/90 shadow-xl shadow-secondary/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/40 motion-reduce:transition-none sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-16 opacity-0'
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="btt-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-secondary)" />
            <stop offset="100%" stopColor="var(--color-info)" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="url(#btt-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCLE}
          strokeDashoffset={CIRCLE * (1 - progress)}
        />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative size-5 text-secondary transition duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

// Copies the email address and briefly shows a tick
function CopyEmail() {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* clipboard can be blocked, ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn rounded-full border border-base-content/20 bg-transparent transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/10"
    >
      {done ? 'Copied ✓' : 'Copy email'}
    </button>
  )
}

function Ribbon() {
  // The list is repeated twice so the loop has no gap
  const items = [...ribbon, ...ribbon]
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-base-300 bg-base-200/50 py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="ft-marquee flex w-max items-center">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-lg font-extrabold tracking-tight sm:text-2xl">
            <span className="px-5 text-base-content/70 sm:px-8">{item}</span>
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <footer className="relative mt-16 overflow-hidden bg-base-100">
        {/* Drifting colour blobs and a faint grid */}
        <span aria-hidden="true" className="ft-blob pointer-events-none absolute -left-32 top-40 size-96 rounded-full bg-secondary/15 blur-3xl" />
        <span
          aria-hidden="true"
          className="ft-blob pointer-events-none absolute -right-32 bottom-20 size-96 rounded-full bg-info/15 blur-3xl"
          style={{ animationDelay: '-8s' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-base-300)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent)]"
        />

        <Ribbon />

        <div className="relative mx-auto max-w-6xl px-4 pt-16">
          {/* Call to action */}
          <div className="relative overflow-hidden rounded-3xl p-[2px] shadow-2xl shadow-secondary/20">
            <span aria-hidden="true" className="ft-spin absolute -inset-[100%]" />
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-base-100 px-6 py-10 text-center sm:px-12 md:text-left">
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
                    Open to junior remote roles
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                    Have a project or role in mind?{' '}
                    <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">
                      Let&apos;s talk.
                    </span>
                  </h2>
                  <p className="mt-3 text-base-content/70">
                    I build reliable APIs and the interfaces on top of them. Send me a message and I&apos;ll get
                    back to you.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    to={to('contact')}
                    className="btn rounded-full border-0 bg-gradient-to-r from-secondary to-info px-7 text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
                  >
                    Let&apos;s Talk <span aria-hidden="true">→</span>
                  </Link>
                  <CopyEmail />
                </div>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="mt-16 grid grid-cols-1 gap-10 text-center md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:text-left">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <Link to={to('home')} className="group flex items-center gap-3" aria-label="Talha, home">
                <span className="relative grid size-12 place-items-center">
                  <span aria-hidden="true" className="absolute -inset-1 rounded-full bg-gradient-to-br from-secondary to-info opacity-40 blur-md transition duration-300 group-hover:opacity-90" />
                  <span className="relative grid size-12 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-xl font-extrabold text-secondary-content ring-2 ring-white/30 transition duration-300 group-hover:rotate-12">
                    T
                  </span>
                </span>
                <span className="text-left leading-tight">
                  <span className="block font-extrabold">Md Mushfiqur Talha Khondoker</span>
                  <span className="block bg-gradient-to-r from-secondary to-info bg-clip-text text-sm font-semibold text-transparent">
                    Full Stack Web Developer
                  </span>
                </span>
              </Link>

              <p className="mt-4 max-w-xs text-sm text-base-content/70">
                Python, FastAPI and React. Mathematics student, competitive programmer and private tutor in
                Jashore, Bangladesh.
              </p>

              <SocialLinks className="mt-5 justify-center md:justify-start" />
            </div>

            {/* Explore */}
            <nav aria-label="Footer">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-secondary">Explore</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
                {links.map((l) => (
                  <li key={l.id}>
                    <Link
                      to={to(l.id)}
                      className="group inline-flex items-center gap-2 text-base-content/70 transition duration-300 hover:translate-x-1 hover:text-secondary"
                    >
                      <span className="h-px w-0 bg-secondary transition-all duration-300 group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get in touch */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-secondary">Get in touch</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  { href: `mailto:${contactInfo.email}`, text: contactInfo.email, path: ['M3 5h18v14H3z', 'M3 7l9 6 9-6'] },
                  {
                    href: contactInfo.phoneHref,
                    text: contactInfo.phone,
                    path: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z'],
                  },
                ].map((c) => (
                  <li key={c.text}>
                    <a
                      href={c.href}
                      className="group inline-flex items-center gap-3 text-base-content/70 transition duration-300 hover:text-secondary"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary transition duration-300 group-hover:bg-secondary group-hover:text-secondary-content">
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {c.path.map((d) => (
                            <path key={d} d={d} />
                          ))}
                        </svg>
                      </span>
                      <span className="break-all">{c.text}</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center justify-center gap-3 text-base-content/70 md:justify-start">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
                      <path d="M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                    </svg>
                  </span>
                  Jashore, Bangladesh
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-base-300 pt-6 text-xs text-base-content/60 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Talha Khondoker. All rights reserved.</p>
            <p>
              Designed and built in Jashore with React &amp; Tailwind CSS
            </p>
            <button
              type="button"
              onClick={goTop}
              className="group inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 font-semibold text-base-content transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
            >
              Back to top
              <span aria-hidden="true" className="transition duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>

        {/* Giant outlined name, cropped at the bottom edge */}
        <div
          aria-hidden="true"
          className="ft-outline pointer-events-none relative mt-6 select-none overflow-hidden text-center text-[24vw] font-extrabold leading-[0.8] tracking-tighter [mask-image:linear-gradient(to_bottom,black_25%,transparent_95%)]"
        >
          TALHA
        </div>
      </footer>

      <BackToTop />
    </>
  )
}
