import { useEffect, useState } from 'react'
import { contactInfo } from '../Data'
import Reveal from './Reveal'

const EMAIL = contactInfo.email

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const icons = {
  Email: (
    <svg viewBox="0 0 24 24" className="size-5" {...line}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Phone: (
    <svg viewBox="0 0 24 24" className="size-5" {...line}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" className="size-5" {...line}>
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8 19.35L3 21Z" />
      <path d="M9 9.5c.3 2 2 3.8 4.5 4.8l1.2-1.2-1.6-.9-.8.5c-.8-.4-1.5-1.1-1.9-1.9l.5-.8-.9-1.6L9 9.5Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75Z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
}

const contacts = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, copy: true, hover: 'group-hover:bg-secondary' },
  { label: 'Phone', value: contactInfo.phone, href: contactInfo.phoneHref, copy: true, hover: 'group-hover:bg-secondary' },
  { label: 'WhatsApp', value: contactInfo.whatsapp, href: contactInfo.whatsappHref, hover: 'group-hover:bg-[#25D366]' },
  { label: 'LinkedIn', value: 'linkedin.com/in/talha-khondoker', href: 'https://linkedin.com/in/talha-khondoker', hover: 'group-hover:bg-[#0A66C2]' },
  { label: 'GitHub', value: 'github.com/talha-khondoker', href: 'https://github.com/talha-khondoker', hover: 'group-hover:bg-neutral' },
]

const topics = ['Job opportunity', 'Freelance project', 'Collaboration', 'Just saying hi']

// Live clock for Jashore (Bangladesh time)
function LocalTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Dhaka',
  }).format(now)

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm backdrop-blur">
      <svg viewBox="0 0 24 24" className="size-4 text-secondary" {...line} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
      Jashore time: <span className="font-semibold tabular-nums">{time}</span>
    </span>
  )
}

// Small button that copies text and briefly shows a tick
function CopyButton({ text, label }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* clipboard can be blocked, ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={done ? `${label} copied` : `Copy ${label}`}
      title={done ? 'Copied' : `Copy ${label}`}
      className={`grid size-11 shrink-0 place-items-center rounded-xl border transition duration-300 ${
        done
          ? 'border-success bg-success/10 text-success'
          : 'border-base-300 bg-base-100/80 text-base-content/70 hover:border-secondary hover:text-secondary'
      }`}
    >
      {done ? (
        <svg viewBox="0 0 24 24" className="size-4" {...line} strokeWidth="2.5">
          <path d="m5 12 5 5 9-10" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-4" {...line}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
      )}
    </button>
  )
}

const field =
  'w-full rounded-xl border border-base-300 bg-base-200/60 px-4 py-3 text-sm outline-none transition placeholder:text-base-content/40 focus:border-secondary focus:bg-base-100 focus:ring-2 focus:ring-secondary/30'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(form.project || 'Portfolio message')
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-10 size-80 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -right-24 bottom-10 size-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Left: intro and links */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Let's connect</p>

          <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl">
            Let's build something{' '}
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">reliable.</span>
          </h2>

          <p className="mb-6 mt-4 max-w-md text-base-content/70">
            I'm open to junior remote backend and full-stack roles. Send a message or reach me
            through any of these.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm backdrop-blur">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              Available for junior remote roles
            </span>
            <LocalTime />
          </div>

          <ul className="space-y-3">
            {contacts.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06} className="flex items-center gap-2">
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl border border-base-300 bg-base-100/80 p-3.5 backdrop-blur transition duration-300 hover:translate-x-1 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10"
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl bg-neutral text-secondary transition duration-300 group-hover:rotate-6 group-hover:text-white ${c.hover}`}
                  >
                    {icons[c.label]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-base-content/60">{c.label}</span>
                    <span className="block truncate font-medium">{c.value}</span>
                  </span>
                  <span className="ml-auto text-secondary transition duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </a>
                {c.copy && <CopyButton text={c.value} label={c.label.toLowerCase()} />}
              </Reveal>
            ))}
          </ul>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.15}>
          <div className="rounded-3xl bg-gradient-to-br from-secondary via-info to-accent p-[2px] shadow-2xl shadow-secondary/20">
            <form
              onSubmit={send}
              className="relative space-y-4 overflow-hidden rounded-[calc(1.5rem-2px)] bg-base-100 p-6 md:p-8"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-secondary/15 blur-3xl" />

              <div className="relative">
                <h3 className="text-xl font-extrabold">Send me a message</h3>
                <p className="mt-1 text-sm text-base-content/70">I read every message.</p>
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Your name</span>
                  <input name="name" value={form.name} onChange={update} required placeholder="Your name" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Your email</span>
                  <input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" className={field} />
                </label>
              </div>

              <div className="relative">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Subject</span>
                  <input name="project" value={form.project} onChange={update} placeholder="What's this about?" className={field} />
                </label>
                <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Quick subjects">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, project: t })}
                      aria-pressed={form.project === t}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition duration-300 ${
                        form.project === t
                          ? 'border-transparent bg-gradient-to-r from-secondary to-info text-secondary-content shadow-md shadow-secondary/30'
                          : 'border-base-300 text-base-content/70 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <label className="relative block">
                <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
                  Message
                  <span className="text-xs font-normal text-base-content/50">{form.message.length} characters</span>
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  required
                  rows={5}
                  placeholder="Tell me about the role or project..."
                  className={`${field} resize-none`}
                />
              </label>

              <button
                type="submit"
                className="btn group relative w-full gap-2 rounded-xl border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
              >
                Send message
                <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

              <p className="relative text-xs text-base-content/60" aria-live="polite">
                {sent
                  ? `Your email app should be opening now. If nothing happens, write to ${EMAIL} directly.`
                  : 'This opens your email app with the message filled in, so no backend is needed.'}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
