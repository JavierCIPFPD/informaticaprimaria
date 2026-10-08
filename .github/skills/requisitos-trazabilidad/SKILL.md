---
name: requisitos-trazabilidad
description: "Usa esto cuando: debas analizar especificaciones, convertirlas en requisitos verificables, crear backlog y matriz de trazabilidad requisito-diseno-prueba."
---

# Skill — Requisitos y trazabilidad

## Objetivo
Convertir especificaciones en requisitos verificables con criterios de aceptacion claros y mantener trazabilidad completa hasta las pruebas.

## Proceso de analisis
1. Leer especificacion completa antes de extraer requisitos
2. Clasificar: funcional (RF) / no funcional (RNF) / restriccion (REST)
3. Asignar ID unico: `RF-001`, `RNF-001`, `REST-001`
4. Definir criterio de aceptacion (CA) por requisito
5. Identificar dependencias entre requisitos
6. Priorizar: Must / Should / Could / Won't (MoSCoW)

## Plantilla de requisito
```
ID:          RF-001
Titulo:      Alta de usuario
Descripcion: El administrador puede crear un usuario con email, nombre y rol
CA-1:        Email validado y unico en BD
CA-2:        Password hasheado con bcrypt
CA-3:        Rol valido segun enum definido
Prioridad:   Must
Dependencias: ninguna
```

## Backlog minimo por modulo
Para cada modulo documentar en `docs/BACKLOG_<MODULO>.md`:
- Historias de usuario con ID, titulo, descripcion y CA
- Estimacion relativa (XS/S/M/L/XL)
- Estado: pendiente / en-progreso / completado / cancelado

## Matriz de trazabilidad
`docs/TRACEABILITY_MATRIX.md` con columnas:
| ID Req | Descripcion | Modulo | Fichero(s) | Prueba | Estado |
|---|---|---|---|---|---|

## Criterios de salida de fase
- Todos los Must de la fase estan en estado completado
- La matriz de trazabilidad esta actualizada
- No hay criterios de aceptacion sin prueba asociada
- La deuda tecnica identificada esta registrada con fecha de pago
