import { useContext, useEffect } from "react";
import { worldAPI } from "../api/worldAPI";
import ContinentsContext from "../contexts/continentsContext";
import SelectionContext from "../contexts/selectionContext";
import { Continent } from "../@types";
import { useRouter } from "next/router";

export const useContinents = () => {
  const { continents, setContinents } = useContext(ContinentsContext);
  const { selection, setSelection } = useContext(SelectionContext);
  const router = useRouter();

  const refreshContinents = async () => {
    const newContinents = await worldAPI.getContinents("csr");
    if (newContinents.length > 0) setContinents(newContinents);
  };

  const setSelected = (
    type: "continent" | "country" | "none",
    code: string
  ) => {
    if (type === "none")
      return setSelection({
        continent: "",
        country: "",
      });
    setSelection({ ...selection, [type]: code });
  };

  const getSelected = (type: "continent" | "country") => {
    if (type === "continent") {
      if (!selection.continent && !router.query.continent) return [];

      const continentCode = (selection.continent ||
        router.query.continent) as string;

      return continents.filter((continent) => continent.code === continentCode);
    }

    if (type === "country") {
      if (!selection.country && !router.query.country) return [];

      const countryCode = (selection.country || router.query.country) as string;

      const continent = getSelected("continent") as Continent[];
      if (!continent || !continent.length) return [];

      return continent[0].countries.filter(
        (country) => country.code === countryCode
      );
    }
  };

  return {
    continents,
    setSelected,
    getSelected,
    selection,
    setContinents,
    refreshContinents,
  };
};
