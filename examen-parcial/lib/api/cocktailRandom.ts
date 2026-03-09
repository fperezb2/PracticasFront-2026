import { Drink } from "@/types";
import { DrinksResponse } from "@/types";
import { api } from "./axios"




export const getDrinkByName = async (name: string) => {
  const response = await api.get<DrinksResponse>(`/random.php`);
  return response.data;
};