const galeria       = document.getElementById("galeria");
const inputBuscar   = document.getElementById("buscar");
const btnCargar     = document.getElementById("cargar");
const btnModo       = document.getElementById("modo-oscuro");
const contador      = document.getElementById("contador");
const seccionFavs   = document.getElementById("seccion-favoritos");
const favoritosGrid = document.getElementById("favoritos-grid");
const filtrosGen    = document.getElementById("filtros-gen");
const selectGen     = document.getElementById("select-gen");

// Mapa en memoria: id -> datos del pokémon
const favoritos = new Map();

// Todas las generaciones disponibles
const GENERACIONES = {
  1: { inicio: 1,   fin: 151,  label: "Generación I"   },
  2: { inicio: 152, fin: 251,  label: "Generación II"  },
  3: { inicio: 252, fin: 386,  label: "Generación III" },
  4: { inicio: 387, fin: 493,  label: "Generación IV"  },
  5: { inicio: 494, fin: 649,  label: "Generación V"   },
  6: { inicio: 650, fin: 721,  label: "Generación VI"  },
  7: { inicio: 722, fin: 809,  label: "Generación VII" },
  8: { inicio: 810, fin: 905,  label: "Generación VIII"},
  9: { inicio: 906, fin: 1025, label: "Generación IX"  },
};

const checkboxesGen = () => Object.keys(GENERACIONES).map(n => document.getElementById(`chk-gen${n}`));

document.getElementById("sel-todo").addEventListener("click", () => {
  checkboxesGen().forEach(chk => { if (chk) chk.checked = true; });
});

document.getElementById("desel-todo").addEventListener("click", () => {
  checkboxesGen().forEach(chk => { if (chk) chk.checked = false; });
});

// --- Modo oscuro ---
btnModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const activo = document.body.classList.contains("dark");
  btnModo.textContent = activo ? "☀️ Modo claro" : "🌙 Modo oscuro";
});

// --- Cargar Pokémon ---
btnCargar.addEventListener("click", cargarDatos);

async function cargarDatos() {
  const seleccion = Object.keys(GENERACIONES)
    .map(Number)
    .filter(n => document.getElementById(`chk-gen${n}`)?.checked);

  if (seleccion.length === 0) {
    galeria.innerHTML = '<p class="mensaje-error">Selecciona al menos una generación.</p>';
    return;
  }

  btnCargar.disabled = true;
  btnCargar.textContent = "Cargando...";
  contador.textContent = "";
  filtrosGen.hidden = true;
  galeria.innerHTML = "";

  // Carga progresiva: cada generación se muestra al llegar sin esperar a las demás
  await Promise.all(seleccion.map(numGen => cargarGeneracion(numGen)));

  actualizarDropdown(seleccion);
  filtrosGen.hidden = false;
  actualizarContador();

  btnCargar.disabled = false;
  btnCargar.textContent = "Recargar Pokémon";
}

async function cargarGeneracion(numGen) {
  const gen      = GENERACIONES[numGen];
  const cantidad = gen.fin - gen.inicio + 1;
  const offset   = gen.inicio - 1;

  // Encabezado + spinner de sección mientras carga
  const heading = document.createElement("h2");
  heading.className = "gen-heading";
  heading.dataset.gen = numGen;
  heading.textContent = `${gen.label}  `;

  const spinnerInline = document.createElement("span");
  spinnerInline.className = "spinner-inline";
  spinnerInline.innerHTML = "<span></span><span></span><span></span>";
  heading.appendChild(spinnerInline);
  galeria.appendChild(heading);

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidad}&offset=${offset}`);
    if (!res.ok) throw new Error(`Error Gen ${numGen}: ${res.status}`);

    const data     = await res.json();
    const promesas = data.results.map(p => fetchPokemon(p.url));
    const pokemones = await Promise.all(promesas);

    // Quitar spinner del heading
    spinnerInline.remove();

    // Fragmento para inserción eficiente
    const fragment = document.createDocumentFragment();
    pokemones.forEach(pokemon => {
      if (!pokemon) return;
      fragment.appendChild(crearTarjeta(pokemon, numGen));
    });
    galeria.appendChild(fragment);

  } catch (error) {
    spinnerInline.remove();
    heading.insertAdjacentHTML("afterend",
      `<p class="mensaje-error" style="grid-column:1/-1">Error cargando ${gen.label}. Intenta de nuevo.</p>`
    );
    console.error(error);
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

// --- Dropdown de generaciones ---
function actualizarDropdown(seleccion) {
  // Reconstruir opciones: Todas + cada gen cargada
  selectGen.innerHTML = '<option value="todas">Todas las generaciones</option>';
  seleccion.forEach(n => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = GENERACIONES[n].label;
    selectGen.appendChild(opt);
  });
  selectGen.value = "todas";
}

selectGen.addEventListener("change", () => {
  const valor = selectGen.value;

  galeria.querySelectorAll(".tarjeta").forEach(card => {
    const visible = valor === "todas" || card.dataset.gen === valor;
    card.classList.toggle("oculta-gen", !visible);
  });

  galeria.querySelectorAll(".gen-heading").forEach(h => {
    h.style.display = (valor === "todas" || h.dataset.gen === valor) ? "" : "none";
  });

  aplicarBuscador();
  actualizarContador();
});

// --- Buscador en vivo ---
inputBuscar.addEventListener("input", () => {
  aplicarBuscador();
  actualizarContador();
});

function aplicarBuscador() {
  const termino = inputBuscar.value.toLowerCase().trim();
  galeria.querySelectorAll(".tarjeta").forEach(card => {
    const nombre    = card.dataset.nombre ?? "";
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
