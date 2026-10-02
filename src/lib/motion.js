import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Mesma linguagem dos tokens CSS (--ease-out, --duration-*)
export const EASE_OUT = 'expo.out'
export const DUR = { ui: 0.24, reveal: 0.7, slide: 0.9 }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll suave com inércia, sincronizado com o ScrollTrigger. Desligado em reduced-motion.
export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {}
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 }, stopInertiaOnNavigate: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  window.__lenis = lenis
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    delete window.__lenis
  }
}

export { gsap, ScrollTrigger, useGSAP }
