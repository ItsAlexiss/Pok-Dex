// Colores por tipo de Pokémon
export const TYPE_COLORS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// Color de respaldo
export const FALLBACK_COLOR = "#8C8A80";

// Obtener color del tipo
export function getTypeColor(typeName) {
  return TYPE_COLORS[typeName] ?? FALLBACK_COLOR;
}

// Lista de todos los tipos
export const ALL_TYPES = Object.keys(TYPE_COLORS);
