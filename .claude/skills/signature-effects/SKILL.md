---
name: signature-effects
description: Receitas da assinatura visual deste template, com a biblioteca padrão de cada efeito. Use sempre que for criar, redesenhar ou refinar hero, banner, fundo (shader, gradiente, grade, formas SVG), partículas, glow, vidro fosco (glassmorphism), parallax, motion de entrada, scroll ou hover, objeto 3D, ícones ou escala de cor, em qualquer stack de front-end. Use também quando o pedido for uma landing page ou disser "mais vivo", "mais rico" ou "mais premium".
---

# Efeitos da assinatura

A assinatura do template: hero com banner rico (partículas, glow, vidro fosco, parallax, ícones e desenhos de fundo), motion em toda tela (entrada, scroll e hover) e 3D só com objeto 3D de verdade. Os efeitos entram por padrão, sem pedido (`.claude/rules/house-style.md`). Esta skill diz **como** executá-los; tipografia, hierarquia, espaçamento e contraste seguem o Impeccable.

## Bibliotecas padrão

CSS nativo primeiro quando resolver. Quando não resolver, use esta tabela sem pedir.

| Papel | Biblioteca | Receita |
| :--- | :--- | :--- |
| Coreografia, timeline, pin, parallax | GSAP + ScrollTrigger + SplitText | [parallax.md](references/parallax.md), [motion.md](references/motion.md) |
| Scroll suave | Lenis | [parallax.md](references/parallax.md) |
| Interface em React (estado, hover, layout) | Motion (`motion/react`) | [motion.md](references/motion.md) |
| Partículas | tsParticles slim | [particles.md](references/particles.md) |
| Fundo em shader | Paper Shaders; OGL para shader próprio | [background.md](references/background.md) |
| 3D real | Three.js + React Three Fiber | [three-d.md](references/three-d.md) |
| Cor | Culori (OKLCH) | [color.md](references/color.md) |
| Ícones | Lucide (padrão), Phosphor duotone (destaque), Tabler (painéis) | [icons.md](references/icons.md) |
| Vetor animado | Rive (interativo), dotLottie (animação pronta) | [vector-animation.md](references/vector-animation.md) |

## Receitas por categoria

- Hero e banner (composição das camadas): [hero.md](references/hero.md)
- Fundo, grades e formas SVG, shaders: [background.md](references/background.md)
- Partículas: [particles.md](references/particles.md)
- Glow e luz: [glow.md](references/glow.md)
- Vidro fosco: [glass.md](references/glass.md)
- Parallax e scroll: [parallax.md](references/parallax.md)
- Entrada e hover: [motion.md](references/motion.md)
- 3D: [three-d.md](references/three-d.md)
- Ícones: [icons.md](references/icons.md)
- Cor: [color.md](references/color.md)
- Rive e Lottie: [vector-animation.md](references/vector-animation.md)
- Técnicas de CSS, bibliotecas alternativas e componentes prontos: [css-techniques.md](references/css-techniques.md)

Leia só as receitas do efeito em questão. Para um hero completo, comece por `hero.md`.

## Regras de execução

1. Intensidade de motion alta (`MOTION_INTENSITY: 8`) em landing, portfólio e marketing. Em telas de operação, os efeitos ficam no cabeçalho, nos estados vazios e nas transições.
2. Cada efeito tem papel na hierarquia: luz e glow apontam para o título e a chamada principal, não para tudo.
3. A cor dos efeitos vem dos tokens do projeto (gerados com Culori), nunca de roxo ou ciano por reflexo.
4. Técnicas escolhidas para não disparar o detector do Impeccable: glow por camada desfocada ou `filter: drop-shadow`, nunca `box-shadow`/`text-shadow` colorido; grade em SVG `<pattern>`, não em `linear-gradient`; título em cor sólida, sem texto em gradiente.
5. Cor, duração, curva, raio e desfoque em tokens CSS (`--glow-*`, `--glass-*`, `--ease-*`, `--dur-*`), nunca fixos no componente.
6. Guarda-corpos técnicos em `.claude/rules/motion-guardrails.md`: 60 fps, `prefers-reduced-motion`, sem efeito de cursor em toque, conteúdo visível no primeiro frame.
7. Em React, Motion e GSAP ficam em componentes separados e nunca animam o mesmo elemento.
8. Antes de instalar, confira o `package.json` e consulte o Context7: as versões das receitas são de 01/10/2026.

## Verificação

Playwright em 375, 768 e 1440 px, capturando início, meio e fim dos reveals e rolando a página; console limpo. Role com a roda do mouse, em passos e com pausa: com Lenis, capturas depois da tecla `End`, de âncora (`#secao`) ou de página inteira (que não dispara `whileInView` nem ScrollTrigger) mostram seções vazias e nav fora do lugar sem que haja defeito. Para confirmar um reveal, meça a `opacity` do elemento depois da rolagem. Nas seções com shader, partículas ou 3D, medir com o Chrome DevTools MCP (meta de 60 fps). Conferir também com `prefers-reduced-motion: reduce` emulado.
