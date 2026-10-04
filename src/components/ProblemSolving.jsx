import { codingProfiles } from '../Data'
import Reveal from './Reveal'

// Short monogram and brand colour for each platform
const brand = {
  Codeforces: { badge: 'CF', color: '#1f8acb' },
  CodeChef: { badge: 'CC', color: '#b5733c' },
  LeetCode: { badge: 'LC', color: '#ffa116' },
  GitHub: { badge: 'GH', color: '#8b5cf6' },
}

const tags = ['C++', 'Data structures', 'Algorithms', 'Contests']

export default function ProblemSolving() {
  return (
    <section id="problem-solving" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-10 size-72 rounded-full bg-info/10 blur-3xl" />
        <span className="absolute -right-24 bottom-10 size-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Reveal className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Logic and practice</p>
        <h2 className="mb-3 mt-2 text-3xl font-extrabold md:text-4xl">
          Problem{' '}
          <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">solving</span>
        </h2>
        <p className="mb-5 max-w-xl text-base-content/70">
          I practise data structures and algorithms in C++ on these platforms. Click a card to see my profile.
        </p>

        {/* Terminal-style line and tags */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-neutral px-3 py-1.5 font-mono text-xs text-neutral-content shadow-md">
            <span className="text-green-400">$</span> solve <span className="text-sky-300">--lang</span>{' '}
            <span className="text-amber-300">cpp</span>
            <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-teal-300" />
          </span>
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-xs font-medium text-base-content/80 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        {codingProfiles.map((profile, i) => {
          const b = brand[profile.platform] ?? { badge: profile.platform.slice(0, 2).toUpperCase(), color: '#14b8a6' }
          return (
            <Reveal key={profile.platform} delay={i * 0.1} className="h-full">
              <a
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                style={{ '--accent': b.color }}
                className="group relative block h-full rounded-2xl p-px transition duration-300 hover:-translate-y-2 focus-visible:-translate-y-2 focus-visible:outline-none"
              >
                {/* Gradient border that lights up on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-base-300 transition duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${b.color}, var(--color-secondary), var(--color-info))` }}
                />

                <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-base-100 p-6">
                  {/* Corner glow in the platform colour */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full opacity-20 blur-3xl transition duration-500 group-hover:opacity-50"
                    style={{ background: b.color }}
                  />

                  {/* Big faded monogram */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -right-2 select-none font-mono text-9xl font-extrabold text-base-content/5 transition duration-500 group-hover:-translate-y-2 group-hover:text-base-content/10"
                  >
                    {b.badge}
                  </span>

                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid size-11 place-items-center rounded-xl font-mono text-sm font-bold text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110"
                          style={{ background: b.color, boxShadow: `0 8px 20px -6px ${b.color}` }}
                        >
                          {b.badge}
                        </span>
                        <p className="text-lg font-bold">{profile.platform}</p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="grid size-9 place-items-center rounded-full border border-base-300 transition duration-300 group-hover:-rotate-45 group-hover:border-transparent group-hover:text-white"
                        style={{ '--hover-bg': b.color }}
                      >
                        <span className="grid size-full place-items-center rounded-full transition duration-300 group-hover:bg-[var(--hover-bg)]">
                          →
                        </span>
                      </span>
                    </div>

                    <p
                      className="bg-clip-text text-6xl font-extrabold leading-none tracking-tight text-transparent"
                      style={{ backgroundImage: `linear-gradient(90deg, ${b.color}, var(--color-secondary))` }}
                    >
                      {profile.value}
                    </p>
                    <p className="mt-3 min-h-10 text-sm text-base-content/70">{profile.text}</p>

                    <p className="mt-5 flex items-center gap-2 border-t border-base-300 pt-4 text-sm font-semibold text-secondary">
                      View my profile
                      <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1.5">
                        ↗
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
