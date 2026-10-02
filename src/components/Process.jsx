import { useRef, useState } from 'react'
import { process } from '../content'
import { gsap, useGSAP } from '../lib/motion'
import { Band } from './Guilloche'

// Uma única linha de guilhoché, desenhada pelo scroll, liga os quatro momentos.
export default function Process() {
  const root = useRef(null)
  const track = useRef(null)
  const [reached, setReached] = useState(-1)
  const steps = process.steps.length

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lines = gsap.utils.toArray('[data-line]', root.current)
        gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 })
        gsap.to(lines, {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: {
            trigger: track.current,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.8,
            onUpdate: (self) => setReached(Math.floor(self.progress * steps - 0.02)),
          },
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => setReached(steps - 1))
    },
    { scope: root },
  )

  return (
    <section ref={root} id="como-funciona" data-tone="dark" className="relative isolate overflow-hidden bg-walnut py-24 text-sand sm:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_0%,color-mix(in_oklab,var(--color-walnut-2)_90%,transparent),transparent_60%)]" aria-hidden="true" />

      <div className="mx-auto max-w-(--container-page) px-4 sm:px-8">
        <h2 className="max-w-[20ch] text-title font-medium text-paper">{process.title}</h2>

        <div ref={track} className="relative mt-16 sm:mt-24">
          {/* Linha horizontal trançada (desktop) */}
          <Band
            className="absolute top-[22px] left-0 hidden h-12 w-full -translate-y-1/2 drop-shadow-[0_0_6px_color-mix(in_oklab,var(--color-cognac)_65%,transparent)] md:block"
            strokeClassName="stroke-cognac/70"
            strands={3}
            amplitude={14}
            wavelength={90}
            nonScaling={false}
            pathProps={() => ({ 'data-line': true })}
          />
          {/* Linha vertical (mobile) */}
          <svg className="absolute top-0 left-[21px] h-full w-0.5 overflow-visible drop-shadow-[0_0_6px_color-mix(in_oklab,var(--color-cognac)_65%,transparent)] md:hidden" preserveAspectRatio="none" viewBox="0 0 1 100" aria-hidden="true">
            <path d="M0.5 0 V100" pathLength="1" data-line className="stroke-cognac/70" strokeWidth="1" />
          </svg>

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {process.steps.map((step, i) => {
              const on = reached >= i
              return (
                <li key={step.title} className="relative pl-16 md:pl-0">
                  <span
                    className={`tabular absolute top-0 left-0 grid size-11 place-items-center rounded-full border text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-(--duration-reveal) ease-out md:relative ${
                      on ? 'border-cognac bg-cognac text-ink shadow-glow' : 'border-sand/25 bg-walnut text-sand/70'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-2xl font-medium tracking-[-0.02em] text-paper md:mt-8">{step.title}</h3>
                  <p className="mt-3 max-w-[30ch] leading-relaxed text-sand/80">{step.text}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
