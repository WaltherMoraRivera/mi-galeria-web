# Pokedex-Z

> **Versión 1.02** — Corrección de visibilidad de botones de acción rápida en modo claro.

Sitio web dinámico que muestra una galería interactiva de los **1.025 pokémon** de las nueve generaciones, desarrollado como desafío práctico del curso **Programación Front End · TI3V31 · Unidad 1**.

## Demo en vivo

🔗 **[Ver sitio publicado](https://walthermorarivera.github.io/mi-galeria-web/)**

> Para documentación técnica detallada del proyecto, ver [DOCUMENTACION.md](DOCUMENTACION.md).

---

## Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| **Galería de tarjetas** | Muestra hasta 1.025 pokémon (Gen I–IX) con imagen oficial, número, nombre y tipos |
| **Selector de generaciones** | Checkboxes para elegir qué generaciones cargar, con botones "Seleccionar todo" y "Desmarcar todo" |
| **Carga progresiva** | Cada generación aparece en pantalla en cuanto sus datos llegan, sin bloquear las demás |
| **Secciones por generación** | La galería organiza cada generación bajo su propio encabezado separador |
| **Filtro multi-selección** | Panel de checkboxes para mostrar una o varias generaciones tras la carga |
| **Buscador en vivo** | Filtra tarjetas por nombre mientras el usuario escribe, sin recargar la página |
| **Colores oficiales por tipo** | Cada badge de tipo usa el color oficial de la franquicia Pokémon con contraste automático |
| **Sistema de favoritos** | Marca pokémon con ⭐ y los muestra como chips fijos en la parte superior |
| **Modo oscuro por defecto** | Toggle que cambia tema visual completo, incluyendo el fondo de pantalla |
| **Diseño responsivo** | Adaptado para escritorio, tablet y móvil con CSS Grid y media queries |
| **Manejo de errores** | Mensajes de error por sección si la API no responde |
| **Favicon e icono de cabecera** | Icono personalizado en la pestaña del navegador y en el header |

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica y accesible |
| CSS3 | Grid, Flexbox, variables CSS, animaciones, modo oscuro |
| JavaScript ES2022 | Fetch API, async/await, Promise.all, Map, DOM |
| PokéAPI v2 | Fuente de datos en tiempo real (Gen I a Gen IX) |
| Git + GitHub | Control de versiones y repositorio remoto |
| GitHub Pages | Hosting estático del sitio |
| Render | Hosting alternativo con CI/CD automático |

---

## Estructura del proyecto

```
mi-galeria-web/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── app.js
├── img/
│   ├── Fondo_Web_Claro.png
│   ├── Fondo_Web_Oscuro.png
│   └── Icono_Web.png
├── .gitignore
├── README.md
└── DOCUMENTACION.md
```

---

## Instalación local

No requiere instalación ni dependencias. Basta con clonar el repositorio y abrir `index.html` en un navegador:

```bash
git clone https://github.com/WaltherMoraRivera/mi-galeria-web.git
cd mi-galeria-web
# Abrir index.html en el navegador
```

> Se requiere conexión a internet para consumir la PokéAPI.

---

## Autor

**Walther Mora Rivera** · Programación Front End TI3V31
