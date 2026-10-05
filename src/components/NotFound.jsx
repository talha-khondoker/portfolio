import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './NotFound.css'

const quick = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

// Tiny twinkling stars: [left %, top %, delay s]
const stars = [
  [8, 18, 0], [18, 70, 1.2], [86, 22, 0.6], [92, 64, 1.8],
  [48, 8, 0.9], [40, 90, 2.1], [4, 46, 1.5], [74, 86, 0.3],
]

export default function NotFound() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-32 text-center"
    >
      {/* Glows and stars */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-secondary/15 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-24 size-80 rounded-full bg-info/15 blur-3xl" />
      {stars.map(([left, top, delay], i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute size-1.5 animate-pulse rounded-full bg-secondary"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        />
      ))}

      {/* 404 with a floating badge */}
      <div className="relative">
        <h1 className="nf-number text-[7.5rem] font-extrabold leading-none tracking-tighter sm:text-[11rem]">404</h1>
        <span
          aria-hidden="true"
          className="nf-float absolute -right-3 -top-3 grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-info font-mono text-lg font-extrabold text-secondary-content shadow-xl shadow-secondary/40 sm:-right-6 sm:size-14"
        >
          {'</>'}
        </span>
      </div>

      <p className="mt-2 text-2xl font-extrabold sm:text-3xl">
        This page{' '}
        <span className="bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent">got lost</span>
      </p>
      <p className="mt-3 max-w-md text-base-content/70">
        The link may be broken or the page may have moved. Let&apos;s get you back to something that works.
      </p>

      {/* Terminal */}
      <div className="mt-8 w-full max-w-md overflow-hidden rounded-2xl border border-base-300 bg-neutral text-left shadow-2xl shadow-secondary/20">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-amber-300" />
          <span className="size-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-neutral-content/60">terminal</span>
        </div>
        <div className="space-y-1 p-4 font-mono text-sm text-neutral-content">
          <p className="break-all">
            <span className="text-green-400">$</span> GET <span className="text-sky-300">{pathname}</span>
          </p>
          <p className="text-red-300">404 Not Found</p>
          <p className="text-neutral-content/70">
            <span className="text-green-400">$</span> cd ~/home
            <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-teal-300" />
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="btn rounded-full border-0 bg-gradient-to-r from-secondary to-info px-7 text-secondary-content shadow-lg shadow-secondary/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
        >
          Back to home <span aria-hidden="true">→</span>
        </Link>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline rounded-full transition duration-300 hover:-translate-y-0.5"
        >
          ← Go back
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Or jump to</span>
        {quick.map((q) => (
          <Link
            key={q.id}
            to={{ pathname: '/', hash: `#${q.id}` }}
            className="rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm font-medium backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
          >
            {q.label}
          </Link>
        ))}
      </div>
    </motion.section>
  )
}
