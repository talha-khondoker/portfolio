import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../Data'
import ProjectImage from './ProjectImage'
import Reveal from './Reveal'

const back = { pathname: '/', hash: '#projects' }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const host = (url) => {
  try {
    return new URL(url).host
  } catch {
    return 'localhost'
  }
}

// Numbered cards (challenges) or ticked rows (improvements)
function Points({ items, kind }) {
  return (
    <ul className="grid gap-3">
      {items.map((item, i) => (
        <li
          key={item}
          className="group flex gap-4 rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info font-mono text-sm font-bold text-secondary-content shadow-md shadow-secondary/30 transition duration-300 group-hover:rotate-6">
            {kind === 'steps' ? (
              String(i + 1).padStart(2, '0')
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" {...stroke} strokeWidth="2.5" aria-hidden="true">
                <path d="m5 12 5 5 9-10" />
              </svg>
            )}
          </span>
          <span className="pt-1 text-base-content/80">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Heading({ children }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-2xl font-extrabold">
      <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-secondary to-info" />
      {children}
    </h2>
  )
}

export default function ProjectDetails() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl px-4 pb-20 pt-40 text-center">
        <h1 className="text-3xl font-extrabold">Project not found</h1>
        <Link to={back} className="btn btn-primary mt-6">
          Back to projects
        </Link>
      </section>
    )
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-24 top-24 size-96 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -left-24 top-[40rem] size-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="relative">
        {/* Links back */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            to={back}
            className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur transition duration-300 hover:-translate-x-1 hover:border-secondary"
          >
            ← Back to projects
          </Link>
          {projects.length > 6 && (
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium backdrop-blur transition duration-300 hover:border-secondary hover:text-secondary"
            >
              All projects
            </Link>
          )}
        </div>

        {/* Title */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/10 px-3 py-1 font-mono text-xs font-bold text-secondary">
            Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-xs font-semibold backdrop-blur">
            <span className={`size-2 rounded-full ${project.live ? 'bg-success' : 'bg-warning'}`} />
            {project.live ? 'Live' : 'Code only'}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
          <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">{project.title}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-base-content/70">{project.summary}</p>

        {/* Screenshot in a browser window */}
        <div className="relative mt-10">
          <span
            aria-hidden="true"
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-secondary/30 via-info/20 to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-base-300 bg-base-200/70 px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-300" />
                <span className="size-3 rounded-full bg-green-400" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-full bg-base-100 px-4 py-1 text-center text-xs text-base-content/60">
                {project.live ? host(project.live) : 'localhost:8000/docs'}
              </span>
            </div>
            <ProjectImage project={project} className="group aspect-video w-full" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="space-y-12">
            <Reveal>
              <Heading>About this project</Heading>
              <p className="text-base-content/80">{project.description}</p>
            </Reveal>

            <Reveal>
              <Heading>Challenges I faced</Heading>
              <Points items={project.challenges} kind="steps" />
            </Reveal>

            <Reveal>
              <Heading>Improvements and future plans</Heading>
              <Points items={project.improvements} kind="checks" />
            </Reveal>
          </div>

          {/* Sidebar */}
          <Reveal as="aside" delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative space-y-6 overflow-hidden rounded-2xl border border-base-300 bg-base-100/80 p-6 backdrop-blur">
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent"
              />

              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-base-content/60">
                  Main technology stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-base-300 bg-base-200/60 px-3 py-1 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/40"
                  >
                    Live project ↗
                  </a>
                ) : (
                  <span className="btn btn-disabled rounded-full">Live link coming soon</span>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline rounded-full transition duration-300 hover:-translate-y-0.5"
                  >
                    GitHub repository ↗
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Previous and next project */}
        {projects.length > 1 && (
          <Reveal className="mt-16 grid gap-4 border-t border-base-300 pt-10 sm:grid-cols-2">
            {[
              { p: prev, label: '← Previous project', align: 'text-left' },
              { p: next, label: 'Next project →', align: 'sm:text-right' },
            ].map(({ p, label, align }) => (
              <Link
                key={label}
                to={`/projects/${p.slug}`}
                className={`group rounded-2xl border border-base-300 bg-base-100/70 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 ${align}`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">{label}</p>
                <p className="mt-1 font-extrabold leading-snug">{p.title}</p>
              </Link>
            ))}
          </Reveal>
        )}
      </div>
    </motion.section>
  )
}
