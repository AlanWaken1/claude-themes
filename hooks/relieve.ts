import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Relieve: slate monochrome, contour lines that breathe slowly.
export const { theme: relieveColors, problems: relieveProblems } = makeColors({
  label: 'Relieve',
  roles: { accent: '#4a6a8a', danger: '#b04a42', success: '#4f8463', warning: '#b5872e', pro: '#6f6a9a' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e4e7ea',
        'surface-1': '#ebedf0',
        'surface-2': '#f3f4f6',
        'text-primary': '#14181d',
        'text-secondary': '#3a414a',
        'text-muted': '#59616b',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#121417',
        'surface-1': '#171a1e',
        'surface-2': '#1c2025',
        'surface-3': '#21252a',
        'text-primary': '#e8ebee',
        'text-secondary': '#c2c8ce',
        'text-muted': '#98a0a9',
      },
    },
  },
})

// Closed wavy rings around a peak, like contour lines on a map.
function peak(cx: number, cy: number, rings: number, step: number, seed: number): string {
  let out = ''
  for (let r = 1; r <= rings; r++) {
    const base = r * step
    let d = ''
    for (let k = 0; k <= 72; k++) {
      const t = (k / 72) * Math.PI * 2
      const wobble =
        Math.sin(t * 3 + seed) * (6 + r * 1.6) +
        Math.sin(t * 5 - seed * 1.7 + r * 0.3) * (3 + r * 0.8) +
        Math.cos(t * 2 + seed * 0.5) * r * 2.2
      const rad = base + wobble
      const x = (cx + Math.cos(t) * rad * 1.15).toFixed(1)
      const y = (cy + Math.sin(t) * rad).toFixed(1)
      d += `${k === 0 ? 'M' : 'L'}${x} ${y}`
    }
    const cls = r % 5 === 0 ? 'line major' : 'line'
    out += `<path class="${cls}" style="animation-delay:-${(r * 2.5).toFixed(1)}s" d="${d}Z"/>`
  }
  return out
}

export const RELIEVE_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.ground { fill: #e4e7ea; }
.line { fill: none; stroke: #2f3a46; stroke-width: 1; opacity: 0.16; vector-effect: non-scaling-stroke;
  transform-box: view-box; animation: breathe 36s ease-in-out infinite alternate; }
.major { stroke-width: 1.6; opacity: 0.24; }
.p1 .line { transform-origin: 180px 140px; }
.p2 .line { transform-origin: 1060px 690px; }
.p2 .line { animation-duration: 44s; }
.fog { fill: url(#fog); opacity: 0.55; animation: fog 80s ease-in-out infinite alternate; }
.f0 { stop-color: #f3f4f6; }
@keyframes breathe { from { transform: scale(1) rotate(0deg); } to { transform: scale(1.06) rotate(2deg); } }
@keyframes fog { from { transform: translate(-120px, 0px); } to { transform: translate(160px, -40px); } }
@media (prefers-color-scheme: dark) {
  .ground { fill: #121417; }
  .line { stroke: #b9c4d0; opacity: 0.09; }
  .major { opacity: 0.15; }
  .f0 { stop-color: #1c2025; }
  .fog { opacity: 0.5; }
}
</style>
<defs>
<radialGradient id="fog" cx="50%" cy="50%" r="50%">
<stop offset="0" class="f0"/><stop offset="1" class="f0" stop-opacity="0"/>
</radialGradient>
</defs>
<rect class="ground" width="1200" height="800"/>
<g class="p1">${peak(180, 140, 16, 26, 0.7)}</g>
<g class="p2">${peak(1060, 690, 18, 26, 2.3)}</g>
<ellipse class="fog" cx="600" cy="400" rx="560" ry="340"/>
</svg>`

export const RELIEVE_LOOK: ThemeSetArgs = {
  colors: relieveColors,
  backdrop: { scene: 'relieve', glass: { blur: 20, opacity: 0.7 } },
}

export const RELIEVE_STYLE: ThemeSetArgs['style'] = {
  Text: { fontFamily: ['sans'], fontSize: 15, lineHeight: 23 },
  Heading: { fontFamily: ['sans'], fontWeight: 'semibold', letterSpacing: 0.3 },
  UserMessage: {
    backgroundColor: 'surface-3',
    color: 'text-primary',
    radius: 14,
    paddingX: 16,
    paddingY: 10,
  },
  AssistantMessage: {
    backgroundColor: 'surface-1',
    color: 'text-primary',
    radius: 14,
    padding: 16,
  },
  ToolUse: { backgroundColor: 'surface-2', color: 'text-secondary', fontFamily: ['code'], radius: 10, paddingX: 10 },
}
