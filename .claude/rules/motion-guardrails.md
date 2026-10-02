---
paths:
  - "**/*.{html,htm,css,scss,sass,less}"
  - "**/*.{js,jsx,mjs,ts,tsx}"
  - "**/*.{vue,svelte,astro,mdx}"
  - "**/*.{glsl,wgsl,frag,vert}"
---

# Guarda-corpos técnicos de motion e efeitos

Valem para todo efeito em arquivo de front-end, inclusive os da assinatura visual.

- Animar só `transform`, `opacity` e `filter`; nunca `width`, `height`, `top` ou `left`. Meta: 60 fps.
- Ordem de escolha: CSS nativo → biblioteca leve → biblioteca pesada. Justificar cada biblioteca adicionada.
- Uma linguagem de motion por projeto: mesmas curvas e durações, em tokens.
- Canvas, WebGL e partículas carregados sob demanda e pausados fora da tela (IntersectionObserver ou a opção nativa da biblioteca).
- `prefers-reduced-motion`: desligar parallax, partículas, scroll suave e reveals; manter só fades curtos.
- Mobile: reduzir camadas de efeito; sem hover magnético nem spotlight de cursor em toque (`@media (hover: hover) and (pointer: fine)`).
- Texto do hero legível no primeiro frame; animação por cima, nunca bloqueando conteúdo. Conteúdo visível no estado padrão, para que um script com falha não esconda a página.
- Contraste de texto garantido sobre fundos animados (AA), medido no frame mais claro do efeito.
- `backdrop-filter` só em áreas delimitadas; nunca em contêiner que rola inteiro.
- Grain e ruído em pseudo-elemento fixo com `pointer-events: none`, nunca em contêiner que rola.
- `devicePixelRatio` limitado a 2 em canvas e WebGL.
