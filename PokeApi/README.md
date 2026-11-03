# PokeFinder

PokeFinder es una Pokédex sencilla para demostrar consumo de APIs desde frontend con AngularJS 1.8.2. Usa [PokeAPI](https://pokeapi.co/) como fuente de datos, Tailwind CSS por CDN para utilidades y `css/styles.css` para la identidad visual y las animaciones.

## Estructura

- `index.html`: estructura de la interfaz, tarjetas, buscador y modal de detalle.
- `tipos.html`: vista independiente para explorar los tipos de Pokémon.
- `js/app.js`: módulo AngularJS, servicio HTTP, directiva de tarjetas, filtros y controlador.
- `css/styles.css`: paleta, layout responsive y animaciones.
- `lib/angular.min.js`: AngularJS 1.8.2 local para poder abrir el proyecto sin depender de un CDN para el framework.

## Funcionalidades

- Carga de Pokémon destacados aleatorios al iniciar.
- Secciones de Pokémon de mayor poder, raros y legendarios.
- Catálogo completo de nombres y búsqueda por nombre o número.
- Catálogo independiente con 16 tipos y sus Pokémon destacados.
- Modal con tipos, habilidades y estadísticas.
- Favoritos persistidos en `localStorage`.
- Estados de carga, resultados vacíos y error de conexión.

Abre `index.html` con un servidor local (por ejemplo, Live Server) para evitar restricciones del navegador sobre archivos locales. La API es pública y requiere conexión a internet.
