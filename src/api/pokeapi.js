// PokeAPI
const BASE_URL = "https://pokeapi.co/api/v2";
// Límite de Pokémon
const FULL_LIST_LIMIT = 1500;


export async function fetchAllPokemonIndex() {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${FULL_LIST_LIMIT}`);
  if (!res.ok) {
    throw new Error("No se pudo cargar el índice de Pokémon");
  }
  const data = await res.json();

  return data.results.map((item) => ({
    name: item.name,
    id: extractIdFromUrl(item.url),
    url: item.url,
  }));
}
function extractIdFromUrl(url) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}



export async function fetchPokemonDetail(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) {
    throw new Error(`No se encontró ningún Pokémon llamado "${nameOrId}"`);
  }
  const data = await res.json();

  // Formatear datos requeridos
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    types: data.types.map((t) => t.type.name),
    sprite:
      data.sprites.other?.["official-artwork"]?.front_default ??
      data.sprites.front_default,
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}

// Obtener especie y descripción del Pokémon
export async function fetchPokemonSpecies(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${nameOrId}`);
  if (!res.ok) {
    throw new Error(`No se pudo cargar la ficha de "${nameOrId}"`);
  }
  const data = await res.json();

  // Buscar descripción en español o inglés como fallback
  const entryEs = data.flavor_text_entries.find(
    (entry) => entry.language.name === "es"
  );
  const entryEn = data.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );
  const rawText = (entryEs ?? entryEn)?.flavor_text ?? "";

  // Limpiar saltos de línea
  const description = rawText.replace(/[\n\f\r]/g, " ").trim();

  return {
    description,
    genus:
      data.genera.find((g) => g.language.name === "es")?.genus ??
      data.genera.find((g) => g.language.name === "en")?.genus ??
      "",
  };
}

// Obtener Pokémon filtrados por tipo
export async function fetchPokemonByType(typeName) {
  const res = await fetch(`${BASE_URL}/type/${typeName}`);
  if (!res.ok) {
    throw new Error(`No se pudo cargar el tipo "${typeName}"`);
  }
  const data = await res.json();

  return data.pokemon.map((entry) => ({
    name: entry.pokemon.name,
    id: extractIdFromUrl(entry.pokemon.url),
    url: entry.pokemon.url,
  }));
}
