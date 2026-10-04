import { socials } from '../Data'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const socialIcons = {
  GitHub: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.66 4.8 6.13v5.87h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75Z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
      <path d="M3 21l1.65-4.95A8.5 8.5 0 1 1 8 19.35L3 21Z" />
      <path d="M9 9.5c.3 2 2 3.8 4.5 4.8l1.2-1.2-1.6-.9-.8.5c-.8-.4-1.5-1.1-1.9-1.9l.5-.8-.9-1.6L9 9.5Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
}

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className="grid size-10 place-items-center rounded-full border border-base-300 bg-base-100 text-base-content/80 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-secondary hover:to-info hover:text-secondary-content hover:shadow-lg hover:shadow-secondary/30"
          >
            {socialIcons[s.label]}
          </a>
        </li>
      ))}
    </ul>
  )
}
