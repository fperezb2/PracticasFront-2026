import { CountriesResponse } from "@/types";
import { api } from "./axios"




export const getCountries = async () => {
  const response = await api.get<CountriesResponse>(`/all?fields=name,flag`);
  return response.data;
};