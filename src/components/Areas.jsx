import { ArrowLeftIcon, ArrowRightIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { areas, whatsappUrl } from '../content'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion'
import { Band, Rosette } from './Guilloche'
import Pill from './Pill'

// Trilho horizontal de cartões (scroll-snap) com setas e abas. Nada prende o scroll da página.
export default function Areas() {
  const root = useRef(null)
  const track = useRef(null)
  const field = useRef(null)
  const [active, setActive] = useState(0)
  const targetLeft = useRef(null) // destino de uma rolagem disparada por seta/aba

  // Posição de destino de cada cartão; o último usa o fim do trilho (ele não alcança o início)
  function leftOf(i) {
    const el = track.current
    const card = el.children[i]
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    return Math.min(card.offsetLeft - pad, el.scrollWidth - el.clientWidth)
  }

  function show(i) {
    const n = areas.length
    const target = (i + n) % n
    targetLeft.current = leftOf(target)
    track.current.scrollTo({ left: targetLeft.current, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    setActive(target)
  }

  // Cartão ativo = o mais próximo da posição atual do trilho (fim do trilho = último cartão)
  useEffect(() => {
    const el = track.current
    let frame
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = el.scrollLeft
        // Rolagem programada em andamento: não recalcula até chegar ao destino
        if (targetLeft.current !== null) {
          if (Math.abs(x - targetLeft.current) > 2) return
          targetLeft.current = null
        }
        let best = 0
        for (let i = 1; i < areas.length; i++) {
          if (Math.abs(leftOf(i) - x) < Math.abs(leftOf(best) - x)) best = i
        }
        setActive(best)
      })
    }
    // Se o visitante interromper a rolagem (toque, roda), o destino deixa de valer
    const release = () => {
      targetLeft.current = null
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('scrollend', release)
    el.addEventListener('pointerdown', release)
    el.addEventListener('wheel', release, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('scrollend', release)
      el.removeEventListener('pointerdown', release)
      el.removeEventListener('wheel', release)
      cancelAnimationFrame(frame)
    }
  }, [])

  // "Ver a área" no hero: desce até a seção e abre o cartão certo
  useEffect(() => {
    function onArea(e) {
      const i = areas.findIndex((a) => a.id === e.detail)
      const top = root.current.getBoundingClientRect().top + window.scrollY - 72
      if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2, onComplete: () => show(i) })
      else {
        window.scrollTo({ top, behavior: 'smooth' })
        setTimeout(() => show(i), 700)
      }
    }
    window.addEventListener('gf:area', onArea)
    return () => window.removeEventListener('gf:area', onArea)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('[data-area-card]', track.current)
        gsap.from(cards, { x: 90, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: track.current, start: 'top 80%' } })
        gsap.to(field.current, { rotate: 50, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { scope: root },
  )

  const gutter = 'max(1rem, calc((100vw - var(--container-page)) / 2 + 2rem))'

  return (
    <section ref={root} id="areas" data-tone="light" className="relative isolate overflow-hidden bg-surface-2 py-24 text-fg sm:py-32">
      {/* Efeito de fundo: roseta no canto superior esquerdo, girando com o scroll */}
      <div
        ref={field}
        className="pointer-events-none absolute -top-80 -left-72 -z-10 aspect-square w-160 will-change-transform max-sm:-top-52 max-sm:-left-48 max-sm:w-104"
        aria-hidden="true"
      >
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cognac)_16%,transparent),transparent_70%)] blur-2xl" />
        <Rosette petals={22} depth={14} rings={6} draw={false} width={0.8} className="size-full" strokeClassName="stroke-(--guilloche-paper)" />
      </div>
      <Band
        className="pointer-events-none absolute bottom-[6%] left-0 -z-10 h-40 w-full [mask-image:linear-gradient(90deg,transparent_0%,#000_45%)]"
        strokeClassName="stroke-(--guilloche-paper)"
        strands={9}
        amplitude={40}
        wavelength={220}
      />

      <div className="mx-auto max-w-(--container-page) px-4 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-[18ch] text-title font-medium">Em todas as áreas, o mesmo cuidado.</h2>
            <p className="mt-6 max-w-[46ch] text-lead text-fg-muted">
              Atendimento para pessoas e empresas, com a mesma atenção a detalhes em cada tipo de caso.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div role="tablist" aria-label="Escolher a área" className="flex flex-wrap gap-1.5 rounded-pill bg-surface/70 p-1.5 ring-1 ring-line backdrop-blur-md">
              {areas.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`area-${a.id}`}
                  onClick={() => show(i)}
                  className={`rounded-pill px-4 py-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-(--duration-ui) ${
                    active === i ? 'bg-ink text-paper shadow-soft dark:bg-paper dark:text-ink' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  <span className="sm:hidden">{a.short}</span>
                  <span className="max-sm:hidden">{a.tab}</span>
                </button>
              ))}
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => show(active - 1)}
                aria-label="Cartão da área anterior"
                className="grid size-12 place-items-center rounded-full bg-surface/70 text-fg ring-1 ring-line backdrop-blur-md transition-[transform,background-color] duration-(--duration-press) hover:bg-surface active:scale-[0.95]"
              >
                <ArrowLeftIcon size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => show(active + 1)}
                aria-label="Cartão da próxima área"
                className="grid size-12 place-items-center rounded-full bg-ink text-paper shadow-soft transition-[transform,background-color] duration-(--duration-press) hover:bg-navy active:scale-[0.95] dark:bg-paper dark:text-ink dark:hover:bg-mist"
              >
                <ArrowRightIcon size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-6 [scrollbar-width:none] sm:mt-16 [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: gutter, scrollPaddingInline: gutter }}
      >
        {areas.map((a, i) => {
          const on = active === i
          return (
            <article
              key={a.id}
              id={`area-${a.id}`}
              data-index={i}
              data-area-card
              role="tabpanel"
              aria-label={a.tab}
              className="group/card w-[88%] shrink-0 snap-start sm:w-[80%] lg:w-[min(58rem,72%)]"
            >
              <div
                className={`h-full rounded-(--radius-shell) bg-surface-3/60 p-1.5 ring-1 ring-line transition-[opacity,transform] duration-(--duration-reveal) ease-out ${
                  on ? 'opacity-100' : 'scale-[0.97] opacity-55'
                }`}
              >
                <div className="flex h-full flex-col overflow-hidden rounded-(--radius-core) bg-surface shadow-soft md:flex-row">
                  <div className="relative h-56 shrink-0 overflow-hidden bg-duotone md:h-auto md:w-[42%]">
                    <img
                      src={a.photo.src}
                      srcSet={a.photo.srcSet}
                      sizes="(min-width: 1024px) 26rem, 90vw"
                      alt={a.photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover mix-blend-multiply transition-transform duration-[1200ms] ease-out group-hover/card:scale-[1.04]"
                      style={{ objectPosition: a.focus, rotate: a.mirror ? 'y 180deg' : undefined }}
                    />
                    <div className="absolute inset-0 bg-navy mix-blend-lighten" aria-hidden="true" />
                    <div className="pointer-events-none absolute -right-10 -bottom-10 size-36 opacity-70" aria-hidden="true">
                      <Rosette petals={a.rosette.petals} depth={8} rings={3} draw={false} width={0.7} className="size-full" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7 sm:p-10">
                    <h3 className="text-3xl font-medium tracking-[-0.025em] text-fg sm:text-4xl">{a.tab}</h3>
                    <p className="mt-4 max-w-[48ch] leading-relaxed text-fg-muted">{a.text}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {a.topics.map((t) => (
                        <li key={t} className="rounded-pill border border-line px-3.5 py-1.5 text-sm text-fg-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-9">
                      <Pill href={whatsappUrl(a.topic)} target="_blank" rel="noopener noreferrer" variant="ink" size="sm" icon={WhatsappLogoIcon}>
                        Conversar sobre {a.short}
                      </Pill>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
