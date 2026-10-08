---
name: php-clases
description: "Usa esto cuando: necesites crear o modificar clases PHP del proyecto. Incluye convenciones de estructura, propiedades, constructor, getters/setters y validaciones basicas."
---

# Skill — Clases PHP: convenciones

## Reglas generales
- `declare(strict_types=1)` en todos los ficheros
- Namespace `App\<Capa>\<NombreClase>`
- Un fichero por clase; nombre fichero = nombre clase + `.php`
- Inyeccion de dependencias por constructor (no instanciar en metodos)

## Controllers
```php
namespace App\Controller;

class RecursoController
{
    private RecursoRepository $repo;

    public function __construct()
    {
        $this->repo = new RecursoRepository();
    }

    public function index(): void
    {
        Auth::requireRole('ADMIN', 'EDITOR');
        $items = $this->repo->getAll(Auth::centroId());
        require __DIR__ . '/../../templates/recurso/index.php';
    }

    public function guardar(): void
    {
        Auth::requireRole('ADMIN', 'EDITOR');
        Csrf::check();
        // validar + guardar + Flash + redirect
    }

    public function borrar(int $id): void
    {
        Auth::requireRole('ADMIN');
        Csrf::check();
        // verificar ownership + borrar + Flash + redirect
    }
}
```

## Repositories
```php
namespace App\Repository;

class RecursoRepository extends BaseRepository
{
    public function getAll(int $idCentro): array
    {
        return $this->fetchAll('SELECT * FROM recursos WHERE id_centro=? AND activo=1', [$idCentro]);
    }

    public function findById(int $id): ?array
    {
        return $this->fetchOne('SELECT * FROM recursos WHERE id=?', [$id]);
    }

    public function save(array $data): void
    {
        if (!empty($data['id'])) {
            $this->execute('UPDATE recursos SET nombre=? WHERE id=?', [$data['nombre'], $data['id']]);
        } else {
            $this->execute('INSERT INTO recursos (nombre, id_centro) VALUES (?,?)', [$data['nombre'], $data['id_centro']]);
        }
    }

    public function delete(int $id): void
    {
        $this->execute('UPDATE recursos SET activo=0 WHERE id=?', [$id]);
    }
}
```

## Validacion en controllers
- Validar longitud maxima de strings
- Validar que IDs son enteros positivos
- Verificar que el recurso pertenece al centro del usuario autenticado
- Flash::error() con mensaje claro si falla la validacion

## Value Objects (opcional)
```php
namespace App\Domain;

final class Email
{
    public function __construct(public readonly string $value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Email invalido: {$value}");
        }
    }
}
```
