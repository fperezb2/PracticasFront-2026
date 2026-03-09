import { Drink } from "@/types";
import { DrinksResponse } from "@/types";
import { api } from "./axios"


export const getDrinkByName = async (name: string) => {
  const response = await api.get<DrinksResponse>(`/search.php?s=${name}`);
  return response.data;
};