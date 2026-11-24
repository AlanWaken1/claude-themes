import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

export const { theme: talaveraColors, problems: talaveraProblems } = makeColors({
  label: 'Talavera',
  roles: { accent: '#2346a0', danger: '#b23a26', success: '#3f7a3a', warning: '#c98a12', pro: '#6a3f8f' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ebe5d6',
        'surface-1': '#f3eee3',
        'surface-2': '#f9f6ef',
        'text-primary': '#141d36',
        'text-secondary': '#323e5c',
        'text-muted': '#4f5873',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0d1527',
        'surface-1': '#131c32',
        'surface-2': '#18223b',
        'surface-3': '#1d2741',
        'text-primary': '#eef1f8',
        'text-secondary': '#c6cde0',
        'text-muted': '#9aa5c0',
      },
    },
  },
})

const C = 'c'
// One tile, 120 units: a cobalt eight-petal flower with a yellow heart,
// quarter rosettes at the corners that meet into a second flower when tiled.
const PETALS = [0, 45, 90, 135, 180, 225, 270, 315]
  .map(a => `<ellipse class="${C}b" cx="60" cy="38" rx="7" ry="15" transform="rotate(${a} 60 60)"/>`)
  .join('')
const LEAVES = [45, 135, 225, 315]
  .map(a => `<path class="${C}g" d="M60 30 Q66 20 60 10 Q54 20 60 30Z" transform="rotate(${a} 60 60) translate(0 -2)"/>`)
  .join('')
const CORNERS = [[0, 0], [120, 0], [0, 120], [120, 120]]
  .map(([x, y]) => `<circle class="${C}b" cx="${x}" cy="${y}" r="16"/><circle class="${C}y" cx="${x}" cy="${y}" r="8"/><circle class="${C}t" cx="${x}" cy="${y}" r="3"/>`)
  .join('')
const EDGES = [[60, 0], [0, 60], [120, 60], [60, 120]]
  .map(([x, y]) => `<circle class="${C}t" cx="${x}" cy="${y}" r="4"/>`)
  .join('')

export const TALAVERA_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.cg0 { fill: #f2ecdf; }
.cb { fill: #2346a0; }
.cg { fill: #2f5fb8; opacity: 0.75; }
.cy { fill: #e2a92b; }
.ct { fill: #b5532c; }
.cl { fill: none; stroke: #2346a0; stroke-width: 1.2; opacity: 0.55; }
.shine { opacity: 0.35; animation: drift 60s ease-in-out infinite alternate; }
.bloom { transform-box: fill-box; transform-origin: center; animation: turn 120s linear infinite; }
@keyframes drift { from { transform: translate(-200px, -100px); } to { transform: translate(200px, 100px); } }
@keyframes turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@media (prefers-color-scheme: dark) {
  .cg0 { fill: #0f1a33; }
  .cb { fill: #3a64c4; }
  .cg { fill: #5a86d8; opacity: 0.6; }
  .cy { fill: #c99a2e; }
  .ct { fill: #a5543a; }
  .cl { stroke: #4a72cc; opacity: 0.45; }
  .shine { opacity: 0.12; }
}
</style>
<defs>
<pattern id="tile" width="120" height="120" patternUnits="userSpaceOnUse">
<rect class="cg0" width="120" height="120"/>
<rect class="cl" x="0.6" y="0.6" width="118.8" height="118.8"/>
<circle class="cl" cx="60" cy="60" r="44"/>
${LEAVES}
<g class="bloom">${PETALS}<circle class="cy" cx="60" cy="60" r="11"/><circle class="ct" cx="60" cy="60" r="4.5"/></g>
${CORNERS}
${EDGES}
</pattern>
<radialGradient id="glaze" cx="50%" cy="40%" r="50%">
<stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/>
<stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="1200" height="800" fill="url(#tile)"/>
<rect class="shine" x="-200" y="-200" width="1600" height="1200" fill="url(#glaze)"/>
</svg>`

export const TALAVERA_LOOK: ThemeSetArgs = {
  colors: talaveraColors,
  backdrop: { scene: 'azulejos', glass: { blur: 18, opacity: 0.78 } },
}

export const TALAVERA_STYLE: ThemeSetArgs['style'] = {
  Heading: { color: 'text-accent', fontFamily: ['serif'], fontWeight: 'bold' },
  UserMessage: {
    backgroundColor: '#22408f',
    color: '#fbf8f0',
    radius: [16, 16, 4, 16],
    borderColor: '#e2a92b',
    borderWidth: 2,
    paddingX: 16,
    paddingY: 10,
    shadow: { y: 2, blur: 6, color: '#0b163055' },
  },
  AssistantMessage: {
    backgroundColor: 'surface-2',
    color: 'text-primary',
    radius: 12,
    borderColor: 'border-accent',
    borderWidth: 1,
    padding: 16,
  },
  ToolUse: { backgroundColor: 'surface-1', color: 'text-secondary', radius: 8, paddingX: 8 },
}

