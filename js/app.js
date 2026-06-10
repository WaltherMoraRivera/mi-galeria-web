const galeria = document.getElementById("galeria");
const inputBuscar = document.getElementById("buscar");
const btnCargar = document.getElementById("cargar");
const btnModo = document.getElementById("modo-oscuro");
const contador = document.getElementById("contador");

const TOTAL_POKEMON = 151; // Primera generación

// --- Modo oscuro ---
btnModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const activo = document.body.classList.contains("dark");
  btnModo.textContent = activo ? "☀️ Modo claro" : "🌙 Modo oscuro";
});

// --- Cargar Pokémon ---
btnCargar.addEventListener("click", cargarDatos);

async function cargarDatos() {
  btnCargar.disabled = true;
  btnCargar.textContent = "Cargando...";
  contador.textContent = "";
  galeria.innerHTML = '<div class="spinner"><span></span><span></span><span></span></div>';

  try {
    // Obtenemos la lista de los primeros 151
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`);
    if (!res.ok) throw new Error("Error al obtener la lista: " + res.status);

    const data = await res.json();
    const lista = data.results;

    galeria.innerHTML = "";

    // Cargamos cada pokémon en paralelo
    const promesas = lista.map(p => fetchPokemon(p.url));
    const pokemones = await Promise.all(promesas);

    pokemones.forEach(pokemon => {
      if (!pokemon) return;
      galeria.appendChild(crearTarjeta(pokemon));
    });

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

function crearTarjeta(pokemon) {
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

  article.innerHTML = `
    ${imagen ? `<img src="${imagen}" alt="Imagen de ${nombre}" loading="lazy">` : ""}
    <span class="numero">#${String(numero).padStart(3, "0")}</span>
    <h3>${nombre}</h3>
    <div class="tipos">
      ${tipos.map(t => `<span class="tipo">${t}</span>`).join("")}
    </div>
  `;

  return article;
}

// --- Buscador en vivo (bonus) ---
inputBuscar.addEventListener("input", () => {
  const termino = inputBuscar.value.toLowerCase().trim();
  const tarjetas = galeria.querySelectorAll(".tarjeta");

  tarjetas.forEach(card => {
    const nombre = card.dataset.nombre ?? "";
    card.classList.toggle("oculta", !nombre.includes(termino));
  });

  actualizarContador();
});

function actualizarContador() {
  const total = galeria.querySelectorAll(".tarjeta").length;
  const visibles = galeria.querySelectorAll(".tarjeta:not(.oculta)").length;
  contador.textContent = total > 0
    ? `Mostrando ${visibles} de ${total} pokémon`
    : "";
}
