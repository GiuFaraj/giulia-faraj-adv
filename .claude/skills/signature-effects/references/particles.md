# Partículas: tsParticles slim

Versões consultadas em 01/10/2026 (npm + Context7): `@tsparticles/engine`, `@tsparticles/slim` e `@tsparticles/react` 4.4.0 (`/tsparticles/tsparticles`, `/tsparticles/react`).

Sempre o pacote **slim** (`loadSlim`): traz movimento, links e interações comuns sem o peso do `loadFull`. Partículas são camada de fundo do hero (z 2), nunca o conteúdo.

## Opções base (compartilhadas)

```ts
import type { ISourceOptions } from '@tsparticles/engine';

export const particlesOptions = (color: string, reduced: boolean): ISourceOptions => ({
  fullScreen: { enable: false },        // fica dentro do hero, não na página inteira
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  detectRetina: true,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,         // pausa fora da tela, nativo da biblioteca
  motion: { disable: reduced, reduce: { factor: 4, value: true } },
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: color },            // token da paleta, ex.: var resolvida via getComputedStyle
    opacity: { value: { min: 0.15, max: 0.5 } },
    size: { value: { min: 1, max: 2.5 } },
    links: { enable: true, distance: 140, color, opacity: 0.12, width: 1 },
    move: { enable: !reduced, speed: 0.4, direction: 'none', outModes: { default: 'out' } },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },   // desligar em toque, ver abaixo
    modes: { grab: { distance: 160, links: { opacity: 0.3 } } },
  },
  responsive: [
    { maxWidth: 768, options: { particles: { number: { value: 24 } }, interactivity: { events: { onHover: { enable: false } } } } },
  ],
});
```

Densidade, velocidade e opacidade baixas: as partículas dão profundidade, não chamam atenção. Movimento lento (0.3 a 0.6).

## React

Na 4.x o engine é registrado pelo `ParticlesProvider` (prop `init`); o `initParticlesEngine` da 3.x não existe mais, embora ainda apareça em documentação antiga. Conferido no pacote instalado em 01/10/2026.

```tsx
'use client';
import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useReducedMotion } from 'motion/react';
import { particlesOptions } from './particles-options';

// função estável, fora do componente: registra o pacote slim uma vez
const initEngine = async (engine: Engine) => { await loadSlim(engine); };

export function HeroParticles({ color }: { color: string }) {
  const reduced = useReducedMotion() ?? false;
  const options = useMemo(() => particlesOptions(color, reduced), [color, reduced]);
  if (reduced) return null;                        // reduced motion: sem partículas
  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="hero-particles" className="hero__particles" options={options} />
    </ParticlesProvider>
  );
}
```

Com várias instâncias na página, coloque um único `ParticlesProvider` mais acima na árvore; `useParticlesProvider().loaded` diz quando o engine está pronto.

## Sem framework

```js
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './particles-options.js';

export async function mount(id) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  await loadSlim(tsParticles);
  const color = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim();
  return tsParticles.load({ id, options: particlesOptions(color, false) });
}
```

## Regras

- Carregar depois do primeiro paint (ver [hero.md](hero.md)).
- Em toque, sem interação de hover (`responsive` acima ou `matchMedia('(hover: none)')`).
- `prefers-reduced-motion: reduce`: não renderizar.
- Cor vinda do token `--particle`, derivado da paleta com Culori.
