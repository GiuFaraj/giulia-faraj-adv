# Glow e luz

Sem biblioteca: CSS nativo. Técnicas testadas no detector do Impeccable v0.1.5 em 01/10/2026.

| Técnica | Detector |
| :--- | :--- |
| Elemento de luz desfocado (`filter: blur()`) | passa |
| `filter: drop-shadow(0 0 …)` colorido | passa |
| `radial-gradient` de luz no fundo, opacidade moderada | passa |
| Borda girando com `@property` + `conic-gradient` | passa (cuide do contraste do texto) |
| `box-shadow` colorido em fundo escuro | `dark-glow` |
| `text-shadow` colorido | `dark-glow` |
| Texto com `background-clip: text` em gradiente | `gradient-text` |

Use só as técnicas que passam. Luz é hierarquia: ela fica atrás do título e da chamada principal, uma ou duas fontes por tela.

## Tokens

```css
:root {
  --glow-color: var(--accent);       /* da paleta, nunca roxo por reflexo */
  --glow-blur: 80px;
  --glow-strength: 0.35;             /* opacidade da luz */
  --glow-size: min(48vw, 640px);
  --dur-glow-drift: 18s;
}
```

## 1. Fonte de luz desfocada (camada 3 do hero)

```css
.hero__light {
  position: absolute;
  width: var(--glow-size);
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--glow-color);
  filter: blur(var(--glow-blur));
  opacity: var(--glow-strength);
  pointer-events: none;
}
.hero__light--a { inset: 10% auto auto 55%; }
.hero__light--b { inset: auto auto 5% 5%; --glow-color: var(--accent-2); --glow-strength: 0.2; }

@media (prefers-reduced-motion: no-preference) {
  .hero__light--a { animation: glow-drift var(--dur-glow-drift) ease-in-out infinite alternate; }
}
@keyframes glow-drift { to { transform: translate3d(-6%, 8%, 0) scale(1.08); } }
```

`filter: blur` grande custa caro: elemento de tamanho fixo, animado só com `transform`, nunca o `blur` em si.

## 2. Halo em botão ou ícone: `drop-shadow`

```css
.cta--primary {
  background: var(--accent);
  color: var(--on-accent);
  filter: drop-shadow(0 0 var(--glow-cta-blur, 18px) oklch(from var(--accent) l c h / 0.45));
  transition: filter var(--dur-fast) var(--ease-out);
}
.cta--primary:hover { --glow-cta-blur: 28px; }
```

Para profundidade (não brilho), sombra com deslocamento e cor neutra: `box-shadow: 0 18px 40px -18px oklch(0 0 0 / 0.5)`.

## 3. Borda que gira (`@property`)

```css
@property --glow-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }

.glow-border {
  border: 1px solid transparent;
  background:
    linear-gradient(var(--surface-raised), var(--surface-raised)) padding-box,
    conic-gradient(from var(--glow-angle), transparent 0 60%, var(--glow-color), transparent 85%) border-box;
}
@media (prefers-reduced-motion: no-preference) {
  .glow-border { animation: glow-spin 6s linear infinite; }
}
@keyframes glow-spin { to { --glow-angle: 360deg; } }
```

Rotação contínua é a exceção em que `linear` é correto. O texto dentro da borda usa a cor de superfície sólida, então o contraste fica garantido.

## 4. Spotlight que segue o cursor (só desktop)

```css
@media (hover: hover) and (pointer: fine) {
  .spotlight {
    background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%),
      oklch(from var(--glow-color) l c h / 0.14), transparent 70%);
  }
}
```

Atualize `--mx`/`--my` com `pointermove` dentro de `requestAnimationFrame` (ou `useMotionValue` em React). Nunca com `useState`.

## Título com destaque

Sem texto em gradiente. Destaque por peso, tamanho ou uma palavra na cor de destaque sólida; a luz atrás do título faz o resto.
