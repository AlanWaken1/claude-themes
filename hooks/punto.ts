import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Punto: monochrome, a dot-matrix field, one red signal light.
export const { theme: puntoColors, problems: puntoProblems } = makeColors({
  label: 'Punto',
  roles: { accent: '#e0302a', danger: '#b8232b', success: '#3e9a62', warning: '#d39a1c', pro: '#7f8fb0' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e8e8e5',
        'surface-1': '#efefec',
        'surface-2': '#f6f6f4',
        'text-primary': '#0c0c0c',
        'text-secondary': '#383838',
        'text-muted': '#595959',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#050505',
        'surface-1': '#0d0d0d',
        'surface-2': '#141414',
        'surface-3': '#1a1a1a',
        'text-primary': '#f4f4f4',
        'text-secondary': '#c6c6c6',
        'text-muted': '#999999',
      },
    },
  },
})

// A ring of 24 dots that light one by one, a second each, like a slow clock.
export const RING = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2 - Math.PI / 2
  const x = (100 + Math.cos(a) * 70).toFixed(1)
  const y = (100 + Math.sin(a) * 70).toFixed(1)
  return `<circle class="tick" cx="${x}" cy="${y}" r="4" style="animation-delay:${i}s"/>`
}).join('')

// A small dot-matrix bar chart, still, along the lower left.
export const BARS = [3, 5, 2, 6, 4, 7, 3, 5]
  .map((h, col) =>
    Array.from({ length: h }, (_, row) => `<circle class="bar" cx="${8 + col * 14}" cy="${112 - row * 14}" r="3.5"/>`).join(''),
  )
  .join('')

export const PUNTO_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.ground { fill: #e8e8e5; }
.dot { fill: #0c0c0c; opacity: 0.13; }
.tick { fill: #0c0c0c; opacity: 0.16; animation: tick 24s linear infinite; }
.bar { fill: #0c0c0c; opacity: 0.22; }
.rec { fill: #e0302a; opacity: 0.9; animation: breathe 4s ease-in-out infinite; }
@keyframes tick { 0% { opacity: 0.75; } 12% { opacity: 0.16; } 100% { opacity: 0.16; } }
@keyframes breathe { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.35; } }
@media (prefers-color-scheme: dark) {
  .ground { fill: #050505; }
  .dot { fill: #f4f4f4; opacity: 0.1; }
  .tick { fill: #f4f4f4; }
  .bar { fill: #f4f4f4; opacity: 0.18; }
  @keyframes tick { 0% { opacity: 0.85; } 12% { opacity: 0.14; } 100% { opacity: 0.14; } }
}
</style>
<defs>
<pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
<circle class="dot" cx="9" cy="9" r="1.3"/>
</pattern>
</defs>
<rect class="ground" width="1200" height="800"/>
<rect width="1200" height="800" fill="url(#grid)"/>
<svg x="0" y="0" width="1200" height="800" viewBox="0 0 200 200" preserveAspectRatio="xMaxYMin meet">
<g transform="translate(40 -10) scale(0.8)">${RING}<circle class="rec" cx="100" cy="100" r="7"/></g>
</svg>
<svg x="0" y="0" width="1200" height="800" viewBox="0 0 400 130" preserveAspectRatio="xMinYMax meet">
<g transform="translate(16 0)">${BARS}</g>
</svg>
</svg>`

export const PUNTO_LOOK: ThemeSetArgs = {
  colors: puntoColors,
  backdrop: { scene: 'punto', glass: { blur: 12, opacity: 0.82 } },
}

export const PUNTO_STYLE: ThemeSetArgs['style'] = {
  Heading: { fontFamily: ['mono'], fontWeight: 'medium', letterSpacing: 2 },
  UserMessage: {
    backgroundColor: 'surface-3',
    color: 'text-primary',
    radius: 22,
    borderColor: 'border-strong',
    borderWidth: 1,
    paddingX: 18,
    paddingY: 10,
  },
  AssistantMessage: {
    backgroundColor: 'surface-1',
    color: 'text-primary',
    radius: 22,
    borderColor: 'border',
    borderWidth: 1,
    padding: 18,
  },
  ToolUse: { backgroundColor: 'surface-2', color: 'text-secondary', fontFamily: ['mono'], radius: 14, paddingX: 10 },
}
