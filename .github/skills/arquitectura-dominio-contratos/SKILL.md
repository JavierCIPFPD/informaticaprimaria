---
name: arquitectura-dominio-contratos
description: "Usa esto cuando: tengas que definir arquitectura, modelo de dominio, fronteras entre modulos o contratos de servicios antes de codificar."
---

# Skill — Arquitectura, dominio y contratos

## Objetivo
Definir la estructura modular del proyecto antes de codificar, asegurando separacion de responsabilidades y contratos claros entre capas.

## Arquitectura de referencia (MVC por capas)

```
public/index.php          ← Front Controller + registro de rutas
src/
  bootstrap.php           ← Autoloader PSR-4 + helpers globales
  Core/                   ← Infraestructura transversal (Auth, DB, Csrf, Flash, Router)
  Controller/             ← Orquestacion: recibe request, delega, devuelve response
  Repository/             ← Acceso a datos: SQL via PDO, sin logica de negocio
  Service/                ← (opcional) Logica de negocio compleja reutilizable
  Domain/                 ← (opcional) Value objects, entidades de dominio
templates/
  layout/                 ← header.php, footer.php compartidos
  <modulo>/               ← templates especificos por modulo
```

## Reglas de capas
- **Controller**: recibe input, valida CSRF/auth, llama repository o service, pasa datos al template, redirige.
- **Repository**: solo SQL y mapeo de resultados. Sin logica de negocio. Sin acceso a $_POST/$_GET.
- **Template**: solo presentacion. Sin consultas SQL. Sin logica de negocio. Solo variables pasadas por el controller.

## Contrato de un modulo nuevo
Antes de implementar un modulo nuevo, definir:
1. **Entidades**: nombre, campos, relaciones, reglas de integridad
2. **Casos de uso**: lista de acciones (crear, editar, borrar, listar, activar...)
3. **Rutas**: GET/POST, parametros, permisos requeridos
4. **Repositorio**: metodos necesarios con firma
5. **Templates**: pantallas necesarias y datos que reciben

## Patron de ruta estandar
```
GET  /recurso              → Controller::index()     — lista + form inline
POST /recurso/guardar      → Controller::guardar()   — crear/editar (upsert)
POST /recurso/borrar/{id}  → Controller::borrar()    — eliminar
GET  /recurso/editar/{id}  → (opcional) edicion en pagina propia
```

## Fronteras entre modulos
- Los modulos se comunican solo a traves de repositorios o servicios, nunca accediendo a la BD de otro modulo directamente.
- Un controller no instancia el repositorio de otro modulo; usa su propio repository o un service compartido.

## Decisiones a documentar
- `docs/ARCHITECTURE_PROYECTO.md` — diagrama de modulos y relaciones
- `docs/CONTRACTS_PROYECTO.md` — contratos de repositorios y servicios
- `docs/OPEN_DECISIONS.md` — decisiones pendientes con fecha limite
