---
name: threejs-escenas-didacticas
description: "Usa esto cuando: se valore una experiencia 3D didactica y se necesite decidir si three.js aporta valor real sin comprometer accesibilidad ni rendimiento."
---

# Skill - Three.js para escenas didacticas

## Objetivo
Decidir de forma estricta cuando usar three.js y como hacerlo sin romper accesibilidad, rendimiento ni mantenibilidad.

## Regla de activacion
Solo activar si se cumplen todas:
1. El objetivo pedagogico requiere representacion espacial 3D.
2. No existe alternativa 2D (SVG/CSS) con eficacia similar.
3. Se define fallback completo 2D accesible.
4. El rendimiento objetivo en movil se mantiene estable.

## Casos recomendados
- Vista 3D simple de componentes de un portatil.
- Rotacion guiada de piezas con etiquetas educativas.

## Casos no recomendados
- Decoracion visual sin valor didactico.
- Actividades que puedan resolverse mejor con SVG interactivo.

## Requisitos minimos
- Carga diferida (lazy load) de three.js.
- Control de FPS y pausa fuera de viewport.
- Fallback 2D cuando WebGL no este disponible.
- Controles alternativos por teclado y botones.

## Criterio de salida
Si no mejora la comprension del alumno frente a la version 2D, no se aprueba.
