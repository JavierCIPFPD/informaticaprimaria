---
name: seguridad-aplicacion
description: "Usa esto cuando: disenes o implementes autenticacion, autorizacion, validaciones de entrada/salida, auditoria o cumplimiento de privacidad."
---

# Skill — Seguridad de aplicacion

## Objetivo
Aplicar seguridad por defecto y minimizar riesgos operativos y legales (OWASP Top 10).

## Controles obligatorios

### Autenticacion
- `password_hash($pass, PASSWORD_BCRYPT)` para almacenar
- `password_verify($pass, $hash)` para verificar
- `session_regenerate_id(true)` tras login exitoso
- Bloqueo de cuenta tras N intentos fallidos (implementar en Fase 6)

### Autorizacion
- `Auth::requireRole('ROL')` al inicio de cada metodo de controller
- Verificar ownership antes de operar sobre un recurso (el recurso pertenece al centro/usuario actual)
- Principio de minimo privilegio: dar solo el acceso necesario por rol

### Proteccion CSRF
- Token aleatorio `bin2hex(random_bytes(32))` en sesion
- Campo oculto `_csrf` en todos los formularios POST
- `Csrf::check()` al inicio de todos los metodos POST

### Validacion de entrada
- Filtrar y sanitizar ANTES de usar cualquier dato externo
- Longitudes maximas en todos los inputs de texto
- Tipos esperados estrictos (int, string, enum)
- Rechazar entradas que no cumplan el formato esperado

### Escape de salida
- `e($valor)` = `htmlspecialchars($valor, ENT_QUOTES, 'UTF-8')` en todos los outputs HTML
- `json_encode($data, JSON_HEX_TAG)` para outputs JSON
- Nunca insertar HTML crudo desde datos de usuario

### SQL
- PDO con `ATTR_EMULATE_PREPARES = false`
- Siempre prepared statements; nunca concatenacion de SQL con datos externos
- `ATTR_ERRMODE = ERRMODE_EXCEPTION` para capturar errores

## Auditoria y trazabilidad
- Registrar actor, accion, entidad, valores relevantes y timestamp en `historial_cambios`
- Registrar intentos de acceso denegado
- Los errores no exponen stack traces ni informacion interna en produccion

## Privacidad
- Minimizacion de datos personales en vistas e informes
- Enmascarar datos sensibles cuando no sean imprescindibles
- Definir politica de retencion para logs y auditoria

## Checklist de seguridad por entrega
1. Sin SQLi, XSS o CSRF evidentes
2. Rutas sensibles validan sesion y permisos
3. Acciones destructivas requieren confirmacion y CSRF
4. Errores no exponen informacion interna
5. Casos de abuso basico cubiertos con pruebas
