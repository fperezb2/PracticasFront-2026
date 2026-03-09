"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DrinkDetail } from "@/types";
import { getDrinkById } from "@/lib/api/cocktailId";



export default function DrinkPage() {
  const router = useRouter();
  const params = useParams();
  const [drinks, setDrinks] = useState<DrinkDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getDrinkById(params.id);
        console.log("data recibida:", params.id);
        if (!data || data.length === 0) {
          setError("País no encontrado");
          setCountries([]);
        } else {
          setCountries(data.drinks);
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
  }, [params.id]);

  return (
    <div className="countryPageContainer">
      {loading && <p>Cargando bebida...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && countries.length > 0 && (
        <div>
          {drinks.map((d) => (
            <div key={d.idDrink} className="countryCardSpecific">
              <h1>{d.strDrink}</h1>
              <img
                src={d.strDrinkThumb ?? ""}
                alt={d.strDrink}
                width={80}
                height={80}
              />
              <p>Categoria: {d.strCategory}</p>
              <p>Alcoholica: {d.strAlcoholic}</p>
              <p>Tipo de vaso: {d.strGlass}</p>
              <p>Instrucciones: {d.strInstructions}</p>
              <p>Ingrediente1: {d.strIngredient1}</p>
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