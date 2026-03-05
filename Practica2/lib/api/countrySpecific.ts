import { CountryDetail } from "@/types";
import { api } from "./axios"




export const getCountrySpecific = async (name: string) => {
  const response = await api.get<CountryDetail[]>(`/name/${name}`);
  return response.data;
};