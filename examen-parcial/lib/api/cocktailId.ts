import { Drink } from "@/types";
import { DrinkDetailResponse } from "@/types";
import { api } from "./axios"




export const getDrinkById = async (id: string) => {
  const response = await api.get<DrinkDetailResponse>(`/lookup.php?i=${id}`);
  return response.data;
};