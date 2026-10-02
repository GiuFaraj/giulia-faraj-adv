# Motion: entrada e hover

Versões consultadas em 01/10/2026 (npm + Context7): `gsap` 3.15.0 com SplitText (`/websites/gsap_v3`), `motion` 13.4.6 (`/websites/motion_dev`). Para decisões finas de curva e duração, `emil-design-eng`; para API, `motion` e `gsap-*`.

## Tokens de motion (uma linguagem por projeto)

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);       /* entradas e respostas */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* movimento na tela */
  --dur-fast: 180ms;     /* hover, press */
  --dur-base: 320ms;     /* troca de estado */
  --dur-reveal: 800ms;   /* entrada autoral do hero e das seções */
  --stagger: 60ms;
}
```

Em JavaScript, leia os mesmos valores (GSAP aceita `CustomEase` ou `"power4.out"` como equivalente próximo de `--ease-out`; Motion aceita o array `[0.16, 1, 0.3, 1]`).

## Entrada do hero (GSAP + SplitText)

O texto já está visível no HTML. A timeline parte de `from`, então, se o script falhar, nada fica escondido.

O título do hero é o LCP e precisa estar legível no primeiro frame: ele **nunca** começa em `opacity: 0` nem escondido atrás de máscara (isso o deixa invisível por ~150 ms, atrasa o LCP e o detector chama de `content-hidden-at-rest` se falhar). A entrada dele parte de um estado já visível (desfoque leve, opacidade parcial, deslocamento curto) e fica nítida por palavra. A revelação por linhas com máscara fica para os títulos de seção, que entram pelo scroll.

```js
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export function heroIntro() {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.7 } });
    SplitText.create('.hero__title', {
      type: 'words',
      autoSplit: true,             // refaz a divisão no resize e após carregar fontes
      onSplit: (self) =>
        tl.from(self.words, {      // parte visível: lê-se desde o primeiro frame
          opacity: 0.35,
          yPercent: 25,
          filter: 'blur(6px)',
          stagger: 0.04,
          clearProps: 'filter',
        }, 0),
    });
    tl.from('.hero__lede', { y: 16, autoAlpha: 0 }, 0.3)
      .from('.hero__actions > *', { y: 12, autoAlpha: 0, stagger: 0.06 }, 0.4)
      .from('.hero__panel', { y: 24, autoAlpha: 0, scale: 0.98 }, 0.45);
    return () => tl.kill();
  });
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.from('.hero__lede, .hero__actions, .hero__panel', { autoAlpha: 0, duration: 0.3 });  // só fade curto; o título fica parado
  });
}
```

Títulos de seção (fora do primeiro viewport), revelados por linhas com máscara ao entrar na tela. Rode dentro do mesmo `mm.add('(prefers-reduced-motion: no-preference)', …)`; no modo reduzido, os títulos ficam parados:

```js
gsap.utils.toArray('.section__title').forEach((title) => {
  SplitText.create(title, {
    type: 'lines',
    mask: 'lines',                 // cada linha sobe de dentro de uma máscara
    autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, {
      yPercent: 105, duration: 0.8, ease: 'power4.out', stagger: 0.08,
      scrollTrigger: { trigger: title, start: 'top 85%', once: true },
    }),
  });
});
```

Evite `text-wrap: balance` no elemento dividido pelo SplitText (interfere na divisão).

## Reveal das seções

Cada seção com uma entrada própria, ligada ao seu conteúdo (não o mesmo fade-up em todas):
- lista ou grade: stagger curto dos itens (30 a 80 ms entre eles);
- número ou métrica: contagem curta;
- imagem: `clip-path: inset()` abrindo;
- linhas SVG: desenho com `stroke-dashoffset`.

Em React, para "aparecer ao entrar na tela", Motion `whileInView` com `viewport={{ once: true, amount: 0.3 }}`; GSAP fica para pin e scrub.

## Hover (React com Motion)

```tsx
'use client';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export function MagneticButton({ children, ...props }: React.ComponentProps<typeof motion.a>) {
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const fine = typeof window !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || !fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  return (
    <motion.a
      {...props}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}
```

Na raiz da aplicação: `<MotionConfig reducedMotion="user">` desliga transform e layout para quem pediu menos movimento, mantendo opacidade e cor.

Outros hovers da assinatura:
- card com tilt 3D leve (até 6°) e luz seguindo o cursor ([glow.md](glow.md), spotlight);
- ícone que gira ou desloca 2 a 4 px dentro do botão;
- sublinhado que se desenha (`scale-x` de 0 a 1 com `transform-origin: left`).

## Hover sem framework (CSS)

```css
@media (hover: hover) and (pointer: fine) {
  .card { transition: transform var(--dur-fast) var(--ease-out); }
  .card:hover { transform: translateY(-4px); }
}
.btn:active { transform: scale(0.97); }
```

## Regras

- Entradas e respostas com curva de saída; nunca `ease-in` na interface.
- Hover rápido (150 a 250 ms); entradas autorais de 500 a 800 ms; nada de bloquear clique durante a animação.
- Nada de hover magnético, tilt ou spotlight em toque.
- Motion e GSAP nunca no mesmo elemento.
