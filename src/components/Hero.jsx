import { useEffect, useState } from 'react'
import { skills } from '../Data'

const slug = (text) => text.toLowerCase().replace(/[^a-z]+/g, '_').replace(/^_|_$/g, '')

const buildCode = (group) =>
  `${slug(group.group)} = [\n${group.items.map((item) => `  "${item}",`).join('\n')}\n]`

// Colours strings amber and the variable name blue
function Highlighted({ text }) {
  const parts = text.split(/("[^"]*"?|^\w+(?= =))/gm)
  return parts.map((part, i) => {
    if (part.startsWith('"')) return <span key={i} className="text-amber-300">{part}</span>
    if (/^\w+$/.test(part)) return <span key={i} className="text-sky-300">{part}</span>
    return <span key={i}>{part}</span>
  })
}

function SkillsEditor() {
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')
  const code = buildCode(skills[active])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setTyped(code)
      return
    }

    setTyped('')
    let i = 0
    let timer
    const type = () => {
      i += 1
      setTyped(code.slice(0, i))
      if (i < code.length) {
        timer = setTimeout(type, 24)
      } else {
        // finished typing: wait, then slide to the next group
        timer = setTimeout(() => setActive((a) => (a + 1) % skills.length), 2600)
      }
    }
    timer = setTimeout(type, 250)
    return () => clearTimeout(timer)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const lines = typed.split('\n')

  return (
    <div className="relative">
      {/* Glow behind the editor */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-secondary/30 via-info/20 to-transparent blur-2xl"
      />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral font-mono text-sm text-neutral-content shadow-2xl">
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/20 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-neutral-content/60">tech_stack.py</span>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 text-xs" role="tablist">
          {skills.map((group, i) => (
            <button
              key={group.group}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 transition ${
                i === active
                  ? 'border-teal-300 bg-white/5 text-teal-300'
                  : 'border-transparent text-neutral-content/60 hover:bg-white/5 hover:text-neutral-content'
              }`}
            >
              {group.short}
            </button>
          ))}
        </div>

        {/* Code with line numbers */}
        <div
          className="min-h-64 overflow-x-auto py-5 leading-7"
          aria-label={`${skills[active].group}: ${skills[active].items.join(', ')}`}
        >
          {lines.map((line, n) => (
            <div key={n} className="flex">
              <span className="w-12 shrink-0 select-none pr-4 text-right text-neutral-content/30">{n + 1}</span>
              <pre className="whitespace-pre">
                <Highlighted text={line} />
                {n === lines.length - 1 && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-teal-300" />
                )}
              </pre>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-2 text-xs text-neutral-content/60">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-400" />
            Python
          </span>
          <span>
            {active + 1} / {skills.length}
          </span>
        </div>
      </div>
    </div>
  )
}

const stats = [
  { value: '323+', label: 'Problems solved' },
  { value: 'JWT', label: 'Auth and roles' },
  { value: '3rd yr', label: 'BSc Mathematics' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background: dotted grid and soft glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-base-300)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-secondary/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 pb-16 pt-24 sm:gap-10 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-32">
        <div>
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div className="grid size-14 shrink-0 place-items-center rounded-full bg-neutral text-xl font-extrabold text-neutral-content ring-2 ring-secondary ring-offset-4 ring-offset-base-200 sm:size-20 sm:text-2xl">
              TK
            </div>
            {/* When you have your photo, replace the div above with:
            <img src="/talha.jpg" alt="Talha Khondoker" className="size-20 shrink-0 rounded-full object-cover ring-2 ring-secondary ring-offset-4 ring-offset-base-200" />
            */}
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary sm:text-xs">Hello, I'm</p>
              <p className="max-w-[22rem] text-base font-extrabold leading-tight sm:text-xl">
                Md Mushfiqur Talha Khondoker
              </p>
            </div>
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Open to junior remote roles
          </div>

          <h1 className="max-w-xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">
            I build reliable{' '}
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">APIs</span>{' '}
            and the interfaces on top of them.
          </h1>

          <p className="my-6 max-w-md text-sm text-base-content/70 sm:text-base">
            Full stack web developer working with Python, FastAPI and React. Mathematics student in
            Jashore, Bangladesh, looking for junior remote backend and full-stack roles.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="btn btn-primary w-full gap-2 shadow-lg transition hover:-translate-y-0.5 sm:w-auto">
              See my projects <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn-outline w-full transition hover:-translate-y-0.5 sm:w-auto">
              Get in touch
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 divide-x divide-base-300 border-t border-base-300 pt-6">
            {stats.map((s) => (
              <div key={s.label} className="px-2 first:pl-0 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-extrabold text-secondary sm:text-2xl">{s.value}</dd>
                <p className="text-[10px] text-base-content/60 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <SkillsEditor />
      </div>
    </section>
  )
}