---
name: ejercicios-interactivos-frontend
description: "Usa esto cuando: implementes actividades de test, arrastrar y soltar, o rellenar huecos en frontend puro."
---

# Skill - Ejercicios interactivos frontend

## Objetivo
Implementar ejercicios didacticos interactivos que funcionen en movil, tablet y PC, con alternativa accesible sin raton.

## Tipos de ejercicio cubiertos
- Test autocorregible (opcion unica o multiple).
- Arrastrar y soltar (drag and drop).
- Rellenar huecos (texto guiado o seleccion).

## Patron comun
1. Mostrar objetivo del ejercicio.
2. Permitir intento del alumno.
3. Corregir y devolver feedback inmediato.
4. Permitir reintento con pista gradual.

## Drag and drop accesible
- Implementar soporte puntero y teclado.
- Ofrecer modo alternativo "seleccionar y asignar".
- Evitar dependencia exclusiva de color para acierto/error.

## Feedback didactico
- Acierto: explicar por que esta bien.
- Error: indicar pista concreta, no solo "incorrecto".
- Incluir boton "ver explicacion" tras varios intentos.

## Persistencia local
- Guardar progreso con localStorage.
- Versionar clave de almacenamiento para evitar datos obsoletos.

## Testing minimo
- Flujos de acierto y error.
- Reintento y reinicio.
- Navegacion por teclado.
- Comportamiento responsive.
