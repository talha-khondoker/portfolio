import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { education } from '../Data'
import Reveal from './Reveal'
import { spotlight } from '../lib/spotlight'
import './Spot.css'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  rocket: (
    <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
      <path d="M22 9 12 4 2 9l10 5 10-5z" />
      <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
      <path d="M3 7h18v13H3z" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
}

const isCurrent = (text) => /present|ongoing|current/i.test(text)

// One step: lights up when it reaches the middle of the screen
function TimelineItem({ index, current, icon, children }) {
  const ref = useRef(null)
  const active = useInView(ref, { margin: '-42% 0px -42% 0px' })

  return (
    <Reveal as="li" delay={index * 0.1} className="relative">
      <div ref={ref}>
        {/* Dot */}
        <span className="absolute -left-12 top-4 grid size-8 place-items-center">
          {(current || active) && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-40" />
          )}
          <span
            className={`relative grid size-8 place-items-center rounded-full ring-4 ring-base-200 transition duration-500 ${
              current || active
                ? 'scale-110 bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/40'
                : 'border border-base-300 bg-base-100 text-secondary'
            }`}
          >
            {icon}
          </span>
        </span>

        {/* Short line from the dot to the card */}
        <span
          aria-hidden="true"
          className={`absolute -left-4 top-8 h-px transition-all duration-500 ${
            active ? 'w-4 bg-secondary' : 'w-2 bg-base-300'
          }`}
        />

        {children(current, active)}
      </div>
    </Reveal>
  )
}

// Timeline: a gradient line that fills as you scroll, with an icon dot for every card
function Timeline({ items, icon, getKey, children }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <ul ref={ref} className="relative space-y-6 pl-12">
      {/* Faint track and the line that fills it */}
      <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-2 w-0.5 rounded-full bg-base-300" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : fill, originY: 0 }}
        className="absolute bottom-0 left-[15px] top-2 w-0.5 rounded-full bg-gradient-to-b from-secondary via-info to-accent shadow-[0_0_10px] shadow-secondary/50"
      />
      {items.map((item, i) => (
        <TimelineItem key={getKey(item)} index={i} current={isCurrent(item.note ?? item.period)} icon={icon}>
          {(current, active) => children(item, current, active)}
        </TimelineItem>
      ))}
    </ul>
  )
}

const card =
  'spot group relative overflow-hidden rounded-2xl border bg-base-100/80 p-5 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10'

function Period({ children, current }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-gradient-to-r from-secondary to-info px-3 py-0.5 text-xs font-semibold text-secondary-content shadow-sm shadow-secondary/30">
        {children}
      </span>
      {current && (
        <span className="flex items-center gap-1.5 rounded-full border border-base-300 bg-base-200/60 px-2.5 py-0.5 text-xs font-semibold">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          Current
        </span>
      )}
    </div>
  )
}

// Big faded year in the corner of a card, taken from its date text
function Year({ text }) {
  const year = text.match(/\d{4}/)?.[0]
  if (!year) return null
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-1 -top-3 select-none font-mono text-6xl font-extrabold text-base-content/5 transition duration-500 group-hover:text-secondary/15"
    >
      {year}
    </span>
  )
}

// Learning journey: one step per education item, oldest first
function Journey() {
  const steps = [...education].reverse().map((item) => ({
    year: item.note.match(/\d{4}/)?.[0] ?? '',
    label: item.title.match(/\((\w+)\)/)?.[1] ?? item.title.split(' ')[0],
    current: isCurrent(item.note),
  }))

  return (
    <Reveal className="relative mb-14">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-base-content/60">Learning journey</p>
      <ol className="relative flex">
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ originX: 0, left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
          className="absolute top-3 h-0.5 rounded-full bg-gradient-to-r from-secondary via-info to-accent"
        />
        {steps.map((step) => (
          <li key={step.label} className="relative flex-1 text-center">
            <span className="relative mx-auto grid size-6 place-items-center">
              {step.current && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-40" />
              )}
              <span
                className={`relative size-6 rounded-full ring-4 ring-base-200 ${
                  step.current
                    ? 'bg-gradient-to-br from-secondary to-info shadow-lg shadow-secondary/40'
                    : 'border-2 border-secondary bg-base-100'
                }`}
              />
            </span>
            <p className="mt-2 font-mono text-sm font-extrabold">{step.year}</p>
            <p className="text-xs text-base-content/60">{step.label}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

function Glow() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-secondary/0 blur-3xl transition duration-500 group-hover:bg-secondary/20"
    />
  )
}

export default function Experience() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-32 size-72 rounded-full bg-info/10 blur-3xl" />
        <span className="absolute -right-24 bottom-16 size-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Reveal className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">My background</p>
        <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">
          Education &amp;{' '}
          <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">Next steps</span>
        </h2>
      </Reveal>

      <Journey />

      <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="mb-7 flex items-center gap-3 text-2xl font-extrabold">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30">
              {icons.education}
            </span>
            Education
          </h3>
          <Timeline items={education} icon={icons.education} getKey={(e) => e.title}>
            {(item, current, active) => (
              <div className={`${card} ${active ? 'border-secondary shadow-xl shadow-secondary/15' : 'border-base-300'}`} onPointerMove={spotlight}>
                <Glow />
                <Year text={item.note} />
                <Period current={current}>{item.note.replace(/,?\s*GPA\s*[\d.]+/i, '')}</Period>
                <p className="relative font-bold leading-snug">{item.title}</p>
                <p className="relative mt-1 text-sm text-base-content/70">{item.place}</p>
                {item.note.match(/GPA\s*([\d.]+)/i) && (
                  <p className="relative mt-3 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs font-semibold">
                    <span className="text-base-content/60">GPA</span>
                    <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-sm font-extrabold text-transparent">
                      {item.note.match(/GPA\s*([\d.]+)/i)[1]}
                    </span>
                  </p>
                )}
              </div>
            )}
          </Timeline>
        </div>

        {/* What is next */}
        <div>
          <h3 className="mb-7 flex items-center gap-3 text-2xl font-extrabold">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30">
              {icons.rocket}
            </span>
            What&apos;s next
          </h3>

          <Reveal className="rounded-3xl bg-gradient-to-br from-secondary via-info to-accent p-[2px] shadow-2xl shadow-secondary/20">
            <div
              onPointerMove={spotlight}
              className="spot group relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-base-100 p-6 sm:p-8"
            >
              <Glow />

              <span className="relative inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-xs font-semibold">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                Open to opportunities
              </span>

              <h4 className="relative mt-4 text-2xl font-extrabold sm:text-3xl">
                Ready to{' '}
                <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">explore</span>
              </h4>
              <p className="relative mt-3 text-base-content/80">
                I don&apos;t have professional experience yet, and I&apos;m excited to start. I&apos;m looking for a
                junior or internship role where I can learn from a team, work on real projects and grow as a
                developer.
              </p>

              <ul className="relative mt-5 space-y-3 text-sm text-base-content/80">
                {[
                  'Hands-on projects, including a full-stack app with JWT authentication and role-based access',
                  '323+ Codeforces problems solved, so data structures and algorithms feel familiar',
                  'A quick learner who adapts fast and takes responsibility for the work',
                ].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-secondary" {...stroke} strokeWidth="2.5" aria-hidden="true">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  to={{ pathname: '/', hash: '#contact' }}
                  className="btn btn-sm rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/40"
                >
                  Let&apos;s talk <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/resume"
                  className="btn btn-sm rounded-full border border-base-content/20 bg-transparent transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
                >
                  View resume
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
