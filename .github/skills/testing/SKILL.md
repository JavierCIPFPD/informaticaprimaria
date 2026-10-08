---
name: testing
description: "Usa esto cuando: necesites definir o ejecutar estrategia de pruebas completa (unitarias, integracion, regresion, seguridad y rendimiento basico)."
---

# Skill — Testing

## Objetivo
Garantizar calidad funcional y no regresion en cada entrega, sin sobreingenieria de infraestructura de pruebas.

## Niveles de prueba

### Pruebas de sintaxis (automatizables inmediatamente)
```powershell
Get-ChildItem -Recurse -Include *.php "src\","public\" | ForEach-Object {
    $r = & "C:\xampp\php\php.exe" -l $_.FullName 2>&1
    if ($r -notmatch "No syntax errors") { Write-Host "ERROR: $($_.Name)`n$r" }
}
```

### Smoke test manual (por sesion)
Definir checklist de flujos criticos:
1. Login / logout
2. CRUD principal del modulo en desarrollo
3. Validacion de permisos (rol incorrecto → 403)
4. Validacion CSRF (enviar sin token → rechazado)
5. Flujo completo E2E del caso de uso principal

### Pruebas de integracion PHP (sin PHPUnit si no hay Composer)
```php
// Estructura de prueba simple: db/tests/test_<modulo>.php
require_once __DIR__ . '/../src/bootstrap.php';
$repo = new App\Repository\RecursoRepository();
$result = $repo->getAll(1);
assert(is_array($result), 'getAll debe devolver array');
echo count($result) . " registros OK\n";
```

### Pruebas de regresion
- Script de smoke test ejecutable: `db/tests/smoke.php`
- Ejecutar antes de cada merge o release
- Documentar resultados en `docs/sesiones/SX_Y_CHECKLIST.md`

## Checklist de cierre de historia
- [ ] Sintaxis PHP valida (`php -l`)
- [ ] Smoke test manual completado y documentado
- [ ] Caso de acceso no autorizado probado
- [ ] Caso de input invalido probado (campos vacios, tipos incorrectos)
- [ ] No hay regresion en flujos ya probados anteriormente

## Datos de prueba
- Usar seed en `db/seed.php` como estado base reproducible
- Para pruebas complejas, datasets en `docs/tests/datasets/`
- Nunca usar datos reales de usuarios en pruebas

## Cuando agregar PHPUnit
- Cuando el proyecto tenga logica de negocio compleja en services o domain
- Cuando el ciclo de pruebas manuales se vuelva insostenible
- Documentar decision en `docs/PROJECT_STATUS.md`
