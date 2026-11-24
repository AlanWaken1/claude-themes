import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Oro: champagne glass by day, warm graphite with gold light by night.
export const { theme: oroColors, problems: oroProblems } = makeColors({
  label: 'Oro',
  roles: { accent: '#b5873a', danger: '#c4402f', success: '#4f8a4a', warning: '#d07a1e', pro: '#7a5ea8' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ece4d6',
        'surface-1': '#f4eee4',
        'surface-2': '#faf7f1',
        'text-primary': '#1f1a12',
        'text-secondary': '#4a4034',
        'text-muted': '#675c4d',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#141210',
        'surface-1': '#1b1815',
        'surface-2': '#221e1a',
        'surface-3': '#28241f',
        'text-primary': '#f5efe5',
        'text-secondary': '#d3c9b9',
        'text-muted': '#a99e8c',
      },
    },
  },
})

// Soft lights that drift behind frosted glass. Each rests in place without motion.
export const ORO_SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<style>
.ground { fill: url(#sky); }
.a { animation: driftA 50s ease-in-out infinite alternate; }
.b { animation: driftB 64s ease-in-out infinite alternate; }
.c { animation: driftC 58s ease-in-out infinite alternate; }
.glow { opacity: 0.9; }
.sheen { opacity: 0.5; }
.s0 { stop-color: #f3ead9; }
.s1 { stop-color: #e2cfae; }
.g1 { stop-color: #e9c07a; }
.g2 { stop-color: #f2d9a8; }
.g3 { stop-color: #d9a86a; }
.g4 { stop-color: #f7efe2; }
@keyframes driftA { from { transform: translate(-60px, -30px) scale(1); } to { transform: translate(90px, 50px) scale(1.12); } }
@keyframes driftB { from { transform: translate(40px, 30px) scale(1.05); } to { transform: translate(-80px, -40px) scale(0.95); } }
@keyframes driftC { from { transform: translate(0px, 40px); } to { transform: translate(60px, -50px); } }
@media (prefers-color-scheme: dark) {
  .s0 { stop-color: #16130f; }
  .s1 { stop-color: #0d0b09; }
  .g1 { stop-color: #8a6326; }
  .g2 { stop-color: #5e4523; }
  .g3 { stop-color: #a77a3c; }
  .g4 { stop-color: #3a2e22; }
  .glow { opacity: 0.7; }
  .sheen { opacity: 0.25; }
}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" class="s0"/><stop offset="1" class="s1"/>
</linearGradient>
<radialGradient id="r1"><stop offset="0" class="g1"/><stop offset="1" class="g1" stop-opacity="0"/></radialGradient>
<radialGradient id="r2"><stop offset="0" class="g2"/><stop offset="1" class="g2" stop-opacity="0"/></radialGradient>
<radialGradient id="r3"><stop offset="0" class="g3"/><stop offset="1" class="g3" stop-opacity="0"/></radialGradient>
<radialGradient id="r4"><stop offset="0" class="g4"/><stop offset="1" class="g4" stop-opacity="0"/></radialGradient>
</defs>
<rect class="ground" width="1200" height="800"/>
<g class="glow">
<ellipse class="a" cx="230" cy="180" rx="460" ry="380" fill="url(#r1)"/>
<ellipse class="b" cx="1000" cy="640" rx="520" ry="420" fill="url(#r3)"/>
<ellipse class="c" cx="900" cy="140" rx="380" ry="300" fill="url(#r2)"/>
</g>
<ellipse class="sheen b" cx="420" cy="700" rx="500" ry="260" fill="url(#r4)"/>
</svg>`

export const ORO_LOOK: ThemeSetArgs = {
  colors: oroColors,
  backdrop: { scene: 'oro', glass: { blur: 36, opacity: 0.55 } },
}

const shadow = { y: 2, blur: 10, color: '#3a2a1222' } as const

export const ORO_STYLE: ThemeSetArgs['style'] = {
  Text: { fontFamily: ['sans'], fontSize: 15, lineHeight: 22 },
  Heading: { fontFamily: ['sans'], fontWeight: 'semibold', color: 'text-primary' },
  UserMessage: {
    backgroundColor: '#e6c88e',
    color: '#24190a',
    radius: [20, 20, 6, 20],
    paddingX: 16,
    paddingY: 10,
    shadow,
  },
  AssistantMessage: {
    backgroundColor: 'surface-2',
    color: 'text-primary',
    radius: 20,
    padding: 16,
    shadow,
  },
  ToolUse: { backgroundColor: 'surface-1', color: 'text-secondary', radius: 12, paddingX: 10 },
}
