// Control de orden (ID o Fama)
export default function SortControl({ sortMode, onChange }) {
  return (
    <div className="sort-control" role="group" aria-label="Ordenar por">
      <button
        type="button"
        className={`sort-control__btn ${
          sortMode === "id" ? "sort-control__btn--active" : ""
        }`}
        onClick={() => onChange("id")}
      >
        N.º de Pokédex
      </button>
      <button
        type="button"
        className={`sort-control__btn ${
          sortMode === "fame" ? "sort-control__btn--active" : ""
        }`}
        onClick={() => onChange("fame")}
      >
        Más famosos primero
      </button>
    </div>
  );
}
