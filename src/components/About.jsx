import { education } from '../Data'

const facts = [
  { label: 'Based in', value: 'Jashore, Bangladesh' },
  { label: 'Studying', value: 'BSc Mathematics, 3rd year' },
  { label: 'Languages', value: 'Bengali (native), English (fluent)' },
  { label: 'Also', value: 'Math tutor and Math Club member' },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Get to know me</p>
      <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">About</h2>

      <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: story and quick facts */}
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-base-content/80">
            I studied science through school and college, and I'm now in the third year of a BSc in{' '}
            <span className="font-semibold text-secondary">Mathematics</span>. That background
            shapes how I code: break the problem down, check the logic, then build it cleanly.
          </p>
          <p className="mt-4 max-w-xl text-base-content/70">
            I tutor mathematics and SSC-level subjects, and I'm a member of the Math Club at M M
            College Jashore. I speak Bengali natively and English fluently.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-md border border-base-300 border-l-4 border-l-secondary bg-base-100 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs uppercase tracking-widest text-base-content/60">{fact.label}</p>
                <p className="mt-1 font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: education timeline */}
        <div>
          <h3 className="mb-6 text-2xl font-extrabold">Education</h3>

          <ul className="relative space-y-5 border-l-2 border-base-300 pl-8">
            {education.map((item, i) => (
              <li key={item.title} className="relative">
                {/* Timeline dot: the first item (current degree) glows */}
                <span className="absolute -left-[41px] top-5 flex size-4 items-center justify-center">
                  {i === 0 && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                  )}
                  <span className="relative size-4 rounded-full bg-secondary ring-4 ring-base-200" />
                </span>

                <div className="rounded-md border border-base-300 bg-base-100 p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-lg">
                  <span className="mb-2 inline-block rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-content">
                    {item.note}
                  </span>
                  <p className="font-bold leading-snug">{item.title}</p>
                  <p className="text-sm text-base-content/70">{item.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}