import { education } from '../Data'

const facts = [
  { label: 'Based in', value: 'Jashore, Bangladesh' },
  { label: 'Studying', value: 'BSc Mathematics, 3rd year' },
  { label: 'Languages', value: 'Bengali (native), English (fluent)' },
  { label: 'Also', value: 'Math tutor and Math Club member' },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-12 sm:py-16">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-xs">
        Get to know me
      </p>
      <h2 className="mb-8 mt-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">About</h2>

      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        {/* Left: story and quick facts */}
        <div className="min-w-0">
          <p className="max-w-xl text-base leading-relaxed text-base-content/80 sm:text-lg">
            I studied science through school and college, and I'm now in the third year of a BSc in{' '}
            <span className="font-semibold text-secondary">Mathematics</span>. That background
            shapes how I code: break the problem down, check the logic, then build it cleanly.
          </p>
          <p className="mt-4 max-w-xl text-sm text-base-content/70 sm:text-base">
            I tutor mathematics and SSC-level subjects, and I'm a member of the Math Club at M M
            College Jashore. I speak Bengali natively and English fluently.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-md border border-base-300 border-l-4 border-l-secondary bg-base-100 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <p className="text-[10px] uppercase tracking-widest text-base-content/60 sm:text-xs">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold sm:text-base">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: education timeline */}
        <div className="min-w-0">
          <h3 className="mb-5 text-xl font-extrabold sm:text-2xl">Education</h3>

          <ul className="relative space-y-4 border-l-2 border-base-300 pl-6 sm:space-y-5 sm:pl-8">
            {education.map((item, i) => (
              <li key={item.title} className="relative min-w-0">
                {/* Timeline dot: the first item (current degree) glows */}
                <span className="absolute -left-[28px] top-5 flex size-4 items-center justify-center sm:-left-[41px]">
                  {i === 0 && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                  )}
                  <span className="relative size-4 rounded-full bg-secondary ring-4 ring-base-200" />
                </span>

                <div className="rounded-md border border-base-300 bg-base-100 p-4 transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-lg sm:p-5">
                  <span className="mb-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-secondary-content sm:px-3 sm:text-xs">
                    {item.note}
                  </span>
                  <p className="text-sm font-bold leading-snug sm:text-base">{item.title}</p>
                  <p className="text-xs text-base-content/70 sm:text-sm">{item.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}