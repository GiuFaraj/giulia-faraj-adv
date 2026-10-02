import { useMemo } from 'react'
import { band, rosette } from '../lib/guilloche'

// Roseta que se desenha ao montar. Troque a `key` para redesenhar.
export function Rosette({ petals, depth, rings, className = '', strokeClassName = 'stroke-cognac', draw = true, width = 0.8 }) {
  const paths = useMemo(() => rosette({ petals, depth, rings }), [petals, depth, rings])
  return (
    <svg viewBox="-250 -250 500 500" className={className} fill="none" aria-hidden="true">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength="1"
          className={`${strokeClassName} ${draw ? 'guilloche-draw' : ''}`}
          strokeWidth={width}
          vectorEffect="non-scaling-stroke"
          style={{ '--i': i }}
        />
      ))}
    </svg>
  )
}

// Faixa trançada. `pathProps` marca os fios que o scroll desenha; sem `nonScaling` o pathLength vale no desenho.
export function Band({ className = '', strokeClassName = 'stroke-cognac', strands = 5, amplitude = 18, wavelength = 120, width = 1, nonScaling = true, pathProps }) {
  const paths = useMemo(() => band({ strands, amplitude, wavelength }), [strands, amplitude, wavelength])
  return (
    <svg viewBox={`0 ${-amplitude - 4} 1000 ${amplitude * 2 + 8}`} preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength="1" className={strokeClassName} strokeWidth={width} vectorEffect={nonScaling ? 'non-scaling-stroke' : undefined} {...pathProps?.(i)} />
      ))}
    </svg>
  )
}
