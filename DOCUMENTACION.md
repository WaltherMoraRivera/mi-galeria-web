# Documentación Técnica — Galería Pokémon

**Proyecto:** mi-galeria-web  
**Curso:** Programación Front End · TI3V31 · Unidad 1  
**Autor:** Walther Mora Rivera  
**Repositorio:** https://github.com/WaltherMoraRivera/mi-galeria-web  
**Sitio publicado:** https://walthermorarivera.github.io/mi-galeria-web/

---

## Tabla de contenidos

1. [Descripción general](#1-descripción-general)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Reto 0 — Preparación del terreno](#3-reto-0--preparación-del-terreno)
4. [Reto 1 — Esqueleto semántico HTML5](#4-reto-1--esqueleto-semántico-html5)
5. [Reto 2 — Estilos con CSS3](#5-reto-2--estilos-con-css3)
6. [Reto 3 — Datos en vivo con Fetch API](#6-reto-3--datos-en-vivo-con-fetch-api)
7. [Reto 4 — Control de versiones y publicación](#7-reto-4--control-de-versiones-y-publicación)
8. [Bonus — Buscador en vivo y modo oscuro](#8-bonus--buscador-en-vivo-y-modo-oscuro)
9. [Mejora — Fondos de pantalla personalizados](#9-mejora--fondos-de-pantalla-personalizados)
10. [Mejora — Sistema de favoritos](#10-mejora--sistema-de-favoritos)
11. [Historial de commits](#11-historial-de-commits)
12. [Tecnologías utilizadas](#12-tecnologías-utilizadas)
13. [Guía de actualización](#13-guía-de-actualización)

---

## 1. Descripción general

**Galería Pokémon** es un sitio web estático y dinámico desarrollado como desafío práctico del curso de Programación Front End (TI3V31, Unidad 1). El objetivo fue construir, desde cero y sin frameworks, una aplicación web que:

- Consuma una API pública REST en tiempo real.
- Muestre los datos obtenidos en un layout de tarjetas responsivo.
- Sea accesible, semántica y visualmente cuidada.
- Esté versionada con Git y publicada en internet.

El tema elegido fue la **PokéAPI** (`pokeapi.co`), mostrando los 151 pokémon de la primera generación con su imagen oficial, número de pokédex, nombre y tipos.

---

## 2. Estructura del proyecto

```
mi-galeria-web/
├── index.html          # Estructura HTML5 semántica y accesible
├── css/
│   └── estilos.css     # Estilos, layout, modo oscuro y animaciones
├── js/
│   └── app.js          # Lógica: Fetch, DOM, favoritos, buscador
├── img/
│   ├── Fondo_Web_Claro.png   # Fondo para modo claro
│   └── Fondo_Web_Oscuro.png  # Fondo para modo oscuro
├── .gitignore          # Exclusiones de Git
├── README.md           # Resumen público del proyecto
└── DOCUMENTACION.md    # Este archivo — documentación técnica detallada
```

---

## 3. Reto 0 — Preparación del terreno

**Puntos:** 10 | **Objetivo:** Crear el repositorio y la estructura base del proyecto.

### Pasos realizados

1. Se creó el repositorio público `mi-galeria-web` en GitHub, inicializado con un `README.md` automático.
2. Se clonó el repositorio al equipo local:
   ```bash
   git clone https://github.com/WaltherMoraRivera/mi-galeria-web.git
   ```
3. Se crearon las carpetas `css/` y `js/` y los archivos base:
   ```
   index.html
   css/estilos.css
   js/app.js
   ```
4. Se generó un `.gitignore` adaptado a proyectos web estáticos, excluyendo:
   - Archivos de sistema operativo (`.DS_Store`, `Thumbs.db`, `desktop.ini`)
   - Configuraciones de editor (`.vscode/`, `.idea/`)
   - Directorios de dependencias (`node_modules/`)
5. Se realizó el primer commit y push a `main`:
   ```bash
   git add .
   git commit -m "estructura inicial del proyecto"
   git push origin main
   ```

### Criterios cumplidos
- Repositorio público en GitHub con clon local funcional.
- Estructura de carpetas y archivos correctamente organizada.
- Primer commit con mensaje descriptivo y push exitoso.

---

## 4. Reto 1 — Esqueleto semántico HTML5

**Puntos:** 20 | **Objetivo:** Construir la estructura HTML semántica y accesible del sitio.

### Decisiones técnicas

- Se usó un único `<h1>` para el título principal del sitio, respetando la jerarquía de encabezados.
- El campo de búsqueda fue asociado explícitamente a su `<label>` mediante los atributos `for` e `id`, cumpliendo con las pautas WCAG de accesibilidad.
- Se incluyó `<html lang="es">` para indicar el idioma del documento a los lectores de pantalla.
- El atributo `<meta name="viewport">` garantiza el comportamiento responsivo en dispositivos móviles.
- Las tarjetas se inyectan dinámicamente dentro de `<section id="galeria">`, manteniendo la separación entre estructura y lógica.

### Estructura HTML resultante

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Galería Pokémon</title>
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <header class="site-header">         <!-- Cabecera con título y controles -->
    <h1>Galería Pokémon</h1>
    <label for="buscar">Buscar</label>
    <input id="buscar" type="text" placeholder="Filtrar por nombre...">
    <button id="modo-oscuro">🌙 Modo oscuro</button>
  </header>

  <main>
    <section id="seccion-favoritos">   <!-- Favoritos fijos (oculto por defecto) -->
      <h2>Favoritos</h2>
      <div id="favoritos-grid"></div>
    </section>

    <button id="cargar">Cargar Pokémon</button>
    <p id="contador"></p>
    <section id="galeria">             <!-- Tarjetas inyectadas por JS -->
    </section>
  </main>

  <footer>...</footer>
  <script src="js/app.js"></script>    <!-- JS al final del body -->
</body>
</html>
```

### Criterios cumplidos
- Etiquetas semánticas en todas las zonas (`header`, `main`, `section`, `footer`).
- Un único `<h1>` con jerarquía lógica de encabezados.
- `<label>` asociado al input de búsqueda con `for`/`id`.
- Contenedor `<section id="galeria">` listo para recibir tarjetas dinámicas.

---

## 5. Reto 2 — Estilos con CSS3

**Puntos:** 25 | **Objetivo:** Estilizar el sitio con un layout responsivo, accesible y visualmente coherente.

### Sistema de variables CSS

Se definió una paleta completa con custom properties en `:root`, permitiendo cambiar el tema del sitio modificando un solo bloque:

```css
:root {
  --bg: #0f1724;
  --surface: #1a2438;
  --card: #ffffff;
  --card-text: #1a2438;
  --acc: #2563eb;
  --acc-hover: #1d4ed8;
  --tipo-bg: #e0e7ff;
  --tipo-text: #3730a3;
  --shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  --radius: 14px;
  --transition: 0.25s ease;
}
```

El modo oscuro redefine únicamente las variables que cambian, sin duplicar reglas:

```css
body.dark {
  --card: #1e293b;
  --card-text: #e2e8f0;
  --tipo-bg: #1e3a5f;
  --tipo-text: #93c5fd;
}
```

### Layout con CSS Grid

La galería usa `grid` con `auto-fill` y `minmax`, lo que permite columnas fluidas sin necesidad de media queries para el número de columnas:

```css
#galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.2rem;
}
```

En móvil (`max-width: 600px`) se fuerza a 2 columnas; en pantallas muy pequeñas (`max-width: 380px`) a 1 columna.

### Accesibilidad visual

- Contraste de texto revisado para cumplir nivel AA de WCAG.
- Todos los elementos interactivos tienen un estado `:focus-visible` con contorno de 3px en el color de acento.
- Los estados `:hover` en tarjetas y botones incluyen transiciones suaves para no desorientar al usuario.

### Criterios cumplidos
- Grid responsivo con columna única en móvil.
- Variables CSS para paleta coherente y modo oscuro.
- `:focus-visible` en botones e inputs.
- Transiciones suaves en hover de tarjetas.

---

## 6. Reto 3 — Datos en vivo con Fetch API

**Puntos:** 30 | **Objetivo:** Consumir la PokéAPI y renderizar los datos en tarjetas, con manejo de errores.

### Estrategia de consumo

Se optó por una estrategia en dos pasos para minimizar las llamadas secuenciales:

1. **Primera llamada:** obtiene la lista de los primeros 151 pokémon (nombre y URL individual de cada uno).
2. **Llamadas paralelas:** con `Promise.all()` se lanza la petición de detalle de cada pokémon en paralelo, reduciendo el tiempo total de carga significativamente.

```js
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
const data = await res.json();
const promesas = data.results.map(p => fetchPokemon(p.url));
const pokemones = await Promise.all(promesas);
```

### Manejo de errores

Se implementaron dos niveles de manejo de errores:

- **Nivel global:** `try/catch` en `cargarDatos()` captura fallos de red o respuestas inválidas y muestra un mensaje al usuario.
- **Nivel individual:** `fetchPokemon()` tiene su propio `try/catch` y retorna `null` si una petición individual falla, evitando que un solo pokémon rompa toda la galería.

```js
async function fetchPokemon(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
```

### Validación de datos

Antes de renderizar cada tarjeta se validan los campos con el operador de encadenamiento opcional (`?.`) y valores por defecto con `??`, evitando errores en tiempo de ejecución si la API devuelve campos inesperados:

```js
const imagen =
  pokemon.sprites?.other?.["official-artwork"]?.front_default ??
  pokemon.sprites?.front_default ??
  "";
const tipos = Array.isArray(pokemon.types)
  ? pokemon.types.map(t => t.type?.name).filter(Boolean)
  : [];
```

### Estructura de cada tarjeta

Cada pokémon se renderiza como un `<article class="tarjeta">` con:
- Imagen oficial de alta resolución (con `loading="lazy"` para rendimiento)
- Número de pokédex formateado con ceros a la izquierda (`#001`)
- Nombre en minúsculas capitalizado con CSS (`text-transform: capitalize`)
- Tipos como `<span class="tipo">` con color de fondo propio

### Criterios cumplidos
- Datos reales obtenidos de la PokéAPI con `fetch` y `async/await`.
- `try/catch` en dos niveles y verificación de `response.ok`.
- Mensaje de error visible al usuario si la API falla.
- Validación de campos antes de renderizar.
- Sin errores en consola del navegador.

---

## 7. Reto 4 — Control de versiones y publicación

**Puntos:** 15 | **Objetivo:** Flujo de ramas en Git y publicación en GitHub Pages.

### Flujo de trabajo con ramas

Se creó la rama `feature/mejoras-ui` para desarrollar las mejoras de interfaz de forma aislada de `main`:

```bash
git checkout -b feature/mejoras-ui
# ... desarrollo ...
git push origin feature/mejoras-ui
git checkout main
git merge feature/mejoras-ui
git push origin main
```

Las mejoras desarrolladas en esta rama fueron:
- Animación de entrada (`@keyframes aparecer`) para las tarjetas al cargar.
- Spinner de carga animado con tres puntos pulsantes mientras se espera la respuesta de la API.
- Contador dinámico que muestra cuántos pokémon están visibles respecto al total.

### Publicación en GitHub Pages

El sitio se publicó activando GitHub Pages desde:
`Settings → Pages → Branch: main → Folder: / (root)`

URL pública resultante: **https://walthermorarivera.github.io/mi-galeria-web/**

### Publicación adicional en Render

El sitio también fue desplegado en Render como Static Site, configurado con:
- **Branch:** `main`
- **Build Command:** *(vacío, no requiere compilación)*
- **Publish Directory:** `.`

Render redespliega automáticamente con cada `git push` a `main`.

### Historial de commits al cierre del reto

```
083ca63  corrige URL de GitHub Pages en el README
674ec42  documenta el proyecto en README con descripción, tecnologías y estructura
2fc12aa  agrega contador de resultados visibles y conecta spinner al estado de carga
edf0550  agrega animación de entrada y spinner de carga a las tarjetas
53eb4a4  estructura inicial del proyecto
bf5b016  Initial commit
```

### Criterios cumplidos
- 6 commits con mensajes descriptivos en imperativo.
- Rama `feature/mejoras-ui` creada, trabajada y fusionada a `main`.
- Sitio publicado y accesible desde su URL pública.
- README con descripción del proyecto y enlace al sitio.

---

## 8. Bonus — Buscador en vivo y modo oscuro

**Puntos:** +10 | **Objetivo:** Funcionalidades adicionales para mejorar la experiencia de usuario.

### Buscador en vivo

El buscador filtra las tarjetas en el DOM sin hacer nuevas llamadas a la API. Escucha el evento `input` en tiempo real y aplica/retira la clase `oculta` (que hace `display: none`) a cada tarjeta según si su nombre incluye el texto ingresado:

```js
inputBuscar.addEventListener("input", () => {
  const termino = inputBuscar.value.toLowerCase().trim();
  galeria.querySelectorAll(".tarjeta").forEach(card => {
    card.classList.toggle("oculta", !card.dataset.nombre.includes(termino));
  });
  actualizarContador();
});
```

El atributo `data-nombre` en cada tarjeta almacena el nombre del pokémon en minúsculas para que la comparación sea case-insensitive sin manipulación extra.

### Modo oscuro

El toggle de modo oscuro añade/retira la clase `dark` del `<body>`. Todas las transiciones de color son automáticas gracias a las variables CSS definidas en `:root` y sobreescritas en `body.dark`. También cambia el fondo de pantalla (ver sección 9):

```js
btnModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const activo = document.body.classList.contains("dark");
  btnModo.textContent = activo ? "☀️ Modo claro" : "🌙 Modo oscuro";
});
```

---

## 9. Mejora — Fondos de pantalla personalizados

**Objetivo:** Aplicar imágenes de fondo temáticas que cambien según el modo activo.

Se creó la carpeta `img/` en la raíz del proyecto para alojar los assets visuales. Las imágenes se aplican mediante `background-image` en el `body`, con `background-size: cover` y `background-attachment: fixed` para efecto parallax al hacer scroll:

```css
body {
  background-image: url('../img/Fondo_Web_Claro.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

body.dark {
  background-image: url('../img/Fondo_Web_Oscuro.png');
}
```

| Archivo | Modo | Descripción |
|---|---|---|
| `Fondo_Web_Claro.png` | Claro | Fondo con estética Pokéball en tonos rosas/blancos |
| `Fondo_Web_Oscuro.png` | Oscuro | Fondo con estética HUD/circuitos en tonos rojo/negro |

El cambio de fondo es instantáneo al activar el toggle de modo oscuro, sin parpadeo, gracias a que la transición de `background` está definida en la propiedad `transition` del `body`.

---

## 10. Mejora — Sistema de favoritos

**Objetivo:** Permitir marcar tarjetas como favoritas y mostrarlas de forma destacada en la parte superior de la página durante la sesión.

### Almacenamiento en memoria

Los favoritos se almacenan en un `Map` de JavaScript con el `id` del pokémon como clave y sus datos como valor. El `Map` preserva el orden de inserción y permite operaciones O(1) de búsqueda, inserción y eliminación:

```js
const favoritos = new Map(); // id (número) -> { id, nombre, imagen }
```

Al recargar la página el `Map` se reinicia, cumpliendo el requisito de persistencia solo durante la sesión.

### Botón estrella en las tarjetas

Cada tarjeta incluye un botón `⭐` posicionado en la esquina superior derecha con `position: absolute` (la tarjeta tiene `position: relative`). El estado visual se controla con la clase `activo`:

```css
.btn-fav {
  position: absolute;
  top: 8px;
  right: 8px;
  filter: grayscale(1) opacity(0.45); /* inactivo */
}

.btn-fav.activo {
  filter: grayscale(0) opacity(1);    /* activo — estrella dorada */
}
```

### Función `toggleFavorito`

Gestiona el estado de cada favorito y mantiene sincronizados el botón de la tarjeta y el chip en la sección superior:

```js
function toggleFavorito(pokemon, btn) {
  if (favoritos.has(pokemon.id)) {
    favoritos.delete(pokemon.id);
    btn.classList.remove("activo");
  } else {
    favoritos.set(pokemon.id, pokemon);
    btn.classList.add("activo");
  }
  renderizarFavoritos();
}
```

### Sección de favoritos

La `<section id="seccion-favoritos">` está oculta por defecto (`hidden`). Aparece automáticamente cuando hay al menos un favorito y desaparece cuando la lista queda vacía. Cada favorito se muestra como un chip con la imagen miniatura del pokémon, su nombre y un botón `✕` para quitarlo:

```
[ 🖼 bulbasaur ✕ ]  [ 🖼 charmander ✕ ]  [ 🖼 pikachu ✕ ]
```

Al quitar un favorito desde el chip, la estrella de la tarjeta correspondiente en la galería se desactiva automáticamente mediante una búsqueda por `data-nombre`:

```js
const btn = galeria.querySelector(`.tarjeta[data-nombre="${pokemon.nombre}"] .btn-fav`);
if (btn) btn.classList.remove("activo");
```

---

## 11. Historial de commits

| Hash | Mensaje | Descripción |
|---|---|---|
| `bf5b016` | Initial commit | README automático de GitHub |
| `53eb4a4` | estructura inicial del proyecto | HTML, CSS, JS base + .gitignore |
| `edf0550` | agrega animación de entrada y spinner de carga | CSS: keyframes y spinner |
| `2fc12aa` | agrega contador de resultados visibles | JS + HTML: contador dinámico |
| `674ec42` | documenta el proyecto en README | README completo con tabla de tecnologías |
| `083ca63` | corrige URL de GitHub Pages en el README | URL correcta del sitio |
| `d34f238` | agrega fondos personalizados para modo claro y oscuro | Carpeta img/ + CSS background |
| `a990832` | actualiza fondos de pantalla para modo claro y oscuro | Reemplazo de imágenes de fondo |
| `bbd8364` | corrige URL de GitHub Pages en el README | URL final verificada |
| `e431e75` | agrega sistema de favoritos | HTML + CSS + JS del sistema de favoritos |

---

## 12. Tecnologías utilizadas

| Tecnología | Versión / Estándar | Uso en el proyecto |
|---|---|---|
| HTML5 | Living Standard | Estructura semántica y accesible |
| CSS3 | Living Standard | Layout, variables, animaciones, responsive |
| JavaScript | ES2022 (ES13) | Fetch API, DOM, async/await, Map, `?.` |
| PokéAPI | v2 | Fuente de datos de pokémon |
| Git | 2.x | Control de versiones local |
| GitHub | — | Repositorio remoto y colaboración |
| GitHub Pages | — | Hosting estático gratuito |
| Render | — | Hosting estático con CI/CD automático |

---

## 13. Guía de actualización

Esta sección describe el proceso que se debe seguir al realizar cualquier nueva mejora o corrección al proyecto, para mantener la documentación siempre sincronizada con el código.

### Al agregar una nueva funcionalidad

1. Crear una rama descriptiva:
   ```bash
   git checkout -b feature/nombre-de-la-mejora
   ```
2. Desarrollar y hacer commits atómicos con mensajes claros en imperativo.
3. Actualizar **este archivo** (`DOCUMENTACION.md`):
   - Agregar una nueva sección numerada bajo "Mejora — Nombre de la funcionalidad".
   - Documentar: objetivo, decisiones técnicas, fragmentos de código clave y resultado.
   - Agregar la entrada correspondiente en la tabla del [Historial de commits](#11-historial-de-commits).
4. Actualizar `README.md` si cambia algún dato del resumen público (URL, descripción, tecnologías).
5. Hacer merge a `main` y push:
   ```bash
   git checkout main
   git merge feature/nombre-de-la-mejora
   git push origin main
   ```

### Al corregir un bug

1. Trabajar directamente en `main` si el fix es trivial, o en una rama `fix/descripcion` si requiere más de un commit.
2. Actualizar la tabla del historial de commits en `DOCUMENTACION.md`.
3. Si el bug afectaba alguna funcionalidad documentada, corregir la sección correspondiente.

### Convención de mensajes de commit

```
<verbo en imperativo> <qué> [<dónde/contexto>]

Ejemplos:
  agrega filtro por tipo a la galería
  corrige desbordamiento de imagen en tarjetas móvil
  actualiza URL del sitio en README y DOCUMENTACION
```
