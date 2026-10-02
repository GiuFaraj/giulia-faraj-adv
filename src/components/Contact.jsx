import { ArrowRightIcon, CheckIcon, CopyIcon, EnvelopeSimpleIcon, PencilSimpleIcon, WarningCircleIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import { areas, contact, lawyer, whatsappUrl } from '../content'
import { gsap, useGSAP } from '../lib/motion'
import { useInView } from '../lib/useInView'
import { Rosette } from './Guilloche'
import Pill from './Pill'

// O formulário não envia nada sozinho: monta um e-mail pronto (assunto, corpo e consentimento LGPD)
// e abre o aplicativo de e-mail do visitante. Basta clicar em enviar.
function buildEmail(data) {
  const subject = `Contato pelo site | ${data.area} | ${data.nome.trim()}`
  const body = [
    'Olá, Dra. Giulia.',
    '',
    `Meu nome é ${data.nome.trim()} e gostaria de conversar sobre uma questão de ${data.area}.`,
    '',
    'Resumo do caso:',
    data.mensagem.trim(),
    '',
    'Meus contatos:',
    `E-mail: ${data.email.trim()}`,
    `Telefone: ${data.telefone?.trim() || 'não informado'}`,
    '',
    'Autorizo o uso destes dados apenas para o retorno deste contato, nos termos da Lei nº 13.709/2018 (LGPD).',
    '',
    'Atenciosamente,',
    data.nome.trim(),
  ].join('\n')
  const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return {
    subject,
    body,
    mailto: `mailto:${lawyer.email}?${q}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lawyer.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  }
}

const field =
  'mt-2 block w-full rounded-(--radius-field) border border-line bg-surface/70 px-4 text-[0.98rem] text-fg placeholder:text-fg-muted/70 transition-[border-color,box-shadow] duration-(--duration-ui) outline-none focus:border-fg-accent focus:ring-4 focus:ring-cognac/20 aria-invalid:border-cognac-deep'

function validate(data) {
  const errors = {}
  if (!data.nome?.trim()) errors.nome = 'Informe seu nome.'
  if (!/^\S+@\S+\.\S+$/.test(data.email || '')) errors.email = 'Informe um e-mail válido, como nome@exemplo.com.'
  if ((data.mensagem || '').trim().length < 10) errors.mensagem = 'Conte um pouco mais sobre o caso (pelo menos 10 caracteres).'
  if (!data.consentimento) errors.consentimento = 'Precisamos da sua autorização para responder.'
  return errors
}

function FieldError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-fg-accent">
      <WarningCircleIcon size={16} aria-hidden="true" />
      {children}
    </p>
  )
}

export default function Contact() {
  const [email, setEmail] = useState(null) // e-mail montado, pronto para enviar
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState({})
  const [rosetteRef, seen] = useInView()
  const root = useRef(null)
  const photo = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(photo.current, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { scope: root },
  )

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) {
      form.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    const built = buildEmail(data)
    setEmail(built)
    setCopied(false)
    window.location.href = built.mailto
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Para: ${lawyer.email}\nAssunto: ${email.subject}\n\n${email.body}`)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const err = (name) => ({ 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': errors[name] ? `${name}-erro` : undefined })

  return (
    <section ref={root} id="contato" data-tone="dark" className="relative isolate overflow-hidden bg-ink py-24 sm:py-36">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div ref={photo} className="absolute -inset-y-[8%] inset-x-0 bg-duotone will-change-transform">
          <img src={contact.photo.src} srcSet={contact.photo.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" className="size-full object-cover object-[60%_40%] mix-blend-multiply" />
          <div className="absolute inset-0 bg-ink-2 mix-blend-lighten" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,color-mix(in_oklab,var(--color-ink)_80%,transparent)_45%,color-mix(in_oklab,var(--color-ink)_35%,transparent)_100%)] max-lg:bg-ink/75" />
      </div>
      <div ref={rosetteRef} className="pointer-events-none absolute -bottom-[30%] -left-[18%] -z-10 aspect-square w-[min(110vh,80vw)] opacity-50 max-lg:hidden" aria-hidden="true">
        <div className="absolute inset-[20%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-navy)_70%,transparent),transparent_70%)] blur-3xl" />
        {seen && <Rosette petals={22} depth={14} rings={6} className="size-full" strokeClassName="stroke-azure/50" width={0.7} />}
      </div>

      <div className="mx-auto grid max-w-(--container-page) gap-14 px-4 sm:px-8 lg:grid-cols-[6fr_6fr] lg:gap-16">
        <div className="lg:pt-6">
          <h2 className="text-title font-medium text-paper">
            {contact.title[0]}
            <span className="block text-cognac">{contact.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lead text-mist/80">{contact.lead}</p>
          <ul className="mt-9 space-y-4">
            {contact.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-paper">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-azure/15 text-azure">
                  <CheckIcon size={14} weight="bold" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="glow-border mt-12 inline-flex max-w-full flex-wrap items-center gap-5 rounded-(--radius-shell) bg-ink-2/80 p-3 pr-6 ring-1 ring-paper/8">
            <Pill href={whatsappUrl()} target="_blank" rel="noopener noreferrer" icon={WhatsappLogoIcon}>
              Falar no WhatsApp
            </Pill>
            <p className="text-sm leading-snug text-mist/70">
              Resposta em horário comercial
              <span className="tabular block text-base font-medium text-paper">{lawyer.whatsappDisplay}</span>
            </p>
          </div>
        </div>

        <div data-tone="light" className="rounded-(--radius-shell) bg-paper/10 p-1.5 ring-1 ring-paper/15 backdrop-blur-md">
          <div className="rounded-(--radius-core) bg-surface/88 p-7 text-fg shadow-lift ring-1 ring-paper/25 backdrop-blur-2xl backdrop-saturate-150 sm:p-10">
            {email && (
              <div role="status" className="py-2">
                <span className="grid size-12 place-items-center rounded-full bg-cognac text-ink shadow-glow">
                  <EnvelopeSimpleIcon size={22} aria-hidden="true" />
                </span>
                <p className="mt-6 text-2xl font-medium tracking-[-0.02em]">Seu e-mail está pronto.</p>
                <p className="mt-2 max-w-[44ch] text-fg-muted">
                  Ele abriu no seu aplicativo de e-mail já preenchido. Confira e clique em enviar. Se nada abriu, use uma das opções abaixo.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Pill href={email.mailto} variant="ink" size="sm" icon={EnvelopeSimpleIcon}>
                    Abrir o e-mail
                  </Pill>
                  <a
                    href={email.gmail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center rounded-pill px-5 text-sm font-medium text-fg ring-1 ring-line transition-colors duration-(--duration-ui) hover:bg-surface-3"
                  >
                    Abrir no Gmail
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex h-11 items-center gap-2 rounded-pill px-5 text-sm font-medium text-fg ring-1 ring-line transition-colors duration-(--duration-ui) hover:bg-surface-3"
                  >
                    {copied ? <CheckIcon size={16} aria-hidden="true" /> : <CopyIcon size={16} aria-hidden="true" />}
                    {copied ? 'Copiado' : 'Copiar texto'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setEmail(null)}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg-muted underline decoration-line underline-offset-4 hover:text-fg"
                >
                  <PencilSimpleIcon size={15} aria-hidden="true" />
                  Editar a mensagem
                </button>
              </div>
            )}
              <form onSubmit={handleSubmit} noValidate hidden={!!email} className="grid gap-5 sm:grid-cols-2">
                <p className="text-xl font-medium tracking-[-0.02em] sm:col-span-2">Prefere escrever? Conte o caso.</p>
                <label className="block text-sm font-medium">
                  Nome
                  <input name="nome" autoComplete="name" className={`${field} h-12`} {...err('nome')} />
                  <FieldError id="nome-erro">{errors.nome}</FieldError>
                </label>
                <label className="block text-sm font-medium">
                  E-mail
                  <input name="email" type="email" autoComplete="email" placeholder="nome@exemplo.com" className={`${field} h-12`} {...err('email')} />
                  <FieldError id="email-erro">{errors.email}</FieldError>
                </label>
                <label className="block text-sm font-medium">
                  Telefone <span className="font-normal text-fg-muted">(opcional)</span>
                  <input name="telefone" type="tel" autoComplete="tel" placeholder="(31) 90000-0000" className={`${field} h-12`} />
                </label>
                <label className="block text-sm font-medium">
                  Área
                  <select name="area" defaultValue={areas[0].tab} className={`${field} h-12 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%20viewBox=%220%200%2012%2012%22%3E%3Cpath%20d=%22M2%204l4%204%204-4%22%20fill=%22none%22%20stroke=%22%23466c93%22%20stroke-width=%221.5%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat`}>
                    {areas.map((a) => (
                      <option key={a.id}>{a.tab}</option>
                    ))}
                    <option>Outro assunto</option>
                  </select>
                </label>
                <label className="block text-sm font-medium sm:col-span-2">
                  Mensagem
                  <textarea name="mensagem" rows={4} placeholder="Um resumo da situação" className={`${field} resize-none py-3`} {...err('mensagem')} />
                  <FieldError id="mensagem-erro">{errors.mensagem}</FieldError>
                </label>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted">
                    <input name="consentimento" type="checkbox" className="mt-0.5 size-[18px] shrink-0 accent-cognac-deep" {...err('consentimento')} />
                    <span>
                      Autorizo o uso dos meus dados apenas para o retorno deste contato, conforme a{' '}
                      <a href="#privacidade" className="font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
                        Política de Privacidade
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError id="consentimento-erro">{errors.consentimento}</FieldError>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <Pill as="button" type="submit" variant="ink" icon={ArrowRightIcon}>
                    Enviar mensagem
                  </Pill>
                  <p className="text-sm text-fg-muted">Abre seu e-mail com a mensagem pronta.</p>
                </div>
              </form>
          </div>
        </div>
      </div>
    </section>
  )
}
