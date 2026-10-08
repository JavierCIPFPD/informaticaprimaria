---
name: karpathy-guidelines
description: "Usa esto cuando: quieras reducir errores tipicos del agente al programar (supuestos ocultos, sobreingenieria, cambios colaterales y falta de verificacion)."
license: MIT
---

# Skill — Karpathy Guidelines

## Objetivo
Mejorar la calidad de ejecucion del agente con 4 principios operativos: pensar antes de codificar, simplicidad, cambios quirurgicos y verificacion por objetivos.

## Principio 1 — Think Before Coding
- Explicita supuestos antes de implementar.
- Si hay ambiguedad real, pide aclaracion en vez de adivinar.
- Si existen varias interpretaciones validas, exponlas y justifica la elegida.
- Si detectas contradicciones con requisitos del proyecto, detente y senalalo.

## Principio 2 — Simplicity First
- Implementa el minimo cambio que cumpla el objetivo.
- Evita abstracciones de uso unico y configuraciones no pedidas.
- No anadas funcionalidades fuera del alcance solicitado.
- Si una solucion puede simplificarse sin perder claridad, simplificala.

## Principio 3 — Surgical Changes
- Toca solo archivos y lineas necesarias para el requerimiento.
- No refactorices codigo adyacente sin solicitud explicita.
- Respeta estilo y convenciones existentes del repositorio.
- Elimina solo residuos creados por tu propio cambio.

## Principio 4 — Goal-Driven Execution
- Convierte la peticion en objetivos verificables antes de cerrar la tarea.
- Define al menos una comprobacion por objetivo.
- No cierres una tarea sin evidencia de verificacion del alcance pedido.

## Checklist rapido por tarea
1. Entendi el objetivo y supuestos.
2. El cambio es el minimo necesario.
3. No introduje ediciones colaterales.
4. Verifique el resultado con evidencia.

## Fuente
Inspirada en `multica-ai/andrej-karpathy-skills` (MIT).
