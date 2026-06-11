const galeria        = document.getElementById("galeria");
const inputBuscar    = document.getElementById("buscar");
const btnCargar      = document.getElementById("cargar");
const btnModo        = document.getElementById("modo-oscuro");
const contador       = document.getElementById("contador");
const seccionFavs    = document.getElementById("seccion-favoritos");
const favoritosGrid  = document.getElementById("favoritos-grid");
const filtrosGen     = document.getElementById("filtros-gen");
const chkGen1        = document.getElementById("chk-gen1");
const chkGen2        = document.getElementById("chk-gen2");

// Mapa en memoria: id -> datos del pokémon
const favoritos = new Map();

// Definición de generaciones: [inicio, fin] (índice 1-based, inclusive)
const GENERACIONES = {
  1: { inicio: 1,   fin: 151, label: "Generación I"  },
  2: { inicio: 152, fin: 251, label: "Generación II" },
};

// --- Modo oscuro ---
btnModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const activo = document.body.classList.contains("dark");
  btnModo.textContent = activo ? "☀️ Modo claro" : "🌙 Modo oscuro";
});

// --- Cargar Pokémon ---
btnCargar.addEventListener("click", cargarDatos);

async function cargarDatos() {
  const seleccion = [];
  if (chkGen1.checked) seleccion.push(1);
  if (chkGen2.checked) seleccion.push(2);

  if (seleccion.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">Selecciona al menos una generación.</p>';
    return;
  }

  btnCargar.disabled = true;
  btnCargar.textContent = "Cargando...";
  contador.textContent = "";
  filtrosGen.hidden = true;
  galeria.innerHTML = '<div class="spinner"><span></span><span></span><span></span></div>';

  try {
    galeria.innerHTML = "";

    for (const numGen of seleccion) {
      const gen = GENERACIONES[numGen];
      const cantidad = gen.fin - gen.inicio + 1;
      const offset   = gen.inicio - 1;

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${offset}`);
      if (!res.ok) throw new Error(`Error Gen ${numGen}: ${res.status}`);

      const data = await res.json();
      const promesas = data.results.map(p => fetchPokemon(p.url));
      const pokemones = await Promise.all(promesas);

      // Encabezado de sección
      const heading = document.createElement("h2");
      heading.className = "gen-heading";
      heading.dataset.gen = numGen;
      heading.textContent = gen.label;
      galeria.appendChild(heading);

      pokemones.forEach(pokemon => {
        if (!pokemon) return;
        const tarjeta = crearTarjeta(pokemon, numGen);
        galeria.appendChild(tarjeta);
      });
    }

    // Mostrar filtros solo con las generaciones cargadas
    actualizarFiltrosVisibles(seleccion);
    filtrosGen.hidden = false;
    actualizarContador();

  } catch (error) {
    galeria.innerHTML = '<p class="mensaje-error">No se pudieron cargar los datos. Revisa tu conexión.</p>';
    console.error(error);
  } finally {
    btnCargar.disabled = false;
    btnCargar.textContent = "Recargar Pokémon";
  }
}

async function fetchPokemon(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function crearTarjeta(pokemon, gen) {
  const nombre = pokemon.name ?? "desconocido";
  const numero = pokemon.id ?? "?";
  const imagen =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.front_default ??
    "";
  const tipos = Array.isArray(pokemon.types)
    ? pokemon.types.map(t => t.type?.name).filter(Boolean)
    : [];

  const article = document.createElement("article");
  article.className = "tarjeta";
  article.dataset.nombre = nombre;
  article.dataset.gen = gen;

  article.innerHTML = `
    <button class="btn-fav" aria-label="Agregar ${nombre} a favoritos" title="Añadir a Favoritos">⭐</button>
    ${imagen ? `<img src="${imagen}" alt="Imagen de ${nombre}" loading="lazy">` : ""}
    <span class="numero">#${String(numero).padStart(3, "0")}</span>
    <h3>${nombre}</h3>
    <div class="tipos">
      ${tipos.map(t => `<span class="tipo">${t}</span>`).join("")}
    </div>
  `;

  article.querySelector(".btn-fav").addEventListener("click", () => {
    toggleFavorito({ id: numero, nombre, imagen }, article.querySelector(".btn-fav"));
  });

  return article;
}

// --- Filtros por generación ---
filtrosGen.addEventListener("click", e => {
  const btn = e.target.closest(".filtro-btn");
  if (!btn) return;

  filtrosGen.querySelectorAll(".filtro-btn").forEach(b => b.classList.remove("activo"));
  btn.classList.add("activo");

  const gen = btn.dataset.gen;
  const tarjetas  = galeria.querySelectorAll(".tarjeta");
  const headings  = galeria.querySelectorAll(".gen-heading");

  tarjetas.forEach(card => {
    const visible = gen === "todas" || card.dataset.gen === gen;
    card.classList.toggle("oculta-gen", !visible);
  });

  headings.forEach(h => {
    const visible = gen === "todas" || h.dataset.gen === gen;
    h.style.display = visible ? "" : "none";
  });

  // Reaplica buscador sobre el nuevo filtro
  aplicarBuscador();
  actualizarContador();
});

function actualizarFiltrosVisibles(seleccion) {
  // Muestra u oculta los botones Gen I / Gen II según lo cargado
  filtrosGen.querySelectorAll(".filtro-btn").forEach(btn => {
    btn.classList.remove("activo");
    if (btn.dataset.gen === "todas") {
      btn.classList.add("activo");
      btn.hidden = false;
    } else {
      btn.hidden = !seleccion.includes(Number(btn.dataset.gen));
    }
  });
}

// --- Buscador en vivo ---
inputBuscar.addEventListener("input", () => {
  aplicarBuscador();
  actualizarContador();
});

function aplicarBuscador() {
  const termino = inputBuscar.value.toLowerCase().trim();
  galeria.querySelectorAll(".tarjeta").forEach(card => {
    const nombre   = card.dataset.nombre ?? "";
    const ocultaGen = card.classList.contains("oculta-gen");
    card.classList.toggle("oculta", ocultaGen || !nombre.includes(termino));
  });
}

// --- Favoritos ---
function toggleFavorito(pokemon, btn) {
  if (favoritos.has(pokemon.id)) {
    favoritos.delete(pokemon.id);
    btn.classList.remove("activo");
    btn.setAttribute("aria-label", `Agregar ${pokemon.nombre} a favoritos`);
  } else {
    favoritos.set(pokemon.id, pokemon);
    btn.classList.add("activo");
    btn.setAttribute("aria-label", `Quitar ${pokemon.nombre} de favoritos`);
  }
  renderizarFavoritos();
}

function renderizarFavoritos() {
  favoritosGrid.innerHTML = "";

  if (favoritos.size === 0) {
    seccionFavs.hidden = true;
    return;
  }

  seccionFavs.hidden = false;

  favoritos.forEach(pokemon => {
    const chip = document.createElement("div");
    chip.className = "fav-chip";
    const numFormateado = `#${String(pokemon.id).padStart(3, "0")}`;
    chip.innerHTML = `
      ${pokemon.imagen ? `<img src="${pokemon.imagen}" alt="${pokemon.nombre}">` : ""}
      <div class="fav-chip-info">
        <span class="fav-chip-num">${numFormateado}</span>
        <span class="fav-chip-nombre">${pokemon.nombre}</span>
      </div>
      <button aria-label="Quitar ${pokemon.nombre} de favoritos" title="Quitar">✕</button>
    `;
    chip.querySelector("button").addEventListener("click", () => {
      favoritos.delete(pokemon.id);
      const btnEstrella = galeria.querySelector(`.tarjeta[data-nombre="${pokemon.nombre}"] .btn-fav`);
      if (btnEstrella) {
        btnEstrella.classList.remove("activo");
        btnEstrella.setAttribute("aria-label", `Agregar ${pokemon.nombre} a favoritos`);
      }
      renderizarFavoritos();
    });
    favoritosGrid.appendChild(chip);
  });
}

function actualizarContador() {
  const total    = galeria.querySelectorAll(".tarjeta").length;
  const visibles = galeria.querySelectorAll(".tarjeta:not(.oculta)").length;
  contador.textContent = total > 0
    ? `Mostrando ${visibles} de ${total} pokémon`
    : "";
}
