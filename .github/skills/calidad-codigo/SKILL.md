---
name: calidad-codigo
description: "Usa esto cuando: se creen o revisen cambios de codigo y necesites aplicar estandares de calidad, mantenibilidad y revisiones tecnicas estrictas."
---

# Skill — Calidad de codigo

## Objetivo
Garantizar que el codigo entregado sea correcto, mantenible, seguro y consistente con las convenciones del proyecto.

## Estandares de codigo PHP
- `declare(strict_types=1)` en todos los ficheros PHP
- Namespace `App\` con autoloader PSR-4 manual en `src/bootstrap.php`
- Un fichero por clase; nombre de clase = nombre de fichero
- Metodos de menos de 30 lineas; clases de menos de 200 lineas
- Sin logica de negocio en templates (solo presentacion)
- Sin consultas SQL directas en controllers (solo en repositories)

## Gates de calidad obligatorios
1. Validacion de sintaxis: `php -l` en todos los ficheros modificados
2. Sin SQLi: toda entrada de usuario pasa por prepared statements PDO
3. Sin XSS: toda salida HTML pasa por `e()` = `htmlspecialchars()`
4. Sin CSRF: todos los formularios POST tienen token CSRF verificado
5. Sin secretos en codigo: credenciales en `config/` excluido de VCS

## Revision de codigo — checklist
- [ ] La funcion hace una sola cosa y tiene nombre descriptivo
- [ ] No hay variables globales ni estado mutable compartido
- [ ] Las rutas protegidas llaman a `Auth::requireRole()` al inicio
- [ ] Los errores se manejan con Flash + redirect, no con die()
- [ ] Las migraciones SQL son idempotentes o versionadas
- [ ] Los templates solo usan variables pasadas por el controller

## Deuda tecnica
- Registrar deuda en `docs/PROJECT_STATUS.md` con ID, descripcion y prioridad
- No aceptar deuda en modulos de seguridad o integridad de datos
- Revisar deuda acumulada al cerrar cada fase

## Antipatrones prohibidos
- `extract($_POST)` o `extract($_GET)`
- `eval()`, `exec()`, `system()` con datos de usuario
- Consultas SQL concatenadas con datos de usuario
- `password_md5()` o almacenamiento de passwords en texto plano
- Ignorar errores de PDO con `@`
