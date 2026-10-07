import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { codingProfiles, contactInfo, education, projects, skills, socials, softSkills } from '../Data'
import { resumeLinkProps } from '../resumeLink'
import './Resume.css'

const PORTFOLIO = 'https://talha-khondoker-portfolio.netlify.app/'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const link = (label) => socials.find((s) => s.label === label)?.href

// How a link looks when printed: no https:// and no trailing slash
const pretty = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

function Section({ title, children }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-2.5 border-b border-slate-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function Resume() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const previous = document.title
    document.title = 'Resume | Md Mushfiqur Talha Khondoker'
    return () => {
      document.title = previous
    }
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/resume`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard can be blocked, ignore */
    }
  }

  const primary =
    'btn gap-2 rounded-full border-0 bg-gradient-to-r from-secondary to-info text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40'
  const ghost =
    'btn gap-2 rounded-full border border-base-content/20 bg-base-100/60 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary'

  const contacts = [
    { text: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { text: contactInfo.phone, href: contactInfo.phoneHref },
    { text: 'Jashore, Bangladesh' },
    { text: pretty(PORTFOLIO), href: PORTFOLIO },
    link('LinkedIn') && { text: pretty(link('LinkedIn')), href: link('LinkedIn') },
    link('GitHub') && { text: pretty(link('GitHub')), href: link('GitHub') },
  ].filter(Boolean)

  const shownProjects = projects.slice(0, 2)

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="resume-page relative mx-auto max-w-4xl px-4 pb-20 pt-32"
    >
      <div aria-hidden="true" className="no-print pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-24 top-24 size-80 rounded-full bg-secondary/10 blur-3xl" />
        <span className="absolute -right-24 top-[28rem] size-80 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="no-print">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium text-secondary backdrop-blur transition duration-300 hover:-translate-x-1 hover:border-secondary"
          >
            ← Back to home
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Curriculum vitae</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
            My{' '}
            <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">resume</span>
          </h1>
          <p className="mt-3 max-w-xl text-base-content/70">
            One page, plain and easy to read. Print it or save it as a PDF straight from this page.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => window.print()} className={primary}>
              <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
                <path d="M7 9V3h10v6M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M7 14h10v7H7z" />
              </svg>
              Print / Save as PDF
            </button>
            <a {...resumeLinkProps} className={ghost}>
              <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
                <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
              </svg>
              Download PDF
            </a>
            <button type="button" onClick={copyLink} className={ghost}>
              <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
                {copied ? (
                  <path d="m5 12 5 5 9-10" />
                ) : (
                  <>
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </>
                )}
              </svg>
              {copied ? 'Link copied' : 'Copy link'}
            </button>
          </div>
        </div>

        {/* The CV */}
        <div className="relative mt-10 print:mt-0">
          <span
            aria-hidden="true"
            className="no-print absolute -inset-3 rounded-3xl bg-gradient-to-br from-secondary/30 via-info/20 to-transparent blur-2xl"
          />
          <div className="resume-frame relative rounded-3xl bg-gradient-to-br from-secondary via-info to-accent p-[2px] shadow-2xl shadow-secondary/20">
            <article className="resume-paper mx-auto w-full rounded-[calc(1.5rem-2px)] bg-white p-6 text-sm leading-relaxed text-slate-800 sm:p-10">
              {/* Name and contact */}
              <div className="border-b-2 border-teal-600 pb-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Md Mushfiqur Talha Khondoker
                </h2>
                <p className="mt-1 text-base font-semibold text-teal-700">Junior Full-Stack Developer</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                  {contacts.map((c) => (
                    <li key={c.text}>
                      {c.href ? (
                        <a href={c.href} className="break-all hover:text-teal-700 hover:underline">
                          {c.text}
                        </a>
                      ) : (
                        c.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <Section title="Career objective">
                <p>
                  Junior Full-Stack Developer proficient in Python, FastAPI and ReactJS, with expertise in SQL
                  databases and C/C++ problem solving. Built secure, data-driven web applications with JWT
                  authentication and role-based access control. Passionate about delivering reliable APIs and
                  intuitive user interfaces.
                </p>
              </Section>

              <Section title="Skills">
                <dl className="space-y-1">
                  {skills.map((group) => (
                    <div key={group.group} className="flex flex-col sm:flex-row sm:gap-3">
                      <dt className="shrink-0 font-bold text-slate-900 sm:w-44">{group.group}</dt>
                      <dd>{group.items.join(', ')}</dd>
                    </div>
                  ))}
                </dl>
              </Section>

              <Section title="Soft skills">
                <p>{softSkills.join(', ')}</p>
              </Section>

              <Section title="Projects">
                <ul className="space-y-4">
                  {shownProjects.map((p) => (
                    <li key={p.slug}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="font-bold text-slate-900">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.stack.join(' · ')}</p>
                      </div>
                      <p className="mt-0.5">{p.summary}</p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {p.live && (
                          <a href={p.live} className="hover:text-teal-700 hover:underline">
                            Live: {pretty(p.live)}
                          </a>
                        )}
                        {p.live && p.github && ' · '}
                        {p.github && (
                          <a href={p.github} className="hover:text-teal-700 hover:underline">
                            Code: {pretty(p.github)}
                          </a>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </Section>


              <Section title="Education">
                <ul className="space-y-2.5">
                  {education.map((item) => (
                    <li key={item.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.note}</p>
                      </div>
                      <p className="text-slate-600">{item.place}</p>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Competitive programming">
                <ul className="space-y-1">
                  {codingProfiles.map((p) => (
                    <li key={p.platform}>
                      <span className="font-bold text-slate-900">{p.platform}:</span> {p.value} {p.text}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Languages">
                <p>Bengali (native), English (fluent)</p>
              </Section>
            </article>
          </div>
        </div>

        {/* Next steps */}
        <div className="no-print mt-12 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-base-content/60">Like what you see?</span>
          <Link
            to={{ pathname: '/', hash: '#projects' }}
            className="rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 font-medium backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
          >
            See my projects
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 font-medium backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
          >
            <svg viewBox="0 0 24 24" className="size-4" {...stroke} aria-hidden="true">
              <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" />
            </svg>
            Home
          </Link>
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="rounded-full bg-gradient-to-r from-secondary to-info px-4 py-1.5 font-semibold text-secondary-content shadow-md shadow-secondary/30 transition duration-300 hover:-translate-y-0.5"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
