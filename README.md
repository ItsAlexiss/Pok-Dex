# PokéDex (React + PokeAPI)

Pokédex chiquita hecha con React y Vite, jala datos en vivo de [PokeAPI](https://pokeapi.co).

## Qué hace

- Buscar por nombre o número
- Filtrar por tipo (fuego, agua, planta, etc.)
- Ordenar por número de Pokédex o por "fama" (un ranking hecho a mano, la API no tiene eso)
- Click en una carta abre el detalle estilo TCG con stats, altura, peso y descripción

## Dónde está cada cosa

```
src/
├── App.jsx              # arma todo junto
├── index.css             # estilos
├── api/pokeapi.js        # llamadas a la PokeAPI
├── data/
│   ├── typeColors.js      # colores por tipo
│   └── famousPokemon.js   # el ranking de fama (curado a mano)
├── utils/sortPokemon.js  # ordenar por id o por fama
└── components/
    ├── SearchBar.jsx
    ├── TypeFilter.jsx
    ├── SortControl.jsx
    ├── PokemonCard.jsx
    ├── PokemonGrid.jsx    # la grilla + botón "cargar más"
    └── PokemonModal.jsx   # la carta de detalle
```

## Correrlo

Necesitás Node 18+.

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

Para build de producción:

```bash
npm run build
npm run preview
```

## Nota sobre el orden por "fama"

PokeAPI no tiene ningún dato de popularidad, así que ese ranking es un diccionario armado a mano en `famousPokemon.js` con los Pokémon más conocidos. Lo que no está en la lista queda en "fama 0" y se acomoda al final por número.

## Créditos

Datos: [PokeAPI](https://pokeapi.co). Pokémon es marca de Nintendo/Game Freak/The Pokémon Company — esto es nomás un proyecto de práctica, sin fines comerciales.
