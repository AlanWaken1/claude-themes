# claude-themes

Temas para Claude Code en la app de escritorio y la móvil: colores, fondo animado y estilo de mensajes. Cámbialos con el comando `/tema`.

| Tema | Descripción |
| --- | --- |
| `relieve` | Monocromo gris pizarra con líneas topográficas que respiran despacio. Claro y oscuro. |
| `punto` | Monocromo con cuadrícula de puntos, anillo-reloj y una luz roja. Sigue el modo del sistema. |
| `punto-claro` | Punto siempre en modo claro: papel blanco, puntos negros y acento rojo. |
| `punto-gris` | Punto en grafito medio para la noche, con detalles en rojo. |
| `oro` | Vidrio esmerilado en champán y dorado con luces suaves que se mueven. |
| `talavera` | Inspirado en la talavera poblana: esmalte blanco, azul cobalto, amarillo y terracota. |

## Instalar

En la terminal de Claude Code:

```
/plugin install temas --marketplace AlanWaken1/claude-themes
```

Responde `y` para agregar el marketplace y elige el alcance de usuario, así se carga en todas tus sesiones.

Desde una shell:

```bash
claude plugin install temas --marketplace AlanWaken1/claude-themes
```

En la app de escritorio, donde `/plugin` no funciona: pulsa **+** junto a la caja de texto, luego **Plugins**, **Add marketplace** con `AlanWaken1/claude-themes` y después **Add plugin**.

## Usar

- `/tema` muestra el tema actual y los disponibles.
- `/tema <nombre>` cambia de tema, por ejemplo `/tema punto-claro`. La elección se guarda para las siguientes sesiones.

La terminal no dibuja temas; se ven en la app de escritorio y en la móvil.
