# Galería Pokémon

Sitio web dinámico que muestra una galería interactiva de los 151 pokémon de la primera generación, desarrollado como desafío práctico del curso **Programación Front End · TI3V31 · Unidad 1**.

## Demo en vivo

🔗 **[Ver sitio publicado](https://walthermorarivera.github.io/mi-galeria-web/)**

> Para documentación técnica detallada del proyecto, ver [DOCUMENTACION.md](DOCUMENTACION.md).

---

## Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| **Galería de tarjetas** | Muestra los 151 pokémon con imagen oficial, número, nombre y tipos |
| **Buscador en vivo** | Filtra tarjetas por nombre mientras el usuario escribe, sin recargar |
| **Sistema de favoritos** | Marca pokémon con ⭐ y los muestra fijos en la parte superior de la página |
| **Modo oscuro** | Toggle que cambia el tema visual completo, incluyendo el fondo de pantalla |
| **Diseño responsivo** | Adaptado para escritorio, tablet y móvil con CSS Grid y media queries |
| **Manejo de errores** | Mensajes de error visibles al usuario si la API no responde |

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica y accesible |
| CSS3 | Grid, Flexbox, variables CSS, animaciones, modo oscuro |
| JavaScript ES2022 | Fetch API, async/await, manipulación del DOM, Map |
| PokéAPI v2 | Fuente de datos en tiempo real |
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
│   └── Fondo_Web_Oscuro.png
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
