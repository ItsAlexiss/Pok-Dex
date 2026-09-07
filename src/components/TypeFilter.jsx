import { ALL_TYPES, getTypeColor } from "../data/typeColors.js";

// Filtro por tipo de Pokémon
export default function TypeFilter({ selectedType, onSelect }) {
  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      {ALL_TYPES.map((type) => {
        const isActive = selectedType === type;
        const color = getTypeColor(type);

        return (
          <button
            key={type}
            type="button"
            className={`type-chip ${isActive ? "type-chip--active" : ""}`}
            style={{
              // Color dinámico según tipo
              "--chip-color": color,
            }}
            onClick={() => onSelect(isActive ? null : type)}
            aria-pressed={isActive}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
