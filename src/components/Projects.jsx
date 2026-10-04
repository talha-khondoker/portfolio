import { Link } from 'react-router-dom'
import { projects } from '../Data'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

// How many projects the home page shows. The rest live on /projects.
const LIMIT = 6

export default function Projects() {
  const visible = projects.slice(0, LIMIT)
  const hidden = projects.length - visible.length

  return (
    <section id="projects" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-24 top-24 size-80 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -left-24 bottom-24 size-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <Reveal className="relative mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">My work</p>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">projects</span>
          </h2>
        </div>
        <span className="rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-semibold backdrop-blur">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </Reveal>

      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} delay={(i % 3) * 0.1} />
        ))}
      </div>

      {hidden > 0 && (
        <Reveal className="relative mt-12 text-center">
          <p className="mb-4 text-sm text-base-content/70">
            Showing {visible.length} of {projects.length} projects
          </p>
          <Link
            to="/projects"
            className="btn gap-2 rounded-full border-0 bg-gradient-to-r from-secondary to-info px-8 text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
          >
            View all {projects.length} projects <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      )}
    </section>
  )
}
