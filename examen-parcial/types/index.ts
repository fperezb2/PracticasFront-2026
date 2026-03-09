export type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type DrinksResponse = {
  drinks: Drink[];
};

export type DrinkDetail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1?: string;
};

export type DrinkDetailResponse = {
  drinks: DrinkDetail[];
};
