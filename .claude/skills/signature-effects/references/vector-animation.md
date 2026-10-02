# Vetor animado: Rive e dotLottie

Versões consultadas em 01/10/2026 (npm + Context7): `@rive-app/react-canvas` 4.36.0 e `@rive-app/canvas` 2.44.0 (`/rive-app/rive-react`), `@lottiefiles/dotlottie-react` 0.19.16 e `@lottiefiles/dotlottie-web` 0.80.0 (`/lottiefiles/dotlottie-web`). `lottie-web` 5.13.0 só em projeto que já o usa.

## Escolha

| Precisa de | Use |
| :--- | :--- |
| Animação que reage (hover, clique, estado, scroll) | Rive (máquina de estados) |
| Animação pronta, linear, exportada do After Effects | dotLottie (`.lottie`, menor que o JSON) |
| Desenho de linha simples, ícone que gira | CSS ou GSAP; nenhum dos dois |

Os arquivos `.riv` e `.lottie` são assets do projeto: se não existirem, deixe o espaço marcado e liste o que precisa ser produzido. Nunca substitua por SVG improvisado.

## Rive (interativo)

```tsx
'use client';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';

export function HeroMascot() {
  const { rive, RiveComponent } = useRive(
    {
      src: '/rive/mascot.riv',
      stateMachines: 'Main',
      autoplay: true,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    },
    { shouldResizeCanvasToContainer: true, useDevicePixelRatio: true },
  );
  const hover = useStateMachineInput(rive, 'Main', 'hover', false);

  return (
    <div
      className="hero__mascot"
      role="img"
      aria-label="Descrição do que a animação mostra"
      onPointerEnter={() => hover && (hover.value = true)}
      onPointerLeave={() => hover && (hover.value = false)}
    >
      <RiveComponent />
    </div>
  );
}
```

`useStateMachineInput` está marcado como obsoleto na 4.x: em arquivos novos, prefira data binding (view models) se o `.riv` já o usar. Com `prefers-reduced-motion`, `autoplay: false` e mostre o estado de repouso.

## dotLottie (animação pronta)

```tsx
'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useReducedMotion } from 'motion/react';

export function FeatureAnimation() {
  const reduced = useReducedMotion() ?? false;
  return (
    <DotLottieReact
      src="/lottie/feature.lottie"
      autoplay={!reduced}
      loop={!reduced}
      aria-label="Descrição do que a animação mostra"
    />
  );
}
```

O dotLottie congela sozinho fora da tela (`renderConfig.freezeOnOffscreen`, ligado por padrão); não desligue. `playOnHover` serve para ícones que só animam no hover.

Sem framework:

```js
import { DotLottie } from '@lottiefiles/dotlottie-web';

new DotLottie({
  canvas: document.querySelector('#feature-anim'),
  src: '/lottie/feature.lottie',
  autoplay: !matchMedia('(prefers-reduced-motion: reduce)').matches,
  loop: true,
});
```

## Regras

- Carregar depois do primeiro paint e só quando o elemento se aproxima da tela.
- Todo vetor animado com nome acessível (`aria-label`) ou `aria-hidden` se for decorativo.
- Loop infinito só em elemento de fundo; animação de conteúdo toca uma vez.
