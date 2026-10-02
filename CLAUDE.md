# Regras de design e implementação de interface

## Fluxo principal: prompt de design
- Sem link do Figma, este é o caminho padrão. Use `prompts/prototyping-prompt.md` como roteiro: levante identidade, paleta, tipografia, atmosfera, motion e seções antes de escrever código.
- Consulte a seção Arsenal do prompt para escolher técnicas e bibliotecas, e aplique sempre os Guarda-corpos técnicos.
- Se o pedido vier incompleto, preencha as lacunas com decisões próprias alinhadas ao nível pedido e informe quais decisões tomou.

## Antes de escrever código
- Identifique a stack pelo `package.json` e siga as convenções existentes: pastas, nomes, bibliotecas de estilo e componentes.
- Se existirem `PRODUCT.md` e `DESIGN.md` na raiz, leia os dois antes de qualquer tela. Se não existirem, sugira `/impeccable init`.
- Para qualquer API de biblioteca ou framework, consulte o Context7 em vez de depender de memória.

## Com link do Figma (secundário)
O protótipo é referência a ser superada, não teto.
1. `get_design_context` no frame informado.
2. `get_variable_defs` para cores, tipografia e espaçamentos.
3. `get_screenshot` como referência visual.
4. Implemente usando os tokens do projeto; se não houver tokens, crie-os a partir das variáveis do Figma antes dos componentes.

## Redesign de projeto existente
- Leia o código atual da tela antes de alterar.
- Mude apresentação, hierarquia, atmosfera e motion. Preserve lógica, estados, rotas, chamadas de API e textos, salvo pedido explícito.

## Tokens e estilo
- Nunca use cor, tamanho de fonte, espaçamento, duração ou easing fixo no componente. Tudo vem dos tokens ou do tema.
- Após o primeiro layout de um projeto novo, extraia paleta, tipografia, raios, sombras, durações e easings para tokens.
- Reutilize componentes existentes antes de criar novos.

## Motion e efeitos
- Consulte `emil-design-eng` antes de decidir qualquer animação: se deve existir, qual propósito, qual curva e duração.
- Ordem de escolha: CSS nativo → biblioteca leve → biblioteca pesada. Justifique cada biblioteca adicionada ao projeto.
- GSAP (skills `gsap-*`) para coreografia de scroll, pin, parallax e timelines; `motion` em React; CSS para microinterações simples.
- Shaders e WebGL: siga a skill `web-shaders`.
- Uma linguagem de motion por projeto: mesmas curvas e durações, vindas dos tokens.
- Componentes prontos (React Bits, Aceternity UI, Magic UI) só para peças tecnicamente difíceis, nunca para layout, hero ou seções; adapte aos tokens e ao motion até não serem reconhecíveis.
- Auditoria de animações existentes: sugira ao usuário rodar `/review-animations` (a skill só é acionada por comando dele).

## Verificação obrigatória ao terminar uma tela
- Suba o projeto e use o Playwright para capturar a tela em 375, 768 e 1440 px.
- Animações: capture início, meio e fim dos reveals e role a página; confira o console.
- Performance: nas seções com efeito pesado, meça com o Chrome DevTools MCP; meta de 60 fps.
- Com link do Figma, compare com o `get_screenshot` e liste as diferenças antes de declarar pronto.
- Rode `/impeccable critique` na tela entregue e `/impeccable polish` antes de entregar.

## Acessibilidade mínima
- HTML semântico, foco visível, contraste AA (nível intermediário das diretrizes de acessibilidade web, WCAG), inclusive sobre fundos animados.
- `prefers-reduced-motion`: desligar parallax, partículas, scroll suave e reveals; manter só fades curtos.
- Mobile: sem hover magnético nem spotlight de cursor em toque.
