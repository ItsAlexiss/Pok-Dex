import { useEffect, useMemo, useState } from "react";
import { fetchAllPokemonIndex, fetchPokemonByType } from "./api/pokeapi.js";
import { sortByFame, sortById } from "./utils/sortPokemon.js";
import SearchBar from "./components/SearchBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import SortControl from "./components/SortControl.jsx";
import PokemonGrid from "./components/PokemonGrid.jsx";

export default function App() {
  // Estado principal
  const [fullIndex, setFullIndex] = useState([]);
  const [indexLoading, setIndexLoading] = useState(true);
  const [indexError, setIndexError] = useState(null);

  // Buscador y filtros
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [sortMode, setSortMode] = useState("id");

  // Pokémon filtrados por tipo
  const [typeMembers, setTypeMembers] = useState(null);
  const [typeLoading, setTypeLoading] = useState(false);

  // Cargar índice completo al montar la app
  useEffect(() => {
    fetchAllPokemonIndex()
      .then((list) => {
        setFullIndex(list);
        setIndexLoading(false);
      })
      .catch(() => {
        setIndexError(
          "No ay conexion a Internet we"
        );
        setIndexLoading(false);
      });
  }, []);

  // Cargar miembros si hay un tipo seleccionado
  useEffect(() => {
    if (!selectedType) {
      setTypeMembers(null);
      return;
    }

    let cancelled = false;
    setTypeLoading(true);

    fetchPokemonByType(selectedType)
      .then((members) => {
        if (!cancelled) {
          setTypeMembers(members);
          setTypeLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTypeMembers([]);
          setTypeLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedType]);

  // Filtrar y ordenar lista
  const filteredAndSorted = useMemo(() => {
    const baseList = selectedType ? typeMembers ?? [] : fullIndex;

    const normalizedQuery = query.trim().toLowerCase();
    const filtered = normalizedQuery
      ? baseList.filter((pokemon) => {
        const matchesName = pokemon.name.includes(normalizedQuery);
        const matchesId = String(pokemon.id).includes(normalizedQuery);
        return matchesName || matchesId;
      })
      : baseList;

    return sortMode === "fame" ? sortByFame(filtered) : sortById(filtered);
  }, [fullIndex, typeMembers, selectedType, query, sortMode]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">PokéDex</h1>
      </header>

      <section className="controls" aria-label="Controles de búsqueda">
        <SearchBar value={query} onChange={setQuery} />
        <TypeFilter selectedType={selectedType} onSelect={setSelectedType} />
        <SortControl sortMode={sortMode} onChange={setSortMode} />
      </section>

      <main className="app__content">
        {indexLoading && (
          <p className="status-message">Cargando la Pokédex…</p>
        )}

        {indexError && <p className="status-message status-message--error">{indexError}</p>}

        {!indexLoading && !indexError && (
          <>
            {selectedType && typeLoading ? (
              <p className="status-message">
                Buscando Pokémon de tipo "{selectedType}"…
              </p>
            ) : (
              <PokemonGrid items={filteredAndSorted} sortMode={sortMode} />
            )}
          </>
        )}
      </main>

      <footer className="app__footer">
        <span>
          Datos provistos por{" "}
          <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
            PokeAPI
          </a>
          . Proyecto hecho con React + Vite, sin fines comerciales.
        </span>
      </footer>
    </div>
  );
}
