import { useState } from 'react'

export default function ProjectImage({ project, className = '' }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary to-secondary ${className}`}>
      {project.image && !failed ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center px-6 text-center text-xl font-extrabold text-primary-content/90">
          {project.title}
        </span>
      )}
    </div>
  )
}
