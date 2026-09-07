import { useEffect, useState } from "react";
import { fetchPokemonDetail } from "../api/pokeapi.js";
import { getFameScore } from "../data/famousPokemon.js";
import PokemonCard, { PokemonCardSkeleton } from "./PokemonCard.jsx";
import PokemonModal from "./PokemonModal.jsx";

// Cantidad por página
const PAGE_SIZE = 24;

// Grilla de Pokémon con paginación y carga de detalles
export default function PokemonGrid({ items, sortMode }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [detailsByName, setDetailsByName] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [openPokemon, setOpenPokemon] = useState(null);

  // Reiniciar paginación si cambia la lista
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);

  // Cargar detalles de Pokémon visibles
  useEffect(() => {
    const pending = visibleItems.filter((item) => !detailsByName[item.name]);
    if (pending.length === 0) return;

    let cancelled = false;
    setLoadingDetails(true);

    Promise.all(
      pending.map((item) =>
        fetchPokemonDetail(item.name).catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return;
      setDetailsByName((prev) => {
        const next = { ...prev };
        results.forEach((detail) => {
          if (detail) next[detail.name] = detail;
        });
        return next;
      });
      setLoadingDetails(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleItems.map((i) => i.name).join(",")]);

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No encontramos ningún Pokémon con esos filtros.</p>
        <span>Probá con otro nombre, número o tipo.</span>
      </div>
    );
  }

  return (
    <>
      <div className="pokemon-grid">
        {visibleItems.map((item, index) => {
          const detail = detailsByName[item.name];
          const famePosition =
            sortMode === "fame" && getFameScore(item.name) > 0
              ? index + 1
              : null;

          return (
            <PokemonCard
              key={item.id ?? item.name}
              pokemon={detail}
              famePosition={famePosition}
              onOpen={setOpenPokemon}
            />
          );
        })}
      </div>

      {visibleCount < items.length && (
        <button
          type="button"
          className="load-more-btn"
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          disabled={loadingDetails}
        >
          {loadingDetails ? "Cargando…" : "Cargar más"}
        </button>
      )}

      {/* Modal de detalle */}
      {openPokemon && (
        <PokemonModal
          pokemon={openPokemon}
          onClose={() => setOpenPokemon(null)}
        />
      )}
    </>
  );
}
