# Parallax e scroll: GSAP ScrollTrigger + Lenis

Versões consultadas em 01/10/2026 (npm + Context7): `gsap` 3.15.0 (`/websites/gsap_v3`; ScrollTrigger e SplitText vêm no próprio pacote `gsap`, gratuitos desde a 3.13), `@gsap/react` 2.1.2 (hook `useGSAP`), `lenis` 1.3.26 (`/darkroomengineering/lenis`). Para detalhes de API, as skills `gsap-scrolltrigger`, `gsap-react` e `gsap-performance`.

CSS nativo primeiro: um reveal simples ao entrar na tela pode ser `animation-timeline: view()` (com fallback estático). GSAP entra para parallax em camadas, pin, scrub e timelines.

## Lenis ligado ao ticker do GSAP (sem framework)

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';           // obrigatório

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({ autoRaf: false });   // respectReducedMotion já vem ligado
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000); // segundos → milissegundos
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(tick); lenis.destroy(); };
}
```

Áreas com rolagem própria (modal, lista, mapa): `data-lenis-prevent` no elemento.

## Parallax em camadas

Marque cada camada com a velocidade relativa; o conteúdo fica parado (`0`).

```html
<div class="hero__fx" aria-hidden="true">
  <div class="hero__shader" data-depth="0.15"></div>
  <svg class="hero__grid" data-depth="0.3">…</svg>
  <span class="hero__light hero__light--a" data-depth="0.5"></span>
</div>
```

```js
export function initParallax(root = document) {
  const mm = gsap.matchMedia();
  mm.add(
    { motion: '(prefers-reduced-motion: no-preference)', small: '(max-width: 768px)' },
    ({ conditions }) => {
      if (!conditions.motion) return;                 // reduced motion: nada de parallax
      const factor = conditions.small ? 0.5 : 1;
      gsap.utils.toArray(root.querySelectorAll('[data-depth]')).forEach((layer) => {
        const depth = Number(layer.dataset.depth) * factor;
        gsap.to(layer, {
          yPercent: depth * 40,
          ease: 'none',                                // scrub: progresso linear ao scroll
          scrollTrigger: { trigger: layer.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
  );
  return () => mm.revert();
}
```

`ease: 'none'` só em animação presa ao scroll (scrub); em entradas, sempre curva de saída (ver [motion.md](motion.md)).

## Saída do hero

```js
gsap.to('.hero__content', {
  yPercent: -12, autoAlpha: 0.2, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
});
```

## Seção presa (pin)

Siga o esqueleto canônico da `design-taste-frontend` (seção 5.A e 5.B): `start: 'top top'`, `pin: true`, `scrub`. Nunca anime o elemento preso; anime os filhos.

## React / Next.js

```tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  useGSAP(() => {
    const tick = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  });
  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
```

Parallax em React: `useGSAP(() => initParallax(container.current), { scope: container })`. O `useGSAP` faz o revert no desmonte.

## Regras

- Nunca `window.addEventListener('scroll')` para animar.
- Só `transform` e `opacity` nas camadas; o `filter` das luzes fica fixo.
- `ScrollTrigger.refresh()` depois de carregar fontes e imagens que mudam a altura da página.
- Reduced motion: sem Lenis (a própria biblioteca desliga), sem parallax, sem scrub; o conteúdo aparece no lugar.
