import { ArrowDownRightIcon, CaretLeftIcon, CaretRightIcon, PauseIcon, PlayIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { areas, whatsappUrl } from '../content'
import { gsap, prefersReducedMotion, useGSAP } from '../lib/motion'
import { Rosette } from './Guilloche'
import Pill from './Pill'

const SLIDE_MS = 7000

// Classe + atraso de cada linha do banner: entra em sequência, sai rápido (assimétrico).
function line(active, step) {
  return {
    className:
      'block transition-[opacity,transform,filter] ease-out data-[on=false]:translate-y-4 data-[on=false]:opacity-0 data-[on=false]:blur-[6px] data-[on=false]:duration-200 data-[on=true]:duration-(--duration-reveal)',
    'data-on': active,
    style: { transitionDelay: active ? `${180 + step * 80}ms` : '0ms' },
  }
}

export default function Hero() {
  const root = useRef(null)
  const media = useRef(null)
  const content = useRef(null)
  const ornament = useRef(null)
  const swipe = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(() => prefersReducedMotion())
  const [hold, setHold] = useState(false)
  const [visible, setVisible] = useState(true)
  const reduce = prefersReducedMotion()
  const running = !paused && !hold && visible
  const n = areas.length
  const go = (i) => setIndex((i + n) % n)

  // Pausa fora da tela e com a aba oculta
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.25 })
    io.observe(root.current)
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Parallax em camadas ao sair do hero: foto 0.2, ornamento 0.6, texto 1.0 + fade
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(media.current, { yPercent: 16, scale: 1.04, ease: 'none', scrollTrigger: st })
        gsap.to(ornament.current, { yPercent: 8, rotate: 18, ease: 'none', scrollTrigger: st })
        gsap.to(content.current, { y: -80, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '75% top' } })
      })
    },
    { scope: root },
  )

  function onKeyDown(e) {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  function onPointerDown(e) {
    swipe.current = { x: e.clientX, y: e.clientY, t: performance.now() }
  }

  function onPointerUp(e) {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    const velocity = Math.abs(dx) / (performance.now() - s.t)
    if (Math.abs(dx) > Math.abs(dy) && (Math.abs(dx) > 60 || velocity > 0.5)) go(index + (dx < 0 ? 1 : -1))
  }

  const area = areas[index]

  return (
    <section
      id="topo"
      ref={root}
      data-tone="dark"
      aria-roledescription="carrossel"
      aria-label="Áreas de atuação"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={(e) => e.target.matches(':focus-visible') && setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
      className="relative isolate flex min-h-[44rem] touch-pan-y flex-col overflow-hidden bg-ink h-svh"
    >
      <h1 className="sr-only">Giulia Faraj Advocacia. Direito Civil, Contratos e Direito do Consumidor em Belo Horizonte e região e online.</h1>

      {/* Camada de fotos em duotone: sombras em azul-tinta, luzes em nogueira clara */}
      <div ref={media} className="absolute inset-0 -z-20 will-change-transform" onPointerDown={onPointerDown} onPointerUp={onPointerUp} aria-hidden="true">
        {areas.map((a, i) => (
          <div
            key={a.id}
            className={`absolute inset-0 bg-duotone transition-opacity duration-(--duration-slide) ease-out ${i === index ? 'opacity-100' : 'opacity-0'} ${a.mirror ? '-scale-x-100' : ''}`}
          >
            <img
              src={a.photo.src}
              srcSet={a.photo.srcSet}
              sizes="100vw"
              alt=""
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`size-full object-cover mix-blend-multiply contrast-[1.08] transition-transform duration-[8000ms] ease-out ${i === index ? 'scale-100' : 'scale-[1.07]'}`}
              style={{ objectPosition: a.focus }}
            />
            <div className="absolute inset-0 bg-ink-2 mix-blend-lighten" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_82%,transparent)_38%,color-mix(in_oklab,var(--color-ink)_20%,transparent)_75%,transparent_100%)] max-md:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-ink)_45%,transparent)_0%,color-mix(in_oklab,var(--color-ink)_88%,transparent)_30%,color-mix(in_oklab,var(--color-ink)_82%,transparent)_58%,color-mix(in_oklab,var(--color-ink)_25%,transparent)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(0deg,var(--color-ink),transparent)] max-md:h-1/4" />
      </div>

      {/* Ornamento: roseta de guilhoché que se redesenha a cada área */}
      <div
        ref={ornament}
        className="pointer-events-none absolute top-1/2 -right-[22%] -z-10 aspect-square w-[min(92vh,68vw)] -translate-y-1/2 will-change-transform max-lg:-right-[40%] max-lg:opacity-35 max-md:-right-[45%] max-md:w-[120vw]"
        aria-hidden="true"
      >
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cognac)_22%,transparent),transparent_70%)] blur-2xl" />
        <div className="size-full drop-shadow-[0_0_10px_color-mix(in_oklab,var(--color-cognac)_55%,transparent)]">
          <Rosette key={area.id} {...area.rosette} className="size-full opacity-80" />
        </div>
      </div>

      <div ref={content} className="mx-auto flex w-full max-w-(--container-page) flex-1 items-center px-4 pt-28 pb-44 sm:px-8 sm:pb-40">
        <div className="grid w-full max-w-2xl">
          {areas.map((a, i) => {
            const active = i === index
            return (
              <div
                key={a.id}
                role="group"
                aria-roledescription="banner"
                aria-label={`${i + 1} de ${n}: ${a.tab}`}
                inert={!active}
                className="col-start-1 row-start-1"
              >
                <h2 className="text-display font-medium text-paper">
                  <span {...line(active, 0)}>{a.title[0]}</span>
                  <span {...line(active, 1)}>
                    <span className="text-cognac">{a.title[1]}</span>
                  </span>
                </h2>
                <p {...line(active, 2)} className={`${line(active, 2).className} mt-6 max-w-[34rem] text-lead text-mist/85`}>
                  {a.lead}
                </p>
                <div {...line(active, 3)} className={`${line(active, 3).className} mt-9 flex flex-wrap items-center gap-3`}>
                  <Pill href={whatsappUrl(a.topic)} target="_blank" rel="noopener noreferrer" icon={WhatsappLogoIcon}>
                    Falar no WhatsApp
                  </Pill>
                  <Pill
                    href={`#area-${a.id}`}
                    variant="glass"
                    icon={ArrowDownRightIcon}
                    onClick={(e) => {
                      // O Lenis intercepta âncoras; aqui a posição é calculada dentro do trecho fixo
                      e.preventDefault()
                      e.stopPropagation()
                      window.dispatchEvent(new CustomEvent('gf:area', { detail: a.id }))
                    }}
                  >
                    Ver a área
                  </Pill>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controles: abas com progresso, pausa, setas */}
      <div className="absolute inset-x-0 bottom-0 pb-6 sm:pb-8">
        <div className="mx-auto flex max-w-(--container-page) items-end justify-between gap-6 px-4 sm:px-8">
          <div className="flex min-w-0 flex-1 items-end gap-3 sm:gap-5">
            <div className="grid min-w-0 flex-1 grid-cols-3 gap-3 sm:max-w-xl sm:gap-5">
              {areas.map((a, i) => {
                const active = i === index
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active}
                    aria-label={`Mostrar ${a.tab}`}
                    className="group min-w-0 py-2 text-left"
                  >
                    <span className="relative block h-0.5 overflow-hidden rounded-full bg-paper/20">
                      {active && (
                        <span
                          key={`${index}-${reduce}`}
                          className="absolute inset-0 origin-left rounded-full bg-cognac"
                          style={
                            reduce
                              ? undefined
                              : { animation: `progress ${SLIDE_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                          }
                          onAnimationEnd={() => !reduce && go(index + 1)}
                        />
                      )}
                    </span>
                    <span
                      className={`mt-3 block truncate text-xs font-medium transition-colors duration-(--duration-ui) sm:text-sm ${active ? 'text-paper' : 'text-mist/55 group-hover:text-mist'}`}
                    >
                      <span className="sm:hidden">{a.short}</span>
                      <span className="max-sm:hidden">{a.tab}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Retomar troca automática' : 'Pausar troca automática'}
              className="glass-ink mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-full text-paper transition-transform duration-(--duration-press) active:scale-[0.95]"
            >
              {paused ? <PlayIcon size={16} weight="fill" aria-hidden="true" /> : <PauseIcon size={16} weight="fill" aria-hidden="true" />}
            </button>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Área anterior"
              className="glass-ink flex size-12 items-center justify-center rounded-full text-paper transition-transform duration-(--duration-press) active:scale-[0.95]"
            >
              <CaretLeftIcon size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próxima área"
              className="flex size-12 items-center justify-center rounded-full bg-paper text-ink transition-[transform,background-color] duration-(--duration-press) hover:bg-mist active:scale-[0.95]"
            >
              <CaretRightIcon size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
