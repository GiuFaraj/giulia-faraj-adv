import { useEffect, useRef, useState } from 'react'

// Detalhe do rodapé. As mídias ficam codificadas em assets/media/<n>.bin (geradas por
// scripts/media.mjs); <n> é o número de cliques no "©" que dispara cada uma.

const files = import.meta.glob('../assets/media/*.bin', { query: '?url', import: 'default', eager: true })
const gifs = Object.entries(files)
  .map(([path, url]) => ({ clicks: Number(path.split('/').pop().match(/^(\d+)/)?.[1]), url }))
  .filter((g) => g.clicks > 0)
  .sort((a, b) => a.clicks - b.clicks)

const KEY = new TextEncoder().encode('gf-232918') // mesma chave de scripts/media.mjs

function decode(buffer) {
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.length; i++) bytes[i] ^= KEY[i % KEY.length]
  return bytes
}

const LOOPS = 3
const IDLE_RESET_MS = 4000

// Soma os atrasos dos quadros (Graphic Control Extension). Atrasos < 2cs viram 10cs, como nos navegadores.
function gifDuration(buffer) {
  const b = new Uint8Array(buffer)
  let cs = 0
  for (let i = 0; i < b.length - 6; i++) {
    if (b[i] === 0x21 && b[i + 1] === 0xf9 && b[i + 2] === 0x04) {
      const delay = b[i + 4] | (b[i + 5] << 8)
      cs += delay < 2 ? 10 : delay
      i += 7
    }
  }
  return cs * 10 || 1500
}

const cache = new Map()
function load(gif) {
  if (!cache.has(gif.url)) {
    cache.set(
      gif.url,
      fetch(gif.url)
        .then((r) => r.arrayBuffer())
        .then((buffer) => {
          const bytes = decode(buffer)
          return { blob: new Blob([bytes], { type: 'image/gif' }), ms: gifDuration(bytes.buffer) }
        }),
    )
  }
  return cache.get(gif.url)
}

export default function FooterMark() {
  const dialog = useRef(null)
  const count = useRef(0)
  const idle = useRef(null)
  const [playing, setPlaying] = useState(null) // { src, clicks }

  useEffect(() => () => clearTimeout(idle.current), [])

  async function play(gif) {
    const { blob, ms } = await load(gif)
    const src = URL.createObjectURL(blob) // URL nova a cada vez: o GIF começa do primeiro quadro
    setPlaying({ src, clicks: gif.clicks })
    dialog.current.showModal()
    window.__lenis?.stop()
    setTimeout(() => {
      dialog.current?.close()
      window.__lenis?.start()
      URL.revokeObjectURL(src)
      setPlaying(null)
      if (gif.clicks === gifs.at(-1)?.clicks) count.current = 0
      armReset()
    }, ms * LOOPS)
  }

  function armReset() {
    clearTimeout(idle.current)
    idle.current = setTimeout(() => {
      count.current = 0
    }, IDLE_RESET_MS)
  }

  function onClick() {
    count.current += 1
    armReset()
    const next = gifs.find((g) => g.clicks >= count.current)
    if (next && next.clicks - count.current <= 3) load(next)
    const hit = gifs.find((g) => g.clicks === count.current)
    if (hit) {
      clearTimeout(idle.current)
      play(hit)
    }
  }

  return (
    <>
      <span onClick={onClick} className="select-none">
        ©
      </span>
      <dialog
        ref={dialog}
        onCancel={(e) => e.preventDefault()}
        aria-label="Animação"
        className="m-auto max-w-none overflow-visible bg-transparent p-0 backdrop:bg-abyss/85 backdrop:backdrop-blur-md"
      >
        {playing && (
          <div className="rounded-(--radius-shell) bg-paper/8 p-1.5 ring-1 ring-cognac/40 shadow-glow">
            <img src={playing.src} alt="" className="block max-h-[70svh] w-[min(88vw,40rem)] rounded-(--radius-core) object-contain" />
          </div>
        )}
      </dialog>
    </>
  )
}
