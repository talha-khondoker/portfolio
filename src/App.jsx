import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import ProblemSolving from './components/ProblemSolving'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetails from './components/ProjectDetails'
import AllProjects from './components/AllProjects'
import NotFound from './components/NotFound'
import Resume from './components/Resume'
import { getLenis } from './lib/lenis'

// Scrolls to the section in the URL hash (through Lenis), or to the top on a new page
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const previous = useRef(null)

  useEffect(() => {
    const lenis = getLenis()
    const el = hash ? document.getElementById(hash.slice(1)) : null
    const cameFromAnotherPage = previous.current !== null && previous.current !== pathname
    previous.current = pathname

    if (!el) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo({ top: 0 })
      return
    }

    const go = (immediate) => {
      const l = getLenis()
      if (l) l.scrollTo(el, { offset: -96, immediate, duration: 1.2 })
      else {
        const top = el.getBoundingClientRect().top + window.scrollY - 96
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
      }
    }

    // Same page: glide there. Arriving from another page: the page is still loading images
    // and growing, so jump to the section and keep correcting until the layout settles.
    if (!cameFromAnotherPage) {
      requestAnimationFrame(() => go(false))
      return
    }

    let done = false
    const observer = new ResizeObserver(() => go(true))
    const stop = () => {
      if (done) return
      done = true
      observer.disconnect()
      clearTimeout(timer)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
    const timer = setTimeout(stop, 2500)

    requestAnimationFrame(() => go(true))
    observer.observe(document.body)
    // If the visitor starts scrolling themselves, stop correcting
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)

    return stop
  }, [pathname, hash])

  return null
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ProblemSolving />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <SmoothScroll />
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
