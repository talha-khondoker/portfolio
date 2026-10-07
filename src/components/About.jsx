import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import { spotlight } from '../lib/spotlight'
import { codingProfiles, education, projects, socials } from '../Data'
import { socialIcons } from './SocialLinks'
import './About.css'
import './Spot.css'

const interests = [
  'Competitive programming contests',
  'Studying mathematics and logic',
  'Learning new tools and deployment',
  // Add your own hobbies here, for example sports, reading, travel or painting
]

const traits = ['Curious', 'Logical', 'Patient', 'Detail-oriented']

const icon = (...paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)

const icons = {
  journey: icon('M4 20 10 8l4 6 6-10', 'M4 20h16'),
  work: icon('M16 18l6-6-6-6', 'M8 6l-6 6 6 6'),
  beyond: icon('M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z', 'M4 19a2 2 0 0 0 2 2h14'),
  me: icon('M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z'),
  pin: icon('M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z', 'M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'),
  cap: icon('M22 9 12 4 2 9l10 5 10-5z', 'M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5'),
  globe: icon('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M3 12h18', 'M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z'),
  book: icon('M12 6v14', 'M12 6C10 4.5 7 4 3 4v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2z'),
  trophy: icon('M7 4h10v5a5 5 0 0 1-10 0z', 'M17 5h3v2a3 3 0 0 1-3 3', 'M7 5H4v2a3 3 0 0 0 3 3', 'M12 14v4', 'M8 21h8'),
}

const doing = [
  { title: 'Backend APIs', text: 'FastAPI, REST, JWT and role-based access', icon: icon('M3 4h18v6H3z', 'M3 14h18v6H3z', 'M7 7h.01', 'M7 17h.01') },
  { title: 'Interfaces', text: 'React and Tailwind, responsive and clear', icon: icon('M3 5h18v14H3z', 'M3 9h18', 'M7 7h.01') },
  { title: 'Problem solving', text: 'C++, data structures and contests', icon: icons.trophy },
  { title: 'Always learning', text: 'New tools, deployment and better ways to build', icon: icons.book },
]

const story = [
  {
    title: 'My programming journey',
    icon: icons.journey,
    text: "My journey started with problem solving. I studied science through school and college, and I learned C and C++ to practise data structures and algorithms on Codeforces, CodeChef and LeetCode. Contests taught me to break a hard problem into small steps and to check my logic before writing code. Then I wanted to build things people could actually use, so I moved into web development: Python and FastAPI for the backend, React and Tailwind for the interface. My Blood Donation platform is my main project so far, and I'm building more.",
  },
  {
    title: 'The work I enjoy',
    icon: icons.work,
    text: "I enjoy backend work: designing clean REST APIs, modelling data, and protecting endpoints with JWT and role-based access. I also like turning an API into a simple, responsive interface that is easy to use. I'm happiest on problems where logic matters, such as permissions, validation and the flow of data.",
  },
  {
    title: 'Beyond code',
    icon: icons.beyond,
    text: "Outside programming I study mathematics at M M College Jashore, which sharpens the logic I use in code, and I am a member of the Math Club. I like explaining ideas simply and learning something new every day.",
    chips: interests,
  },
  {
    title: 'A little about me',
    icon: icons.me,
    text: "I'm calm under pressure, I ask questions until I understand something properly, and I like to leave code cleaner than I found it.",
    chips: traits,
  },
]

const facts = [
  { label: 'Based in', value: 'Jashore, Bangladesh', icon: icons.pin },
  { label: 'Studying', value: 'BSc Mathematics, 3rd year', icon: icons.cap },
  { label: 'Languages', value: 'Bengali (native), English (fluent)', icon: icons.globe },
  { label: 'Open to', value: 'Junior roles and internships', icon: icons.work },
]

// Profile buttons. X falls back to a placeholder if it is not in Data.js yet.
const connectLabels = [
  { label: 'LinkedIn', text: 'LinkedIn profile', hover: 'hover:border-[#0A66C2] hover:bg-[#0A66C2]' },
  { label: 'Facebook', text: 'Facebook', hover: 'hover:border-[#1877F2] hover:bg-[#1877F2]' },
  { label: 'X', text: 'X (Twitter)', hover: 'hover:border-neutral hover:bg-neutral' },
  { label: 'GitHub', text: 'GitHub', hover: 'hover:border-neutral hover:bg-neutral' },
]

const connect = connectLabels
  .map((c) => {
    const found = socials.find((s) => s.label === c.label)
    const href = found?.href || (c.label === 'X' ? 'https://x.com/khondoker_talha' : null)
    return href ? { ...c, href } : null
  })
  .filter(Boolean)

// Numbers that count up once when they scroll into view, for example "323+" or "3rd"
function CountUp({ value, start }) {
  const match = String(value).match(/^(\d+)(.*)$/)
  const reduce = useReducedMotion()
  const target = match ? Number(match[1]) : 0
  const [n, setN] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!match || reduce || !start) return
    let raf
    const begin = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - begin) / 1400)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return value
  return (
    <>
      {n}
      {match[2]}
    </>
  )
}

const platformValue = (name) => codingProfiles.find((p) => p.platform === name)?.value
const studyYear = education[0]?.note.match(/(\d+(?:st|nd|rd|th)) year/i)?.[1]

const stats = [
  { value: platformValue('Codeforces'), label: 'Problems solved on Codeforces' },
  { value: platformValue('LeetCode'), label: 'Problems solved on LeetCode' },
  { value: String(projects.length), label: 'Projects built' },
  { value: studyYear, label: 'Year of BSc Mathematics' },
].filter((s) => s.value)

const tabNames = ['Journey', 'The work', 'Beyond code', 'About me']

function Chip({ children }) {
  return (
    <span className="rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-sm text-base-content/80 transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary hover:shadow-md hover:shadow-secondary/20">
      {children}
    </span>
  )
}

export default function About() {
  const [tab, setTab] = useState(0)
  const reduce = useReducedMotion()
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })
  // Gentle 3D tilt for the photo that follows the mouse (mouse only)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const tiltX = useSpring(rx, { stiffness: 140, damping: 18 })
  const tiltY = useSpring(ry, { stiffness: 140, damping: 18 })

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <section id="about" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-20 top-40 size-72 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -right-20 bottom-20 size-72 rounded-full bg-info/10 blur-3xl" />
      </div>

      <Reveal className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Get to know me</p>
        <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">
          About <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">me</span>
        </h2>
      </Reveal>

      {/* Pull quote */}
      <Reveal className="relative mb-10">
        <blockquote className="relative max-w-3xl border-l-4 border-transparent pl-6 [border-image:linear-gradient(to_bottom,var(--color-secondary),var(--color-info))_1]">
          <span aria-hidden="true" className="absolute -left-1 -top-6 select-none font-serif text-7xl leading-none text-secondary/25">
            &ldquo;
          </span>
          <p className="text-xl font-bold leading-snug sm:text-2xl md:text-3xl">
            I&apos;m happiest on problems where{' '}
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">logic matters</span>
            , like permissions, validation and the flow of data.
          </p>
        </blockquote>
      </Reveal>

      {/* Numbers */}
      <ul ref={statsRef} className="relative mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={i * 0.07}>
            <div
              onPointerMove={spotlight}
              className="spot group relative h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100/70 p-5 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10"
            >
              <p className="bg-gradient-to-r from-secondary to-info bg-clip-text text-4xl font-extrabold tabular-nums text-transparent sm:text-5xl">
                <CountUp value={stat.value} start={statsInView} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-base-content/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* What I do */}
      <ul className="relative mb-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {doing.map((d, i) => (
          <Reveal as="li" key={d.title} delay={i * 0.07}>
            <div
              onPointerMove={spotlight}
              className="spot group relative h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10"
            >
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-secondary/10 text-secondary transition duration-300 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:from-secondary group-hover:to-info group-hover:text-secondary-content">
                {d.icon}
              </span>
              <p className="font-extrabold">{d.title}</p>
              <p className="mt-1 text-sm text-base-content/70">{d.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Story: tabs */}
        <Reveal className="min-w-0">
          <div
            role="tablist"
            aria-label="About me"
            className="mb-4 flex gap-1 overflow-x-auto rounded-2xl border border-base-300 bg-base-100/70 p-1.5 backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {story.map((item, i) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`about-tab-${i}`}
                aria-selected={tab === i}
                aria-controls="about-panel"
                onClick={() => setTab(i)}
                className="relative shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-300"
              >
                {tab === i && (
                  <motion.span
                    layoutId="about-tab"
                    transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary to-info shadow-md shadow-secondary/30"
                  />
                )}
                <span
                  className={`relative flex items-center gap-2 [&_svg]:size-4 ${
                    tab === i ? 'text-secondary-content' : 'text-base-content/70 hover:text-base-content'
                  }`}
                >
                  {item.icon}
                  {tabNames[i]}
                </span>
              </button>
            ))}
          </div>

          <div
            id="about-panel"
            role="tabpanel"
            aria-labelledby={`about-tab-${tab}`}
            onPointerMove={spotlight}
            className="spot group relative min-h-[22rem] overflow-hidden rounded-2xl border border-base-300 bg-base-100/70 p-6 backdrop-blur sm:p-8"
          >
            {/* Big faded number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-8xl font-extrabold text-base-content/5"
            >
              {String(tab + 1).padStart(2, '0')}
            </span>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -28 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="relative"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30">
                    {story[tab].icon}
                  </span>
                  <h3 className="text-2xl font-extrabold">{story[tab].title}</h3>
                </div>

                <p className="text-base-content/80">{story[tab].text}</p>

                {story[tab].chips && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {story[tab].chips.map((chip) => (
                      <Chip key={chip}>{chip}</Chip>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Previous, dots, next */}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setTab((t) => (t - 1 + story.length) % story.length)}
              className="rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium backdrop-blur transition duration-300 hover:-translate-x-0.5 hover:border-secondary hover:text-secondary"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {story.map((item, i) => (
                <span
                  key={item.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === tab ? 'w-7 bg-secondary' : 'w-1.5 bg-base-content/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTab((t) => (t + 1) % story.length)}
              className="rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium backdrop-blur transition duration-300 hover:translate-x-0.5 hover:border-secondary hover:text-secondary"
            >
              Next →
            </button>
          </div>
        </Reveal>

        {/* Photo, facts and profile buttons */}
        <Reveal as="aside" delay={0.1} className="mx-auto w-full max-w-sm space-y-5 lg:sticky lg:top-28 lg:max-w-none">
          <motion.div
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-secondary/40 via-info/25 to-transparent blur-2xl"
            />
            {/* Photo with a spinning gradient border */}
            <div className="relative overflow-hidden rounded-3xl p-[3px] shadow-2xl">
              <span aria-hidden="true" className="ab-spin absolute -inset-[60%]" />
              <img
                src="/talha-car.jpg"
                alt="Md Mushfiqur Talha Khondoker"
                width="800"
                height="800"
                loading="lazy"
                className="relative aspect-square w-full rounded-[calc(1.5rem-3px)] object-cover"
              />
            </div>

            {/* Floating badges */}
            <span className="ab-float absolute -left-2 top-6 flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur sm:-left-4">
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-secondary-content [&_svg]:size-3.5">
                {icons.trophy}
              </span>
              Competitive programmer
            </span>
            <span
              className="ab-float absolute -right-2 bottom-8 flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur sm:-right-4"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-secondary-content [&_svg]:size-3.5">
                {icons.book}
              </span>
              Open to explore
            </span>
          </motion.div>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="group flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary transition duration-300 group-hover:bg-secondary group-hover:text-secondary-content">
                  {fact.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-base-content/60">{fact.label}</p>
                  <p className="mt-0.5 text-sm font-semibold">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connect with me */}
          <div className="rounded-2xl bg-gradient-to-br from-secondary via-info to-accent p-[2px]">
            <div className="rounded-[calc(1rem-2px)] bg-base-100 p-5">
              <h3 className="text-lg font-extrabold">Let&apos;s connect</h3>
              <p className="mb-4 mt-1 text-sm text-base-content/70">Find me on these platforms.</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {connect.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group flex items-center gap-3 rounded-xl border border-base-300 bg-base-200/50 px-3 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-lg ${c.hover}`}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-base-100 text-base-content transition group-hover:bg-white/20 group-hover:text-white">
                        {socialIcons[c.label]}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{c.text}</span>
                      <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
