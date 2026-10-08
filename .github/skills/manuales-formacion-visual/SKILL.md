---
name: manuales-formacion-visual
description: "Usa esto cuando: debas crear o mantener manuales de instalacion, administracion y uso por perfiles con formato Markdown y capturas de interfaz."
---

# Skill — Manuales y formacion visual

## Objetivo
Mantener documentacion funcional y de usuario siempre actualizada, versionada y visual.

## Estructura de manuales
```
docs/manuales/
  README.md                ← indice de manuales con estado
  instalacion.md           ← instalacion y puesta en marcha
  administrador.md         ← operacion de administracion
  perfiles/
    <rol>.md               ← manual por perfil de usuario
  img/
    <manual>__<seccion>__<paso>.png
```

## Formato por manual
Cada manual debe incluir:
1. Perfil destinatario y fecha de version
2. Flujos principales con pasos numerados
3. Resultado esperado por paso
4. Capturas de pantalla en pasos criticos
5. Seccion de errores frecuentes y solucion

## Convencion de nombres de imagen
`<manual>__<seccion>__<paso>.png`
- `instalacion__requisitos__01.png`
- `administrador__usuarios__02.png`
- `perfil_admin__crear_recurso__03.png`

## Checklist de calidad de manual
1. Cada procedimiento tiene pasos numerados y resultado esperado
2. Los textos coinciden con la version actual de la UI
3. Se incluyen errores frecuentes y recuperacion
4. Las imagenes tienen alt text descriptivo
5. El manual indica claramente el perfil destinatario

## Antipatrones a evitar
- Capturas manuales no reproducibles
- Manuales con datos reales de usuarios
- Pasos sin resultado esperado
- Imagenes desactualizadas tras cambios de UI
