# Vidro fosco (glassmorphism)

Sem biblioteca: CSS nativo (`backdrop-filter`, suporte amplo desde 2024). Testado no detector do Impeccable v0.1.5 em 01/10/2026: passa.

O vidro só funciona com algo vivo atrás: luz, shader, partículas ou grade. Sobre fundo liso ele vira um retângulo cinza. Use para agrupar algo concreto (prova, métrica, prévia do produto, navegação flutuante), não como fundo de todo card.

## Tokens

```css
:root {
  --glass-bg: oklch(1 0 0 / 0.06);
  --glass-border: oklch(1 0 0 / 0.14);
  --glass-highlight: oklch(1 0 0 / 0.18);
  --glass-blur: 20px;
  --glass-saturate: 1.4;
  --glass-shadow: 0 24px 60px -24px oklch(0 0 0 / 0.6);
  --glass-fallback: oklch(0.22 0.02 250 / 0.92);   /* superfície sólida da paleta */
}
/* no tema claro: --glass-bg: oklch(1 0 0 / 0.55); --glass-border: oklch(0 0 0 / 0.08); */
```

## Painel

```css
.glass {
  position: relative;
  background: var(--glass-bg);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: inset 0 1px 0 var(--glass-highlight), var(--glass-shadow);
  padding: var(--space-5);
}

/* reflexo suave na borda superior */
.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, var(--glass-highlight), transparent 40%);
  opacity: 0.5;
  pointer-events: none;
}

/* sem suporte ou com preferência por menos transparência: superfície sólida */
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: var(--glass-fallback); }
}
@media (prefers-reduced-transparency: reduce) {
  .glass { background: var(--glass-fallback); backdrop-filter: none; -webkit-backdrop-filter: none; }
}
```

## Regras

- Área delimitada: `backdrop-filter` em painel, nav flutuante ou card de destaque, nunca num contêiner que rola inteiro. Até três superfícies de vidro visíveis ao mesmo tempo.
- Contraste do texto medido sobre a parte mais clara do que passa atrás. Se não passar AA, aumente `--glass-bg` ou use o `--glass-fallback`.
- Não anime o `blur` do `backdrop-filter`; anime `transform` e `opacity` do painel.
- Mobile: `--glass-blur` menor (12px) se o profiling mostrar queda de frames.
- O raio do vidro segue a escala de raios do projeto (uma escala por página).
