import { useEffect, useState } from 'react'

const KEY = 'gf-theme'

function read() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Tema das superfícies claras. Campos tinta e nogueira não mudam.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || read() || systemTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (read()) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setTheme(systemTheme())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // armazenamento indisponível: o tema vale só para esta visita
    }
  }

  return [theme, toggle]
}
