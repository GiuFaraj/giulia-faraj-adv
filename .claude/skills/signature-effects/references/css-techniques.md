# Técnicas de CSS, alternativas e componentes prontos

Sem biblioteca. Conteúdo vindo do antigo Arsenal de `prompts/prototyping-prompt.md` (movido em 01/10/2026). Prioridade: **CSS nativo → biblioteca leve → biblioteca pesada**, subindo só quando o efeito exigir.

## Técnicas de CSS

| Técnica | Efeito | Receita |
| :--- | :--- | :--- |
| Scroll-driven animations (`animation-timeline: view()` / `scroll()`) | Reveal e parallax nativos, sem JavaScript; sempre com fallback estático | [parallax.md](parallax.md) |
| View Transitions API + `@starting-style` | Morph entre páginas e estados; entrada de elementos | [motion.md](motion.md) |
| `@property` + `conic-gradient` | Borda com brilho girando, gradiente animado | [glow.md](glow.md) |
| `backdrop-filter` | Vidro fosco | [glass.md](glass.md) |
| `mask-image` | Bordas em degradê, spotlight que revela conteúdo, grade que some nas bordas | [background.md](background.md) |
| `clip-path` animado | Reveal em formas, transições geométricas | [motion.md](motion.md) |
| `mix-blend-mode` | Texto que inverte sobre imagem, luz que soma com o fundo | [glow.md](glow.md) |
| Filtros SVG (`feTurbulence`, `feDisplacementMap`) | Grain, distorção líquida, efeito gooey | [background.md](background.md) |
| Transformações 3D (`perspective`, `preserve-3d`) | Tilt, flip, camadas de profundidade | [motion.md](motion.md) |
| Easing `linear()` | Mola e quique em CSS puro (a skill `motion` gera a curva) | [motion.md](motion.md) |

Fora da assinatura: `background-clip: text` com gradiente (shimmer, reflexo metálico). O detector do Impeccable marca `gradient-text`; destaque no título vem de peso, tamanho ou cor sólida.

### Exemplos curtos

```css
/* reveal nativo ao entrar na tela */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 30%;
    }
  }
}
@keyframes reveal { from { opacity: 0; transform: translateY(24px); } }

/* entrada de elemento recém-inserido */
.toast { transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
@starting-style { .toast { opacity: 0; transform: translateY(8px); } }

/* grain fixo, fora do fluxo de rolagem */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## Bibliotecas alternativas (fora do padrão)

Use só quando o projeto já as tiver ou quando o padrão não cobrir o caso.

| Biblioteca | Uso | Peso |
| :--- | :--- | :--- |
| SplitType | Quebrar texto quando o projeto não usa GSAP (com GSAP, SplitText) | Muito leve |
| Anime.js | Alternativa leve ao GSAP, boa para SVG, quando o projeto já a usa | Leve |
| Barba.js | Transições de página em site multipágina sem SPA | Leve |
| Embla Carousel | Carrossel com física, base para sliders próprios | Leve |

Versões: consulte o npm e o Context7 antes de instalar.

## Componentes prontos

Só em projetos React + Tailwind, instalados pelo comando do shadcn (o código entra no projeto e é editável). Prioridade: **React Bits → Aceternity UI → Magic UI**.

Componente pronto só para **peças tecnicamente difíceis** (fundo WebGL, texto que se desmonta, distorção). **Nunca** para layout, hero ou seções: isso dá a cara do projeto. Todo componente usado é adaptado aos tokens e ao motion do projeto até não ser reconhecível como o original.
