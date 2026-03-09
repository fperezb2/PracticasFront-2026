"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDrinkByName } from "../lib/api/cocktailName";
import { Drink } from "@/types";
import Cocktail from "../components/CocktailCard";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [finalSearch, setFinalSearch] = useState<string>("");
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function onSearch() {
    try {
      if (!finalSearch) return;

      const res = await getDrinkByName(finalSearch);
      setDrinks(res.drinks);
      console.log("data recibida:", res.drinks);
    } catch {
      setError("Error al obtener las bebidas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onSearch();
  }, [finalSearch]);

  return (
    <div className="main">
      <h1>DRINKS BROWSER</h1>

      <input
        type="text"
        placeholder="Buscar bebida..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() =>
          setFinalSearch(search)
        }
      > Search
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && drinks?.length > 0 && (
        <div className="countries-container">
          {drinks.map((d) => (
            <Cocktail key={d.idDrink} drink={d} />
          ))}
        </div>
      )}
    </div>
  );
}