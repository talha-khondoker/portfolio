import { codingProfiles } from '../Data'

// Short monogram shown in the badge for each platform
const badge = {
  Codeforces: 'CF',
  CodeChef: 'CC',
  LeetCode: 'LC',
  GitHub: 'GH',
}

export default function ProblemSolving() {
  return (
    <section id="problem-solving" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Logic and practice</p>
      <h2 className="mb-3 mt-2 text-3xl font-extrabold md:text-4xl">Problem solving</h2>
      <p className="mb-10 max-w-xl text-base-content/70">
        I practice data structures and algorithms in C++ and Python on these platforms. Click a
        card to see my profile.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {codingProfiles.map((profile, i) => (
          <a
            key={profile.platform}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-md border border-base-300 bg-base-100 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-secondary hover:shadow-2xl focus-visible:-translate-y-1.5 focus-visible:border-secondary"
          >
            {/* Top stripe grows on hover */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-secondary transition-transform duration-500 group-hover:scale-x-100" />

            {/* Soft glow in the corner */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-secondary/0 blur-3xl transition duration-500 group-hover:bg-secondary/25"
            />

            {/* Big faint number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 right-2 select-none text-8xl font-extrabold text-base-content/5"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-lg bg-neutral font-mono text-sm font-bold text-secondary transition group-hover:bg-secondary group-hover:text-secondary-content">
                    {badge[profile.platform] ?? profile.platform.slice(0, 2).toUpperCase()}
                  </span>
                  <p className="text-lg font-bold">{profile.platform}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-full border border-base-300 text-secondary transition duration-300 group-hover:rotate-[-45deg] group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-content"
                >
                  →
                </span>
              </div>

              <p className="text-6xl font-extrabold leading-none tracking-tight text-secondary">{profile.value}</p>
              <p className="mt-3 min-h-10 text-sm text-base-content/70">{profile.text}</p>

              <p className="mt-5 border-t border-base-300 pt-4 text-sm font-medium text-secondary">
                View my profile
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}