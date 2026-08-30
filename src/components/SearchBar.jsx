// Buscador por nombre o ID
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar........."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar Pokémon por nombre o número de Pokédex"
      />
      {/* Botón limpiar */}
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      )}
    </div>
  );
}
