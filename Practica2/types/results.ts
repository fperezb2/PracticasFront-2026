// Tipo principal de país
export type Country = {
  flag: string;
  name: {
    common: string;
  };
};

//Para recoger todos los paises
export type CountriesResponse = Country[];


// Tipo para un país detallado
export type CountryDetail = {
  name: {
    official: string;
  };
  flag: string;
  flags?: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  population: number;
  languages?: {
    [key: string]: string;
  };
};