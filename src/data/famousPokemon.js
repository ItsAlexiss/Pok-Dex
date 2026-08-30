// Puntajes de fama para ordenar los Pokémon más populares
export const FAME_SCORES = {
  // --- Iconos absolutos / mascotas ---
  pikachu: 100,
  charizard: 98,
  mewtwo: 97,
  mew: 96,
  eevee: 95,

  // --- Muy populares en anime / videojuegos ---
  greninja: 93,
  lucario: 92,
  rayquaza: 91,
  arceus: 90,
  gengar: 90,
  lugia: 90,
  snorlax: 89,
  "ho-oh": 88,
  dragonite: 88,
  gyarados: 87,
  garchomp: 86,
  giratina: 85,
  dialga: 84,
  palkia: 84,
  mimikyu: 85,

  // --- Starters clásicos (Kanto) ---
  bulbasaur: 85,
  charmander: 85,
  squirtle: 85,
  venusaur: 81,
  blastoise: 81,

  // --- Populares / memes / eeveelutions ---
  jigglypuff: 84,
  psyduck: 83,
  umbreon: 82,
  sylveon: 82,
  arcanine: 81,
  alakazam: 80,
  zekrom: 80,
  reshiram: 80,
  machamp: 79,
  magikarp: 79,
  ditto: 78,
  zacian: 78,
  kyurem: 78,
  vaporeon: 77,
  flareon: 77,
  jolteon: 77,
  zoroark: 76,
  zamazenta: 76,
  celebi: 75,
  articuno: 74,
  zapdos: 74,
  moltres: 74,
  scizor: 73,
  tyranitar: 73,
  metagross: 73,
  salamence: 73,
  absol: 72,
  darkrai: 71,
  eternatus: 70,
  incineroar: 70,
  decidueye: 68,
  cinderace: 68,
  primarina: 67,
  corviknight: 60,
  toxtricity: 60,
};

// Obtener puntaje de fama
export function getFameScore(pokemonName) {
  return FAME_SCORES[pokemonName?.toLowerCase()] ?? 0;
}
