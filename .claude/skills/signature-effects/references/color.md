# Cor: escalas e realces em OKLCH com Culori

Versão consultada em 01/10/2026 (npm + Context7): `culori` 4.0.2 (`/evercoder/culori`).

Culori gera os tokens **uma vez**, num script de build ou de setup, e grava CSS custom properties. O componente usa só `var(--...)`; nunca calcula cor em tempo de execução.

## Escala a partir da cor da marca

```js
// scripts/palette.mjs  →  node scripts/palette.mjs > src/styles/palette.css
import { converter, clampChroma, formatHex, formatCss, wcagContrast } from 'culori';

const toOklch = converter('oklch');
const brand = toOklch(process.argv[2] ?? '#e8892b');     // cor da marca, travada no prompt

const steps = [0.97, 0.93, 0.86, 0.76, 0.66, 0.56, 0.46, 0.37, 0.28, 0.2, 0.14];
const names = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const scale = steps.map((l, i) => {
  // croma menor nas pontas para não estourar o gamut
  const c = brand.c * (1 - Math.abs(l - 0.6) * 0.9);
  const color = clampChroma({ mode: 'oklch', l, c, h: brand.h }, 'oklch');
  return [names[i], color];
});

let css = ':root {\n';
for (const [name, color] of scale) {
  css += `  --accent-${name}: ${formatCss(color)}; /* ${formatHex(color)} */\n`;
}
css += '}\n';
process.stdout.write(css);

// conferência de contraste para o texto sobre a cor de destaque
const onAccent = wcagContrast(scale[5][1], '#ffffff') >= 4.5 ? '#ffffff' : formatHex(scale[10][1]);
console.error('--on-accent sugerido:', onAccent);
```

`clampChroma(..., 'oklch')` traz a cor para dentro do sRGB preservando o matiz. `formatCss` grava `oklch(...)`, e o comentário com o hex serve de fallback mental.

## Realces da assinatura

| Token | Derivação | Uso |
| :--- | :--- | :--- |
| `--glow-color` | destaque com L +0.08 e C máximo exibível | luz atrás do título e da chamada |
| `--accent-2` | matiz do destaque ±30° a 60°, mesmo L | segunda fonte de luz, shader |
| `--particle` | destaque com L 0.85, C baixa | partículas e links |
| `--grid-line` | branco (ou preto no claro) com alfa 0.05 a 0.08 | grade SVG |
| `--glass-bg`, `--glass-border` | branco/preto com alfa | vidro ([glass.md](glass.md)) |

Interpolar em OKLCH (`interpolate([a, b], 'oklch')`) mantém os gradientes sem a faixa cinza do meio que aparece em sRGB.

## Regras

- Paleta travada no prompt de design vence: Culori só deriva escalas e realces a partir dela.
- Sem roxo e ciano como padrão (o detector marca `ai-color-palette`); só se a marca pedir.
- Contraste conferido com `wcagContrast` (AA: 4.5 para texto, 3 para texto grande), inclusive sobre o frame mais claro do fundo animado.
- Um destaque principal por página; `--accent-2` aparece só na luz e no shader, não em botões.
