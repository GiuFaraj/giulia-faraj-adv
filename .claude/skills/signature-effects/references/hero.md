# Hero e banner: composição das camadas

Sem biblioteca própria: compõe as receitas desta pasta (versões consultadas em 01/10/2026, registradas em cada uma).

O hero da assinatura empilha camadas, cada uma com um papel. Nem toda camada precisa entrar em todo hero, mas o conjunto padrão é: fundo vivo + desenho de fundo + partículas + luz + painel de vidro + conteúdo + ícones. Receitas de cada camada nos outros arquivos desta pasta.

## Ordem das camadas

| z | Camada | Papel | Receita |
| :--- | :--- | :--- | :--- |
| 0 | Fundo vivo (shader ou gradiente em camadas) | Atmosfera, cor da marca | [background.md](background.md) |
| 1 | Grade, formas e desenhos SVG | Estrutura e ritmo, mascarados nas bordas | [background.md](background.md) |
| 2 | Partículas | Profundidade e vida | [particles.md](particles.md) |
| 3 | Luz (glow) | Aponta para o título e a chamada principal | [glow.md](glow.md) |
| 4 | Painel de vidro | Agrupa prova, métrica ou prévia do produto | [glass.md](glass.md) |
| 5 | Conteúdo (título, apoio, chamadas, ícones) | A mensagem | [motion.md](motion.md), [icons.md](icons.md) |

Camadas 0 a 3 ficam num contêiner `aria-hidden="true"` com `pointer-events: none`. O conteúdo é o único que recebe foco e clique.

## Esqueleto

```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__fx" aria-hidden="true">
    <canvas class="hero__shader"></canvas>          <!-- 0 -->
    <svg class="hero__grid">…</svg>                  <!-- 1 -->
    <div class="hero__particles" id="hero-particles"></div> <!-- 2 -->
    <span class="hero__light hero__light--a"></span> <!-- 3 -->
    <span class="hero__light hero__light--b"></span>
  </div>
  <div class="hero__content">
    <h1 id="hero-title" class="hero__title">…</h1>
    <p class="hero__lede">…</p>
    <div class="hero__actions">…</div>
  </div>
  <aside class="hero__panel glass">…</aside>         <!-- 4 -->
</section>
```

```css
:root {
  /* tokens do hero; valores reais vêm da paleta do projeto (color.md) */
  --hero-min-h: 100dvh;
  --hero-pad-block: clamp(5rem, 10vh, 7rem);
  --layer-fx: 0;
  --layer-content: 1;
}

.hero {
  position: relative;
  isolation: isolate;               /* mantém blend e z-index dentro do hero */
  min-height: var(--hero-min-h);    /* nunca 100vh: evita salto no iOS */
  padding-block: var(--hero-pad-block);
  overflow: clip;
}
.hero__fx {
  position: absolute;
  inset: 0;
  z-index: var(--layer-fx);
  pointer-events: none;
}
.hero__fx > * { position: absolute; inset: 0; }
.hero__content,
.hero__panel { position: relative; z-index: var(--layer-content); }
```

## Ordem de carregamento

1. Primeiro frame: título, apoio, chamadas e o gradiente CSS de fundo. Nada disso depende de JavaScript. O título é o LCP: sem `opacity: 0` no HTML inicial.
2. Depois do primeiro paint (`requestIdleCallback`, ou `import()` dinâmico num efeito do cliente): shader, partículas e o parallax.
3. Cada efeito pesado pausa fora da tela (IntersectionObserver ou a opção nativa da biblioteca).

```js
const loadFx = () => Promise.all([
  import('./hero-shader.js').then((m) => m.mount(document.querySelector('.hero__shader'))),
  import('./hero-particles.js').then((m) => m.mount('hero-particles')),
]);
('requestIdleCallback' in window ? requestIdleCallback : setTimeout)(loadFx);
```

## Responsivo e acessibilidade

- Até 768 px: manter fundo, luz e vidro; partículas com menos da metade da densidade ou desligadas; parallax com metade da distância.
- `prefers-reduced-motion: reduce`: shader parado num frame, sem partículas, sem parallax nem Lenis; entrada só com fade curto.
- Contraste do título medido sobre o frame mais claro do fundo. Se não passar AA, um scrim (`linear-gradient` escuro atrás do texto) resolve sem apagar o efeito.
- Em toque (`(hover: none)`), sem efeito que segue o cursor.

## Composição

- Siga o Impeccable na composição: hero centrado só quando a mensagem for o design; o padrão é assimétrico, com conteúdo de um lado e painel de vidro ou objeto do outro.
- A luz (glow) fica atrás do título e da chamada principal. Uma ou duas fontes de luz, não uma em cada canto.
- Desenho de fundo (grade, formas) mascarado com `mask-image` para sumir nas bordas e não competir com o texto.
