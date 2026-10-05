import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { codingProfiles, skills } from '../Data'
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
  { text: 'Math Tutor', icon: ['M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z', 'M4 19a2 2 0 0 0 2 2h14'] },
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

// Brand colour for each coding platform tile
const statColors = {
  Codeforces: '#38bdf8',
  CodeChef: '#b5733c',
  LeetCode: '#ffa116',
}

const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`

// Small floating tech chip around the editor
function FloatChip({ icon, label, className, delay = '0s' }) {
  return (
    <span
      aria-hidden="true"
      className={`hero-float absolute flex items-center gap-2 rounded-full border border-white/20 bg-base-100/80 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur-xl ${className}`}
      style={{ animationDelay: delay }}
    >
      <img
        src={icon}
        alt=""
        loading="lazy"
        draggable="false"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className="size-5"
      />
      {label}
    </span>
  )
}

// Numbers that count up once, for example "323+" or "60+"
function CountUp({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const reduce = useReducedMotion()
  const target = match ? Number(match[1]) : 0
  const [n, setN] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!match || reduce) return
    let raf
    const start = performance.now() + 900
    const tick = (t) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1400))
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return value
  return (
    <>
      {n}
      {match[2]}
    </>
  )
}

// Button that leans a little toward the mouse (mouse only)
function Magnetic({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 16 })
  const sy = useSpring(y, { stiffness: 200, damping: 16 })

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

// One word of the headline: fades in, un-blurs and rises
function Word({ i, reduce, children, className = '' }) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 22, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}

const headStart = ['I', 'build', 'reliable']
const headEnd = ['and', 'the', 'interfaces', 'on', 'top', 'of', 'them.']

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

  // Gentle 3D tilt that follows the mouse (mouse only, not on touch)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const tiltX = useSpring(rx, { stiffness: 140, damping: 18 })
  const tiltY = useSpring(ry, { stiffness: 140, damping: 18 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
      className="relative mb-8"
    >
      {/* Orbit rings behind the editor, like the skills solar system */}
      <span
        aria-hidden="true"
        className="hero-orbit pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-secondary/25 lg:block"
      >
        <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_14px_4px] shadow-secondary/60" />
      </span>
      <span
        aria-hidden="true"
        className="hero-orbit-rev pointer-events-none absolute left-1/2 top-1/2 hidden aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/15 lg:block"
      >
        <span className="absolute bottom-[14%] right-[6%] size-2 rounded-full bg-info shadow-[0_0_12px_3px] shadow-info/60" />
      </span>

      {/* Glow behind the editor */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/30 via-info/20 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl p-px shadow-2xl">
        {/* Slow spinning gradient edge */}
        <span aria-hidden="true" className="hero-ring absolute -inset-[100%] opacity-70" style={{ animationDuration: '10s' }} />
      <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-neutral font-mono text-sm text-neutral-content">
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

      {/* Floating tech chips */}
      <FloatChip icon={devicon('fastapi')} label="FastAPI" className="-left-3 -top-5 sm:-left-8" />
      <FloatChip icon={devicon('react')} label="React" className="-right-2 top-1/3 sm:-right-7" delay="1.2s" />
      <FloatChip icon={devicon('python')} label="Python" className="-right-1 -top-5 sm:right-10" delay="2.1s" />

      {/* API response card */}
      <div
        aria-hidden="true"
        className="hero-float absolute -bottom-7 -left-2 rounded-xl border border-white/20 bg-base-100/85 px-4 py-3 font-mono text-xs shadow-2xl backdrop-blur-xl sm:-left-8"
        style={{ animationDelay: '0.6s' }}
      >
        <p>
          <span className="font-bold text-secondary">GET</span> /api/talha{' '}
          <span className="ml-1 rounded bg-success/20 px-1.5 py-0.5 font-bold text-success">200 OK</span>
        </p>
        <p className="mt-1 text-base-content/70">{'{ "status": "open_to_work" }'}</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const root = useRef(null)
  const reduce = useReducedMotion()

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
    <section
      id="home"
      ref={root}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !root.current) return
        const r = root.current.getBoundingClientRect()
        root.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
        root.current.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      className="relative overflow-hidden"
    >
      {/* Soft light that follows the mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            'radial-gradient(520px circle at var(--mx, 30%) var(--my, 30%), color-mix(in oklab, var(--color-secondary) 14%, transparent), transparent 60%)',
        }}
      />
      {/* Drifting aurora and stars */}
      <span aria-hidden="true" className="hero-aurora pointer-events-none absolute left-1/3 top-1/4 size-96 rounded-full bg-accent/10 blur-3xl" />
      {[[6, 22, 0], [14, 78, 1.3], [90, 14, 0.7], [95, 58, 1.9], [52, 6, 1.1], [60, 92, 2.3]].map(([l, t, d], n) => (
        <span
          key={n}
          aria-hidden="true"
          className="pointer-events-none absolute size-1.5 animate-pulse rounded-full bg-secondary"
          style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${d}s` }}
        />
      ))}
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

          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {headStart.map((w, i) => (
              <span key={w}>
                <Word i={i} reduce={reduce}>
                  {w}
                </Word>{' '}
              </span>
            ))}
            <Word i={headStart.length} reduce={reduce} className="relative">
              <span className="hero-shine">APIs</span>
              <svg aria-hidden="true" viewBox="0 0 120 12" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-3 w-full">
                <defs>
                  <linearGradient id="hero-uline" x1="0" x2="1">
                    <stop offset="0%" stopColor="var(--color-secondary)" />
                    <stop offset="100%" stopColor="var(--color-info)" />
                  </linearGradient>
                </defs>
                <path className="hero-underline" d="M2 8 C 20 2, 40 12, 60 6 S 100 2, 118 8" fill="none" stroke="url(#hero-uline)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </Word>{' '}
            {headEnd.map((w, i) => (
              <span key={`${w}-${i}`}>
                <Word i={headStart.length + 1 + i} reduce={reduce}>
                  {w}
                </Word>{' '}
              </span>
            ))}
          </h1>

          <p data-hero className="mb-5 mt-6 max-w-md text-base-content/70">
            Full stack web developer working with Python, FastAPI and React. Mathematics student in
            Jashore, Bangladesh, looking for junior remote backend and full-stack roles.
          </p>

          {/* Competitive programming stats */}
          <div data-hero className="mb-7 max-w-md">
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-secondary" aria-hidden="true">
                <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
                <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3M12 14v4M8 21h8" />
              </svg>
              Competitive programming
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {codingProfiles.map((p) => {
                const color = statColors[p.platform] ?? 'var(--color-secondary)'
                return (
                  <div
                    key={p.platform}
                    className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/70 p-3 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-lg hover:shadow-secondary/15"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-6 -top-6 size-16 rounded-full opacity-20 blur-2xl transition duration-300 group-hover:opacity-60"
                      style={{ background: color }}
                    />
                    <p
                      className="relative bg-clip-text text-2xl font-extrabold leading-none tabular-nums text-transparent"
                      style={{ backgroundImage: `linear-gradient(90deg, ${color}, var(--color-secondary))` }}
                    >
                      <CountUp value={p.value} />
                    </p>
                    <p className="relative mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-base-content/70">
                      <span className="size-1.5 shrink-0 rounded-full" style={{ background: color }} />
                      <span className="truncate">{p.platform}</span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Resume: view in a new tab or download, one click each */}
          <div data-hero className="flex flex-wrap gap-3">
            <Magnetic>
            <Link
              to="/resume"
              className="hero-shimmer btn gap-2 rounded-full border-0 bg-gradient-to-r from-secondary to-info px-6 text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
            >
              View Resume
            </Link>
            </Magnetic>
            <Magnetic>
            <a
              href="/Talha_Khondoker.pdf"
              download="Talha_Khondoker_Resume.pdf"
              className="btn gap-2 rounded-full border border-base-content/20 bg-base-100/60 px-6 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
            >
              Download Resume ↓
            </a>
            </Magnetic>
            <Link
              to={{ pathname: '/', hash: '#projects' }}
              className="group btn btn-ghost gap-2 rounded-full px-5 transition duration-300 hover:-translate-y-0.5"
            >
              See my projects
              <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">→</span>
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

      {/* Scroll cue (big screens only) */}
      <Link
        to={{ pathname: '/', hash: '#about' }}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-base-content/50 transition hover:text-secondary [@media(min-width:1024px)_and_(min-height:800px)]:flex"
      >
        Scroll
        <span className="relative block h-9 w-5 rounded-full border-2 border-current">
          <span className="hero-scroll absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-secondary" />
        </span>
      </Link>
    </section>
  )
}
