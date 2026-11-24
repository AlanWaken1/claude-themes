import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { BARS, RING } from './punto.js'

// Punto Claro: white paper, black dot-matrix, one red signal. Light only.
export const { theme: puntoClaroColors, problems: puntoClaroProblems } = makeColors({
  label: 'Punto Claro',
  only: 'light',
  roles: { accent: '#d92b25', danger: '#b8232b', success: '#2f8a55', warning: '#c48a12', pro: '#5a6a8c' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#efefed',
        'surface-1': '#f6f6f4',
        'surface-2': '#fcfcfb',
        'text-primary': '#0a0a0a',
        'text-secondary': '#333333',
        'text-muted': '#545454',
      },
    },
  },
})

// A red line of dots that fills slowly along the foot, then starts over.
export const LINE = Array.from({ length: 30 }, (_, i) =>
  `<circle class="led" cx="${10 + i * 14}" cy="10" r="3.5" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>`,
).join('')

export const PUNTO_CLARO_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.ground { fill: #efefed; }
.dot { fill: #0a0a0a; opacity: 0.14; }
.tick { fill: #0a0a0a; opacity: 0.15; animation: tick 24s linear infinite; }
.bar { fill: #0a0a0a; opacity: 0.25; }
.rec { fill: #d92b25; opacity: 0.95; animation: breathe 4s ease-in-out infinite; }
.led { fill: #d92b25; opacity: 0.12; animation: fill 12s linear infinite; }
@keyframes tick { 0% { opacity: 0.8; } 12% { opacity: 0.15; } 100% { opacity: 0.15; } }
@keyframes breathe { 0%, 100% { opacity: 0.95; } 50% { opacity: 0.4; } }
@keyframes fill { 0% { opacity: 0.12; } 4% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { opacity: 0.12; } }
</style>
<defs>
<pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
<circle class="dot" cx="9" cy="9" r="1.4"/>
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
<svg x="0" y="0" width="1200" height="800" viewBox="0 0 440 24" preserveAspectRatio="xMaxYMax meet">
<g transform="translate(6 0)">${LINE}</g>
</svg>
</svg>`

export const PUNTO_CLARO_LOOK: ThemeSetArgs = {
  colors: puntoClaroColors,
  overrideColorScheme: 'light',
  backdrop: { scene: 'punto-claro', glass: { blur: 10, opacity: 0.85 } },
}

export const PUNTO_CLARO_STYLE: ThemeSetArgs['style'] = {
  Heading: { fontFamily: ['mono'], fontWeight: 'medium', letterSpacing: 2 },
  UserMessage: {
    backgroundColor: '#0a0a0a',
    color: '#f6f6f4',
    radius: 22,
    paddingX: 18,
    paddingY: 10,
  },
  AssistantMessage: {
    backgroundColor: '#fcfcfb',
    color: '#0a0a0a',
    radius: 22,
    borderColor: '#d6d6d3',
    borderWidth: 1,
    padding: 18,
  },
  ToolUse: { backgroundColor: '#f6f6f4', color: '#333333', fontFamily: ['mono'], radius: 14, paddingX: 10, borderColor: '#dcdcd9', borderWidth: 1 },
}
