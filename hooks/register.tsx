import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { ORO_LOOK, ORO_SCENE, ORO_STYLE, oroProblems } from './oro.js'
import { PUNTO_CLARO_LOOK, PUNTO_CLARO_SCENE, PUNTO_CLARO_STYLE, puntoClaroProblems } from './punto-claro.js'
import { PUNTO_GRIS_LOOK, PUNTO_GRIS_SCENE, PUNTO_GRIS_STYLE, puntoGrisProblems } from './punto-gris.js'
import { RELIEVE_LOOK, RELIEVE_SCENE, RELIEVE_STYLE, relieveProblems } from './relieve.js'
import { PUNTO_LOOK, PUNTO_SCENE, PUNTO_STYLE, puntoProblems } from './punto.js'
import { TALAVERA_LOOK, TALAVERA_SCENE, TALAVERA_STYLE, talaveraProblems } from './talavera.js'

type Tema = { look: ThemeSetArgs; style: ThemeSetArgs['style']; scene: string; svg: string; alt: string; problems: string[] }

const TEMAS: Record<string, Tema> = {
  oro: {
    look: ORO_LOOK, style: ORO_STYLE, scene: 'oro', svg: ORO_SCENE, problems: oroProblems,
    alt: 'Luces suaves en champán y dorado detrás de vidrio esmerilado',
  },
  punto: {
    look: PUNTO_LOOK, style: PUNTO_STYLE, scene: 'punto', svg: PUNTO_SCENE, problems: puntoProblems,
    alt: 'Cuadrícula de puntos monocroma con un anillo que se ilumina y una luz roja',
  },
  'punto-claro': {
    look: PUNTO_CLARO_LOOK, style: PUNTO_CLARO_STYLE, scene: 'punto-claro', svg: PUNTO_CLARO_SCENE, problems: puntoClaroProblems,
    alt: 'Cuadrícula de puntos negros sobre blanco con un anillo, una luz roja y una línea roja que se llena',
  },
  'punto-gris': {
    look: PUNTO_GRIS_LOOK, style: PUNTO_GRIS_STYLE, scene: 'punto-gris', svg: PUNTO_GRIS_SCENE, problems: puntoGrisProblems,
    alt: 'Cuadrícula de puntos tenues sobre grafito con un anillo y una luz roja suave',
  },
  relieve: {
    look: RELIEVE_LOOK, style: RELIEVE_STYLE, scene: 'relieve', svg: RELIEVE_SCENE, problems: relieveProblems,
    alt: 'Líneas topográficas finas en gris pizarra que respiran despacio',
  },
  talavera: {
    look: TALAVERA_LOOK, style: TALAVERA_STYLE, scene: 'azulejos', svg: TALAVERA_SCENE, problems: talaveraProblems,
    alt: 'Azulejos de talavera en azul cobalto, amarillo y terracota',
  },
}
const NAMES = Object.keys(TEMAS)
const DEFAULT = 'relieve'

async function apply($: EngineInterface, name: string) {
  const tema = TEMAS[name] ?? TEMAS[DEFAULT]!
  const unpainted = tema.problems.find(line => line.startsWith("Desktop won't paint"))
  if (unpainted !== undefined) {
    $.ui.toast(unpainted)
  }
  try {
    return await $.theme.set({ ...tema.look, style: tema.style })
  } catch (error) {
    $.ui.log(String(error))
    return await $.theme.set(tema.look)
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'tema',
      description: `Cambia el tema: ${NAMES.join(', ')}`,
      argumentHint: `[${NAMES.join('|')}]`,
    })
    const saved = await $.store.get('tema')
    await apply($, typeof saved === 'string' && saved in TEMAS ? saved : DEFAULT)
    return next(e)
  })

  on('command.run', { command: 'tema' }, async ($, e) => {
    const name = e.args.trim().toLowerCase()
    if (name === '') {
      const current = (await $.store.get('tema')) ?? DEFAULT
      return { text: `Tema actual: ${String(current)}. Disponibles: ${NAMES.join(', ')}. Usa /tema <nombre>.` }
    }
    if (!(name in TEMAS)) {
      return { text: `No conozco el tema "${name}". Disponibles: ${NAMES.join(', ')}.` }
    }
    await $.store.set('tema', name)
    const set = await apply($, name)
    return { text: set.isDrawn ? `Tema ${name} aplicado.` : `Tema ${name} guardado. Se verá en la app de escritorio o la móvil; la terminal no dibuja temas.` }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const tema = Object.values(TEMAS).find(t => t.scene === e.props.scene)
    if (tema === undefined) {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={tema.svg} alt={tema.alt} />
  })
}
