import { skills } from '../Data'

const icons = ['</>', '{ }', '⚙', '⌥']

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">What I work with</p>
      <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">Skills &amp; Technologies</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, i) => (
          <article
            key={group.group}
            className="group relative overflow-hidden rounded-md border border-base-300 bg-base-100 p-6 transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
          >
            {/* Top stripe grows on hover */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />

            {/* Big faint number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-3 select-none text-8xl font-extrabold text-base-content/5"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative">
              <div className="mb-5 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-lg bg-neutral font-mono text-sm font-bold text-secondary">
                  {icons[i % icons.length]}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold leading-tight">{group.group}</h3>
                  <p className="text-xs text-base-content/60">{group.items.length} skills</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="cursor-default rounded-full border border-base-300 bg-base-200 px-3 py-1 text-sm text-base-content/80 transition hover:border-secondary hover:bg-secondary hover:text-secondary-content"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}