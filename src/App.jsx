import { useEffect } from 'react'
import About from './components/About'
import Areas from './components/Areas'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Process from './components/Process'
import { ScrollTrigger, startSmoothScroll } from './lib/motion'

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll()
    // Fontes e imagens mudam alturas: recalcula os gatilhos quando carregam
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    return stop
  }, [])

  return (
    <>
      <a href="#conteudo" className="sr-only z-70 rounded-pill bg-paper px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Intro />
        <Areas />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
