# Documentación Técnica — Pokedex-Z

> **Versión 1.0** — Primera versión estable y completa. Fecha de cierre: 2026-06-10.

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
11. [Mejora — Favicon e icono de cabecera](#11-mejora--favicon-e-icono-de-cabecera)
12. [Mejora — Modo oscuro por defecto](#12-mejora--modo-oscuro-por-defecto)
13. [Mejora — Soporte para todas las generaciones (Gen I–IX)](#13-mejora--soporte-para-todas-las-generaciones-gen-iix)
14. [Mejora — Colores oficiales por tipo](#14-mejora--colores-oficiales-por-tipo)
15. [Historial de commits](#15-historial-de-commits)
16. [Tecnologías utilizadas](#16-tecnologías-utilizadas)
17. [Guía de actualización](#17-guía-de-actualización)

---

## 1. Descripción general

**Pokedex-Z** es un sitio web estático y dinámico desarrollado como desafío práctico del curso de Programación Front End (TI3V31, Unidad 1). El objetivo fue construir, desde cero y sin frameworks, una aplicación web que:

- Consuma una API pública REST en tiempo real.
- Muestre los datos obtenidos en un layout de tarjetas responsivo.
- Sea accesible, semántica y visualmente cuidada.
- Esté versionada con Git y publicada en internet.

El tema elegido fue la **PokéAPI** (`pokeapi.co`), mostrando hasta los **1.025 pokémon** de las nueve generaciones, con imagen oficial, número de pokédex, nombre y tipos con colores oficiales.

---

## 2. Estructura del proyecto

```
mi-galeria-web/
├── index.html              # Estructura HTML5 semántica y accesible
├── css/
│   └── estilos.css         # Estilos, layout, modo oscuro y animaciones
├── js/
│   └── app.js              # Lógica: Fetch, DOM, generaciones, favoritos, buscador
├── img/
│   ├── Fondo_Web_Claro.png # Fondo para modo claro
│   ├── Fondo_Web_Oscuro.png# Fondo para modo oscuro
│   └── Icono_Web.png       # Favicon e icono del header
├── .gitignore              # Exclusiones de Git
├── README.md               # Resumen público del proyecto
└── DOCUMENTACION.md        # Este archivo — documentación técnica detallada
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
5. Se realizó el primer commit y push a `main`.

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
- Las tarjetas se inyectan dinámicamente dentro de contenedores por generación, manteniendo la separación entre estructura y lógica.

### Estructura HTML actual

```html
<body class="dark">
  <header class="site-header">
    <img class="header-icon" src="img/Icono_Web.png">
    <h1>Pokedex-Z</h1>
    <label for="buscar">Buscar</label>
    <input id="buscar" type="text">
    <button id="modo-oscuro">☀️ Modo claro</button>
  </header>
  <main>
    <div class="selector-gen">          <!-- Selector de generaciones a cargar -->
      <div class="gen-checks">...</div> <!-- 9 checkboxes Gen I–IX -->
      <div class="gen-acciones-rapidas">
        <button id="sel-todo">Seleccionar todo</button>
        <button id="desel-todo">Desmarcar todo</button>
      </div>
      <button id="cargar">Cargar Pokémon</button>
    </div>
    <div id="filtros-gen">             <!-- Panel filtro multi-selección -->
      <div class="filtro-panel">
        <div id="filtro-checks">...</div>
        <button id="filtro-sel-todo">Seleccionar todo</button>
        <button id="filtro-desel-todo">Desmarcar todo</button>
      </div>
    </div>
    <section id="seccion-favoritos">   <!-- Chips de favoritos (oculto por defecto) -->
    <p id="contador"></p>
    <div id="galeria">                 <!-- Secciones por generación inyectadas por JS -->
      <div class="gen-seccion" data-gen="1">
        <h2 class="gen-heading">Generación I</h2>
        <div class="gen-seccion-grid"><!-- tarjetas --></div>
      </div>
      ...
    </div>
  </main>
  <footer>...</footer>
  <script src="js/app.js"></script>
</body>
```

### Criterios cumplidos
- Etiquetas semánticas en todas las zonas (`header`, `main`, `section`, `footer`).
- Un único `<h1>` con jerarquía lógica de encabezados.
- `<label>` asociado al input de búsqueda con `for`/`id`.
- Contenedores por generación listos para recibir tarjetas dinámicas.

---

## 5. Reto 2 — Estilos con CSS3

**Puntos:** 25 | **Objetivo:** Estilizar el sitio con un layout responsivo, accesible y visualmente coherente.

### Sistema de variables CSS

Se definió una paleta completa con custom properties en `:root`:

```css
:root {
  --bg: #0f1724;
  --card: #ffffff;
  --card-text: #1a2438;
  --acc: #2563eb;
  --acc-hover: #1d4ed8;
  --shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  --radius: 14px;
  --transition: 0.25s ease;
}
```

El modo oscuro redefine únicamente las variables que cambian:

```css
body.dark {
  --card: #1e293b;
  --card-text: #e2e8f0;
  background-image: url('../img/Fondo_Web_Oscuro.png');
}
```

### Layout con CSS Grid por sección

Cada generación vive en un `.gen-seccion` (flex columna). Dentro, `.gen-seccion-grid` tiene el grid de tarjetas:

```css
#galeria { display: flex; flex-direction: column; gap: 2rem; }

.gen-seccion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.2rem;
}
```

Este diseño resuelve el problema de encabezados apilados que ocurría con un grid plano único cuando las generaciones cargaban en paralelo.

### Accesibilidad visual

- Contraste de texto revisado para cumplir nivel AA de WCAG.
- Todos los elementos interactivos tienen `:focus-visible` con contorno de 3px en el color de acento.
- Transiciones suaves en hover de tarjetas y botones.

### Criterios cumplidos
- Grid responsivo con columna única en móvil.
- Variables CSS para paleta coherente y modo oscuro.
- `:focus-visible` en botones e inputs.
- Transiciones suaves en hover de tarjetas.

---

## 6. Reto 3 — Datos en vivo con Fetch API

**Puntos:** 30 | **Objetivo:** Consumir la PokéAPI y renderizar los datos en tarjetas, con manejo de errores.

### Estrategia de carga progresiva por generación

Se usa `Promise.all` para lanzar todas las generaciones seleccionadas en paralelo. Cada generación crea su contenedor en el DOM de forma síncrona (garantizando el orden visual) y lo rellena al recibir los datos:

```js
// 1. Crear todos los contenedores en orden ANTES de los fetch
seleccion.forEach(numGen => {
  const seccion = document.createElement("div");
  seccion.className = "gen-seccion";
  galeria.appendChild(seccion); // orden garantizado
});

// 2. Cargar en paralelo — cada gen rellena su propio contenedor
await Promise.all(seleccion.map(n => cargarGeneracion(n)));
```

Cada generación usa `limit` y `offset` para pedir exactamente su rango:

```js
const res = await fetch(
  `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${offset}`
);
```

### Manejo de errores en dos niveles

- **Por generación:** `cargarGeneracion()` tiene `try/catch` propio — si falla una generación, las demás no se ven afectadas.
- **Por pokémon individual:** `fetchPokemon()` retorna `null` en caso de fallo sin romper la galería.

### Validación de datos

```js
const imagen =
  pokemon.sprites?.other?.["official-artwork"]?.front_default ??
  pokemon.sprites?.front_default ?? "";
const tipos = Array.isArray(pokemon.types)
  ? pokemon.types.map(t => t.type?.name).filter(Boolean) : [];
```

### Criterios cumplidos
- Datos reales obtenidos de la PokéAPI con `fetch` y `async/await`.
- `try/catch` en dos niveles y verificación de `response.ok`.
- Mensaje de error por sección si la API falla.
- Validación de campos antes de renderizar.

---

## 7. Reto 4 — Control de versiones y publicación

**Puntos:** 15 | **Objetivo:** Flujo de ramas en Git y publicación en GitHub Pages.

### Flujo de trabajo con ramas

Se creó la rama `feature/mejoras-ui` para desarrollar las mejoras de interfaz de forma aislada de `main`:

```bash
git checkout -b feature/mejoras-ui
git push origin feature/mejoras-ui
git checkout main
git merge feature/mejoras-ui
git push origin main
```

### Publicación en GitHub Pages

`Settings → Pages → Branch: main → Folder: / (root)`

URL pública: **https://walthermorarivera.github.io/mi-galeria-web/**

### Publicación adicional en Render

Static Site configurado con branch `main`, sin build command, publish directory `.`. Redespliega automáticamente con cada `git push` a `main`.

### Criterios cumplidos
- Historial de commits con mensajes descriptivos en imperativo.
- Rama `feature/mejoras-ui` creada, trabajada y fusionada a `main`.
- Sitio publicado y accesible desde su URL pública.
- README con descripción del proyecto y enlace al sitio.

---

## 8. Bonus — Buscador en vivo y modo oscuro

**Puntos:** +10

### Buscador en vivo

Filtra tarjetas en el DOM sin nuevas llamadas a la API. Coordina con el filtro de generación activo para no mostrar tarjetas de generaciones ocultas:

```js
function aplicarBuscador() {
  const termino = inputBuscar.value.toLowerCase().trim();
  galeria.querySelectorAll(".tarjeta").forEach(card => {
    const ocultaGen = card.closest(".gen-seccion")?.classList.contains("oculta-gen");
    card.classList.toggle("oculta", ocultaGen || !card.dataset.nombre.includes(termino));
  });
}
```

### Modo oscuro

Toggle que añade/retira la clase `dark` del `<body>`. El modo oscuro es el **estado por defecto** (`<body class="dark">`). El botón muestra "☀️ Modo claro" al iniciar y cambia a "🌙 Modo oscuro" al activar el modo claro.

---

## 9. Mejora — Fondos de pantalla personalizados

Se aplican mediante `background-image` en el `body`, con `background-size: cover` y `background-attachment: fixed`:

```css
body        { background-image: url('../img/Fondo_Web_Claro.png'); }
body.dark   { background-image: url('../img/Fondo_Web_Oscuro.png'); }
```

| Archivo | Modo | Descripción |
|---|---|---|
| `Fondo_Web_Claro.png` | Claro | Estética Pokéball en tonos rosas/blancos |
| `Fondo_Web_Oscuro.png` | Oscuro | Estética HUD/circuitos en tonos rojo/negro |

---

## 10. Mejora — Sistema de favoritos

### Almacenamiento en memoria

```js
const favoritos = new Map(); // id (número) -> { id, nombre, imagen }
```

Persiste durante la sesión. Al recargar la página se reinicia.

### Botón estrella

Posicionado con `position: absolute` en la esquina superior derecha de cada tarjeta. Tooltip: "Añadir a Favoritos". Al activarse muestra el color dorado completo; inactivo aparece en gris con opacidad reducida.

### Chip de favorito

```
[ 🖼 imagen ]  [ #001       ]  [ ✕ ]
               [ bulbasaur  ]
```

- Imagen `36×36px` a la izquierda.
- `div.fav-chip-info` con dos líneas centradas: número (`.fav-chip-num`) encima, nombre (`.fav-chip-nombre`) abajo.
- Colores: **modo oscuro** → dorado (`#fbbf24`/`#f59e0b`); **modo claro** → azul (`#2563eb`/`#1d4ed8`).
- Botón `✕` para quitar el favorito, que también desactiva la estrella en la tarjeta correspondiente.

---

## 11. Mejora — Favicon e icono de cabecera

Se agregó `Icono_Web.png` a la carpeta `img/` con dos usos:

```html
<!-- Favicon en la pestaña del navegador -->
<link rel="icon" type="image/png" href="img/Icono_Web.png">

<!-- Miniatura 50×50px al inicio del header -->
<img src="img/Icono_Web.png" class="header-icon" alt="Icono Pokedex-Z">
```

```css
.header-icon { width: 50px; height: 50px; object-fit: contain; flex-shrink: 0; }
```

---

## 12. Mejora — Modo oscuro por defecto

El `<body>` arranca con la clase `dark` aplicada directamente en el HTML:

```html
<body class="dark">
```

El botón de toggle muestra "☀️ Modo claro" desde el inicio. Al hacer clic alterna entre ambos modos y actualiza el texto del botón:

```js
btnModo.textContent = document.body.classList.contains("dark") ? "☀️ Modo claro" : "🌙 Modo oscuro";
```

---

## 13. Mejora — Soporte para todas las generaciones (Gen I–IX)

### Cobertura

| Gen | Rango | Pokémon |
|---|---|---|
| I   | #001–#151  | 151 |
| II  | #152–#251  | 100 |
| III | #252–#386  | 135 |
| IV  | #387–#493  | 107 |
| V   | #494–#649  | 156 |
| VI  | #650–#721  | 72  |
| VII | #722–#809  | 88  |
| VIII| #810–#905  | 96  |
| IX  | #906–#1025 | 120 |
| **Total** | | **1.025** |

### Selector de carga

9 checkboxes organizados en grilla flexible, con dos botones de acción rápida:

```html
<div class="gen-checks"><!-- 9 checkboxes --></div>
<div class="gen-acciones-rapidas">
  <button id="sel-todo">Seleccionar todo</button>
  <button id="desel-todo">Desmarcar todo</button>
</div>
```

```js
document.getElementById("sel-todo").addEventListener("click", () =>
  checkboxesCarga().forEach(c => { if (c) c.checked = true; }));
```

### Carga progresiva con orden garantizado

El problema de los encabezados apilados se resolvió separando la creación del contenedor (síncrona, en orden) de la carga de datos (asíncrona, en paralelo):

```js
// Paso 1 — contenedores en orden (síncrono)
seleccion.forEach(n => {
  const seccion = crearContenedorSeccion(n);
  galeria.appendChild(seccion);
});

// Paso 2 — carga paralela (asíncrono), cada gen rellena su contenedor
await Promise.all(seleccion.map(n => cargarGeneracion(n)));
```

Mientras una generación carga, su encabezado muestra un spinner de tres puntos pulsantes que desaparece al completarse.

### Filtro multi-selección

Reemplaza el dropdown original. Se construye dinámicamente tras la carga con un checkbox por cada generación cargada, más botones "Seleccionar todo" y "Desmarcar todo":

```js
function construirFiltroPanel(seleccion) {
  seleccion.forEach(n => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" data-filtro-gen="${n}" checked>
      <span>${GENERACIONES[n].label}</span>`;
    filtroChecks.appendChild(label);
  });
}
```

El filtro coordina con el buscador: al cambiar la selección de generaciones, el buscador se reaplica automáticamente sobre el subconjunto visible.

---

## 14. Mejora — Colores oficiales por tipo

Cada badge de tipo usa el color oficial de la franquicia Pokémon, definido en un mapa en `app.js`:

```js
const TIPO_COLORES = {
  normal:   { bg: "#A8A77A", texto: "#1a1a1a" },
  fire:     { bg: "#EE8130", texto: "#fff"     },
  water:    { bg: "#6390F0", texto: "#fff"     },
  electric: { bg: "#F7D02C", texto: "#1a1a1a" },
  grass:    { bg: "#7AC74C", texto: "#fff"     },
  ice:      { bg: "#96D9D6", texto: "#1a1a1a" },
  fighting: { bg: "#C22E28", texto: "#fff"     },
  poison:   { bg: "#A33EA1", texto: "#fff"     },
  ground:   { bg: "#E2BF65", texto: "#1a1a1a" },
  flying:   { bg: "#A98FF3", texto: "#fff"     },
  psychic:  { bg: "#F95587", texto: "#fff"     },
  bug:      { bg: "#A6B91A", texto: "#1a1a1a" },
  rock:     { bg: "#B6A136", texto: "#fff"     },
  ghost:    { bg: "#735797", texto: "#fff"     },
  dragon:   { bg: "#6F35FC", texto: "#fff"     },
  dark:     { bg: "#705746", texto: "#fff"     },
  steel:    { bg: "#B7B7CE", texto: "#1a1a1a" },
  fairy:    { bg: "#D685AD", texto: "#fff"     },
};
```

Los colores se aplican como `style` inline al crear cada `<span class="tipo">`:

```js
const color = TIPO_COLORES[t] ?? { bg: "#777", texto: "#fff" };
return `<span class="tipo" style="background:${color.bg};color:${color.texto}">${t}</span>`;
```

Los tipos con fondo claro (Electric, Normal, Ground, Ice, Bug, Steel) usan texto oscuro (`#1a1a1a`) para garantizar contraste suficiente. Los colores son independientes del modo claro/oscuro, respetando el estándar visual de la franquicia.

---

## 15. Historial de commits

| Hash | Mensaje | Descripción |
|---|---|---|
| `bf5b016` | Initial commit | README automático de GitHub |
| `53eb4a4` | estructura inicial del proyecto | HTML, CSS, JS base + .gitignore |
| `edf0550` | agrega animación de entrada y spinner de carga | CSS: keyframes y spinner |
| `2fc12aa` | agrega contador de resultados visibles | JS + HTML: contador dinámico |
| `674ec42` | documenta el proyecto en README | README completo con tabla de tecnologías |
| `083ca63` | actualiza README con enlace a GitHub Pages | URL correcta del sitio |
| `d34f238` | agrega fondos personalizados para modo claro y oscuro | Carpeta img/ + CSS background |
| `a990832` | actualiza fondos de pantalla para modo claro y oscuro | Reemplazo de imágenes de fondo |
| `bbd8364` | corrige URL de GitHub Pages en el README | URL final verificada |
| `e431e75` | agrega sistema de favoritos | HTML + CSS + JS del sistema de favoritos |
| `23e2f83` | agrega documentación técnica detallada y actualiza README | DOCUMENTACION.md + README.md |
| `0e23551` | muestra número e identificador en chips de favoritos | Rediseño del chip: imagen + columna #num/nombre |
| `ec4d47b` | actualiza documentación con rediseño del chip | DOCUMENTACION.md actualizado |
| `90bdef5` | centra número identificador en chips de favoritos | align-items: center en .fav-chip-info |
| `2a97e36` | agrega favicon e icono 50x50 en el header | img/Icono_Web.png + link rel=icon |
| `794fdce` | cambia colores de favoritos a azul en modo claro | Colores modo claro: azul; modo oscuro: dorado |
| `440f782` | establece modo oscuro como default y actualiza tooltip | body class="dark" + "Añadir a Favoritos" |
| `2c58feb` | agrega Generación II con selector y secciones separadas | Selector Gen I/II + secciones + filtros |
| `024b77a` | agrega Gen III–IX con carga progresiva y filtro dropdown | 9 generaciones + spinner inline + dropdown |
| `c3f535c` | agrega botones Seleccionar todo y Desmarcar todo | Selector de carga con acciones rápidas |
| `ca5f59b` | corrige orden de secciones y reemplaza dropdown por filtro multi-selección | Fix encabezados + panel checkboxes filtro |
| `9871a53` | aplica colores oficiales por tipo de pokémon | Mapa TIPO_COLORES con contraste automático |
| `fd38a17` | renombra proyecto a Pokedex-Z y marca versión 1.0 | Nombre final del proyecto, cierre de desarrollo |

---

## 16. Tecnologías utilizadas

| Tecnología | Versión / Estándar | Uso en el proyecto |
|---|---|---|
| HTML5 | Living Standard | Estructura semántica y accesible |
| CSS3 | Living Standard | Layout, variables, animaciones, responsive |
| JavaScript | ES2022 (ES13) | Fetch API, DOM, async/await, Promise.all, Map, `?.` |
| PokéAPI | v2 | Fuente de datos Gen I–IX (1.025 pokémon) |
| Git | 2.x | Control de versiones local |
| GitHub | — | Repositorio remoto y colaboración |
| GitHub Pages | — | Hosting estático gratuito |
| Render | — | Hosting estático con CI/CD automático |

---

## 17. Guía de actualización

### Al agregar una nueva funcionalidad

1. Crear una rama descriptiva:
   ```bash
   git checkout -b feature/nombre-de-la-mejora
   ```
2. Desarrollar y hacer commits atómicos con mensajes claros en imperativo.
3. Actualizar **este archivo** (`DOCUMENTACION.md`):
   - Agregar una nueva sección numerada al final de la lista de mejoras.
   - Documentar: objetivo, decisiones técnicas, fragmentos de código clave y resultado.
   - Agregar la entrada en la tabla del [Historial de commits](#15-historial-de-commits).
   - Actualizar la Tabla de contenidos con el nuevo número de sección.
4. Actualizar `README.md`: tabla de funcionalidades, estructura del proyecto si cambió, descripción general si aplica.
5. Hacer merge a `main` y push:
   ```bash
   git checkout main
   git merge feature/nombre-de-la-mejora
   git push origin main
   ```

### Al corregir un bug

1. Trabajar directamente en `main` si el fix es trivial, o en una rama `fix/descripcion` si requiere más de un commit.
2. Agregar la entrada en el historial de commits en `DOCUMENTACION.md`.
3. Si el bug afectaba una funcionalidad documentada, corregir la sección correspondiente.

### Convención de mensajes de commit

```
<verbo en imperativo> <qué> [<contexto opcional>]

Ejemplos:
  agrega filtro por tipo a la galería
  corrige desbordamiento de imagen en tarjetas móvil
  actualiza URL del sitio en README y DOCUMENTACION
  aplica colores oficiales por tipo de pokémon
```
