---
name: formularios-accesibles-primaria
description: "Usa esto cuando: crees o modifiques formularios, tests y actividades con campos de entrada para asegurar UX clara y WCAG 2.1 AA."
---

# Skill - Formularios accesibles para primaria

## Objetivo
Construir formularios y cuestionarios claros, robustos y accesibles para alumnado de 11-12 anos.

## Cuando activarla
- Tests tipo quiz (radio, checkbox, verdadero/falso).
- Rellenar huecos (inputs de texto o selects).
- Formularios de autoevaluacion o feedback.

## Reglas de diseno
- Enunciados cortos y una accion por bloque.
- Etiquetas visibles, no depender de placeholder.
- Ayuda contextual breve junto al campo.
- Mensajes de error especificos y accionables.

## Reglas de accesibilidad
- Asociar label-for en todos los controles.
- Fieldset + legend para grupos de opciones.
- Anunciar errores en una region aria-live polite.
- Mantener orden de tabulacion logico.
- Area tactil minima de 44x44 px en controles clicables.

## Validacion
- Validacion instantanea no intrusiva + validacion final al enviar.
- Mostrar resumen de errores enlazando al campo.
- No bloquear avance por formato si no es esencial para el aprendizaje.

## Checklist rapido
1. Se entiende que pide cada pregunta al primer vistazo.
2. Se puede completar solo con teclado.
3. Contraste y foco cumplen WCAG AA.
4. El feedback ayuda a corregir sin frustracion.
