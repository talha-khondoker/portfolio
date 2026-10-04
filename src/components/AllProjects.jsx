import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../Data'
import ProjectCard from './ProjectCard'

// Most used technologies, for the filter chips
const topTags = Object.entries(
  projects.flatMap((p) => p.stack).reduce((all, tag) => ({ ...all, [tag]: (all[tag] || 0) + 1 }), {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(([tag]) => tag)

export default function AllProjects() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const inTag = tag === 'All' || p.stack.includes(tag)
      const inText =
        !q || [p.title, p.summary, ...p.stack].some((text) => text.toLowerCase().includes(q))
      return inTag && inText
    })
  }, [query, tag])

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-24 top-20 size-80 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -left-24 top-96 size-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="relative">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur transition duration-300 hover:-translate-x-1 hover:border-secondary"
        >
          ← Back to home
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">The full collection</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
          All{' '}
          <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">projects</span>
        </h1>
        <p className="mt-3 max-w-xl text-base-content/70">
          Everything I have built so far. Search by name or filter by technology.
        </p>

        {/* Search and filters */}
        <div className="mt-8 space-y-4">
          <label className="relative block max-w-md">
            <span className="sr-only">Search projects</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-base-content/50"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or technologies"
              className="w-full rounded-full border border-base-300 bg-base-100/80 py-2.5 pl-11 pr-4 text-sm outline-none backdrop-blur transition focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            />
          </label>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
            {['All', ...topTags].map((t) => {
              const active = tag === t
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition duration-300 ${
                    active
                      ? 'border-transparent bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30'
                      : 'border-base-300 bg-base-100/80 text-base-content/80 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        <p className="mb-6 mt-8 text-sm text-base-content/60" aria-live="polite">
          {results.length} of {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={projects.indexOf(project)} delay={(i % 3) * 0.08} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100/60 p-12 text-center">
            <p className="text-lg font-bold">No projects match</p>
            <p className="mt-1 text-sm text-base-content/70">Try another word or clear the filter.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setTag('All')
              }}
              className="btn btn-sm mt-4 rounded-full"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </motion.section>
  )
}
