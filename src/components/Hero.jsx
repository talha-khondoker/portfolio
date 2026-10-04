import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { skills } from '../Data'
import SocialLinks from './SocialLinks'
import './Hero.css'

const slug = (text) => text.toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '')

const buildCode = (group) =>
  `${slug(group.group)} = [\n${group.items.map((item) => `  "${item}",`).join('\n')}\n]`

// Colours strings amber and the variable name blue
function Highlighted({ text }) {
  const parts = text.split(/("[^"]*"?|^\w+(?= =))/gm)
  return parts.map((part, i) => {
    if (part.startsWith('"')) return <span key={i} className="text-amber-300">{part}</span>
    if (/^\w+$/.test(part)) return <span key={i} className="text-sky-300">{part}</span>
    return <span key={i}>{part}</span>
  })
}

const roles = [
  { text: 'Full Stack Web Developer', icon: ['M12 2 2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5'] },
  {
    text: 'Competitive Programmer',
    icon: ['M7 4h10v5a5 5 0 0 1-10 0z', 'M17 5h3v2a3 3 0 0 1-3 3', 'M7 5H4v2a3 3 0 0 0 3 3', 'M12 14v4', 'M8 21h8'],
  },
  { text: 'Backend Engineer: Python & FastAPI', icon: ['M3 4h18v6H3z', 'M3 14h18v6H3z', 'M7 7h.01', 'M7 17h.01'] },
  { text: 'Problem Solver', icon: ['M9 18h6', 'M10 21h4', 'M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z'] },
  { text: 'Mathematics Student', icon: ['M18 4H6l7 8-7 8h12'] },
  // { text: 'Math Tutor', icon: ['M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z', 'M4 19a2 2 0 0 0 2 2h14'] },
]

// Roles that fade in and out under the name
function RoleSwitcher() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % roles.length), 2800)
    return () => clearTimeout(t)
  }, [i])

  const role = roles[i]

  return (
    <div className="mt-2">
      <span className="sr-only">{roles.map((r) => r.text).join(', ')}</span>

      <div aria-hidden="true" className="min-h-14 sm:min-h-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-start gap-2"
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-secondary to-info text-secondary-content shadow-md shadow-secondary/30">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                {role.icon.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
            </span>
            <span className="min-w-0 text-lg font-bold leading-7 hero-shine">{role.text}</span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Pager: tap a bar to jump to that role */}
      <div className="mt-1 flex gap-1.5">
        {roles.map((r, n) => (
          <button
            key={r.text}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Show: ${r.text}`}
            className="py-2"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-500 ${
                n === i ? 'w-7 bg-secondary' : 'w-2 bg-base-content/20 hover:bg-base-content/40'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

const platforms = [
  { name: 'Codeforces', color: 'bg-sky-400' },
  { name: 'CodeChef', color: 'bg-amber-700' },
  { name: 'LeetCode', color: 'bg-amber-400' },
]

function SkillsEditor() {
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')
  const code = buildCode(skills[active])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTyped(code)
      return
    }

    setTyped('')
    let i = 0
    let timer
    const type = () => {
      i += 1
      setTyped(code.slice(0, i))
      if (i < code.length) {
        timer = setTimeout(type, 24)
      } else {
        // finished typing: wait, then slide to the next group
        timer = setTimeout(() => setActive((a) => (a + 1) % skills.length), 2600)
      }
    }
    timer = setTimeout(type, 250)
    return () => clearTimeout(timer)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const lines = typed.split('\n')

  return (
    <div className="relative">
      {/* Glow behind the editor */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/30 via-info/20 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral font-mono text-sm text-neutral-content shadow-2xl">
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-neutral-content/60">tech_stack.py</span>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 text-xs" role="tablist">
          {skills.map((group, i) => (
            <button
              key={group.group}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 transition ${
                i === active
                  ? 'border-teal-300 bg-white/5 text-teal-300'
                  : 'border-transparent text-neutral-content/60 hover:bg-white/5 hover:text-neutral-content'
              }`}
            >
              {group.short}
            </button>
          ))}
        </div>

        {/* Code with line numbers */}
        <div
          className="min-h-64 overflow-x-auto py-5 leading-7"
          aria-label={`${skills[active].group}: ${skills[active].items.join(', ')}`}
        >
          {lines.map((line, n) => (
            <div key={n} className="flex">
              <span className="w-12 shrink-0 select-none pr-4 text-right text-neutral-content/30">{n + 1}</span>
              <pre className="whitespace-pre">
                <Highlighted text={line} />
                {n === lines.length - 1 && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-teal-300" />
                )}
              </pre>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-2 text-xs text-neutral-content/60">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-400" />
            Python
          </span>
          <span>
            {active + 1} / {skills.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const root = useRef(null)

  // GSAP: intro animation and parallax glows
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero]', { y: 36, opacity: 0, duration: 0.9, stagger: 0.1 })
        .from('[data-hero-editor]', { x: 70, opacity: 0, duration: 1 }, 0.25)

      const scrollTrigger = {
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
      gsap.to('[data-glow="a"]', { yPercent: -40, ease: 'none', scrollTrigger })
      gsap.to('[data-glow="b"]', { yPercent: 40, ease: 'none', scrollTrigger })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={root} className="relative overflow-hidden">
      {/* Background: dotted grid and soft glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-base-300)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div data-glow="a" aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-secondary/15 blur-3xl" />
      <div data-glow="b" aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-16 pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div>
          {/* Photo, name and designation */}
          <div data-hero className="mb-6 flex items-center gap-5">
            <div className="relative size-28 shrink-0 sm:size-32">
              <span aria-hidden="true" className="hero-ring absolute -inset-1.5 rounded-full opacity-90 blur-[2px]" />
              <img
                src="/talha-small.jpg"
                alt="Md Mushfiqur Talha Khondoker"
                width="320"
                height="320"
                className="relative size-full rounded-full object-cover ring-4 ring-base-200"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Hello, I'm</p>
              <p className="text-xl font-extrabold sm:text-2xl">Md Mushfiqur Talha Khondoker</p>
              <RoleSwitcher />
            </div>
          </div>

          <div data-hero className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Open to junior remote roles
          </div>

          <h1 data-hero className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            I build reliable <span className="hero-shine">APIs</span> and the interfaces on top of them.
          </h1>

          <p data-hero className="mb-5 mt-6 max-w-md text-base-content/70">
            Full stack web developer working with Python, FastAPI and React. Mathematics student in
            Jashore, Bangladesh, looking for junior remote backend and full-stack roles.
          </p>

          {/* Competitive programming strip */}
          <div data-hero className="mb-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-secondary" aria-hidden="true">
                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
                <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3M12 14v4M8 21h8" />
              </svg>
              Competitive programming
            </span>
            {platforms.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/70 px-3 py-1 text-xs font-semibold backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:shadow-md hover:shadow-secondary/20"
              >
                <span className={`size-2 rounded-full ${p.color}`} />
                {p.name}
              </span>
            ))}
          </div>

          {/* Resume: view in a new tab or download, one click each */}
          <div data-hero className="flex flex-wrap gap-3">
            {/* <a
              href="/Talha_Khondoker.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary gap-2 shadow-lg transition hover:-translate-y-0.5"
            >
              View Resume
            </a> */}
            <a
              href="/Talha_Khondoker.pdf"
              download="Talha_Khondoker_Resume.pdf"
              className="btn btn-secondary gap-2 shadow-lg transition hover:-translate-y-0.5"
            >
              Download Resume ↓
            </a>
            <Link
              to={{ pathname: '/', hash: '#projects' }}
              className="btn btn-outline transition hover:-translate-y-0.5"
            >
              See my projects
            </Link>
          </div>

          <div data-hero>
            <SocialLinks className="mt-8" />
          </div>
        </div>

        <div data-hero-editor>
          <SkillsEditor />
        </div>
      </div>
    </section>
  )
}
