import { useEffect, useRef, useState } from 'react'

// true depois que o elemento entra na tela uma vez
export function useInView(rootMargin = '0px 0px -15% 0px') {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (seen) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { rootMargin })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [seen, rootMargin])
  return [ref, seen]
}
