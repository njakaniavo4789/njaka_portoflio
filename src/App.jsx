import Loader from './components/Loader'
import Grain, { Vignette } from './components/Grain'
import Nav from './components/Nav'
import Footer from './components/Footer'

import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <Loader />

      <Grain />

      <Nav />

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />

      <Vignette />
    </>
  )
}
