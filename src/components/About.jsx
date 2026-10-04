import Reveal from './Reveal'
import { socials } from '../Data'
import { socialIcons } from './SocialLinks'
import './About.css'

const interests = [
  'Competitive programming contests',
  'Teaching and explaining mathematics',
  'Learning new tools and deployment',
  // Add your own hobbies here, for example sports, reading, travel or painting
]

const traits = ['Curious', 'Logical', 'Patient', 'Detail-oriented']

const icon = (...paths) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    {paths.map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
)

const icons = {
  journey: icon('M4 20 10 8l4 6 6-10', 'M4 20h16'),
  work: icon('M16 18l6-6-6-6', 'M8 6l-6 6 6 6'),
  beyond: icon('M4 5a2 2 0 0 1 2-2h14v15H6a2 2 0 0 0-2 2z', 'M4 19a2 2 0 0 0 2 2h14'),
  me: icon('M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z'),
  pin: icon('M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z', 'M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'),
  cap: icon('M22 9 12 4 2 9l10 5 10-5z', 'M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5'),
  globe: icon('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M3 12h18', 'M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z'),
  book: icon('M12 6v14', 'M12 6C10 4.5 7 4 3 4v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2z'),
  trophy: icon('M7 4h10v5a5 5 0 0 1-10 0z', 'M17 5h3v2a3 3 0 0 1-3 3', 'M7 5H4v2a3 3 0 0 0 3 3', 'M12 14v4', 'M8 21h8'),
}

const story = [
  {
    title: 'My programming journey',
    icon: icons.journey,
    text: "My journey started with problem solving. I studied science through school and college, and I learned C and C++ to practise data structures and algorithms on Codeforces, CodeChef and LeetCode. Contests taught me to break a hard problem into small steps and to check my logic before writing code. Then I wanted to build things people could actually use, so I moved into web development: Python and FastAPI for the backend, React and Tailwind for the interface. My Blood Donation platform is my main project so far, and I'm building more.",
  },
  {
    title: 'The work I enjoy',
    icon: icons.work,
    text: "I enjoy backend work: designing clean REST APIs, modelling data, and protecting endpoints with JWT and role-based access. I also like turning an API into a simple, responsive interface that is easy to use. I'm happiest on problems where logic matters, such as permissions, validation and the flow of data.",
  },
  {
    title: 'Beyond code',
    icon: icons.beyond,
    text: "Outside programming I teach mathematics and SSC-level subjects as a private tutor, and I'm a member of the Math Club at M M College Jashore. I like explaining ideas simply and seeing a topic finally click for a student.",
    chips: interests,
  },
  {
    title: 'A little about me',
    icon: icons.me,
    text: "I'm calm under pressure, I ask questions until I understand something properly, and I like to leave code cleaner than I found it.",
    chips: traits,
  },
]

const facts = [
  { label: 'Based in', value: 'Jashore, Bangladesh', icon: icons.pin },
  { label: 'Studying', value: 'BSc Mathematics, 3rd year', icon: icons.cap },
  { label: 'Languages', value: 'Bengali (native), English (fluent)', icon: icons.globe },
  { label: 'Also', value: 'Math tutor and Math Club member', icon: icons.book },
]

// Profile buttons. X falls back to a placeholder if it is not in Data.js yet.
const connectLabels = [
  { label: 'LinkedIn', text: 'LinkedIn profile', hover: 'hover:border-[#0A66C2] hover:bg-[#0A66C2]' },
  { label: 'Facebook', text: 'Facebook', hover: 'hover:border-[#1877F2] hover:bg-[#1877F2]' },
  { label: 'X', text: 'X (Twitter)', hover: 'hover:border-neutral hover:bg-neutral' },
  { label: 'GitHub', text: 'GitHub', hover: 'hover:border-neutral hover:bg-neutral' },
]

const connect = connectLabels
  .map((c) => {
    const found = socials.find((s) => s.label === c.label)
    const href = found?.href || (c.label === 'X' ? 'https://x.com/khondoker_talha' : null)
    return href ? { ...c, href } : null
  })
  .filter(Boolean)

function Chip({ children }) {
  return (
    <span className="rounded-full border border-base-300 bg-base-100/80 px-3 py-1 text-sm text-base-content/80 transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary hover:shadow-md hover:shadow-secondary/20">
      {children}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      {/* Background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-20 top-40 size-72 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -right-20 bottom-20 size-72 rounded-full bg-info/10 blur-3xl" />
      </div>

      <Reveal className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Get to know me</p>
        <h2 className="mb-10 mt-2 text-3xl font-extrabold md:text-4xl">
          About <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">me</span>
        </h2>
      </Reveal>

      <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Story cards */}
        <div className="space-y-5">
          {story.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={i * 0.05}
              className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100/70 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/10"
            >
              {/* Big faded number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-4 select-none font-mono text-7xl font-extrabold text-base-content/5 transition duration-500 group-hover:text-secondary/15"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative mb-3 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {item.icon}
                </span>
                <h3 className="text-xl font-extrabold">{item.title}</h3>
              </div>

              <p className="relative text-base-content/80">{item.text}</p>

              {item.chips && (
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>

        {/* Photo, facts and profile buttons */}
        <Reveal as="aside" delay={0.1} className="mx-auto w-full max-w-sm space-y-5 lg:sticky lg:top-28 lg:max-w-none">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-br from-secondary to-info opacity-60 blur-sm"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -rotate-2 rounded-3xl border border-secondary/40"
            />
            <img
              src="/talha-car.jpg"
              alt="Md Mushfiqur Talha Khondoker"
              width="800"
              height="800"
              loading="lazy"
              className="relative aspect-square w-full rounded-3xl border-4 border-base-100 object-cover shadow-2xl"
            />

            {/* Floating badges */}
            <span className="ab-float absolute -left-2 top-6 flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur sm:-left-4">
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-secondary-content [&_svg]:size-3.5">
                {icons.trophy}
              </span>
              Competitive programmer
            </span>
            <span
              className="ab-float absolute -right-2 bottom-8 flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur sm:-right-4"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-secondary-content [&_svg]:size-3.5">
                {icons.book}
              </span>
              Math tutor
            </span>

            <span
              className="ab-float absolute -right-2 top-6 flex items-center gap-2 rounded-full border border-base-300 bg-base-100/90 py-1.5 pl-2 pr-3 text-xs font-bold shadow-xl backdrop-blur sm:-right-4"
              style={{ animationDelay: '1.5s' }}
            >
              <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-secondary to-info text-secondary-content [&_svg]:size-3.5">
                {icons.globe}
              </span>
              Full-stack developer
            </span>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="group flex items-start gap-3 rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary transition duration-300 group-hover:bg-secondary group-hover:text-secondary-content">
                  {fact.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-base-content/60">{fact.label}</p>
                  <p className="mt-0.5 text-sm font-semibold">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connect with me */}
          <div className="rounded-2xl bg-gradient-to-br from-secondary via-info to-accent p-[2px]">
            <div className="rounded-[calc(1rem-2px)] bg-base-100 p-5">
              <h3 className="text-lg font-extrabold">Let&apos;s connect</h3>
              <p className="mb-4 mt-1 text-sm text-base-content/70">Find me on these platforms.</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {connect.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group flex items-center gap-3 rounded-xl border border-base-300 bg-base-200/50 px-3 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-lg ${c.hover}`}
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-base-100 text-base-content transition group-hover:bg-white/20 group-hover:text-white">
                        {socialIcons[c.label]}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{c.text}</span>
                      <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
