import { getFameScore } from "../data/famousPokemon.js";

// Ordenar por ID de Pokédex
export function sortById(list) {
  return [...list].sort((a, b) => a.id - b.id);
}

// Ordenar por fama (desempate por ID)
export function sortByFame(list) {
  return [...list].sort((a, b) => {
    const fameDiff = getFameScore(b.name) - getFameScore(a.name);
    if (fameDiff !== 0) return fameDiff;
    return a.id - b.id;
  });
}
