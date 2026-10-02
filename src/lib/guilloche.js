// Geradores de guilhoché: as linhas finas da impressão de segurança
// (diplomas, carteira da OAB, passaportes). Tudo em SVG, calculado uma vez.

const round = (n) => Math.round(n * 10) / 10

function toPath(points) {
  let d = `M${round(points[0][0])} ${round(points[0][1])}`
  for (let i = 1; i < points.length; i++) d += `L${round(points[i][0])} ${round(points[i][1])}`
  return `${d}Z`
}

// Anel de ondas entrelaçadas: várias senoides polares defasadas em torno de um raio.
function ring({ radius, depth, petals, strands, twist = 0, resolution = 10 }) {
  const steps = petals * resolution * 2
  const paths = []
  for (let s = 0; s < strands; s++) {
    const phase = (s / strands) * Math.PI * 2
    const pts = []
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * Math.PI * 2
      const r = radius + depth * Math.sin(petals * t + phase + twist)
      pts.push([r * Math.cos(t), r * Math.sin(t)])
    }
    paths.push(toPath(pts))
  }
  return paths
}

// Roseta central: hipotrocoide (espirógrafo).
function hypotrochoid({ R, r, d, resolution = 900 }) {
  const turns = r / gcd(R, r)
  const pts = []
  const total = Math.PI * 2 * turns
  for (let i = 0; i < resolution; i++) {
    const t = (i / resolution) * total
    pts.push([(R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t), (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)])
  }
  return toPath(pts)
}

function gcd(a, b) {
  return b ? gcd(b, a % b) : a
}

// Roseta completa, centrada em 0,0 num viewBox de -250..250.
export function rosette({ petals = 24, depth = 12, rings = 5 } = {}) {
  const out = []
  for (let k = 0; k < rings; k++) {
    const radius = 70 + k * (150 / Math.max(1, rings - 1))
    out.push(...ring({ radius, depth: depth * (0.75 + k * 0.08), petals: petals + k * 4, strands: 4, twist: k * 0.6 }))
  }
  out.push(hypotrochoid({ R: 60, r: 22, d: 44 }))
  return out
}

// Faixa trançada horizontal: senoides defasadas ao longo da largura (viewBox 0..width x -h..h).
export function band({ width = 1000, amplitude = 18, wavelength = 120, strands = 5, resolution = 6 } = {}) {
  const out = []
  const steps = Math.ceil((width / wavelength) * resolution * 6)
  for (let s = 0; s < strands; s++) {
    const phase = (s / strands) * Math.PI * 2
    let d = ''
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const t = (x / wavelength) * Math.PI * 2
      const y = amplitude * Math.sin(t + phase) * (0.75 + 0.25 * Math.cos(t / 3 - phase))
      d += `${i ? 'L' : 'M'}${round(x)} ${round(y)}`
    }
    out.push(d)
  }
  return out
}
