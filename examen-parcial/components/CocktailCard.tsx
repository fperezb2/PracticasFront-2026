"use client";

import { Drink } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  drink: Drink;
};

export default function Cocktail({ drink }: Props) {

  const router = useRouter();

  const handleClick = () => {
    const id = encodeURIComponent(drink.idDrink.toLowerCase());
    router.push(`/drink/${id}`);
  };

  return (

    <div onClick={handleClick}>
      <img
        src={drink.strDrinkThumb ?? ""}
        alt={drink.strDrink}
        width={80}
        height={80}
      />
      <p>{drink.strDrink}</p>
    </div>
  );
}