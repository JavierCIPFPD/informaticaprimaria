---
name: gestion-proyecto-fases
description: "Usa esto cuando: necesites planificar el desarrollo por fases/sesiones, definir hitos, dependencias, riesgos y criterios de salida de cada fase."
---

# Skill — Gestion del proyecto por fases

## Objetivo
Guiar el proyecto con entregas incrementales, control de riesgo y evidencia de calidad.

## Fases recomendadas
1. Fase 0 — Descubrimiento y trazabilidad
2. Fase 1 — Arquitectura y contratos internos
3. Fase 2 — Dominio: entidades y flujos principales
4. Fase 3 — Funcionalidad core del negocio
5. Fase 4 — UI, reporting y exportacion
6. Fase 5 — Integraciones externas
7. Fase 6 — Hardening, rendimiento y release
8. Fase 7 — Manuales y formacion

## Gestion por sesion
- Definir objetivo acotado de sesion
- Confirmar entradas/salidas esperadas
- Ejecutar tareas priorizadas por riesgo y dependencia
- Cerrar con evidencia: cambios, pruebas, decisiones y pendientes
- Actualizar `docs/PROJECT_STATUS.md` al cierre de la sesion

## Plantilla de fase
```
Nombre:            Fase X — Descripcion
Objetivo:          resultado concreto verificable
Alcance incluido:  lista de funcionalidades
Fuera de alcance:  lista de exclusiones explicitas
Dependencias:      fases o tareas previas necesarias
Riesgos:           riesgos identificados y mitigacion
Criterio de salida: condiciones objetivas de finalizacion
Evidencia:         artefactos requeridos (codigo, tests, docs)
```

## Reglas
- No avanzar de fase con bloqueadores criticos abiertos
- Documentar deuda tecnica con ID y fecha de pago esperada
- Actualizar `docs/PROJECT_STATUS.md` al cierre de cada fase
- Mantener tablero de riesgos vivo

## Riesgos tipicos
| Riesgo | Probabilidad | Impacto | Mitigacion |
|---|---|---|---|
| Alcance no acotado | Alta | Alto | Definir DoD estricto por fase |
| Deuda tecnica acumulada | Media | Alto | Revisar en cada cierre de fase |
| Cambios de requisitos | Media | Medio | Versionar especificaciones |
| Entorno roto | Baja | Alto | Smoke test al inicio de cada sesion |
