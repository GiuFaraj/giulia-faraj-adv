---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Surface brief: página única (landing) Giulia Faraj Advocacia

Scope: a página única do site (src/App.jsx e componentes). Mode: Persuade.
Audience: PF e PJ de BH e online, no celular, com uma dúvida concreta. Action: iniciar conversa no WhatsApp (principal) ou formulário.
Proof: vasta experiência, formação (Direito PUC Minas, pós em Processo Civil e Contratos, Relações Internacionais) e intercâmbios na França e no Canadá (autorizados). Sem menção a escritórios e sem idiomas. Depoimentos ainda não autorizados: seção oculta até existirem.
Constraints: Provimento OAB 205/2021; sem cursor customizado, sem partículas; hero de 3 banners, um por área; linguagem do ramoops.vercel.app; azul e marrom.

## Direction contract

THESIS: As linhas de guilhoché que autenticam diplomas, carteiras da OAB e passaportes viram a luz do site: confiança desenhada em linha fina. Recusa o padrão "escritório de advocacia" de foto de martelo, creme e serifa dourada.

OWN-WORLD: Campo noturno azul-tinta, papel de segurança azul-pálido nas seções claras (não creme), nogueira como segundo campo, cognac como única luz. Fotos em duotone tinta/nogueira. Rosetas e faixas de guilhoché em linha de 1px que se desenham e brilham. Vidro fosco em dupla moldura, botões pílula com ícone aninhado, Schibsted Grotesk em escala forte, numerais tabulares.

STORY: Em um segundo o visitante sabe que é uma advogada cível em BH e online e qual das três áreas é a dele; acredita pela vivência real (700 processos, grande escritório, perfil internacional) e pelo rigor visual; age pelo WhatsApp, sempre visível.

FIRST VIEWPORT: Tela cheia escura. Foto da área em duotone ocupando tudo, gradiente tinta da esquerda. À esquerda, título de no máximo 2 linhas com a segunda em cognac, subtítulo de até 20 palavras, CTA cognac "Falar no WhatsApp" com brilho e CTA de vidro "Ver a área". À direita, roseta de guilhoché grande que se desenha a cada troca de banner. Rodapé do hero: três abas com barra de progresso, pausa, setas. Nav flutuante em pílula de vidro.

FORM: Impressão de segurança (guilhoché), posição 4 da lista ordenada, seed b28a5982. Raises: serial de documento só onde a ordem informa (Como funciona); brilho cognac só onde agir; hierarquia por escala; uma linha contínua atravessa o Como funciona; imagens ancoradas em BH.

SIGNATURE INTERACTION: a roseta de guilhoché se redesenha (stroke draw) a cada banner e responde ao scroll; no Como funciona uma única linha de guilhoché é desenhada pelo scroll ligando os quatro momentos. Motion grammar: ease-out (0.23,1,0.32,1), reveals 700ms, UI 160-240ms, GSAP ScrollTrigger + Lenis, tudo desligado em reduced-motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
