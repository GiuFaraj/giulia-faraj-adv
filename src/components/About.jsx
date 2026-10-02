import { AirplaneTiltIcon, GraduationCapIcon } from '@phosphor-icons/react'
import { useRef } from 'react'
import { about, lawyer, portrait } from '../content'
import { gsap, useGSAP } from '../lib/motion'
import { Rosette } from './Guilloche'

export default function About() {
  const root = useRef(null)
  const photo = useRef(null)
  const card = useRef(null)
  const frame = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(photo.current, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.from(card.current, { y: 72, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: card.current, start: 'top 85%' } })
        if (frame.current) {
          gsap.fromTo(frame.current, { clipPath: 'inset(12% 12% 12% 12% round 2rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: frame.current, start: 'top 80%' } })
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="sobre" data-tone="dark" className="relative isolate overflow-hidden bg-ink py-24 sm:py-36">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div ref={photo} className="absolute -inset-y-[10%] inset-x-0 bg-duotone will-change-transform">
          <img src={about.photo.src} srcSet={about.photo.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" className="size-full object-cover object-[30%_50%] mix-blend-multiply" />
          <div className="absolute inset-0 bg-ink-2 mix-blend-lighten" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(270deg,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_75%,transparent)_45%,color-mix(in_oklab,var(--color-ink)_15%,transparent)_100%)] max-lg:bg-ink/60" />
      </div>

      <div className={`mx-auto max-w-(--container-page) px-4 sm:px-8 ${portrait ? 'grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16' : 'flex justify-end'}`}>
        {portrait && (
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div ref={frame} className="rounded-(--radius-shell) bg-paper/8 p-1.5 ring-1 ring-paper/15">
              <img
                src={portrait.src}
                alt={portrait.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-(--radius-core) object-cover object-top shadow-lift"
              />
            </div>
            <div className="pointer-events-none absolute -right-8 -bottom-8 size-32 drop-shadow-[0_0_8px_color-mix(in_oklab,var(--color-cognac)_55%,transparent)] sm:size-40" aria-hidden="true">
              <Rosette petals={18} depth={12} rings={4} draw={false} width={0.8} className="size-full" />
            </div>
          </div>
        )}
        <div ref={card} className="w-full max-w-xl rounded-(--radius-shell) bg-paper/5 p-1.5 ring-1 ring-paper/10">
          <div className="glass-ink rounded-(--radius-core) p-8 sm:p-11">
            <h2 className="text-title font-medium text-paper">{about.title}</h2>
            <p className="mt-2 text-lg text-azure">{about.role}</p>
            <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-mist/85">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="mt-10 text-2xl font-medium tracking-[-0.02em] text-paper">Formação</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {about.education.map((e) => (
                <li key={e.title} className="flex gap-3 rounded-(--radius-field) bg-paper/6 px-4 py-3.5 ring-1 ring-paper/8">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-azure/15 text-azure">
                    <GraduationCapIcon size={13} weight="bold" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base font-medium text-paper">{e.title}</span>
                    <span className="mt-0.5 block text-sm text-mist/70">{e.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-2xl font-medium tracking-[-0.02em] text-paper">Vivência internacional</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {about.exchanges.map((e) => (
                <li key={e.title} className="flex gap-3 rounded-(--radius-field) bg-paper/6 px-4 py-3.5 ring-1 ring-paper/8">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-azure/15 text-azure">
                    <AirplaneTiltIcon size={13} weight="bold" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base font-medium text-paper">{e.title}</span>
                    <span className="mt-0.5 block text-sm text-mist/70">{e.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="tabular mt-8 text-sm text-mist/60">{lawyer.oab}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
