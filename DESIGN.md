---
name: Giulia Faraj Advocacia
description: Confiança desenhada em linha fina. Campo azul-tinta, papel de segurança, nogueira e uma única luz cognac.
colors:
  abyss: "oklch(13% 0.030 258)"
  ink: "oklch(17% 0.042 258)"
  ink-2: "oklch(22% 0.055 258)"
  navy: "oklch(31% 0.085 258)"
  steel: "oklch(52% 0.075 250)"
  azure: "oklch(76% 0.075 243)"
  mist: "oklch(90% 0.022 245)"
  paper: "oklch(96.8% 0.008 240)"
  paper-2: "oklch(93.5% 0.014 240)"
  paper-3: "oklch(89.5% 0.020 242)"
  walnut: "oklch(23% 0.038 52)"
  walnut-2: "oklch(29% 0.048 54)"
  umber: "oklch(47% 0.065 56)"
  sand: "oklch(86% 0.035 70)"
  duotone: "oklch(71% 0.058 61)"
  cognac: "oklch(75% 0.115 63)"
  cognac-hi: "oklch(84% 0.095 72)"
  cognac-deep: "oklch(50% 0.100 55)"
  surface-dark: "oklch(19% 0.045 258)"
  surface-2-dark: "oklch(22% 0.05 258)"
  surface-3-dark: "oklch(26% 0.055 258)"
typography:
  wordmark-outline:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 19vw, 17rem)"
    fontWeight: 600
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  display:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  subhead:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"ss01\", \"cv11\""
  body:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "\"ss01\", \"cv11\""
  label:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
  numeral:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\", \"lnum\""
rounded:
  field: "0.875rem"
  core: "1.625rem"
  shell: "2rem"
  pill: "999px"
spacing:
  shell-gap: "6px"
  gutter: "16px"
  gutter-wide: "32px"
  card: "28px"
  card-wide: "36px"
  section: "96px"
  section-wide: "144px"
  container: "84rem"
components:
  pill-cognac:
    backgroundColor: "{colors.cognac}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 8px 0 24px"
  pill-cognac-hover:
    backgroundColor: "{colors.cognac-hi}"
    textColor: "{colors.ink}"
  pill-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 8px 0 24px"
  pill-ink-hover:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
  pill-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 6px 0 20px"
  pill-paper-hover:
    backgroundColor: "{colors.mist}"
  pill-glass:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 8px 0 24px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "48px"
    padding: "0 16px"
  chip-topic:
    textColor: "{colors.steel}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  nav-pill:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "64px"
    padding: "0 8px 0 24px"
  step-marker:
    backgroundColor: "{colors.walnut}"
    textColor: "{colors.sand}"
    rounded: "{rounded.pill}"
    size: "44px"
  step-marker-reached:
    backgroundColor: "{colors.cognac}"
    textColor: "{colors.ink}"
  frame-shell:
    rounded: "{rounded.shell}"
    padding: "{spacing.shell-gap}"
  frame-core:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.core}"
    padding: "{spacing.card}"
---

# Design System: Giulia Faraj Advocacia

## Overview

**Creative North Star: "O Papel de Segurança"**

As linhas de guilhoché que autenticam diplomas, carteiras da OAB e passaportes viraram a luz do sistema: confiança desenhada em linha fina. O campo é noturno, azul-tinta; as seções claras são papel de segurança azul-pálido, nunca creme; a nogueira é o segundo campo, quente e escuro; o cognac é a única luz. Rosetas e faixas trançadas em linha de 1px se desenham na tela e brilham de leve, como a impressão de um documento que só um original carrega.

A densidade é baixa e a escala é forte. Hierarquia vem do tamanho do tipo, não de cor nem de rótulos: títulos grandes em Schibsted Grotesk com tracking negativo, texto de apoio em tom apagado, numerais tabulares onde há número. Superfícies são vidro fosco em dupla moldura (casca translúcida, núcleo sólido ou vidro), cantos generosos, botões pílula com ícone aninhado em seu próprio círculo. Fotografia só entra em duotone tinta/nogueira, nunca colorida: foto em escala de cinza multiplicada sobre a nogueira clara `duotone`, sombras levantadas por uma camada tinta em lighten.

O movimento é uma gramática, não enfeite: ease-out longo (cubic-bezier(0.23, 1, 0.32, 1)), revelações de 700ms, UI de 160 a 240ms, linhas que se desenham por stroke, parallax em camadas guiado pelo scroll (GSAP ScrollTrigger + Lenis). Tudo se reduz a mudanças de opacidade e cor em `prefers-reduced-motion`. O sistema recusa o padrão "escritório de advocacia": martelo, creme, serifa dourada.

**Key Characteristics:**
- Campo azul-tinta com seções em papel de segurança azul-pálido e um campo nogueira.
- Cognac como única luz: ação, conquista e ornamento de guilhoché.
- Guilhoché (rosetas e faixas) em linha fina de 1px, que se desenha.
- Vidro fosco em dupla moldura; pílulas com ícone aninhado.
- Uma família tipográfica, escala forte, numerais tabulares.
- Fotos sempre em duotone tinta/nogueira.
- Tema claro e escuro: as superfícies "papel" mudam; tinta e nogueira são fixas.

## Colors

Uma paleta de azuis-tinta frios contra uma família quente de nogueira e cognac, gerada em OKLCH por `scripts/palette.mjs` (culori) e verificada em WCAG AA; o OKLCH é a fonte normativa.

### Primary
- **Cognac** (`cognac`): a única luz. Preenche o CTA principal (pílula "Falar no WhatsApp"), a segunda linha dos títulos de hero e de contato, a barra de progresso do carrossel, a etapa alcançada no Como funciona, o traço das rosetas sobre campo escuro, o anel de foco e a seleção de texto.
- **Cognac Claro** (`cognac-hi`): hover do CTA cognac e ponto quente do gradiente da borda giratória.
- **Cognac Profundo** (`cognac-deep`): o cognac legível sobre papel. Texto de destaque (`fg-accent`) no tema claro, mensagens de erro, traço das rosetas e anéis de nível sobre fundo claro, cor do cursor e do checkbox.

### Secondary
- **Nogueira** (`walnut`): o segundo campo, fundo da seção Como funciona.
- **Nogueira Média** (`walnut-2`): brilho radial dentro do campo nogueira.
- **Areia** (`sand`): texto e contorno sobre nogueira; nunca superfície clara de seção.
- **Úmbria** (`umber`): tom médio da família quente, para apoios sobre nogueira.
- **Nogueira Clara de Duotone** (`duotone`): base de toda foto em duotone; vira as luzes da imagem. Nunca é superfície nem texto.

### Neutral
- **Abismo** (`abyss`): fundo do rodapé, o ponto mais escuro do site.
- **Tinta** (`ink`): o campo noturno. Fundo do corpo, do hero, do Sobre e do Contato; texto sobre cognac e sobre papel.
- **Tinta 2** (`ink-2`): camada de luz do duotone (lighten) e base do bloco com borda giratória.
- **Marinho** (`navy`): hover da pílula tinta, traço do guilhoché e contorno da palavra vazada no tema claro, luz do duotone nos cartões de área.
- **Aço** (`steel`): texto apagado (`fg-muted`) no tema claro, cor da barra de rolagem.
- **Azul Celeste** (`azure`): texto apagado no tema escuro, ícones de verificação sobre tinta, traço de guilhoché frio no Contato e no rodapé.
- **Névoa** (`mist`): texto corrido sobre tinta; hover da pílula papel.
- **Papel** (`paper`), **Papel 2** (`paper-2`), **Papel 3** (`paper-3`): as três superfícies do tema claro (`surface`, `surface-2`, `surface-3`); papel também é o texto de títulos sobre campos escuros.
- **Superfícies escuras** (`surface-dark`, `surface-2-dark`, `surface-3-dark`): as mesmas três superfícies no tema escuro.

Linhas e véus são derivados com alfa, não cores novas: linha clara `navy / 0.14`, linha escura `mist / 0.12`, guilhoché sobre papel `navy / 0.16` (claro) e `azure / 0.16` (escuro).

### Named Rules
**The One Light Rule.** Cognac é a única cor quente luminosa do sistema. Nenhum segundo acento (verde, vermelho, dourado) entra; erros também falam em cognac profundo.

**The Security Paper Rule.** Seções claras são papel azul-pálido (`paper`, `paper-2`, `paper-3`). Creme e bege nunca são superfície; a areia existe só como texto sobre nogueira.

**The Fixed Field Rule.** Tinta e nogueira não mudam com o tema. Só as superfícies semânticas (`surface`, `fg`, `fg-muted`, `fg-accent`, `line`) trocam entre claro e escuro.

## Typography

**Display Font:** Schibsted Grotesk Variable (com ui-sans-serif, system-ui)
**Body Font:** Schibsted Grotesk Variable (com ui-sans-serif, system-ui)

**Character:** Uma única grotesca editorial, firme e contemporânea, que carrega a hierarquia pela escala e pelo tracking negativo. Recursos `ss01` e `cv11` ligados no corpo; numerais tabulares e alinhados onde houver número.

### Hierarchy
- **Wordmark vazado** (600, clamp até 17rem, 0.86): uma palavra gigante em contorno de 1.5px que o scroll preenche. Uma por página.
- **Display** (500, clamp(2.6rem, 5.4vw, 5.25rem), 1.02): título do banner do hero, no máximo duas linhas, a segunda em cognac.
- **Title** (500, clamp(2.1rem, 4vw, 3.75rem), 1.05): título de cada seção, com largura limitada entre 14ch e 20ch.
- **Headline** (500, 1.875rem a 2.25rem, -0.025em): título de cartão de área.
- **Subhead** (500, 1.5rem, -0.02em): títulos de etapa e de subseção ("Formação").
- **Lead** (400, clamp(1.05rem, 1.3vw, 1.25rem), 1.6): subtítulos, em tom apagado, 34rem a 58ch.
- **Body** (400, 1rem, 1.625): parágrafos, entre 30ch e 46ch nos cartões.
- **Label** (500, 0.875rem): links de navegação, rótulos de campo, chips.

### Named Rules
**The Scale Not Labels Rule.** Hierarquia é feita por tamanho e peso. Seções abrem direto no título; não há sobretítulo, kicker ou rótulo em caixa alta acima dele.

**The Tabular Numeral Rule.** Todo número que informa (telefone, OAB, etapas) usa numerais tabulares e alinhados.

## Layout

Página única em faixas de largura total que alternam campo escuro e papel claro (tinta, papel, papel 2, tinta, papel, nogueira, tinta, abismo). Cada faixa declara seu tom para que a navegação flutuante troque de vidro. O conteúdo vive num contêiner de 84rem com calha de 16px no celular e 32px a partir de 640px.

O ritmo vertical das seções é 96px no celular e 144px a partir de 640px. Grades assimétricas em frações: 7/5 e 5/7 para texto e prova, 5/6 para retrato e cartão, 6/6 no contato. Abaixo de 1024px tudo vira coluna única empilhada; o palco fixo das áreas (pin com troca por clip-path) só existe em desktop sem redução de movimento.

O hero ocupa a tela inteira (100svh, mínimo 44rem), com o texto à esquerda sobre gradiente tinta e a roseta à direita, sangrando para fora da borda.

## Elevation & Depth

Profundidade vem de vidro fosco e de sombras longas, difusas e tingidas de azul-tinta, nunca de sombra preta dura. Sobre campos escuros o vidro é tinta translúcida (42%) com desfoque de 22px; sobre papel é branco a 55% com desfoque de 22px. Um grão fixo a 5% de opacidade cobre toda a página. A dupla moldura (casca translúcida de 6px com anel de 1px, núcleo com raio concêntrico) é o principal recurso de elevação.

### Shadow Vocabulary
- **Lift** (`0 30px 60px -30px oklch(13% 0.03 258 / 0.55), 0 8px 18px -10px oklch(13% 0.03 258 / 0.35)`): vidro tinta, pílula tinta, retrato, núcleo do formulário.
- **Soft** (`0 24px 48px -28px oklch(31% 0.085 258 / 0.35)`): núcleos sobre papel, vidro claro, nav clara.
- **Glow** (`0 10px 36px -10px oklch(75% 0.115 63 / 0.7), 0 2px 10px -2px oklch(84% 0.095 72 / 0.45)`): CTA cognac, etapa alcançada, confirmação de envio.
- **Inset highlight** (`inset 0 1px 0 oklch(100% 0 0 / 0.14)`): fio de luz no topo do vidro tinta.

### Named Rules
**The Glow Means Act Rule.** O brilho cognac marca só ação ou conquista: o CTA, a etapa alcançada, a confirmação. A borda cognac giratória existe em um único lugar (o bloco de WhatsApp do Contato).

**The Line Glow Rule.** Linhas de guilhoché sobre campo escuro ganham um halo cognac de 4 a 10px (drop-shadow); sobre papel ficam secas, em `navy / 0.16`.

## Shapes

Cantos generosos e concêntricos. A casca tem 2rem e o núcleo tem 2rem menos o recuo de 6px (1.625rem), para que as curvas fiquem paralelas. Ação e marcação são pílulas ou círculos completos: botões, chips, marcadores de etapa, botões de ícone (44 a 48px). Campos de formulário e blocos internos menores (itens de formação, divulgação de privacidade) têm 0.875rem. Bordas são fios de 1px em alfa, nunca contornos pesados.

A geometria-assinatura é o guilhoché: rosetas (pétalas, profundidade e anéis paramétricos) e faixas trançadas de 3 a 9 fios, geradas em `src/lib/guilloche.js`, sempre em traço de 0.6 a 1px sem escala. Imagens e painéis entram por clip-path com o mesmo raio de 2rem.

## Components

### Buttons
Pílula com ícone aninhado: o rótulo à esquerda e o ícone dentro de um círculo próprio colado à borda direita.
- **Shape:** pílula completa (999px); alturas de 56px (padrão) e 44px (compacta); círculo do ícone de 40px e 32px.
- **Cognac:** fundo cognac, texto tinta, sombra glow. O CTA de WhatsApp, sempre.
- **Tinta:** fundo tinta, texto papel, sombra lift; inverte para papel no tema escuro. Envio do formulário e CTAs dentro de cartões claros.
- **Papel:** fundo papel, texto tinta. CTA da nav sobre campo escuro.
- **Vidro:** vidro tinta com texto papel. Ação secundária sobre foto.
- **Hover / Focus:** troca de fundo em 240ms com ease-out; o círculo do ícone desliza 2px para cima e para a direita; pressionar escala a 0.97; foco com anel cognac de 2px e recuo de 3px.
- **Ícone (circular):** 44 a 48px, vidro tinta ou papel sólido, pressionar a 0.95.

### Chips
- **Style:** pílula com fio de 1px na cor de linha, texto apagado de 14px, padding 6px 14px. Sem preenchimento.
- **State:** apenas informativos (tópicos de cada área); não são filtros.

### Cards / Containers
- **Corner Style:** dupla moldura, casca 2rem e núcleo 1.625rem.
- **Background:** casca em `surface-3` a 40 a 60% com anel de linha (claro) ou papel a 5 a 10% com anel papel a 10 a 15% (escuro); núcleo em `surface` sólido, vidro claro ou vidro tinta.
- **Shadow Strategy:** soft no claro, lift no escuro (ver Elevation & Depth).
- **Border:** anel de 1px em alfa.
- **Internal Padding:** 28px no celular, 36px em diante (até 44px no Sobre).

### Inputs / Fields
- **Style:** fio de 1px na cor de linha, fundo `surface` a 70%, raio 0.875rem, altura 48px, padding horizontal 16px, texto de 15.7px.
- **Focus:** borda passa a `fg-accent` e um halo cognac a 20% de 4px; transição de 240ms.
- **Error:** borda e mensagem em cognac profundo com ícone de alerta; o primeiro campo inválido recebe foco. Nunca vermelho.

### Navigation
- **Style:** pílula flutuante de 64px fixa no topo, largura do contêiner, com roseta de 32px, nome em 1.05rem semibold e links de 14px medium. Sobre campo escuro é vidro tinta com links em névoa a 75%; sobre seção clara é papel a 92% com anel de linha, sombra soft e desfoque, links em `fg` a 80%. A pílula amostra a seção sob ela e troca de tom em 240ms.
- **Mobile:** botão de menu circular de 44px abre véu tinta a 85% com desfoque; links de 36px entram em cascata de 60ms.

### Roseta de guilhoché (assinatura)
Ornamento SVG em linhas de 0.6 a 1px que se desenha (stroke-dashoffset de 1 a 0 em 2200ms, 70ms entre linhas). Cognac com halo sobre campo escuro; cognac profundo, marinho ou `guilloche-paper` sobre papel. No hero ela se redesenha a cada banner; no selo de prova envolve um disco com o número; em campos de fundo gira com o scroll.

### Faixa e linha de processo
Faixa trançada de guilhoché atravessa seções claras como textura e, no Como funciona, uma única linha é desenhada pelo scroll ligando quatro marcadores circulares numerados que acendem em cognac ao serem alcançados.

## Do's and Don'ts

### Do:
- **Do** reservar o fundo cognac e a sombra glow para o CTA de WhatsApp e para estados de conquista (etapa alcançada, envio confirmado).
- **Do** usar cognac profundo para texto e traço de destaque sobre papel, e cognac pleno sobre tinta e nogueira.
- **Do** tratar toda foto em duotone: foto em escala de cinza com mix-blend-multiply sobre `duotone`, depois uma camada `ink-2` (nos cartões de área, `navy`) com mix-blend-lighten.
- **Do** compor cartões em dupla moldura com raios concêntricos (2rem por fora, 1.625rem por dentro, 6px de recuo).
- **Do** desenhar guilhoché em traço de 1px ou menos, sem escala de traço, e animá-lo por stroke-dashoffset.
- **Do** usar numerais tabulares em todo número que informa.
- **Do** declarar o tom de cada seção (claro ou escuro) para que a navegação flutuante acompanhe.
- **Do** desligar parallax, scrub e desenho em `prefers-reduced-motion`, mantendo o estado final visível.
- **Don't** prender o scroll da página (pin) em seções de conteúdo; sequências de cartões usam trilho horizontal com scroll-snap, setas e abas.

### Don't:
- **Don't** usar creme, bege ou marfim como superfície de seção; o papel é azul-pálido.
- **Don't** usar serifa, dourado metálico ou imagem de martelo e balança.
- **Don't** introduzir um segundo acento, nem vermelho para erro.
- **Don't** colocar sobretítulo, kicker ou rótulo em caixa alta acima dos títulos.
- **Don't** usar foto colorida sem duotone.
- **Don't** usar sombra preta dura ou deslocada; sombras são longas, difusas e tingidas de tinta.
- **Don't** repetir a borda cognac giratória fora do bloco de WhatsApp do Contato.
- **Don't** usar cursor customizado nem partículas.
