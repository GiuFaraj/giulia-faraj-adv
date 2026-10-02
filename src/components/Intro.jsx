import { CheckIcon, ScalesIcon } from '@phosphor-icons/react'
import { useRef } from 'react'
import { intro } from '../content'
import { gsap, useGSAP } from '../lib/motion'
import { useInView } from '../lib/useInView'
import { Band, Rosette } from './Guilloche'

export default function Intro() {
  const root = useRef(null)
  const fill = useRef(null)
  const [sealRef, sealSeen] = useInView()

  // A palavra em contorno é preenchida conforme o scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          fill.current,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: fill.current, start: 'top 85%', end: 'bottom 35%', scrub: 0.6 } },
        )
      })
      mm.add('(prefers-reduced-motion: reduce)', () => gsap.set(fill.current, { clipPath: 'inset(0% 0% 0% 0%)' }))
    },
    { scope: root },
  )

  return (
    <section ref={root} data-tone="light" className="relative isolate overflow-hidden bg-surface pt-24 pb-24 text-fg sm:pt-32 sm:pb-32">
      <Band className="pointer-events-none absolute top-[14%] left-0 -z-10 h-40 w-full" strokeClassName="stroke-(--guilloche-paper)" strands={7} amplitude={34} wavelength={180} />

      <div className="mx-auto max-w-(--container-page) px-4 sm:px-8">
        <div className="relative select-none" aria-hidden="true">
          <p className="text-[clamp(4.5rem,19vw,17rem)] leading-[0.86] font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-navy)] dark:[-webkit-text-stroke:1.5px_var(--color-azure)]">
            {intro.outline}
          </p>
          <p ref={fill} className="absolute inset-0 text-[clamp(4.5rem,19vw,17rem)] leading-[0.86] font-semibold tracking-[-0.04em] text-navy dark:text-paper">
            {intro.outline}
          </p>
        </div>

        <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <h2 className="max-w-[18ch] text-title font-medium text-fg">{intro.title}</h2>
            <p className="mt-8 max-w-[58ch] text-lead text-fg-muted">{intro.text}</p>
          </div>

          {/* Selo: dupla moldura de vidro com roseta, como o selo de um certificado */}
          <div ref={sealRef} className="rounded-(--radius-shell) bg-surface-3/50 p-1.5 ring-1 ring-line lg:mt-3">
            <div className="rounded-(--radius-core) bg-surface p-7 shadow-soft sm:p-9">
              <div className="flex items-center gap-6">
                <div className="relative grid size-32 shrink-0 place-items-center sm:size-36">
                  {sealSeen && <Rosette petals={20} depth={11} rings={4} className="absolute inset-0 size-full drop-shadow-[0_0_5px_color-mix(in_oklab,var(--color-cognac)_55%,transparent)]" strokeClassName="stroke-cognac-deep dark:stroke-cognac" width={0.7} />}
                  <span className="relative grid size-[66%] place-items-center rounded-full bg-surface text-fg shadow-soft ring-1 ring-line">
                    <ScalesIcon size={40} weight="light" aria-hidden="true" />
                  </span>
                </div>
                <p className="text-xl leading-snug font-medium tracking-[-0.015em] text-fg">{intro.seal.label}</p>
              </div>
              <ul className="mt-8 space-y-4 border-t border-line pt-7">
                {intro.facts.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.98rem] leading-relaxed text-fg-muted">
                    <CheckIcon size={18} weight="bold" className="mt-1 shrink-0 text-fg-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
