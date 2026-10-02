import { CaretDownIcon } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import { lawyer, nav, whatsappUrl } from '../content'
import { Band } from './Guilloche'
import FooterMark from './FooterMark'

const year = new Date().getFullYear()

export default function Footer() {
  const privacy = useRef(null)

  // Links para #privacidade abrem o aviso no próprio rodapé
  useEffect(() => {
    function onClick(e) {
      if (!e.target.closest('a[href="#privacidade"]')) return
      e.preventDefault()
      privacy.current.open = true
      privacy.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      privacy.current.querySelector('summary').focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <footer data-tone="dark" className="relative isolate overflow-hidden bg-abyss pt-10 pb-10 text-mist/70">
      <Band className="h-16 w-full" strokeClassName="stroke-azure/25" strands={6} amplitude={20} wavelength={140} />

      <div className="mx-auto max-w-(--container-page) px-4 pt-14 sm:px-8">
        <p className="text-title font-medium text-paper">
          {lawyer.name} <span className="text-mist/40">Advocacia</span>
        </p>

        <div className="mt-14 grid gap-10 border-t border-paper/10 pt-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-medium text-paper">Atendimento</p>
            <p className="mt-3 leading-relaxed">
              {lawyer.address}, {lawyer.state}.
              <br />
              Online para todo o Brasil.
            </p>
          </div>
          <div>
            <p className="font-medium text-paper">Contato</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="tabular transition-colors hover:text-paper">
                  WhatsApp {lawyer.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${lawyer.email}`} className="transition-colors hover:text-paper">
                  {lawyer.email}
                </a>
              </li>
            </ul>
          </div>
          <nav aria-label="Rodapé">
            <p className="font-medium text-paper">Navegação</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-medium text-paper">Registro</p>
            <p className="tabular mt-3">{lawyer.oab}</p>
          </div>
        </div>

        <details ref={privacy} id="privacidade" className="group mt-14 rounded-(--radius-field) bg-paper/4 ring-1 ring-paper/8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-(--radius-field) px-5 py-4 text-sm font-medium text-paper [&::-webkit-details-marker]:hidden">
            Política de Privacidade (LGPD)
            <CaretDownIcon size={16} className="transition-transform duration-(--duration-ui) group-open:rotate-180" aria-hidden="true" />
          </summary>
          {/* TODO: revisar o texto da política com a advogada */}
          <div className="max-w-[70ch] space-y-3 px-5 pb-6 text-sm leading-relaxed">
            <p>
              Os dados enviados por este site (nome, e-mail, telefone e mensagem) são usados apenas para responder ao seu contato e agendar a
              reunião inicial, nos termos da Lei nº 13.709/2018 (LGPD).
            </p>
            <p>Os dados não são compartilhados com terceiros para fins comerciais e são mantidos só pelo tempo necessário ao atendimento.</p>
            <p>
              Para pedir acesso, correção ou exclusão dos seus dados, escreva para{' '}
              <a href={`mailto:${lawyer.email}`} className="text-paper underline underline-offset-4">
                {lawyer.email}
              </a>
              .
            </p>
          </div>
        </details>

        <div className="mt-10 flex flex-col gap-2 text-xs text-mist/50 sm:flex-row sm:justify-between">
          <p>
            <FooterMark /> {year} {lawyer.name}. Todos os direitos reservados.
          </p>
          <p>Fotos: Unsplash (Thay Pellerin, Romain Dancre, Mathias Reding, Nathalia Segato).</p>
        </div>
      </div>
    </footer>
  )
}
