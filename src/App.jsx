
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ProblemSolving from './components/ProblemSolving'
import About from './components/About'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <ProblemSolving />
        <About />
        <Contact />
      </main>

      <footer className="footer footer-center p-6 text-sm text-base-content/70">
        <p>Md Mushfiqur Talha Khondoker · Jashore, Bangladesh</p>
      </footer>
    </div>
  )
}