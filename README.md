# PokéDex

App hecha con React que consume la PokeAPI. Podés buscar pokemon por nombre o número, filtrar por tipo, ordenar por más famosos, y si le das click a uno se abre una carta con más info (tipo carta coleccionable).

## Como correrla

Necesitas Node instalado (v18 o más).

```
npm install
npm run dev
```

Después abrís la url que te tira en la terminal, normalmente `http://localhost:3000`.

Para hacer el build final:

```
npm run build
```

## Que trae

- Buscador (por nombre o por id, ej. "pikachu" o "25")
- Filtro por tipo (los chips de colores)
- Orden: por número de pokedex o por fama
- Al hacer click en una tarjeta se abre el detalle con stats, altura, peso y la descripción oficial

## Estructura

```
src/
  api/          -> funciones que le pegan a la pokeapi
  components/   -> los componentes (search, filtros, tarjetas, modal)
  data/         -> colores por tipo y el ranking de fama
  utils/        -> ordenar la lista
  App.jsx       -> junta todo
```

## Sobre el orden por "fama"

La pokeapi no tiene ningun dato de popularidad, asi que hice yo mismo un ranking en `data/famousPokemon.js` con los que son mas conocidos (pikachu, charizard, etc). Los que no estan en la lista quedan de ultimo, ordenados por numero.

## Endpoints que usa

- `/pokemon?limit=1500` - lista completa
- `/pokemon/{nombre o id}` - detalle de uno
- `/pokemon-species/{nombre o id}` - la descripcion oficial
- `/type/{tipo}` - los pokemon de un tipo

Todo esto contra `https://pokeapi.co/api/v2`

## Créditos

Datos: [PokeAPI](https://pokeapi.co). Hecho con fines de práctica, sin nada comercial.
