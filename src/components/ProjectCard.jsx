import { Link } from 'react-router-dom'
import ProjectImage from './ProjectImage'
import Reveal from './Reveal'

const icon = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// One project card, used on the home page and on the all-projects page
export default function ProjectCard({ project, index = 0, delay = 0 }) {
  const shown = project.stack.slice(0, 4)
  const extra = project.stack.length - shown.length
  const to = `/projects/${project.slug}`

  return (
    <Reveal
      as="article"
      delay={delay}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100/80 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/15"
    >
      {/* Image */}
      <Link to={to} aria-label={`${project.title}, view details`} className="relative block overflow-hidden">
        <ProjectImage project={project} className="aspect-video w-full" />

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-neutral/80 via-neutral/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
        />

        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 font-mono text-xs font-bold text-white backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
          <span className={`size-1.5 rounded-full ${project.live ? 'bg-green-400' : 'bg-amber-300'}`} />
          {project.live ? 'Live' : 'Code only'}
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-xs font-bold text-neutral opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View details →
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold leading-snug transition-colors duration-300 group-hover:text-secondary">
          <Link to={to}>{project.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-base-content/70">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {shown.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-base-300 bg-base-200/60 px-3 py-0.5 text-xs text-base-content/80"
            >
              {tag}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full bg-secondary/10 px-3 py-0.5 text-xs font-semibold text-secondary">
              +{extra}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            to={to}
            className="btn btn-sm flex-1 gap-2 rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:shadow-lg hover:shadow-secondary/40"
          >
            View Details <span aria-hidden="true">→</span>
          </Link>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}, live site`}
              title="Live site"
              className="grid size-8 place-items-center rounded-full border border-base-300 transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
            >
              <svg viewBox="0 0 24 24" className="size-4" {...icon} aria-hidden="true">
                <path d="M14 4h6v6M20 4l-9 9M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
              </svg>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}, source code`}
              title="Source code"
              className="grid size-8 place-items-center rounded-full border border-base-300 transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}
