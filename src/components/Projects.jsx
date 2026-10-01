import { projects } from '../Data'

function Tags({ tags }) {
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-base-300 px-3 py-0.5 text-sm text-base-content/70">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function Projects() {
  const [featured, ...others] = projects

  return (
    <section id="projects" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <h2 className="mb-8 text-3xl font-extrabold md:text-4xl">Projects</h2>

      {/* Featured project: red stripe on the left */}
      <article className="grid gap-8 rounded-md border border-l-8 border-base-300 border-l-accent bg-base-100 p-6 md:p-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="mb-3 text-2xl font-extrabold md:text-3xl">{featured.title}</h3>
          <p className="text-base-content/80">{featured.description}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-base-content/70">
            {featured.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col justify-center gap-2 border-t border-base-300 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <small className="text-base-content/60">Built with</small>
          <Tags tags={featured.tags} />
          {featured.demo && (
            <a href={featured.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
              Open live demo
            </a>
          )}
          <a href={featured.frontend} target="_blank" rel="noreferrer" className="btn btn-outline">
            Frontend code on GitHub
          </a>
          <a href={featured.backend} target="_blank" rel="noreferrer" className="btn btn-outline">
            Backend code on GitHub
          </a>
        </aside>
      </article>

      {/* Other projects: same style, teal stripe */}
      {others.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((project) => (
            <article
              key={project.title}
              className="rounded-md border border-l-8 border-base-300 border-l-secondary bg-base-100 p-6"
            >
              <h3 className="mb-2 text-xl font-extrabold">{project.title}</h3>
              <p className="text-base-content/70">{project.description}</p>
              <Tags tags={project.tags} />
              <div className="flex flex-wrap gap-2">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                    Live demo
                  </a>
                )}
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}