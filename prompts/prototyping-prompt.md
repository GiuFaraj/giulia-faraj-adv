# Template — Prompt de Design Rico

> Caminho principal do template para criar ou redesenhar telas com o Claude Code. Preencha os `[colchetes]`, apague os comentários `//` e as seções que não se aplicarem. Cole no chat do Claude Code ou use como resposta no `/impeccable init` para gerar o `PRODUCT.md` e o `DESIGN.md`.
>
> Figma é opcional: se houver um protótipo, ele entra como **referência a ser superada**, não como teto.

---

## Lógica do template

Funil: **ambição** → **identidade** → **restrições travadas** → **execução** (tipografia, layout, atmosfera, motion, seções) → **liberdade dentro dos limites**.

Regra de ouro: **trave pouco, especifique muito, libere o resto.** Trave só identidade real (cores, estrutura, função). Motion e efeitos são especificados em detalhe: são o que separa um site de uma experiência.

---

## TEMPLATE

```
Crie um(a) [tipo: landing page / site single-page / dashboard / app] [tema: dark / light] com o nível de um designer sênior de estúdio premiado — um site de [âncora de valor: US$ 20 mil / nível Awwwards Site of the Day]. Precisa parecer [3 sensações: vivo, luminoso, imersivo]; nunca [anti-padrões: estático, genérico, template]. Referências de nível: [3–5 por nome: Linear, Vercel, Stripe, Apple, sites Awwwards]. Serve para [uma frase: público e objetivo].

// REDESIGN (apagar se for projeto novo)
BASE ATUAL: [tela/rota existente ou link do Figma]. Trate como ponto de partida a ser superado: mantenha conteúdo, rotas, estados e lógica; refaça apresentação, hierarquia, atmosfera e motion. [O que funciona e deve ficar]. [O que incomoda e deve sumir].

IDENTIDADE: [3–4 adjetivos de personalidade]. [Princípio central — ex.: cada efeito tem propósito; luz guia o olhar]. [Metáfora — ex.: luz atravessando vidro no escuro].

PALETA TRAVADA (não desviar): [papel #hex; papel #hex; ...]. [Cor(es) de luz/brilho e onde aparecem]. [Regra da base — ex.: fundo escuro profundo; a cor é luz, não preenchimento].

TIPOGRAFIA: [fonte primária] para [usos]; [fonte secundária/mono] para [usos]. [Títulos: tamanho/peso, fluidos com clamp()]. [Corpo: tamanho/peso + line-height]. [Assinatura — ex.: títulos revelados palavra por palavra, texto com shimmer metálico].

LAYOUT: [estrutura macro — largura máxima, ritmo de espaçamento]. [Header/navegação e estado ativo]. [Responsivo: mobile-first e como colapsa].

ATMOSFERA E LUZ:
- Luz ambiente: [ex.: gradientes radiais em camadas, aurora lenta ao fundo, shader de malha em OGL].
- Spotlight: [ex.: brilho radial que segue o cursor, revelando conteúdo com mask-image].
- Glow: [ex.: borda com conic-gradient girando via @property; brilho difuso atrás de CTAs (chamadas para ação)].
- Profundidade: [ex.: vidro fosco com backdrop-filter, sombras em camadas, grain com filtro SVG].
- Elemento de destaque: [opcional — ex.: partículas (tsParticles), shader WebGL, objeto 3D (Three.js só se 3D real)].

MOTION (é o que faz valer [âncora de valor]): vivo, nunca barulhento; físico, suavizado, com propósito.
- Entrada: [ex.: hero com reveal em sequência — título quebrado por palavra (SplitType/SplitText), depois subtítulo e CTA].
- Scroll: [ex.: scroll suave (Lenis); seções com reveal; parallax em camadas; seção presa (pin) com progresso ligado ao scroll (GSAP ScrollTrigger ou scroll-driven animations)].
- Hover: [ex.: botões magnéticos; cards com tilt 3D e brilho seguindo o mouse].
- Microinterações: [ex.: contadores, sublinhados que se desenham, ícones com mola via linear()].
- Transições: [ex.: morph entre estados/páginas com View Transitions API; clip-path em reveals].
- Timing: microinterações 150–250 ms; entradas 400–800 ms; easing ease-out expo ou mola. Nada linear.

SEÇÕES (nesta ordem):
1. [Nome] — [função + elementos + efeito/motion específico da seção].
2. [Nome] — [função + elementos + efeito/motion específico da seção].
// repetir para cada seção

PADRÃO DE QUALIDADE: alinhamento preciso, ritmo de espaçamento, equilíbrio óptico, profundidade. Se alguma tela passar por template gratuito, falhou.

LIBERDADE: total em [composição, micro-layouts, motivos visuais, detalhes-assinatura, escolha de técnicas do arsenal], desde que respeite [N] restrições: (1) a paleta exata, (2) as seções e sua função. Surpreenda — [chamada final — ex.: um site que as pessoas gravam a tela para compartilhar].
```

---

## Arsenal

Referência para preencher o template e para o Claude escolher dentro da liberdade dada. Prioridade: **CSS nativo → biblioteca leve → biblioteca pesada**, só subindo quando o efeito exigir.

### Técnicas de CSS

| Técnica | Efeito |
| :--- | :--- |
| Scroll-driven animations (`animation-timeline: view()`) | Reveal e parallax nativos, sem JavaScript |
| View Transitions API + `@starting-style` | Morph entre páginas/estados; animação de entrada de elementos |
| `@property` + `conic-gradient` | Borda com brilho girando, gradiente animado |
| `backdrop-filter` | Vidro fosco (glassmorphism) |
| `mask-image` | Bordas em degradê, spotlight que revela conteúdo |
| `clip-path` animado | Reveal em formas, transições geométricas |
| `mix-blend-mode` | Texto que inverte sobre imagem, luz que soma com o fundo |
| Filtros SVG (`feTurbulence`, `feDisplacementMap`) | Grain, distorção líquida, efeito gooey |
| Transformações 3D (`perspective`, `preserve-3d`) | Tilt, flip, camadas de profundidade |
| Easing `linear()` | Mola e quique em CSS puro |
| `background-clip: text` animado | Texto com gradiente em brilho (shimmer), reflexo metálico |

### Bibliotecas

| Biblioteca | Uso | Peso |
| :--- | :--- | :--- |
| GSAP (ScrollTrigger, SplitText) | Coreografia, timeline, scroll, parallax, pin | Médio |
| Motion | Animação declarativa em React, gestos, layout | Leve |
| Lenis | Scroll suave com inércia; base do parallax | Muito leve |
| SplitType | Quebrar texto em linhas/palavras/letras | Muito leve |
| Anime.js | Alternativa leve ao GSAP, boa para SVG | Leve |
| OGL | WebGL mínimo: shaders, glow, fundos | Leve |
| tsParticles | Partículas, constelações, confete (usar pacote slim) | Médio |
| Three.js (+ React Three Fiber) | 3D real, pós-processamento com bloom | Pesado — só com 3D de verdade |
| Barba.js | Transições de página em sites multipágina (sem SPA) | Leve |
| Embla Carousel | Carrossel com física, base para sliders próprios | Leve |

### Componentes prontos

Só em projetos React + Tailwind, instalados pelo comando do shadcn (o código entra no projeto e é editável). Prioridade: **React Bits → Aceternity UI → Magic UI**.

Regra: componente pronto só para **peças tecnicamente difíceis** (fundo WebGL, texto que se desmonta, distorção). **Nunca** para layout, hero ou seções — isso dá a cara do projeto. Todo componente usado deve ser adaptado aos tokens e ao motion do projeto até não ser reconhecível como o original.

---

## Guarda-corpos técnicos (não remover)

Cole junto do prompt.

```
REGRAS TÉCNICAS:
- Animar só transform, opacity e filter; nunca width, height, top ou left. Meta: 60 fps.
- Ordem de escolha: CSS nativo → biblioteca leve → biblioteca pesada. Justificar cada biblioteca adicionada.
- Uma linguagem de motion por projeto: mesmas curvas e durações em tokens.
- Canvas, WebGL e partículas carregados sob demanda e pausados fora da tela (IntersectionObserver).
- prefers-reduced-motion: desligar parallax, partículas, scroll suave e reveals; manter só fades curtos.
- Mobile: reduzir camadas de efeito; sem hover magnético nem spotlight de cursor em toque.
- Texto do hero legível no primeiro frame; animação por cima, nunca bloqueando conteúdo.
- Contraste de texto garantido sobre fundos animados.
```

---

## Alavancas

| Bloco | Função | Erro comum |
| :--- | :--- | :--- |
| Abertura | Teto de qualidade e anti-padrão | Adjetivos vazios sem referência concreta |
| Redesign | Ponto de partida a superar | Copiar o atual em vez de superá-lo |
| Identidade | Alma e critério de decisão | Descrever aparência em vez de intenção |
| Paleta travada | Base visual inegociável | Cor sem papel e sem regra de uso |
| Tipografia | Hierarquia e assinatura | Esquecer line-height e usos de cada fonte |
| Layout | Estrutura e navegação | Não definir o responsivo |
| Atmosfera e luz | Profundidade e ambiente | Efeito sem propósito, espalhado por tudo |
| Motion | Transforma site em experiência | Pedir "animações" sem física, timing e propósito |
| Seções | Conteúdo concreto em ordem | Seção sem elementos nem comportamento |
| Qualidade + liberdade | Eleva e libera criatividade | Travar tudo ou não travar nada |

---

## Princípios de redação

1. **Referencie por nome, não por adjetivo.** "Nível Linear" empurra mais que "premium".
2. **Ancore o valor** na abertura e repita no bloco de motion.
3. **Descreva efeito com física e propósito.** "Botão magnético que se inclina ao cursor e sobe com sombra suave em 200 ms" vale mais que "animação no hover".
4. **Luz é hierarquia.** Brilho vai onde o olhar deve ir, não em tudo.
5. **Nomeie a técnica quando souber** (ex.: "borda com @property girando"); deixe livre quando não souber.
6. **Termine com um desafio.** O fechamento define a postura criativa.

---

## Uso no Claude Code

- **Itere por seção.** Se vier genérico, peça seção por seção, colando só o bloco relevante.
- **Skills que entram sozinhas:** `emil-design-eng` decide se e como animar; `gsap-*` para scroll e timelines; `motion` em React; `web-shaders` para WebGL; Impeccable e Taste para direção visual.
- **Verificação de motion:** screenshot não mostra animação. Pedir ao Claude para usar o Playwright capturando início, meio e fim dos reveals e rolando a página; checar o console.
- **Performance:** se o Chrome DevTools MCP estiver ativo, pedir medição de FPS e LCP (tempo até o maior conteúdo aparecer) nas seções com efeito pesado.
- **Tokens:** após o primeiro layout, extrair paleta, tipografia, raios, sombras, durações e easings para tokens.
- **Refino:** `/impeccable animate` e `/impeccable delight` para motion; `/review-animations` para auditar; `/impeccable polish` antes de entregar.