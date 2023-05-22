import { useContext, useEffect } from "react";
import { worldAPI } from "../api/worldAPI";
import ContinentsContext from "../contexts/continentsContext";
import SelectionContext from "../contexts/selectionContext";

export const useContinents = () => {
  const { continents, setContinents } = useContext(ContinentsContext);
  const { selection, setSelection } = useContext(SelectionContext);

  const refreshContinents = async () => {
    const newContinents = await worldAPI.getContinents("csr");
    if (newContinents.length > 0) setContinents(newContinents);
  };

  const setSelected = (type: "continent" | "country", code: string) => {
    setSelection({ ...selection, [type]: code });
  };

  return {
    continents,
    setSelected,
    selection,
    setContinents,
    refreshContinents,
  };
};
