# Fundo: gradientes, grades, formas SVG e shaders

Versões consultadas em 01/10/2026 (npm + Context7): `@paper-design/shaders` e `@paper-design/shaders-react` 0.0.81 (`/paper-design/shaders`), `ogl` 1.0.11 (`/oframe/ogl`). Paper Shaders está em versão 0.0.x: confira a API no Context7 antes de usar.

## Escolha

| Precisa de | Use |
| :--- | :--- |
| Fundo vivo sem JavaScript | Gradientes radiais em camadas (CSS) |
| Grade, linhas, formas geométricas | SVG inline com `<pattern>` e `mask-image` |
| Gradiente de malha animado, ruído, ondas prontos | Paper Shaders |
| Shader próprio (efeito que não existe pronto) | OGL + skill `web-shaders` |

## Gradientes em camadas (CSS)

```css
.hero__bg {
  background:
    radial-gradient(60% 50% at 75% 25%, oklch(from var(--accent) l c h / 0.30), transparent 70%),
    radial-gradient(45% 40% at 15% 80%, oklch(from var(--accent-2) l c h / 0.20), transparent 70%),
    var(--surface-base);
}
```

Opacidade moderada (até ~0.35) e no máximo duas fontes: halo saturado e forte em fundo escuro dispara `radial-halo` no detector do Impeccable.

## Grade e formas em SVG

Grade em SVG `<pattern>`, não em `linear-gradient` repetido (este dispara `codex-grid-background`).

```html
<svg class="hero__grid" aria-hidden="true" width="100%" height="100%">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="currentColor" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
</svg>
```

```css
.hero__grid {
  color: var(--grid-line);   /* ex.: oklch(1 0 0 / 0.06) no escuro */
  mask-image: radial-gradient(closest-side at 60% 40%, #000, transparent);
}
```

Formas: poucas e geométricas (círculos concêntricos, arcos, linhas de órbita, pontos em malha), em `stroke` fino com a cor da grade. Evite cena ilustrada montada com dezenas de primitivas: o detector marca `shape-assembled-illustration`, e ilustração de verdade é asset, não SVG improvisado. Para animar o desenho de linhas, `stroke-dasharray` + `stroke-dashoffset` (CSS ou GSAP DrawSVG).

## Paper Shaders

```jsx
import { MeshGradient } from '@paper-design/shaders-react';

export function HeroShader({ colors, reduced }) {
  return (
    <MeshGradient
      colors={colors}          // 2 a 10 cores, da paleta (color.md)
      distortion={0.8}
      swirl={0.3}
      speed={reduced ? 0 : 0.2}
      style={{ position: 'absolute', inset: 0 }}
    />
  );
}
```

Sem React: `ShaderMount` de `@paper-design/shaders` com `meshGradientFragmentShader`; `u_time`, `u_resolution` e `u_pixelRatio` são injetados pela biblioteca e não devem ser passados.

## OGL para shader próprio

Triângulo que cobre a tela, sem câmera. Siga a skill `web-shaders` para o GLSL.

```js
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export function mount(canvasParent, fragment, { reduced = false } = {}) {
  const renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 2), alpha: true });
  const gl = renderer.gl;
  canvasParent.appendChild(gl.canvas);

  const program = new Program(gl, {
    vertex: /* glsl */ `
      attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 0, 1); }`,
    fragment,
    uniforms: { uTime: { value: 0 } },
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  const resize = () => renderer.setSize(canvasParent.clientWidth, canvasParent.clientHeight);
  addEventListener('resize', resize);
  resize();

  let raf = 0;
  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);                 // nunca dois loops ao mesmo tempo
    if (visible && !reduced) raf = requestAnimationFrame(loop);
  });
  io.observe(canvasParent);

  function loop(t) {
    program.uniforms.uTime.value = t * 0.001;
    renderer.render({ scene: mesh });
    if (visible && !reduced) raf = requestAnimationFrame(loop);
  }
  loop(0);

  return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize); gl.getExtension('WEBGL_lose_context')?.loseContext(); };
}
```

Com `prefers-reduced-motion`, renderize um frame e pare (`reduced: true`).
