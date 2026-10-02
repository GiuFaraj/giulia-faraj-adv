# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pessoas físicas e empresas de Vespasiano (MG) e região metropolitana de Belo Horizonte, e de qualquer lugar via atendimento online, que enfrentam uma questão cível, contratual ou de consumo e procuram uma advogada de confiança. Chegam pelo Google (busca local) ou por indicação, geralmente no celular, com uma dúvida concreta e alguma ansiedade sobre o problema. O trabalho delas no site: entender se a advogada atende o seu tipo de caso, sentir confiança e dar o primeiro passo.

## Product Purpose

Site institucional da advogada Giulia Faraj com foco em captação: levar o visitante a iniciar contato pelo WhatsApp (canal principal) ou pelo formulário de e-mail. Sucesso = mensagem recebida que vira reunião online. O fluxo de atendimento é sempre: reunião online → proposta → contrato.

## Positioning

Advogada civilista com formação sólida e perfil internacional: graduada em Direito pela PUC Minas, pós-graduada em Processo Civil e em Contratos, cursou 5 de 8 semestres de Relações Internacionais na PUC Minas e fez intercâmbios na França (francês aplicado à área jurídica) e no Canadá (inglês acadêmico e instrumental). Vasta experiência, foco em direito civil estratégico, bagagem em família, consumidor, trabalhista e empresarial. Atendimento pessoal e direto.

## Operating Context

- Primeiro contato quase sempre pelo celular; WhatsApp com mensagem pré-preenchida.
- Endereço: Vespasiano, Centro (MG). Atendimento em BH e região e online para todo o Brasil.
- Publicidade sujeita ao Provimento OAB 205/2021: sem promessa de resultado, sem captação mercantilista, casos de sucesso apenas anonimizados.

## Capabilities and Constraints

- Áreas: Direito Civil, Contratos, Direito do Consumidor. Público PF e PJ, sem nicho restrito.
- Contato: "Falar no WhatsApp" abre a conversa com mensagem pronta; o formulário monta um e-mail pronto (assunto, corpo e consentimento LGPD) no aplicativo de e-mail do visitante, que só precisa clicar em enviar. Sem backend.
- OAB visível no site; política de privacidade (LGPD) no rodapé.
- Stack existente: React + Vite + Tailwind CSS 4, deploy na Vercel.
- Contato: OAB/MG 232.918, WhatsApp (31) 99773-6303, giuliafaraj3@gmail.com.
- Indefinidos: domínio, revisão final do texto do "Sobre" e da política de privacidade.

## Brand Commitments

- Nome de exibição: Giulia Faraj Advocacia.
- Cores principais confirmadas pela cliente: **azul e marrom**.
- Referência que a cliente aprovou como linguagem visual: https://ramoops.vercel.app (hero em carrossel de 3 banners com fotos tratadas, scroll com parallax, vidro e brilhos).
- Hero com 3 banners, **um por área de atuação** (Civil, Contratos, Consumidor).
- Sem cursor customizado e sem partículas (pedido explícito).
- **Nenhuma menção ou propaganda de escritórios onde ela trabalhou ou trabalha.** O foco é a própria advogada, com o tom mais profissional possível.
- Idiomas não aparecem no site, a pedido da cliente (perdem o foco). Os intercâmbios ficam no "Sobre", em "Vivência internacional".
- Nada de travar o scroll (pin) em seções de conteúdo: prejudica a usabilidade.

## Evidence on Hand

- Fatos autorizados para exibição pública: "vasta experiência" (forma preferida pela cliente; não exibir número de processos nem anos), formação (Direito PUC Minas; pós em Processo Civil e em Contratos; Relações Internacionais PUC Minas, 5 de 8 semestres), intercâmbios na França e no Canadá.
- Retrato profissional fornecido: src/assets/giulia-faraj-adv.jpeg (usado recortado em src/assets/photos/giulia-faraj-adv.webp).
- ~4 depoimentos de clientes existem, mas ainda não foram coletados/autorizados — **não inventar depoimentos**; manter espaço marcado como pendente.
- Fotos de apoio: banco de imagens livre (Unsplash), tratadas em duotone. Nenhuma foto de banco pode se passar pela advogada.

## Product Principles

1. Confiança antes de conversão: clareza e sobriedade convencem mais do que urgência.
2. Um caminho óbvio para o contato em todo momento (WhatsApp primeiro).
3. Linguagem acessível, nunca juridiquês; nunca prometer resultado.
4. Credenciais reais e verificáveis, nada inventado.

## Accessibility & Inclusion

WCAG AA de contraste, inclusive sobre fotos e fundos animados; `prefers-reduced-motion` respeitado; leitura confortável no celular.
