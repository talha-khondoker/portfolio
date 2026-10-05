import { useState } from 'react'
import Reveal from './Reveal'
import './SkillsOrbit.css'

const dv = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`

// Inner ring first. `icon: null` shows a text fallback (no logo available).
const rings = [
  {
    name: 'Core stack',
    color: 'var(--color-secondary)',
    size: 38,
    duration: 20,
    reverse: false,
    skills: [
      { name: 'Python', icon: dv('python') },
      { name: 'JavaScript', icon: dv('javascript') },
      { name: 'React', icon: dv('react') },
      { name: 'FastAPI', icon: dv('fastapi') },
    ],
  },
  {
    name: 'Frontend & data',
    color: 'var(--color-info)',
    size: 66,
    duration: 32,
    reverse: true,
    skills: [
      { name: 'HTML', icon: dv('html5') },
      { name: 'Tailwind CSS', icon: dv('tailwindcss') },
      { name: 'Bootstrap', icon: dv('bootstrap') },
      { name: 'MySQL', icon: dv('mysql') },
      { name: 'SQLite', icon: dv('sqlite') },
      { name: 'SQLAlchemy', icon: dv('sqlalchemy') },
    ],
  },
  {
    name: 'Languages & tools',
    color: 'var(--color-accent)',
    size: 94,
    duration: 46,
    reverse: false,
    skills: [
      { name: 'C', icon: dv('c') },
      { name: 'C++', icon: dv('cplusplus') },
      { name: 'Supabase', icon: dv('supabase') },
      { name: 'Docker', icon: dv('docker') },
      { name: 'Git', icon: dv('git') },
      { name: 'GitHub', icon: dv('github') },
      { name: 'Netlify', icon: dv('netlify') },
      { name: 'Render', icon: null, label: 'R' },
    ],
  },
]

// Tiny twinkling stars: [left %, top %, delay s, size]
const stars = [
  [8, 14, 0, 1], [20, 82, 1.2, 2], [88, 20, 0.6, 2], [93, 70, 1.8, 1],
  [50, 3, 0.9, 1], [46, 97, 2.1, 2], [3, 52, 1.5, 1], [76, 92, 0.3, 1],
  [30, 6, 2.4, 2], [66, 8, 1.1, 1],
]

const point = (angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return { left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }
}

function SkillChip({ skill, ring, onActive }) {
  const [failed, setFailed] = useState(false)
  const showText = !skill.icon || failed

  return (
    <span
      title={skill.name}
      onMouseEnter={() => onActive({ name: skill.name, ring })}
      onMouseLeave={() => onActive(null)}
      onTouchStart={() => onActive({ name: skill.name, ring })}
      className="sk-chip group block cursor-pointer rounded-full p-[2px] sk-edge transition-shadow duration-300"
    >
      <span className="grid size-9 place-items-center rounded-full bg-white/95 p-1.5 backdrop-blur sm:size-12 sm:p-2 md:size-14">
        {showText ? (
          <span className="text-xs font-extrabold text-primary sm:text-sm">
            {skill.label || skill.name.slice(0, 2)}
          </span>
        ) : (
          <img
            src={skill.icon}
            alt={skill.name}
            loading="lazy"
            draggable="false"
            onError={() => setFailed(true)}
            className="size-full object-contain transition duration-300 group-hover:scale-125"
          />
        )}
      </span>
    </span>
  )
}

export default function SkillsOrbit() {
  const [active, setActive] = useState(null)
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <Reveal className="mb-16">
      <div
        className="relative mx-auto aspect-square w-full max-w-[34rem]"
        role="img"
        aria-label="Skills orbiting around me: Python, JavaScript, React, FastAPI, HTML, Tailwind CSS, Bootstrap, MySQL, SQLite, SQLAlchemy, C, C++, Supabase, Docker, Git, GitHub, Netlify and Render"
      >
        {/* Colour wash, stars and shooting stars */}
        <div aria-hidden="true" className="sk-aura pointer-events-none absolute -inset-8 rounded-full blur-2xl" />
        {stars.map(([left, top, delay, size], i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute animate-pulse rounded-full bg-secondary"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size + 2,
              height: size + 2,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        <span aria-hidden="true" className="sk-shoot" style={{ left: '4%', top: '6%', animationDelay: '1s' }} />
        <span aria-hidden="true" className="sk-shoot" style={{ left: '40%', top: '0%', animationDelay: '4.5s' }} />

        {/* Sun: your photo inside a spinning halo */}
        <div className="absolute left-1/2 top-1/2 z-10 size-[19%] -translate-x-1/2 -translate-y-1/2">
          <span aria-hidden="true" className="sk-halo absolute -inset-1.5 rounded-full opacity-90 blur-md" />
          <span aria-hidden="true" className="sk-halo absolute -inset-[3px] rounded-full" />
          <span aria-hidden="true" className="absolute -inset-4 animate-ping rounded-full bg-secondary/15" />
          <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-neutral font-mono text-base font-extrabold text-secondary ring-2 ring-base-100 sm:text-xl md:text-2xl">
            {photoFailed ? (
              '</>'
            ) : (
              <img
                src="/talha-small.jpg"
                alt=""
                width="160"
                height="160"
                draggable="false"
                onError={() => setPhotoFailed(true)}
                className="size-full object-cover"
              />
            )}
          </span>
        </div>

        {/* Orbits */}
        {rings.map((ring) => {
          const step = 360 / ring.skills.length
          return (
            <div
              key={ring.size}
              aria-hidden="true"
              className="sk-ring absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${ring.size}%`,
                '--ring': ring.color,
                '--sk-duration': `${ring.duration}s`,
                '--sk-dir': ring.reverse ? 'reverse' : 'normal',
                '--sk-dir-inv': ring.reverse ? 'normal' : 'reverse',
              }}
            >
              {/* Glowing satellite riding the orbit line, between two icons */}
              <span
                className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  ...point(step / 2 - 90),
                  background: ring.color,
                  boxShadow: `0 0 14px 4px color-mix(in oklab, ${ring.color} 70%, transparent)`,
                }}
              />

              {ring.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={point(step * i - 90)}
                >
                  <SkillChip skill={skill} ring={ring} onActive={setActive} />
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Name of the icon you are pointing at */}
      <p className="sk-caption mt-8 text-center" aria-live="polite">
        <span className="inline-flex min-w-48 items-center justify-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-5 py-2 text-sm font-semibold shadow-lg backdrop-blur">
          {active ? (
            <>
              <span
                className="size-2.5 rounded-full"
                style={{ background: active.ring.color, boxShadow: `0 0 10px ${active.ring.color}` }}
              />
              <span>{active.name}</span>
              <span className="text-base-content/50">· {active.ring.name}</span>
            </>
          ) : (
            <span className="text-base-content/60">Point at an icon</span>
          )}
        </span>
      </p>

      {/* Legend */}
      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {rings.map((ring) => (
          <li
            key={ring.name}
            className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100/60 px-3.5 py-1.5 text-xs font-semibold backdrop-blur"
          >
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ background: ring.color, boxShadow: `0 0 8px ${ring.color}` }}
            />
            {ring.name}
            <span className="text-base-content/50">{ring.skills.length}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
