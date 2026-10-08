---
name: esquema-sql
description: "Usa esto cuando: necesites crear o modificar tablas SQL, scripts DDL o datos de prueba para el proyecto."
---

# Skill — Esquema SQL y diseno de BD

## Convenciones de nomenclatura
- Nombres de tabla: `snake_case` plural (`usuarios`, `centros`, `recursos`)
- Clave primaria: siempre `id INT AUTO_INCREMENT PRIMARY KEY`
- Claves foraneas: `id_<tabla_referenciada>` (ej. `id_centro`)
- Campos de auditoria: `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`, `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
- Soft delete: columna `activo TINYINT(1) NOT NULL DEFAULT 1`

## Tipos recomendados
- Textos cortos (nombre, codigo): `VARCHAR(150)`
- Textos largos (descripcion): `TEXT`
- Booleanos: `TINYINT(1)` (0/1)
- Enumerados fijos: `ENUM('VALOR1','VALOR2')` — documentar valores validos
- Fechas: `DATE`; fechas+hora: `DATETIME` o `TIMESTAMP`
- Numeros decimales: `DECIMAL(10,2)` (nunca FLOAT para valores monetarios)

## Integridad referencial
- Todas las FK deben tener `ON DELETE` definido explicitamente
  - Entidades maestro dependientes: `ON DELETE RESTRICT`
  - Datos operativos: `ON DELETE CASCADE`
  - Registros de auditoria: `ON DELETE SET NULL`

## Indices
- FK siempre indexadas
- Columnas usadas en WHERE frecuente: indice simple
- Busquedas por (col1, col2): indice compuesto (col1 primero)
- Campos con cardinalidad baja (activo, estado): no indexar solos

## Plantilla de tabla
```sql
CREATE TABLE IF NOT EXISTS recursos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    id_centro       INT NOT NULL,
    nombre          VARCHAR(150) NOT NULL,
    descripcion     TEXT,
    activo          TINYINT(1) NOT NULL DEFAULT 1,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_centro) REFERENCES centros(id) ON DELETE RESTRICT,
    INDEX idx_centro (id_centro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Seed de datos de prueba
- Siempre usar `INSERT IGNORE` o comprobar existencia antes de insertar
- Passwords en seed: `password_hash('password123', PASSWORD_BCRYPT)`
- Datos suficientes para probar todos los flujos principales
- Documentar credenciales de prueba en `docs/PROJECT_STATUS.md`

## Migraciones
- Versionar scripts en `db/migrations/V001__descripcion.sql`
- Los scripts son idempotentes: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... IF NOT EXISTS ...`
- Nunca modificar migraciones ya aplicadas en produccion
