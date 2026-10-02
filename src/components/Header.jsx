import { ArrowUpRightIcon, ListIcon, MoonIcon, SunIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { lawyer, nav, whatsappUrl } from '../content'
import { ScrollTrigger, useGSAP } from '../lib/motion'
import { useTheme } from '../lib/theme'
import { Rosette } from './Guilloche'
import Pill from './Pill'

// Pílula de vidro flutuante. O tom acompanha a seção que está por baixo (data-tone).
export default function Header() {
  const ref = useRef(null)
  const [tone, setTone] = useState('dark')
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()

  // Lê a seção que está de fato sob a pílula (robusto com pin e mudanças de layout)
  useGSAP(() => {
    // Amostra vários pontos ao longo da pílula: basta um trecho claro para usar o vidro claro
    const probe = () => {
      const tones = [0.2, 0.4, 0.6, 0.8].map((f) => {
        const under = document.elementsFromPoint(window.innerWidth * f, 44).find((el) => !ref.current.contains(el))
        return under?.closest('[data-tone]')?.dataset.tone
      })
      setTone(tones.includes('light') ? 'light' : 'dark')
    }
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: probe, onRefresh: probe })
    probe()
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const light = tone === 'light' && theme !== 'dark' && !open
  const shell = light ? 'bg-surface/92 text-fg ring-1 ring-line shadow-soft backdrop-blur-xl' : 'glass-ink text-paper'
  const linkTone = light ? 'text-fg/80 hover:text-fg' : 'text-mist/75 hover:text-paper'

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={`mx-auto flex h-16 max-w-(--container-page) items-center justify-between gap-4 rounded-pill pr-2 pl-5 transition-[background-color,color,border-color] duration-(--duration-ui) ease-out sm:pl-6 ${shell}`}
      >
        <a href="#topo" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${lawyer.name}, início`}>
          <Rosette petals={16} depth={10} rings={3} draw={false} width={0.9} className="size-8" strokeClassName={light ? 'stroke-navy' : 'stroke-cognac'} />
          <span className="leading-none">
            <span className="block text-[1.05rem] font-semibold tracking-[-0.01em]">{lawyer.name}</span>
            <span className={`mt-1 block text-xs ${light ? 'text-fg/70' : 'text-mist/60'}`}>Advocacia</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`text-sm font-medium transition-colors duration-(--duration-ui) ${linkTone}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex size-11 items-center justify-center rounded-full transition-colors duration-(--duration-ui) active:scale-[0.97] ${light ? 'hover:bg-surface-3' : 'hover:bg-paper/10'}`}
            aria-label={theme === 'dark' ? 'Usar tema claro' : 'Usar tema escuro'}
          >
            {theme === 'dark' ? <SunIcon size={19} aria-hidden="true" /> : <MoonIcon size={19} aria-hidden="true" />}
          </button>
          <Pill href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant={light ? 'ink' : 'paper'} size="sm" icon={ArrowUpRightIcon} className="max-sm:hidden">
            Agendar reunião
          </Pill>
          <button
            type="button"
            className={`flex size-11 items-center justify-center rounded-full lg:hidden ${light ? 'hover:bg-surface-3' : 'hover:bg-paper/10'}`}
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon size={22} aria-hidden="true" /> : <ListIcon size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="menu"
        hidden={!open}
        className="fixed inset-0 -z-10 bg-ink/85 px-6 pt-32 pb-10 backdrop-blur-2xl lg:hidden"
      >
        <ul className="flex flex-col gap-2">
          {nav.map((item, i) => (
            <li key={item.href} className="starting:translate-y-6 starting:opacity-0 transition-[opacity,transform] duration-(--duration-reveal) ease-out" style={{ transitionDelay: `${60 + i * 60}ms` }}>
              <a href={item.href} onClick={() => setOpen(false)} className="block py-2 text-4xl font-medium tracking-[-0.03em] text-paper">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Pill href={whatsappUrl()} target="_blank" rel="noopener noreferrer" icon={ArrowUpRightIcon} className="mt-10">
          Agendar reunião
        </Pill>
      </div>
    </header>
  )
}
