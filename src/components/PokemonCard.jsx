import { getTypeColor } from "../data/typeColors.js";

// Skeleton de carga mientras obtienen los detalles
function PokemonCardSkeleton() {
  return (
    <div className="pokemon-card pokemon-card--skeleton" aria-hidden="true">
      <div className="pokemon-card__sprite-wrap skeleton-block" />
      <div className="skeleton-line skeleton-line--wide" />
      <div className="skeleton-line skeleton-line--narrow" />
    </div>
  );
}

// Tarjeta de Pokémon
export default function PokemonCard({ pokemon, famePosition, onOpen }) {
  if (!pokemon) {
    return <PokemonCardSkeleton />;
  }

  const primaryType = pokemon.types[0];
  const accentColor = getTypeColor(primaryType);
  // Formato N.º 001
  const paddedId = String(pokemon.id).padStart(3, "0");

  return (
    <article
      className="pokemon-card pokemon-card--clickable"
      style={{ "--accent-color": accentColor }}
      onClick={() => onOpen?.(pokemon)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") onOpen?.(pokemon);
      }}
    >
      {/* Ranking de fama */}
      {famePosition && (
        <span className="pokemon-card__fame-badge">#{famePosition}</span>
      )}

      <div className="pokemon-card__sprite-wrap">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
          className="pokemon-card__sprite"
        />
      </div>

      <span className="pokemon-card__id">N.º {paddedId}</span>
      <h3 className="pokemon-card__name">{pokemon.name}</h3>

      <div className="pokemon-card__types">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="pokemon-card__type-badge"
            style={{ "--badge-color": getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>
    </article>
  );
}

export { PokemonCardSkeleton };
