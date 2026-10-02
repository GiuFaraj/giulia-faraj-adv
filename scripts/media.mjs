// Codifica as mídias locais de src/assets/photos/aot (pasta ignorada pelo git) em
// src/assets/media/<cliques>.bin. Os .bin vão para o repositório: sem nome, sem preview.
// O nome de cada arquivo de origem começa com o número de cliques (ex.: 7-nome.gif).
// Sem a pasta de origem (ex.: no deploy), não faz nada e mantém os .bin existentes.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src/assets/photos/aot')
const out = join(root, 'src/assets/media')
const KEY = 'gf-232918'

if (!existsSync(src)) process.exit(0)

const files = readdirSync(src).filter((f) => /^\d+.*\.gif$/i.test(f))
mkdirSync(out, { recursive: true })
for (const f of readdirSync(out)) if (f.endsWith('.bin')) rmSync(join(out, f))

const key = Buffer.from(KEY)
for (const f of files) {
  const clicks = Number(f.match(/^(\d+)/)[1])
  const bytes = readFileSync(join(src, f))
  for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length]
  writeFileSync(join(out, `${clicks}.bin`), bytes)
}
console.log(`media: ${files.length} arquivo(s) codificado(s)`)
