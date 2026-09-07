import { useEffect, useState } from "react";
import { fetchPokemonSpecies } from "../api/pokeapi.js";
import { getTypeColor } from "../data/typeColors.js";

// Traducción de estadísticas
const STAT_LABELS = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Atq. Esp.",
  "special-defense": "Def. Esp.",
  speed: "Velocidad",
};

// Máximo para barra de estadísticas
const STAT_BAR_MAX = 180;

// Modal de detalles (estilo TCG)
export default function PokemonModal({ pokemon, onClose }) {
  const [species, setSpecies] = useState(null);
  const [speciesLoading, setSpeciesLoading] = useState(true);

  // Cargar especie
  useEffect(() => {
    let cancelled = false;
    setSpecies(null);
    setSpeciesLoading(true);

    fetchPokemonSpecies(pokemon.name)
      .then((data) => {
        if (!cancelled) {
          setSpecies(data);
          setSpeciesLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setSpeciesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pokemon.name]);

  // Cerrar con Escape
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const primaryType = pokemon.types[0];
  const accentColor = getTypeColor(primaryType);
  const hp = pokemon.stats.find((s) => s.name === "hp")?.value ?? 0;
  const otherStats = pokemon.stats.filter((s) => s.name !== "hp");
  const paddedId = String(pokemon.id).padStart(3, "0");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="tcg-card"
        style={{ "--accent-color": accentColor }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Carta de ${pokemon.name}`}
      >
        <button
          type="button"
          className="tcg-card__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Encabezado */}
        <header className="tcg-card__header">
          <div>
            <span className="tcg-card__id">N.º {paddedId}</span>
            <h2 className="tcg-card__name">{pokemon.name}</h2>
          </div>
          <div className="tcg-card__hp">
            <span className="tcg-card__hp-label">PS</span>
            <span className="tcg-card__hp-value">{hp}</span>
          </div>
        </header>

        {/* Imagen */}
        <div className="tcg-card__art">
          <img src={pokemon.sprite} alt={pokemon.name} />
        </div>

        <div className="tcg-card__types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="tcg-card__type-badge"
              style={{ "--badge-color": getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Descripción */}
        <div className="tcg-card__flavor">
          {speciesLoading && <p className="tcg-card__flavor-loading">Cargando ficha…</p>}
          {!speciesLoading && species?.genus && (
            <p className="tcg-card__genus">{species.genus}</p>
          )}
          {!speciesLoading && species?.description && (
            <p className="tcg-card__description">{species.description}</p>
          )}
        </div>

        {/* Datos físicos */}
        <div className="tcg-card__physical">
          <div>
            <span className="tcg-card__physical-label">Altura</span>
            <span className="tcg-card__physical-value">
              {(pokemon.height / 10).toFixed(1)} m
            </span>
          </div>
          <div>
            <span className="tcg-card__physical-label">Peso</span>
            <span className="tcg-card__physical-value">
              {(pokemon.weight / 10).toFixed(1)} kg
            </span>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="tcg-card__stats">
          {otherStats.map((stat) => (
            <div key={stat.name} className="stat-row">
              <span className="stat-row__label">
                {STAT_LABELS[stat.name] ?? stat.name}
              </span>
              <div className="stat-row__bar-track">
                <div
                  className="stat-row__bar-fill"
                  style={{
                    width: `${Math.min(
                      100,
                      (stat.value / STAT_BAR_MAX) * 100
                    )}%`,
                  }}
                />
              </div>
              <span className="stat-row__value">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
