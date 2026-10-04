import { motion, useReducedMotion } from 'framer-motion'
import { education, experience } from '../Data'
import Reveal from './Reveal'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
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

// Timeline: a gradient line that draws itself, with an icon dot for every card
function Timeline({ items, icon, getKey, children }) {
  const reduce = useReducedMotion()

  return (
    <ul className="relative space-y-6 pl-12">
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ originY: 0 }}
        className="absolute bottom-0 left-[15px] top-2 w-0.5 rounded-full bg-gradient-to-b from-secondary via-info to-transparent"
      />
      {items.map((item, i) => {
        const current = isCurrent(item.note ?? item.period)
        return (
          <Reveal as="li" key={getKey(item)} delay={i * 0.1} className="relative">
            {/* Dot */}
            <span className="absolute -left-12 top-4 grid size-8 place-items-center">
              {current && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-40" />
              )}
              <span
                className={`relative grid size-8 place-items-center rounded-full ring-4 ring-base-200 ${
                  current
                    ? 'bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/40'
                    : 'border border-base-300 bg-base-100 text-secondary'
                }`}
              >
                {icon}
              </span>
            </span>
            {children(item, current)}
          </Reveal>
        )
      })}
    </ul>
  )
}

const card =
  'group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/80 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10'

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
    <section id="experience" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-32 size-72 rounded-full bg-info/10 blur-3xl" />
        <span className="absolute -right-24 bottom-16 size-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Reveal className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">My background</p>
        <h2 className="mb-12 mt-2 text-3xl font-extrabold md:text-4xl">
          Education &amp;{' '}
          <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">Experience</span>
        </h2>
      </Reveal>

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
            {(item, current) => (
              <div className={card}>
                <Glow />
                <Period current={current}>{item.note}</Period>
                <p className="relative font-bold leading-snug">{item.title}</p>
                <p className="relative mt-1 text-sm text-base-content/70">{item.place}</p>
              </div>
            )}
          </Timeline>
        </div>

        {/* Experience */}
        <div>
          <h3 className="mb-7 flex items-center gap-3 text-2xl font-extrabold">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30">
              {icons.work}
            </span>
            Experience
          </h3>
          <Timeline items={experience} icon={icons.work} getKey={(e) => e.role}>
            {(item, current) => (
              <div className={card}>
                <Glow />
                <Period current={current}>{item.period}</Period>
                <p className="relative font-bold leading-snug">{item.role}</p>
                <p className="relative mt-1 text-sm text-base-content/70">{item.place}</p>
                <ul className="relative mt-4 space-y-2 text-sm text-base-content/80">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-secondary" {...stroke} strokeWidth="2.5" aria-hidden="true">
                        <path d="m5 12 5 5 9-10" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Timeline>
        </div>
      </div>
    </section>
  )
}
