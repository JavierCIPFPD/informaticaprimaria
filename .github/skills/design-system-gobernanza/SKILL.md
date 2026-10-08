---
name: design-system-gobernanza
description: "Usa esto cuando: se vaya a crear o modificar cualquier interfaz, componente visual o flujo UX para asegurar cumplimiento del Design System oficial del proyecto."
---

# Skill — Design System y gobernanza UI

## Objetivo
Garantizar consistencia visual, calidad UX y cumplimiento WCAG 2.1 AA en toda la aplicacion.
El contexto del producto es educativo (11-12 anos): tono formal, claro y motivador.

## Fuente oficial
- `docs/design-system/FUNDAMENTOS.md`
- `docs/design-system/TOKENS.json`
- `docs/design-system/COMPONENTES_UI.md`

## Contexto de producto (obligatorio)
- Aplicacion web de consulta publica, sin login ni roles.
- Estructura de contenidos: 2 cursos → 3 trimestres por curso → 12 sesiones por trimestre.
- Cada sesion incluye dos bloques: explicacion (1h) y practica (1h).

## Protocolo obligatorio antes de construir UI
1. Identificar pantalla y tarea de usuario
2. Mapear componentes existentes del Design System
3. Validar contraste, foco y navegacion por teclado
4. Confirmar tokens de color/espaciado/tipografia
5. Definir estados: hover, focus, active, loading, disabled
6. Verificar legibilidad para alumnado (copys breves, jerarquia visual clara)

## Criterios de cumplimiento por pantalla
- Cumple grid y breakpoints Bootstrap 5
- Usa paleta y estados semanticos definidos en `TOKENS.json`
- Pasa validacion de contraste (ratio minimo 4.5:1 para texto normal)
- Incluye retroalimentacion de sistema clara (Flash alerts)
- Soporta navegacion por teclado y foco visible
- Es completamente responsive: movil, tablet y PC
- Mantiene tono formal con toque ludico (sin infantilizar ni saturar)

## Regla de bloqueo
Si una interfaz no cumple el Design System, no se considera terminada.

## Barra de accesibilidad (obligatoria)
- Integrar una barra de accesibilidad visible y fija.
- Debe incluir al menos: lectura en voz alta, descarga/generacion de audio MP3, y modos de visualizacion para daltonismo.
- Referencia funcional y visual: `https://batexego.bilateria.org/`.
- Si se usa script externo, documentar dependencia, disponibilidad y fallback local.
- La barra no puede bloquear contenido ni foco de teclado en movil.

## Componentes base disponibles
- `.form-panel` — panel lateral de formularios inline
- `.stat-card` — tarjeta de estadistica en dashboard
- `.btn-action` — boton de accion pequeno en tablas
- `.nav-section` — separador de seccion en sidebar
- Todos los componentes Bootstrap 5 con tokens de color sobrescritos

## Componentes minimos para este proyecto
- Navegacion por curso / trimestre / sesion
- Tarjeta de sesion con bloques "Explicacion" y "Practica"
- Barra de progreso de unidad didactica
- Bloque de recursos descargables y actividad guiada

## Accesibilidad minima obligatoria
- Todos los inputs tienen `<label>` asociado
- Botones tienen texto o `aria-label`
- Colores no son el unico indicador de estado
- Mensajes de error son descriptivos y especificos
- Tablas tienen encabezados `<th>` correctos
- Todas las imagenes informativas incluyen `alt` significativo
- Enlaces y botones tienen area tactil suficiente en movil
- Se respeta `prefers-reduced-motion` para animaciones
