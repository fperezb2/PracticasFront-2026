"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCountries } from "../lib/api/countriesAll";
import { Country } from "@/types";
import CountryCard from "../components/CountryCard";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountries();
        console.log("data recibida:", data);
        setCountries(data);
      } catch {
        setError("Error al obtener los países");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrado en tiempo real
  const filteredCountries = (countries || []).filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main">
      <h1>COUNTRIES BROWSER</h1>

      <input
        type="text"
        placeholder="Buscar país..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && countries?.length > 0 && (
        <div className="countries-container">
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
