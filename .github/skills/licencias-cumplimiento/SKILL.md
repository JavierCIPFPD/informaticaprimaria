---
name: licencias-cumplimiento
description: "Usa esto cuando: se agreguen dependencias, recursos visuales o manuales y necesites validar compatibilidad de licencias, atribuciones y cumplimiento."
---

# Skill — Licencias y cumplimiento

## Objetivo
Garantizar que todas las dependencias, recursos y herramientas del proyecto tienen licencias compatibles con el uso previsto.

## Inventario de dependencias del scaffold base
| Recurso | Version | Licencia | Uso |
|---|---|---|---|
| Bootstrap | 5.3.3 | MIT | UI framework (CDN) |
| Font Awesome | 6.5.0 | FA Free License (icones gratis: CC BY 4.0) | Iconos UI (CDN) |
| PHP | 8.2+ | PHP License 3.01 | Runtime |
| MySQL | 8.0+ | GPL 2.0 / Comercial | Base de datos |

## Checklist al agregar dependencia
1. Identificar licencia exacta de la dependencia
2. Verificar compatibilidad con licencia del proyecto
3. Si es copyleft (GPL, LGPL): evaluar impacto en el codigo del proyecto
4. Registrar en tabla de inventario
5. Agregar atribucion si lo requiere la licencia (MIT suele requerirla)

## Licencias compatibles para uso interno/educativo
- MIT ✅
- Apache 2.0 ✅
- BSD 2/3-Clause ✅
- ISC ✅
- CC BY 4.0 (recursos visuales) ✅ con atribucion
- GPL 2/3 ⚠️ — revisar si el proyecto sera distribuido
- Comercial ❌ — requiere licencia especifica

## Recursos visuales
- Imagenes, iconos e ilustraciones propias: documentar autoria
- Recursos de terceros: verificar licencia antes de incluir
- Nunca incluir recursos sin licencia clara o con copyright no autorizado
- Capturas de pantalla de la propia aplicacion: sin restriccion

## Cumplimiento RGPD (si aplica)
- Si el sistema procesa datos personales, documentar en `docs/PRIVACIDAD.md`:
  - Que datos se recogen
  - Con que base legal
  - Cuanto tiempo se conservan
  - Como se borran a peticion del usuario
