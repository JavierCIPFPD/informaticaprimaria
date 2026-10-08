# Cuaderno Web - Informatica para primaria

Aplicacion web de consulta para alumnado de 5o y 6o de primaria (11-12 anos), con acceso publico y enfoque didactico.

## Stack activo
- HTML5
- CSS3
- JavaScript ES2023+
- jQuery 3.7+ (CDN)
- Bootstrap 5.3+ (CDN)
- Font Awesome 6.5+ (CDN)

## Alcance actual
- Sin login y sin roles.
- Sin backend ni base de datos en esta fase.
- Estructura academica:
  - 2 cursos
  - 3 trimestres por curso
  - 12 sesiones por trimestre
  - Cada sesion: 1 hora de explicacion + 1 hora de practica

## Objetivos de calidad
- Cumplimiento WCAG 2.1 AA.
- Diseno responsive para movil, tablet y PC.
- Lenguaje claro y apropiado para alumnado.
- Estilo formal con un toque ludico.

## Estructura prevista
- `public/` - HTML, assets y recursos del cuaderno
- `docs/` - estado del proyecto, trazabilidad y documentacion funcional
- `docs/design-system/` - fundamentos, tokens y componentes UI
- `referencia/` - materiales de apoyo para contenidos didacticos
- `.github/skills/` - skills de gobernanza y calidad para el agente

## Inicio recomendado con Copilot
Usar el bloque de [STARTER_PROMPT.md](STARTER_PROMPT.md) y seguir las fases de trabajo.

## Evolucion futura (opcional)
Si el proyecto necesita persistencia o gestion avanzada, se podra evolucionar a PHP + MySQL con arquitectura MVC.
