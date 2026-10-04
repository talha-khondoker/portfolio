import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
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
import { getLenis } from './lib/lenis'

// Scrolls to the section in the URL hash (through Lenis), or to the top on a new page
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = getLenis()
    const el = hash ? document.getElementById(hash.slice(1)) : null

    if (el) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.2 })
        else el.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0 })
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

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-40 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <Link to="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </section>
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
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
