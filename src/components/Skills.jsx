import { useState } from 'react'
import { skillLevels } from '../Data'
import Reveal from './Reveal'
import SkillsOrbit from './SkillsOrbit'
import './Skills.css'

const dv = (name, slug = name) => ({
  name,
  src: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`,
})

/* Small inline glyphs for skills that have no logo */
const glyphs = {
  api: (
    <>
      <path d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  tree: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M11 7 7 16M13 7l4 9" />
    </>
  ),
  daisy: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4.5a2.5 2.5 0 1 1 0 5M12 14.5a2.5 2.5 0 1 1 0 5M4.5 12a2.5 2.5 0 1 1 5 0M14.5 12a2.5 2.5 0 1 1 5 0" />
    </>
  ),
  render: (
    <>
      <path d="M7 4v16M7 4h6a4 4 0 0 1 0 8H7M12 12l5 8" />
    </>
  ),
}
const glyph = (name, g) => ({ name, glyph: g })

// Which icon(s) to show for each item in Data.js. "and" items become two tiles.
const iconMap = {
  React: [dv('React', 'react')],
  JavaScript: [dv('JavaScript', 'javascript')],
  HTML: [dv('HTML', 'html5')],
  'Tailwind CSS and DaisyUI': [dv('Tailwind CSS', 'tailwindcss'), glyph('DaisyUI', 'daisy')],
  Python: [dv('Python', 'python')],
  FastAPI: [dv('FastAPI', 'fastapi')],
  'REST APIs': [glyph('REST APIs', 'api')],
  'JWT and role-based access': [glyph('JWT & role-based access', 'shield')],
  MySQL: [dv('MySQL', 'mysql')],
  SQLAlchemy: [dv('SQLAlchemy', 'sqlalchemy')],
  SQLite: [dv('SQLite', 'sqlite')],
  Supabase: [dv('Supabase', 'supabase')],
  'C++': [dv('C++', 'cplusplus')],
  C: [dv('C', 'c')],
  'Data structures and algorithms': [glyph('Data structures & algorithms', 'tree')],
  'Git and GitHub': [dv('Git', 'git'), dv('GitHub', 'github')],
  Docker: [dv('Docker', 'docker')],
  'Render and Netlify': [glyph('Render', 'render'), dv('Netlify', 'netlify')],
}

function Tile({ tile, index }) {
  const [failed, setFailed] = useState(false)
  const showGlyph = tile.glyph || failed

  return (
    <li
      tabIndex={0}
      aria-label={tile.name}
      className="group/tile relative outline-none"
      style={{ animationDelay: `${(index % 6) * 0.4}s` }}
    >
      <div className="skc-float grid place-items-center" style={{ animationDelay: `${(index % 6) * 0.45}s` }}>
        <span className="grid size-14 place-items-center rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5 transition duration-300 group-hover/tile:-translate-y-1.5 group-hover/tile:rotate-6 group-hover/tile:scale-110 group-hover/tile:shadow-xl group-hover/tile:shadow-secondary/40 group-focus-visible/tile:ring-2 group-focus-visible/tile:ring-secondary sm:size-16">
          {showGlyph ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-full text-secondary"
              aria-hidden="true"
            >
              {tile.glyph ? glyphs[tile.glyph] : glyphs.api}
            </svg>
          ) : (
            <img
              src={tile.src}
              alt=""
              loading="lazy"
              draggable="false"
              onError={() => setFailed(true)}
              className="size-full object-contain"
            />
          )}
        </span>
      </div>

      {/* Name tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-neutral px-3 py-1 text-xs font-semibold text-neutral-content opacity-0 shadow-lg transition duration-200 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100">
        {tile.name}
      </span>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">What I work with</p>
        <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">Skills &amp; Technologies</h2>
      </Reveal>

      <SkillsOrbit />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillLevels.map((group, i) => {
          const tiles = group.items.flatMap((item) => iconMap[item.name] || [{ name: item.name, glyph: 'api' }])
          return (
            <Reveal
              as="article"
              key={group.group}
              delay={(i % 3) * 0.1}
              className="skc-card group relative rounded-2xl border border-base-300 bg-base-100/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/10"
            >
              {/* Corner glow */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <span className="absolute -right-12 -top-12 size-40 rounded-full bg-secondary/15 blur-3xl transition duration-500 group-hover:bg-info/25" />
              </div>

              <div className="relative mb-8 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info font-mono text-sm font-extrabold text-secondary-content shadow-lg shadow-secondary/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-extrabold">{group.group}</h3>
              </div>

              <ul className="relative grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4">
                {tiles.map((tile, n) => (
                  <Tile key={tile.name} tile={tile} index={n} />
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
