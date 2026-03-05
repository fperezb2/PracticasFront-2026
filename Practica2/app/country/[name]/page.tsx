"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CountryDetail } from "@/types";
import { getCountrySpecific } from "@/lib/api/countrySpecific";

export default function CountryPage() {
  const router = useRouter();
  const params = useParams();
  const [countries, setCountries] = useState<CountryDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.name) return;

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCountrySpecific(params.name);
        if (!data || data.length === 0) {
          setError("País no encontrado");
          setCountries([]);
        } else {
          setCountries(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error al obtener los datos del país");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [params.name]);

  return (
    <div className="countryPageContainer">
      {loading && <p>Cargando país...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && countries.length > 0 && (
        <div>
          {countries.map((country) => (
            <div key={country.name.common} className="countryCardSpecific">
              <h1>{country.name.official}</h1>
              <p>{country.flag}</p>
              {country.flags?.png && (
                <img src={country.flags.png} alt={country.flags.alt} />
              )}
              <p>Capital: {country.capital?.join(", ")}</p>
              <p>Región: {country.region}</p>
              <p>Población: {country.population.toLocaleString()}</p>
              <p>
                Idiomas:{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => router.push("/")} className="back-button">
        Volver
      </button>
    </div>
  );
}