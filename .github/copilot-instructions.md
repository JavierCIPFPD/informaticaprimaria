# Instrucciones generales — Cuaderno Web Cliente

## Objetivo
Desarrollar un cuaderno web de consulta para "Informática para primaria" (5º y 6º), con acceso publico y sin autenticacion. El foco actual es frontend puro con alta calidad visual, didactica y accesibilidad.

## Entorno técnico base (fase actual)
- HTML5 semantico
- CSS3 (tokens y componentes reutilizables)
- JavaScript ES2023+ + jQuery 3.7+ CDN
- Bootstrap 5.3+ CDN + Font Awesome 6.5+ CDN
- Sin backend ni base de datos en esta fase

## Evolucion prevista (opcional, no activa)
- Si el proyecto evoluciona, se podra introducir PHP 8.2+ y MySQL 8+ con arquitectura MVC por capas.


## Reglas operativas para el agente
- Antes de codificar, verificar trazabilidad: requisito → diseño → prueba.
- No implementar funcionalidades sin criterio de aceptación explícito.
- Cualquier regla de negocio compleja debe quedar documentada en skill o doc de dominio.
- Priorizar accesibilidad WCAG 2.1 AA, claridad didactica y rendimiento frontend.
- Leer `docs/PROJECT_STATUS.md` al inicio de cada sesión para recuperar el contexto.
- Mantener lenguaje apropiado para alumnado de 11-12 anos.

## Skills disponibles
- `skills/requisitos-trazabilidad/SKILL.md` — análisis, backlog, criterios de aceptación, trazabilidad
- `skills/gestion-proyecto-fases/SKILL.md` — planificación por fases, hitos, dependencias
- `skills/calidad-codigo/SKILL.md` — estándares, revisión, deuda técnica, gates de calidad
- `skills/karpathy-guidelines/SKILL.md` — disciplina de ejecución del agente
- `skills/espanol-editorial-educativo/SKILL.md` — corrección lingüística en español (tildes, eñes y estilo didáctico)
- `skills/design-system-gobernanza/SKILL.md` — estándar visual/UX, cumplimiento WCAG
- `skills/formularios-accesibles-primaria/SKILL.md` — formularios, tests y feedback accesible
- `skills/ejercicios-interactivos-frontend/SKILL.md` — test, arrastrar-soltar y rellenar huecos
- `skills/infografias-svg-educativas/SKILL.md` — infografias y diagramas SVG interactivos
- `skills/arquitectura-dominio-contratos/SKILL.md` — modelo de dominio, contratos entre módulos
- `skills/testing/SKILL.md` — estrategia de pruebas unitarias, integración y regresión
- `skills/seguridad-aplicacion/SKILL.md` — seguridad frontend (XSS, CSP, buenas practicas de recursos)
- `skills/licencias-cumplimiento/SKILL.md` — control de licencias en dependencias y recursos
- `skills/manuales-formacion-visual/SKILL.md` — documentación de instalación y uso por perfil

## Skills condicionales (solo si se activa backend)
- `skills/php-clases/SKILL.md`
- `skills/esquema-sql/SKILL.md`

## Skills condicionales (solo si hay valor didactico claro)
- `skills/threejs-escenas-didacticas/SKILL.md`

## Matriz fase → skills recomendadas
| Fase | Objetivo principal | Skills recomendadas |
|---|---|---|
| Fase 0 — Descubrimiento | Cerrar alcance, backlog, criterios y riesgos | requisitos-trazabilidad, gestion-proyecto-fases, arquitectura-dominio-contratos |
| Fase 1 — Arquitectura frontend | IA, navegacion de contenidos y contratos de componentes | arquitectura-dominio-contratos, calidad-codigo, karpathy-guidelines |
| Fase 2 — Dominio educativo | Cursos, trimestres y sesiones | requisitos-trazabilidad, testing, karpathy-guidelines |
| Fase 3 — UI didactica | Componentes, estilos y microinteracciones accesibles | design-system-gobernanza, formularios-accesibles-primaria, testing |
| Fase 4 — Contenido y recursos | Integracion de materiales, multimedia y licencias | infografias-svg-educativas, ejercicios-interactivos-frontend, licencias-cumplimiento |
| Fase 5 — Calidad y release | WCAG AA, responsive, regresion visual y publicacion | testing, seguridad-aplicacion, calidad-codigo, gestion-proyecto-fases |
| Fase 7 — Manuales | Documentación visual y plan de adopción | manuales-formacion-visual, design-system-gobernanza, licencias-cumplimiento |

## Regla de activación por sesión
- Declarar la fase activa al inicio de cada sesión.
- Seleccionar al menos 2 skills (1 de dominio + 1 transversal).
- Si hay cambios de codigo, incluir siempre testing o calidad-codigo.
- Si hay ambigüedad o riesgo de sobreingeniería, activar karpathy-guidelines.
- Si se redactan o corrigen textos de UI/contenido, activar espanol-editorial-educativo.
- Si se implementan ejercicios, activar ejercicios-interactivos-frontend y formularios-accesibles-primaria.
- Si se crean diagramas, activar infografias-svg-educativas.
- No activar threejs-escenas-didacticas sin justificar valor pedagogico y fallback 2D.

## Plantilla de inicio de sesión
```
Fase activa: Fase X — Nombre
Objetivo de la sesión: resultado concreto y verificable
Skills activadas: skill-dominio + skill-transversal
```

## Regla de interfaz obligatoria
Cualquier tarea que implique UI/UX debe consultar y cumplir el Design System en `docs/design-system/`.

## Regla de accesibilidad obligatoria
- Cumplimiento WCAG 2.1 AA en contraste, foco visible, navegacion por teclado y semantica.
- Disenar mobile-first y validar adaptacion para movil, tablet y PC.
- Integrar barra de accesibilidad y documentar su comportamiento.

## Requisitos de calidad obligatorios
- **Seguridad por defecto**: sanitizacion de contenido dinamico, recursos confiables y sin inyecciones en DOM
- **Trazabilidad**: toda decision relevante de diseno y contenido queda documentada
- **Testeo**: cada historia terminada debe incluir evidencia de validacion funcional y de accesibilidad
- **Compatibilidad**: funcionamiento estable en navegadores modernos de escritorio y movil

## Definición de terminado (DoD)
Una tarea se considera terminada solo si:
1. Cumple criterio funcional y no funcional
2. Tiene pruebas en verde (o evidencia de smoke test frontend documentada)
3. Actualiza documentación de dominio y trazabilidad
4. No introduce alertas graves de seguridad o calidad

## Restricciones de implementación
- No introducir dependencias no justificadas
- No ocultar contenido esencial detras de efectos visuales
- No aceptar cambios sin prueba de no regresion en modulos criticos
