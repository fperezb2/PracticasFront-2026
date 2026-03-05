"use client";

import { useRouter } from "next/navigation";
import { Country } from "@/types";

type Props = {
  country: Country;
};

export default function CountryCard({ country }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const name = encodeURIComponent(country.name.common.toLowerCase());
    router.push(`/country/${name}`);
  };

  return (
    <div className="country-card" onClick={handleClick}>
      <div className="country-flag">{country.flag}</div>
      <p>{country.name.common}</p>
    </div>
  );
}