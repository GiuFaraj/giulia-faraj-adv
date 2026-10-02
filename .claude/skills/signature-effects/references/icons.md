# Ícones: Lucide, Phosphor duotone e Tabler

Versões consultadas em 01/10/2026 (npm + Context7): `lucide-react` 1.49.0 (`/websites/lucide_dev`), `@phosphor-icons/react` 2.1.10 (`/phosphor-icons/react`), `@tabler/icons-react` 3.48.0 (`/tabler/tabler-icons`). Sem React: `lucide` 1.49.0, `@phosphor-icons/web` 2.1.2, `@tabler/icons-webfont` 3.48.0 (ou o SVG de cada ícone).

## Papéis

| Família | Onde | Peso |
| :--- | :--- | :--- |
| Lucide | Padrão: navegação, botões, listas, formulários, corpo do texto | traço único no projeto (1.5 ou 1.75) |
| Phosphor duotone | Destaque: ícones grandes de features, hero, estados vazios, badges de seção | `weight="duotone"` |
| Tabler | Painéis: dashboards, tabelas, toolbars densas (catálogo maior para ações técnicas) | `stroke` igual ao do Lucide |

Cada família fica no seu papel; não misture duas famílias no mesmo grupo de ícones (uma toolbar é toda Tabler, uma lista de features é toda Phosphor).

## Lucide (padrão)

```tsx
import { ArrowRight, Check } from 'lucide-react';

<ArrowRight size={18} strokeWidth={1.75} absoluteStrokeWidth aria-hidden="true" />
```

`absoluteStrokeWidth` mantém a espessura igual em tamanhos diferentes. O Lucide 1.x saiu sem build UMD (só ESM e CJS). Ícone decorativo leva `aria-hidden`; ícone sozinho num botão leva `aria-label` no botão.

## Phosphor duotone (destaque)

```tsx
import { IconContext, SparkleIcon, ShieldCheckIcon } from '@phosphor-icons/react';

<IconContext.Provider value={{ weight: 'duotone', size: 40, color: 'var(--accent)' }}>
  <SparkleIcon aria-hidden="true" />
  <ShieldCheckIcon aria-hidden="true" />
</IconContext.Provider>
```

Na 2.1 os componentes têm o sufixo `Icon` (`SparkleIcon`). Em Server Components, importe de `@phosphor-icons/react/ssr` (sem contexto: passe `weight="duotone"` em cada ícone). A camada de fundo do duotone usa `currentColor` com opacidade 0.2; com a cor de destaque, ela vira um glow suave sem sombra.

Ícone de destaque com luz: envolva num círculo de vidro ([glass.md](glass.md)) e aplique `filter: drop-shadow` ([glow.md](glow.md)), nunca `box-shadow` colorido.

## Tabler (painéis)

```tsx
import { IconFilter, IconDownload } from '@tabler/icons-react';

<IconFilter size={18} stroke={1.75} aria-hidden="true" />
```

## Animação de ícones

- Hover: deslocamento de 2 a 4 px ou rotação curta no ícone dentro do botão ([motion.md](motion.md)).
- Ícone animado de verdade (estado, ilustração em movimento): Rive ou dotLottie ([vector-animation.md](vector-animation.md)), não SVG feito à mão.
- Nunca emoji nem glifo Unicode no lugar de ícone.
