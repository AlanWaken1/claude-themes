import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { LINE } from './punto-claro.js'
import { BARS, RING } from './punto.js'

// Punto Gris: soft graphite between Punto and Punto Claro, for night. Dark only.
export const { theme: puntoGrisColors, problems: puntoGrisProblems } = makeColors({
  label: 'Punto Gris',
  only: 'dark',
  roles: { accent: '#d8211f', danger: '#c8383a', success: '#4ea36f', warning: '#d6a234', pro: '#8f9cba' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#2c2c2a',
        'surface-1': '#323230',
        'surface-2': '#383836',
        'surface-3': '#3d3d3b',
        'text-primary': '#e9e9e5',
        'text-secondary': '#c6c6c1',
        'text-muted': '#a9a9a3',
      },
    },
  },
})

// The top dot of each bar glows red.
const TOPS = [3, 5, 2, 6, 4, 7, 3, 5]
  .map((h, col) => `<circle class="top" cx="${8 + col * 14}" cy="${112 - (h - 1) * 14}" r="3.5"/>`)
  .join('')

export const PUNTO_GRIS_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.ground { fill: #2c2c2a; }
.dot { fill: #e9e9e5; opacity: 0.09; }
.tick { fill: #e9e9e5; opacity: 0.12; animation: tick 24s linear infinite; }
.top { fill: #d8211f; opacity: 0.55; }
.led { fill: #d8211f; opacity: 0.15; animation: fill 12s linear infinite; }
.bar { fill: #e9e9e5; opacity: 0.15; }
.rec { fill: #d8211f; opacity: 0.85; animation: breathe 4s ease-in-out infinite; }
@keyframes tick { 0% { fill: #d8211f; opacity: 0.85; } 12% { fill: #e9e9e5; opacity: 0.12; } 100% { fill: #e9e9e5; opacity: 0.12; } }
@keyframes fill { 0% { opacity: 0.15; } 4% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { opacity: 0.15; } }
@keyframes breathe { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.35; } }
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
<g transform="translate(16 0)">${TOPS}</g>
</svg>
<svg x="0" y="0" width="1200" height="800" viewBox="0 0 440 24" preserveAspectRatio="xMaxYMax meet">
<g transform="translate(6 0)">${LINE}</g>
</svg>
</svg>`

export const PUNTO_GRIS_LOOK: ThemeSetArgs = {
  colors: puntoGrisColors,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'punto-gris', glass: { blur: 10, opacity: 0.85 } },
}

export const PUNTO_GRIS_STYLE: ThemeSetArgs['style'] = {
  Heading: { fontFamily: ['mono'], fontWeight: 'medium', letterSpacing: 2, color: 'text-accent' },
  UserMessage: {
    backgroundColor: '#4a4a47',
    color: '#ededea',
    radius: 22,
    borderColor: '#d8211f',
    borderWidth: 2,
    paddingX: 18,
    paddingY: 10,
  },
  AssistantMessage: {
    backgroundColor: '#343432',
    color: '#e9e9e5',
    radius: 22,
    borderColor: '#454543',
    borderWidth: 1,
    padding: 18,
  },
  ToolUse: { backgroundColor: '#383836', color: '#c6c6c1', fontFamily: ['mono'], radius: 14, paddingX: 10 },
}
