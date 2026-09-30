import { useState } from 'react'

const EMAIL = 'khondokertalha@gmail.com'

const icons = {
  Email: (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
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
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/talha-khondoker', href: 'https://linkedin.com/in/talha-khondoker' },
  { label: 'GitHub', value: 'github.com/talha-khondoker', href: 'https://github.com/talha-khondoker' },
]

const field =
  'w-full rounded-md border border-base-300 bg-base-200 px-3 py-2.5 text-sm outline-none transition placeholder:text-base-content/40 focus:border-secondary focus:ring-2 focus:ring-secondary/30'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(form.project || 'Portfolio message')
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl border-t border-base-300 px-4 py-16">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: intro and links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Let's connect</p>

          <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl">
            Let's build something <span className="text-secondary">reliable.</span>
          </h2>

          <p className="mb-6 mt-4 max-w-md text-base-content/70">
            I'm open to junior remote backend and full-stack roles. Send a message or reach me
            through any of these.
          </p>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-4 py-1.5 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            Available for junior remote roles
          </div>

          <ul className="space-y-3">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.label === 'Email' ? undefined : '_blank'}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-md border border-base-300 bg-base-100 p-4 transition duration-300 hover:translate-x-1 hover:border-secondary hover:shadow-lg"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-neutral text-secondary transition group-hover:bg-secondary group-hover:text-secondary-content">
                    {icons[c.label]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-base-content/60">{c.label}</span>
                    <span className="block truncate font-medium">{c.value}</span>
                  </span>
                  <span className="ml-auto text-secondary transition group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <form
          onSubmit={send}
          className="relative space-y-4 overflow-hidden rounded-md border border-base-300 bg-base-100 p-6 shadow-xl md:p-8"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-secondary" />

          <h3 className="text-xl font-extrabold">Send me a message</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Your name</span>
              <input name="name" value={form.name} onChange={update} required placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Your email</span>
              <input name="email" type="email" value={form.email} onChange={update} required placeholder="you@example.com" className={field} />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">Subject</span>
            <input name="project" value={form.project} onChange={update} placeholder="What's this about?" className={field} />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">Message</span>
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

          <button type="submit" className="btn btn-primary w-full gap-2">
            Send message <span aria-hidden="true">→</span>
          </button>

          <p className="text-xs text-base-content/60">
            This opens your email app with the message filled in, so no backend is needed.
          </p>
        </form>
      </div>
    </section>
  )
}