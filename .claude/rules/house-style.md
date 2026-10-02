# Estilo da casa: assinatura visual

Preferência de design do dono deste template, válida em todo projeto ativado com `ai-design`, sem precisar ser pedida. Receitas e versões: skill `signature-effects`.

## Assinatura (fonte da verdade)
- Hero com banner rico: partículas, glow, vidro fosco (glassmorphism), parallax, ícones e desenhos de fundo (SVG, grades, formas).
- Motion em toda tela: entrada, scroll e hover.
- 3D só quando houver objeto 3D de verdade (produto, modelo, cena). Nunca 3D decorativo.
- Esses efeitos são escolha intencional, não decoração a remover.

## Intensidade
- Motion em `MOTION_INTENSITY: 8` (escala da `design-taste-frontend`): reveals coreografados, parallax em camadas, scroll ligado ao progresso, hover com física. Vale em landing, portfólio e marketing.
- Em telas de operação (dashboard, formulário, configurações), a assinatura aparece no cabeçalho, nos estados vazios e nas transições; dados e controles de uso frequente não se movem por estilo.
- Ações de teclado e de alta frequência continuam sem animação.

## Bibliotecas padrão (usar sem pedido; CSS nativo primeiro quando resolver)
| Papel | Biblioteca |
| :--- | :--- |
| Coreografia e scroll | GSAP (ScrollTrigger, SplitText) + Lenis |
| Interface em React | Motion (`motion/react`) |
| Partículas | tsParticles, pacote slim |
| Fundos em shader | Paper Shaders; OGL para shader próprio |
| 3D | Three.js + React Three Fiber |
| Cor | Culori (escalas e realces em OKLCH) |
| Ícones | Lucide (padrão), Phosphor duotone (destaque), Tabler (painéis) |
| Vetor animado | Rive (interativo), Lottie via dotLottie (animação pronta) |

- Em React, Motion cuida de estado, hover e layout; GSAP cuida de timeline, pin e scrub. Cada um em seu componente, sem animar o mesmo elemento com os dois.
- Ícones: as três famílias convivem por papel (Lucide no corpo, Phosphor duotone em destaques, Tabler em painéis), cada uma com espessura de traço única no projeto.
- Ordem: CSS nativo → biblioteca leve → biblioteca pesada. A tabela diz qual biblioteca usar quando o CSS não resolve.
- Todo efeito segue os guarda-corpos de `.claude/rules/motion-guardrails.md` desde o primeiro arquivo, mesmo antes de ela carregar sozinha.

## Precedência
1. Nos itens da assinatura (efeitos do hero, glow, vidro, partículas, parallax, grades e desenhos de fundo, motion, bibliotecas e ícones), este arquivo vence as skills de design: Impeccable, `design-taste-frontend`, `high-end-visual-design`, `redesign-existing-projects`, `animate`, `emil-design-eng`, `motion` e `gsap-*`.
2. Em todo o resto, o Impeccable continua sendo a direção visual principal: tipografia, hierarquia, espaçamento, contraste, cor de marca, composição, cópia e os anti-padrões fora da assinatura (eyebrow, cards iguais, texto em gradiente, paleta roxa genérica de IA).
3. A assinatura é um brief fixado. O Impeccable honra brief fixado acima dos avisos de padrão saturado (`impeccable/SKILL.md`, "The brief wins").
4. `/impeccable quieter`, `distill` e as auditorias não removem itens da assinatura; reduzem o ruído em volta deles.

## Detector do Impeccable
- Execute a assinatura com as técnicas da skill `signature-effects`, que não disparam o detector: glow por camada desfocada ou `filter: drop-shadow`, grade em SVG `<pattern>`, título em cor sólida.
- Se ainda assim o detector apontar um item da assinatura (`dark-glow`, `radial-halo`, `radial-spotlight-glow`, `codex-grid-background`, `shape-assembled-illustration` em desenho de fundo), o efeito é intencional e não deve ser revertido. Registre a exceção mais estreita, só no arquivo afetado, e informe o usuário:
  `.claude/skills/impeccable/scripts/impeccable hooks ignore-value <regra> "*" --file <arquivo> --reason "user confirmed: assinatura visual em .claude/rules/house-style.md"`
- Continua sendo defeito, e deve ser corrigido: contraste, texto ilegível sobre o efeito, conteúdo invisível em repouso, overflow, imagem quebrada.
- Nunca desligue o hook nem use `ignore-rule` para o projeto inteiro.

## Revisão final e documentação (inclusive os subagentes do Impeccable)
- Na revisão (`impeccable-finish-reviewer`, `critique`, `polish`), item da assinatura executado como na skill `signature-effects` não é achado material nem recusa do craft-floor: vidro sobre algo vivo e glow que aponta para o título são efeito específico, não decoração. Aponte só a execução: contraste, desempenho, luz espalhada sem hierarquia, vidro sobre fundo liso.
- Na documentação (`impeccable-documenter`, `/impeccable document`), a assinatura entra no `DESIGN.md` como regra do sistema, como na semente, nunca na linha de itens não canonizados.
