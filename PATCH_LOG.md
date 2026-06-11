# Patch Log — Pokedex-Z

Registro de correcciones y ajustes menores posteriores a versiones estables.

---

## v1.01 — 2026-06-10

### Corrección — Legibilidad de textos en modo claro

**Problema:** En modo claro, los textos del panel selector de generaciones ("Generaciones:", etiquetas Gen I–IX, "Seleccionar todo", "Desmarcar todo") y del panel de filtrado ("Filtrar por:", etiquetas de generación) eran prácticamente ilegibles sobre el fondo blanco. La causa raíz era que la variable CSS `--text-light: #cbd5e1` (gris muy claro) estaba definida para el tema oscuro pero no se sobreescribía al cambiar a modo claro.

**Archivos modificados:** `css/estilos.css`

**Solución:** Se añadió una regla `body:not(.dark)` que sobreescribe `--text-light` con un azul oscuro (`#1e3a5f`), corrigiendo simultáneamente todos los elementos que consumen esa variable:

```css
body:not(.dark) {
  --text-light: #1e3a5f;
}
```

Esto afecta de forma consistente:
- Etiqueta "Generaciones:" (`.selector-gen-label`)
- Checkboxes de selección de carga (`.gen-opcion`)
- Subtextos de rango numérico (`.gen-opcion em`)
- Etiqueta "Filtrar por:" (`.filtro-label`)
- Checkboxes del panel de filtro (`#filtro-checks .gen-opcion`)
- Botones "Seleccionar todo" / "Desmarcar todo" (`.gen-acciones-rapidas button`)

**El modo oscuro no fue modificado.**

---

*Para el historial completo de desarrollo ver [DOCUMENTACION.md](DOCUMENTACION.md).*
