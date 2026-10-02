// Gera src/styles/palette.css a partir das sementes OKLCH (azul + marrom).
// Usa culori para: converter, garantir contraste WCAG AA ajustando a luminosidade
// dos textos e derivar as variações de brilho (glow) dentro da própria paleta.
// Rodar: npm run palette
import { clampChroma, formatHex, oklch, wcagContrast } from 'culori'
import { writeFileSync } from 'node:fs'

const c = (l, ch, h) => ({ mode: 'oklch', l, c: ch, h })

// Sementes: azuis seguram a estrutura, marrons dão calor, cognac é a única luz.
const seeds = {
  abyss: c(0.13, 0.03, 258),
  ink: c(0.17, 0.042, 258),
  'ink-2': c(0.22, 0.055, 258),
  navy: c(0.31, 0.085, 258),
  steel: c(0.52, 0.075, 250),
  azure: c(0.76, 0.075, 243),
  mist: c(0.9, 0.022, 245),
  paper: c(0.968, 0.008, 240), // papel de segurança azul-pálido, não creme
  'paper-2': c(0.935, 0.014, 240),
  'paper-3': c(0.895, 0.02, 242),
  walnut: c(0.23, 0.038, 52),
  'walnut-2': c(0.29, 0.048, 54),
  umber: c(0.47, 0.065, 56),
  sand: c(0.86, 0.035, 70),
  cognac: c(0.75, 0.115, 63),
  'cognac-hi': c(0.84, 0.095, 72), // brilho: mais claro, um pouco menos croma
  'cognac-deep': c(0.5, 0.1, 55), // acento em texto pequeno sobre papel
}

// Pares texto/fundo que precisam passar. O texto é ajustado em L até atingir a meta.
const checks = [
  ['ink', 'paper', 7, 'texto principal sobre papel'],
  ['navy', 'paper', 4.5, 'títulos azul sobre papel'],
  ['steel', 'paper', 4.5, 'texto secundário sobre papel'],
  ['umber', 'paper', 4.5, 'texto marrom sobre papel'],
  ['cognac-deep', 'paper', 4.5, 'acento em texto sobre papel'],
  ['cognac-deep', 'paper-2', 4.5, 'acento em texto sobre papel 2'],
  ['mist', 'ink', 7, 'texto sobre tinta'],
  ['azure', 'ink', 4.5, 'texto secundário frio sobre tinta'],
  ['cognac', 'ink', 4.5, 'acento sobre tinta'],
  ['sand', 'walnut', 4.5, 'texto sobre nogueira'],
  ['cognac', 'walnut', 4.5, 'acento sobre nogueira'],
  ['ink', 'cognac', 4.5, 'rótulo do botão cognac'],
]

const toHex = (col) => formatHex(clampChroma(col, 'oklch'))

function fit(fgKey, bgKey, target) {
  const bg = seeds[bgKey]
  const fg = { ...seeds[fgKey] }
  const darker = bg.l > 0.6
  let guard = 0
  while (wcagContrast(toHex(fg), toHex(bg)) < target && guard++ < 200) {
    fg.l = Math.min(1, Math.max(0, fg.l + (darker ? -0.005 : 0.005)))
  }
  seeds[fgKey] = fg
  return wcagContrast(toHex(fg), toHex(bg))
}

const report = checks.map(([fg, bg, target, label]) => {
  const ratio = fit(fg, bg, target)
  return { label, pair: `${fg} / ${bg}`, ratio: ratio.toFixed(2), target, ok: ratio >= target }
})

// Segunda passada: os ajustes podem ter alterado um fundo usado em outro par.
for (const r of report) {
  const [fg, bg] = r.pair.split(' / ')
  const ratio = wcagContrast(toHex(seeds[fg]), toHex(seeds[bg]))
  r.ratio = ratio.toFixed(2)
  r.ok = ratio >= r.target
}

const fmt = (col) => {
  const o = oklch(clampChroma(col, 'oklch'))
  return `oklch(${(o.l * 100).toFixed(1)}% ${o.c.toFixed(3)} ${(o.h ?? 0).toFixed(1)})`
}

const lines = Object.entries(seeds).map(([k, v]) => `  --color-${k}: ${fmt(v)}; /* ${toHex(v)} */`)

const css = `/* Gerado por scripts/palette.mjs (culori). Não editar à mão: ajuste as sementes e rode npm run palette. */
@theme {
${lines.join('\n')}
}
`
writeFileSync(new URL('../src/styles/palette.css', import.meta.url), css)

console.table(report)
if (report.some((r) => !r.ok)) {
  console.error('Algum par não atingiu o contraste mínimo.')
  process.exit(1)
}
console.log('src/styles/palette.css gerado.')
