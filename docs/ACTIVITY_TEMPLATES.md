# Plantillas de actividades interactivas

## 1) Test autocorregible

Objetivo:
- Comprobar comprension de un concepto clave de la sesion.

Estructura:
- Enunciado breve.
- Opciones con radio o checkbox.
- Boton de comprobar.
- Region aria-live para feedback.
- Boton de reintento con pista.

Criterios:
- Feedback explicativo, no solo correcto/incorrecto.
- Navegable por teclado y lector de pantalla.

## 2) Arrastrar y soltar con alternativa accesible

Objetivo:
- Relacionar elementos (componente -> funcion).

Estructura:
- Lista de elementos arrastrables.
- Zonas de destino etiquetadas.
- Boton de comprobar.
- Modo alternativo con select para cada relacion.
- Region aria-live para resultados.

Criterios:
- Funciona con raton, tactil y teclado (modo alternativo).
- No depende solo del color para mostrar aciertos.

## 3) Rellenar huecos guiado

Objetivo:
- Consolidar vocabulario tecnico esencial.

Estructura:
- Frases cortas con select o input por hueco.
- Boton de comprobar.
- Feedback por hueco + resumen global.

Criterios:
- Opciones claras y pocas distracciones.
- Permite reintentar sin recargar pagina.

## Metadatos minimos por actividad
- id_actividad
- tipo
- objetivo_didactico
- criterio_de_exito
- pistas_disponibles
- evidencia_de_validacion
