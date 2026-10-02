// Botão pílula com ícone aninhado no próprio círculo ("button-in-button").
const variants = {
  // A única luz da página: onde agir
  cognac:
    'bg-cognac text-ink shadow-glow hover:bg-cognac-hi [--pill-icon:color-mix(in_oklab,var(--color-ink)_12%,transparent)]',
  glass:
    'glass-ink text-paper hover:bg-ink/60 [--pill-icon:color-mix(in_oklab,var(--color-paper)_12%,transparent)]',
  ink: 'bg-ink text-paper shadow-lift hover:bg-navy [--pill-icon:color-mix(in_oklab,var(--color-paper)_14%,transparent)] dark:bg-paper dark:text-ink dark:hover:bg-mist dark:[--pill-icon:color-mix(in_oklab,var(--color-ink)_10%,transparent)]',
  paper: 'bg-paper text-ink hover:bg-mist [--pill-icon:color-mix(in_oklab,var(--color-ink)_8%,transparent)]',
}

export default function Pill({ as: Tag = 'a', variant = 'cognac', icon: Icon, children, className = '', size = 'md', ...rest }) {
  const pad = size === 'sm' ? 'h-11 pl-5 pr-1.5 text-sm' : 'h-14 pl-6 pr-2 text-base'
  return (
    <Tag
      className={`group inline-flex shrink-0 items-center gap-3 rounded-pill font-medium whitespace-nowrap transition-[background-color,transform,box-shadow] duration-(--duration-ui) ease-(--ease-out) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55 ${pad} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <span
          className={`flex items-center justify-center rounded-full bg-(--pill-icon) transition-transform duration-(--duration-ui) ease-(--ease-out) group-hover:translate-x-0.5 group-hover:-translate-y-px ${size === 'sm' ? 'size-8' : 'size-10'}`}
        >
          <Icon size={size === 'sm' ? 16 : 18} weight="regular" aria-hidden="true" />
        </span>
      )}
    </Tag>
  )
}
